import type { Metadata } from "next";
import ExploreContent from "./ExploreContent";

export const metadata: Metadata = {
  title: "Explore",
  description:
    "Discover the best longevity clinics, wellness practitioners, and healing spaces in the UAE. Experts, centers, events, and retreats — all in one place.",
};

export default function ExplorePage() {
  return <ExploreContent />;
}
