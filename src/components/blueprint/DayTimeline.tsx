"use client";

import { type TimelineSlot as TSlot } from "@/data/blueprint";
import TimeSlot from "./TimeSlot";

interface DayTimelineProps {
 timeline: TSlot[];
 selectedTreatmentId: string | null;
 onPlace: (hour: number, treatmentId: string) => void;
 onRemove: (hour: number, treatmentId: string) => void;
 onSlotTap: (hour: number) => void;
 onReset: () => void;
}

export default function DayTimeline({
 timeline,
 selectedTreatmentId,
 onPlace,
 onRemove,
 onSlotTap,
 onReset,
}: DayTimelineProps) {
 const filledSlots = timeline.filter((s) => s.treatments.length > 0).length;

 return (
 <div>
 <div className="flex items-center justify-between mb-4">
 <h3 className="text-xs font-sans uppercase tracking-wider text-gray-500">
 Daily Timeline
 </h3>
 {filledSlots > 0 && (
 <button
 onClick={onReset}
 className="text-[11px] text-gray-400 hover:text-score-red font-sans transition-colors"
 >
 Reset Day
 </button>
 )}
 </div>

 <div className="space-y-1 max-h-[60vh] overflow-y-auto pr-1 hide-scrollbar">
 {timeline.map((slot) => (
 <TimeSlot
 key={slot.hour}
 hour={slot.hour}
 treatments={slot.treatments}
 selectedTreatmentId={selectedTreatmentId}
 onDrop={(id) => onPlace(slot.hour, id)}
 onRemove={(id) => onRemove(slot.hour, id)}
 onTap={() => {
 if (selectedTreatmentId) onSlotTap(slot.hour);
 }}
 />
 ))}
 </div>
 </div>
 );
}
