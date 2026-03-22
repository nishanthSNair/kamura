"use client";

import { useState } from "react";
import {
  type BodyZone,
  type WellnessConcern,
  ZONES,
} from "@/data/wellness-concerns";
import { type MatchedTreatment } from "@/data/wellness-checker";
import ResultCard from "./ResultCard";

interface CheckerResultsProps {
  results: MatchedTreatment[];
  selectedConcerns: WellnessConcern[];
  completedZones: BodyZone[];
  onAddAnother: () => void;
  onRestart: () => void;
}

const INITIAL_SHOW = 6;

export default function CheckerResults({
  results,
  selectedConcerns,
  completedZones,
  onAddAnother,
  onRestart,
}: CheckerResultsProps) {
  const [showAll, setShowAll] = useState(false);
  const [concernsOpen, setConcernsOpen] = useState(false);

  const displayed = showAll ? results : results.slice(0, INITIAL_SHOW);
  const remaining = results.length - INITIAL_SHOW;

  // Group concerns by zone
  const concernsByZone = completedZones.map((zone) => ({
    zone,
    config: ZONES.find((z) => z.zone === zone)!,
    concerns: selectedConcerns.filter((c) => c.zone === zone),
  }));

  return (
    <div className="min-h-screen px-6 pt-24 pb-20">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 md:mb-10">
          <h1 className="font-serif text-2xl md:text-4xl text-gray-900 dark:text-[#F0EBE2]">
            Your Wellness Recommendations
          </h1>
          <p className="text-sm text-gray-500 dark:text-[#6B6358] font-sans mt-2">
            {results.length} treatments matched to your concerns, ranked by
            relevance and evidence
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-24 space-y-4">
              {/* Concern summary — desktop */}
              <div className="hidden lg:block bg-white dark:bg-[#1C1815] border border-gray-200 dark:border-white/[0.06] rounded-xl p-5">
                <h3 className="text-xs font-sans font-semibold text-gray-400 dark:text-[#6B6358] uppercase tracking-wider mb-3">
                  Your Concerns
                </h3>
                {concernsByZone.map(({ zone, config, concerns }) => (
                  <div key={zone} className="mb-3 last:mb-0">
                    <p className="text-sm font-sans font-medium text-gray-700 dark:text-gray-300 mb-1">
                      {config.icon} {config.label}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {concerns.map((c) => (
                        <span
                          key={c.id}
                          className="px-2 py-0.5 bg-terracotta/10 dark:bg-[#C4A882]/10 text-[11px] text-terracotta dark:text-[#C4A882] rounded-full font-sans"
                        >
                          {c.label}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}

                <div className="border-t border-gray-100 dark:border-white/[0.04] pt-4 mt-4 space-y-2">
                  <button
                    onClick={onAddAnother}
                    className="w-full py-2.5 text-sm font-sans text-terracotta hover:text-terracotta-dark border border-terracotta/30 rounded-full transition-colors"
                  >
                    + Add another area
                  </button>
                  <button
                    onClick={onRestart}
                    className="w-full py-2.5 text-sm font-sans text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                  >
                    Start over
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="lg:col-span-3">
            {/* Mobile concern accordion */}
            <div className="lg:hidden mb-6">
              <button
                onClick={() => setConcernsOpen(!concernsOpen)}
                className="w-full flex items-center justify-between px-4 py-3 bg-white dark:bg-[#1C1815] border border-gray-200 dark:border-white/[0.06] rounded-xl text-sm font-sans"
              >
                <span className="text-gray-700 dark:text-gray-300 font-medium">
                  Your concerns ({selectedConcerns.length})
                </span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className={`text-gray-400 transition-transform ${
                    concernsOpen ? "rotate-180" : ""
                  }`}
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
              {concernsOpen && (
                <div className="mt-2 px-4 py-3 bg-white dark:bg-[#1C1815] border border-gray-200 dark:border-white/[0.06] rounded-xl animate-blueprint-fade-in">
                  {concernsByZone.map(({ zone, config, concerns }) => (
                    <div key={zone} className="mb-2.5 last:mb-0">
                      <p className="text-xs font-sans font-medium text-gray-600 dark:text-gray-400 mb-1">
                        {config.icon} {config.label}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {concerns.map((c) => (
                          <span
                            key={c.id}
                            className="px-2 py-0.5 bg-terracotta/10 dark:bg-[#C4A882]/10 text-[11px] text-terracotta dark:text-[#C4A882] rounded-full font-sans"
                          >
                            {c.label}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                  <div className="flex gap-2 mt-3 pt-3 border-t border-gray-100 dark:border-white/[0.04]">
                    <button
                      onClick={onAddAnother}
                      className="flex-1 py-2 text-xs font-sans text-terracotta border border-terracotta/30 rounded-full"
                    >
                      + Add area
                    </button>
                    <button
                      onClick={onRestart}
                      className="flex-1 py-2 text-xs font-sans text-gray-400 border border-gray-200 dark:border-white/[0.06] rounded-full"
                    >
                      Start over
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Result cards */}
            {results.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-gray-400 font-sans">
                  No treatments matched your concerns. Try selecting different
                  concerns or adding another body area.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {displayed.map((result, i) => (
                  <ResultCard
                    key={result.treatment.slug}
                    result={result}
                    rank={i + 1}
                    delay={i * 60}
                  />
                ))}

                {!showAll && remaining > 0 && (
                  <button
                    onClick={() => setShowAll(true)}
                    className="w-full py-3.5 mt-2 border border-gray-200 dark:border-white/[0.06] rounded-xl text-sm font-sans text-gray-600 dark:text-gray-400 hover:border-terracotta/40 hover:text-terracotta transition-all bg-white dark:bg-[#1C1815]"
                  >
                    Show {remaining} more treatments
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
