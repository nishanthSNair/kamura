"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

interface Service {
  id: string;
  name: string;
  duration_minutes: number;
  price_aed: number;
}

interface Slot {
  start_time: string;
  end_time: string;
  duration_minutes: number;
}

interface Props {
  providerId: string;
  services: Service[];
}

export default function BookingWidget({ providerId, services }: Props) {
  const supabase = createClient();
  const [step, setStep] = useState<"service" | "date" | "slot" | "details" | "confirm" | "done">(
    "service"
  );
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date(Date.now() + 86400000).toISOString().split("T")[0]
  );
  const [slots, setSlots] = useState<Slot[]>([]);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [bookingUrl, setBookingUrl] = useState("");

  useEffect(() => {
    if (step !== "slot" || !selectedDate) return;
    async function loadSlots() {
      setSlotsLoading(true);
      const { data } = await supabase.rpc("get_available_slots", {
        p_provider_id: providerId,
        p_date: selectedDate,
      });
      setSlots((data as Slot[]) || []);
      setSlotsLoading(false);
    }
    loadSlots();
  }, [supabase, providerId, selectedDate, step]);

  function handleServicePick(s: Service) {
    setSelectedService(s);
    setStep("date");
  }

  async function submit() {
    if (!selectedService || !selectedSlot) return;
    setSubmitting(true);
    setError("");

    const { data, error: err } = await supabase.rpc("create_booking", {
      p_provider_id: providerId,
      p_service_id: selectedService.id,
      p_customer_name: name,
      p_customer_phone: phone,
      p_customer_email: email,
      p_booking_date: selectedDate,
      p_start_time: selectedSlot.start_time,
      p_end_time: selectedSlot.end_time,
      p_price_aed: selectedService.price_aed,
      p_notes: notes,
    });

    if (err) {
      setError(err.message);
      setSubmitting(false);
      return;
    }

    // Fetch review_token from booking
    if (data) {
      const { data: booking } = await supabase
        .from("bookings")
        .select("review_token")
        .eq("id", data)
        .single();
      if (booking?.review_token) {
        setBookingUrl(`/review/${booking.review_token}`);
      }
    }

    setStep("done");
    setSubmitting(false);
  }

  if (services.length === 0) {
    return (
      <div className="p-6 rounded-2xl border border-gray-200 bg-white">
        <p className="font-serif text-lg text-gray-900 mb-2">Booking unavailable</p>
        <p className="text-xs text-gray-500 font-sans">
          This provider hasn&apos;t added bookable services yet. Contact them directly.
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 rounded-2xl border border-gray-200 bg-white shadow-sm">
      <p className="text-[10px] tracking-[0.2em] uppercase text-terracotta font-sans mb-2">
        Book a Session
      </p>
      <h2 className="font-serif text-xl text-gray-900 mb-5">
        {step === "done" ? "You're booked!" : "Choose your session"}
      </h2>

      {error && (
        <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 font-sans">
          {error}
        </div>
      )}

      {/* Step 1: Service */}
      {step === "service" && (
        <div className="space-y-2">
          {services.map((s) => (
            <button
              key={s.id}
              onClick={() => handleServicePick(s)}
              className="w-full text-left p-4 rounded-xl border border-gray-200 hover:border-terracotta transition-colors"
            >
              <div className="flex justify-between items-start mb-1">
                <p className="font-serif text-base text-gray-900">{s.name}</p>
                <p className="text-sm font-sans text-gray-900 font-semibold">
                  AED {Number(s.price_aed).toLocaleString()}
                </p>
              </div>
              <p className="text-xs text-gray-400 font-sans">{s.duration_minutes} min</p>
            </button>
          ))}
        </div>
      )}

      {/* Step 2: Date */}
      {step === "date" && selectedService && (
        <div>
          <SelectedHeader service={selectedService} onChange={() => setStep("service")} />
          <label className="text-[10px] tracking-[0.2em] uppercase text-gray-500 font-sans block mb-2">
            Pick a date
          </label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            min={new Date().toISOString().split("T")[0]}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm font-sans mb-4 focus:outline-none focus:border-terracotta"
          />
          <button
            onClick={() => setStep("slot")}
            className="w-full px-5 py-3 rounded-full bg-[#2a1612] text-white text-xs tracking-[0.15em] uppercase font-semibold font-sans hover:bg-[#1a0f0c]"
          >
            See Available Times
          </button>
        </div>
      )}

      {/* Step 3: Slot */}
      {step === "slot" && selectedService && (
        <div>
          <SelectedHeader service={selectedService} onChange={() => setStep("service")} />
          <div className="mb-3 flex items-center justify-between">
            <p className="text-xs text-gray-500 font-sans">
              {new Date(selectedDate).toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
            </p>
            <button
              onClick={() => setStep("date")}
              className="text-[10px] tracking-[0.15em] uppercase text-terracotta font-sans font-semibold"
            >
              Change date
            </button>
          </div>

          {slotsLoading ? (
            <p className="text-xs text-gray-400 font-sans italic">Loading slots...</p>
          ) : slots.length === 0 ? (
            <p className="text-xs text-gray-400 font-sans italic">
              No slots available on this day. Try another date.
            </p>
          ) : (
            <div className="grid grid-cols-3 gap-2">
              {slots.map((slot, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setSelectedSlot(slot);
                    setStep("details");
                  }}
                  className="px-3 py-2.5 rounded-full border border-gray-200 hover:border-terracotta hover:bg-terracotta/5 text-xs font-sans font-semibold text-gray-700 transition-colors"
                >
                  {slot.start_time.slice(0, 5)}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Step 4: Details */}
      {step === "details" && selectedService && selectedSlot && (
        <div className="space-y-4">
          <SelectedHeader service={selectedService} onChange={() => setStep("service")} />
          <p className="text-xs text-gray-500 font-sans">
            {new Date(selectedDate).toLocaleDateString()} at{" "}
            {selectedSlot.start_time.slice(0, 5)}
          </p>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            required
            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm font-sans focus:outline-none focus:border-terracotta"
          />
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone (+971...)"
            required
            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm font-sans focus:outline-none focus:border-terracotta"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm font-sans focus:outline-none focus:border-terracotta"
          />
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={2}
            placeholder="Notes (optional)"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm font-sans focus:outline-none focus:border-terracotta resize-none"
          />
          <button
            onClick={submit}
            disabled={!name || !phone || submitting}
            className="w-full px-5 py-3 rounded-full bg-[#2a1612] text-white text-xs tracking-[0.15em] uppercase font-semibold font-sans hover:bg-[#1a0f0c] disabled:opacity-50"
          >
            {submitting ? "Booking..." : `Confirm — AED ${Number(selectedService.price_aed).toLocaleString()}`}
          </button>
          <p className="text-[10px] text-gray-400 font-sans text-center">
            You&apos;ll get a confirmation. No payment taken online yet.
          </p>
        </div>
      )}

      {/* Step 5: Done */}
      {step === "done" && selectedService && selectedSlot && (
        <div className="text-center py-4">
          <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-4 text-2xl">
            ✓
          </div>
          <p className="font-serif text-lg text-gray-900 mb-2">Booking confirmed</p>
          <p className="text-sm text-gray-500 font-sans mb-5">
            {selectedService.name} on{" "}
            {new Date(selectedDate).toLocaleDateString()} at{" "}
            {selectedSlot.start_time.slice(0, 5)}
          </p>
          {bookingUrl && (
            <Link
              href={bookingUrl}
              className="inline-block text-xs tracking-[0.15em] uppercase text-terracotta font-sans font-semibold hover:underline"
            >
              Save link to leave a review after your visit →
            </Link>
          )}
        </div>
      )}
    </div>
  );
}

function SelectedHeader({
  service,
  onChange,
}: {
  service: Service;
  onChange: () => void;
}) {
  return (
    <div className="flex items-center justify-between mb-4 p-3 rounded-xl bg-[#EDE7DB]/60">
      <div>
        <p className="text-[10px] tracking-[0.15em] uppercase text-gray-500 font-sans">
          Service
        </p>
        <p className="text-sm font-sans font-semibold text-gray-900">{service.name}</p>
      </div>
      <button
        onClick={onChange}
        className="text-[10px] tracking-[0.15em] uppercase text-terracotta font-sans font-semibold"
      >
        Change
      </button>
    </div>
  );
}
