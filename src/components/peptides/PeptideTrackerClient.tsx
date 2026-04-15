"use client";

import { useEffect, useMemo, useState } from "react";
import { PEPTIDE_PROTOCOLS, type PeptideProtocol } from "@/data/peptide-protocols";

const STORAGE_KEY = "kamura.peptide.tracker.v1";

const INJECTION_SITES = [
  "Abdomen L",
  "Abdomen R",
  "Thigh L",
  "Thigh R",
  "Arm L",
  "Arm R",
];

interface DoseLog {
  id: string;
  cycleId: string;
  loggedAt: string;
  site: string | null;
  fasted: boolean | null;
  mood: number | null;
  energy: number | null;
  sleep: number | null;
  notes: string;
}

interface Cycle {
  id: string;
  slug: string;
  name: string;
  category: string;
  form: PeptideProtocol["form"];
  doseLabel: string;
  doseUnits: number | null;
  frequencyLabel: string;
  preferredTime: string;
  fastingRequired: boolean;
  fastingNote: string | null;
  penTotalDoses: number | null;
  cycleLengthDays: number | null;
  startDate: string;
  active: boolean;
  notes: string;
}

interface TrackerState {
  cycles: Cycle[];
  logs: DoseLog[];
}

const emptyState: TrackerState = { cycles: [], logs: [] };

