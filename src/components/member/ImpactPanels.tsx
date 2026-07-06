"use client";

import type { ImpactComparison, MetricKey } from "@/lib/impact";

interface ImpactPanelsProps {
  comparison: ImpactComparison;
  rangeLabel: string;
  checkinCount: number;
  sessionCount: number;
  doseCount: number;
}

function ComparisonBars({
  comparison,
  metric,
  title,
}: {
  comparison: ImpactComparison;
  metric: MetricKey;
  title: string;
}) {
  const m = comparison.metrics?.[metric];
  if (!m) return null;
  const rows = [
    { label: "Baseline", value: m.baseline, cls: "bg-gray-300" },
    { label: "Now", value: m.now, cls: "bg-terracotta" },
  ];
  return (
    <div className="p-5 bg-white rounded-3xl border border-gray-200">
      <div className="flex items-baseline justify-between mb-4">
        <h3 className="font-serif text-lg text-gray-900">{title}</h3>
        <span
          className={`text-xs font-sans font-semibold ${
            m.deltaPts > 0
              ? "text-sage-dark"
              : m.deltaPts < 0
                ? "text-terracotta-dark"
                : "text-gray-400"
          }`}
        >
          {m.deltaPts > 0 ? `+${m.deltaPts}` : m.deltaPts} pts
        </span>
      </div>
      <div className="space-y-3">
        {rows.map((r) => (
          <div key={r.label}>
            <div className="flex justify-between items-baseline mb-1">
              <p className="text-[11px] tracking-[0.15em] uppercase text-gray-400 font-sans">
                {r.label}
              </p>
              <p className="text-xs font-sans font-semibold text-gray-700">{r.value}</p>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-700 ${r.cls}`}
                style={{ width: `${r.value}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DonutCompare({
  comparison,
  metric,
  title,
}: {
  comparison: ImpactComparison;
  metric: MetricKey;
  title: string;
}) {
  const m = comparison.metrics?.[metric];
  if (!m) return null;
  const size = 120;
  const c = size / 2;
  const arc = (r: number, pct: number) => {
    const circumference = 2 * Math.PI * r;
    return {
      strokeDasharray: `${(pct / 100) * circumference} ${circumference}`,
    };
  };
  return (
    <div className="p-5 bg-white rounded-3xl border border-gray-200">
      <h3 className="font-serif text-lg text-gray-900 mb-4">{title}</h3>
      <div className="flex items-center gap-5">
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="shrink-0 -rotate-90">
          <circle cx={c} cy={c} r={48} fill="none" stroke="#F3F4F6" strokeWidth="10" />
          <circle
            cx={c}
            cy={c}
            r={48}
            fill="none"
            stroke="#B5736A"
            strokeWidth="10"
            strokeLinecap="round"
            style={arc(48, m.now)}
            className="transition-all duration-700"
          />
          <circle cx={c} cy={c} r={34} fill="none" stroke="#F3F4F6" strokeWidth="7" />
          <circle
            cx={c}
            cy={c}
            r={34}
            fill="none"
            stroke="#D1D5DB"
            strokeWidth="7"
            strokeLinecap="round"
            style={arc(34, m.baseline)}
          />
        </svg>
        <div className="space-y-2">
          <div>
            <p className="flex items-center gap-2 text-[11px] tracking-[0.15em] uppercase text-gray-400 font-sans">
              <span className="w-2.5 h-2.5 rounded-full bg-terracotta inline-block" /> Now
            </p>
            <p className="font-serif text-2xl text-gray-900">{m.now}</p>
          </div>
          <div>
            <p className="flex items-center gap-2 text-[11px] tracking-[0.15em] uppercase text-gray-400 font-sans">
              <span className="w-2.5 h-2.5 rounded-full bg-gray-300 inline-block" /> Baseline
            </p>
            <p className="font-serif text-xl text-gray-400">{m.baseline}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ImpactPanels({
  comparison,
  rangeLabel,
  checkinCount,
  sessionCount,
  doseCount,
}: ImpactPanelsProps) {
  return (
    <div className="space-y-4">
      {comparison.ready && (
        <>
          <ComparisonBars comparison={comparison} metric="overall" title="Wellness score" />
          <DonutCompare comparison={comparison} metric="sleep" title="Sleep quality" />
        </>
      )}

      {/* Consistency — always real, always shown */}
      <div className="p-5 bg-white rounded-3xl border border-gray-200">
        <h3 className="font-serif text-lg text-gray-900 mb-1">Consistency</h3>
        <p className="text-[11px] text-gray-400 font-sans mb-4">{rangeLabel}</p>
        <div className="grid grid-cols-3 gap-2 text-center">
          {[
            { label: "Check-ins", value: checkinCount },
            { label: "Sessions", value: sessionCount },
            { label: "Doses", value: doseCount },
          ].map((s) => (
            <div key={s.label} className="py-3 rounded-2xl bg-[#F7F3EB]">
              <p className="font-serif text-2xl text-gray-900">{s.value}</p>
              <p className="text-[10px] tracking-[0.15em] uppercase text-gray-400 font-sans mt-0.5">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
