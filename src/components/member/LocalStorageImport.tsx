"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

const STORAGE_KEY = "kamura.peptide.tracker.v1";

type LocalCycle = {
  id: string;
  slug: string;
  name: string;
  category: string;
  form: string;
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
};

type LocalLog = {
  id: string;
  cycleId: string;
  loggedAt: string;
  site: string | null;
  fasted: boolean | null;
  mood: number | null;
  energy: number | null;
  sleep: number | null;
  notes: string;
};

type LocalState = {
  cycles: LocalCycle[];
  logs: LocalLog[];
};

function scheduleFromFrequency(freq: string): string {
  const f = freq.toLowerCase();
  if (f.includes("twice daily")) return "twice_daily";
  if (f.includes("twice weekly")) return "twice_weekly";
  if (f.includes("weekly")) return "weekly";
  if (f.includes("every other day") || f.includes("eod")) return "every_other_day";
  if (f.includes("as needed")) return "as_needed";
  return "daily";
}

function timeOfDayFrom(time: string): string {
  const t = time.toLowerCase();
  if (t.includes("bedtime") || t.includes("night")) return "bedtime";
  if (t.includes("evening") || t.includes("pm") || t.includes("dinner")) return "evening";
  if (t.includes("noon") || t.includes("midday") || t.includes("lunch")) return "midday";
  if (t.includes("morning") || t.includes("am") || t.includes("breakfast") || t.includes("fasted")) return "morning";
  if (t.includes("before") || t.includes("pre-")) return "before_activity";
  return "any";
}

export default function LocalStorageImport() {
  const supabase = createClient();
  const [local, setLocal] = useState<LocalState | null>(null);
  const [importing, setImporting] = useState(false);
  const [done, setDone] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as LocalState;
        if (parsed?.cycles?.length || parsed?.logs?.length) {
          setLocal(parsed);
        }
      }
    } catch {
      /* ignore */
    }
  }, []);

  async function runImport() {
    if (!local) return;
    setImporting(true);
    setError("");

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      setError("Not authenticated");
      setImporting(false);
      return;
    }

    // Create protocol_items for each active cycle
    const cycleIdToItemId: Record<string, string> = {};
    const activeCycles = local.cycles.filter((c) => c.active);

    for (const cycle of activeCycles) {
      const { data: item, error: err } = await supabase
        .from("protocol_items")
        .insert({
          member_id: user.id,
          name: cycle.name,
          category: "peptide",
          treatment_slug: cycle.slug,
          dose: cycle.doseLabel,
          dose_units: cycle.doseUnits,
          schedule: scheduleFromFrequency(cycle.frequencyLabel),
          time_of_day: timeOfDayFrom(cycle.preferredTime),
          fasting_required: cycle.fastingRequired,
          fasting_note: cycle.fastingNote || "",
          start_date: cycle.startDate.split("T")[0],
          active: true,
          notes: cycle.notes,
          source: "self",
        })
        .select("id")
        .single();

      if (err) {
        setError(`Failed to import ${cycle.name}: ${err.message}`);
        setImporting(false);
        return;
      }
      if (item) cycleIdToItemId[cycle.id] = item.id;

      // Create vial inventory record
      if (cycle.penTotalDoses) {
        const usedForCycle = local.logs.filter((l) => l.cycleId === cycle.id).length;
        await supabase.from("vial_inventory").insert({
          member_id: user.id,
          protocol_item_id: item!.id,
          label: "Imported vial",
          total_doses: cycle.penTotalDoses,
          doses_used: Math.min(usedForCycle, cycle.penTotalDoses),
          opened_at: cycle.startDate.split("T")[0],
          is_current: true,
        });
      }
    }

    // Import dose logs
    const logRows = local.logs
      .filter((l) => cycleIdToItemId[l.cycleId])
      .map((l) => ({
        member_id: user.id,
        protocol_item_id: cycleIdToItemId[l.cycleId],
        logged_at: l.loggedAt,
        injection_site: l.site || "",
        fasted: l.fasted,
        mood: l.mood,
        energy: l.energy,
        sleep_quality: l.sleep,
        notes: l.notes,
      }));

    if (logRows.length > 0) {
      await supabase.from("dose_logs").insert(logRows);
    }

    // Clear localStorage (optional — keep as backup for now by renaming)
    try {
      localStorage.setItem(STORAGE_KEY + ".backup", localStorage.getItem(STORAGE_KEY)!);
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }

    setImporting(false);
    setDone(true);

    // Reload the page after a brief success message
    setTimeout(() => window.location.reload(), 1500);
  }

  if (!local || dismissed) return null;

  if (done) {
    return (
      <div className="p-4 md:p-5 rounded-2xl bg-emerald-50 border border-emerald-200 mb-6 flex items-center gap-3">
        <span className="text-emerald-600 text-xl">✓</span>
        <p className="text-sm text-emerald-900 font-sans">
          Imported successfully. Reloading...
        </p>
      </div>
    );
  }

  const cycles = local.cycles.filter((c) => c.active).length;
  const logs = local.logs.length;

  return (
    <div className="p-4 md:p-5 rounded-2xl bg-gradient-to-r from-amber-50 to-[#FAF8F5] border border-amber-200/60 mb-6 flex items-start gap-4">
      <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shrink-0">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D4A44C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="8 17 12 21 16 17" />
          <line x1="12" y1="12" x2="12" y2="21" />
          <path d="M20.88 18.09A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.29" />
        </svg>
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-serif text-base text-gray-900 mb-1">
          Import your peptide tracker data?
        </p>
        <p className="text-xs text-gray-600 font-sans leading-relaxed mb-3">
          We found {cycles} cycle{cycles === 1 ? "" : "s"} and {logs} dose log
          {logs === 1 ? "" : "s"} saved on this device. Import to your account
          for cross-device sync, practitioner sharing, and long-term trends.
        </p>
        {error && (
          <p className="text-xs text-red-700 font-sans mb-3">{error}</p>
        )}
        <div className="flex gap-2">
          <button
            onClick={runImport}
            disabled={importing}
            className="px-4 py-2 rounded-full bg-terracotta text-white text-[10px] tracking-[0.15em] uppercase font-semibold font-sans hover:bg-terracotta-dark disabled:opacity-50"
          >
            {importing ? "Importing..." : "Import to my account"}
          </button>
          <button
            onClick={() => setDismissed(true)}
            className="px-4 py-2 rounded-full border border-gray-200 text-gray-500 text-[10px] tracking-[0.15em] uppercase font-semibold font-sans hover:border-gray-300"
          >
            Not now
          </button>
        </div>
      </div>
    </div>
  );
}
