import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getPostBySlug, getAllSlugs, getAllPosts, formatDate, blogCategoryColors } from "@/lib/blog";
import { getTreatmentBySlug } from "@/data/treatments";
import KamuraScoreBadge from "@/components/treatments/KamuraScoreBadge";
import EvidenceLevelTag from "@/components/treatments/EvidenceLevelTag";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      ...(post.coverImage && {
        images: [{ url: post.coverImage, width: 1200, height: 630, alt: post.title }],
      }),
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // Get related posts — prioritize same category
  const allPosts = getAllPosts();
  const otherPosts = allPosts.filter((p) => p.slug !== post.slug);
  const sameCategory = otherPosts.filter((p) => p.category === post.category);
  const differentCategory = otherPosts.filter((p) => p.category !== post.category);
  const relatedPosts = [...sameCategory, ...differentCategory].slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: post.title,
        description: post.excerpt,
        datePublished: post.date,
        ...(post.coverImage && { image: post.coverImage }),
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `https://kamuralife.com/blog/${slug}`,
        },
        author: {
          "@type": "Organization",
          name: "KAMURA",
          url: "https://kamuralife.com",
        },
        publisher: {
          "@type": "Organization",
          name: "KAMURA",
          url: "https://kamuralife.com",
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://kamuralife.com" },
          { "@type": "ListItem", position: 2, name: "Blog", item: "https://kamuralife.com/blog" },
          { "@type": "ListItem", position: 3, name: post.title },
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

      <article className="pt-24">
        <header className="max-w-3xl mx-auto px-6 py-12 text-center">
          <div className="flex items-center justify-center gap-3 flex-wrap mb-4">
            <span
              className={`text-xs px-2.5 py-1 rounded-full font-sans ${blogCategoryColors[post.category].bg} ${blogCategoryColors[post.category].text}`}
            >
              {post.category}
            </span>
            {post.evidenceLevel && (
              <EvidenceLevelTag level={post.evidenceLevel} />
            )}
            {post.depthIndicator && (
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 font-sans">
                {post.depthIndicator}
              </span>
            )}
            {post.medicallyReviewed && (
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 font-sans">
                Medically Reviewed
              </span>
            )}
            <p className="text-xs text-gray-400 dark:text-gray-500 tracking-wide uppercase">
              {formatDate(post.lastUpdated || post.date)}
            </p>
            <span className="text-gray-300 dark:text-gray-600">&middot;</span>
            <p className="text-xs text-gray-400 dark:text-gray-500 font-sans">
              {post.readingTime} min read
            </p>
          </div>
          <h1 className="font-serif text-3xl md:text-5xl text-terracotta leading-tight mb-6">
            {post.title}
          </h1>
          <p className="text-lg text-gray-500 dark:text-gray-400 leading-relaxed font-sans">
            {post.excerpt}
          </p>
          <div className="w-12 h-px bg-terracotta/40 mx-auto mt-8" />
        </header>

        {post.coverImage && (
          <div className="max-w-3xl mx-auto px-6 mb-10 relative h-[300px] md:h-[450px]">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              priority
              className="rounded-xl object-cover"
              sizes="(max-width: 768px) 100vw, 768px"
            />
          </div>
        )}

        {/* Kamura Score Card */}
        {post.kamuraScore && post.relatedTreatments && post.relatedTreatments.length > 0 && (() => {
          const primaryTreatment = getTreatmentBySlug(post.relatedTreatments[0]);
          if (!primaryTreatment) return null;
          return (
            <div className="max-w-3xl mx-auto px-6 mb-10">
              <Link
                href={`/treatments/${primaryTreatment.slug}`}
                className="block border border-kamura-gold/30 rounded-xl p-5 bg-kamura-gold/5 hover:bg-kamura-gold/10 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <KamuraScoreBadge score={post.kamuraScore} size="md" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-kamura-gold uppercase tracking-wider font-sans font-semibold mb-1">
                      Kamura Score
                    </p>
                    <p className="text-sm text-gray-700 dark:text-gray-300 font-sans">
                      This article covers <strong>{primaryTreatment.name}</strong>
                      {post.relatedTreatments.length > 1 && ` and ${post.relatedTreatments.length - 1} related treatment${post.relatedTreatments.length > 2 ? "s" : ""}`}.
                      View the full treatment profile for evidence, scores, and protocols.
                    </p>
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-kamura-gold shrink-0">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </div>
              </Link>
            </div>
          );
        })()}

        {/* Table of Contents */}
        {post.headings.length > 2 && (
          <nav className="max-w-3xl mx-auto px-6 mb-10">
            <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-6 bg-gray-50/50 dark:bg-gray-900/50">
              <h2 className="text-xs text-gray-400 dark:text-gray-500 uppercase tracking-wider font-sans mb-3 font-normal">
                In this article
              </h2>
              <ul className="space-y-2">
                {post.headings.map((heading) => (
                  <li
                    key={heading.id}
                    style={{ paddingLeft: `${(heading.level - 1) * 16}px` }}
                  >
                    <a
                      href={`#${heading.id}`}
                      className="text-sm text-gray-600 dark:text-gray-400 hover:text-terracotta transition-colors font-sans"
                    >
                      {heading.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        )}

        <div
          className="max-w-3xl mx-auto px-6 pb-12 prose prose-lg dark:prose-invert prose-headings:font-serif prose-headings:text-gray-900 dark:prose-headings:text-gray-100 prose-p:leading-[1.85] prose-p:mb-6 prose-headings:mt-10 prose-headings:mb-4 prose-li:leading-[1.8] prose-a:text-terracotta prose-a:no-underline hover:prose-a:underline font-sans"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Next Steps CTA */}
        <section className="max-w-3xl mx-auto px-6 pb-12">
          <div className="border border-terracotta/20 rounded-xl p-8 bg-terracotta/5">
            <h3 className="font-serif text-xl text-gray-900 dark:text-gray-100 mb-3">
              Ready to take the next step?
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 font-sans leading-relaxed mb-5">
              Discover your wellness archetype and get personalized recommendations
              for clinics, studios, and retreats in the UAE.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/quiz"
                className="inline-block bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 px-6 py-2.5 text-sm tracking-[0.1em] uppercase hover:bg-terracotta dark:hover:bg-terracotta dark:hover:text-white transition-colors font-sans"
              >
                Take the Quiz
              </Link>
              <Link
                href="/explore"
                className="inline-block border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-6 py-2.5 text-sm tracking-[0.1em] uppercase hover:border-terracotta hover:text-terracotta transition-colors font-sans"
              >
                Explore Directory
              </Link>
            </div>
          </div>
        </section>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="border-t border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50">
            <div className="max-w-6xl mx-auto px-6 py-16">
              <h2 className="font-serif text-2xl text-gray-900 dark:text-gray-100 mb-8 text-center">
                Continue Reading
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-10">
                {relatedPosts.map((related) => (
                  <article key={related.slug}>
                    <p className="text-xs text-gray-400 dark:text-gray-500 tracking-wide uppercase mb-3">
                      {formatDate(related.date)}
                      <span className="text-gray-300 dark:text-gray-600 mx-2">&middot;</span>
                      {related.readingTime} min read
                    </p>
                    <h4 className="font-serif text-lg text-terracotta leading-snug mb-3">
                      <Link
                        href={`/blog/${related.slug}`}
                        className="hover:text-terracotta-dark transition-colors"
                      >
                        {related.title}
                      </Link>
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed font-sans mb-3">
                      {related.excerpt}
                    </p>
                    <Link
                      href={`/blog/${related.slug}`}
                      className="text-sm text-gray-800 dark:text-gray-200 underline underline-offset-4 hover:text-terracotta transition-colors font-sans"
                    >
                      Read More
                    </Link>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        <div className="max-w-3xl mx-auto px-6 py-12 text-center">
          <Link
            href="/blog"
            className="text-sm text-gray-800 dark:text-gray-200 underline underline-offset-4 hover:text-terracotta transition-colors font-sans"
          >
            &larr; Back to all posts
          </Link>
        </div>
      </article>
    </>
  );
}
