import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { listings, listingCategoryColors, categoryDescriptions } from "@/data/listings";
import { getAllPosts } from "@/lib/blog";

interface Props {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return listings.map((listing) => ({ id: listing.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const listing = listings.find((l) => l.id === id);
  if (!listing) return {};

  return {
    title: `${listing.name} — ${listing.tagline}`,
    description: listing.description,
    openGraph: {
      title: `${listing.name} | KAMURA`,
      description: listing.description,
      url: `https://kamuralife.com/explore/${listing.id}`,
      type: "website",
    },
  };
}

export default async function ListingPage({ params }: Props) {
  const { id } = await params;
  const listing = listings.find((l) => l.id === id);

  if (!listing) {
    notFound();
  }

  const colors = listingCategoryColors[listing.category];

  // Related listings: same category, excluding current
  const relatedListings = listings
    .filter((l) => l.category === listing.category && l.id !== listing.id)
    .slice(0, 3);

  // Related blog articles: match services or category keywords
  const allPosts = getAllPosts();
  const categoryKeywords: Record<string, string[]> = {
    "Longevity Clinics": ["longevity", "clinic", "anti-aging", "regenerative", "stem cell", "NAD"],
    "Biohacking & Performance": ["biohacking", "cryotherapy", "cryo", "performance", "HBOT", "recovery"],
    "Holistic & Healing": ["holistic", "healing", "sound healing", "breathwork", "reiki", "ayurveda"],
    "Yoga & Movement": ["yoga", "pilates", "movement", "meditation"],
    "Wellness Retreats & Spas": ["retreat", "spa", "wellness retreat", "detox"],
  };
  const keywords = categoryKeywords[listing.category] || [];
  const relatedPosts = allPosts
    .filter((post) => {
      const text = `${post.title} ${post.excerpt}`.toLowerCase();
      return keywords.some((kw) => text.includes(kw));
    })
    .slice(0, 3);

  const mapQuery = listing.mapQuery || `${listing.name} ${listing.location} ${listing.city}`;
  const mapUrl = `https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(mapQuery)}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        name: listing.name,
        description: listing.description,
        url: listing.website,
        address: {
          "@type": "PostalAddress",
          streetAddress: listing.location,
          addressLocality: listing.city,
          addressCountry: "AE",
        },
        ...(listing.phone && { telephone: listing.phone }),
        ...(listing.email && { email: listing.email }),
        ...(listing.priceRange && { priceRange: listing.priceRange }),
        ...(listing.hours && { openingHours: listing.hours }),
        areaServed: { "@type": "City", name: listing.city },
        ...(listing.services.length > 0 && {
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "Services",
            itemListElement: listing.services.map((service) => ({
              "@type": "Offer",
              itemOffered: { "@type": "Service", name: service },
            })),
          },
        }),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://kamuralife.com" },
          { "@type": "ListItem", position: 2, name: "Explore", item: "https://kamuralife.com/explore" },
          { "@type": "ListItem", position: 3, name: listing.name },
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

      <article className="pt-24">
        {/* Header */}
        <header className="max-w-3xl mx-auto px-6 py-12">
          <Link
            href="/explore"
            className="text-sm text-gray-400 dark:text-gray-500 hover:text-terracotta transition-colors font-sans mb-6 inline-block"
          >
            &larr; All Listings
          </Link>

          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className={`text-xs px-2.5 py-1 rounded-full font-sans ${colors.bg} ${colors.text}`}>
              {listing.category}
            </span>
            {listing.featured && (
              <span className="text-xs px-2.5 py-1 rounded-full font-sans bg-terracotta/10 text-terracotta">
                Featured
              </span>
            )}
          </div>

          <h1 className="font-serif text-3xl md:text-5xl text-gray-900 dark:text-gray-100 leading-tight mb-3">
            {listing.name}
          </h1>
          <p className="text-lg text-terracotta font-sans mb-4">
            {listing.tagline}
          </p>
          <p className="text-gray-500 dark:text-gray-400 font-sans leading-relaxed mb-6">
            {listing.description}
          </p>

          {/* Location */}
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 font-sans mb-8">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
            </svg>
            {listing.location}, {listing.city}
          </div>

          <div className="w-12 h-px bg-terracotta/40" />
        </header>

        {/* Services */}
        <section className="max-w-3xl mx-auto px-6 pb-10">
          <h2 className="font-serif text-xl text-gray-900 dark:text-gray-100 mb-4">Services & Treatments</h2>
          <div className="flex flex-wrap gap-2">
            {listing.services.map((service) => (
              <span
                key={service}
                className="px-3 py-1.5 text-sm font-sans rounded-full border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800"
              >
                {service}
              </span>
            ))}
          </div>
        </section>

        {/* Details Grid */}
        {(listing.priceRange || listing.hours || listing.phone) && (
          <section className="max-w-3xl mx-auto px-6 pb-10">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {listing.priceRange && (
                <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-5">
                  <p className="text-xs text-gray-400 dark:text-gray-500 uppercase tracking-wider font-sans mb-1">Price Range</p>
                  <p className="font-sans text-gray-900 dark:text-gray-100">{listing.priceRange}</p>
                </div>
              )}
              {listing.hours && (
                <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-5">
                  <p className="text-xs text-gray-400 dark:text-gray-500 uppercase tracking-wider font-sans mb-1">Hours</p>
                  <p className="font-sans text-gray-900 dark:text-gray-100">{listing.hours}</p>
                </div>
              )}
              {listing.phone && (
                <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-5">
                  <p className="text-xs text-gray-400 dark:text-gray-500 uppercase tracking-wider font-sans mb-1">Phone</p>
                  <p className="font-sans text-gray-900 dark:text-gray-100">{listing.phone}</p>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Action Buttons */}
        <section className="max-w-3xl mx-auto px-6 pb-10">
          <div className="flex flex-wrap gap-3">
            <a
              href={listing.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 px-6 py-3 text-sm tracking-[0.1em] uppercase hover:bg-terracotta dark:hover:bg-terracotta dark:hover:text-white transition-colors font-sans"
            >
              Visit Website
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" />
              </svg>
            </a>
            {listing.whatsapp && (
              <a
                href={`https://wa.me/${listing.whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(`Hi, I found ${listing.name} on KAMURA and would like to learn more about your services.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-emerald-300 text-emerald-700 px-6 py-3 text-sm tracking-[0.1em] uppercase hover:bg-emerald-50 transition-colors font-sans"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp
              </a>
            )}
            {listing.phone && (
              <a
                href={`tel:${listing.phone}`}
                className="inline-flex items-center gap-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-6 py-3 text-sm tracking-[0.1em] uppercase hover:border-terracotta hover:text-terracotta transition-colors font-sans"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                Call
              </a>
            )}
            {listing.email && (
              <a
                href={`mailto:${listing.email}`}
                className="inline-flex items-center gap-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-6 py-3 text-sm tracking-[0.1em] uppercase hover:border-terracotta hover:text-terracotta transition-colors font-sans"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
                </svg>
                Email
              </a>
            )}
          </div>
        </section>

        {/* Google Maps */}
        <section className="max-w-3xl mx-auto px-6 pb-10">
          <h2 className="font-serif text-xl text-gray-900 dark:text-gray-100 mb-4">Location</h2>
          <div className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
            <iframe
              width="100%"
              height="350"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src={mapUrl}
              title={`Map of ${listing.name}`}
              allowFullScreen
            />
          </div>
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapQuery)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-400 hover:text-terracotta transition-colors font-sans mt-3"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
            </svg>
            Get Directions
          </a>
        </section>

