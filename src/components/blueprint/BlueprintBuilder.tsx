"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import {
 type WellnessIndicator,
 type TimelineSlot,
 BLUEPRINT_TREATMENTS,
 INDICATOR_META,
 ZONE_INDICATORS,
 calculateProjections,
 calculateOverallScore,
} from "@/data/blueprint";
import ScoreRing from "./ScoreRing";
import BodySilhouette from "./BodySilhouette";
import WellnessIndicatorPanel from "./WellnessIndicatorPanel";
import TreatmentLibrary from "./TreatmentLibrary";
import DayTimeline from "./DayTimeline";
import SaveBlueprintModal from "./SaveBlueprintModal";

// Action types from BlueprintApp
type Action =
 | { type: "PLACE_TREATMENT"; hour: number; treatmentId: string }
 | { type: "REMOVE_TREATMENT"; hour: number; treatmentId: string }
 | { type: "SELECT_TREATMENT"; treatmentId: string | null }
 | { type: "SET_PROJECTION_DAYS"; days: 30 | 90 }
 | { type: "RESET_TIMELINE" }
 | { type: "TOGGLE_SAVE_MODAL" }
 | { type: "RESTART" };

interface BlueprintState {
 baselines: Record<WellnessIndicator, number>;
 timeline: TimelineSlot[];
 projectionDays: 30 | 90;
 selectedTreatmentId: string | null;
 saveModalOpen: boolean;
}

interface BlueprintBuilderProps {
 state: BlueprintState;
 dispatch: React.Dispatch<Action>;
}

