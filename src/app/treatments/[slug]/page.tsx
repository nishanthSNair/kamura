import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  treatments,
  getTreatmentBySlug,
  getScoreTier,
  getScoreTierColor,
} from "@/data/treatments";
import { listings } from "@/data/listings";
import { categoryNameToSlug } from "@/data/treatment-categories";
import KamuraScoreBadge from "@/components/treatments/KamuraScoreBadge";
import EvidenceLevelTag from "@/components/treatments/EvidenceLevelTag";
import ScoreBreakdownPanel from "@/components/treatments/ScoreBreakdownPanel";
import OutcomeCard from "@/components/treatments/OutcomeCard";
import StudyCitation from "@/components/treatments/StudyCitation";
import ShareButtons from "@/components/ShareButtons";
import SectionNav from "@/components/treatments/SectionNav";
import AtAGlanceStrip from "@/components/treatments/AtAGlanceStrip";
import MechanismSection from "@/components/treatments/MechanismSection";
import SideEffectsPanel from "@/components/treatments/SideEffectsPanel";
import InteractionsPanel from "@/components/treatments/InteractionsPanel";
import CostGuide from "@/components/treatments/CostGuide";
import FAQAccordion from "@/components/treatments/FAQAccordion";

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
    description: `${t.description} Evidence level: ${t.evidenceLevel}. ${t.communityReports}+ community reports. ${t.keyStudies.length} key studies cited.`,
    openGraph: {
      title: `${t.name} | Kamura Score: ${t.kamuraScore} | KAMURA`,
      description: t.description,
      url: `https://kamuralife.com/treatments/${slug}`,
      images: [
        {
          url: t.imageUrl.replace("w=800&h=500", "w=1200&h=630"),
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

  // Build dynamic section nav based on available data
  const sections: { id: string; label: string }[] = [
    { id: "score", label: "Score" },
    ...(t.mechanism ? [{ id: "mechanism", label: "How It Works" }] : []),
    { id: "evidence", label: "Evidence" },
    ...(t.keyStudies.length > 0 ? [{ id: "research", label: "Research" }] : []),
    ...(t.sideEffects ? [{ id: "safety", label: "Safety" }] : []),
    ...(t.interactions || t.contraindications?.length ? [{ id: "interactions", label: "Interactions" }] : []),
    { id: "protocol", label: "Protocol" },
    ...(t.costEstimate ? [{ id: "cost", label: "Cost" }] : []),
    ...(t.faq?.length ? [{ id: "faq", label: "FAQ" }] : []),
    ...(relevantListings.length > 0 ? [{ id: "locations", label: "Locations" }] : []),
    ...(related.length > 0 ? [{ id: "related", label: "Related" }] : []),
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalEntity",
        name: t.name,
        alternateName: t.fullName,
        description: t.description,
        url: `https://kamuralife.com/treatments/${slug}`,
        ...(t.lastUpdated && { dateModified: t.lastUpdated }),
        relevantSpecialty: {
          "@type": "MedicalSpecialty",
          name: t.category,
        },
        study: t.keyStudies.slice(0, 3).map((s) => ({
          "@type": "MedicalStudy",
          name: s.title,
          author: s.authors,
          datePublished: String(s.year),
          description: s.finding,
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://kamuralife.com" },
          { "@type": "ListItem", position: 2, name: "Treatments", item: "https://kamuralife.com/treatments" },
          { "@type": "ListItem", position: 3, name: t.category, item: `https://kamuralife.com/treatments/category/${categoryNameToSlug(t.category)}` },
          { "@type": "ListItem", position: 4, name: t.name },
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

      {/* Sticky sidebar share — desktop */}
      <ShareButtons
        url={`https://kamuralife.com/treatments/${t.slug}`}
        title={`${t.name} — Kamura Score: ${t.kamuraScore}`}
        description={t.description}
        variant="sidebar"
      />

      <article className="zen-pattern">
        {/* Hero Banner */}
        <section className="relative min-h-[50vh] flex items-end">
          <div className="absolute inset-0">
            <Image
              src={t.imageUrl.replace("w=800&h=500", "w=1920&h=900")}
              alt={t.name}
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#14110E]/90 via-[#14110E]/40 to-forest/30" />

          <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 pb-10 pt-32">
            {/* Breadcrumb */}
            <nav className="mb-6">
              <div className="flex items-center gap-2 text-sm text-white/60 font-sans">
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
                <span>/</span>
                <Link href="/treatments" className="hover:text-white transition-colors">Treatments</Link>
                <span>/</span>
                <span className="text-white/90">{t.name}</span>
              </div>
            </nav>

            <div className="flex flex-col md:flex-row md:items-end gap-6 md:gap-8">
              {/* Treatment Info */}
              <div className="flex-1">
                <span className="inline-block px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-xs font-semibold text-white/90 uppercase tracking-wider font-sans mb-3">
                  {t.category}
                </span>
                <h1 className="font-serif text-3xl md:text-[44px] text-white leading-tight mb-3">
                  {t.fullName !== t.name ? `${t.name}` : t.name}
                </h1>
                {t.fullName !== t.name && (
                  <p className="text-white/60 text-sm font-sans mb-3">{t.fullName}</p>
                )}
                <p className="text-white/75 text-[15px] leading-relaxed font-sans max-w-[600px] mb-5">
                  {t.description}
                </p>

                {/* Quick Stats */}
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1.5 rounded-full text-xs font-semibold bg-white/10 backdrop-blur-sm border border-white/15 text-white/90 font-sans">
                    {t.studyCount}+ Studies
                  </span>
                  <span className="px-3 py-1.5 rounded-full text-xs font-semibold bg-white/10 backdrop-blur-sm border border-white/15 text-white/90 font-sans">
                    {t.communityReports}+ Reports
                  </span>
                  <EvidenceLevelTag level={t.evidenceLevel} />
                  <span className="px-3 py-1.5 rounded-full text-xs font-semibold bg-white/10 backdrop-blur-sm border border-white/15 text-white/90 font-sans">
                    {t.administrationRoutes.join(" + ")}
                  </span>
                  {t.uaeAvailable && (
                    <span className="px-3 py-1.5 rounded-full text-xs font-semibold bg-score-green/20 border border-score-green/30 text-score-green font-sans">
                      Available in UAE
                    </span>
                  )}
                </div>
              </div>

              {/* Score Badge */}
              <div className="md:pb-2">
                <KamuraScoreBadge score={t.kamuraScore} size="lg" showLabel />
              </div>
            </div>
          </div>
        </section>

        {/* At a Glance Strip */}
        <AtAGlanceStrip
          score={t.kamuraScore}
          evidenceLevel={t.evidenceLevel}
          costEstimate={t.costEstimate}
          timeToEffect={t.community.timeToEffect}
          uaeAvailable={t.uaeAvailable}
          lastUpdated={t.lastUpdated}
        />

        {/* Share — mobile only */}
        <div className="max-w-[1200px] mx-auto px-6 mt-6 lg:hidden">
          <ShareButtons
            url={`https://kamuralife.com/treatments/${t.slug}`}
            title={`${t.name} — Kamura Score: ${t.kamuraScore}`}
            description={t.description}
            variant="inline"
          />
        </div>

        {/* Two-column layout: SectionNav + Content */}
        <div className="max-w-[1200px] mx-auto px-6 mt-10 grid grid-cols-1 lg:grid-cols-[180px_1fr] gap-8 lg:gap-12">
          {/* Left: Sticky Section Nav (desktop only) */}
          <SectionNav sections={sections} />

          {/* Right: Main Content */}
          <div className="space-y-10">
            {/* Score Breakdown */}
            <section id="score" className="scroll-mt-24">
              <div className="bg-white dark:bg-[#1C1815] border border-gray-200 dark:border-white/[0.06] rounded-2xl overflow-hidden">
                <ScoreBreakdownPanel scores={t.scores} />
              </div>
            </section>

            {/* How It Works */}
            <MechanismSection mechanism={t.mechanism} name={t.name} />

            {/* Evidence by Outcome */}
            <section id="evidence" className="scroll-mt-24">
              <div className="bg-white dark:bg-[#1C1815] border border-gray-200 dark:border-white/[0.06] rounded-2xl p-8 md:p-10">
                <h2 className="font-serif text-xl text-gray-900 dark:text-[#F0EBE2] mb-5 flex items-center gap-2.5">
                  <span className="text-lg">📊</span> Evidence by Outcome
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {t.outcomes.map((outcome) => (
                    <OutcomeCard key={outcome.name} outcome={outcome} />
                  ))}
                </div>
              </div>
            </section>

            {/* Key Research */}
            {t.keyStudies.length > 0 && (
              <section id="research" className="scroll-mt-24">
                <div className="bg-white dark:bg-[#1C1815] border border-gray-200 dark:border-white/[0.06] rounded-2xl p-8 md:p-10">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-lg">📄</span>
                    <h2 className="font-serif text-xl text-gray-900 dark:text-[#F0EBE2]">
                      Key Research
                    </h2>
                  </div>
                  <p className="text-xs text-moss dark:text-sage uppercase tracking-wider font-semibold font-sans mb-6">
                    Peer-Reviewed Evidence &bull; {t.keyStudies.length} Citations
                  </p>

                  <div className="space-y-6">
                    {t.keyStudies.map((study, i) => (
                      <StudyCitation key={i} study={study} index={i + 1} />
                    ))}
                  </div>

                  <div className="mt-6 pt-4 border-t border-gray-200 dark:border-white/[0.06]">
                    <p className="text-[11px] text-gray-400 dark:text-[#6B6358] font-sans italic">
                      Citations sourced from PubMed, Cochrane Library, and peer-reviewed journals. Study findings are summarized for accessibility.
                      Always consult the original publication for full methodology and results.
                    </p>
                  </div>
                </div>
              </section>
            )}

            {/* Side Effects & Safety */}
            <SideEffectsPanel sideEffects={t.sideEffects} />

            {/* Interactions & Contraindications */}
            <InteractionsPanel interactions={t.interactions} contraindications={t.contraindications} />

            {/* Protocol Snapshot */}
            <section id="protocol" className="scroll-mt-24">
              <div className="bg-white dark:bg-[#1C1815] border border-gray-200 dark:border-white/[0.06] rounded-2xl p-8 md:p-10">
                <h2 className="font-serif text-xl text-gray-900 dark:text-[#F0EBE2] mb-5 flex items-center gap-2.5">
                  <span className="text-lg">📋</span> Protocol Snapshot
                </h2>
                <div className="grid md:grid-cols-3 gap-4 mb-4">
                  {t.protocols.map((protocol) => (
                    <div
                      key={protocol.label}
                      className="bg-zen-mist/50 dark:bg-forest/10 border border-sage-light/60 dark:border-forest/20 rounded-xl p-4"
                    >
                      <div className="text-[11px] text-gray-400 dark:text-[#6B6358] uppercase tracking-wider font-semibold font-sans mb-1.5">
                        {protocol.label}
                      </div>
                      <div className="text-[15px] font-semibold text-gray-900 dark:text-[#F0EBE2] font-sans">
                        {protocol.dosage}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-[#A89F90] font-sans mt-1">
                        {protocol.notes}
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-400 dark:text-[#6B6358] font-sans italic">
                  Protocols are for informational purposes only. Always consult a qualified healthcare provider
                  before starting any treatment protocol.
                </p>
              </div>
            </section>

            {/* Cost Guide */}
            <CostGuide costEstimate={t.costEstimate} uaeAvailable={t.uaeAvailable} />

            {/* FAQ */}
            <FAQAccordion faq={t.faq} treatmentName={t.name} />

            {/* Where to Get It */}
            {relevantListings.length > 0 && (
              <section id="locations" className="scroll-mt-24">
                <h2 className="font-serif text-xl text-gray-900 dark:text-[#F0EBE2] mb-5">
                  Where to Get It (UAE)
                </h2>
                <div className="grid md:grid-cols-3 gap-4">
                  {relevantListings.map((listing) => (
                    <Link
                      key={listing.id}
                      href={`/explore/${listing.id}`}
                      className="bg-white dark:bg-[#1C1815] border border-gray-200 dark:border-white/[0.06] rounded-xl p-4 hover:border-sage/40 transition-all"
                    >
                      <div className="font-semibold text-sm text-gray-900 dark:text-[#F0EBE2] font-sans">
                        {listing.name}
                      </div>
                      <div className="text-xs text-gray-400 dark:text-[#6B6358] font-sans mt-1">
                        {listing.location}, {listing.city}
                      </div>
                      <div className="text-xs text-moss dark:text-sage font-sans mt-2">
                        View details &rarr;
                      </div>
                    </Link>
                  ))}
                </div>
                <Link
                  href="/explore"
                  className="inline-block mt-4 text-sm text-moss dark:text-sage hover:text-forest transition-colors font-sans"
                >
                  Browse all wellness centers &rarr;
                </Link>
              </section>
            )}

            {/* Related Treatments */}
            {related.length > 0 && (
              <section id="related" className="scroll-mt-24">
                <h2 className="font-serif text-xl text-gray-900 dark:text-[#F0EBE2] mb-5">
                  Related Treatments
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {related.map((r) => r && (
                    <Link
                      key={r.slug}
                      href={`/treatments/${r.slug}`}
                      className="bg-white dark:bg-[#1C1815] border border-gray-200 dark:border-white/[0.06] rounded-xl overflow-hidden hover:border-sage/40 transition-all group"
                    >
                      <div className="relative h-28">
                        <Image
                          src={r.imageUrl}
                          alt={r.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 768px) 50vw, 25vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                        <div className="absolute bottom-2 right-2">
                          <KamuraScoreBadge score={r.kamuraScore} size="sm" />
                        </div>
                      </div>
                      <div className="p-3 text-center">
                        <div className="font-semibold text-sm text-gray-900 dark:text-[#F0EBE2] font-sans">
                          {r.name}
                        </div>
                        <div className="text-[11px] text-gray-400 dark:text-[#6B6358] uppercase tracking-wide font-sans mt-0.5">
                          {r.category}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Medical Disclaimer */}
            <section className="scroll-mt-24">
              <div className="border border-sage-light/60 dark:border-forest/20 rounded-xl p-6 bg-zen-mist/50 dark:bg-forest/5">
                <p className="text-xs text-gray-400 dark:text-[#6B6358] font-sans leading-relaxed">
                  <strong className="text-gray-500 dark:text-[#A89F90]">Medical Disclaimer:</strong> The
                  information on this page is for educational purposes only and is not intended as medical advice.
                  Kamura Scores reflect a combination of research evidence, community data, and other factors — they
                  are not clinical recommendations. Research citations are provided for reference; always consult
                  the original publications for complete study details. Consult a qualified healthcare provider before starting,
                  stopping, or modifying any treatment. Individual results may vary.
                </p>
              </div>
            </section>

            {/* Back link */}
            <div className="pb-8 text-center">
              <Link
                href="/treatments"
                className="text-sm text-gray-600 dark:text-gray-400 underline underline-offset-4 hover:text-moss transition-colors font-sans"
              >
                &larr; Back to Treatment Index
              </Link>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
