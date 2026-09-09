"use client";

import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";

interface Heading {
 id: string;
 text: string;
 level: number;
}

/**
 * TableOfContents — renders one of two variants depending on `variant`.
 *   - "desktop" (default): sticky sidebar with scroll-aware active link
 *   - "mobile": collapsible accordion meant to sit above the article
 *
 * Both pull from the same headings array. Caller renders one of each so
 * the mobile accordion appears above the prose on small screens (lg:hidden)
 * and the desktop sticky sidebar appears beside the prose (hidden lg:block).
 *
 * Mobile is the gap we were missing — 60%+ of GLP-1 SEO traffic is mobile.
 */

interface Props {
 headings: Heading[];
 variant?: "desktop" | "mobile";
}

export default function TableOfContents({ headings, variant = "desktop" }: Props) {
 const [activeId, setActiveId] = useState<string>("");
 const [mobileOpen, setMobileOpen] = useState(false);

 useEffect(() => {
 const observer = new IntersectionObserver(
 (entries) => {
 for (const entry of entries) {
 if (entry.isIntersecting) {
 setActiveId(entry.target.id);
 }
 }
 },
 { rootMargin: "-80px 0px -75% 0px", threshold: 0 }
 );

 for (const heading of headings) {
 const el = document.getElementById(heading.id);
 if (el) observer.observe(el);
 }

 return () => observer.disconnect();
 }, [headings]);

 if (headings.length < 3) return null;

 function jumpTo(id: string) {
 document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
 setMobileOpen(false);
 }

 if (variant === "mobile") {
 return (
 <nav className="lg:hidden mb-8 border border-[#173C3B]/10 rounded-2xl bg-[#FAFCF7] overflow-hidden">
 <button
 type="button"
 onClick={() => setMobileOpen((v) => !v)}
 aria-expanded={mobileOpen}
 className="w-full flex items-center justify-between px-5 py-4 text-left"
 >
 <span>
 <span className="block text-[10px] tracking-[0.28em] uppercase text-terracotta font-semibold font-sans">
 On this page
 </span>
 <span className="block text-[14px] text-[#173C3B] font-sans mt-0.5">
 {headings.length} sections
 </span>
 </span>
 <ChevronDown
 size={18}
 strokeWidth={2}
 className={`text-[#173C3B]/45 transition-transform ${
 mobileOpen ? "rotate-180" : ""
 }`}
 />
 </button>
 {mobileOpen && (
 <ul className="px-5 pb-4 space-y-1 border-t border-[#173C3B]/8 pt-3">
 {headings.map((heading) => (
 <li key={`m-${heading.id}`}>
 <a
 href={`#${heading.id}`}
 onClick={(e) => {
 e.preventDefault();
 jumpTo(heading.id);
 }}
 className={`block text-[13.5px] font-sans py-1.5 leading-snug ${
 heading.level === 3 ? "pl-4 text-[#173C3B]/65" : "text-[#173C3B]/85"
 }`}
 >
 {heading.text}
 </a>
 </li>
 ))}
 </ul>
 )}
 </nav>
 );
 }

 // Desktop sticky sidebar
 return (
 <nav className="hidden lg:block sticky top-24 self-start">
 <p className="text-[11px] text-gray-500 uppercase tracking-wider font-sans mb-3 font-semibold">
 On this page
 </p>
 <ul className="space-y-1.5 border-l border-gray-200">
 {headings.map((heading) => (
 <li key={heading.id}>
 <a
 href={`#${heading.id}`}
 onClick={(e) => {
 e.preventDefault();
 jumpTo(heading.id);
 }}
 className={`block text-[13px] font-sans leading-snug transition-colors py-0.5 border-l-2 -ml-px ${
 heading.level === 3 ? "pl-6" : "pl-4"
 } ${
 activeId === heading.id
 ? "border-moss text-moss font-medium"
 : "border-transparent text-gray-500 hover:text-gray-900"
 }`}
 >
 {heading.text}
 </a>
 </li>
 ))}
 </ul>
 </nav>
 );
}
