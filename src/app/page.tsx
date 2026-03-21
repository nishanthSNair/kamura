import type { Metadata } from "next";
import Link from "next/link";
import { treatments, getTreatmentBySlug, getScoreColor, getScoreTier } from "@/data/treatments";
import { listings } from "@/data/listings";
import { CATEGORY_META } from "@/data/treatment-categories";
import { WELLNESS_GOALS } from "@/data/wellness-goals";
import { POPULAR_COMPARISONS } from "@/data/treatment-comparisons";
import { getAllPosts } from "@/lib/blog";
import { formatDate } from "@/lib/blog";
import InlineSearch from "@/components/InlineSearch";

export const metadata: Metadata = {
  title: "KAMURA — Every Wellness Treatment. Scored. Transparent.",
  description: `The world's first unbiased wellness intelligence platform. Search ${treatments.length}+ treatments scored on evidence, safety, and community data. ${listings.length}+ UAE clinics. Zero bias.`,
};

export default function Home() {
  const topTreatments = [...treatments]
    .sort((a, b) => b.kamuraScore - a.kamuraScore)
    .slice(0, 6);

  const featuredComparisons = POPULAR_COMPARISONS.slice(0, 6);

  const featuredGoals = WELLNESS_GOALS.slice(0, 8);

  const latestPosts = getAllPosts().slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: "KAMURA",
        url: "https://kamuralife.com",
        description:
          "The world's first unbiased wellness intelligence platform",
        sameAs: ["https://www.instagram.com/kamuralife/"],
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

      {/* Hero — Compact, clean, no background image */}
      <section className="pt-28 pb-16 md:pt-36 md:pb-20 bg-cream dark:bg-[#0f120e]">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h1 className="font-serif text-4xl md:text-[52px] font-bold leading-[1.15] mb-4 text-gray-900 dark:text-[#F5F0EB]">
            Every Wellness Treatment.{" "}
            <span className="text-moss dark:text-sage">Scored.</span>{" "}
            Transparent.
          </h1>

          <p className="text-lg text-gray-500 dark:text-[#A89F95] max-w-[540px] mx-auto leading-relaxed font-sans mb-8">
            Search {treatments.length}+ treatments and {listings.length}+ clinics — all scored on evidence, safety, and community data.
          </p>

          <InlineSearch
            placeholder="Search treatments, clinics, comparisons, or goals..."
            popularSearches={[
              "Best for Sleep",
              "NAD+ vs NMN",
              "Red Light",
              "Cryotherapy",
              "Best for Longevity",
              "Breathwork",
            ]}
          />

          {/* Stats row */}
          <div className="flex justify-center gap-8 md:gap-14 mt-10">
            {[
              { value: `${treatments.length}+`, label: "Treatments Scored" },
              { value: `${listings.length}+`, label: "UAE Clinics" },
              { value: "100%", label: "Evidence-Based" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-serif text-2xl md:text-3xl text-gray-900 dark:text-[#F5F0EB]">
                  {stat.value}
                </p>
                <p className="text-[11px] uppercase tracking-[0.15em] text-gray-400 dark:text-[#6B6560] font-sans mt-1">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-sage-light/40 dark:border-forest/20" />

      {/* Quick Paths */}
      <section className="py-12 md:py-16 bg-cream dark:bg-[#0f120e]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                href: "/treatments",
                label: "Browse Treatments",
                desc: `${treatments.length} treatments scored on 5 dimensions`,
                icon: "\uD83D\uDD2C",
              },
              {
                href: "/blueprint",
                label: "Build Your Blueprint",
                desc: "Personalized wellness protocol builder",
                icon: "\uD83E\uDDEC",
              },
              {
                href: "/quiz",
                label: "Take the Quiz",
                desc: "Get matched to your ideal treatments",
                icon: "\uD83C\uDFAF",
              },
            ].map((path) => (
              <Link
                key={path.href}
                href={path.href}
                className="flex items-start gap-4 p-5 rounded-xl border border-gray-200/80 dark:border-white/[0.08] bg-white/60 dark:bg-white/[0.03] hover:bg-white dark:hover:bg-white/[0.06] hover:shadow-sm transition-all group"
              >
                <span className="text-2xl mt-0.5">{path.icon}</span>
                <div>
                  <p className="font-sans text-sm font-semibold text-gray-900 dark:text-[#F5F0EB] group-hover:text-moss dark:group-hover:text-sage transition-colors">
                    {path.label}
                  </p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                    {path.desc}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Top Treatments */}
      <section className="py-12 md:py-16 bg-[#F3F1EC] dark:bg-[#131712]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="font-serif text-2xl md:text-3xl text-gray-900 dark:text-[#F5F0EB]">
                Top Rated Treatments
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 font-sans">
                Highest Kamura Scores based on research, safety, and community data
              </p>
            </div>
            <Link
              href="/treatments"
              className="hidden sm:inline-flex text-sm font-sans text-moss dark:text-sage hover:underline"
            >
              View all &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {topTreatments.map((t) => {
              const color = getScoreColor(t.kamuraScore);
              return (
                <Link
                  key={t.slug}
                  href={`/treatments/${t.slug}`}
                  className="flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-[#1a1f17] border border-gray-200/60 dark:border-white/[0.06] hover:shadow-md hover:border-gray-300 dark:hover:border-white/[0.12] transition-all group"
                >
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-base relative shrink-0 ${color.bg} ${color.text}`}
                  >
                    <span className={`absolute -inset-0.5 rounded-full border-[1.5px] ${color.border}`} />
                    {t.kamuraScore}
                  </div>
                  <div className="min-w-0">
                    <p className="font-sans text-sm font-semibold text-gray-900 dark:text-[#F5F0EB] group-hover:text-moss dark:group-hover:text-sage transition-colors truncate">
                      {t.name}
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-500 truncate">
                      {t.category} &middot; {t.evidenceLevel} evidence
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>

          <Link
            href="/treatments"
            className="sm:hidden inline-flex text-sm font-sans text-moss dark:text-sage hover:underline mt-6"
          >
            View all treatments &rarr;
          </Link>
        </div>
      </section>

      {/* Browse by Category */}
      <section className="py-12 md:py-16 bg-cream dark:bg-[#0f120e]">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="font-serif text-2xl md:text-3xl text-gray-900 dark:text-[#F5F0EB] mb-8">
            Browse by Category
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {CATEGORY_META.map((cat) => (
              <Link
                key={cat.slug}
                href={`/treatments/category/${cat.slug}`}
                className="flex items-center gap-3 px-4 py-3.5 rounded-xl border border-gray-200/80 dark:border-white/[0.08] bg-white/60 dark:bg-white/[0.03] hover:bg-white dark:hover:bg-white/[0.06] hover:shadow-sm transition-all group"
              >
                <span className="text-xl">{cat.icon}</span>
                <span className="font-sans text-sm text-gray-700 dark:text-gray-300 group-hover:text-moss dark:group-hover:text-sage transition-colors">
                  {cat.shortLabel}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Best For Goals */}
      <section className="py-12 md:py-16 bg-[#F3F1EC] dark:bg-[#131712]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="font-serif text-2xl md:text-3xl text-gray-900 dark:text-[#F5F0EB]">
                Best Treatments For...
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 font-sans">
                Find top-ranked treatments for your wellness goal
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {featuredGoals.map((goal) => (
              <Link
                key={goal.slug}
                href={`/treatments/best-for/${goal.slug}`}
                className="flex flex-col items-center gap-2 p-5 rounded-xl border border-gray-200/60 dark:border-white/[0.06] bg-white dark:bg-[#1a1f17] hover:shadow-md hover:border-gray-300 dark:hover:border-white/[0.12] transition-all text-center group"
              >
                <span className="text-2xl">{goal.icon}</span>
                <span className="font-sans text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-moss dark:group-hover:text-sage transition-colors">
                  {goal.label}
                </span>
              </Link>
            ))}
          </div>

          {WELLNESS_GOALS.length > 8 && (
            <div className="flex flex-wrap justify-center gap-2 mt-4">
              {WELLNESS_GOALS.slice(8).map((goal) => (
                <Link
                  key={goal.slug}
                  href={`/treatments/best-for/${goal.slug}`}
                  className="text-xs font-sans text-gray-500 dark:text-gray-400 hover:text-moss dark:hover:text-sage px-3 py-1.5 rounded-full border border-gray-200/60 dark:border-white/[0.06] hover:border-gray-300 dark:hover:border-white/[0.12] transition-all"
                >
                  {goal.icon} {goal.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Popular Comparisons */}
      <section className="py-12 md:py-16 bg-cream dark:bg-[#0f120e]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="font-serif text-2xl md:text-3xl text-gray-900 dark:text-[#F5F0EB]">
                Popular Comparisons
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 font-sans">
                Side-by-side treatment comparisons based on evidence
              </p>
            </div>
            <Link
              href="/treatments/compare"
              className="hidden sm:inline-flex text-sm font-sans text-moss dark:text-sage hover:underline"
            >
              Compare any two &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredComparisons.map((comp) => {
              const t1 = getTreatmentBySlug(comp.slug1);
              const t2 = getTreatmentBySlug(comp.slug2);
              if (!t1 || !t2) return null;
              const c1 = getScoreColor(t1.kamuraScore);
              const c2 = getScoreColor(t2.kamuraScore);

              return (
                <Link
                  key={`${comp.slug1}-${comp.slug2}`}
                  href={`/treatments/compare/${comp.slug1}-vs-${comp.slug2}`}
                  className="p-4 rounded-xl border border-gray-200/60 dark:border-white/[0.06] bg-white/60 dark:bg-white/[0.03] hover:bg-white dark:hover:bg-white/[0.06] hover:shadow-md transition-all group"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className={`text-sm font-bold ${c1.text}`}>{t1.kamuraScore}</span>
                      <span className="font-sans text-sm text-gray-800 dark:text-gray-200 truncate">
                        {t1.name}
                      </span>
                    </div>
                    <span className="text-xs font-sans font-semibold text-gray-400 dark:text-gray-500 uppercase shrink-0">
                      vs
                    </span>
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="font-sans text-sm text-gray-800 dark:text-gray-200 truncate text-right">
                        {t2.name}
                      </span>
                      <span className={`text-sm font-bold ${c2.text}`}>{t2.kamuraScore}</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-2 text-center group-hover:text-moss dark:group-hover:text-sage transition-colors">
                    View full comparison &rarr;
                  </p>
                </Link>
              );
            })}
          </div>

          <Link
            href="/treatments/compare"
            className="sm:hidden inline-flex text-sm font-sans text-moss dark:text-sage hover:underline mt-6"
          >
            Compare any two treatments &rarr;
          </Link>
        </div>
      </section>

      {/* Latest Articles */}
      {latestPosts.length > 0 && (
        <section className="py-12 md:py-16 bg-[#F3F1EC] dark:bg-[#131712]">
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex items-end justify-between mb-8">
              <div>
                <h2 className="font-serif text-2xl md:text-3xl text-gray-900 dark:text-[#F5F0EB]">
                  Latest Articles
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 font-sans">
                  Evidence-based wellness guides and insights
                </p>
              </div>
              <Link
                href="/blog"
                className="hidden sm:inline-flex text-sm font-sans text-moss dark:text-sage hover:underline"
              >
                All articles &rarr;
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {latestPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="rounded-xl border border-gray-200/60 dark:border-white/[0.06] bg-white dark:bg-[#1a1f17] hover:shadow-md hover:border-gray-300 dark:hover:border-white/[0.12] transition-all overflow-hidden group"
                >
                  {post.coverImage && (
                    <div className="aspect-[16/9] overflow-hidden">
                      <img
                        src={post.coverImage}
                        alt=""
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <div className="p-4">
                    <p className="text-[11px] uppercase tracking-wider text-gray-400 dark:text-gray-500 font-sans mb-1.5">
                      {post.category} &middot; {post.readingTime} min read
                    </p>
                    <h3 className="font-sans text-sm font-semibold text-gray-900 dark:text-[#F5F0EB] group-hover:text-moss dark:group-hover:text-sage transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-1.5 line-clamp-2">
                      {post.excerpt}
                    </p>
                  </div>
                </Link>
              ))}
            </div>

            <Link
              href="/blog"
              className="sm:hidden inline-flex text-sm font-sans text-moss dark:text-sage hover:underline mt-6"
            >
              All articles &rarr;
            </Link>
          </div>
        </section>
      )}

      {/* Explore Clinics CTA */}
      <section className="py-12 md:py-16 bg-cream dark:bg-[#0f120e]">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-serif text-2xl md:text-3xl text-gray-900 dark:text-[#F5F0EB] mb-3">
            Find Clinics Near You
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 font-sans mb-6 max-w-md mx-auto">
            Explore {listings.length}+ wellness clinics, spas, and biohacking studios across the UAE.
          </p>
          <Link
            href="/explore"
            className="inline-flex items-center gap-2 px-6 py-3 bg-moss dark:bg-sage/90 text-white dark:text-[#0f120e] rounded-lg font-sans text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            Explore Clinics
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>
      </section>
    </>
  );
}
