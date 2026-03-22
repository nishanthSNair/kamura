"use client";

import { type WellnessConcern } from "@/data/wellness-concerns";

interface ConcernExplainerProps {
  concerns: WellnessConcern[];
}

export default function ConcernExplainer({ concerns }: ConcernExplainerProps) {
  return (
    <div className="space-y-4">
      {concerns.map((concern) => (
        <div
          key={concern.id}
          className="bg-white dark:bg-[#1C1815] border border-gray-200 dark:border-white/[0.06] rounded-xl p-5 md:p-6"
        >
          <div className="flex items-start gap-3 mb-3">
            <span className="text-2xl leading-none">{concern.icon}</span>
            <div>
              <h3 className="font-serif text-lg text-gray-900 dark:text-[#F0EBE2]">
                {concern.label}
              </h3>
              <p className="text-sm text-gray-600 dark:text-[#8B8070] font-sans mt-1 leading-relaxed">
                {concern.education.summary}
              </p>
            </div>
          </div>

          <div className="ml-0 md:ml-9 space-y-3">
            {/* Common causes */}
            <div>
              <p className="text-xs font-sans font-semibold text-gray-400 dark:text-[#6B6358] uppercase tracking-wider mb-1.5">
                Common Causes
              </p>
              <div className="flex flex-wrap gap-1.5">
                {concern.education.commonCauses.map((cause) => (
                  <span
                    key={cause}
                    className="px-2.5 py-1 bg-gray-100 dark:bg-white/[0.04] text-xs text-gray-600 dark:text-[#8B8070] rounded-full font-sans"
                  >
                    {cause}
                  </span>
                ))}
              </div>
            </div>

            {/* Research insight */}
            <div className="bg-sage-light/20 dark:bg-[#C4A882]/[0.06] rounded-lg p-3.5">
              <p className="text-xs font-sans font-semibold text-moss dark:text-[#C4A882] uppercase tracking-wider mb-1">
                What Research Suggests
              </p>
              <p className="text-sm text-gray-700 dark:text-[#A89880] font-sans leading-relaxed">
                {concern.education.researchInsight}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
