"use client";
import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  delay?: number;
  y?: number;
  duration?: number;
  className?: string;
};

const variants: Variants = {
  hidden: { opacity: 0, y: 32, filter: "blur(4px)" },
  visible: (custom: { delay: number; duration: number; y: number }) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      delay: custom.delay,
      duration: custom.duration,
      ease: [0.22, 0.65, 0.2, 1] as const,
    },
  }),
};

export default function Reveal({
  children,
  delay = 0,
  y = 32,
  duration = 0.9,
  className,
}: Props) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={variants}
      custom={{ delay, duration, y }}
    >
      {children}
    </motion.div>
  );
}
