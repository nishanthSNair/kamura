"use client";

import Link from "next/link";
import { type MatchedTreatment } from "@/data/wellness-checker";
import KamuraScoreBadge from "@/components/treatments/KamuraScoreBadge";
import EvidenceLevelTag from "@/components/treatments/EvidenceLevelTag";

interface ResultCardProps {
  result: MatchedTreatment;
  rank: number;
  delay?: number;
}

export default function ResultCard({ result, rank, delay = 0 }: ResultCardProps) {
  const t = result.treatment;

  return (
    <Link
      href={`/treatments/${t.slug}`}
      className="group block bg-white dark:bg-[#1C1815] border border-gray-200 dark:border-white/[0.06] rounded-xl p-4 md:p-5 hover:border-sage/40 hover:shadow-lg transition-all animate-result-card"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-start gap-4">
        {/* Rank badge */}
        <div className="shrink-0 w-8 h-8 rounded-full bg-terracotta/10 dark:bg-terracotta/15 flex items-center justify-center">
          <span className="text-xs font-bold text-terracotta dark:text-[#C4A882] font-sans">
            #{rank}
          </span>
        </div>

        {/* Content */}
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-lg">{t.icon}</span>
                <h3 className="font-semibold text-[15px] text-gray-900 dark:text-[#F0EBE2] font-sans truncate group-hover:text-terracotta transition-colors">
                  {t.name}
                </h3>
              </div>
              {t.fullName !== t.name && (
                <p className="text-[11px] text-gray-400 dark:text-[#6B6358] font-sans mb-2">
                  {t.fullName}
                </p>
              )}
            </div>

            {/* Score badge */}
            <div className="shrink-0">
              <KamuraScoreBadge score={t.kamuraScore} size="sm" />
            </div>
          </div>

          {/* Match reasons */}
          <p className="text-xs text-terracotta dark:text-[#C4A882] font-sans font-medium mb-2">
            Addresses: {result.matchReasons.join(", ")}
          </p>

          {/* Description */}
          <p className="text-xs text-gray-500 dark:text-[#A89F90] font-sans leading-relaxed mb-3 line-clamp-2">
            {t.description}
          </p>

          {/* Meta row */}
          <div className="flex items-center gap-2 flex-wrap">
            <EvidenceLevelTag level={t.evidenceLevel} />
            <span className="px-2.5 py-0.5 bg-zen-mist dark:bg-forest/20 rounded-full text-[10px] text-gray-500 dark:text-gray-400 font-sans">
              {t.category}
            </span>
            <span className="text-[11px] text-gray-400 dark:text-[#6B6358] font-sans">
              {t.community.positivePercent}% positive
            </span>
          </div>
        </div>
      </div>

      {/* Arrow hint */}
      <div className="flex justify-end mt-2">
        <span className="text-xs text-gray-400 dark:text-gray-600 group-hover:text-terracotta group-hover:translate-x-1 transition-all font-sans">
          Learn more &rarr;
        </span>
      </div>
    </Link>
  );
}
