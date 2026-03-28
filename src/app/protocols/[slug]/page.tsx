import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { protocols, getProtocolBySlug } from "@/data/protocols";
import { getTreatmentBySlug } from "@/data/treatments";
import KamuraScoreBadge from "@/components/treatments/KamuraScoreBadge";
import ShareButtons from "@/components/ShareButtons";

interface Props {
 params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
 return protocols.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
 const { slug } = await params;
 const p = getProtocolBySlug(slug);
 if (!p) return {};

 return {
 title: `${p.name} by ${p.creator} — Full Protocol Breakdown | KAMURA`,
 description: `${p.tagline} Complete supplement stack, exercise routine, diet, sleep protocol, and testing — all detailed.`,
 keywords: [
 `${p.creator} protocol`,
 `${p.creator} supplement stack`,
 `${p.creator} routine`,
 p.name.toLowerCase(),
 ...p.tags,
 ],
 openGraph: {
 title: `${p.name} by ${p.creator} | KAMURA`,
 description: p.tagline,
 url: `https://kamuralife.com/protocols/${slug}`,
 images: [{ url: p.imageUrl, width: 1200, height: 630 }],
 },
 alternates: { canonical: `https://kamuralife.com/protocols/${slug}` },
 };
}

const difficultyColor: Record<string, string> = {
 Beginner: "bg-emerald-100 text-emerald-700",
 Intermediate: "bg-blue-100 text-blue-700",
 Advanced: "bg-amber-100 text-amber-700",
 Expert: "bg-red-100 text-red-700",
};

function SectionCard({
 title,
 icon,
 children,
 id,
}: {
 title: string;
 icon: string;
 children: React.ReactNode;
 id?: string;
}) {
 return (
 <section
 id={id}
 className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 scroll-mt-24"
 >
 <h2 className="font-serif text-xl text-gray-900 mb-5 flex items-center gap-2.5">
 <span className="text-lg">{icon}</span> {title}
 </h2>
 {children}
 </section>
 );
}

