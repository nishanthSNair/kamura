import type { Metadata } from "next";
import Link from "next/link";
import { treatments, getEvidenceLevelColor, type Treatment } from "@/data/treatments";
import { getTierForScore, type TierLetter } from "@/data/tiers";
import EmailWaitlist from "@/components/EmailWaitlist";

// ── Supplement subset, ranked best → worst by Kamura Score ──
const supplements: Treatment[] = treatments
  .filter((t) => t.category === "Supplements & Nutraceuticals")
  .sort((a, b) => b.kamuraScore - a.kamuraScore);

const updated = new Date().toLocaleDateString("en-US", {
  month: "long",
  year: "numeric",
});

// Consumer-facing labels layered over the canonical S/A/B tiers.
const TIER_COPY: Record<TierLetter, { label: string; blurb: string }> = {
  S: { label: "Worth It", blurb: "Proven, safe, and good value. If you take nothing else, start here." },
  A: { label: "Solid", blurb: "Well-supported by evidence. Worth it for the right goal." },
  B: { label: "Promising", blurb: "Growing evidence — reasonable to try, but manage expectations." },
  C: { label: "Early", blurb: "Limited evidence so far. Proceed with caution." },
  D: { label: "Skip for now", blurb: "Too little evidence to justify the cost today." },
};

const GRADE_ORDER: Record<string, number> = { A: 0, B: 1, C: 2, D: 3, F: 4 };

function bestOutcome(t: Treatment) {
  if (!t.outcomes?.length) return null;
  return [...t.outcomes].sort(
    (a, b) => (GRADE_ORDER[a.grade] ?? 9) - (GRADE_ORDER[b.grade] ?? 9)
  )[0];
}

// "Pricey for the proof" — honest hot-take, looked up live from data.
const PRICEY = [
  { slug: "nmn", verdict: "High-cost for Moderate evidence. Creatine and magnesium do more for a fraction of the price." },
  { slug: "urolithin-a", verdict: "Promising mitochondrial data, but you pay a premium for early science." },
  { slug: "nad-oral", verdict: "Oral NAD+ is poorly absorbed. The evidence doesn't yet match the price tag." },
  { slug: "spermidine", verdict: "Exciting autophagy research — still emerging. Wheat germ delivers it far cheaper." },
]
  .map((p) => ({ ...p, t: supplements.find((s) => s.slug === p.slug) }))
  .filter((p): p is { slug: string; verdict: string; t: Treatment } => Boolean(p.t));

export const metadata: Metadata = {
  title: "The Supplement Report Card — Which Supplements Actually Work | KAMURA",
  description:
    `${supplements.length} longevity supplements graded on real evidence — not marketing. Creatine, magnesium, NMN, ashwagandha & more, ranked by the Kamura Score and priced for the UAE. No sponsors, no affiliate links.`,
  keywords: [
    "best supplements",
    "supplement tier list",
    "which supplements actually work",
    "longevity supplements ranked",
    "creatine",
    "magnesium",
    "NMN",
    "ashwagandha",
    "supplement evidence",
    "supplements Dubai UAE",
    "Kamura Score",
    "are supplements worth it",
  ],
  alternates: { canonical: "https://kamuralife.com/supplements" },
  openGraph: {
    title: "The Supplement Report Card — Which Supplements Actually Work",
    description: `${supplements.length} supplements graded on real evidence, ranked, and priced for the UAE. Zero sponsors.`,
    url: "https://kamuralife.com/supplements",
    siteName: "KAMURA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Supplement Report Card | KAMURA",
    description: `${supplements.length} supplements graded on real evidence, ranked, priced for the UAE.`,
  },
};

