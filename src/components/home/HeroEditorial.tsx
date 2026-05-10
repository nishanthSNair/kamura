"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import {
  Activity,
  BookOpen,
  Dumbbell,
  FlaskConical,
  Handshake,
  Rocket,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

type HeroAction = {
  label: string;
  href: string;
  Icon: LucideIcon;
  delay: number;
};

const HERO_ACTIONS: HeroAction[] = [
  { label: "Buy Peptides", href: "/peptides", Icon: FlaskConical, delay: 600 },
  { label: "What is a Peptide?", href: "/peptides/what-is-a-peptide", Icon: BookOpen, delay: 680 },
  { label: "Book Wellness Services", href: "/explore", Icon: Sparkles, delay: 760 },
  { label: "Wellness Dashboard", href: "/my", Icon: Activity, delay: 840 },
  { label: "Become an Affiliate", href: "/list-your-business", Icon: Handshake, delay: 920 },
];

/**
 * Hero — editorial liquid-glass.
 *
 * Backdrop is rendered through a single `HeroBackdrop` slot so the future
 * 8-layer parallax scene can replace the photo without touching any of the
 * floating UI chrome (text, action pills, info card).
 *
 * Light-touch parallax (framer-motion `useScroll`):
 * - Backdrop translates `y` slower than the page → drifts behind copy
 * - Headline + sub translate `y` faster than backdrop → modest depth
 * - Bottom info card stays anchored
 */
export default function HeroEditorial() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Backdrop drifts down slower than scroll (parallax behind)
  const backdropY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const backdropScale = useTransform(scrollYProgress, [0, 1], [1, 1.06]);
  // Headline drifts up faster than backdrop (depth)
  const headlineY = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]);
  const headlineOpacity = useTransform(scrollYProgress, [0, 0.6, 0.85], [1, 1, 0.6]);

  return (
    <section ref={sectionRef} className="bg-black p-2 sm:p-3">
      <div className="relative h-[calc(100vh-1rem)] sm:h-[calc(100vh-1.5rem)] min-h-[760px] rounded-3xl overflow-hidden">
        {/* HERO BACKDROP — single image today, 8-layer parallax scene later */}
        <HeroBackdrop y={backdropY} scale={backdropScale} />

        {/* Headline + sub — top center */}
        <motion.div
          style={{ y: headlineY, opacity: headlineOpacity }}
          className="relative z-20 max-w-4xl mx-auto px-6 sm:px-8 pt-16 sm:pt-20 md:pt-24 text-center"
        >
          <h1
            className="text-white font-light leading-[1.05] animate-blur-fade-up"
            style={{
              fontSize: "clamp(40px, 6vw, 84px)",
              letterSpacing: "-0.03em",
              textShadow: "0 2px 20px rgba(0,0,0,0.18)",
              animationDelay: "300ms",
            }}
          >
            Preventive medicine,
            <br />
            redefined for the long game.
          </h1>
          <p
            className="mt-4 text-sm sm:text-base text-white/85 animate-blur-fade-up"
            style={{
              animationDelay: "450ms",
              textShadow: "0 1px 10px rgba(0,0,0,0.18)",
            }}
          >
            Be the tortoise. Compounded peptides, vetted practitioners,
            your longitudinal health record.
          </p>
        </motion.div>

        {/* Bottom info card — primary action surface */}
        <div
          className="absolute bottom-6 left-6 right-6 sm:bottom-8 sm:left-8 sm:right-8 z-20 frosted-card-light rounded-2xl p-6 sm:p-8 animate-blur-fade-up"
          style={{ animationDelay: "1000ms" }}
        >
          <div className="flex flex-col lg:flex-row lg:items-start gap-8 lg:gap-12">
            {/* Left — brand + primary CTA */}
            <div className="lg:w-[260px] xl:w-[280px] shrink-0">
              <div className="w-10 h-10 rounded-lg bg-slate-900 grid place-items-center">
                <Dumbbell size={20} strokeWidth={1.8} className="text-white" />
              </div>
              <h2
                className="mt-4 text-xl sm:text-2xl font-medium text-slate-900"
                style={{ letterSpacing: "-0.02em" }}
              >
                Move, Heal, Bloom
              </h2>
              <p className="mt-2 text-[13px] text-slate-600 leading-snug">
                Three layers, one ecosystem.
              </p>
              <div className="mt-4">
                <Link
                  href="/wellness-checker"
                  className="btn-hims frosted-pill-dark rounded-full inline-flex items-center gap-2 px-4 py-2 text-[13px] font-medium"
                >
                  <Rocket
                    size={13}
                    strokeWidth={1.8}
                    style={{ transform: "rotate(45deg)" }}
                  />
                  Wellness Check
                  <span className="btn-hims-arrow inline-block">→</span>
                </Link>
              </div>
            </div>

            {/* Middle — 5 action buttons (the primary nav surface) */}
            <div className="flex-1 min-w-0">
              <p className="text-[10.5px] font-semibold tracking-[0.22em] text-slate-500 uppercase mb-3.5">
                Where do you want to start?
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-2.5">
                {HERO_ACTIONS.map(({ label, href, Icon, delay }) => (
                  <Link
                    key={label}
                    href={href}
                    className="btn-hims-card group flex items-center gap-3 px-4 py-3 rounded-xl bg-white/70 hover:bg-slate-900 border border-slate-900/10 hover:border-slate-900 text-slate-900 hover:text-white text-[13px] font-medium animate-blur-fade-up"
                    style={{ animationDelay: `${delay}ms` }}
                  >
                    <span className="w-8 h-8 rounded-lg bg-slate-900/8 group-hover:bg-white/15 grid place-items-center shrink-0 transition-colors">
                      <Icon size={15} strokeWidth={1.8} />
                    </span>
                    <span className="flex-1 truncate">{label}</span>
                    <svg
                      width="13"
                      height="13"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      className="btn-hims-arrow opacity-50 group-hover:opacity-100 shrink-0"
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
      </div>
    </section>
  );
}

/**
 * HeroBackdrop — single image today, future 8-layer parallax scene drops in here
 * without touching any of the surrounding chrome (headline, action pills, info card).
 *
 * When the designer delivers layers, replace the contents of this component with:
 *   <ParallaxLayer src="/hero/01-sky.webp"     speed={0.1} />
 *   <ParallaxLayer src="/hero/02-mountains.webp" speed={0.3} />
 *   ... etc.
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
    </motion.div>
  );
}
