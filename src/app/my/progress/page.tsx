"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

interface Checkin {
  checkin_date: string;
  overall_score: number;
  energy: number;
  mood: number;
  sleep_quality: number;
  stress: number;
}

interface DoseLogRow {
  logged_at: string;
  protocol_item_id: string;
}

export default function ProgressPage() {
  const supabase = createClient();
  const [checkins, setCheckins] = useState<Checkin[]>([]);
  const [doseCount, setDoseCount] = useState(0);
  const [itemCount, setItemCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      const thirtyDaysAgo = new Date(Date.now() - 30 * 86400000).toISOString().split("T")[0];
      const thirtyDaysAgoIso = new Date(Date.now() - 30 * 86400000).toISOString();

      const [checkinsRes, logsRes, itemsRes] = await Promise.all([
        supabase
          .from("wellness_checkins")
          .select("*")
          .eq("member_id", user.id)
          .gte("checkin_date", thirtyDaysAgo)
          .order("checkin_date", { ascending: true }),
        supabase
          .from("dose_logs")
          .select("logged_at, protocol_item_id")
          .eq("member_id", user.id)
          .gte("logged_at", thirtyDaysAgoIso),
        supabase
          .from("protocol_items")
          .select("id", { count: "exact", head: true })
          .eq("member_id", user.id)
          .eq("active", true),
      ]);

      setCheckins((checkinsRes.data as Checkin[]) || []);
      setDoseCount(((logsRes.data as DoseLogRow[]) || []).length);
      setItemCount(itemsRes.count || 0);
      setLoading(false);
    }
    load();
  }, [supabase]);

  const hasData = checkins.length > 0;

  const avg =
    hasData
      ? Math.round(checkins.reduce((s, c) => s + c.overall_score, 0) / checkins.length)
      : null;
  const latest = hasData ? checkins[checkins.length - 1].overall_score : null;
  const first = hasData ? checkins[0].overall_score : null;
  const delta = latest !== null && first !== null ? latest - first : null;

  // Simple streak — count consecutive days ending yesterday/today
  const today = new Date().toISOString().split("T")[0];
  let streak = 0;
  const dates = new Set(checkins.map((c) => c.checkin_date));
  const check = new Date();
  if (dates.has(today)) {
    streak = 1;
    for (let i = 1; i < 365; i++) {
      const d = new Date(check);
      d.setDate(d.getDate() - i);
      const iso = d.toISOString().split("T")[0];
      if (dates.has(iso)) streak++;
      else break;
    }
  }

  return (
    <>
      <div className="mb-8">
        <p className="text-[10px] tracking-[0.3em] uppercase text-terracotta font-sans mb-2">
          Progress
        </p>
        <h1 className="font-serif text-3xl md:text-4xl text-gray-900 leading-tight mb-3">
          Are you getting better?
        </h1>
        <p className="text-sm text-gray-500 font-sans max-w-xl">
          Last 30 days of check-ins, adherence, and trend lines.
        </p>
      </div>

      {loading ? (
        <p className="text-sm text-gray-400 font-sans">Loading...</p>
      ) : !hasData ? (
        <div className="p-12 rounded-2xl bg-white border border-dashed border-gray-300 text-center">
          <p className="font-serif text-xl text-gray-900 mb-2">No data yet</p>
          <p className="text-sm text-gray-500 font-sans max-w-md mx-auto">
            Log your first daily check-in from the Today screen. Trends appear
            after a few days.
          </p>
        </div>
      ) : (
        <>
          {/* Summary stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
            <StatTile label="Latest Score" value={latest ?? "—"} />
            <StatTile label="30-day Avg" value={avg ?? "—"} />
            <StatTile
              label="Trend"
              value={delta !== null ? (delta >= 0 ? `+${delta}` : `${delta}`) : "—"}
              color={delta !== null ? (delta > 0 ? "text-emerald-700" : delta < 0 ? "text-red-600" : "") : ""}
            />
            <StatTile label="Streak" value={streak > 0 ? `${streak}d` : "—"} />
          </div>

          {/* Wellness Score line chart */}
          <section className="p-5 md:p-6 bg-white rounded-2xl border border-gray-200 mb-6">
            <h2 className="font-serif text-xl text-gray-900 mb-1">Wellness Score</h2>
            <p className="text-xs text-gray-500 font-sans mb-6">Last 30 days</p>
            <LineChart checkins={checkins} />
          </section>

          {/* Dimensions breakdown */}
          <section className="p-5 md:p-6 bg-white rounded-2xl border border-gray-200 mb-6">
            <h2 className="font-serif text-xl text-gray-900 mb-5">Dimensions</h2>
            <DimensionsBars checkins={checkins} />
          </section>

          {/* Protocol adherence */}
          {itemCount > 0 && (
            <section className="p-5 md:p-6 bg-white rounded-2xl border border-gray-200">
              <h2 className="font-serif text-xl text-gray-900 mb-1">
                Protocol adherence
              </h2>
              <p className="text-xs text-gray-500 font-sans mb-4">
                Last 30 days, across {itemCount} active item{itemCount !== 1 ? "s" : ""}
              </p>
              <div className="flex items-baseline gap-3">
                <p className="font-serif text-5xl text-gray-900">{doseCount}</p>
                <p className="text-sm text-gray-500 font-sans">doses logged</p>
              </div>
            </section>
          )}
        </>
      )}
    </>
  );
}

