import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { treatments } from "@/data/treatments";
import FadeInOnScroll from "@/components/FadeInOnScroll";
import { FEATURED_PRACTITIONERS } from "@/data/featured-practitioners";
import CortisolDemo from "@/components/home/CortisolDemo";
import ServiceCarousel from "@/components/home/ServiceCarousel";
import PeptidePen from "@/components/home/PeptidePen";

export const metadata: Metadata = {
  title: "KAMURA — Longevity & Wellness, Decoded",
  description: `Find a treatment. List your service. Explore peptides and longevity. ${treatments.length}+ wellness services scored on evidence, vetted practitioners across the UAE, and the tools to track your protocol.`,
  keywords: [
    "wellness platform",
    "longevity treatments",
    "biohacking Dubai",
    "peptide therapy",
    "find wellness clinic UAE",
    "sound healing Dubai",
    "red light therapy",
    "cryotherapy Dubai",
    "wellness intelligence",
  ],
  alternates: { canonical: "https://kamuralife.com" },
  openGraph: {
    title: "KAMURA — Longevity & Wellness, Decoded",
    description:
      "Find a treatment. List your service. Explore peptides and longevity. Evidence-scored wellness intelligence for the GCC.",
    url: "https://kamuralife.com",
    siteName: "KAMURA",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://kamuralife.com/images/hero-home.png",
        width: 1200,
        height: 630,
        alt: "KAMURA — Longevity & Wellness, Decoded",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "KAMURA — Longevity & Wellness, Decoded",
    description:
      "Find a treatment. List your service. Explore peptides and longevity. The wellness intelligence platform for the GCC.",
    creator: "@KamuraLife",
    images: ["https://kamuralife.com/images/hero-home.png"],
  },
};

