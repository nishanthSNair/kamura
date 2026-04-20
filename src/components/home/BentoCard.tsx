"use client";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef, type ReactNode } from "react";

type Props = {
  href: string;
  label: string;
  title: string;
  subtitle: string;
  icon: "lotus" | "heart" | "molecule" | "leaf" | "clinic";
  accent: string;
  tint: string;
  badge?: string;
  index?: number;
  className?: string;
  children?: ReactNode;
};

const ICON_BG = (icon: Props["icon"]) => {
  switch (icon) {
    case "lotus":
      return (
        <svg viewBox="0 0 60 60" className="w-9 h-9">
          <path
            d="M30 12 C 24 22 24 30 30 38 C 36 30 36 22 30 12 Z"
            fill="currentColor"
            opacity="0.9"
          />
          <path
            d="M14 30 C 20 26 26 26 30 38 C 22 40 16 36 14 30 Z"
            fill="currentColor"
            opacity="0.7"
          />
          <path
            d="M46 30 C 40 26 34 26 30 38 C 38 40 44 36 46 30 Z"
            fill="currentColor"
            opacity="0.7"
          />
          <ellipse cx="30" cy="42" rx="14" ry="3" fill="currentColor" opacity="0.35" />
        </svg>
      );
    case "heart":
      return (
        <svg viewBox="0 0 60 60" className="w-9 h-9">
          <path
            d="M30 46 C 18 38 10 30 10 22 C 10 16 15 12 20 12 C 24 12 28 15 30 18 C 32 15 36 12 40 12 C 45 12 50 16 50 22 C 50 30 42 38 30 46 Z"
            fill="currentColor"
            opacity="0.9"
          />
          <path
            d="M12 32 L 20 32 L 23 26 L 27 38 L 31 22 L 35 34 L 38 32 L 48 32"
            fill="none"
            stroke="#FAF6ED"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "molecule":
      return (
        <svg viewBox="0 0 60 60" className="w-9 h-9">
          <line x1="30" y1="30" x2="14" y2="18" stroke="currentColor" strokeWidth="2" />
          <line x1="30" y1="30" x2="46" y2="18" stroke="currentColor" strokeWidth="2" />
          <line x1="30" y1="30" x2="14" y2="42" stroke="currentColor" strokeWidth="2" />
          <line x1="30" y1="30" x2="46" y2="42" stroke="currentColor" strokeWidth="2" />
          <circle cx="30" cy="30" r="6" fill="currentColor" />
          <circle cx="14" cy="18" r="4" fill="currentColor" opacity="0.75" />
          <circle cx="46" cy="18" r="4" fill="currentColor" opacity="0.75" />
          <circle cx="14" cy="42" r="4" fill="currentColor" opacity="0.75" />
          <circle cx="46" cy="42" r="4" fill="currentColor" opacity="0.75" />
        </svg>
      );
    case "leaf":
      return (
        <svg viewBox="0 0 60 60" className="w-9 h-9">
          <path
            d="M14 46 C 14 28 28 14 46 14 C 46 32 32 46 14 46 Z"
            fill="currentColor"
            opacity="0.9"
          />
          <path
            d="M16 44 Q 30 30 44 16"
            stroke="#FAF6ED"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
          />
        </svg>
      );
    case "clinic":
      return (
        <svg viewBox="0 0 60 60" className="w-9 h-9">
          <circle cx="22" cy="24" r="7" fill="currentColor" />
          <circle cx="38" cy="24" r="7" fill="currentColor" opacity="0.7" />
          <path
            d="M10 48 C 10 40 16 36 22 36 C 28 36 34 40 34 48 Z"
            fill="currentColor"
          />
          <path
            d="M26 48 C 26 40 32 36 38 36 C 44 36 50 40 50 48 Z"
            fill="currentColor"
            opacity="0.7"
          />
        </svg>
      );
  }
};

const SPRING = { stiffness: 250, damping: 22, mass: 0.5 };

export default function BentoCard({
  href,
  label,
  title,
  subtitle,
  icon,
  accent,
  tint,
  badge,
  index = 0,
  className = "",
  children,
}: Props) {
  const ref = useRef<HTMLAnchorElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [3, -3]), SPRING);
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-4, 4]), SPRING);

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
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.22, 0.65, 0.2, 1] as const }}
      style={{ perspective: 1200 }}
      className={className}
    >
      <Link
        ref={ref}
        href={href}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        className="group relative block w-full h-full rounded-[28px] overflow-hidden border border-[#2A2520]/[0.06] shadow-[0_4px_24px_-8px_rgba(42,37,32,0.08)] hover:shadow-[0_16px_48px_-12px_rgba(42,37,32,0.16)] transition-shadow duration-500"
      >
        <motion.div
          style={{
            rotateX: rx,
            rotateY: ry,
            transformStyle: "preserve-3d",
            background: tint,
          }}
          className="absolute inset-0"
        >
          {/* Decorative sparkle */}
          <motion.div
            className="absolute -top-8 -right-8 w-40 h-40 rounded-full blur-2xl opacity-50 pointer-events-none"
            style={{ background: `radial-gradient(circle, ${accent}30 0%, transparent 70%)` }}
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />

          <div className="relative h-full p-7 md:p-8 flex flex-col gap-5">
            {/* Icon + optional badge */}
            <div className="flex items-start justify-between">
              <motion.div
                className="relative w-16 h-16 rounded-full flex items-center justify-center"
                style={{ background: `${accent}22`, color: accent }}
                whileHover={{ scale: 1.08, rotate: -4 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
              >
                {ICON_BG(icon)}
                <div
                  className="absolute inset-0 rounded-full border"
                  style={{ borderColor: `${accent}30` }}
                />
              </motion.div>
              {badge && (
                <span
                  className="text-[10px] tracking-[0.22em] uppercase font-semibold rounded-full px-3 py-1.5"
                  style={{ background: `${accent}15`, color: accent }}
                >
                  {badge}
                </span>
              )}
            </div>

            {/* Copy */}
            <div className="flex-1 flex flex-col justify-end">
              <div
                className="text-[10px] tracking-[0.25em] uppercase font-semibold mb-2"
                style={{ color: accent }}
              >
                {label}
              </div>
              <h3 className="font-serif text-2xl md:text-[28px] leading-[1.15] text-[#2A2520]">
                {title}
              </h3>
              <p className="text-sm text-[#2A2520]/60 mt-2 leading-snug">{subtitle}</p>
              {children}
            </div>

            {/* Arrow */}
            <div className="flex items-center justify-between pt-3 border-t border-[#2A2520]/5">
              <span className="text-xs text-[#2A2520]/50 tracking-wider uppercase">
                Open
              </span>
              <motion.span
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ background: `${accent}12`, color: accent }}
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                →
              </motion.span>
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}
