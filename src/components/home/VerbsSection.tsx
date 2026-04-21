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
  const sectionRef = useRef<HTMLDivElement>(null);
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
    <section className="px-4 md:px-6 pt-6 md:pt-8">
     <div
      ref={sectionRef}
      className="relative mx-auto max-w-[1280px] rounded-[40px] overflow-hidden bg-[#FAF7F2] text-[#2A2520] shadow-[0_24px_60px_-24px_rgba(42,37,32,0.15)]"
      style={{ height: "380vh" }}
     >
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <div className="relative max-w-[1152px] mx-auto w-full px-6 md:px-12 grid md:grid-cols-2 gap-8 md:gap-16 items-center">
          <div className="relative min-h-[260px]">
            {VERBS.map((v, i) => {
              const isSource = v.word === "Source";
              return (
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
                  <div className="text-[11px] font-semibold tracking-[0.3em] uppercase text-terracotta mb-4">
                    {v.idx} · of · 04
                  </div>
                  <h2
                    className={`font-serif font-medium leading-[0.9] tracking-[-0.03em] m-0 mb-4 bg-clip-text ${
                      isSource
                        ? "bg-gradient-to-b from-[#8DA970] to-[#6B8B4E]"
                        : "bg-gradient-to-b from-[#2A2520] to-[#B5886A]"
                    }`}
                    style={{
                      fontSize: "clamp(80px, 12vw, 180px)",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    {v.word}.
                  </h2>
                  <p className="text-base leading-[1.6] text-[#2A2520]/70 max-w-[420px]">
                    {v.copy}
                  </p>
                </div>
              );
            })}
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
                background: i <= active ? "#B5886A" : "rgba(42,37,32,0.15)",
              }}
            />
          ))}
        </div>
      </div>
     </div>
    </section>
  );
}
