import type { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";
import type { BlogPostSummary } from "@/data/wellness-checker";
import WellnessCheckerApp from "./WellnessCheckerApp";

export const metadata: Metadata = {
 title: "Wellness Checker — Personalized Treatment Recommendations",
 description:
 "Free interactive wellness checker. Select concerns on our body map and get a personalized report with evidence-based treatment recommendations — peptides, supplements, red light therapy, and more.",
 keywords: [
 "wellness checker",
 "wellness assessment",
 "personalized treatment recommendations",
 "body map health",
 "wellness report",
 "treatment finder",
 "health recommendations",
 "evidence-based wellness",
 "longevity recommendations",
 "biohacking recommendations",
 "peptide therapy recommendations",
 "wellness tool",
 ],
 openGraph: {
 title: "Wellness Checker — Personalized Recommendations | KAMURA",
 description:
 "Interactive wellness checker. Tap your body, pick your concerns, get a comprehensive wellness report backed by research.",
 url: "https://kamuralife.com/wellness-checker",
 images: [
 {
 url: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=1200&h=630&fit=crop",
 width: 1200,
 height: 630,
 alt: "Wellness Checker — KAMURA",
 },
 ],
 },
 alternates: {
 canonical: "https://kamuralife.com/wellness-checker",
 },
};

export default function BlueprintPage() {
 // Fetch blog posts on the server and pass lightweight summaries to the client
 const allPosts = getAllPosts();
 const blogPosts: BlogPostSummary[] = allPosts.map((p) => ({
 slug: p.slug,
 title: p.title,
 excerpt: p.excerpt,
 category: p.category,
 readingTime: p.readingTime,
 relatedTreatments: p.relatedTreatments,
 }));

 const jsonLd = {
 "@context": "https://schema.org",
 "@graph": [
 {
 "@type": "WebApplication",
 name: "KAMURA Wellness Checker",
 url: "https://kamuralife.com/wellness-checker",
 description:
 "Interactive body-map wellness checker that provides personalized, evidence-based treatment recommendations across 100+ treatments.",
 applicationCategory: "HealthApplication",
 operatingSystem: "Any",
 offers: {
 "@type": "Offer",
 price: "0",
 priceCurrency: "USD",
 },
 provider: {
 "@type": "Organization",
 name: "KAMURA",
 url: "https://kamuralife.com",
 },
 },
 {
 "@type": "BreadcrumbList",
 itemListElement: [
 { "@type": "ListItem", position: 1, name: "Home", item: "https://kamuralife.com" },
 { "@type": "ListItem", position: 2, name: "Wellness Checker", item: "https://kamuralife.com/wellness-checker" },
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
 <WellnessCheckerApp blogPosts={blogPosts} />
 </>
 );
}
