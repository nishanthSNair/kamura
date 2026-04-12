import type { Metadata } from "next";
import { treatments } from "@/data/treatments";
import { listings } from "@/data/listings";
import FadeInOnScroll from "@/components/FadeInOnScroll";

export const metadata: Metadata = {
 title: "About KAMURA — Longevity & Wellness Intelligence Platform in Dubai",
 description:
 "KAMURA is Dubai's longevity & wellness discovery platform. Evidence-based treatment scoring, 100+ treatments ranked, 70+ clinics curated. Inspired by the Japanese tortoise (Kame, 亀).",
 keywords: [
 "KAMURA",
 "kamuralife",
 "wellness platform Dubai",
 "longevity platform",
 "wellness intelligence",
 "treatment scoring platform",
 "Kamura Score",
 "unbiased wellness",
 "wellness discovery Dubai",
 "longevity Dubai",
 ],
 alternates: {
 canonical: "https://kamuralife.com/about",
 },
 openGraph: {
 title: "About KAMURA",
 description:
 "Dubai's longevity & wellness discovery platform. Inspired by the Japanese tortoise (Kame, 亀).",
 url: "https://kamuralife.com/about",
 images: [
 {
 url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&h=630&fit=crop",
 width: 1200,
 height: 630,
 alt: "About KAMURA — Heart of Longevity",
 },
 ],
 },
 twitter: {
 card: "summary_large_image",
 title: "About KAMURA",
 description:
  "Dubai's longevity & wellness discovery platform. Evidence-based treatment scoring, curated clinics, and expert guides.",
 images: [
  "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&h=630&fit=crop",
 ],
 },
};

