"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

interface Member {
  full_name: string;
  onboarding_completed: boolean;
  language_pref: string;
}

export default function TodayPage() {
  const supabase = createClient();
  const [member, setMember] = useState<Member | null>(null);
  const [concernCount, setConcernCount] = useState(0);
  const [upcomingBooking, setUpcomingBooking] = useState<{
    provider_name: string;
    service_name: string;
    booking_date: string;
    start_time: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      const [memberRes, concernsRes, bookingRes] = await Promise.all([
        supabase.from("members").select("*").eq("id", user.id).single(),
        supabase
          .from("member_concerns")
          .select("id", { count: "exact" })
          .eq("member_id", user.id)
          .eq("active", true),
        supabase
          .from("bookings")
          .select(
            "booking_date, start_time, service:services(name), provider:providers(business_name)"
          )
          .eq("customer_email", user.email || "")
          .eq("status", "confirmed")
          .gte("booking_date", new Date().toISOString().split("T")[0])
          .order("booking_date", { ascending: true })
          .limit(1)
          .maybeSingle(),
      ]);

      setMember(memberRes.data as Member);
      setConcernCount(concernsRes.count || 0);

      if (bookingRes.data) {
        const raw = bookingRes.data as Record<string, unknown>;
        const service = Array.isArray(raw.service) ? raw.service[0] : raw.service;
        const provider = Array.isArray(raw.provider) ? raw.provider[0] : raw.provider;
        setUpcomingBooking({
          provider_name: (provider as { business_name: string })?.business_name || "Provider",
          service_name: (service as { name: string })?.name || "Session",
          booking_date: raw.booking_date as string,
          start_time: raw.start_time as string,
        });
      }
      setLoading(false);
    }
    load();
  }, [supabase]);

  if (loading) {
    return <p className="text-sm text-gray-400 font-sans">Loading...</p>;
  }

  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  const firstName = member?.full_name?.split(" ")[0] || "there";

  const showOnboarding = concernCount === 0 && !upcomingBooking;

  return (
    <>
      {/* Greeting */}
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

      {/* First-time: onboarding checklist */}
      {showOnboarding ? (
        <div>
          <div className="mb-8 p-6 md:p-8 rounded-2xl bg-gradient-to-br from-[#EDE7DB] to-[#F7F3EB] border border-gray-200/60">
            <p className="text-[10px] tracking-[0.3em] uppercase text-terracotta font-sans mb-3">
              Welcome to Kamura
            </p>
            <h2 className="font-serif text-2xl md:text-3xl text-gray-900 mb-3">
              Let&apos;s build your plan
            </h2>
            <p className="text-sm text-gray-600 font-sans leading-relaxed max-w-xl">
              Kamura becomes more useful the more you tell it. Three small steps
              to unlock a personalized dashboard.
            </p>
          </div>

          <div className="space-y-4">
            <OnboardingStep
              number="01"
              title="Share your concerns"
              description="What are you optimizing for? Pick as many as apply — energy, weight, sleep, longevity, recovery."
              cta="Add concerns"
              href="/my/profile"
            />
            <OnboardingStep
              number="02"
              title="Take the wellness check"
              description="Five minutes to calibrate your starting point. We'll use it to personalize every recommendation."
              cta="Start wellness check"
              href="/wellness-checker"
            />
            <OnboardingStep
              number="03"
              title="Book your first session"
              description="Find a verified practitioner near you. Your booking, session notes, and prescribed protocols land here automatically."
              cta="Browse providers"
              href="/explore"
            />
          </div>
        </div>
      ) : (
        <>
          {/* Three anchor cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
            <AnchorCard
              label="Wellness Score"
              value="—"
              helper="Take your first check-in to see your score."
              ctaHref="/my/progress"
              ctaLabel="Start check-in →"
            />
            <AnchorCard
              label="Today's Protocol"
              value={concernCount > 0 ? `${concernCount} concerns tracked` : "No items yet"}
              helper={
                concernCount > 0
                  ? "Add items to your protocol to start logging."
                  : "Concerns added — now let's build a protocol."
              }
              ctaHref="/my/protocol"
              ctaLabel="Open protocol →"
            />
            <AnchorCard
              label="Next Session"
              value={
                upcomingBooking
                  ? `${new Date(upcomingBooking.booking_date).toLocaleDateString()} · ${upcomingBooking.start_time.slice(0, 5)}`
                  : "Nothing booked"
              }
              helper={
                upcomingBooking
                  ? `${upcomingBooking.provider_name} — ${upcomingBooking.service_name}`
                  : "Find a verified practitioner."
              }
              ctaHref={upcomingBooking ? "/my/bookings" : "/explore"}
              ctaLabel={upcomingBooking ? "View booking →" : "Browse providers →"}
            />
          </div>

          {/* Insight of the day placeholder */}
          <div className="p-6 rounded-2xl bg-white border border-gray-200/60">
            <p className="text-[10px] tracking-[0.3em] uppercase text-terracotta font-sans mb-3">
              Insight of the day
            </p>
            <p className="font-serif text-lg text-gray-900 leading-relaxed">
              Your dashboard gets smarter as you log. Start with a daily
              check-in — it unlocks trend lines, personalized insights, and
              treatment recommendations tuned to your pattern.
            </p>
          </div>
        </>
      )}
    </>
  );
}

function OnboardingStep({
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

function AnchorCard({
  label,
  value,
  helper,
  ctaHref,
  ctaLabel,
}: {
  label: string;
  value: string;
  helper: string;
  ctaHref: string;
  ctaLabel: string;
}) {
  return (
    <Link
      href={ctaHref}
      className="block p-5 rounded-2xl bg-white border border-gray-200 hover:border-terracotta/40 hover:shadow-sm transition-all"
    >
      <p className="text-[10px] tracking-[0.2em] uppercase text-gray-400 font-sans mb-3">
        {label}
      </p>
      <p className="font-serif text-2xl text-gray-900 mb-2">{value}</p>
      <p className="text-xs text-gray-500 font-sans leading-relaxed mb-4">{helper}</p>
      <span className="text-[10px] tracking-[0.15em] uppercase text-terracotta font-sans font-semibold">
        {ctaLabel}
      </span>
    </Link>
  );
}
