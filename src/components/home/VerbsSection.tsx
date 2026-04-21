"use client";
import { useEffect, useRef, useState } from "react";
import VerbObjectScene, {
  type VerbObjectHandle,
} from "./scenes/VerbObjectScene";

const VERBS = [
  {
    idx: "01",
    word: "Discover",
    copy: "207+ treatments scored on evidence, safety, access and value. Transparent rankings — not sales.",
  },
  {
    idx: "02",
    word: "Book",
    copy: "Vetted practitioners across the UAE. Real availability, real reviews, real prep notes.",
  },
  {
    idx: "03",
    word: "Source",
    copy: "Pharmaceutical-grade peptides through licensed compounding partners. Coming soon — waitlist live.",
  },
  {
    idx: "04",
    word: "Track",
    copy: "Your protocol, your streaks, your wellness score. One unified dashboard, built for the long game.",
  },
];

export default function VerbsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const sceneRef = useRef<VerbObjectHandle>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const onScroll = () => {
      const rect = section.getBoundingClientRect();
      const sectionTop = rect.top + window.scrollY;
      const sectionH = section.offsetHeight - window.innerHeight;
      const p = Math.max(
        0,
        Math.min(1, (window.scrollY - sectionTop) / Math.max(1, sectionH))
      );
      const beatF = p * VERBS.length;
      const beat = Math.min(VERBS.length - 1, Math.floor(beatF));
      const beatP = beatF - beat;
      setActive((cur) => (cur !== beat ? beat : cur));
      sceneRef.current?.setBeat(beat, beatP);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-gradient-to-b from-[#101910] via-[#1E2A1E] to-[#2D3E2D] text-white"
      style={{ height: "380vh" }}
    >
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <div className="relative max-w-[1152px] mx-auto w-full px-6 md:px-12 grid md:grid-cols-2 gap-8 md:gap-16 items-center">
          <div className="relative min-h-[260px]">
            {VERBS.map((v, i) => (
              <div
                key={i}
                className="absolute inset-0 transition-[opacity,transform,filter] duration-[700ms] ease-[cubic-bezier(0.22,0.65,0.2,1)]"
                style={{
                  opacity: i === active ? 1 : 0,
                  transform:
                    i === active
                      ? "translateY(0) scale(1)"
                      : "translateY(24px) scale(0.98)",
                  filter: i === active ? "blur(0)" : "blur(10px)",
                }}
              >
                <div className="text-[11px] font-semibold tracking-[0.3em] uppercase text-[#C4A882] mb-4">
                  {v.idx} · of · 04
                </div>
                <h2
                  className="font-serif font-medium leading-[0.9] tracking-[-0.03em] m-0 mb-4 bg-gradient-to-b from-[#FAF7F2] to-[#D4B896] bg-clip-text"
                  style={{
                    fontSize: "clamp(80px, 12vw, 180px)",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {v.word}.
                </h2>
                <p className="text-base leading-[1.6] text-white/70 max-w-[420px]">
                  {v.copy}
                </p>
              </div>
            ))}
          </div>
          <div className="relative h-[420px]">
            <VerbObjectScene ref={sceneRef} />
          </div>
        </div>
        <div className="absolute left-6 md:left-12 bottom-9 flex gap-2.5">
          {VERBS.map((_, i) => (
            <span
              key={i}
              className="w-10 h-0.5 rounded-sm transition-colors duration-500"
              style={{
                background: i <= active ? "#C4A882" : "rgba(255,255,255,0.15)",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
