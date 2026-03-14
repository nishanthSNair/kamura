import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import { testimonials } from "@/data/testimonials";
import { treatments, ALL_TREATMENT_CATEGORIES } from "@/data/treatments";
import { listings } from "@/data/listings";
import BlogGrid from "./BlogGrid";
import InlineSearch from "@/components/InlineSearch";
import TopTreatmentsCarousel from "@/components/TopTreatmentsCarousel";
import FeaturedClinics from "@/components/FeaturedClinics";
import CategoryGrid from "@/components/CategoryGrid";

export const metadata: Metadata = {
  title: "KAMURA — Every Wellness Treatment. Scored. Transparent.",
  description:
    "The world's first unbiased wellness intelligence platform. Search 50+ treatments scored on evidence, safety, and community data. 48+ UAE clinics. Zero bias.",
};

const CATEGORY_ICONS: Record<string, string> = {
  Peptides: "\u{1F9EC}",
  "GLP-1 & Weight Management": "\u{1F48A}",
  Hormones: "\u{26A1}",
  "Devices & Biohacking": "\u{1F52C}",
  Supplements: "\u{1F33F}",
  "Holistic & Mind-Body": "\u{1F9D8}",
  "Detox & Functional": "\u{1F343}",
};

export default function Home() {
  const posts = getAllPosts();

  // Top 10 treatments by Kamura Score
  const topTreatments = [...treatments]
    .sort((a, b) => b.kamuraScore - a.kamuraScore)
    .slice(0, 10)
    .map((t) => ({
      slug: t.slug,
      name: t.name,
      icon: t.icon,
      kamuraScore: t.kamuraScore,
      evidenceLevel: t.evidenceLevel,
      category: t.category,
    }));

  // Featured clinics
  const featuredClinics = listings
    .filter((l) => l.featured)
    .slice(0, 6)
    .map((l) => ({
      id: l.id,
      name: l.name,
      tagline: l.tagline,
      location: l.location,
      city: l.city,
      category: l.category,
      services: l.services,
    }));

  // Category data
  const categoryData = ALL_TREATMENT_CATEGORIES.map((cat) => ({
    name: cat,
    icon: CATEGORY_ICONS[cat] || "\u{2728}",
    treatmentCount: treatments.filter((t) => t.category === cat).length,
  }));

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: "KAMURA",
        url: "https://kamuralife.com",
        description:
          "The world's first unbiased wellness intelligence platform",
        sameAs: ["https://www.instagram.com/kamaborea/"],
      },
      {
        "@type": "WebSite",
        name: "KAMURA",
        url: "https://kamuralife.com",
        potentialAction: {
          "@type": "SearchAction",
          target: "https://kamuralife.com/explore?q={search_term_string}",
          "query-input": "required name=search_term_string",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero — Search-Centric */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <span className="inline-block px-4 py-1.5 bg-kamura-gold/10 border border-kamura-gold/25 rounded-full text-[11px] font-semibold text-kamura-gold uppercase tracking-[0.12em] mb-6 font-sans">
            The World&apos;s First Unbiased Wellness Intelligence Platform
          </span>
          <h1 className="font-serif text-4xl md:text-[52px] font-bold leading-[1.15] mb-5 text-gray-900 dark:text-[#F5F0EB]">
            Every Wellness Treatment.{" "}
            <span className="text-terracotta">Scored.</span> Transparent.
          </h1>
          <p className="text-lg text-gray-500 dark:text-[#A89F95] max-w-[580px] mx-auto leading-relaxed font-sans mb-10">
            Search {treatments.length}+ treatments, {listings.length}+ clinics,
            and evidence-based articles — all scored on real data, not marketing.
          </p>

          <InlineSearch
            placeholder="Search treatments, clinics, or articles..."
            popularSearches={[
              "Peptides",
              "NAD+ Therapy",
              "Cryotherapy",
              "Red Light",
              "HBOT",
              "Semaglutide",
            ]}
          />
        </div>
      </section>

      {/* Browse by Category */}
      <section className="border-t border-gray-100 dark:border-gray-800">
        <div className="max-w-6xl mx-auto px-6 py-16 md:py-20">
          <div className="mb-8">
            <p className="text-xs tracking-[0.3em] uppercase mb-3 text-terracotta font-sans">
              Browse by Category
            </p>
            <h2 className="font-serif text-2xl md:text-3xl text-gray-900 dark:text-gray-100">
              Explore Treatment Categories
            </h2>
            <div className="w-12 h-px bg-terracotta/40 mt-5" />
          </div>
          <CategoryGrid categories={categoryData} />
        </div>
      </section>

      {/* Top Scored Treatments */}
      <section className="border-t border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/30">
        <div className="max-w-6xl mx-auto px-6 py-16 md:py-20">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-xs tracking-[0.3em] uppercase mb-3 text-terracotta font-sans">
                Treatment Index
              </p>
              <h2 className="font-serif text-2xl md:text-3xl text-gray-900 dark:text-gray-100">
                Top Scored Treatments
              </h2>
              <div className="w-12 h-px bg-terracotta/40 mt-5" />
            </div>
            <Link
              href="/treatments"
              className="hidden md:inline-block text-sm text-gray-500 dark:text-gray-400 hover:text-terracotta transition-colors font-sans"
            >
              View all {treatments.length} treatments &rarr;
            </Link>
          </div>
          <TopTreatmentsCarousel treatments={topTreatments} />
          <div className="mt-6 text-center md:hidden">
            <Link
              href="/treatments"
              className="text-sm text-gray-500 hover:text-terracotta transition-colors font-sans"
            >
              View all {treatments.length} treatments &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Clinics */}
      <section className="border-t border-gray-100 dark:border-gray-800">
        <div className="max-w-6xl mx-auto px-6 py-16 md:py-20">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-xs tracking-[0.3em] uppercase mb-3 text-terracotta font-sans">
                Verified Clinics
              </p>
              <h2 className="font-serif text-2xl md:text-3xl text-gray-900 dark:text-gray-100">
                Featured Wellness Centers
              </h2>
              <div className="w-12 h-px bg-terracotta/40 mt-5" />
            </div>
            <Link
              href="/explore"
              className="hidden md:inline-block text-sm text-gray-500 dark:text-gray-400 hover:text-terracotta transition-colors font-sans"
            >
              Explore all clinics &rarr;
            </Link>
          </div>
          <FeaturedClinics clinics={featuredClinics} />
          <div className="mt-6 text-center md:hidden">
            <Link
              href="/explore"
              className="text-sm text-gray-500 hover:text-terracotta transition-colors font-sans"
            >
              Explore all clinics &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Latest Articles */}
      <section className="border-t border-gray-100 dark:border-gray-800">
        <BlogGrid posts={posts} />
      </section>

      {/* Wellness Quiz CTA */}
      <section className="border-t border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50">
        <div className="max-w-4xl mx-auto px-6 py-20 md:py-24">
          <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
            <div className="flex-1 text-center md:text-left">
              <p className="text-xs tracking-[0.3em] uppercase mb-4 text-terracotta font-sans">
                Interactive Quiz
              </p>
              <h2 className="font-serif text-3xl md:text-4xl text-gray-900 dark:text-gray-100 mb-4 leading-snug">
                Discover Your Wellness Path
              </h2>
              <p className="text-gray-500 dark:text-gray-400 font-sans leading-relaxed mb-6">
                Are you The Biohacker, The Yogi, or The Healer? Take our 2-minute
                quiz to find your wellness score, your archetype, and personalized
                recommendations for your longevity journey.
              </p>
              <Link
                href="/quiz"
                className="inline-block bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 px-8 py-3 text-sm tracking-[0.15em] uppercase hover:bg-terracotta dark:hover:bg-terracotta dark:hover:text-white transition-colors font-sans"
              >
                Take the Quiz
              </Link>
            </div>
            <div className="flex gap-4 shrink-0">
              <div className="w-24 h-24 rounded-xl bg-amber-50 border border-amber-200 flex flex-col items-center justify-center p-3">
                <span className="font-serif text-2xl text-amber-800">10</span>
                <span className="text-xs text-amber-600 font-sans">Questions</span>
              </div>
              <div className="w-24 h-24 rounded-xl bg-emerald-50 border border-emerald-200 flex flex-col items-center justify-center p-3">
                <span className="font-serif text-2xl text-emerald-800">5</span>
                <span className="text-xs text-emerald-600 font-sans">Archetypes</span>
              </div>
              <div className="w-24 h-24 rounded-xl bg-rose-50 border border-rose-200 flex flex-col items-center justify-center p-3">
                <span className="font-serif text-2xl text-rose-800">2</span>
                <span className="text-xs text-rose-600 font-sans">Minutes</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="border-t border-gray-100 dark:border-gray-800">
        <div className="max-w-6xl mx-auto px-6 py-20 md:py-28">
          <div className="mb-12">
            <p className="text-xs tracking-[0.3em] uppercase mb-4 text-terracotta font-sans">
              Community
            </p>
            <h2 className="font-serif text-3xl md:text-4xl text-gray-900 dark:text-gray-100 mb-3">
              What People Are Saying
            </h2>
            <div className="w-12 h-px bg-terracotta/40 mt-6" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <div
                key={t.id}
                className="border border-gray-200 dark:border-gray-700 rounded-xl p-8 bg-white dark:bg-[#1a1a1a]"
              >
                <p className="font-serif text-lg text-gray-800 dark:text-gray-200 leading-relaxed mb-6 italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div>
                  <p className="font-sans text-sm font-medium text-gray-900 dark:text-gray-100">
                    {t.name}
                  </p>
                  <p className="font-sans text-xs text-gray-400 dark:text-gray-500">
                    {t.role}, {t.location}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