        {/* Related Blog Articles */}
        {relatedPosts.length > 0 && (
          <section className="max-w-3xl mx-auto px-6 pb-10">
            <h2 className="font-serif text-xl text-gray-900 dark:text-gray-100 mb-4">Related Articles</h2>
            <div className="space-y-4">
              {relatedPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="block p-5 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-[#1a1a1a] hover:shadow-sm transition-shadow"
                >
                  <p className="text-xs text-gray-400 dark:text-gray-500 font-sans mb-1 uppercase tracking-wide">
                    {post.category}
                  </p>
                  <h3 className="font-serif text-lg text-gray-900 dark:text-gray-100 mb-1 hover:text-terracotta transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 font-sans leading-relaxed">
                    {post.excerpt}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Claim This Listing */}
        <section className="max-w-3xl mx-auto px-6 pb-10">
          <div className="border border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-8 bg-gray-50/50 dark:bg-gray-900/50 text-center">
            <h3 className="font-serif text-xl text-gray-900 dark:text-gray-100 mb-2">
              Is this your business?
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-sans leading-relaxed mb-5 max-w-md mx-auto">
              Claim this listing to update your information, add photos, respond to inquiries, and get featured on KAMURA.
            </p>
            <a
              href={`mailto:hello@kamuralife.com?subject=Claim%20Listing%3A%20${encodeURIComponent(listing.name)}&body=Business%20Name%3A%20${encodeURIComponent(listing.name)}%0AYour%20Name%3A%0AYour%20Role%3A%0APhone%3A%0A%0APlease%20verify%20your%20connection%20to%20this%20business.`}
              className="inline-flex items-center gap-2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 px-6 py-2.5 text-sm tracking-[0.1em] uppercase hover:bg-terracotta dark:hover:bg-terracotta dark:hover:text-white transition-colors font-sans"
            >
              Claim This Listing
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </a>
          </div>
        </section>

        {/* Related Listings */}
        {relatedListings.length > 0 && (
          <section className="border-t border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50">
            <div className="max-w-6xl mx-auto px-6 py-16">
              <h3 className="font-serif text-2xl text-gray-900 dark:text-gray-100 mb-2 text-center">
                More in {listing.category}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-sans text-center mb-8">
                {categoryDescriptions[listing.category]}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedListings.map((related) => (
                  <Link
                    key={related.id}
                    href={`/explore/${related.id}`}
                    className="border border-gray-200 dark:border-gray-700 rounded-xl p-6 bg-white dark:bg-[#1a1a1a] hover:shadow-md transition-shadow flex flex-col"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`text-xs px-2.5 py-1 rounded-full font-sans ${colors.bg} ${colors.text}`}>
                        {related.category}
                      </span>
                      {related.featured && (
                        <span className="text-xs px-2.5 py-1 rounded-full font-sans bg-terracotta/10 text-terracotta">
                          Featured
                        </span>
                      )}
                    </div>
                    <h4 className="font-serif text-lg text-gray-900 dark:text-gray-100 leading-snug mb-1">
                      {related.name}
                    </h4>
                    <p className="text-sm text-terracotta font-sans mb-2">
                      {related.tagline}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 font-sans leading-relaxed mb-3 flex-1 line-clamp-2">
                      {related.description}
                    </p>
                    <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 font-sans">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
                      </svg>
                      {related.location}, {related.city}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Back Link */}
        <div className="max-w-3xl mx-auto px-6 py-12 text-center">
          <Link
            href="/explore"
            className="text-sm text-gray-800 dark:text-gray-200 underline underline-offset-4 hover:text-terracotta transition-colors font-sans"
          >
            &larr; Back to all listings
          </Link>
        </div>
      </article>
    </>
  );
}
