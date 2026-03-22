import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { treatments } from "@/data/treatments";
import {
  WELLNESS_GOALS,
  getGoalBySlug,
  getTreatmentsForGoal,
} from "@/data/wellness-goals";
import TreatmentListCard from "@/components/treatments/TreatmentListCard";

interface Props {
  params: Promise<{ goal: string }>;
}

export async function generateStaticParams() {
  return WELLNESS_GOALS.map((g) => ({ goal: g.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { goal: goalSlug } = await params;
  const goal = getGoalBySlug(goalSlug);
  if (!goal) return {};

  const matching = getTreatmentsForGoal(goal, treatments);
  return {
    title: `${goal.seoTitle} | ${matching.length} Treatments`,
    description: goal.seoDescription,
    keywords: [
      `best treatments for ${goal.slug.replace(/-/g, " ")}`,
      `${goal.slug.replace(/-/g, " ")} treatments`,
      `${goal.slug.replace(/-/g, " ")} longevity`,
      ...matching.slice(0, 5).map((t) => t.name.toLowerCase()),
    ],
    openGraph: {
      title: `${goal.seoTitle} | KAMURA`,
      description: goal.seoDescription,
      url: `https://kamuralife.com/treatments/best-for/${goal.slug}`,
      images: [{ url: goal.imageUrl, width: 1200, height: 630 }],
    },
    alternates: {
      canonical: `https://kamuralife.com/treatments/best-for/${goal.slug}`,
    },
  };
}

export default async function BestForGoalPage({ params }: Props) {
  const { goal: goalSlug } = await params;
  const goal = getGoalBySlug(goalSlug);
  if (!goal) notFound();

  const matching = getTreatmentsForGoal(goal, treatments);

  const avgScore =
    matching.length > 0
      ? Math.round(
          matching.reduce((sum, t) => sum + t.kamuraScore, 0) / matching.length
        )
      : 0;

  const otherGoals = WELLNESS_GOALS.filter((g) => g.slug !== goal.slug).slice(
    0,
    6
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        name: goal.title,
        description: goal.seoDescription,
        url: `https://kamuralife.com/treatments/best-for/${goal.slug}`,
        mainEntity: {
          "@type": "ItemList",
          numberOfItems: matching.length,
          itemListElement: matching.slice(0, 20).map((t, i) => ({
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
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://kamuralife.com",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Treatments",
            item: "https://kamuralife.com/treatments",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: goal.title,
          },
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
          style={{ backgroundImage: `url('${goal.imageUrl}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-forest/60 via-black/30 to-forest/50" />

        <div className="relative z-10 text-center px-6 py-16 md:py-20">
          <span className="text-4xl mb-4 block">{goal.icon}</span>
          <h1 className="font-serif text-3xl md:text-[44px] font-bold leading-tight mb-4 text-white">
            {goal.title}
          </h1>
          <p className="text-base text-white/75 max-w-[600px] mx-auto leading-relaxed font-sans mb-6">
            {goal.description}
          </p>
          <div className="flex items-center justify-center gap-6 text-sm text-white/60 font-sans">
            <span>{matching.length} treatments</span>
            <span className="text-white/30">&bull;</span>
            <span>Avg. score: {avgScore}/100</span>
          </div>
        </div>
      </section>

      {/* Breadcrumbs */}
      <section className="max-w-[1200px] mx-auto px-6 py-4">
        <nav className="flex items-center gap-2 text-xs text-gray-400 dark:text-[#6B6358] font-sans">
          <Link
            href="/"
            className="hover:text-moss dark:hover:text-sage transition-colors"
          >
            Home
          </Link>
          <span>&rsaquo;</span>
          <Link
            href="/treatments"
            className="hover:text-moss dark:hover:text-sage transition-colors"
          >
            Treatments
          </Link>
          <span>&rsaquo;</span>
          <span className="text-gray-600 dark:text-[#A89F90]">
            Best for {goal.label}
          </span>
        </nav>
      </section>

      {/* Treatment Grid */}
      <section className="max-w-[1200px] mx-auto px-6 pb-12">
        {matching.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {matching.map((t) => (
              <TreatmentListCard key={t.slug} treatment={t} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-400 dark:text-[#6B6358] font-sans">
              No treatments matched for this goal yet.
            </p>
          </div>
        )}

        {/* Compare top treatments CTA */}
        {matching.length >= 2 && (
          <div className="mt-10 text-center">
            <Link
              href={`/treatments/compare/${matching[0].slug}-vs-${matching[1].slug}`}
              className="inline-block text-sm text-gray-500 dark:text-gray-400 hover:text-moss dark:hover:text-sage transition-colors font-sans border border-gray-200 dark:border-white/[0.06] rounded-lg px-6 py-3 hover:border-sage/40"
            >
              Compare top 2: {matching[0].name} vs {matching[1].name} &rarr;
            </Link>
          </div>
        )}
      </section>

      {/* Other Goals */}
      <section className="border-t border-gray-200 dark:border-white/[0.06]">
        <div className="max-w-[1200px] mx-auto px-6 py-12">
          <h2 className="font-serif text-xl md:text-2xl text-gray-900 dark:text-gray-100 mb-6">
            Also Explore
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {otherGoals.map((g) => (
              <Link
                key={g.slug}
                href={`/treatments/best-for/${g.slug}`}
                className="flex flex-col items-center gap-2 p-4 rounded-xl bg-white dark:bg-[#1C1815] border border-gray-200 dark:border-white/[0.06] hover:border-sage/40 hover:shadow-md transition-all text-center"
              >
                <span className="text-2xl">{g.icon}</span>
                <span className="text-xs font-sans text-gray-600 dark:text-gray-400">
                  {g.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Back link */}
      <section className="max-w-[1200px] mx-auto px-6 pb-16 text-center">
        <Link
          href="/treatments"
          className="text-sm text-gray-500 dark:text-gray-400 hover:text-moss dark:hover:text-sage transition-colors font-sans"
        >
          &larr; View all treatments
        </Link>
      </section>
    </>
  );
}
