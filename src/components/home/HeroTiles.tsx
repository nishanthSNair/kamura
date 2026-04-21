"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function HeroTiles() {
  return (
    <section className="px-4 md:px-6 pt-24 md:pt-28">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 0.65, 0.2, 1] as const }}
        className="relative mx-auto max-w-[1280px] min-h-[72vh] md:min-h-[78vh] rounded-[40px] overflow-hidden bg-[#3F5A3C] shadow-[0_24px_60px_-24px_rgba(42,37,32,0.3)]"
      >
        <Image
          src="/images/hero-home.png"
          alt=""
          fill
          priority
          className="object-cover opacity-65"
          sizes="(max-width: 1280px) 100vw, 1280px"
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-[#2F4930]/70 via-[#2F4930]/30 to-[#2F4930]/75"
          aria-hidden
        />

        <div className="relative h-full min-h-[72vh] md:min-h-[78vh] flex flex-col justify-end px-8 md:px-16 py-12 md:py-16 text-white">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="text-[10px] md:text-[11px] font-semibold tracking-[0.32em] uppercase text-white/85 mb-6"
          >
            Kamura · Rooted in wellness
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.95, delay: 0.35, ease: [0.22, 0.65, 0.2, 1] as const }}
            className="font-serif font-medium leading-[1] tracking-[-0.02em] m-0 mb-5 max-w-[18ch]"
            style={{ fontSize: "clamp(44px, 6.2vw, 88px)" }}
          >
            A <span className="italic">longevity</span> platform.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55 }}
            className="text-[16px] md:text-[18px] leading-[1.55] text-white/85 max-w-[560px]"
          >
            Discover wellness services <em>and</em> preventive healthcare — peptides,
            practitioner bookings, and protocol tracking, together in one place.
            Evidence-scored, science-led, built for the GCC.
          </motion.p>
        </div>
      </motion.div>
    </section>
  );
}
