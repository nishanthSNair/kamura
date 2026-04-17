"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import ScoreTierPill from "@/components/member/ScoreTierPill";
import { getTreatmentBySlug } from "@/data/treatments";

interface ProtocolItem {
  id: string;
  name: string;
  category: string;
  treatment_slug: string | null;
  dose: string;
  schedule: string;
  time_of_day: string;
  fasting_required: boolean;
  fasting_note: string;
  active: boolean;
  notes: string;
  source: string;
  created_at: string;
}

interface DoseLog {
  id: string;
  protocol_item_id: string;
  logged_at: string;
  skipped: boolean;
}

const CATEGORIES = [
  { value: "peptide", label: "Peptide" },
  { value: "pharmaceutical", label: "Pharmaceutical" },
  { value: "supplement", label: "Supplement" },
  { value: "lifestyle", label: "Lifestyle" },
  { value: "habit", label: "Habit" },
];

const SCHEDULES = [
  { value: "daily", label: "Once daily" },
  { value: "twice_daily", label: "Twice daily" },
  { value: "twice_weekly", label: "Twice weekly" },
  { value: "weekly", label: "Once weekly" },
  { value: "every_other_day", label: "Every other day" },
  { value: "as_needed", label: "As needed" },
];

const TIMES = [
  { value: "morning", label: "Morning" },
  { value: "midday", label: "Midday" },
  { value: "evening", label: "Evening" },
  { value: "bedtime", label: "Bedtime" },
  { value: "any", label: "Any time" },
];

