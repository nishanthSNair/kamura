"use client";

import { useState } from "react";
import {
  type BodyZone,
  type WellnessConcern,
  type ConcernDuration,
  ZONES,
  DURATION_OPTIONS,
} from "@/data/wellness-concerns";

interface ConcernPickerProps {
  zone: BodyZone;
  existingConcerns: WellnessConcern[];
  onSubmit: (
    concerns: WellnessConcern[],
    duration?: ConcernDuration
  ) => void;
  onAddAnother: (
    concerns: WellnessConcern[],
    duration?: ConcernDuration
  ) => void;
  onBack: () => void;
}

const MAX_CONCERNS = 3;

export default function ConcernPicker({
  zone,
  existingConcerns,
  onSubmit,
  onAddAnother,
  onBack,
}: ConcernPickerProps) {
  const config = ZONES.find((z) => z.zone === zone)!;
  const [selected, setSelected] = useState<WellnessConcern[]>([]);
  const [duration, setDuration] = useState<ConcernDuration | null>(null);

  // Filter out already-selected concerns from previous zones
  const existingIds = new Set(existingConcerns.map((c) => c.id));
  const availableConcerns = config.concerns.filter(
    (c) => !existingIds.has(c.id)
  );

  function toggleConcern(concern: WellnessConcern) {
    setSelected((prev) => {
      const exists = prev.find((c) => c.id === concern.id);
      if (exists) return prev.filter((c) => c.id !== concern.id);
      if (prev.length >= MAX_CONCERNS) return prev;
      return [...prev, concern];
    });
  }

  const canSubmit = selected.length > 0;

  return (
    <div className="min-h-screen flex flex-col px-6 pt-24 pb-16">
      <div className="max-w-lg mx-auto w-full animate-blueprint-fade-in">
        {/* Back button */}
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 font-sans mb-8 transition-colors"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Back to body map
        </button>

        {/* Zone header */}
        <div className="mb-8">
          <h2 className="font-serif text-2xl md:text-3xl text-gray-900 dark:text-[#F0EBE2]">
            {config.icon} {config.label}
          </h2>
          <p className="text-sm text-gray-500 dark:text-[#6B6358] font-sans mt-1.5">
            {config.description}
          </p>
        </div>

        {/* Concern selection */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-sans font-medium text-gray-700 dark:text-gray-300">
              What concerns you most?
            </p>
            <span className="text-xs font-sans text-gray-400 dark:text-[#6B6358]">
              {selected.length}/{MAX_CONCERNS} selected
            </span>
          </div>
          <div className="flex flex-wrap gap-2.5">
            {availableConcerns.map((concern) => {
              const isSelected = selected.some((c) => c.id === concern.id);
              const isDisabled =
                !isSelected && selected.length >= MAX_CONCERNS;

              return (
                <button
                  key={concern.id}
                  onClick={() => !isDisabled && toggleConcern(concern)}
                  disabled={isDisabled}
                  className={`px-4 py-3 rounded-xl border text-sm font-sans transition-all ${
                    isSelected
                      ? "border-terracotta bg-terracotta/10 text-terracotta dark:text-[#C4A882] dark:border-[#C4A882]/40 dark:bg-[#C4A882]/10"
                      : isDisabled
                      ? "border-gray-100 dark:border-white/[0.03] text-gray-300 dark:text-gray-600 cursor-not-allowed"
                      : "border-gray-200 dark:border-white/[0.06] text-gray-700 dark:text-gray-300 bg-white dark:bg-[#1C1815] hover:border-terracotta/40 hover:bg-terracotta/5"
                  }`}
                >
                  {concern.icon} {concern.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Follow-up question — appears after selecting at least 1 concern */}
        {selected.length > 0 && (
          <div className="mb-10 animate-blueprint-fade-in">
            <p className="text-sm font-sans font-medium text-gray-700 dark:text-gray-300 mb-3">
              {config.followUpQuestion}
              <span className="text-gray-400 dark:text-[#6B6358] ml-1 font-normal">
                (optional)
              </span>
            </p>
            <div className="flex flex-wrap gap-2">
              {DURATION_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() =>
                    setDuration((prev) =>
                      prev === opt.value ? null : opt.value
                    )
                  }
                  className={`px-4 py-2.5 rounded-xl border text-sm font-sans transition-all ${
                    duration === opt.value
                      ? "border-terracotta bg-terracotta/10 text-terracotta dark:text-[#C4A882] dark:border-[#C4A882]/40 dark:bg-[#C4A882]/10"
                      : "border-gray-200 dark:border-white/[0.06] text-gray-600 dark:text-gray-400 bg-white dark:bg-[#1C1815] hover:border-terracotta/40"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* CTAs */}
        {canSubmit && (
          <div className="space-y-3 animate-blueprint-fade-in">
            <button
              onClick={() =>
                onSubmit(selected, duration || undefined)
              }
              className="w-full py-3.5 bg-terracotta hover:bg-terracotta-dark text-white font-sans font-medium rounded-full shadow-md hover:shadow-lg transition-all text-sm"
            >
              See Recommendations
            </button>
            <button
              onClick={() =>
                onAddAnother(selected, duration || undefined)
              }
              className="w-full py-3 text-sm font-sans text-gray-500 dark:text-gray-400 hover:text-terracotta transition-colors"
            >
              + Add another body area first
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
