import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  treatments,
  getTreatmentBySlug,
  getScoreTier,
  getScoreTierColor,
  getScoreColor,
} from "@/data/treatments";
import { listings } from "@/data/listings";
import KamuraScoreBadge from "@/components/treatments/KamuraScoreBadge";
import EvidenceLevelTag from "@/components/treatments/EvidenceLevelTag";
import ScoreBreakdownPanel from "@/components/treatments/ScoreBreakdownPanel";
import OutcomeCard from "@/components/treatments/OutcomeCard";
import CommunityQuote from "@/components/treatments/CommunityQuote";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return treatments.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const t = getTreatmentBySlug(slug);
  if (!t) return {};

  const tier = getScoreTier(t.kamuraScore);
  return {
    title: `${t.name} — Kamura Score: ${t.kamuraScore} (${tier})`,
    description: `${t.description} Evidence level: ${t.evidenceLevel}. ${t.communityReports}+ community reports.`,
    openGraph: {
      title: `${t.name} | Kamura Score: ${t.kamuraScore} | KAMURA`,
      description: t.description,
      url: `https://kamuralife.com/treatments/${slug}`,
      images: [
        {
          url: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&h=630&fit=crop",
          width: 1200,
          height: 630,
          alt: `${t.name} — KAMURA Treatment Index`,
        },
      ],
    },
  };
}

