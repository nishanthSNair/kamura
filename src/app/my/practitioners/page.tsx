"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FEATURED_PRACTITIONERS } from "@/data/featured-practitioners";

const SPECIALTY_FILTERS = [
  "All",
  "Longevity",
  "Sports Med",
  "Metabolic",
  "Nutrition",
  "Regenerative",
  "Integrative",
];

export default function PractitionersPage() {
  const [filter, setFilter] = useState("All");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    let pool = FEATURED_PRACTITIONERS;
    if (filter !== "All") {
      const q = filter.toLowerCase();
      pool = pool.filter(
        (p) =>
          p.specialty.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    if (query.trim()) {
      const q = query.toLowerCase();
      pool = pool.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.specialty.toLowerCase().includes(q) ||
          p.city.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    return pool;
  }, [filter, query]);

  return (
    <>
      <div className="mb-8">
        <p className="text-[10px] tracking-[0.3em] uppercase text-terracotta font-sans font-semibold mb-3">
          Practitioners
        </p>
        <h1 className="font-serif text-3xl md:text-4xl text-gray-900 leading-tight mb-3">
          Your people, verified.
        </h1>
        <p className="text-sm text-gray-500 font-sans max-w-xl">
          Kamura-verified MDs, functional medicine doctors, and integrative
          practitioners across the GCC. Book directly.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar shrink-0">
          {SPECIALTY_FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-sans font-semibold border transition-colors ${
                filter === f
                  ? "bg-[#2a1612] text-white border-[#2a1612]"
                  : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"
              }`}
            >
              {f}
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
            placeholder="Search name, city, specialty…"
            className="w-full bg-white border border-gray-200 rounded-full pl-11 pr-5 py-2.5 text-sm font-sans focus:outline-none focus:border-terracotta"
          />
        </div>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <p className="text-sm text-gray-400 font-sans italic">
          Nothing matches — try another filter.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((p) => (
            <Link
              key={p.slug}
              href={`/provider/${p.slug}`}
              className="group"
            >
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden mb-3 bg-gray-100">
                <Image
                  src={p.imageUrl}
                  alt={p.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                {p.verified && (
                  <span className="absolute top-3 left-3 px-2 py-1 rounded-full bg-white/90 backdrop-blur text-[9px] tracking-[0.15em] uppercase text-emerald-700 font-sans font-semibold">
                    ✓ Verified
                  </span>
                )}
              </div>
              <h3 className="font-serif text-lg text-gray-900 group-hover:text-terracotta transition-colors leading-tight">
                {p.name}
              </h3>
              <p className="text-xs text-gray-500 font-sans mt-0.5">
                {p.specialty} · {p.city}
              </p>
              <div className="flex items-center gap-1.5 mt-1.5 text-[11px] font-sans">
                <span className="text-gray-700">★ {p.rating}</span>
                <span className="text-gray-300">·</span>
                <span className="text-gray-400">
                  From AED {p.startingPriceAed.toLocaleString()}
                </span>
              </div>
              <div className="flex flex-wrap gap-1 mt-2">
                {p.tags.slice(0, 3).map((t) => (
                  <span
                    key={t}
                    className="text-[10px] px-2 py-0.5 rounded-full bg-[#EDE7DB] text-gray-500 font-sans"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
