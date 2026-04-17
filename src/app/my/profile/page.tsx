"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

interface Member {
  full_name: string;
  email: string;
  phone: string;
  date_of_birth: string | null;
  gender: string;
  city: string;
  emirate: string;
  language_pref: string;
  primary_goal: string;
  protocol_start_date: string | null;
}

const GOALS = [
  "Recovery & Longevity",
  "Metabolic & Weight",
  "Sleep & Stress",
  "Performance & Energy",
  "Cognition & Focus",
  "Hormonal Balance",
  "Skin & Aesthetics",
];

interface Concern {
  id: string;
  concern: string;
  severity: number;
  active: boolean;
}

const COMMON_CONCERNS = [
  "Energy & fatigue",
  "Weight management",
  "Sleep quality",
  "Stress & anxiety",
  "Hormonal balance",
  "Longevity",
  "Recovery & performance",
  "Cognitive function",
  "Gut health",
  "Skin & hair",
  "Sexual health",
  "Joint & mobility",
];

export default function ProfilePage() {
  const supabase = createClient();
  const [member, setMember] = useState<Member | null>(null);
  const [concerns, setConcerns] = useState<Concern[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [newConcern, setNewConcern] = useState("");

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function loadData() {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    const [memberRes, concernsRes] = await Promise.all([
      supabase.from("members").select("*").eq("id", user.id).single(),
      supabase
        .from("member_concerns")
        .select("*")
        .eq("member_id", user.id)
        .eq("active", true)
        .order("added_at", { ascending: false }),
    ]);

    setMember(memberRes.data as Member);
    setConcerns((concernsRes.data as Concern[]) || []);
    setLoading(false);
  }

  async function saveProfile() {
    if (!member) return;
    setSaving(true);
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    await supabase
      .from("members")
      .update({
        full_name: member.full_name,
        phone: member.phone,
        date_of_birth: member.date_of_birth,
        gender: member.gender,
        city: member.city,
        emirate: member.emirate,
        language_pref: member.language_pref,
        primary_goal: member.primary_goal,
        protocol_start_date: member.protocol_start_date,
      })
      .eq("id", user.id);

    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  async function addConcern(c: string) {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user || !c.trim()) return;

    // Don't add duplicates
    if (concerns.find((x) => x.concern.toLowerCase() === c.toLowerCase())) {
      return;
    }

    const { data } = await supabase
      .from("member_concerns")
      .insert({ member_id: user.id, concern: c.trim(), severity: 3 })
      .select()
      .single();

    if (data) {
      setConcerns((prev) => [data as Concern, ...prev]);
      setNewConcern("");
    }
  }

  async function removeConcern(id: string) {
    await supabase.from("member_concerns").update({ active: false }).eq("id", id);
    setConcerns((prev) => prev.filter((c) => c.id !== id));
  }

  function updateField(field: keyof Member, value: string) {
    if (!member) return;
    setMember({ ...member, [field]: value });
  }

  if (loading || !member) {
    return <p className="text-sm text-gray-400 font-sans">Loading...</p>;
  }

  return (
    <>
      <div className="mb-8">
        <p className="text-[10px] tracking-[0.3em] uppercase text-terracotta font-sans mb-2">
          Profile
        </p>
        <h1 className="font-serif text-3xl md:text-4xl text-gray-900 leading-tight mb-3">
          Your details
        </h1>
        <p className="text-sm text-gray-500 font-sans max-w-xl">
          Kept private. Used only to personalize your dashboard and pre-fill
          booking forms.
        </p>
      </div>

      {/* Personal info */}
      <section className="p-6 md:p-8 bg-white rounded-2xl border border-gray-200 mb-6">
        <h2 className="font-serif text-xl text-gray-900 mb-6">
          Personal information
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Field
            label="Full Name"
            value={member.full_name}
            onChange={(v) => updateField("full_name", v)}
          />
          <Field label="Email" value={member.email} onChange={() => {}} disabled />
          <Field
            label="Phone"
            value={member.phone}
            onChange={(v) => updateField("phone", v)}
            placeholder="+971 XX XXX XXXX"
          />
          <Field
            label="Date of Birth"
            type="date"
            value={member.date_of_birth || ""}
            onChange={(v) => updateField("date_of_birth", v)}
          />
          <div>
            <label className="text-[10px] tracking-[0.2em] uppercase text-gray-500 font-sans block mb-2">
              Gender
            </label>
            <select
              value={member.gender}
              onChange={(e) => updateField("gender", e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm font-sans focus:outline-none focus:border-terracotta"
            >
              <option value="">Prefer not to say</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <Field
            label="City"
            value={member.city}
            onChange={(v) => updateField("city", v)}
          />
          <div>
            <label className="text-[10px] tracking-[0.2em] uppercase text-gray-500 font-sans block mb-2">
              Language
            </label>
            <select
              value={member.language_pref}
              onChange={(e) => updateField("language_pref", e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm font-sans focus:outline-none focus:border-terracotta"
            >
              <option value="en">English</option>
              <option value="ar">العربية</option>
            </select>
          </div>
        </div>

        <div className="flex items-center gap-3 mt-6">
          <button
            onClick={saveProfile}
            disabled={saving}
            className="px-5 py-2.5 rounded-full bg-[#2a1612] text-white text-xs tracking-[0.15em] uppercase font-semibold font-sans hover:bg-[#1a0f0c] transition-colors disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
          {saved && (
            <span className="text-xs text-emerald-700 font-sans">Saved</span>
          )}
        </div>
      </section>

      {/* Protocol framing */}
      <section className="p-6 md:p-8 bg-white rounded-2xl border border-gray-200 mb-6">
        <h2 className="font-serif text-xl text-gray-900 mb-2">
          Your protocol
        </h2>
        <p className="text-sm text-gray-500 font-sans mb-6">
          Your dashboard frames progress around a primary goal and start date.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="text-[10px] tracking-[0.2em] uppercase text-gray-500 font-sans block mb-2">
              Primary Goal
            </label>
            <select
              value={member.primary_goal}
              onChange={(e) => updateField("primary_goal", e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm font-sans focus:outline-none focus:border-terracotta"
            >
              <option value="">Not set</option>
              {GOALS.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
          </div>
          <Field
            label="Protocol Start Date"
            type="date"
            value={member.protocol_start_date || ""}
            onChange={(v) => updateField("protocol_start_date", v)}
          />
        </div>
      </section>

      {/* Concerns */}
      <section className="p-6 md:p-8 bg-white rounded-2xl border border-gray-200">
        <h2 className="font-serif text-xl text-gray-900 mb-2">
          What are you focused on?
        </h2>
        <p className="text-sm text-gray-500 font-sans mb-6">
          Pick what matters — we&apos;ll tune recommendations to these.
        </p>

        {/* Active concerns */}
        {concerns.length > 0 && (
          <div className="mb-6">
            <p className="text-[10px] tracking-[0.2em] uppercase text-gray-500 font-sans mb-3">
              Your concerns
            </p>
            <div className="flex flex-wrap gap-2">
              {concerns.map((c) => (
                <button
                  key={c.id}
                  onClick={() => removeConcern(c.id)}
                  className="px-3 py-1.5 rounded-full bg-terracotta/10 border border-terracotta/30 text-xs text-terracotta font-sans font-semibold hover:bg-terracotta hover:text-white transition-colors group"
                >
                  {c.concern}
                  <span className="ml-2 opacity-60 group-hover:opacity-100">×</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Common concerns */}
        <p className="text-[10px] tracking-[0.2em] uppercase text-gray-500 font-sans mb-3">
          Common concerns
        </p>
        <div className="flex flex-wrap gap-2 mb-6">
          {COMMON_CONCERNS.filter(
            (cc) =>
              !concerns.find((c) => c.concern.toLowerCase() === cc.toLowerCase())
          ).map((cc) => (
            <button
              key={cc}
              onClick={() => addConcern(cc)}
              className="px-3 py-1.5 rounded-full border border-gray-300 text-xs text-gray-600 font-sans hover:border-terracotta hover:text-terracotta transition-colors"
            >
              + {cc}
            </button>
          ))}
        </div>

        {/* Custom concern */}
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={newConcern}
            onChange={(e) => setNewConcern(e.target.value)}
            placeholder="Add your own (e.g. migraines)"
            className="flex-1 px-4 py-2.5 rounded-full border border-gray-200 text-sm font-sans focus:outline-none focus:border-terracotta"
            onKeyDown={(e) => {
              if (e.key === "Enter") addConcern(newConcern);
            }}
          />
          <button
            onClick={() => addConcern(newConcern)}
            disabled={!newConcern.trim()}
            className="px-4 py-2.5 rounded-full bg-[#2a1612] text-white text-xs tracking-[0.15em] uppercase font-semibold font-sans hover:bg-[#1a0f0c] disabled:opacity-50"
          >
            Add
          </button>
        </div>
      </section>
    </>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  disabled = false,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  disabled?: boolean;
}) {
  return (
    <div>
      <label className="text-[10px] tracking-[0.2em] uppercase text-gray-500 font-sans block mb-2">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className={`w-full px-4 py-3 rounded-xl border border-gray-200 text-sm font-sans focus:outline-none focus:border-terracotta ${
          disabled ? "bg-gray-50 text-gray-500 cursor-not-allowed" : ""
        }`}
      />
    </div>
  );
}
