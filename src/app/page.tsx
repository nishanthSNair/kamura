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

const CATEGORY_ORDER = [
  "Holistic & Mind-Body",
  "Devices & Biohacking",
  "Supplements",
  "Detox & Functional",
  "Hormones",
  "GLP-1 & Weight Management",
  "Peptides",
];

const CATEGORY_ICONS: Record<string, string> = {
  "Holistic & Mind-Body": "\u{1F9D8}",
  "Devices & Biohacking": "\u{1F52C}",
  Supplements: "\u{1F33F}",
  "Detox & Functional": "\u{1F343}",
  Hormones: "\u{26A1}",
  "GLP-1 & Weight Management": "\u{1F48A}",
  Peptides: "\u{1F9EC}",
};

export default function Home() {
  const posts = getAllPosts();

  // Balanced treatment selection: best from each category + top remaining
  const used = new Set<string>();
  const featuredTreatments: Array<{
    slug: string;
    name: string;
    icon: string;
    kamuraScore: number;
    evidenceLevel: (typeof treatments)[0]["evidenceLevel"];
    category: string;
  }> = [];

  for (const cat of CATEGORY_ORDER) {
    const best = treatments
      .filter((t) => t.category === cat)
      .sort((a, b) => b.kamuraScore - a.kamuraScore)[0];
    if (best) {
      featuredTreatments.push({
        slug: best.slug,
        name: best.name,
        icon: best.icon,
        kamuraScore: best.kamuraScore,
        evidenceLevel: best.evidenceLevel,
        category: best.category,
      });
      used.add(best.slug);
    }
  }
  const remaining = [...treatments]
    .filter((t) => !used.has(t.slug))
    .sort((a, b) => b.kamuraScore - a.kamuraScore);
  for (const t of remaining.slice(0, 3)) {
    featuredTreatments.push({
      slug: t.slug,
      name: t.name,
      icon: t.icon,
      kamuraScore: t.kamuraScore,
      evidenceLevel: t.evidenceLevel,
      category: t.category,
    });
  }

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

  // Category data — ordered with Holistic first, Peptides last
  const categoryData = CATEGORY_ORDER.map((cat) => ({
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

      {/* Hero — Nature + Search */}
      <section className="relative min-h-[70vh] flex items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=1920&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#F7F5F0]/85 via-[#F7F5F0]/70 to-[#F7F5F0]/95 dark:from-[#0f120e]/90 dark:via-[#0f120e]/75 dark:to-[#0f120e]/95" />
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center pt-24 pb-12">
          <span className="inline-block px-4 py-1.5 bg-sage/15 border border-sage/30 rounded-full text-[11px] font-semibold text-moss dark:text-sage uppercase tracking-[0.12em] mb-6 font-sans">
            The World&apos;s First Unbiased Wellness Intelligence Platform
          </span>
          <h1 className="font-serif text-4xl md:text-[52px] font-bold leading-[1.15] mb-5 text-gray-900 dark:text-[#F5F0EB]">
            Every Wellness Treatment.{" "}
            <span className="text-moss dark:text-sage">Scored.</span>{" "}
            Transparent.
          </h1>
          <p className="text-lg text-gray-600 dark:text-[#A89F95] max-w-[580px] mx-auto leading-relaxed font-sans mb-3">
            Search {treatments.length}+ treatments, {listings.length}+ clinics,
            and evidence-based articles — all scored on real data, not marketing.
          </p>
          <p className="text-sage-dark dark:text-sage/60 text-2xl mb-8 opacity-60">
            &#x1F422;
          </p>

          <InlineSearch
            placeholder="Search treatments, clinics, or articles..."
            popularSearches={[
              "Red Light",
              "Breathwork",
              "NAD+ Therapy",
              "Cryotherapy",
              "HBOT",
              "Sound Healing",
            ]}
          />
        </div>
      </section>

      {/* Browse by Category */}
      <section className="border-t border-sage-light/60 dark:border-forest/20 zen-pattern">
        <div className="max-w-6xl mx-auto px-6 py-16 md:py-20">
          <div className="mb-8">
            <p className="text-xs tracking-[0.3em] uppercase mb-3 text-moss dark:text-sage font-sans">
              Browse by Category
            </p>
            <h2 className="font-serif text-2xl md:text-3xl text-gray-900 dark:text-gray-100">
              Explore Treatment Categories
            </h2>
            <div className="w-12 h-px bg-sage/40 mt-5" />
          </div>
          <CategoryGrid categories={categoryData} />
        </div>
      </section>

      {/* Explore Our Treatment Index */}
      <section className="border-t border-sage-light/60 dark:border-forest/20 bg-zen-mist dark:bg-forest/10 zen-pattern">
        <div className="max-w-6xl mx-auto px-6 py-16 md:py-20">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-xs tracking-[0.3em] uppercase mb-3 text-moss dark:text-sage font-sans">
                Wellness Modalities
              </p>
              <h2 className="font-serif text-2xl md:text-3xl text-gray-900 dark:text-gray-100">
                Explore Our Treatment Index
              </h2>
              <div className="w-12 h-px bg-sage/40 mt-5" />
            </div>
            <Link
              href="/treatments"
              className="hidden md:inline-block text-sm text-gray-500 dark:text-gray-400 hover:text-moss transition-colors font-sans"
            >
              View all {treatments.length} treatments &rarr;
            </Link>
          </div>
          <TopTreatmentsCarousel treatments={featuredTreatments} />
          <div className="mt-6 text-center md:hidden">
            <Link
              href="/treatments"
              className="text-sm text-gray-500 hover:text-moss transition-colors font-sans"
            >
              View all {treatments.length} treatments &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Clinics */}
      <section className="border-t border-sage-light/60 dark:border-forest/20">
        <div className="max-w-6xl mx-auto px-6 py-16 md:py-20">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-xs tracking-[0.3em] uppercase mb-3 text-moss dark:text-sage font-sans">
                Verified Clinics
              </p>
              <h2 className="font-serif text-2xl md:text-3xl text-gray-900 dark:text-gray-100">
                Featured Wellness Centers
              </h2>
              <div className="w-12 h-px bg-sage/40 mt-5" />
            </div>
            <Link
              href="/explore"
              className="hidden md:inline-block text-sm text-gray-500 dark:text-gray-400 hover:text-moss transition-colors font-sans"
            >
              Explore all clinics &rarr;
            </Link>
          </div>
          <FeaturedClinics clinics={featuredClinics} />
          <div className="mt-6 text-center md:hidden">
            <Link
              href="/explore"
              className="text-sm text-gray-500 hover:text-moss transition-colors font-sans"
            >
              Explore all clinics &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Latest Articles */}
      <section className="border-t border-sage-light/60 dark:border-forest/20 bg-cream dark:bg-transparent">
        <BlogGrid posts={posts} />
      </section>

      {/* Wellness Quiz CTA */}
      <section className="border-t border-sage-light/60 dark:border-forest/20 bg-white dark:bg-forest/5">
        <div className="max-w-4xl mx-auto px-6 py-20 md:py-24">
          <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
            <div className="flex-1 text-center md:text-left">
              <p className="text-xs tracking-[0.3em] uppercase mb-4 text-moss dark:text-sage font-sans">
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
                className="inline-block bg-moss dark:bg-sage-light text-white dark:text-forest px-8 py-3 text-sm tracking-[0.15em] uppercase hover:bg-forest dark:hover:bg-sage dark:hover:text-forest transition-colors font-sans"
              >
                Take the Quiz
              </Link>
            </div>
            <div className="flex gap-4 shrink-0">
              <div className="w-24 h-24 rounded-xl bg-zen-mist border border-sage-light flex flex-col items-center justify-center p-3">
                <span className="font-serif text-2xl text-moss">10</span>
                <span className="text-xs text-sage-dark font-sans">Questions</span>
              </div>
              <div className="w-24 h-24 rounded-xl bg-zen-mist border border-sage-light flex flex-col items-center justify-center p-3">
                <span className="font-serif text-2xl text-moss">5</span>
                <span className="text-xs text-sage-dark font-sans">Archetypes</span>
              </div>
              <div className="w-24 h-24 rounded-xl bg-zen-mist border border-sage-light flex flex-col items-center justify-center p-3">
                <span className="font-serif text-2xl text-moss">2</span>
                <span className="text-xs text-sage-dark font-sans">Minutes</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="border-t border-sage-light/60 dark:border-forest/20 bg-zen-mist dark:bg-transparent zen-pattern">
        <div className="max-w-6xl mx-auto px-6 py-20 md:py-28">
          <div className="mb-12">
            <p className="text-xs tracking-[0.3em] uppercase mb-4 text-moss dark:text-sage font-sans">
              Community
            </p>
            <h2 className="font-serif text-3xl md:text-4xl text-gray-900 dark:text-gray-100 mb-3">
              What People Are Saying
            </h2>
            <div className="w-12 h-px bg-sage/40 mt-6" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <div
                key={t.id}
                className="border border-sage-light/60 dark:border-gray-700 rounded-xl p-8 bg-white dark:bg-[#1a1a1a]"
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
