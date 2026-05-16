"use client";

import Link from "next/link";
import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import {
  Activity,
  BookOpen,
  FlaskConical,
  Handshake,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

/**
 * Hero — editorial liquid-glass over a single rounded card, with a
 * prominent floating action dock at the bottom that holds the 5 doors
 * into the platform.
 *
 * Light-touch parallax (framer-motion useScroll):
 * - Backdrop drifts down + scales 6% as you scroll
 * - Headline drifts up faster than backdrop (depth)
 * - Hero fades softly from 60–90% scroll-through
 *
 * The backdrop is rendered through a single HeroBackdrop slot marked
 * data-image-slot="hero-backdrop" so the future 8-layer parallax scene
 * can drop in without touching headline / dock chrome.
 *
 * Each dock door carries data-image-slot="door-{slug}" so the designer
 * can swap the icon-on-color treatment for bespoke imagery later.
 */

type Door = {
  slug: string;
  label: string;
  title: string;
  sub: string;
  href: string;
  Icon: LucideIcon;
  tag?: string;
  /** Icon tile background + foreground colors. */
  bg: string;
  fg: string;
  delay: number;
};

const DOORS: Door[] = [
  {
    slug: "learn",
    label: "Learn",
    title: "What is a peptide?",
    sub: "The science, visualised.",
    href: "/peptides/what-is-a-peptide",
    Icon: BookOpen,
    bg: "bg-[#B5886A]/14",
    fg: "text-[#B5886A]",
    delay: 1100,
  },
  {
    slug: "explore",
    label: "Discover",
    title: "Wellness services",
    sub: "Sound, IV, breath, recovery.",
    href: "/explore",
    Icon: Sparkles,
    bg: "bg-[#A8C48A]/22",
    fg: "text-[#6B8B4E]",
    delay: 1180,
  },
  {
    slug: "track",
    label: "Track",
    title: "Wellness dashboard",
    sub: "Goals, favourites, your feed.",
    href: "/my",
    Icon: Activity,
    bg: "bg-[#C4A882]/24",
    fg: "text-[#9A7357]",
    delay: 1260,
  },
  {
    slug: "buy",
    label: "Buy",
    title: "Compounded peptides",
    sub: "Pharmaceutical-grade, UAE.",
    href: "/peptides#compounded",
    Icon: FlaskConical,
    tag: "Soon",
    bg: "bg-[#D4B896]/24",
    fg: "text-[#9A7357]",
    delay: 1340,
  },
  {
    slug: "book",
    label: "Book",
    title: "Wellness booking",
    sub: "Curated UAE practitioners.",
    href: "/book/coming-soon",
    Icon: Handshake,
    tag: "Soon",
    bg: "bg-[#B0BCA4]/32",
    fg: "text-[#4A5E3E]",
    delay: 1420,
  },
];

export default function HeroEditorial() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const backdropY = useTransform(scrollYProgress, [0, 1], ["0%", "32%"]);
  const backdropScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const backdropBlur = useTransform(
    scrollYProgress,
    [0, 0.6, 1],
    ["0px", "0px", "6px"]
  );
  const cardY = useTransform(scrollYProgress, [0, 1], ["0%", "-22%"]);
  const cardOpacity = useTransform(
    scrollYProgress,
    [0, 0.55, 0.92],
    [1, 1, 0.15]
  );
  const dockY = useTransform(scrollYProgress, [0, 1], ["0%", "-6%"]);

  return (
    <section ref={sectionRef} className="bg-black p-2 sm:p-3">
      <div className="relative h-[calc(100vh-1rem)] sm:h-[calc(100vh-1.5rem)] min-h-[820px] rounded-3xl overflow-hidden">
        {/* HERO BACKDROP — single image today, 8-layer parallax later */}
        <HeroBackdrop y={backdropY} scale={backdropScale} blur={backdropBlur} />

        {/* Premium headline card — pinned left on desktop, centered on mobile.
            Frosted glass + hairline gold border. Lets the oasis video breathe
            on the right side while the type sits on a clear, premium surface. */}
        <motion.div
          style={{ y: cardY, opacity: cardOpacity }}
          className="absolute z-20 left-1/2 -translate-x-1/2 top-[18%] sm:top-[16%] md:top-1/2 md:-translate-y-1/2 md:translate-x-0 md:left-10 lg:left-16 xl:left-24 w-[calc(100%-48px)] sm:w-[calc(100%-64px)] md:w-auto md:max-w-[520px]"
        >
          <div className="relative rounded-[22px] overflow-hidden border border-white/15 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.65)] animate-blur-fade-up">
            {/* glass fill */}
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(140deg, rgba(20,14,10,0.62) 0%, rgba(20,14,10,0.48) 55%, rgba(20,14,10,0.42) 100%)",
                backdropFilter: "blur(14px) saturate(115%)",
                WebkitBackdropFilter: "blur(14px) saturate(115%)",
              }}
            />
            {/* inner hairline highlight */}
            <div
              aria-hidden
              className="absolute inset-px rounded-[21px] pointer-events-none"
              style={{
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0) 35%)",
              }}
            />

            <div className="relative p-7 sm:p-9 md:p-10 lg:p-12">
              {/* eyebrow with gold rule */}
              <div className="flex items-center gap-3 mb-6 md:mb-7">
                <span className="block w-7 h-px bg-[#C4A882]" />
                <p
                  className="text-[10px] tracking-[0.34em] uppercase text-[#C4A882] font-semibold font-sans"
                  style={{ animationDelay: "200ms" }}
                >
                  Kamura · Heart of the Tortoise
                </p>
              </div>

              <h1
                className="font-serif text-white font-light leading-[1.02] tracking-[-0.025em]"
                style={{
                  fontSize: "clamp(38px, 4.8vw, 64px)",
                  animationDelay: "320ms",
                }}
              >
                Only the best.
                <br />
                <span className="italic text-[#E8D5BF]">Made personal.</span>
              </h1>

              <p
                className="mt-6 md:mt-7 text-[14.5px] md:text-[15.5px] text-white/78 leading-[1.6] font-sans max-w-[42ch]"
                style={{ animationDelay: "480ms" }}
              >
                Compounded peptides. Vetted practitioners. Your health record.
                One home for the long game.
              </p>

              <div className="mt-7 md:mt-8 pt-5 md:pt-6 border-t border-white/12">
                <p className="text-[10px] tracking-[0.28em] uppercase text-white/55 font-sans">
                  Longevity, by design.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* FLOATING DOCK — drifts up slightly slower than the headline for depth */}
        <motion.div
          style={{ y: dockY }}
          className="absolute bottom-5 left-5 right-5 sm:bottom-7 sm:left-7 sm:right-7 z-20 frosted-card-light rounded-[28px] p-6 sm:p-7 md:p-8 animate-blur-fade-up shadow-[0_24px_60px_-20px_rgba(0,0,0,0.35)]"
        >
          <div className="mx-auto max-w-[1280px]">
            <div className="flex items-baseline justify-between mb-5 md:mb-6">
              <p className="text-[10.5px] tracking-[0.3em] uppercase text-terracotta font-semibold font-sans">
                Where do you want to start?
              </p>
              <Link
                href="/wellness-checker"
                className="hidden sm:inline-flex items-center gap-1.5 text-[11px] tracking-[0.2em] uppercase text-slate-700 hover:text-slate-900 font-semibold font-sans border-b border-slate-400/40 hover:border-slate-900 pb-0.5 transition-colors"
              >
                Take the wellness check
                <span className="btn-hims-arrow">→</span>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 md:gap-3.5">
              {DOORS.map(({ slug, label, title, sub, href, Icon, tag, bg, fg, delay }) => (
                <Link
                  key={slug}
                  href={href}
                  data-image-slot={`door-${slug}`}
                  className="btn-hims-card group relative flex items-start gap-3.5 p-4 md:p-[18px] rounded-2xl bg-white border border-[#2A2520]/8 animate-blur-fade-up overflow-hidden"
                  style={{ animationDelay: `${delay}ms` }}
                >
                  <div
                    className={`w-11 h-11 md:w-12 md:h-12 rounded-xl ${bg} ${fg} grid place-items-center shrink-0`}
                  >
                    <Icon size={18} strokeWidth={1.8} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <p className="text-[9.5px] tracking-[0.24em] uppercase text-terracotta font-semibold font-sans">
                        {label}
                      </p>
                      {tag && (
                        <span className="inline-flex items-center h-[16px] px-1.5 rounded-full text-[8.5px] font-semibold tracking-[0.1em] uppercase bg-[#C4A882]/18 border border-[#C4A882]/45 text-[#9A7357]">
                          {tag}
                        </span>
                      )}
                    </div>
                    <h3 className="font-serif text-[15px] md:text-[16px] leading-[1.2] text-[#2A2520] m-0 truncate">
                      {title}
                    </h3>
                    <p className="text-[11.5px] text-[#2A2520]/55 font-sans truncate">
                      {sub}
                    </p>
                  </div>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    className="btn-hims-arrow absolute top-3.5 right-3.5 text-[#2A2520]/35 group-hover:text-[#2A2520]"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/**
 * HeroBackdrop — single image today, future 8-layer parallax scene drops
 * in here without touching surrounding chrome (headline, dock, etc.).
 *
 * The data-image-slot attribute is the marker the designer will look for.
 */
function HeroBackdrop({
  y,
  scale,
  blur,
}: {
  y: MotionValue<string>;
  scale: MotionValue<number>;
  blur: MotionValue<string>;
}) {
  const filter = useTransform(blur, (b) => `blur(${b})`);
  return (
    <motion.div
      className="absolute inset-0 z-0"
      style={{ y, scale, filter }}
      data-image-slot="hero-backdrop"
    >
      <video
        className="absolute inset-0 w-full h-full object-cover object-center"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        poster="/images/hero-home.png"
        aria-label="An oasis at golden hour"
      >
        <source src="/Video/Oasis.mp4" type="video/mp4" />
      </video>

      {/* Left-loaded darken — supports the headline card sitting on the left
          while keeping the right side of the oasis cinematic and visible. */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, rgba(10,7,5,0.55) 0%, rgba(10,7,5,0.32) 38%, rgba(10,7,5,0.08) 62%, rgba(10,7,5,0.0) 88%)",
        }}
      />
      {/* Top + bottom anchors — top for the brand mark, bottom for the dock */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.32) 0%, rgba(0,0,0,0.0) 22%, rgba(0,0,0,0.0) 62%, rgba(0,0,0,0.38) 100%)",
        }}
      />
      {/* Subtle warm vignette to push the centre into the gold/terracotta family */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none mix-blend-soft-light"
        style={{
          background:
            "radial-gradient(ellipse at 70% 50%, rgba(196,168,130,0.18) 0%, transparent 55%)",
        }}
      />
    </motion.div>
  );
}
