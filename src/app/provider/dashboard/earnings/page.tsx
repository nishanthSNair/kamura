"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

interface Booking {
  id: string;
  price_aed: number;
  status: string;
  booking_date: string;
  service: { name: string }[] | null;
}

interface Payout {
  id: string;
  amount_aed: number;
  period_start: string;
  period_end: string;
  status: string;
}

export default function EarningsPage() {
  const supabase = createClient();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [payouts, setPayouts] = useState<Payout[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const now = new Date();
      const monthStart = new Date(now.getFullYear(), now.getMonth(), 1)
        .toISOString()
        .split("T")[0];

      const [bookingsRes, payoutsRes] = await Promise.all([
        supabase
          .from("bookings")
          .select("id, price_aed, status, booking_date, service:services(name)")
          .in("status", ["completed"])
          .order("booking_date", { ascending: false }),
        supabase
          .from("payouts")
          .select("*")
          .order("period_start", { ascending: false }),
      ]);

      const allBookings = (bookingsRes.data as Booking[]) || [];
      setBookings(allBookings);
      setPayouts((payoutsRes.data as Payout[]) || []);

      void monthStart; // used for future filtering
      setLoading(false);
    }
    load();
  }, [supabase]);

  const now = new Date();
  const thisMonthBookings = bookings.filter((b) => {
    const d = new Date(b.booking_date);
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  });
  const monthlyTotal = thisMonthBookings.reduce((s, b) => s + Number(b.price_aed), 0);
  const allTimeTotal = bookings.reduce((s, b) => s + Number(b.price_aed), 0);

  // Group by service
  const byService = new Map<string, number>();
  thisMonthBookings.forEach((b) => {
    const name = b.service?.[0]?.name || "General";
    byService.set(name, (byService.get(name) || 0) + Number(b.price_aed));
  });

  const pendingPayouts = payouts.filter((p) => p.status === "pending");
  const completedPayouts = payouts.filter((p) => p.status === "completed");

  return (
    <>
      <div className="mb-8">
        <h1 className="font-serif text-3xl text-gray-900 mb-2">Earnings</h1>
        <p className="text-sm text-gray-500 font-sans">
          Revenue from completed Kamura bookings.
        </p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <p className="text-[10px] tracking-[0.2em] uppercase text-gray-400 font-sans mb-2">
            This Month
          </p>
          <p className="font-serif text-3xl text-gray-900">
            AED {monthlyTotal.toLocaleString()}
          </p>
          <p className="text-xs text-gray-400 font-sans mt-1">
            {thisMonthBookings.length} completed bookings
          </p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <p className="text-[10px] tracking-[0.2em] uppercase text-gray-400 font-sans mb-2">
            All Time
          </p>
          <p className="font-serif text-3xl text-gray-900">
            AED {allTimeTotal.toLocaleString()}
          </p>
          <p className="text-xs text-gray-400 font-sans mt-1">
            {bookings.length} total bookings
          </p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <p className="text-[10px] tracking-[0.2em] uppercase text-gray-400 font-sans mb-2">
            Pending Payouts
          </p>
          <p className="font-serif text-3xl text-amber-700">
            AED{" "}
            {pendingPayouts
              .reduce((s, p) => s + Number(p.amount_aed), 0)
              .toLocaleString()}
          </p>
          <p className="text-xs text-gray-400 font-sans mt-1">
            {pendingPayouts.length} pending
          </p>
        </div>
      </div>

      {/* Breakdown by service */}
      {loading ? (
        <p className="text-sm text-gray-400 font-sans">Loading earnings...</p>
      ) : (
        <>
          <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-8">
            <h2 className="font-serif text-xl text-gray-900 mb-5">
              This Month by Service
            </h2>
            {byService.size === 0 ? (
              <p className="text-sm text-gray-400 font-sans italic">
                No completed bookings this month.
              </p>
            ) : (
              <div className="space-y-3">
                {Array.from(byService.entries())
                  .sort((a, b) => b[1] - a[1])
                  .map(([service, total]) => (
                    <div key={service} className="flex items-center gap-4">
                      <p className="flex-1 text-sm font-sans text-gray-900">
                        {service}
                      </p>
                      <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-terracotta rounded-full"
                          style={{
                            width: `${(total / monthlyTotal) * 100}%`,
                          }}
                        />
                      </div>
                      <p className="text-sm font-sans text-gray-900 w-28 text-right">
                        AED {total.toLocaleString()}
                      </p>
                    </div>
                  ))}
              </div>
            )}
          </div>

          {/* Payout History */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-serif text-xl text-gray-900">Payout History</h2>
              <span className="text-[10px] tracking-[0.15em] uppercase text-gray-400 font-sans">
                Stripe Connect (coming soon)
              </span>
            </div>
            {completedPayouts.length === 0 && pendingPayouts.length === 0 ? (
              <p className="text-sm text-gray-400 font-sans italic">
                No payouts yet. Stripe Connect integration is coming soon.
              </p>
            ) : (
              <div className="divide-y divide-gray-100">
                {[...pendingPayouts, ...completedPayouts].map((p) => (
                  <div key={p.id} className="py-3 flex items-center gap-4">
                    <p className="flex-1 text-sm font-sans text-gray-900">
                      {p.period_start} — {p.period_end}
                    </p>
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] tracking-[0.1em] uppercase font-semibold font-sans ${
                        p.status === "completed"
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-amber-50 text-amber-700"
                      }`}
                    >
                      {p.status}
                    </span>
                    <p className="text-sm font-sans text-gray-900 w-28 text-right">
                      AED {Number(p.amount_aed).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
}
