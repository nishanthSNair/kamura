"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

interface Booking {
  id: string;
  customer_name: string;
  customer_phone: string;
  start_time: string;
  end_time: string;
  status: string;
  notes: string;
  service: { name: string }[] | null;
}

export default function TodaysBookingsPage() {
  const supabase = createClient();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from("bookings")
        .select("*, service:services(name)")
        .eq("booking_date", today)
        .order("start_time");
      setBookings((data as Booking[]) || []);
      setLoading(false);
    }
    load();
  }, [supabase, today]);

  async function updateStatus(id: string, status: string) {
    await supabase.from("bookings").update({ status }).eq("id", id);
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status } : b))
    );
  }

  const confirmed = bookings.filter((b) => b.status === "confirmed");
  const completed = bookings.filter((b) => b.status === "completed");
  const noShow = bookings.filter((b) => b.status === "no_show");

  return (
    <>
      <div className="mb-8">
        <h1 className="font-serif text-3xl text-gray-900 mb-2">
          Today&apos;s Bookings
        </h1>
        <p className="text-sm text-gray-500 font-sans">
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <StatCard label="Upcoming" value={confirmed.length} color="text-terracotta" />
        <StatCard label="Completed" value={completed.length} color="text-emerald-700" />
        <StatCard label="No-Show" value={noShow.length} color="text-gray-400" />
      </div>

      {loading ? (
        <p className="text-sm text-gray-400 font-sans">Loading bookings...</p>
      ) : bookings.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <div className="divide-y divide-gray-100">
            {bookings.map((b) => (
              <div key={b.id} className="p-5 flex items-center gap-4 flex-wrap">
                <div className="flex-1 min-w-[200px]">
                  <p className="font-serif text-lg text-gray-900">{b.customer_name}</p>
                  <p className="text-xs text-gray-500 font-sans mt-0.5">
                    {b.service?.[0]?.name || "General"} &middot;{" "}
                    {formatTime(b.start_time)}–{formatTime(b.end_time)}
                  </p>
                </div>

                {b.customer_phone && (
                  <a
                    href={`https://wa.me/${b.customer_phone.replace(/[^0-9]/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] tracking-[0.15em] uppercase text-emerald-700 font-sans font-semibold hover:underline"
                  >
                    WhatsApp
                  </a>
                )}

                <StatusBadge status={b.status} />

                {b.status === "confirmed" && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => updateStatus(b.id, "completed")}
                      className="px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] tracking-[0.15em] uppercase font-semibold font-sans hover:bg-emerald-100"
                    >
                      Complete
                    </button>
                    <button
                      onClick={() => updateStatus(b.id, "no_show")}
                      className="px-3 py-1.5 rounded-full bg-gray-100 text-gray-500 text-[10px] tracking-[0.15em] uppercase font-semibold font-sans hover:bg-gray-200"
                    >
                      No-Show
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

function StatCard({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: string;
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-5">
      <p className={`font-serif text-3xl ${color}`}>{value}</p>
      <p className="text-[10px] tracking-[0.2em] uppercase text-gray-400 font-sans mt-1">
        {label}
      </p>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    confirmed: "bg-blue-50 text-blue-700",
    completed: "bg-emerald-50 text-emerald-700",
    no_show: "bg-gray-100 text-gray-500",
    cancelled: "bg-red-50 text-red-700",
  };
  return (
    <span
      className={`px-2.5 py-1 rounded-full text-[10px] tracking-[0.1em] uppercase font-semibold font-sans ${
        styles[status] || "bg-gray-100 text-gray-500"
      }`}
    >
      {status.replace("_", " ")}
    </span>
  );
}

function EmptyState() {
  return (
    <div className="bg-white rounded-2xl border border-dashed border-gray-300 p-12 text-center">
      <p className="font-serif text-xl text-gray-900 mb-2">No bookings today</p>
      <p className="text-sm text-gray-500 font-sans">
        When customers book through Kamura, their appointments will appear here.
      </p>
    </div>
  );
}

function formatTime(t: string) {
  const [h, m] = t.split(":");
  const hr = parseInt(h);
  const ampm = hr >= 12 ? "PM" : "AM";
  const hr12 = hr % 12 || 12;
  return `${hr12}:${m} ${ampm}`;
}
