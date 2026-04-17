"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import SearchModal from "./SearchModal";
import LanguageToggle from "./LanguageToggle";
import { useI18n } from "@/lib/i18n";

function hasLightTop(p: string): boolean {
 if (p.startsWith("/blog/") && p !== "/blog") return true;
 if (p.startsWith("/events/") && p !== "/events") return true;
 if (p.startsWith("/explore/") && p !== "/explore") return true;
 if (p === "/treatments/methodology") return true;
 if (p.startsWith("/treatments/compare/") && p !== "/treatments/compare") return true;
 if (p === "/wellness-checker") return true;
 if (p.startsWith("/peptides/") && p !== "/peptides") return true;
 return false;
}

type DiscoverLink = { href: string; label: string; desc: string };
type DiscoverGroup = { label: string; href?: string; items: DiscoverLink[] };

const DISCOVER_GROUPS: DiscoverGroup[] = [
 {
 label: "Treatments",
 href: "/treatments",
 items: [
  { href: "/treatments", label: "Directory", desc: "200+ treatments scored" },
  { href: "/treatments/methodology", label: "Methodology", desc: "How the Kamura Score works" },
  { href: "/treatments/compare", label: "Compare", desc: "Side-by-side treatment comparison" },
 ],
 },
 {
 label: "Peptides",
 href: "/peptides",
 items: [
  { href: "/peptides/what-is-a-peptide", label: "What is a Peptide?", desc: "Visual intro to cellular signaling" },
  { href: "/peptides", label: "Intelligence Hub", desc: "Directory, scores, and tools" },
  { href: "/peptides/tracker", label: "Dashboard", desc: "Log doses, track cycles" },
 ],
 },
 {
 label: "Protocols",
 href: "/protocols",
 items: [
  { href: "/protocols", label: "Expert Protocols", desc: "Clinician-reviewed stacks" },
 ],
 },
];