export default function ProtocolPage() {
  const supabase = createClient();
  const [items, setItems] = useState<ProtocolItem[]>([]);
  const [recentLogs, setRecentLogs] = useState<DoseLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    name: "",
    category: "supplement",
    dose: "",
    schedule: "daily",
    time_of_day: "morning",
    fasting_required: false,
    notes: "",
    treatment_slug: "",
  });

  useEffect(() => {
    loadAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function loadAll() {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    const sevenDaysAgo = new Date(Date.now() - 7 * 86400000).toISOString();

    const [itemsRes, logsRes] = await Promise.all([
      supabase
        .from("protocol_items")
        .select("*")
        .eq("member_id", user.id)
        .eq("active", true)
        .order("time_of_day")
        .order("name"),
      supabase
        .from("dose_logs")
        .select("id, protocol_item_id, logged_at, skipped")
        .eq("member_id", user.id)
        .gte("logged_at", sevenDaysAgo)
        .order("logged_at", { ascending: false }),
    ]);

    setItems((itemsRes.data as ProtocolItem[]) || []);
    setRecentLogs((logsRes.data as DoseLog[]) || []);
    setLoading(false);
  }

  async function addItem() {
    if (!form.name) return;
    setSaving(true);
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    const { data, error } = await supabase
      .from("protocol_items")
      .insert({
        member_id: user.id,
        name: form.name,
        category: form.category,
        dose: form.dose,
        schedule: form.schedule,
        time_of_day: form.time_of_day,
        fasting_required: form.fasting_required,
        notes: form.notes,
        treatment_slug: form.treatment_slug || null,
      })
      .select()
      .single();

    if (!error && data) {
      setItems((prev) => [data as ProtocolItem, ...prev]);
      setShowAdd(false);
      setForm({
        name: "",
        category: "supplement",
        dose: "",
        schedule: "daily",
        time_of_day: "morning",
        fasting_required: false,
        notes: "",
        treatment_slug: "",
      });
    }
    setSaving(false);
  }

  async function logDose(itemId: string) {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    const { data } = await supabase
      .from("dose_logs")
      .insert({ member_id: user.id, protocol_item_id: itemId })
      .select()
      .single();

    if (data) setRecentLogs((prev) => [data as DoseLog, ...prev]);
  }

  async function removeItem(id: string) {
    if (!confirm("Remove this from your protocol? Log history stays.")) return;
    await supabase.from("protocol_items").update({ active: false }).eq("id", id);
    setItems((prev) => prev.filter((i) => i.id !== id));
  }

  // Group items by time of day
  const byTime: Record<string, ProtocolItem[]> = {};
  items.forEach((item) => {
    if (!byTime[item.time_of_day]) byTime[item.time_of_day] = [];
    byTime[item.time_of_day].push(item);
  });

  const TIME_ORDER = ["morning", "midday", "evening", "bedtime", "any"];

  return (
    <>
      <div className="flex items-end justify-between mb-8 flex-wrap gap-4">
        <div>
          <p className="text-[10px] tracking-[0.3em] uppercase text-terracotta font-sans mb-2">
            Protocol
          </p>
          <h1 className="font-serif text-3xl md:text-4xl text-gray-900 leading-tight mb-3">
            Your living plan
          </h1>
          <p className="text-sm text-gray-500 font-sans max-w-xl">
            Peptides, supplements, habits — all tracked in one place.
          </p>
        </div>
        <button
          onClick={() => setShowAdd(true)}
          className="px-5 py-2.5 rounded-full bg-[#2a1612] text-white text-xs tracking-[0.15em] uppercase font-semibold font-sans hover:bg-[#1a0f0c] transition-colors"
        >
          + Add Item
        </button>
      </div>

      {/* Add form */}
      {showAdd && (
        <div className="mb-8 p-6 md:p-8 rounded-2xl bg-white border border-gray-200">
          <h2 className="font-serif text-xl text-gray-900 mb-5">New protocol item</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <Field
              label="Name"
              value={form.name}
              onChange={(v) => setForm({ ...form, name: v })}
              placeholder="e.g. BPC-157, Vitamin D3, 10k steps"
            />
            <Field
              label="Dose / Amount"
              value={form.dose}
              onChange={(v) => setForm({ ...form, dose: v })}
              placeholder="e.g. 500 mcg, 1 capsule"
            />
            <Select
              label="Category"
              value={form.category}
              onChange={(v) => setForm({ ...form, category: v })}
              options={CATEGORIES}
            />
            <Select
              label="Schedule"
              value={form.schedule}
              onChange={(v) => setForm({ ...form, schedule: v })}
              options={SCHEDULES}
            />
            <Select
              label="Time of Day"
              value={form.time_of_day}
              onChange={(v) => setForm({ ...form, time_of_day: v })}
              options={TIMES}
            />
            <Field
              label="Kamura Treatment Slug (optional)"
              value={form.treatment_slug}
              onChange={(v) => setForm({ ...form, treatment_slug: v })}
              placeholder="e.g. bpc-157, nad-injectable"
            />
          </div>

          <label className="flex items-center gap-2 text-sm text-gray-700 font-sans mb-4">
            <input
              type="checkbox"
              checked={form.fasting_required}
              onChange={(e) => setForm({ ...form, fasting_required: e.target.checked })}
            />
            Fasting required around dose
          </label>

          <div className="mb-5">
            <label className="text-[10px] tracking-[0.2em] uppercase text-gray-500 font-sans block mb-2">
              Notes (optional)
            </label>
            <textarea
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              rows={2}
              placeholder="Anything to remember..."
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm font-sans focus:outline-none focus:border-terracotta resize-none"
            />
          </div>

          <div className="flex gap-2">
            <button
              onClick={addItem}
              disabled={saving || !form.name}
              className="px-5 py-2.5 rounded-full bg-[#2a1612] text-white text-xs tracking-[0.15em] uppercase font-semibold font-sans hover:bg-[#1a0f0c] disabled:opacity-50"
            >
              {saving ? "Saving..." : "Add to protocol"}
            </button>
            <button
              onClick={() => setShowAdd(false)}
              className="px-5 py-2.5 rounded-full border border-gray-200 text-gray-600 text-xs tracking-[0.15em] uppercase font-semibold font-sans"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {loading ? (
        <p className="text-sm text-gray-400 font-sans">Loading...</p>
      ) : items.length === 0 ? (
        <div className="p-12 rounded-2xl bg-white border border-dashed border-gray-300 text-center">
          <p className="font-serif text-xl text-gray-900 mb-2">No items yet</p>
          <p className="text-sm text-gray-500 font-sans mb-6 max-w-md mx-auto">
            Add your first peptide, supplement, or daily habit to start tracking.
          </p>
          <button
            onClick={() => setShowAdd(true)}
            className="px-5 py-2.5 rounded-full bg-[#2a1612] text-white text-xs tracking-[0.15em] uppercase font-semibold font-sans"
          >
            + Add First Item
          </button>
        </div>
      ) : (
        <div className="space-y-8">
          {TIME_ORDER.filter((t) => byTime[t]?.length).map((time) => (
            <section key={time}>
              <h2 className="text-[10px] tracking-[0.3em] uppercase text-gray-500 font-sans mb-3 pb-2 border-b border-gray-200">
                {time === "any" ? "Any time" : time.charAt(0).toUpperCase() + time.slice(1)}
              </h2>
              <div className="space-y-3">
                {byTime[time].map((item) => (
                  <ProtocolItemCard
                    key={item.id}
                    item={item}
                    logs={recentLogs.filter((l) => l.protocol_item_id === item.id)}
                    onLog={() => logDose(item.id)}
                    onRemove={() => removeItem(item.id)}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </>
  );
}

function ProtocolItemCard({
  item,
  logs,
  onLog,
  onRemove,
}: {
  item: ProtocolItem;
  logs: DoseLog[];
  onLog: () => void;
  onRemove: () => void;
}) {
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);
  const loggedToday = logs.some((l) => new Date(l.logged_at) >= todayStart);

  // last 7 days dots — each day either has log, missed, or future
  const last7 = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() - (6 - i));
    const next = new Date(d);
    next.setDate(next.getDate() + 1);
    const hasLog = logs.some((l) => {
      const t = new Date(l.logged_at);
      return t >= d && t < next;
    });
    return hasLog;
  });

  const categoryColor: Record<string, string> = {
    peptide: "text-purple-700 bg-purple-50",
    pharmaceutical: "text-blue-700 bg-blue-50",
    supplement: "text-emerald-700 bg-emerald-50",
    lifestyle: "text-amber-700 bg-amber-50",
    habit: "text-sky-700 bg-sky-50",
  };

  return (
    <div className="p-5 bg-white rounded-2xl border border-gray-200 hover:border-gray-300 transition-colors">
      <div className="flex items-start gap-4">
        <button
          onClick={onLog}
          disabled={loggedToday}
          className={`w-10 h-10 shrink-0 rounded-full border-2 flex items-center justify-center transition-colors ${
            loggedToday
              ? "bg-emerald-500 border-emerald-500 text-white"
              : "border-gray-300 hover:border-terracotta hover:bg-terracotta/10"
          }`}
        >
          {loggedToday && (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          )}
        </button>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <h3 className="font-serif text-lg text-gray-900">{item.name}</h3>
            <span
              className={`px-2 py-0.5 rounded-full text-[9px] tracking-[0.15em] uppercase font-semibold font-sans ${
                categoryColor[item.category] || "text-gray-600 bg-gray-100"
              }`}
            >
              {item.category}
            </span>
            {item.treatment_slug && (() => {
              const t = getTreatmentBySlug(item.treatment_slug);
              return t ? (
                <Link href={`/treatments/${item.treatment_slug}`}>
                  <ScoreTierPill score={t.kamuraScore} size="sm" />
                </Link>
              ) : null;
            })()}
          </div>
          <p className="text-xs text-gray-500 font-sans mb-3">
            {item.dose && `${item.dose} · `}
            {item.schedule.replace("_", " ")}
            {item.time_of_day !== "any" && ` · ${item.time_of_day}`}
            {item.fasting_required && " · fasted"}
          </p>

          {/* Last 7 days dots */}
          <div className="flex items-center gap-1.5">
            {last7.map((hasLog, i) => (
              <span
                key={i}
                className={`w-2 h-2 rounded-full ${hasLog ? "bg-emerald-500" : "bg-gray-200"}`}
                title={hasLog ? "Logged" : "Missed"}
              />
            ))}
            <span className="text-[10px] text-gray-400 font-sans ml-2">
              {logs.length} this week
            </span>
          </div>
        </div>

        <button
          onClick={onRemove}
          className="text-[10px] tracking-[0.15em] uppercase text-gray-300 hover:text-red-600 font-sans shrink-0"
        >
          End
        </button>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="text-[10px] tracking-[0.2em] uppercase text-gray-500 font-sans block mb-2">
        {label}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm font-sans focus:outline-none focus:border-terracotta"
      />
    </div>
  );
}

function Select({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div>
      <label className="text-[10px] tracking-[0.2em] uppercase text-gray-500 font-sans block mb-2">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm font-sans focus:outline-none focus:border-terracotta"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}
