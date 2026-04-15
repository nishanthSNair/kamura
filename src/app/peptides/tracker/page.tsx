import type { Metadata } from "next";
import PeptideTrackerClient from "@/components/peptides/PeptideTrackerClient";

export const metadata: Metadata = {
  title: "Peptide Dashboard — Track Cycles, Log Doses, Smart Reminders",
  description:
    "A private peptide tracker: log doses, monitor pen inventory, manage cycles, and get fasting reminders. Data lives on your device — no account required.",
  keywords: [
    "peptide tracker",
    "peptide dashboard",
    "peptide dose log",
    "peptide cycle tracker",
    "BPC-157 tracker",
    "tesamorelin tracker",
    "peptide pen inventory",
    "injection site rotation",
  ],
  alternates: { canonical: "https://kamuralife.com/peptides/tracker" },
  openGraph: {
    title: "Peptide Dashboard | KAMURA",
    description:
      "Track active peptide cycles, log doses, and get smart reminders. Private — data lives on your device.",
    url: "https://kamuralife.com/peptides/tracker",
    siteName: "KAMURA",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "https://kamuralife.com/images/hero-home.png",
        width: 1200,
        height: 630,
        alt: "Kamura Peptide Dashboard",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Peptide Dashboard | KAMURA",
    description:
      "Private peptide tracker — cycles, doses, pen inventory, smart reminders.",
    creator: "@KamuraLife",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Kamura Peptide Dashboard",
      url: "https://kamuralife.com/peptides/tracker",
      applicationCategory: "HealthApplication",
      operatingSystem: "Any",
      description:
        "A private peptide therapy tracker with cycle management, dose logging, pen inventory, and smart fasting reminders.",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      featureList: [
        "Active cycle tracking",
        "Dose logging with injection site rotation",
        "Pen inventory alerts",
        "Fasting window reminders",
        "Mood, energy, and sleep ratings",
        "Month calendar view",
      ],
      publisher: {
        "@type": "Organization",
        name: "KAMURA",
        url: "https://kamuralife.com",
      },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://kamuralife.com" },
        { "@type": "ListItem", position: 2, name: "Peptides", item: "https://kamuralife.com/peptides" },
        { "@type": "ListItem", position: 3, name: "Dashboard" },
      ],
    },
  ],
};

export default function PeptideTrackerPage() {
  return (
    <div className="pt-20 bg-white min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PeptideTrackerClient />
    </div>
  );
}
