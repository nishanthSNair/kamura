import { getScoreColor } from "@/data/treatments";

interface ScoreBreakdownPanelProps {
 scores: {
 research: number;
 community: number;
 safety: number;
 accessibility: number;
 value: number;
 };
}

const factors = [
 { key: "research" as const, label: "Research", weight: "45%" },
 { key: "safety" as const, label: "Safety", weight: "25%" },
 { key: "accessibility" as const, label: "Access", weight: "15%" },
 { key: "value" as const, label: "Value", weight: "15%" },
];

export default function ScoreBreakdownPanel({ scores }: ScoreBreakdownPanelProps) {
 return (
 <div className="grid grid-cols-4 divide-x divide-gray-200 border-y border-gray-200">
 {factors.map((factor) => {
 const score = scores[factor.key];
 const color = getScoreColor(score);
 return (
 <div key={factor.key} className="py-5 px-4 text-center">
 <div className={`text-2xl font-bold font-sans mb-1 ${color.text}`}>
 {score}
 </div>
 <div className="text-[11px] text-gray-500 uppercase tracking-wider font-semibold font-sans mb-2">
 {factor.label}
 </div>
 <div className="w-14 h-1 bg-gray-200 rounded-full mx-auto overflow-hidden">
 <div
 className={`h-full rounded-full ${color.bg}`}
 style={{ width: `${score}%` }}
 />
 </div>
 </div>
 );
 })}
 </div>
 );
}
