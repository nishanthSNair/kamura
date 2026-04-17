"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

interface Vial {
  id: string;
  protocol_item_id: string;
  label: string;
  total_doses: number;
  doses_used: number;
  opened_at: string | null;
  expires_on: string | null;
  is_current: boolean;
}

interface Props {
  itemId: string;
  currentVial: Vial | null;
  onChange: () => void;
}

export default function InventoryManager({ itemId, currentVial, onChange }: Props) {
  const supabase = createClient();
  const [showAdd, setShowAdd] = useState(false);
  const [totalDoses, setTotalDoses] = useState(30);
  const [label, setLabel] = useState("");
  const [expiresOn, setExpiresOn] = useState("");
  const [saving, setSaving] = useState(false);

  async function addVial() {
    setSaving(true);
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    // Mark any existing current vial as not current
    if (currentVial) {
      await supabase
        .from("vial_inventory")
        .update({ is_current: false })
        .eq("id", currentVial.id);
    }

    await supabase.from("vial_inventory").insert({
      member_id: user.id,
      protocol_item_id: itemId,
      label: label || `Vial ${new Date().toLocaleDateString()}`,
      total_doses: totalDoses,
      doses_used: 0,
      opened_at: new Date().toISOString().split("T")[0],
      expires_on: expiresOn || null,
      is_current: true,
    });

    setShowAdd(false);
    setSaving(false);
    onChange();
  }

  async function incrementUsed(delta: number) {
    if (!currentVial) return;
    const newUsed = Math.max(
      0,
      Math.min(currentVial.total_doses, currentVial.doses_used + delta)
    );
    await supabase
      .from("vial_inventory")
      .update({ doses_used: newUsed })
      .eq("id", currentVial.id);
    onChange();
  }

  async function retireVial() {
    if (!currentVial) return;
    if (!confirm("Mark this vial as finished?")) return;
    await supabase
      .from("vial_inventory")
      .update({ is_current: false })
      .eq("id", currentVial.id);
    onChange();
  }

  if (!currentVial && !showAdd) {
    return (
      <button
        onClick={() => setShowAdd(true)}
        className="text-[10px] tracking-[0.15em] uppercase text-gray-500 hover:text-terracotta font-sans font-semibold"
      >
        + Track vial
      </button>
    );
  }

  if (showAdd) {
    return (
      <div className="mt-3 p-4 rounded-xl border border-gray-200 bg-[#FAF8F5]">
        <p className="text-[10px] tracking-[0.2em] uppercase text-gray-500 font-sans font-semibold mb-3">
          New vial
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
          <div>
            <label className="text-[10px] text-gray-500 font-sans block mb-1">Label</label>
            <input
              type="text"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              placeholder="Vial #1"
              className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm font-sans focus:outline-none focus:border-terracotta"
            />
          </div>
          <div>
            <label className="text-[10px] text-gray-500 font-sans block mb-1">Total doses</label>
            <input
              type="number"
              value={totalDoses}
              onChange={(e) => setTotalDoses(Number(e.target.value))}
              min="1"
              className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm font-sans focus:outline-none focus:border-terracotta"
            />
          </div>
          <div>
            <label className="text-[10px] text-gray-500 font-sans block mb-1">Expires</label>
            <input
              type="date"
              value={expiresOn}
              onChange={(e) => setExpiresOn(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm font-sans focus:outline-none focus:border-terracotta"
            />
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={addVial}
            disabled={saving}
            className="px-4 py-2 rounded-full bg-terracotta text-white text-[10px] tracking-[0.15em] uppercase font-semibold font-sans hover:bg-terracotta-dark disabled:opacity-50"
          >
            {saving ? "Saving..." : "Add"}
          </button>
          <button
            onClick={() => setShowAdd(false)}
            className="px-4 py-2 rounded-full border border-gray-200 text-gray-500 text-[10px] tracking-[0.15em] uppercase font-semibold font-sans"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  if (!currentVial) return null;

  const remaining = currentVial.total_doses - currentVial.doses_used;
  const pct = (currentVial.doses_used / currentVial.total_doses) * 100;
  const lowStock = remaining <= 5;

  return (
    <div className="mt-3 p-3 rounded-xl border border-gray-200 bg-[#FAF8F5]">
      <div className="flex items-baseline justify-between mb-2">
        <p className="text-[10px] tracking-[0.15em] uppercase text-gray-500 font-sans font-semibold">
          {currentVial.label} · {currentVial.total_doses} doses
        </p>
        <p className={`text-[11px] font-sans font-semibold ${lowStock ? "text-amber-700" : "text-gray-600"}`}>
          {remaining} left
        </p>
      </div>
      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden mb-2">
        <div
          className={`h-full rounded-full transition-all ${lowStock ? "bg-amber-500" : "bg-terracotta"}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => incrementUsed(1)}
          className="text-[10px] tracking-[0.15em] uppercase text-gray-500 hover:text-terracotta font-sans font-semibold"
        >
          − 1 dose
        </button>
        <span className="text-gray-200">·</span>
        <button
          onClick={() => incrementUsed(-1)}
          className="text-[10px] tracking-[0.15em] uppercase text-gray-500 hover:text-terracotta font-sans font-semibold"
        >
          undo
        </button>
        <span className="text-gray-200">·</span>
        <button
          onClick={retireVial}
          className="text-[10px] tracking-[0.15em] uppercase text-gray-400 hover:text-red-600 font-sans font-semibold"
        >
          finished
        </button>
        <button
          onClick={() => setShowAdd(true)}
          className="text-[10px] tracking-[0.15em] uppercase text-gray-400 hover:text-terracotta font-sans font-semibold ml-auto"
        >
          + new vial
        </button>
      </div>
    </div>
  );
}
