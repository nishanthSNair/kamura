"use client";

import { useState } from "react";
import type { TierConfig } from "@/data/tiers";
import type { Treatment } from "@/data/treatments";
import TierCard from "./TierCard";

interface TierSectionProps {
 tier: TierConfig;
 treatments: Treatment[];
 defaultOpen?: boolean;
}

export default function TierSection({ tier, treatments, defaultOpen = false }: TierSectionProps) {
 const [open, setOpen] = useState(defaultOpen);

 return (
 <div className={`border rounded-2xl overflow-hidden transition-colors ${tier.borderClass} ${open ? tier.bgClass : "bg-white"}`}>
 {/* Header — always visible */}
 <button
 onClick={() => setOpen(!open)}
 className="w-full flex items-center gap-4 px-5 py-4 md:px-6 md:py-5 text-left cursor-pointer"
 >
 {/* Tier Badge */}
 <div className={`w-12 h-12 md:w-14 md:h-14 rounded-xl ${tier.badgeBg} flex items-center justify-center shrink-0 shadow-lg`}>
 <span className="text-white font-serif font-bold text-2xl md:text-3xl">{tier.letter}</span>
 </div>

 {/* Info */}
 <div className="flex-1 min-w-0">
 <div className="flex items-center gap-2.5">
 <h3 className={`font-serif text-lg md:text-xl font-semibold ${tier.textClass}`}>
 {tier.label}
 </h3>
 <span className="text-xs text-gray-400 font-sans">
 {tier.scoreMin}–{tier.scoreMax}
 </span>
 </div>
 <p className="text-xs text-gray-500 font-sans mt-0.5 hidden sm:block">
 {tier.description}
 </p>
 </div>

 {/* Count + Toggle */}
 <div className="flex items-center gap-3 shrink-0">
 <span className={`px-2.5 py-1 rounded-full text-xs font-bold font-sans ${tier.bgClass} ${tier.textClass}`}>
 {treatments.length}
 </span>
 <svg
 className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
 fill="none"
 viewBox="0 0 24 24"
 stroke="currentColor"
 strokeWidth={2}
 >
 <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
 </svg>
 </div>
 </button>

 {/* Collapsible Content */}
 {open && (
 <div className="px-5 pb-5 md:px-6 md:pb-6">
 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
 {treatments.map((t) => (
 <TierCard key={t.slug} treatment={t} tier={tier} />
 ))}
 </div>
 </div>
 )}
 </div>
 );
}
