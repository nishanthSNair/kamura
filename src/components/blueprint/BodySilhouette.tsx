"use client";

import { useState } from "react";
import {
  type WellnessIndicator,
  type BodyZone,
  ZONE_INDICATORS,
  ZONE_LABELS,
  INDICATOR_META,
  getIndicatorColor,
} from "@/data/blueprint";

interface BodySilhouetteProps {
  baselines: Record<WellnessIndicator, number>;
  projections: Record<WellnessIndicator, number>;
  activeZones: Set<string>;
}

function getZoneScore(
  zone: BodyZone,
  projections: Record<WellnessIndicator, number>
): number {
  const indicators = ZONE_INDICATORS[zone];
  if (indicators.length === 0) return 50;
  return Math.round(
    indicators.reduce((sum, k) => sum + projections[k], 0) / indicators.length
  );
}

function getZoneImprovement(
  zone: BodyZone,
  baselines: Record<WellnessIndicator, number>,
  projections: Record<WellnessIndicator, number>
): number {
  const indicators = ZONE_INDICATORS[zone];
  if (indicators.length === 0) return 0;
  const baseAvg =
    indicators.reduce((sum, k) => sum + baselines[k], 0) / indicators.length;
  const projAvg =
    indicators.reduce((sum, k) => sum + projections[k], 0) / indicators.length;
  return projAvg - baseAvg;
}

const ZONES: BodyZone[] = [
  "brain",
  "heart",
  "lungs",
  "gut",
  "muscles",
  "fullBody",
];

