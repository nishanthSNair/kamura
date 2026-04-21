import type { Metadata } from "next";
import { treatments } from "@/data/treatments";
import ScrollProgress from "@/components/home/ScrollProgress";
import HeroTiles from "@/components/home/HeroTiles";
import PrimaryTiles from "@/components/home/PrimaryTiles";
import SecondaryTiles from "@/components/home/SecondaryTiles";
import VerbsSection from "@/components/home/VerbsSection";
import PeptideSection from "@/components/home/PeptideSection";
import GlobeSection from "@/components/home/GlobeSection";
import ServiceRail from "@/components/home/ServiceRail";
import FooterCta from "@/components/home/FooterCta";
import StickyActions from "@/components/home/StickyActions";

export const metadata: Metadata = {
  title: "KAMURA — A Longevity Platform",
  description: `Find practitioners, book treatments, source pharmaceutical-grade peptides, and track your protocols — all on one platform. ${treatments.length}+ services scored across the GCC.`,
  keywords: [
    "wellness platform UAE",
    "longevity treatments Dubai",
    "find wellness practitioner",
    "peptide therapy",
    "book wellness treatment",
    "wellness protocol tracker",
  ],
  alternates: { canonical: "https://kamuralife.com" },
  openGraph: {
    title: "KAMURA — A Longevity Platform",
    description:
      "Find practitioners, book treatments, source peptides, track your protocol. The connected wellness platform for the GCC.",
    url: "https://kamuralife.com",
    siteName: "KAMURA",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://kamuralife.com/images/hero-home.png",
        width: 1200,
        height: 630,
        alt: "KAMURA — A Longevity Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "KAMURA — A Longevity Platform",
    description: "Discover. Book. Source. Track. Built for the GCC.",
    creator: "@KamuraLife",
    images: ["https://kamuralife.com/images/hero-home.png"],
  },
};

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: "KAMURA",
        url: "https://kamuralife.com",
        description: "The connected longevity platform for the GCC",
        sameAs: ["https://www.instagram.com/kamuralife/", "https://x.com/KamuraLife"],
      },
      {
        "@type": "WebSite",
        name: "KAMURA",
        url: "https://kamuralife.com",
        potentialAction: {
          "@type": "SearchAction",
          target: "https://kamuralife.com/treatments?q={search_term_string}",
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
      <div className="bg-[#F4EDE0] min-h-screen">
        <ScrollProgress />
        <HeroTiles />
        <PrimaryTiles />
        <SecondaryTiles />
        <PeptideSection />
        <VerbsSection />
        <GlobeSection />
        <ServiceRail />
        <FooterCta />
        <StickyActions />
      </div>
    </>
  );
}
