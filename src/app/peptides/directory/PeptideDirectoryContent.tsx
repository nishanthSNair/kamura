"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { peptides, PEPTIDE_GOALS } from "@/data/peptides";
import {
  getScoreTier,
  getScoreTierColor,
  getEvidenceLevelColor,
  type Treatment,
} from "@/data/treatments";
import KamuraScoreBadge from "@/components/treatments/KamuraScoreBadge";

type SortOption = "kamura" | "research" | "safety";

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "kamura", label: "Kamura Score" },
  { value: "research", label: "Research Score" },
  { value: "safety", label: "Safety Score" },
];

function sortPeptides(list: Treatment[], sort: SortOption): Treatment[] {
  return [...list].sort((a, b) => {
    switch (sort) {
      case "research":
        return b.scores.research - a.scores.research;
      case "safety":
        return b.scores.safety - a.scores.safety;
      case "kamura":
      default:
        return b.kamuraScore - a.kamuraScore;
    }
  });
}

export default function PeptideDirectoryContent() {
  const searchParams = useSearchParams();
  const initialGoal = searchParams.get("goal") || "";

  const [activeGoal, setActiveGoal] = useState<string>(initialGoal);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortOption>("kamura");

  const filtered = useMemo(() => {
    let result = [...peptides];

    // Filter by goal
    if (activeGoal) {
      const goal = PEPTIDE_GOALS.find((g) => g.id === activeGoal);
      if (goal) {
        result = result.filter((p) =>
          p.tags.some((tag) =>
            goal.matchTags.some(
              (mt) => mt.toLowerCase() === tag.toLowerCase()
            )
          )
        );
      }
    }

    // Filter by search
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    return sortPeptides(result, sort);
  }, [activeGoal, search, sort]);

  return (
    <div className="max-w-6xl mx-auto px-6 py-20 md:py-28">
      {/* Hero */}
      <div className="mb-12">
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Peptide Directory
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl font-sans">
          Evidence-scored peptide therapies for longevity, recovery, cognition,
          and more. Every peptide rated by the Kamura Score across research,
          safety, and real-world outcomes.
        </p>
      </div>

      {/* Goal Filter Pills */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveGoal("")}
            className={`px-4 py-2 rounded-full text-sm font-medium font-sans transition-colors ${
              activeGoal === ""
                ? "bg-[#B5736A] text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            All Peptides
          </button>
          {PEPTIDE_GOALS.map((goal) => (
            <button
              key={goal.id}
              onClick={() =>
                setActiveGoal(activeGoal === goal.id ? "" : goal.id)
              }
              className={`px-4 py-2 rounded-full text-sm font-medium font-sans transition-colors ${
                activeGoal === goal.id
                  ? "bg-[#B5736A] text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <span className="mr-1.5">{goal.icon}</span>
              {goal.label}
            </button>
          ))}
        </div>
      </div>

      {/* Search + Sort Row */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            placeholder="Search peptides by name, description, or tag..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm font-sans text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#B5736A]/30 focus:border-[#B5736A]"
          />
        </div>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as SortOption)}
          className="px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm font-sans text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#B5736A]/30 focus:border-[#B5736A]"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              Sort: {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* Results count */}
      <p className="text-sm text-gray-500 font-sans mb-6">
        {filtered.length} peptide{filtered.length !== 1 ? "s" : ""} found
        {activeGoal && (
          <span>
            {" "}
            in{" "}
            <span className="font-medium text-gray-700">
              {PEPTIDE_GOALS.find((g) => g.id === activeGoal)?.label}
            </span>
          </span>
        )}
      </p>

      {/* Peptide Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-500 font-sans text-lg">
            No peptides match your filters.
          </p>
          <button
            onClick={() => {
              setActiveGoal("");
              setSearch("");
            }}
            className="mt-4 text-[#B5736A] hover:text-[#9A5F57] font-medium font-sans text-sm underline underline-offset-2"
          >
            Clear all filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((peptide) => (
            <PeptideCard key={peptide.slug} peptide={peptide} />
          ))}
        </div>
      )}
    </div>
  );
}

/* ────────────────────────────────────────────────── */
/* Peptide Card                                       */
/* ────────────────────────────────────────────────── */

function PeptideCard({ peptide }: { peptide: Treatment }) {
  const tier = getScoreTier(peptide.kamuraScore);
  const tierColor = getScoreTierColor(tier);
  const evidenceColor = getEvidenceLevelColor(peptide.evidenceLevel);
  const topTags = peptide.tags.slice(0, 3);

  return (
    <Link
      href={`/treatments/${peptide.slug}`}
      className="group block bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg hover:border-[#B5736A]/30 transition-all duration-200"
    >
      {/* Top row: name + score */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="min-w-0 flex-1">
          <h3 className="font-serif text-lg font-semibold text-gray-900 group-hover:text-[#B5736A] transition-colors truncate">
            {peptide.name}
          </h3>
          <span
            className={`inline-block mt-1 text-xs font-semibold font-sans px-2 py-0.5 rounded-full ${evidenceColor.bg} ${evidenceColor.text}`}
          >
            {peptide.evidenceLevel} Evidence
          </span>
        </div>
        <div className="flex-shrink-0">
          <KamuraScoreBadge score={peptide.kamuraScore} size="sm" />
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-600 font-sans line-clamp-2 mb-4">
        {peptide.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {topTags.map((tag) => (
          <span
            key={tag}
            className="text-xs font-sans px-2 py-0.5 rounded-full bg-gray-100 text-gray-600"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Meta row */}
      <div className="flex items-center flex-wrap gap-x-3 gap-y-1.5 text-xs font-sans text-gray-500 border-t border-gray-100 pt-3">
        {/* Administration routes */}
        {peptide.administrationRoutes.length > 0 && (
          <span className="flex items-center gap-1">
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
              />
            </svg>
            {peptide.administrationRoutes.join(", ")}
          </span>
        )}

        {/* UAE availability */}
        <span
          className={`flex items-center gap-1 font-medium ${
            peptide.uaeAvailable ? "text-green-600" : "text-gray-400"
          }`}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full ${
              peptide.uaeAvailable ? "bg-green-500" : "bg-gray-300"
            }`}
          />
          {peptide.uaeAvailable ? "UAE Available" : "Not in UAE"}
        </span>

        {/* Cost estimate */}
        {peptide.costEstimate && (
          <span className="text-gray-500">{peptide.costEstimate}</span>
        )}
      </div>

      {/* Score tier */}
      <div className="mt-3 pt-3 border-t border-gray-100">
        <span
          className={`text-xs font-semibold font-sans px-2.5 py-1 rounded-full ${tierColor.bg} ${tierColor.text} ${tierColor.border} border`}
        >
          {tier}
        </span>
      </div>
    </Link>
  );
}
