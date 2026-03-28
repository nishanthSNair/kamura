"use client";

import Link from "next/link";
import Image from "next/image";
import type { Treatment } from "@/data/treatments";
import type { TierConfig } from "@/data/tiers";
import AddToStackButton from "@/components/stack/AddToStackButton";

interface TierCardProps {
  treatment: Treatment;
  tier: TierConfig;
}

export default function TierCard({ treatment: t, tier }: TierCardProps) {
  return (
    <div className="group relative bg-white dark:bg-[#1C1815] border border-gray-200 dark:border-white/[0.06] rounded-xl overflow-hidden hover:border-sage/40 hover:shadow-lg transition-all">
      <Link href={`/treatments/${t.slug}`}>
        {/* Image */}
        <div className="relative h-32 overflow-hidden">
          <Image
            src={t.imageUrl}
            alt={t.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

          {/* Tier badge top-left */}
          <div className="absolute top-2.5 left-2.5">
            <span className={`inline-flex items-center justify-center w-7 h-7 rounded-lg ${tier.badgeBg} text-white font-serif font-bold text-sm shadow`}>
              {tier.letter}
            </span>
          </div>

          {/* Score top-right */}
          <div className="absolute top-2.5 right-2.5">
            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold font-sans bg-black/50 backdrop-blur-sm ${tier.textClass}`}>
              {t.kamuraScore}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-3.5">
          <div className="flex items-start gap-2 mb-1.5">
            <span className="text-base shrink-0">{t.icon}</span>
            <h4 className="font-semibold text-sm text-gray-900 dark:text-[#F0EBE2] font-sans leading-tight line-clamp-1">
              {t.name}
            </h4>
          </div>
          <p className="text-[11px] text-gray-500 dark:text-[#A89F90] font-sans line-clamp-2 leading-relaxed mb-2.5">
            {t.description}
          </p>
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold font-sans ${tier.bgClass} ${tier.textClass}`}>
              {t.evidenceLevel}
            </span>
            {t.costEstimate && (
              <span className="text-[10px] text-gray-400 dark:text-[#6B6358] font-sans">
                {t.costEstimate}
              </span>
            )}
          </div>
        </div>
      </Link>

      {/* Add to Stack button — floats above the card */}
      <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
        <AddToStackButton slug={t.slug} variant="icon" />
      </div>
    </div>
  );
}
