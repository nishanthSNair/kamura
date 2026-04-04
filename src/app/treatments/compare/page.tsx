import type { Metadata } from "next";
import CompareContent from "./CompareContent";

export const metadata: Metadata = {
 title: "Compare Wellness Treatments Side by Side | KAMURA",
 description:
 "Compare any two wellness treatments head-to-head — peptides vs supplements, NAD+ vs NMN, semaglutide vs tirzepatide. Compare Kamura Scores, evidence, safety, outcomes, and cost.",
 keywords: [
 "compare treatments",
 "treatment comparison",
 "peptide comparison",
 "NAD+ vs NMN",
 "semaglutide vs tirzepatide",
 "red light therapy vs infrared sauna",
 "wellness treatment comparison",
 "compare longevity treatments",
 "BPC-157 vs TB-500",
 "cryotherapy vs cold plunge",
 ],
 openGraph: {
 title: "Compare Treatments Side by Side | KAMURA",
 description:
 "Compare any two wellness treatments side by side. Scores, evidence, outcomes, safety, and cost compared.",
 url: "https://kamuralife.com/treatments/compare",
 },
 alternates: {
 canonical: "https://kamuralife.com/treatments/compare",
 },
 twitter: {
 card: "summary_large_image",
 title: "Compare Treatments Side by Side | KAMURA",
 description: "Compare any two wellness treatments side by side. Scores, evidence, outcomes, safety, and cost compared.",
 },
};

export default function ComparePage() {
 const jsonLd = {
 "@context": "https://schema.org",
 "@graph": [
 {
 "@type": "WebPage",
 name: "Compare Wellness Treatments",
 url: "https://kamuralife.com/treatments/compare",
 description:
 "Side-by-side comparison tool for wellness treatments. Compare scores, evidence, safety, and outcomes.",
 isPartOf: {
 "@type": "WebSite",
 name: "KAMURA",
 url: "https://kamuralife.com",
 },
 },
 {
 "@type": "BreadcrumbList",
 itemListElement: [
 { "@type": "ListItem", position: 1, name: "Home", item: "https://kamuralife.com" },
 { "@type": "ListItem", position: 2, name: "Treatments", item: "https://kamuralife.com/treatments" },
 { "@type": "ListItem", position: 3, name: "Compare", item: "https://kamuralife.com/treatments/compare" },
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
 <CompareContent />
 </>
 );
}