export default function Navigation() {
 const [mobileOpen, setMobileOpen] = useState(false);
 const [searchOpen, setSearchOpen] = useState(false);
 const [scrolled, setScrolled] = useState(false);
 const [discoverOpen, setDiscoverOpen] = useState(false);
 const discoverRef = useRef<HTMLDivElement>(null);
 const pathname = usePathname();
 const solid = scrolled || hasLightTop(pathname);
 const { t } = useI18n();

 useEffect(() => {
 function handleScroll() {
  setScrolled(window.scrollY > 50);
 }
 handleScroll();
 window.addEventListener("scroll", handleScroll, { passive: true });
 return () => window.removeEventListener("scroll", handleScroll);
 }, []);

 useEffect(() => {
 function handleKeyDown(e: KeyboardEvent) {
  if ((e.metaKey || e.ctrlKey) && e.key === "k") {
  e.preventDefault();
  setSearchOpen(true);
  }
 }
 document.addEventListener("keydown", handleKeyDown);
 return () => document.removeEventListener("keydown", handleKeyDown);
 }, []);

 useEffect(() => {
 if (mobileOpen) {
  document.body.style.overflow = "hidden";
 } else {
  document.body.style.overflow = "";
 }
 return () => { document.body.style.overflow = ""; };
 }, [mobileOpen]);

 useEffect(() => {
 function handleClick(e: MouseEvent) {
  if (discoverRef.current && !discoverRef.current.contains(e.target as Node)) {
  setDiscoverOpen(false);
  }
 }
 document.addEventListener("mousedown", handleClick);
 return () => document.removeEventListener("mousedown", handleClick);
 }, []);

 useEffect(() => {
 setDiscoverOpen(false);
 setMobileOpen(false);
 }, [pathname]);

 return (
 <>
  <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
  solid
   ? "bg-cream/95 backdrop-blur-sm border-b border-sage-light/60"
   : "bg-transparent border-b border-transparent"
  }`}>
  <div className="max-w-6xl mx-auto px-6 py-3.5 flex items-center justify-between">

   {/* Left — Logo */}
   <Link href="/" className="flex items-center gap-2">
   <Image
    src="/logo-symbol.svg"
    alt=""
    width={36}
    height={36}
    className={`w-9 h-9 transition-all ${solid ? "" : "drop-shadow-[0_0_4px_rgba(255,255,255,0.3)]"}`}
   />
   <span className={`font-serif text-2xl tracking-[0.15em] transition-colors ${solid ? "text-gray-900" : "text-white"}`}>
    KAMURA
   </span>
   </Link>

   {/* Center — Action nav (desktop) */}
   <div className="hidden md:flex items-center gap-7 text-sm font-sans">
   <div ref={discoverRef} className="relative">
    <button
    onClick={() => setDiscoverOpen(!discoverOpen)}
    className={`flex items-center gap-1 transition-colors font-medium ${
     solid ? "text-gray-800 hover:text-terracotta" : "text-white/90 hover:text-white"
    }`}
    >
    {t("nav.discover")}
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={`transition-transform ${discoverOpen ? "rotate-180" : ""}`}>
     <polyline points="6 9 12 15 18 9" />
    </svg>
    </button>
    {discoverOpen && (
    <div className="absolute top-full left-0 mt-2 w-[640px] bg-white rounded-2xl shadow-xl border border-gray-200/80 p-6 z-50 grid grid-cols-3 gap-5">
     {DISCOVER_GROUPS.map((group) => (
     <div key={group.label}>
      {group.href ? (
      <Link
       href={group.href}
       className="block font-serif text-lg text-gray-900 mb-3 pb-2 border-b border-gray-100 hover:text-terracotta transition-colors"
      >
       {group.label}
      </Link>
      ) : (
      <h3 className="font-serif text-lg text-gray-900 mb-3 pb-2 border-b border-gray-100">
       {group.label}
      </h3>
      )}
      <ul className="space-y-1">
      {group.items.map((item) => (
       <li key={item.href}>
       <Link
        href={item.href}
        className="block px-3 py-2 rounded-lg hover:bg-[#EDE7DB]/60 transition-colors"
       >
        <span className="block text-sm font-medium text-gray-900">{item.label}</span>
        <span className="block text-xs text-gray-400 mt-0.5 leading-snug">{item.desc}</span>
       </Link>
       </li>
      ))}
      </ul>
     </div>
     ))}
    </div>
    )}
   </div>

   <Link
    href="/explore"
    className={`transition-colors font-medium ${solid ? "text-gray-800 hover:text-terracotta" : "text-white/90 hover:text-white"}`}
   >
    {t("nav.providers")}
   </Link>

   <Link
    href="/wellness-checker"
    className={`transition-colors font-medium ${solid ? "text-gray-800 hover:text-terracotta" : "text-white/90 hover:text-white"}`}
   >
    {t("nav.wellness")}
   </Link>

   <LanguageToggle solid={solid} />

   <button
    onClick={() => setSearchOpen(true)}
    className={`transition-colors ${solid ? "text-gray-800 hover:text-terracotta" : "text-white/90 hover:text-white"}`}
    aria-label="Search"
   >
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
   </button>
   </div>

   {/* Right — CTA + Mobile hamburger */}
   <div className="flex items-center gap-3">
   <Link
    href="/provider/login"
    className={`hidden md:inline-flex items-center text-sm font-sans font-medium transition-colors ${
     solid ? "text-gray-600 hover:text-terracotta" : "text-white/70 hover:text-white"
    }`}
   >
    Provider Login
   </Link>
   <Link
    href="/list-your-business"
    className="hidden md:inline-flex items-center px-4 py-2 bg-terracotta hover:bg-terracotta-dark text-white text-sm font-sans font-semibold rounded-lg transition-colors"
   >
    List Your Business
   </Link>

   <button
    className={`md:hidden transition-colors ${solid ? "text-gray-800" : "text-white"}`}
    onClick={() => setMobileOpen(!mobileOpen)}
    aria-label="Toggle menu"
   >
    {mobileOpen ? (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
     <line x1="18" y1="6" x2="6" y2="18" />
     <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
    ) : (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
     <line x1="3" y1="6" x2="21" y2="6" />
     <line x1="3" y1="12" x2="21" y2="12" />
     <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
    )}
   </button>
   </div>
  </div>

  {/* Mobile menu */}
  <div
   className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
   mobileOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
   }`}
  >
   <div className="bg-cream/95 backdrop-blur-md border-t border-sage-light/60 px-6 py-5 flex flex-col gap-4 text-sm">
   <p className="text-[10px] uppercase tracking-[0.15em] text-gray-400 font-sans">Discover</p>
   {DISCOVER_GROUPS.map((group, gi) => (
    <div key={group.label} className="flex flex-col gap-2">
    {group.href ? (
     <Link
     href={group.href}
     className="font-serif text-base text-gray-900 hover:text-terracotta transition-colors"
     onClick={() => setMobileOpen(false)}
     style={{
      opacity: mobileOpen ? 1 : 0,
      transform: mobileOpen ? "translateX(0)" : "translateX(-8px)",
      transition: `opacity 0.3s ease ${gi * 80 + 50}ms, transform 0.3s ease ${gi * 80 + 50}ms`,
     }}
     >
     {group.label}
     </Link>
    ) : (
     <p className="font-serif text-base text-gray-900">{group.label}</p>
    )}
    {group.items.map((item, i) => (
     <Link
     key={item.href}
     href={item.href}
     className="text-gray-600 hover:text-terracotta transition-colors font-sans text-sm pl-3"
     style={{
      opacity: mobileOpen ? 1 : 0,
      transform: mobileOpen ? "translateX(0)" : "translateX(-8px)",
      transition: `opacity 0.3s ease ${gi * 80 + i * 40 + 100}ms, transform 0.3s ease ${gi * 80 + i * 40 + 100}ms`,
     }}
     onClick={() => setMobileOpen(false)}
     >
     {item.label}
     </Link>
    ))}
    </div>
   ))}

   <div className="w-full h-px bg-gray-200 my-1" />

   {[
    { href: "/explore", label: t("nav.providers") },
    { href: "/wellness-checker", label: t("nav.wellness") },
    { href: "/blog", label: "Blog" },
    { href: "/events", label: "Events" },
    { href: "/about", label: "About" },
   ].map((item, i) => (
    <Link
    key={item.href}
    href={item.href}
    className="text-gray-800 hover:text-terracotta transition-colors font-sans font-medium"
    style={{
     opacity: mobileOpen ? 1 : 0,
     transform: mobileOpen ? "translateX(0)" : "translateX(-8px)",
     transition: `opacity 0.3s ease ${(i + 3) * 50 + 100}ms, transform 0.3s ease ${(i + 3) * 50 + 100}ms`,
    }}
    onClick={() => setMobileOpen(false)}
    >
    {item.label}
    </Link>
   ))}

   <div className="w-full h-px bg-gray-200 my-1" />

   <Link
    href="/provider/login"
    className="text-gray-600 hover:text-terracotta transition-colors font-sans font-medium"
    onClick={() => setMobileOpen(false)}
   >
    Provider Login
   </Link>

   <div className="flex items-center justify-between gap-3">
    <Link
    href="/list-your-business"
    className="flex-1 inline-flex items-center justify-center px-4 py-2.5 bg-terracotta text-white text-sm font-sans font-semibold rounded-lg"
    onClick={() => setMobileOpen(false)}
    >
    {t("nav.listBusiness")}
    </Link>
    <LanguageToggle solid />
   </div>

   <button
    onClick={() => { setMobileOpen(false); setSearchOpen(true); }}
    className="text-gray-500 hover:text-terracotta transition-colors text-left font-sans flex items-center gap-2"
   >
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
    Search
   </button>
   </div>
  </div>
  </nav>

  <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
 </>
 );
}
