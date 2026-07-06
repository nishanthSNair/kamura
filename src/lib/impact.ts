/**
 * Impact view computation — turns raw check-ins, session logs and dose logs
 * into an honest "You · Now vs. Baseline" comparison.
 *
 * Honesty rules (non-negotiable, see dashboard design brief):
 * - A comparison only becomes "ready" once the logged span covers at least
 *   MIN_SPAN_DAYS and both the baseline and the current window contain at
 *   least MIN_CHECKINS_PER_WINDOW check-ins. Until then we show progress
 *   toward a baseline, never a fabricated percentage.
 * - Every number shown must be derivable from rows the member logged.
 */

import type { SessionTypeKey } from "@/data/session-types";
import type { BodyModelZone } from "@/components/body/BodyModel";

export interface CheckinRow {
  checkin_date: string; // YYYY-MM-DD
  overall_score: number;
  energy: number; // 1-5
  mood: number; // 1-5
  sleep_quality: number; // 1-5
  stress: number; // 1-5, lower is better
}

export interface SessionRow {
  id: string;
  session_type: SessionTypeKey | string;
  performed_at: string; // ISO timestamp
  duration_minutes: number | null;
  energy_after: number | null; // 1-10
  clarity_after: number | null; // 1-10
  calm_after: number | null; // 1-10
}

export interface DoseRow {
  logged_at: string; // ISO timestamp
}

export type RangeKey = "30" | "60" | "90" | "all";

export const RANGE_OPTIONS: { key: RangeKey; label: string }[] = [
  { key: "30", label: "30 days" },
  { key: "60", label: "60 days" },
  { key: "90", label: "90 days" },
  { key: "all", label: "All time" },
];

export type MetricKey = "energy" | "mood" | "sleep" | "calm" | "overall";

export const MIN_SPAN_DAYS = 14;
export const MIN_CHECKINS_PER_WINDOW = 3;
/** Days averaged at each end of the span to form baseline / now. */
export const WINDOW_DAYS = 7;

/** A body region callout: which zone it anchors to, which check-in metric
 *  proves it, and which session types plausibly drove it. */
export interface ImpactRegion {
  key: string;
  zone: Exclude<BodyModelZone, "fullBody" | "lungs">;
  label: string;
  metric: MetricKey;
  metricLabel: string;
  sessionTypes: SessionTypeKey[];
  /** Which post-session feel dimension is most relevant to this region. */
  feelAfter: "energy_after" | "clarity_after" | "calm_after";
  description: string;
}

export const IMPACT_REGIONS: ImpactRegion[] = [
  {
    key: "mind",
    zone: "brain",
    label: "Mind & Clarity",
    metric: "mood",
    metricLabel: "Mood",
    sessionTypes: ["meditation", "breathwork", "sound_bath"],
    feelAfter: "clarity_after",
    description: "Daily mood from your check-ins, alongside mind-focused practices.",
  },
  {
    key: "vitality",
    zone: "heart",
    label: "Energy & Vitality",
    metric: "energy",
    metricLabel: "Energy",
    sessionTypes: ["hbot", "iv_drip", "red_light", "cryotherapy"],
    feelAfter: "energy_after",
    description: "Daily energy from your check-ins, alongside vitality treatments and your protocol.",
  },
  {
    key: "calm",
    zone: "gut",
    label: "Stress & Calm",
    metric: "calm",
    metricLabel: "Calm",
    sessionTypes: ["breathwork", "massage", "sauna", "meditation", "sound_bath"],
    feelAfter: "calm_after",
    description: "Inverse of your reported stress, alongside calming practices.",
  },
  {
    key: "recovery",
    zone: "muscles",
    label: "Sleep & Recovery",
    metric: "sleep",
    metricLabel: "Sleep quality",
    sessionTypes: ["sauna", "cold_plunge", "massage", "yoga", "pilates"],
    feelAfter: "calm_after",
    description: "Sleep quality from your check-ins, alongside recovery and movement sessions.",
  },
];

/** Metric value on a 0-100 scale for a single check-in. */
export function metricValue(c: CheckinRow, metric: MetricKey): number {
  switch (metric) {
    case "energy":
      return (c.energy / 5) * 100;
    case "mood":
      return (c.mood / 5) * 100;
    case "sleep":
      return (c.sleep_quality / 5) * 100;
    case "calm":
      // stress 1 (none) → 100, stress 5 (severe) → 0
      return ((5 - c.stress) / 4) * 100;
    case "overall":
      return c.overall_score;
  }
}

function dayDiff(a: string, b: string): number {
  return Math.round(
    (new Date(b + "T00:00:00").getTime() - new Date(a + "T00:00:00").getTime()) / 86400000
  );
}

export interface MetricComparison {
  baseline: number; // 0-100
  now: number; // 0-100
  deltaPts: number; // now - baseline, in points
  deltaPct: number | null; // relative change vs baseline, null if baseline is 0
}