export default function SupplementsReportCard() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "The Kamura Supplement Report Card",
    description:
      "Longevity supplements graded on research evidence, safety, accessibility, and value.",
    numberOfItems: supplements.length,
    itemListElement: supplements.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `https://kamuralife.com/treatments/${t.slug}`,
      name: `${t.name} — Kamura Score: ${t.kamuraScore}`,
    })),
  };

  let rank = 0;

  // Group into populated tiers, best first.
  const tierOrder: TierLetter[] = ["S", "A", "B", "C", "D"];
  const groups = tierOrder
    .map((letter) => ({
      letter,
      items: supplements.filter((t) => getTierForScore(t.kamuraScore).letter === letter),
    }))
    .filter((g) => g.items.length > 0);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ─────────── HERO ─────────── */}
      <section className="bg-[#FAFCF7] pt-16 md:pt-24 pb-10 md:pb-14">
        <div className="max-w-5xl mx-auto px-6 md:px-8">
          <p className="text-[10.5px] tracking-[0.32em] uppercase text-terracotta font-semibold font-sans mb-5">
            The Kamura Report Card · Supplements
          </p>
          <h1 className="font-serif text-[38px] md:text-[64px] leading-[1.02] tracking-[-0.015em] text-[#173C3B] max-w-[16ch]">
            Which supplements are{" "}
            <span className="italic text-terracotta">actually</span> worth it?
          </h1>
          <p className="text-[16px] md:text-[19px] leading-[1.6] text-[#173C3B]/70 max-w-[62ch] font-sans mt-6">
            Every major longevity supplement, graded on real evidence — not
            marketing. Ranked by the Kamura Score and priced for the UAE. No
            sponsors. No affiliate links. No supplements for sale.
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-7 text-[13px] font-sans text-[#173C3B]/60">
            <span className="font-semibold text-[#173C3B]">
              {supplements.length} supplements graded
            </span>
            <span>Updated {updated}</span>
            <Link
              href="/treatments/methodology"
              className="text-terracotta font-semibold underline underline-offset-4 decoration-terracotta/30 hover:decoration-terracotta"
            >
              How we grade →
            </Link>
          </div>
        </div>
      </section>

      {/* ─────────── TIER LEGEND ─────────── */}
      <section className="bg-[#E7F3EB] border-y border-[#173C3B]/8 py-6">
        <div className="max-w-5xl mx-auto px-6 md:px-8 flex flex-wrap gap-x-8 gap-y-3">
          {groups.map((g) => {
            const tier = getTierForScore(g.items[0].kamuraScore);
            return (
              <div key={g.letter} className="flex items-center gap-2.5">
                <span
                  className="inline-flex items-center justify-center w-7 h-7 rounded-md text-white text-[13px] font-bold font-sans"
                  style={{ backgroundColor: tier.color }}
                >
                  {g.letter}
                </span>
                <span className="text-[13.5px] font-sans">
                  <span className="font-semibold text-[#173C3B]">
                    {TIER_COPY[g.letter].label}
                  </span>
                  <span className="text-[#173C3B]/45">
                    {"  "}
                    {tier.scoreMin}–{tier.scoreMax}
                  </span>
                </span>
              </div>
            );
          })}
        </div>
      </section>

      {/* ─────────── RANKED LIST BY TIER ─────────── */}
      <section className="bg-[#FAFCF7] py-12 md:py-16">
        <div className="max-w-5xl mx-auto px-6 md:px-8">
          {groups.map((g) => {
            const tier = getTierForScore(g.items[0].kamuraScore);
            return (
              <div key={g.letter} className="mb-12 last:mb-0">
                {/* Tier header */}
                <div className="flex items-baseline gap-4 mb-5">
                  <span
                    className="inline-flex items-center justify-center w-11 h-11 rounded-lg text-white text-[20px] font-bold font-sans shrink-0"
                    style={{ backgroundColor: tier.color }}
                  >
                    {g.letter}
                  </span>
                  <div>
                    <h2 className="font-serif text-[26px] md:text-[32px] leading-none text-[#173C3B]">
                      {TIER_COPY[g.letter].label}
                    </h2>
                    <p className="text-[13.5px] text-[#173C3B]/55 font-sans mt-1.5">
                      {TIER_COPY[g.letter].blurb}
                    </p>
                  </div>
                </div>

                {/* Rows */}
                <div className="space-y-2">
                  {g.items.map((t) => {
                    rank += 1;
                    const best = bestOutcome(t);
                    const ev = getEvidenceLevelColor(t.evidenceLevel);
                    return (
                      <Link
                        key={t.slug}
                        href={`/treatments/${t.slug}`}
                        className="group flex items-center gap-4 md:gap-5 bg-white border border-[#173C3B]/8 rounded-xl px-4 md:px-5 py-3.5 hover:border-terracotta/40 hover:shadow-[0_2px_20px_rgba(181,115,106,0.08)] transition-all"
                        style={{ borderLeft: `3px solid ${tier.color}` }}
                      >
                        {/* Rank */}
                        <span className="font-serif text-[20px] md:text-[24px] text-[#173C3B]/25 w-8 md:w-10 text-center shrink-0 tabular-nums">
                          {rank}
                        </span>

                        {/* Name + best-for */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2.5 flex-wrap">
                            <span className="font-serif text-[17px] md:text-[19px] text-[#173C3B] group-hover:text-terracotta transition-colors">
                              {t.name}
                            </span>
                            <span
                              className={`text-[10.5px] font-semibold font-sans px-2 py-0.5 rounded-full ${ev.bg} ${ev.text}`}
                            >
                              {t.evidenceLevel}
                            </span>
                          </div>
                          {best && (
                            <p className="text-[12.5px] md:text-[13px] text-[#173C3B]/55 font-sans mt-0.5 truncate">
                              Best for: {best.name}{" "}
                              <span className="font-semibold">({best.grade})</span>
                            </p>
                          )}
                        </div>

                        {/* Cost */}
                        {t.costEstimate && (
                          <span className="hidden sm:block text-[12.5px] text-[#173C3B]/50 font-sans text-right shrink-0 w-[110px] md:w-[130px]">
                            {t.costEstimate}
                          </span>
                        )}

                        {/* Score */}
                        <span
                          className="font-serif text-[22px] md:text-[26px] leading-none shrink-0 w-10 text-right tabular-nums"
                          style={{ color: tier.color }}
                        >
                          {t.kamuraScore}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ─────────── PRICEY FOR THE PROOF ─────────── */}
      {PRICEY.length > 0 && (
        <section className="bg-[#173C3B] text-white py-16 md:py-20">
          <div className="max-w-5xl mx-auto px-6 md:px-8">
            <p className="text-[10.5px] tracking-[0.32em] uppercase text-[#DCEC8B] font-semibold font-sans mb-4">
              Pricey for the proof
            </p>
            <h2 className="font-serif text-[30px] md:text-[44px] leading-[1.06] tracking-[-0.01em] max-w-[20ch] mb-3">
              The supplements you&rsquo;re probably{" "}
              <span className="italic text-[#D4B896]">overpaying</span> for.
            </h2>
            <p className="text-[15px] leading-[1.6] text-white/60 max-w-[58ch] font-sans mb-10">
              Not bad — just not yet worth the money for most people. The
              evidence is still early, but the price is already high.
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              {PRICEY.map(({ t, verdict }) => (
                <Link
                  key={t.slug}
                  href={`/treatments/${t.slug}`}
                  className="group bg-white/[0.04] border border-white/10 rounded-2xl p-6 hover:bg-white/[0.07] hover:border-[#DCEC8B]/40 transition-all"
                >
                  <div className="flex items-center justify-between gap-3 mb-2">
                    <span className="font-serif text-[21px] text-white group-hover:text-[#D4B896] transition-colors">
                      {t.name}
                    </span>
                    <span className="text-[12px] font-sans text-[#DCEC8B] shrink-0">
                      {t.evidenceLevel} · {t.kamuraScore}
                    </span>
                  </div>
                  {t.costEstimate && (
                    <p className="text-[13px] font-sans font-semibold text-white/80 mb-2">
                      {t.costEstimate}
                    </p>
                  )}
                  <p className="text-[13.5px] leading-[1.55] text-white/60 font-sans">
                    {verdict}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─────────── EMAIL CAPTURE ─────────── */}
      <section className="bg-[#E7F3EB] border-y border-[#173C3B]/8 py-16 md:py-20">
        <div className="max-w-2xl mx-auto px-6 md:px-8 text-center">
          <h2 className="font-serif text-[28px] md:text-[40px] leading-[1.08] tracking-[-0.01em] text-[#173C3B] mb-4">
            We grade new supplements every month.
          </h2>
          <p className="text-[15.5px] leading-[1.6] text-[#173C3B]/65 font-sans mb-8 max-w-[46ch] mx-auto">
            Get the updated report card and the occasional evidence-based note —
            no hype, no selling. Just what the science actually says.
          </p>
          <EmailWaitlist
            source="newsletter"
            cta="Get the updates"
            placeholder="you@example.com"
            successMessage="You're in. We'll send the next update to your inbox."
          />
        </div>
      </section>

      {/* ─────────── FOOTER LINKS + DISCLAIMER ─────────── */}
      <section className="bg-[#FAFCF7] py-12">
        <div className="max-w-5xl mx-auto px-6 md:px-8">
          <div className="flex flex-wrap gap-x-6 gap-y-3 mb-8 text-[14px] font-sans">
            <Link
              href="/treatments?category=Supplements%20%26%20Nutraceuticals"
              className="text-terracotta font-semibold underline underline-offset-4 decoration-terracotta/30 hover:decoration-terracotta"
            >
              Browse the full supplement index →
            </Link>
            <Link
              href="/treatments/compare"
              className="text-terracotta font-semibold underline underline-offset-4 decoration-terracotta/30 hover:decoration-terracotta"
            >
              Compare two supplements head-to-head →
            </Link>
          </div>
          <p className="text-[12px] leading-[1.6] text-[#173C3B]/45 font-sans max-w-[70ch]">
            The Kamura Score is calculated from publicly verifiable data —
            clinical evidence, safety, accessibility, and value — and is never
            influenced by advertising or sponsorship. This report card is for
            educational purposes only and is not medical advice. Supplements can
            interact with medications and conditions; talk to a qualified
            clinician before starting anything new.
          </p>
        </div>
      </section>
    </>
  );
}
