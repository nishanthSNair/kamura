"use client";

import Link from "next/link";
import { useEffect } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function JoinModal({ open, onClose }: Props) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#1a0f0c]/60 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="w-full max-w-3xl bg-[#FAF7F2] rounded-3xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-8 md:px-10 pt-10 pb-6 text-center relative">
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:text-terracotta"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          <p className="text-[10px] tracking-[0.3em] uppercase text-terracotta font-sans font-semibold mb-3">
            Join Kamura
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-gray-900 leading-tight mb-3">
            Which path is yours?
          </h2>
          <p className="text-sm text-gray-500 font-sans max-w-md mx-auto">
            Sign up as a client to build your wellness dashboard, or as a provider
            to list your services and accept bookings.
          </p>
        </div>

        {/* Two option cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-8 md:px-10 pb-10">
          <Link
            href="/my/signup"
            onClick={onClose}
            className="group relative overflow-hidden rounded-2xl bg-white border border-gray-200 p-7 hover:border-terracotta/40 hover:shadow-lg transition-all"
          >
            <div className="w-12 h-12 rounded-xl bg-terracotta/10 flex items-center justify-center mb-5 group-hover:bg-terracotta/15 transition-colors">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#B5886A" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
            <p className="text-[10px] tracking-[0.25em] uppercase text-terracotta font-sans font-semibold mb-2">
              I&apos;m a client
            </p>
            <h3 className="font-serif text-2xl text-gray-900 mb-2 leading-tight">
              Build my wellness dashboard
            </h3>
            <p className="text-sm text-gray-500 font-sans leading-relaxed mb-5">
              Track peptides, log doses, book practitioners, and see your
              wellness score trend over time.
            </p>
            <span className="inline-flex items-center gap-1.5 text-[11px] tracking-[0.15em] uppercase text-terracotta font-sans font-semibold">
              Continue as client
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </span>
          </Link>

          <Link
            href="/provider/signup"
            onClick={onClose}
            className="group relative overflow-hidden rounded-2xl bg-[#1a0f0c] text-white border border-[#1a0f0c] p-7 hover:bg-[#2a1612] transition-all"
          >
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-5 group-hover:bg-white/15 transition-colors">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
            </div>
            <p className="text-[10px] tracking-[0.25em] uppercase text-kamura-gold font-sans font-semibold mb-2">
              I&apos;m a provider
            </p>
            <h3 className="font-serif text-2xl text-white mb-2 leading-tight">
              List my clinic or practice
            </h3>
            <p className="text-sm text-white/70 font-sans leading-relaxed mb-5">
              Reach wellness-focused clients across the GCC. Manage bookings,
              earnings, and reviews from one dashboard.
            </p>
            <span className="inline-flex items-center gap-1.5 text-[11px] tracking-[0.15em] uppercase text-kamura-gold font-sans font-semibold">
              Continue as provider
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </span>
          </Link>
        </div>

        {/* Footer — subtle sign-in */}
        <div className="px-8 md:px-10 pb-8 text-center">
          <p className="text-xs text-gray-400 font-sans">
            Already have an account?{" "}
            <Link href="/my/login" onClick={onClose} className="text-terracotta hover:underline">
              Client sign in
            </Link>
            <span className="mx-2 text-gray-300">·</span>
            <Link href="/provider/login" onClick={onClose} className="text-terracotta hover:underline">
              Provider sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
