import type { Metadata } from "next";
import QuizContent from "./QuizContent";

export const metadata: Metadata = {
 title: "Wellness Quiz — Discover Your Wellness Archetype in 2 Minutes",
 description:
 "Take the free KAMURA Wellness Quiz. 10 questions, 2 minutes — discover your wellness score, archetype (Biohacker, Yogi, or Healer), and get personalized longevity recommendations.",
 keywords: [
 "wellness quiz",
 "wellness archetype",
 "longevity quiz",
 "biohacking quiz",
 "wellness assessment",
 "health quiz",
 "wellness score",
 "personalized wellness",
 "longevity assessment",
 "wellness type",
 ],
 alternates: {
 canonical: "https://kamuralife.com/quiz",
 },
 openGraph: {
 title: "Discover Your Wellness Archetype | KAMURA Quiz",
 description:
 "10 questions. 2 minutes. Find out your wellness score, your archetype, and where to start your longevity journey.",
 url: "https://kamuralife.com/quiz",
 images: [
 {
 url: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1200&h=630&fit=crop",
 width: 1200,
 height: 630,
 alt: "Wellness Quiz — KAMURA",
 },
 ],
 },
};

export default function QuizPage() {
 const jsonLd = {
 "@context": "https://schema.org",
 "@type": "WebApplication",
 name: "KAMURA Wellness Quiz",
 url: "https://kamuralife.com/quiz",
 description:
 "10-question wellness assessment that reveals your wellness archetype and personalized longevity recommendations.",
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
 };

 return (
 <>
 <script
 type="application/ld+json"
 dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
 />
 <QuizContent />
 </>
 );
}
