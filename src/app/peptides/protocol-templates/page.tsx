import type { Metadata } from "next";
import Link from "next/link";
import { PEPTIDE_STACKS, getPeptideBySlug } from "@/data/peptides";
import KamuraScoreBadge from "@/components/treatments/KamuraScoreBadge";

export const metadata: Metadata = {
  title: "Protocol Templates — Evidence-Graded Peptide Stacks | KAMURA",
  description:
    "Pre-built peptide protocol templates for clinics. Each stack includes dosing, timing, cycling, evidence grade, and estimated cost. Print-ready for patient handouts.",
  keywords: [
    "peptide protocol templates",
    "peptide stacks",
    "peptide dosing protocols",
    "peptide therapy protocols",
    "clinic peptide protocols",
    "BPC-157 TB-500 stack",
    "peptide cycling",
  ],
  alternates: {
    canonical: "https://kamuralife.com/peptides/protocol-templates",
  },
  openGraph: {
    title: "Protocol Templates | KAMURA Peptide Intelligence",
    description:
      "Evidence-graded peptide protocol stacks. Dosing, timing, cycling, and cost — ready to adopt.",
    url: "https://kamuralife.com/peptides/protocol-templates",
  },
  twitter: {
    card: "summary_large_image",
    title: "Peptide Protocol Templates | KAMURA",
    description:
      "Pre-built peptide stacks with dosing, timing, and evidence grades.",
  },
};

function evidenceGradeBadge(grade: string) {
  const color =
    grade === "A"
      ? "bg-emerald-50 text-emerald-700 border-emerald-200"
      : grade.startsWith("B")
        ? "bg-blue-50 text-blue-700 border-blue-200"
        : "bg-amber-50 text-amber-700 border-amber-200";
  return (
    <span
      className={`text-xs px-2.5 py-0.5 rounded-full font-sans font-semibold border ${color}`}
    >
      Grade {grade}
    </span>
  );
}

function levelBadge(level: string) {
  const styles: Record<string, string> = {
    beginner: "bg-green-50 text-green-700",
    intermediate: "bg-amber-50 text-amber-700",
    advanced: "bg-red-50 text-red-700",
  };
  return (
    <span
      className={`text-[10px] px-2 py-0.5 rounded-full font-sans font-medium capitalize ${styles[level] || "bg-gray-100 text-gray-600"}`}
    >
      {level}
    </span>
  );
}

function goalTag(goalId: string) {
  const labels: Record<string, string> = {
    recovery: "Recovery & Repair",
    "weight-loss": "Weight Loss",
    longevity: "Longevity",
    cognitive: "Cognitive",
    hormonal: "Growth Hormone",
    immune: "Immune & Gut",
    "skin-hair": "Skin & Hair",
  };
  return (
    <span className="text-[10px] px-2 py-0.5 rounded-full font-sans font-medium bg-[#B5736A]/10 text-[#B5736A]">
      {labels[goalId] || goalId}
    </span>
  );
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      name: "Peptide Protocol Templates",
      url: "https://kamuralife.com/peptides/protocol-templates",
      description:
        "Evidence-graded peptide protocol stacks with dosing, timing, cycling, and cost — ready to adopt into clinical practice.",
      audience: { "@type": "MedicalAudience", audienceType: "Clinician" },
      publisher: { "@type": "Organization", name: "KAMURA", url: "https://kamuralife.com" },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://kamuralife.com" },
        { "@type": "ListItem", position: 2, name: "Peptides", item: "https://kamuralife.com/peptides" },
        { "@type": "ListItem", position: 3, name: "Protocol Templates" },
      ],
    },
  ],
};

