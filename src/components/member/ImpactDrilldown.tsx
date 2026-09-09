"use client";

import { getSessionType } from "@/data/session-types";
import {
  metricSeries,
  summarizeRegionSessions,
  type CheckinRow,
  type ImpactComparison,
  type ImpactRegion,
  type SessionRow,
} from "@/lib/impact";

interface ImpactDrilldownProps {
  region: ImpactRegion;
  comparison: ImpactComparison;
  /** All check-ins in the selected range. */
  checkins: CheckinRow[];
  /** All sessions in the selected range. */
  sessions: SessionRow[];
  /** Doses logged in the selected range (0 for guests). */
  doseCount: number;
  onClose: () => void;
}

function fmtDate(iso: string | null): string {
  if (!iso) return "—";
  return new Date(iso + "T00:00:00").toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });
}

function Sparkline({ points }: { points: { date: string; value: number }[] }) {
  if (points.length < 2) return null;
  const w = 320;
  const h = 64;
  const pad = 6;
  const xs = (i: number) => pad + (i / (points.length - 1)) * (w - pad * 2);
  const ys = (v: number) => pad + (1 - v / 100) * (h - pad * 2);
  const path = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${xs(i).toFixed(1)} ${ys(p.value).toFixed(1)}`)
    .join(" ");
  const last = points[points.length - 1];
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-16">
      <line x1={pad} x2={w - pad} y1={ys(50)} y2={ys(50)} stroke="#E5E7EB" strokeDasharray="2 4" />
      <path d={path} fill="none" stroke="#00786E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={xs(points.length - 1)} cy={ys(last.value)} r="3" fill="#00786E" />
    </svg>
  );
}

export default function ImpactDrilldown({
  region,
  comparison,
  checkins,
  sessions,
  doseCount,
  onClose,
}: ImpactDrilldownProps) {
  const m = comparison.metrics?.[region.metric] ?? null;
  const series = metricSeries(checkins, region.metric);
  const typeSummaries = summarizeRegionSessions(sessions, region);
  const totalSessions = typeSummaries.reduce((s, t) => s + t.count, 0);

  return (
    <section className="p-5 md:p-7 bg-white rounded-3xl border border-terracotta/25 shadow-lg shadow-terracotta/5">
      <div className="flex items-start justify-between gap-4 mb-5">
        <div>
          <p className="text-[10px] tracking-[0.3em] uppercase text-terracotta font-sans font-semibold mb-1">
            {region.label}
          </p>
          <p className="text-xs text-gray-500 font-sans max-w-md">{region.description}</p>
        </div>
        <button
          onClick={onClose}
          aria-label="Close details"
          className="shrink-0 w-8 h-8 rounded-full border border-gray-200 text-gray-400 hover:text-gray-700 hover:border-gray-400 transition-colors text-sm"
        >
          ×
        </button>
      </div>

      {m && comparison.ready ? (
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="flex items-end gap-6">
            <div>
              <p className="text-[10px] tracking-[0.2em] uppercase text-gray-400 font-sans mb-1">
                Baseline · {fmtDate(comparison.baselineStart)}–{fmtDate(comparison.baselineEnd)}
              </p>
              <p className="font-serif text-4xl text-gray-400">{m.baseline}</p>
            </div>
            <div>
              <p className="text-[10px] tracking-[0.2em] uppercase text-gray-400 font-sans mb-1">
                Now · {fmtDate(comparison.nowStart)}–{fmtDate(comparison.nowEnd)}
              </p>
              <p className="font-serif text-4xl text-gray-900">
                {m.now}
                <span
                  className={`ml-2 text-base font-sans font-semibold align-middle ${
                    m.deltaPts > 0
                      ? "text-sage-dark"
                      : m.deltaPts < 0
                        ? "text-terracotta-dark"
                        : "text-gray-400"
                  }`}
                >
                  {m.deltaPts > 0 ? `+${m.deltaPts}` : m.deltaPts} pts
                </span>
              </p>
            </div>
          </div>
          <div>
            <p className="text-[10px] tracking-[0.2em] uppercase text-gray-400 font-sans mb-1">
              {region.metricLabel} · every check-in
            </p>
            <Sparkline points={series} />
          </div>
        </div>
      ) : (
        <p className="text-sm text-gray-500 font-sans mb-6">
          Not enough data for a comparison yet — keep checking in daily and this region will
          light up with your real change.
        </p>
      )}

      <div>
        <p className="text-[10px] tracking-[0.2em] uppercase text-gray-400 font-sans mb-3">
          What could be driving this
        </p>
        {totalSessions === 0 && doseCount === 0 ? (
          <p className="text-sm text-gray-500 font-sans">
            No logged sessions map to this area in the selected period. Log HBOT, IV, yoga and
            other sessions from the Today screen to see their fingerprint here.
          </p>
        ) : (
          <div className="grid sm:grid-cols-2 gap-2">
            {typeSummaries.map((t) => {
              const meta = getSessionType(t.type);
              return (
                <div
                  key={t.type}
                  className="flex items-center justify-between px-4 py-3 rounded-2xl bg-[#FAFCF7] border border-gray-200/60"
                >
                  <div>
                    <p className="text-sm font-sans font-medium text-gray-800">
                      {meta?.label ?? t.type}
                    </p>
                    <p className="text-[11px] text-gray-400 font-sans">
                      {t.count} session{t.count !== 1 ? "s" : ""}
                      {t.totalMinutes > 0 ? ` · ${t.totalMinutes} min` : ""}
                    </p>
                  </div>
                  {t.avgFeel !== null && (
                    <div className="text-right">
                      <p className="font-serif text-lg text-gray-900 leading-none">{t.avgFeel}</p>
                      <p className="text-[10px] text-gray-400 font-sans">felt after /10</p>
                    </div>
                  )}
                </div>
              );
            })}
            {doseCount > 0 && (
              <div className="flex items-center justify-between px-4 py-3 rounded-2xl bg-[#FAFCF7] border border-gray-200/60">
                <div>
                  <p className="text-sm font-sans font-medium text-gray-800">Protocol doses</p>
                  <p className="text-[11px] text-gray-400 font-sans">across your active items</p>
                </div>
                <p className="font-serif text-lg text-gray-900">{doseCount}</p>
              </div>
            )}
          </div>
        )}
        <p className="text-[10px] text-gray-400 font-sans mt-3">
          Correlation, not causation — these are the interventions you logged in the same
          period, shown honestly.
        </p>
      </div>
    </section>
  );
}
