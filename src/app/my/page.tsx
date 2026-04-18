"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import DailyCheckinModal from "@/components/member/DailyCheckinModal";
import JournalEntryModal from "@/components/member/JournalEntryModal";
import JournalCard from "@/components/member/JournalCard";
import PractitionerCard from "@/components/member/PractitionerCard";
import InventoryNudge from "@/components/member/InventoryNudge";
import ScoreTierPill from "@/components/member/ScoreTierPill";
import HabitStreaksCard from "@/components/member/HabitStreaksCard";
import InsightCard from "@/components/member/InsightCard";
import { getTreatmentBySlug } from "@/data/treatments";

interface Member {
  full_name: string;
  primary_goal: string;
  protocol_start_date: string | null;
  primary_provider_id: string | null;
}

interface Checkin {
  checkin_date: string;
  overall_score: number;
  energy: number;
  mood: number;
  sleep_quality: number;
  stress: number;
  notes: string;
}

interface ProtocolItem {
  id: string;
  name: string;
  category: string;
  treatment_slug: string | null;
  dose: string;
  schedule: string;
  time_of_day: string;
  fasting_required: boolean;
  fasting_note: string;
}

interface DoseLog {
  id: string;
  protocol_item_id: string;
  logged_at: string;
}

interface VialInventory {
  id: string;
  protocol_item_id: string;
  total_doses: number;
  doses_used: number;
}

interface UpcomingBooking {
  provider_name: string;
  service_name: string;
  booking_date: string;
  start_time: string;
}

interface Provider {
  id: string;
  business_name: string;
  slug: string;
  category: string;
  phone: string;
  city: string;
  verified: boolean;
}

interface JournalEntry {
  id: string;
  entry_date: string;
  body: string;
  energy: number | null;
  mood: number | null;
  pain: number | null;
  sleep_hours: number | null;
  created_at: string;
}

const TIME_ORDER = ["morning", "midday", "evening", "bedtime", "any"];

const TIME_LABELS: Record<string, string> = {
  morning: "Morning",
  midday: "Midday",
  evening: "Evening",
  bedtime: "Bedtime",
  any: "Any time",
};

const TIME_HOURS: Record<string, string> = {
  morning: "7:00",
  midday: "13:00",
  evening: "19:00",
  bedtime: "22:00",
  any: "—",
};

