"use client";

import { motion } from "framer-motion";
import Link from "next/link";

function FloatingPaths({
  position,
  strokeColor,
}: {
  position: number;
  strokeColor: string;
}) {
  const paths = Array.from({ length: 36 }, (_, i) => ({
    id: i,
    d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${
      380 - i * 5 * position
    } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
      152 - i * 5 * position
    } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
      684 - i * 5 * position
    } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
    width: 0.5 + i * 0.03,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none">
      <svg className="w-full h-full" viewBox="0 0 696 316" fill="none">
        <title>Flowing paths</title>
        {paths.map((path) => (
          <motion.path
            key={path.id}
            d={path.d}
            stroke={strokeColor}
            strokeWidth={path.width}
            strokeOpacity={0.08 + path.id * 0.022}
            initial={{ pathLength: 0.3, opacity: 0.6 }}
            animate={{
              pathLength: 1,
              opacity: [0.3, 0.7, 0.3],
              pathOffset: [0, 1, 0],
            }}
            transition={{
              duration: 20 + Math.random() * 10,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </svg>
    </div>
  );
}

type Props = {
  eyebrow?: string;
  title: string;
  subhead: string;
  primaryCta: { href: string; label: string };
  secondaryCta?: { href: string; label: string };
};

export default function BackgroundPathsHero({
  eyebrow = "Built for the GCC",
  title,
  subhead,
  primaryCta,
  secondaryCta,
}: Props) {
  const words = title.split(" ");

  return (
    <section className="relative overflow-hidden bg-[#2D3E2D] text-white pt-28 md:pt-36 pb-16 md:pb-24">
      {/* Watermark wordmark */}
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.04] select-none"
        aria-hidden
      >
        <span
          className="font-serif tracking-[0.2em] text-white whitespace-nowrap"
          style={{ fontSize: "min(24vw, 340px)" }}
        >
          KAMURA
        </span>
      </div>

      {/* Flowing gold/terracotta paths */}
      <div className="absolute inset-0">
        <FloatingPaths position={1} strokeColor="#C4A882" />
        <FloatingPaths position={-1} strokeColor="#B5886A" />
      </div>

      {/* Soft vignette for readability */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(26,36,26,0.55) 100%)",
        }}
        aria-hidden
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        {/* Eyebrow pill */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 rounded-full border border-[#C4A882]/30 bg-white/5 backdrop-blur px-4 py-1.5 text-[11px] tracking-[0.2em] uppercase text-[#E5D3B0] font-semibold mb-10"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-[#C4A882] opacity-75 animate-ping" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#C4A882]" />
          </span>
          {eyebrow}
        </motion.div>

        {/* Letter-by-letter reveal headline */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4 }}
          className="max-w-5xl mx-auto"
        >
          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-[92px] leading-[0.98] tracking-tight mb-8">
            {words.map((word, wordIndex) => (
              <span key={wordIndex} className="inline-block mr-[0.25em] last:mr-0">
                {word.split("").map((letter, letterIndex) => (
                  <motion.span
                    key={`${wordIndex}-${letterIndex}`}
                    initial={{ y: 80, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      delay: wordIndex * 0.1 + letterIndex * 0.035,
                      type: "spring",
                      stiffness: 140,
                      damping: 22,
                    }}
                    className="inline-block text-transparent bg-clip-text bg-gradient-to-b from-white via-[#F0E9DA] to-[#C4A882]"
                  >
                    {letter}
                  </motion.span>
                ))}
              </span>
            ))}
          </h1>

          {/* Subhead */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.2 }}
            className="text-base md:text-lg lg:text-xl text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            {subhead}
          </motion.p>

          {/* CTAs — glass-morphic primary + outlined secondary */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.5 }}
            className="inline-flex flex-wrap items-center justify-center gap-3"
          >
            <div
              className="inline-block group relative bg-gradient-to-b from-[#C4A882]/40 to-[#C4A882]/10 p-px rounded-2xl backdrop-blur-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
            >
              <Link
                href={primaryCta.href}
                className="inline-flex items-center rounded-[1.1rem] px-7 py-4 text-base font-semibold backdrop-blur-md bg-[#2A2520]/90 hover:bg-[#2A2520] text-white transition-all duration-300 group-hover:-translate-y-0.5 border border-[#C4A882]/20"
              >
                <span className="opacity-95 group-hover:opacity-100 transition-opacity">
                  {primaryCta.label}
                </span>
                <span className="ml-3 opacity-75 group-hover:opacity-100 group-hover:translate-x-1.5 transition-all duration-300 text-[#C4A882]">
                  →
                </span>
              </Link>
            </div>

            {secondaryCta && (
              <Link
                href={secondaryCta.href}
                className="inline-flex items-center rounded-2xl px-6 py-4 text-base font-medium text-white/85 hover:text-white border border-white/15 hover:border-[#C4A882]/60 hover:bg-white/5 transition-all duration-300"
              >
                {secondaryCta.label}
              </Link>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
