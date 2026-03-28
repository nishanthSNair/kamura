import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { treatments, getScoreColor } from "@/data/treatments";
import { getAllPosts } from "@/lib/blog";
import InlineSearch from "@/components/InlineSearch";
import FadeInOnScroll from "@/components/FadeInOnScroll";
import KamuraScoreBadge from "@/components/treatments/KamuraScoreBadge";
import LiveNewsFeed from "@/components/LiveNewsFeed";

export const metadata: Metadata = {
 title: "KAMURA — The Heart of Longevity | Wellness Intelligence Platform",
 description: `The world's first unbiased wellness intelligence platform. Search ${treatments.length}+ treatments — peptides, NAD+, red light therapy, GLP-1 & more — scored on evidence, safety, and community data. Discover longevity clinics in Dubai.`,
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
 "wellness checker",
 "biohacking treatments",
 "cryotherapy",
 "HBOT hyperbaric oxygen",
 "stem cell therapy Dubai",
 "wellness intelligence",
 ],
 alternates: {
 canonical: "https://kamuralife.com",
 },
};

export default function Home() {
 const topTreatments = [...treatments]
 .sort((a, b) => b.kamuraScore - a.kamuraScore)
 .slice(0, 7);

 const latestPosts = getAllPosts().slice(0, 3);

 const jsonLd = {
 "@context": "https://schema.org",
 "@graph": [
 {
 "@type": "Organization",
 name: "KAMURA",
 url: "https://kamuralife.com",
 description:
 "The world's first unbiased wellness intelligence platform",
 sameAs: ["https://www.instagram.com/kamuralife/"],
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

 {/* ── Hero — Full viewport immersive ── */}
 <section className="relative h-screen min-h-[600px] max-h-[1200px] flex items-center justify-center overflow-hidden">
 {/* Background image */}
 <div className="absolute inset-0">
 <Image
 src="/images/hero-home.png"
 alt="A serene sun-drenched wellness interior with arched windows and a reflective pool"
 fill
 priority
 className="object-cover object-center"
 sizes="100vw"
 quality={85}
 />
 <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/10 to-black/50" />
 <div className="absolute inset-0 bg-gradient-to-r from-black/15 via-transparent to-black/10" />
 </div>

 {/* Content */}
 <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
 <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-normal leading-[1.05] text-white mb-6 tracking-[-0.01em]">
 The Heart of
 <br />
 <em className="italic font-light">Longevity</em>
 </h1>

 <p className="text-base md:text-lg text-white/75 max-w-[480px] mx-auto leading-relaxed font-sans font-light mb-10">
 Discover evidence-based treatments, build personalized protocols,
 and find the path to your best self.
 </p>

 <div className="max-w-[520px] mx-auto mb-10">
 <InlineSearch
 placeholder="What are you looking for?"
 popularSearches={[
 "Best for Sleep",
 "NAD+ vs NMN",
 "Red Light Therapy",
 "Longevity",
 ]}
 variant="hero"
 />
 </div>

 {/* Quick-action buttons */}
 <div className="flex flex-wrap items-center justify-center gap-3">
 <Link
 href="/treatments"
 className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/15 hover:bg-white/25 backdrop-blur-sm border border-white/20 text-white rounded-full font-sans text-sm font-medium transition-all duration-300"
 >
 <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
 <path d="M9 5H2v7l6.29 6.29c.94.94 2.48.94 3.42 0l4.58-4.58c.94-.94.94-2.48 0-3.42L9 5z" />
 <circle cx="6" cy="9" r="1" fill="currentColor" />
 </svg>
 {treatments.length}+ Treatments
 </Link>
 <Link
 href="/wellness-checker"
 className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/15 hover:bg-white/25 backdrop-blur-sm border border-white/20 text-white rounded-full font-sans text-sm font-medium transition-all duration-300"
 >
 <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
 <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
 <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
 <path d="M9 14l2 2 4-4" />
 </svg>
 Wellness Checker
 </Link>
 <Link
 href="/quiz"
 className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/15 hover:bg-white/25 backdrop-blur-sm border border-white/20 text-white rounded-full font-sans text-sm font-medium transition-all duration-300"
 >
 <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
 <circle cx="12" cy="12" r="10" />
 <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
 <circle cx="12" cy="17" r="0.5" fill="currentColor" />
 </svg>
 Take the Quiz
 </Link>
 </div>
 </div>
 </section>

 {/* ── Discover — Three Service Cards ── */}
 <section className="py-20 md:py-28 bg-[#EDE7DB]">
 <div className="max-w-6xl mx-auto px-6">
 <FadeInOnScroll>
 <p className="text-xs uppercase tracking-[0.2em] text-terracotta font-sans mb-3 text-center">
 Start Your Journey
 </p>
 <h2 className="font-serif text-2xl md:text-3xl text-gray-900 text-center mb-14">
 Three Ways to Discover
 </h2>
 </FadeInOnScroll>

 <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
 {/* Large left card — Browse Treatments */}
 <FadeInOnScroll delay={100}>
 <Link
 href="/treatments"
 className="group relative block rounded-2xl overflow-hidden aspect-[4/5] md:aspect-auto md:row-span-2 hover:shadow-xl transition-all duration-500"
 >
 <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent z-10" />
 <img
 src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80"
 alt=""
 className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
 />
 <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
 <p className="text-xs uppercase tracking-[0.2em] text-white/60 font-sans mb-2">
 {treatments.length}+ treatments scored
 </p>
 <h3 className="font-serif text-2xl md:text-3xl text-white mb-2">
 Explore Treatments
 </h3>
 <p className="text-sm text-white/70 font-sans leading-relaxed max-w-[320px]">
 Every treatment scored on research evidence, safety,
 community experience, accessibility, and value.
 </p>
 <span className="inline-flex items-center gap-1.5 mt-4 text-sm text-white/80 font-sans group-hover:text-white transition-colors">
 Browse all
 <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:translate-x-1 transition-transform">
 <line x1="5" y1="12" x2="19" y2="12" />
 <polyline points="12 5 19 12 12 19" />
 </svg>
 </span>
 </div>
 </Link>
 </FadeInOnScroll>

 {/* Top right card — Wellness Checker */}
 <FadeInOnScroll delay={200}>
 <Link
 href="/wellness-checker"
 className="group relative block rounded-2xl overflow-hidden aspect-[16/9] hover:shadow-xl transition-all duration-500"
 >
 <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent z-10" />
 <img
 src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80"
 alt=""
 className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
 />
 <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
 <h3 className="font-serif text-xl text-white mb-1">
 Wellness Checker
 </h3>
 <p className="text-sm text-white/70 font-sans">
 Tap your body, pick your concerns, get personalized treatment recommendations.
 </p>
 </div>
 </Link>
 </FadeInOnScroll>

 {/* Bottom right card — Read the Journal */}
 <FadeInOnScroll delay={300}>
 <Link
 href="/blog"
 className="group relative block rounded-2xl overflow-hidden aspect-[16/9] hover:shadow-xl transition-all duration-500"
 >
 <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent z-10" />
 <img
 src="https://images.unsplash.com/photo-1545389336-cf090694435e?w=800&q=80"
 alt=""
 className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
 />
 <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
 <h3 className="font-serif text-xl text-white mb-1">
 Read the Journal
 </h3>
 <p className="text-sm text-white/70 font-sans">
 Wellness stories, research deep-dives, and expert insights.
 </p>
 </div>
 </Link>
 </FadeInOnScroll>
 </div>
 </div>
 </section>

 {/* ── Kamura Score Explainer ── */}
 <section className="py-20 md:py-28 bg-cream">
 <div className="max-w-6xl mx-auto px-6">
 <FadeInOnScroll>
 <div className="text-center mb-14">
 <p className="text-xs uppercase tracking-[0.2em] text-terracotta font-sans mb-3">
 Our Methodology
 </p>
 <h2 className="font-serif text-2xl md:text-3xl text-gray-900 mb-4">
 Every Treatment, Transparently Scored
 </h2>
 <p className="text-sm text-gray-500 font-sans max-w-lg mx-auto leading-relaxed">
 The Kamura Score combines five weighted factors so you can make informed wellness decisions with confidence. No sponsored rankings, no bias.
 </p>
 </div>
 </FadeInOnScroll>

 {/* Five scoring factors */}
 <FadeInOnScroll delay={100}>
 <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-12">
 {[
 {
 icon: (
 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
 <path d="M10 2v7.527a2 2 0 0 1-.211.896L4.72 20.55a1 1 0 0 0 .9 1.45h12.76a1 1 0 0 0 .9-1.45l-5.069-10.127A2 2 0 0 1 14 9.527V2" />
 <path d="M8.5 2h7" />
 </svg>
 ),
 name: "Research",
 weight: "35%",
 desc: "Clinical trials, meta-analyses, peer-reviewed studies",
 },
 {
 icon: (
 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
 <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
 <circle cx="9" cy="7" r="4" />
 <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
 <path d="M16 3.13a4 4 0 0 1 0 7.75" />
 </svg>
 ),
 name: "Community",
 weight: "25%",
 desc: "400+ real-world reports, sentiment, outcomes",
 },
 {
 icon: (
 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
 <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
 <path d="M9 12l2 2 4-4" />
 </svg>
 ),
 name: "Safety",
 weight: "20%",
 desc: "Side effects, interactions, long-term safety data",
 },
 {
 icon: (
 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
 <circle cx="12" cy="12" r="10" />
 <line x1="2" y1="12" x2="22" y2="12" />
 <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
 </svg>
 ),
 name: "Access",
 weight: "10%",
 desc: "Availability in UAE, ease of use, prescriptions",
 },
 {
 icon: (
 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
 <line x1="12" y1="1" x2="12" y2="23" />
 <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
 </svg>
 ),
 name: "Value",
 weight: "10%",
 desc: "Cost relative to effectiveness and outcomes",
 },
 ].map((factor) => (
 <div
 key={factor.name}
 className="flex flex-col items-center text-center p-5 rounded-xl bg-white border border-gray-200/40"
 >
 <div className="text-terracotta mb-3">{factor.icon}</div>
 <p className="font-sans text-sm font-semibold text-gray-900 mb-0.5">
 {factor.name}
 </p>
 <p className="text-lg font-bold text-terracotta font-sans mb-2">
 {factor.weight}
 </p>
 <p className="text-[11px] text-gray-400 font-sans leading-snug">
 {factor.desc}
 </p>
 </div>
 ))}
 </div>
 </FadeInOnScroll>

 {/* Example score + CTA */}
 <FadeInOnScroll delay={200}>
 <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
 <div className="flex items-center gap-4">
 <KamuraScoreBadge score={92} size="lg" showLabel />
 <div>
 <p className="font-sans text-sm font-medium text-gray-900">
 Example: Gold Standard
 </p>
 <p className="text-xs text-gray-400 font-sans">
 Strong evidence + high community validation + good safety
 </p>
 </div>
 </div>
 <Link
 href="/treatments/methodology"
 className="inline-flex items-center gap-1.5 text-sm font-sans text-moss hover:underline underline-offset-4"
 >
 See full methodology &rarr;
 </Link>
 </div>
 </FadeInOnScroll>
 </div>
 </section>

 {/* ── Curated Treatments ── */}
 <section className="py-20 md:py-28 bg-[#EDE7DB]">
 <div className="max-w-6xl mx-auto px-6">
 <FadeInOnScroll>
 <div className="flex items-end justify-between mb-12">
 <div>
 <p className="text-xs uppercase tracking-[0.2em] text-terracotta font-sans mb-3">
 Evidence-Based
 </p>
 <h2 className="font-serif text-2xl md:text-3xl text-gray-900">
 Highest Rated Treatments
 </h2>
 <p className="text-sm text-gray-500 mt-2 font-sans max-w-md">
 Treatments with the strongest research, safety profiles, and community validation.
 </p>
 </div>
 <Link
 href="/treatments"
 className="hidden sm:inline-flex text-sm font-sans text-moss hover:underline underline-offset-4"
 >
 View all &rarr;
 </Link>
 </div>
 </FadeInOnScroll>

 {/* Featured treatment — large card */}
 <FadeInOnScroll delay={100}>
 <Link
 href={`/treatments/${topTreatments[0].slug}`}
 className="block mb-5 rounded-2xl bg-white border border-gray-200/40 p-6 md:p-8 hover:shadow-lg transition-all duration-500 group"
 >
 <div className="flex flex-col md:flex-row md:items-center gap-6">
 <KamuraScoreBadge score={topTreatments[0].kamuraScore} size="lg" showLabel />
 <div className="flex-1">
 <p className="text-xs uppercase tracking-[0.15em] text-gray-400 font-sans mb-1">
 {topTreatments[0].category} &middot; {topTreatments[0].evidenceLevel} Evidence
 </p>
 <h3 className="font-serif text-xl md:text-2xl text-gray-900 group-hover:text-moss transition-colors mb-2">
 {topTreatments[0].name}
 </h3>
 <p className="text-sm text-gray-500 font-sans leading-relaxed max-w-xl">
 {topTreatments[0].description}
 </p>
 </div>
 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gray-300 group-hover:text-moss group-hover:translate-x-1 transition-all shrink-0 hidden md:block">
 <line x1="5" y1="12" x2="19" y2="12" />
 <polyline points="12 5 19 12 12 19" />
 </svg>
 </div>
 </Link>
 </FadeInOnScroll>

 {/* Remaining treatments — compact grid */}
 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
 {topTreatments.slice(1, 7).map((t, i) => {
 const color = getScoreColor(t.kamuraScore);
 return (
 <FadeInOnScroll key={t.slug} delay={150 + i * 50}>
 <Link
 href={`/treatments/${t.slug}`}
 className="flex items-center gap-4 p-4 rounded-xl bg-white border border-gray-200/40 hover:shadow-md hover:border-gray-300 transition-all duration-300 group"
 >
 <div
 className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-base relative shrink-0 ${color.bg} ${color.text}`}
 >
 <span className={`absolute -inset-0.5 rounded-full border-[1.5px] ${color.border}`} />
 {t.kamuraScore}
 </div>
 <div className="min-w-0">
 <p className="font-sans text-sm font-semibold text-gray-900 group-hover:text-moss transition-colors truncate">
 {t.name}
 </p>
 <p className="text-xs text-gray-400 truncate">
 {t.category} &middot; {t.evidenceLevel} evidence
 </p>
 </div>
 </Link>
 </FadeInOnScroll>
 );
 })}
 </div>

 <Link
 href="/treatments"
 className="sm:hidden inline-flex text-sm font-sans text-moss hover:underline mt-6"
 >
 View all treatments &rarr;
 </Link>
 </div>
 </section>

 {/* ── Wellness Checker Promo — How It Works ── */}
 <section className="py-20 md:py-28 bg-cream">
 <div className="max-w-6xl mx-auto px-6">
 <FadeInOnScroll>
 <div className="text-center mb-14">
 <p className="text-xs uppercase tracking-[0.2em] text-terracotta font-sans mb-3">
 Personalized For You
 </p>
 <h2 className="font-serif text-2xl md:text-3xl text-gray-900 mb-4">
 Your Wellness, Mapped
 </h2>
 <p className="text-sm text-gray-500 font-sans max-w-lg mx-auto leading-relaxed">
 Get personalized, evidence-based treatment recommendations based on your specific concerns. Our checker analyzes {treatments.length}+ treatments across research, safety, and community data.
 </p>
 </div>
 </FadeInOnScroll>

 {/* 3-step flow */}
 <FadeInOnScroll delay={100}>
 <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
 {[
 {
 step: "01",
 icon: (
 <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
 <circle cx="12" cy="8" r="4" />
 <path d="M12 12v8" />
 <path d="M8 20h8" />
 <path d="M9 16h6" />
 </svg>
 ),
 title: "Select Your Body Zone",
 desc: "Tap on the interactive body map to choose the area you want to address.",
 },
 {
 step: "02",
 icon: (
 <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
 <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
 <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
 <path d="M9 14l2 2 4-4" />
 </svg>
 ),
 title: "Pick Your Concerns",
 desc: "Choose specific wellness concerns — sleep, pain, energy, stress, and more.",
 },
 {
 step: "03",
 icon: (
 <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
 <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
 <polyline points="14 2 14 8 20 8" />
 <line x1="16" y1="13" x2="8" y2="13" />
 <line x1="16" y1="17" x2="8" y2="17" />
 <polyline points="10 9 9 9 8 9" />
 </svg>
 ),
 title: "Get Your Wellness Report",
 desc: "Receive ranked treatments, daily protocols, key studies, and educational insights.",
 },
 ].map((item) => (
 <div
 key={item.step}
 className="flex flex-col items-center text-center p-6 rounded-xl bg-white border border-gray-200/40"
 >
 <p className="text-xs font-bold text-terracotta/50 font-sans mb-3">
 STEP {item.step}
 </p>
 <div className="text-terracotta mb-4">{item.icon}</div>
 <h3 className="font-serif text-lg text-gray-900 mb-2">
 {item.title}
 </h3>
 <p className="text-sm text-gray-500 font-sans leading-relaxed">
 {item.desc}
 </p>
 </div>
 ))}
 </div>
 </FadeInOnScroll>

 <FadeInOnScroll delay={200}>
 <div className="text-center">
 <Link
 href="/wellness-checker"
 className="inline-flex items-center gap-2 px-7 py-3.5 bg-terracotta hover:bg-terracotta-dark text-white rounded-full font-sans text-sm font-medium transition-colors duration-300"
 >
 Try the Wellness Checker
 <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
 <line x1="5" y1="12" x2="19" y2="12" />
 <polyline points="12 5 19 12 12 19" />
 </svg>
 </Link>
 </div>
 </FadeInOnScroll>
 </div>
 </section>

 {/* ── Stories / Blog — Editorial Magazine Layout ── */}
 {latestPosts.length > 0 && (
 <section className="py-20 md:py-28 bg-[#EDE7DB]">
 <div className="max-w-6xl mx-auto px-6">
 <FadeInOnScroll>
 <div className="flex items-end justify-between mb-12">
 <div>
 <p className="text-xs uppercase tracking-[0.2em] text-terracotta font-sans mb-3">
 Wellness Stories
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

 {/* Featured post — large hero card */}
 <FadeInOnScroll delay={100}>
 <Link
 href={`/blog/${latestPosts[0].slug}`}
 className="block rounded-2xl overflow-hidden bg-white border border-gray-200/40 hover:shadow-xl transition-all duration-500 group mb-5"
 >
 <div className="grid grid-cols-1 md:grid-cols-2">
 {latestPosts[0].coverImage && (
 <div className="aspect-[16/10] md:aspect-auto overflow-hidden">
 <img
 src={latestPosts[0].coverImage}
 alt=""
 className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
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
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
 {latestPosts.slice(1, 3).map((post, i) => (
 <FadeInOnScroll key={post.slug} delay={200 + i * 100}>
 <Link
 href={`/blog/${post.slug}`}
 className="rounded-2xl border border-gray-200/40 bg-white hover:shadow-lg transition-all duration-500 overflow-hidden group"
 >
 {post.coverImage && (
 <div className="aspect-[16/9] overflow-hidden">
 <img
 src={post.coverImage}
 alt=""
 className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
 />
 </div>
 )}
 <div className="p-5">
 <p className="text-[11px] uppercase tracking-[0.15em] text-terracotta font-sans mb-2">
 {post.category} &middot; {post.readingTime} min read
 </p>
 <h3 className="font-sans text-sm font-semibold text-gray-900 group-hover:text-moss transition-colors line-clamp-2 mb-1.5">
 {post.title}
 </h3>
 <p className="text-xs text-gray-400 line-clamp-2">
 {post.excerpt}
 </p>
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

 {/* ── Live News Feed ── */}
 <LiveNewsFeed showMoreLink="/events" />

 {/* ── Final CTA — Warm Closing ── */}
 <section className="py-24 md:py-32 bg-cream zen-pattern">
 <FadeInOnScroll>
 <div className="max-w-2xl mx-auto px-6 text-center">
 <div className="w-12 h-[1px] bg-terracotta/40 mx-auto mb-8" />

 <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl text-gray-900 leading-[1.4] mb-5">
 Your Wellness Journey
 <br />
 Is Uniquely Yours
 </h2>

 <p className="text-base text-gray-500 leading-relaxed font-sans max-w-md mx-auto mb-10">
 Whether you are just beginning to explore or deepening a practice you
 already love, KAMURA is here to light the way.
 </p>

 <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
 <Link
 href="/treatments"
 className="inline-flex items-center gap-2 px-7 py-3.5 bg-terracotta hover:bg-terracotta-dark text-white rounded-full font-sans text-sm font-medium transition-colors duration-300"
 >
 Explore Treatments
 </Link>
 <Link
 href="/quiz"
 className="inline-flex items-center gap-2 px-7 py-3.5 border border-gray-300 text-gray-700 hover:border-terracotta hover:text-terracotta rounded-full font-sans text-sm font-medium transition-all duration-300"
 >
 Take the Quiz
 </Link>
 </div>

 <div className="w-12 h-[1px] bg-terracotta/40 mx-auto mt-10" />
 </div>
 </FadeInOnScroll>
 </section>
 </>
 );
}
