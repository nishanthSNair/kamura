import type { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";
import BlogGrid from "../BlogGrid";

export const metadata: Metadata = {
  title: "Wellness Blog — Guides, Science & Trends",
  description:
    "Read expert guides on longevity clinics, biohacking, holistic healing, and wellness trends in Dubai and the UAE. Practical tips, prices, and recommendations.",
  openGraph: {
    title: "Wellness Blog | KAMURA",
    description:
      "Expert guides on longevity, biohacking, holistic healing, and wellness in Dubai and the UAE.",
    url: "https://kamuralife.com/blog",
  },
};

export default function BlogIndexPage() {
  const posts = getAllPosts();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "KAMURA Wellness Blog",
    description:
      "Expert guides on longevity, biohacking, holistic healing, and wellness in Dubai and the UAE.",
    url: "https://kamuralife.com/blog",
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: posts.length,
      itemListElement: posts.map((post, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `https://kamuralife.com/blog/${post.slug}`,
        name: post.title,
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="pt-24">
        <div className="max-w-6xl mx-auto px-6 pt-12 pb-4">
          <p className="text-xs tracking-[0.3em] uppercase mb-4 text-terracotta font-sans">
            KAMURA Blog
          </p>
          <h1 className="font-serif text-4xl md:text-5xl text-gray-900 dark:text-gray-100 mb-4 leading-tight">
            Wellness Guides & Insights
          </h1>
          <p className="text-gray-500 dark:text-gray-400 font-sans leading-relaxed max-w-2xl">
            Expert guides on longevity clinics, biohacking studios, holistic
            healing, and wellness trends across Dubai and the UAE.
          </p>
          <div className="w-12 h-px bg-terracotta/40 mt-6" />
        </div>
      </section>

      <BlogGrid posts={posts} />
    </>
  );
}
