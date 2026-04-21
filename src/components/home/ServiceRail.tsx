"use client";
import { useState } from "react";

type Service = {
  slug: string;
  eyebrow: string;
  title: string;
  score: string;
  icon: keyof typeof RAIL_ICONS;
};

const SERVICES: Service[] = [
  { slug: "/treatments/sound-healing", eyebrow: "Sound", title: "Sound Healing", score: "Kamura 68 · Promising", icon: "waves" },
  { slug: "/treatments/red-light-therapy", eyebrow: "Light", title: "Red Light Therapy", score: "Kamura 78 · Strong", icon: "sun" },
  { slug: "/treatments/cryotherapy", eyebrow: "Cold", title: "Cryotherapy", score: "Kamura 72 · Strong", icon: "snow" },
  { slug: "/treatments/iv-therapy", eyebrow: "Infusion", title: "IV Therapy", score: "Kamura 65 · Promising", icon: "drop" },
  { slug: "/treatments/hyperbaric-oxygen-therapy", eyebrow: "Oxygen", title: "Hyperbaric O₂", score: "Kamura 81 · Gold", icon: "circle" },
  { slug: "/treatments/infrared-sauna", eyebrow: "Heat", title: "Infrared Sauna", score: "Kamura 74 · Strong", icon: "heat" },
  { slug: "/treatments/cold-plunge", eyebrow: "Cold", title: "Cold Plunge", score: "Kamura 79 · Strong", icon: "wave" },
  { slug: "/treatments/meditation", eyebrow: "Breath", title: "Meditation", score: "Kamura 85 · Gold", icon: "leaf" },
];

const RAIL_ICONS = {
  waves: (
    <path d="M4 12c3 0 3-4 6-4s3 4 6 4 3-4 6-4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
  ),
  sun: (
    <g fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.5 5.5l1.5 1.5M17 17l1.5 1.5M5.5 18.5L7 17M17 7l1.5-1.5" />
    </g>
  ),
  snow: (
    <g fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <path d="M12 2v20M4 6l16 12M4 18l16-12" />
    </g>
  ),
  drop: (
    <path d="M12 3c3 5 6 8 6 12a6 6 0 0 1-12 0c0-4 3-7 6-12z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
  ),
  circle: (
    <g fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="3" />
    </g>
  ),
  heat: (
    <g fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <path d="M7 4c1 2-1 3 0 5s3 1 3 3-2 2-1 4M12 3c1 2-1 3 0 5s3 1 3 3-2 2-1 4M17 4c1 2-1 3 0 5s3 1 3 3-2 2-1 4" />
    </g>
  ),
  wave: (
    <path d="M3 15c2 0 3-2 5-2s3 2 5 2 3-2 5-2 3 2 3 2" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  ),
  leaf: (
    <path d="M5 19c0-8 6-14 14-14 0 8-6 14-14 14zM5 19l8-8" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" />
  ),
};

export default function ServiceRail() {
  const [center, setCenter] = useState(3);
  return (
    <section
      id="discover"
      className="relative overflow-hidden bg-gradient-to-b from-[#FAF7F2] to-[#EDE7DB] py-[120px] md:py-[140px]"
    >
      <div className="max-w-[1152px] mx-auto mb-12 md:mb-16 px-6 md:px-12">
        <div className="text-[10px] font-semibold tracking-[0.32em] uppercase text-terracotta mb-4">
          Scored & verified
        </div>
        <h2
          className="font-serif font-medium leading-[1.08] m-0 max-w-[18ch] text-[#2A2520]"
          style={{ fontSize: "clamp(40px, 5.2vw, 68px)" }}
        >
          Wellness services, <i className="italic text-[#B5886A]">ranked by real evidence.</i>
        </h2>
      </div>

      <div className="relative h-[520px]" style={{ perspective: "1600px" }}>
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ transformStyle: "preserve-3d" }}
        >
          {SERVICES.map((s, i) => {
            const offset = i - center;
            const abs = Math.abs(offset);
            const angle = offset * 18;
            const z = -abs * 140;
            const y = abs * 18;
            const opacity = abs > 3 ? 0 : 1 - abs * 0.18;
            return (
              <button
                key={s.slug}
                onClick={() => setCenter(i)}
                className="absolute top-1/2 left-1/2 w-[260px] h-[360px] -mt-[180px] -ml-[130px] rounded-[24px] overflow-hidden bg-white border border-[#2A2520]/10 shadow-[0_24px_48px_-18px_rgba(42,37,32,0.22)] transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.22,0.65,0.2,1)] will-change-transform cursor-pointer text-left"
                style={{
                  transform: `translate3d(${offset * 220}px, ${y}px, ${z}px) rotateY(${-angle}deg)`,
                  opacity,
                  zIndex: 10 - abs,
                }}
              >
                <div className="h-[58%] grid place-items-center bg-gradient-to-br from-[#EFF4E8] to-[#D6DDD0] text-[#8DA970]">
                  <svg viewBox="0 0 24 24" className="w-18 h-18 opacity-75" style={{ width: 72, height: 72 }}>
                    {RAIL_ICONS[s.icon]}
                  </svg>
                </div>
                <div className="p-5">
                  <div className="text-[9.5px] font-semibold tracking-[0.24em] uppercase text-[#B5886A] mb-2">
                    {s.eyebrow}
                  </div>
                  <h3 className="font-serif font-medium text-[22px] leading-[1.15] text-[#2A2520] m-0 mb-1.5">
                    {s.title}
                  </h3>
                  <div className="text-[11.5px] text-[#2A2520]/65 font-medium">{s.score}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex justify-center gap-3 mt-10">
        <button
          aria-label="prev"
          onClick={() => setCenter((c) => Math.max(0, c - 1))}
          className="w-11 h-11 rounded-full bg-white border border-[#2A2520]/12 text-[#2A2520] grid place-items-center transition-all hover:bg-[#B5886A] hover:text-white hover:border-[#B5886A] shadow-[0_4px_12px_-6px_rgba(42,37,32,0.15)]"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <path d="m15 6-6 6 6 6" />
          </svg>
        </button>
        <button
          aria-label="next"
          onClick={() => setCenter((c) => Math.min(SERVICES.length - 1, c + 1))}
          className="w-11 h-11 rounded-full bg-white border border-[#2A2520]/12 text-[#2A2520] grid place-items-center transition-all hover:bg-[#B5886A] hover:text-white hover:border-[#B5886A] shadow-[0_4px_12px_-6px_rgba(42,37,32,0.15)]"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <path d="m9 6 6 6-6 6" />
          </svg>
        </button>
      </div>
    </section>
  );
}
