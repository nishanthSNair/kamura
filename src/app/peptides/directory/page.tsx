import type { Metadata } from "next";
import { Suspense } from "react";
import PeptideDirectoryContent from "./PeptideDirectoryContent";
import peptides from "@/data/therapy-explorer.json";

export const metadata: Metadata = {
  title: "Peptide Directory — Visual Pathways & Studied Uses | KAMURA",
  description:
    "Explore 28 peptide and related therapy guides: visual mechanisms, symptoms and studied uses, formulation context and original research.",
  keywords: [
    "peptide therapy",
    "peptide directory",
    "BPC-157",
    "GHK-Cu",
    "tesamorelin",
    "peptide therapy UAE",
    "peptide evidence",
    "growth hormone peptides",
    "recovery peptides",
    "longevity peptides",
  ],
  alternates: { canonical: "https://kamuralife.com/peptides/directory" },
  openGraph: {
    title: "Peptide Directory — Visual Pathways & Studied Uses | KAMURA",
    description:
      "Visual peptide pathways, studied uses and source-linked explanations.",
    type: "website",
    url: "https://kamuralife.com/peptides/directory",
    siteName: "KAMURA",
    locale: "en_US",
    images: [
      {
        url: "https://kamuralife.com/images/hero-home.png",
        width: 1200,
        height: 630,
        alt: "Kamura Peptide Directory",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Peptide Directory | KAMURA",
    description:
      "Explore peptide mechanisms and outcome-specific research.",
    creator: "@KamuraLife",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      name: "Peptide Directory",
      url: "https://kamuralife.com/peptides/directory",
      description:
        "Visual guides to peptide mechanisms, studied uses and original research.",
      mainEntity: {
        "@type": "ItemList",
        numberOfItems: peptides.length,
        itemListElement: [...peptides]
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((p, i) => ({
            "@type": "ListItem",
            position: i + 1,
            url: `https://kamuralife.com/peptides/${p.id}`,
            name: p.name,
          })),
      },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://kamuralife.com" },
        { "@type": "ListItem", position: 2, name: "Peptides", item: "https://kamuralife.com/peptides" },
        { "@type": "ListItem", position: 3, name: "Directory" },
      ],
    },
  ],
};

export default function PeptideDirectoryPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Suspense
      fallback={
        <div className="max-w-6xl mx-auto px-6 py-20 md:py-28">
          <div className="animate-pulse space-y-6">
            <div className="h-10 bg-gray-200 rounded w-1/3" />
            <div className="h-5 bg-gray-200 rounded w-2/3" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-64 bg-gray-100 rounded-2xl" />
              ))}
            </div>
          </div>
        </div>
      }
    >
      <PeptideDirectoryContent />
    </Suspense>
    </>
  );
}
