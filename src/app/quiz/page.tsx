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
  },
};

export default function QuizPage() {
  return <QuizContent />;
}
