"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { PEPTIDE_GOALS, getPeptidesForGoal, peptides } from "@/data/peptides";
import type { Treatment } from "@/data/treatments";
import KamuraScoreBadge from "@/components/treatments/KamuraScoreBadge";

export default function AdvisorContent() {
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);

  const toggleGoal = (id: string) => {
    setSelectedGoals((prev) =>
      prev.includes(id) ? prev.filter((g) => g !== id) : [...prev, id]
    );
  };

  const recommendations = useMemo(() => {
    if (selectedGoals.length === 0) return [];

    // Collect peptides for all selected goals, tracking which goals each matches
    const peptideMap = new Map<
      string,
      { treatment: Treatment; matchedGoals: string[] }
    >();

    for (const goalId of selectedGoals) {
      const results = getPeptidesForGoal(goalId);
      for (const t of results) {
        const existing = peptideMap.get(t.slug);
        if (existing) {
          existing.matchedGoals.push(goalId);
        } else {
          peptideMap.set(t.slug, { treatment: t, matchedGoals: [goalId] });
        }
      }
    }

    // Sort by number of matched goals (desc), then kamura score (desc)
    return Array.from(peptideMap.values()).sort((a, b) => {
      if (b.matchedGoals.length !== a.matchedGoals.length) {
        return b.matchedGoals.length - a.matchedGoals.length;
      }
      return b.treatment.kamuraScore - a.treatment.kamuraScore;
    });
  }, [selectedGoals]);

  const getGoalLabel = (id: string) =>
    PEPTIDE_GOALS.find((g) => g.id === id)?.label || id;

  const getGoalDescription = (id: string) =>
    PEPTIDE_GOALS.find((g) => g.id === id)?.description || "";

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[40vh] flex items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1559757175-5700dde675bc?w=1920&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-forest/70 via-black/40 to-forest/60" />
        <div className="relative z-10 text-center px-6 py-16 md:py-20 max-w-4xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase mb-4 text-white/70 font-sans">
            AI-Powered
          </p>
          <h1 className="font-serif text-4xl md:text-[52px] font-bold leading-tight mb-4 text-white">
            Peptide Advisor
          </h1>
          <p className="text-base md:text-lg text-white/80 max-w-[560px] mx-auto leading-relaxed font-sans">
            Select your health goals and get evidence-based peptide
            recommendations ranked by Kamura Score.
          </p>
        </div>
      </section>

      {/* Goal Selection */}
      <section className="py-16 md:py-20 bg-[#EDE7DB]">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-xs uppercase tracking-[0.2em] text-terracotta font-sans mb-3 text-center">
            Step 1
          </p>
          <h2 className="font-serif text-2xl md:text-3xl text-gray-900 text-center mb-2">
            What Are Your Goals?
          </h2>
          <p className="text-sm text-gray-500 font-sans text-center mb-8">
            Select one or more health goals. We will show you the best peptides
            for your needs.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {PEPTIDE_GOALS.map((goal) => {
              const isSelected = selectedGoals.includes(goal.id);
              return (
                <button
                  key={goal.id}
                  onClick={() => toggleGoal(goal.id)}
                  className={`group p-4 rounded-2xl border text-left transition-all ${
                    isSelected
                      ? "border-[#B5736A] bg-[#B5736A]/10 shadow-md"
                      : "border-gray-200/60 bg-white hover:border-terracotta/30 hover:shadow-md"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl">{goal.icon}</span>
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                        isSelected
                          ? "border-[#B5736A] bg-[#B5736A]"
                          : "border-gray-300"
                      }`}
                    >
                      {isSelected && (
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="white"
                          strokeWidth="3"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      )}
                    </div>
                  </div>
                  <p
                    className={`font-sans text-sm font-semibold transition-colors ${
                      isSelected ? "text-[#B5736A]" : "text-gray-900"
                    }`}
                  >
                    {goal.label}
                  </p>
                  <p className="text-xs text-gray-500 font-sans mt-1 leading-relaxed">
                    {goal.description}
                  </p>
                </button>
              );
            })}
          </div>

          {selectedGoals.length > 0 && (
            <div className="text-center mt-6">
              <button
                onClick={() => setSelectedGoals([])}
                className="text-xs text-gray-400 font-sans hover:text-gray-600 underline underline-offset-4"
              >
                Clear all selections
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Recommendations */}
      <section className="py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-6">
          {selectedGoals.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-4xl mb-4">&#x1F50D;</p>
              <h3 className="font-serif text-xl text-gray-900 mb-2">
                Select Your Goals Above
              </h3>
              <p className="text-sm text-gray-500 font-sans max-w-md mx-auto">
                Choose one or more health goals and we will recommend the best
                peptides based on evidence, safety, and value.
              </p>
            </div>
          ) : (
            <>
              <p className="text-xs uppercase tracking-[0.2em] text-terracotta font-sans mb-3">
                Step 2
              </p>
              <h2 className="font-serif text-2xl md:text-3xl text-gray-900 mb-2">
                Your Recommendations
              </h2>
              <p className="text-sm text-gray-500 font-sans mb-8">
                {recommendations.length} peptide
                {recommendations.length !== 1 ? "s" : ""} match your selected
                goal{selectedGoals.length !== 1 ? "s" : ""}.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {recommendations.map(({ treatment: t, matchedGoals }) => {
                  const topOutcome = t.outcomes?.[0];
                  return (
                    <div
                      key={t.slug}
                      className="bg-white rounded-2xl border border-gray-200 p-5 hover:shadow-lg transition-shadow"
                    >
                      {/* Header */}
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-serif text-lg text-gray-900">
                            {t.name}
                          </h3>
                          <p className="text-xs text-gray-400 font-sans mt-0.5">
                            {t.evidenceLevel} evidence &middot;{" "}
                            {t.studyCount} studies
                          </p>
                        </div>
                        <KamuraScoreBadge score={t.kamuraScore} size="sm" />
                      </div>

                      {/* Why it matches */}
                      <div className="mb-3">
                        <p className="text-[10px] uppercase tracking-wider text-gray-400 font-sans mb-1.5">
                          Why this matches
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {matchedGoals.map((gId) => (
                            <span
                              key={gId}
                              className="text-[10px] px-2 py-0.5 rounded-full bg-[#B5736A]/10 text-[#B5736A] font-sans font-medium"
                            >
                              {getGoalLabel(gId)}
                            </span>
                          ))}
                        </div>
                        {matchedGoals.length === 1 && (
                          <p className="text-xs text-gray-500 font-sans mt-1.5 leading-relaxed">
                            {getGoalDescription(matchedGoals[0])}
                          </p>
                        )}
                      </div>

                      {/* Top Outcome */}
                      {topOutcome && (
                        <div className="mb-3 bg-gray-50 rounded-xl p-3">
                          <p className="text-[10px] uppercase tracking-wider text-gray-400 font-sans mb-1">
                            Top Outcome
                          </p>
                          <p className="text-sm font-sans font-semibold text-gray-900">
                            {topOutcome.name}
                          </p>
                          <p className="text-xs text-gray-500 font-sans mt-0.5">
                            {topOutcome.description}
                          </p>
                        </div>
                      )}

                      {/* Details */}
                      <div className="grid grid-cols-2 gap-3 mb-4">
                        <div>
                          <p className="text-[10px] uppercase tracking-wider text-gray-400 font-sans mb-1">
                            Administration
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {t.administrationRoutes.map((route) => (
                              <span
                                key={route}
                                className="text-[10px] px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 font-sans"
                              >
                                {route}
                              </span>
                            ))}
                          </div>
                        </div>
                        {t.costEstimate && (
                          <div>
                            <p className="text-[10px] uppercase tracking-wider text-gray-400 font-sans mb-1">
                              Cost Estimate
                            </p>
                            <p className="text-xs text-gray-700 font-sans">
                              {t.costEstimate}
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Link */}
                      <Link
                        href={`/treatments/${t.slug}`}
                        className="inline-flex items-center gap-1 text-xs font-sans text-terracotta hover:underline underline-offset-4"
                      >
                        View full treatment details &rarr;
                      </Link>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Disclaimer */}
      <section className="border-t border-gray-200 bg-[#EDE7DB]">
        <div className="max-w-6xl mx-auto px-6 py-12 text-center">
          <p className="text-xs text-gray-500 font-sans leading-relaxed max-w-2xl mx-auto">
            This advisor provides educational information only and is not a
            substitute for professional medical advice. Always consult a
            qualified healthcare provider before starting any peptide therapy.
            Recommendations are based on published research and the Kamura
            scoring methodology.
          </p>
        </div>
      </section>
    </>
  );
}
