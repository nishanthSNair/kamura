import type { Metadata } from "next";
import Link from "next/link";
import {
  peptides,
  PEPTIDE_TRENDS,
  PEPTIDE_GOALS,
  PEPTIDE_STACKS,
  EVIDENCE_FEED,
  getPeptideBySlug,
} from "@/data/peptides";
import KamuraScoreBadge from "@/components/treatments/KamuraScoreBadge";

export const metadata: Metadata = {
  title: "Clinic Dashboard — Peptide Demand Data & Trends | KAMURA",
  description:
    "Real-time peptide clinic dashboard with trending search data, demand by goal, and evidence updates. Built for healthcare providers offering peptide therapy.",
  keywords: [
    "peptide clinic dashboard",
    "peptide demand data",
    "peptide trends",
    "peptide therapy clinic",
    "peptide search volume",
    "peptide evidence updates",
  ],
  alternates: { canonical: "https://kamuralife.com/peptides/clinic-dashboard" },
  openGraph: {
    title: "Clinic Dashboard | KAMURA Peptide Intelligence",
    description:
      "Real-time peptide intelligence for healthcare providers. Trending peptides, demand signals, and evidence updates.",
    url: "https://kamuralife.com/peptides/clinic-dashboard",
  },
  twitter: {
    card: "summary_large_image",
    title: "Peptide Clinic Dashboard | KAMURA",
    description:
      "Real-time peptide demand data and evidence updates for clinics.",
  },
};

function parseSearchVolume(v: string): number {
  const cleaned = v.replace(/,/g, "");
  if (cleaned.endsWith("K")) return parseFloat(cleaned) * 1000;
  if (cleaned.endsWith("M")) return parseFloat(cleaned) * 1000000;
  return parseFloat(cleaned);
}

function typeBadge(type: string) {
  const styles: Record<string, string> = {
    regulatory: "bg-blue-50 text-blue-700",
    study: "bg-emerald-50 text-emerald-700",
    safety: "bg-red-50 text-red-700",
    market: "bg-amber-50 text-amber-700",
  };
  return (
    <span
      className={`text-[10px] px-2 py-0.5 rounded-full font-sans font-medium capitalize ${styles[type] || "bg-gray-100 text-gray-600"}`}
    >
      {type}
    </span>
  );
}

