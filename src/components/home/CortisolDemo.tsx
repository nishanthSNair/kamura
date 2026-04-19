"use client";
import { useEffect, useState } from "react";

type Scene = {
  service: string;
  metric: string;
  unit: string;
  start: number;
  end: number;
  color: string;
  bg: string;
  ring: string;
  description: string;
  ascending?: boolean;
  emoji: string;
};

const SCENES: Scene[] = [
  {
    service: "Sound Healing",
    metric: "Cortisol",
    unit: "µg/dL",
    start: 18.2,
    end: 11.4,
    color: "#B5886A",
    bg: "linear-gradient(135deg, #F5E8DF 0%, #EFDDCE 100%)",
    ring: "#B5886A",
    description: "Singing-bowl session · 40 min. Stress hormones drop.",
    emoji: "🎵",
  },
  {
    service: "Red Light Therapy",
    metric: "hs-CRP",
    unit: "mg/L",
    start: 3.8,
    end: 1.6,
    color: "#9A5F57",
    bg: "linear-gradient(135deg, #FCE6E0 0%, #F8D5CB 100%)",
    ring: "#9A5F57",
    description: "12 weeks, 3× per week. Systemic inflammation falls.",
    emoji: "🔴",
  },
  {
    service: "Cryotherapy",
    metric: "HRV Recovery",
    unit: "ms",
    start: 42,
    end: 71,
    color: "#4A5E3E",
    bg: "linear-gradient(135deg, #E8EFDC 0%, #D4DEC2 100%)",
    ring: "#4A5E3E",
    description: "-110 °C · 3 min. Vagal tone rises, recovery deepens.",
    ascending: true,
    emoji: "❄️",
  },
];

function buildPath(scene: Scene, resolution = 60) {
  const points: { x: number; y: number }[] = [];
  for (let i = 0; i <= resolution; i++) {
    const t = i / resolution;
    const ease = 1 - Math.exp(-t * 2.8);
    const noise = Math.sin(i * 0.6) * 0.8 + Math.cos(i * 1.4) * 0.5;
    const base = scene.ascending
      ? scene.start + (scene.end - scene.start) * ease
      : scene.start - (scene.start - scene.end) * ease;
    points.push({ x: t * 100, y: base + noise * 0.35 });
  }
  const ys = points.map((p) => p.y);
  const min = Math.min(...ys);
  const max = Math.max(...ys);
  const range = max - min || 1;
  return points
    .map((p, i) => {
      const x = p.x;
      const y = 95 - ((p.y - min) / range) * 75;
      return `${i === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`;
    })
    .join(" ");
}

export default function CortisolDemo() {
  const [idx, setIdx] = useState(0);
  const [drawKey, setDrawKey] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIdx((i) => (i + 1) % SCENES.length);
      setDrawKey((k) => k + 1);
    }, 7000);
    return () => clearInterval(id);
  }, []);

  const scene = SCENES[idx];
  const pathD = buildPath(scene);
  const delta = scene.ascending
    ? `+${((scene.end - scene.start) / scene.start * 100).toFixed(0)}%`
    : `-${((scene.start - scene.end) / scene.start * 100).toFixed(0)}%`;

  return (
    <div
      className="relative overflow-hidden rounded-3xl transition-[background] duration-1000 ease-out"
      style={{ background: scene.bg }}
      key={drawKey}
    >
      <div className="relative z-10 grid md:grid-cols-2 gap-8 p-8 md:p-12 items-center">
        {/* LEFT: service label + description */}
        <div className="min-h-[300px] flex flex-col justify-between">
          <div>
            <div
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs tracking-[0.2em] uppercase font-semibold"
              style={{ background: "rgba(255,255,255,0.6)", color: scene.color }}
            >
              <span>Live demo</span>
              <span className="flex gap-1">
                {SCENES.map((_, i) => (
                  <span
                    key={i}
                    className="w-1 h-1 rounded-full transition-all duration-500"
                    style={{
                      background: i === idx ? scene.color : "rgba(0,0,0,0.15)",
                      transform: i === idx ? "scale(1.8)" : "scale(1)",
                    }}
                  />
                ))}
              </span>
            </div>
            <h3 className="font-serif text-4xl md:text-6xl mt-6 leading-[1.05] tracking-tight text-[#2A2520]">
              {scene.service}
            </h3>
            <p className="text-base md:text-lg mt-4 text-[#2A2520]/70 max-w-md">
              {scene.description}
            </p>
          </div>

          <div className="mt-8 flex items-center gap-4">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl"
              style={{ background: "rgba(255,255,255,0.7)" }}
            >
              {scene.emoji}
            </div>
            <div>
              <div className="text-xs tracking-wider uppercase text-[#2A2520]/50 mb-0.5">
                {scene.metric}
              </div>
              <div className="flex items-baseline gap-3">
                <span className="font-serif text-2xl" style={{ color: scene.color }}>
                  {scene.start.toFixed(scene.start < 10 ? 1 : 1)} → {scene.end.toFixed(scene.end < 10 ? 1 : 1)}
                </span>
                <span className="text-xs text-[#2A2520]/50">{scene.unit}</span>
                <span
                  className="text-xs font-semibold px-2 py-0.5 rounded-full"
                  style={{
                    background: scene.ascending ? "#4A5E3E" : scene.color,
                    color: "white",
                  }}
                >
                  {delta}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: animated graph */}
        <div className="relative h-[280px] md:h-[340px] rounded-2xl bg-white/60 backdrop-blur-sm p-6 overflow-hidden">
          <div className="flex justify-between text-[10px] tracking-wider uppercase text-[#2A2520]/50 mb-2">
            <span>{scene.metric}</span>
            <span>0 → 10 min</span>
          </div>
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="w-full h-[calc(100%-24px)]"
          >
            {/* gridlines */}
            {[20, 40, 60, 80].map((y) => (
              <line
                key={y}
                x1="0"
                y1={y}
                x2="100"
                y2={y}
                stroke="rgba(0,0,0,0.05)"
                strokeWidth="0.3"
              />
            ))}
            {/* area under line */}
            <path
              d={`${pathD} L 100 95 L 0 95 Z`}
              fill={scene.color}
              fillOpacity="0.1"
              className="cortisol-area"
              key={`area-${drawKey}`}
            />
            {/* animated line */}
            <path
              d={pathD}
              fill="none"
              stroke={scene.color}
              strokeWidth="1.1"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="cortisol-line"
              key={`line-${drawKey}`}
            />
            {/* end dot */}
            <circle
              cx="100"
              cy={scene.ascending ? 20 : 75}
              r="1.6"
              fill={scene.color}
              className="cortisol-dot"
              key={`dot-${drawKey}`}
            />
          </svg>
        </div>
      </div>

      <style jsx>{`
        .cortisol-line {
          stroke-dasharray: 300;
          stroke-dashoffset: 300;
          animation: drawLine 3.5s cubic-bezier(0.2, 0.6, 0.2, 1) forwards;
        }
        .cortisol-area {
          opacity: 0;
          animation: fillArea 3.5s ease-out 0.6s forwards;
        }
        .cortisol-dot {
          opacity: 0;
          animation: showDot 0.4s ease-out 3.2s forwards;
        }
        @keyframes drawLine {
          to {
            stroke-dashoffset: 0;
          }
        }
        @keyframes fillArea {
          to {
            opacity: 1;
          }
        }
        @keyframes showDot {
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
