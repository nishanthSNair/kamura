"use client";
import { motion } from "framer-motion";

export default function TortoiseHero() {
  return (
    <div className="relative w-full aspect-[4/3] md:aspect-square">
      {/* Soft radial glow */}
      <div
        className="absolute inset-0 rounded-full blur-3xl opacity-60"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(196,168,130,0.35) 0%, rgba(181,136,106,0.18) 40%, transparent 70%)",
        }}
      />

      {/* Flowing watercurrent lines (gold) */}
      <svg
        viewBox="0 0 400 400"
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="current1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#C4A882" stopOpacity="0" />
            <stop offset="50%" stopColor="#C4A882" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#C4A882" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="shellGrad" x1="20%" y1="0%" x2="80%" y2="100%">
            <stop offset="0%" stopColor="#E5D3B0" />
            <stop offset="45%" stopColor="#C4A882" />
            <stop offset="100%" stopColor="#9A7357" />
          </linearGradient>
          <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#B5C5A8" />
            <stop offset="100%" stopColor="#7B8D68" />
          </linearGradient>
          <radialGradient id="shellHighlight" cx="35%" cy="30%" r="50%">
            <stop offset="0%" stopColor="#F5E8DF" stopOpacity="0.7" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>

        {/* Ambient currents */}
        <g opacity="0.5">
          <motion.path
            d="M 40 120 Q 140 90 240 120 T 380 120"
            stroke="url(#current1)"
            strokeWidth="1.2"
            fill="none"
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.path
            d="M 20 280 Q 130 250 250 285 T 390 280"
            stroke="url(#current1)"
            strokeWidth="1"
            fill="none"
            animate={{ opacity: [0.5, 0.2, 0.5] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
          />
          <motion.path
            d="M 60 340 Q 160 310 260 345 T 380 340"
            stroke="url(#current1)"
            strokeWidth="0.8"
            fill="none"
            animate={{ opacity: [0.2, 0.6, 0.2] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          />
        </g>

        {/* Tortoise — swimming, side profile, facing right */}
        <motion.g
          animate={{ y: [0, -6, 0], rotate: [-1, 1.5, -1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          style={{ originX: "50%", originY: "50%" }}
        >
          {/* Back flipper */}
          <motion.ellipse
            cx="145"
            cy="235"
            rx="30"
            ry="14"
            fill="url(#bodyGrad)"
            transform="rotate(-22 145 235)"
            animate={{ rotate: [-22, -10, -22] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            style={{ originX: "145px", originY: "235px" }}
          />
          {/* Tail */}
          <path d="M 130 205 Q 115 200 112 215 Q 118 218 130 215 Z" fill="#7B8D68" />

          {/* Shell base (dome) */}
          <ellipse cx="200" cy="200" rx="90" ry="52" fill="url(#shellGrad)" />
          {/* Shell hexagonal pattern */}
          <g opacity="0.35" fill="none" stroke="#6A5240" strokeWidth="1.1">
            <polygon points="175,175 195,170 212,180 212,200 195,210 175,205" />
            <polygon points="212,180 232,175 250,185 248,205 232,213 212,200" />
            <polygon points="155,195 173,190 190,205 188,222 172,228 155,220" />
            <polygon points="195,210 215,212 232,225 228,238 210,240 193,232" />
            <polygon points="235,205 253,205 268,218 265,232 248,234 232,225" />
          </g>
          {/* Shell highlight */}
          <ellipse cx="200" cy="200" rx="90" ry="52" fill="url(#shellHighlight)" />
          {/* Shell rim */}
          <ellipse
            cx="200"
            cy="200"
            rx="90"
            ry="52"
            fill="none"
            stroke="#9A7357"
            strokeWidth="1.2"
            opacity="0.5"
          />

          {/* Front flipper (lower) */}
          <motion.ellipse
            cx="250"
            cy="240"
            rx="34"
            ry="15"
            fill="url(#bodyGrad)"
            transform="rotate(25 250 240)"
            animate={{ rotate: [25, 14, 25] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
            style={{ originX: "250px", originY: "240px" }}
          />

          {/* Neck */}
          <path
            d="M 275 190 Q 295 180 308 178 Q 308 196 300 206 Q 288 212 272 205 Z"
            fill="url(#bodyGrad)"
          />
          {/* Head */}
          <ellipse cx="317" cy="183" rx="22" ry="17" fill="url(#bodyGrad)" />
          {/* Head highlight */}
          <ellipse cx="311" cy="178" rx="10" ry="6" fill="#C8D4BB" opacity="0.6" />
          {/* Eye */}
          <circle cx="325" cy="181" r="2.2" fill="#2A2520" />
          <circle cx="326" cy="180" r="0.6" fill="#FAF6ED" />
          {/* Mouth line */}
          <path d="M 332 188 Q 336 190 338 188" stroke="#3A3B2E" strokeWidth="0.8" fill="none" />

          {/* Top flipper (behind shell, peeks above) */}
          <motion.ellipse
            cx="225"
            cy="158"
            rx="26"
            ry="12"
            fill="url(#bodyGrad)"
            transform="rotate(-12 225 158)"
            opacity="0.85"
            animate={{ rotate: [-12, -22, -12] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
            style={{ originX: "225px", originY: "158px" }}
          />
        </motion.g>

        {/* Gold particle bokeh around tortoise */}
        {[
          { cx: 80, cy: 140, r: 3, d: 4 },
          { cx: 340, cy: 90, r: 2.5, d: 5 },
          { cx: 360, cy: 310, r: 4, d: 6 },
          { cx: 50, cy: 280, r: 3, d: 7 },
          { cx: 120, cy: 60, r: 2, d: 5.5 },
          { cx: 290, cy: 340, r: 3.5, d: 6.5 },
          { cx: 175, cy: 340, r: 2.5, d: 5 },
          { cx: 230, cy: 70, r: 2, d: 7 },
          { cx: 60, cy: 210, r: 1.8, d: 4.5 },
          { cx: 370, cy: 200, r: 2.2, d: 6 },
          { cx: 100, cy: 350, r: 2, d: 4.8 },
          { cx: 310, cy: 50, r: 1.6, d: 5.2 },
        ].map((p, i) => (
          <motion.circle
            key={i}
            cx={p.cx}
            cy={p.cy}
            r={p.r}
            fill="#C4A882"
            animate={{
              opacity: [0.2, 0.9, 0.2],
              scale: [0.9, 1.3, 0.9],
              cx: [p.cx, p.cx + (i % 2 === 0 ? 8 : -8), p.cx],
              cy: [p.cy, p.cy - 6, p.cy],
            }}
            transition={{
              duration: p.d,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.35,
            }}
          />
        ))}

        {/* Soft sparkle stars */}
        {[
          { cx: 200, cy: 90, rot: 0 },
          { cx: 75, cy: 190, rot: 45 },
          { cx: 330, cy: 260, rot: 22 },
        ].map((s, i) => (
          <motion.g
            key={`spark-${i}`}
            transform={`translate(${s.cx} ${s.cy}) rotate(${s.rot})`}
            animate={{ opacity: [0, 1, 0], scale: [0.5, 1.1, 0.5] }}
            transition={{ duration: 3, repeat: Infinity, delay: i * 0.9 }}
          >
            <path
              d="M 0 -6 L 1.2 -1.2 L 6 0 L 1.2 1.2 L 0 6 L -1.2 1.2 L -6 0 L -1.2 -1.2 Z"
              fill="#E5D3B0"
            />
          </motion.g>
        ))}
      </svg>

      {/* Caption pill */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[10px] tracking-[0.3em] uppercase text-[#9A7357] font-semibold">
        1,000 years · longevity
      </div>
    </div>
  );
}
