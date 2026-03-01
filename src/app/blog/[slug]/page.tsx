import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlug, getAllSlugs, formatDate } from "@/lib/blog";

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
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="pt-24">
      <header className="max-w-2xl mx-auto px-6 py-12 text-center">
        <p className="text-xs text-gray-400 tracking-wide uppercase mb-4">
          {formatDate(post.date)}
        </p>
        <h1 className="font-serif text-3xl md:text-5xl text-terracotta leading-tight mb-6">
          {post.title}
        </h1>
        <p className="text-gray-500 leading-relaxed font-sans">
          {post.excerpt}
        </p>
        <div className="w-12 h-px bg-terracotta/40 mx-auto mt-8" />
      </header>

      <div
        className="max-w-2xl mx-auto px-6 pb-20 prose prose-gray prose-headings:font-serif prose-headings:text-gray-900 prose-a:text-terracotta prose-a:no-underline hover:prose-a:underline font-sans"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      <div className="max-w-2xl mx-auto px-6 pb-20 text-center">
        <Link
          href="/"
          className="text-sm text-gray-800 underline underline-offset-4 hover:text-terracotta transition-colors font-sans"
        >
          &larr; Back to all posts
        </Link>
      </div>
    </article>
  );
}
