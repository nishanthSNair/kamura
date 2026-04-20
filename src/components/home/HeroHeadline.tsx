"use client";
import { motion } from "framer-motion";

const LINES: { text: string; accent?: boolean }[][] = [
  [
    { text: "Discover," },
    { text: "book," },
    { text: "source,", accent: true },
  ],
  [{ text: "and" }, { text: "track" }, { text: "your" }, { text: "wellness" }],
  [{ text: "journey" }, { text: "in" }, { text: "one" }, { text: "place." }],
];

const wordVariants = {
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      delay: 0.06 * i,
      duration: 0.8,
      ease: [0.22, 0.65, 0.2, 1] as const,
    },
  }),
};

export default function HeroHeadline() {
  let idx = 0;
  return (
    <>
      {LINES.map((line, li) => (
        <span key={li} className="block">
          {line.map((w) => {
            const key = idx++;
            return (
              <motion.span
                key={`${w.text}-${key}`}
                custom={key}
                variants={wordVariants}
                initial="hidden"
                animate="visible"
                className={`inline-block mr-[0.25em] ${
                  w.accent ? "italic text-[#B5886A]" : ""
                }`}
              >
                {w.text}
              </motion.span>
            );
          })}
        </span>
      ))}
    </>
  );
}
