import type { Metadata } from "next";
import { listings } from "@/data/listings";
import ExploreContent from "./ExploreContent";

export const metadata: Metadata = {
  title: "Explore Wellness Centers in Dubai & UAE",
  description:
    "Browse 50 curated longevity clinics, biohacking studios, holistic healers, yoga studios, and wellness retreats across Dubai, Abu Dhabi, and Sharjah.",
};

export default function ExplorePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Wellness Centers in Dubai & UAE",
    numberOfItems: listings.length,
    itemListElement: listings.slice(0, 20).map((listing, i) => ({
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
