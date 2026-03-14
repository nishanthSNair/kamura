import type { Metadata } from "next";
import QuizContent from "./QuizContent";

export const metadata: Metadata = {
  title: "Wellness Quiz",
  description:
    "Discover your wellness score and archetype in 2 minutes. Are you The Biohacker, The Yogi, or The Healer? Take the KAMURA Wellness Quiz.",
  openGraph: {
    title: "Discover Your Wellness Path | KAMURA",
    description:
      "10 questions. 2 minutes. Find out your wellness score, your archetype, and where to start your longevity journey.",
    url: "https://kamuralife.com/quiz",
    images: [
      {
        url: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1200&h=630&fit=crop",
        width: 1200,
        height: 630,
        alt: "Wellness Quiz — KAMURA",
      },
    ],
  },
};

export default function QuizPage() {
  return <QuizContent />;
}
