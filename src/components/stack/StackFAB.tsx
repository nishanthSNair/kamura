"use client";

import { useStackContext } from "@/context/StackContext";

interface StackFABProps {
 onClick: () => void;
}

export default function StackFAB({ onClick }: StackFABProps) {
 const { count, hydrated } = useStackContext();

 if (!hydrated || count === 0) return null;

 return (
 <button
 onClick={onClick}
 className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 px-5 py-3 bg-[#B5736A] hover:bg-[#9A5F57] text-white rounded-full shadow-xl transition-all hover:scale-105 font-sans"
 >
 <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
 <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
 </svg>
 <span className="text-sm font-semibold">My Stack</span>
 <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-white/20 text-xs font-bold">
 {count}
 </span>
 </button>
 );
}
