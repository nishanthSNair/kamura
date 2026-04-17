"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

interface Props {
  onClose: () => void;
  onDone: (score: number) => void;
  existing?: {
    energy: number;
    mood: number;
    sleep_quality: number;
    stress: number;
    notes: string;
  } | null;
}

export default function DailyCheckinModal({ onClose, onDone, existing }: Props) {
  const supabase = createClient();
  const [energy, setEnergy] = useState(existing?.energy || 3);
  const [mood, setMood] = useState(existing?.mood || 3);
  const [sleep, setSleep] = useState(existing?.sleep_quality || 3);
  const [stress, setStress] = useState(existing?.stress || 3);
  const [notes, setNotes] = useState(existing?.notes || "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function submit() {
    setSaving(true);
    setError("");
    const { data, error: err } = await supabase.rpc("upsert_wellness_checkin", {
      p_energy: energy,
      p_mood: mood,
      p_sleep_quality: sleep,
      p_stress: stress,
      p_notes: notes,
    });

    if (err) {
      setError(err.message);
      setSaving(false);
      return;
    }

    onDone((data as number) || 0);
  }

  return (
    <div
      className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-end md:items-center justify-center p-0 md:p-4"
      onClick={onClose}
    >
      <div
        className="bg-white w-full md:max-w-lg md:rounded-3xl rounded-t-3xl p-6 md:p-8 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-[10px] tracking-[0.3em] uppercase text-terracotta font-sans mb-1">
              Daily Check-in
            </p>
            <h2 className="font-serif text-xl text-gray-900">How are you today?</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-terracotta text-xl"
          >
            ×
          </button>
        </div>

        {error && (
          <div className="mb-5 p-3 rounded-xl bg-red-50 border border-red-200 text-sm text-red-700 font-sans">
            {error}
          </div>
        )}

        <div className="space-y-6">
          <Dimension label="Energy" value={energy} setValue={setEnergy} lowLabel="Drained" highLabel="Energized" />
          <Dimension label="Mood" value={mood} setValue={setMood} lowLabel="Low" highLabel="Great" />
          <Dimension label="Sleep" value={sleep} setValue={setSleep} lowLabel="Poor" highLabel="Restful" />
          <Dimension label="Stress" value={stress} setValue={setStress} lowLabel="Calm" highLabel="Intense" inverted />

          <div>
            <label className="text-[10px] tracking-[0.2em] uppercase text-gray-500 font-sans block mb-3">
              Notes (optional)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={2}
              placeholder="Anything to remember?"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm font-sans focus:outline-none focus:border-terracotta resize-none"
            />
          </div>
        </div>

        <button
          onClick={submit}
          disabled={saving}
          className="w-full mt-8 px-6 py-3.5 rounded-full bg-[#2a1612] text-white text-xs tracking-[0.15em] uppercase font-semibold font-sans hover:bg-[#1a0f0c] disabled:opacity-50"
        >
          {saving ? "Saving..." : existing ? "Update Check-in" : "Log Check-in"}
        </button>
      </div>
    </div>
  );
}

function Dimension({
  label,
  value,
  setValue,
  lowLabel,
  highLabel,
  inverted,
}: {
  label: string;
  value: number;
  setValue: (n: number) => void;
  lowLabel: string;
  highLabel: string;
  inverted?: boolean;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between mb-2">
        <label className="text-[11px] tracking-[0.2em] uppercase text-gray-700 font-sans font-semibold">
          {label}
        </label>
        <span className="text-[10px] text-gray-400 font-sans">
          {inverted ? lowLabel : lowLabel} → {inverted ? highLabel : highLabel}
        </span>
      </div>
      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            onClick={() => setValue(n)}
            className={`flex-1 py-3 rounded-full border text-xs font-sans font-semibold transition-colors ${
              value === n
                ? "bg-terracotta text-white border-terracotta"
                : "border-gray-200 text-gray-500 hover:border-gray-300"
            }`}
          >
            {n}
          </button>
        ))}
      </div>
      <p className="text-[9px] text-gray-400 font-sans mt-1 flex justify-between">
        <span>{lowLabel}</span>
        <span>{highLabel}</span>
      </p>
    </div>
  );
}
