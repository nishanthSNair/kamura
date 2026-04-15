import type { Metadata } from "next";
import Link from "next/link";
import FadeInOnScroll from "@/components/FadeInOnScroll";
import DecisionTree, { type DecisionNode } from "@/components/DecisionTree";

const PEPTIDE_DECISION: DecisionNode = {
  id: "root",
  label: "What's your goal?",
  sublabel: "Pick one to begin",
  children: [
    {
      id: "fat-loss",
      label: "Fat Loss",
      sublabel: "Body composition",
      children: [
        { id: "visceral", label: "Visceral Fat", sublabel: "Belly / liver", href: "/treatments/tesamorelin" },
        { id: "sub-q", label: "Subcutaneous", sublabel: "Stubborn areas", href: "/treatments/aod-9604" },
      ],
    },
    {
      id: "recovery",
      label: "Recovery",
      sublabel: "Tissue repair",
      children: [
        { id: "bpc", label: "BPC-157", sublabel: "Localized healing", href: "/treatments/bpc-157" },
        { id: "tb500", label: "TB-500", sublabel: "Systemic repair", href: "/treatments/tb-500" },
      ],
    },
    {
      id: "longevity",
      label: "Longevity",
      sublabel: "Cellular health",
      children: [
        { id: "epitalon", label: "Epitalon", sublabel: "Telomeres", href: "/treatments/epitalon" },
        { id: "mots", label: "MOTS-C", sublabel: "Mitochondria", href: "/treatments/mots-c" },
      ],
    },
    {
      id: "cognitive",
      label: "Cognition",
      sublabel: "Focus + calm",
      children: [
        { id: "semax", label: "Semax", sublabel: "Nootropic", href: "/treatments/semax" },
        { id: "selank", label: "Selank", sublabel: "Anxiolytic", href: "/treatments/selank" },
      ],
    },
  ],
};

export const metadata: Metadata = {
  title: "What is a Peptide? — The Science of Cellular Signaling",
  description:
    "Peptides are the messenger molecules that tell your cells how to heal, build, regulate, and defend. A visual, science-backed introduction from Kamura.",
  alternates: { canonical: "https://kamuralife.com/peptides/what-is-a-peptide" },
  openGraph: {
    title: "What is a Peptide? | KAMURA",
    description:
      "The messenger molecules that tell your cells how to heal, build, regulate, and defend.",
    url: "https://kamuralife.com/peptides/what-is-a-peptide",
  },
};

const JOBS = [
  {
    number: "01",
    title: "HEAL",
    subtitle: "Tissue repair, angiogenesis, wound closure",
    body:
      "Repair peptides like BPC-157 and TB-500 accelerate new blood vessel formation and guide fibroblast migration — the foundation of how the body rebuilds itself.",
  },
  {
    number: "02",
    title: "BUILD",
    subtitle: "Growth hormone, collagen, muscle",
    body:
      "GHRH analogues and ghrelin mimetics instruct the pituitary to pulse natural growth hormone — driving lean tissue, recovery, and collagen synthesis.",
  },
  {
    number: "03",
    title: "REGULATE",
    subtitle: "Metabolism, hormones, circadian rhythm",
    body:
      "Peptides act as master dials on insulin sensitivity, melatonin, fertility, and stress response — fine-tuning the systems that drift as we age.",
  },
  {
    number: "04",
    title: "DEFEND",
    subtitle: "Immune modulation, inflammation control",
    body:
      "From Thymosin Alpha-1 to VIP, peptides orchestrate T-cell function, NK cell activation, and the inflammatory cascades that keep you well.",
  },
];

