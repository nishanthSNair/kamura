import type { TreatmentOutcome } from "@/data/treatments";
import { getGradeColor } from "@/data/treatments";

interface OutcomeCardProps {
 outcome: TreatmentOutcome;
}

function DirectionIcon({ direction }: { direction: TreatmentOutcome["direction"] }) {
 const config = {
 positive: { symbol: "↑", bg: "bg-[#16A34A]/15", text: "text-[#16A34A]" },
 neutral: { symbol: "↔", bg: "bg-[#CA8A04]/15", text: "text-[#CA8A04]" },
 negative: { symbol: "↓", bg: "bg-[#DC2626]/15", text: "text-[#DC2626]" },
 };
 const c = config[direction];

 return (
 <span className={`inline-flex items-center justify-center w-5 h-5 rounded-full text-xs font-bold ${c.bg} ${c.text}`}>
 {c.symbol}
 </span>
 );
}

export default function OutcomeCard({ outcome }: OutcomeCardProps) {
 const gradeColor = getGradeColor(outcome.grade);

 return (
 <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
 <div className="flex items-center gap-2 mb-1.5">
 <DirectionIcon direction={outcome.direction} />
 <span className="font-semibold text-sm text-gray-900 font-sans">
 {outcome.name}
 </span>
 <span
 className={`ml-auto text-xs font-bold px-1.5 py-0.5 rounded ${gradeColor.text} ${gradeColor.bg}`}
 >
 {outcome.grade}
 </span>
 </div>
 <p className="text-[13px] text-gray-500 leading-relaxed font-sans mb-2">
 {outcome.description}
 </p>
 <p className="text-[11px] text-gray-400 font-sans">
 {outcome.studyCount} studies &bull; Consistency: {outcome.consistency} &bull; Effect: {outcome.effectSize}
 </p>
 </div>
 );
}