export default async function TreatmentDetailPage({ params }: Props) {
  const { slug } = await params;
  const t = getTreatmentBySlug(slug);

  if (!t) notFound();

  const tier = getScoreTier(t.kamuraScore);
  const tierColors = getScoreTierColor(tier);

  // Find related treatments
  const related = t.relatedSlugs
    .map((s) => getTreatmentBySlug(s))
    .filter(Boolean)
    .slice(0, 4);

  // Find UAE clinics that might offer this treatment
  const treatmentKeywords = [t.name.toLowerCase(), ...t.tags.map((tag) => tag.toLowerCase())];
  const relevantListings = listings
    .filter((l) =>
      l.services.some((s) =>
        treatmentKeywords.some((kw) => s.toLowerCase().includes(kw))
      )
    )
    .slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalEntity",
        name: t.name,
        alternateName: t.fullName,
        description: t.description,
        url: `https://kamuralife.com/treatments/${slug}`,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://kamuralife.com" },
          { "@type": "ListItem", position: 2, name: "Treatments", item: "https://kamuralife.com/treatments" },
          { "@type": "ListItem", position: 3, name: t.name },
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

      <article className="pt-24 pb-16 zen-pattern">
        {/* Breadcrumb */}
        <nav className="max-w-[1200px] mx-auto px-6 mb-8">
          <div className="flex items-center gap-2 text-sm text-gray-400 dark:text-[#6B6560] font-sans">
            <Link href="/" className="hover:text-kamura-gold transition-colors">Home</Link>
            <span>/</span>
            <Link href="/treatments" className="hover:text-kamura-gold transition-colors">Treatments</Link>
            <span>/</span>
            <span className="text-gray-600 dark:text-[#A89F95]">{t.name}</span>
          </div>
        </nav>

        {/* Header Block */}
        <section className="max-w-[1200px] mx-auto px-6 mb-0">
          <div className="bg-white dark:bg-[#1A1A1A] border border-gray-200 dark:border-white/[0.06] rounded-2xl overflow-hidden">
            <div className="p-8 md:p-10 flex flex-col md:flex-row gap-6 md:gap-8 border-b border-gray-200 dark:border-white/[0.06]">
              {/* Score Circle */}
              <div className="flex md:flex-col items-center gap-4 md:gap-2 md:min-w-[120px]">
                <KamuraScoreBadge score={t.kamuraScore} size="lg" showLabel />
              </div>

              {/* Meta */}
              <div className="flex-1">
                <p className="text-xs text-kamura-gold uppercase tracking-wider font-semibold font-sans mb-1">
                  {t.category}
                </p>
                <h1 className="font-serif text-3xl md:text-[32px] text-gray-900 dark:text-[#F5F0EB] mb-1">
                  {t.fullName !== t.name ? `${t.name} (${t.fullName})` : t.name}
                </h1>
                <p className="text-gray-500 dark:text-[#A89F95] text-[15px] leading-relaxed font-sans max-w-[600px] mb-4">
                  {t.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1.5 rounded-full text-xs font-semibold border bg-score-green/12 text-score-green border-score-green/20 font-sans">
                    {t.communityReports}+ Community Reports
                  </span>
                  <span className="px-3 py-1.5 rounded-full text-xs font-semibold border bg-score-blue/12 text-score-blue border-score-blue/20 font-sans">
                    {t.studyCount}+ Studies
                  </span>
                  <span className="px-3 py-1.5 rounded-full text-xs font-semibold border bg-score-purple/12 text-score-purple border-score-purple/20 font-sans">
                    {t.administrationRoutes.join(" + ")}
                  </span>
                  {t.uaeAvailable && (
                    <span className="px-3 py-1.5 rounded-full text-xs font-semibold border bg-score-yellow/12 text-score-yellow border-score-yellow/20 font-sans">
                      Available in UAE
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Score Breakdown */}
            <ScoreBreakdownPanel scores={t.scores} />

            {/* Evidence by Outcome */}
            <section className="p-8 md:p-10 border-b border-gray-200 dark:border-white/[0.06]">
              <h2 className="font-serif text-xl text-gray-900 dark:text-[#F5F0EB] mb-5 flex items-center gap-2.5">
                <span className="text-lg">📊</span> Evidence by Outcome
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {t.outcomes.map((outcome) => (
                  <OutcomeCard key={outcome.name} outcome={outcome} />
                ))}
              </div>
            </section>

            {/* Community Insights */}
            <section className="p-8 md:p-10 border-b border-gray-200 dark:border-white/[0.06]">
              <h2 className="font-serif text-xl text-gray-900 dark:text-[#F5F0EB] mb-5 flex items-center gap-2.5">
                <span className="text-lg">👥</span> Community Insights
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {[
                  { value: `${t.community.totalReports}+`, label: "Reports" },
                  { value: `${t.community.positivePercent}%`, label: "Positive" },
                  { value: t.community.satisfaction, label: "Satisfaction" },
                  { value: t.community.timeToEffect, label: "Time to Effect" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="bg-gray-50 dark:bg-[#242424] border border-gray-200 dark:border-white/[0.06] rounded-xl p-4 text-center"
                  >
                    <div className="text-2xl font-bold text-kamura-gold font-sans">{stat.value}</div>
                    <div className="text-[11px] text-gray-400 dark:text-[#6B6560] uppercase tracking-wider font-semibold font-sans mt-1">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
              <div className="grid md:grid-cols-2 gap-3">
                {t.community.quotes.map((quote, i) => (
                  <CommunityQuote key={i} quote={quote} />
                ))}
              </div>
            </section>

            {/* Protocol Snapshot */}
            <section className="p-8 md:p-10">
              <h2 className="font-serif text-xl text-gray-900 dark:text-[#F5F0EB] mb-5 flex items-center gap-2.5">
                <span className="text-lg">📋</span> Protocol Snapshot
              </h2>
              <div className="grid md:grid-cols-3 gap-4 mb-4">
                {t.protocols.map((protocol) => (
                  <div
                    key={protocol.label}
                    className="bg-gray-50 dark:bg-[#242424] border border-gray-200 dark:border-white/[0.06] rounded-xl p-4"
                  >
                    <div className="text-[11px] text-gray-400 dark:text-[#6B6560] uppercase tracking-wider font-semibold font-sans mb-1.5">
                      {protocol.label}
                    </div>
                    <div className="text-[15px] font-semibold text-gray-900 dark:text-[#F5F0EB] font-sans">
                      {protocol.dosage}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-[#A89F95] font-sans mt-1">
                      {protocol.notes}
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-400 dark:text-[#6B6560] font-sans italic">
                Protocols are for informational purposes only. Always consult a qualified healthcare provider
                before starting any treatment protocol.
              </p>
            </section>
          </div>
        </section>

        {/* Where to Get It */}
        {relevantListings.length > 0 && (
          <section className="max-w-[1200px] mx-auto px-6 mt-10">
            <h2 className="font-serif text-xl text-gray-900 dark:text-[#F5F0EB] mb-5">
              Where to Get It (UAE)
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              {relevantListings.map((listing) => (
                <Link
                  key={listing.id}
                  href={`/explore/${listing.id}`}
                  className="bg-white dark:bg-[#1A1A1A] border border-gray-200 dark:border-white/[0.06] rounded-xl p-4 hover:border-kamura-gold/30 transition-all"
                >
                  <div className="font-semibold text-sm text-gray-900 dark:text-[#F5F0EB] font-sans">
                    {listing.name}
                  </div>
                  <div className="text-xs text-gray-400 dark:text-[#6B6560] font-sans mt-1">
                    {listing.location}, {listing.city}
                  </div>
                  <div className="text-xs text-kamura-gold font-sans mt-2">
                    View details &rarr;
                  </div>
                </Link>
              ))}
            </div>
            <Link
              href="/explore"
              className="inline-block mt-4 text-sm text-kamura-gold hover:text-kamura-gold/80 transition-colors font-sans"
            >
              Browse all wellness centers &rarr;
            </Link>
          </section>
        )}

        {/* Related Treatments */}
        {related.length > 0 && (
          <section className="max-w-[1200px] mx-auto px-6 mt-10">
            <h2 className="font-serif text-xl text-gray-900 dark:text-[#F5F0EB] mb-5">
              Related Treatments
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {related.map((r) => r && (
                <Link
                  key={r.slug}
                  href={`/treatments/${r.slug}`}
                  className="bg-white dark:bg-[#1A1A1A] border border-gray-200 dark:border-white/[0.06] rounded-xl p-4 hover:border-kamura-gold/30 transition-all text-center"
                >
                  <span className="text-2xl block mb-2">{r.icon}</span>
                  <KamuraScoreBadge score={r.kamuraScore} size="sm" />
                  <div className="font-semibold text-sm text-gray-900 dark:text-[#F5F0EB] font-sans mt-2">
                    {r.name}
                  </div>
                  <div className="text-[11px] text-gray-400 dark:text-[#6B6560] uppercase tracking-wide font-sans mt-0.5">
                    {r.category}
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Medical Disclaimer */}
        <section className="max-w-[1200px] mx-auto px-6 mt-12">
          <div className="border border-gray-200 dark:border-white/[0.06] rounded-xl p-6 bg-zen-mist/50 dark:bg-[#1A1A1A]">
            <p className="text-xs text-gray-400 dark:text-[#6B6560] font-sans leading-relaxed">
              <strong className="text-gray-500 dark:text-[#A89F95]">Medical Disclaimer:</strong> The
              information on this page is for educational purposes only and is not intended as medical advice.
              Kamura Scores reflect a combination of research evidence, community data, and other factors — they
              are not clinical recommendations. Always consult a qualified healthcare provider before starting,
              stopping, or modifying any treatment. Individual results may vary.
            </p>
          </div>
        </section>

        {/* Back link */}
        <div className="max-w-[1200px] mx-auto px-6 mt-8 text-center">
          <Link
            href="/treatments"
            className="text-sm text-gray-600 dark:text-gray-400 underline underline-offset-4 hover:text-kamura-gold transition-colors font-sans"
          >
            &larr; Back to Treatment Index
          </Link>
        </div>
      </article>
    </>
  );
}
