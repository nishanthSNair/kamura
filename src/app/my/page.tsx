"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import DailyCheckinModal from "@/components/member/DailyCheckinModal";

interface Member {
  full_name: string;
  language_pref: string;
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
  skipped: boolean;
}

interface UpcomingBooking {
  provider_name: string;
  service_name: string;
  booking_date: string;
  start_time: string;
}

const TODAY_ISO = () => new Date().toISOString().split("T")[0];

export default function TodayPage() {
  const supabase = createClient();
  const [member, setMember] = useState<Member | null>(null);
  const [concernCount, setConcernCount] = useState(0);
  const [today, setToday] = useState<Checkin | null>(null);
  const [recent, setRecent] = useState<Checkin[]>([]);
  const [items, setItems] = useState<ProtocolItem[]>([]);
  const [todayLogs, setTodayLogs] = useState<DoseLog[]>([]);
  const [upcoming, setUpcoming] = useState<UpcomingBooking | null>(null);
  const [loading, setLoading] = useState(true);
  const [checkinOpen, setCheckinOpen] = useState(false);

  async function loadAll() {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    const todayDate = TODAY_ISO();
    const sevenDaysAgo = new Date(Date.now() - 7 * 86400000).toISOString().split("T")[0];
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const [memberRes, concernsRes, checkinsRes, itemsRes, logsRes, bookingRes] =
      await Promise.all([
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
          .gte("checkin_date", sevenDaysAgo)
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
          .select("*")
          .eq("member_id", user.id)
          .gte("logged_at", startOfDay.toISOString()),
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
      ]);

    setMember(memberRes.data as Member);
    setConcernCount(concernsRes.count || 0);

    const checkins = (checkinsRes.data as Checkin[]) || [];
    setRecent(checkins);
    const todaysCheckin = checkins.find((c) => c.checkin_date === todayDate);
    setToday(todaysCheckin || null);

    setItems((itemsRes.data as ProtocolItem[]) || []);
    setTodayLogs((logsRes.data as DoseLog[]) || []);

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

    if (data) {
      setTodayLogs((prev) => [...prev, data as DoseLog]);
    }
  }

  if (loading) {
    return <p className="text-sm text-gray-400 font-sans">Loading...</p>;
  }

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";
  const firstName = member?.full_name?.split(" ")[0] || "there";

  const sevenDayAvg =
    recent.length > 0
      ? Math.round(recent.reduce((s, c) => s + c.overall_score, 0) / recent.length)
      : null;
  const delta = today && sevenDayAvg !== null ? today.overall_score - sevenDayAvg : null;

  const showOnboarding = concernCount === 0 && !upcoming && items.length === 0 && !today;

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

      <div className="mb-10">
        <p className="text-[10px] tracking-[0.3em] uppercase text-terracotta font-sans mb-2">
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
          })}
        </p>
        <h1 className="font-serif text-3xl md:text-4xl text-gray-900 leading-tight">
          {greeting}, {firstName}.
        </h1>
      </div>

      {showOnboarding ? (
        <OnboardingView />
      ) : (
        <>
          {/* Three anchor cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {/* Wellness Score */}
            <button
              onClick={() => setCheckinOpen(true)}
              className="p-5 rounded-2xl bg-white border border-gray-200 text-left hover:border-terracotta/40 hover:shadow-sm transition-all"
            >
              <p className="text-[10px] tracking-[0.2em] uppercase text-gray-400 font-sans mb-3">
                Wellness Score
              </p>
              {today ? (
                <>
                  <div className="flex items-baseline gap-2 mb-2">
                    <p className="font-serif text-5xl text-gray-900">{today.overall_score}</p>
                    {delta !== null && delta !== 0 && (
                      <span
                        className={`text-sm font-sans font-semibold ${
                          delta > 0 ? "text-emerald-700" : "text-red-600"
                        }`}
                      >
                        {delta > 0 ? "+" : ""}
                        {delta}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 font-sans">
                    {sevenDayAvg !== null && `7-day avg ${sevenDayAvg}`}
                  </p>
                </>
              ) : (
                <>
                  <p className="font-serif text-5xl text-gray-300 mb-2">—</p>
                  <p className="text-xs text-gray-500 font-sans">
                    Tap to log your check-in
                  </p>
                </>
              )}
              <p className="text-[10px] tracking-[0.15em] uppercase text-terracotta font-sans font-semibold mt-4">
                {today ? "Update check-in →" : "Start check-in →"}
              </p>
            </button>

            {/* Today's Protocol count */}
            <Link
              href="/my/protocol"
              className="block p-5 rounded-2xl bg-white border border-gray-200 hover:border-terracotta/40 hover:shadow-sm transition-all"
            >
              <p className="text-[10px] tracking-[0.2em] uppercase text-gray-400 font-sans mb-3">
                Today&apos;s Protocol
              </p>
              <p className="font-serif text-3xl text-gray-900 mb-2">
                {todayLogs.length}
                <span className="text-gray-300"> / {items.length}</span>
              </p>
              <p className="text-xs text-gray-500 font-sans">
                {items.length === 0
                  ? "No items yet — add your first"
                  : todayLogs.length === items.length
                  ? "All logged today 🎉"
                  : `${items.length - todayLogs.length} remaining`}
              </p>
              <p className="text-[10px] tracking-[0.15em] uppercase text-terracotta font-sans font-semibold mt-4">
                Open protocol →
              </p>
            </Link>

            {/* Next Session */}
            <Link
              href={upcoming ? "/my/bookings" : "/explore"}
              className="block p-5 rounded-2xl bg-white border border-gray-200 hover:border-terracotta/40 hover:shadow-sm transition-all"
            >
              <p className="text-[10px] tracking-[0.2em] uppercase text-gray-400 font-sans mb-3">
                Next Session
              </p>
              {upcoming ? (
                <>
                  <p className="font-serif text-xl text-gray-900 mb-1 leading-tight">
                    {new Date(upcoming.booking_date).toLocaleDateString("en-US", {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                    })}
                    <span className="text-gray-400"> · {upcoming.start_time.slice(0, 5)}</span>
                  </p>
                  <p className="text-xs text-gray-500 font-sans leading-relaxed">
                    {upcoming.provider_name}
                    <br />
                    {upcoming.service_name}
                  </p>
                </>
              ) : (
                <>
                  <p className="font-serif text-xl text-gray-300 mb-2">None</p>
                  <p className="text-xs text-gray-500 font-sans">
                    Find a verified practitioner.
                  </p>
                </>
              )}
              <p className="text-[10px] tracking-[0.15em] uppercase text-terracotta font-sans font-semibold mt-4">
                {upcoming ? "View booking →" : "Browse providers →"}
              </p>
            </Link>
          </div>

          {/* Today's protocol items inline */}
          {items.length > 0 && (
            <section className="p-5 md:p-6 rounded-2xl bg-white border border-gray-200 mb-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-serif text-lg text-gray-900">Today&apos;s items</h2>
                <Link
                  href="/my/protocol"
                  className="text-[10px] tracking-[0.15em] uppercase text-terracotta font-sans font-semibold"
                >
                  Manage →
                </Link>
              </div>
              <div className="space-y-2">
                {items.map((item) => {
                  const logged = todayLogs.some((l) => l.protocol_item_id === item.id);
                  return (
                    <div
                      key={item.id}
                      className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#EDE7DB]/40 transition-colors"
                    >
                      <button
                        onClick={() => !logged && logDose(item.id)}
                        disabled={logged}
                        className={`w-8 h-8 shrink-0 rounded-full border-2 flex items-center justify-center transition-colors ${
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
                      <div className="flex-1 min-w-0">
                        <p className={`font-serif text-base ${logged ? "text-gray-400 line-through" : "text-gray-900"}`}>
                          {item.name}
                        </p>
                        <p className="text-xs text-gray-500 font-sans">
                          {item.dose && `${item.dose} · `}
                          {item.schedule.replace("_", " ")}
                          {item.time_of_day !== "any" && ` · ${item.time_of_day}`}
                        </p>
                      </div>
                      <span
                        className={`text-[9px] tracking-[0.15em] uppercase font-sans font-semibold ${
                          item.category === "peptide"
                            ? "text-purple-700"
                            : item.category === "supplement"
                            ? "text-emerald-700"
                            : item.category === "habit"
                            ? "text-blue-700"
                            : "text-gray-500"
                        }`}
                      >
                        {item.category}
                      </span>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* Empty protocol prompt */}
          {items.length === 0 && (
            <section className="p-6 rounded-2xl bg-white border border-dashed border-gray-300 text-center">
              <p className="font-serif text-lg text-gray-900 mb-2">Build your protocol</p>
              <p className="text-sm text-gray-500 font-sans mb-4 max-w-md mx-auto">
                Add peptides, supplements, or daily habits to start tracking.
              </p>
              <Link
                href="/my/protocol"
                className="inline-block px-5 py-2.5 rounded-full bg-[#2a1612] text-white text-xs tracking-[0.15em] uppercase font-semibold font-sans"
              >
                Add First Item
              </Link>
            </section>
          )}
        </>
      )}
    </>
  );
}

function OnboardingView() {
  return (
    <div>
      <div className="mb-8 p-6 md:p-8 rounded-2xl bg-gradient-to-br from-[#EDE7DB] to-[#F7F3EB] border border-gray-200/60">
        <p className="text-[10px] tracking-[0.3em] uppercase text-terracotta font-sans mb-3">
          Welcome to Kamura
        </p>
        <h2 className="font-serif text-2xl md:text-3xl text-gray-900 mb-3">
          Let&apos;s build your plan
        </h2>
        <p className="text-sm text-gray-600 font-sans leading-relaxed max-w-xl">
          Three small steps to unlock a personalized dashboard.
        </p>
      </div>

      <div className="space-y-4">
        <StepCard
          number="01"
          title="Share your concerns"
          description="What are you optimizing for? Energy, weight, sleep, longevity, recovery — pick what matters."
          cta="Add concerns"
          href="/my/profile"
        />
        <StepCard
          number="02"
          title="Log your first check-in"
          description="Takes 30 seconds. Rates your energy, mood, sleep, and stress — generates your first wellness score."
          cta="Open Today's check-in"
          href="/my"
        />
        <StepCard
          number="03"
          title="Add a protocol item"
          description="A peptide, supplement, or daily habit. We'll track adherence and surface insights over time."
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
      className="block p-5 md:p-6 rounded-2xl bg-white border border-gray-200 hover:border-terracotta/40 hover:shadow-sm transition-all"
    >
      <div className="flex items-start gap-5">
        <span className="font-serif text-lg text-terracotta shrink-0 mt-0.5">{number}</span>
        <div className="flex-1 min-w-0">
          <h3 className="font-serif text-xl text-gray-900 mb-1.5">{title}</h3>
          <p className="text-sm text-gray-500 font-sans leading-relaxed mb-3">
            {description}
          </p>
          <span className="inline-block text-[10px] tracking-[0.15em] uppercase text-terracotta font-sans font-semibold">
            {cta} →
          </span>
        </div>
      </div>
    </Link>
  );
}