export default function BlueprintBuilder({
 state,
 dispatch,
}: BlueprintBuilderProps) {
 const [activeZones, setActiveZones] = useState<Set<string>>(new Set());
 const pulseTimeout = useRef<NodeJS.Timeout | null>(null);
 const prevTimeline = useRef<string>("");

 // Calculate projections
 const projections = useMemo(
 () =>
 calculateProjections(
 state.baselines,
 state.timeline,
 state.projectionDays
 ),
 [state.baselines, state.timeline, state.projectionDays]
 );

 const overallScore = useMemo(
 () => calculateOverallScore(projections),
 [projections]
 );

 // Collect placed treatment IDs
 const placedIds = useMemo(() => {
 const ids = new Set<string>();
 for (const slot of state.timeline) {
 for (const id of slot.treatments) {
 ids.add(id);
 }
 }
 return ids;
 }, [state.timeline]);

 const treatmentCount = placedIds.size;

 // Trigger zone pulses when timeline changes
 useEffect(() => {
 const currentTimeline = JSON.stringify(state.timeline);
 if (prevTimeline.current && currentTimeline !== prevTimeline.current) {
 // Find which treatments were just added
 const prevSlots: TimelineSlot[] = JSON.parse(prevTimeline.current);
 const prevIds = new Set<string>();
 for (const s of prevSlots) {
 for (const id of s.treatments) prevIds.add(id);
 }

 const newIds: string[] = [];
 for (const s of state.timeline) {
 for (const id of s.treatments) {
 if (!prevIds.has(id)) newIds.push(id);
 }
 }

 // Map new treatments to body zones
 if (newIds.length > 0) {
 const zones = new Set<string>();
 for (const id of newIds) {
 const treatment = BLUEPRINT_TREATMENTS.find((t) => t.id === id);
 if (!treatment) continue;
 for (const key of Object.keys(treatment.effects)) {
 const indicator = key as WellnessIndicator;
 const zone = INDICATOR_META[indicator].bodyZone;
 zones.add(zone);
 // Also add zones that share indicators
 for (const [z, indicators] of Object.entries(ZONE_INDICATORS)) {
 if (indicators.includes(indicator)) zones.add(z);
 }
 }
 }
 setActiveZones(zones);

 if (pulseTimeout.current) clearTimeout(pulseTimeout.current);
 pulseTimeout.current = setTimeout(() => {
 setActiveZones(new Set());
 }, 650);
 }
 }
 prevTimeline.current = currentTimeline;
 }, [state.timeline]);

 return (
 <section className="min-h-screen pt-20 pb-12">
 {/* Header */}
 <div className="max-w-7xl mx-auto px-4 md:px-6">
 <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
 <div className="flex items-center gap-4">
 <ScoreRing score={overallScore} size="sm" />
 <div>
 <h1 className="font-serif text-xl md:text-2xl text-gray-900">
 Your Body Blueprint
 </h1>
 <p className="text-xs text-gray-500 font-sans">
 {treatmentCount === 0
 ? "Add treatments to build your protocol"
 : `${treatmentCount} treatment${treatmentCount > 1 ? "s" : ""} in your protocol`}
 </p>
 </div>
 </div>
 <div className="flex items-center gap-3">
 <button
 onClick={() => dispatch({ type: "RESTART" })}
 className="text-xs text-gray-400 hover:text-gray-600 font-sans transition-colors"
 >
 Start Over
 </button>
 <button
 onClick={() => dispatch({ type: "TOGGLE_SAVE_MODAL" })}
 className="px-5 py-2 bg-terracotta text-white text-xs font-sans font-medium rounded-xl hover:bg-terracotta-dark transition-colors"
 >
 Save Blueprint
 </button>
 </div>
 </div>
 </div>

 {/* Main Grid */}
 <div className="max-w-7xl mx-auto px-4 md:px-6">
 <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
 {/* LEFT: Body + Indicators */}
 <div className="space-y-6">
 <div className="bg-white border border-gray-200 rounded-2xl p-4 md:p-6">
 <BodySilhouette
 baselines={state.baselines}
 projections={projections}
 activeZones={activeZones}
 />
 </div>
 <div className="bg-white border border-gray-200 rounded-2xl p-4 md:p-6">
 <WellnessIndicatorPanel
 baselines={state.baselines}
 projections={projections}
 projectionDays={state.projectionDays}
 onToggleDays={(days) =>
 dispatch({ type: "SET_PROJECTION_DAYS", days })
 }
 />
 </div>
 </div>

 {/* CENTER: Timeline */}
 <div className="bg-white border border-gray-200 rounded-2xl p-4 md:p-6">
 <DayTimeline
 timeline={state.timeline}
 selectedTreatmentId={state.selectedTreatmentId}
 onPlace={(hour, id) =>
 dispatch({ type: "PLACE_TREATMENT", hour, treatmentId: id })
 }
 onRemove={(hour, id) =>
 dispatch({ type: "REMOVE_TREATMENT", hour, treatmentId: id })
 }
 onSlotTap={(hour) => {
 if (state.selectedTreatmentId) {
 dispatch({
 type: "PLACE_TREATMENT",
 hour,
 treatmentId: state.selectedTreatmentId,
 });
 }
 }}
 onReset={() => dispatch({ type: "RESET_TIMELINE" })}
 />
 </div>

 {/* RIGHT: Treatment Library */}
 <div className="bg-white border border-gray-200 rounded-2xl p-4 md:p-6 max-h-[80vh] lg:max-h-none overflow-y-auto hide-scrollbar">
 <TreatmentLibrary
 selectedId={state.selectedTreatmentId}
 placedIds={placedIds}
 onSelect={(id) =>
 dispatch({ type: "SELECT_TREATMENT", treatmentId: id })
 }
 />
 </div>
 </div>
 </div>

 {/* Disclaimer */}
 <div className="max-w-7xl mx-auto px-4 md:px-6 mt-8">
 <p className="text-[10px] text-gray-400 font-sans text-center leading-relaxed">
 This is a wellness exploration tool, not medical advice. Projected
 scores are estimates based on published research averages and your
 self-reported data. Individual results vary. Consult a healthcare
 professional before starting any new treatment or supplement.
 </p>
 </div>

 {/* Save Modal */}
 <SaveBlueprintModal
 isOpen={state.saveModalOpen}
 onClose={() => dispatch({ type: "TOGGLE_SAVE_MODAL" })}
 score={overallScore}
 projections={projections}
 treatmentCount={treatmentCount}
 />
 </section>
 );
}
