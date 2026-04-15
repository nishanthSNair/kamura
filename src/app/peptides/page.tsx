import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { peptides, PEPTIDE_STACKS, PEPTIDE_TRENDS } from "@/data/peptides";
import { getAllPosts } from "@/lib/blog";
import KamuraScoreBadge from "@/components/treatments/KamuraScoreBadge";
import FadeInOnScroll from "@/components/FadeInOnScroll";

export const metadata: Metadata = {
  title: "Peptide Intelligence Hub — Every Peptide Scored, Stacked & Explained",
  description:
    "The most comprehensive peptide resource in the GCC. 13 peptides scored on evidence, safety, and value. Protocol stacks, sourcing guides, clinic tools, and AI-powered recommendations.",
  alternates: { canonical: "https://kamuralife.com/peptides" },
  openGraph: {
    title: "Peptide Intelligence Hub | KAMURA",
    description:
      "13 peptides scored, stacked, and explained. Protocol builder, sourcing guide, and clinic tools.",
    url: "https://kamuralife.com/peptides",
  },
  twitter: {
    card: "summary_large_image",
    title: "Peptide Intelligence Hub | KAMURA",
    description: "The most comprehensive peptide resource in the GCC.",
  },
};

// Editorial protocol pillars — branded like Protocole's YOUTH/MIND/SCULPT/PERFORM
const PILLARS = [
  {
    id: "recovery",
    number: "01",
    name: "RESTORE",
    subtitle: "Recovery + Tissue Repair",
    description:
      "Accelerate healing of tendons, ligaments, muscles, and gut lining with clinically validated repair peptides.",
    tags: ["Heal", "Rebuild", "Soothe"],
    image:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1200&q=80",
    goalId: "recovery",
  },
  {
    id: "longevity",
    number: "02",
    name: "EXTEND",
    subtitle: "Longevity + Cellular Health",
    description:
      "Target cellular aging, telomere health, and mitochondrial function for durable healthspan.",
    tags: ["Telomeres", "Mitochondria", "Anti-Aging"],
    image:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1200&q=80",
    goalId: "longevity",
  },
  {
    id: "metabolic",
    number: "03",
    name: "SCULPT",
    subtitle: "Metabolic + Body Composition",
    description:
      "Target visceral fat, boost metabolism, and support lean body recomposition with precision peptides.",
    tags: ["Burn", "Define", "Rebalance"],
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&q=80",
    goalId: "weight-loss",
  },
  {
    id: "cognitive",
    number: "04",
    name: "FOCUS",
    subtitle: "Cognition + Neuroprotection",
    description:
      "Enhance focus, neuroprotection, and reduce anxiety with peptides designed for the brain.",
    tags: ["Clarity", "Calm", "Sharpen"],
    image:
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=1200&q=80",
    goalId: "cognitive",
  },
];

const DIFFERENTIATORS = [
  {
    title: "Evidence-Scored, Not Marketed",
    body: "Every peptide rated on the Kamura Score — a transparent composite of clinical evidence, safety signals, and real-world outcomes.",
  },
  {
    title: "Medical-Grade Only",
    body: "We reference peptides compounded by licensed pharmacies. No \u201Cresearch use only\u201D vials, no grey-market sourcing.",
  },
  {
    title: "Clinician-Reviewed Protocols",
    body: "Protocol stacks are built from published literature and reviewed against UAE regulatory context before publication.",
  },
  {
    title: "Built for the GCC",
    body: "UAE availability, local compounding pharmacies, and clinic directories — intelligence tuned to the region you live in.",
  },
  {
    title: "Independent by Design",
    body: "Kamura takes no sponsorship from peptide brands or clinics. Rankings reflect evidence, not advertising.",
  },
];

// Tools grouped into consumer vs clinician
const CONSUMER_TOOLS = [
  {
    href: "/peptides/directory",
    title: "Peptide Directory",
    description:
      "Every peptide scored on evidence, safety, and value. Filter by goal, compare, explore.",
  },
  {
    href: "/peptides/tracker",
    title: "My Dashboard",
    description:
      "Track active cycles, log doses, and get smart reminders. Private — data stays on your device.",
  },
  {
    href: "/peptides/protocol-builder",
    title: "Protocol Builder",
    description:
      "Select your goals and receive a recommended stack with dosing, timing, and cycling guidance.",
  },
  {
    href: "/peptides/what-is-a-peptide",
    title: "What is a Peptide?",
    description:
      "Visual, animated introduction to peptides, cellular signaling, and the four jobs they perform.",
  },
  {
    href: "/peptides/compare",
    title: "Compare Peptides",
    description:
      "Side-by-side comparison of any two peptides. Scores, evidence, protocols, and cost.",
  },
  {
    href: "/peptides/sourcing-guide",
    title: "Sourcing Guide",
    description:
      "Pharmaceutical vs research grade. UAE compounding pharmacies. What to ask your doctor.",
  },
];

