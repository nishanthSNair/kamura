import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { areas, getListingsForArea } from "@/data/areas";
import {
  listingCategoryColors,
  ALL_LISTING_CATEGORIES,
} from "@/data/listings";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return areas.map((area) => ({ slug: area.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const area = areas.find((a) => a.slug === slug);
  if (!area) return {};

  return {
    title: area.seoTitle,
    description: area.seoDescription,
    openGraph: {
      title: area.seoTitle,
      description: area.seoDescription,
      images: [
        {
          url: "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=1200&h=630&fit=crop",
          width: 1200,
          height: 630,
          alt: `Wellness in ${area.name} — KAMURA`,
        },
      ],
    },
  };
}

export default async function AreaPage({ params }: Props) {
  const { slug } = await params;
  const area = areas.find((a) => a.slug === slug);
  if (!area) notFound();

  const areaListings = getListingsForArea(area);

  // Group listings by category
  const categoriesWithListings = ALL_LISTING_CATEGORIES.filter((cat) =>
    areaListings.some((l) => l.category === cat)
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://kamuralife.com" },
      { "@type": "ListItem", position: 2, name: "Explore", item: "https://kamuralife.com/explore" },
      { "@type": "ListItem", position: 3, name: area.name },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="relative h-[40vh] flex items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1920&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-black/45" />
        <div className="relative z-10 text-center text-white px-6 max-w-3xl">
          <p className="text-xs tracking-[0.3em] uppercase mb-4 text-white/80">
            KAMURA Explore
          </p>
          <h1 className="text-4xl md:text-5xl font-serif mb-4 leading-tight">
            Wellness in {area.name}
          </h1>
          <p className="text-base md:text-lg text-white/90 leading-relaxed font-sans">
            {areaListings.length} curated{" "}
            {areaListings.length === 1 ? "place" : "places"} across{" "}
            {categoriesWithListings.length}{" "}
            {categoriesWithListings.length === 1 ? "category" : "categories"}
          </p>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="max-w-6xl mx-auto px-6 py-4">
        <nav className="flex items-center gap-2 text-sm font-sans text-gray-400 dark:text-gray-500">
          <Link
            href="/explore"
            className="hover:text-terracotta transition-colors"
          >
            Explore
          </Link>
          <span>/</span>
          <span className="text-gray-600 dark:text-gray-400">{area.name}</span>
        </nav>
      </div>

      {/* Area Description */}
      <div className="max-w-6xl mx-auto px-6 pb-8">
        <p className="text-gray-500 dark:text-gray-400 font-sans leading-relaxed max-w-3xl">
          {area.description}
        </p>
        <div className="w-12 h-px bg-terracotta/40 mt-6" />
      </div>

      {/* Listings by Category */}
      <div className="max-w-6xl mx-auto px-6 pb-20">
        {categoriesWithListings.map((category) => {
          const catListings = areaListings.filter(
            (l) => l.category === category
          );
          const colors = listingCategoryColors[category];

          return (
            <section key={category} className="mb-14 last:mb-0">
              <div className="flex items-center gap-3 mb-6">
                <span
                  className={`text-xs px-2.5 py-1 rounded-full font-sans ${colors.bg} ${colors.text}`}
                >
                  {catListings.length}{" "}
                  {catListings.length === 1 ? "place" : "places"}
                </span>
                <h2 className="font-serif text-xl md:text-2xl text-gray-900 dark:text-gray-100">
                  {category}
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {catListings.map((listing) => (
                  <article
                    key={listing.id}
                    className="border border-gray-200 dark:border-gray-700 rounded-xl p-6 bg-white dark:bg-[#1C1815] hover:shadow-md transition-shadow flex flex-col"
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <span
                        className={`text-xs px-2.5 py-1 rounded-full font-sans ${colors.bg} ${colors.text}`}
                      >
                        {listing.category}
                      </span>
                      {listing.featured && (
                        <span className="text-xs px-2.5 py-1 rounded-full font-sans bg-terracotta/10 text-terracotta">
                          Featured
                        </span>
                      )}
                    </div>

                    <h3 className="font-serif text-xl text-gray-900 dark:text-gray-100 leading-snug mb-1">
                      <Link
                        href={`/explore/${listing.id}`}
                        className="hover:text-terracotta transition-colors"
                      >
                        {listing.name}
                      </Link>
                    </h3>
                    <p className="text-sm text-terracotta font-sans mb-3">
                      {listing.tagline}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed font-sans mb-4 flex-1">
                      {listing.description}
                    </p>

                    <div className="flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-400 font-sans mb-4">
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                      {listing.location}, {listing.city}
                    </div>

                    <Link
                      href={`/explore/${listing.id}`}
                      className="inline-flex items-center gap-1 text-sm text-terracotta hover:text-terracotta-dark transition-colors font-sans"
                    >
                      View Details
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <line x1="7" y1="17" x2="17" y2="7" />
                        <polyline points="7 7 17 7 17 17" />
                      </svg>
                    </Link>
                  </article>
                ))}
              </div>
            </section>
          );
        })}

        {areaListings.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-400 dark:text-gray-500 font-sans">
              No listings in this area yet. Check back soon!
            </p>
          </div>
        )}
      </div>

      {/* Back to Explore */}
      <section className="border-t border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50">
        <div className="max-w-xl mx-auto px-6 py-16 text-center">
          <h2 className="font-serif text-xl text-gray-900 dark:text-gray-100 mb-4">
            Explore More Areas
          </h2>
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {areas
              .filter((a) => a.slug !== slug)
              .map((a) => (
                <Link
                  key={a.slug}
                  href={`/explore/area/${a.slug}`}
                  className="px-4 py-2 text-sm font-sans rounded-full border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-terracotta hover:text-terracotta transition-colors"
                >
                  {a.name}
                </Link>
              ))}
          </div>
          <Link
            href="/explore"
            className="text-sm text-gray-800 dark:text-gray-200 underline underline-offset-4 hover:text-terracotta transition-colors font-sans"
          >
            &larr; Back to full directory
          </Link>
        </div>
      </section>
    </>
  );
}
