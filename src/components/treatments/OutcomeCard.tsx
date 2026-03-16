import type { TreatmentOutcome } from "@/data/treatments";
import { getGradeColor } from "@/data/treatments";

interface OutcomeCardProps {
  outcome: TreatmentOutcome;
}

function DirectionIcon({ direction }: { direction: TreatmentOutcome["direction"] }) {
  const config = {
    positive: { symbol: "↑", bg: "bg-[#16A34A]/15 dark:bg-[#4ADE80]/12", text: "text-[#16A34A] dark:text-[#4ADE80]" },
    neutral: { symbol: "↔", bg: "bg-[#CA8A04]/15 dark:bg-[#FACC15]/12", text: "text-[#CA8A04] dark:text-[#FACC15]" },
    negative: { symbol: "↓", bg: "bg-[#DC2626]/15 dark:bg-[#F87171]/12", text: "text-[#DC2626] dark:text-[#F87171]" },
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
    <div className="bg-gray-50 dark:bg-[#242424] border border-gray-200 dark:border-white/[0.06] rounded-xl p-4">
      <div className="flex items-center gap-2 mb-1.5">
        <DirectionIcon direction={outcome.direction} />
        <span className="font-semibold text-sm text-gray-900 dark:text-[#F5F0EB] font-sans">
          {outcome.name}
        </span>
        <span
          className={`ml-auto text-xs font-bold px-1.5 py-0.5 rounded ${gradeColor.text} ${gradeColor.bg}`}
        >
          {outcome.grade}
        </span>
      </div>
      <p className="text-[13px] text-gray-500 dark:text-[#A89F95] leading-relaxed font-sans mb-2">
        {outcome.description}
      </p>
      <p className="text-[11px] text-gray-400 dark:text-[#6B6560] font-sans">
        {outcome.studyCount} studies &bull; Consistency: {outcome.consistency} &bull; Effect: {outcome.effectSize}
      </p>
    </div>
  );
}
