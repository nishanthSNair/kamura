"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

interface Booking {
  id: string;
  booking_date: string;
  start_time: string;
  end_time: string;
  status: string;
  price_aed: number;
  notes: string;
  review_token: string | null;
  review_submitted: boolean;
  service: { name: string } | { name: string }[] | null;
  provider: { business_name: string; slug: string; phone: string } | { business_name: string; slug: string; phone: string }[] | null;
}

function normalize<T>(x: T | T[] | null | undefined): T | null {
  if (!x) return null;
  return Array.isArray(x) ? (x[0] ?? null) : x;
}

export default function BookingsPage() {
  const supabase = createClient();
  const [tab, setTab] = useState<"upcoming" | "past">("upcoming");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      const { data } = await supabase
        .from("bookings")
        .select(
          "id, booking_date, start_time, end_time, status, price_aed, notes, review_token, review_submitted, service:services(name), provider:providers(business_name, slug, phone)"
        )
        .eq("customer_email", user.email || "")
        .order("booking_date", { ascending: false })
        .order("start_time", { ascending: false });

      setBookings((data as Booking[]) || []);
      setLoading(false);
    }
    load();
  }, [supabase]);

  const today = new Date().toISOString().split("T")[0];
  const upcoming = bookings.filter(
    (b) => b.booking_date >= today && b.status === "confirmed"
  );
  const past = bookings.filter(
    (b) => b.booking_date < today || b.status === "completed" || b.status === "no_show"
  );
  const visible = tab === "upcoming" ? upcoming : past;

  return (
    <>
      <div className="mb-8">
        <p className="text-[10px] tracking-[0.3em] uppercase text-terracotta font-sans mb-2">
          Bookings
        </p>
        <h1 className="font-serif text-3xl md:text-4xl text-gray-900 leading-tight mb-3">
          Your sessions
        </h1>
        <p className="text-sm text-gray-500 font-sans max-w-xl">
          Upcoming appointments and past visits — provider notes and review
          links live here.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 mb-6 border-b border-gray-200">
        <TabButton
          active={tab === "upcoming"}
          onClick={() => setTab("upcoming")}
          label={`Upcoming (${upcoming.length})`}
        />
        <TabButton
          active={tab === "past"}
          onClick={() => setTab("past")}
          label={`Past (${past.length})`}
        />
        <Link
          href="/explore"
          className="ml-auto text-[10px] tracking-[0.15em] uppercase text-terracotta font-sans font-semibold hover:underline"
        >
          Browse Providers →
        </Link>
      </div>

      {loading ? (
        <p className="text-sm text-gray-400 font-sans">Loading bookings...</p>
      ) : visible.length === 0 ? (
        <div className="p-12 rounded-2xl bg-white border border-dashed border-gray-300 text-center">
          <p className="font-serif text-xl text-gray-900 mb-2">
            {tab === "upcoming" ? "Nothing booked" : "No past sessions"}
          </p>
          <p className="text-sm text-gray-500 font-sans mb-6 max-w-md mx-auto">
            {tab === "upcoming"
              ? "Find a practitioner and book your first session."
              : "Your session history will appear here."}
          </p>
          {tab === "upcoming" && (
            <Link
              href="/explore"
              className="px-5 py-2.5 rounded-full bg-[#2a1612] text-white text-xs tracking-[0.15em] uppercase font-semibold font-sans hover:bg-[#1a0f0c] transition-colors"
            >
              Browse Providers
            </Link>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {visible.map((b) => {
            const service = normalize(b.service);
            const provider = normalize(b.provider);
            return (
              <div
                key={b.id}
                className="p-5 md:p-6 bg-white rounded-2xl border border-gray-200"
              >
                <div className="flex items-start justify-between flex-wrap gap-4">
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] tracking-[0.2em] uppercase text-gray-400 font-sans mb-1">
                      {new Date(b.booking_date).toLocaleDateString("en-US", {
                        weekday: "long",
                        month: "long",
                        day: "numeric",
                      })}{" "}
                      · {b.start_time.slice(0, 5)}
                    </p>
                    <h3 className="font-serif text-xl text-gray-900 mb-1">
                      {provider?.business_name || "Provider"}
                    </h3>
                    <p className="text-sm text-gray-500 font-sans">
                      {service?.name || "Session"}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-serif text-lg text-gray-900">
                      AED {Number(b.price_aed).toLocaleString()}
                    </p>
                    <StatusBadge status={b.status} />
                  </div>
                </div>

                {b.notes && (
                  <p className="mt-4 text-sm text-gray-600 font-sans italic border-t border-gray-100 pt-3">
                    &ldquo;{b.notes}&rdquo;
                  </p>
                )}

                <div className="mt-4 flex items-center gap-3 flex-wrap">
                  {provider?.slug && (
                    <Link
                      href={`/provider/${provider.slug}`}
                      className="text-[10px] tracking-[0.15em] uppercase text-terracotta font-sans font-semibold hover:underline"
                    >
                      View provider
                    </Link>
                  )}
                  {provider?.phone && tab === "upcoming" && (
                    <a
                      href={`https://wa.me/${provider.phone.replace(/[^0-9]/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] tracking-[0.15em] uppercase text-emerald-700 font-sans font-semibold hover:underline"
                    >
                      WhatsApp
                    </a>
                  )}
                  {b.review_token && !b.review_submitted && tab === "past" && (
                    <Link
                      href={`/review/${b.review_token}`}
                      className="text-[10px] tracking-[0.15em] uppercase text-terracotta font-sans font-semibold hover:underline"
                    >
                      Leave a review
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}

function TabButton({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-3 text-sm font-sans border-b-2 transition-colors ${
        active
          ? "border-terracotta text-gray-900 font-semibold"
          : "border-transparent text-gray-500 hover:text-gray-900"
      }`}
    >
      {label}
    </button>
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
      className={`inline-block mt-2 px-2.5 py-1 rounded-full text-[10px] tracking-[0.1em] uppercase font-semibold font-sans ${
        styles[status] || "bg-gray-100 text-gray-500"
      }`}
    >
      {status.replace("_", " ")}
    </span>
  );
}
