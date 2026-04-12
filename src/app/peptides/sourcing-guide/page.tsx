import type { Metadata } from "next";
import Link from "next/link";
import { SOURCING_GRADES, COA_CHECKLIST, WHAT_TO_ASK_DOCTOR } from "@/data/peptides";

export const metadata: Metadata = {
  title: "Peptide Sourcing Guide — Pharmaceutical vs Research Grade | KAMURA",
  description:
    "Learn the critical differences between pharmaceutical and research-grade peptides. Certificate of Analysis checklist, what to ask your doctor, and red flags to avoid.",
  keywords: [
    "peptide sourcing",
    "pharmaceutical grade peptides",
    "research grade peptides",
    "peptide purity",
    "certificate of analysis peptides",
    "peptide quality",
    "compounding pharmacy peptides",
    "peptide sourcing UAE",
    "peptide red flags",
    "peptide safety",
  ],
  alternates: { canonical: "https://kamuralife.com/peptides/sourcing-guide" },
  openGraph: {
    title: "Peptide Sourcing Guide | KAMURA",
    description:
      "Pharmaceutical vs research grade. CoA checklist. What to ask your doctor. Red flags to avoid.",
    url: "https://kamuralife.com/peptides/sourcing-guide",
  },
  twitter: {
    card: "summary_large_image",
    title: "Peptide Sourcing Guide | KAMURA",
    description:
      "The critical differences between pharmaceutical and research-grade peptides.",
  },
};

const RED_FLAGS = [
  "No Certificate of Analysis available or seller refuses to provide one",
  "Pricing significantly below market rate (if it seems too cheap, it probably is)",
  "Sold as \"for research purposes only\" but marketed for human use",
  "No batch or lot numbers on the product",
  "Shipped from unregulated facilities or unknown origins",
  "No sterility testing documentation for injectable products",
  "Website uses stock photos and has no verifiable business address",
  "Seller cannot name their manufacturing or compounding partner",
];

