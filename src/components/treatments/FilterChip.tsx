"use client";

interface FilterChipProps {
  label: string;
  active: boolean;
  onClick: () => void;
}

export default function FilterChip({ label, active, onClick }: FilterChipProps) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-full text-[13px] font-medium transition-all border font-sans ${
        active
          ? "bg-moss text-white border-moss"
          : "bg-white dark:bg-[#1A1A1A] border-gray-200 dark:border-white/[0.06] text-gray-500 dark:text-[#A89F95] hover:border-sage/40 hover:text-gray-900 dark:hover:text-[#F5F0EB]"
      }`}
    >
      {label}
    </button>
  );
}
