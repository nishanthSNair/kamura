"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface ContentCounts {
 blog: number;
 listings: number;
 treatments: number;
 events: number;
 news: number;
 testimonials: number;
 areas: number;
}

const SECTIONS = [
 { key: "blog", label: "Blog Posts", href: "/admin/blog", color: "bg-blue-500" },
 { key: "listings", label: "Listings", href: "/admin/listings", color: "bg-emerald-500" },
 { key: "treatments", label: "Treatments", href: "/admin/treatments", color: "bg-amber-500" },
 { key: "events", label: "Events", href: "/admin/events", color: "bg-purple-500" },
 { key: "news", label: "News", href: "/admin/news", color: "bg-rose-500" },
 { key: "testimonials", label: "Testimonials", href: "/admin/testimonials", color: "bg-cyan-500" },
 { key: "areas", label: "Areas", href: "/admin/areas", color: "bg-indigo-500" },
];

export default function AdminDashboard() {
 const [counts, setCounts] = useState<ContentCounts | null>(null);

 useEffect(() => {
 async function loadCounts() {
 const results: Partial<ContentCounts> = {};
 for (const section of SECTIONS) {
 try {
 const res = await fetch(`/api/admin/content?type=${section.key}`);
 const data = await res.json();
 results[section.key as keyof ContentCounts] = data.items?.length || 0;
 } catch {
 results[section.key as keyof ContentCounts] = 0;
 }
 }
 setCounts(results as ContentCounts);
 }
 loadCounts();
 }, []);

 return (
 <div className="p-8">
 <h1 className="text-2xl font-bold text-gray-900 mb-1">Dashboard</h1>
 <p className="text-sm text-gray-500 mb-8">
 Manage your content across kamuralife.com
 </p>

 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
 {SECTIONS.map((section) => (
 <Link
 key={section.key}
 href={section.href}
 className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow group"
 >
 <div className="flex items-center gap-3 mb-3">
 <div
 className={`w-8 h-8 ${section.color} rounded-lg flex items-center justify-center text-white text-xs font-bold`}
 >
 {counts
 ? counts[section.key as keyof ContentCounts]
 : "..."}
 </div>
 <h3 className="font-semibold text-gray-900 group-hover:text-moss transition-colors">
 {section.label}
 </h3>
 </div>
 <p className="text-xs text-gray-400">
 {counts
 ? `${counts[section.key as keyof ContentCounts]} items`
 : "Loading..."}
 </p>
 </Link>
 ))}
 </div>
 </div>
 );
}
