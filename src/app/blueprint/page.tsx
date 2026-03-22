import type { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";
import type { BlogPostSummary } from "@/data/wellness-checker";
import WellnessCheckerApp from "./WellnessCheckerApp";

export const metadata: Metadata = {
  title: "Wellness Checker | KAMURA",
  description:
    "Select your wellness concerns on our interactive body map and get a personalized wellness report with evidence-based treatment recommendations, daily protocols, and educational insights.",
  openGraph: {
    title: "Wellness Checker | KAMURA",
    description:
      "Interactive wellness checker. Tap your body, pick your concerns, get a comprehensive wellness report backed by research.",
    url: "https://kamuralife.com/blueprint",
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
    canonical: "/blueprint",
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

  return <WellnessCheckerApp blogPosts={blogPosts} />;
}
