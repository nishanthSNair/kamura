import type { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";
import type { BlogPostSummary } from "@/data/wellness-checker";
import WellnessCheckerApp from "./WellnessCheckerApp";

export const metadata: Metadata = {
 title: "Wellness Dashboard — Personalized Assessment & Treatment Plan",
 description:
 "Free comprehensive wellness assessment. Answer questions about your lifestyle, health concerns, and goals — get a personalized dashboard with scored treatments, daily protocols, budget planning, and progress tracking.",
 keywords: [
 "wellness assessment",
 "wellness dashboard",
 "personalized treatment recommendations",
 "wellness questionnaire",
 "body map health",
 "treatment finder",
 "health recommendations",
 "evidence-based wellness",
 "longevity recommendations",
 "biohacking recommendations",
 "peptide therapy recommendations",
 "wellness tool",
 "wellness score",
 "daily wellness protocol",
 ],
 openGraph: {
 title: "Wellness Dashboard — Personalized Assessment | KAMURA",
 description:
 "Comprehensive wellness assessment. Build your profile, get a personalized dashboard with evidence-based treatments, daily protocols, and progress tracking.",
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
 twitter: {
 card: "summary_large_image",
 title: "Wellness Dashboard — Personalized Assessment | KAMURA",
 description: "Free comprehensive wellness assessment with personalized treatment recommendations and daily protocols.",
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
 name: "KAMURA Wellness Dashboard",
 url: "https://kamuralife.com/wellness-checker",
 description:
 "Comprehensive wellness assessment and personalized dashboard with evidence-based treatment recommendations, daily protocols, and progress tracking across 100+ treatments.",
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
