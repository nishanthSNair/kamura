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
 author?: {
  name: string;
  avatar?: string;
  role?: string;
  linkedin?: string;
 };
}

const ALL_CATEGORIES: BlogCategory[] = [
 "Guides & Reviews",
 "Longevity & Science",
 "Holistic & Healing",
 "Biohacking",
 "News & Trends",
];

const POSTS_PER_PAGE = 9;

export default function BlogGrid({ posts }: { posts: Post[] }) {
 const [active, setActive] = useState<string>("All");
 const [search, setSearch] = useState("");
 const [visibleCount, setVisibleCount] = useState(POSTS_PER_PAGE);

 const filtered = posts.filter((p) => {
  const matchesCategory = active === "All" || p.category === active;
  const matchesSearch =
   search.trim() === "" ||
   p.title.toLowerCase().includes(search.toLowerCase()) ||
   p.excerpt.toLowerCase().includes(search.toLowerCase());
  return matchesCategory && matchesSearch;
 });

 const featured = filtered[0];
 const gridPosts = filtered.slice(1, visibleCount);
 const hasMore = filtered.length > visibleCount;

 return (
  <section id="blog" className="max-w-6xl mx-auto px-6 py-16 md:py-24">
   {/* Search + Filter Row */}
   <div className="flex flex-col sm:flex-row gap-4 mb-10">
    {/* Search Bar */}
    <div className="relative flex-1 max-w-md">
     <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
     >
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
     </svg>
     <input
      type="text"
      placeholder="Search articles..."
      value={search}
      onChange={(e) => {
       setSearch(e.target.value);
       setVisibleCount(POSTS_PER_PAGE);
      }}
      className="w-full pl-10 pr-4 py-2.5 text-sm font-sans border border-gray-200 rounded-full bg-white focus:outline-none focus:border-sage focus:ring-1 focus:ring-sage/30 transition-colors placeholder:text-gray-400"
     />
     {search && (
      <button
       onClick={() => setSearch("")}
       className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
       aria-label="Clear search"
      >
       <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
       </svg>
      </button>
     )}
    </div>
   </div>

   {/* Category Filter Chips */}
   <div className="flex flex-wrap gap-2 mb-12">
    {["All", ...ALL_CATEGORIES].map((cat) => (
     <button
      key={cat}
      onClick={() => {
       setActive(cat);
       setVisibleCount(POSTS_PER_PAGE);
      }}
      className={`px-4 py-2 text-sm font-sans rounded-full border transition-all duration-200 ${
       active === cat
        ? "bg-moss text-white border-moss"
        : "bg-white text-gray-700 border-gray-200 hover:border-sage"
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
        </div>
        <h2 className="font-serif text-2xl md:text-3xl text-gray-900 leading-snug mb-4">
         <Link href={`/blog/${featured.slug}`} className="hover:text-terracotta transition-colors">
          {featured.title}
         </Link>
        </h2>
        <p className="text-gray-500 leading-relaxed mb-5 font-sans line-clamp-3">
         {featured.excerpt}
        </p>
        <div className="flex items-center gap-4">
         {featured.author?.name && (
          <span className="text-xs text-gray-600 font-sans font-medium">
           {featured.author.name}
          </span>
         )}
         <span className="text-xs text-gray-400">&middot;</span>
         <span className="text-xs text-gray-500 font-sans">
          {formatDate(featured.date)}
         </span>
         <span className="text-xs text-gray-400">&middot;</span>
         <span className="text-xs text-gray-500 font-sans">
          {featured.readingTime} min
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
      <div className="border-t border-sage-light/60 mb-12" />
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
        <Link href={`/blog/${post.slug}`} className="block mb-4 overflow-hidden rounded-lg relative aspect-[16/10]">
         {post.coverImage ? (
          <Image
           src={post.coverImage}
           alt={post.title}
           fill
           className="object-cover hover:scale-105 transition-transform duration-300"
           sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
         ) : (
          <div className={`w-full h-full ${colors.bg} flex items-center justify-center`}>
           <span className={`text-4xl font-serif ${colors.text} opacity-20`}>K</span>
          </div>
         )}
        </Link>
        <div className="flex items-center gap-2 flex-wrap mb-3">
         <span
          className={`text-xs px-2.5 py-1 rounded-full font-sans ${colors.bg} ${colors.text}`}
         >
          {post.category}
         </span>
         <span className="text-xs text-gray-400">&middot;</span>
         <span className="text-xs text-gray-500 font-sans">
          {formatDate(post.date)}
         </span>
         <span className="text-xs text-gray-400">&middot;</span>
         <span className="text-xs text-gray-500 font-sans">
          {post.readingTime} min
         </span>
        </div>
        <h3 className="font-serif text-xl text-gray-900 leading-snug mb-3">
         <Link
          href={`/blog/${post.slug}`}
          className="hover:text-terracotta transition-colors"
         >
          {post.title}
         </Link>
        </h3>
        <p className="text-sm text-gray-500 leading-relaxed mb-4 font-sans line-clamp-2">
         {post.excerpt}
        </p>
        <div className="flex items-center gap-3">
         {post.author?.name && (
          <span className="text-xs text-gray-600 font-sans font-medium">
           {post.author.name}
          </span>
         )}
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

   {/* Load More Button */}
   {hasMore && (
    <div className="text-center mt-16">
     <button
      onClick={() => setVisibleCount((prev) => prev + POSTS_PER_PAGE)}
      className="px-8 py-3 text-sm font-sans font-medium border border-gray-300 rounded-full text-gray-700 hover:border-sage hover:text-moss transition-colors"
     >
      Load More Articles
     </button>
    </div>
   )}

   {filtered.length === 0 && (
    <p className="text-gray-500 text-center py-16 font-sans">
     {search ? `No articles matching "${search}".` : "No articles in this category yet."}
    </p>
   )}
  </section>
 );
}