export default function ClinicDashboardPage() {
  const totalSearches = PEPTIDE_TRENDS.reduce(
    (sum, t) => sum + parseSearchVolume(t.monthlySearches),
    0
  );

  const totalSearchesFormatted =
    totalSearches >= 1000000
      ? `${(totalSearches / 1000000).toFixed(1)}M`
      : `${(totalSearches / 1000).toFixed(0)}K`;

  const latestEvidence = [...EVIDENCE_FEED]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 3);

  // Compute goal search volumes for bar chart
  const goalVolumes = PEPTIDE_GOALS.map((goal) => {
    const volume = goal.slugs.reduce((sum, slug) => {
      const trend = PEPTIDE_TRENDS.find((t) => t.slug === slug);
      return sum + (trend ? parseSearchVolume(trend.monthlySearches) : 0);
    }, 0);
    return { ...goal, volume };
  }).sort((a, b) => b.volume - a.volume);

  const maxVolume = goalVolumes[0]?.volume || 1;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: "Kamura Clinic Dashboard",
        url: "https://kamuralife.com/peptides/clinic-dashboard",
        applicationCategory: "HealthApplication",
        operatingSystem: "Any",
        description:
          "Real-time peptide demand data, search trends, and evidence updates for healthcare providers offering peptide therapy.",
        audience: { "@type": "MedicalAudience", audienceType: "Clinician" },
        publisher: { "@type": "Organization", name: "KAMURA", url: "https://kamuralife.com" },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://kamuralife.com" },
          { "@type": "ListItem", position: 2, name: "Peptides", item: "https://kamuralife.com/peptides" },
          { "@type": "ListItem", position: 3, name: "Clinic Dashboard" },
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
      <section className="relative min-h-[40vh] flex items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1920&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-forest/70 via-black/40 to-forest/60" />
        <div className="relative z-10 text-center px-6 py-16 md:py-20 max-w-4xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase mb-4 text-white/70 font-sans">
            For Healthcare Providers
          </p>
          <h1 className="font-serif text-4xl md:text-[52px] font-bold leading-tight mb-4 text-white">
            Clinic Dashboard
          </h1>
          <p className="text-base md:text-lg text-white/80 max-w-[560px] mx-auto leading-relaxed font-sans">
            Real-time peptide intelligence for healthcare providers
          </p>
        </div>
      </section>

      {/* Key Stats */}
      <section className="bg-[#EDE7DB] border-b border-gray-200/60">
        <div className="max-w-6xl mx-auto px-6 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              {
                label: "Total Peptides",
                value: peptides.length.toString(),
                sub: "Scored & analyzed",
              },
              {
                label: "Monthly Searches",
                value: totalSearchesFormatted,
                sub: "Global search volume",
              },
              {
                label: "Protocol Stacks",
                value: PEPTIDE_STACKS.length.toString(),
                sub: "Pre-built templates",
              },
              {
                label: "Evidence Updates",
                value: EVIDENCE_FEED.length.toString(),
                sub: "Recent studies & alerts",
              },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-white rounded-2xl p-5 border border-gray-200/60"
              >
                <p className="text-2xl md:text-3xl font-bold font-serif text-gray-900">
                  {stat.value}
                </p>
                <p className="text-sm font-sans font-semibold text-gray-700 mt-1">
                  {stat.label}
                </p>
                <p className="text-xs text-gray-400 font-sans mt-0.5">
                  {stat.sub}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Peptides Table */}
      <section className="py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-xs uppercase tracking-[0.2em] text-terracotta font-sans mb-3">
            Search Demand
          </p>
          <h2 className="font-serif text-2xl md:text-3xl text-gray-900 mb-2">
            Trending Peptides
          </h2>
          <p className="text-sm text-gray-500 font-sans mb-8">
            Ranked by monthly search volume with year-over-year growth data.
          </p>

          <div className="overflow-x-auto rounded-2xl border border-gray-200">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50 text-xs font-sans text-gray-500 uppercase tracking-wider">
                  <th className="px-4 py-3">#</th>
                  <th className="px-4 py-3">Peptide</th>
                  <th className="px-4 py-3 text-right">Monthly Searches</th>
                  <th className="px-4 py-3 text-right">YoY Growth</th>
                  <th className="px-4 py-3 text-center">Kamura Score</th>
                  <th className="px-4 py-3">Top Patient Question</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {PEPTIDE_TRENDS.map((trend, i) => {
                  const p = getPeptideBySlug(trend.slug);
                  if (!p) return null;
                  return (
                    <tr
                      key={trend.slug}
                      className="hover:bg-gray-50/50 transition-colors"
                    >
                      <td className="px-4 py-3 text-sm text-gray-400 font-sans">
                        {i + 1}
                      </td>
                      <td className="px-4 py-3">
                        <Link
                          href={`/treatments/${p.slug}`}
                          className="font-sans text-sm font-semibold text-gray-900 hover:text-terracotta transition-colors"
                        >
                          {p.name}
                        </Link>
                      </td>
                      <td className="px-4 py-3 text-right text-sm font-sans text-gray-700">
                        {trend.monthlySearches}
                      </td>
                      <td className="px-4 py-3 text-right text-sm font-sans font-semibold text-emerald-600">
                        {trend.growthYoY}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex justify-center">
                          <KamuraScoreBadge score={p.kamuraScore} size="sm" />
                        </div>
                      </td>
                      <td className="px-4 py-3 text-xs text-gray-500 font-sans max-w-[260px]">
                        {trend.topPatientQuestion}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Demand by Goal */}
      <section className="py-16 md:py-20 bg-[#EDE7DB]">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-xs uppercase tracking-[0.2em] text-terracotta font-sans mb-3">
            Demand Breakdown
          </p>
          <h2 className="font-serif text-2xl md:text-3xl text-gray-900 mb-2">
            Search Volume by Goal
          </h2>
          <p className="text-sm text-gray-500 font-sans mb-8">
            Aggregate monthly search volume for peptides in each goal category.
          </p>

          <div className="space-y-4">
            {goalVolumes.map((goal) => {
              const pct = Math.round((goal.volume / maxVolume) * 100);
              const formatted =
                goal.volume >= 1000
                  ? `${(goal.volume / 1000).toFixed(0)}K`
                  : goal.volume.toString();
              return (
                <div key={goal.id} className="bg-white rounded-2xl p-4 border border-gray-200/60">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{goal.icon}</span>
                      <span className="font-sans text-sm font-semibold text-gray-900">
                        {goal.label}
                      </span>
                    </div>
                    <span className="font-sans text-sm font-bold text-gray-700">
                      {formatted}/mo
                    </span>
                  </div>
                  <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full bg-[#B5736A] transition-all"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Recent Evidence Updates */}
      <section className="py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-xs uppercase tracking-[0.2em] text-terracotta font-sans mb-3">
            Latest Intelligence
          </p>
          <h2 className="font-serif text-2xl md:text-3xl text-gray-900 mb-2">
            Recent Evidence Updates
          </h2>
          <p className="text-sm text-gray-500 font-sans mb-8">
            Studies, regulatory changes, and safety alerts.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {latestEvidence.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl p-5 border border-gray-200 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-3">
                  <time className="text-xs text-gray-400 font-sans">
                    {new Date(item.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </time>
                  {typeBadge(item.type)}
                </div>
                <h3 className="font-serif text-base text-gray-900 mb-2 leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-500 font-sans leading-relaxed line-clamp-3">
                  {item.summary}
                </p>
                {item.source && (
                  <p className="text-[10px] text-gray-400 font-sans mt-3">
                    Source: {item.source}
                  </p>
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              href="/peptides/evidence-feed"
              className="inline-flex items-center gap-1.5 text-sm font-sans text-terracotta hover:underline underline-offset-4"
            >
              View all evidence updates &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Links */}
      <section className="border-t border-gray-200 bg-[#EDE7DB]">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
            <Link
              href="/peptides/protocol-templates"
              className="group p-6 rounded-2xl border border-gray-200/60 bg-white hover:border-terracotta/30 hover:shadow-lg transition-all text-center"
            >
              <span className="text-3xl block mb-3">📄</span>
              <h3 className="font-serif text-lg text-gray-900 group-hover:text-terracotta transition-colors mb-1">
                Protocol Templates
              </h3>
              <p className="text-xs text-gray-500 font-sans">
                Pre-built, evidence-graded protocol stacks for your clinic
              </p>
            </Link>
            <Link
              href="/peptides/evidence-feed"
              className="group p-6 rounded-2xl border border-gray-200/60 bg-white hover:border-terracotta/30 hover:shadow-lg transition-all text-center"
            >
              <span className="text-3xl block mb-3">📰</span>
              <h3 className="font-serif text-lg text-gray-900 group-hover:text-terracotta transition-colors mb-1">
                Evidence Feed
              </h3>
              <p className="text-xs text-gray-500 font-sans">
                Full timeline of studies, regulatory changes, and safety alerts
              </p>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
