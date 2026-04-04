import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { protocols } from "@/data/protocols";

export const metadata: Metadata = {
 title: "Longevity Protocols — Expert Protocols Reviewed & Compared",
 description:
 "Explore the world's most popular longevity protocols from Bryan Johnson, Peter Attia, Andrew Huberman, David Sinclair, and more. Every supplement, exercise, and practice — detailed and compared.",
 keywords: [
 "longevity protocols",
 "Bryan Johnson protocol",
 "Peter Attia Outlive",
 "Huberman Lab toolkit",
 "David Sinclair NMN",
 "anti-aging protocols",
 "biohacking protocols",
 "longevity diet",
 "Blueprint protocol",
 ],
 openGraph: {
 title: "Longevity Protocols — KAMURA",
 description:
 "The world's most popular longevity protocols — every supplement, exercise, and practice detailed and compared.",
 url: "https://kamuralife.com/protocols",
 },
 alternates: { canonical: "https://kamuralife.com/protocols" },
};

const difficultyColor: Record<string, string> = {
 Beginner: "bg-emerald-100 text-emerald-700",
 Intermediate: "bg-blue-100 text-blue-700",
 Advanced: "bg-amber-100 text-amber-700",
 Expert: "bg-red-100 text-red-700",
};

export default function ProtocolsPage() {
 return (
 <>
 {/* Hero */}
 <section className="relative min-h-[45vh] flex items-center justify-center">
 <div
 className="absolute inset-0 bg-cover bg-center"
 style={{
 backgroundImage:
 "url('https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=1920&q=80')",
 }}
 />
 <div className="absolute inset-0 bg-gradient-to-b from-forest/70 via-black/40 to-forest/60" />
 <div className="relative z-10 text-center px-6 py-16 md:py-24">
 <h1 className="font-serif text-3xl md:text-[52px] font-bold leading-tight mb-4 text-white">
 Longevity Protocols
 </h1>
 <p className="text-base md:text-lg text-white/75 max-w-[640px] mx-auto leading-relaxed font-sans mb-6">
 The world&apos;s most popular longevity protocols — every supplement,
 exercise routine, diet, and practice detailed and compared.
 </p>
 <div className="flex items-center justify-center gap-6 text-sm text-white/60 font-sans">
 <span>{protocols.length} protocols</span>
 <span className="text-white/30">&bull;</span>
 <span>Continuously updated</span>
 </div>
 </div>
 </section>

 {/* Protocol Cards */}
 <section className="max-w-[1200px] mx-auto px-6 py-12 md:py-16">
 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
 {protocols.map((p) => (
 <Link
 key={p.slug}
 href={`/protocols/${p.slug}`}
 className="group bg-white border border-gray-200 rounded-2xl overflow-hidden hover:border-sage/40 hover:shadow-lg transition-all"
 >
 {/* Image */}
 <div className="relative h-48 md:h-56">
 <Image
 src={p.imageUrl}
 alt={p.name}
 fill
 className="object-cover group-hover:scale-105 transition-transform duration-500"
 sizes="(max-width: 768px) 100vw, 50vw"
 />
 <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
 <div className="absolute bottom-4 left-5 right-5">
 <div className="flex items-center gap-2 mb-2">
 <span
 className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${difficultyColor[p.difficulty]}`}
 >
 {p.difficulty}
 </span>
 </div>
 <h2 className="font-serif text-xl md:text-2xl text-white leading-tight">
 {p.name}
 </h2>
 <p className="text-sm text-white/70 font-sans mt-1">
 by {p.creator}
 </p>
 </div>
 </div>

 {/* Content */}
 <div className="p-5 md:p-6">
 <p className="text-sm text-gray-600 font-sans leading-relaxed line-clamp-3 mb-4">
 {p.tagline}
 </p>

 <div className="flex flex-wrap gap-2 mb-4">
 <span className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-gray-100 text-gray-600 font-sans">
 {p.monthlyCost}
 </span>
 <span className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-gray-100 text-gray-600 font-sans">
 {p.timeCommitment}
 </span>
 <span className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-gray-100 text-gray-600 font-sans">
 {p.supplements.length} supplements
 </span>
 </div>

 <div className="flex flex-wrap gap-1.5">
 {p.tags.slice(0, 4).map((tag) => (
 <span
 key={tag}
 className="px-2 py-0.5 rounded-full text-[10px] text-gray-400 border border-gray-200 font-sans"
 >
 {tag}
 </span>
 ))}
 </div>
 </div>
 </Link>
 ))}
 </div>
 </section>

 {/* CTA */}
 <section className="border-t border-gray-200">
 <div className="max-w-[1200px] mx-auto px-6 py-12 text-center">
 <h2 className="font-serif text-xl md:text-2xl text-gray-900 mb-3">
 Explore Individual Treatments
 </h2>
 <p className="text-sm text-gray-500 font-sans mb-6 max-w-[500px] mx-auto">
 Every supplement, device, and therapy mentioned in these protocols is scored
 and reviewed in our Treatment Index.
 </p>
 <Link
 href="/treatments"
 className="inline-block px-6 py-3 bg-[#B5736A] hover:bg-[#9A5F57] text-white text-sm font-semibold rounded-xl transition-colors font-sans"
 >
 Browse 200+ Treatments &rarr;
 </Link>
 </div>
 </section>
 </>
 );
}
