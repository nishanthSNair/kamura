import { getScoreTier, getScoreColor } from "@/data/treatments";

interface KamuraScoreBadgeProps {
  score: number;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
}

const sizeClasses = {
  sm: "w-10 h-10 text-sm",
  md: "w-12 h-12 text-base",
  lg: "w-[90px] h-[90px] text-[32px]",
};

const ringClasses = {
  sm: "-inset-0.5 border-[1.5px]",
  md: "-inset-[3px] border-2",
  lg: "-inset-1 border-[3px]",
};

export default function KamuraScoreBadge({ score, size = "md", showLabel = false }: KamuraScoreBadgeProps) {
  const color = getScoreColor(score);
  const tier = getScoreTier(score);

  return (
    <div className="flex flex-col items-center gap-1.5">
      <div
        className={`${sizeClasses[size]} rounded-full flex items-center justify-center font-bold relative ${color.bg} ${color.text}`}
      >
        <span
          className={`absolute ${ringClasses[size]} rounded-full ${color.border}`}
        />
        {score}
      </div>
      {showLabel && (
        <>
          <span className="text-[11px] text-gray-500 dark:text-gray-500 uppercase tracking-wider font-semibold font-sans">
            Kamura Score
          </span>
          <span className={`text-xs font-semibold font-sans ${color.text}`}>
            {tier}
          </span>
        </>
      )}
    </div>
  );
}