export interface ImpactComparison {
  ready: boolean;
  /** Distinct days with a check-in inside the range. */
  daysLogged: number;
  /** Calendar span between first and last check-in inside the range. */
  spanDays: number;
  baselineStart: string | null;
  baselineEnd: string | null;
  nowStart: string | null;
  nowEnd: string | null;
  baselineCount: number;
  nowCount: number;
  metrics: Record<MetricKey, MetricComparison> | null;
}

const ALL_METRICS: MetricKey[] = ["energy", "mood", "sleep", "calm", "overall"];

/**
 * Split the range's check-ins into a baseline window (first WINDOW_DAYS of
 * the span) and a "now" window (last WINDOW_DAYS), then compare per metric.
 */
export function computeComparison(checkins: CheckinRow[]): ImpactComparison {
  const sorted = [...checkins].sort((a, b) => a.checkin_date.localeCompare(b.checkin_date));
  const daysLogged = new Set(sorted.map((c) => c.checkin_date)).size;

  const empty: ImpactComparison = {
    ready: false,
    daysLogged,
    spanDays: 0,
    baselineStart: null,
    baselineEnd: null,
    nowStart: null,
    nowEnd: null,
    baselineCount: 0,
    nowCount: 0,
    metrics: null,
  };
  if (sorted.length === 0) return empty;

  const first = sorted[0].checkin_date;
  const last = sorted[sorted.length - 1].checkin_date;
  const spanDays = dayDiff(first, last) + 1;

  const baselineRows = sorted.filter((c) => dayDiff(first, c.checkin_date) < WINDOW_DAYS);
  const nowRows = sorted.filter((c) => dayDiff(c.checkin_date, last) < WINDOW_DAYS);

  const base: ImpactComparison = {
    ...empty,
    spanDays,
    baselineStart: first,
    baselineEnd: baselineRows[baselineRows.length - 1]?.checkin_date ?? first,
    nowStart: nowRows[0]?.checkin_date ?? last,
    nowEnd: last,
    baselineCount: baselineRows.length,
    nowCount: nowRows.length,
  };

  const ready =
    spanDays >= MIN_SPAN_DAYS &&
    baselineRows.length >= MIN_CHECKINS_PER_WINDOW &&
    nowRows.length >= MIN_CHECKINS_PER_WINDOW;
  if (!ready) return base;

  const metrics = {} as Record<MetricKey, MetricComparison>;
  for (const m of ALL_METRICS) {
    const avg = (rows: CheckinRow[]) =>
      rows.reduce((s, c) => s + metricValue(c, m), 0) / rows.length;
    const baseline = avg(baselineRows);
    const now = avg(nowRows);
    metrics[m] = {
      baseline: Math.round(baseline),
      now: Math.round(now),
      deltaPts: Math.round(now - baseline),
      deltaPct: baseline > 0 ? Math.round(((now - baseline) / baseline) * 100) : null,
    };
  }
  return { ...base, ready: true, metrics };
}

/** Filter rows to the selected trailing range. */
export function filterRange<T>(
  rows: T[],
  range: RangeKey,
  getDate: (row: T) => string
): T[] {
  if (range === "all") return rows;
  const cutoff = Date.now() - parseInt(range, 10) * 86400000;
  return rows.filter((r) => new Date(getDate(r)).getTime() >= cutoff);
}

export interface SessionTypeSummary {
  type: SessionTypeKey | string;
  count: number;
  totalMinutes: number;
  avgFeel: number | null; // avg of the region's feelAfter dimension, 1-10
}

/** Group a region's contributing sessions by type with counts + avg feel. */
export function summarizeRegionSessions(
  sessions: SessionRow[],
  region: ImpactRegion
): SessionTypeSummary[] {
  const relevant = sessions.filter((s) =>
    (region.sessionTypes as string[]).includes(s.session_type)
  );
  const byType = new Map<string, SessionRow[]>();
  for (const s of relevant) {
    const list = byType.get(s.session_type) ?? [];
    list.push(s);
    byType.set(s.session_type, list);
  }
  return Array.from(byType.entries())
    .map(([type, rows]) => {
      const feels = rows
        .map((r) => r[region.feelAfter])
        .filter((v): v is number => typeof v === "number");
      return {
        type,
        count: rows.length,
        totalMinutes: rows.reduce((s, r) => s + (r.duration_minutes ?? 0), 0),
        avgFeel: feels.length
          ? Math.round((feels.reduce((s, v) => s + v, 0) / feels.length) * 10) / 10
          : null,
      };
    })
    .sort((a, b) => b.count - a.count);
}

/** Daily points of one metric across the range, for sparklines. */
export function metricSeries(
  checkins: CheckinRow[],
  metric: MetricKey
): { date: string; value: number }[] {
  return [...checkins]
    .sort((a, b) => a.checkin_date.localeCompare(b.checkin_date))
    .map((c) => ({ date: c.checkin_date, value: Math.round(metricValue(c, metric)) }));
}
