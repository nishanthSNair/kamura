"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

interface Props {
  onClose: () => void;
  onSaved: () => void;
}

export default function JournalEntryModal({ onClose, onSaved }: Props) {
  const supabase = createClient();
  const [body, setBody] = useState("");
  const [energy, setEnergy] = useState<number | null>(null);
  const [mood, setMood] = useState<number | null>(null);
  const [pain, setPain] = useState<number | null>(null);
  const [sleepHours, setSleepHours] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function submit() {
    if (!body.trim() && energy === null && mood === null && pain === null && !sleepHours) {
      setError("Write something or rate at least one metric.");
      return;
    }
    setSaving(true);
    setError("");
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    const { error: err } = await supabase.from("journal_entries").insert({
      member_id: user.id,
      body,
      energy,
      mood,
      pain,
      sleep_hours: sleepHours ? Number(sleepHours) : null,
    });

    if (err) {
      setError(err.message);
      setSaving(false);
      return;
    }

    onSaved();
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
              Journal
            </p>
            <h2 className="font-serif text-xl text-gray-900">How did today go?</h2>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-terracotta text-xl">
            ×
          </button>
        </div>

        {error && (
          <div className="mb-5 p-3 rounded-xl bg-red-50 border border-red-200 text-sm text-red-700 font-sans">
            {error}
          </div>
        )}

        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={4}
          placeholder="Write a few lines — how you felt, what you noticed, what worked..."
          className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm font-sans focus:outline-none focus:border-terracotta resize-none mb-6"
        />

        <div className="grid grid-cols-2 gap-4 mb-6">
          <MetricChip label="Energy" value={energy} setValue={setEnergy} />
          <MetricChip label="Mood" value={mood} setValue={setMood} />
          <MetricChip label="Pain" value={pain} setValue={setPain} />
          <div>
            <label className="text-[10px] tracking-[0.2em] uppercase text-gray-500 font-sans block mb-2">
              Sleep (hours)
            </label>
            <input
              type="number"
              step="0.5"
              min="0"
              max="16"
              value={sleepHours}
              onChange={(e) => setSleepHours(e.target.value)}
              placeholder="e.g. 7.5"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-sans focus:outline-none focus:border-terracotta"
            />
          </div>
        </div>

        <button
          onClick={submit}
          disabled={saving}
          className="w-full px-6 py-3.5 rounded-full bg-[#2a1612] text-white text-xs tracking-[0.15em] uppercase font-semibold font-sans hover:bg-[#1a0f0c] disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save Entry"}
        </button>
      </div>
    </div>
  );
}

function MetricChip({
  label,
  value,
  setValue,
}: {
  label: string;
  value: number | null;
  setValue: (n: number) => void;
}) {
  return (
    <div>
      <label className="text-[10px] tracking-[0.2em] uppercase text-gray-500 font-sans block mb-2">
        {label} {value !== null && <span className="text-terracotta">· {value}/10</span>}
      </label>
      <input
        type="range"
        min="1"
        max="10"
        value={value ?? 5}
        onChange={(e) => setValue(Number(e.target.value))}
        className="w-full accent-terracotta"
      />
    </div>
  );
}
