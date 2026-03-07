import type { Metadata } from "next";
import { events } from "@/data/events";
import EventsContent from "./EventsContent";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Discover the wellness and longevity events shaping the UAE and beyond — from biohacking summits to sound healing retreats. Calendar, listings & news coverage.",
  openGraph: {
    title: "Events | KAMURA",
    description:
      "Summits, festivals & gatherings in the world of longevity & wellness. Discover events shaping wellness in the UAE and beyond.",
    url: "https://kamuralife.com/events",
  },
};

function generateEventsJsonLd() {
  return events.map((event) => ({
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.title,
    description: event.subtitle,
    startDate: event.dateStart,
    endDate: event.dateEnd,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: event.location,
      address: {
        "@type": "PostalAddress",
        addressCountry: "AE",
      },
    },
    organizer: {
      "@type": "Organization",
      name: "KAMURA",
      url: "https://kamuralife.com",
    },
    offers: {
      "@type": "Offer",
      url: event.website,
      price: event.price === "Free" || event.price === "Free (visitor registration)" ? "0" : undefined,
      priceCurrency: "AED",
      availability: "https://schema.org/InStock",
    },
  }));
}

export default function EventsPage() {
  const jsonLd = generateEventsJsonLd();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <EventsContent />
    </>
  );
}
