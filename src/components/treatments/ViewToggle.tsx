"use client";

export type ViewMode = "tier" | "grid";

interface ViewToggleProps {
 mode: ViewMode;
 onChange: (mode: ViewMode) => void;
}

export default function ViewToggle({ mode, onChange }: ViewToggleProps) {
 return (
 <div className="inline-flex bg-gray-100 rounded-lg p-0.5 border border-gray-200">
 <button
 onClick={() => onChange("tier")}
 className={`px-3 py-1.5 rounded-md text-xs font-semibold font-sans transition-colors ${
 mode === "tier"
 ? "bg-white text-gray-900 shadow-sm"
 : "text-gray-500 hover:text-gray-700"
 }`}
 >
 <span className="flex items-center gap-1.5">
 <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
 <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h12M4 18h8" />
 </svg>
 Tier
 </span>
 </button>
 <button
 onClick={() => onChange("grid")}
 className={`px-3 py-1.5 rounded-md text-xs font-semibold font-sans transition-colors ${
 mode === "grid"
 ? "bg-white text-gray-900 shadow-sm"
 : "text-gray-500 hover:text-gray-700"
 }`}
 >
 <span className="flex items-center gap-1.5">
 <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
 <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
 </svg>
 Grid
 </span>
 </button>
 </div>
 );
}
