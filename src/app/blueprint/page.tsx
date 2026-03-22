import type { Metadata } from "next";
import WellnessCheckerApp from "./WellnessCheckerApp";

export const metadata: Metadata = {
  title: "Wellness Checker | KAMURA",
  description:
    "Select your wellness concerns on our interactive body map and get personalized, evidence-based treatment recommendations ranked by relevance and Kamura Score.",
  openGraph: {
    title: "Wellness Checker | KAMURA",
    description:
      "Interactive wellness checker. Tap your body, pick your concerns, get ranked treatment recommendations backed by research.",
    url: "https://kamuralife.com/blueprint",
    images: [
      {
        url: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=1200&h=630&fit=crop",
        width: 1200,
        height: 630,
        alt: "Wellness Checker — KAMURA",
      },
    ],
  },
  alternates: {
    canonical: "/blueprint",
  },
};

export default function BlueprintPage() {
  return <WellnessCheckerApp />;
}
