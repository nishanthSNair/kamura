"use client";

import { useEffect, useState, type ReactNode } from "react";
import type { WellnessProfile } from "@/data/wellness-questionnaire";
import {
  computeDimensionScores,
  computeOverallScore,
  getScoreLabel,
} from "@/data/wellness-scoring";
import { ZONES } from "@/data/wellness-concerns";
import EmailWaitlist from "@/components/EmailWaitlist";

/**
 * WellnessResultGate — wraps the full WellnessDashboard with an email
 * capture step. Visitors see a meaningful teaser (their score + their
 * single most pressing dimension) so they understand the gate is real,
 * then submit email to unlock the full plan, treatment list, protocol,
 * and risk flags.
 *
 * Once a visitor has submitted, the gate stays unlocked across reloads
 * (localStorage flag). They can also bypass with `?bypass=1` for
 * authenticated members who shouldn't see the gate (e.g. signed-in
 * users coming from /my who already gave their email).
 */

const STORAGE_KEY = "kamura.wellness.gateUnlocked.v1";

interface Props {
  profile: WellnessProfile;
  children: ReactNode;
}

export default function WellnessResultGate({ profile, children }: Props) {
  const [unlocked, setUnlocked] = useState<boolean | null>(null);

  useEffect(() => {
    const fromStorage =
      typeof window !== "undefined" &&
      window.localStorage.getItem(STORAGE_KEY) === "1";
    const fromQuery =
      typeof window !== "undefined" &&
      new URLSearchParams(window.location.search).get("bypass") === "1";
    // Hydration-time read of localStorage — intentional one-shot setState
    // to avoid SSR/CSR mismatch. Not a derived re-render loop.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setUnlocked(Boolean(fromStorage || fromQuery));
  }, []);

  if (unlocked === null) {
    // Avoid SSR flash — wait for the storage check
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-terracotta/30 border-t-terracotta rounded-full animate-spin" />
      </div>
    );
  }

  if (unlocked) return <>{children}</>;

  return <ResultGateTeaser profile={profile} onUnlock={() => setUnlocked(true)} />;
}

