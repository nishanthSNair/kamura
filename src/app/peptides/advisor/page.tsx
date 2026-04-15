import type { Metadata } from "next";
import AdvisorContent from "./AdvisorContent";

export const metadata: Metadata = {
  title: "Peptide Advisor — Personalized Peptide Recommendations | KAMURA",
  description:
    "Tell us your health goals and get evidence-based peptide recommendations. Scored, ranked, and explained with administration details and cost estimates.",
  keywords: [
    "peptide advisor",
    "peptide recommendations",
    "personalized peptide therapy",
    "which peptide should I take",
    "peptide for recovery",
    "peptide for weight loss",
    "peptide for longevity",
  ],
  alternates: { canonical: "https://kamuralife.com/peptides/advisor" },
  openGraph: {
    title: "Peptide Advisor | KAMURA Intelligence",
    description:
      "Select your goals, get personalized peptide recommendations backed by evidence.",
    url: "https://kamuralife.com/peptides/advisor",
  },
  twitter: {
    card: "summary_large_image",
    title: "Peptide Advisor | KAMURA",
    description:
      "Personalized peptide recommendations based on your health goals.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Kamura Peptide Advisor",
      url: "https://kamuralife.com/peptides/advisor",
      applicationCategory: "HealthApplication",
      operatingSystem: "Any",
      description:
        "Personalized peptide recommendations based on your health goals, backed by evidence.",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      publisher: { "@type": "Organization", name: "KAMURA", url: "https://kamuralife.com" },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://kamuralife.com" },
        { "@type": "ListItem", position: 2, name: "Peptides", item: "https://kamuralife.com/peptides" },
        { "@type": "ListItem", position: 3, name: "Advisor" },
      ],
    },
  ],
};

export default function PeptideAdvisorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AdvisorContent />
    </>
  );
}
