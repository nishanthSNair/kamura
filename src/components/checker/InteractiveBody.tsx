"use client";

import { useState } from "react";
import { type BodyZone, ZONES } from "@/data/wellness-concerns";

interface InteractiveBodyProps {
  completedZones: BodyZone[];
  onSelectZone: (zone: BodyZone) => void;
  hasSelectedConcerns: boolean;
  onViewResults: () => void;
}

const ZONE_POSITIONS: Record<
  Exclude<BodyZone, "fullBody">,
  { side: "left" | "right"; top: string }
> = {
  brain: { side: "right", top: "6%" },
  heart: { side: "right", top: "26%" },
  lungs: { side: "left", top: "30%" },
  gut: { side: "right", top: "44%" },
  muscles: { side: "left", top: "72%" },
};

export default function InteractiveBody({
  completedZones,
  onSelectZone,
  hasSelectedConcerns,
  onViewResults,
}: InteractiveBodyProps) {
  const [hoveredZone, setHoveredZone] = useState<BodyZone | null>(null);

  const isCompleted = (zone: BodyZone) => completedZones.includes(zone);
  const zoneColor = (zone: BodyZone) => {
    if (isCompleted(zone)) return "#B0BCA4"; // sage
    if (hoveredZone === zone) return "#B5886A"; // terracotta
    return "#B0BCA4"; // sage default
  };
  const zoneOpacity = (zone: BodyZone) => {
    if (isCompleted(zone)) return 0.35;
    if (hoveredZone === zone) return 0.4;
    return 0.08;
  };

  function handleZoneInteraction(zone: BodyZone) {
    onSelectZone(zone);
  }

  const zoneProps = (zone: BodyZone) => ({
    fill: zoneColor(zone),
    fillOpacity: zoneOpacity(zone),
    className: `transition-all duration-300 cursor-pointer ${
      !isCompleted(zone) && hoveredZone !== zone ? "zone-invite" : ""
    }`,
    onMouseEnter: () => setHoveredZone(zone),
    onMouseLeave: () => setHoveredZone(null),
    onClick: () => handleZoneInteraction(zone),
    style: { cursor: "pointer" } as React.CSSProperties,
  });

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 pt-20 pb-12">
      {/* Headline */}
      <h1 className="font-serif text-3xl md:text-5xl text-gray-900 dark:text-[#F0EBE2] text-center mb-3">
        Where would you like to{" "}
        <em className="italic text-terracotta">feel better</em>?
      </h1>
      <p className="text-sm md:text-base text-gray-500 dark:text-[#6B6358] font-sans text-center mb-10 md:mb-14">
        Tap a body area to begin your wellness check
      </p>

      {/* Body map with labels */}
      <div className="relative w-full max-w-[520px] mx-auto">
        {/* Zone labels — positioned alongside the body */}
        {(Object.keys(ZONE_POSITIONS) as Exclude<BodyZone, "fullBody">[]).map(
          (zone) => {
            const pos = ZONE_POSITIONS[zone];
            const config = ZONES.find((z) => z.zone === zone)!;
            const active = hoveredZone === zone;
            const completed = isCompleted(zone);

            return (
              <button
                key={zone}
                onClick={() => handleZoneInteraction(zone)}
                onMouseEnter={() => setHoveredZone(zone)}
                onMouseLeave={() => setHoveredZone(null)}
                className={`absolute hidden md:flex items-center gap-2 transition-all duration-300 group ${
                  pos.side === "left"
                    ? "right-[58%] flex-row-reverse text-right"
                    : "left-[58%] text-left"
                }`}
                style={{ top: pos.top }}
              >
                {/* Connecting line */}
                <span
                  className={`w-8 h-px transition-colors duration-300 ${
                    active || completed
                      ? "bg-terracotta"
                      : "bg-gray-300 dark:bg-gray-600"
                  }`}
                />
                <span className="flex flex-col">
                  <span
                    className={`text-sm font-sans font-medium transition-colors duration-300 whitespace-nowrap ${
                      active
                        ? "text-terracotta"
                        : completed
                        ? "text-sage-dark dark:text-sage"
                        : "text-gray-600 dark:text-gray-400 group-hover:text-terracotta"
                    }`}
                  >
                    {completed && (
                      <span className="inline-block mr-1 text-sage-dark">
                        &#10003;
                      </span>
                    )}
                    {config.icon} {config.label}
                  </span>
                  <span className="text-[11px] text-gray-400 dark:text-[#6B6358] font-sans whitespace-nowrap">
                    {config.description}
                  </span>
                </span>
              </button>
            );
          }
        )}

        {/* Full Body label at bottom */}
        {(() => {
          const config = ZONES.find((z) => z.zone === "fullBody")!;
          const active = hoveredZone === "fullBody";
          const completed = isCompleted("fullBody");
          return (
            <button
              onClick={() => handleZoneInteraction("fullBody")}
              onMouseEnter={() => setHoveredZone("fullBody")}
              onMouseLeave={() => setHoveredZone(null)}
              className="hidden md:block absolute left-1/2 -translate-x-1/2 text-center"
              style={{ bottom: "-48px" }}
            >
              <span
                className={`text-sm font-sans font-medium transition-colors duration-300 ${
                  active
                    ? "text-terracotta"
                    : completed
                    ? "text-sage-dark dark:text-sage"
                    : "text-gray-600 dark:text-gray-400 hover:text-terracotta"
                }`}
              >
                {completed && (
                  <span className="inline-block mr-1 text-sage-dark">
                    &#10003;
                  </span>
                )}
                {config.icon} {config.label}
              </span>
            </button>
          );
        })()}

        {/* SVG Body */}
        <svg
          viewBox="0 0 200 400"
          className="w-44 h-80 md:w-52 md:h-[400px] mx-auto"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Full body glow */}
          <ellipse
            cx="100"
            cy="200"
            rx="80"
            ry="160"
            {...zoneProps("fullBody")}
          />

          {/* Body outline */}
          <g
            fill="none"
            className="stroke-gray-400 dark:stroke-gray-500"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <ellipse cx="100" cy="45" rx="25" ry="30" />
            <line x1="92" y1="74" x2="92" y2="90" />
            <line x1="108" y1="74" x2="108" y2="90" />
            <path d="M70 90 Q65 130 65 170 Q65 210 75 240 L75 250 L125 250 L125 240 Q135 210 135 170 Q135 130 130 90 Z" />
            <path d="M70 95 Q45 110 35 145 Q30 160 28 180" />
            <path d="M130 95 Q155 110 165 145 Q170 160 172 180" />
            <path d="M80 250 Q78 300 75 340 Q74 360 70 380" />
            <path d="M120 250 Q122 300 125 340 Q126 360 130 380" />
          </g>

          {/* Brain zone */}
          <ellipse cx="100" cy="45" rx="22" ry="27" {...zoneProps("brain")} />

          {/* Heart zone */}
          <ellipse cx="105" cy="120" rx="18" ry="16" {...zoneProps("heart")} />

          {/* Lungs zone */}
          <ellipse cx="85" cy="135" rx="14" ry="20" {...zoneProps("lungs")} />
          <ellipse cx="115" cy="135" rx="14" ry="20" {...zoneProps("lungs")} />

          {/* Gut zone */}
          <ellipse cx="100" cy="190" rx="25" ry="30" {...zoneProps("gut")} />

          {/* Muscles zone */}
          <ellipse
            cx="42"
            cy="150"
            rx="10"
            ry="25"
            {...zoneProps("muscles")}
          />
          <ellipse
            cx="158"
            cy="150"
            rx="10"
            ry="25"
            {...zoneProps("muscles")}
          />
          <ellipse
            cx="80"
            cy="320"
            rx="10"
            ry="40"
            {...zoneProps("muscles")}
          />
          <ellipse
            cx="120"
            cy="320"
            rx="10"
            ry="40"
            {...zoneProps("muscles")}
          />

          {/* Completed check marks inside zones */}
          {isCompleted("brain") && (
            <text
              x="100"
              y="50"
              textAnchor="middle"
              className="text-[14px] fill-sage-dark dark:fill-sage font-bold"
            >
              &#10003;
            </text>
          )}
          {isCompleted("heart") && (
            <text
              x="105"
              y="125"
              textAnchor="middle"
              className="text-[12px] fill-sage-dark dark:fill-sage font-bold"
            >
              &#10003;
            </text>
          )}
          {isCompleted("gut") && (
            <text
              x="100"
              y="195"
              textAnchor="middle"
              className="text-[14px] fill-sage-dark dark:fill-sage font-bold"
            >
              &#10003;
            </text>
          )}
        </svg>

        {/* Mobile zone buttons (below the body) */}
        <div className="md:hidden mt-6 grid grid-cols-2 gap-2">
          {ZONES.map((config) => {
            const completed = isCompleted(config.zone);
            return (
              <button
                key={config.zone}
                onClick={() => handleZoneInteraction(config.zone)}
                className={`px-3 py-3 rounded-xl border text-left text-sm font-sans transition-all ${
                  completed
                    ? "border-sage/40 bg-sage/10 text-sage-dark dark:text-sage dark:bg-sage/10 dark:border-sage/20"
                    : "border-gray-200 dark:border-white/[0.06] bg-white dark:bg-[#1C1815] text-gray-700 dark:text-gray-300 hover:border-terracotta/40"
                }`}
              >
                <span className="block">
                  {completed && "✓ "}
                  {config.icon} {config.label}
                </span>
                <span className="text-[11px] text-gray-400 dark:text-[#6B6358] mt-0.5 block">
                  {config.description}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* View Results floating button */}
      {hasSelectedConcerns && (
        <button
          onClick={onViewResults}
          className="mt-10 px-8 py-3.5 bg-terracotta hover:bg-terracotta-dark text-white font-sans font-medium rounded-full shadow-lg hover:shadow-xl transition-all text-sm"
        >
          View Recommendations &rarr;
        </button>
      )}
    </div>
  );
}
