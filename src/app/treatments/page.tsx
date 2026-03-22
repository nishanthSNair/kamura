import type { Metadata } from "next";
import { Suspense } from "react";
import { treatments } from "@/data/treatments";
import TreatmentsContent from "./TreatmentsContent";

export const metadata: Metadata = {
  title: `${treatments.length} Wellness Treatments Scored & Ranked | KAMURA`,
  description:
    `The world's first unbiased wellness treatment index. ${treatments.length} treatments across 12 categories — peptides, NAD+, red light therapy, semaglutide, cryotherapy, HBOT & more — scored on research evidence, safety, and community data.`,
  keywords: [
    "wellness treatments",
    "treatment rankings",
    "peptide therapy",
    "BPC-157",
    "NAD+ therapy",
    "red light therapy",
    "semaglutide",
    "tirzepatide",
    "GLP-1 weight loss",
    "cryotherapy",
    "hyperbaric oxygen therapy",
    "stem cell therapy",
    "biohacking treatments",
    "longevity supplements",
    "treatment comparison",
    "Kamura Score",
    "evidence-based treatments",
    "hormone therapy",
    "IV therapy",
    "exercise for longevity",
  ],
  alternates: {
    canonical: "https://kamuralife.com/treatments",
  },
  openGraph: {
    title: `Treatment Index — ${treatments.length} Treatments | KAMURA`,
    description:
      `${treatments.length} wellness treatments scored transparently on evidence, community data, safety, and value. The Kamura Score — zero bias, full transparency.`,
    url: "https://kamuralife.com/treatments",
    images: [
      {
        url: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&h=630&fit=crop",
        width: 1200,
        height: 630,
        alt: "Treatment Index — KAMURA",
      },
    ],
  },
};

export default function TreatmentsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Kamura Treatment Index",
    description: "Wellness treatments scored on evidence, community validation, safety, accessibility, and value.",
    numberOfItems: treatments.length,
    itemListElement: treatments
      .sort((a, b) => b.kamuraScore - a.kamuraScore)
      .map((t, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `https://kamuralife.com/treatments/${t.slug}`,
        name: `${t.name} — Kamura Score: ${t.kamuraScore}`,
      })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Suspense>
        <TreatmentsContent />
      </Suspense>
    </>
  );
}
