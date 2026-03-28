"use client";

import Link from "next/link";
import {
 type BlueprintTreatment,
 type WellnessIndicator,
 INDICATOR_META,
 getIndicatorColor,
} from "@/data/blueprint";

interface TreatmentCardProps {
 treatment: BlueprintTreatment;
 isSelected: boolean;
 isPlaced: boolean;
 onSelect: () => void;
}

const DIFFICULTY_LABELS = ["", "Beginner", "Intermediate", "Advanced"];

export default function TreatmentCard({
 treatment,
 isSelected,
 isPlaced,
 onSelect,
}: TreatmentCardProps) {
 // Sort effects by magnitude for the preview bars
 const sortedEffects = Object.entries(treatment.effects)
 .sort(([, a], [, b]) => (b ?? 0) - (a ?? 0))
 .slice(0, 3) as [WellnessIndicator, number][];

 return (
 <div
 draggable
 onDragStart={(e) => {
 e.dataTransfer.setData("text/plain", treatment.id);
 e.dataTransfer.effectAllowed = "move";
 }}
 onClick={onSelect}
 className={`rounded-xl border p-3 cursor-pointer transition-all select-none ${
 isSelected
 ? "border-terracotta bg-terracotta/5 ring-1 ring-terracotta/30"
 : "border-gray-200 bg-white hover:border-sage/40"
 } ${isPlaced ? "opacity-50" : ""}`}
 >
 {/* Header */}
 <div className="flex items-start gap-2.5 mb-2">
 <span className="text-lg shrink-0">{treatment.emoji}</span>
 <div className="flex-1 min-w-0">
 <h4 className="text-[13px] font-sans font-semibold text-gray-900 leading-tight">
 {treatment.name}
 </h4>
 <div className="flex items-center gap-2 mt-0.5">
 <span className="text-[10px] text-gray-400 font-sans">
 {treatment.timeCost}
 </span>
 <span className="text-[10px] text-gray-300">
 &middot;
 </span>
 <span className="text-[10px] text-gray-400 font-sans">
 {DIFFICULTY_LABELS[treatment.difficulty]}
 </span>
 </div>
 </div>
 </div>

 {/* Mini effect bars */}
 <div className="space-y-1">
 {sortedEffects.map(([key, value]) => {
 const { fill } = getIndicatorColor(70); // green for positive effects
 return (
 <div key={key} className="flex items-center gap-1.5">
 <span className="text-[9px] text-gray-400 font-sans w-12 truncate">
 {INDICATOR_META[key].label.split(" ")[0]}
 </span>
 <div className="flex-1 h-1 bg-gray-100 rounded-full overflow-hidden">
 <div
 className="h-full rounded-full"
 style={{
 width: `${Math.min(100, (value / 25) * 100)}%`,
 backgroundColor: fill,
 }}
 />
 </div>
 <span className="text-[9px] font-sans text-score-green">
 +{value}
 </span>
 </div>
 );
 })}
 </div>

 {/* Learn more link */}
 {treatment.treatmentSlug && (
 <Link
 href={`/treatments/${treatment.treatmentSlug}`}
 onClick={(e) => e.stopPropagation()}
 className="block text-[10px] text-terracotta hover:text-terracotta-dark font-sans mt-2 transition-colors"
 >
 Learn more &rarr;
 </Link>
 )}
 </div>
 );
}
