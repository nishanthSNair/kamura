import type { Metadata } from "next";
import { events } from "@/data/events";
import EventsContent from "./EventsContent";

export const metadata: Metadata = {
  title: "Wellness & Longevity Events in Dubai 2025–2026",
  description:
    "Upcoming wellness events in Dubai & UAE — biohacking summits, longevity festivals, stem cell conferences, wellness retreats, and fitness expos. Calendar, listings & news.",
  openGraph: {
    title: "Events | KAMURA",
    description:
      "Summits, festivals & gatherings in the world of longevity & wellness. Discover events shaping wellness in the UAE and beyond.",
    url: "https://kamuralife.com/events",
    images: [
      {
        url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&h=630&fit=crop",
        width: 1200,
        height: 630,
        alt: "Wellness & Longevity Events — KAMURA",
      },
    ],
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
  const eventsJsonLd = generateEventsJsonLd();

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Wellness & Longevity Events",
    numberOfItems: events.length,
    itemListElement: events.map((event, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `https://kamuralife.com/events/${event.id}`,
      name: event.title,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventsJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <EventsContent />
    </>
  );
}
