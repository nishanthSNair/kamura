"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

export default function VialPenAnimation() {
  const reduce = useReducedMotion();

  const cycle = {
    duration: 8,
    repeat: Infinity,
    ease: "easeInOut" as const,
    times: [0, 0.42, 0.5, 0.92, 1],
  };

  return (
    <div className="relative aspect-square w-full max-w-[520px] mx-auto select-none pointer-events-none">
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 1 }}
        animate={
          reduce
            ? { opacity: 1 }
            : { opacity: [1, 1, 0, 0, 1], scale: [1, 1.025, 1, 1, 1] }
        }
        transition={reduce ? undefined : cycle}
      >
        <Image
          src="/images/peptides/peptide-vial.png"
          alt=""
          fill
          priority
          sizes="(max-width: 768px) 90vw, 520px"
          className="object-contain"
        />
      </motion.div>

      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={
          reduce
            ? { opacity: 0 }
            : { opacity: [0, 0, 1, 1, 0], scale: [1, 1, 1, 1.025, 1] }
        }
        transition={reduce ? undefined : cycle}
      >
        <Image
          src="/images/peptides/peptide-pen.png"
          alt=""
          fill
          sizes="(max-width: 768px) 90vw, 520px"
          className="object-contain"
        />
      </motion.div>
    </div>
  );
}