export default function Home() {
  const featuredPractitioners = FEATURED_PRACTITIONERS.slice(0, 4);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: "KAMURA",
        url: "https://kamuralife.com",
        description: "The wellness platform for the GCC",
        sameAs: ["https://www.instagram.com/kamuralife/", "https://x.com/KamuraLife"],
      },
      {
        "@type": "WebSite",
        name: "KAMURA",
        url: "https://kamuralife.com",
        potentialAction: {
          "@type": "SearchAction",
          target: "https://kamuralife.com/treatments?q={search_term_string}",
          "query-input": "required name=search_term_string",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ────────── Announcement strip (Hims-style) ────────── */}
      <div className="bg-[#C4A882]/25 border-b border-[#C4A882]/30">
        <div className="max-w-6xl mx-auto px-6 py-2.5 flex items-center justify-center gap-3 text-sm">
          <span className="text-[#2A2520]">The Peptide Intelligence Hub is here.</span>
          <Link
            href="/peptides"
            className="inline-flex items-center gap-1 font-semibold text-[#2A2520] hover:text-terracotta transition-colors"
          >
            Check it out →
          </Link>
        </div>
      </div>

      {/* ────────── HERO: headline + 3 BIG cards (MEDVi pattern) ────────── */}
      <section className="pt-20 md:pt-28 pb-14 md:pb-20 bg-[#FAF7F2]">
        <div className="max-w-6xl mx-auto px-6">
          <FadeInOnScroll>
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[0.98] tracking-tight text-[#2A2520] max-w-4xl">
              The wellness you&rsquo;ve
              <br />
              <span className="italic text-terracotta">always deserved.</span>
            </h1>
            <p className="mt-6 text-lg text-[#2A2520]/70 max-w-xl">
              Evidence-scored treatments. Vetted practitioners. The tools to track your protocol.
              All in one place, built for the GCC.
            </p>
          </FadeInOnScroll>

          {/* 3 BIG HERO CARDS */}
          <div className="grid gap-5 md:grid-cols-3 mt-12 md:mt-16">
            {/* Card 1: Find treatment — terracotta */}
            <FadeInOnScroll>
              <Link
                href="/treatments"
                className="group relative block overflow-hidden rounded-3xl aspect-[4/5] shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-1"
                style={{
                  background:
                    "radial-gradient(circle at 30% 20%, #E0B8A8 0%, transparent 55%), radial-gradient(circle at 85% 85%, #9A5F57 0%, transparent 50%), linear-gradient(135deg, #D4A49B, #B5886A)",
                }}
              >
                <div className="absolute inset-0 p-7 md:p-8 flex flex-col justify-between text-white">
                  <div>
                    <div className="text-[10px] tracking-[0.25em] uppercase opacity-80 mb-3 font-semibold">
                      Find
                    </div>
                    <h2 className="font-serif text-4xl md:text-5xl leading-[1.05] tracking-tight">
                      Your treatment
                    </h2>
                  </div>
                  <div className="relative">
                    <Image
                      src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&q=85"
                      alt="Red light therapy"
                      width={240}
                      height={240}
                      className="absolute right-0 bottom-20 w-36 h-36 md:w-44 md:h-44 rounded-2xl object-cover shadow-2xl group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-700 float-anim"
                    />
                  </div>
                  <div className="flex items-end justify-between">
                    <p className="text-sm opacity-95 max-w-[22ch] leading-snug">
                      {treatments.length}+ wellness services — scored, verified, local.
                    </p>
                    <span className="text-2xl opacity-80 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                      →
                    </span>
                  </div>
                </div>
              </Link>
            </FadeInOnScroll>

            {/* Card 2: List your service — forest */}
            <FadeInOnScroll delay={100}>
              <Link
                href="/provider/signup"
                className="group relative block overflow-hidden rounded-3xl aspect-[4/5] shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-1"
                style={{
                  background:
                    "radial-gradient(circle at 25% 30%, #B0BCA4 0%, transparent 50%), radial-gradient(circle at 80% 80%, #2A3A22 0%, transparent 55%), linear-gradient(135deg, #7B8D68, #4A5E3E)",
                }}
              >
                <div className="absolute inset-0 p-7 md:p-8 flex flex-col justify-between text-white">
                  <div>
                    <div className="text-[10px] tracking-[0.25em] uppercase opacity-80 mb-3 font-semibold">
                      Grow
                    </div>
                    <h2 className="font-serif text-4xl md:text-5xl leading-[1.05] tracking-tight">
                      List your service
                    </h2>
                  </div>
                  <div className="relative">
                    <Image
                      src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600&q=85"
                      alt="Practitioner"
                      width={240}
                      height={240}
                      className="absolute right-0 bottom-20 w-36 h-36 md:w-44 md:h-44 rounded-2xl object-cover shadow-2xl group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-700 float-anim-2"
                    />
                  </div>
                  <div className="flex items-end justify-between">
                    <p className="text-sm opacity-95 max-w-[22ch] leading-snug">
                      Get discovered by patients looking for exactly what you do.
                    </p>
                    <span className="text-2xl opacity-80 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                      →
                    </span>
                  </div>
                </div>
              </Link>
            </FadeInOnScroll>

            {/* Card 3: Peptides & Longevity — dark + gold */}
            <FadeInOnScroll delay={200}>
              <Link
                href="/peptides"
                className="group relative block overflow-hidden rounded-3xl aspect-[4/5] shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-1"
                style={{
                  background:
                    "radial-gradient(circle at 20% 80%, #C4A882 0%, transparent 45%), radial-gradient(circle at 80% 20%, #3F5C3F 0%, transparent 55%), linear-gradient(135deg, #2A2520, #1a241a)",
                }}
              >
                <div className="absolute inset-0 p-7 md:p-8 flex flex-col justify-between text-white">
                  <div>
                    <div className="text-[10px] tracking-[0.25em] uppercase mb-3 font-semibold text-[#C4A882]">
                      Longevity
                    </div>
                    <h2 className="font-serif text-4xl md:text-5xl leading-[1.05] tracking-tight">
                      Peptides &amp; longevity
                    </h2>
                  </div>
                  <div className="relative">
                    <Image
                      src="https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=600&q=85"
                      alt="Peptide vial"
                      width={240}
                      height={240}
                      className="absolute right-0 bottom-20 w-36 h-36 md:w-44 md:h-44 rounded-2xl object-cover shadow-2xl group-hover:scale-110 group-hover:rotate-3 transition-transform duration-700 float-anim-3"
                    />
                  </div>
                  <div className="flex items-end justify-between">
                    <p className="text-sm opacity-95 max-w-[22ch] leading-snug text-[#E5D3B0]">
                      The hub — tools, tracker, and the evidence.
                    </p>
                    <span className="text-2xl opacity-80 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-[#C4A882]">
                      →
                    </span>
                  </div>
                </div>
              </Link>
            </FadeInOnScroll>
          </div>

          {/* Secondary pills (Hims-style tile row) */}
          <FadeInOnScroll delay={300}>
            <div className="grid md:grid-cols-2 gap-3 mt-6">
              <Link
                href="/wellness-checker"
                className="group bg-white hover:bg-white/80 transition-all rounded-2xl px-5 py-4 shadow-sm border border-[#2A2520]/5 flex items-center gap-4 hover:shadow-md"
              >
                <span className="w-12 h-12 rounded-xl bg-[#B0BCA4]/30 flex items-center justify-center text-xl text-[#4A5E3E]">
                  ✓
                </span>
                <div className="flex-1">
                  <div className="font-semibold text-[#2A2520]">
                    Not sure what you need?
                  </div>
                  <div className="text-sm text-[#2A2520]/60">
                    Take the 2-minute wellness checker.
                  </div>
                </div>
                <span className="text-[#2A2520]/40 group-hover:text-terracotta group-hover:translate-x-1 transition-all">
                  →
                </span>
              </Link>
              <Link
                href="/peptides"
                className="group bg-white hover:bg-white/80 transition-all rounded-2xl px-5 py-4 shadow-sm border border-[#2A2520]/5 flex items-center gap-4 hover:shadow-md"
              >
                <span className="w-12 h-12 rounded-xl bg-[#C4A882]/25 flex items-center justify-center text-xl text-[#9A7357]">
                  ⚗
                </span>
                <div className="flex-1">
                  <div className="font-semibold text-[#2A2520]">Peptide tools</div>
                  <div className="text-sm text-[#2A2520]/60">
                    Directory, protocol builder, dose tracker.
                  </div>
                </div>
                <span className="text-[#2A2520]/40 group-hover:text-terracotta group-hover:translate-x-1 transition-all">
                  →
                </span>
              </Link>
            </div>
          </FadeInOnScroll>
        </div>
      </section>

      {/* ────────── Trust-badge ticker (MEDVi-style) ────────── */}
      <section className="bg-[#2A2520] text-white py-4 overflow-hidden border-y border-[#C4A882]/20">
        <div className="flex gap-14 whitespace-nowrap animate-ticker text-[11px] tracking-[0.25em] uppercase font-semibold text-[#C4A882]">
          {[...Array(2)].flatMap((_, pass) =>
            [
              "★ Kamura Scored",
              "Evidence-Backed",
              "DHA / MOHAP Compliant",
              "Vetted Practitioners",
              "Built in the UAE",
              "120+ Treatments",
              "Real Data, No Fluff",
            ].map((txt) => (
              <span key={`${pass}-${txt}`} className="flex items-center gap-14">
                {txt}
                <span className="text-white/20">·</span>
              </span>
            ))
          )}
        </div>
      </section>

      {/* ────────── Animated demo: cortisol graph ────────── */}
      <section className="py-16 md:py-24 bg-[#FAF7F2]">
        <div className="max-w-6xl mx-auto px-6">
          <FadeInOnScroll>
            <div className="max-w-2xl mb-10">
              <p className="text-[10px] tracking-[0.3em] uppercase text-terracotta font-semibold mb-3">
                Proof over promises
              </p>
              <h2 className="font-serif text-3xl md:text-5xl text-[#2A2520] leading-[1.1]">
                Watch what a session
                <br />
                <span className="italic">actually does</span> to your biology.
              </h2>
            </div>
            <CortisolDemo />
          </FadeInOnScroll>
        </div>
      </section>

      {/* ────────── Service carousel ────────── */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <FadeInOnScroll>
            <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
              <div>
                <p className="text-[10px] tracking-[0.3em] uppercase text-terracotta font-semibold mb-3">
                  Scored &amp; verified
                </p>
                <h2 className="font-serif text-3xl md:text-5xl text-[#2A2520] leading-[1.1]">
                  Wellness services,
                  <br />
                  <span className="italic">ranked by real evidence.</span>
                </h2>
              </div>
              <Link
                href="/treatments"
                className="text-xs tracking-[0.15em] uppercase text-terracotta font-semibold hover:underline"
              >
                See all {treatments.length}+ →
              </Link>
            </div>
          </FadeInOnScroll>
          <FadeInOnScroll delay={120}>
            <ServiceCarousel />
          </FadeInOnScroll>
        </div>
      </section>

      {/* ────────── Interactive peptide pen ────────── */}
      <section className="py-16 md:py-24 bg-[#FAF7F2]">
        <div className="max-w-6xl mx-auto px-6">
          <FadeInOnScroll>
            <PeptidePen />
          </FadeInOnScroll>
        </div>
      </section>

      {/* ────────── Featured practitioners ────────── */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <FadeInOnScroll>
            <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
              <div>
                <p className="text-[10px] tracking-[0.3em] uppercase text-terracotta font-semibold mb-3">
                  Kamura-verified
                </p>
                <h2 className="font-serif text-3xl md:text-4xl text-[#2A2520] leading-tight">
                  Healers on the platform
                </h2>
              </div>
              <Link
                href="/explore"
                className="text-xs tracking-[0.15em] uppercase text-terracotta font-semibold hover:underline"
              >
                See all →
              </Link>
            </div>
          </FadeInOnScroll>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
            {featuredPractitioners.map((p, i) => (
              <FadeInOnScroll key={p.slug} delay={i * 70}>
                <Link href={`/provider/${p.slug}`} className="group block">
                  <div className="relative aspect-[4/5] rounded-2xl overflow-hidden mb-3 bg-gray-100">
                    <Image
                      src={p.imageUrl}
                      alt={p.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                    {p.verified && (
                      <span className="absolute top-3 left-3 px-2 py-1 rounded-full bg-white/90 backdrop-blur text-[9px] tracking-[0.15em] uppercase text-emerald-700 font-semibold">
                        ✓ Verified
                      </span>
                    )}
                  </div>
                  <p className="font-serif text-lg text-[#2A2520] leading-tight">{p.name}</p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {p.specialty} · {p.city}
                  </p>
                  <div className="flex items-center gap-1.5 mt-1.5 text-[11px]">
                    <span className="text-gray-700">★ {p.rating}</span>
                    <span className="text-gray-300">·</span>
                    <span className="text-gray-400">
                      From AED {p.startingPriceAed.toLocaleString()}
                    </span>
                  </div>
                </Link>
              </FadeInOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ────────── List your business CTA band ────────── */}
      <section className="py-16 md:py-20 bg-[#FAF7F2]">
        <div className="max-w-6xl mx-auto px-6">
          <FadeInOnScroll>
            <div className="rounded-3xl bg-[#2A2520] text-white p-10 md:p-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="max-w-2xl">
                <p className="text-[10px] tracking-[0.3em] uppercase text-[#C4A882] font-semibold mb-3">
                  For practitioners
                </p>
                <h2 className="font-serif text-3xl md:text-4xl leading-tight">
                  Run a clinic, studio, or practice? Get discovered on Kamura.
                </h2>
                <p className="mt-4 text-white/70 max-w-xl">
                  Join the directory. Reach patients looking for exactly what you do — scored,
                  verified, and local.
                </p>
              </div>
              <Link
                href="/provider/signup"
                className="inline-flex items-center gap-2 bg-terracotta hover:bg-terracotta-dark transition rounded-full px-6 py-3 font-medium"
              >
                List your business <span>→</span>
              </Link>
            </div>
          </FadeInOnScroll>
        </div>
      </section>

      <style>{`
        @keyframes floatAnim {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .float-anim { animation: floatAnim 5s ease-in-out infinite; }
        .float-anim-2 { animation: floatAnim 5s ease-in-out infinite 1.5s; }
        .float-anim-3 { animation: floatAnim 5s ease-in-out infinite 3s; }
        @keyframes ticker {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .animate-ticker {
          animation: ticker 45s linear infinite;
          width: max-content;
        }
      `}</style>
    </>
  );
}
