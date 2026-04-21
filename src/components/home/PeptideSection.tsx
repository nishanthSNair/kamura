"use client";
import { useState } from "react";

export default function PeptideSection() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section id="peptides" className="px-4 md:px-6 pt-6 md:pt-8">
      <div className="relative mx-auto max-w-[1280px] rounded-[40px] overflow-hidden bg-[#4B6B47] text-white py-[80px] md:py-[100px] px-6 md:px-12 shadow-[0_24px_60px_-24px_rgba(42,37,32,0.3)]">
        <div className="relative max-w-[1152px] mx-auto text-center">
          <div className="text-[10px] font-semibold tracking-[0.32em] uppercase text-white/75 mb-6">
            Pharmaceutical-grade · Coming soon
          </div>
          <h2
            className="font-serif font-medium leading-[1.05] tracking-[-0.015em] m-0 mb-6 mx-auto max-w-[16ch]"
            style={{ fontSize: "clamp(36px, 5vw, 64px)" }}
          >
            You are written <i className="italic text-[#D4B896]">in peptides.</i>
          </h2>
          <p className="text-[16px] leading-[1.6] text-white/75 max-w-[480px] mx-auto mb-10">
            Licensed compounding partners. Compliantly sourced. A pharmacy layer built
            into the wellness platform — not bolted on.
          </p>

          {/* Static SVG molecule — reliable render, no JS/3D dependency */}
          <div className="relative mx-auto mb-12 w-full max-w-[420px] h-[140px]">
            <svg viewBox="0 0 420 140" className="w-full h-full" aria-hidden>
              <defs>
                <linearGradient id="bond" x1="0" x2="1">
                  <stop offset="0%" stopColor="#D4B896" stopOpacity="0.85" />
                  <stop offset="100%" stopColor="#D4B896" stopOpacity="0.25" />
                </linearGradient>
              </defs>
              <g stroke="url(#bond)" strokeWidth="1.4" strokeLinecap="round">
                <line x1="50" y1="70" x2="115" y2="45" />
                <line x1="115" y1="45" x2="180" y2="70" />
                <line x1="180" y1="70" x2="245" y2="45" />
                <line x1="245" y1="45" x2="310" y2="70" />
                <line x1="310" y1="70" x2="375" y2="45" />
                <line x1="115" y1="45" x2="115" y2="20" />
                <line x1="245" y1="45" x2="245" y2="20" />
              </g>
              {[
                { cx: 50, cy: 70, r: 9, c: "#D4B896" },
                { cx: 115, cy: 45, r: 11, c: "#C4A882" },
                { cx: 180, cy: 70, r: 9, c: "#D4B896" },
                { cx: 245, cy: 45, r: 11, c: "#C4A882" },
                { cx: 310, cy: 70, r: 9, c: "#D4B896" },
                { cx: 375, cy: 45, r: 9, c: "#D4B896" },
                { cx: 115, cy: 20, r: 6, c: "rgba(255,255,255,0.6)" },
                { cx: 245, cy: 20, r: 6, c: "rgba(255,255,255,0.6)" },
              ].map((d, i) => (
                <circle key={i} cx={d.cx} cy={d.cy} r={d.r} fill={d.c} />
              ))}
            </svg>
          </div>

          {submitted ? (
            <div className="mx-auto inline-flex gap-2 max-w-[440px] justify-center bg-white/10 border border-white/25 rounded-full px-6 py-3.5 backdrop-blur-md">
              <span className="text-[#D4B896] text-[13px]">
                ✓ You&rsquo;re on the waitlist. We&rsquo;ll be in touch before launch.
              </span>
            </div>
          ) : (
            <form
              className="flex gap-2 max-w-[440px] mx-auto bg-white/10 border border-white/20 rounded-full p-1.5 backdrop-blur-md"
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
            >
              <input
                type="email"
                required
                placeholder="your@email.com"
                className="flex-1 bg-transparent border-0 outline-none text-white text-sm px-5 placeholder:text-white/45"
              />
              <button
                type="submit"
                className="bg-[#B5886A] hover:bg-[#9A7357] text-white border-0 rounded-full px-5 h-11 cursor-pointer text-[13px] font-medium transition-colors"
              >
                Join waitlist
              </button>
            </form>
          )}
          <div className="mt-3.5 text-[11px] tracking-[0.12em] uppercase text-white/45">
            Early access · Q3 2026
          </div>
        </div>
      </div>
    </section>
  );
}
