import { NextResponse } from "next/server";
import { getAllPosts } from "@/lib/blog";
import { listings } from "@/data/listings";
import { events } from "@/data/events";
import { treatments, getTreatmentBySlug } from "@/data/treatments";
import { WELLNESS_GOALS } from "@/data/wellness-goals";
import { POPULAR_COMPARISONS } from "@/data/treatment-comparisons";

export async function GET() {
  const posts = getAllPosts();

  const searchIndex = {
    goals: WELLNESS_GOALS.map((g) => ({
      type: "goal" as const,
      title: g.title,
      excerpt: g.description,
      category: "Goal",
      url: `/treatments/best-for/${g.slug}`,
      services: g.searchTriggers,
    })),
    comparisons: POPULAR_COMPARISONS.map((c) => {
      const t1 = getTreatmentBySlug(c.slug1);
      const t2 = getTreatmentBySlug(c.slug2);
      return {
        type: "comparison" as const,
        title: `${t1?.name || c.slug1} vs ${t2?.name || c.slug2}`,
        excerpt: c.seoDescription,
        category: "Comparison",
        url: `/treatments/compare/${c.slug1}-vs-${c.slug2}`,
        services: [
          t1?.name || "",
          t2?.name || "",
          c.slug1,
          c.slug2,
        ].filter(Boolean),
      };
    }),
    posts: posts.map((p) => ({
      type: "blog" as const,
      title: p.title,
      excerpt: p.excerpt,
      category: p.category,
      url: `/blog/${p.slug}`,
    })),
    listings: listings.map((l) => ({
      type: "listing" as const,
      title: l.name,
      excerpt: `${l.tagline} — ${l.location}, ${l.city}`,
      category: l.category,
      url: `/explore/${l.id}`,
      location: `${l.location}, ${l.city}`,
      services: l.services.slice(0, 3),
    })),
    events: events.map((e) => ({
      type: "event" as const,
      title: e.title,
      excerpt: `${e.subtitle} — ${e.dates}`,
      category: e.category,
      url: `/events/${e.id}`,
    })),
    treatments: treatments.map((t) => ({
      type: "treatment" as const,
      title: t.name,
      excerpt: `${t.description.slice(0, 120)}...`,
      category: t.category,
      url: `/treatments/${t.slug}`,
      kamuraScore: t.kamuraScore,
      evidenceLevel: t.evidenceLevel,
    })),
  };

  return NextResponse.json(searchIndex, {
    headers: {
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
