import type { RiskFlag } from "@/data/wellness-scoring";

interface RiskFlagsProps {
  flags: RiskFlag[];
}

export default function RiskFlags({ flags }: RiskFlagsProps) {
  if (flags.length === 0) return null;

  return (
    <div className="space-y-2">
      {flags.map((flag, i) => (
        <div
          key={i}
          className={`p-3 rounded-xl border text-sm font-sans ${
            flag.severity === "warning"
              ? "bg-score-red/5 border-score-red/20"
              : "bg-score-yellow/10 border-score-yellow/30"
          }`}
        >
          <div className="flex items-start gap-2">
            <span className="text-base leading-none mt-0.5">
              {flag.severity === "warning" ? "\u26A0\uFE0F" : "\u{1F7E1}"}
            </span>
            <div>
              <p className={`text-xs font-medium ${
                flag.severity === "warning" ? "text-score-red" : "text-yellow-700"
              }`}>
                {flag.treatment}
              </p>
              <p className="text-xs text-gray-600 mt-0.5">{flag.message}</p>
            </div>
          </div>
        </div>
      ))}

      <p className="text-[10px] text-gray-400 font-sans italic mt-3">
        Always consult your healthcare provider before starting any new treatment, especially with existing conditions.
      </p>
    </div>
  );
}
