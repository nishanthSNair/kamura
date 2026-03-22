import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTreatmentBySlug } from "@/data/treatments";
import {
  POPULAR_COMPARISONS,
  getPopularComparison,
} from "@/data/treatment-comparisons";
import CompareContent from "../CompareContent";

interface Props {
  params: Promise<{ slugPair: string }>;
}

function parseSlugs(slugPair: string): [string, string] | null {
  const idx = slugPair.indexOf("-vs-");
  if (idx === -1) return null;
  const slug1 = slugPair.slice(0, idx);
  const slug2 = slugPair.slice(idx + 4);
  if (!slug1 || !slug2) return null;
  return [slug1, slug2];
}

export async function generateStaticParams() {
  return POPULAR_COMPARISONS.map((c) => ({
    slugPair: `${c.slug1}-vs-${c.slug2}`,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slugPair } = await params;
  const parsed = parseSlugs(slugPair);
  if (!parsed) return {};

  const [slug1, slug2] = parsed;
  const t1 = getTreatmentBySlug(slug1);
  const t2 = getTreatmentBySlug(slug2);
  if (!t1 || !t2) return {};

  const popular = getPopularComparison(slug1, slug2);
  const title =
    popular?.seoTitle || `${t1.name} vs ${t2.name} \u2014 Treatment Comparison`;
  const description =
    popular?.seoDescription ||
    `Compare ${t1.name} and ${t2.name} side by side. Kamura Scores, evidence levels, outcomes, safety profiles, and cost compared.`;

  return {
    title,
    description,
    keywords: [
      `${t1.name} vs ${t2.name}`,
      `${t1.name.toLowerCase()} comparison`,
      `${t2.name.toLowerCase()} comparison`,
      "treatment comparison",
      "wellness treatment comparison",
    ],
    openGraph: {
      title: `${title} | KAMURA`,
      description,
      url: `https://kamuralife.com/treatments/compare/${slugPair}`,
    },
    alternates: {
      canonical: `https://kamuralife.com/treatments/compare/${slugPair}`,
    },
  };
}

export default async function ComparisonPage({ params }: Props) {
  const { slugPair } = await params;
  const parsed = parseSlugs(slugPair);
  if (!parsed) notFound();

  const [slug1, slug2] = parsed;
  const t1 = getTreatmentBySlug(slug1);
  const t2 = getTreatmentBySlug(slug2);
  if (!t1 || !t2) notFound();

  const popular = getPopularComparison(slug1, slug2);
  const title =
    popular?.seoTitle || `${t1.name} vs ${t2.name}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        name: title,
        url: `https://kamuralife.com/treatments/compare/${slugPair}`,
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
            name: "Compare",
            item: "https://kamuralife.com/treatments/compare",
          },
          {
            "@type": "ListItem",
            position: 4,
            name: `${t1.name} vs ${t2.name}`,
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
      <CompareContent initialSlugs={[slug1, slug2]} />
    </>
  );
}
