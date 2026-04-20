"use client";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import BentoIcon from "./BentoIcon";

type IconKind = "lotus" | "heart-ecg" | "molecule" | "leaf" | "people";
type CornerIcon = "calendar" | "chart" | "flask" | "leaf" | "people";

type Props = {
  href: string;
  label: string;
  title: string;
  subtitle: string;
  icon: IconKind;
  cornerIcon: CornerIcon;
  badge?: string;
  theme?: "dark" | "light";
  index?: number;
  className?: string;
};

const SPRING = { stiffness: 220, damping: 22 };

function CornerIconSvg({ kind, color }: { kind: CornerIcon; color: string }) {
  const common = {
    fill: "none",
    stroke: color,
    strokeWidth: 1.3,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  switch (kind) {
    case "calendar":
      return (
        <svg viewBox="0 0 24 24" className="w-4 h-4" {...common}>
          <rect x="4" y="6" width="16" height="14" rx="2" />
          <line x1="4" y1="10" x2="20" y2="10" />
          <line x1="9" y1="3" x2="9" y2="7" />
          <line x1="15" y1="3" x2="15" y2="7" />
        </svg>
      );
    case "chart":
      return (
        <svg viewBox="0 0 24 24" className="w-4 h-4" {...common}>
          <line x1="6" y1="20" x2="6" y2="14" />
          <line x1="12" y1="20" x2="12" y2="10" />
          <line x1="18" y1="20" x2="18" y2="6" />
        </svg>
      );
    case "flask":
      return (
        <svg viewBox="0 0 24 24" className="w-4 h-4" {...common}>
          <path d="M9 3h6M10 3v6l-5 10c-.5 1 .5 2 1.5 2h11c1 0 2-1 1.5-2l-5-10V3" />
          <line x1="8" y1="14" x2="16" y2="14" />
        </svg>
      );
    case "leaf":
      return (
        <svg viewBox="0 0 24 24" className="w-4 h-4" {...common}>
          <path d="M4 20c0-10 8-14 16-14 0 10-8 14-16 14z" />
          <line x1="4" y1="20" x2="14" y2="10" />
        </svg>
      );
    case "people":
      return (
        <svg viewBox="0 0 24 24" className="w-4 h-4" {...common}>
          <circle cx="9" cy="9" r="3" />
          <circle cx="16" cy="10" r="2.5" />
          <path d="M3 20c0-3 3-5 6-5s6 2 6 5" />
          <path d="M14 20c0-2 2-3.5 4-3.5s3 1 3 3" />
        </svg>
      );
  }
}

export default function BentoTile({
  href,
  label,
  title,
  subtitle,
  icon,
  cornerIcon,
  badge,
  theme = "dark",
  index = 0,
  className = "",
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

  const isDark = theme === "dark";
  const bg = isDark
    ? "linear-gradient(135deg, #1E2A1E 0%, #2D3E2D 55%, #1A241A 100%)"
    : "linear-gradient(135deg, #FAF2E1 0%, #F3E6CD 100%)";
  const rim = isDark ? "rgba(196,168,130,0.18)" : "rgba(154,115,87,0.18)";
  const labelColor = isDark ? "#C4A882" : "#8F6A4E";
  const titleColor = isDark ? "#F0E9DA" : "#2A2520";
  const subColor = isDark ? "rgba(240,233,218,0.55)" : "rgba(42,37,32,0.55)";
  const arrowBorder = isDark ? "#C4A882" : "#8F6A4E";
  const arrowColor = isDark ? "#E5D3B0" : "#2A2520";

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
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
        className="group relative block w-full h-full rounded-[24px] overflow-hidden transition-shadow duration-500 hover:shadow-[0_24px_60px_-18px_rgba(0,0,0,0.45)]"
      >
        <motion.div
          style={{
            rotateX: rx,
            rotateY: ry,
            transformStyle: "preserve-3d",
            background: bg,
            border: `1px solid ${rim}`,
          }}
          className="absolute inset-0"
        >
          {/* decorative flourish for light tile */}
          {!isDark && (
            <svg
              viewBox="0 0 200 200"
              className="absolute -right-10 bottom-0 w-48 h-48 opacity-30"
              aria-hidden
            >
              <path
                d="M 170 40 Q 140 80 150 140 Q 160 180 130 200"
                stroke="#9A7357"
                strokeWidth="1"
                fill="none"
              />
              <path
                d="M 180 60 C 160 70 145 90 150 120"
                stroke="#9A7357"
                strokeWidth="0.7"
                fill="none"
              />
            </svg>
          )}

          <div className="relative h-full p-6 md:p-7 flex items-center gap-5 md:gap-7">
            {/* 3D icon */}
            <div
              className="relative flex-shrink-0"
              style={{ transform: "translateZ(40px)", transformStyle: "preserve-3d" }}
            >
              <BentoIcon kind={icon} theme={theme} />
            </div>

            {/* Copy */}
            <div className="relative flex-1 min-w-0">
              {/* corner icon */}
              <span
                className="absolute -top-1 right-0 w-9 h-9 rounded-full flex items-center justify-center"
                style={{ border: `1px solid ${rim}` }}
              >
                <CornerIconSvg kind={cornerIcon} color={labelColor} />
              </span>

              <div
                className="text-[10px] tracking-[0.28em] uppercase font-semibold mb-2"
                style={{ color: labelColor }}
              >
                {label}
              </div>
              <h3
                className="font-serif leading-[1.1] text-[26px] md:text-[30px] tracking-tight"
                style={{ color: titleColor }}
              >
                {title}
              </h3>
              <p className="text-sm mt-2 leading-snug" style={{ color: subColor }}>
                {subtitle}
              </p>
              {badge && (
                <span
                  className="inline-flex items-center gap-1.5 mt-3 text-[10px] tracking-[0.22em] uppercase font-semibold rounded-full px-3 py-1"
                  style={{
                    background: "rgba(196,168,130,0.15)",
                    color: labelColor,
                    border: `1px solid ${rim}`,
                  }}
                >
                  <span className="w-1 h-1 rounded-full bg-[#C4A882] animate-pulse" />
                  {badge}
                </span>
              )}
            </div>

            {/* Arrow button */}
            <motion.span
              className="flex-shrink-0 w-11 h-11 rounded-full flex items-center justify-center text-base"
              style={{
                border: `1px solid ${arrowBorder}55`,
                color: arrowColor,
              }}
              animate={{ x: [0, 3, 0] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            >
              →
            </motion.span>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}
