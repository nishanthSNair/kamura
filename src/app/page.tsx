import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { treatments } from "@/data/treatments";
import { getAllPosts } from "@/lib/blog";
import FadeInOnScroll from "@/components/FadeInOnScroll";
import HomeHero from "@/components/HomeHero";

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
 const latestPosts = getAllPosts().slice(0, 4);
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

  {/* ── Latest from the Journal ── */}
  {latestPosts.length > 0 && (
  <section className="py-16 md:py-24 bg-[#EDE7DB]">
   <div className="max-w-6xl mx-auto px-6">
   <FadeInOnScroll>
    <div className="flex items-end justify-between mb-10">
    <div>
     <p className="text-xs uppercase tracking-[0.2em] text-terracotta font-sans mb-3">
     Wellness Intelligence
     </p>
     <h2 className="font-serif text-2xl md:text-3xl text-gray-900">
     Latest from the Journal
     </h2>
    </div>
    <Link
     href="/blog"
     className="hidden sm:inline-flex text-sm font-sans text-moss hover:underline underline-offset-4"
    >
     Read all &rarr;
    </Link>
    </div>
   </FadeInOnScroll>

   {/* Featured post — large */}
   <FadeInOnScroll delay={100}>
    <Link
    href={`/blog/${latestPosts[0].slug}`}
    className="block rounded-2xl overflow-hidden bg-white border border-gray-200/40 hover:shadow-xl transition-all duration-500 group mb-5"
    >
    <div className="grid grid-cols-1 md:grid-cols-2">
     {latestPosts[0].coverImage && (
     <div className="aspect-[16/10] md:aspect-auto overflow-hidden relative">
      <Image
      src={latestPosts[0].coverImage}
      alt=""
      fill
      sizes="(max-width: 768px) 100vw, 50vw"
      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
      />
     </div>
     )}
     <div className="p-6 md:p-10 flex flex-col justify-center">
     <p className="text-[11px] uppercase tracking-[0.15em] text-terracotta font-sans mb-3">
      {latestPosts[0].category} &middot; {latestPosts[0].readingTime} min read
     </p>
     <h3 className="font-serif text-xl md:text-2xl text-gray-900 group-hover:text-moss transition-colors mb-3 leading-snug">
      {latestPosts[0].title}
     </h3>
     <p className="text-sm text-gray-500 font-sans leading-relaxed line-clamp-3">
      {latestPosts[0].excerpt}
     </p>
     <span className="inline-flex items-center gap-1.5 mt-5 text-sm text-moss font-sans group-hover:gap-2.5 transition-all">
      Read article
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
      </svg>
     </span>
     </div>
    </div>
    </Link>
   </FadeInOnScroll>

   {/* Secondary posts */}
   <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
    {latestPosts.slice(1, 4).map((post, i) => (
    <FadeInOnScroll key={post.slug} delay={200 + i * 80}>
     <Link
     href={`/blog/${post.slug}`}
     className="rounded-2xl border border-gray-200/40 bg-white hover:shadow-lg transition-all duration-500 overflow-hidden group"
     >
     {post.coverImage && (
      <div className="aspect-[16/9] overflow-hidden relative">
      <Image
       src={post.coverImage}
       alt=""
       fill
       sizes="(max-width: 640px) 100vw, 33vw"
       className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
      />
      </div>
     )}
     <div className="p-4">
      <p className="text-[10px] uppercase tracking-[0.15em] text-terracotta font-sans mb-1.5">
      {post.category}
      </p>
      <h3 className="font-sans text-sm font-semibold text-gray-900 group-hover:text-moss transition-colors line-clamp-2">
      {post.title}
      </h3>
     </div>
     </Link>
    </FadeInOnScroll>
    ))}
   </div>

   <Link
    href="/blog"
    className="sm:hidden inline-flex text-sm font-sans text-moss hover:underline mt-6"
   >
    All articles &rarr;
   </Link>
   </div>
  </section>
  )}
 </>
 );
}
