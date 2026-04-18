"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { listings } from "@/data/listings";
import { treatments } from "@/data/treatments";
import { FEATURED_PRACTITIONERS } from "@/data/featured-practitioners";
import ScoreTierPill from "@/components/member/ScoreTierPill";

const SERVICE_CATEGORIES = [
  "All",
  "Recovery",
  "Longevity",
  "Metabolic",
  "Cognitive",
  "Fitness",
  "Skin",
];

const SERVICE_CATEGORY_MAP: Record<string, string[]> = {
  Recovery: ["Peptides", "Regenerative Medicine"],
  Longevity: ["Peptides", "Longevity Pharmaceuticals", "Supplements & Nutraceuticals"],
  Metabolic: ["GLP-1 & Weight Management", "Hormones"],
  Cognitive: ["Peptides", "Supplements & Nutraceuticals"],
  Fitness: ["Exercise & Fitness", "Mind-Body & Movement"],
  Skin: ["Skin & Aesthetic Wellness"],
};

const CLINIC_CATEGORIES = [
  "All",
  "Longevity",
  "Peptides",
  "Fitness",
  "Yoga & Pilates",
  "Spa & Retreat",
];

const PRACTITIONER_SPECIALTIES = [
  "All",
  "Longevity",
  "Sports Med",
  "Metabolic",
  "Nutrition",
  "Regenerative",
  "Integrative",
];

