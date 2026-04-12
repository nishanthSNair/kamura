import type { Metadata } from "next";
import Link from "next/link";
import { peptides, PEPTIDE_GOALS, PEPTIDE_STACKS, PEPTIDE_TRENDS } from "@/data/peptides";
import { getScoreTier, getScoreTierColor } from "@/data/treatments";
import KamuraScoreBadge from "@/components/treatments/KamuraScoreBadge";
import FadeInOnScroll from "@/components/FadeInOnScroll";

export const metadata: Metadata = {
  title: "Peptide Intelligence Hub — Every Peptide Scored, Stacked & Explained",
  description:
    "The most comprehensive peptide resource in the GCC. 13 peptides scored on evidence, safety, and value. Protocol stacks, sourcing guides, clinic tools, and AI-powered recommendations.",
  keywords: [
    "peptide therapy",
    "peptide therapy dubai",
    "peptide intelligence",
    "BPC-157",
    "GHK-Cu",
    "peptide protocols",
    "peptide stacks",
    "peptide sourcing UAE",
    "peptide clinic dubai",
    "longevity peptides",
    "recovery peptides",
    "cognitive peptides",
    "peptide guide 2026",
  ],
  alternates: { canonical: "https://kamuralife.com/peptides" },
  openGraph: {
    title: "Peptide Intelligence Hub | KAMURA",
    description: "13 peptides scored, stacked, and explained. Protocol builder, sourcing guide, and clinic tools.",
    url: "https://kamuralife.com/peptides",
  },
  twitter: {
    card: "summary_large_image",
    title: "Peptide Intelligence Hub | KAMURA",
    description: "The most comprehensive peptide resource in the GCC.",
  },
};

const HUB_SECTIONS = [
  {
    href: "/peptides/directory",
    title: "Peptide Directory",
    description: "All 13 peptides scored on evidence, safety, and value. Filter by goal, compare, and explore.",
    icon: "\uD83D\uDCCA",
    tag: "Consumer",
  },
  {
    href: "/peptides/protocol-builder",
    title: "Protocol Builder",
    description: "Select your goals and get a recommended peptide stack with dosing, timing, and cycling.",
    icon: "\uD83D\uDCCB",
    tag: "Consumer",
  },
  {
    href: "/peptides/compare",
    title: "Compare Peptides",
    description: "Side-by-side comparison of any two peptides. Scores, evidence, protocols, and cost.",
    icon: "\u2696\uFE0F",
    tag: "Consumer",
  },
  {
    href: "/peptides/sourcing-guide",
    title: "Sourcing Guide",
    description: "Pharmaceutical vs research grade. UAE compounding pharmacies. What to ask your doctor.",
    icon: "\uD83D\uDD0D",
    tag: "Consumer",
  },
  {
    href: "/peptides/clinic-dashboard",
    title: "Clinic Dashboard",
    description: "Trending peptides, demand signals, and what patients are searching for right now.",
    icon: "\uD83C\uDFE5",
    tag: "For Clinics",
  },
  {
    href: "/peptides/evidence-feed",
    title: "Evidence Feed",
    description: "Latest studies, FDA updates, regulatory changes, and safety alerts for peptides.",
    icon: "\uD83D\uDCF0",
    tag: "For Clinics",
  },
  {
    href: "/peptides/protocol-templates",
    title: "Protocol Templates",
    description: "Pre-built, evidence-graded protocol stacks clinics can adopt and customize.",
    icon: "\uD83D\uDCC4",
    tag: "For Clinics",
  },
  {
    href: "/peptides/advisor",
    title: "Peptide Advisor",
    description: "Tell us your concern — get personalized peptide recommendations with evidence citations.",
    icon: "\uD83E\uDD16",
    tag: "AI-Powered",
  },
];

