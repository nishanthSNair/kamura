"use client";

import Link from "next/link";
import { type BlogPostSummary } from "@/data/wellness-checker";
import { blogCategoryColors } from "@/lib/blog-shared";

interface RelatedContentProps {
  posts: BlogPostSummary[];
}

export default function RelatedContent({ posts }: RelatedContentProps) {
  if (posts.length === 0) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {posts.map((post) => {
        const categoryColor = blogCategoryColors[post.category] || {
          bg: "bg-gray-100",
          text: "text-gray-800",
        };

        return (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group bg-white dark:bg-[#1C1815] border border-gray-200 dark:border-white/[0.06] rounded-xl p-4 hover:border-terracotta/40 dark:hover:border-[#C4A882]/30 transition-colors"
          >
            <div className="flex items-center gap-2 mb-2">
              <span
                className={`px-2 py-0.5 rounded-md text-[10px] font-bold tracking-wide ${categoryColor.bg} ${categoryColor.text}`}
              >
                {post.category}
              </span>
              <span className="text-[11px] text-gray-400 dark:text-[#6B6358] font-sans">
                {post.readingTime} min read
              </span>
            </div>
            <h4 className="font-serif text-sm text-gray-900 dark:text-[#F0EBE2] group-hover:text-terracotta dark:group-hover:text-[#C4A882] transition-colors leading-snug mb-1.5">
              {post.title}
            </h4>
            <p className="text-xs text-gray-500 dark:text-[#6B6358] font-sans line-clamp-2 leading-relaxed">
              {post.excerpt}
            </p>
          </Link>
        );
      })}
    </div>
  );
}
