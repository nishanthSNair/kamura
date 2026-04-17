import Link from "next/link";
import Image from "next/image";
import { treatments } from "@/data/treatments";
import { getAllPosts } from "@/lib/blog";

export default function DiscoverPage() {
  const topTreatments = [...treatments]
    .sort((a, b) => b.kamuraScore - a.kamuraScore)
    .slice(0, 4);
  const latestPosts = getAllPosts().slice(0, 3);

  return (
    <>
      <div className="mb-8">
        <p className="text-[10px] tracking-[0.3em] uppercase text-terracotta font-sans mb-2">
          Discover
        </p>
        <h1 className="font-serif text-3xl md:text-4xl text-gray-900 leading-tight mb-3">
          What to try next
        </h1>
        <p className="text-sm text-gray-500 font-sans max-w-xl">
          Treatments, clinics, events, and articles matched to your goals.
        </p>
      </div>

      {/* Top treatments */}
      <section className="mb-12">
        <div className="flex items-baseline justify-between mb-5 pb-3 border-b border-gray-200">
          <h2 className="font-serif text-xl text-gray-900">
            Highest-scored treatments
          </h2>
          <Link
            href="/treatments"
            className="text-[10px] tracking-[0.15em] uppercase text-terracotta font-sans font-semibold hover:underline"
          >
            See all →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {topTreatments.map((t) => (
            <Link
              key={t.slug}
              href={`/treatments/${t.slug}`}
              className="block p-5 rounded-2xl bg-white border border-gray-200 hover:border-terracotta/40 hover:shadow-sm transition-all"
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <div>
                  <p className="text-[10px] tracking-[0.2em] uppercase text-gray-400 font-sans mb-1">
                    {t.category}
                  </p>
                  <h3 className="font-serif text-lg text-gray-900">{t.name}</h3>
                </div>
                <span className="font-serif text-2xl text-terracotta shrink-0">
                  {t.kamuraScore}
                </span>
              </div>
              <p className="text-sm text-gray-500 font-sans line-clamp-2">
                {t.description}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Articles */}
      {latestPosts.length > 0 && (
        <section>
          <div className="flex items-baseline justify-between mb-5 pb-3 border-b border-gray-200">
            <h2 className="font-serif text-xl text-gray-900">Latest reading</h2>
            <Link
              href="/blog"
              className="text-[10px] tracking-[0.15em] uppercase text-terracotta font-sans font-semibold hover:underline"
            >
              All articles →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {latestPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="block rounded-2xl bg-white border border-gray-200 overflow-hidden hover:border-terracotta/40 hover:shadow-sm transition-all"
              >
                {post.coverImage && (
                  <div className="relative aspect-[16/10]">
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                )}
                <div className="p-4">
                  <p className="text-[10px] tracking-[0.2em] uppercase text-gray-400 font-sans mb-2">
                    {post.category}
                  </p>
                  <h3 className="font-serif text-base text-gray-900 leading-snug line-clamp-2">
                    {post.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
