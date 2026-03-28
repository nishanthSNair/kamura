import type { Metadata } from "next";
import { events } from "@/data/events";
import EventsContent from "./EventsContent";

export const metadata: Metadata = {
 title: "Wellness & Longevity Events in Dubai 2025–2026 | Calendar & Listings",
 description:
 "Complete calendar of wellness events in Dubai & UAE for 2025–2026. Biohacking summits, longevity festivals, stem cell conferences, wellness retreats, fitness expos, health workshops. Dates, tickets, and details for every event.",
 keywords: [
 "wellness events dubai",
 "longevity events dubai",
 "biohacking events dubai",
 "health events UAE",
 "wellness conference dubai 2025",
 "wellness conference dubai 2026",
 "longevity summit dubai",
 "wellness retreat UAE",
 "fitness expo dubai",
 "stem cell conference dubai",
 "health tech events dubai",
 "wellness festival UAE",
 "biohacking summit 2026",
 "kamura events",
 ],
 alternates: {
 canonical: "https://kamuralife.com/events",
 },
 openGraph: {
 title: "Wellness & Longevity Events in Dubai 2025–2026",
 description:
 `${events.length} upcoming wellness events in Dubai & UAE — biohacking summits, longevity festivals, health conferences, and more. Full calendar with dates, locations, and ticket info.`,
 url: "https://kamuralife.com/events",
 type: "website",
 images: [
 {
 url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&h=630&fit=crop",
 width: 1200,
 height: 630,
 alt: "Wellness & Longevity Events in Dubai — KAMURA",
 },
 ],
 },
 twitter: {
 card: "summary_large_image",
 title: "Wellness & Longevity Events in Dubai 2025–2026",
 description:
 `${events.length} upcoming wellness events — biohacking summits, longevity festivals, and health conferences in Dubai & UAE.`,
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
 name: "Wellness & Longevity Events in Dubai",
 description: `${events.length} upcoming wellness, longevity, and biohacking events in Dubai & UAE for 2025–2026.`,
 numberOfItems: events.length,
 itemListElement: events.map((event, i) => ({
 "@type": "ListItem",
 position: i + 1,
 url: `https://kamuralife.com/events/${event.id}`,
 name: event.title,
 })),
 };

 const breadcrumbJsonLd = {
 "@context": "https://schema.org",
 "@type": "BreadcrumbList",
 itemListElement: [
 {
 "@type": "ListItem",
 position: 1,
 name: "KAMURA",
 item: "https://kamuralife.com",
 },
 {
 "@type": "ListItem",
 position: 2,
 name: "Events",
 item: "https://kamuralife.com/events",
 },
 ],
 };

 const webPageJsonLd = {
 "@context": "https://schema.org",
 "@type": "CollectionPage",
 name: "Wellness & Longevity Events in Dubai 2025–2026",
 description: `Complete calendar of ${events.length} wellness events in Dubai & UAE — biohacking summits, longevity festivals, health conferences, wellness retreats, and fitness expos.`,
 url: "https://kamuralife.com/events",
 isPartOf: {
 "@type": "WebSite",
 name: "KAMURA",
 url: "https://kamuralife.com",
 },
 about: [
 { "@type": "Thing", name: "Wellness Events" },
 { "@type": "Thing", name: "Longevity Events" },
 { "@type": "Thing", name: "Biohacking Events" },
 { "@type": "Thing", name: "Health Conferences Dubai" },
 ],
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
 <script
 type="application/ld+json"
 dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
 />
 <script
 type="application/ld+json"
 dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }}
 />
 <EventsContent />
 </>
 );
}