export default function SourcingGuidePage() {
  const pharma = SOURCING_GRADES.find((g) => g.type === "pharmaceutical")!;
  const research = SOURCING_GRADES.find((g) => g.type === "research")!;

  const comparisonRows: { label: string; key: keyof typeof pharma }[] = [
    { label: "Purity", key: "purity" },
    { label: "Manufacturing", key: "manufacturing" },
    { label: "Sterility", key: "sterility" },
    { label: "Testing", key: "testing" },
    { label: "Cost", key: "cost" },
    { label: "Risk", key: "risk" },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        name: "Peptide Sourcing Guide",
        url: "https://kamuralife.com/peptides/sourcing-guide",
        description: metadata.description,
        isPartOf: {
          "@type": "WebSite",
          name: "KAMURA",
          url: "https://kamuralife.com",
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://kamuralife.com" },
          { "@type": "ListItem", position: 2, name: "Peptides", item: "https://kamuralife.com/peptides" },
          { "@type": "ListItem", position: 3, name: "Sourcing Guide", item: "https://kamuralife.com/peptides/sourcing-guide" },
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
      <section className="relative h-[40vh] flex items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=1920&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
        <div className="relative z-10 text-center text-white px-6 max-w-3xl">
          <p className="text-xs tracking-[0.3em] uppercase mb-4 text-white/80 font-sans">
            KAMURA Sourcing Intelligence
          </p>
          <h1 className="text-3xl md:text-5xl font-serif mb-4 leading-tight">
            Peptide Sourcing Guide
          </h1>
          <p className="text-base md:text-lg text-white/90 leading-relaxed font-sans">
            Pharmaceutical grade vs research grade — the difference between effective therapy and expensive risk
          </p>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="max-w-6xl mx-auto px-6 py-4">
        <nav className="flex items-center gap-2 text-xs text-gray-400 font-sans">
          <Link href="/" className="hover:text-terracotta transition-colors">Home</Link>
          <span>&rsaquo;</span>
          <Link href="/peptides" className="hover:text-terracotta transition-colors">Peptides</Link>
          <span>&rsaquo;</span>
          <span className="text-gray-600">Sourcing Guide</span>
        </nav>
      </div>

      <div className="max-w-6xl mx-auto px-6 pb-20">

        {/* Section 1: Comparison Table */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-serif text-gray-900 mb-3">
            Pharmaceutical vs Research Grade
          </h2>
          <p className="text-gray-500 font-sans mb-8 max-w-2xl">
            Not all peptides are created equal. The grade determines purity, safety, and whether what you inject is actually what you paid for.
          </p>

          {/* Desktop table */}
          <div className="hidden md:block border border-gray-200 rounded-2xl overflow-hidden">
            <div className="grid grid-cols-[180px_1fr_1fr]">
              <div className="p-4 bg-gray-50 border-b border-gray-200" />
              <div className="p-4 bg-gray-50 border-b border-l border-gray-200">
                <span className="font-sans text-sm font-semibold text-gray-900">
                  {pharma.label}
                </span>
              </div>
              <div className="p-4 bg-gray-50 border-b border-l border-gray-200">
                <span className="font-sans text-sm font-semibold text-gray-900">
                  {research.label}
                </span>
              </div>
            </div>
            {comparisonRows.map((row) => (
              <div key={row.key} className="grid grid-cols-[180px_1fr_1fr] border-b border-gray-100 last:border-b-0">
                <div className="p-4 bg-gray-50/50 font-sans text-sm text-gray-500 font-medium">
                  {row.label}
                </div>
                <div className="p-4 text-sm font-sans text-gray-800 border-l border-gray-100">
                  {pharma[row.key]}
                </div>
                <div className="p-4 text-sm font-sans text-gray-800 border-l border-gray-100">
                  {research[row.key]}
                </div>
              </div>
            ))}
          </div>

          {/* Mobile cards */}
          <div className="md:hidden space-y-4">
            {[pharma, research].map((grade) => (
              <div key={grade.type} className="border border-gray-200 rounded-2xl overflow-hidden bg-white">
                <div className={`p-4 border-b border-gray-200 ${grade.type === "pharmaceutical" ? "bg-green-50" : "bg-amber-50"}`}>
                  <h3 className="font-sans text-sm font-semibold text-gray-900">{grade.label}</h3>
                </div>
                <div className="divide-y divide-gray-100">
                  {comparisonRows.map((row) => (
                    <div key={row.key} className="flex justify-between items-start px-4 py-3 gap-4">
                      <span className="text-sm text-gray-500 font-sans font-medium shrink-0">{row.label}</span>
                      <span className="text-sm text-gray-800 font-sans text-right">{grade[row.key]}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 2: CoA Checklist */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-serif text-gray-900 mb-3">
            Certificate of Analysis Checklist
          </h2>
          <p className="text-gray-500 font-sans mb-8 max-w-2xl">
            A legitimate Certificate of Analysis (CoA) should include all of the following. If any are missing, ask questions.
          </p>

          <div className="grid gap-3 max-w-2xl">
            {COA_CHECKLIST.map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-4 bg-white border border-gray-200 rounded-2xl"
              >
                <div className="mt-0.5 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                  <svg className="w-3.5 h-3.5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-sm font-sans text-gray-800 leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3: What to Ask Your Doctor */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-serif text-gray-900 mb-3">
            What to Ask Your Doctor
          </h2>
          <p className="text-gray-500 font-sans mb-8 max-w-2xl">
            Before starting peptide therapy, make sure your prescribing physician can answer these questions clearly.
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            {WHAT_TO_ASK_DOCTOR.map((question, i) => (
              <div
                key={i}
                className="p-5 bg-white border border-gray-200 rounded-2xl hover:border-terracotta/30 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <span className="text-xs font-sans font-bold text-terracotta bg-terracotta/10 w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <p className="text-sm font-sans text-gray-800 leading-relaxed">{question}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 4: Red Flags */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-serif text-gray-900 mb-3">
            Red Flags to Watch For
          </h2>
          <p className="text-gray-500 font-sans mb-8 max-w-2xl">
            Grey-market peptides are a real risk. If you encounter any of these warning signs, walk away.
          </p>

          <div className="bg-red-50/50 border border-red-200/60 rounded-2xl p-6 md:p-8">
            <div className="grid gap-3">
              {RED_FLAGS.map((flag, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="mt-0.5 w-5 h-5 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                    <svg className="w-3 h-3 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <span className="text-sm font-sans text-gray-800 leading-relaxed">{flag}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center py-12 px-6 bg-gray-50 rounded-2xl border border-gray-200">
          <h2 className="text-2xl font-serif text-gray-900 mb-3">
            Find Vetted Clinics Near You
          </h2>
          <p className="text-gray-500 font-sans mb-6 max-w-xl mx-auto">
            KAMURA is building a directory of clinics that meet pharmaceutical-grade sourcing standards. Be the first to explore it.
          </p>
          <Link
            href="/explore"
            className="inline-block bg-terracotta text-white font-sans text-sm font-medium px-8 py-3 rounded-full hover:bg-terracotta-dark transition-colors"
          >
            Explore Vetted Clinics
          </Link>
        </section>
      </div>

      {/* Back link */}
      <div className="max-w-6xl mx-auto px-6 pb-16 text-center">
        <Link
          href="/peptides"
          className="text-sm text-gray-500 hover:text-terracotta transition-colors font-sans"
        >
          &larr; Back to Peptide Hub
        </Link>
      </div>
    </>
  );
}
