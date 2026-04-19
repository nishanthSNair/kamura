import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { treatments } from "@/data/treatments";
import FadeInOnScroll from "@/components/FadeInOnScroll";
import { FEATURED_PRACTITIONERS } from "@/data/featured-practitioners";
import ServiceCarousel from "@/components/home/ServiceCarousel";

export const metadata: Metadata = {
  title: "KAMURA — Wellness, Redefined for Real Life",
  description: `Evidence-scored treatments. Vetted practitioners. The tools to track your protocol. ${treatments.length}+ wellness services across the GCC.`,
  keywords: [
    "wellness platform",
    "longevity treatments",
    "biohacking Dubai",
    "peptide therapy",
    "find wellness clinic UAE",
    "wellness intelligence",
  ],
  alternates: { canonical: "https://kamuralife.com" },
  openGraph: {
    title: "KAMURA — Wellness, Redefined for Real Life",
    description:
      "Evidence-scored treatments. Vetted practitioners. The tools to track your protocol.",
    url: "https://kamuralife.com",
    siteName: "KAMURA",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://kamuralife.com/images/hero-home.png",
        width: 1200,
        height: 630,
        alt: "KAMURA — Wellness, Redefined",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "KAMURA — Wellness, Redefined for Real Life",
    description: "Evidence-scored treatments. Vetted practitioners. Built for the GCC.",
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

      {/* ────────── HERO (MEDVi-style dark full-bleed) ────────── */}
      <section className="relative overflow-hidden bg-[#2D3E2D] text-white pt-28 md:pt-36 pb-0">
        {/* Watermark wordmark */}
        <div
          className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.04] select-none"
          aria-hidden
        >
          <span
            className="font-serif tracking-[0.2em] text-white whitespace-nowrap"
            style={{ fontSize: "min(24vw, 340px)" }}
          >
            KAMURA
          </span>
        </div>

        {/* Soft glow backdrop */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at 20% 30%, rgba(196,168,130,0.18) 0%, transparent 45%), radial-gradient(circle at 80% 20%, rgba(181,136,106,0.15) 0%, transparent 50%)",
          }}
          aria-hidden
        />

        <div className="relative max-w-6xl mx-auto px-6 text-center">
          <FadeInOnScroll>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#C4A882]/30 bg-white/5 backdrop-blur px-4 py-1.5 text-[11px] tracking-[0.2em] uppercase text-[#E5D3B0] mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C4A882] animate-pulse" />
              Built for the GCC
            </div>

            <h1 className="font-serif text-5xl md:text-7xl lg:text-[88px] leading-[0.98] tracking-tight max-w-5xl mx-auto">
              Wellness,
              <br />
              <span className="italic text-[#C4A882]">redefined</span> for real life.
            </h1>
            <p className="mt-7 text-base md:text-lg text-white/70 max-w-xl mx-auto">
              Evidence-scored treatments. Vetted practitioners. The tools to track your
              protocol.<br className="hidden md:block" /> No guesswork. Just care that works.
            </p>
          </FadeInOnScroll>
        </div>

        {/* 3 BIG CARDS — MEDVi-style clean pastel with image */}
        <div className="relative max-w-6xl mx-auto px-6 mt-16 md:mt-20">
          <div className="grid gap-5 md:grid-cols-3 pb-16 md:pb-20">
            {/* Card 1 — Find treatment */}
            <FadeInOnScroll>
              <Link
                href="/treatments"
                className="group relative block rounded-3xl overflow-hidden bg-gradient-to-br from-[#F5E8DF] to-[#EFDDCE] shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-1.5 aspect-[4/5]"
              >
                <div className="absolute inset-0 flex items-center justify-center p-8">
                  <div className="relative w-full h-full max-h-[60%]">
                    <Image
                      src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=85"
                      alt="Red light therapy"
                      fill
                      className="object-cover rounded-2xl shadow-2xl group-hover:scale-105 transition-transform duration-700 float-anim"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                </div>
                <div className="absolute inset-x-0 bottom-0 p-7 flex items-end justify-between">
                  <div>
                    <div className="text-[10px] tracking-[0.25em] uppercase text-[#9A5F57] font-semibold mb-1.5">
                      Find
                    </div>
                    <div className="font-serif text-2xl md:text-3xl text-[#2A2520] leading-tight">
                      Your treatment
                    </div>
                    <p className="text-xs text-[#2A2520]/60 mt-1">
                      {treatments.length}+ services, scored & verified
                    </p>
                  </div>
                  <span className="text-2xl text-[#9A5F57] group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </div>
              </Link>
            </FadeInOnScroll>

            {/* Card 2 — List your service */}
            <FadeInOnScroll delay={100}>
              <Link
                href="/provider/signup"
                className="group relative block rounded-3xl overflow-hidden bg-gradient-to-br from-[#E5ECD9] to-[#D6DDD0] shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-1.5 aspect-[4/5]"
              >
                <div className="absolute inset-0 flex items-center justify-center p-8">
                  <div className="relative w-full h-full max-h-[60%]">
                    <Image
                      src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800&q=85"
                      alt="Practitioner"
                      fill
                      className="object-cover rounded-2xl shadow-2xl group-hover:scale-105 transition-transform duration-700 float-anim-2"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                </div>
                <div className="absolute inset-x-0 bottom-0 p-7 flex items-end justify-between">
                  <div>
                    <div className="text-[10px] tracking-[0.25em] uppercase text-[#4A5E3E] font-semibold mb-1.5">
                      Grow
                    </div>
                    <div className="font-serif text-2xl md:text-3xl text-[#2A2520] leading-tight">
                      List your service
                    </div>
                    <p className="text-xs text-[#2A2520]/60 mt-1">
                      Get discovered by patients
                    </p>
                  </div>
                  <span className="text-2xl text-[#4A5E3E] group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </div>
              </Link>
            </FadeInOnScroll>

            {/* Card 3 — Peptides & Longevity */}
            <FadeInOnScroll delay={200}>
              <Link
                href="/peptides"
                className="group relative block rounded-3xl overflow-hidden bg-gradient-to-br from-[#FDF2E0] to-[#F5E2C0] shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-1.5 aspect-[4/5]"
              >
                <div className="absolute inset-0 flex items-center justify-center p-8">
                  <div className="relative w-full h-full max-h-[60%]">
                    <Image
                      src="https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=800&q=85"
                      alt="Peptide vial"
                      fill
                      className="object-cover rounded-2xl shadow-2xl group-hover:scale-105 transition-transform duration-700 float-anim-3"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                </div>
                <div className="absolute inset-x-0 bottom-0 p-7 flex items-end justify-between">
                  <div>
                    <div className="text-[10px] tracking-[0.25em] uppercase text-[#9A7357] font-semibold mb-1.5">
                      Longevity
                    </div>
                    <div className="font-serif text-2xl md:text-3xl text-[#2A2520] leading-tight">
                      Peptides & longevity
                    </div>
                    <p className="text-xs text-[#2A2520]/60 mt-1">
                      The intelligence hub
                    </p>
                  </div>
                  <span className="text-2xl text-[#9A7357] group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </div>
              </Link>
            </FadeInOnScroll>
          </div>
        </div>
      </section>

      {/* ────────── Trust badge strip (MEDVi style, icons + caps) ────────── */}
      <section className="bg-[#2A2520] text-[#C4A882] border-y border-[#C4A882]/15">
        <div className="max-w-6xl mx-auto px-6 py-5 grid grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-3">
            <span className="text-lg">◎</span>
            <span className="text-[10px] tracking-[0.25em] uppercase font-semibold">
              Evidence-scored
            </span>
          </div>
          <div className="flex items-center justify-center md:justify-start gap-3">
            <span className="text-lg">✓</span>
            <span className="text-[10px] tracking-[0.25em] uppercase font-semibold">
              DHA / MOHAP compliant
            </span>
          </div>
          <div className="flex items-center justify-center md:justify-start gap-3">
            <span className="text-lg">⚲</span>
            <span className="text-[10px] tracking-[0.25em] uppercase font-semibold">
              Vetted practitioners
            </span>
          </div>
          <div className="flex items-center justify-center md:justify-start gap-3">
            <span className="text-lg">◈</span>
            <span className="text-[10px] tracking-[0.25em] uppercase font-semibold">
              Built in the UAE
            </span>
          </div>
        </div>
      </section>

      {/* ────────── Quick-access pills (wellness checker + peptide tools) ────────── */}
      <section className="py-10 md:py-14 bg-[#FAF7F2]">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-3">
          <FadeInOnScroll>
            <Link
              href="/wellness-checker"
              className="group bg-white hover:shadow-lg transition-all rounded-2xl px-6 py-5 border border-[#2A2520]/5 flex items-center gap-4"
            >
              <span className="w-12 h-12 rounded-xl bg-[#B0BCA4]/30 flex items-center justify-center text-xl text-[#4A5E3E]">
                ✓
              </span>
              <div className="flex-1">
                <div className="font-semibold text-[#2A2520]">Not sure what you need?</div>
                <div className="text-sm text-[#2A2520]/60">
                  Take the 2-minute wellness checker.
                </div>
              </div>
              <span className="text-[#2A2520]/40 group-hover:text-terracotta group-hover:translate-x-1 transition-all">
                →
              </span>
            </Link>
          </FadeInOnScroll>
          <FadeInOnScroll delay={80}>
            <Link
              href="/peptides"
              className="group bg-white hover:shadow-lg transition-all rounded-2xl px-6 py-5 border border-[#2A2520]/5 flex items-center gap-4"
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
                  Scored & verified
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
      `}</style>
    </>
  );
}