export default function PeptidesHubPage() {
  const topPeptides = [...peptides].sort((a, b) => b.kamuraScore - a.kamuraScore).slice(0, 6);

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
          itemListElement: peptides
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

      {/* Hero */}
      <section className="relative min-h-[55vh] flex items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1578496779937-3815e442abed?w=1920&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-forest/70 via-black/40 to-forest/60" />
        <div className="relative z-10 text-center px-6 py-16 md:py-24 max-w-4xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase mb-4 text-white/70 font-sans">
            KAMURA Intelligence
          </p>
          <h1 className="font-serif text-4xl md:text-[56px] font-bold leading-tight mb-5 text-white">
            Peptide Intelligence Hub
          </h1>
          <p className="text-base md:text-lg text-white/80 max-w-[640px] mx-auto leading-relaxed font-sans mb-8">
            {peptides.length} peptides scored on evidence, safety, and value. Protocol stacks,
            sourcing guides, clinic tools, and AI-powered recommendations — all in one place.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/peptides/directory"
              className="px-6 py-3 bg-white text-gray-900 text-sm font-semibold rounded-xl hover:bg-white/90 transition-colors font-sans"
            >
              Browse Directory
            </Link>
            <Link
              href="/peptides/protocol-builder"
              className="px-6 py-3 border border-white/50 text-white text-sm font-semibold rounded-xl hover:bg-white/10 transition-colors font-sans"
            >
              Build a Protocol
            </Link>
          </div>
          <div className="flex items-center justify-center gap-6 mt-8 text-sm text-white/60 font-sans">
            <span>{peptides.length} peptides</span>
            <span className="text-white/30">&bull;</span>
            <span>{PEPTIDE_STACKS.length} protocol stacks</span>
            <span className="text-white/30">&bull;</span>
            <span>10M+ monthly searches</span>
          </div>
        </div>
      </section>

      {/* Goal Quick Nav */}
      <section className="py-12 bg-[#EDE7DB]">
        <div className="max-w-6xl mx-auto px-6">
          <FadeInOnScroll>
            <p className="text-xs uppercase tracking-[0.2em] text-terracotta font-sans mb-3 text-center">
              Filter by Goal
            </p>
            <h2 className="font-serif text-2xl md:text-3xl text-gray-900 text-center mb-8">
              What Are You Optimizing For?
            </h2>
          </FadeInOnScroll>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {PEPTIDE_GOALS.map((goal) => (
              <Link
                key={goal.id}
                href={`/peptides/directory?goal=${goal.id}`}
                className="group p-4 rounded-2xl border border-gray-200/60 bg-white hover:border-terracotta/30 hover:shadow-md transition-all"
              >
                <span className="text-2xl block mb-2">{goal.icon}</span>
                <p className="font-sans text-sm font-semibold text-gray-900 group-hover:text-terracotta transition-colors">
                  {goal.label}
                </p>
                <p className="text-xs text-gray-500 font-sans mt-1 leading-relaxed">
                  {goal.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Top Peptides */}
      <section className="py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-6">
          <FadeInOnScroll>
            <p className="text-xs uppercase tracking-[0.2em] text-terracotta font-sans mb-3">
              Highest Rated
            </p>
            <h2 className="font-serif text-2xl md:text-3xl text-gray-900 mb-8">
              Top Peptides by Kamura Score
            </h2>
          </FadeInOnScroll>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {topPeptides.map((p) => {
              const tier = getScoreTier(p.kamuraScore);
              const tierColor = getScoreTierColor(tier);
              return (
                <Link
                  key={p.slug}
                  href={`/treatments/${p.slug}`}
                  className="group p-5 rounded-2xl border border-gray-200 bg-white hover:border-sage/40 hover:shadow-lg transition-all"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-serif text-lg text-gray-900 group-hover:text-terracotta transition-colors">
                        {p.name}
                      </h3>
                      <p className="text-xs text-gray-400 font-sans mt-0.5">
                        {p.evidenceLevel} evidence
                      </p>
                    </div>
                    <KamuraScoreBadge score={p.kamuraScore} size="sm" />
                  </div>
                  <p className="text-sm text-gray-600 font-sans leading-relaxed line-clamp-2 mb-3">
                    {p.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {p.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] px-2 py-0.5 rounded-full bg-gray-100 text-gray-500 font-sans"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  {p.uaeAvailable && (
                    <span className="inline-block mt-3 text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-sans font-medium">
                      Available in UAE
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
          <div className="text-center mt-8">
            <Link
              href="/peptides/directory"
              className="inline-flex items-center gap-1.5 text-sm font-sans text-terracotta hover:underline underline-offset-4"
            >
              See all {peptides.length} peptides &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Hub Navigation Cards */}
      <section className="py-16 md:py-20 bg-[#EDE7DB]">
        <div className="max-w-6xl mx-auto px-6">
          <FadeInOnScroll>
            <p className="text-xs uppercase tracking-[0.2em] text-terracotta font-sans mb-3 text-center">
              Explore the Hub
            </p>
            <h2 className="font-serif text-2xl md:text-3xl text-gray-900 text-center mb-10">
              Everything You Need for Peptide Therapy
            </h2>
          </FadeInOnScroll>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {HUB_SECTIONS.map((section) => (
              <Link
                key={section.href}
                href={section.href}
                className="group p-5 rounded-2xl border border-gray-200/60 bg-white hover:border-terracotta/30 hover:shadow-lg transition-all flex flex-col"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl">{section.icon}</span>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-sans font-medium ${
                      section.tag === "For Clinics"
                        ? "bg-blue-50 text-blue-700"
                        : section.tag === "AI-Powered"
                        ? "bg-purple-50 text-purple-700"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {section.tag}
                  </span>
                </div>
                <h3 className="font-serif text-base text-gray-900 mb-1.5 group-hover:text-terracotta transition-colors">
                  {section.title}
                </h3>
                <p className="text-xs text-gray-500 font-sans leading-relaxed flex-1">
                  {section.description}
                </p>
                <span className="inline-flex items-center gap-1 mt-3 text-xs text-terracotta font-sans group-hover:underline">
                  Explore
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:translate-x-0.5 transition-transform">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Peptides Preview */}
      <section className="py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-6">
          <FadeInOnScroll>
            <p className="text-xs uppercase tracking-[0.2em] text-terracotta font-sans mb-3">
              Market Intelligence
            </p>
            <h2 className="font-serif text-2xl md:text-3xl text-gray-900 mb-2">
              Trending Right Now
            </h2>
            <p className="text-sm text-gray-500 font-sans mb-8">
              Real-time search demand data for peptides globally.
            </p>
          </FadeInOnScroll>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {PEPTIDE_TRENDS.slice(0, 6).map((trend) => {
              const p = peptides.find((pt) => pt.slug === trend.slug);
              if (!p) return null;
              return (
                <Link
                  key={trend.slug}
                  href={`/treatments/${trend.slug}`}
                  className="group flex items-center gap-4 p-4 rounded-2xl border border-gray-200 bg-white hover:border-sage/40 hover:shadow-sm transition-all"
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-sans text-sm font-semibold text-gray-900 group-hover:text-terracotta transition-colors">
                      {p.name}
                    </p>
                    <p className="text-xs text-gray-400 font-sans mt-0.5">
                      {trend.monthlySearches}/mo &middot;{" "}
                      <span className="text-emerald-600">{trend.growthYoY} YoY</span>
                    </p>
                  </div>
                  <KamuraScoreBadge score={p.kamuraScore} size="sm" />
                </Link>
              );
            })}
          </div>
          <div className="text-center mt-6">
            <Link
              href="/peptides/clinic-dashboard"
              className="inline-flex items-center gap-1.5 text-sm font-sans text-terracotta hover:underline underline-offset-4"
            >
              Full clinic dashboard &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-gray-200 bg-[#EDE7DB]">
        <div className="max-w-6xl mx-auto px-6 py-16 text-center">
          <h2 className="font-serif text-2xl md:text-3xl text-gray-900 mb-3">
            Not Sure Where to Start?
          </h2>
          <p className="text-sm text-gray-500 font-sans mb-6 max-w-[500px] mx-auto">
            Take the Wellness Checker to get personalized peptide recommendations
            based on your specific health concerns and goals.
          </p>
          <Link
            href="/wellness-checker"
            className="inline-block px-6 py-3 bg-[#B5736A] hover:bg-[#9A5F57] text-white text-sm font-semibold rounded-xl transition-colors font-sans"
          >
            Start Wellness Checker &rarr;
          </Link>
        </div>
      </section>
    </>
  );
}