export default function BodySilhouette({
  baselines,
  projections,
  activeZones,
}: BodySilhouetteProps) {
  const [hoveredZone, setHoveredZone] = useState<BodyZone | null>(null);

  return (
    <div className="relative flex items-center justify-center">
      <svg
        viewBox="0 0 200 400"
        className="w-48 h-96 md:w-56 md:h-[420px]"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Full body glow (Sleep Quality) */}
        {(() => {
          const score = getZoneScore("fullBody", projections);
          const improvement = getZoneImprovement(
            "fullBody",
            baselines,
            projections
          );
          const { fill } = getIndicatorColor(score);
          const glowOpacity = Math.max(0.05, score / 250);
          return (
            <ellipse
              cx="100"
              cy="200"
              rx="80"
              ry="160"
              fill={fill}
              fillOpacity={glowOpacity}
              className={`transition-all duration-500 ${
                activeZones.has("fullBody")
                  ? improvement > 0
                    ? "zone-pulse-green"
                    : "zone-pulse-amber"
                  : ""
              }`}
              onMouseEnter={() => setHoveredZone("fullBody")}
              onMouseLeave={() => setHoveredZone(null)}
              style={{ cursor: "pointer" }}
            />
          );
        })()}

        {/* Body outline */}
        <g
          fill="none"
          className="stroke-gray-400 dark:stroke-gray-500"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Head */}
          <ellipse cx="100" cy="45" rx="25" ry="30" />
          {/* Neck */}
          <line x1="92" y1="74" x2="92" y2="90" />
          <line x1="108" y1="74" x2="108" y2="90" />
          {/* Torso */}
          <path d="M70 90 Q65 130 65 170 Q65 210 75 240 L75 250 L125 250 L125 240 Q135 210 135 170 Q135 130 130 90 Z" />
          {/* Left arm */}
          <path d="M70 95 Q45 110 35 145 Q30 160 28 180" />
          {/* Right arm */}
          <path d="M130 95 Q155 110 165 145 Q170 160 172 180" />
          {/* Left leg */}
          <path d="M80 250 Q78 300 75 340 Q74 360 70 380" />
          {/* Right leg */}
          <path d="M120 250 Q122 300 125 340 Q126 360 130 380" />
        </g>

        {/* Brain zone (head) */}
        {(() => {
          const score = getZoneScore("brain", projections);
          const improvement = getZoneImprovement(
            "brain",
            baselines,
            projections
          );
          const { fill } = getIndicatorColor(score);
          return (
            <ellipse
              cx="100"
              cy="45"
              rx="22"
              ry="27"
              fill={fill}
              fillOpacity={score / 200}
              className={`transition-all duration-500 cursor-pointer ${
                activeZones.has("brain")
                  ? improvement > 0
                    ? "zone-pulse-green"
                    : "zone-pulse-amber"
                  : ""
              }`}
              onMouseEnter={() => setHoveredZone("brain")}
              onMouseLeave={() => setHoveredZone(null)}
            />
          );
        })()}

        {/* Heart zone (upper chest) */}
        {(() => {
          const score = getZoneScore("heart", projections);
          const improvement = getZoneImprovement(
            "heart",
            baselines,
            projections
          );
          const { fill } = getIndicatorColor(score);
          return (
            <ellipse
              cx="105"
              cy="120"
              rx="18"
              ry="16"
              fill={fill}
              fillOpacity={score / 200}
              className={`transition-all duration-500 cursor-pointer ${
                activeZones.has("heart")
                  ? improvement > 0
                    ? "zone-pulse-green"
                    : "zone-pulse-amber"
                  : ""
              }`}
              onMouseEnter={() => setHoveredZone("heart")}
              onMouseLeave={() => setHoveredZone(null)}
            />
          );
        })()}

        {/* Lungs zone (ribcage) */}
        {(() => {
          const score = getZoneScore("lungs", projections);
          const improvement = getZoneImprovement(
            "lungs",
            baselines,
            projections
          );
          const { fill } = getIndicatorColor(score);
          return (
            <>
              <ellipse
                cx="85"
                cy="135"
                rx="14"
                ry="20"
                fill={fill}
                fillOpacity={score / 250}
                className={`transition-all duration-500 cursor-pointer ${
                  activeZones.has("lungs")
                    ? improvement > 0
                      ? "zone-pulse-green"
                      : "zone-pulse-amber"
                    : ""
                }`}
                onMouseEnter={() => setHoveredZone("lungs")}
                onMouseLeave={() => setHoveredZone(null)}
              />
              <ellipse
                cx="115"
                cy="135"
                rx="14"
                ry="20"
                fill={fill}
                fillOpacity={score / 250}
                className={`transition-all duration-500 cursor-pointer ${
                  activeZones.has("lungs")
                    ? improvement > 0
                      ? "zone-pulse-green"
                      : "zone-pulse-amber"
                    : ""
                }`}
                onMouseEnter={() => setHoveredZone("lungs")}
                onMouseLeave={() => setHoveredZone(null)}
              />
            </>
          );
        })()}

        {/* Gut zone (abdomen) */}
        {(() => {
          const score = getZoneScore("gut", projections);
          const improvement = getZoneImprovement(
            "gut",
            baselines,
            projections
          );
          const { fill } = getIndicatorColor(score);
          return (
            <ellipse
              cx="100"
              cy="190"
              rx="25"
              ry="30"
              fill={fill}
              fillOpacity={score / 200}
              className={`transition-all duration-500 cursor-pointer ${
                activeZones.has("gut")
                  ? improvement > 0
                    ? "zone-pulse-green"
                    : "zone-pulse-amber"
                  : ""
              }`}
              onMouseEnter={() => setHoveredZone("gut")}
              onMouseLeave={() => setHoveredZone(null)}
            />
          );
        })()}

        {/* Muscles zone (limbs) */}
        {(() => {
          const score = getZoneScore("muscles", projections);
          const improvement = getZoneImprovement(
            "muscles",
            baselines,
            projections
          );
          const { fill } = getIndicatorColor(score);
          const opacity = score / 250;
          const pulseClass = activeZones.has("muscles")
            ? improvement > 0
              ? "zone-pulse-green"
              : "zone-pulse-amber"
            : "";
          return (
            <>
              {/* Left arm highlight */}
              <ellipse
                cx="42"
                cy="150"
                rx="10"
                ry="25"
                fill={fill}
                fillOpacity={opacity}
                className={`transition-all duration-500 cursor-pointer ${pulseClass}`}
                onMouseEnter={() => setHoveredZone("muscles")}
                onMouseLeave={() => setHoveredZone(null)}
              />
              {/* Right arm highlight */}
              <ellipse
                cx="158"
                cy="150"
                rx="10"
                ry="25"
                fill={fill}
                fillOpacity={opacity}
                className={`transition-all duration-500 cursor-pointer ${pulseClass}`}
                onMouseEnter={() => setHoveredZone("muscles")}
                onMouseLeave={() => setHoveredZone(null)}
              />
              {/* Left leg highlight */}
              <ellipse
                cx="80"
                cy="320"
                rx="10"
                ry="40"
                fill={fill}
                fillOpacity={opacity}
                className={`transition-all duration-500 cursor-pointer ${pulseClass}`}
                onMouseEnter={() => setHoveredZone("muscles")}
                onMouseLeave={() => setHoveredZone(null)}
              />
              {/* Right leg highlight */}
              <ellipse
                cx="120"
                cy="320"
                rx="10"
                ry="40"
                fill={fill}
                fillOpacity={opacity}
                className={`transition-all duration-500 cursor-pointer ${pulseClass}`}
                onMouseEnter={() => setHoveredZone("muscles")}
                onMouseLeave={() => setHoveredZone(null)}
              />
            </>
          );
        })()}

        {/* Zone score badges */}
        {ZONES.filter((z) => z !== "fullBody").map((zone) => {
          const score = getZoneScore(zone, projections);
          const { fill } = getIndicatorColor(score);
          const positions: Record<string, { x: number; y: number }> = {
            brain: { x: 140, y: 40 },
            heart: { x: 140, y: 118 },
            lungs: { x: 50, y: 135 },
            gut: { x: 140, y: 190 },
            muscles: { x: 170, y: 310 },
          };
          const pos = positions[zone];
          if (!pos) return null;
          return (
            <g key={zone}>
              <circle
                cx={pos.x}
                cy={pos.y}
                r="12"
                fill={fill}
                fillOpacity={0.15}
                className="transition-all duration-500"
              />
              <text
                x={pos.x}
                y={pos.y + 4}
                textAnchor="middle"
                fill={fill}
                className="text-[10px] font-sans font-semibold"
              >
                {score}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Tooltip */}
      {hoveredZone && (
        <div className="absolute top-2 left-1/2 -translate-x-1/2 z-20 px-3 py-2 rounded-lg bg-white dark:bg-[#1C1815] border border-gray-200 dark:border-white/[0.06] shadow-lg max-w-[200px]">
          <p className="text-xs font-sans font-semibold text-gray-900 dark:text-gray-100">
            {ZONE_LABELS[hoveredZone]}
          </p>
          {ZONE_INDICATORS[hoveredZone].map((indicator) => (
            <p
              key={indicator}
              className="text-[10px] text-gray-500 dark:text-gray-400 font-sans mt-0.5"
            >
              {INDICATOR_META[indicator].label}:{" "}
              <span
                className="font-semibold"
                style={{
                  color: getIndicatorColor(projections[indicator]).fill,
                }}
              >
                {projections[indicator]}
              </span>
            </p>
          ))}
          <p className="text-[9px] text-gray-400 dark:text-gray-500 font-sans mt-1">
            {INDICATOR_META[ZONE_INDICATORS[hoveredZone][0]]?.description}
          </p>
        </div>
      )}
    </div>
  );
}
