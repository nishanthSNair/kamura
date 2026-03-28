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
 : "bg-white border-gray-200 text-gray-500 hover:border-sage/40 hover:text-gray-900"
 }`}
 >
 {label}
 </button>
 );
}
