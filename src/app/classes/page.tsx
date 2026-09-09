import PageIntro from '@/components/kamura/PageIntro';
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
    itemListElement: CLASS_STUDIOS.map((s, i) => ({
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
    <div className="bg-[#FAFCF7] min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />

      {/* Hero */}
      <PageIntro eyebrow="Classes & events / UAE" title="Find a practice that feels like you." description="Explore yoga, Pilates, breathwork and more across the UAE. Filter studios by discipline and location, then visit a studio to check its schedule." links={[{href:'/classes',label:'Classes & studios',active:true},{href:'/events',label:'Events'},{href:'/my/classes',label:'My practice'}]}/>

      {/* Directory */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <Suspense fallback={<div className="h-64 bg-[#E7F3EB] rounded-3xl animate-pulse" />}>
          <ClassesDirectoryClient />
        </Suspense>
      </section>
    </div>
  );
}
