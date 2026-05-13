"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import FadeInOnScroll from "@/components/FadeInOnScroll";
import HeadlineReveal from "@/components/home/HeadlineReveal";
import PaperGrain from "@/components/home/PaperGrain";

export default function Manifesto() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const eyebrowY = useTransform(scrollYProgress, [0, 1], ["80px", "-40px"]);
  const bodyY = useTransform(scrollYProgress, [0, 1], ["40px", "-22px"]);
  const closerY = useTransform(scrollYProgress, [0, 1], ["20px", "-14px"]);
  const dotScale = useTransform(
    scrollYProgress,
    [0.15, 0.5, 0.85],
    [0.5, 1.5, 0.5]
  );
  const railWidth = useTransform(scrollYProgress, [0.15, 0.55], ["0%", "100%"]);

  return (
    <section
      ref={sectionRef}
      id="manifesto"
      className="relative bg-[#F5EFE6] py-28 md:py-40 border-y border-[#2A2520]/8 overflow-hidden"
    >
      <PaperGrain opacity={0.06} />

      {/* Decorative left rail — draws in as section enters */}
      <motion.div
        aria-hidden
        className="absolute top-1/2 left-0 h-px bg-terracotta/40 origin-left"
        style={{ width: railWidth, maxWidth: "10vw" }}
      />
      <motion.div
        aria-hidden
        className="absolute top-1/2 right-0 h-px bg-terracotta/40 origin-right"
        style={{ width: railWidth, maxWidth: "10vw" }}
      />

      <div className="relative max-w-[720px] mx-auto px-6 md:px-8 text-center">
        <motion.p
          style={{ y: eyebrowY }}
          className="text-[10.5px] tracking-[0.34em] uppercase text-terracotta font-semibold font-sans mb-10"
        >
          I · The Manifesto
        </motion.p>

        <h2
          className="font-serif text-[#2A2520] leading-[1.04] tracking-[-0.02em] mb-12 md:mb-16"
          style={{ fontSize: "clamp(52px, 7vw, 96px)" }}
        >
          <HeadlineReveal
            lines={[
              <>
                Be the{" "}
                <i className="italic text-terracotta">tortoise.</i>
              </>,
            ]}
          />
        </h2>

        <motion.div style={{ y: bodyY }}>
          <FadeInOnScroll>
            <div className="space-y-7 text-[16.5px] md:text-[18.5px] text-[#2A2520]/78 font-sans leading-[1.8]">
              <p>
                The wellness industry runs on urgency. Kamura runs on its
                opposite.
              </p>
              <p>
                Patience as a strategy. Evidence as a filter. Protocols built
                for the next forty years — not the next forty days. We rank
                only what survives the trend cycle, score what holds up under
                scrutiny, and match it to who you actually are.
              </p>
            </div>
          </FadeInOnScroll>
        </motion.div>

        <motion.div style={{ y: closerY }}>
          <FadeInOnScroll delay={240}>
            <p
              className="font-serif italic text-[#2A2520] mt-12 md:mt-16 leading-[1.4]"
              style={{ fontSize: "clamp(24px, 2.8vw, 34px)" }}
            >
              The most powerful longevity protocol
              <br className="hidden sm:block" />
              is the one you can keep.
            </p>
          </FadeInOnScroll>
        </motion.div>

        <FadeInOnScroll delay={320}>
          <div className="flex items-center justify-center gap-3 mt-16 md:mt-20">
            <span className="w-12 h-px bg-[#2A2520]/18" />
            <motion.span
              style={{ scale: dotScale }}
              className="w-2 h-2 rounded-full bg-terracotta block"
            />
            <span className="w-12 h-px bg-[#2A2520]/18" />
          </div>
        </FadeInOnScroll>
      </div>
    </section>
  );
}
