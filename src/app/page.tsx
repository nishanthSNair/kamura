import type { Metadata } from "next";
import TherapyExplorer from "@/components/body-explorer/TherapyExplorer";

export const metadata: Metadata = {
  title: "KAMURA — What Actually Works, Mapped to Your Body",
  description:
    "Explore what peptides and hormone therapies actually do inside the body. Real 3D anatomy (2,234 structures), molecular structures, interactive mechanisms, guided learning and outcome-specific research.",
  keywords: [
    "peptides explained",
    "BPC-157",
    "peptide anatomy",
    "3D human body explorer",
    "peptide research",
    "longevity therapies",
    "hormone therapy explained",
    "Kamura Score",
    "evidence-based wellness",
    "preventive health UAE",
  ],
  alternates: { canonical: "https://kamuralife.com" },
  openGraph: {
    title: "KAMURA — What Actually Works, Mapped to Your Body",
    description:
      "Select a therapy. See where it acts in real 3D anatomy, how it works, and what the research says.",
    url: "https://kamuralife.com",
    siteName: "KAMURA",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://kamuralife.com/images/body-atlas-preview.jpg",
        width: 1600,
        height: 1000,
        alt: "The Kamura Body Atlas — interactive 3D anatomy with therapy mechanisms and research",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "KAMURA — What Actually Works, Mapped to Your Body",
    description:
      "Explore what peptides and therapies actually do inside the body — real anatomy, real molecules, real research.",
    creator: "@KamuraLife",
    images: ["https://kamuralife.com/images/body-atlas-preview.jpg"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      name: "KAMURA",
      url: "https://kamuralife.com",
      description:
        "UAE-based longevity platform — evidence-graded treatments, an interactive body atlas, and preventive-health intelligence.",
      sameAs: [
        "https://www.instagram.com/kamuralife/",
        "https://x.com/KamuraLife",
      ],
    },
    {
      "@type": "WebSite",
      name: "KAMURA",
      url: "https://kamuralife.com",
      potentialAction: {
        "@type": "SearchAction",
        target: "https://kamuralife.com/explore?q={search_term_string}",
        "query-input": "required name=search_term_string",
      },
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <TherapyExplorer />
    </>
  );
}