function StatTile({
  label,
  value,
  color = "",
}: {
  label: string;
  value: string | number;
  color?: string;
}) {
  return (
    <div className="p-4 rounded-2xl bg-white border border-gray-200">
      <p className="text-[10px] tracking-[0.2em] uppercase text-gray-400 font-sans mb-1">
        {label}
      </p>
      <p className={`font-serif text-2xl text-gray-900 ${color}`}>{value}</p>
    </div>
  );
}

function LineChart({ checkins }: { checkins: Checkin[] }) {
  if (checkins.length === 0) return null;

  const width = 800;
  const height = 220;
  const padding = { top: 20, right: 20, bottom: 30, left: 40 };
  const chartW = width - padding.left - padding.right;
  const chartH = height - padding.top - padding.bottom;

  // Build a date range covering last 30 days
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - 29);

  const totalDays = 30;
  const points = checkins.map((c) => {
    const d = new Date(c.checkin_date);
    const daysFromStart = (d.getTime() - startDate.getTime()) / 86400000;
    const x = padding.left + (daysFromStart / (totalDays - 1)) * chartW;
    const y = padding.top + (1 - c.overall_score / 100) * chartH;
    return { x, y, score: c.overall_score, date: c.checkin_date };
  });

  const path = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`)
    .join(" ");

  const yTicks = [0, 25, 50, 75, 100];

  return (
    <div className="overflow-x-auto">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full min-w-[500px]">
        {/* Y grid lines */}
        {yTicks.map((y) => {
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

        {/* Line */}
        {points.length > 1 && (
          <path
            d={path}
            fill="none"
            stroke="#B5736A"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}

        {/* Points */}
        {points.map((p, i) => (
          <circle
            key={i}
            cx={p.x}
            cy={p.y}
            r="3.5"
            fill="#B5736A"
          />
        ))}

        {/* X axis labels */}
        <text x={padding.left} y={height - 8} fill="#9CA3AF" fontSize="10" fontFamily="sans-serif">
          {startDate.toLocaleDateString(undefined, { month: "short", day: "numeric" })}
        </text>
        <text
          x={width - padding.right}
          y={height - 8}
          fill="#9CA3AF"
          fontSize="10"
          textAnchor="end"
          fontFamily="sans-serif"
        >
          {endDate.toLocaleDateString(undefined, { month: "short", day: "numeric" })}
        </text>
      </svg>
    </div>
  );
}

function DimensionsBars({ checkins }: { checkins: Checkin[] }) {
  if (checkins.length === 0) return null;

  const avgEnergy = checkins.reduce((s, c) => s + c.energy, 0) / checkins.length;
  const avgMood = checkins.reduce((s, c) => s + c.mood, 0) / checkins.length;
  const avgSleep = checkins.reduce((s, c) => s + c.sleep_quality, 0) / checkins.length;
  const avgStress = checkins.reduce((s, c) => s + c.stress, 0) / checkins.length;

  const dims = [
    { label: "Energy", value: avgEnergy, inverted: false },
    { label: "Mood", value: avgMood, inverted: false },
    { label: "Sleep", value: avgSleep, inverted: false },
    { label: "Stress", value: avgStress, inverted: true },
  ];

  return (
    <div className="space-y-4">
      {dims.map((d) => {
        const displayPct = d.inverted ? ((6 - d.value) / 5) * 100 : (d.value / 5) * 100;
        return (
          <div key={d.label}>
            <div className="flex justify-between items-baseline mb-1.5">
              <p className="text-sm font-sans text-gray-700">{d.label}</p>
              <p className="text-xs font-sans text-gray-400">
                {d.value.toFixed(1)} / 5 {d.inverted && "(lower is better)"}
              </p>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-terracotta rounded-full transition-all"
                style={{ width: `${displayPct}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
