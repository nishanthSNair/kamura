"use client";

import Link from "next/link";

export default function ProtocolPage() {
  return (
    <>
      <div className="mb-8">
        <p className="text-[10px] tracking-[0.3em] uppercase text-terracotta font-sans mb-2">
          Protocol
        </p>
        <h1 className="font-serif text-3xl md:text-4xl text-gray-900 leading-tight mb-3">
          Your living plan
        </h1>
        <p className="text-sm text-gray-500 font-sans max-w-xl">
          Peptides, supplements, lifestyle, and testing — all prescribed by your
          providers, logged by you, tracked over time.
        </p>
      </div>

      <div className="p-12 rounded-2xl bg-white border border-dashed border-gray-300 text-center">
        <div className="w-14 h-14 rounded-full bg-[#EDE7DB] flex items-center justify-center mx-auto mb-4">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#B5736A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
          </svg>
        </div>
        <p className="font-serif text-xl text-gray-900 mb-2">
          No protocol items yet
        </p>
        <p className="text-sm text-gray-500 font-sans mb-6 max-w-md mx-auto">
          Your protocol fills in when a provider prescribes something during a
          session, or when you add items from the treatment library yourself.
        </p>
        <div className="flex items-center justify-center gap-3 flex-wrap">
          <Link
            href="/treatments"
            className="px-5 py-2.5 rounded-full bg-[#2a1612] text-white text-xs tracking-[0.15em] uppercase font-semibold font-sans hover:bg-[#1a0f0c] transition-colors"
          >
            Browse Treatments
          </Link>
          <Link
            href="/peptides/tracker"
            className="px-5 py-2.5 rounded-full border border-gray-300 text-gray-700 text-xs tracking-[0.15em] uppercase font-semibold font-sans hover:border-terracotta hover:text-terracotta transition-colors"
          >
            Open Peptide Tracker
          </Link>
        </div>
        <p className="text-[10px] text-gray-400 font-sans mt-6">
          Phase 2: live peptide tracker syncs here, dose logging + vial inventory,
          auto-add from provider sessions.
        </p>
      </div>
    </>
  );
}
