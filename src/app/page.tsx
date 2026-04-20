import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { treatments } from "@/data/treatments";
import { FEATURED_PRACTITIONERS } from "@/data/featured-practitioners";
import ServiceCarousel from "@/components/home/ServiceCarousel";
import HeroHeadline from "@/components/home/HeroHeadline";
import HeroCard from "@/components/home/HeroCard";
import ScrollProgress from "@/components/home/ScrollProgress";
import AmbientOrbs from "@/components/home/AmbientOrbs";
import Reveal from "@/components/home/Reveal";
import MagneticButton from "@/components/home/MagneticButton";

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

      <ScrollProgress />

      {/* ────────── HERO ────────── */}
      <section className="relative overflow-hidden bg-[#2D3E2D] text-white pt-28 md:pt-36 pb-0">
        <AmbientOrbs />

        {/* Watermark */}
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

        <div className="relative max-w-6xl mx-auto px-6 text-center">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#C4A882]/30 bg-white/5 backdrop-blur px-4 py-1.5 text-[11px] tracking-[0.2em] uppercase text-[#E5D3B0] mb-8">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-[#C4A882] opacity-75 animate-ping" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#C4A882]" />
              </span>
              Built for the GCC
            </div>
          </Reveal>

          <HeroHeadline />

          <Reveal delay={0.8}>
            <p className="mt-7 text-base md:text-lg text-white/70 max-w-xl mx-auto">
              Evidence-scored treatments. Vetted practitioners. The tools to track your
              protocol.
              <br className="hidden md:block" /> No guesswork. Just care that works.
            </p>
          </Reveal>
        </div>

        {/* 3 hero cards with 3D tilt */}
        <div className="relative max-w-6xl mx-auto px-6 mt-16 md:mt-20">
          <div className="grid gap-5 md:grid-cols-3 pb-16 md:pb-20">
            <HeroCard
              href="/treatments"
              label="Find"
              title="Your treatment"
              subtitle={`${treatments.length}+ services, scored & verified`}
              image="https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=85"
              imageAlt="Red light therapy"
              gradient="linear-gradient(135deg, #F5E8DF 0%, #EFDDCE 100%)"
              accent="#9A5F57"
              index={0}
              floatDelay={0}
            />
            <HeroCard
              href="/provider/signup"
              label="Grow"
              title="List your service"
              subtitle="Get discovered by patients"
              image="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800&q=85"
              imageAlt="Practitioner"
              gradient="linear-gradient(135deg, #E5ECD9 0%, #D6DDD0 100%)"
              accent="#4A5E3E"
              index={1}
              floatDelay={1.5}
            />
            <HeroCard
              href="/peptides"
              label="Longevity"
              title="Peptides & longevity"
              subtitle="The intelligence hub"
              image="https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=800&q=85"
              imageAlt="Peptide vial"
              gradient="linear-gradient(135deg, #FDF2E0 0%, #F5E2C0 100%)"
              accent="#9A7357"
              index={2}
              floatDelay={3}
            />
          </div>
        </div>
      </section>

      {/* ────────── Trust strip ────────── */}
      <section className="bg-[#2A2520] text-[#C4A882] border-y border-[#C4A882]/15">
        <div className="max-w-6xl mx-auto px-6 py-5 grid grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left">
          {[
            { icon: "◎", label: "Evidence-scored" },
            { icon: "✓", label: "DHA / MOHAP compliant" },
            { icon: "⚲", label: "Vetted practitioners" },
            { icon: "◈", label: "Built in the UAE" },
          ].map((item, i) => (
            <Reveal key={item.label} delay={i * 0.08}>
              <div className="flex items-center justify-center md:justify-start gap-3">
                <span className="text-lg">{item.icon}</span>
                <span className="text-[10px] tracking-[0.25em] uppercase font-semibold">
                  {item.label}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ────────── Quick-access pills ────────── */}
      <section className="py-10 md:py-14 bg-[#FAF7F2]">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-3">
          <Reveal>
            <Link
              href="/wellness-checker"
              className="group bg-white hover:shadow-lg transition-all rounded-2xl px-6 py-5 border border-[#2A2520]/5 flex items-center gap-4"
            >
              <span className="w-12 h-12 rounded-xl bg-[#B0BCA4]/30 flex items-center justify-center text-xl text-[#4A5E3E] group-hover:scale-110 transition-transform duration-300">
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
          </Reveal>
          <Reveal delay={0.1}>
            <Link
              href="/peptides"
              className="group bg-white hover:shadow-lg transition-all rounded-2xl px-6 py-5 border border-[#2A2520]/5 flex items-center gap-4"
            >
              <span className="w-12 h-12 rounded-xl bg-[#C4A882]/25 flex items-center justify-center text-xl text-[#9A7357] group-hover:scale-110 transition-transform duration-300">
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
          </Reveal>
        </div>
      </section>

      {/* ────────── Service carousel ────────── */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal>
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
          </Reveal>
          <Reveal delay={0.15}>
            <ServiceCarousel />
          </Reveal>
        </div>
      </section>

      {/* ────────── Featured practitioners ────────── */}
      <section className="py-16 md:py-20 bg-[#FAF7F2]">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal>
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
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
            {featuredPractitioners.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.08}>
                <Link href={`/provider/${p.slug}`} className="group block">
                  <div className="relative aspect-[4/5] rounded-2xl overflow-hidden mb-3 bg-gray-100">
                    <Image
                      src={p.imageUrl}
                      alt={p.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
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
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ────────── List your business CTA band ────────── */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal>
            <div className="relative rounded-[32px] bg-[#2A2520] text-white p-10 md:p-14 overflow-hidden">
              <div
                className="absolute inset-0 opacity-40 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(circle at 20% 30%, #C4A882 0%, transparent 35%), radial-gradient(circle at 80% 80%, #B5886A 0%, transparent 40%)",
                }}
              />
              <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="max-w-2xl">
                  <p className="text-[10px] tracking-[0.3em] uppercase text-[#C4A882] font-semibold mb-3">
                    For practitioners
                  </p>
                  <h2 className="font-serif text-3xl md:text-4xl leading-tight">
                    Run a clinic, studio, or practice?
                    <br />
                    <span className="italic text-[#E5D3B0]">Get discovered on Kamura.</span>
                  </h2>
                  <p className="mt-4 text-white/70 max-w-xl">
                    Join the directory. Reach patients looking for exactly what you do — scored,
                    verified, and local.
                  </p>
                </div>
                <MagneticButton
                  href="/provider/signup"
                  className="inline-flex items-center gap-2 bg-terracotta hover:bg-terracotta-dark transition-all rounded-full px-7 py-4 font-medium shadow-lg"
                  strength={0.3}
                >
                  List your business <span>→</span>
                </MagneticButton>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
