"use client";
import { useEffect, useRef, useState } from "react";
import PeptideScene, { type PeptideSceneHandle } from "./scenes/PeptideScene";

export default function PeptideSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const sceneRef = useRef<PeptideSceneHandle>(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const onScroll = () => {
      const rect = section.getBoundingClientRect();
      const top = rect.top + window.scrollY - window.innerHeight * 0.6;
      const h = section.offsetHeight;
      const p = Math.max(
        0,
        Math.min(1, (window.scrollY - top) / Math.max(1, h * 0.7))
      );
      sceneRef.current?.setProgress(p);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section id="peptides" className="px-4 md:px-6 pt-6 md:pt-8">
      <div
        ref={sectionRef}
        className="relative mx-auto max-w-[1280px] rounded-[40px] overflow-hidden bg-[#3F5A3C] text-white py-[120px] md:py-[140px] px-6 md:px-12 shadow-[0_24px_60px_-24px_rgba(42,37,32,0.3)]"
      >
        <div className="relative max-w-[1152px] mx-auto text-center">
          <div className="text-[10px] font-semibold tracking-[0.32em] uppercase text-white/75 mb-6">
            Pharmaceutical-grade · Coming soon
          </div>
          <h2
            className="font-serif font-medium leading-[1.05] tracking-[-0.015em] m-0 mb-6 mx-auto max-w-[16ch]"
            style={{ fontSize: "clamp(40px, 6vw, 84px)" }}
          >
            You are written <i className="italic text-[#D4B896]">in peptides.</i>
          </h2>
          <p className="text-[17px] leading-[1.65] text-white/75 max-w-[520px] mx-auto mb-14">
            Licensed compounding partners. Compliantly sourced. A pharmacy layer built
            into the wellness platform — not bolted on.
          </p>
          <div className="relative mx-auto h-[320px] mb-14 max-w-[960px]">
            <PeptideScene ref={sceneRef} />
          </div>

          {submitted ? (
            <div className="mx-auto inline-flex gap-2 max-w-[440px] justify-center bg-white/10 border border-white/25 rounded-full px-6 py-3.5 backdrop-blur-md">
              <span className="text-[#D4B896] text-[13px]">
                ✓ You&rsquo;re on the waitlist. We&rsquo;ll be in touch before launch.
              </span>
            </div>
          ) : (
            <form
              className="flex gap-2 max-w-[440px] mx-auto bg-white/8 border border-white/20 rounded-full p-1.5 backdrop-blur-md"
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
