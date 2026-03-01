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

      {/* Blog Grid Section */}
      <section id="blog" className="max-w-6xl mx-auto px-6 py-20 md:py-28">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-14">
          {posts.map((post) => (
            <article key={post.slug}>
              <p className="text-xs text-gray-400 tracking-wide uppercase mb-3">
                {formatDate(post.date)}
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
