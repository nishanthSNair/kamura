"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const container: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
};

const line: Variants = {
  hidden: { y: "115%", opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 1.05, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function HeadlineReveal({
  lines,
  once = true,
}: {
  lines: ReactNode[];
  once?: boolean;
}) {
  return (
    <motion.span
      className="block"
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-12%" }}
      variants={container}
    >
      {lines.map((content, i) => (
        <span
          key={i}
          className="block overflow-hidden"
          style={{ paddingBottom: "0.06em" }}
        >
          <motion.span className="block" variants={line}>
            {content}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
