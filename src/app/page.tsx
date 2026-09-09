import type { Metadata } from "next";
import HomeExperience from '@/components/kamura/Home';

export const metadata: Metadata = {
 title: "KAMURA — Longevity, Preventive Health & Wellness in the UAE",
 description: "Understand your body, explore longevity research, discover wellness care and find classes across the UAE. One connected preventive-health experience.",
 alternates: {canonical: "https://kamuralife.com"},
 openGraph: {title:"KAMURA — Live well. Longer.", description:"Explore your body, discover care and find your practice.", url:"https://kamuralife.com", type:"website", images:[{url:"https://kamuralife.com/images/body-atlas-preview.jpg",width:1600,height:1000,alt:"Kamura interactive anatomy"}]},
 twitter: {card:"summary_large_image",title:"KAMURA — Live well. Longer.",description:"Explore your body, discover care and find your practice.",images:["https://kamuralife.com/images/body-atlas-preview.jpg"]},
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      name: "KAMURA",
      url: "https://kamuralife.com",
      description:
        "UAE-based longevity platform — evidence-graded treatments, an interactive body atlas, and preventive-health intelligence.",
      sameAs: [
        "https://www.instagram.com/kamuralife/",
        "https://x.com/KamuraLife",
      ],
    },
    {
      "@type": "WebSite",
      name: "KAMURA",
      url: "https://kamuralife.com",
      potentialAction: {
        "@type": "SearchAction",
        target: "https://kamuralife.com/explore?q={search_term_string}",
        "query-input": "required name=search_term_string",
      },
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomeExperience />
    </>
  );
}