export default function TodayPage() {
  const supabase = createClient();
  const [member, setMember] = useState<Member | null>(null);
  const [concernCount, setConcernCount] = useState(0);
  const [today, setToday] = useState<Checkin | null>(null);
  const [recent, setRecent] = useState<Checkin[]>([]);
  const [items, setItems] = useState<ProtocolItem[]>([]);
  const [weekLogs, setWeekLogs] = useState<DoseLog[]>([]);
  const [streakLogs, setStreakLogs] = useState<{ protocol_item_id: string; logged_at: string }[]>([]);
  const [inventory, setInventory] = useState<VialInventory[]>([]);
  const [upcoming, setUpcoming] = useState<UpcomingBooking | null>(null);
  const [provider, setProvider] = useState<Provider | null>(null);
  const [journal, setJournal] = useState<JournalEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [checkinOpen, setCheckinOpen] = useState(false);
  const [journalOpen, setJournalOpen] = useState(false);

  async function loadAll() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    // Guest mode — load check-ins from localStorage only
    if (!user) {
      try {
        const raw = localStorage.getItem("kamura.guest.checkins");
        const guestCheckins = (raw ? JSON.parse(raw) : []) as Checkin[];
        setRecent(guestCheckins.slice(0, 7));
        const todayIso = new Date().toISOString().split("T")[0];
        setToday(guestCheckins.find((c) => c.checkin_date === todayIso) || null);
      } catch {
        /* ignore */
      }
      setLoading(false);
      return;
    }

    const todayDate = new Date().toISOString().split("T")[0];
    const sevenDaysAgo = new Date(Date.now() - 7 * 86400000);
    const sevenDaysAgoDate = sevenDaysAgo.toISOString().split("T")[0];
    const sevenDaysAgoIso = sevenDaysAgo.toISOString();
    const thirtyDaysAgoIso = new Date(Date.now() - 30 * 86400000).toISOString();

    const [
      memberRes,
      concernsRes,
      checkinsRes,
      itemsRes,
      logsRes,
      streakLogsRes,
      inventoryRes,
      bookingRes,
      journalRes,
    ] = await Promise.all([
      supabase.from("members").select("*").eq("id", user.id).single(),
      supabase
        .from("member_concerns")
        .select("id", { count: "exact", head: true })
        .eq("member_id", user.id)
        .eq("active", true),
      supabase
        .from("wellness_checkins")
        .select("*")
        .eq("member_id", user.id)
        .gte("checkin_date", sevenDaysAgoDate)
        .order("checkin_date", { ascending: false }),
      supabase
        .from("protocol_items")
        .select("*")
        .eq("member_id", user.id)
        .eq("active", true)
        .order("time_of_day")
        .order("name"),
      supabase
        .from("dose_logs")
        .select("id, protocol_item_id, logged_at")
        .eq("member_id", user.id)
        .gte("logged_at", sevenDaysAgoIso)
        .order("logged_at", { ascending: false }),
      supabase
        .from("dose_logs")
        .select("protocol_item_id, logged_at")
        .eq("member_id", user.id)
        .gte("logged_at", thirtyDaysAgoIso)
        .order("logged_at", { ascending: false }),
      supabase
        .from("vial_inventory")
        .select("*")
        .eq("member_id", user.id)
        .eq("is_current", true),
      supabase
        .from("bookings")
        .select(
          "booking_date, start_time, service:services(name), provider:providers(business_name)"
        )
        .eq("customer_email", user.email || "")
        .eq("status", "confirmed")
        .gte("booking_date", todayDate)
        .order("booking_date", { ascending: true })
        .limit(1)
        .maybeSingle(),
      supabase
        .from("journal_entries")
        .select("*")
        .eq("member_id", user.id)
        .order("entry_date", { ascending: false })
        .limit(2),
    ]);

    const mem = memberRes.data as Member;
    setMember(mem);
    setConcernCount(concernsRes.count || 0);

    const checkins = (checkinsRes.data as Checkin[]) || [];
    setRecent(checkins);
    setToday(checkins.find((c) => c.checkin_date === todayDate) || null);

    setItems((itemsRes.data as ProtocolItem[]) || []);
    setWeekLogs((logsRes.data as DoseLog[]) || []);
    setStreakLogs((streakLogsRes.data as { protocol_item_id: string; logged_at: string }[]) || []);
    setInventory((inventoryRes.data as VialInventory[]) || []);
    setJournal((journalRes.data as JournalEntry[]) || []);

    if (bookingRes.data) {
      const raw = bookingRes.data as Record<string, unknown>;
      const svc = Array.isArray(raw.service) ? raw.service[0] : raw.service;
      const prv = Array.isArray(raw.provider) ? raw.provider[0] : raw.provider;
      setUpcoming({
        provider_name: (prv as { business_name: string })?.business_name || "Provider",
        service_name: (svc as { name: string })?.name || "Session",
        booking_date: raw.booking_date as string,
        start_time: raw.start_time as string,
      });
    }

    // Load primary provider
    if (mem?.primary_provider_id) {
      const { data: p } = await supabase
        .from("providers")
        .select("id, business_name, slug, category, phone, city, verified")
        .eq("id", mem.primary_provider_id)
        .single();
      if (p) setProvider(p as Provider);
    }

    setLoading(false);
  }

  useEffect(() => {
    loadAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function logDose(itemId: string) {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    const { data } = await supabase
      .from("dose_logs")
      .insert({ member_id: user.id, protocol_item_id: itemId })
      .select()
      .single();

    if (data) setWeekLogs((prev) => [data as DoseLog, ...prev]);
  }

  if (loading) {
    return (
      <div className="animate-pulse space-y-6">
        <div className="h-10 bg-white rounded-xl w-2/3" />
        <div className="h-24 bg-white rounded-2xl" />
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
          <div className="h-80 bg-white rounded-2xl" />
          <div className="h-80 bg-white rounded-2xl" />
        </div>
      </div>
    );
  }

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";
  const firstName = member?.full_name?.split(" ")[0] || "there";

  // Compute "Week X of protocol"
  let weekLabel = "";
  if (member?.protocol_start_date) {
    const start = new Date(member.protocol_start_date);
    const now = new Date();
    const weeks = Math.floor((now.getTime() - start.getTime()) / (7 * 86400000)) + 1;
    if (weeks >= 1) {
      weekLabel = `Week ${weeks}`;
    }
  }

  const adherenceLast7 = items.length > 0
    ? Math.round((weekLogs.length / (items.length * 7)) * 100)
    : 0;

  const sevenDayAvg = recent.length > 0
    ? Math.round(recent.reduce((s, c) => s + c.overall_score, 0) / recent.length)
    : null;

  // Compute the personalized sub-headline from real signals
  function buildSubHeadline(): string | null {
    const parts: string[] = [];

    // Today's protocol progress
    const todayLogsCount = weekLogs.filter((l) => {
      const d = new Date(l.logged_at);
      const start = new Date();
      start.setHours(0, 0, 0, 0);
      return d >= start;
    }).length;

    const itemsDueToday = items.filter((i) => i.schedule === "daily" || i.schedule === "twice_daily").length;
    if (itemsDueToday > 0) {
      parts.push(
        `You're ${todayLogsCount} of ${itemsDueToday} through today's protocol.`
      );
    }

    // Wellness score delta (today vs 7-day avg)
    if (today && sevenDayAvg !== null) {
      const delta = today.overall_score - sevenDayAvg;
      if (delta >= 3) {
        parts.push(`Your wellness score is up ${delta} pts this week.`);
      } else if (delta <= -3) {
        parts.push(`Your wellness score is down ${Math.abs(delta)} pts — consider logging what changed.`);
      }
    }

    // Check-in streak as fallback
    if (parts.length === 0 && recent.length >= 3) {
      parts.push(`You've logged ${recent.length} check-ins this week. Keep going.`);
    }

    return parts.length > 0 ? parts.join(" ") : null;
  }
  const subHeadline = buildSubHeadline();

  // Items due today only (schedule='daily' or time-of-day applicable)
  const itemsToday = items.filter((i) => {
    if (i.schedule === "daily" || i.schedule === "twice_daily") return true;
    if (i.schedule === "as_needed") return false;
    return true;
  });

  // Group today's items by time-of-day
  const todayLogIds = new Set(
    weekLogs
      .filter((l) => {
        const logDate = new Date(l.logged_at);
        const todayStart = new Date();
        todayStart.setHours(0, 0, 0, 0);
        return logDate >= todayStart;
      })
      .map((l) => l.protocol_item_id)
  );

  const byTime: Record<string, ProtocolItem[]> = {};
  itemsToday.forEach((item) => {
    if (!byTime[item.time_of_day]) byTime[item.time_of_day] = [];
    byTime[item.time_of_day].push(item);
  });

  // Inventory alerts — items with ≤3 doses left
  const invAlerts = inventory
    .map((inv) => {
      const remaining = inv.total_doses - inv.doses_used;
      const item = items.find((i) => i.id === inv.protocol_item_id);
      return { remaining, item };
    })
    .filter((x) => x.item && x.remaining <= 5 && x.remaining > 0)
    .slice(0, 1);

  // Compute the one "Insight of the day"
  function buildInsight(): { title: string; body: string } | null {
    // 1. Wellness score delta vs 7-day avg
    if (today && sevenDayAvg !== null) {
      const delta = today.overall_score - sevenDayAvg;
      if (delta >= 5) {
        return {
          title: `Your wellness score is up ${delta} points this week.`,
          body: "Consistency compounds. Keep logging — the signal sharpens as your dataset grows.",
        };
      }
      if (delta <= -5) {
        return {
          title: `Your wellness score dipped ${Math.abs(delta)} points.`,
          body: "Worth a journal note — what changed? Sleep, stress, travel, new supplement? The pattern usually shows up in the data within a week.",
        };
      }
    }

    // 2. Adherence streak celebration
    if (adherenceLast7 >= 85 && weekLogs.length >= 7) {
      return {
        title: "You're in the top 15% of adherence this week.",
        body: "Most members show measurable changes between week 8 and 12 of consistent logging. You're building the baseline that makes signal visible.",
      };
    }

    // 3. Morning-protocol observation
    const morningItems = items.filter((i) => i.time_of_day === "morning");
    if (morningItems.length >= 3) {
      return {
        title: "Your mornings do a lot of heavy lifting.",
        body: `${morningItems.length} of your ${items.length} protocol items fire before midday. That's efficient — morning stacks have the highest adherence across Kamura members.`,
      };
    }

    // 4. Pharma safety gentle reminder
    if (items.some((i) => i.category === "pharmaceutical")) {
      return {
        title: "Prescription items in your stack stay physician-led.",
        body: "Kamura tracks adherence and side-effect patterns, but dose changes, cycling, and discontinuation belong to your prescribing physician. Share your log export with them at the next visit.",
      };
    }

    // 5. First-time encouragement
    if (today && weekLogs.length > 0 && weekLogs.length < 7) {
      return {
        title: "You've started. That's the hardest part.",
        body: "Trends need about two weeks of logs to show real direction. Keep the one-tap check-ins going — the dashboard becomes genuinely yours by day 14.",
      };
    }

    // 6. Default encouragement
    if (items.length === 0 && !today) {
      return {
        title: "Kamura gets sharper the more you log.",
        body: "Start with a daily check-in and one protocol item. The scoring, insights, and cross-provider view all key off your data.",
      };
    }

    return null;
  }
  const insight = buildInsight();

  const showOnboarding =
    concernCount === 0 && !upcoming && items.length === 0 && !today;

  return (
    <>
      {checkinOpen && (
        <DailyCheckinModal
          existing={today}
          onClose={() => setCheckinOpen(false)}
          onDone={() => {
            setCheckinOpen(false);
            loadAll();
          }}
        />
      )}
      {journalOpen && (
        <JournalEntryModal
          onClose={() => setJournalOpen(false)}
          onSaved={() => {
            setJournalOpen(false);
            loadAll();
          }}
        />
      )}

      {/* Hero strip */}
      <div className="flex items-end justify-between gap-4 mb-10 flex-wrap pb-8 border-b border-gray-200">
        <div className="flex-1 min-w-0">
          <p className="text-[11px] tracking-[0.25em] uppercase text-terracotta font-sans font-semibold mb-3">
            {greeting}, {firstName}
          </p>
          <h1 className="font-serif text-3xl md:text-[40px] text-gray-900 leading-[1.1] mb-3">
            {weekLabel && member?.primary_goal ? (
              <>
                {weekLabel} of your{" "}
                <em className="not-italic text-terracotta">{member.primary_goal}</em> protocol
              </>
            ) : adherenceLast7 > 0 ? (
              <>
                You&apos;re{" "}
                <em className="not-italic text-terracotta">{adherenceLast7}% adherent</em> this week
              </>
            ) : (
              <>Today&apos;s plan, at a glance.</>
            )}
          </h1>
          {subHeadline && (
            <p className="text-base text-gray-600 font-sans leading-relaxed max-w-xl">
              {subHeadline}
            </p>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setJournalOpen(true)}
            className="px-4 py-2.5 rounded-full border border-gray-300 text-gray-700 text-xs tracking-[0.15em] uppercase font-semibold font-sans hover:border-terracotta hover:text-terracotta transition-colors"
          >
            Journal today
          </button>
          <button
            onClick={() => setCheckinOpen(true)}
            className="px-5 py-2.5 rounded-full bg-terracotta text-white text-xs tracking-[0.15em] uppercase font-semibold font-sans hover:bg-terracotta-dark transition-colors"
          >
            {today ? "Update check-in" : "+ Check-in"}
          </button>
        </div>
      </div>

      {/* Inventory nudge */}
      {invAlerts.map(({ item, remaining }, i) =>
        item ? (
          <InventoryNudge
            key={i}
            itemName={item.name}
            dosesLeft={remaining}
            daysLeft={remaining}
          />
        ) : null
      )}

      {showOnboarding ? (
        <OnboardingView />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
          {/* LEFT — Active stack + Today's doses */}
          <div className="space-y-6">
            {/* Active stack */}
            {items.length > 0 && (
              <section className="bg-white rounded-2xl border border-gray-200/70 overflow-hidden">
                <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
                  <div>
                    <h2 className="font-serif text-base text-gray-900">Your active stack</h2>
                    <p className="text-[11px] text-gray-500 font-sans mt-0.5">
                      {items.length} item{items.length === 1 ? "" : "s"}
                      {member?.protocol_start_date &&
                        ` · started ${new Date(member.protocol_start_date).toLocaleDateString(
                          "en-US",
                          { day: "numeric", month: "short", year: "numeric" }
                        )}`}
                    </p>
                  </div>
                  <Link
                    href="/my/protocol"
                    className="text-[10px] tracking-[0.15em] uppercase text-terracotta font-sans font-semibold hover:underline"
                  >
                    Manage →
                  </Link>
                </div>

                <div className="divide-y divide-gray-100">
                  {items.slice(0, 5).map((item) => {
                    const treatment = item.treatment_slug ? getTreatmentBySlug(item.treatment_slug) : null;
                    return (
                      <StackRow key={item.id} item={item} kamuraScore={treatment?.kamuraScore} />
                    );
                  })}
                </div>
              </section>
            )}

            {/* Today's doses */}
            {itemsToday.length > 0 ? (
              <section className="bg-white rounded-2xl border border-gray-200/70 overflow-hidden">
                <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
                  <div>
                    <h2 className="font-serif text-base text-gray-900">
                      Today ·{" "}
                      {new Date().toLocaleDateString("en-US", {
                        weekday: "long",
                        day: "numeric",
                        month: "short",
                      })}
                    </h2>
                    <p className="text-[11px] text-gray-500 font-sans mt-0.5">
                      {todayLogIds.size} of {itemsToday.length} logged
                    </p>
                  </div>
                </div>

                {TIME_ORDER.filter((t) => byTime[t]?.length).map((time) => (
                  <div key={time}>
                    <div className="px-5 pt-4 pb-1">
                      <p className="text-[10px] tracking-[0.25em] uppercase text-gray-400 font-sans font-semibold">
                        {TIME_LABELS[time]}
                      </p>
                    </div>
                    <div className="divide-y divide-gray-100">
                      {byTime[time].map((item) => {
                        const logged = todayLogIds.has(item.id);
                        return (
                          <DoseRow
                            key={item.id}
                            item={item}
                            time={TIME_HOURS[time]}
                            logged={logged}
                            onLog={() => !logged && logDose(item.id)}
                          />
                        );
                      })}
                    </div>
                  </div>
                ))}
              </section>
            ) : items.length === 0 ? (
              <section className="p-10 rounded-2xl bg-white border border-dashed border-gray-300 text-center">
                <p className="font-serif text-xl text-gray-900 mb-2">Build your protocol</p>
                <p className="text-sm text-gray-500 font-sans mb-4 max-w-md mx-auto">
                  Add peptides, supplements, or daily habits to start tracking.
                </p>
                <Link
                  href="/my/protocol"
                  className="inline-block px-5 py-2.5 rounded-full bg-terracotta text-white text-xs tracking-[0.15em] uppercase font-semibold font-sans hover:bg-terracotta-dark"
                >
                  + Add first item
                </Link>
              </section>
            ) : null}

            {/* Insight of the day */}
            {insight && (
              <InsightCard title={insight.title} body={insight.body} />
            )}
          </div>

          {/* RIGHT — Wellness score + practitioner + journal */}
          <aside className="space-y-6">
            {/* Wellness score tile */}
            <button
              onClick={() => setCheckinOpen(true)}
              className="w-full text-left p-5 rounded-2xl bg-white border border-gray-200/70 hover:border-terracotta/40 hover:shadow-sm transition-all"
            >
              <p className="text-[10px] tracking-[0.2em] uppercase text-gray-400 font-sans mb-3">
                Wellness Score
              </p>
              {today ? (
                <div className="flex items-baseline gap-3 mb-2">
                  <p className="font-serif text-5xl text-gray-900">{today.overall_score}</p>
                  {sevenDayAvg !== null && (
                    <p className="text-xs text-gray-500 font-sans">
                      7-day avg {sevenDayAvg}
                    </p>
                  )}
                </div>
              ) : (
                <>
                  <p className="font-serif text-5xl text-gray-300 mb-2">—</p>
                  <p className="text-xs text-gray-500 font-sans">Tap to log today&apos;s check-in</p>
                </>
              )}
              <p className="text-[10px] tracking-[0.15em] uppercase text-terracotta font-sans font-semibold mt-3">
                {today ? "Update check-in →" : "Start check-in →"}
              </p>
            </button>

            {/* Practitioner */}
            <PractitionerCard provider={provider} nextSession={upcoming} />

            {/* Journal */}
            {/* Habit Streaks */}
            <HabitStreaksCard items={items} logs={streakLogs} />

            <JournalCard entries={journal} onAdd={() => setJournalOpen(true)} />
          </aside>
        </div>
      )}
    </>
  );
}

function StackRow({
  item,
  kamuraScore,
}: {
  item: ProtocolItem;
  kamuraScore?: number;
}) {
  const categoryColor: Record<string, string> = {
    peptide: "bg-purple-50 text-purple-800",
    pharmaceutical: "bg-blue-50 text-blue-800",
    supplement: "bg-emerald-50 text-emerald-800",
    lifestyle: "bg-amber-50 text-amber-800",
    habit: "bg-sky-50 text-sky-800",
  };

  return (
    <div className="px-5 py-4 flex items-center gap-4 hover:bg-[#FAF8F5] transition-colors">
      <div
        className={`w-11 h-11 rounded-xl flex items-center justify-center font-serif text-sm font-semibold shrink-0 ${
          categoryColor[item.category] || "bg-gray-100 text-gray-800"
        }`}
      >
        {item.name.slice(0, 3).toUpperCase()}
      </div>

      <div className="flex-1 min-w-0">
        <p className="font-serif text-base text-gray-900 leading-tight">{item.name}</p>
        <p className="text-[11px] tracking-[0.1em] uppercase text-gray-400 font-sans mt-0.5">
          {item.category}
        </p>
      </div>

      <div className="hidden sm:block text-right shrink-0">
        {item.dose && <p className="font-serif text-lg text-gray-900 leading-tight">{item.dose}</p>}
        <p className="text-[11px] text-gray-500 font-sans mt-0.5">
          {item.schedule.replace("_", " ")}
        </p>
      </div>

      {kamuraScore !== undefined && (
        <div className="shrink-0">
          <ScoreTierPill score={kamuraScore} size="sm" />
        </div>
      )}
    </div>
  );
}

function DoseRow({
  item,
  time,
  logged,
  onLog,
}: {
  item: ProtocolItem;
  time: string;
  logged: boolean;
  onLog: () => void;
}) {
  return (
    <div className="px-5 py-4 flex items-center gap-4">
      <div className="w-14 shrink-0">
        <p className="font-serif text-base text-gray-900 leading-tight">{time.split(":")[0]}</p>
        <p className="text-[10px] tracking-[0.15em] uppercase text-gray-400 font-sans">
          {Number(time.split(":")[0]) >= 12 ? "PM" : "AM"}
        </p>
      </div>
      <div className="flex-1 min-w-0">
        <p className={`font-sans text-sm font-semibold ${logged ? "text-gray-400 line-through" : "text-gray-900"}`}>
          {item.name} {item.dose && `· ${item.dose}`}
        </p>
        <p className="text-[11px] text-gray-500 font-sans mt-0.5">
          {item.category}
          {item.fasting_required && " · fasted"}
          {item.fasting_note && ` · ${item.fasting_note}`}
        </p>
      </div>
      <button
        onClick={onLog}
        disabled={logged}
        className={`w-9 h-9 shrink-0 rounded-full border-2 flex items-center justify-center transition-colors ${
          logged
            ? "bg-emerald-500 border-emerald-500 text-white"
            : "border-gray-300 hover:border-terracotta hover:bg-terracotta/10"
        }`}
        aria-label={logged ? "Logged" : "Log dose"}
      >
        {logged && (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        )}
      </button>
    </div>
  );
}

function OnboardingView() {
  return (
    <div>
      <div className="mb-8 p-7 md:p-9 rounded-3xl bg-gradient-to-br from-[#EDE7DB] via-[#F7F3EB] to-[#FAF8F5] border border-gray-200/60">
        <p className="text-[10px] tracking-[0.3em] uppercase text-terracotta font-sans font-semibold mb-3">
          Welcome to Kamura
        </p>
        <h2 className="font-serif text-3xl md:text-4xl text-gray-900 leading-tight mb-3">
          Let&apos;s build your plan
        </h2>
        <p className="text-base text-gray-600 font-sans leading-relaxed max-w-xl">
          Three small steps to unlock your personalized dashboard. Takes 5 minutes.
        </p>
      </div>

      <div className="space-y-3">
        <StepCard
          number="01"
          title="Set your goal and concerns"
          description="What are you optimizing for — recovery, longevity, weight, sleep, performance? This shapes every recommendation."
          cta="Open profile"
          href="/my/profile"
        />
        <StepCard
          number="02"
          title="Log your first check-in"
          description="Rate your energy, mood, sleep, stress. 30 seconds — generates your first wellness score."
          cta="Start check-in"
          href="/my"
        />
        <StepCard
          number="03"
          title="Add a protocol item"
          description="A peptide, supplement, or daily habit. We track adherence and surface patterns over time."
          cta="Open protocol"
          href="/my/protocol"
        />
      </div>
    </div>
  );
}

function StepCard({
  number,
  title,
  description,
  cta,
  href,
}: {
  number: string;
  title: string;
  description: string;
  cta: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="block p-5 md:p-6 rounded-2xl bg-white border border-gray-200/70 hover:border-terracotta/40 hover:shadow-sm transition-all"
    >
      <div className="flex items-start gap-5">
        <span className="font-serif text-lg text-terracotta shrink-0 mt-0.5">{number}</span>
        <div className="flex-1 min-w-0">
          <h3 className="font-serif text-xl text-gray-900 mb-1.5">{title}</h3>
          <p className="text-sm text-gray-500 font-sans leading-relaxed mb-3">{description}</p>
          <span className="inline-block text-[10px] tracking-[0.15em] uppercase text-terracotta font-sans font-semibold">
            {cta} →
          </span>
        </div>
      </div>
    </Link>
  );
}
