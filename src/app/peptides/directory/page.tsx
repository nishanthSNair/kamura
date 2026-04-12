import type { Metadata } from "next";
import { Suspense } from "react";
import PeptideDirectoryContent from "./PeptideDirectoryContent";

export const metadata: Metadata = {
  title: "Peptide Directory — Evidence-Based Peptide Therapy Guide | KAMURA",
  description:
    "Explore our comprehensive peptide directory with Kamura Scores, research evidence, safety profiles, and UAE availability. Filter by goal: recovery, weight loss, longevity, cognitive, and more.",
  keywords: [
    "peptide therapy",
    "peptide guide",
    "peptide directory",
    "BPC-157",
    "peptide therapy UAE",
    "peptide evidence",
    "growth hormone peptides",
    "recovery peptides",
    "longevity peptides",
    "peptide treatments",
  ],
  openGraph: {
    title: "Peptide Directory — Evidence-Based Peptide Therapy Guide | KAMURA",
    description:
      "Explore our comprehensive peptide directory with Kamura Scores, research evidence, safety profiles, and UAE availability.",
    type: "website",
    url: "https://kamuralife.com/peptides/directory",
  },
  twitter: {
    card: "summary_large_image",
    title: "Peptide Directory — Evidence-Based Peptide Therapy Guide | KAMURA",
    description:
      "Explore our comprehensive peptide directory with Kamura Scores, research evidence, safety profiles, and UAE availability.",
  },
};

export default function PeptideDirectoryPage() {
  return (
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
  );
}
