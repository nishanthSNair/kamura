"use client";
import { motion } from "framer-motion";

const LINE_1 = ["Wellness,"];
const LINE_2_PRE = [];
const LINE_2_ITALIC = ["redefined"];
const LINE_2_POST = ["for", "real", "life."];

const wordVariants = {
  hidden: { opacity: 0, y: 40, filter: "blur(8px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      delay: 0.08 * i,
      duration: 0.9,
      ease: [0.22, 0.65, 0.2, 1] as const,
    },
  }),
};

export default function HeroHeadline() {
  let idx = 0;
  const renderWord = (word: string, italic = false, accent = false) => {
    const key = idx++;
    return (
      <motion.span
        key={`${word}-${key}`}
        custom={key}
        variants={wordVariants}
        initial="hidden"
        animate="visible"
        className={`inline-block mr-[0.25em] ${italic ? "italic" : ""} ${
          accent ? "text-[#C4A882]" : ""
        }`}
      >
        {word}
      </motion.span>
    );
  };

  return (
    <h1 className="font-serif text-5xl md:text-7xl lg:text-[88px] leading-[0.98] tracking-tight max-w-5xl mx-auto">
      <span className="block">{LINE_1.map((w) => renderWord(w))}</span>
      <span className="block">
        {LINE_2_ITALIC.map((w) => renderWord(w, true, true))}
        {LINE_2_POST.map((w) => renderWord(w))}
      </span>
    </h1>
  );
}
