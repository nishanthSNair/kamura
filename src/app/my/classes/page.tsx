"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import LogSessionModal from "@/components/member/LogSessionModal";
import { DISCIPLINES, type ClassDiscipline, type DisciplineMeta } from "@/data/classes";
import type { SessionTypeKey } from "@/data/session-types";

interface SessionRow {
  session_type: string;
  performed_at: string;
  duration_minutes: number | null;
}

const PRACTICE_KEY = "kamura.practice.disciplines";
const GOALS_KEY = "kamura.practice.goals";

function startOfWeek(): Date {
  const d = new Date();
  const day = (d.getDay() + 6) % 7; // Monday = 0
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() - day);
  return d;
}

export default function MyClassesPage() {
  const supabase = createClient();
  const [sessions, setSessions] = useState<SessionRow[]>([]);
  const [practiced, setPracticed] = useState<ClassDiscipline[]>([]);
  const [goals, setGoals] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [logType, setLogType] = useState<SessionTypeKey | null>(null);
  const [editing, setEditing] = useState(false);

  async function load() {
    try {
      const rawP = localStorage.getItem(PRACTICE_KEY);
      if (rawP) setPracticed(JSON.parse(rawP));
      const rawG = localStorage.getItem(GOALS_KEY);
      if (rawG) setGoals(JSON.parse(rawG));
    } catch {
      /* ignore */
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      try {
        const raw = localStorage.getItem("kamura.guest.sessions");
        setSessions((raw ? JSON.parse(raw) : []) as SessionRow[]);
      } catch {
        /* ignore */
      }
      setLoading(false);
      return;
    }

    const ninetyDaysAgo = new Date(Date.now() - 90 * 86400000).toISOString();
    const { data } = await supabase
      .from("session_logs")
      .select("session_type, performed_at, duration_minutes")
      .eq("member_id", user.id)
      .gte("performed_at", ninetyDaysAgo)
      .order("performed_at", { ascending: false });
    setSessions((data as SessionRow[]) || []);
    setLoading(false);
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function togglePractice(key: ClassDiscipline) {
    setPracticed((cur) => {
      const next = cur.includes(key) ? cur.filter((k) => k !== key) : [...cur, key];
      try {
        localStorage.setItem(PRACTICE_KEY, JSON.stringify(next));
      } catch {
        /* ignore */
      }
      return next;
    });
  }

  function setGoal(key: ClassDiscipline, perWeek: number) {
    setGoals((cur) => {
      const next = { ...cur, [key]: perWeek };
      try {
        localStorage.setItem(GOALS_KEY, JSON.stringify(next));
      } catch {
        /* ignore */
      }
      return next;
    });
  }

  const stats = useMemo(() => {
    const weekStart = startOfWeek().getTime();
    const thirtyDaysAgo = Date.now() - 30 * 86400000;
    const byDiscipline: Record<
      string,
      { thisWeek: number; last30: number; lastAt: string | null; minutes30: number }
    > = {};
    for (const d of DISCIPLINES) {
      const rows = sessions.filter((s) => s.session_type === d.sessionType);
      const last30Rows = rows.filter((s) => new Date(s.performed_at).getTime() >= thirtyDaysAgo);
      byDiscipline[d.key] = {
        thisWeek: rows.filter((s) => new Date(s.performed_at).getTime() >= weekStart).length,
        last30: last30Rows.length,
        minutes30: last30Rows.reduce((sum, s) => sum + (s.duration_minutes ?? 0), 0),
        lastAt: rows[0]?.performed_at ?? null,
      };
    }
    return byDiscipline;
  }, [sessions]);

  const active = DISCIPLINES.filter((d) => practiced.includes(d.key));
  const showPicker = editing || active.length === 0;

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
        <div>
          <p className="text-[10px] tracking-[0.3em] uppercase text-terracotta font-sans mb-2">
            Classes
          </p>
          <h1 className="font-serif text-3xl md:text-4xl text-gray-900 leading-tight mb-2">
            Your practice
          </h1>
          <p className="text-sm text-gray-500 font-sans max-w-xl">
            Pick your disciplines, set a weekly rhythm, log every class — it all feeds your
            Impact view.
          </p>
        </div>
        <Link
          href="/classes"
          className="inline-flex px-5 py-2.5 rounded-full border border-gray-300 text-xs tracking-[0.12em] uppercase font-semibold font-sans text-gray-700 hover:border-terracotta hover:text-terracotta transition-colors"
        >
          Find classes in the UAE →
        </Link>
      </div>

      {loading ? (
        <div className="grid md:grid-cols-2 gap-4">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-40 bg-[#E7F3EB] rounded-3xl animate-pulse"
              style={{ animationDelay: `${i * 60}ms` }}
            />
          ))}
        </div>
      ) : (
        <>
          {/* Discipline picker */}
          {showPicker && (
            <section className="mb-8 p-6 bg-white rounded-3xl border border-gray-200">
              <h2 className="font-serif text-xl text-gray-900 mb-1">
                {active.length === 0 ? "What do you practice?" : "Edit your practices"}
              </h2>
              <p className="text-xs text-gray-500 font-sans mb-5">
                Choose everything you do — each gets its own rhythm tracking.
              </p>
              <div className="flex flex-wrap gap-2">
                {DISCIPLINES.map((d) => {
                  const on = practiced.includes(d.key);
                  return (
                    <button
                      key={d.key}
                      onClick={() => togglePractice(d.key)}
                      className={`px-4 py-2.5 rounded-full text-sm font-sans font-medium border transition-colors ${
                        on
                          ? "bg-terracotta text-white border-terracotta"
                          : "bg-white text-gray-700 border-gray-200 hover:border-terracotta/50"
                      }`}
                    >
                      {on ? "✓ " : ""}
                      {d.label}
                    </button>
                  );
                })}
              </div>
              {active.length > 0 && (
                <button
                  onClick={() => setEditing(false)}
                  className="mt-5 text-xs tracking-[0.12em] uppercase font-semibold font-sans text-terracotta hover:underline"
                >
                  Done
                </button>
              )}
            </section>
          )}

          {/* Practice cards */}
          {active.length > 0 && (
            <div className="grid md:grid-cols-2 gap-4">
              {active.map((d) => (
                <PracticeCard
                  key={d.key}
                  discipline={d}
                  stat={stats[d.key]}
                  goal={goals[d.key] ?? 2}
                  onGoal={(n) => setGoal(d.key, n)}
                  onLog={() => setLogType(d.sessionType)}
                />
              ))}
            </div>
          )}

          {!showPicker && (
            <button
              onClick={() => setEditing(true)}
              className="mt-6 text-xs tracking-[0.12em] uppercase font-semibold font-sans text-gray-400 hover:text-terracotta transition-colors"
            >
              Edit practices
            </button>
          )}
        </>
      )}

      {logType && (
        <LogSessionModal
          initialType={logType}
          onClose={() => setLogType(null)}
          onDone={() => {
            setLogType(null);
            load();
          }}
        />
      )}
    </>
  );
}

