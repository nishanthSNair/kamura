import { EvidenceLevel, getEvidenceLevelColor, getScoreTier, getScoreTierColor, formatLastUpdated } from "@/data/treatments";

interface AtAGlanceStripProps {
  score: number;
  evidenceLevel: EvidenceLevel;
  costEstimate?: string;
  timeToEffect: string;
  uaeAvailable: boolean;
  lastUpdated?: string;
}

export default function AtAGlanceStrip({
  score,
  evidenceLevel,
  costEstimate,
  timeToEffect,
  uaeAvailable,
  lastUpdated,
}: AtAGlanceStripProps) {
  const tier = getScoreTier(score);
  const tierColors = getScoreTierColor(tier);
  const evidenceColors = getEvidenceLevelColor(evidenceLevel);

  const cells = [
    {
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z" />
        </svg>
      ),
      value: `${score}/100`,
      valueClass: tierColors.text,
      label: tier,
    },
    {
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 17H5a2 2 0 0 0-2 2 2 2 0 0 0 2 2h2a2 2 0 0 0 2-2zm12-2h-4a2 2 0 0 0-2 2 2 2 0 0 0 2 2h2a2 2 0 0 0 2-2z" />
          <polyline points="9 5 12 2 15 5" /><line x1="12" y1="2" x2="12" y2="14" />
        </svg>
      ),
      value: evidenceLevel,
      valueClass: evidenceColors.text,
      label: "Evidence",
    },
    {
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
        </svg>
      ),
      value: timeToEffect,
      valueClass: "text-gray-900 dark:text-[#F0EBE2]",
      label: "Time to Effect",
    },
    ...(costEstimate
      ? [
          {
            icon: (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            ),
            value: costEstimate,
            valueClass: "text-gray-900 dark:text-[#F0EBE2]",
            label: "Est. Cost",
          },
        ]
      : []),
    {
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
        </svg>
      ),
      value: uaeAvailable ? "Available" : "Limited",
      valueClass: uaeAvailable
        ? "text-[#16A34A] dark:text-[#4ADE80]"
        : "text-[#EA580C] dark:text-[#FB923C]",
      label: "UAE Access",
    },
  ];

  return (
    <section className="max-w-[1200px] mx-auto px-6 -mt-6 relative z-10">
      <div className="bg-white dark:bg-[#1C1815] border border-gray-200 dark:border-white/[0.06] rounded-2xl overflow-hidden">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 divide-x divide-gray-100 dark:divide-white/[0.04]">
          {cells.map((cell) => (
            <div key={cell.label} className="px-4 py-4 text-center">
              <div className="flex justify-center text-gray-400 dark:text-gray-500 mb-1.5">
                {cell.icon}
              </div>
              <div className={`text-sm font-semibold font-sans leading-tight ${cell.valueClass}`}>
                {cell.value}
              </div>
              <div className="text-[10px] text-gray-400 dark:text-[#6B6358] uppercase tracking-wider font-semibold font-sans mt-1">
                {cell.label}
              </div>
            </div>
          ))}
        </div>
        {lastUpdated && (
          <div className="border-t border-gray-100 dark:border-white/[0.04] px-4 py-2 text-center">
            <span className="text-[10px] text-gray-400 dark:text-[#6B6358] font-sans">
              Last reviewed: {formatLastUpdated(lastUpdated)}
            </span>
          </div>
        )}
      </div>
    </section>
  );
}
