import { getIndicatorColor } from "@/data/blueprint";

interface ScoreRingProps {
  score: number;
  size?: "sm" | "lg";
}

export default function ScoreRing({ score, size = "lg" }: ScoreRingProps) {
  const { fill } = getIndicatorColor(score);
  const circumference = 2 * Math.PI * 52; // r=52
  const dashArray = `${(score / 100) * circumference} ${circumference}`;

  const dimensions = size === "lg" ? "w-28 h-28" : "w-16 h-16";
  const textSize = size === "lg" ? "text-3xl" : "text-lg";
  const labelSize = size === "lg" ? "text-[10px]" : "text-[8px]";
  const strokeW = size === "lg" ? 8 : 6;

  return (
    <div className={`relative ${dimensions}`}>
      <svg className="-rotate-90 w-full h-full" viewBox="0 0 120 120">
        <circle
          cx="60"
          cy="60"
          r="52"
          fill="none"
          className="stroke-gray-200 dark:stroke-gray-700/50"
          strokeWidth={strokeW}
        />
        <circle
          cx="60"
          cy="60"
          r="52"
          fill="none"
          stroke={fill}
          strokeWidth={strokeW}
          strokeLinecap="round"
          strokeDasharray={dashArray}
          className="transition-all duration-700 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span
          className={`${textSize} font-serif font-bold text-gray-900 dark:text-gray-100`}
        >
          {score}
        </span>
        <span
          className={`${labelSize} text-gray-400 dark:text-gray-500 font-sans uppercase tracking-wider`}
        >
          Blueprint
        </span>
      </div>
    </div>
  );
}
