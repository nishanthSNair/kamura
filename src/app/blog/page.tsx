import type { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";
import BlogGrid from "../BlogGrid";

export const metadata: Metadata = {
 title: "Wellness Blog — Longevity Guides, Biohacking Science & Trends",
 description:
 "Expert guides on peptide therapy, NAD+ infusions, red light therapy, biohacking, Ayurveda, and wellness trends in Dubai. Evidence-based longevity articles with practical tips.",
 keywords: [
 "wellness blog",
 "longevity guides",
 "biohacking blog",
 "peptide therapy guide",
 "NAD+ benefits",
 "red light therapy guide",
 "wellness Dubai blog",
 "holistic healing",
 "Ayurveda Dubai",
 "biohacking tips",
 "longevity science",
 "wellness trends 2026",
 ],
 alternates: {
 canonical: "https://kamuralife.com/blog",
 },
 openGraph: {
 title: "Wellness Blog | KAMURA",
 description:
 "Expert guides on longevity, biohacking, holistic healing, and wellness in Dubai and the UAE.",
 url: "https://kamuralife.com/blog",
 images: [
 {
 url: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1200&h=630&fit=crop",
 width: 1200,
 height: 630,
 alt: "Wellness Blog — KAMURA",
 },
 ],
 },
};

export default function BlogIndexPage() {
 const posts = getAllPosts();

 const jsonLd = {
 "@context": "https://schema.org",
 "@type": "CollectionPage",
 name: "KAMURA Wellness Blog",
 description:
 "Expert guides on longevity, biohacking, holistic healing, and wellness in Dubai and the UAE.",
 url: "https://kamuralife.com/blog",
 mainEntity: {
 "@type": "ItemList",
 numberOfItems: posts.length,
 itemListElement: posts.map((post, i) => ({
 "@type": "ListItem",
 position: i + 1,
 url: `https://kamuralife.com/blog/${post.slug}`,
 name: post.title,
 })),
 },
 };

 return (
 <>
 <script
 type="application/ld+json"
 dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
 />

 {/* Nature Hero */}
 <section className="relative min-h-[40vh] flex items-center justify-center overflow-hidden">
 <div
 className="absolute inset-0 bg-cover bg-center"
 style={{ backgroundImage: "url('https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1600&q=80&fit=crop')" }}
 />
 <div className="absolute inset-0 bg-gradient-to-b from-forest/60 via-black/30 to-forest/50" />
 <div className="relative z-10 text-center px-6 py-24 md:py-32">
 <p className="text-xs tracking-[0.3em] uppercase mb-4 text-sage-light font-sans">
 KAMURA Blog
 </p>
 <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white mb-5 leading-tight max-w-3xl mx-auto">
 Wellness Guides & Insights
 </h1>
 <p className="text-white/70 font-sans leading-relaxed max-w-2xl mx-auto text-lg">
 Expert guides on longevity clinics, biohacking studios, holistic
 healing, and wellness trends across Dubai and the UAE.
 </p>
 </div>
 </section>

 <BlogGrid posts={posts} />
 </>
 );
}
