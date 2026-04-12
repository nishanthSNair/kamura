import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { treatments } from "@/data/treatments";
import { getAllPosts } from "@/lib/blog";
import FadeInOnScroll from "@/components/FadeInOnScroll";
import AnimatedConnecting from "@/components/AnimatedConnecting";

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
};

export default function Home() {
 const latestPosts = getAllPosts().slice(0, 4);

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

  <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
   <AnimatedConnecting />

   <p className="text-base md:text-lg text-white/80 max-w-[560px] mx-auto leading-relaxed font-sans font-light mb-10">
   The wellness platform for the GCC. Discover treatments, find vetted providers,
   build personalised protocols, and optimise your health journey — all in one place.
   </p>

   <div className="flex flex-wrap items-center justify-center gap-3">
   <Link
    href="/treatments"
    className="px-6 py-3 bg-white text-gray-900 text-sm font-semibold rounded-xl hover:bg-white/90 transition-colors font-sans"
   >
    Explore Treatments
   </Link>
   <Link
    href="/wellness-checker"
    className="px-6 py-3 border border-white/50 text-white text-sm font-semibold rounded-xl hover:bg-white/10 transition-colors font-sans"
   >
    Take Wellness Check
   </Link>
   </div>

   <div className="flex items-center justify-center gap-6 mt-8 text-sm text-white/60 font-sans">
   <span>{treatments.length}+ Treatments</span>
   <span className="text-white/30">&bull;</span>
   <span>70+ Providers</span>
   <span className="text-white/30">&bull;</span>
   <span>UAE & GCC</span>
   </div>
  </div>
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
