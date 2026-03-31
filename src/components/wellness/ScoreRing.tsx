"use client";

import { useEffect, useState } from "react";

interface ScoreRingProps {
  score: number;
  label: string;
  size?: number;
}

export default function ScoreRing({ score, label, size = 140 }: ScoreRingProps) {
  const [animatedScore, setAnimatedScore] = useState(0);
  const strokeWidth = 10;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (animatedScore / 100) * circumference;

  useEffect(() => {
    const timer = setTimeout(() => setAnimatedScore(score), 100);
    return () => clearTimeout(timer);
  }, [score]);

  const color =
    score >= 75
      ? "var(--color-moss)"
      : score >= 50
      ? "var(--color-terracotta)"
      : "var(--color-score-orange)";

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="#e5e7eb"
            strokeWidth={strokeWidth}
          />
          {/* Progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-serif text-3xl text-gray-900">{animatedScore}</span>
          <span className="text-[10px] text-gray-400 font-sans uppercase tracking-wider">/100</span>
        </div>
      </div>
      <p className="mt-2 text-sm font-sans font-medium" style={{ color }}>
        {label}
      </p>
    </div>
  );
}
