import type { Metadata } from "next";
import { Suspense } from "react";
import { treatments } from "@/data/treatments";
import TreatmentsContent from "./TreatmentsContent";

export const metadata: Metadata = {
  title: "Every Treatment Scored & Ranked",
  description:
    "The world's first unbiased wellness treatment index. 50+ treatments scored on research evidence, community validation, safety, accessibility, and value. Transparent methodology, zero bias.",
  openGraph: {
    title: "Treatment Index | KAMURA",
    description:
      "50+ wellness treatments scored transparently on evidence, community data, safety, and value. The Kamura Score — zero bias, full transparency.",
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
