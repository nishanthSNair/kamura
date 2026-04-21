"use client";
import { useState } from "react";
import Link from "next/link";
import GlobeScene from "./scenes/GlobeScene";

const PRACTITIONERS = [
  { name: "Dr. Maya Sharma", meta: "Longevity MD · Dubai", tag: "Kamura-verified" },
  {
    name: "Dr. Omar Al-Zahrani",
    meta: "Peptide clinician · Abu Dhabi",
    tag: "Kamura-verified",
  },
  { name: "Layla Haddad, ND", meta: "Functional med · Sharjah", tag: "Kamura-verified" },
  { name: "Dr. Priya Menon", meta: "Integrative GP · Al Ain", tag: "Kamura-verified" },
  { name: "Karim Saleh", meta: "Wellness coach · Ajman", tag: "Kamura-verified" },
];

export default function GlobeSection() {
  const [hovered, setHovered] = useState(0);
  return (
    <section id="providers" className="px-4 md:px-6 pt-6 md:pt-8">
     <div className="relative mx-auto max-w-[1280px] rounded-[40px] overflow-hidden bg-[#3F5A3C] text-white py-[100px] md:py-[120px] px-8 md:px-14 shadow-[0_24px_60px_-24px_rgba(42,37,32,0.3)]">
      <div className="max-w-[1152px] mx-auto grid md:grid-cols-2 gap-12 md:gap-16 items-center">
        <div>
          <div className="text-[10px] font-semibold tracking-[0.32em] uppercase text-white/75 mb-5">
            Kamura-verified
          </div>
          <h2
            className="font-serif font-medium leading-[1.05] m-0 mb-6 text-white"
            style={{ fontSize: "clamp(44px, 5.6vw, 72px)" }}
          >
            Healers <i className="italic text-[#D4B896]">near you.</i>
          </h2>
          <p className="text-base leading-[1.65] text-white/75 max-w-[420px] mb-8">
            70+ vetted practitioners across the UAE. Real credentials, real reviews,
            scored by Kamura on evidence, access, and outcomes.
          </p>
          <Link
            href="/explore"
            className="inline-flex items-center gap-2 h-12 px-6 rounded-full bg-white text-[#2A2520] hover:bg-[#B5886A] hover:text-white transition-all font-medium text-[13.5px] shadow-[0_6px_16px_-8px_rgba(0,0,0,0.3)]"
          >
            Browse providers <span>→</span>
          </Link>
          <div className="flex gap-9 mt-8">
            {[
              { num: "70+", lab: "Practitioners" },
              { num: "5", lab: "Emirates" },
              { num: "24", lab: "Specialties" },
            ].map((s) => (
              <div key={s.lab}>
                <div className="font-serif font-medium text-[42px] leading-none text-[#D4B896]">
                  {s.num}
                </div>
                <div className="text-[10px] tracking-[0.22em] uppercase text-white/60 mt-2">
                  {s.lab}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative h-[480px] md:h-[560px]">
          <GlobeScene onHover={(i) => i !== -1 && setHovered(i)} />
          {PRACTITIONERS.map((p, i) => (
            <div
              key={i}
              className={`absolute top-1/2 left-1/2 w-[260px] backdrop-blur-xl border border-white/25 rounded-2xl p-4 shadow-[0_20px_60px_-10px_rgba(0,0,0,0.4)] pointer-events-none transition-all duration-500 ease-[cubic-bezier(0.22,0.65,0.2,1)] ${
                i === hovered
                  ? "opacity-100 -translate-x-1/2 -translate-y-1/2 scale-100"
                  : "opacity-0 -translate-x-1/2 -translate-y-1/2 translate-y-[-30px] scale-90"
              }`}
              style={{ background: "rgba(255,255,255,0.96)" }}
            >
              <div className="font-serif text-[19px] font-medium text-[#2A2520] mb-0.5">
                {p.name}
              </div>
              <div className="text-xs text-[#2A2520]/60 mb-2.5">{p.meta}</div>
              <span className="inline-flex items-center h-[22px] px-2.5 rounded-full bg-[#B5886A]/15 text-[#9A7357] text-[10.5px] font-semibold tracking-[0.08em]">
                ✓ {p.tag}
              </span>
            </div>
          ))}
        </div>
      </div>
     </div>
    </section>
  );
}