export default function ExploreContent() {
  const [serviceCat, setServiceCat] = useState<string>("All");
  const [clinicCat, setClinicCat] = useState<string>("All");
  const [specialty, setSpecialty] = useState<string>("All");
  const [query, setQuery] = useState("");

  const topServices = useMemo(() => {
    let pool = treatments;
    if (serviceCat !== "All") {
      const allowed = SERVICE_CATEGORY_MAP[serviceCat] || [];
      pool = treatments.filter((t) => allowed.includes(t.category));
    }
    if (query.trim()) {
      const q = query.toLowerCase();
      pool = pool.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q) ||
          t.tags.some((tag) => tag.toLowerCase().includes(q))
      );
    }
    return [...pool].sort((a, b) => b.kamuraScore - a.kamuraScore).slice(0, 12);
  }, [serviceCat, query]);

  const featuredClinics = useMemo(() => {
    let pool = listings;
    if (clinicCat !== "All") {
      const q = clinicCat.toLowerCase();
      pool = listings.filter(
        (l) =>
          (l.services || []).some((s) => s.toLowerCase().includes(q)) ||
          l.category.toLowerCase().includes(q)
      );
    }
    if (query.trim()) {
      const q = query.toLowerCase();
      pool = pool.filter(
        (l) =>
          l.name.toLowerCase().includes(q) ||
          l.location.toLowerCase().includes(q) ||
          l.city.toLowerCase().includes(q)
      );
    }
    return pool.slice(0, 12);
  }, [clinicCat, query]);

  // Stable placeholder image per listing (no real photos in seed data yet)
  function clinicImage(id: string, category: string): string {
    const palette = [
      "photo-1540555700478-4be289fbecef",
      "photo-1600334089648-b0d9d3028eb2",
      "photo-1540206395-68808572332f",
      "photo-1545205597-3d9d02c29597",
      "photo-1576091160399-112ba8d25d1d",
      "photo-1544161515-4ab6ce6db874",
      "photo-1578496781985-452d4a934d50",
    ];
    void category;
    const hash = id.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
    return `https://images.unsplash.com/${palette[hash % palette.length]}?w=520&q=80`;
  }

  const practitioners = useMemo(() => {
    let pool = FEATURED_PRACTITIONERS;
    if (specialty !== "All") {
      const q = specialty.toLowerCase();
      pool = FEATURED_PRACTITIONERS.filter(
        (p) =>
          p.specialty.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    if (query.trim()) {
      const q = query.toLowerCase();
      pool = pool.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.specialty.toLowerCase().includes(q) ||
          p.city.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    return pool;
  }, [specialty, query]);

  return (
    <>
      {/* Hero */}
      <section className="pt-28 pb-10 md:pt-32 md:pb-14 bg-[#EDE7DB]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-end justify-between gap-8 flex-wrap">
            <div className="flex-1 min-w-0 max-w-2xl">
              <p className="text-[10px] tracking-[0.3em] uppercase text-terracotta font-sans font-semibold mb-4">
                Discover
              </p>
              <h1 className="font-serif text-4xl md:text-5xl text-gray-900 leading-[1.05] mb-4">
                Find your people.
              </h1>
              <p className="text-base text-gray-600 font-sans leading-relaxed">
                Every service, clinic, and practitioner — curated, verified,
                and scored. Start with what you want to treat, or jump straight
                to the people who deliver it.
              </p>
            </div>

            <div className="w-full md:w-[360px]">
              <div className="relative">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                >
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search treatments, clinics, experts…"
                  className="w-full bg-white border border-gray-200 rounded-full pl-11 pr-5 py-3.5 text-sm font-sans focus:outline-none focus:border-terracotta"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <HorizontalSection
        eyebrow="Services"
        title="By what you want to treat"
        categories={SERVICE_CATEGORIES}
        activeCategory={serviceCat}
        onCategoryChange={setServiceCat}
      >
        {topServices.length === 0 ? (
          <EmptyInline />
        ) : (
          topServices.map((t) => (
            <Link
              key={t.slug}
              href={`/treatments/${t.slug}`}
              className="group shrink-0 w-[220px] snap-start"
            >
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden mb-3 bg-gray-100">
                <Image
                  src={t.imageUrl}
                  alt={t.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="220px"
                />
                <div className="absolute top-3 left-3">
                  <ScoreTierPill score={t.kamuraScore} size="sm" />
                </div>
              </div>
              <p className="text-[10px] tracking-[0.2em] uppercase text-gray-400 font-sans mb-1">
                {t.category}
              </p>
              <h3 className="font-serif text-base text-gray-900 leading-tight group-hover:text-terracotta transition-colors line-clamp-2">
                {t.name}
              </h3>
            </Link>
          ))
        )}
      </HorizontalSection>

      <HorizontalSection
        eyebrow="Clinics"
        title="Centers worth visiting"
        categories={CLINIC_CATEGORIES}
        activeCategory={clinicCat}
        onCategoryChange={setClinicCat}
        alt
      >
        {featuredClinics.length === 0 ? (
          <EmptyInline />
        ) : (
          featuredClinics.map((l) => (
            <Link
              key={l.id}
              href={`/explore/${l.id}`}
              className="group shrink-0 w-[260px] snap-start"
            >
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden mb-3 bg-gray-100">
                <Image
                  src={clinicImage(l.id, l.category)}
                  alt={l.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="260px"
                />
                {l.featured && (
                  <span className="absolute top-3 left-3 px-2 py-1 rounded-full bg-white/90 backdrop-blur text-[9px] tracking-[0.15em] uppercase text-emerald-700 font-sans font-semibold">
                    ✓ Featured
                  </span>
                )}
              </div>
              <p className="text-[10px] tracking-[0.2em] uppercase text-gray-400 font-sans mb-1">
                {l.category}
              </p>
              <h3 className="font-serif text-base text-gray-900 leading-tight group-hover:text-terracotta transition-colors line-clamp-1">
                {l.name}
              </h3>
              <p className="text-xs text-gray-500 font-sans mt-0.5">
                {l.location || l.city}
              </p>
            </Link>
          ))
        )}
      </HorizontalSection>

      <HorizontalSection
        eyebrow="Your Experts"
        title="Kamura-verified practitioners"
        categories={PRACTITIONER_SPECIALTIES}
        activeCategory={specialty}
        onCategoryChange={setSpecialty}
      >
        {practitioners.length === 0 ? (
          <EmptyInline />
        ) : (
          practitioners.map((p) => (
            <Link
              key={p.slug}
              href={`/provider/${p.slug}`}
              className="group shrink-0 w-[240px] snap-start"
            >
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden mb-3 bg-gray-100">
                <Image
                  src={p.imageUrl}
                  alt={p.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="240px"
                />
                {p.verified && (
                  <span className="absolute top-3 left-3 px-2 py-1 rounded-full bg-white/90 backdrop-blur text-[9px] tracking-[0.15em] uppercase text-emerald-700 font-sans font-semibold">
                    ✓ Verified
                  </span>
                )}
              </div>
              <h3 className="font-serif text-base text-gray-900 leading-tight group-hover:text-terracotta transition-colors">
                {p.name}
              </h3>
              <p className="text-[11px] text-gray-500 font-sans mt-0.5">
                {p.specialty} · {p.city}
              </p>
              <div className="flex items-center gap-1.5 mt-1.5 text-[11px] font-sans">
                <span className="text-gray-700">★ {p.rating}</span>
                <span className="text-gray-300">·</span>
                <span className="text-gray-400">
                  From AED {p.startingPriceAed.toLocaleString()}
                </span>
              </div>
            </Link>
          ))
        )}
      </HorizontalSection>

      {/* Provider CTA */}
      <section className="py-20 bg-[#1a0f0c]">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-[10px] tracking-[0.3em] uppercase text-kamura-gold font-sans font-semibold mb-4">
            Are you a provider?
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-white leading-tight mb-4">
            Get listed on Kamura.
          </h2>
          <p className="text-base text-white/70 font-sans leading-relaxed mb-8 max-w-xl mx-auto">
            Join clinicians and practitioners reaching wellness-focused clients
            across the GCC. Free to list — verified listings get priority.
          </p>
          <Link
            href="/provider/signup"
            className="inline-block px-7 py-3.5 bg-white text-[#2a1612] text-xs tracking-[0.15em] uppercase font-semibold rounded-full hover:bg-white/90 transition-colors font-sans"
          >
            Create your provider profile
          </Link>
        </div>
      </section>
    </>
  );
}

function HorizontalSection({
  eyebrow,
  title,
  categories,
  activeCategory,
  onCategoryChange,
  children,
  alt = false,
}: {
  eyebrow: string;
  title: string;
  categories: string[];
  activeCategory: string;
  onCategoryChange: (c: string) => void;
  children: React.ReactNode;
  alt?: boolean;
}) {
  return (
    <section className={`py-14 md:py-16 ${alt ? "bg-[#FAF8F5]" : "bg-white"}`}>
      <div className="max-w-6xl mx-auto">
        <div className="px-6 mb-5">
          <p className="text-[10px] tracking-[0.3em] uppercase text-terracotta font-sans font-semibold mb-2">
            {eyebrow}
          </p>
          <h2 className="font-serif text-2xl md:text-3xl text-gray-900 leading-tight">
            {title}
          </h2>
        </div>

        <div className="flex items-center gap-2 mb-6 px-6 overflow-x-auto no-scrollbar">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => onCategoryChange(c)}
              className={`shrink-0 px-4 py-2 rounded-full text-xs font-sans font-semibold border transition-colors ${
                activeCategory === c
                  ? "bg-[#2a1612] text-white border-[#2a1612]"
                  : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="flex gap-4 md:gap-5 overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar pb-4 px-6">
          {children}
        </div>
      </div>

      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}

function EmptyInline() {
  return (
    <div className="w-full px-6">
      <p className="text-sm text-gray-400 font-sans italic">
        Nothing matches — try another filter.
      </p>
    </div>
  );
}