function newId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function formatTime(iso: string) {
  const d = new Date(iso);
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function sameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function daysBetween(a: Date, b: Date) {
  const ms = b.getTime() - a.getTime();
  return Math.floor(ms / (1000 * 60 * 60 * 24));
}

export default function PeptideTrackerClient() {
  const [state, setState] = useState<TrackerState>(emptyState);
  const [mounted, setMounted] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [logCycleId, setLogCycleId] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setState(JSON.parse(raw));
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* ignore */
    }
  }, [state, mounted]);

  const activeCycles = state.cycles.filter((c) => c.active);

  const addCycle = (protocol: PeptideProtocol) => {
    const cycle: Cycle = {
      id: newId(),
      slug: protocol.slug,
      name: protocol.name,
      category: protocol.category,
      form: protocol.form,
      doseLabel: protocol.doseLabel,
      doseUnits: protocol.doseUnits,
      frequencyLabel: protocol.frequencyLabel,
      preferredTime: protocol.preferredTime,
      fastingRequired: protocol.fastingRequired,
      fastingNote: protocol.fastingNote,
      penTotalDoses: protocol.penTotalDoses,
      cycleLengthDays: protocol.cycleLengthDays,
      startDate: new Date().toISOString(),
      active: true,
      notes: "",
    };
    setState((s) => ({ ...s, cycles: [cycle, ...s.cycles] }));
    setShowAdd(false);
  };

  const quickLog = (cycleId: string) => {
    const cycle = state.cycles.find((c) => c.id === cycleId);
    if (!cycle) return;
    const log: DoseLog = {
      id: newId(),
      cycleId,
      loggedAt: new Date().toISOString(),
      site: null,
      fasted: null,
      mood: null,
      energy: null,
      sleep: null,
      notes: "",
    };
    setState((s) => ({ ...s, logs: [log, ...s.logs] }));
  };

  const saveDetailedLog = (log: DoseLog) => {
    setState((s) => ({ ...s, logs: [log, ...s.logs] }));
    setLogCycleId(null);
  };

  const removeCycle = (id: string) => {
    if (!confirm("Remove this cycle? All logs will remain in history.")) return;
    setState((s) => ({
      ...s,
      cycles: s.cycles.map((c) => (c.id === id ? { ...c, active: false } : c)),
    }));
  };

  const deleteLog = (id: string) => {
    setState((s) => ({ ...s, logs: s.logs.filter((l) => l.id !== id) }));
  };

  const resetAll = () => {
    if (!confirm("Erase all cycles and logs? This cannot be undone.")) return;
    setState(emptyState);
  };

  if (!mounted) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-16 text-center text-sm text-gray-400 font-sans">
        Loading tracker…
      </div>
    );
  }

  return (
    <>
      {/* Header */}
      <section className="border-b border-gray-200 bg-white">
        <div className="max-w-6xl mx-auto px-6 py-10 flex items-end justify-between flex-wrap gap-4">
          <div>
            <p className="text-[10px] tracking-[0.3em] uppercase text-terracotta font-sans mb-3">
              Kamura · Tracker
            </p>
            <h1 className="font-serif text-3xl md:text-4xl text-gray-900 leading-[1.1]">
              My Peptide Dashboard
            </h1>
            <p className="text-sm text-gray-500 font-sans mt-3 max-w-xl">
              Track active cycles, log doses, and get smart reminders. Data is
              stored privately on your device.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowAdd(true)}
              className="px-5 py-2.5 rounded-full bg-[#2a1612] text-white text-xs tracking-[0.15em] uppercase font-semibold font-sans hover:bg-[#1a0f0c] transition-colors"
            >
              + Add Peptide
            </button>
            {(state.cycles.length > 0 || state.logs.length > 0) && (
              <button
                onClick={resetAll}
                className="text-[10px] tracking-[0.15em] uppercase text-gray-400 hover:text-terracotta font-sans"
              >
                Reset
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Active Cycles */}
      <section className="py-14 bg-[#EDE7DB]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-baseline justify-between mb-7 pb-4 border-b border-gray-300/60">
            <h2 className="font-serif text-2xl text-gray-900">Active Cycles</h2>
            <span className="text-[10px] tracking-[0.2em] uppercase text-gray-400 font-sans">
              {activeCycles.length} running
            </span>
          </div>

          {activeCycles.length === 0 ? (
            <EmptyCycles onAdd={() => setShowAdd(true)} />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {activeCycles.map((c) => (
                <CycleCard
                  key={c.id}
                  cycle={c}
                  logs={state.logs.filter((l) => l.cycleId === c.id)}
                  onQuickLog={() => quickLog(c.id)}
                  onDetailedLog={() => setLogCycleId(c.id)}
                  onRemove={() => removeCycle(c.id)}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Timers + Calendar */}
      {activeCycles.length > 0 && (
        <section className="py-14 bg-white">
          <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-10">
            <TimersPanel cycles={activeCycles} logs={state.logs} />
            <CalendarPanel cycles={activeCycles} logs={state.logs} />
          </div>
        </section>
      )}

      {/* Recent Logs */}
      {state.logs.length > 0 && (
        <section className="py-14 bg-[#EDE7DB]">
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex items-baseline justify-between mb-7 pb-4 border-b border-gray-300/60">
              <h2 className="font-serif text-2xl text-gray-900">Recent Logs</h2>
              <span className="text-[10px] tracking-[0.2em] uppercase text-gray-400 font-sans">
                Last {Math.min(state.logs.length, 10)}
              </span>
            </div>
            <div className="divide-y divide-gray-300/60 border-y border-gray-300/60">
              {state.logs.slice(0, 10).map((log) => {
                const cycle = state.cycles.find((c) => c.id === log.cycleId);
                return (
                  <div
                    key={log.id}
                    className="py-4 flex items-center gap-4 text-sm font-sans"
                  >
                    <span className="text-xs text-gray-400 w-28 shrink-0">
                      {new Date(log.loggedAt).toLocaleDateString()}
                    </span>
                    <span className="text-gray-600 w-20 shrink-0">
                      {formatTime(log.loggedAt)}
                    </span>
                    <span className="font-serif text-base text-gray-900 flex-1 truncate">
                      {cycle?.name || "Unknown"}
                    </span>
                    {log.site && (
                      <span className="text-[10px] tracking-[0.15em] uppercase text-gray-400 hidden sm:inline">
                        {log.site}
                      </span>
                    )}
                    <button
                      onClick={() => deleteLog(log.id)}
                      className="text-[10px] tracking-[0.15em] uppercase text-gray-300 hover:text-terracotta"
                    >
                      Delete
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Disclaimer */}
      <section className="py-10 bg-white border-t border-gray-200">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-[11px] text-gray-400 font-sans leading-relaxed">
            Educational tracker, not a medical device. Follow your physician&apos;s
            prescription. Kamura does not store your health data — everything
            lives in your browser.
          </p>
        </div>
      </section>

      {/* Modals */}
      {showAdd && (
        <AddPeptideModal
          onClose={() => setShowAdd(false)}
          onAdd={addCycle}
          activeSlugs={new Set(activeCycles.map((c) => c.slug))}
        />
      )}
      {logCycleId && (
        <LogDoseModal
          cycle={state.cycles.find((c) => c.id === logCycleId)!}
          onClose={() => setLogCycleId(null)}
          onSave={saveDetailedLog}
        />
      )}
    </>
  );
}

/* ───────── Sub-components ───────── */

function EmptyCycles({ onAdd }: { onAdd: () => void }) {
  return (
    <div className="border border-dashed border-gray-300 rounded-2xl p-12 text-center bg-white/50">
      <p className="font-serif text-xl text-gray-900 mb-2">
        No active peptide cycles yet.
      </p>
      <p className="text-sm text-gray-500 font-sans mb-6 max-w-md mx-auto">
        Add your first peptide to start logging doses, tracking pen inventory,
        and getting smart reminders.
      </p>
      <button
        onClick={onAdd}
        className="px-5 py-2.5 rounded-full bg-[#2a1612] text-white text-xs tracking-[0.15em] uppercase font-semibold font-sans hover:bg-[#1a0f0c] transition-colors"
      >
        + Add Your First Peptide
      </button>
    </div>
  );
}

function CycleCard({
  cycle,
  logs,
  onQuickLog,
  onDetailedLog,
  onRemove,
}: {
  cycle: Cycle;
  logs: DoseLog[];
  onQuickLog: () => void;
  onDetailedLog: () => void;
  onRemove: () => void;
}) {
  const now = new Date();
  const start = new Date(cycle.startDate);
  const totalDoses = logs.length;
  const penProgress = cycle.penTotalDoses
    ? Math.min(100, (totalDoses / cycle.penTotalDoses) * 100)
    : 0;
  const cycleProgress = cycle.cycleLengthDays
    ? Math.min(100, (daysBetween(start, now) / cycle.cycleLengthDays) * 100)
    : 0;
  const lastLog = logs[0];
  const todayLog = logs.find((l) => sameDay(new Date(l.loggedAt), now));

  const dosesLeft = cycle.penTotalDoses
    ? Math.max(0, cycle.penTotalDoses - totalDoses)
    : null;
  const lowInventory = dosesLeft !== null && dosesLeft <= 3;

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 hover:border-terracotta/30 hover:shadow-md transition-all">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1 min-w-0">
          <p className="text-[10px] tracking-[0.2em] uppercase text-gray-400 font-sans mb-1.5">
            {cycle.category}
          </p>
          <h3 className="font-serif text-2xl text-gray-900 leading-tight">
            {cycle.name}
          </h3>
        </div>
        <button
          onClick={onRemove}
          className="text-[10px] tracking-[0.15em] uppercase text-gray-300 hover:text-terracotta font-sans ml-2 shrink-0"
          title="End cycle"
        >
          End
        </button>
      </div>

      <dl className="grid grid-cols-2 gap-x-4 gap-y-2 mb-5 text-xs font-sans">
        <dt className="text-gray-400 uppercase tracking-[0.1em] text-[10px]">Dose</dt>
        <dd className="text-gray-900 text-right">
          {cycle.doseLabel}
          {cycle.doseUnits && <span className="text-gray-400"> · {cycle.doseUnits}u</span>}
        </dd>
        <dt className="text-gray-400 uppercase tracking-[0.1em] text-[10px]">Frequency</dt>
        <dd className="text-gray-900 text-right">{cycle.frequencyLabel}</dd>
        <dt className="text-gray-400 uppercase tracking-[0.1em] text-[10px]">Timing</dt>
        <dd className="text-gray-900 text-right">{cycle.preferredTime}</dd>
        {cycle.fastingRequired && (
          <>
            <dt className="text-gray-400 uppercase tracking-[0.1em] text-[10px]">Fasting</dt>
            <dd className="text-amber-700 text-right">Required</dd>
          </>
        )}
      </dl>

      {/* Pen progress */}
      {cycle.penTotalDoses !== null && (
        <div className="mb-4">
          <div className="flex items-center justify-between text-[10px] tracking-[0.1em] uppercase text-gray-400 font-sans mb-1.5">
            <span>Pen Inventory</span>
            <span className={lowInventory ? "text-amber-700" : "text-gray-600"}>
              {dosesLeft ?? 0}/{cycle.penTotalDoses} left
            </span>
          </div>
          <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all ${
                lowInventory ? "bg-amber-500" : "bg-terracotta"
              }`}
              style={{ width: `${penProgress}%` }}
            />
          </div>
        </div>
      )}

      {/* Cycle progress */}
      {cycle.cycleLengthDays !== null && (
        <div className="mb-5">
          <div className="flex items-center justify-between text-[10px] tracking-[0.1em] uppercase text-gray-400 font-sans mb-1.5">
            <span>Cycle</span>
            <span className="text-gray-600">
              Day {daysBetween(start, now) + 1} of {cycle.cycleLengthDays}
            </span>
          </div>
          <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full bg-sage transition-all"
              style={{ width: `${cycleProgress}%` }}
            />
          </div>
        </div>
      )}

      {/* Status line */}
      <div className="text-[11px] font-sans text-gray-500 mb-4 flex items-center gap-2">
        {todayLog ? (
          <span className="inline-flex items-center gap-1.5 text-emerald-700">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            Logged today at {formatTime(todayLog.loggedAt)}
          </span>
        ) : lastLog ? (
          <span>Last dose {new Date(lastLog.loggedAt).toLocaleDateString()}</span>
        ) : (
          <span className="text-amber-700">No doses logged yet</span>
        )}
      </div>

      {/* CTAs */}
      <div className="flex items-center gap-2">
        <button
          onClick={onQuickLog}
          className="flex-1 px-4 py-2.5 rounded-full bg-[#2a1612] text-white text-[11px] tracking-[0.15em] uppercase font-semibold font-sans hover:bg-[#1a0f0c] transition-colors"
        >
          Quick Log
        </button>
        <button
          onClick={onDetailedLog}
          className="px-4 py-2.5 rounded-full border border-gray-300 text-gray-700 text-[11px] tracking-[0.15em] uppercase font-semibold font-sans hover:border-terracotta hover:text-terracotta transition-colors"
        >
          Detailed
        </button>
      </div>
    </div>
  );
}

function TimersPanel({ cycles, logs }: { cycles: Cycle[]; logs: DoseLog[] }) {
  const fasting = cycles.filter((c) => c.fastingRequired);
  const lowPens = cycles.filter((c) => {
    if (!c.penTotalDoses) return false;
    const used = logs.filter((l) => l.cycleId === c.id).length;
    return c.penTotalDoses - used <= 3;
  });

  return (
    <div>
      <div className="flex items-baseline justify-between mb-6 pb-4 border-b border-gray-200">
        <h2 className="font-serif text-2xl text-gray-900">Smart Reminders</h2>
        <span className="text-[10px] tracking-[0.2em] uppercase text-gray-400 font-sans">
          Today
        </span>
      </div>

      <div className="space-y-3">
        {fasting.length === 0 && lowPens.length === 0 && (
          <p className="text-sm text-gray-400 font-sans italic">
            No active reminders. You&apos;re all set.
          </p>
        )}

        {fasting.map((c) => (
          <div
            key={`f-${c.id}`}
            className="p-4 rounded-xl border border-amber-200 bg-amber-50/60"
          >
            <p className="text-[10px] tracking-[0.2em] uppercase text-amber-700 font-sans mb-1">
              Fasting Protocol
            </p>
            <p className="font-serif text-lg text-gray-900 mb-1">{c.name}</p>
            <p className="text-xs text-gray-600 font-sans leading-relaxed">
              {c.fastingNote || "Fasting required around this dose."}
            </p>
          </div>
        ))}

        {lowPens.map((c) => {
          const used = logs.filter((l) => l.cycleId === c.id).length;
          const left = (c.penTotalDoses || 0) - used;
          return (
            <div
              key={`p-${c.id}`}
              className="p-4 rounded-xl border border-red-200 bg-red-50/50"
            >
              <p className="text-[10px] tracking-[0.2em] uppercase text-red-700 font-sans mb-1">
                Pen Reorder
              </p>
              <p className="font-serif text-lg text-gray-900 mb-1">{c.name}</p>
              <p className="text-xs text-gray-600 font-sans">
                {left} dose{left === 1 ? "" : "s"} remaining — reorder soon.
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function CalendarPanel({ cycles, logs }: { cycles: Cycle[]; logs: DoseLog[] }) {
  const [offset, setOffset] = useState(0);
  const base = new Date();
  base.setMonth(base.getMonth() + offset);
  const year = base.getFullYear();
  const month = base.getMonth();
  const monthName = base.toLocaleString("default", { month: "long" });
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();

  const dotsByDay = useMemo(() => {
    const map = new Map<number, Cycle[]>();
    logs.forEach((log) => {
      const d = new Date(log.loggedAt);
      if (d.getFullYear() === year && d.getMonth() === month) {
        const day = d.getDate();
        const cycle = cycles.find((c) => c.id === log.cycleId);
        if (!cycle) return;
        const arr = map.get(day) || [];
        if (!arr.find((c) => c.id === cycle.id)) arr.push(cycle);
        map.set(day, arr);
      }
    });
    return map;
  }, [logs, cycles, year, month]);

  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const today = new Date();

  return (
    <div>
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
        <h2 className="font-serif text-2xl text-gray-900">
          {monthName} {year}
        </h2>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setOffset(offset - 1)}
            className="w-8 h-8 rounded-full border border-gray-200 text-gray-500 hover:border-terracotta hover:text-terracotta transition-colors text-sm"
          >
            ‹
          </button>
          <button
            onClick={() => setOffset(0)}
            className="px-3 h-8 rounded-full border border-gray-200 text-[10px] tracking-[0.15em] uppercase text-gray-500 hover:border-terracotta hover:text-terracotta font-sans"
          >
            Today
          </button>
          <button
            onClick={() => setOffset(offset + 1)}
            className="w-8 h-8 rounded-full border border-gray-200 text-gray-500 hover:border-terracotta hover:text-terracotta transition-colors text-sm"
          >
            ›
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 text-[10px] tracking-[0.1em] uppercase text-gray-400 font-sans mb-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d} className="text-center py-1">
            {d}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {cells.map((d, i) => {
          if (d === null) return <div key={i} />;
          const isToday =
            offset === 0 &&
            d === today.getDate() &&
            month === today.getMonth() &&
            year === today.getFullYear();
          const logged = dotsByDay.get(d) || [];
          return (
            <div
              key={i}
              className={`aspect-square border rounded-lg p-1.5 flex flex-col ${
                isToday
                  ? "border-terracotta bg-terracotta/5"
                  : "border-gray-100 bg-white"
              }`}
            >
              <span
                className={`text-[10px] font-sans ${
                  isToday ? "text-terracotta font-semibold" : "text-gray-500"
                }`}
              >
                {d}
              </span>
              {logged.length > 0 && (
                <div className="flex gap-0.5 mt-auto flex-wrap">
                  {logged.slice(0, 3).map((c) => (
                    <span
                      key={c.id}
                      className="w-1.5 h-1.5 rounded-full bg-terracotta"
                      title={c.name}
                    />
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function AddPeptideModal({
  onClose,
  onAdd,
  activeSlugs,
}: {
  onClose: () => void;
  onAdd: (p: PeptideProtocol) => void;
  activeSlugs: Set<string>;
}) {
  const [query, setQuery] = useState("");
  const filtered = PEPTIDE_PROTOCOLS.filter(
    (p) =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div
      className="fixed inset-0 z-50 bg-[#1a0f0c]/80 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-serif text-2xl text-gray-900">Add Peptide</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-terracotta text-xl"
            >
              ×
            </button>
          </div>
          <input
            autoFocus
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search peptides or categories…"
            className="w-full px-4 py-3 rounded-full border border-gray-200 text-sm font-sans focus:outline-none focus:border-terracotta"
          />
        </div>

        <div className="flex-1 overflow-y-auto divide-y divide-gray-100">
          {filtered.map((p) => {
            const isActive = activeSlugs.has(p.slug);
            return (
              <button
                key={p.slug}
                onClick={() => !isActive && onAdd(p)}
                disabled={isActive}
                className={`w-full text-left p-5 flex items-start gap-4 transition-colors ${
                  isActive
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-[#EDE7DB]/50"
                }`}
              >
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] tracking-[0.2em] uppercase text-gray-400 font-sans mb-1">
                    {p.category}
                  </p>
                  <h4 className="font-serif text-lg text-gray-900 mb-1">
                    {p.name}
                  </h4>
                  <p className="text-xs text-gray-500 font-sans">
                    {p.doseLabel} · {p.frequencyLabel} · {p.preferredTime}
                  </p>
                </div>
                <span
                  className={`text-[10px] tracking-[0.15em] uppercase font-sans font-semibold shrink-0 ${
                    isActive ? "text-gray-400" : "text-terracotta"
                  }`}
                >
                  {isActive ? "Active" : "Add →"}
                </span>
              </button>
            );
          })}
          {filtered.length === 0 && (
            <p className="p-8 text-center text-sm text-gray-400 font-sans italic">
              No peptides match &ldquo;{query}&rdquo;
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

function LogDoseModal({
  cycle,
  onClose,
  onSave,
}: {
  cycle: Cycle;
  onClose: () => void;
  onSave: (log: DoseLog) => void;
}) {
  const [site, setSite] = useState<string>(INJECTION_SITES[0]);
  const [fasted, setFasted] = useState<boolean | null>(null);
  const [mood, setMood] = useState<number | null>(null);
  const [energy, setEnergy] = useState<number | null>(null);
  const [sleep, setSleep] = useState<number | null>(null);
  const [notes, setNotes] = useState("");

  const submit = () => {
    onSave({
      id: newId(),
      cycleId: cycle.id,
      loggedAt: new Date().toISOString(),
      site: cycle.form === "injection" ? site : null,
      fasted,
      mood,
      energy,
      sleep,
      notes,
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-[#1a0f0c]/80 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <div>
            <p className="text-[10px] tracking-[0.2em] uppercase text-terracotta font-sans">
              Log Dose
            </p>
            <h3 className="font-serif text-2xl text-gray-900">{cycle.name}</h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-terracotta text-xl"
          >
            ×
          </button>
        </div>

        <div className="p-6 space-y-6">
          {cycle.form === "injection" && (
            <div>
              <label className="text-[10px] tracking-[0.2em] uppercase text-gray-500 font-sans block mb-3">
                Injection Site
              </label>
              <div className="grid grid-cols-3 gap-2">
                {INJECTION_SITES.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSite(s)}
                    className={`py-2.5 rounded-full border text-xs font-sans transition-colors ${
                      site === s
                        ? "border-terracotta bg-terracotta/10 text-terracotta font-semibold"
                        : "border-gray-200 text-gray-600 hover:border-gray-300"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {cycle.fastingRequired && (
            <div>
              <label className="text-[10px] tracking-[0.2em] uppercase text-gray-500 font-sans block mb-3">
                Fasted?
              </label>
              <div className="flex gap-2">
                {[
                  { v: true, label: "Yes" },
                  { v: false, label: "No" },
                ].map((opt) => (
                  <button
                    key={opt.label}
                    onClick={() => setFasted(opt.v)}
                    className={`flex-1 py-2.5 rounded-full border text-xs font-sans transition-colors ${
                      fasted === opt.v
                        ? "border-terracotta bg-terracotta/10 text-terracotta font-semibold"
                        : "border-gray-200 text-gray-600 hover:border-gray-300"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          <RatingRow label="Mood" value={mood} setValue={setMood} />
          <RatingRow label="Energy" value={energy} setValue={setEnergy} />
          <RatingRow label="Sleep" value={sleep} setValue={setSleep} />

          <div>
            <label className="text-[10px] tracking-[0.2em] uppercase text-gray-500 font-sans block mb-3">
              Notes
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              placeholder="How did it feel? Any side effects?"
              className="w-full px-4 py-3 rounded-2xl border border-gray-200 text-sm font-sans focus:outline-none focus:border-terracotta resize-none"
            />
          </div>
        </div>

        <div className="p-6 border-t border-gray-200 flex items-center gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 rounded-full border border-gray-200 text-gray-700 text-xs tracking-[0.15em] uppercase font-semibold font-sans hover:border-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={submit}
            className="flex-1 px-4 py-3 rounded-full bg-[#2a1612] text-white text-xs tracking-[0.15em] uppercase font-semibold font-sans hover:bg-[#1a0f0c]"
          >
            Save Log
          </button>
        </div>
      </div>
    </div>
  );
}

function RatingRow({
  label,
  value,
  setValue,
}: {
  label: string;
  value: number | null;
  setValue: (v: number) => void;
}) {
  return (
    <div>
      <label className="text-[10px] tracking-[0.2em] uppercase text-gray-500 font-sans block mb-3">
        {label}
      </label>
      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            onClick={() => setValue(n)}
            className={`flex-1 py-2.5 rounded-full border text-xs font-sans transition-colors ${
              value === n
                ? "border-terracotta bg-terracotta/10 text-terracotta font-semibold"
                : "border-gray-200 text-gray-600 hover:border-gray-300"
            }`}
          >
            {n}
          </button>
        ))}
      </div>
    </div>
  );
}