function ResultGateTeaser({
  profile,
  onUnlock,
}: {
  profile: WellnessProfile;
  onUnlock: () => void;
}) {
  const dims = computeDimensionScores(profile);
  const overall = computeOverallScore(dims);
  const label = getScoreLabel(overall);

  // Find the dimension with the lowest score (the one to call out)
  const gapDim = [...dims].sort((a, b) => a.score - b.score)[0];

  // Top concern zones (already chosen during questionnaire)
  const topZoneLabels = profile.selectedConcerns
    .slice(0, 3)
    .map((c) => {
      const zoneInfo = ZONES.find((z) => z.zone === c.zone);
      return zoneInfo?.label || c.zone;
    })
    .filter((v, i, a) => a.indexOf(v) === i);

  // Persist unlock after submit so reload doesn't re-gate
  function handleSubmit() {
    try {
      window.localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* ignore — non-essential */
    }
    onUnlock();
  }

  return (
    <section className="min-h-[80vh] bg-gradient-to-b from-[#FAF7F2] via-[#F3EEE2] to-[#EDE7DB] py-16 md:py-24">
      <div className="max-w-3xl mx-auto px-6 md:px-8 text-center">
        <p className="text-[10.5px] tracking-[0.32em] uppercase text-terracotta font-semibold font-sans mb-5">
          Your Wellness Plan · Ready
        </p>
        <h1 className="font-serif text-[36px] md:text-[56px] leading-[1.04] tracking-[-0.015em] text-[#2A2520] mb-6 max-w-[20ch] mx-auto">
          Your plan is ready.
        </h1>
        <p className="text-[16px] md:text-[18px] leading-[1.6] text-[#2A2520]/70 font-sans mb-12 max-w-[58ch] mx-auto">
          Based on your answers, we&rsquo;ve built a personalised wellness
          report — your baseline score, ranked treatments, daily protocol,
          budget breakdown, and the risks worth knowing.
        </p>

        {/* Teaser tile — score + dimension call-out + concern chips */}
        <div className="bg-white rounded-3xl border border-[#2A2520]/8 p-7 md:p-10 mb-10 shadow-[0_24px_60px_-30px_rgba(42,37,32,0.25)]">
          <div className="flex flex-col md:flex-row items-center md:items-start md:text-left gap-8">
            {/* Score */}
            <div className="shrink-0 text-center">
              <p className="text-[10px] tracking-[0.28em] uppercase text-[#2A2520]/55 font-sans mb-2">
                Wellness Score
              </p>
              <p className="font-serif text-[64px] md:text-[80px] leading-none text-[#2A2520]">
                {overall}
              </p>
              <p className="text-[11.5px] tracking-[0.14em] uppercase text-terracotta font-semibold font-sans mt-1">
                {label}
              </p>
            </div>

            <div className="hidden md:block w-px h-32 bg-[#2A2520]/8" />

            <div className="flex-1 min-w-0 text-center md:text-left">
              {gapDim && (
                <div className="mb-5">
                  <p className="text-[10px] tracking-[0.28em] uppercase text-[#2A2520]/55 font-sans mb-2">
                    The dimension that needs the most attention
                  </p>
                  <p className="font-serif text-[22px] text-[#2A2520] capitalize">
                    {gapDim.label.replace(/_/g, " ")}
                  </p>
                </div>
              )}

              {topZoneLabels.length > 0 && (
                <div>
                  <p className="text-[10px] tracking-[0.28em] uppercase text-[#2A2520]/55 font-sans mb-3">
                    Your top concern zones
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                    {topZoneLabels.map((label) => (
                      <span
                        key={label}
                        className="inline-flex items-center px-3 py-1.5 rounded-full bg-[#FAF7F2] border border-[#2A2520]/10 text-[12.5px] text-[#2A2520] font-sans"
                      >
                        {label}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Gate */}
        <div className="bg-[#2A2520] text-white rounded-3xl p-7 md:p-10">
          <p className="text-[10.5px] tracking-[0.32em] uppercase text-[#C4A882] font-semibold font-sans mb-3">
            One more step
          </p>
          <h2 className="font-serif text-[24px] md:text-[30px] leading-[1.1] tracking-[-0.005em] mb-4 max-w-[24ch] mx-auto">
            Send my full plan to my inbox.
          </h2>
          <p className="text-[13.5px] md:text-[14.5px] leading-[1.6] text-white/65 font-sans mb-7 max-w-[52ch] mx-auto">
            We&rsquo;ll email you your ranked treatments, daily protocol,
            budget breakdown, and risk flags — and let you save the full
            interactive dashboard.
          </p>

          <div className="max-w-[440px] mx-auto">
            <EmailWaitlistGate onSuccess={handleSubmit} />
          </div>

          <p className="mt-6 text-[11px] tracking-[0.04em] text-white/45 font-sans">
            No spam. Unsubscribe anytime. We never sell your data.
          </p>
        </div>
      </div>
    </section>
  );
}

/**
 * Inline wrapper around EmailWaitlist so we can know when it succeeds
 * and trigger the gate unlock. The base EmailWaitlist component doesn't
 * expose a submit-success callback today, so we duplicate the minimal
 * submit logic here against the same /api/email-signup endpoint, with
 * the dark-theme styling.
 */
function EmailWaitlistGate({ onSuccess }: { onSuccess: () => void }) {
  return (
    <EmailWaitlist
      source="newsletter"
      theme="dark"
      placeholder="you@example.com"
      cta="Unlock my plan"
      successMessage="Sent. Unlocking your full plan…"
      className="!mx-0"
      onSubmittedExtra={onSuccess}
    />
  );
}
