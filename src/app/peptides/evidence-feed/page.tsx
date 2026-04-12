import type { Metadata } from "next";
import Link from "next/link";
import { EVIDENCE_FEED } from "@/data/peptides";
import EvidenceFeedContent from "./EvidenceFeedContent";

export const metadata: Metadata = {
  title: "Peptide Evidence Feed — Latest Studies, Regulatory Updates & Safety Alerts | KAMURA",
  description:
    "Stay current with the latest peptide research, FDA regulatory changes, safety alerts, and market updates. Curated evidence feed for clinicians and consumers.",
  keywords: [
    "peptide research updates",
    "FDA peptide regulation",
    "peptide safety alerts",
    "BPC-157 studies",
    "peptide clinical trials",
    "peptide news",
    "peptide regulatory changes",
    "GHK-Cu research",
    "peptide evidence",
    "longevity research updates",
  ],
  alternates: { canonical: "https://kamuralife.com/peptides/evidence-feed" },
  openGraph: {
    title: "Peptide Evidence Feed | KAMURA",
    description:
      "Latest studies, FDA updates, regulatory changes, and safety alerts for peptides.",
    url: "https://kamuralife.com/peptides/evidence-feed",
  },
  twitter: {
    card: "summary_large_image",
    title: "Peptide Evidence Feed | KAMURA",
    description:
      "Stay current with the latest peptide research and regulatory updates.",
  },
};

export default function EvidenceFeedPage() {
  // Sort by date descending
  const sorted = [...EVIDENCE_FEED].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        name: "Peptide Evidence Feed",
        url: "https://kamuralife.com/peptides/evidence-feed",
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
          { "@type": "ListItem", position: 3, name: "Evidence Feed", item: "https://kamuralife.com/peptides/evidence-feed" },
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
              "url('https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=1920&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
        <div className="relative z-10 text-center text-white px-6 max-w-3xl">
          <p className="text-xs tracking-[0.3em] uppercase mb-4 text-white/80 font-sans">
            KAMURA Evidence Intelligence
          </p>
          <h1 className="text-3xl md:text-5xl font-serif mb-4 leading-tight">
            Evidence Feed
          </h1>
          <p className="text-base md:text-lg text-white/90 leading-relaxed font-sans">
            Latest studies, regulatory changes, and safety alerts — curated for clinicians and informed consumers
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
          <span className="text-gray-600">Evidence Feed</span>
        </nav>
      </div>

      <div className="max-w-6xl mx-auto px-6 pb-20">
        <EvidenceFeedContent items={sorted} />
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
