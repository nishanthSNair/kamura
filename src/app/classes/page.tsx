import type { Metadata } from "next";
import { Suspense } from "react";
import { CLASS_STUDIOS, DISCIPLINES, EMIRATE_LABELS } from "@/data/classes";
import ClassesDirectoryClient from "./ClassesDirectoryClient";

export const metadata: Metadata = {
  title: "Wellness Classes in the UAE — Yoga, Pilates, Breathwork, Sound Healing | KAMURA",
  description:
    "Every kind of wellness class across Dubai and the UAE: yoga, reformer pilates, breathwork, sound healing, meditation, ice baths, mobility and barre. Verified studios, real prices, and free practice tracking.",
  alternates: { canonical: "https://kamuralife.com/classes" },
  openGraph: {
    title: "Wellness Classes in the UAE | KAMURA",
    description:
      "Yoga, pilates, breathwork, sound healing and more — verified UAE studios with real prices, plus free practice tracking.",
    url: "https://kamuralife.com/classes",
    type: "website",
  },
};

export default function ClassesPage() {
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Wellness classes in the UAE",
    numberOfItems: CLASS_STUDIOS.length,
    itemListElement: CLASS_STUDIOS.slice(0, 30).map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "ExerciseGym",
        name: s.name,
        url: s.url,
        address: {
          "@type": "PostalAddress",
          addressLocality: s.area,
          addressRegion: EMIRATE_LABELS[s.emirate],
          addressCountry: "AE",
        },
      },
    })),
  };

  return (
    <div className="bg-[#F7F3EB] min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-28 md:pt-36 pb-10">
        <p className="text-[10px] tracking-[0.3em] uppercase text-terracotta font-sans font-semibold mb-3">
          Free directory · {CLASS_STUDIOS.length > 0 ? `${CLASS_STUDIOS.length} verified studios` : "Verified studios"}
        </p>
        <h1 className="font-serif text-4xl md:text-6xl text-gray-900 leading-[1.05] mb-4 max-w-3xl">
          Every class worth taking in the UAE
        </h1>
        <p className="text-base md:text-lg text-gray-500 font-sans max-w-2xl">
          {DISCIPLINES.map((d) => d.label).join(", ")} — real studios, real drop-in prices,
          across {Object.values(EMIRATE_LABELS).slice(0, 2).join(" and ")} and beyond. Practice
          anything, track everything.
        </p>
      </section>

      {/* Directory */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <Suspense fallback={<div className="h-64 bg-[#EDE7DB] rounded-3xl animate-pulse" />}>
          <ClassesDirectoryClient />
        </Suspense>
      </section>
    </div>
  );
}
