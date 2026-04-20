"use client";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

type Props = {
  href: string;
  label: string;
  title: string;
  subtitle: string;
  image: string;
  imageAlt: string;
  gradient: string;
  accent: string;
  index: number;
  floatDelay?: number;
};

const SPRING = { stiffness: 220, damping: 22, mass: 0.6 };

export default function HeroCard({
  href,
  label,
  title,
  subtitle,
  image,
  imageAlt,
  gradient,
  accent,
  index,
  floatDelay = 0,
}: Props) {
  const ref = useRef<HTMLAnchorElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), SPRING);
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), SPRING);
  const glareX = useTransform(mx, [-0.5, 0.5], ["0%", "100%"]);
  const glareY = useTransform(my, [-0.5, 0.5], ["0%", "100%"]);

  const handleMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  const handleLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay: index * 0.12, ease: [0.22, 0.65, 0.2, 1] as const }}
      style={{ perspective: 1200 }}
    >
      <Link
        ref={ref}
        href={href}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        className="group relative block rounded-[28px] overflow-hidden shadow-xl aspect-[4/5] will-change-transform"
      >
        <motion.div
          style={{
            rotateX: rx,
            rotateY: ry,
            transformStyle: "preserve-3d",
            background: gradient,
          }}
          className="absolute inset-0 rounded-[28px]"
        >
          {/* Glare layer */}
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{
              background: `radial-gradient(circle at ${glareX.get()} ${glareY.get()}, rgba(255,255,255,0.25), transparent 50%)`,
            }}
          />

          {/* Image — floats and scales with 3D lift */}
          <div className="absolute inset-0 flex items-center justify-center p-8">
            <motion.div
              className="relative w-full max-h-[62%] aspect-square"
              style={{ transformStyle: "preserve-3d", transform: "translateZ(60px)" }}
              animate={{ y: [0, -8, 0] }}
              transition={{
                duration: 5.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: floatDelay,
              }}
            >
              <Image
                src={image}
                alt={imageAlt}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover rounded-2xl shadow-2xl transition-transform duration-700 group-hover:scale-[1.04]"
              />
            </motion.div>
          </div>

          {/* Copy block */}
          <div className="absolute inset-x-0 bottom-0 p-7 flex items-end justify-between">
            <div>
              <div
                className="text-[10px] tracking-[0.25em] uppercase font-semibold mb-1.5"
                style={{ color: accent }}
              >
                {label}
              </div>
              <div className="font-serif text-2xl md:text-3xl text-[#2A2520] leading-tight">
                {title}
              </div>
              <p className="text-xs text-[#2A2520]/60 mt-1">{subtitle}</p>
            </div>
            <motion.span
              className="text-2xl"
              style={{ color: accent }}
              animate={{ x: [0, 3, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            >
              →
            </motion.span>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}
