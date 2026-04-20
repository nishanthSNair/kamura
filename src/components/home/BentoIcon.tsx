"use client";
import { motion } from "framer-motion";

type IconKind = "lotus" | "heart-ecg" | "molecule" | "leaf" | "people";

type Props = {
  kind: IconKind;
  theme?: "dark" | "light";
};

/**
 * Faux 3D-on-pedestal icon — SVG with gradients, a gold halo ring,
 * and a circular marble base. Placeholder until real 3D renders arrive.
 */
export default function BentoIcon({ kind, theme = "dark" }: Props) {
  const isDark = theme === "dark";
  const haloStroke = "#C4A882";
  const pedestalGrad = isDark
    ? ["#2F3E2F", "#18241A"]
    : ["#E8DFCF", "#CDBFA4"];

  return (
    <motion.svg
      viewBox="0 0 160 160"
      className="w-[120px] h-[120px] md:w-[140px] md:h-[140px]"
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.9, ease: [0.22, 0.65, 0.2, 1] as const }}
    >
      <defs>
        <radialGradient id={`halo-${kind}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#C4A882" stopOpacity="0.3" />
          <stop offset="60%" stopColor="#C4A882" stopOpacity="0.05" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <linearGradient id={`pedestal-${kind}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={pedestalGrad[0]} />
          <stop offset="100%" stopColor={pedestalGrad[1]} />
        </linearGradient>
        <radialGradient id={`gold-${kind}`} cx="30%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#F0DDB0" />
          <stop offset="50%" stopColor="#C4A882" />
          <stop offset="100%" stopColor="#8F7349" />
        </radialGradient>
        <radialGradient id={`marble-${kind}`} cx="35%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#4A5A48" />
          <stop offset="100%" stopColor="#1A241A" />
        </radialGradient>
      </defs>

      {/* Soft halo glow */}
      <circle cx="80" cy="72" r="62" fill={`url(#halo-${kind})`} />

      {/* Gold ring halo */}
      <motion.circle
        cx="80"
        cy="72"
        r="52"
        fill="none"
        stroke={haloStroke}
        strokeWidth="0.9"
        strokeOpacity="0.55"
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        style={{ originX: "80px", originY: "72px" }}
      />
      <circle
        cx="80"
        cy="72"
        r="52"
        fill="none"
        stroke={haloStroke}
        strokeWidth="0.4"
        strokeDasharray="2 6"
        strokeOpacity="0.8"
      />

      {/* Pedestal ellipse */}
      <ellipse
        cx="80"
        cy="128"
        rx="42"
        ry="10"
        fill={`url(#pedestal-${kind})`}
      />
      <ellipse
        cx="80"
        cy="125"
        rx="42"
        ry="8"
        fill={isDark ? "#0E1710" : "#B9A582"}
      />
      <ellipse cx="80" cy="123" rx="42" ry="6" fill={`url(#pedestal-${kind})`} />

      {/* Subtle pedestal highlight */}
      <ellipse
        cx="72"
        cy="121"
        rx="16"
        ry="2"
        fill="#C4A882"
        opacity="0.3"
      />

      {/* ─── ICON PAYLOAD ─── */}
      {kind === "lotus" && (
        <g>
          <path
            d="M 80 50 C 70 62 70 78 80 95 C 90 78 90 62 80 50 Z"
            fill={`url(#gold-${kind})`}
            stroke="#8F7349"
            strokeWidth="0.5"
          />
          <path
            d="M 55 82 C 63 72 74 74 80 95 C 66 98 57 92 55 82 Z"
            fill={`url(#gold-${kind})`}
            opacity="0.85"
          />
          <path
            d="M 105 82 C 97 72 86 74 80 95 C 94 98 103 92 105 82 Z"
            fill={`url(#gold-${kind})`}
            opacity="0.85"
          />
          <path
            d="M 40 90 C 52 82 65 84 80 102 C 62 106 46 98 40 90 Z"
            fill={`url(#gold-${kind})`}
            opacity="0.7"
          />
          <path
            d="M 120 90 C 108 82 95 84 80 102 C 98 106 114 98 120 90 Z"
            fill={`url(#gold-${kind})`}
            opacity="0.7"
          />
          <ellipse cx="80" cy="103" rx="14" ry="2.5" fill="#8F7349" opacity="0.6" />
        </g>
      )}

      {kind === "heart-ecg" && (
        <g>
          <path
            d="M 80 112 C 60 100 48 88 48 74 C 48 66 54 60 60 60 C 66 60 72 64 80 72 C 88 64 94 60 100 60 C 106 60 112 66 112 74 C 112 88 100 100 80 112 Z"
            fill={`url(#marble-${kind})`}
            stroke="#8F7349"
            strokeWidth="0.4"
          />
          <path
            d="M 52 84 L 62 84 L 66 78 L 72 96 L 78 70 L 84 90 L 88 84 L 108 84"
            stroke="#E5D3B0"
            strokeWidth="1.6"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <ellipse cx="68" cy="70" rx="6" ry="3" fill="#C4A882" opacity="0.35" />
        </g>
      )}

      {kind === "molecule" && (
        <g>
          <line x1="80" y1="72" x2="52" y2="48" stroke="#C4A882" strokeWidth="1.2" />
          <line x1="80" y1="72" x2="108" y2="48" stroke="#C4A882" strokeWidth="1.2" />
          <line x1="80" y1="72" x2="52" y2="96" stroke="#C4A882" strokeWidth="1.2" />
          <line x1="80" y1="72" x2="108" y2="96" stroke="#C4A882" strokeWidth="1.2" />
          <circle cx="80" cy="72" r="10" fill={`url(#gold-${kind})`} />
          <circle cx="52" cy="48" r="7" fill={`url(#marble-${kind})`} />
          <circle cx="108" cy="48" r="7" fill={`url(#gold-${kind})`} opacity="0.85" />
          <circle cx="52" cy="96" r="7" fill={`url(#gold-${kind})`} opacity="0.85" />
          <circle cx="108" cy="96" r="7" fill={`url(#marble-${kind})`} />
          <circle cx="80" cy="72" r="3" fill="#F0DDB0" opacity="0.7" />
        </g>
      )}

      {kind === "leaf" && (
        <g>
          <path
            d="M 44 104 C 44 74 68 54 108 50 C 108 80 88 102 48 108 Z"
            fill={`url(#gold-${kind})`}
            stroke="#8F7349"
            strokeWidth="0.5"
          />
          <path
            d="M 48 104 Q 74 80 104 54"
            stroke="#FAF6ED"
            strokeWidth="1.1"
            fill="none"
            opacity="0.55"
            strokeLinecap="round"
          />
          <path
            d="M 60 98 Q 70 92 80 86"
            stroke="#FAF6ED"
            strokeWidth="0.7"
            fill="none"
            opacity="0.45"
          />
          <path
            d="M 72 102 Q 82 96 92 90"
            stroke="#FAF6ED"
            strokeWidth="0.7"
            fill="none"
            opacity="0.45"
          />
        </g>
      )}

      {kind === "people" && (
        <g>
          <circle cx="62" cy="66" r="11" fill={`url(#gold-${kind})`} />
          <path
            d="M 44 108 C 44 92 53 84 62 84 C 71 84 80 92 80 108 Z"
            fill={`url(#gold-${kind})`}
          />
          <circle cx="96" cy="66" r="11" fill={`url(#marble-${kind})`} />
          <path
            d="M 78 108 C 78 92 87 84 96 84 C 105 84 114 92 114 108 Z"
            fill={`url(#marble-${kind})`}
          />
          <circle cx="62" cy="64" r="3" fill="#F0DDB0" opacity="0.6" />
          <circle cx="96" cy="64" r="3" fill="#6A7E6A" opacity="0.6" />
        </g>
      )}
    </motion.svg>
  );
}
