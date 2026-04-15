import type { Metadata } from "next";
import CompareContent from "./CompareContent";

export const metadata: Metadata = {
 title: "Compare Wellness Centers",
 description:
 "Compare longevity clinics, biohacking studios, yoga studios, and wellness retreats in Dubai side by side. Find the best fit for your wellness journey.",
 keywords: [
 "compare wellness clinics Dubai",
 "longevity clinic comparison",
 "biohacking studio comparison",
 "wellness retreats UAE",
 ],
 alternates: { canonical: "https://kamuralife.com/explore/compare" },
 openGraph: {
 title: "Compare Wellness Centers | KAMURA",
 description:
 "Compare longevity clinics, biohacking studios, and wellness retreats in Dubai side by side.",
 url: "https://kamuralife.com/explore/compare",
 siteName: "KAMURA",
 locale: "en_US",
 type: "website",
 images: [
 {
 url: "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=1200&h=630&fit=crop",
 width: 1200,
 height: 630,
 alt: "Compare Wellness Centers — KAMURA",
 },
 ],
 },
 twitter: {
 card: "summary_large_image",
 title: "Compare Wellness Centers | KAMURA",
 description:
 "Compare longevity clinics and biohacking studios in Dubai side by side.",
 creator: "@KamuraLife",
 },
};

const jsonLd = {
 "@context": "https://schema.org",
 "@graph": [
 {
  "@type": "WebPage",
  name: "Compare Wellness Centers",
  url: "https://kamuralife.com/explore/compare",
  description:
  "Side-by-side comparison of longevity clinics, biohacking studios, and wellness retreats in Dubai.",
 },
 {
  "@type": "BreadcrumbList",
  itemListElement: [
  { "@type": "ListItem", position: 1, name: "Home", item: "https://kamuralife.com" },
  { "@type": "ListItem", position: 2, name: "Find Providers", item: "https://kamuralife.com/explore" },
  { "@type": "ListItem", position: 3, name: "Compare" },
  ],
 },
 ],
};

export default function ComparePage() {
 return (
 <>
  <script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
  />
  <CompareContent />
 </>
 );
}
