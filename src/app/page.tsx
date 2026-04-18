import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { treatments } from "@/data/treatments";
import FadeInOnScroll from "@/components/FadeInOnScroll";
import HomeHero from "@/components/HomeHero";
import { FEATURED_PRACTITIONERS } from "@/data/featured-practitioners";

export const metadata: Metadata = {
 title: "KAMURA — The Wellness Platform for the GCC",
 description: `The wellness platform for the GCC. Discover ${treatments.length}+ treatments, find vetted clinics and practitioners, build personalised protocols, and optimise your wellness journey — all in one place.`,
 keywords: [
 "wellness platform",
 "longevity treatments",
 "biohacking Dubai",
 "peptide therapy",
 "NAD+ therapy",
 "red light therapy",
 "semaglutide",
 "GLP-1 weight loss",
 "wellness Dubai",
 "longevity clinic Dubai",
 "treatment scoring",
 "Kamura Score",
 "evidence-based wellness",
 "wellness intelligence",
 "find wellness clinic UAE",
 ],
 alternates: {
 canonical: "https://kamuralife.com",
 },
 openGraph: {
 title: "KAMURA — The Wellness Platform for the GCC",
 description:
 "Discover 207+ treatments scored on evidence, safety, and value. Find vetted UAE clinics. Build personalised protocols. The unbiased wellness intelligence platform.",
 url: "https://kamuralife.com",
 siteName: "KAMURA",
 locale: "en_US",
 type: "website",
 images: [
 {
 url: "https://kamuralife.com/images/hero-home.png",
 width: 1200,
 height: 630,
 alt: "KAMURA — Rooted in Wellness",
 },
 ],
 },
 twitter: {
 card: "summary_large_image",
 title: "KAMURA — The Wellness Platform for the GCC",
 description:
 "207+ treatments scored. 70+ clinics. Peptides, longevity, biohacking — unbiased intelligence for the GCC.",
 creator: "@KamuraLife",
 images: ["https://kamuralife.com/images/hero-home.png"],
 },
};

