interface SubScoreBarProps {
  value: number;
  label: string;
  color: string;
}

export default function SubScoreBar({ value, label, color }: SubScoreBarProps) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="w-[50px] h-1.5 bg-gray-200 dark:bg-[#2E2E2E] rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all"
          style={{ width: `${value}%`, backgroundColor: color }}
        />
      </div>
      <span className="text-[11px] font-semibold font-sans" style={{ color }}>
        {label}
      </span>
    </div>
  );
}