export default function ProtocolTemplatesPage() {
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
            Protocol Templates
          </h1>
          <p className="text-base md:text-lg text-white/80 max-w-[560px] mx-auto leading-relaxed font-sans">
            Evidence-graded peptide stacks your clinic can adopt, customize, and
            print for patient handouts.
          </p>
          <p className="text-sm text-white/50 font-sans mt-4">
            {PEPTIDE_STACKS.length} protocol stacks available
          </p>
        </div>
      </section>

      {/* Stacks */}
      <section className="py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-6 space-y-8">
          {PEPTIDE_STACKS.map((stack) => (
            <div
              key={stack.id}
              className="bg-white rounded-2xl border border-gray-200 overflow-hidden print:break-inside-avoid"
            >
              {/* Header */}
              <div className="p-6 md:p-8 border-b border-gray-100">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  {goalTag(stack.goal)}
                  {evidenceGradeBadge(stack.evidenceGrade)}
                  {levelBadge(stack.level)}
                </div>
                <h2 className="font-serif text-xl md:text-2xl text-gray-900 mb-2">
                  {stack.name}
                </h2>
                <p className="text-sm text-gray-500 font-sans leading-relaxed max-w-3xl">
                  {stack.description}
                </p>
              </div>

              {/* Peptide Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-gray-50 text-xs font-sans text-gray-500 uppercase tracking-wider">
                      <th className="px-6 py-3">Peptide</th>
                      <th className="px-6 py-3">Dosage</th>
                      <th className="px-6 py-3">Timing</th>
                      <th className="px-6 py-3">Route</th>
                      <th className="px-6 py-3 text-center">Score</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {stack.peptides.map((sp) => {
                      const pep = getPeptideBySlug(sp.slug);
                      return (
                        <tr key={sp.slug} className="hover:bg-gray-50/50">
                          <td className="px-6 py-3">
                            {pep ? (
                              <Link
                                href={`/treatments/${sp.slug}`}
                                className="font-sans text-sm font-semibold text-gray-900 hover:text-terracotta transition-colors"
                              >
                                {pep.name}
                              </Link>
                            ) : (
                              <span className="font-sans text-sm text-gray-700">
                                {sp.slug}
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-3 text-sm font-sans text-gray-700">
                            {sp.dosage}
                          </td>
                          <td className="px-6 py-3 text-sm font-sans text-gray-500">
                            {sp.timing}
                          </td>
                          <td className="px-6 py-3 text-sm font-sans text-gray-500">
                            {sp.route}
                          </td>
                          <td className="px-6 py-3">
                            <div className="flex justify-center">
                              {pep ? (
                                <KamuraScoreBadge
                                  score={pep.kamuraScore}
                                  size="sm"
                                />
                              ) : (
                                <span className="text-xs text-gray-400">
                                  --
                                </span>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Details Grid */}
              <div className="p-6 md:p-8 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-gray-100">
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-gray-400 font-sans mb-1">
                    Cycling
                  </p>
                  <p className="text-sm text-gray-700 font-sans">
                    {stack.cycling}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-gray-400 font-sans mb-1">
                    Duration
                  </p>
                  <p className="text-sm text-gray-700 font-sans">
                    {stack.duration}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-gray-400 font-sans mb-1">
                    Estimated Cost
                  </p>
                  <p className="text-sm text-gray-700 font-sans">
                    {stack.estimatedCost}
                  </p>
                </div>
              </div>

              {/* Notes + Links */}
              <div className="px-6 md:px-8 pb-6 md:pb-8">
                <p className="text-xs text-gray-500 font-sans leading-relaxed bg-gray-50 rounded-xl p-4 mb-4">
                  <span className="font-semibold text-gray-700">Note:</span>{" "}
                  {stack.notes}
                </p>
                <div className="flex flex-wrap gap-2">
                  {stack.peptides.map((sp) => {
                    const pep = getPeptideBySlug(sp.slug);
                    if (!pep) return null;
                    return (
                      <Link
                        key={sp.slug}
                        href={`/treatments/${sp.slug}`}
                        className="inline-flex items-center gap-1 text-xs font-sans text-terracotta hover:underline underline-offset-4"
                      >
                        View {pep.name} details &rarr;
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-gray-200 bg-[#EDE7DB]">
        <div className="max-w-6xl mx-auto px-6 py-16 text-center">
          <h2 className="font-serif text-2xl md:text-3xl text-gray-900 mb-3">
            Need Custom Protocols?
          </h2>
          <p className="text-sm text-gray-500 font-sans mb-6 max-w-[500px] mx-auto">
            Use the Protocol Builder to create personalized stacks based on
            patient goals, or explore the Clinic Dashboard for demand insights.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/peptides/protocol-builder"
              className="px-6 py-3 bg-[#B5736A] hover:bg-[#9A5F57] text-white text-sm font-semibold rounded-xl transition-colors font-sans"
            >
              Build Custom Protocol
            </Link>
            <Link
              href="/peptides/clinic-dashboard"
              className="px-6 py-3 border border-gray-300 text-gray-700 text-sm font-semibold rounded-xl hover:bg-white transition-colors font-sans"
            >
              Clinic Dashboard
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
