"use client";

import { useMemo } from "react";
import { useStackContext } from "@/context/StackContext";
import { protocols } from "@/data/protocols";
import { treatments } from "@/data/treatments";

interface ProtocolCompareProps {
  onClose: () => void;
}

export default function ProtocolCompare({ onClose }: ProtocolCompareProps) {
  const { items, addItem } = useStackContext();

  const stackSlugs = useMemo(() => new Set(items.map((i) => i.slug)), [items]);
  const treatmentMap = useMemo(() => {
    const map = new Map<string, string>();
    for (const t of treatments) map.set(t.slug, t.name);
    return map;
  }, []);

  const comparisons = useMemo(
    () =>
      protocols.map((p) => {
        const protocolSlugs = p.relatedTreatmentSlugs;
        const overlap = protocolSlugs.filter((s) => stackSlugs.has(s));
        const missing = protocolSlugs.filter((s) => !stackSlugs.has(s));
        const overlapPercent = protocolSlugs.length > 0 ? Math.round((overlap.length / protocolSlugs.length) * 100) : 0;
        return { protocol: p, overlap, missing, overlapPercent };
      }),
    [stackSlugs]
  );

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white dark:bg-[#14110E] rounded-2xl shadow-2xl w-full max-w-lg max-h-[80vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200 dark:border-white/[0.06]">
          <h2 className="font-serif text-lg text-gray-900 dark:text-[#F0EBE2]">
            Compare with Protocols
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-white/[0.04] rounded-lg transition-colors">
            <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {comparisons.map(({ protocol, overlap, missing, overlapPercent }) => (
            <div key={protocol.slug} className="border border-gray-200 dark:border-white/[0.06] rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-sm text-gray-900 dark:text-[#F0EBE2] font-sans">
                    {protocol.name}
                  </h3>
                  <p className="text-[11px] text-gray-500 dark:text-[#6B6358] font-sans">
                    by {protocol.creator}
                  </p>
                </div>
                <div className={`px-3 py-1.5 rounded-full text-sm font-bold font-sans ${
                  overlapPercent >= 70
                    ? "bg-[#16A34A]/10 text-[#16A34A] dark:text-[#4ADE80]"
                    : overlapPercent >= 30
                    ? "bg-[#CA8A04]/10 text-[#CA8A04] dark:text-[#FACC15]"
                    : "bg-gray-100 dark:bg-white/[0.04] text-gray-500 dark:text-[#6B6358]"
                }`}>
                  {overlapPercent}%
                </div>
              </div>

              {/* Progress bar */}
              <div className="h-1.5 bg-gray-100 dark:bg-white/[0.04] rounded-full overflow-hidden mb-3">
                <div
                  className="h-full bg-[#B5736A] rounded-full transition-all"
                  style={{ width: `${overlapPercent}%` }}
                />
              </div>

              <p className="text-[11px] text-gray-500 dark:text-[#A89F90] font-sans mb-2">
                {overlap.length} of {protocol.relatedTreatmentSlugs.length} treatments in common
              </p>

              {/* Missing treatments — add buttons */}
              {missing.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {missing.slice(0, 5).map((slug) => (
                    <button
                      key={slug}
                      onClick={() => addItem(slug)}
                      className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-sans bg-gray-50 dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.06] text-gray-500 dark:text-[#6B6358] hover:border-[#B5736A]/40 hover:text-[#B5736A] transition-colors"
                    >
                      <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                      </svg>
                      {treatmentMap.get(slug) || slug}
                    </button>
                  ))}
                  {missing.length > 5 && (
                    <span className="px-2 py-1 text-[10px] text-gray-400 font-sans">
                      +{missing.length - 5} more
                    </span>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
