import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { treatments, getScoreColor } from "@/data/treatments";
import { WELLNESS_GOALS } from "@/data/wellness-goals";
import { getAllPosts } from "@/lib/blog";
import InlineSearch from "@/components/InlineSearch";
import FadeInOnScroll from "@/components/FadeInOnScroll";
import KamuraScoreBadge from "@/components/treatments/KamuraScoreBadge";

export const metadata: Metadata = {
  title: "KAMURA — The Heart of Longevity",
  description: `The world's first unbiased wellness intelligence platform. Search ${treatments.length}+ treatments scored on evidence, safety, and community data. Zero bias.`,
};

export default function Home() {
  const topTreatments = [...treatments]
    .sort((a, b) => b.kamuraScore - a.kamuraScore)
    .slice(0, 7);

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

      {/* ── Hero — Full viewport immersive ── */}
      <section className="relative h-screen min-h-[600px] max-h-[1200px] flex items-center justify-center overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="/images/hero-home.png"
            alt="A serene sun-drenched wellness interior with arched windows and a reflective pool"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
            quality={85}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/10 to-black/50" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/15 via-transparent to-black/10" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-normal leading-[1.05] text-white mb-6 tracking-[-0.01em]">
            The Heart of
            <br />
            <em className="italic font-light">Longevity</em>
          </h1>

          <p className="text-base md:text-lg text-white/75 max-w-[480px] mx-auto leading-relaxed font-sans font-light mb-10">
            Discover evidence-based treatments, build personalized protocols,
            and find the path to your best self.
          </p>

          <div className="max-w-[520px] mx-auto">
            <InlineSearch
              placeholder="What are you looking for?"
              popularSearches={[
                "Best for Sleep",
                "NAD+ vs NMN",
                "Red Light Therapy",
                "Longevity",
              ]}
              variant="hero"
            />
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 animate-gentle-bounce">
          <span className="text-xs uppercase tracking-[0.2em] text-white/60 font-sans">
            Explore
          </span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-white/60">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </section>

      {/* ── Welcome / Philosophy ── */}
      <section className="py-24 md:py-36 bg-cream dark:bg-[#14110E] zen-pattern">
        <FadeInOnScroll>
          <div className="max-w-2xl mx-auto px-6 text-center">
            <div className="w-12 h-[1px] bg-terracotta/40 mx-auto mb-8" />

            <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl text-gray-900 dark:text-[#F0EBE2] leading-[1.4] mb-6">
              We believe wellness should be{" "}
              <em className="italic text-terracotta dark:text-terracotta">transparent</em>,
              personal, and rooted in evidence.
            </h2>

            <p className="text-base text-gray-500 dark:text-[#A89F90] leading-relaxed font-sans max-w-lg mx-auto">
              KAMURA scores every treatment on research, safety, and real community
              experience — so you can make informed choices about your health with
              clarity and confidence.
            </p>

            <div className="w-12 h-[1px] bg-terracotta/40 mx-auto mt-8" />
          </div>
        </FadeInOnScroll>
      </section>

      {/* ── Discover — Editorial Feature Cards ── */}
      <section className="py-20 md:py-28 bg-[#EDE7DB] dark:bg-[#1A1610]">
        <div className="max-w-6xl mx-auto px-6">
          <FadeInOnScroll>
            <p className="text-xs uppercase tracking-[0.2em] text-terracotta font-sans mb-3 text-center">
              Start Your Journey
            </p>
            <h2 className="font-serif text-2xl md:text-3xl text-gray-900 dark:text-[#F0EBE2] text-center mb-14">
              Three Ways to Discover
            </h2>
          </FadeInOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Large left card — Browse Treatments */}
            <FadeInOnScroll delay={100}>
              <Link
                href="/treatments"
                className="group relative block rounded-2xl overflow-hidden aspect-[4/5] md:aspect-auto md:row-span-2 hover:shadow-xl transition-all duration-500"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent z-10" />
                <img
                  src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80"
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
                  <p className="text-xs uppercase tracking-[0.2em] text-white/60 font-sans mb-2">
                    {treatments.length}+ treatments scored
                  </p>
                  <h3 className="font-serif text-2xl md:text-3xl text-white mb-2">
                    Explore Treatments
                  </h3>
                  <p className="text-sm text-white/70 font-sans leading-relaxed max-w-[320px]">
                    Every treatment scored on research evidence, safety,
                    community experience, accessibility, and value.
                  </p>
                  <span className="inline-flex items-center gap-1.5 mt-4 text-sm text-white/80 font-sans group-hover:text-white transition-colors">
                    Browse all
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:translate-x-1 transition-transform">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </span>
                </div>
              </Link>
            </FadeInOnScroll>

            {/* Top right card — Wellness Checker */}
            <FadeInOnScroll delay={200}>
              <Link
                href="/blueprint"
                className="group relative block rounded-2xl overflow-hidden aspect-[16/9] hover:shadow-xl transition-all duration-500"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent z-10" />
                <img
                  src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80"
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                  <h3 className="font-serif text-xl text-white mb-1">
                    Wellness Checker
                  </h3>
                  <p className="text-sm text-white/70 font-sans">
                    Tap your body, pick your concerns, get personalized treatment recommendations.
                  </p>
                </div>
              </Link>
            </FadeInOnScroll>

            {/* Bottom right card — Take the Quiz */}
            <FadeInOnScroll delay={300}>
              <Link
                href="/quiz"
                className="group relative block rounded-2xl overflow-hidden aspect-[16/9] hover:shadow-xl transition-all duration-500"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent z-10" />
                <img
                  src="https://images.unsplash.com/photo-1545389336-cf090694435e?w=800&q=80"
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                  <h3 className="font-serif text-xl text-white mb-1">
                    Find Your Match
                  </h3>
                  <p className="text-sm text-white/70 font-sans">
                    Answer a few questions and discover treatments aligned to you.
                  </p>
                </div>
              </Link>
            </FadeInOnScroll>
          </div>
        </div>
      </section>

      {/* ── Curated Treatments ── */}
      <section className="py-20 md:py-28 bg-cream dark:bg-[#14110E]">
        <div className="max-w-6xl mx-auto px-6">
          <FadeInOnScroll>
            <div className="flex items-end justify-between mb-12">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-terracotta font-sans mb-3">
                  Evidence-Based
                </p>
                <h2 className="font-serif text-2xl md:text-3xl text-gray-900 dark:text-[#F0EBE2]">
                  Highest Rated Treatments
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 font-sans max-w-md">
                  Treatments with the strongest research, safety profiles, and community validation.
                </p>
              </div>
              <Link
                href="/treatments"
                className="hidden sm:inline-flex text-sm font-sans text-moss dark:text-sage hover:underline underline-offset-4"
              >
                View all &rarr;
              </Link>
            </div>
          </FadeInOnScroll>

          {/* Featured treatment — large card */}
          <FadeInOnScroll delay={100}>
            <Link
              href={`/treatments/${topTreatments[0].slug}`}
              className="block mb-5 rounded-2xl bg-white dark:bg-[#201C16] border border-gray-200/40 dark:border-white/[0.06] p-6 md:p-8 hover:shadow-lg transition-all duration-500 group"
            >
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                <KamuraScoreBadge score={topTreatments[0].kamuraScore} size="lg" showLabel />
                <div className="flex-1">
                  <p className="text-xs uppercase tracking-[0.15em] text-gray-400 dark:text-gray-500 font-sans mb-1">
                    {topTreatments[0].category} &middot; {topTreatments[0].evidenceLevel} Evidence
                  </p>
                  <h3 className="font-serif text-xl md:text-2xl text-gray-900 dark:text-[#F0EBE2] group-hover:text-moss dark:group-hover:text-sage transition-colors mb-2">
                    {topTreatments[0].name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 font-sans leading-relaxed max-w-xl">
                    {topTreatments[0].description}
                  </p>
                </div>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gray-300 dark:text-gray-600 group-hover:text-moss dark:group-hover:text-sage group-hover:translate-x-1 transition-all shrink-0 hidden md:block">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </div>
            </Link>
          </FadeInOnScroll>

          {/* Remaining treatments — compact grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {topTreatments.slice(1, 7).map((t, i) => {
              const color = getScoreColor(t.kamuraScore);
              return (
                <FadeInOnScroll key={t.slug} delay={150 + i * 50}>
                  <Link
                    href={`/treatments/${t.slug}`}
                    className="flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-[#201C16] border border-gray-200/40 dark:border-white/[0.06] hover:shadow-md hover:border-gray-300 dark:hover:border-white/[0.12] transition-all duration-300 group"
                  >
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-base relative shrink-0 ${color.bg} ${color.text}`}
                    >
                      <span className={`absolute -inset-0.5 rounded-full border-[1.5px] ${color.border}`} />
                      {t.kamuraScore}
                    </div>
                    <div className="min-w-0">
                      <p className="font-sans text-sm font-semibold text-gray-900 dark:text-[#F0EBE2] group-hover:text-moss dark:group-hover:text-sage transition-colors truncate">
                        {t.name}
                      </p>
                      <p className="text-xs text-gray-400 dark:text-gray-500 truncate">
                        {t.category} &middot; {t.evidenceLevel} evidence
                      </p>
                    </div>
                  </Link>
                </FadeInOnScroll>
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

      {/* ── Wellness Goals — Horizontal Scroll Strip ── */}
      <section className="py-20 md:py-28 bg-[#EDE7DB] dark:bg-[#1A1610] overflow-hidden">
        <div className="max-w-6xl mx-auto px-6">
          <FadeInOnScroll>
            <p className="text-xs uppercase tracking-[0.2em] text-terracotta font-sans mb-3 text-center">
              Personalized Paths
            </p>
            <h2 className="font-serif text-2xl md:text-3xl text-gray-900 dark:text-[#F0EBE2] text-center mb-4">
              What Are You Seeking?
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-sans text-center max-w-md mx-auto mb-12">
              Find the highest-rated treatments for your specific wellness goal.
            </p>
          </FadeInOnScroll>

          <FadeInOnScroll delay={100}>
            <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-2 -mx-6 px-6 snap-x">
              {WELLNESS_GOALS.map((goal) => (
                <Link
                  key={goal.slug}
                  href={`/treatments/best-for/${goal.slug}`}
                  className="flex items-center gap-3 px-6 py-4 rounded-full border border-gray-200/60 dark:border-white/[0.06] bg-white dark:bg-[#201C16] hover:shadow-md hover:border-sage/40 dark:hover:border-sage/20 transition-all duration-300 shrink-0 snap-start group"
                >
                  <span className="text-lg">{goal.icon}</span>
                  <span className="font-sans text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-moss dark:group-hover:text-sage transition-colors whitespace-nowrap">
                    {goal.label}
                  </span>
                </Link>
              ))}
            </div>
          </FadeInOnScroll>
        </div>
      </section>

      {/* ── Stories / Blog — Editorial Magazine Layout ── */}
      {latestPosts.length > 0 && (
        <section className="py-20 md:py-28 bg-cream dark:bg-[#14110E]">
          <div className="max-w-6xl mx-auto px-6">
            <FadeInOnScroll>
              <div className="flex items-end justify-between mb-12">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-terracotta font-sans mb-3">
                    Wellness Stories
                  </p>
                  <h2 className="font-serif text-2xl md:text-3xl text-gray-900 dark:text-[#F0EBE2]">
                    Latest from the Journal
                  </h2>
                </div>
                <Link
                  href="/blog"
                  className="hidden sm:inline-flex text-sm font-sans text-moss dark:text-sage hover:underline underline-offset-4"
                >
                  Read all &rarr;
                </Link>
              </div>
            </FadeInOnScroll>

            {/* Featured post — large hero card */}
            <FadeInOnScroll delay={100}>
              <Link
                href={`/blog/${latestPosts[0].slug}`}
                className="block rounded-2xl overflow-hidden bg-white dark:bg-[#201C16] border border-gray-200/40 dark:border-white/[0.06] hover:shadow-xl transition-all duration-500 group mb-5"
              >
                <div className="grid grid-cols-1 md:grid-cols-2">
                  {latestPosts[0].coverImage && (
                    <div className="aspect-[16/10] md:aspect-auto overflow-hidden">
                      <img
                        src={latestPosts[0].coverImage}
                        alt=""
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                    </div>
                  )}
                  <div className="p-6 md:p-10 flex flex-col justify-center">
                    <p className="text-[11px] uppercase tracking-[0.15em] text-terracotta font-sans mb-3">
                      {latestPosts[0].category} &middot; {latestPosts[0].readingTime} min read
                    </p>
                    <h3 className="font-serif text-xl md:text-2xl text-gray-900 dark:text-[#F0EBE2] group-hover:text-moss dark:group-hover:text-sage transition-colors mb-3 leading-snug">
                      {latestPosts[0].title}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 font-sans leading-relaxed line-clamp-3">
                      {latestPosts[0].excerpt}
                    </p>
                    <span className="inline-flex items-center gap-1.5 mt-5 text-sm text-moss dark:text-sage font-sans group-hover:gap-2.5 transition-all">
                      Read article
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            </FadeInOnScroll>

            {/* Secondary posts */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {latestPosts.slice(1, 3).map((post, i) => (
                <FadeInOnScroll key={post.slug} delay={200 + i * 100}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="rounded-2xl border border-gray-200/40 dark:border-white/[0.06] bg-white dark:bg-[#201C16] hover:shadow-lg transition-all duration-500 overflow-hidden group"
                  >
                    {post.coverImage && (
                      <div className="aspect-[16/9] overflow-hidden">
                        <img
                          src={post.coverImage}
                          alt=""
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        />
                      </div>
                    )}
                    <div className="p-5">
                      <p className="text-[11px] uppercase tracking-[0.15em] text-terracotta font-sans mb-2">
                        {post.category} &middot; {post.readingTime} min read
                      </p>
                      <h3 className="font-sans text-sm font-semibold text-gray-900 dark:text-[#F0EBE2] group-hover:text-moss dark:group-hover:text-sage transition-colors line-clamp-2 mb-1.5">
                        {post.title}
                      </h3>
                      <p className="text-xs text-gray-400 dark:text-gray-500 line-clamp-2">
                        {post.excerpt}
                      </p>
                    </div>
                  </Link>
                </FadeInOnScroll>
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

      {/* ── Final CTA — Warm Closing ── */}
      <section className="py-24 md:py-32 bg-[#EDE7DB] dark:bg-[#1A1610] zen-pattern">
        <FadeInOnScroll>
          <div className="max-w-2xl mx-auto px-6 text-center">
            <div className="w-12 h-[1px] bg-terracotta/40 mx-auto mb-8" />

            <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl text-gray-900 dark:text-[#F0EBE2] leading-[1.4] mb-5">
              Your Wellness Journey
              <br />
              Is Uniquely Yours
            </h2>

            <p className="text-base text-gray-500 dark:text-[#A89F90] leading-relaxed font-sans max-w-md mx-auto mb-10">
              Whether you are just beginning to explore or deepening a practice you
              already love, KAMURA is here to light the way.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/treatments"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-terracotta hover:bg-terracotta-dark text-white rounded-full font-sans text-sm font-medium transition-colors duration-300"
              >
                Explore Treatments
              </Link>
              <Link
                href="/quiz"
                className="inline-flex items-center gap-2 px-7 py-3.5 border border-gray-300 dark:border-white/[0.12] text-gray-700 dark:text-gray-300 hover:border-terracotta dark:hover:border-terracotta hover:text-terracotta dark:hover:text-terracotta rounded-full font-sans text-sm font-medium transition-all duration-300"
              >
                Take the Quiz
              </Link>
            </div>

            <div className="w-12 h-[1px] bg-terracotta/40 mx-auto mt-10" />
          </div>
        </FadeInOnScroll>
      </section>
    </>
  );
}
