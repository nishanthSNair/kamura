"use client";

import { useState } from "react";
import {
  Activity,
  Circle,
  Droplet,
  Flame,
  Hand,
  HeartPulse,
  Leaf,
  Music,
  Snowflake,
  Sparkles,
  Sun,
  TestTube,
  Wind,
  type LucideIcon,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import {
  SESSION_TYPES,
  type DetailField,
  type SessionTypeMeta,
} from "@/data/session-types";

const ICONS: Record<SessionTypeMeta["icon"], LucideIcon> = {
  Wind,
  Droplet,
  Flame,
  Snowflake,
  Sun,
  Music,
  HeartPulse,
  Hand,
  TestTube,
  Sparkles,
  Activity,
  Leaf,
  Circle,
};

interface Props {
  onClose: () => void;
  onDone: () => void;
  /** Skip the type picker and open the form on this session type. */
  initialType?: SessionTypeMeta["key"];
}

type DetailValue = string | number;

export default function LogSessionModal({ onClose, onDone, initialType }: Props) {
  const supabase = createClient();
  const preselected = initialType
    ? SESSION_TYPES.find((t) => t.key === initialType) ?? null
    : null;
  const [step, setStep] = useState<"pick" | "form">(preselected ? "form" : "pick");
  const [selected, setSelected] = useState<SessionTypeMeta | null>(preselected);
  const [performedAt, setPerformedAt] = useState(() => localIsoNow());
  const [duration, setDuration] = useState<number>(preselected?.defaultDuration ?? 30);
  const [energy, setEnergy] = useState<number>(7);
  const [clarity, setClarity] = useState<number>(7);
  const [calm, setCalm] = useState<number>(7);
  const [details, setDetails] = useState<Record<string, DetailValue>>({});
  const [notes, setNotes] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function choose(meta: SessionTypeMeta) {
    setSelected(meta);
    setDuration(meta.defaultDuration);
    setDetails({});
    setStep("form");
  }

  async function submit() {
    if (!selected) return;
    setSaving(true);
    setError("");

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const row = {
      session_type: selected.key,
      performed_at: new Date(performedAt).toISOString(),
      duration_minutes: duration || null,
      energy_after: energy,
      clarity_after: clarity,
      calm_after: calm,
      details,
      notes,
    };

    if (!user) {
      // Guest mode — keep a short local log so it survives page reloads
      try {
        const raw = localStorage.getItem("kamura.guest.sessions");
        const list = raw ? (JSON.parse(raw) as unknown[]) : [];
        list.unshift({ ...row, id: crypto.randomUUID(), created_at: new Date().toISOString() });
        localStorage.setItem(
          "kamura.guest.sessions",
          JSON.stringify(list.slice(0, 40))
        );
        onDone();
      } catch {
        setError("Couldn't save locally. Try signing up to keep your data.");
        setSaving(false);
      }
      return;
    }

    const { error: err } = await supabase.from("session_logs").insert({
      ...row,
      member_id: user.id,
    });

    if (err) {
      setError(err.message);
      setSaving(false);
      return;
    }
    onDone();
  }

  return (
    <div
      className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-end md:items-center justify-center p-0 md:p-4"
      onClick={onClose}
    >
      <div
        className="bg-white w-full md:max-w-2xl md:rounded-3xl rounded-t-3xl max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* header */}
        <div className="sticky top-0 bg-white z-10 flex items-center justify-between px-6 md:px-8 pt-6 pb-4 border-b border-gray-100">
          <div>
            <p className="text-[10px] tracking-[0.3em] uppercase text-terracotta font-sans mb-1">
              {step === "pick" ? "Log a session" : selected?.label}
            </p>
            <h2 className="font-serif text-xl text-gray-900">
              {step === "pick" ? "What did you do today?" : "How was it?"}
            </h2>
          </div>
          <div className="flex items-center gap-2">
            {step === "form" && (
              <button
                onClick={() => setStep("pick")}
                className="text-[11px] tracking-[0.18em] uppercase text-gray-500 hover:text-gray-900 font-sans font-semibold pb-0.5 border-b border-gray-200"
              >
                ← Change
              </button>
            )}
            <button
              onClick={onClose}
              aria-label="Close"
              className="text-gray-400 hover:text-terracotta text-2xl leading-none px-2"
            >
              ×
            </button>
          </div>
        </div>

        {error && (
          <div className="mx-6 md:mx-8 mt-5 p-3 rounded-xl bg-red-50 border border-red-200 text-sm text-red-700 font-sans">
            {error}
          </div>
        )}

        {step === "pick" && (
          <div className="px-6 md:px-8 py-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {SESSION_TYPES.map((meta) => {
                const Icon = ICONS[meta.icon];
                return (
                  <button
                    key={meta.key}
                    onClick={() => choose(meta)}
                    className="group flex flex-col items-start gap-3 p-4 rounded-2xl border border-gray-200 hover:border-terracotta/40 hover:bg-[#FAFCF7] transition-colors text-left"
                  >
                    <span
                      className={`w-11 h-11 rounded-xl grid place-items-center ${meta.bg} ${meta.fg}`}
                    >
                      <Icon size={20} strokeWidth={1.8} />
                    </span>
                    <span className="font-serif text-[15px] text-gray-900 leading-tight">
                      {meta.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {step === "form" && selected && (
          <div className="px-6 md:px-8 py-6 space-y-6">
            {/* When + duration */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[10px] tracking-[0.2em] uppercase text-gray-500 font-sans block mb-2">
                  When
                </label>
                <input
                  type="datetime-local"
                  value={performedAt}
                  onChange={(e) => setPerformedAt(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm font-sans focus:outline-none focus:border-terracotta"
                />
              </div>
              <div>
                <label className="text-[10px] tracking-[0.2em] uppercase text-gray-500 font-sans block mb-2">
                  Duration (min)
                </label>
                <input
                  type="number"
                  inputMode="numeric"
                  min={1}
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm font-sans focus:outline-none focus:border-terracotta"
                />
              </div>
            </div>

            {/* Type-specific fields */}
            {selected.details.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {selected.details.map((field) => (
                  <DetailFieldInput
                    key={field.key}
                    field={field}
                    value={details[field.key] ?? ""}
                    onChange={(v) => setDetails((d) => ({ ...d, [field.key]: v }))}
                  />
                ))}
              </div>
            )}

            {/* Post-session feel */}
            <div className="space-y-5 pt-2">
              <p className="text-[10px] tracking-[0.28em] uppercase text-gray-500 font-sans font-semibold">
                After the session, you felt…
              </p>
              <Scale label="Energy" value={energy} setValue={setEnergy} low="Drained" high="Energized" />
              <Scale label="Clarity" value={clarity} setValue={setClarity} low="Foggy" high="Sharp" />
              <Scale label="Calm" value={calm} setValue={setCalm} low="Tense" high="At ease" />
            </div>

            <div>
              <label className="text-[10px] tracking-[0.2em] uppercase text-gray-500 font-sans block mb-2">
                Notes (optional)
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={2}
                placeholder="What stood out?"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm font-sans focus:outline-none focus:border-terracotta resize-none"
              />
            </div>

            <button
              onClick={submit}
              disabled={saving}
              className="w-full px-6 py-3.5 rounded-full bg-[#173C3B] text-white text-xs tracking-[0.15em] uppercase font-semibold font-sans hover:bg-[#173C3B] disabled:opacity-50"
            >
              {saving ? "Saving…" : "Log session"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function DetailFieldInput({
  field,
  value,
  onChange,
}: {
  field: DetailField;
  value: DetailValue;
  onChange: (v: DetailValue) => void;
}) {
  return (
    <div>
      <label className="text-[10px] tracking-[0.2em] uppercase text-gray-500 font-sans block mb-2">
        {field.label}
        {"unit" in field && field.unit ? (
          <span className="ml-1 text-gray-400 normal-case tracking-normal">({field.unit})</span>
        ) : null}
      </label>
      {field.type === "select" ? (
        <select
          value={String(value)}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm font-sans focus:outline-none focus:border-terracotta bg-white"
        >
          <option value="">Select…</option>
          {field.options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      ) : field.type === "number" ? (
        <input
          type="number"
          inputMode="decimal"
          value={value === "" ? "" : String(value)}
          placeholder={field.placeholder}
          onChange={(e) => onChange(e.target.value === "" ? "" : Number(e.target.value))}
          className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm font-sans focus:outline-none focus:border-terracotta"
        />
      ) : (
        <input
          type="text"
          value={String(value)}
          placeholder={field.placeholder}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm font-sans focus:outline-none focus:border-terracotta"
        />
      )}
    </div>
  );
}

function Scale({
  label,
  value,
  setValue,
  low,
  high,
}: {
  label: string;
  value: number;
  setValue: (n: number) => void;
  low: string;
  high: string;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between mb-2">
        <label className="text-[11px] tracking-[0.2em] uppercase text-gray-700 font-sans font-semibold">
          {label}
        </label>
        <span className="text-[10px] text-gray-400 font-sans">
          {low} → {high}
        </span>
      </div>
      <div className="flex gap-1.5">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => setValue(n)}
            className={`flex-1 py-2.5 rounded-full border text-[11px] font-sans font-semibold transition-colors ${
              value === n
                ? "bg-terracotta text-white border-terracotta"
                : "border-gray-200 text-gray-500 hover:border-gray-300"
            }`}
          >
            {n}
          </button>
        ))}
      </div>
    </div>
  );
}

function localIsoNow(): string {
  // datetime-local needs "YYYY-MM-DDTHH:mm" in the user's tz, not UTC
  const d = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}
