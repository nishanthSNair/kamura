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
          ? "bg-kamura-gold/15 border-kamura-gold/30 text-kamura-gold"
          : "bg-white dark:bg-[#1A1A1A] border-gray-200 dark:border-white/[0.06] text-gray-500 dark:text-[#A89F95] hover:border-kamura-gold/30 hover:text-gray-900 dark:hover:text-[#F5F0EB]"
      }`}
    >
      {label}
    </button>
  );
}
