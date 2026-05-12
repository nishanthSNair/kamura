import Link from "next/link";
import Image from "next/image";
import { peptides } from "@/data/peptides";
import EmailWaitlist from "@/components/EmailWaitlist";
import VialPenAnimation from "./VialPenAnimation";

// Category groupings inspired by DARDOC's product taxonomy, mapped to the
// peptides Kamura currently scores. Each card links to the existing
// treatment detail page until dedicated /peptides/[slug] routes ship.
const CATEGORIES: {
  id: string;
  title: string;
  blurb: string;
  slugs: string[];
}[] = [
  {
    id: "longevity",
    title: "Longevity & Anti-Aging",
    blurb: "Telomere health, cellular repair, and mitochondrial vitality.",
    slugs: ["epitalon", "mots-c", "ghk-cu", "ss-31"],
  },
  {
    id: "recovery",
    title: "Recovery & Repair",
    blurb: "Tissue regeneration for tendons, gut lining, and connective tissue.",
    slugs: ["bpc-157", "tb-500", "thymosin-alpha-1", "kpv"],
  },
  {
    id: "hormonal",
    title: "Hormonal & Metabolic",
    blurb: "Growth hormone, body composition, and visceral fat reduction.",
    slugs: ["cjc-1295-ipamorelin", "tesamorelin", "aod-9604"],
  },
  {
    id: "cognitive",
    title: "Cognition & Focus",
    blurb: "Neuroprotection, attention, and a calmer nervous system.",
    slugs: ["semax", "selank"],
  },
];

function PeptideCard({ slug, index }: { slug: string; index: number }) {
  const peptide = peptides.find((p) => p.slug === slug);
  if (!peptide) return null;

  // Alternate vial/pen image across the row so each row feels like a
  // matched set rather than 4 identical photographs.
  const useVial = index % 2 === 0;

  return (
    <Link
      href={`/treatments/${peptide.slug}`}
      className="group block rounded-3xl bg-[#F5EFE6] border border-[#2A2520]/8 overflow-hidden transition-all duration-500 hover:shadow-[0_24px_60px_-30px_rgba(42,37,32,0.25)] hover:-translate-y-1"
    >
      <div className="relative aspect-square bg-gradient-to-br from-[#F5EFE6] to-[#E8DCC8]">
        <Image
          src={useVial ? "/images/peptides/peptide-vial.png" : "/images/peptides/peptide-pen.png"}
          alt={`${peptide.name} — Kamura Compounded`}
          fill
          sizes="(max-width: 768px) 70vw, (max-width: 1024px) 33vw, 22vw"
          className="object-contain p-6 transition-transform duration-700 group-hover:scale-[1.04]"
        />
        <div className="absolute top-5 left-5 text-[10px] tracking-[0.22em] uppercase text-terracotta/90 font-sans font-semibold">
          {String(index + 1).padStart(2, "0")}
        </div>
      </div>

      <div className="px-6 pt-5 pb-6 border-t border-[#2A2520]/8 bg-white">
        <h3 className="font-serif text-[22px] text-[#2A2520] leading-[1.15] mb-1.5 group-hover:text-terracotta transition-colors">
          {peptide.name}
        </h3>
        <p className="text-[12.5px] text-[#2A2520]/55 font-sans leading-relaxed line-clamp-2 mb-4">
          {peptide.description}
        </p>
        <span className="inline-flex items-center gap-1.5 text-[10px] tracking-[0.18em] uppercase text-terracotta font-sans font-semibold">
          Learn more
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transition-transform group-hover:translate-x-1">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </span>
      </div>
    </Link>
  );
}

