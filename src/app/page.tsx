import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts, formatDate } from "@/lib/blog";

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
      <section className="border-t border-gray-100 bg-gray-50/50">
        <div className="max-w-4xl mx-auto px-6 py-20 md:py-24">
          <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
            <div className="flex-1 text-center md:text-left">
              <p className="text-xs tracking-[0.3em] uppercase mb-4 text-terracotta font-sans">
                Interactive Quiz
              </p>
              <h2 className="font-serif text-3xl md:text-4xl text-gray-900 mb-4 leading-snug">
                Discover Your Wellness Path
              </h2>
              <p className="text-gray-500 font-sans leading-relaxed mb-6">
                Are you The Biohacker, The Yogi, or The Healer? Take our 2-minute
                quiz to find your wellness score, your archetype, and personalized
                recommendations for your longevity journey.
              </p>
              <Link
                href="/quiz"
                className="inline-block bg-gray-900 text-white px-8 py-3 text-sm tracking-[0.15em] uppercase hover:bg-terracotta transition-colors font-sans"
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

      {/* Blog Grid Section */}
      <section id="blog" className="max-w-6xl mx-auto px-6 py-20 md:py-28">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-14">
          {posts.map((post) => (
            <article key={post.slug}>
              <p className="text-xs text-gray-400 tracking-wide uppercase mb-3">
                {formatDate(post.date)}
                <span className="text-gray-300 mx-2">&middot;</span>
                {post.readingTime} min read
              </p>
              <h2 className="font-serif text-xl text-terracotta leading-snug mb-3">
                <Link
                  href={`/blog/${post.slug}`}
                  className="hover:text-terracotta-dark transition-colors"
                >
                  {post.title}
                </Link>
              </h2>
              <p className="text-sm text-gray-500 leading-relaxed mb-4 font-sans">
                {post.excerpt}
              </p>
              <Link
                href={`/blog/${post.slug}`}
                className="text-sm text-gray-800 underline underline-offset-4 hover:text-terracotta transition-colors font-sans"
              >
                Read More
              </Link>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
