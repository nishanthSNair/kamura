import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { events, categoryColors } from "@/data/events";
import { news } from "@/data/news";
import ShareButtons from "@/components/ShareButtons";

interface Props {
 params: Promise<{ id: string }>;
}

export function generateStaticParams() {
 return events.map((event) => ({ id: event.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
 const { id } = await params;
 const event = events.find((e) => e.id === id);
 if (!event) return {};

 return {
 title: `${event.title} — ${event.location}`,
 description: event.subtitle,
 keywords: [
 "wellness event",
 "longevity event",
 event.category.toLowerCase(),
 event.location.toLowerCase(),
 "wellness events Dubai",
 ],
 alternates: {
 canonical: `https://kamuralife.com/events/${event.id}`,
 },
 openGraph: {
 title: `${event.title} | KAMURA`,
 description: event.subtitle,
 url: `https://kamuralife.com/events/${event.id}`,
 type: "website",
 images: [
 {
 url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&h=630&fit=crop",
 width: 1200,
 height: 630,
 alt: `${event.title} — KAMURA`,
 },
 ],
 },
 };
}

export default async function EventPage({ params }: Props) {
 const { id } = await params;
 const event = events.find((e) => e.id === id);

 if (!event) {
 notFound();
 }

 const colors = categoryColors[event.category];
 const today = new Date();
 today.setHours(0, 0, 0, 0);
 const upcoming = new Date(event.dateEnd) >= today;
 const relatedNews = news.filter((n) => n.relatedEventId === event.id);

 const jsonLd = {
 "@context": "https://schema.org",
 "@graph": [
 {
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
 address: { "@type": "PostalAddress", addressCountry: "AE" },
 },
 organizer: {
 "@type": "Organization",
 name: "KAMURA",
 url: "https://kamuralife.com",
 },
 offers: {
 "@type": "Offer",
 url: event.website,
 priceCurrency: "AED",
 availability: "https://schema.org/InStock",
 },
 },
 {
 "@type": "BreadcrumbList",
 itemListElement: [
 { "@type": "ListItem", position: 1, name: "Home", item: "https://kamuralife.com" },
 { "@type": "ListItem", position: 2, name: "Events", item: "https://kamuralife.com/events" },
 { "@type": "ListItem", position: 3, name: event.title },
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

 {/* Sticky sidebar share — desktop */}
 <ShareButtons
 url={`https://kamuralife.com/events/${event.id}`}
 title={event.title}
 description={event.subtitle}
 variant="sidebar"
 />

 <article className="pt-24">
 {/* Header */}
 <header className="max-w-3xl mx-auto px-6 py-12">
 <Link
 href="/events"
 className="text-sm text-gray-400 hover:text-terracotta transition-colors font-sans mb-6 inline-block"
 >
 &larr; All Events
 </Link>

 <div className="flex flex-wrap items-center gap-2 mb-4">
 <span className={`text-xs px-2.5 py-1 rounded-full font-sans ${colors.bg} ${colors.text}`}>
 {event.category}
 </span>
 <span className={`text-xs px-2.5 py-1 rounded-full font-sans ${upcoming ? "bg-emerald-50 text-emerald-700" : "bg-gray-100 text-gray-500"}`}>
 {upcoming ? "UPCOMING" : "PAST"}
 </span>
 </div>

 <h1 className="font-serif text-3xl md:text-5xl text-gray-900 leading-tight mb-4">
 {event.title}
 </h1>
 <p className="text-lg text-gray-500 font-sans leading-relaxed mb-8">
 {event.subtitle}
 </p>

 <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-gray-600 font-sans mb-8">
 <span className="flex items-center gap-2">
 <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
 <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
 <line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
 </svg>
 {event.dates}
 </span>
 <span className="flex items-center gap-2">
 <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
 <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
 </svg>
 {event.location}
 </span>
 </div>

 <div className="w-12 h-px bg-terracotta/40" />
 </header>

 {/* Details Grid */}
 <section className="max-w-3xl mx-auto px-6 pb-12">
 <div className="grid grid-cols-3 gap-6 mb-10">
 <div className="border border-gray-200 rounded-xl p-5 text-center">
 <p className="text-xs text-gray-400 uppercase tracking-wider font-sans mb-1">Attendees</p>
 <p className="font-serif text-xl text-gray-900">{event.attendees}</p>
 </div>
 <div className="border border-gray-200 rounded-xl p-5 text-center">
 <p className="text-xs text-gray-400 uppercase tracking-wider font-sans mb-1">Speakers</p>
 <p className="font-serif text-xl text-gray-900">{event.speakers}</p>
 </div>
 <div className="border border-gray-200 rounded-xl p-5 text-center">
 <p className="text-xs text-gray-400 uppercase tracking-wider font-sans mb-1">Price</p>
 <p className="font-serif text-xl text-gray-900">{event.price}</p>
 </div>
 </div>

 {/* Highlights */}
 <div className="mb-10">
 <h2 className="font-serif text-xl text-gray-900 mb-4">Key Highlights</h2>
 <ul className="space-y-3">
 {event.highlights.map((h, i) => (
 <li key={i} className="flex gap-3 text-sm text-gray-600 font-sans leading-relaxed">
 <span className={`mt-1.5 w-2 h-2 rounded-full shrink-0 ${colors.dot}`} />
 {h}
 </li>
 ))}
 </ul>
 </div>

 {/* CTA */}
 <a
 href={event.website}
 target="_blank"
 rel="noopener noreferrer"
 className="inline-flex items-center gap-2 bg-gray-900 text-white px-8 py-3 text-sm tracking-[0.1em] uppercase hover:bg-terracotta transition-colors font-sans"
 >
 Visit Official Website
 <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
 <line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" />
 </svg>
 </a>
 {/* Share — mobile only (sidebar handles desktop) */}
 <div className="mt-6 lg:hidden">
 <ShareButtons
 url={`https://kamuralife.com/events/${event.id}`}
 title={event.title}
 description={event.subtitle}
 variant="inline"
 />
 </div>
 </section>

 {/* Related News */}
 {relatedNews.length > 0 && (
 <section className="border-t border-gray-100 bg-gray-50/50">
 <div className="max-w-3xl mx-auto px-6 py-16">
 <h2 className="font-serif text-xl text-gray-900 mb-6">
 News &amp; Coverage
 </h2>
 <div className="space-y-4">
 {relatedNews.map((item) => (
 <a
 key={item.id}
 href={item.url}
 target="_blank"
 rel="noopener noreferrer"
 className="block p-5 border border-gray-200 rounded-xl bg-white hover:shadow-sm transition-shadow"
 >
 <div className="flex items-center gap-2 text-xs text-gray-400 font-sans mb-2">
 <span className="font-medium text-gray-600">{item.source}</span>
 <span>&middot;</span>
 <span>{item.date}</span>
 </div>
 <h3 className="font-serif text-lg text-gray-900 mb-2 hover:text-terracotta transition-colors">
 {item.title}
 </h3>
 <p className="text-sm text-gray-500 font-sans leading-relaxed">
 {item.summary}
 </p>
 </a>
 ))}
 </div>
 </div>
 </section>
 )}

 {/* Cross-links — internal linking */}
 <section className="border-t border-gray-100">
 <div className="max-w-3xl mx-auto px-6 py-12">
 <p className="text-xs uppercase tracking-widest text-gray-400 font-sans mb-4">Explore More</p>
 <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
 <Link href="/treatments" className="block p-4 border border-gray-200 rounded-xl hover:border-terracotta/40 transition-colors text-center">
 <span className="text-2xl mb-1 block">🔬</span>
 <span className="text-sm font-sans font-medium text-gray-700">Browse Treatments</span>
 </Link>
 <Link href="/wellness-checker" className="block p-4 border border-gray-200 rounded-xl hover:border-terracotta/40 transition-colors text-center">
 <span className="text-2xl mb-1 block">🩺</span>
 <span className="text-sm font-sans font-medium text-gray-700">Wellness Checker</span>
 </Link>
 <Link href="/explore" className="block p-4 border border-gray-200 rounded-xl hover:border-terracotta/40 transition-colors text-center">
 <span className="text-2xl mb-1 block">📍</span>
 <span className="text-sm font-sans font-medium text-gray-700">Find Clinics</span>
 </Link>
 </div>
 </div>
 </section>

 {/* Back Link */}
 <div className="max-w-3xl mx-auto px-6 py-12 text-center">
 <Link
 href="/events"
 className="text-sm text-gray-800 underline underline-offset-4 hover:text-terracotta transition-colors font-sans"
 >
 &larr; Back to all events
 </Link>
 </div>
 </article>
 </>
 );
}