export default async function ProtocolDetailPage({ params }: Props) {
 const { slug } = await params;
 const p = getProtocolBySlug(slug);
 if (!p) notFound();

 const relatedTreatments = p.relatedTreatmentSlugs
 .map((s) => getTreatmentBySlug(s))
 .filter(Boolean)
 .slice(0, 8);

 const otherProtocols = protocols.filter((o) => o.slug !== p.slug).slice(0, 3);

 const jsonLd = {
 "@context": "https://schema.org",
 "@type": "Article",
 headline: `${p.name} by ${p.creator}`,
 description: p.tagline,
 url: `https://kamuralife.com/protocols/${slug}`,
 author: { "@type": "Person", name: p.creator },
 publisher: { "@type": "Organization", name: "KAMURA" },
 };

 return (
 <>
 <script
 type="application/ld+json"
 dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
 />

 {/* Sticky sidebar share — desktop */}
 <ShareButtons
 url={`https://kamuralife.com/protocols/${slug}`}
 title={`${p.name} by ${p.creator}`}
 description={p.tagline}
 variant="sidebar"
 />

 {/* Hero */}
 <section className="relative min-h-[50vh] flex items-end">
 <div className="absolute inset-0">
 <Image
 src={p.imageUrl}
 alt={p.name}
 fill
 priority
 className="object-cover"
 sizes="100vw"
 />
 </div>
 <div className="absolute inset-0 bg-gradient-to-t from-[#14110E]/90 via-[#14110E]/40 to-forest/30" />

 <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 pb-10 pt-32">
 <nav className="mb-6">
 <div className="flex items-center gap-2 text-sm text-white/60 font-sans">
 <Link href="/" className="hover:text-white transition-colors">
 Home
 </Link>
 <span>/</span>
 <Link
 href="/protocols"
 className="hover:text-white transition-colors"
 >
 Protocols
 </Link>
 <span>/</span>
 <span className="text-white/90">{p.name}</span>
 </div>
 </nav>

 <div className="flex flex-col gap-4">
 <div className="flex items-center gap-3">
 <span
 className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${difficultyColor[p.difficulty]}`}
 >
 {p.difficulty}
 </span>
 <span className="text-white/50 text-xs font-sans">
 {p.monthlyCost}
 </span>
 <span className="text-white/30">&bull;</span>
 <span className="text-white/50 text-xs font-sans">
 {p.timeCommitment}
 </span>
 </div>

 <h1 className="font-serif text-3xl md:text-[44px] text-white leading-tight">
 {p.name}
 </h1>
 <p className="text-white/60 text-sm font-sans">
 by <span className="text-white/80">{p.creator}</span> &mdash;{" "}
 {p.creatorTitle}
 </p>
 <p className="text-white/75 text-[15px] leading-relaxed font-sans max-w-[700px]">
 {p.tagline}
 </p>
 </div>
 </div>
 </section>

 {/* Content */}
 <div className="max-w-[1200px] mx-auto px-6 py-10 space-y-8">
 {/* Overview */}
 <SectionCard title="Overview" icon="📖" id="overview">
 <p className="text-sm text-gray-600 font-sans leading-relaxed mb-6">
 {p.description}
 </p>
 <h3 className="text-sm font-semibold text-gray-900 font-sans mb-3 uppercase tracking-wider">
 Key Principles
 </h3>
 <ul className="space-y-2">
 {p.keyPrinciples.map((principle, i) => (
 <li
 key={i}
 className="flex items-start gap-3 text-sm text-gray-600 font-sans"
 >
 <span className="text-[#B5736A] mt-0.5 shrink-0">&#9679;</span>
 {principle}
 </li>
 ))}
 </ul>
 </SectionCard>

 {/* Supplements */}
 <SectionCard
 title={`Supplement Stack (${p.supplements.length})`}
 icon="💊"
 id="supplements"
 >
 <div className="overflow-x-auto">
 <table className="w-full text-sm font-sans">
 <thead>
 <tr className="border-b border-gray-200">
 <th className="text-left py-2 pr-4 text-[11px] uppercase tracking-wider text-gray-400 font-semibold">
 Supplement
 </th>
 <th className="text-left py-2 pr-4 text-[11px] uppercase tracking-wider text-gray-400 font-semibold">
 Dose
 </th>
 <th className="text-left py-2 pr-4 text-[11px] uppercase tracking-wider text-gray-400 font-semibold hidden md:table-cell">
 Timing
 </th>
 <th className="text-left py-2 text-[11px] uppercase tracking-wider text-gray-400 font-semibold hidden lg:table-cell">
 Purpose
 </th>
 </tr>
 </thead>
 <tbody>
 {p.supplements.map((s, i) => (
 <tr
 key={i}
 className="border-b border-gray-100"
 >
 <td className="py-2.5 pr-4 font-medium text-gray-900">
 {s.name}
 </td>
 <td className="py-2.5 pr-4 text-gray-600">
 {s.dose}
 </td>
 <td className="py-2.5 pr-4 text-gray-500 hidden md:table-cell">
 {s.timing}
 </td>
 <td className="py-2.5 text-gray-500 hidden lg:table-cell text-xs">
 {s.purpose}
 </td>
 </tr>
 ))}
 </tbody>
 </table>
 </div>
 </SectionCard>

 {/* Exercise */}
 <SectionCard title="Exercise Protocol" icon="🏋️" id="exercise">
 <div className="grid md:grid-cols-2 gap-4">
 {p.exercises.map((e, i) => (
 <div
 key={i}
 className="bg-zen-mist/50 border border-sage-light/60 rounded-xl p-4"
 >
 <div className="flex items-center justify-between mb-2">
 <h3 className="font-semibold text-sm text-gray-900 font-sans">
 {e.name}
 </h3>
 <span className="text-[10px] text-gray-400 font-sans uppercase">
 {e.frequency}
 </span>
 </div>
 <p className="text-[11px] text-[#B5736A] font-semibold font-sans mb-1.5">
 {e.duration}
 </p>
 <p className="text-xs text-gray-500 font-sans leading-relaxed">
 {e.details}
 </p>
 </div>
 ))}
 </div>
 </SectionCard>

 {/* Nutrition */}
 <SectionCard
 title={p.nutrition.title}
 icon={p.nutrition.icon}
 id="nutrition"
 >
 <ul className="space-y-2">
 {p.nutrition.items.map((item, i) => (
 <li
 key={i}
 className="flex items-start gap-3 text-sm text-gray-600 font-sans"
 >
 <span className="text-[#B5736A] mt-0.5 shrink-0">&#9679;</span>
 {item}
 </li>
 ))}
 </ul>
 </SectionCard>

 {/* Sleep */}
 <SectionCard title={p.sleep.title} icon={p.sleep.icon} id="sleep">
 <ul className="space-y-2">
 {p.sleep.items.map((item, i) => (
 <li
 key={i}
 className="flex items-start gap-3 text-sm text-gray-600 font-sans"
 >
 <span className="text-[#B5736A] mt-0.5 shrink-0">&#9679;</span>
 {item}
 </li>
 ))}
 </ul>
 </SectionCard>

 {/* Testing */}
 <SectionCard
 title={p.testing.title}
 icon={p.testing.icon}
 id="testing"
 >
 <ul className="space-y-2">
 {p.testing.items.map((item, i) => (
 <li
 key={i}
 className="flex items-start gap-3 text-sm text-gray-600 font-sans"
 >
 <span className="text-[#B5736A] mt-0.5 shrink-0">&#9679;</span>
 {item}
 </li>
 ))}
 </ul>
 </SectionCard>

 {/* Pharmaceuticals (optional) */}
 {p.pharmaceuticals && (
 <SectionCard
 title={p.pharmaceuticals.title}
 icon={p.pharmaceuticals.icon}
 id="pharma"
 >
 <ul className="space-y-2">
 {p.pharmaceuticals.items.map((item, i) => (
 <li
 key={i}
 className="flex items-start gap-3 text-sm text-gray-600 font-sans"
 >
 <span className="text-[#B5736A] mt-0.5 shrink-0">
 &#9679;
 </span>
 {item}
 </li>
 ))}
 </ul>
 </SectionCard>
 )}

 {/* Mindset (optional) */}
 {p.mindset && (
 <SectionCard
 title={p.mindset.title}
 icon={p.mindset.icon}
 id="mindset"
 >
 <ul className="space-y-2">
 {p.mindset.items.map((item, i) => (
 <li
 key={i}
 className="flex items-start gap-3 text-sm text-gray-600 font-sans"
 >
 <span className="text-[#B5736A] mt-0.5 shrink-0">
 &#9679;
 </span>
 {item}
 </li>
 ))}
 </ul>
 </SectionCard>
 )}

 {/* Key Results */}
 <SectionCard title="Key Results & Claims" icon="📊" id="results">
 <ul className="space-y-2">
 {p.keyResults.map((result, i) => (
 <li
 key={i}
 className="flex items-start gap-3 text-sm text-gray-600 font-sans"
 >
 <span className="text-emerald-500 mt-0.5 shrink-0">&#10003;</span>
 {result}
 </li>
 ))}
 </ul>
 <p className="text-[11px] text-gray-400 font-sans italic mt-4">
 Results are self-reported or derived from the creator&apos;s published data. Individual
 results may vary significantly. Always consult a healthcare provider.
 </p>
 </SectionCard>

 {/* Related Treatments from KAMURA Index */}
 {relatedTreatments.length > 0 && (
 <section className="scroll-mt-24">
 <h2 className="font-serif text-xl text-gray-900 mb-5">
 Treatments Mentioned in This Protocol
 </h2>
 <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
 {relatedTreatments.map(
 (t) =>
 t && (
 <Link
 key={t.slug}
 href={`/treatments/${t.slug}`}
 className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-sage/40 transition-all group"
 >
 <div className="relative h-24">
 <Image
 src={t.imageUrl}
 alt={t.name}
 fill
 className="object-cover group-hover:scale-105 transition-transform duration-300"
 sizes="(max-width: 768px) 50vw, 25vw"
 />
 <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
 <div className="absolute bottom-1.5 right-1.5">
 <KamuraScoreBadge score={t.kamuraScore} size="sm" />
 </div>
 </div>
 <div className="p-2.5 text-center">
 <div className="font-semibold text-xs text-gray-900 font-sans">
 {t.name}
 </div>
 <div className="text-[10px] text-gray-400 uppercase tracking-wide font-sans mt-0.5">
 Score: {t.kamuraScore}
 </div>
 </div>
 </Link>
 )
 )}
 </div>
 </section>
 )}

 {/* Source */}
 <div className="text-center py-4">
 <a
 href={p.sourceUrl}
 target="_blank"
 rel="noopener noreferrer"
 className="inline-block text-sm text-[#B5736A] hover:text-[#9A5F57] font-sans transition-colors"
 >
 Source: {p.sourceLabel} &rarr;
 </a>
 </div>

 {/* Other Protocols */}
 {otherProtocols.length > 0 && (
 <section className="border-t border-gray-200 pt-10">
 <h2 className="font-serif text-xl text-gray-900 mb-5">
 Explore Other Protocols
 </h2>
 <div className="grid md:grid-cols-3 gap-4">
 {otherProtocols.map((o) => (
 <Link
 key={o.slug}
 href={`/protocols/${o.slug}`}
 className="bg-white border border-gray-200 rounded-xl p-5 hover:border-sage/40 transition-all"
 >
 <h3 className="font-serif text-base text-gray-900 mb-1">
 {o.name}
 </h3>
 <p className="text-xs text-gray-500 font-sans mb-2">
 by {o.creator}
 </p>
 <p className="text-xs text-gray-400 font-sans line-clamp-2">
 {o.tagline}
 </p>
 </Link>
 ))}
 </div>
 </section>
 )}

 {/* Disclaimer */}
 <section className="scroll-mt-24">
 <div className="border border-sage-light/60 rounded-xl p-6 bg-zen-mist/50">
 <p className="text-xs text-gray-400 font-sans leading-relaxed">
 <strong className="text-gray-500">
 Disclaimer:
 </strong>{" "}
 Protocol information is compiled from publicly available sources
 and the creator&apos;s published content. Protocols may have been
 updated since our last review. These are not medical recommendations
 — they represent one individual&apos;s personal approach. Always
 consult a qualified healthcare provider before starting any protocol.
 KAMURA does not endorse or recommend any specific protocol.
 </p>
 </div>
 </section>

 {/* Back */}
 <div className="pb-8 text-center">
 <Link
 href="/protocols"
 className="text-sm text-gray-600 underline underline-offset-4 hover:text-moss transition-colors font-sans"
 >
 &larr; Back to All Protocols
 </Link>
 </div>
 </div>
 </>
 );
}
