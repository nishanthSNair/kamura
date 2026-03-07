import type { Metadata } from "next";
import CompareContent from "./CompareContent";

export const metadata: Metadata = {
  title: "Compare Wellness Centers",
  description:
    "Compare longevity clinics, biohacking studios, yoga studios, and wellness retreats in Dubai side by side. Find the best fit for your wellness journey.",
};

export default function ComparePage() {
  return <CompareContent />;
}
