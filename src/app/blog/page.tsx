import PageIntro from '@/components/kamura/PageIntro';
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
 twitter: {
 card: "summary_large_image",
 title: "Wellness Blog | KAMURA",
 description:
  "Expert guides on longevity, biohacking, holistic healing, and wellness in Dubai and the UAE.",
 images: [
  "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1200&h=630&fit=crop",
 ],
 },
};

export default function BlogIndexPage() {
 const posts = getAllPosts();

 const jsonLd = {
 "@context": "https://schema.org",
 "@graph": [
 {
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
 },
 {
  "@type": "BreadcrumbList",
  itemListElement: [
  { "@type": "ListItem", position: 1, name: "Home", item: "https://kamuralife.com" },
  { "@type": "ListItem", position: 2, name: "Blog" },
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

  {/* Clean Header */}
  <PageIntro eyebrow="Learn / The journal" title="Ideas for living well, longer." description="Explore preventive health, longevity and wellness through guides, research and practical explanations." links={[{href:'/learn',label:'Learning library'},{href:'/blog',label:'Journal',active:true},{href:'/treatments',label:'Treatments'}]}/>

  <BlogGrid posts={posts} />
 </>
 );
}
