"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

interface Review {
  id: string;
  customer_name: string;
  rating: number;
  comment: string;
  flagged: boolean;
  created_at: string;
}

export default function ReviewsPage() {
  const supabase = createClient();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from("reviews")
        .select("*")
        .order("created_at", { ascending: false });
      setReviews((data as Review[]) || []);
      setLoading(false);
    }
    load();
  }, [supabase]);

  async function toggleFlag(id: string, flagged: boolean) {
    await supabase.from("reviews").update({ flagged: !flagged }).eq("id", id);
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, flagged: !flagged } : r))
    );
  }

  const avgRating =
    reviews.length > 0
      ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
      : "—";

  const ratingDist = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((r) => r.rating === star).length,
  }));

  return (
    <>
      <div className="mb-8">
        <h1 className="font-serif text-3xl text-gray-900 mb-2">Reviews</h1>
        <p className="text-sm text-gray-500 font-sans">
          Customer feedback from Kamura bookings.
        </p>
      </div>

      {/* Rating summary */}
      <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-8 mb-8 bg-white rounded-2xl border border-gray-200 p-6">
        <div className="text-center">
          <p className="font-serif text-6xl text-gray-900">{avgRating}</p>
          <div className="flex justify-center gap-0.5 mt-2 mb-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg
                key={star}
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill={star <= Math.round(Number(avgRating)) ? "#B5736A" : "none"}
                stroke="#B5736A"
                strokeWidth="1.5"
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            ))}
          </div>
          <p className="text-xs text-gray-400 font-sans">
            {reviews.length} review{reviews.length !== 1 ? "s" : ""}
          </p>
        </div>

        <div className="space-y-2">
          {ratingDist.map((d) => (
            <div key={d.star} className="flex items-center gap-3">
              <span className="text-xs font-sans text-gray-500 w-5">{d.star}</span>
              <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-terracotta rounded-full transition-all"
                  style={{
                    width: reviews.length
                      ? `${(d.count / reviews.length) * 100}%`
                      : "0%",
                  }}
                />
              </div>
              <span className="text-xs font-sans text-gray-400 w-8 text-right">
                {d.count}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Review list */}
      {loading ? (
        <p className="text-sm text-gray-400 font-sans">Loading reviews...</p>
      ) : reviews.length === 0 ? (
        <div className="bg-white rounded-2xl border border-dashed border-gray-300 p-12 text-center">
          <p className="font-serif text-xl text-gray-900 mb-2">No reviews yet</p>
          <p className="text-sm text-gray-500 font-sans">
            Reviews from Kamura customers will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {reviews.map((r) => (
            <div
              key={r.id}
              className={`bg-white rounded-2xl border p-6 ${
                r.flagged ? "border-amber-300 bg-amber-50/30" : "border-gray-200"
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="font-serif text-lg text-gray-900">{r.customer_name}</p>
                  <p className="text-xs text-gray-400 font-sans mt-0.5">
                    {new Date(r.created_at).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill={star <= r.rating ? "#B5736A" : "none"}
                      stroke="#B5736A"
                      strokeWidth="1.5"
                    >
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  ))}
                </div>
              </div>
              {r.comment && (
                <p className="text-sm text-gray-600 font-sans leading-relaxed mb-4">
                  {r.comment}
                </p>
              )}
              <button
                onClick={() => toggleFlag(r.id, r.flagged)}
                className={`text-[10px] tracking-[0.15em] uppercase font-sans font-semibold ${
                  r.flagged
                    ? "text-amber-700 hover:text-amber-900"
                    : "text-gray-400 hover:text-amber-600"
                }`}
              >
                {r.flagged ? "Unflag" : "Flag Review"}
              </button>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
