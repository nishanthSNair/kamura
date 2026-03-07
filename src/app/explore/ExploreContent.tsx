"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  listings,
  listingCategoryColors,
  categoryDescriptions,
  type ListingCategory,
  type Listing,
} from "@/data/listings";
import { areas } from "@/data/areas";

const ALL_CATEGORIES: ListingCategory[] = [
  "Longevity Clinics",
  "Biohacking & Performance",
  "Holistic & Healing",
  "Yoga & Movement",
  "Wellness Retreats & Spas",
];

export default function ExploreContent() {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  // Fade-in on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0");
            entry.target.classList.remove("opacity-0", "translate-y-4");
          }
        });
      },
      { threshold: 0.1 }
    );
    const elements = document.querySelectorAll(".fade-in-on-scroll");
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [activeCategory]);

  const categoriesToShow =
    activeCategory === "All"
      ? ALL_CATEGORIES
      : ALL_CATEGORIES.filter((c) => c === activeCategory);

  function getListingsForCategory(category: ListingCategory): Listing[] {
    return listings.filter((l) => l.category === category);
  }

  function scrollToCategory(category: string) {
    setActiveCategory(category);
    if (category !== "All") {
      setTimeout(() => {
        const el = document.getElementById(`category-${category.replace(/\s+/g, "-").toLowerCase()}`);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 50);
    }
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1448375240586-882707db888b?w=1920&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-black/45" />
        <div className="relative z-10 text-center text-white px-6 max-w-3xl">
          <p className="text-xs tracking-[0.3em] uppercase mb-6 text-white/80">
            KAMURA Explore
          </p>
          <h1 className="text-4xl md:text-6xl font-serif mb-6 leading-tight">
            Explore Wellness in the UAE
          </h1>
          <p className="text-lg md:text-xl text-white/90 leading-relaxed font-sans">
            Curated experts, clinics, studios &amp; retreats — handpicked for
            your longevity journey.
          </p>
        </div>
      </section>

      {/* Browse by Area + Compare */}
      <section className="max-w-6xl mx-auto px-6 pt-10 pb-4">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-sm text-gray-500 dark:text-gray-400 font-sans">Browse by area:</span>
          {areas.map((area) => (
            <Link
              key={area.slug}
              href={`/explore/area/${area.slug}`}
              className="px-3 py-1.5 text-xs font-sans rounded-full border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-terracotta hover:text-terracotta transition-colors"
            >
              {area.name}
            </Link>
          ))}
          <span className="text-gray-200 dark:text-gray-700 mx-1">|</span>
          <Link
            href="/explore/compare"
            className="px-3 py-1.5 text-xs font-sans rounded-full border border-terracotta/30 text-terracotta hover:bg-terracotta/5 transition-colors"
          >
            Compare Centers
          </Link>
        </div>
      </section>

      {/* Category Filter */}
      <section className="sticky top-[65px] z-40 bg-white/95 dark:bg-[#0f0f0f]/95 backdrop-blur-sm border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex gap-2 overflow-x-auto no-scrollbar">
            {["All", ...ALL_CATEGORIES].map((cat) => (
              <button
                key={cat}
                onClick={() => scrollToCategory(cat)}
                className={`px-4 py-2 text-sm font-sans rounded-full border whitespace-nowrap transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 border-gray-900 dark:border-gray-100"
                    : "bg-white dark:bg-[#1a1a1a] text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-500"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Category Sections */}
      <div className="max-w-6xl mx-auto px-6 py-16 md:py-20">
        {categoriesToShow.map((category) => {
          const catListings = getListingsForCategory(category);
          const colors = listingCategoryColors[category];

          return (
            <section
              key={category}
              id={`category-${category.replace(/\s+/g, "-").toLowerCase()}`}
              className="mb-16 last:mb-0 scroll-mt-36"
            >
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-3">
                  <span
                    className={`text-xs px-2.5 py-1 rounded-full font-sans ${colors.bg} ${colors.text}`}
                  >
                    {catListings.length} {catListings.length === 1 ? "place" : "places"}
                  </span>
                </div>
                <h2 className="font-serif text-2xl md:text-3xl text-gray-900 dark:text-gray-100 mb-2">
                  {category}
                </h2>
                <p className="text-gray-500 dark:text-gray-400 font-sans leading-relaxed max-w-2xl">
                  {categoryDescriptions[category]}
                </p>
                <div className="w-12 h-px bg-terracotta/40 mt-4" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {catListings.map((listing, i) => (
                  <article
                    key={listing.id}
                    className="fade-in-on-scroll opacity-0 translate-y-4 transition-all duration-500 border border-gray-200 dark:border-gray-700 rounded-xl p-6 bg-white dark:bg-[#1a1a1a] hover:shadow-md flex flex-col"
                    style={{ transitionDelay: `${i * 80}ms` }}
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <span
                        className={`text-xs px-2.5 py-1 rounded-full font-sans ${colors.bg} ${colors.text}`}
                      >
                        {listing.category}
                      </span>
                      {listing.featured && (
                        <span className="text-xs px-2.5 py-1 rounded-full font-sans bg-terracotta/10 text-terracotta">
                          Featured
                        </span>
                      )}
                    </div>

                    <h3 className="font-serif text-xl text-gray-900 dark:text-gray-100 leading-snug mb-1">
                      <Link
                        href={`/explore/${listing.id}`}
                        className="hover:text-terracotta transition-colors"
                      >
                        {listing.name}
                      </Link>
                    </h3>
                    <p className="text-sm text-terracotta font-sans mb-3">
                      {listing.tagline}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed font-sans mb-4 flex-1">
                      {listing.description}
                    </p>

                    <div className="flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-400 font-sans mb-4">
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                      {listing.location}, {listing.city}
                    </div>

                    <a
                      href={listing.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm text-terracotta hover:text-terracotta-dark transition-colors font-sans"
                    >
                      Visit Website
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <line x1="7" y1="17" x2="17" y2="7" />
                        <polyline points="7 7 17 7 17 17" />
                      </svg>
                    </a>
                  </article>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      {/* Bottom CTA */}
      <section className="border-t border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50">
        <div className="max-w-xl mx-auto px-6 py-20 text-center">
          <h2 className="font-serif text-2xl text-gray-900 dark:text-gray-100 mb-4">
            Know a place we should feature?
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-8 font-sans leading-relaxed">
            We&apos;re always looking for outstanding wellness spaces across the
            UAE. If you know a clinic, studio, or practitioner we should
            include, let us know.
          </p>
          <a
            href="mailto:hello@kamuralife.com"
            className="inline-block bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 px-8 py-3 text-sm tracking-[0.1em] uppercase hover:bg-terracotta dark:hover:bg-terracotta dark:hover:text-white transition-colors font-sans"
          >
            Suggest a Place
          </a>
        </div>
      </section>
    </>
  );
}
