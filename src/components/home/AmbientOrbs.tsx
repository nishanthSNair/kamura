"use client";
import { motion } from "framer-motion";

export default function AmbientOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      <motion.div
        className="absolute -top-20 -left-20 w-[520px] h-[520px] rounded-full opacity-30 blur-[100px]"
        style={{ background: "radial-gradient(circle, #C4A882 0%, transparent 70%)" }}
        animate={{
          x: [0, 40, -20, 0],
          y: [0, 30, 60, 0],
          scale: [1, 1.15, 0.95, 1],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-40 right-0 w-[460px] h-[460px] rounded-full opacity-25 blur-[110px]"
        style={{ background: "radial-gradient(circle, #B5886A 0%, transparent 70%)" }}
        animate={{
          x: [0, -40, 20, 0],
          y: [0, 50, 20, 0],
          scale: [1, 0.9, 1.1, 1],
        }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut", delay: 4 }}
      />
      <motion.div
        className="absolute bottom-20 left-1/3 w-[380px] h-[380px] rounded-full opacity-20 blur-[90px]"
        style={{ background: "radial-gradient(circle, #7B8D68 0%, transparent 70%)" }}
        animate={{
          x: [0, 60, -30, 0],
          y: [0, -20, 40, 0],
          scale: [1, 1.1, 0.9, 1],
        }}
        transition={{ duration: 28, repeat: Infinity, ease: "easeInOut", delay: 8 }}
      />

      {/* Subtle dot grid */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: "radial-gradient(circle, #C4A882 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
    </div>
  );
}
