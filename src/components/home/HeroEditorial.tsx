"use client";

import Image from "next/image";
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
    href: "/peptides/coming-soon",
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

  const backdropY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const backdropScale = useTransform(scrollYProgress, [0, 1], [1, 1.06]);
  const headlineY = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]);
  const headlineOpacity = useTransform(
    scrollYProgress,
    [0, 0.6, 0.9],
    [1, 1, 0.4]
  );

  return (
    <section ref={sectionRef} className="bg-black p-2 sm:p-3">
      <div className="relative h-[calc(100vh-1rem)] sm:h-[calc(100vh-1.5rem)] min-h-[820px] rounded-3xl overflow-hidden">
        {/* HERO BACKDROP — single image today, 8-layer parallax later */}
        <HeroBackdrop y={backdropY} scale={backdropScale} />

        {/* Headline + sub — anchored upper-middle, fades on scroll */}
        <motion.div
          style={{ y: headlineY, opacity: headlineOpacity }}
          className="relative z-20 pt-24 sm:pt-28 md:pt-32 px-6 sm:px-8 text-center"
        >
          <p
            className="text-[10px] sm:text-[11px] tracking-[0.34em] uppercase text-white/85 font-semibold mb-6 animate-blur-fade-up"
            style={{
              textShadow: "0 1px 10px rgba(0,0,0,0.25)",
              animationDelay: "200ms",
            }}
          >
            Be the Tortoise · Kamura
          </p>

          <h1
            className="text-white font-light leading-[1.04] max-w-[16ch] mx-auto animate-blur-fade-up"
            style={{
              fontSize: "clamp(40px, 6.2vw, 88px)",
              letterSpacing: "-0.03em",
              textShadow: "0 2px 20px rgba(0,0,0,0.22)",
              animationDelay: "320ms",
            }}
          >
            Preventive medicine,
            <br />
            redefined for the long game.
          </h1>

          <p
            className="mt-6 text-[15px] sm:text-[17px] text-white/85 max-w-[58ch] mx-auto leading-[1.55] font-sans animate-blur-fade-up"
            style={{
              animationDelay: "480ms",
              textShadow: "0 1px 10px rgba(0,0,0,0.22)",
            }}
          >
            Compounded peptides, vetted UAE practitioners, and your
            longitudinal health record. One trusted home for the long game.
          </p>
        </motion.div>

        {/* FLOATING DOCK — the 5 doors into the platform */}
        <div
          className="absolute bottom-5 left-5 right-5 sm:bottom-7 sm:left-7 sm:right-7 z-20 frosted-card-light rounded-[28px] p-6 sm:p-7 md:p-8 animate-blur-fade-up shadow-[0_24px_60px_-20px_rgba(0,0,0,0.35)]"
          style={{ animationDelay: "920ms" }}
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
        </div>
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
}: {
  y: MotionValue<string>;
  scale: MotionValue<number>;
}) {
  return (
    <motion.div
      className="absolute inset-0 z-0"
      style={{ y, scale }}
      data-image-slot="hero-backdrop"
    >
      <Image
        src="/images/hero-home.png"
        alt="A serene wellness landscape"
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
        quality={90}
      />
      {/* Soft top + bottom darken so headline stays readable + the
          floating dock has a soft anchor behind it. */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.0) 26%, rgba(0,0,0,0.0) 62%, rgba(0,0,0,0.25) 100%)",
        }}
      />
    </motion.div>
  );
}
