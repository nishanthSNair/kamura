import {
 type WellnessIndicator,
 INDICATORS,
 INDICATOR_META,
 getIndicatorColor,
} from "@/data/blueprint";
import ProjectionToggle from "./ProjectionToggle";

interface WellnessIndicatorPanelProps {
 baselines: Record<WellnessIndicator, number>;
 projections: Record<WellnessIndicator, number>;
 projectionDays: 30 | 90;
 onToggleDays: (days: 30 | 90) => void;
}

export default function WellnessIndicatorPanel({
 baselines,
 projections,
 projectionDays,
 onToggleDays,
}: WellnessIndicatorPanelProps) {
 return (
 <div>
 <div className="flex items-center justify-between mb-4">
 <h3 className="text-xs font-sans uppercase tracking-wider text-gray-500">
 Wellness Indicators
 </h3>
 <ProjectionToggle value={projectionDays} onChange={onToggleDays} />
 </div>

 <div className="space-y-3">
 {INDICATORS.map((key) => {
 const meta = INDICATOR_META[key];
 const baseline = baselines[key];
 const projected = projections[key];
 const { fill } = getIndicatorColor(projected);
 const improved = projected > baseline;

 return (
 <div key={key}>
 <div className="flex items-center justify-between mb-1">
 <span className="text-xs font-sans text-gray-600">
 {meta.label}
 </span>
 <div className="flex items-center gap-1.5">
 <span className="text-[10px] text-gray-400 font-sans">
 {baseline}
 </span>
 <span className="text-[10px] text-gray-300">
 &rarr;
 </span>
 <span
 className="text-xs font-sans font-semibold"
 style={{ color: fill }}
 >
 {projected}
 </span>
 {improved && (
 <span className="text-[10px] text-score-green font-sans">
 +{projected - baseline}
 </span>
 )}
 </div>
 </div>

 {/* Bar */}
 <div className="relative h-2 bg-gray-100 rounded-full overflow-hidden">
 {/* Baseline marker */}
 <div
 className="absolute top-0 h-full w-0.5 bg-gray-400/50 z-10"
 style={{ left: `${baseline}%` }}
 />
 {/* Projected fill */}
 <div
 className="h-full rounded-full transition-all duration-600 ease-out"
 style={{
 width: `${projected}%`,
 backgroundColor: fill,
 }}
 />
 </div>
 </div>
 );
 })}
 </div>
 </div>
 );
}
