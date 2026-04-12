"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  PEPTIDE_GOALS,
  PEPTIDE_STACKS,
  getStacksForGoal,
  getPeptideBySlug,
} from "@/data/peptides";
import type { PeptideStack } from "@/data/peptides";

const LEVELS = [
  {
    id: "beginner" as const,
    label: "Beginner",
    description:
      "New to peptides. Prefer oral or nasal routes, simpler protocols, and lower cost.",
  },
  {
    id: "intermediate" as const,
    label: "Intermediate",
    description:
      "Some experience with peptides or injections. Comfortable with subcutaneous protocols.",
  },
  {
    id: "advanced" as const,
    label: "Advanced",
    description:
      "Experienced user. Multi-peptide stacks, cycling schedules, and regular blood work.",
  },
];

const LEVEL_ORDER: Record<string, number> = {
  beginner: 0,
  intermediate: 1,
  advanced: 2,
};

function evidenceGradeColor(grade: string): string {
  if (grade.startsWith("A")) return "bg-emerald-50 text-emerald-700 border-emerald-200";
  if (grade.startsWith("B")) return "bg-blue-50 text-blue-700 border-blue-200";
  return "bg-gray-100 text-gray-600 border-gray-200";
}

function StepIndicator({ current }: { current: number }) {
  const steps = ["Goals", "Experience", "Results"];
  return (
    <div className="flex items-center justify-center gap-2 mb-10">
      {steps.map((label, i) => {
        const stepNum = i + 1;
        const isActive = stepNum === current;
        const isCompleted = stepNum < current;
        return (
          <div key={label} className="flex items-center gap-2">
            {i > 0 && (
              <div
                className={`w-8 h-px ${
                  isCompleted || isActive ? "bg-terracotta" : "bg-gray-300"
                }`}
              />
            )}
            <div className="flex items-center gap-2">
              <span
                className={`flex items-center justify-center w-7 h-7 rounded-full text-xs font-semibold font-sans transition-colors ${
                  isActive
                    ? "bg-terracotta text-white"
                    : isCompleted
                    ? "bg-terracotta/20 text-terracotta"
                    : "bg-gray-200 text-gray-400"
                }`}
              >
                {isCompleted ? (
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                ) : (
                  stepNum
                )}
              </span>
              <span
                className={`text-xs font-sans font-medium ${
                  isActive
                    ? "text-terracotta"
                    : isCompleted
                    ? "text-terracotta/70"
                    : "text-gray-400"
                }`}
              >
                {label}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function StackCard({ stack }: { stack: PeptideStack }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 hover:shadow-lg transition-shadow">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <h3 className="font-serif text-xl text-gray-900">{stack.name}</h3>
        <span
          className={`shrink-0 text-xs font-semibold font-sans px-2.5 py-1 rounded-full border ${evidenceGradeColor(
            stack.evidenceGrade
          )}`}
        >
          Grade {stack.evidenceGrade}
        </span>
      </div>

      <p className="text-sm text-gray-600 font-sans leading-relaxed mb-5">
        {stack.description}
      </p>

      {/* Peptides */}
      <div className="space-y-3 mb-5">
        {stack.peptides.map((entry) => {
          const peptide = getPeptideBySlug(entry.slug);
          const name = peptide?.name ?? entry.slug;
          return (
            <div
              key={entry.slug}
              className="rounded-xl bg-terracotta/5 border border-terracotta/10 p-4"
            >
              <div className="flex items-center justify-between mb-2">
                <Link
                  href={`/treatments/${entry.slug}`}
                  className="font-sans text-sm font-semibold text-gray-900 hover:text-terracotta transition-colors underline-offset-2 hover:underline"
                >
                  {name}
                </Link>
                <span className="text-[10px] font-sans text-gray-400 bg-white px-2 py-0.5 rounded-full border border-gray-100">
                  {entry.route}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs font-sans text-gray-500">
                <div>
                  <span className="text-gray-400">Dosage: </span>
                  {entry.dosage}
                </div>
                <div>
                  <span className="text-gray-400">Timing: </span>
                  {entry.timing}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Protocol details */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-sans mb-4">
        <div className="rounded-lg bg-gray-50 p-3">
          <p className="text-gray-400 mb-0.5">Cycling</p>
          <p className="text-gray-700 font-medium">{stack.cycling}</p>
        </div>
        <div className="rounded-lg bg-gray-50 p-3">
          <p className="text-gray-400 mb-0.5">Duration</p>
          <p className="text-gray-700 font-medium">{stack.duration}</p>
        </div>
        <div className="rounded-lg bg-gray-50 p-3">
          <p className="text-gray-400 mb-0.5">Est. Monthly Cost</p>
          <p className="text-gray-700 font-medium">{stack.estimatedCost}</p>
        </div>
      </div>

      {/* Notes */}
      {stack.notes && (
        <p className="text-xs text-gray-500 font-sans leading-relaxed border-t border-gray-100 pt-3">
          <span className="font-medium text-gray-600">Note: </span>
          {stack.notes}
        </p>
      )}
    </div>
  );
}

export default function ProtocolBuilderContent() {
  const [step, setStep] = useState(1);
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [selectedLevel, setSelectedLevel] = useState<
    "beginner" | "intermediate" | "advanced" | null
  >(null);

  const toggleGoal = (goalId: string) => {
    setSelectedGoals((prev) =>
      prev.includes(goalId)
        ? prev.filter((g) => g !== goalId)
        : [...prev, goalId]
    );
  };

  const filteredStacks = useMemo(() => {
    if (!selectedLevel || selectedGoals.length === 0) return [];
    const userLevel = LEVEL_ORDER[selectedLevel];
    const stacks: PeptideStack[] = [];
    const seen = new Set<string>();

    for (const goalId of selectedGoals) {
      for (const stack of getStacksForGoal(goalId)) {
        if (seen.has(stack.id)) continue;
        if (LEVEL_ORDER[stack.level] <= userLevel) {
          stacks.push(stack);
          seen.add(stack.id);
        }
      }
    }

    return stacks.sort(
      (a, b) => LEVEL_ORDER[b.level] - LEVEL_ORDER[a.level]
    );
  }, [selectedGoals, selectedLevel]);

  const handleStartOver = () => {
    setStep(1);
    setSelectedGoals([]);
    setSelectedLevel(null);
  };

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[40vh] flex items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1920&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-forest/70 via-black/40 to-forest/60" />
        <div className="relative z-10 text-center px-6 py-16 md:py-20 max-w-4xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase mb-4 text-white/70 font-sans">
            KAMURA Intelligence
          </p>
          <h1 className="font-serif text-4xl md:text-[50px] font-bold leading-tight mb-4 text-white">
            Protocol Builder
          </h1>
          <p className="text-base md:text-lg text-white/80 max-w-[560px] mx-auto leading-relaxed font-sans">
            Select your goals, choose your experience level, and get a
            recommended peptide stack with dosing, timing, and cycling.
          </p>
        </div>
      </section>

      {/* Wizard */}
      <section className="py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-6">
          <StepIndicator current={step} />

          {/* Step 1: Select Goals */}
          {step === 1 && (
            <div>
              <h2 className="font-serif text-2xl text-gray-900 mb-2 text-center">
                What are your goals?
              </h2>
              <p className="text-sm text-gray-500 font-sans mb-8 text-center">
                Select one or more goals. We will match you to protocol stacks
                designed for these outcomes.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {PEPTIDE_GOALS.map((goal) => {
                  const isSelected = selectedGoals.includes(goal.id);
                  return (
                    <button
                      key={goal.id}
                      type="button"
                      onClick={() => toggleGoal(goal.id)}
                      className={`text-left p-5 rounded-2xl border-2 transition-all ${
                        isSelected
                          ? "border-terracotta bg-terracotta/5 shadow-sm"
                          : "border-gray-200 bg-white hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-2xl">{goal.icon}</span>
                        <span
                          className={`font-sans text-sm font-semibold ${
                            isSelected ? "text-terracotta" : "text-gray-900"
                          }`}
                        >
                          {goal.label}
                        </span>
                        {isSelected && (
                          <svg
                            className="ml-auto text-terracotta shrink-0"
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                          >
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 font-sans leading-relaxed">
                        {goal.description}
                      </p>
                    </button>
                  );
                })}
              </div>

              <div className="flex justify-center mt-8">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  disabled={selectedGoals.length === 0}
                  className={`px-8 py-3 text-sm font-semibold rounded-xl font-sans transition-colors ${
                    selectedGoals.length > 0
                      ? "bg-terracotta text-white hover:bg-[#9A5F57]"
                      : "bg-gray-200 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Select Experience Level */}
          {step === 2 && (
            <div>
              <h2 className="font-serif text-2xl text-gray-900 mb-2 text-center">
                What is your experience level?
              </h2>
              <p className="text-sm text-gray-500 font-sans mb-8 text-center">
                This determines which protocol stacks are shown. Higher-level
                stacks involve more peptides and injection-based routes.
              </p>

              <div className="space-y-3 max-w-lg mx-auto">
                {LEVELS.map((level) => {
                  const isSelected = selectedLevel === level.id;
                  return (
                    <button
                      key={level.id}
                      type="button"
                      onClick={() => setSelectedLevel(level.id)}
                      className={`w-full text-left p-5 rounded-2xl border-2 transition-all ${
                        isSelected
                          ? "border-terracotta bg-terracotta/5 shadow-sm"
                          : "border-gray-200 bg-white hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`flex items-center justify-center w-5 h-5 rounded-full border-2 transition-colors ${
                            isSelected
                              ? "border-terracotta bg-terracotta"
                              : "border-gray-300 bg-white"
                          }`}
                        >
                          {isSelected && (
                            <span className="block w-2 h-2 rounded-full bg-white" />
                          )}
                        </span>
                        <span
                          className={`font-sans text-sm font-semibold ${
                            isSelected ? "text-terracotta" : "text-gray-900"
                          }`}
                        >
                          {level.label}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 font-sans leading-relaxed mt-2 ml-8">
                        {level.description}
                      </p>
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center justify-center gap-3 mt-8">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-6 py-3 text-sm font-semibold rounded-xl font-sans border border-gray-300 text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  disabled={!selectedLevel}
                  className={`px-8 py-3 text-sm font-semibold rounded-xl font-sans transition-colors ${
                    selectedLevel
                      ? "bg-terracotta text-white hover:bg-[#9A5F57]"
                      : "bg-gray-200 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  See My Stacks
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Results */}
          {step === 3 && (
            <div>
              <h2 className="font-serif text-2xl text-gray-900 mb-2 text-center">
                Your Recommended Stacks
              </h2>
              <p className="text-sm text-gray-500 font-sans mb-8 text-center">
                Based on your goals and{" "}
                <span className="font-medium text-gray-700">
                  {selectedLevel}
                </span>{" "}
                experience level, we recommend these protocol stacks.
              </p>

              {/* Selected goals summary */}
              <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
                {selectedGoals.map((goalId) => {
                  const goal = PEPTIDE_GOALS.find((g) => g.id === goalId);
                  if (!goal) return null;
                  return (
                    <span
                      key={goalId}
                      className="inline-flex items-center gap-1.5 text-xs font-sans font-medium px-3 py-1.5 rounded-full bg-terracotta/10 text-terracotta"
                    >
                      {goal.icon} {goal.label}
                    </span>
                  );
                })}
              </div>

              {filteredStacks.length > 0 ? (
                <div className="space-y-5">
                  {filteredStacks.map((stack) => (
                    <StackCard key={stack.id} stack={stack} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 rounded-2xl border border-gray-200 bg-white">
                  <p className="font-serif text-lg text-gray-900 mb-2">
                    No matching stacks found
                  </p>
                  <p className="text-sm text-gray-500 font-sans max-w-md mx-auto">
                    There are no protocol stacks matching your selected goals at
                    the{" "}
                    <span className="font-medium">{selectedLevel}</span> level.
                    Try selecting additional goals or a higher experience level.
                  </p>
                </div>
              )}

              {/* Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-10">
                <button
                  type="button"
                  onClick={handleStartOver}
                  className="px-6 py-3 text-sm font-semibold rounded-xl font-sans border border-gray-300 text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  Start Over
                </button>
                <Link
                  href="/peptides/directory"
                  className="px-6 py-3 text-sm font-semibold rounded-xl font-sans text-terracotta border border-terracotta/30 hover:bg-terracotta/5 transition-colors"
                >
                  Browse All Peptides
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Disclaimer */}
      <section className="border-t border-gray-200 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 py-10">
          <p className="text-[11px] text-gray-400 font-sans leading-relaxed text-center">
            <span className="font-semibold text-gray-500">Disclaimer:</span>{" "}
            The protocol stacks presented here are for educational and
            informational purposes only. They do not constitute medical advice,
            diagnosis, or treatment. Peptide therapy should always be prescribed
            and supervised by a licensed healthcare provider. Dosing, cycling,
            and route of administration should be individualized based on your
            health profile, lab work, and medical history. KAMURA does not sell
            peptides or provide medical services.
          </p>
        </div>
      </section>
    </>
  );
}
