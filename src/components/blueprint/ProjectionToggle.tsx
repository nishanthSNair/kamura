interface ProjectionToggleProps {
  value: 30 | 90;
  onChange: (days: 30 | 90) => void;
}

export default function ProjectionToggle({
  value,
  onChange,
}: ProjectionToggleProps) {
  return (
    <div className="inline-flex rounded-full bg-gray-100 dark:bg-gray-800 p-0.5">
      {([30, 90] as const).map((days) => (
        <button
          key={days}
          onClick={() => onChange(days)}
          className={`px-4 py-1.5 text-xs font-sans font-medium rounded-full transition-all ${
            value === days
              ? "bg-terracotta text-white shadow-sm"
              : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
          }`}
        >
          {days} days
        </button>
      ))}
    </div>
  );
}
