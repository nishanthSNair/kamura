import type { Metadata } from "next";
import { listings } from "@/data/listings";
import ExploreContent from "./ExploreContent";

export const metadata: Metadata = {
  title: `Explore ${listings.length}+ Wellness Clinics & Centers in Dubai & UAE`,
  description:
    `Browse ${listings.length}+ curated longevity clinics, biohacking studios, peptide therapy centers, IV drip lounges, holistic healers, yoga studios, and wellness retreats across Dubai, Abu Dhabi, and Sharjah.`,
  keywords: [
    "wellness clinics Dubai",
    "longevity clinic Dubai",
    "biohacking studio Dubai",
    "peptide therapy Dubai",
    "IV drip Dubai",
    "NAD+ infusion Dubai",
    "cryotherapy Dubai",
    "yoga studio Dubai",
    "wellness retreat UAE",
    "holistic healer Dubai",
    "wellness centers Abu Dhabi",
    "stem cell clinic Dubai",
    "functional medicine Dubai",
    "Ayurveda Dubai",
    "red light therapy Dubai",
  ],
  alternates: {
    canonical: "https://kamuralife.com/explore",
  },
  openGraph: {
    title: "Explore Wellness Centers | KAMURA",
    description:
      `${listings.length}+ curated longevity clinics, biohacking studios, holistic healers, and wellness retreats across the UAE.`,
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
