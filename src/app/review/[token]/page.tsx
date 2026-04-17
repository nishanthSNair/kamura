"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

interface Booking {
  id: string;
  customer_name: string;
  booking_date: string;
  review_submitted: boolean;
  provider: { business_name: string; slug: string } | { business_name: string; slug: string }[] | null;
}

export default function ReviewSubmissionPage() {
  const params = useParams();
  const token = params.token as string;
  const supabase = createClient();

  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    async function load() {
      const { data, error: err } = await supabase
        .from("bookings")
        .select(
          "id, customer_name, booking_date, review_submitted, provider:providers(business_name, slug)"
        )
        .eq("review_token", token)
        .single();

      if (err || !data) {
        setError("Invalid or expired review link.");
        setLoading(false);
        return;
      }

      const b = data as Booking;
      setBooking(b);
      setName(b.customer_name);
      setLoading(false);
    }
    load();
  }, [supabase, token]);

  async function submit() {
    setSubmitting(true);
    setError("");

    const { error: err } = await supabase.rpc("submit_review", {
      p_review_token: token,
      p_customer_name: name,
      p_rating: rating,
      p_comment: comment,
    });

    if (err) {
      setError(err.message);
      setSubmitting(false);
      return;
    }

    setDone(true);
    setSubmitting(false);
  }

  const provider = booking
    ? Array.isArray(booking.provider)
      ? booking.provider[0]
      : booking.provider
    : null;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-sm text-gray-400 font-sans">Loading...</p>
      </div>
    );
  }

  if (error && !booking) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="max-w-md text-center">
          <p className="font-serif text-2xl text-gray-900 mb-3">Link invalid</p>
          <p className="text-sm text-gray-500 font-sans mb-6">{error}</p>
          <Link
            href="/"
            className="inline-block px-6 py-3 rounded-full bg-[#2a1612] text-white text-xs tracking-[0.15em] uppercase font-semibold font-sans"
          >
            Back to Kamura
          </Link>
        </div>
      </div>
    );
  }

  if (booking?.review_submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="max-w-md text-center">
          <p className="font-serif text-2xl text-gray-900 mb-3">
            Review already submitted
          </p>
          <p className="text-sm text-gray-500 font-sans mb-6">
            Thanks — you&apos;ve already reviewed this booking.
          </p>
          <Link
            href={`/provider/${provider?.slug}`}
            className="inline-block px-6 py-3 rounded-full bg-[#2a1612] text-white text-xs tracking-[0.15em] uppercase font-semibold font-sans"
          >
            View provider
          </Link>
        </div>
      </div>
    );
  }

  if (done) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="max-w-md text-center">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-4 text-3xl">
            ✓
          </div>
          <p className="font-serif text-2xl text-gray-900 mb-3">
            Review submitted
          </p>
          <p className="text-sm text-gray-500 font-sans mb-6">
            Thanks for helping the Kamura community. Your review is live on{" "}
            {provider?.business_name}&apos;s profile.
          </p>
          <Link
            href={`/provider/${provider?.slug}`}
            className="inline-block px-6 py-3 rounded-full bg-[#2a1612] text-white text-xs tracking-[0.15em] uppercase font-semibold font-sans"
          >
            View provider
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#EDE7DB] flex items-center justify-center px-6 py-20">
      <div className="w-full max-w-lg bg-white rounded-3xl p-8 md:p-10 shadow-lg">
        <p className="text-[10px] tracking-[0.3em] uppercase text-terracotta font-sans mb-3">
          Rate Your Visit
        </p>
        <h1 className="font-serif text-2xl text-gray-900 mb-2">
          How was {provider?.business_name}?
        </h1>
        <p className="text-sm text-gray-500 font-sans mb-8">
          Booking on {booking && new Date(booking.booking_date).toLocaleDateString()}.
          Your review helps others in the Kamura community.
        </p>

        {error && (
          <div className="mb-5 p-3 rounded-xl bg-red-50 border border-red-200 text-sm text-red-700 font-sans">
            {error}
          </div>
        )}

        <div className="space-y-6">
          <div>
            <label className="text-[10px] tracking-[0.2em] uppercase text-gray-500 font-sans block mb-3">
              Your name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm font-sans focus:outline-none focus:border-terracotta"
            />
          </div>

          <div>
            <label className="text-[10px] tracking-[0.2em] uppercase text-gray-500 font-sans block mb-3">
              Rating
            </label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  onClick={() => setRating(n)}
                  className="p-1"
                >
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill={n <= rating ? "#B5736A" : "none"}
                    stroke="#B5736A"
                    strokeWidth="1.5"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-[10px] tracking-[0.2em] uppercase text-gray-500 font-sans block mb-3">
              Your review (optional)
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={4}
              placeholder="Tell others what your visit was like..."
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm font-sans focus:outline-none focus:border-terracotta resize-none"
            />
          </div>
        </div>

        <button
          onClick={submit}
          disabled={!name || submitting}
          className="w-full mt-8 px-6 py-3.5 rounded-full bg-[#2a1612] text-white text-xs tracking-[0.15em] uppercase font-semibold font-sans hover:bg-[#1a0f0c] disabled:opacity-50"
        >
          {submitting ? "Submitting..." : "Submit Review"}
        </button>
      </div>
    </div>
  );
}