const CLINIC_TOOLS = [
  {
    href: "/peptides/clinic-dashboard",
    title: "Clinic Dashboard",
    description:
      "Trending peptides, demand signals, and what patients are searching for right now.",
  },
  {
    href: "/peptides/evidence-feed",
    title: "Evidence Feed",
    description:
      "Latest studies, FDA updates, regulatory changes, and safety alerts for peptides.",
  },
  {
    href: "/peptides/protocol-templates",
    title: "Protocol Templates",
    description:
      "Pre-built, evidence-graded protocol stacks clinics can adopt and customize.",
  },
  {
    href: "/peptides/advisor",
    title: "Peptide Advisor",
    description:
      "Tell us your concern — get personalized peptide recommendations with evidence citations.",
  },
];

export default function PeptidesHubPage() {
  const topPeptides = [...peptides]
    .sort((a, b) => b.kamuraScore - a.kamuraScore)
    .slice(0, 6);

  const peptideSlugs = new Set(peptides.map((p) => p.slug));
  const mediaPosts = getAllPosts()
    .filter((post) => {
      const hay =
        `${post.title} ${post.excerpt} ${post.category} ${(post.relatedTreatments || []).join(" ")}`.toLowerCase();
      if (hay.includes("peptide")) return true;
      return (post.relatedTreatments || []).some((s) => peptideSlugs.has(s));
    })
    .slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        name: "Peptide Intelligence Hub",
        url: "https://kamuralife.com/peptides",
        description: metadata.description,
        mainEntity: {
          "@type": "ItemList",
          numberOfItems: peptides.length,
          itemListElement: [...peptides]
            .sort((a, b) => b.kamuraScore - a.kamuraScore)
            .map((p, i) => ({
              "@type": "ListItem",
              position: i + 1,
              url: `https://kamuralife.com/treatments/${p.slug}`,
              name: `${p.name} — Kamura Score: ${p.kamuraScore}`,
            })),
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://kamuralife.com" },
          { "@type": "ListItem", position: 2, name: "Peptide Intelligence Hub" },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ───── HERO ─────────────────────────────────────────────── */}
      <section className="relative min-h-[72vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center scale-110"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=1920&q=85')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a0f0c]/85 via-[#2a1612]/75 to-[#1a0f0c]/90" />
        <div className="relative z-10 text-center px-6 py-20 md:py-28 max-w-4xl mx-auto">
          <span className="inline-block px-4 py-1.5 mb-8 rounded-full border border-white/25 text-[10px] tracking-[0.3em] uppercase text-white/80 font-sans">
            Kamura · Intelligence Hub
          </span>
          <h1 className="font-serif text-[42px] md:text-[72px] font-normal leading-[1.05] tracking-tight text-white mb-6">
            Peptide
            <br />
            Intelligence
          </h1>
          <p className="text-base md:text-lg text-white/70 max-w-[580px] mx-auto leading-relaxed font-sans mb-10">
            {peptides.length} peptides scored on evidence, safety, and value.
            Protocol stacks, sourcing intelligence, and clinician tools — curated
            for the GCC.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
            <Link
              href="/peptides/directory"
              className="px-7 py-3.5 bg-white text-[#2a1612] text-xs tracking-[0.15em] uppercase font-semibold rounded-full hover:bg-white/90 transition-colors font-sans"
            >
              Browse Directory
            </Link>
            <Link
              href="/peptides/protocol-builder"
              className="px-7 py-3.5 border border-white/30 text-white text-xs tracking-[0.15em] uppercase font-semibold rounded-full hover:bg-white/10 transition-colors font-sans"
            >
              Build a Protocol
            </Link>
          </div>
          <div className="flex items-center justify-center gap-8 text-[11px] tracking-[0.15em] uppercase text-white/50 font-sans">
            <span>{peptides.length} Peptides</span>
            <span className="w-px h-3 bg-white/20" />
            <span>{PEPTIDE_STACKS.length} Protocol Stacks</span>
            <span className="w-px h-3 bg-white/20" />
            <span>Evidence-Scored</span>
          </div>
        </div>
      </section>

      {/* ───── WHY WE'RE DIFFERENT (editorial two-column) ───────── */}
      <section className="py-24 md:py-32 bg-[#EDE7DB]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-16 lg:gap-20 items-start">
            <FadeInOnScroll>
              <div className="lg:sticky lg:top-32">
                <p className="text-[10px] tracking-[0.3em] uppercase text-terracotta font-sans mb-5">
                  Why Kamura
                </p>
                <h2 className="font-serif text-4xl md:text-5xl text-gray-900 leading-[1.1] mb-6">
                  Setting the standard in peptide intelligence.
                </h2>
                <p className="text-base text-gray-600 font-sans leading-relaxed mb-8 max-w-md">
                  The peptide category is flooded with marketing, grey-market
                  sourcing, and unverifiable claims. Kamura exists to bring
                  transparency — scoring every peptide on evidence, safety, and
                  regional reality.
                </p>
                <Link
                  href="/treatments/methodology"
                  className="inline-flex items-center gap-2 text-xs tracking-[0.15em] uppercase text-terracotta font-sans font-semibold hover:gap-3 transition-all"
                >
                  Our Methodology
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </Link>
              </div>
            </FadeInOnScroll>

            <div className="space-y-8">
              {DIFFERENTIATORS.map((item, i) => (
                <FadeInOnScroll key={item.title} delay={i * 80}>
                  <div className="flex gap-5 pb-8 border-b border-gray-300/50 last:border-0 last:pb-0">
                    <div className="shrink-0 w-9 h-9 rounded-full border border-terracotta/40 flex items-center justify-center mt-0.5">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#B5736A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <div className="flex-1 pt-1">
                      <h3 className="font-serif text-xl text-gray-900 mb-2">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-600 font-sans leading-relaxed">
                        {item.body}
                      </p>
                    </div>
                  </div>
                </FadeInOnScroll>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ───── PROTOCOL PILLARS (editorial image cards) ────────── */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <FadeInOnScroll>
            <div className="max-w-2xl mb-16">
              <p className="text-[10px] tracking-[0.3em] uppercase text-terracotta font-sans mb-5">
                Our Protocols
              </p>
              <h2 className="font-serif text-4xl md:text-5xl text-gray-900 leading-[1.1] mb-5">
                Four pillars. Every goal.
              </h2>
              <p className="text-base text-gray-600 font-sans leading-relaxed">
                Clinician-reviewed peptide stacks organized around the four
                outcomes that matter most. Each pillar is an evidence-graded
                entry point into the directory.
              </p>
            </div>
          </FadeInOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {PILLARS.map((pillar, i) => (
              <FadeInOnScroll key={pillar.id} delay={i * 100}>
                <Link
                  href={`/peptides/directory?goal=${pillar.goalId}`}
                  className="group block relative overflow-hidden rounded-3xl bg-[#1a0f0c] aspect-[4/5] md:aspect-[4/4.5]"
                >
                  <Image
                    src={pillar.image}
                    alt={pillar.name}
                    fill
                    className="object-cover opacity-70 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a0f0c] via-[#1a0f0c]/40 to-transparent" />
                  <div className="absolute inset-0 p-7 md:p-9 flex flex-col justify-between text-white">
                    <div className="flex items-start justify-between">
                      <span className="text-xs tracking-[0.2em] font-sans text-white/60">
                        {pillar.number}
                      </span>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                        <line x1="7" y1="17" x2="17" y2="7" />
                        <polyline points="7 7 17 7 17 17" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-serif text-3xl md:text-4xl tracking-tight mb-1.5">
                        {pillar.name}
                      </h3>
                      <p className="text-[11px] tracking-[0.2em] uppercase text-white/60 font-sans mb-4">
                        {pillar.subtitle}
                      </p>
                      <p className="text-sm text-white/80 font-sans leading-relaxed mb-5 max-w-sm">
                        {pillar.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {pillar.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] tracking-[0.1em] uppercase px-3 py-1.5 rounded-full border border-white/25 text-white/85 font-sans"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              </FadeInOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ───── TOP PEPTIDES (editorial list) ───────────────────── */}
      <section className="py-24 md:py-32 bg-[#EDE7DB]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-14 lg:gap-20 items-start">
            <FadeInOnScroll>
              <div className="lg:sticky lg:top-32">
                <p className="text-[10px] tracking-[0.3em] uppercase text-terracotta font-sans mb-5">
                  Highest Rated
                </p>
                <h2 className="font-serif text-4xl md:text-5xl text-gray-900 leading-[1.1] mb-5">
                  Top peptides, scored.
                </h2>
                <p className="text-base text-gray-600 font-sans leading-relaxed mb-8 max-w-md">
                  The Kamura Score rates every peptide on a transparent 0–100
                  composite of clinical evidence, safety, accessibility, and
                  value. No sponsorship. No bias.
                </p>
                <Link
                  href="/peptides/directory"
                  className="inline-flex items-center gap-2 text-xs tracking-[0.15em] uppercase text-terracotta font-sans font-semibold hover:gap-3 transition-all"
                >
                  See All {peptides.length} Peptides
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </Link>
              </div>
            </FadeInOnScroll>

            <div className="divide-y divide-gray-300/60 border-y border-gray-300/60">
              {topPeptides.map((p, i) => (
                <FadeInOnScroll key={p.slug} delay={i * 60}>
                  <Link
                    href={`/treatments/${p.slug}`}
                    className="group flex items-center gap-5 md:gap-7 py-6 md:py-7 hover:px-3 transition-all"
                  >
                    <span className="text-xs tracking-[0.2em] text-gray-400 font-sans w-8 shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-serif text-xl md:text-2xl text-gray-900 group-hover:text-terracotta transition-colors mb-1">
                        {p.name}
                      </h3>
                      <p className="text-sm text-gray-500 font-sans line-clamp-1">
                        {p.description}
                      </p>
                      <div className="flex items-center gap-3 mt-2 text-[10px] tracking-[0.15em] uppercase text-gray-400 font-sans">
                        <span>{p.evidenceLevel} Evidence</span>
                        {p.uaeAvailable && (
                          <>
                            <span className="w-px h-2.5 bg-gray-300" />
                            <span className="text-emerald-700">UAE Available</span>
                          </>
                        )}
                      </div>
                    </div>
                    <KamuraScoreBadge score={p.kamuraScore} size="sm" />
                  </Link>
                </FadeInOnScroll>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ───── TOOLS (For You / For Clinicians) ────────────────── */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <FadeInOnScroll>
            <div className="max-w-2xl mb-16">
              <p className="text-[10px] tracking-[0.3em] uppercase text-terracotta font-sans mb-5">
                The Hub
              </p>
              <h2 className="font-serif text-4xl md:text-5xl text-gray-900 leading-[1.1] mb-5">
                Tools for every role.
              </h2>
              <p className="text-base text-gray-600 font-sans leading-relaxed">
                Whether you are exploring peptides personally or running a
                clinical practice, the Hub has the intelligence layer you need.
              </p>
            </div>
          </FadeInOnScroll>

          {/* For You */}
          <div className="mb-16">
            <div className="flex items-baseline justify-between mb-7 pb-4 border-b border-gray-200">
              <h3 className="font-serif text-2xl text-gray-900">For You</h3>
              <span className="text-[10px] tracking-[0.2em] uppercase text-gray-400 font-sans">
                Consumer Tools
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {CONSUMER_TOOLS.map((tool) => (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="group block p-6 rounded-2xl border border-gray-200 hover:border-terracotta/40 hover:shadow-lg transition-all"
                >
                  <h4 className="font-serif text-lg text-gray-900 group-hover:text-terracotta transition-colors mb-2">
                    {tool.title}
                  </h4>
                  <p className="text-xs text-gray-500 font-sans leading-relaxed mb-5">
                    {tool.description}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-[10px] tracking-[0.15em] uppercase text-terracotta font-sans font-semibold">
                    Open
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:translate-x-0.5 transition-transform">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* For Clinicians */}
          <div>
            <div className="flex items-baseline justify-between mb-7 pb-4 border-b border-gray-200">
              <h3 className="font-serif text-2xl text-gray-900">For Clinicians</h3>
              <span className="text-[10px] tracking-[0.2em] uppercase text-gray-400 font-sans">
                Practice Tools
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {CLINIC_TOOLS.map((tool) => (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="group block p-6 rounded-2xl border border-gray-200 hover:border-terracotta/40 hover:shadow-lg transition-all"
                >
                  <h4 className="font-serif text-lg text-gray-900 group-hover:text-terracotta transition-colors mb-2">
                    {tool.title}
                  </h4>
                  <p className="text-xs text-gray-500 font-sans leading-relaxed mb-5">
                    {tool.description}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-[10px] tracking-[0.15em] uppercase text-terracotta font-sans font-semibold">
                    Open
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:translate-x-0.5 transition-transform">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ───── TRENDING (minimal strip) ─────────────────────────── */}
      <section className="py-24 md:py-28 bg-[#EDE7DB]">
        <div className="max-w-6xl mx-auto px-6">
          <FadeInOnScroll>
            <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
              <div>
                <p className="text-[10px] tracking-[0.3em] uppercase text-terracotta font-sans mb-4">
                  Market Intelligence
                </p>
                <h2 className="font-serif text-3xl md:text-4xl text-gray-900 leading-[1.1]">
                  Trending right now.
                </h2>
              </div>
              <Link
                href="/peptides/clinic-dashboard"
                className="inline-flex items-center gap-2 text-xs tracking-[0.15em] uppercase text-terracotta font-sans font-semibold hover:gap-3 transition-all"
              >
                Full Dashboard
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
            </div>
          </FadeInOnScroll>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {PEPTIDE_TRENDS.slice(0, 6).map((trend) => {
              const p = peptides.find((pt) => pt.slug === trend.slug);
              if (!p) return null;
              return (
                <Link
                  key={trend.slug}
                  href={`/treatments/${trend.slug}`}
                  className="group flex items-center gap-4 p-5 rounded-2xl bg-white border border-gray-200/60 hover:border-terracotta/40 hover:shadow-md transition-all"
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-serif text-lg text-gray-900 group-hover:text-terracotta transition-colors">
                      {p.name}
                    </p>
                    <p className="text-[11px] tracking-[0.1em] uppercase text-gray-400 font-sans mt-1">
                      {trend.monthlySearches}/mo
                      <span className="mx-2 text-gray-300">·</span>
                      <span className="text-emerald-700 normal-case tracking-normal">
                        {trend.growthYoY} YoY
                      </span>
                    </p>
                  </div>
                  <KamuraScoreBadge score={p.kamuraScore} size="sm" />
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ───── MEDIA HUB (not a blog) ───────────────────────────── */}
      {mediaPosts.length > 0 && (
        <section className="py-24 md:py-32 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <FadeInOnScroll>
              <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
                <div>
                  <p className="text-[10px] tracking-[0.3em] uppercase text-terracotta font-sans mb-4">
                    Not a blog. A media hub.
                  </p>
                  <h2 className="font-serif text-3xl md:text-4xl text-gray-900 leading-[1.1]">
                    Research, decoded.
                  </h2>
                </div>
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 text-xs tracking-[0.15em] uppercase text-terracotta font-sans font-semibold hover:gap-3 transition-all"
                >
                  All Articles
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </Link>
              </div>
            </FadeInOnScroll>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {mediaPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group block"
                >
                  <div className="relative aspect-[4/3] mb-5 overflow-hidden rounded-2xl bg-gray-100">
                    {post.coverImage ? (
                      <Image
                        src={post.coverImage}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-terracotta/10 to-sage/10 flex items-center justify-center">
                        <span className="font-serif text-5xl text-terracotta/20">K</span>
                      </div>
                    )}
                    <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/90 backdrop-blur text-[10px] tracking-[0.15em] uppercase font-sans text-gray-700">
                      Article
                    </span>
                  </div>
                  <h3 className="font-serif text-xl md:text-2xl text-gray-900 leading-[1.2] group-hover:text-terracotta transition-colors mb-2">
                    {post.title}
                  </h3>
                  <p className="text-sm text-gray-500 font-sans line-clamp-2">
                    {post.excerpt}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ───── CTA FOOTER ──────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#1a0f0c]">
        <div
          className="absolute inset-0 opacity-25 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=1920&q=85')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a0f0c] via-[#2a1612]/90 to-[#1a0f0c]" />
        <div className="relative max-w-3xl mx-auto px-6 py-24 md:py-32 text-center">
          <p className="text-[10px] tracking-[0.3em] uppercase text-white/50 font-sans mb-6">
            Start Here
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-white leading-[1.1] mb-6">
            Not sure where to begin?
          </h2>
          <p className="text-base text-white/70 font-sans leading-relaxed mb-10 max-w-lg mx-auto">
            Take the Wellness Checker to get personalized peptide recommendations
            based on your specific health concerns and goals.
          </p>
          <Link
            href="/wellness-checker"
            className="inline-block px-8 py-4 bg-white text-[#2a1612] text-xs tracking-[0.15em] uppercase font-semibold rounded-full hover:bg-white/90 transition-colors font-sans"
          >
            Start Wellness Check
          </Link>
        </div>
      </section>
    </>
  );
}
