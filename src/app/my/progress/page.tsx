"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import ImpactBody from "@/components/member/ImpactBody";
import ImpactDrilldown from "@/components/member/ImpactDrilldown";
import ImpactPanels from "@/components/member/ImpactPanels";
import {
  computeComparison,
  filterRange,
  IMPACT_REGIONS,
  MIN_SPAN_DAYS,
  RANGE_OPTIONS,
  type CheckinRow,
  type DoseRow,
  type RangeKey,
  type SessionRow,
} from "@/lib/impact";

export default function ProgressPage() {
  const supabase = createClient();
  const [allCheckins, setAllCheckins] = useState<CheckinRow[]>([]);
  const [allSessions, setAllSessions] = useState<SessionRow[]>([]);
  const [allDoses, setAllDoses] = useState<DoseRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [range, setRange] = useState<RangeKey>("30");
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      // Guest mode — everything the member tried before signing up, honestly
      if (!user) {
        try {
          const rawCheckins = localStorage.getItem("kamura.guest.checkins");
          setAllCheckins((rawCheckins ? JSON.parse(rawCheckins) : []) as CheckinRow[]);
          const rawSessions = localStorage.getItem("kamura.guest.sessions");
          setAllSessions((rawSessions ? JSON.parse(rawSessions) : []) as SessionRow[]);
        } catch {
          /* ignore */
        }
        setLoading(false);
        return;
      }

      const [checkinsRes, sessionsRes, dosesRes] = await Promise.all([
        supabase
          .from("wellness_checkins")
          .select("checkin_date, overall_score, energy, mood, sleep_quality, stress")
          .eq("member_id", user.id)
          .order("checkin_date", { ascending: true })
          .limit(365),
        supabase
          .from("session_logs")
          .select(
            "id, session_type, performed_at, duration_minutes, energy_after, clarity_after, calm_after"
          )
          .eq("member_id", user.id)
          .order("performed_at", { ascending: false })
          .limit(500),
        supabase
          .from("dose_logs")
          .select("logged_at")
          .eq("member_id", user.id)
          .eq("skipped", false)
          .order("logged_at", { ascending: false })
          .limit(1000),
      ]);

      setAllCheckins((checkinsRes.data as CheckinRow[]) || []);
      setAllSessions((sessionsRes.data as SessionRow[]) || []);
      setAllDoses((dosesRes.data as DoseRow[]) || []);
      setLoading(false);
    }
    load();
  }, [supabase]);

  const checkins = useMemo(
    () => filterRange(allCheckins, range, (c) => c.checkin_date),
    [allCheckins, range]
  );
  const sessions = useMemo(
    () => filterRange(allSessions, range, (s) => s.performed_at),
    [allSessions, range]
  );
  const doses = useMemo(
    () => filterRange(allDoses, range, (d) => d.logged_at),
    [allDoses, range]
  );

  const comparison = useMemo(() => computeComparison(checkins), [checkins]);

  const regionSessionCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const region of IMPACT_REGIONS) {
      counts[region.key] = sessions.filter((s) =>
        (region.sessionTypes as string[]).includes(s.session_type)
      ).length;
    }
    return counts;
  }, [sessions]);

  const region = IMPACT_REGIONS.find((r) => r.key === selectedRegion) ?? null;
  const rangeLabel = RANGE_OPTIONS.find((r) => r.key === range)?.label ?? "";
  const hasAnyData = allCheckins.length > 0 || allSessions.length > 0;

  return (
    <>
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
        <div>
          <p className="text-[10px] tracking-[0.3em] uppercase text-terracotta font-sans mb-2">
            Your impact
          </p>
          <h1 className="font-serif text-3xl md:text-4xl text-gray-900 leading-tight mb-2">
            You · Now vs. Baseline
          </h1>
          <p className="text-sm text-gray-500 font-sans max-w-xl">
            Your logged check-ins and sessions, compared against your first week. Real numbers
            only — nothing here is projected.
          </p>
        </div>

        {/* Time range toggle */}
        <div className="flex items-center gap-1 p-1 rounded-full bg-white border border-gray-200">
          {RANGE_OPTIONS.map((opt) => (
            <button
              key={opt.key}
              onClick={() => setRange(opt.key)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-sans font-semibold transition-colors ${
                range === opt.key
                  ? "bg-terracotta text-white"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 h-[480px] bg-[#E7F3EB] rounded-3xl animate-pulse" />
          <div className="space-y-4">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="h-36 bg-[#E7F3EB] rounded-3xl animate-pulse"
                style={{ animationDelay: `${i * 60}ms` }}
              />
            ))}
          </div>
        </div>
      ) : !hasAnyData ? (
        <div className="p-12 rounded-3xl bg-white border border-dashed border-gray-300 text-center">
          <p className="font-serif text-xl text-gray-900 mb-2">Your impact starts with day one</p>
          <p className="text-sm text-gray-500 font-sans max-w-md mx-auto mb-6">
            Log your first daily check-in and your sessions from the Today screen. After two
            weeks, this page shows how your body is actually responding.
          </p>
          <Link
            href="/my"
            className="inline-flex px-6 py-3 bg-terracotta hover:bg-terracotta-dark text-white text-xs tracking-[0.15em] uppercase font-semibold font-sans rounded-full transition-colors"
          >
            Go to Today
          </Link>
        </div>
      ) : (
        <>
          {/* Building-baseline notice — shown until the comparison is honest */}
          {!comparison.ready && (
            <div className="mb-6 p-5 rounded-3xl bg-white border border-gray-200 flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="font-serif text-lg text-gray-900 mb-1">
                  Building your baseline
                </p>
                <p className="text-xs text-gray-500 font-sans max-w-md">
                  {comparison.daysLogged} day{comparison.daysLogged !== 1 ? "s" : ""} logged
                  {rangeLabel !== "All time" ? ` in the last ${rangeLabel.toLowerCase()}` : ""}.
                  Comparisons unlock once your check-ins span {MIN_SPAN_DAYS} days — we won&apos;t
                  show you numbers we can&apos;t stand behind.
                </p>
              </div>
              <div className="w-full sm:w-56">
                <div className="flex justify-between text-[10px] text-gray-400 font-sans mb-1">
                  <span>Day {Math.min(comparison.spanDays, MIN_SPAN_DAYS)}</span>
                  <span>{MIN_SPAN_DAYS} days</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-terracotta rounded-full transition-all"
                    style={{
                      width: `${Math.min(100, (comparison.spanDays / MIN_SPAN_DAYS) * 100)}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          )}

          <div className="grid lg:grid-cols-3 gap-6 items-start">
            {/* Body canvas */}
            <section className="lg:col-span-2 p-6 md:p-10 bg-white rounded-3xl border border-gray-200 overflow-hidden">
              <ImpactBody
                comparison={comparison}
                regionSessionCounts={regionSessionCounts}
                selectedRegion={selectedRegion}
                onSelectRegion={(key) =>
                  setSelectedRegion((cur) => (cur === key ? null : key))
                }
              />
            </section>

            {/* Comparison panels */}
            <ImpactPanels
              comparison={comparison}
              rangeLabel={rangeLabel}
              checkinCount={checkins.length}
              sessionCount={sessions.length}
              doseCount={doses.length}
            />
          </div>

          {/* Drill-down */}
          {region && (
            <div className="mt-6">
              <ImpactDrilldown
                region={region}
                comparison={comparison}
                checkins={checkins}
                sessions={sessions}
                doseCount={doses.length}
                onClose={() => setSelectedRegion(null)}
              />
            </div>
          )}

          {/* Trend */}
          {checkins.length > 1 && (
            <section className="mt-6 p-5 md:p-6 bg-white rounded-3xl border border-gray-200">
              <h2 className="font-serif text-xl text-gray-900 mb-1">Wellness score trend</h2>
              <p className="text-xs text-gray-500 font-sans mb-6">
                Every check-in, {rangeLabel.toLowerCase()}
              </p>
              <TrendChart checkins={checkins} />
            </section>
          )}
        </>
      )}
    </>
  );
}

function TrendChart({ checkins }: { checkins: CheckinRow[] }) {
  const sorted = [...checkins].sort((a, b) => a.checkin_date.localeCompare(b.checkin_date));
  if (sorted.length < 2) return null;

  const width = 800;
  const height = 220;
  const padding = { top: 20, right: 20, bottom: 30, left: 40 };
  const chartW = width - padding.left - padding.right;
  const chartH = height - padding.top - padding.bottom;

  const start = new Date(sorted[0].checkin_date + "T00:00:00").getTime();
  const end = new Date(sorted[sorted.length - 1].checkin_date + "T00:00:00").getTime();
  const span = Math.max(end - start, 86400000);

  const points = sorted.map((c) => {
    const t = new Date(c.checkin_date + "T00:00:00").getTime();
    return {
      x: padding.left + ((t - start) / span) * chartW,
      y: padding.top + (1 - c.overall_score / 100) * chartH,
    };
  });

  const path = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`)
    .join(" ");

  const fmt = (iso: string) =>
    new Date(iso + "T00:00:00").toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
    });

  return (
    <div className="overflow-x-auto">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full min-w-[500px]">
        {[0, 25, 50, 75, 100].map((y) => {
          const yPos = padding.top + (1 - y / 100) * chartH;
          return (
            <g key={y}>
              <line
                x1={padding.left}
                x2={width - padding.right}
                y1={yPos}
                y2={yPos}
                stroke="#E5E7EB"
                strokeWidth="1"
                strokeDasharray={y === 0 || y === 100 ? "" : "2 3"}
              />
              <text
                x={padding.left - 8}
                y={yPos + 4}
                fill="#9CA3AF"
                fontSize="10"
                textAnchor="end"
                fontFamily="sans-serif"
              >
                {y}
              </text>
            </g>
          );
        })}

        <path
          d={path}
          fill="none"
          stroke="#00786E"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {points.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r="3.5" fill="#00786E" />
        ))}

        <text x={padding.left} y={height - 8} fill="#9CA3AF" fontSize="10" fontFamily="sans-serif">
          {fmt(sorted[0].checkin_date)}
        </text>
        <text
          x={width - padding.right}
          y={height - 8}
          fill="#9CA3AF"
          fontSize="10"
          textAnchor="end"
          fontFamily="sans-serif"
        >
          {fmt(sorted[sorted.length - 1].checkin_date)}
        </text>
      </svg>
    </div>
  );
}
