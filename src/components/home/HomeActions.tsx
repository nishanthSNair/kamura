"use client";

import Link from "next/link";
import {
  Activity,
  BookOpen,
  FlaskConical,
  Handshake,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { motion } from "framer-motion";

/**
 * Prominent 5-door action grid that lives directly below the hero.
 *
 * Each card is large (aspect ~3:4 on desktop), serif title, sub line,
 * "Soon" tag where applicable, and a Hims-style hover lift.
 *
 * The two coming-soon cards are visually marked with the inline tag —
 * they intentionally do NOT feel disabled (pointer events stay live)
 * because they go to dedicated waitlist landing pages, not error pages.
 *
 * Each card carries data-image-slot="door-{slug}" so the designer can
 * replace the icon-on-color treatment with bespoke imagery later.
 */

type Door = {
  slug: string;
  label: string;
  title: string;
  sub: string;
  href: string;
  Icon: LucideIcon;
  tag?: string;
  /** Tailwind background class for the icon tile + card accent. */
  accent: string;
  iconText: string;
};

const DOORS: Door[] = [
  {
    slug: "learn",
    label: "Learn",
    title: "What is a peptide?",
    sub: "The science visualised, the library, the methodology.",
    href: "/peptides/what-is-a-peptide",
    Icon: BookOpen,
    accent: "bg-[#B5886A]/14",
    iconText: "text-[#B5886A]",
  },
  {
    slug: "explore",
    label: "Discover",
    title: "Wellness services",
    sub: "Sound healing, IV, breathwork, recovery, longevity testing.",
    href: "/explore",
    Icon: Sparkles,
    accent: "bg-[#A8C48A]/22",
    iconText: "text-[#6B8B4E]",
  },
  {
    slug: "track",
    label: "Track",
    title: "Wellness dashboard",
    sub: "Save what matters, set your goals, get a personalised feed.",
    href: "/my",
    Icon: Activity,
    accent: "bg-[#C4A882]/24",
    iconText: "text-[#9A7357]",
  },
  {
    slug: "buy",
    label: "Buy",
    title: "Compounded peptides",
    sub: "Pharmaceutical-grade, prescribed by UAE-licensed physicians.",
    href: "/peptides/coming-soon",
    Icon: FlaskConical,
    tag: "Soon",
    accent: "bg-[#D4B896]/22",
    iconText: "text-[#9A7357]",
  },
  {
    slug: "book",
    label: "Book",
    title: "Wellness booking",
    sub: "Curated practitioners, one place, every modality.",
    href: "/book/coming-soon",
    Icon: Handshake,
    tag: "Soon",
    accent: "bg-[#B0BCA4]/30",
    iconText: "text-[#4A5E3E]",
  },
];

export default function HomeActions() {
  return (
    <section className="relative bg-[#FAF7F2] py-20 md:py-28 border-b border-[#2A2520]/8">
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        {/* Eyebrow + heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 0.65, 0.2, 1] as const }}
          className="text-center mb-12 md:mb-16"
        >
          <p className="text-[10.5px] tracking-[0.32em] uppercase text-terracotta font-semibold font-sans mb-4">
            Where do you want to start?
          </p>
          <h2
            className="font-serif text-[36px] md:text-[56px] leading-[1.04] tracking-[-0.012em] text-[#2A2520] mx-auto max-w-[18ch]"
          >
            Five doors in.
          </h2>
        </motion.div>

        {/* Doors */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-5">
          {DOORS.map((d, i) => (
            <motion.div
              key={d.slug}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.7,
                delay: 0.08 + i * 0.06,
                ease: [0.22, 0.65, 0.2, 1] as const,
              }}
            >
              <Link
                href={d.href}
                data-image-slot={`door-${d.slug}`}
                className="btn-hims-card group relative flex flex-col h-full min-h-[260px] md:min-h-[300px] lg:min-h-[340px] p-7 md:p-8 rounded-3xl bg-white border border-[#2A2520]/8 overflow-hidden"
              >
                {/* Top — icon tile + tag */}
                <div className="flex items-start justify-between mb-auto">
                  <div
                    className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl ${d.accent} ${d.iconText} grid place-items-center`}
                  >
                    <d.Icon size={22} strokeWidth={1.7} />
                  </div>
                  {d.tag && (
                    <span className="inline-flex items-center h-[22px] px-2.5 rounded-full text-[9.5px] font-semibold tracking-[0.1em] uppercase bg-[#C4A882]/15 border border-[#C4A882]/40 text-[#9A7357]">
                      {d.tag}
                    </span>
                  )}
                </div>

                {/* Bottom — label, title, sub, arrow */}
                <div className="mt-10 md:mt-14">
                  <p className="text-[10.5px] tracking-[0.28em] uppercase text-terracotta font-sans font-semibold mb-2.5">
                    {d.label}
                  </p>
                  <h3 className="font-serif text-[22px] md:text-[26px] leading-[1.15] tracking-[-0.005em] text-[#2A2520] m-0 mb-3">
                    {d.title}
                  </h3>
                  <p className="text-[13.5px] leading-[1.55] text-[#2A2520]/65 font-sans mb-6 max-w-[28ch]">
                    {d.sub}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-[11.5px] tracking-[0.18em] uppercase text-[#2A2520] font-sans font-semibold group-hover:gap-2.5 transition-all">
                    Enter
                    <svg
                      width="13"
                      height="13"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      className="btn-hims-arrow"
                    >
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
