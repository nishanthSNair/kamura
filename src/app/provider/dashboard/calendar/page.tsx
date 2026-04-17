"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

interface Slot {
  id: string;
  day_of_week: number;
  start_time: string;
  end_time: string;
  slot_duration_minutes: number;
  is_recurring: boolean;
  specific_date: string | null;
  is_blocked: boolean;
  block_reason: string;
}

const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function CalendarPage() {
  const supabase = createClient();
  const [slots, setSlots] = useState<Slot[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);

  // Add form state
  const [formDays, setFormDays] = useState<number[]>([1, 2, 3, 4, 5]); // Mon-Fri
  const [formStart, setFormStart] = useState("09:00");
  const [formEnd, setFormEnd] = useState("17:00");
  const [formDuration, setFormDuration] = useState(60);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadSlots();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function loadSlots() {
    const { data } = await supabase
      .from("availability_slots")
      .select("*")
      .order("day_of_week")
      .order("start_time");
    setSlots((data as Slot[]) || []);
    setLoading(false);
  }

  async function addSlots() {
    setSaving(true);
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    const inserts = formDays.map((day) => ({
      provider_id: user.id,
      day_of_week: day,
      start_time: formStart,
      end_time: formEnd,
      slot_duration_minutes: formDuration,
      is_recurring: true,
      is_blocked: false,
    }));

    await supabase.from("availability_slots").insert(inserts);
    await loadSlots();
    setShowAddForm(false);
    setSaving(false);
  }

  async function deleteSlot(id: string) {
    await supabase.from("availability_slots").delete().eq("id", id);
    setSlots((prev) => prev.filter((s) => s.id !== id));
  }

  async function toggleBlock(slot: Slot) {
    const newBlocked = !slot.is_blocked;
    await supabase
      .from("availability_slots")
      .update({ is_blocked: newBlocked })
      .eq("id", slot.id);
    setSlots((prev) =>
      prev.map((s) => (s.id === slot.id ? { ...s, is_blocked: newBlocked } : s))
    );
  }

  // Group slots by day
  const slotsByDay = DAY_NAMES.map((name, i) => ({
    name,
    index: i,
    slots: slots.filter((s) => s.day_of_week === i),
  }));

  return (
    <>
      <div className="flex items-end justify-between mb-8 flex-wrap gap-4">
        <div>
          <h1 className="font-serif text-3xl text-gray-900 mb-2">
            Availability
          </h1>
          <p className="text-sm text-gray-500 font-sans">
            Manage your weekly schedule and block times when you&apos;re unavailable.
          </p>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="px-5 py-2.5 rounded-full bg-[#2a1612] text-white text-xs tracking-[0.15em] uppercase font-semibold font-sans hover:bg-[#1a0f0c]"
        >
          + Add Slots
        </button>
      </div>

      {/* Add Slots Form */}
      {showAddForm && (
        <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-8">
          <h2 className="font-serif text-xl text-gray-900 mb-5">
            Create Recurring Slots
          </h2>

          <div className="space-y-5">
            <div>
              <label className="text-[10px] tracking-[0.2em] uppercase text-gray-500 font-sans block mb-3">
                Days
              </label>
              <div className="flex gap-2 flex-wrap">
                {DAY_NAMES.map((name, i) => (
                  <button
                    key={i}
                    onClick={() =>
                      setFormDays((prev) =>
                        prev.includes(i)
                          ? prev.filter((d) => d !== i)
                          : [...prev, i]
                      )
                    }
                    className={`px-3 py-2 rounded-full text-xs font-sans font-semibold border transition-colors ${
                      formDays.includes(i)
                        ? "bg-terracotta/10 border-terracotta text-terracotta"
                        : "border-gray-200 text-gray-500 hover:border-gray-300"
                    }`}
                  >
                    {name}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="text-[10px] tracking-[0.2em] uppercase text-gray-500 font-sans block mb-2">
                  Start Time
                </label>
                <input
                  type="time"
                  value={formStart}
                  onChange={(e) => setFormStart(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm font-sans focus:outline-none focus:border-terracotta"
                />
              </div>
              <div>
                <label className="text-[10px] tracking-[0.2em] uppercase text-gray-500 font-sans block mb-2">
                  End Time
                </label>
                <input
                  type="time"
                  value={formEnd}
                  onChange={(e) => setFormEnd(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm font-sans focus:outline-none focus:border-terracotta"
                />
              </div>
              <div>
                <label className="text-[10px] tracking-[0.2em] uppercase text-gray-500 font-sans block mb-2">
                  Slot Duration
                </label>
                <select
                  value={formDuration}
                  onChange={(e) => setFormDuration(Number(e.target.value))}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm font-sans focus:outline-none focus:border-terracotta"
                >
                  <option value={30}>30 min</option>
                  <option value={60}>1 hour</option>
                  <option value={90}>1.5 hours</option>
                  <option value={120}>2 hours</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={addSlots}
                disabled={saving || formDays.length === 0}
                className="px-5 py-2.5 rounded-full bg-[#2a1612] text-white text-xs tracking-[0.15em] uppercase font-semibold font-sans hover:bg-[#1a0f0c] disabled:opacity-50"
              >
                {saving ? "Saving..." : "Create Slots"}
              </button>
              <button
                onClick={() => setShowAddForm(false)}
                className="px-5 py-2.5 rounded-full border border-gray-200 text-gray-600 text-xs tracking-[0.15em] uppercase font-semibold font-sans hover:border-gray-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Weekly Grid */}
      {loading ? (
        <p className="text-sm text-gray-400 font-sans">Loading availability...</p>
      ) : (
        <div className="grid grid-cols-7 gap-3">
          {slotsByDay.map((day) => (
            <div key={day.index} className="min-h-[200px]">
              <p
                className={`text-center text-[10px] tracking-[0.15em] uppercase font-sans font-semibold mb-3 py-2 rounded-lg ${
                  day.index === new Date().getDay()
                    ? "bg-terracotta/10 text-terracotta"
                    : "text-gray-500"
                }`}
              >
                {day.name}
              </p>
              <div className="space-y-2">
                {day.slots.length === 0 ? (
                  <p className="text-[10px] text-gray-300 font-sans text-center italic">
                    Off
                  </p>
                ) : (
                  day.slots.map((slot) => (
                    <div
                      key={slot.id}
                      className={`p-2.5 rounded-xl border text-center text-xs font-sans ${
                        slot.is_blocked
                          ? "bg-gray-100 border-gray-200 text-gray-400 line-through"
                          : "bg-white border-gray-200 text-gray-700"
                      }`}
                    >
                      <p className="font-semibold">
                        {slot.start_time.slice(0, 5)}–{slot.end_time.slice(0, 5)}
                      </p>
                      <p className="text-[9px] text-gray-400 mt-0.5">
                        {slot.slot_duration_minutes}m slots
                      </p>
                      <div className="flex justify-center gap-2 mt-2">
                        <button
                          onClick={() => toggleBlock(slot)}
                          className="text-[9px] uppercase text-gray-400 hover:text-amber-600"
                        >
                          {slot.is_blocked ? "Unblock" : "Block"}
                        </button>
                        <button
                          onClick={() => deleteSlot(slot.id)}
                          className="text-[9px] uppercase text-gray-400 hover:text-red-600"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
