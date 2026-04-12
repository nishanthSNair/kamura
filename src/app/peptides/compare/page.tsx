import type { Metadata } from "next";
import CompareContent from "@/app/treatments/compare/CompareContent";

export const metadata: Metadata = {
  title: "Compare Peptides Side by Side | KAMURA",
  description:
    "Compare any two peptides head-to-head — Kamura Scores, evidence levels, safety, outcomes, dosing, and cost. BPC-157 vs TB-500, GHK-Cu vs Epitalon, and more.",
  keywords: [
    "compare peptides",
    "peptide comparison",
    "BPC-157 vs TB-500",
    "GHK-Cu vs Epitalon",
    "peptide scores",
    "peptide safety comparison",
    "peptide evidence comparison",
    "best peptides compared",
    "peptide therapy comparison",
  ],
  alternates: { canonical: "https://kamuralife.com/peptides/compare" },
  openGraph: {
    title: "Compare Peptides Side by Side | KAMURA",
    description:
      "Compare any two peptides head-to-head. Scores, evidence, outcomes, safety, and cost.",
    url: "https://kamuralife.com/peptides/compare",
  },
  twitter: {
    card: "summary_large_image",
    title: "Compare Peptides Side by Side | KAMURA",
    description:
      "Compare any two peptides head-to-head. Scores, evidence, outcomes, safety, and cost.",
  },
};

export default function PeptideComparePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        name: "Compare Peptides",
        url: "https://kamuralife.com/peptides/compare",
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
          { "@type": "ListItem", position: 3, name: "Compare", item: "https://kamuralife.com/peptides/compare" },
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
      <CompareContent initialSlugs={["bpc-157", "thymosin-alpha-1"]} />
    </>
  );
}
