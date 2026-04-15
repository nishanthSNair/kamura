import type { EvidenceLevel } from "@/data/treatments";

const GRADE_MAP: Record<
  EvidenceLevel,
  { letter: "A" | "B" | "C" | "D"; tier: string; color: string; description: string }
> = {
  Strong: {
    letter: "A",
    tier: "High",
    color: "bg-emerald-500/15 text-emerald-700 border-emerald-500/30",
    description:
      "High-quality evidence: multiple RCTs or meta-analyses converge on the effect.",
  },
  Moderate: {
    letter: "B",
    tier: "Moderate",
    color: "bg-sky-500/15 text-sky-700 border-sky-500/30",
    description:
      "Moderate-quality evidence: some RCTs, mostly consistent observational data.",
  },
  Emerging: {
    letter: "C",
    tier: "Low",
    color: "bg-amber-500/15 text-amber-700 border-amber-500/30",
    description:
      "Low-quality evidence: early-stage research, small trials, or animal models.",
  },
  Limited: {
    letter: "C",
    tier: "Low",
    color: "bg-amber-500/15 text-amber-700 border-amber-500/30",
    description:
      "Limited evidence: few published studies, mixed outcomes.",
  },
  Anecdotal: {
    letter: "D",
    tier: "Very Low",
    color: "bg-gray-400/20 text-gray-600 border-gray-400/40",
    description:
      "Anecdotal evidence: case reports and user experience only.",
  },
};

interface Props {
  level: EvidenceLevel;
  variant?: "default" | "light";
  size?: "sm" | "md";
}

export default function GradeBadge({
  level,
  variant = "default",
  size = "md",
}: Props) {
  const grade = GRADE_MAP[level];
  const isLight = variant === "light";

  return (
    <div
      className={`inline-flex items-center gap-2 rounded-full border backdrop-blur-sm font-sans ${
        isLight
          ? "bg-white/10 border-white/25 text-white/90"
          : grade.color
      } ${size === "sm" ? "px-2.5 py-1" : "px-3 py-1.5"}`}
      title={`GRADE ${grade.letter} (${grade.tier}) — ${grade.description}`}
    >
      <span
        className={`inline-flex items-center justify-center rounded-full font-bold ${
          isLight ? "bg-white/20 text-white" : "bg-white text-gray-900"
        } ${size === "sm" ? "w-4 h-4 text-[9px]" : "w-5 h-5 text-[10px]"}`}
      >
        {grade.letter}
      </span>
      <span
        className={`${
          size === "sm" ? "text-[10px]" : "text-[11px]"
        } tracking-[0.1em] uppercase font-semibold`}
      >
        GRADE · {grade.tier}
      </span>
    </div>
  );
}