export default function CompoundedSection() {
  return (
    <section
      id="compounded"
      className="relative overflow-hidden bg-gradient-to-b from-[#F5EFE6] via-[#F0E7D7] to-[#EDE2CF]"
    >
      {/* ── Hero: animation + headline + waitlist ─────────────────── */}
      <div className="max-w-6xl mx-auto px-6 pt-24 md:pt-32 pb-16 md:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="order-2 lg:order-1">
            <p className="text-[10px] tracking-[0.32em] uppercase text-terracotta font-sans font-semibold mb-6">
              Kamura Compounded · Coming Soon
            </p>
            <h2
              className="font-serif text-[#2A2520] leading-[1.02] tracking-[-0.015em] mb-7"
              style={{ fontSize: "clamp(40px, 5.4vw, 76px)" }}
            >
              Peptides,
              <br />
              <span className="italic text-terracotta">done right.</span>
            </h2>
            <p className="text-[16.5px] text-[#2A2520]/70 font-sans leading-[1.65] mb-10 max-w-[480px]">
              Pharmaceutical-grade peptides, compounded through licensed UAE
              pharmacy partners. No grey-market sourcing. No marketing claims.
              Just rigorously scored protocols and a pharmacy layer built into
              the wellness platform — not bolted on.
            </p>

            <div className="max-w-[460px]">
              <EmailWaitlist
                source="peptide_waitlist"
                placeholder="your@email.com"
                cta="Join the waitlist"
                successMessage="You're on the list. We'll reach out before launch."
              />
              <p className="mt-4 text-[10.5px] tracking-[0.18em] uppercase text-[#2A2520]/45 font-sans">
                Early access · {peptides.length} peptides · UAE compounding partners
              </p>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <VialPenAnimation />
          </div>
        </div>
      </div>

      {/* ── Categorized peptide grid ──────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-6 pb-24 md:pb-32 space-y-20 md:space-y-24">
        <div className="text-center max-w-2xl mx-auto pt-8">
          <p className="text-[10px] tracking-[0.32em] uppercase text-terracotta font-sans font-semibold mb-5">
            The Catalog
          </p>
          <h3 className="font-serif text-[#2A2520] text-3xl md:text-5xl leading-[1.08] mb-5">
            Find your personalized protocol.
          </h3>
          <p className="text-[15.5px] text-[#2A2520]/65 font-sans leading-relaxed">
            Every peptide we&rsquo;ll offer at launch, organized by outcome.
            Tap any to read the mechanism, evidence, and dosing literature.
          </p>
        </div>

        {CATEGORIES.map((cat) => (
          <div key={cat.id}>
            <div className="flex items-baseline justify-between mb-7 pb-5 border-b border-[#2A2520]/12">
              <div>
                <h4 className="font-serif text-2xl md:text-3xl text-[#2A2520] leading-tight">
                  {cat.title}
                </h4>
                <p className="text-[13px] text-[#2A2520]/55 font-sans mt-1.5">
                  {cat.blurb}
                </p>
              </div>
              <span className="hidden sm:inline-block text-[10px] tracking-[0.22em] uppercase text-[#2A2520]/40 font-sans font-semibold">
                {cat.slugs.filter((s) => peptides.find((p) => p.slug === s)).length} peptides
              </span>
            </div>

            <div className="-mx-6 px-6 overflow-x-auto snap-x snap-mandatory scroll-pl-6 md:mx-0 md:px-0 md:overflow-visible">
              <div className="flex gap-5 md:grid md:grid-cols-4 md:gap-6">
                {cat.slugs.map((slug, i) => (
                  <div
                    key={slug}
                    className="snap-start shrink-0 w-[78%] sm:w-[46%] md:w-auto"
                  >
                    <PeptideCard slug={slug} index={i} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}

        {/* ── Closing waitlist invite ─────────────────────────────── */}
        <div className="relative overflow-hidden rounded-[28px] bg-[#2A2520] text-white px-8 md:px-14 py-16 md:py-20">
          <div
            className="absolute inset-0 opacity-[0.18] pointer-events-none"
            aria-hidden
            style={{
              background:
                "radial-gradient(ellipse at 30% 20%, #B5736A 0%, transparent 55%), radial-gradient(ellipse at 80% 80%, #C4A882 0%, transparent 55%)",
            }}
          />
          <div className="relative max-w-2xl mx-auto text-center">
            <p className="text-[10px] tracking-[0.32em] uppercase text-[#C4A882] font-sans font-semibold mb-5">
              Be First in Line
            </p>
            <h3 className="font-serif text-3xl md:text-5xl leading-[1.08] mb-5">
              Compounded launches in waves.
            </h3>
            <p className="text-[15.5px] text-white/65 font-sans leading-[1.65] mb-9 max-w-lg mx-auto">
              The waitlist gets priority onboarding, founder pricing, and a
              private brief on every peptide we&rsquo;re launching with.
            </p>
            <div className="max-w-[440px] mx-auto">
              <EmailWaitlist
                source="peptide_waitlist"
                placeholder="your@email.com"
                cta="Join the waitlist"
                successMessage="You're on the list. We'll reach out before launch."
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
