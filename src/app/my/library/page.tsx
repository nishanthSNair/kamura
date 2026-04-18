"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { treatments } from "@/data/treatments";
import { peptides } from "@/data/peptides";
import { protocols } from "@/data/protocols";
import ScoreTierPill from "@/components/member/ScoreTierPill";

const TABS = ["Treatments", "Peptides", "Protocols"] as const;
type Tab = (typeof TABS)[number];

export default function LibraryPage() {
  const [tab, setTab] = useState<Tab>("Treatments");
  const [query, setQuery] = useState("");

  const filteredTreatments = useMemo(() => {
    const pool = [...treatments].sort((a, b) => b.kamuraScore - a.kamuraScore);
    if (!query.trim()) return pool.slice(0, 24);
    const q = query.toLowerCase();
    return pool
      .filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q) ||
          t.tags.some((tag) => tag.toLowerCase().includes(q))
      )
      .slice(0, 24);
  }, [query]);

  const filteredPeptides = useMemo(() => {
    const pool = [...peptides].sort((a, b) => b.kamuraScore - a.kamuraScore);
    if (!query.trim()) return pool;
    const q = query.toLowerCase();
    return pool.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some((tag) => tag.toLowerCase().includes(q))
    );
  }, [query]);

  const filteredProtocols = useMemo(() => {
    if (!query.trim()) return protocols;
    const q = query.toLowerCase();
    return protocols.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.creator.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <>
      {/* Hero */}
      <div className="mb-8">
        <p className="text-[10px] tracking-[0.3em] uppercase text-terracotta font-sans font-semibold mb-3">
          Library
        </p>
        <h1 className="font-serif text-3xl md:text-4xl text-gray-900 leading-tight mb-3">
          Everything Kamura scores.
        </h1>
        <p className="text-sm text-gray-500 font-sans max-w-xl">
          Treatments, peptides, and longevity protocols — evidence-graded, with
          full citations. Tap anything to add to your protocol.
        </p>
      </div>

      {/* Search + tabs */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="flex items-center gap-1 p-1 rounded-full bg-white border border-gray-200 shrink-0 w-fit">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-1.5 rounded-full text-xs font-sans font-semibold transition-colors ${
                tab === t
                  ? "bg-terracotta text-white"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
        <div className="flex-1 relative">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={`Search ${tab.toLowerCase()}…`}
            className="w-full bg-white border border-gray-200 rounded-full pl-11 pr-5 py-2.5 text-sm font-sans focus:outline-none focus:border-terracotta"
          />
        </div>
      </div>

      {/* Grid */}
      {tab === "Treatments" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTreatments.map((t) => (
            <Link
              key={t.slug}
              href={`/treatments/${t.slug}`}
              className="group bg-white border border-gray-200 rounded-2xl p-5 hover:border-terracotta/40 hover:shadow-sm transition-all"
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] tracking-[0.2em] uppercase text-gray-400 font-sans mb-1">
                    {t.category}
                  </p>
                  <h3 className="font-serif text-lg text-gray-900 group-hover:text-terracotta transition-colors leading-tight">
                    {t.name}
                  </h3>
                </div>
                <ScoreTierPill score={t.kamuraScore} size="sm" />
              </div>
              <p className="text-sm text-gray-500 font-sans line-clamp-2 leading-relaxed">
                {t.description}
              </p>
            </Link>
          ))}
        </div>
      )}

      {tab === "Peptides" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPeptides.map((p) => (
            <Link
              key={p.slug}
              href={`/treatments/${p.slug}`}
              className="group bg-white border border-gray-200 rounded-2xl p-5 hover:border-terracotta/40 hover:shadow-sm transition-all"
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] tracking-[0.2em] uppercase text-gray-400 font-sans mb-1">
                    Peptide
                  </p>
                  <h3 className="font-serif text-lg text-gray-900 group-hover:text-terracotta transition-colors leading-tight">
                    {p.name}
                  </h3>
                </div>
                <ScoreTierPill score={p.kamuraScore} size="sm" />
              </div>
              <p className="text-sm text-gray-500 font-sans line-clamp-2 leading-relaxed mb-3">
                {p.description}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {p.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] px-2 py-0.5 rounded-full bg-[#EDE7DB] text-gray-500 font-sans"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      )}

      {tab === "Protocols" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredProtocols.map((p) => (
            <Link
              key={p.slug}
              href={`/protocols/${p.slug}`}
              className="group block rounded-2xl overflow-hidden bg-white border border-gray-200 hover:border-terracotta/40 hover:shadow-sm transition-all"
            >
              {p.imageUrl && (
                <div className="relative aspect-[16/9] bg-gray-100">
                  <Image
                    src={p.imageUrl}
                    alt={p.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              )}
              <div className="p-5">
                <p className="text-[10px] tracking-[0.2em] uppercase text-terracotta font-sans font-semibold mb-1">
                  {p.creator}
                </p>
                <h3 className="font-serif text-xl text-gray-900 group-hover:text-terracotta transition-colors leading-tight mb-2">
                  {p.name}
                </h3>
                <p className="text-sm text-gray-500 font-sans line-clamp-2 leading-relaxed">
                  {p.tagline}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
