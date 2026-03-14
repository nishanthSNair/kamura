"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import KamuraScoreBadge from "@/components/treatments/KamuraScoreBadge";
import EvidenceLevelTag from "@/components/treatments/EvidenceLevelTag";
import type { EvidenceLevel } from "@/data/treatments";

interface CarouselTreatment {
  slug: string;
  name: string;
  icon: string;
  kamuraScore: number;
  evidenceLevel: EvidenceLevel;
  category: string;
}

interface TopTreatmentsCarouselProps {
  treatments: CarouselTreatment[];
}

export default function TopTreatmentsCarousel({ treatments }: TopTreatmentsCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  function updateScrollState() {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 4);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 4);
  }

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateScrollState, { passive: true });
    updateScrollState();
    return () => el.removeEventListener("scroll", updateScrollState);
  }, []);

  function scroll(direction: "left" | "right") {
    scrollRef.current?.scrollBy({
      left: direction === "left" ? -260 : 260,
      behavior: "smooth",
    });
  }

  return (
    <div className="relative">
      {/* Scroll container */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-1"
      >
        {treatments.map((t) => (
          <Link
            key={t.slug}
            href={`/treatments/${t.slug}`}
            className="min-w-[220px] w-[220px] snap-start bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-white/[0.06] rounded-xl p-5 shadow-sm hover:shadow-md hover:border-kamura-gold/30 transition-all shrink-0"
          >
            <div className="flex items-start justify-between mb-3">
              <span className="w-11 h-11 rounded-[10px] flex items-center justify-center text-xl bg-gray-100 dark:bg-[#242424]">
                {t.icon}
              </span>
              <KamuraScoreBadge score={t.kamuraScore} size="sm" />
            </div>
            <h3 className="font-sans font-semibold text-[15px] text-gray-900 dark:text-[#F5F0EB] mb-1 leading-tight">
              {t.name}
            </h3>
            <p className="text-[11px] text-gray-400 dark:text-[#6B6560] uppercase tracking-wide font-sans mb-3">
              {t.category}
            </p>
            <EvidenceLevelTag level={t.evidenceLevel} />
          </Link>
        ))}
      </div>

      {/* Left arrow */}
      {canScrollLeft && (
        <button
          onClick={() => scroll("left")}
          className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-9 h-9 items-center justify-center rounded-full bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-white/[0.08] shadow-md hover:border-kamura-gold/30 transition-all"
          aria-label="Scroll left"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-600 dark:text-gray-400">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
      )}

      {/* Right arrow */}
      {canScrollRight && (
        <button
          onClick={() => scroll("right")}
          className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-9 h-9 items-center justify-center rounded-full bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-white/[0.08] shadow-md hover:border-kamura-gold/30 transition-all"
          aria-label="Scroll right"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-600 dark:text-gray-400">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      )}
    </div>
  );
}