export default function AboutPage() {
 const jsonLd = {
 "@context": "https://schema.org",
 "@graph": [
 {
 "@type": "Organization",
 name: "KAMURA",
 url: "https://kamuralife.com",
 description:
 "The world's first unbiased wellness intelligence platform. Evidence-based treatment scoring, clinic discovery, and longevity resources.",
 foundingDate: "2024",
 areaServed: {
 "@type": "Place",
 name: "United Arab Emirates",
 },
 email: "kamuralife@gmail.com",
 logo: "https://kamuralife.com/logo-light.png",
 sameAs: ["https://www.instagram.com/kamuralife/", "https://x.com/KamuraLife"],
 },
 {
 "@type": "AboutPage",
 name: "About KAMURA",
 url: "https://kamuralife.com/about",
 description:
 "KAMURA is Dubai's longevity & wellness discovery platform. Inspired by the Japanese tortoise (Kame, 亀).",
 mainEntity: {
 "@type": "Organization",
 name: "KAMURA",
 },
 },
 {
 "@type": "BreadcrumbList",
 itemListElement: [
 { "@type": "ListItem", position: 1, name: "Home", item: "https://kamuralife.com" },
 { "@type": "ListItem", position: 2, name: "About" },
 ],
 },
 ],
 };

 return (
 <>
 <script
 type="application/ld+json"
 dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
 />

 {/* Hero Section */}
 <section className="relative h-[60vh] flex items-center justify-center">
 <div
 className="absolute inset-0 bg-cover bg-center"
 style={{
 backgroundImage:
 "url('https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1920&q=80')",
 }}
 />
 <div className="absolute inset-0 bg-gradient-to-b from-forest/40 via-black/20 to-forest/50" />
 <div className="relative z-10 text-center text-white px-6">
 <img src="/favicon-leaf.svg" alt="" className="w-10 h-10 mx-auto mb-5 opacity-70 invert" />
 <h1 className="text-4xl md:text-6xl font-serif leading-tight">
 Kamura &mdash; Heart of Longevity
 </h1>
 <p className="mt-4 text-lg text-white/70 font-sans max-w-md mx-auto">
 The world&apos;s first unbiased wellness intelligence platform.
 </p>
 </div>
 </section>

 {/* Story Section */}
 <section className="zen-pattern">
 <FadeInOnScroll className="max-w-2xl mx-auto px-6 py-20 md:py-28">
 <div className="space-y-12">
 <div>
 <h2 className="font-serif text-2xl text-terracotta mb-6">
 Our Story
 </h2>
 <p className="text-gray-600 leading-relaxed font-sans">
 <span className="font-serif text-lg text-gray-800">Kame (亀)</span>{" "}
 in Japanese is the tortoise — a universal symbol of longevity,
 wisdom, and long life.{" "}
 <span className="font-serif text-lg text-gray-800">Ura</span> means
 heart.{" "}
 <span className="font-serif text-lg text-gray-800">Kamura</span> is
 the heart of longevity.
 </p>
 <p className="text-gray-600 leading-relaxed font-sans mt-4">
 The tortoise lives slowly, intentionally, and for a very long time.
 That is how we believe life should be lived.
 </p>
 </div>

 <div className="w-12 h-px bg-sage/40" />

 <div>
 <h2 className="font-serif text-2xl text-terracotta mb-6">
 Our Mission
 </h2>
 <p className="text-gray-600 leading-relaxed font-sans">
 We are building the go-to destination for discovering longevity
 practices, wellness experts, healing centers, and transformative
 events — starting in Dubai.
 </p>
 <p className="text-gray-600 leading-relaxed font-sans mt-4">
 Whether you&apos;re exploring breathwork for the first time or
 searching for the best longevity clinic in the UAE, Kamura is your
 guide to living a longer, healthier, more intentional life.
 </p>
 </div>

 <div className="w-12 h-px bg-sage/40" />

 {/* What We Do */}
 <div>
 <h2 className="font-serif text-2xl text-terracotta mb-6">
 What We Do
 </h2>
 <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
 <div className="text-center p-5 rounded-xl border border-sage-light/60 bg-white">
 <span className="font-serif text-3xl text-moss block mb-2">{treatments.length}+</span>
 <span className="text-sm text-gray-500 font-sans">Treatments scored on evidence, safety &amp; value</span>
 </div>
 <div className="text-center p-5 rounded-xl border border-sage-light/60 bg-white">
 <span className="font-serif text-3xl text-moss block mb-2">{listings.length}+</span>
 <span className="text-sm text-gray-500 font-sans">Clinics, studios &amp; wellness centers across the UAE</span>
 </div>
 <div className="text-center p-5 rounded-xl border border-sage-light/60 bg-white">
 <span className="font-serif text-3xl text-moss block mb-2">30+</span>
 <span className="text-sm text-gray-500 font-sans">Evidence-based articles and guides</span>
 </div>
 </div>
 </div>

 <div className="w-12 h-px bg-sage/40" />

 {/* Values */}
 <div>
 <h2 className="font-serif text-2xl text-terracotta mb-6">
 What We Believe
 </h2>
 <div className="space-y-5">
 <div className="flex gap-4">
 <div className="w-1 bg-sage/40 rounded-full shrink-0" />
 <div>
 <p className="font-sans font-medium text-gray-800 mb-1">Transparency over marketing</p>
 <p className="text-sm text-gray-500 font-sans">Every treatment on Kamura is scored with real data — research quality, safety profile, accessibility, and value. No paid placements.</p>
 </div>
 </div>
 <div className="flex gap-4">
 <div className="w-1 bg-sage/40 rounded-full shrink-0" />
 <div>
 <p className="font-sans font-medium text-gray-800 mb-1">Evidence meets experience</p>
 <p className="text-sm text-gray-500 font-sans">We balance clinical research with real-world outcomes. Science matters, but so does what actually works for people.</p>
 </div>
 </div>
 <div className="flex gap-4">
 <div className="w-1 bg-sage/40 rounded-full shrink-0" />
 <div>
 <p className="font-sans font-medium text-gray-800 mb-1">Longevity is a practice, not a product</p>
 <p className="text-sm text-gray-500 font-sans">There are no shortcuts. The best longevity protocol is built on sleep, nutrition, movement, and community — everything else is a tool.</p>
 </div>
 </div>
 </div>
 </div>

 <div className="w-12 h-px bg-sage/40" />

 <div>
 <h2 className="font-serif text-2xl text-terracotta mb-6">
 Get in Touch
 </h2>
 <p className="text-gray-600 leading-relaxed font-sans">
 Have a question, partnership inquiry, or just want to say hello?
 </p>
 <div className="flex flex-col sm:flex-row gap-4 mt-5">
 <a
 href="mailto:kamuralife@gmail.com"
 className="inline-flex items-center gap-2 text-moss hover:text-forest transition-colors font-sans font-medium"
 >
 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
 kamuralife@gmail.com
 </a>
 <a
 href="https://instagram.com/kamuralife"
 target="_blank"
 rel="noopener noreferrer"
 className="inline-flex items-center gap-2 text-moss hover:text-forest transition-colors font-sans font-medium"
 >
 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
 @kamuralife
 </a>
 <a
 href="https://x.com/KamuraLife"
 target="_blank"
 rel="noopener noreferrer"
 className="inline-flex items-center gap-2 text-moss hover:text-forest transition-colors font-sans font-medium"
 >
 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
 @KamuraLife
 </a>
 </div>
 </div>
 </div>
 </FadeInOnScroll>
 </section>
 </>
 );
}
