import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import { testimonials } from "@/data/testimonials";
import BlogGrid from "./BlogGrid";

export const metadata: Metadata = {
  title: "KAMURA — Heart of Longevity & Wellness",
  description:
    "Discover the practices, places, and people transforming wellness in Dubai and beyond. Longevity clinics, holistic healing, breathwork, and more.",
};

export default function Home() {
  const posts = getAllPosts();

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 text-center text-white px-6 max-w-3xl">
          <p className="text-xs tracking-[0.3em] uppercase mb-6 text-white/80">
            Heart of Longevity &amp; Wellness
          </p>
          <h1 className="text-5xl md:text-7xl font-serif mb-6 leading-tight">
            Be the Tortoise
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-10 leading-relaxed font-sans">
            Discover the practices, places, and people transforming wellness in
            Dubai and beyond.
          </p>
          <Link
            href="#blog"
            className="inline-block border border-white/70 text-white px-8 py-3 text-sm tracking-[0.15em] uppercase hover:bg-white hover:text-gray-900 transition-all duration-300 font-sans"
          >
            Start Exploring
          </Link>
        </div>
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

      {/* Blog Grid with Category Filters */}
      <BlogGrid posts={posts} />
    </>
  );
}
