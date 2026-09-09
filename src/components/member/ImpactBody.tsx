"use client";

import BodyOutline, { BODY_VIEWBOX, BODY_ZONE_GEOMETRY } from "@/components/body/BodyModel";
import {
  IMPACT_REGIONS,
  type ImpactComparison,
  type ImpactRegion,
} from "@/lib/impact";

interface ImpactBodyProps {
  comparison: ImpactComparison;
  /** Sessions in range that map to each region key. */
  regionSessionCounts: Record<string, number>;
  selectedRegion: string | null;
  onSelectRegion: (key: string) => void;
}

const CALLOUT_LAYOUT: Record<string, { side: "left" | "right"; top: string }> = {
  mind: { side: "right", top: "2%" },
  vitality: { side: "left", top: "24%" },
  calm: { side: "right", top: "42%" },
  recovery: { side: "left", top: "68%" },
};

const TERRACOTTA = "#00786E";
const SAGE = "#96A78B";

function zoneOpacity(now: number | undefined, ready: boolean): number {
  if (!ready || now === undefined) return 0.1;
  // 0-100 → 0.12-0.5 so even low scores stay visible but clearly cooler
  return 0.12 + (now / 100) * 0.38;
}

function DeltaArrow({ deltaPts }: { deltaPts: number }) {
  if (deltaPts === 0) {
    return <span className="text-gray-400 text-xs font-sans">·</span>;
  }
  const up = deltaPts > 0;
  return (
    <span
      className={`inline-flex items-center text-xs font-sans font-semibold ${
        up ? "text-sage-dark" : "text-terracotta-dark"
      }`}
      aria-label={up ? "improved" : "declined"}
    >
      {up ? "↑" : "↓"}
    </span>
  );
}

function CalloutBody({
  region,
  comparison,
  sessionCount,
}: {
  region: ImpactRegion;
  comparison: ImpactComparison;
  sessionCount: number;
}) {
  const m = comparison.metrics?.[region.metric];
  return (
    <>
      <p className="text-[10px] tracking-[0.18em] uppercase text-gray-400 font-sans mb-1 whitespace-nowrap">
        {region.label}
      </p>
      {comparison.ready && m ? (
        <p className="flex items-baseline gap-1.5 whitespace-nowrap">
          <span className="font-sans text-xs text-gray-400">{m.baseline}</span>
          <span className="text-gray-300 text-xs">→</span>
          <span className="font-serif text-xl text-gray-900 leading-none">{m.now}</span>
          <DeltaArrow deltaPts={m.deltaPts} />
          <span
            className={`text-[11px] font-sans font-semibold ${
              m.deltaPts > 0
                ? "text-sage-dark"
                : m.deltaPts < 0
                  ? "text-terracotta-dark"
                  : "text-gray-400"
            }`}
          >
            {m.deltaPts > 0 ? `+${m.deltaPts}` : m.deltaPts}
          </span>
        </p>
      ) : (
        <p className="font-sans text-xs text-gray-400 whitespace-nowrap">Building baseline…</p>
      )}
      <p className="text-[10px] text-gray-400 font-sans mt-0.5 whitespace-nowrap">
        {sessionCount > 0
          ? `${sessionCount} session${sessionCount !== 1 ? "s" : ""} · view drivers`
          : "view details"}
      </p>
    </>
  );
}

export default function ImpactBody({
  comparison,
  regionSessionCounts,
  selectedRegion,
  onSelectRegion,
}: ImpactBodyProps) {
  const overallNow = comparison.metrics?.overall.now;

  return (
    <div>
      <div className="relative w-full max-w-[560px] mx-auto">
        {/* Desktop floating callouts */}
        {IMPACT_REGIONS.map((region) => {
          const pos = CALLOUT_LAYOUT[region.key];
          if (!pos) return null;
          const active = selectedRegion === region.key;
          return (
            <button
              key={region.key}
              onClick={() => onSelectRegion(region.key)}
              className={`absolute hidden md:flex items-center gap-2 group z-10 ${
                pos.side === "left" ? "right-[60%] flex-row-reverse" : "left-[60%]"
              }`}
              style={{ top: pos.top }}
            >
              <span
                className={`w-8 h-px transition-colors duration-300 ${
                  active ? "bg-terracotta" : "bg-gray-300 group-hover:bg-terracotta/60"
                }`}
              />
              <span
                className={`block px-3.5 py-2.5 rounded-2xl border text-left transition-all duration-300 ${
                  pos.side === "left" ? "text-right" : "text-left"
                } ${
                  active
                    ? "bg-white border-terracotta/50 shadow-lg shadow-terracotta/10"
                    : "bg-white/70 backdrop-blur-sm border-gray-200 group-hover:border-terracotta/40 group-hover:bg-white"
                }`}
              >
                <CalloutBody
                  region={region}
                  comparison={comparison}
                  sessionCount={regionSessionCounts[region.key] ?? 0}
                />
              </span>
            </button>
          );
        })}

        {/* The figure */}
        <svg
          viewBox={BODY_VIEWBOX}
          className="w-44 h-80 md:w-56 md:h-[440px] mx-auto"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Whole-body aura keyed to overall wellness */}
          {BODY_ZONE_GEOMETRY.fullBody.map((e, i) => (
            <ellipse
              key={i}
              cx={e.cx}
              cy={e.cy}
              rx={e.rx}
              ry={e.ry}
              fill={TERRACOTTA}
              fillOpacity={comparison.ready ? 0.04 + ((overallNow ?? 0) / 100) * 0.08 : 0.04}
              className="transition-all duration-700"
            />
          ))}

          <BodyOutline className="stroke-[#C9BBA8]" />

          {IMPACT_REGIONS.map((region) => {
            const m = comparison.metrics?.[region.metric];
            const improved = (m?.deltaPts ?? 0) > 0;
            const active = selectedRegion === region.key;
            return BODY_ZONE_GEOMETRY[region.zone].map((e, i) => (
              <ellipse
                key={`${region.key}-${i}`}
                cx={e.cx}
                cy={e.cy}
                rx={e.rx}
                ry={e.ry}
                fill={improved ? SAGE : TERRACOTTA}
                fillOpacity={zoneOpacity(m?.now, comparison.ready) * (active ? 1.35 : 1)}
                stroke={active ? TERRACOTTA : "none"}
                strokeWidth={active ? 1 : 0}
                strokeOpacity={0.5}
                className="transition-all duration-500 cursor-pointer"
                onClick={() => onSelectRegion(region.key)}
              />
            ));
          })}
        </svg>
      </div>

      {/* Mobile callout grid (below the body) */}
      <div className="md:hidden mt-5 grid grid-cols-2 gap-2">
        {IMPACT_REGIONS.map((region) => {
          const active = selectedRegion === region.key;
          return (
            <button
              key={region.key}
              onClick={() => onSelectRegion(region.key)}
              className={`px-3 py-3 rounded-2xl border text-left transition-all ${
                active
                  ? "bg-white border-terracotta/50 shadow-md"
                  : "bg-white/70 border-gray-200"
              }`}
            >
              <CalloutBody
                region={region}
                comparison={comparison}
                sessionCount={regionSessionCounts[region.key] ?? 0}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
