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
    <section
      id="providers"
      className="relative bg-gradient-to-b from-[#101910] via-[#1E2A1E] to-[#2D3E2D] py-[140px] px-6 md:px-12"
    >
      <div className="max-w-[1152px] mx-auto grid md:grid-cols-2 gap-12 md:gap-16 items-center">
        <div>
          <div className="text-[10px] font-semibold tracking-[0.32em] uppercase text-[#C4A882] mb-5">
            Kamura-verified
          </div>
          <h2
            className="font-serif font-medium leading-[1.05] m-0 mb-6 text-white"
            style={{ fontSize: "clamp(44px, 5.6vw, 72px)" }}
          >
            Healers <i className="italic text-[#C4A882]">near you.</i>
          </h2>
          <p className="text-base leading-[1.65] text-white/65 max-w-[420px] mb-8">
            70+ vetted practitioners across the UAE. Real credentials, real reviews,
            scored by Kamura on evidence, access, and outcomes.
          </p>
          <Link
            href="/explore"
            className="inline-flex items-center gap-2 h-12 px-6 rounded-full bg-white/5 border border-white/25 text-white backdrop-blur hover:bg-white/10 hover:border-white/45 transition-all font-medium text-[13.5px]"
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
                <div className="font-serif font-medium text-[42px] leading-none text-[#C4A882]">
                  {s.num}
                </div>
                <div className="text-[10px] tracking-[0.22em] uppercase text-white/55 mt-2">
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
              className={`absolute top-1/2 left-1/2 w-[260px] backdrop-blur-xl border border-[#C4A882]/25 rounded-2xl p-4 shadow-[0_20px_60px_-10px_rgba(0,0,0,0.6)] pointer-events-none transition-all duration-500 ease-[cubic-bezier(0.22,0.65,0.2,1)] ${
                i === hovered
                  ? "opacity-100 -translate-x-1/2 -translate-y-1/2 scale-100"
                  : "opacity-0 -translate-x-1/2 -translate-y-1/2 translate-y-[-30px] scale-90"
              }`}
              style={{ background: "rgba(26,36,26,0.85)" }}
            >
              <div className="font-serif text-[19px] font-medium text-white mb-0.5">
                {p.name}
              </div>
              <div className="text-xs text-white/60 mb-2.5">{p.meta}</div>
              <span className="inline-flex items-center h-[22px] px-2.5 rounded-full bg-[#C4A882]/15 text-[#C4A882] text-[10.5px] font-semibold tracking-[0.08em]">
                ✓ {p.tag}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
