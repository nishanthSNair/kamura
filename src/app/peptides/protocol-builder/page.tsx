import type { Metadata } from "next";
import ProtocolBuilderContent from "./ProtocolBuilderContent";

export const metadata: Metadata = {
  title: "Protocol Builder — Build Your Peptide Stack | KAMURA",
  description:
    "Select your health goals and experience level to get a personalized peptide protocol stack with dosing, timing, cycling, and cost estimates.",
  keywords: [
    "peptide protocol builder",
    "peptide stack builder",
    "custom peptide protocol",
    "peptide dosing guide",
    "peptide cycling",
    "peptide stacks dubai",
    "longevity protocol",
    "recovery peptide stack",
    "cognitive peptide stack",
  ],
  alternates: { canonical: "https://kamuralife.com/peptides/protocol-builder" },
  openGraph: {
    title: "Protocol Builder | KAMURA",
    description:
      "Build a personalized peptide stack based on your goals and experience level.",
    url: "https://kamuralife.com/peptides/protocol-builder",
  },
  twitter: {
    card: "summary_large_image",
    title: "Protocol Builder | KAMURA",
    description:
      "Build a personalized peptide stack based on your goals and experience level.",
  },
};

export default function ProtocolBuilderPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        name: "Peptide Protocol Builder",
        url: "https://kamuralife.com/peptides/protocol-builder",
        description: metadata.description,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://kamuralife.com",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Peptide Intelligence Hub",
            item: "https://kamuralife.com/peptides",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Protocol Builder",
          },
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
      <ProtocolBuilderContent />
    </>
  );
}
