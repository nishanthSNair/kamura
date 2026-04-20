import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { treatments } from "@/data/treatments";
import { FEATURED_PRACTITIONERS } from "@/data/featured-practitioners";
import ServiceCarousel from "@/components/home/ServiceCarousel";
import ScrollProgress from "@/components/home/ScrollProgress";
import Reveal from "@/components/home/Reveal";
import MagneticButton from "@/components/home/MagneticButton";
import BentoTile from "@/components/home/BentoTile";
import BackgroundPathsHero from "@/components/home/BackgroundPathsHero";

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

      {/* ────────── HERO — flowing paths ────────── */}
      <BackgroundPathsHero
        title="Wellness, redefined."
        subhead="Discover, book, source, and track your wellness journey — all in one connected platform, built for the GCC."
        primaryCta={{ href: "/treatments", label: "Explore treatments" }}
        secondaryCta={{ href: "/peptides", label: "Join peptides waitlist" }}
      />

      {/* ────────── 5-tile bento ────────── */}
      <section className="bg-[#2D3E2D] pb-16 md:pb-24">
        <div className="relative max-w-6xl mx-auto px-6">
          <div className="grid gap-4 md:gap-5 md:grid-cols-3">
            <BentoTile
              href="/treatments"
              label="Discover"
              title="Book treatments"
              subtitle="Find the right wellness services"
              icon="lotus"
              cornerIcon="calendar"
              theme="dark"
              index={0}
            />
            <BentoTile
              href="/my"
              label="Track"
              title="Your journey"
              subtitle="Manage protocols and appointments"
              icon="heart-ecg"
              cornerIcon="chart"
              theme="dark"
              index={1}
            />
            <BentoTile
              href="/peptides"
              label="Source"
              title="Peptides & longevity"
              subtitle="Pharmaceutical-grade, compliantly sourced"
              icon="molecule"
              cornerIcon="flask"
              theme="dark"
              badge="Coming soon · Join the waitlist"
              index={2}
            />
          </div>
          <div className="grid gap-4 md:gap-5 md:grid-cols-[1fr_2fr] mt-4 md:mt-5">
            <BentoTile
              href="/wellness-checker"
              label="Start here"
              title="Not sure where to start?"
              subtitle="Take the wellness check."
              icon="leaf"
              cornerIcon="leaf"
              theme="dark"
              index={3}
            />
            <BentoTile
              href="/list-your-business"
              label="For clinics & partners"
              title="Grow with Kamura"
              subtitle="See the platform and dashboard"
              icon="people"
              cornerIcon="people"
              theme="light"
              index={4}
            />
          </div>
        </div>
      </section>

      {/* ────────── Trust strip ────────── */}
      <section className="bg-[#2A2520] text-[#C4A882] border-y border-[#C4A882]/15">
        <div className="max-w-6xl mx-auto px-6 py-5 grid grid-cols-3 gap-6 text-center md:text-left">
          {[
            { icon: "◎", label: "Evidence-scored" },
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