export default function WhatIsAPeptidePage() {
  return (
    <>
      {/* ───── HERO with animated peptide chain ─────────────── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#1a0f0c]">
        {/* Ambient particles */}
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 40 }).map((_, i) => (
            <span
              key={i}
              className="particle absolute rounded-full bg-terracotta/40"
              style={
                {
                  width: `${1 + (i % 3)}px`,
                  height: `${1 + (i % 3)}px`,
                  left: `${(i * 53) % 100}%`,
                  top: `${(i * 37) % 100}%`,
                  animationDelay: `${(i * 0.3) % 6}s`,
                  animationDuration: `${6 + (i % 4)}s`,
                } as React.CSSProperties
              }
            />
          ))}
        </div>

        {/* Glow */}
        <div
          className="absolute inset-0 opacity-60"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(181,115,106,0.25), transparent 60%)",
          }}
        />

        <div className="relative z-10 text-center px-6 py-20 max-w-4xl mx-auto">
          <span className="inline-block px-4 py-1.5 mb-10 rounded-full border border-white/25 text-[10px] tracking-[0.3em] uppercase text-white/80 font-sans">
            The Science · Visualized
          </span>

          {/* Animated peptide chain SVG */}
          <div className="mb-12 flex justify-center">
            <svg
              viewBox="0 0 500 120"
              className="w-full max-w-md"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="chainGrad" x1="0%" x2="100%">
                  <stop offset="0%" stopColor="#B5736A" />
                  <stop offset="100%" stopColor="#E8C4A0" />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="2.5" result="b" />
                  <feMerge>
                    <feMergeNode in="b" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              {/* bonds */}
              <path
                d="M 40 60 Q 90 20, 140 60 T 240 60 T 340 60 T 440 60"
                stroke="url(#chainGrad)"
                strokeWidth="1.5"
                fill="none"
                filter="url(#glow)"
                strokeDasharray="400"
                strokeDashoffset="400"
                style={{ animation: "drawBond 2.5s ease-out forwards" }}
              />
              {/* amino acid beads */}
              {[40, 140, 240, 340, 440].map((x, i) => (
                <circle
                  key={x}
                  cx={x}
                  cy={60}
                  r="10"
                  fill="url(#chainGrad)"
                  filter="url(#glow)"
                  style={{
                    opacity: 0,
                    animation: `beadPop 0.5s ease-out forwards`,
                    animationDelay: `${0.3 + i * 0.3}s`,
                  }}
                />
              ))}
              {/* inner core dots */}
              {[40, 140, 240, 340, 440].map((x, i) => (
                <circle
                  key={`c${x}`}
                  cx={x}
                  cy={60}
                  r="3"
                  fill="#fff"
                  style={{
                    opacity: 0,
                    animation: `beadPop 0.5s ease-out forwards`,
                    animationDelay: `${0.4 + i * 0.3}s`,
                  }}
                />
              ))}
            </svg>
          </div>

          <h1 className="font-serif text-[42px] md:text-[80px] font-normal leading-[0.95] tracking-tight text-white mb-8">
            You are written
            <br />
            <span className="italic">in peptides.</span>
          </h1>
          <p className="text-base md:text-lg text-white/70 max-w-[560px] mx-auto leading-relaxed font-sans mb-12">
            Short chains of amino acids — the smallest units of biological
            language. Every instruction your cells follow begins as a peptide
            message.
          </p>

          <div className="flex items-center justify-center gap-3 text-[11px] tracking-[0.2em] uppercase text-white/40 font-sans animate-bounce">
            <span>Scroll</span>
            <span>↓</span>
          </div>
        </div>
      </section>

      {/* ───── WHAT THEY ARE — size comparison ──────────────── */}
      <section className="py-24 md:py-32 bg-[#EDE7DB]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-16 items-center">
            <FadeInOnScroll>
              <div>
                <p className="text-[10px] tracking-[0.3em] uppercase text-terracotta font-sans mb-5">
                  The Definition
                </p>
                <h2 className="font-serif text-4xl md:text-5xl text-gray-900 leading-[1.1] mb-6">
                  Between an amino acid
                  <br />
                  and a protein.
                </h2>
                <p className="text-base text-gray-600 font-sans leading-relaxed mb-5">
                  A peptide is a chain of{" "}
                  <strong className="text-gray-900">2 to 50 amino acids</strong>{" "}
                  linked by peptide bonds. Shorter than a protein, larger than
                  a free amino acid — small enough to slip into the body&apos;s
                  signaling system, specific enough to target a single receptor.
                </p>
                <p className="text-base text-gray-600 font-sans leading-relaxed">
                  Your body already makes thousands of them. Insulin, oxytocin,
                  glucagon, endorphins — all peptides. Therapeutic peptides are
                  precise copies or cousins of these natural messengers.
                </p>
              </div>
            </FadeInOnScroll>

            <FadeInOnScroll delay={150}>
              <div className="relative h-[400px] md:h-[460px]">
                {/* Size comparison: amino acid / peptide / protein */}
                <div className="absolute inset-0 flex items-center justify-between gap-4">
                  {/* Amino acid */}
                  <div className="flex-1 text-center">
                    <div className="relative h-40 flex items-center justify-center">
                      <div className="w-4 h-4 rounded-full bg-terracotta shadow-lg shadow-terracotta/30" />
                    </div>
                    <p className="text-[10px] tracking-[0.2em] uppercase text-gray-500 font-sans mb-1">
                      Amino Acid
                    </p>
                    <p className="text-xs text-gray-400 font-sans">1 unit</p>
                  </div>

                  {/* Peptide */}
                  <div className="flex-1 text-center">
                    <div className="relative h-40 flex items-center justify-center">
                      <svg viewBox="0 0 120 60" className="w-full">
                        <path
                          d="M 10 30 Q 30 10, 50 30 T 90 30 T 110 30"
                          stroke="#B5736A"
                          strokeWidth="1.5"
                          fill="none"
                        />
                        {[10, 50, 90, 110].map((x) => (
                          <circle key={x} cx={x} cy={30} r="6" fill="#B5736A" />
                        ))}
                      </svg>
                    </div>
                    <p className="text-[10px] tracking-[0.2em] uppercase text-gray-900 font-sans mb-1 font-semibold">
                      Peptide
                    </p>
                    <p className="text-xs text-terracotta font-sans">2–50 units</p>
                  </div>

                  {/* Protein */}
                  <div className="flex-1 text-center">
                    <div className="relative h-40 flex items-center justify-center">
                      <svg viewBox="0 0 140 140" className="w-full h-full">
                        <defs>
                          <radialGradient id="proteinG">
                            <stop offset="0%" stopColor="#9A5F57" />
                            <stop offset="100%" stopColor="#B5736A" />
                          </radialGradient>
                        </defs>
                        {[
                          [70, 40, 10],
                          [50, 60, 9],
                          [90, 60, 9],
                          [60, 80, 9],
                          [80, 80, 9],
                          [70, 100, 9],
                          [40, 80, 8],
                          [100, 80, 8],
                          [55, 100, 8],
                          [85, 100, 8],
                          [50, 50, 7],
                          [90, 50, 7],
                          [35, 65, 7],
                          [105, 65, 7],
                          [70, 65, 8],
                        ].map(([cx, cy, r], i) => (
                          <circle
                            key={i}
                            cx={cx}
                            cy={cy}
                            r={r}
                            fill="url(#proteinG)"
                            opacity="0.85"
                          />
                        ))}
                      </svg>
                    </div>
                    <p className="text-[10px] tracking-[0.2em] uppercase text-gray-500 font-sans mb-1">
                      Protein
                    </p>
                    <p className="text-xs text-gray-400 font-sans">50+ units</p>
                  </div>
                </div>
              </div>
            </FadeInOnScroll>
          </div>
        </div>
      </section>

      {/* ───── HOW THEY SIGNAL — receptor docking animation ─── */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <FadeInOnScroll>
            <div className="text-center mb-16 max-w-2xl mx-auto">
              <p className="text-[10px] tracking-[0.3em] uppercase text-terracotta font-sans mb-5">
                How They Work
              </p>
              <h2 className="font-serif text-4xl md:text-5xl text-gray-900 leading-[1.1] mb-5">
                A key that fits
                <br />
                only one lock.
              </h2>
              <p className="text-base text-gray-600 font-sans leading-relaxed">
                Each peptide is shaped to dock with a specific receptor on the
                cell surface. When it binds, a signal cascade fires inside —
                changing gene expression, enzyme activity, or hormone release.
              </p>
            </div>
          </FadeInOnScroll>

          <FadeInOnScroll>
            <div className="relative max-w-3xl mx-auto aspect-[16/9] rounded-3xl bg-gradient-to-br from-[#1a0f0c] to-[#2a1612] overflow-hidden">
              <svg viewBox="0 0 800 450" className="w-full h-full">
                <defs>
                  <linearGradient id="membrane" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#B5736A" stopOpacity="0.3" />
                    <stop offset="50%" stopColor="#B5736A" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#B5736A" stopOpacity="0.3" />
                  </linearGradient>
                  <radialGradient id="pepG">
                    <stop offset="0%" stopColor="#E8C4A0" />
                    <stop offset="100%" stopColor="#B5736A" />
                  </radialGradient>
                  <filter id="glowB">
                    <feGaussianBlur stdDeviation="4" result="b" />
                    <feMerge>
                      <feMergeNode in="b" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* Cell membrane */}
                <rect x="0" y="240" width="800" height="40" fill="url(#membrane)" />
                <line x1="0" y1="240" x2="800" y2="240" stroke="#B5736A" strokeWidth="1" opacity="0.4" />
                <line x1="0" y1="280" x2="800" y2="280" stroke="#B5736A" strokeWidth="1" opacity="0.4" />

                {/* Phospholipid bilayer dots */}
                {Array.from({ length: 20 }).map((_, i) => (
                  <g key={i}>
                    <circle cx={20 + i * 40} cy={248} r="4" fill="#B5736A" opacity="0.5" />
                    <circle cx={20 + i * 40} cy={272} r="4" fill="#B5736A" opacity="0.5" />
                  </g>
                ))}

                {/* Receptor */}
                <g>
                  <path
                    d="M 380 220 L 380 250 Q 380 260, 395 260 L 405 260 Q 420 260, 420 250 L 420 220 Q 420 210, 410 210 L 390 210 Q 380 210, 380 220 Z"
                    fill="#9A5F57"
                    stroke="#E8C4A0"
                    strokeWidth="1"
                  />
                  <path
                    d="M 380 280 L 380 310 Q 380 320, 395 320 L 405 320 Q 420 320, 420 310 L 420 280"
                    fill="#9A5F57"
                    stroke="#E8C4A0"
                    strokeWidth="1"
                  />
                  <circle cx="400" cy="235" r="6" fill="#1a0f0c" />
                </g>

                {/* Floating peptide (animated) */}
                <g style={{ animation: "dock 4s ease-in-out infinite" }}>
                  <circle cx="400" cy="120" r="14" fill="url(#pepG)" filter="url(#glowB)" />
                  <circle cx="400" cy="120" r="5" fill="#fff" opacity="0.9" />
                </g>

                {/* Signal waves (below membrane, animated pulses) */}
                {[0, 1, 2].map((i) => (
                  <circle
                    key={i}
                    cx="400"
                    cy="310"
                    r="20"
                    fill="none"
                    stroke="#E8C4A0"
                    strokeWidth="1.5"
                    opacity="0"
                    style={{
                      animation: `pulse 4s ease-out infinite`,
                      animationDelay: `${2 + i * 0.3}s`,
                    }}
                  />
                ))}

                {/* Downstream signal particles */}
                {[
                  [350, 360],
                  [400, 380],
                  [450, 360],
                  [320, 400],
                  [480, 400],
                  [400, 410],
                ].map(([cx, cy], i) => (
                  <circle
                    key={i}
                    cx={cx}
                    cy={cy}
                    r="3"
                    fill="#E8C4A0"
                    opacity="0"
                    style={{
                      animation: `fadeInOut 4s ease-in-out infinite`,
                      animationDelay: `${2.5 + i * 0.1}s`,
                    }}
                  />
                ))}

                {/* Labels */}
                <text x="40" y="140" fill="#ffffff60" fontSize="11" fontFamily="sans-serif" letterSpacing="2">
                  OUTSIDE CELL
                </text>
                <text x="40" y="400" fill="#ffffff60" fontSize="11" fontFamily="sans-serif" letterSpacing="2">
                  INSIDE CELL
                </text>
                <text x="440" y="235" fill="#ffffff80" fontSize="10" fontFamily="sans-serif" letterSpacing="1">
                  RECEPTOR
                </text>
              </svg>
            </div>
          </FadeInOnScroll>

          <FadeInOnScroll>
            <p className="text-center text-xs text-gray-400 font-sans italic mt-6">
              Simplified illustration of GPCR-style peptide signaling.
            </p>
          </FadeInOnScroll>
        </div>
      </section>

      {/* ───── THE FOUR JOBS ───────────────────────────────── */}
      <section className="py-24 md:py-32 bg-[#EDE7DB]">
        <div className="max-w-6xl mx-auto px-6">
          <FadeInOnScroll>
            <div className="max-w-2xl mb-16">
              <p className="text-[10px] tracking-[0.3em] uppercase text-terracotta font-sans mb-5">
                Four Jobs
              </p>
              <h2 className="font-serif text-4xl md:text-5xl text-gray-900 leading-[1.1] mb-5">
                What peptides do
                <br />
                inside you.
              </h2>
              <p className="text-base text-gray-600 font-sans leading-relaxed">
                Every therapeutic peptide falls into one of four biological
                missions. Understand these, and the whole category makes sense.
              </p>
            </div>
          </FadeInOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {JOBS.map((job, i) => (
              <FadeInOnScroll key={job.title} delay={i * 100}>
                <div className="bg-white rounded-3xl p-8 md:p-10 h-full border border-gray-200/60 hover:border-terracotta/30 hover:shadow-lg transition-all group">
                  <div className="flex items-start justify-between mb-6">
                    <span className="text-[11px] tracking-[0.2em] text-gray-400 font-sans">
                      {job.number}
                    </span>
                    <svg
                      width="40"
                      height="40"
                      viewBox="0 0 40 40"
                      className="opacity-40 group-hover:opacity-70 transition-opacity"
                    >
                      <circle cx="20" cy="20" r="18" fill="none" stroke="#B5736A" strokeWidth="1" />
                      <circle cx="20" cy="20" r="12" fill="none" stroke="#B5736A" strokeWidth="1" />
                      <circle cx="20" cy="20" r="4" fill="#B5736A" />
                    </svg>
                  </div>
                  <h3 className="font-serif text-4xl md:text-5xl tracking-tight text-gray-900 mb-2">
                    {job.title}
                  </h3>
                  <p className="text-[11px] tracking-[0.15em] uppercase text-terracotta font-sans mb-5">
                    {job.subtitle}
                  </p>
                  <p className="text-sm text-gray-600 font-sans leading-relaxed">
                    {job.body}
                  </p>
                </div>
              </FadeInOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ───── DECISION TREE ───────────────────────────────── */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <FadeInOnScroll>
            <div className="text-center mb-14 max-w-2xl mx-auto">
              <p className="text-[10px] tracking-[0.3em] uppercase text-terracotta font-sans mb-5">
                Choose Your Path
              </p>
              <h2 className="font-serif text-4xl md:text-5xl text-gray-900 leading-[1.1] mb-5">
                Which peptide fits?
              </h2>
              <p className="text-base text-gray-600 font-sans leading-relaxed">
                Every therapeutic peptide maps to a specific goal. Follow the
                tree to the right entry point — then dig into the evidence on
                each treatment page.
              </p>
            </div>
          </FadeInOnScroll>
          <FadeInOnScroll>
            <DecisionTree root={PEPTIDE_DECISION} />
          </FadeInOnScroll>
        </div>
      </section>

      {/* ───── NATURAL vs SYNTHETIC ────────────────────────── */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <FadeInOnScroll>
            <div className="text-center mb-14">
              <p className="text-[10px] tracking-[0.3em] uppercase text-terracotta font-sans mb-5">
                Natural vs Therapeutic
              </p>
              <h2 className="font-serif text-4xl md:text-5xl text-gray-900 leading-[1.1]">
                Same molecule. Different origin.
              </h2>
            </div>
          </FadeInOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FadeInOnScroll>
              <div className="p-8 rounded-3xl bg-[#EDE7DB] border border-gray-200/60">
                <p className="text-[10px] tracking-[0.2em] uppercase text-gray-500 font-sans mb-3">
                  Naturally Made
                </p>
                <h3 className="font-serif text-2xl text-gray-900 mb-4">
                  Your body&apos;s own library.
                </h3>
                <p className="text-sm text-gray-600 font-sans leading-relaxed">
                  Insulin, oxytocin, glucagon, growth hormone-releasing hormone,
                  endorphins. Your body produces thousands of peptides every
                  second, each one a precise instruction for a specific cellular
                  behaviour.
                </p>
              </div>
            </FadeInOnScroll>

            <FadeInOnScroll delay={100}>
              <div className="p-8 rounded-3xl bg-[#1a0f0c] text-white">
                <p className="text-[10px] tracking-[0.2em] uppercase text-terracotta font-sans mb-3">
                  Compounded
                </p>
                <h3 className="font-serif text-2xl mb-4">
                  Pharmaceutical-grade copies.
                </h3>
                <p className="text-sm text-white/70 font-sans leading-relaxed">
                  Therapeutic peptides are synthesized in licensed compounding
                  pharmacies under strict sterile conditions. Same amino acid
                  sequence. Same receptor affinity. Delivered cold-chain so the
                  structure stays intact.
                </p>
              </div>
            </FadeInOnScroll>
          </div>
        </div>
      </section>

      {/* ───── HOW KAMURA SCORES ───────────────────────────── */}
      <section className="py-24 md:py-32 bg-[#EDE7DB]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-16 items-center">
            <FadeInOnScroll>
              <div>
                <p className="text-[10px] tracking-[0.3em] uppercase text-terracotta font-sans mb-5">
                  The Kamura Score
                </p>
                <h2 className="font-serif text-4xl md:text-5xl text-gray-900 leading-[1.1] mb-6">
                  Not every peptide
                  <br />
                  is worth using.
                </h2>
                <p className="text-base text-gray-600 font-sans leading-relaxed mb-8">
                  The peptide category is flooded with marketing claims,
                  grey-market sourcing, and under-powered studies. Kamura rates
                  every peptide on a transparent 0–100 composite — so you can
                  tell the breakthroughs from the hype.
                </p>
                <Link
                  href="/treatments/methodology"
                  className="inline-flex items-center gap-2 text-xs tracking-[0.15em] uppercase text-terracotta font-sans font-semibold hover:gap-3 transition-all"
                >
                  Read the Methodology
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </Link>
              </div>
            </FadeInOnScroll>

            <FadeInOnScroll delay={150}>
              <div className="space-y-5">
                {[
                  { label: "Clinical Evidence", value: 88 },
                  { label: "Safety Profile", value: 92 },
                  { label: "Accessibility", value: 74 },
                  { label: "Value", value: 81 },
                ].map((pillar, i) => (
                  <div key={pillar.label}>
                    <div className="flex justify-between items-baseline mb-2">
                      <p className="font-serif text-lg text-gray-900">
                        {pillar.label}
                      </p>
                      <p className="text-[11px] tracking-[0.15em] text-gray-400 font-sans">
                        {pillar.value}
                      </p>
                    </div>
                    <div className="h-1 bg-gray-300/40 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-terracotta rounded-full"
                        style={{
                          width: `${pillar.value}%`,
                          animation: `fillBar 1.2s ease-out forwards`,
                          animationDelay: `${i * 0.15}s`,
                          transformOrigin: "left",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </FadeInOnScroll>
          </div>
        </div>
      </section>

      {/* ───── CTA ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#1a0f0c]">
        <div
          className="absolute inset-0 opacity-20 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=1920&q=85')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a0f0c] via-[#2a1612]/90 to-[#1a0f0c]" />
        <div className="relative max-w-3xl mx-auto px-6 py-24 md:py-32 text-center">
          <p className="text-[10px] tracking-[0.3em] uppercase text-white/50 font-sans mb-6">
            Ready to Explore
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-white leading-[1.1] mb-6">
            See every peptide,
            <br />
            scored and ranked.
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-3 mt-10">
            <Link
              href="/peptides/directory"
              className="px-7 py-3.5 bg-white text-[#2a1612] text-xs tracking-[0.15em] uppercase font-semibold rounded-full hover:bg-white/90 transition-colors font-sans"
            >
              Browse Directory
            </Link>
            <Link
              href="/peptides/tracker"
              className="px-7 py-3.5 border border-white/30 text-white text-xs tracking-[0.15em] uppercase font-semibold rounded-full hover:bg-white/10 transition-colors font-sans"
            >
              Open Dashboard
            </Link>
          </div>
        </div>
      </section>

      {/* Keyframes */}
      <style>{`
        @keyframes drawBond {
          to { stroke-dashoffset: 0; }
        }
        @keyframes beadPop {
          0% { opacity: 0; transform: scale(0.3); transform-origin: center; }
          70% { opacity: 1; transform: scale(1.2); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes dock {
          0%, 100% { transform: translateY(0); }
          40% { transform: translateY(95px); }
          60% { transform: translateY(95px); }
        }
        @keyframes pulse {
          0% { opacity: 0; r: 20; }
          50% { opacity: 0.6; }
          100% { opacity: 0; r: 140; }
        }
        @keyframes fadeInOut {
          0%, 100% { opacity: 0; }
          50% { opacity: 1; }
        }
        @keyframes fillBar {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
        @keyframes particleFloat {
          0%, 100% { transform: translate(0, 0); opacity: 0.2; }
          50% { transform: translate(10px, -20px); opacity: 0.6; }
        }
        .particle {
          animation: particleFloat linear infinite;
        }
      `}</style>
    </>
  );
}
