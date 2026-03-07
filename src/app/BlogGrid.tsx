"use client";

import { useState } from "react";
import Link from "next/link";
import {
  type BlogCategory,
  blogCategoryColors,
  formatDate,
} from "@/lib/blog-shared";

interface Post {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  category: BlogCategory;
  readingTime: number;
}

const ALL_CATEGORIES: BlogCategory[] = [
  "Guides & Reviews",
  "Longevity & Science",
  "Holistic & Healing",
  "Biohacking",
  "News & Trends",
];

export default function BlogGrid({ posts }: { posts: Post[] }) {
  const [active, setActive] = useState<string>("All");

  const filtered =
    active === "All" ? posts : posts.filter((p) => p.category === active);

  return (
    <section id="blog" className="max-w-6xl mx-auto px-6 py-20 md:py-28">
      {/* Section Header */}
      <div className="mb-12">
        <h2 className="font-serif text-3xl md:text-4xl text-gray-900 mb-3">
          Latest Articles
        </h2>
        <p className="text-gray-500 font-sans">
          Guides, deep-dives, and trends in longevity &amp; wellness
        </p>
        <div className="w-12 h-px bg-terracotta/40 mt-6" />
      </div>

      {/* Category Filter Chips */}
      <div className="flex flex-wrap gap-2 mb-10">
        {["All", ...ALL_CATEGORIES].map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`px-4 py-2 text-sm font-sans rounded-full border transition-all duration-200 ${
              active === cat
                ? "bg-gray-900 text-white border-gray-900"
                : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-14">
        {filtered.map((post) => {
          const colors = blogCategoryColors[post.category];
          return (
            <article key={post.slug}>
              <div className="flex items-center gap-3 mb-3">
                <span
                  className={`text-xs px-2.5 py-1 rounded-full font-sans ${colors.bg} ${colors.text}`}
                >
                  {post.category}
                </span>
                <span className="text-xs text-gray-400 tracking-wide uppercase">
                  {formatDate(post.date)}
                </span>
              </div>
              <h3 className="font-serif text-xl text-terracotta leading-snug mb-3">
                <Link
                  href={`/blog/${post.slug}`}
                  className="hover:text-terracotta-dark transition-colors"
                >
                  {post.title}
                </Link>
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed mb-4 font-sans">
                {post.excerpt}
              </p>
              <div className="flex items-center gap-3">
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-sm text-gray-800 underline underline-offset-4 hover:text-terracotta transition-colors font-sans"
                >
                  Read More
                </Link>
                <span className="text-xs text-gray-400 font-sans">
                  {post.readingTime} min read
                </span>
              </div>
            </article>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <p className="text-gray-400 text-center py-16 font-sans">
          No articles in this category yet.
        </p>
      )}
    </section>
  );
}
