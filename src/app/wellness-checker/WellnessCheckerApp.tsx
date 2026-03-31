"use client";

import { useWellnessProfile } from "@/hooks/useWellnessProfile";
import type { WellnessProfile } from "@/data/wellness-questionnaire";
import type { BlogPostSummary } from "@/data/wellness-checker";
import QuestionnaireShell from "@/components/wellness/QuestionnaireShell";
import WellnessDashboard from "@/components/wellness/WellnessDashboard";

interface WellnessCheckerAppProps {
  blogPosts: BlogPostSummary[];
}

export default function WellnessCheckerApp({ blogPosts }: WellnessCheckerAppProps) {
  const { profile, hydrated, completed, saveCompleted, updateGoalCheck, reset } =
    useWellnessProfile();

  // Wait for localStorage hydration before rendering
  if (!hydrated) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-terracotta/30 border-t-terracotta rounded-full animate-spin" />
      </div>
    );
  }

  // Show questionnaire if no completed profile
  if (!completed || !profile) {
    return (
      <QuestionnaireShell
        onComplete={(p: WellnessProfile) => saveCompleted(p)}
      />
    );
  }

  // Show dashboard
  return (
    <WellnessDashboard
      profile={profile}
      blogPosts={blogPosts}
      onRetake={reset}
      onGoalToggle={updateGoalCheck}
    />
  );
}