export default function Home() {
 const featuredPractitioners = FEATURED_PRACTITIONERS.slice(0, 6);
 const citationCount = treatments.reduce(
 (sum, t) => sum + (t.keyStudies?.length || 0),
 0
 );

 const jsonLd = {
 "@context": "https://schema.org",
 "@graph": [
  {
  "@type": "Organization",
  name: "KAMURA",
  url: "https://kamuralife.com",
  description: "The wellness platform for the GCC",
  sameAs: ["https://www.instagram.com/kamuralife/", "https://x.com/KamuraLife"],
  },
  {
  "@type": "WebSite",
  name: "KAMURA",
  url: "https://kamuralife.com",
  potentialAction: {
   "@type": "SearchAction",
   target: "https://kamuralife.com/explore?q={search_term_string}",
   "query-input": "required name=search_term_string",
  },
  },
 ],
 };

 return (
 <>
  <script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
  />

  {/* ── Hero ── */}
  <section className="relative h-screen min-h-[600px] max-h-[1000px] flex items-center justify-center overflow-hidden">
  <div className="absolute inset-0">
   <Image
   src="/images/hero-home.png"
   alt="A serene sun-drenched wellness interior"
   fill
   priority
   className="object-cover object-center"
   sizes="100vw"
   quality={85}
   />
   <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
  </div>

  <HomeHero
   treatmentCount={treatments.length}
   citationCount={citationCount}
   providerCount={70}
  />
  </section>

  {/* ── Direct Access: Treatments / Clinics / Practitioners ── */}
  <section className="py-20 md:py-28 bg-[#EDE7DB]">
  <div className="max-w-6xl mx-auto px-6">
   <FadeInOnScroll>
   <div className="max-w-2xl mb-14">
    <p className="text-[10px] tracking-[0.3em] uppercase text-terracotta font-sans font-semibold mb-4">
    Start exploring
    </p>
    <h2 className="font-serif text-3xl md:text-5xl text-gray-900 leading-[1.1] mb-4">
    Three doors in.
    </h2>
    <p className="text-base text-gray-600 font-sans leading-relaxed">
    Browse every treatment scored on evidence, every vetted clinic in
    the GCC, or the practitioners who prescribe and deliver them.
    </p>
   </div>
   </FadeInOnScroll>

   <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
   <FadeInOnScroll>
    <Link
    href="/treatments"
    className="group relative block overflow-hidden rounded-3xl aspect-[4/5] bg-[#1a0f0c]"
    >
    <Image
     src="https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=800&q=85"
     alt=""
     fill
     className="object-cover opacity-70 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700"
     sizes="(max-width: 768px) 100vw, 33vw"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-[#1a0f0c] via-[#1a0f0c]/40 to-transparent" />
    <div className="relative p-7 md:p-8 h-full flex flex-col justify-between text-white">
     <div className="flex items-start justify-between">
     <span className="text-xs tracking-[0.2em] text-white/60 font-sans">01</span>
     <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
      <line x1="7" y1="17" x2="17" y2="7" />
      <polyline points="7 7 17 7 17 17" />
     </svg>
     </div>
     <div>
     <h3 className="font-serif text-3xl md:text-4xl tracking-tight mb-2">
      Treatments
     </h3>
     <p className="text-sm text-white/80 font-sans leading-relaxed mb-4 max-w-xs">
      {treatments.length}+ treatments scored on evidence, safety, and value.
      Peptides, GLP-1, hormones, IV therapy.
     </p>
     <span className="inline-flex items-center text-[10px] tracking-[0.2em] uppercase text-white font-sans font-semibold">
      Explore →
     </span>
     </div>
    </div>
    </Link>
   </FadeInOnScroll>

   <FadeInOnScroll delay={100}>
    <Link
    href="/explore"
    className="group relative block overflow-hidden rounded-3xl aspect-[4/5] bg-[#1a0f0c]"
    >
    <Image
     src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=85"
     alt=""
     fill
     className="object-cover opacity-70 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700"
     sizes="(max-width: 768px) 100vw, 33vw"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-[#1a0f0c] via-[#1a0f0c]/40 to-transparent" />
    <div className="relative p-7 md:p-8 h-full flex flex-col justify-between text-white">
     <div className="flex items-start justify-between">
     <span className="text-xs tracking-[0.2em] text-white/60 font-sans">02</span>
     <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
      <line x1="7" y1="17" x2="17" y2="7" />
      <polyline points="7 7 17 7 17 17" />
     </svg>
     </div>
     <div>
     <h3 className="font-serif text-3xl md:text-4xl tracking-tight mb-2">
      Clinics
     </h3>
     <p className="text-sm text-white/80 font-sans leading-relaxed mb-4 max-w-xs">
      Wellness clinics, longevity centers, and biohacking studios across
      Dubai and the UAE.
     </p>
     <span className="inline-flex items-center text-[10px] tracking-[0.2em] uppercase text-white font-sans font-semibold">
      Browse →
     </span>
     </div>
    </div>
    </Link>
   </FadeInOnScroll>

   <FadeInOnScroll delay={200}>
    <Link
    href="/explore"
    className="group relative block overflow-hidden rounded-3xl aspect-[4/5] bg-[#1a0f0c]"
    >
    <Image
     src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800&q=85"
     alt=""
     fill
     className="object-cover opacity-70 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700"
     sizes="(max-width: 768px) 100vw, 33vw"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-[#1a0f0c] via-[#1a0f0c]/40 to-transparent" />
    <div className="relative p-7 md:p-8 h-full flex flex-col justify-between text-white">
     <div className="flex items-start justify-between">
     <span className="text-xs tracking-[0.2em] text-white/60 font-sans">03</span>
     <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
      <line x1="7" y1="17" x2="17" y2="7" />
      <polyline points="7 7 17 7 17 17" />
     </svg>
     </div>
     <div>
     <h3 className="font-serif text-3xl md:text-4xl tracking-tight mb-2">
      Practitioners
     </h3>
     <p className="text-sm text-white/80 font-sans leading-relaxed mb-4 max-w-xs">
      Verified MDs, functional-medicine doctors, and integrative
      practitioners who prescribe what you actually need.
     </p>
     <span className="inline-flex items-center text-[10px] tracking-[0.2em] uppercase text-white font-sans font-semibold">
      Meet them →
     </span>
     </div>
    </div>
    </Link>
   </FadeInOnScroll>
   </div>
  </div>
  </section>

  {/* ── Featured Practitioners strip ── */}
  <section className="py-16 md:py-20 bg-white">
  <div className="max-w-6xl mx-auto px-6">
   <FadeInOnScroll>
   <div className="flex items-end justify-between mb-8 flex-wrap gap-4">
    <div>
    <p className="text-[10px] tracking-[0.3em] uppercase text-terracotta font-sans font-semibold mb-3">
     Kamura-Verified
    </p>
    <h2 className="font-serif text-2xl md:text-3xl text-gray-900 leading-tight">
     Meet your practitioners
    </h2>
    </div>
    <Link
    href="/explore"
    className="text-xs tracking-[0.15em] uppercase text-terracotta font-sans font-semibold hover:underline"
    >
    See all →
    </Link>
   </div>
   </FadeInOnScroll>
   <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
   {featuredPractitioners.map((p, i) => (
    <FadeInOnScroll key={p.slug} delay={i * 60}>
    <div className="group">
     <div className="relative aspect-[4/5] rounded-2xl overflow-hidden mb-3 bg-gray-100">
     <Image
      src={p.imageUrl}
      alt={p.name}
      fill
      className="object-cover group-hover:scale-105 transition-transform duration-500"
      sizes="(max-width: 768px) 50vw, 33vw"
     />
     {p.verified && (
      <span className="absolute top-3 left-3 px-2 py-1 rounded-full bg-white/90 backdrop-blur text-[9px] tracking-[0.15em] uppercase text-emerald-700 font-sans font-semibold">
      ✓ Verified
      </span>
     )}
     </div>
     <p className="font-serif text-lg text-gray-900 leading-tight">{p.name}</p>
     <p className="text-xs text-gray-500 font-sans mt-0.5">
     {p.specialty} · {p.city}
     </p>
     <div className="flex items-center gap-1.5 mt-1.5 text-[11px] font-sans">
     <span className="text-gray-700">★ {p.rating}</span>
     <span className="text-gray-300">·</span>
     <span className="text-gray-400">From AED {p.startingPriceAed.toLocaleString()}</span>
     </div>
    </div>
    </FadeInOnScroll>
   ))}
   </div>
  </div>
  </section>

 </>
 );
}
