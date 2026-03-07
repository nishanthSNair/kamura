import { NextResponse } from "next/server";
import { getAllPosts } from "@/lib/blog";
import { listings } from "@/data/listings";
import { events } from "@/data/events";

export async function GET() {
  const posts = getAllPosts();

  const searchIndex = {
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
    })),
    events: events.map((e) => ({
      type: "event" as const,
      title: e.title,
      excerpt: `${e.subtitle} — ${e.dates}`,
      category: e.category,
      url: `/events/${e.id}`,
    })),
  };

  return NextResponse.json(searchIndex, {
    headers: {
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
