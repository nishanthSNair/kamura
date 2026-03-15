import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { treatments, getScoreColor, getScoreTier } from "@/data/treatments";
import { CATEGORY_META, getCategoryBySlug } from "@/data/treatment-categories";
import KamuraScoreBadge from "@/components/treatments/KamuraScoreBadge";
import EvidenceLevelTag from "@/components/treatments/EvidenceLevelTag";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return CATEGORY_META.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const cat = getCategoryBySlug(slug);
  if (!cat) return {};

  const count = treatments.filter((t) => t.category === cat.name).length;
  return {
    title: `${cat.seoTitle} | ${count} Treatments | KAMURA`,
    description: cat.seoDescription,
    openGraph: {
      title: `${cat.seoTitle} | KAMURA`,
      description: cat.seoDescription,
      images: [cat.imageUrl],
    },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const cat = getCategoryBySlug(slug);
  if (!cat) notFound();

  const categoryTreatments = treatments
    .filter((t) => t.category === cat.name)
    .sort((a, b) => b.kamuraScore - a.kamuraScore);

  const avgScore = categoryTreatments.length > 0
    ? Math.round(categoryTreatments.reduce((sum, t) => sum + t.kamuraScore, 0) / categoryTreatments.length)
    : 0;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        name: `${cat.name} — Treatments`,
        description: cat.seoDescription,
        url: `https://kamuralife.com/treatments/category/${cat.slug}`,
        mainEntity: {
          "@type": "ItemList",
          numberOfItems: categoryTreatments.length,
          itemListElement: categoryTreatments.map((t, i) => ({
            "@type": "ListItem",
            position: i + 1,
            url: `https://kamuralife.com/treatments/${t.slug}`,
            name: t.name,
          })),
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://kamuralife.com" },
          { "@type": "ListItem", position: 2, name: "Treatments", item: "https://kamuralife.com/treatments" },
          { "@type": "ListItem", position: 3, name: cat.name },
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
      <section className="relative min-h-[40vh] flex items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${cat.imageUrl}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-forest/60 via-black/30 to-forest/50" />

        <div className="relative z-10 text-center px-6 py-16 md:py-20">
          <span className="text-4xl mb-4 block">{cat.icon}</span>
          <h1 className="font-serif text-3xl md:text-[44px] font-bold leading-tight mb-4 text-white">
            {cat.name}
          </h1>
          <p className="text-base text-white/75 max-w-[600px] mx-auto leading-relaxed font-sans mb-6">
            {cat.description}
          </p>
          <div className="flex items-center justify-center gap-6 text-sm text-white/60 font-sans">
            <span>{categoryTreatments.length} treatments</span>
            <span className="text-white/30">&bull;</span>
            <span>Avg. score: {avgScore}/100</span>
          </div>
        </div>
      </section>

      {/* Breadcrumbs */}
      <section className="max-w-[1200px] mx-auto px-6 py-4">
        <nav className="flex items-center gap-2 text-xs text-gray-400 dark:text-[#6B6560] font-sans">
          <Link href="/" className="hover:text-moss dark:hover:text-sage transition-colors">Home</Link>
          <span>&rsaquo;</span>
          <Link href="/treatments" className="hover:text-moss dark:hover:text-sage transition-colors">Treatments</Link>
          <span>&rsaquo;</span>
          <span className="text-gray-600 dark:text-[#A89F95]">{cat.name}</span>
        </nav>
      </section>

      {/* Treatment Grid */}
      <section className="max-w-[1200px] mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoryTreatments.map((t) => (
            <Link
              key={t.slug}
              href={`/treatments/${t.slug}`}
              className="group bg-white dark:bg-[#1A1A1A] border border-gray-200 dark:border-white/[0.06] rounded-xl overflow-hidden hover:border-sage/40 hover:shadow-lg transition-all"
            >
              <div className="relative h-40 overflow-hidden">
                <Image
                  src={t.imageUrl}
                  alt={t.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <div className="absolute top-3 right-3">
                  <KamuraScoreBadge score={t.kamuraScore} size="sm" />
                </div>
              </div>

              <div className="p-4">
                <div className="flex items-start gap-2 mb-2">
                  <span className="text-lg">{t.icon}</span>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-[15px] text-gray-900 dark:text-[#F5F0EB] font-sans truncate">
                      {t.name}
                    </h3>
                    {t.fullName !== t.name && (
                      <p className="text-[11px] text-gray-400 dark:text-[#6B6560] font-sans truncate">
                        {t.fullName}
                      </p>
                    )}
                  </div>
                </div>

                <p className="text-xs text-gray-500 dark:text-[#A89F95] font-sans leading-relaxed mb-3 line-clamp-2">
                  {t.description}
                </p>

                <div className="flex items-center gap-2 flex-wrap mb-3">
                  <EvidenceLevelTag level={t.evidenceLevel} />
                  <span className="text-[11px] text-gray-400 dark:text-[#6B6560] font-sans">
                    {t.studyCount}+ studies
                  </span>
                  <span className="text-gray-300 dark:text-gray-600">&bull;</span>
                  <span className="text-[11px] text-gray-400 dark:text-[#6B6560] font-sans">
                    {t.community.positivePercent}% positive
                  </span>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {t.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 bg-zen-mist dark:bg-forest/20 text-[10px] text-gray-500 dark:text-gray-400 rounded-full font-sans"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {categoryTreatments.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-400 dark:text-[#6B6560] font-sans">
              No treatments in this category yet.
            </p>
          </div>
        )}

        <div className="mt-10 text-center">
          <Link
            href="/treatments"
            className="text-sm text-gray-500 dark:text-gray-400 hover:text-moss dark:hover:text-sage transition-colors font-sans"
          >
            &larr; View all treatments
          </Link>
        </div>
      </section>
    </>
  );
}
