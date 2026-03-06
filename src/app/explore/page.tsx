import type { Metadata } from "next";
import ExploreContent from "./ExploreContent";

export const metadata: Metadata = {
  title: "Explore",
  description:
    "Explore curated longevity clinics, biohacking studios, holistic healers, yoga studios, and wellness retreats across Dubai and the UAE.",
};

export default function ExplorePage() {
  return <ExploreContent />;
}
