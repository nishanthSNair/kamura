import type { Metadata } from "next";
import CompareContent from "./CompareContent";

export const metadata: Metadata = {
  title: "Compare Wellness Centers",
  description:
    "Compare longevity clinics, biohacking studios, yoga studios, and wellness retreats in Dubai side by side. Find the best fit for your wellness journey.",
  openGraph: {
    title: "Compare Wellness Centers | KAMURA",
    description:
      "Compare longevity clinics, biohacking studios, and wellness retreats in Dubai side by side.",
    url: "https://kamuralife.com/explore/compare",
    images: [
      {
        url: "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=1200&h=630&fit=crop",
        width: 1200,
        height: 630,
        alt: "Compare Wellness Centers — KAMURA",
      },
    ],
  },
};

export default function ComparePage() {
  return <CompareContent />;
}
