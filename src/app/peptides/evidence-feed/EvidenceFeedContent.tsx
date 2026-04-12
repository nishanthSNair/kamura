"use client";

import { useState } from "react";
import Link from "next/link";
import type { EvidenceUpdate } from "@/data/peptides";

const FILTER_OPTIONS = [
  { value: "all", label: "All" },
  { value: "regulatory", label: "Regulatory" },
  { value: "study", label: "Study" },
  { value: "safety", label: "Safety" },
  { value: "market", label: "Market" },
] as const;

const TYPE_STYLES: Record<EvidenceUpdate["type"], { bg: string; text: string; dot: string }> = {
  regulatory: { bg: "bg-terracotta/10", text: "text-terracotta", dot: "bg-terracotta" },
  study: { bg: "bg-green-100", text: "text-green-700", dot: "bg-green-500" },
  safety: { bg: "bg-red-100", text: "text-red-700", dot: "bg-red-500" },
  market: { bg: "bg-blue-100", text: "text-blue-700", dot: "bg-blue-500" },
};

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default function EvidenceFeedContent({ items }: { items: EvidenceUpdate[] }) {
  const [filter, setFilter] = useState<string>("all");

  const filtered = filter === "all" ? items : items.filter((item) => item.type === filter);

  return (
    <>
      {/* Filter Pills */}
      <div className="flex flex-wrap gap-2 mb-10">
        {FILTER_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            onClick={() => setFilter(opt.value)}
            className={`px-4 py-2 rounded-full text-sm font-sans font-medium transition-colors ${
              filter === opt.value
                ? "bg-gray-900 text-white"
                : "bg-white border border-gray-200 text-gray-600 hover:border-terracotta/40 hover:text-terracotta"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* Timeline Feed */}
      <div className="relative">
        {/* Vertical timeline line */}
        <div className="absolute left-[15px] top-0 bottom-0 w-px bg-gray-200 hidden md:block" />

        <div className="space-y-6">
          {filtered.map((item) => {
            const style = TYPE_STYLES[item.type];
            return (
              <div key={item.id} className="relative md:pl-12">
                {/* Timeline dot */}
                <div className={`absolute left-[10px] top-6 w-3 h-3 rounded-full ${style.dot} ring-4 ring-white hidden md:block`} />

                <div className="border border-gray-200 rounded-2xl bg-white p-5 md:p-6 hover:border-gray-300 transition-colors">
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    {/* Date badge */}
                    <span className="text-xs font-sans text-gray-400 font-medium">
                      {formatDate(item.date)}
                    </span>

                    {/* Type indicator */}
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-sans font-medium ${style.bg} ${style.text}`}>
                      {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                    </span>
                  </div>

                  <h3 className="font-serif text-lg text-gray-900 mb-2 leading-snug">
                    {item.title}
                  </h3>

                  {/* Affected peptides */}
                  {item.peptides.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {item.peptides.map((slug) => (
                        <Link
                          key={slug}
                          href={`/treatments/${slug}`}
                          className="px-2 py-0.5 bg-gray-100 text-xs font-sans text-gray-600 rounded-full hover:bg-terracotta/10 hover:text-terracotta transition-colors"
                        >
                          {slug}
                        </Link>
                      ))}
                    </div>
                  )}

                  <p className="text-sm font-sans text-gray-600 leading-relaxed mb-3">
                    {item.summary}
                  </p>

                  {item.source && (
                    <p className="text-xs font-sans text-gray-400">
                      Source: {item.source}
                    </p>
                  )}
                </div>
              </div>
            );
          })}

          {filtered.length === 0 && (
            <div className="border border-dashed border-gray-300 rounded-2xl p-12 text-center">
              <p className="text-gray-400 font-sans">No updates found for this filter.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
