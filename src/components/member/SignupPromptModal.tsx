"use client";

import Link from "next/link";
import { useEffect } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
  reason?: string;
}

export default function SignupPromptModal({ open, onClose, reason }: Props) {
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

  const defaultReason =
    "Create a free account to save this across devices and build your long-term wellness record.";

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#1a0f0c]/60 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-white rounded-3xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-8 text-center relative">
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#EDE7DB] flex items-center justify-center text-gray-500 hover:text-terracotta"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          <div className="w-14 h-14 rounded-2xl bg-terracotta/10 flex items-center justify-center mx-auto mb-5">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#B5886A" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
            </svg>
          </div>

          <p className="text-[10px] tracking-[0.3em] uppercase text-terracotta font-sans font-semibold mb-3">
            Save your progress
          </p>
          <h2 className="font-serif text-2xl text-gray-900 mb-3 leading-tight">
            Keep building.
          </h2>
          <p className="text-sm text-gray-500 font-sans leading-relaxed mb-7">
            {reason || defaultReason}
          </p>

          <div className="flex flex-col gap-2">
            <Link
              href="/my/signup"
              onClick={onClose}
              className="px-6 py-3 rounded-full bg-[#2a1612] text-white text-xs tracking-[0.15em] uppercase font-semibold font-sans hover:bg-[#1a0f0c]"
            >
              Create free account
            </Link>
            <Link
              href="/my/login"
              onClick={onClose}
              className="px-6 py-3 text-xs tracking-[0.15em] uppercase text-gray-500 hover:text-terracotta font-sans font-semibold"
            >
              Already have one? Sign in
            </Link>
            <button
              onClick={onClose}
              className="px-6 py-3 text-[10px] tracking-[0.15em] uppercase text-gray-400 hover:text-gray-600 font-sans"
            >
              Keep browsing
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
