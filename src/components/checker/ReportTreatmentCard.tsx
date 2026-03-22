"use client";

import { useState } from "react";
import Link from "next/link";
import { type EnrichedMatchedTreatment } from "@/data/wellness-checker";
import KamuraScoreBadge from "@/components/treatments/KamuraScoreBadge";
import EvidenceLevelTag from "@/components/treatments/EvidenceLevelTag";

interface ReportTreatmentCardProps {
  result: EnrichedMatchedTreatment;
  rank: number;
  delay?: number;
}

const GRADE_LABELS: Record<string, string> = {
  A: "Strong Evidence",
  B: "Good Evidence",
  C: "Emerging",
  D: "Limited",
  F: "Insufficient",
};

const GRADE_COLORS: Record<string, string> = {
  A: "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10",
  B: "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10",
  C: "text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10",
  D: "text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-500/10",
  F: "text-red-500 dark:text-red-400 bg-red-50 dark:bg-red-500/10",
};

export default function ReportTreatmentCard({
  result,
  rank,
  delay = 0,
}: ReportTreatmentCardProps) {
  const [expanded, setExpanded] = useState(false);
  const t = result.treatment;

  return (
    <div
      className="animate-result-card bg-white dark:bg-[#1C1815] border border-gray-200 dark:border-white/[0.06] rounded-xl overflow-hidden"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Collapsed header — always visible */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full text-left p-4 md:p-5 flex items-start gap-4 hover:bg-gray-50/50 dark:hover:bg-white/[0.02] transition-colors"
      >
        {/* Rank badge */}
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-terracotta/10 dark:bg-[#C4A882]/10 flex items-center justify-center">
          <span className="text-xs font-bold text-terracotta dark:text-[#C4A882] font-sans">
            #{rank}
          </span>
        </div>

        {/* Main content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-lg leading-none">{t.icon}</span>
            <h3 className="font-serif text-base md:text-lg text-gray-900 dark:text-[#F0EBE2] truncate">
              {t.name}
            </h3>
            <EvidenceLevelTag level={t.evidenceLevel} />
          </div>

          {/* Match reasons */}
          <p className="text-xs text-terracotta dark:text-[#C4A882] font-sans mb-2">
            Addresses: {result.matchReasons.join(", ")}
          </p>

          {/* Mechanism snippet */}
          {result.mechanism && (
            <p className="text-sm text-gray-600 dark:text-[#8B8070] font-sans line-clamp-2 leading-relaxed">
              {result.mechanism}
            </p>
          )}

          {/* Quick stats row */}
          <div className="flex flex-wrap items-center gap-3 mt-2.5 text-xs text-gray-500 dark:text-[#6B6358] font-sans">
            {result.topOutcome && (
              <span className={`px-2 py-0.5 rounded-full font-semibold ${GRADE_COLORS[result.topOutcome.grade] || ""}`}>
                Grade {result.topOutcome.grade}: {result.topOutcome.name}
              </span>
            )}
            {result.protocol && (
              <span>{result.protocol.dosage}</span>
            )}
            {result.communityData.positivePercent > 0 && (
              <span>{result.communityData.positivePercent}% positive</span>
            )}
          </div>
        </div>

        {/* Score + expand */}
        <div className="flex-shrink-0 flex flex-col items-center gap-2">
          <KamuraScoreBadge score={t.kamuraScore} size="sm" />
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className={`text-gray-400 transition-transform ${expanded ? "rotate-180" : ""}`}
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </button>

      {/* Expanded details */}
      {expanded && (
        <div className="border-t border-gray-100 dark:border-white/[0.04] px-4 md:px-5 pb-5 pt-4 space-y-5 animate-blueprint-fade-in">
          {/* Evidence & Study */}
          {result.topOutcome && (
            <div>
              <h4 className="text-xs font-sans font-semibold text-gray-400 dark:text-[#6B6358] uppercase tracking-wider mb-2">
                Top Evidence
              </h4>
              <div className="bg-gray-50 dark:bg-white/[0.03] rounded-lg p-3.5">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${GRADE_COLORS[result.topOutcome.grade] || ""}`}>
                    {GRADE_LABELS[result.topOutcome.grade] || result.topOutcome.grade}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-[#6B6358] font-sans">
                    {result.topOutcome.studyCount} studies &middot; {result.topOutcome.consistency} consistency
                  </span>
                </div>
                <p className="text-sm text-gray-700 dark:text-[#A89880] font-sans leading-relaxed">
                  {result.topOutcome.description}
                </p>
              </div>
            </div>
          )}

          {/* Key Study */}
          {result.topStudy && (
            <div>
              <h4 className="text-xs font-sans font-semibold text-gray-400 dark:text-[#6B6358] uppercase tracking-wider mb-2">
                Key Study
              </h4>
              <div className="bg-gray-50 dark:bg-white/[0.03] rounded-lg p-3.5">
                <p className="text-sm font-sans font-medium text-gray-800 dark:text-[#D4C8B8] leading-snug">
                  &ldquo;{result.topStudy.title}&rdquo;
                </p>
                <p className="text-xs text-gray-500 dark:text-[#6B6358] font-sans mt-1">
                  {result.topStudy.authors} &middot; {result.topStudy.journal} ({result.topStudy.year})
                  {result.topStudy.pmid && (
                    <> &middot; PMID: {result.topStudy.pmid}</>
                  )}
                </p>
                <p className="text-sm text-gray-600 dark:text-[#8B8070] font-sans mt-2 leading-relaxed">
                  {result.topStudy.finding}
                </p>
              </div>
            </div>
          )}

          {/* Protocol */}
          {result.protocol && (
            <div>
              <h4 className="text-xs font-sans font-semibold text-gray-400 dark:text-[#6B6358] uppercase tracking-wider mb-2">
                Suggested Protocol
              </h4>
              <div className="flex items-start gap-3 bg-terracotta/[0.04] dark:bg-[#C4A882]/[0.06] rounded-lg p-3.5">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-terracotta/10 dark:bg-[#C4A882]/10 flex items-center justify-center text-sm">
                  {t.icon}
                </div>
                <div>
                  <p className="text-sm font-sans font-semibold text-gray-800 dark:text-[#D4C8B8]">
                    {result.protocol.label}
                  </p>
                  <p className="text-sm text-terracotta dark:text-[#C4A882] font-sans font-medium">
                    {result.protocol.dosage}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-[#6B6358] font-sans mt-1">
                    {result.protocol.notes}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Community */}
          {result.communityData.totalReports > 0 && (
            <div>
              <h4 className="text-xs font-sans font-semibold text-gray-400 dark:text-[#6B6358] uppercase tracking-wider mb-2">
                Community Experience
              </h4>
              <div className="flex flex-wrap gap-4 text-sm font-sans">
                <div>
                  <span className="text-gray-500 dark:text-[#6B6358]">Satisfaction: </span>
                  <span className="font-medium text-gray-800 dark:text-[#D4C8B8]">
                    {result.communityData.satisfaction}
                  </span>
                </div>
                <div>
                  <span className="text-gray-500 dark:text-[#6B6358]">Time to effect: </span>
                  <span className="font-medium text-gray-800 dark:text-[#D4C8B8]">
                    {result.communityData.timeToEffect}
                  </span>
                </div>
                <div>
                  <span className="text-gray-500 dark:text-[#6B6358]">Reports: </span>
                  <span className="font-medium text-gray-800 dark:text-[#D4C8B8]">
                    {result.communityData.totalReports}
                  </span>
                </div>
              </div>
              {result.communityData.quotes.length > 0 && (
                <blockquote className="mt-2.5 pl-3 border-l-2 border-terracotta/30 dark:border-[#C4A882]/30">
                  <p className="text-sm text-gray-600 dark:text-[#8B8070] font-sans italic leading-relaxed">
                    &ldquo;{result.communityData.quotes[0].text}&rdquo;
                  </p>
                  <cite className="text-xs text-gray-400 dark:text-[#6B6358] font-sans not-italic">
                    &mdash; {result.communityData.quotes[0].source}, {result.communityData.quotes[0].location}
                  </cite>
                </blockquote>
              )}
            </div>
          )}

          {/* Safety & Cost row */}
          <div className="flex flex-col sm:flex-row gap-4">
            {result.safety && result.safety.common.length > 0 && (
              <div className="flex-1">
                <h4 className="text-xs font-sans font-semibold text-gray-400 dark:text-[#6B6358] uppercase tracking-wider mb-2">
                  Common Side Effects
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {result.safety.common.slice(0, 5).map((effect) => (
                    <span
                      key={effect}
                      className="px-2 py-0.5 bg-amber-50 dark:bg-amber-500/10 text-xs text-amber-700 dark:text-amber-400 rounded-full font-sans"
                    >
                      {effect}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {result.costEstimate && (
              <div className="flex-shrink-0">
                <h4 className="text-xs font-sans font-semibold text-gray-400 dark:text-[#6B6358] uppercase tracking-wider mb-2">
                  Estimated Cost
                </h4>
                <p className="text-sm font-sans font-medium text-gray-800 dark:text-[#D4C8B8]">
                  {result.costEstimate}
                </p>
              </div>
            )}
          </div>

          {/* Link to full treatment page */}
          <Link
            href={`/treatments/${t.slug}`}
            className="inline-flex items-center gap-1.5 text-sm font-sans text-terracotta dark:text-[#C4A882] hover:underline"
          >
            View full treatment details
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      )}
    </div>
  );
}
