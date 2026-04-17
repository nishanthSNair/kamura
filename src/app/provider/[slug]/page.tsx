import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import BookingWidget from "@/components/provider/BookingWidget";

interface Props {
  params: Promise<{ slug: string }>;
}

interface Provider {
  id: string;
  business_name: string;
  slug: string;
  description: string;
  category: string;
  phone: string;
  email: string;
  website: string;
  address: string;
  city: string;
  emirate: string;
  cover_image_url: string;
  logo_url: string;
  operating_hours: Record<string, string>;
  verified: boolean;
}

interface Service {
  id: string;
  name: string;
  description: string;
  duration_minutes: number;
  price_aed: number;
  treatment_slug: string | null;
}

interface Review {
  id: string;
  customer_name: string;
  rating: number;
  comment: string;
  created_at: string;
}

async function getProvider(slug: string) {
  const supabase = await createServerSupabaseClient();
  const { data: provider } = await supabase
    .from("providers")
    .select("*")
    .eq("slug", slug)
    .eq("active", true)
    .single();
  if (!provider) return null;

  const [{ data: services }, { data: reviews }] = await Promise.all([
    supabase
      .from("services")
      .select("*")
      .eq("provider_id", provider.id)
      .eq("active", true)
      .order("sort_order"),
    supabase
      .from("reviews")
      .select("*")
      .eq("provider_id", provider.id)
      .eq("flagged", false)
      .order("created_at", { ascending: false })
      .limit(20),
  ]);

  return {
    provider: provider as Provider,
    services: (services as Service[]) || [],
    reviews: (reviews as Review[]) || [],
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = await getProvider(slug);
  if (!data) return {};
  const { provider } = data;
  return {
    title: `${provider.business_name} — ${provider.category}`,
    description: provider.description || `Book services at ${provider.business_name} on Kamura.`,
    alternates: { canonical: `https://kamuralife.com/provider/${slug}` },
    openGraph: {
      title: `${provider.business_name} | KAMURA`,
      description: provider.description || `Book at ${provider.business_name}`,
      url: `https://kamuralife.com/provider/${slug}`,
      type: "website",
    },
  };
}

export default async function ProviderPublicProfile({ params }: Props) {
  const { slug } = await params;
  const data = await getProvider(slug);
  if (!data) notFound();
  const { provider, services, reviews } = data;

  const avgRating =
    reviews.length > 0
      ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
      : null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": `https://kamuralife.com/provider/${slug}`,
        name: provider.business_name,
        description: provider.description,
        address: {
          "@type": "PostalAddress",
          streetAddress: provider.address,
          addressLocality: provider.city,
          addressRegion: provider.emirate,
          addressCountry: "AE",
        },
        telephone: provider.phone,
        email: provider.email,
        url: provider.website || `https://kamuralife.com/provider/${slug}`,
        ...(avgRating && {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: avgRating,
            reviewCount: reviews.length,
          },
        }),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://kamuralife.com" },
          { "@type": "ListItem", position: 2, name: "Providers", item: "https://kamuralife.com/explore" },
          { "@type": "ListItem", position: 3, name: provider.business_name },
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

      {/* Hero */}
      <section className="relative pt-24 pb-12 bg-[#EDE7DB]">
        <div className="max-w-6xl mx-auto px-6">
          {provider.cover_image_url && (
            <div className="relative h-[260px] md:h-[360px] rounded-3xl overflow-hidden mb-8">
              <Image
                src={provider.cover_image_url}
                alt={provider.business_name}
                fill
                priority
                className="object-cover"
              />
            </div>
          )}

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3 flex-wrap">
                <span className="px-3 py-1 rounded-full bg-white/80 text-xs tracking-[0.15em] uppercase text-gray-600 font-sans">
                  {provider.category}
                </span>
                {provider.verified && (
                  <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-sans font-semibold">
                    ✓ Verified
                  </span>
                )}
                {avgRating && (
                  <span className="text-sm text-gray-600 font-sans">
                    ★ {avgRating} ({reviews.length})
                  </span>
                )}
              </div>
              <h1 className="font-serif text-4xl md:text-5xl text-gray-900 mb-3">
                {provider.business_name}
              </h1>
              {provider.description && (
                <p className="text-base text-gray-600 font-sans leading-relaxed max-w-2xl">
                  {provider.description}
                </p>
              )}
            </div>

            <div className="flex flex-wrap gap-2">
              {provider.phone && (
                <a
                  href={`tel:${provider.phone}`}
                  className="px-4 py-2.5 rounded-full border border-gray-300 text-sm font-sans text-gray-700 hover:border-terracotta hover:text-terracotta transition-colors"
                >
                  Call
                </a>
              )}
              {provider.phone && (
                <a
                  href={`https://wa.me/${provider.phone.replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-full border border-gray-300 text-sm font-sans text-gray-700 hover:border-emerald-600 hover:text-emerald-700 transition-colors"
                >
                  WhatsApp
                </a>
              )}
              {provider.website && (
                <a
                  href={provider.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-full border border-gray-300 text-sm font-sans text-gray-700 hover:border-terracotta hover:text-terracotta transition-colors"
                >
                  Website
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main content grid */}
      <section className="py-14 bg-white">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10">
          {/* Left — Services + Reviews */}
          <div>
            {/* Services */}
            <div className="mb-14">
              <h2 className="font-serif text-2xl text-gray-900 mb-6">Services</h2>
              {services.length === 0 ? (
                <p className="text-sm text-gray-400 font-sans italic">
                  No services listed yet.
                </p>
              ) : (
                <div className="divide-y divide-gray-200 border-y border-gray-200">
                  {services.map((s) => (
                    <div
                      key={s.id}
                      className="py-5 flex items-start justify-between gap-4 flex-wrap"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-1 flex-wrap">
                          <h3 className="font-serif text-lg text-gray-900">
                            {s.name}
                          </h3>
                          {s.treatment_slug && (
                            <Link
                              href={`/treatments/${s.treatment_slug}`}
                              className="text-[10px] tracking-[0.15em] uppercase text-terracotta hover:underline font-sans"
                            >
                              Kamura-Scored →
                            </Link>
                          )}
                        </div>
                        {s.description && (
                          <p className="text-sm text-gray-500 font-sans mb-2">
                            {s.description}
                          </p>
                        )}
                        <p className="text-xs text-gray-400 font-sans">
                          {s.duration_minutes} min
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-serif text-xl text-gray-900">
                          AED {Number(s.price_aed).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Reviews */}
            <div>
              <h2 className="font-serif text-2xl text-gray-900 mb-6">
                Reviews {reviews.length > 0 && `(${reviews.length})`}
              </h2>
              {reviews.length === 0 ? (
                <p className="text-sm text-gray-400 font-sans italic">
                  No reviews yet. Be the first to book and leave feedback.
                </p>
              ) : (
                <div className="space-y-5">
                  {reviews.map((r) => (
                    <div
                      key={r.id}
                      className="p-5 rounded-2xl border border-gray-200"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-serif text-base text-gray-900">
                          {r.customer_name}
                        </p>
                        <div className="flex gap-0.5">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <svg
                              key={star}
                              width="14"
                              height="14"
                              viewBox="0 0 24 24"
                              fill={star <= r.rating ? "#B5736A" : "none"}
                              stroke="#B5736A"
                              strokeWidth="1.5"
                            >
                              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                            </svg>
                          ))}
                        </div>
                      </div>
                      {r.comment && (
                        <p className="text-sm text-gray-600 font-sans leading-relaxed">
                          {r.comment}
                        </p>
                      )}
                      <p className="text-xs text-gray-400 font-sans mt-2">
                        {new Date(r.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right — Booking widget + Info */}
          <aside className="lg:sticky lg:top-28 h-fit space-y-6">
            <BookingWidget providerId={provider.id} services={services} />

            {/* Location */}
            {(provider.address || provider.city) && (
              <div className="p-6 rounded-2xl bg-[#EDE7DB]/70">
                <p className="text-[10px] tracking-[0.2em] uppercase text-gray-500 font-sans mb-3">
                  Location
                </p>
                <p className="text-sm text-gray-900 font-sans leading-relaxed">
                  {provider.address && <>{provider.address}<br /></>}
                  {provider.city}
                  {provider.emirate && provider.emirate !== provider.city && `, ${provider.emirate}`}
                </p>
              </div>
            )}

            {/* Hours */}
            {Object.keys(provider.operating_hours || {}).length > 0 && (
              <div className="p-6 rounded-2xl bg-[#EDE7DB]/70">
                <p className="text-[10px] tracking-[0.2em] uppercase text-gray-500 font-sans mb-3">
                  Hours
                </p>
                <dl className="space-y-1 text-sm font-sans">
                  {Object.entries(provider.operating_hours).map(([day, hours]) => (
                    <div key={day} className="flex justify-between">
                      <dt className="text-gray-500 capitalize">{day}</dt>
                      <dd className="text-gray-900">{hours}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}
          </aside>
        </div>
      </section>
    </>
  );
}
