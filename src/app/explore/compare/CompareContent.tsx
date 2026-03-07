"use client";

import { useState } from "react";
import Link from "next/link";
import {
  listings,
  listingCategoryColors,
  type Listing,
} from "@/data/listings";

const comparisonFields: { label: string; getValue: (l: Listing) => string }[] =
  [
    { label: "Category", getValue: (l) => l.category },
    {
      label: "Location",
      getValue: (l) => `${l.location}, ${l.city}`,
    },
    {
      label: "Services",
      getValue: (l) => l.services.join(", "),
    },
    {
      label: "Price Range",
      getValue: (l) => l.priceRange || "Not listed",
    },
    { label: "Hours", getValue: (l) => l.hours || "Not listed" },
    {
      label: "Phone",
      getValue: (l) => l.phone || "Not listed",
    },
    {
      label: "Website",
      getValue: (l) => l.website.replace(/^https?:\/\//, ""),
    },
  ];

export default function CompareContent() {
  const [selected, setSelected] = useState<(string | null)[]>([null, null]);

  function addSlot() {
    if (selected.length < 3) setSelected([...selected, null]);
  }

  function removeSlot(index: number) {
    if (selected.length > 2) {
      setSelected(selected.filter((_, i) => i !== index));
    }
  }

  function setSelection(index: number, listingId: string | null) {
    const updated = [...selected];
    updated[index] = listingId;
    setSelected(updated);
  }

  const selectedListings = selected.map((id) =>
    id ? listings.find((l) => l.id === id) || null : null
  );

  const hasSelections = selectedListings.some((l) => l !== null);

  return (
    <>
      {/* Hero */}
      <section className="relative h-[35vh] flex items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1448375240586-882707db888b?w=1920&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-black/45" />
        <div className="relative z-10 text-center text-white px-6 max-w-3xl">
          <p className="text-xs tracking-[0.3em] uppercase mb-4 text-white/80">
            KAMURA Compare
          </p>
          <h1 className="text-3xl md:text-5xl font-serif mb-4 leading-tight">
            Compare Wellness Centers
          </h1>
          <p className="text-base md:text-lg text-white/90 leading-relaxed font-sans">
            Select 2-3 centers to compare side by side
          </p>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="max-w-6xl mx-auto px-6 py-4">
        <nav className="flex items-center gap-2 text-sm font-sans text-gray-400 dark:text-gray-500">
          <Link
            href="/explore"
            className="hover:text-terracotta transition-colors"
          >
            Explore
          </Link>
          <span>/</span>
          <span className="text-gray-600 dark:text-gray-400">Compare</span>
        </nav>
      </div>

      <div className="max-w-6xl mx-auto px-6 pb-20">
        {/* Selector Row */}
        <div
          className={`grid gap-6 mb-10 ${selected.length === 3 ? "grid-cols-1 md:grid-cols-3" : "grid-cols-1 md:grid-cols-2"}`}
        >
          {selected.map((sel, i) => (
            <div
              key={i}
              className="border border-gray-200 dark:border-gray-700 rounded-xl p-5 bg-white dark:bg-[#1a1a1a]"
            >
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs text-gray-400 dark:text-gray-500 uppercase tracking-wider font-sans">
                  Center {i + 1}
                </p>
                {selected.length > 2 && (
                  <button
                    onClick={() => removeSlot(i)}
                    className="text-xs text-gray-400 dark:text-gray-500 hover:text-red-500 font-sans"
                  >
                    Remove
                  </button>
                )}
              </div>
              <select
                value={sel || ""}
                onChange={(e) =>
                  setSelection(i, e.target.value || null)
                }
                className="w-full text-sm font-sans border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2.5 bg-white dark:bg-[#141414] text-gray-800 dark:text-gray-200 focus:outline-none focus:border-terracotta"
              >
                <option value="">Select a listing...</option>
                {listings.map((l) => (
                  <option key={l.id} value={l.id}>
                    {l.name} — {l.category}
                  </option>
                ))}
              </select>
              {selectedListings[i] && (
                <div className="mt-3">
                  <span
                    className={`text-xs px-2.5 py-1 rounded-full font-sans ${listingCategoryColors[selectedListings[i]!.category].bg} ${listingCategoryColors[selectedListings[i]!.category].text}`}
                  >
                    {selectedListings[i]!.category}
                  </span>
                  <p className="text-sm text-terracotta font-sans mt-2">
                    {selectedListings[i]!.tagline}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Add Slot Button */}
        {selected.length < 3 && (
          <div className="text-center mb-10">
            <button
              onClick={addSlot}
              className="text-sm text-gray-500 dark:text-gray-400 hover:text-terracotta transition-colors font-sans border border-dashed border-gray-300 dark:border-gray-600 rounded-lg px-6 py-3 hover:border-terracotta"
            >
              + Add a third center to compare
            </button>
          </div>
        )}

        {/* Comparison Table */}
        {hasSelections && (
          <div className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
            {/* Header Row */}
            <div
              className={`grid border-b border-gray-200 dark:border-gray-700 ${selected.length === 3 ? "grid-cols-[160px_1fr_1fr_1fr]" : "grid-cols-[160px_1fr_1fr]"}`}
            >
              <div className="p-4 bg-gray-50 dark:bg-gray-800" />
              {selectedListings.map((l, i) => (
                <div
                  key={i}
                  className="p-4 bg-gray-50 dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700"
                >
                  {l ? (
                    <Link
                      href={`/explore/${l.id}`}
                      className="font-serif text-base text-gray-900 dark:text-gray-100 hover:text-terracotta transition-colors"
                    >
                      {l.name}
                    </Link>
                  ) : (
                    <span className="text-sm text-gray-300 dark:text-gray-600 font-sans">
                      Not selected
                    </span>
                  )}
                </div>
              ))}
            </div>

            {/* Data Rows */}
            {comparisonFields.map((field) => (
              <div
                key={field.label}
                className={`grid border-b border-gray-100 dark:border-gray-800 last:border-b-0 ${selected.length === 3 ? "grid-cols-[160px_1fr_1fr_1fr]" : "grid-cols-[160px_1fr_1fr]"}`}
              >
                <div className="p-4 bg-gray-50/50 dark:bg-gray-900/50 font-sans text-sm text-gray-500 dark:text-gray-400 font-medium">
                  {field.label}
                </div>
                {selectedListings.map((l, i) => (
                  <div
                    key={i}
                    className="p-4 text-sm font-sans text-gray-800 dark:text-gray-200 border-l border-gray-100 dark:border-gray-800"
                  >
                    {l ? field.getValue(l) : "—"}
                  </div>
                ))}
              </div>
            ))}

            {/* Action Row */}
            <div
              className={`grid border-t border-gray-200 dark:border-gray-700 ${selected.length === 3 ? "grid-cols-[160px_1fr_1fr_1fr]" : "grid-cols-[160px_1fr_1fr]"}`}
            >
              <div className="p-4 bg-gray-50/50 dark:bg-gray-900/50 font-sans text-sm text-gray-500 dark:text-gray-400 font-medium">
                Details
              </div>
              {selectedListings.map((l, i) => (
                <div
                  key={i}
                  className="p-4 border-l border-gray-100 dark:border-gray-800"
                >
                  {l ? (
                    <Link
                      href={`/explore/${l.id}`}
                      className="inline-block text-sm text-white dark:text-gray-900 bg-gray-900 dark:bg-gray-100 px-4 py-2 rounded-lg hover:bg-terracotta dark:hover:bg-terracotta dark:hover:text-white transition-colors font-sans"
                    >
                      View Full Profile
                    </Link>
                  ) : (
                    <span className="text-sm text-gray-300 dark:text-gray-600">—</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {!hasSelections && (
          <div className="border border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-16 text-center">
            <p className="text-gray-400 dark:text-gray-500 font-sans mb-2">
              Select at least one center above to start comparing
            </p>
            <p className="text-xs text-gray-300 dark:text-gray-600 font-sans">
              Compare services, location, pricing, and contact details side by
              side
            </p>
          </div>
        )}
      </div>

      {/* Back to Explore */}
      <div className="max-w-6xl mx-auto px-6 pb-16 text-center">
        <Link
          href="/explore"
          className="text-sm text-gray-800 dark:text-gray-200 underline underline-offset-4 hover:text-terracotta transition-colors font-sans"
        >
          &larr; Back to Explore
        </Link>
      </div>
    </>
  );
}
