import type { Metadata } from "next";
import CompareContent from "./CompareContent";

export const metadata: Metadata = {
  title: "Compare Treatments Side by Side",
  description:
    "Compare any two wellness treatments on Kamura Score, evidence level, outcomes, safety, and cost. Data-driven comparison for informed decisions.",
  openGraph: {
    title: "Compare Treatments | KAMURA",
    description:
      "Compare any two wellness treatments side by side. Scores, evidence, outcomes, safety, and cost compared.",
    url: "https://kamuralife.com/treatments/compare",
  },
  alternates: {
    canonical: "/treatments/compare",
  },
};

export default function ComparePage() {
  return <CompareContent />;
}
