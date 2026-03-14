"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { treatments, getScoreColor, getScoreTier, getScoreTierColor, ALL_TREATMENT_CATEGORIES, type TreatmentCategory, type Treatment } from "@/data/treatments";
import KamuraScoreBadge from "@/components/treatments/KamuraScoreBadge";
import EvidenceLevelTag from "@/components/treatments/EvidenceLevelTag";
import SubScoreBar from "@/components/treatments/SubScoreBar";
import FilterChip from "@/components/treatments/FilterChip";

type SortOption = "score" | "evidence" | "community" | "safety" | "name";

const CATEGORY_FILTERS: (TreatmentCategory | "All")[] = [
  "All",
  "Peptides",
  "GLP-1 & Weight Management",
  "Hormones",
  "Devices & Biohacking",
  "Supplements",
  "Holistic & Mind-Body",
  "Detox & Functional",
];

function getSubLabel(value: number): string {
  if (value >= 85) return "V.High";
  if (value >= 70) return "High";
  if (value >= 50) return "Mod.";
  if (value >= 30) return "Low";
  return "V.Low";
}

function getEvidenceLabel(level: string): string {
  return level;
}

export default function TreatmentsContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "All";
  const validCategory = ALL_TREATMENT_CATEGORIES.includes(initialCategory as TreatmentCategory)
    ? (initialCategory as TreatmentCategory)
    : "All";

  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<TreatmentCategory | "All">(validCategory);
  const [sortBy, setSortBy] = useState<SortOption>("score");

  const filtered = useMemo(() => {
    let result = [...treatments];

    // Filter by category
    if (activeCategory !== "All") {
      result = result.filter((t) => t.category === activeCategory);
    }

    // Filter by search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.fullName.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q) ||
          t.tags.some((tag) => tag.toLowerCase().includes(q)) ||
          t.category.toLowerCase().includes(q)
      );
    }

    // Sort
    switch (sortBy) {
      case "score":
        result.sort((a, b) => b.kamuraScore - a.kamuraScore);
        break;
      case "evidence":
        result.sort((a, b) => b.scores.research - a.scores.research);
        break;
      case "community":
        result.sort((a, b) => b.scores.community - a.scores.community);
        break;
      case "safety":
        result.sort((a, b) => b.scores.safety - a.scores.safety);
        break;
      case "name":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    return result;
  }, [searchQuery, activeCategory, sortBy]);

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="max-w-[1200px] mx-auto px-6 pt-16 pb-12 text-center">
        <span className="inline-block px-4 py-1.5 bg-kamura-gold/15 border border-kamura-gold/30 rounded-full text-xs font-semibold text-kamura-gold uppercase tracking-[1.5px] mb-6 font-sans">
          The World&apos;s First Unbiased Wellness Intelligence Platform
        </span>
        <h1 className="font-serif text-4xl md:text-[52px] font-bold leading-tight mb-5 text-gray-900 dark:text-[#F5F0EB]">
          Every Treatment. Scored. Transparent.
        </h1>
        <p className="text-lg text-gray-500 dark:text-[#A89F95] max-w-[700px] mx-auto leading-relaxed font-sans mb-8">
          We index every wellness and longevity treatment, score them on real evidence,
          community experience, safety, and accessibility — so you can make decisions
          based on truth, not marketing.
        </p>
        <Link
          href="/treatments/methodology"
          className="inline-flex items-center gap-2 text-sm text-kamura-gold hover:text-kamura-gold/80 transition-colors font-sans font-medium"
        >
          How we calculate the Kamura Score &rarr;
        </Link>
      </section>

      {/* Kamura Score Explainer */}
      <section className="max-w-[1200px] mx-auto px-6 mb-16">
        <div className="bg-white dark:bg-[#1A1A1A] border border-gray-200 dark:border-white/[0.06] rounded-2xl p-8 md:p-10 grid md:grid-cols-2 gap-8 md:gap-10">
          <div>
            <h2 className="font-serif text-2xl md:text-[28px] text-gray-900 dark:text-[#F5F0EB] mb-4">
              A score you can trust
            </h2>
            <p className="text-gray-500 dark:text-[#A89F95] text-[15px] leading-relaxed font-sans mb-3">
              Unlike rating sites influenced by advertising, the Kamura Score is calculated
              from publicly verifiable data. Every sub-score is shown transparently — you can
              see exactly why a treatment scores the way it does.
            </p>
            <p className="text-gray-500 dark:text-[#A89F95] text-[15px] leading-relaxed font-sans mb-5">
              Treatments are graded on a 0-100 scale and assigned a tier:
            </p>
            <div className="flex flex-wrap gap-2">
              {(["Gold Standard", "Strong", "Promising", "Limited", "Insufficient"] as const).map((tier) => {
                const colors = getScoreTierColor(tier);
                const ranges: Record<string, string> = {
                  "Gold Standard": "85-100",
                  Strong: "70-84",
                  Promising: "50-69",
                  Limited: "30-49",
                  Insufficient: "0-29",
                };
                return (
                  <span
                    key={tier}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[13px] font-semibold border font-sans ${colors.bg} ${colors.text} ${colors.border}`}
                  >
                    {ranges[tier]} {tier}
                  </span>
                );
              })}
            </div>
          </div>
          <div className="flex flex-col gap-3">
            {[
              { icon: "🔬", label: "Research Evidence", desc: "Clinical trials, study quality, meta-analyses, consistency", weight: "35%", colorClass: "bg-score-blue/12" },
              { icon: "👥", label: "Community Validation", desc: "Real-world outcomes from 400+ community members", weight: "25%", colorClass: "bg-score-purple/12" },
              { icon: "🛡️", label: "Safety Profile", desc: "Side effects, interactions, long-term safety data", weight: "20%", colorClass: "bg-score-green/12" },
              { icon: "🌐", label: "Accessibility", desc: "UAE availability, prescription requirements, ease of use", weight: "10%", colorClass: "bg-score-orange/12" },
              { icon: "💰", label: "Value for Money", desc: "Cost relative to effectiveness, ongoing expense", weight: "10%", colorClass: "bg-score-yellow/12" },
            ].map((factor) => (
              <div
                key={factor.label}
                className="bg-gray-50 dark:bg-[#242424] border border-gray-200 dark:border-white/[0.06] rounded-xl px-4 py-3 flex items-start gap-3"
              >
                <span className={`w-10 h-10 rounded-[10px] flex items-center justify-center text-lg shrink-0 ${factor.colorClass}`}>
                  {factor.icon}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm text-gray-900 dark:text-[#F5F0EB] font-sans">
                    {factor.label}
                  </div>
                  <div className="text-xs text-gray-400 dark:text-[#6B6560] font-sans mt-0.5">
                    {factor.desc}
                  </div>
                </div>
                <span className="text-[13px] font-bold text-kamura-gold shrink-0 font-sans">
                  {factor.weight}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Label */}
      <section className="max-w-[1200px] mx-auto px-6 mb-4">
        <p className="text-xs tracking-[0.3em] uppercase mb-2 text-kamura-gold font-sans font-semibold">
          Treatment Index
        </p>
        <h2 className="font-serif text-2xl md:text-[32px] text-gray-900 dark:text-[#F5F0EB]">
          Every Modality, Ranked
        </h2>
        <p className="text-gray-500 dark:text-[#A89F95] text-[15px] mt-2 font-sans">
          Browse all treatments, filter by category, sort by score. Click any treatment for the full evidence breakdown.
        </p>
      </section>

      {/* Filter & Search */}
      <section className="max-w-[1200px] mx-auto px-6 mb-6">
        <div className="flex flex-wrap gap-3 items-center">
          <input
            type="text"
            placeholder="Search treatments, compounds, or conditions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 min-w-[280px] bg-white dark:bg-[#1A1A1A] border border-gray-200 dark:border-white/[0.06] rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-[#F5F0EB] placeholder:text-gray-400 dark:placeholder:text-[#6B6560] outline-none focus:border-kamura-gold/30 font-sans"
          />
          {CATEGORY_FILTERS.map((cat) => (
            <FilterChip
              key={cat}
              label={cat === "GLP-1 & Weight Management" ? "GLP-1" : cat === "Devices & Biohacking" ? "Devices" : cat === "Holistic & Mind-Body" ? "Holistic" : cat === "Detox & Functional" ? "Detox" : cat}
              active={activeCategory === cat}
              onClick={() => setActiveCategory(cat)}
            />
          ))}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="px-4 py-2.5 bg-white dark:bg-[#1A1A1A] border border-gray-200 dark:border-white/[0.06] rounded-xl text-[13px] text-gray-500 dark:text-[#A89F95] font-sans cursor-pointer outline-none"
          >
            <option value="score">Sort: Kamura Score</option>
            <option value="evidence">Sort: Evidence Level</option>
            <option value="community">Sort: Community Rating</option>
            <option value="safety">Sort: Safety</option>
            <option value="name">Sort: Name (A-Z)</option>
          </select>
        </div>
        <p className="text-xs text-gray-400 dark:text-[#6B6560] mt-3 font-sans">
          Showing {filtered.length} of {treatments.length} treatments
        </p>
      </section>

      {/* Treatment Table — Desktop */}
      <section className="max-w-[1200px] mx-auto px-6 pb-20">
        {/* Column Headers (desktop only) */}
        <div className="hidden lg:grid grid-cols-[2.5fr_120px_100px_100px_100px_100px_50px] gap-2 px-5 py-3 text-[11px] font-semibold text-gray-400 dark:text-[#6B6560] uppercase tracking-wider font-sans">
          <span>Treatment</span>
          <span className="text-center">Kamura Score</span>
          <span className="text-center">Evidence</span>
          <span className="text-center">Community</span>
          <span className="text-center">Safety</span>
          <span className="text-center">Access</span>
          <span />
        </div>

        <div className="flex flex-col gap-3">
          {filtered.map((t) => (
            <TreatmentRow key={t.slug} treatment={t} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-400 dark:text-[#6B6560] font-sans">
              No treatments found matching your search.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}

function TreatmentRow({ treatment: t }: { treatment: Treatment }) {
  const evidenceColor = getScoreColor(t.scores.research);
  const communityColor = getScoreColor(t.scores.community);
  const safetyColor = getScoreColor(t.scores.safety);
  const accessColor = getScoreColor(t.scores.accessibility);

  return (
    <Link href={`/treatments/${t.slug}`}>
      {/* Desktop Row */}
      <div className="hidden lg:grid grid-cols-[2.5fr_120px_100px_100px_100px_100px_50px] gap-2 items-center px-5 py-4 bg-white dark:bg-[#1A1A1A] border border-gray-200 dark:border-white/[0.06] rounded-xl hover:border-kamura-gold/30 hover:bg-gray-50 dark:hover:bg-[#242424] transition-all cursor-pointer group">
        {/* Info */}
        <div className="flex items-center gap-3">
          <span className="w-11 h-11 rounded-[10px] flex items-center justify-center text-xl bg-gray-100 dark:bg-[#242424] shrink-0">
            {t.icon}
          </span>
          <div className="min-w-0">
            <div className="font-semibold text-[15px] text-gray-900 dark:text-[#F5F0EB] font-sans truncate">
              {t.name}
            </div>
            <div className="text-[11px] text-gray-400 dark:text-[#6B6560] uppercase tracking-wide font-sans truncate">
              {t.category} &bull; {t.tags.join(" · ")}
            </div>
          </div>
        </div>

        {/* Score */}
        <div className="flex justify-center">
          <KamuraScoreBadge score={t.kamuraScore} size="md" />
        </div>

        {/* Sub-scores */}
        <SubScoreBar value={t.scores.research} label={getEvidenceLabel(t.evidenceLevel)} color={evidenceColor} />
        <SubScoreBar value={t.scores.community} label={`${t.community.positivePercent}%`} color={communityColor} />
        <SubScoreBar value={t.scores.safety} label={getSubLabel(t.scores.safety)} color={safetyColor} />
        <SubScoreBar value={t.scores.accessibility} label={getSubLabel(t.scores.accessibility)} color={accessColor} />

        {/* Arrow */}
        <span className="text-center text-gray-300 dark:text-[#6B6560] text-lg group-hover:text-kamura-gold transition-colors">
          ›
        </span>
      </div>

      {/* Mobile Card */}
      <div className="lg:hidden bg-white dark:bg-[#1A1A1A] border border-gray-200 dark:border-white/[0.06] rounded-xl p-4 hover:border-kamura-gold/30 transition-all cursor-pointer">
        <div className="flex items-start gap-3">
          <span className="w-11 h-11 rounded-[10px] flex items-center justify-center text-xl bg-gray-100 dark:bg-[#242424] shrink-0">
            {t.icon}
          </span>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <div className="font-semibold text-[15px] text-gray-900 dark:text-[#F5F0EB] font-sans truncate">
                {t.name}
              </div>
              <KamuraScoreBadge score={t.kamuraScore} size="sm" />
            </div>
            <div className="text-[11px] text-gray-400 dark:text-[#6B6560] uppercase tracking-wide font-sans mt-0.5">
              {t.category} &bull; {t.tags.join(" · ")}
            </div>
            <div className="flex items-center gap-3 mt-3">
              <EvidenceLevelTag level={t.evidenceLevel} />
              <span className="text-xs text-gray-400 dark:text-[#6B6560] font-sans">
                {t.community.positivePercent}% positive &bull; {t.communityReports} reports
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
