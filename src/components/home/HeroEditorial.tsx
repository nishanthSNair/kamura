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
import { ArrowDown, Rocket } from "lucide-react";

/**
 * Hero — editorial liquid-glass over a single rounded card.
 *
 * Stripped down to the essentials: photo backdrop, headline, subhead,
 * one primary CTA, and a soft scroll cue. The five "doors" (action
 * cards) used to live inside a cramped bottom info card here — they
 * now have their own prominent section directly below the hero.
 *
 * The backdrop is a single `HeroBackdrop` slot marked
 * data-image-slot="hero-backdrop" so the future 8-layer parallax scene
 * can drop in without touching headline/CTAs.
 *
 * Light-touch parallax (framer-motion useScroll):
 * - Backdrop drifts down + scales 6% as you scroll
 * - Headline drifts up faster than backdrop (depth)
 * - Hero fades softly from 60–85% scroll-through
 */
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
      <div className="relative h-[calc(100vh-1rem)] sm:h-[calc(100vh-1.5rem)] min-h-[680px] rounded-3xl overflow-hidden">
        {/* HERO BACKDROP — single image today, 8-layer parallax later */}
        <HeroBackdrop y={backdropY} scale={backdropScale} />

        {/* Content — centered, top-third anchor */}
        <motion.div
          style={{ y: headlineY, opacity: headlineOpacity }}
          className="relative z-20 h-full flex flex-col items-center justify-center px-6 sm:px-8 text-center"
        >
          <p
            className="text-[10px] sm:text-[11px] tracking-[0.34em] uppercase text-white/85 font-semibold mb-7 animate-blur-fade-up"
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
              fontSize: "clamp(40px, 6.4vw, 92px)",
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
            className="mt-6 text-[15px] sm:text-[17px] text-white/85 max-w-[58ch] leading-[1.55] font-sans animate-blur-fade-up"
            style={{
              animationDelay: "480ms",
              textShadow: "0 1px 10px rgba(0,0,0,0.22)",
            }}
          >
            Compounded peptides, vetted UAE practitioners, and your
            longitudinal health record. One trusted home for the long game.
          </p>

          {/* Single primary CTA */}
          <div
            className="mt-9 sm:mt-10 animate-blur-fade-up"
            style={{ animationDelay: "640ms" }}
          >
            <Link
              href="/wellness-checker"
              className="btn-hims inline-flex items-center gap-2 h-[56px] px-8 rounded-full bg-white text-[#2A2520] hover:bg-[#FAF7F2] text-[14.5px] font-sans font-semibold shadow-[0_8px_30px_-8px_rgba(0,0,0,0.4)]"
            >
              <Rocket
                size={15}
                strokeWidth={1.8}
                style={{ transform: "rotate(45deg)" }}
              />
              Take the wellness check
            </Link>
          </div>

          {/* Scroll cue */}
          <div
            className="absolute left-1/2 -translate-x-1/2 bottom-7 sm:bottom-9 flex flex-col items-center gap-2 text-white/65 animate-blur-fade-up"
            style={{ animationDelay: "1100ms" }}
          >
            <span className="text-[10px] tracking-[0.32em] uppercase">
              Scroll
            </span>
            <ArrowDown
              size={14}
              strokeWidth={1.6}
              className="animate-gentle-bounce"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/**
 * HeroBackdrop — single image today, future 8-layer parallax scene drops in
 * here without touching surrounding chrome (headline, CTAs, scroll cue).
 *
 * When the designer ships the layered scene, replace this component's body
 * with multiple <ParallaxLayer> elements at varying speeds. The data-image-
 * slot attribute is the marker the design team will look for.
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
      {/* Soft top + bottom darken so headline + scroll cue stay readable */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.0) 28%, rgba(0,0,0,0.0) 70%, rgba(0,0,0,0.35) 100%)",
        }}
      />
    </motion.div>
  );
}
