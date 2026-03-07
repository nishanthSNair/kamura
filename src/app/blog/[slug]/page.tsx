import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlug, getAllSlugs, getAllPosts, formatDate, blogCategoryColors } from "@/lib/blog";

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
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
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
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="pt-24">
        <header className="max-w-2xl mx-auto px-6 py-12 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span
              className={`text-xs px-2.5 py-1 rounded-full font-sans ${blogCategoryColors[post.category].bg} ${blogCategoryColors[post.category].text}`}
            >
              {post.category}
            </span>
            <p className="text-xs text-gray-400 dark:text-gray-500 tracking-wide uppercase">
              {formatDate(post.date)}
            </p>
            <span className="text-gray-300 dark:text-gray-600">&middot;</span>
            <p className="text-xs text-gray-400 dark:text-gray-500 font-sans">
              {post.readingTime} min read
            </p>
          </div>
          <h1 className="font-serif text-3xl md:text-5xl text-terracotta leading-tight mb-6">
            {post.title}
          </h1>
          <p className="text-gray-500 dark:text-gray-400 leading-relaxed font-sans">
            {post.excerpt}
          </p>
          <div className="w-12 h-px bg-terracotta/40 mx-auto mt-8" />
        </header>

        {post.coverImage && (
          <div className="max-w-2xl mx-auto px-6 mb-10">
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full rounded-xl object-cover max-h-[400px]"
            />
          </div>
        )}

        {/* Table of Contents */}
        {post.headings.length > 2 && (
          <nav className="max-w-2xl mx-auto px-6 mb-10">
            <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-6 bg-gray-50/50 dark:bg-gray-900/50">
              <p className="text-xs text-gray-400 dark:text-gray-500 uppercase tracking-wider font-sans mb-3">
                In this article
              </p>
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
          className="max-w-2xl mx-auto px-6 pb-12 prose prose-gray dark:prose-invert prose-headings:font-serif prose-headings:text-gray-900 dark:prose-headings:text-gray-100 prose-a:text-terracotta prose-a:no-underline hover:prose-a:underline font-sans"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Next Steps CTA */}
        <section className="max-w-2xl mx-auto px-6 pb-12">
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
              <h3 className="font-serif text-2xl text-gray-900 dark:text-gray-100 mb-8 text-center">
                Continue Reading
              </h3>
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

        <div className="max-w-2xl mx-auto px-6 py-12 text-center">
          <Link
            href="/"
            className="text-sm text-gray-800 dark:text-gray-200 underline underline-offset-4 hover:text-terracotta transition-colors font-sans"
          >
            &larr; Back to all posts
          </Link>
        </div>
      </article>
    </>
  );
}
