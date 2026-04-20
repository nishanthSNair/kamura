import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { treatments } from "@/data/treatments";
import { FEATURED_PRACTITIONERS } from "@/data/featured-practitioners";
import ServiceCarousel from "@/components/home/ServiceCarousel";
import HeroHeadline from "@/components/home/HeroHeadline";
import ScrollProgress from "@/components/home/ScrollProgress";
import Reveal from "@/components/home/Reveal";
import MagneticButton from "@/components/home/MagneticButton";
import TortoiseHero from "@/components/home/TortoiseHero";
import BentoCard from "@/components/home/BentoCard";

export const metadata: Metadata = {
  title: "KAMURA — Discover, Book, Source & Track Your Wellness",
  description: `Find trusted wellness practitioners, book treatments, access pharmaceutical-grade peptides, and manage your protocols — all on one platform. ${treatments.length}+ services scored across the GCC.`,
  keywords: [
    "wellness platform UAE",
    "longevity treatments Dubai",
    "find wellness practitioner",
    "peptide therapy",
    "book wellness treatment",
    "wellness protocol tracker",
    "wellness intelligence GCC",
  ],
  alternates: { canonical: "https://kamuralife.com" },
  openGraph: {
    title: "KAMURA — Discover, Book, Source & Track Your Wellness",
    description:
      "The connected wellness platform for the GCC. Find practitioners, book treatments, source peptides, track protocols.",
    url: "https://kamuralife.com",
    siteName: "KAMURA",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://kamuralife.com/images/hero-home.png",
        width: 1200,
        height: 630,
        alt: "KAMURA — Discover, Book, Source, Track",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "KAMURA — The Connected Wellness Platform",
    description: "Discover. Book. Source. Track. All in one place.",
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
        description: "The connected wellness platform for the GCC",
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

      {/* ────────── HERO — light, luxury, 2-column ────────── */}
      <section className="relative overflow-hidden bg-[#FAF6ED] pt-28 md:pt-32 pb-16 md:pb-20">
        {/* Subtle dot grid */}
        <div
          className="absolute inset-0 opacity-[0.05] pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle, #9A7357 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
          aria-hidden
        />
        {/* Warm glow blobs */}
        <div
          className="absolute -top-40 -left-40 w-[520px] h-[520px] rounded-full blur-[120px] opacity-40 pointer-events-none"
          style={{ background: "radial-gradient(circle, #E5D3B0 0%, transparent 70%)" }}
          aria-hidden
        />
        <div
          className="absolute top-20 right-0 w-[460px] h-[460px] rounded-full blur-[120px] opacity-30 pointer-events-none"
          style={{ background: "radial-gradient(circle, #B5C5A8 0%, transparent 70%)" }}
          aria-hidden
        />

        <div className="relative max-w-6xl mx-auto px-6 grid lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-14 items-center">
          {/* LEFT — copy */}
          <div>
            <Reveal>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#9A7357]/25 bg-white/70 backdrop-blur px-4 py-1.5 text-[11px] tracking-[0.2em] uppercase text-[#6A5240] font-semibold mb-7">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-[#C4A882] opacity-75 animate-ping" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#C4A882]" />
                </span>
                Built for the GCC
              </div>
            </Reveal>

            <h1 className="font-serif text-4xl md:text-6xl lg:text-[64px] leading-[1.02] tracking-tight text-[#2A2520] max-w-xl">
              <HeroHeadline />
            </h1>

            <Reveal delay={0.9}>
              <p className="mt-6 text-base md:text-lg text-[#2A2520]/65 max-w-md leading-relaxed">
                Find trusted practitioners and clinics, book wellness services, access
                pharmaceutical-grade peptides, and manage your protocols — through one
                connected platform.
              </p>
            </Reveal>

            <Reveal delay={1.05}>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <MagneticButton
                  href="/treatments"
                  className="inline-flex items-center gap-2 bg-[#2A2520] text-white hover:bg-[#3A2F28] transition-colors rounded-full pl-6 pr-5 py-4 font-medium shadow-lg"
                  strength={0.2}
                >
                  Explore treatments
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#C4A882] text-[#2A2520] text-xs">
                    →
                  </span>
                </MagneticButton>
                <Link
                  href="/peptides"
                  className="inline-flex items-center gap-2 bg-transparent hover:bg-white text-[#2A2520] rounded-full px-6 py-4 font-medium border border-[#2A2520]/15 hover:border-[#9A7357] transition-all"
                >
                  Join peptides waitlist
                </Link>
              </div>
            </Reveal>

            <Reveal delay={1.2}>
              <div className="mt-10 flex flex-wrap items-center gap-6 text-[11px] tracking-[0.22em] uppercase text-[#2A2520]/45 font-semibold">
                <span className="flex items-center gap-2">
                  <span className="text-[#C4A882]">◎</span> Evidence-scored
                </span>
                <span className="flex items-center gap-2">
                  <span className="text-[#C4A882]">✓</span> DHA / MOHAP aligned
                </span>
                <span className="flex items-center gap-2">
                  <span className="text-[#C4A882]">⚲</span> Vetted practitioners
                </span>
              </div>
            </Reveal>
          </div>

          {/* RIGHT — tortoise */}
          <div className="relative">
            <TortoiseHero />
          </div>
        </div>
      </section>

      {/* ────────── BENTO — 3 primary + 2 secondary ────────── */}
      <section className="bg-[#FAF6ED] pb-16 md:pb-24">
        <div className="max-w-6xl mx-auto px-6">
          {/* Primary row — 3 equal tiles */}
          <div className="grid gap-4 md:gap-5 md:grid-cols-3">
            <BentoCard
              href="/treatments"
              label="Discover & book"
              title="Find your treatment"
              subtitle={`Book from ${treatments.length}+ scored wellness services across the GCC.`}
              icon="lotus"
              accent="#B5886A"
              tint="linear-gradient(160deg, #FDF6EA 0%, #F5E8DF 100%)"
              index={0}
            />
            <BentoCard
              href="/my"
              label="Track"
              title="Your wellness journey"
              subtitle="Manage protocols, bookings, and results in one dashboard."
              icon="heart"
              accent="#9A7357"
              tint="linear-gradient(160deg, #FAF6ED 0%, #EFE5D2 100%)"
              index={1}
            />
            <BentoCard
              href="/peptides"
              label="Source"
              title="Peptides & longevity"
              subtitle="Pharmaceutical-grade peptides through licensed compounding partners."
              icon="molecule"
              accent="#6B7F5A"
              tint="linear-gradient(160deg, #F2F4E8 0%, #E5ECD9 100%)"
              badge="Coming soon"
              index={2}
            />
          </div>

          {/* Secondary row — narrow + wide */}
          <div className="grid gap-4 md:gap-5 md:grid-cols-[1fr_2fr] mt-4 md:mt-5">
            <BentoCard
              href="/wellness-checker"
              label="Start here"
              title="Not sure where to begin?"
              subtitle="Take the 2-minute wellness check."
              icon="leaf"
              accent="#8AA07A"
              tint="linear-gradient(135deg, #F2F4E8 0%, #E8EDDD 100%)"
              index={3}
            />
            <BentoCard
              href="/list-your-business"
              label="For clinics & partners"
              title="Grow with Kamura"
              subtitle="List your services, reach qualified patients, and manage bookings on one platform."
              icon="clinic"
              accent="#9A7357"
              tint="linear-gradient(135deg, #F5E8DF 0%, #EAD9CA 100%)"
              index={4}
            />
          </div>
        </div>
      </section>

      {/* ────────── Service carousel ────────── */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal>
            <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
              <div>
                <p className="text-[10px] tracking-[0.3em] uppercase text-[#B5886A] font-semibold mb-3">
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
                className="text-xs tracking-[0.15em] uppercase text-[#B5886A] font-semibold hover:underline"
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
      <section className="py-16 md:py-20 bg-[#FAF6ED]">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal>
            <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
              <div>
                <p className="text-[10px] tracking-[0.3em] uppercase text-[#B5886A] font-semibold mb-3">
                  Kamura-verified
                </p>
                <h2 className="font-serif text-3xl md:text-4xl text-[#2A2520] leading-tight">
                  Healers on the platform
                </h2>
              </div>
              <Link
                href="/explore"
                className="text-xs tracking-[0.15em] uppercase text-[#B5886A] font-semibold hover:underline"
              >
                See all →
              </Link>
            </div>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
            {featuredPractitioners.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.08}>
                <Link href={`/provider/${p.slug}`} className="group block">
                  <div className="relative aspect-[4/5] rounded-2xl overflow-hidden mb-3 bg-[#F0E9DA]">
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
                  <p className="text-xs text-[#2A2520]/55 mt-0.5">
                    {p.specialty} · {p.city}
                  </p>
                  <div className="flex items-center gap-1.5 mt-1.5 text-[11px]">
                    <span className="text-[#2A2520]/75">★ {p.rating}</span>
                    <span className="text-[#2A2520]/30">·</span>
                    <span className="text-[#2A2520]/45">
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
            <div
              className="relative rounded-[32px] p-10 md:p-14 overflow-hidden border border-[#9A7357]/15"
              style={{
                background:
                  "linear-gradient(135deg, #FDF6EA 0%, #F5E8DF 45%, #EAD9CA 100%)",
              }}
            >
              <div
                className="absolute inset-0 opacity-30 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(circle at 15% 20%, #E5D3B0 0%, transparent 45%), radial-gradient(circle at 85% 85%, #B5C5A8 0%, transparent 50%)",
                }}
              />
              <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="max-w-2xl">
                  <p className="text-[10px] tracking-[0.3em] uppercase text-[#9A7357] font-semibold mb-3">
                    For practitioners
                  </p>
                  <h2 className="font-serif text-3xl md:text-4xl leading-tight text-[#2A2520]">
                    Run a clinic, studio, or practice?
                    <br />
                    <span className="italic text-[#9A7357]">Get discovered on Kamura.</span>
                  </h2>
                  <p className="mt-4 text-[#2A2520]/65 max-w-xl">
                    Join the directory. Reach patients looking for exactly what you do —
                    scored, verified, and local.
                  </p>
                </div>
                <MagneticButton
                  href="/provider/signup"
                  className="inline-flex items-center gap-2 bg-[#2A2520] hover:bg-[#3A2F28] text-white transition-all rounded-full px-7 py-4 font-medium shadow-lg"
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
