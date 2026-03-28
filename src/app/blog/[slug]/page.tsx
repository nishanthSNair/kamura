import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getPostBySlug, getAllSlugs, getAllPosts, formatDate, blogCategoryColors } from "@/lib/blog";
import { getTreatmentBySlug } from "@/data/treatments";
import KamuraScoreBadge from "@/components/treatments/KamuraScoreBadge";
import EvidenceLevelTag from "@/components/treatments/EvidenceLevelTag";
import ReadingProgress from "@/components/blog/ReadingProgress";
import TableOfContents from "@/components/blog/TableOfContents";
import ShareButtons from "@/components/ShareButtons";

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
 keywords: [
 post.category?.toLowerCase(),
 "wellness guide",
 "longevity",
 "biohacking",
 ...(post.title.toLowerCase().includes("dubai") ? ["dubai", "uae"] : []),
 ].filter(Boolean),
 authors: [{ name: "KAMURA", url: "https://kamuralife.com" }],
 alternates: {
 canonical: `https://kamuralife.com/blog/${slug}`,
 },
 openGraph: {
 title: post.title,
 description: post.excerpt,
 type: "article",
 publishedTime: post.date,
 ...(post.lastUpdated && { modifiedTime: post.lastUpdated }),
 section: post.category,
 authors: ["KAMURA"],
 url: `https://kamuralife.com/blog/${slug}`,
 siteName: "KAMURA",
 ...(post.coverImage && {
 images: [{ url: post.coverImage, width: 1200, height: 630, alt: post.title }],
 }),
 },
 twitter: {
 card: "summary_large_image",
 title: post.title,
 description: post.excerpt,
 creator: "@kamuralife",
 ...(post.coverImage && { images: [post.coverImage] }),
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

 const jsonLdGraph: Record<string, unknown>[] = [
 {
 "@type": "Article",
 headline: post.title,
 description: post.excerpt,
 datePublished: post.date,
 ...(post.lastUpdated && { dateModified: post.lastUpdated }),
 ...(post.coverImage && { image: post.coverImage }),
 wordCount: post.wordCount,
 articleSection: post.category,
 mainEntityOfPage: {
 "@type": "WebPage",
 "@id": `https://kamuralife.com/blog/${slug}`,
 },
 author: {
 "@type": "Organization",
 name: "KAMURA",
 url: "https://kamuralife.com",
 logo: "https://kamuralife.com/icon-192.png",
 },
 publisher: {
 "@type": "Organization",
 name: "KAMURA",
 url: "https://kamuralife.com",
 logo: {
 "@type": "ImageObject",
 url: "https://kamuralife.com/icon-192.png",
 },
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
 ];

 // FAQ Schema for posts with faqItems
 if (post.faqItems && post.faqItems.length > 0) {
 jsonLdGraph.push({
 "@type": "FAQPage",
 mainEntity: post.faqItems.map((faq) => ({
 "@type": "Question",
 name: faq.question,
 acceptedAnswer: {
 "@type": "Answer",
 text: faq.answer,
 },
 })),
 });
 }

 const jsonLd = {
 "@context": "https://schema.org",
 "@graph": jsonLdGraph,
 };

 return (
 <>
 <script
 type="application/ld+json"
 dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
 />

 <ReadingProgress />

 {/* Sticky sidebar share — desktop */}
 <ShareButtons
 url={`https://kamuralife.com/blog/${slug}`}
 title={post.title}
 description={post.excerpt}
 variant="sidebar"
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
 <span className="text-[10px] px-2 py-0.5 rounded-full bg-gray-100 text-gray-500 font-sans">
 {post.depthIndicator}
 </span>
 )}
 {post.medicallyReviewed && (
 <span className="text-[10px] px-2 py-0.5 rounded-full bg-green-50 text-green-700 font-sans">
 Medically Reviewed
 </span>
 )}
 <p className="text-xs text-gray-500 tracking-wide uppercase">
 {formatDate(post.lastUpdated || post.date)}
 </p>
 <span className="text-gray-300">&middot;</span>
 <p className="text-xs text-gray-500 font-sans">
 {post.readingTime} min read
 </p>
 </div>
 <h1 className="font-serif text-3xl md:text-5xl text-terracotta leading-tight mb-6">
 {post.title}
 </h1>
 <p className="text-lg text-gray-500 leading-relaxed font-sans">
 {post.excerpt}
 </p>
 <div className="w-12 h-px bg-sage/40 mx-auto mt-8" />
 {/* Inline share — visible on mobile, hidden on lg where sidebar shows */}
 <div className="flex justify-center mt-6 lg:hidden">
 <ShareButtons
 url={`https://kamuralife.com/blog/${slug}`}
 title={post.title}
 description={post.excerpt}
 />
 </div>
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
 <div className="max-w-5xl mx-auto px-6 mb-10 lg:pr-[280px]">
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
 <p className="text-sm text-gray-700 font-sans">
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

 {/* Main Content — 2-column layout with sticky TOC sidebar */}
 <div className="max-w-5xl mx-auto px-6 pb-12 grid grid-cols-1 lg:grid-cols-[1fr_220px] gap-12">
 {/* Left: Article Content */}
 <div
 className="prose prose-lg prose-headings:font-serif prose-headings:text-gray-900 prose-p:leading-[1.85] prose-p:mb-6 prose-headings:mt-10 prose-headings:mb-4 prose-li:leading-[1.8] prose-a:text-terracotta prose-a:no-underline hover:prose-a:underline font-sans max-w-none"
 dangerouslySetInnerHTML={{ __html: post.content }}
 />

 {/* Right: Sticky TOC Sidebar */}
 {post.headings.length > 2 && (
 <TableOfContents headings={post.headings} />
 )}
 </div>

 {/* FAQ Section (for posts with faqItems) */}
 {post.faqItems && post.faqItems.length > 0 && (
 <section className="max-w-3xl mx-auto px-6 pb-12">
 <div className="border border-sage/20 rounded-xl p-8 bg-zen-mist/50">
 <h2 className="font-serif text-2xl text-gray-900 mb-6">
 Frequently Asked Questions
 </h2>
 <div className="space-y-6">
 {post.faqItems.map((faq, i) => (
 <div key={i}>
 <h3 className="font-sans text-base font-semibold text-gray-900 mb-2">
 {faq.question}
 </h3>
 <p className="text-sm text-gray-600 font-sans leading-relaxed">
 {faq.answer}
 </p>
 </div>
 ))}
 </div>
 </div>
 </section>
 )}

 {/* Next Steps CTA */}
 <section className="max-w-3xl mx-auto px-6 pb-12">
 <div className="border border-sage/20 rounded-xl p-8 bg-sage/5">
 <h3 className="font-serif text-xl text-gray-900 mb-3">
 Ready to take the next step?
 </h3>
 <p className="text-sm text-gray-600 font-sans leading-relaxed mb-5">
 Discover your wellness archetype and get personalized recommendations
 for clinics, studios, and retreats in the UAE.
 </p>
 <div className="flex flex-wrap gap-3">
 <Link
 href="/quiz"
 className="inline-block bg-moss text-white px-6 py-2.5 text-sm tracking-[0.1em] uppercase hover:bg-forest transition-colors font-sans"
 >
 Take the Quiz
 </Link>
 <Link
 href="/explore"
 className="inline-block border border-gray-300 text-gray-700 px-6 py-2.5 text-sm tracking-[0.1em] uppercase hover:border-sage hover:text-moss transition-colors font-sans"
 >
 Explore Directory
 </Link>
 </div>
 </div>
 </section>

 {/* Related Posts with Images */}
 {relatedPosts.length > 0 && (
 <section className="border-t border-sage-light/60 bg-zen-mist/50">
 <div className="max-w-6xl mx-auto px-6 py-16">
 <h2 className="font-serif text-2xl text-gray-900 mb-8 text-center">
 Continue Reading
 </h2>
 <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
 {relatedPosts.map((related) => {
 const colors = blogCategoryColors[related.category];
 return (
 <article key={related.slug} className="group">
 <Link href={`/blog/${related.slug}`} className="block mb-4 overflow-hidden rounded-lg relative h-44">
 {related.coverImage ? (
 <Image
 src={related.coverImage}
 alt={related.title}
 fill
 className="object-cover group-hover:scale-105 transition-transform duration-300"
 sizes="(max-width: 768px) 100vw, 33vw"
 />
 ) : (
 <div className={`w-full h-full ${colors.bg} flex items-center justify-center`}>
 <span className={`text-3xl font-serif ${colors.text} opacity-40`}>K</span>
 </div>
 )}
 </Link>
 <div className="flex items-center gap-2 mb-2">
 <span className={`text-[10px] px-2 py-0.5 rounded-full font-sans ${colors.bg} ${colors.text}`}>
 {related.category}
 </span>
 <span className="text-xs text-gray-500">
 {related.readingTime} min read
 </span>
 </div>
 <h4 className="font-serif text-lg text-gray-900 leading-snug mb-2">
 <Link
 href={`/blog/${related.slug}`}
 className="hover:text-terracotta-dark transition-colors"
 >
 {related.title}
 </Link>
 </h4>
 <p className="text-sm text-gray-500 leading-relaxed font-sans line-clamp-2">
 {related.excerpt}
 </p>
 </article>
 );
 })}
 </div>
 </div>
 </section>
 )}

 <div className="max-w-3xl mx-auto px-6 py-12 text-center">
 <Link
 href="/blog"
 className="text-sm text-gray-800 underline underline-offset-4 hover:text-terracotta transition-colors font-sans"
 >
 &larr; Back to all posts
 </Link>
 </div>
 </article>
 </>
 );
}
