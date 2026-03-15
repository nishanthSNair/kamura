"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  type BlogCategory,
  blogCategoryColors,
  formatDate,
  type DepthIndicator,
} from "@/lib/blog-shared";
import type { EvidenceLevel } from "@/data/treatments";
import KamuraScoreBadge from "@/components/treatments/KamuraScoreBadge";
import EvidenceLevelTag from "@/components/treatments/EvidenceLevelTag";

interface Post {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  category: BlogCategory;
  coverImage?: string;
  readingTime: number;
  kamuraScore?: number;
  evidenceLevel?: EvidenceLevel;
  depthIndicator?: DepthIndicator;
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

  const featured = filtered[0];
  const gridPosts = filtered.slice(1);

  return (
    <section id="blog" className="max-w-6xl mx-auto px-6 py-16 md:py-24">
      {/* Category Filter Chips */}
      <div className="flex flex-wrap gap-2 mb-12">
        {["All", ...ALL_CATEGORIES].map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`px-4 py-2 text-sm font-sans rounded-full border transition-all duration-200 ${
              active === cat
                ? "bg-moss text-white border-moss"
                : "bg-white dark:bg-[#1a1a1a] text-gray-700 dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:border-sage dark:hover:border-sage/50"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Featured Post — Magazine Hero */}
      {featured && (
        <>
          <article className="mb-14">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              {/* Image */}
              <Link href={`/blog/${featured.slug}`} className="block overflow-hidden rounded-xl relative h-[280px] md:h-[340px]">
                {featured.coverImage ? (
                  <Image
                    src={featured.coverImage}
                    alt={featured.title}
                    fill
                    priority
                    className="object-cover hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                ) : (
                  <div className={`w-full h-full ${blogCategoryColors[featured.category].bg} flex items-center justify-center`}>
                    <span className={`text-5xl font-serif ${blogCategoryColors[featured.category].text} opacity-30`}>K</span>
                  </div>
                )}
              </Link>

              {/* Content */}
              <div>
                <div className="flex items-center gap-2 flex-wrap mb-4">
                  <span className={`text-xs px-2.5 py-1 rounded-full font-sans ${blogCategoryColors[featured.category].bg} ${blogCategoryColors[featured.category].text}`}>
                    {featured.category}
                  </span>
                  {featured.evidenceLevel && (
                    <EvidenceLevelTag level={featured.evidenceLevel} />
                  )}
                  {featured.depthIndicator && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 font-sans">
                      {featured.depthIndicator}
                    </span>
                  )}
                </div>
                <h2 className="font-serif text-2xl md:text-3xl text-terracotta leading-snug mb-4">
                  <Link href={`/blog/${featured.slug}`} className="hover:text-terracotta-dark transition-colors">
                    {featured.title}
                  </Link>
                </h2>
                <p className="text-gray-500 dark:text-gray-400 leading-relaxed mb-5 font-sans">
                  {featured.excerpt}
                </p>
                <div className="flex items-center gap-4">
                  <span className="text-xs text-gray-400 dark:text-gray-500 tracking-wide uppercase">
                    {formatDate(featured.date)}
                  </span>
                  <span className="text-xs text-gray-400 dark:text-gray-500 font-sans">
                    {featured.readingTime} min read
                  </span>
                  {featured.kamuraScore && (
                    <KamuraScoreBadge score={featured.kamuraScore} size="sm" />
                  )}
                </div>
                <Link
                  href={`/blog/${featured.slug}`}
                  className="inline-block mt-5 text-sm text-moss font-sans font-medium hover:text-forest transition-colors"
                >
                  Read Article &rarr;
                </Link>
              </div>
            </div>
          </article>

          {/* Divider */}
          {gridPosts.length > 0 && (
            <div className="border-t border-sage-light/60 dark:border-forest/20 mb-12" />
          )}
        </>
      )}

      {/* Posts Grid */}
      {gridPosts.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-14">
          {gridPosts.map((post) => {
            const colors = blogCategoryColors[post.category];
            return (
              <article key={post.slug}>
                {post.coverImage && (
                  <Link href={`/blog/${post.slug}`} className="block mb-4 overflow-hidden rounded-lg relative h-48">
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </Link>
                )}
                <div className="flex items-center gap-2 flex-wrap mb-3">
                  <span
                    className={`text-xs px-2.5 py-1 rounded-full font-sans ${colors.bg} ${colors.text}`}
                  >
                    {post.category}
                  </span>
                  {post.evidenceLevel && (
                    <EvidenceLevelTag level={post.evidenceLevel} />
                  )}
                  {post.depthIndicator && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 font-sans">
                      {post.depthIndicator}
                    </span>
                  )}
                  <span className="text-xs text-gray-400 dark:text-gray-500 tracking-wide uppercase">
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
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-4 font-sans">
                  {post.excerpt}
                </p>
                <div className="flex items-center gap-3">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-sm text-gray-800 dark:text-gray-200 underline underline-offset-4 hover:text-terracotta transition-colors font-sans"
                  >
                    Read More
                  </Link>
                  <span className="text-xs text-gray-400 dark:text-gray-500 font-sans">
                    {post.readingTime} min read
                  </span>
                  {post.kamuraScore && (
                    <div className="ml-auto">
                      <KamuraScoreBadge score={post.kamuraScore} size="sm" />
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      )}

      {filtered.length === 0 && (
        <p className="text-gray-400 dark:text-gray-500 text-center py-16 font-sans">
          No articles in this category yet.
        </p>
      )}
    </section>
  );
}
