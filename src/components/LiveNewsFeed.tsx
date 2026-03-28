"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface RssItem {
 title: string;
 link: string;
 pubDate: string;
 description: string;
 source: string;
}

interface LiveNewsFeedProps {
 maxArticles?: number;
 feeds?: string[];
 title?: string;
 subtitle?: string;
 showMoreLink?: string;
}

const DEFAULT_FEEDS = [
 "https://news.google.com/rss/search?q=wellness+dubai+longevity&hl=en-US&gl=US&ceid=US:en",
 "https://news.google.com/rss/search?q=biohacking+UAE+health&hl=en-US&gl=US&ceid=US:en",
];

function extractDomain(url: string): string {
 try {
 return new URL(url).hostname.replace("www.", "");
 } catch {
 return "Source";
 }
}

function formatPubDate(dateStr: string): string {
 try {
 return new Date(dateStr).toLocaleDateString("en-US", { month: "short", day: "numeric" });
 } catch {
 return dateStr;
 }
}

export default function LiveNewsFeed({
 maxArticles = 6,
 feeds = DEFAULT_FEEDS,
 title = "Wellness in the News",
 subtitle = "Latest headlines from around the web — updated automatically",
 showMoreLink,
}: LiveNewsFeedProps) {
 const [articles, setArticles] = useState<RssItem[]>([]);
 const [loading, setLoading] = useState(true);
 const [error, setError] = useState(false);

 useEffect(() => {
 async function fetchFeeds() {
 try {
 const results: RssItem[] = [];

 for (const feedUrl of feeds) {
 try {
 const res = await fetch(
 `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feedUrl)}`
 );
 if (!res.ok) continue;
 const data = await res.json();
 if (data.status === "ok" && data.items) {
 for (const item of data.items) {
 results.push({
 title: item.title || "",
 link: item.link || "",
 pubDate: item.pubDate || "",
 description: (item.description || "").replace(/<[^>]+>/g, "").slice(0, 150),
 source: item.author || extractDomain(item.link),
 });
 }
 }
 } catch {
 // Skip failed feed
 }
 }

 // Deduplicate by title
 const seen = new Set<string>();
 const unique = results.filter((item) => {
 const key = item.title.toLowerCase().slice(0, 50);
 if (seen.has(key)) return false;
 seen.add(key);
 return true;
 });

 unique.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());
 setArticles(unique.slice(0, maxArticles));
 } catch {
 setError(true);
 } finally {
 setLoading(false);
 }
 }

 fetchFeeds();
 }, [feeds, maxArticles]);

 if (!loading && articles.length === 0 && !error) return null;
 if (error) return null;

 return (
 <section className="py-20 md:py-28 bg-[#EDE7DB]">
 <div className="max-w-6xl mx-auto px-6">
 <div className="flex items-end justify-between mb-12">
 <div>
 <div className="flex items-center gap-3 mb-3">
 <span className="relative flex h-2.5 w-2.5">
 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
 <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
 </span>
 <p className="text-xs uppercase tracking-[0.2em] text-terracotta font-sans">
 Latest Headlines
 </p>
 </div>
 <h2 className="font-serif text-2xl md:text-3xl text-gray-900">
 {title}
 </h2>
 <p className="text-sm text-gray-500 mt-2 font-sans max-w-md">
 {subtitle}
 </p>
 </div>
 {showMoreLink && (
 <Link
 href={showMoreLink}
 className="hidden sm:inline-flex text-sm font-sans text-moss hover:underline underline-offset-4"
 >
 More news &rarr;
 </Link>
 )}
 </div>

 {loading ? (
 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
 {Array.from({ length: Math.min(maxArticles, 6) }).map((_, i) => (
 <div key={i} className="rounded-xl border border-gray-200/40 bg-white p-5 animate-pulse">
 <div className="h-3 bg-gray-200 rounded w-1/3 mb-4" />
 <div className="h-4 bg-gray-200 rounded w-full mb-2" />
 <div className="h-4 bg-gray-200 rounded w-2/3 mb-4" />
 <div className="h-3 bg-gray-200 rounded w-full" />
 </div>
 ))}
 </div>
 ) : (
 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
 {articles.map((article, i) => (
 <a
 key={i}
 href={article.link}
 target="_blank"
 rel="noopener noreferrer"
 className="rounded-xl border border-gray-200/40 bg-white p-5 hover:shadow-lg hover:border-gray-300 transition-all duration-300 flex flex-col group"
 >
 <div className="flex items-center gap-2 text-[11px] text-gray-400 font-sans mb-3">
 <span className="font-medium text-gray-500">{article.source}</span>
 <span>&middot;</span>
 <span>{formatPubDate(article.pubDate)}</span>
 </div>
 <h3 className="font-serif text-sm md:text-base text-gray-900 leading-snug mb-3 flex-1 group-hover:text-moss transition-colors">
 {article.title}
 </h3>
 {article.description && (
 <p className="text-xs text-gray-400 font-sans leading-relaxed line-clamp-2">
 {article.description}
 </p>
 )}
 </a>
 ))}
 </div>
 )}

 {showMoreLink && (
 <Link
 href={showMoreLink}
 className="sm:hidden inline-flex text-sm font-sans text-moss hover:underline mt-6"
 >
 More news &rarr;
 </Link>
 )}
 </div>
 </section>
 );
}