function PracticeCard({
  discipline,
  stat,
  goal,
  onGoal,
  onLog,
}: {
  discipline: DisciplineMeta;
  stat: { thisWeek: number; last30: number; lastAt: string | null; minutes30: number };
  goal: number;
  onGoal: (n: number) => void;
  onLog: () => void;
}) {
  const pct = Math.min(100, (stat.thisWeek / goal) * 100);
  const met = stat.thisWeek >= goal;
  const lastLabel = stat.lastAt
    ? new Date(stat.lastAt).toLocaleDateString(undefined, { month: "short", day: "numeric" })
    : "never";

  return (
    <div className="p-6 bg-white rounded-3xl border border-gray-200">
      <div className="flex items-start justify-between gap-3 mb-4">
        <div>
          <h3 className="font-serif text-xl text-gray-900">{discipline.label}</h3>
          <p className="text-[11px] text-gray-400 font-sans">Last class: {lastLabel}</p>
        </div>
        <button
          onClick={onLog}
          className="shrink-0 px-4 py-2 rounded-full bg-terracotta hover:bg-terracotta-dark text-white text-[10px] tracking-[0.12em] uppercase font-semibold font-sans transition-colors"
        >
          + Log class
        </button>
      </div>

      {/* Weekly rhythm */}
      <div className="mb-4">
        <div className="flex justify-between items-baseline mb-1.5">
          <p className="text-[11px] tracking-[0.15em] uppercase text-gray-400 font-sans">
            This week
          </p>
          <p
            className={`text-xs font-sans font-semibold ${met ? "text-sage-dark" : "text-gray-600"}`}
          >
            {stat.thisWeek} / {goal} {met && "✓"}
          </p>
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${met ? "bg-sage-dark" : "bg-terracotta"}`}
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 pt-3 border-t border-gray-100">
        <p className="text-xs text-gray-500 font-sans">
          {stat.last30} class{stat.last30 !== 1 ? "es" : ""}
          {stat.minutes30 > 0 ? ` · ${stat.minutes30} min` : ""} in 30 days
        </p>
        <div className="flex items-center gap-1">
          <span className="text-[10px] text-gray-400 font-sans mr-1">goal/wk</span>
          {[1, 2, 3, 5].map((n) => (
            <button
              key={n}
              onClick={() => onGoal(n)}
              className={`w-6 h-6 rounded-full text-[11px] font-sans font-semibold transition-colors ${
                goal === n
                  ? "bg-[#173C3B] text-white"
                  : "bg-gray-100 text-gray-500 hover:bg-gray-200"
              }`}
            >
              {n}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
