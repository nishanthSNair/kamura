import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";
import { events } from "@/data/events";
import { listings } from "@/data/listings";
import { areas } from "@/data/areas";
import { treatments } from "@/data/treatments";
import { CATEGORY_META } from "@/data/treatment-categories";
import { WELLNESS_GOALS } from "@/data/wellness-goals";
import { POPULAR_COMPARISONS } from "@/data/treatment-comparisons";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://kamuralife.com";
  const posts = getAllPosts();

  const blogUrls: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/explore`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/events`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/quiz`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blueprint`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...blogUrls,
    ...events.map((event) => ({
      url: `${baseUrl}/events/${event.id}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...listings.map((listing) => ({
      url: `${baseUrl}/explore/${listing.id}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    {
      url: `${baseUrl}/treatments`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/treatments/methodology`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    ...CATEGORY_META.map((cat) => ({
      url: `${baseUrl}/treatments/category/${cat.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...treatments.map((t) => ({
      url: `${baseUrl}/treatments/${t.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    {
      url: `${baseUrl}/treatments/compare`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    ...POPULAR_COMPARISONS.map((c) => ({
      url: `${baseUrl}/treatments/compare/${c.slug1}-vs-${c.slug2}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...WELLNESS_GOALS.map((g) => ({
      url: `${baseUrl}/treatments/best-for/${g.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })),
    {
      url: `${baseUrl}/explore/compare`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    ...areas.map((area) => ({
      url: `${baseUrl}/explore/area/${area.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
