import type { Metadata } from "next";
import { listings } from "@/data/listings";
import ExploreContent from "./ExploreContent";

export const metadata: Metadata = {
  title: "Explore 70+ Wellness Centers in Dubai & UAE",
  description:
    "Browse 70+ curated longevity clinics, biohacking studios, peptide therapy, bone broth, holistic healers, yoga studios, and wellness retreats across Dubai, Abu Dhabi, and Sharjah.",
  openGraph: {
    title: "Explore Wellness Centers | KAMURA",
    description:
      "70+ curated longevity clinics, biohacking studios, holistic healers, and wellness retreats across the UAE.",
    url: "https://kamuralife.com/explore",
    images: [
      {
        url: "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=1200&h=630&fit=crop",
        width: 1200,
        height: 630,
        alt: "Explore Wellness Centers — KAMURA",
      },
    ],
  },
};

export default function ExplorePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Wellness Centers in Dubai & UAE",
    numberOfItems: listings.length,
    itemListElement: listings.map((listing, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `https://kamuralife.com/explore/${listing.id}`,
      name: listing.name,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ExploreContent />
    </>
  );
}
