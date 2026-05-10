import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { treatments } from "@/data/treatments";
import FadeInOnScroll from "@/components/FadeInOnScroll";

export const metadata: Metadata = {
  title: "KAMURA — Preventive Medicine, Redefined for the Long Game",
  description: `Compounded peptides, vetted UAE practitioners, and a personal health dashboard — built around evidence, not Instagram trends. ${treatments.length}+ treatments scored.`,
  keywords: [
    "preventive medicine UAE",
    "compounded peptides Dubai",
    "longevity platform GCC",
    "DHA-registered telehealth",
    "peptide therapy UAE",
    "wellness platform Dubai",
    "Kamura Score",
    "evidence-based wellness",
    "find wellness clinic UAE",
    "longitudinal health dashboard",
  ],
  alternates: { canonical: "https://kamuralife.com" },
  openGraph: {
    title: "KAMURA — Preventive Medicine, Redefined",
    description:
      "Compounded peptides + DHA-registered physician care + your longitudinal health dashboard. Built for adults serious about the long game.",
    url: "https://kamuralife.com",
    siteName: "KAMURA",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://kamuralife.com/images/hero-home.png",
        width: 1200,
        height: 630,
        alt: "KAMURA — Heart of Longevity",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "KAMURA — Preventive Medicine, Redefined",
    description:
      "Compounded peptides. Vetted practitioners. Your longitudinal health dashboard. Be the tortoise.",
    creator: "@KamuraLife",
    images: ["https://kamuralife.com/images/hero-home.png"],
  },
};

export default function Home() {
  const treatmentCount = treatments.length;
  const citationCount = treatments.reduce(
    (sum, t) => sum + (t.keyStudies?.length || 0),
    0
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: "KAMURA",
        url: "https://kamuralife.com",
        description:
          "UAE-based longevity platform — compounded peptides, vetted practitioners, and a personal health dashboard.",
        sameAs: [
          "https://www.instagram.com/kamuralife/",
          "https://x.com/KamuraLife",
        ],
      },
      {
        "@type": "WebSite",
        name: "KAMURA",
        url: "https://kamuralife.com",
        potentialAction: {
          "@type": "SearchAction",
          target: "https://kamuralife.com/explore?q={search_term_string}",
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "MedicalBusiness",
        name: "KAMURA",
        url: "https://kamuralife.com",
        description:
          "Telehealth-enabled longevity platform with DHA-registered physician partnership and IV compounding pharmacy.",
        areaServed: {
          "@type": "AdministrativeArea",
          name: "United Arab Emirates",
        },
      },
    ],
  };

  const FUNCTIONS = [
    {
      n: "01",
      label: "Buy",
      title: "Compounded peptides",
      sub: "Pharmaceutical-grade peptides and Rx formulations, prescribed by UAE-licensed physicians and shipped from our compounding pharmacy partner.",
      href: "/peptides",
      tag: "Waitlist · Q3 2026",
    },
    {
      n: "02",
      label: "Learn",
      title: "Understand peptides",
      sub: "Visual primers, the Kamura Score methodology, and a treatment library built on PubMed citations — not influencer testimonials.",
      href: "/peptides/what-is-a-peptide",
    },
    {
      n: "03",
      label: "Book",
      title: "Wellness services",
      sub: "Curated directory of practitioners, clinics, IV drips, sound healing, breathwork, and recovery — scored and verified.",
      href: "/explore",
    },
    {
      n: "04",
      label: "Track",
      title: "Your health record",
      sub: "Wearable integrations, blood-panel uploads, and protocol tracking — your longitudinal health record, in one place.",
      href: "/my",
      tag: "Beta",
    },
  ];

  const STEPS = [
    {
      n: "1",
      title: "Take the 2-minute Wellness Check",
      sub: "Map your goals, symptoms, and current stack. We score your baseline against the evidence.",
    },
    {
      n: "2",
      title: "Match with a UAE-licensed physician",
      sub: "Async consultation through our DHA-registered homecare partner. Bloodwork ordered if needed.",
    },
    {
      n: "3",
      title: "Receive your protocol",
      sub: "Compounded peptides delivered in 48 hours, or your wellness service booked at a vetted clinic. Track everything from your dashboard.",
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ════════════ HERO ════════════ */}
      <section className="relative min-h-[92vh] md:min-h-[88vh] flex items-center overflow-hidden bg-[#FAF7F2]">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-home.png"
            alt=""
            fill
            priority
            className="object-cover object-center opacity-40"
            sizes="100vw"
            quality={85}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(250,247,242,0.85) 0%, rgba(250,247,242,0.5) 35%, rgba(250,247,242,0.92) 100%)",
            }}
            aria-hidden
          />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-8 py-32 md:py-40 w-full">
          <div className="max-w-[820px]">
            <p className="text-[10.5px] md:text-[11px] tracking-[0.32em] uppercase text-terracotta font-semibold font-sans mb-6">
              Be the Tortoise · Kamura
            </p>
            <h1 className="font-serif text-[42px] md:text-[68px] leading-[1.04] tracking-[-0.015em] text-[#2A2520] mb-6 md:mb-8 max-w-[14ch]">
              Preventive medicine, redefined for the long game.
            </h1>
            <p className="text-[16px] md:text-[19px] leading-[1.55] text-[#2A2520]/75 max-w-[640px] mb-9 md:mb-10 font-sans">
              Compounded peptides, vetted UAE practitioners, and your personal
              longitudinal health record — three layers, one trusted ecosystem.
              Built around evidence, not Instagram trends.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-12 md:mb-16">
              <Link
                href="/wellness-checker"
                className="inline-flex items-center justify-center gap-2 h-[52px] px-7 rounded-full bg-[#2A2520] hover:bg-[#1A1612] text-white text-[14.5px] font-sans font-semibold transition-colors"
              >
                Take the wellness check
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
              <Link
                href="#how-it-works"
                className="inline-flex items-center justify-center gap-2 h-[52px] px-7 rounded-full border border-[#2A2520]/15 hover:border-[#2A2520]/40 text-[#2A2520] text-[14.5px] font-sans font-semibold transition-colors"
              >
                How Kamura works
              </Link>
            </div>

            {/* Inline trust micro-strip */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-[11px] tracking-[0.18em] uppercase text-[#2A2520]/60 font-sans font-medium">
              <span className="inline-flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-terracotta" />
                DHA-registered partner
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-terracotta" />
                UAE-licensed physicians
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-terracotta" />
                Pharmacy partnership
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════ FOUR CORE FUNCTIONS ════════════ */}
      <section className="bg-[#FAF7F2] border-t border-[#2A2520]/8 py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <FadeInOnScroll>
            <div className="max-w-[640px] mb-14 md:mb-16">
              <p className="text-[10.5px] tracking-[0.32em] uppercase text-terracotta font-semibold font-sans mb-4">
                Four doors in
              </p>
              <h2 className="font-serif text-[34px] md:text-[48px] leading-[1.05] tracking-[-0.01em] text-[#2A2520]">
                Whether you&rsquo;re here to <span className="italic">buy</span>,{" "}
                <span className="italic">learn</span>, <span className="italic">book</span>, or{" "}
                <span className="italic">track</span> — start here.
              </h2>
            </div>
          </FadeInOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
            {FUNCTIONS.map((f, i) => (
              <FadeInOnScroll key={f.n} delay={i * 80}>
                <Link
                  href={f.href}
                  className="group relative block h-full p-7 md:p-9 rounded-2xl bg-white border border-[#2A2520]/8 hover:border-[#2A2520]/25 hover:-translate-y-0.5 shadow-[0_2px_12px_-6px_rgba(42,37,32,0.08)] hover:shadow-[0_18px_40px_-18px_rgba(42,37,32,0.22)] transition-all duration-500"
                >
                  <div className="flex items-start justify-between mb-7">
                    <div className="flex items-center gap-3">
                      <span className="font-serif text-[16px] text-[#2A2520]/40">{f.n}</span>
                      <span className="text-[10.5px] tracking-[0.28em] uppercase text-terracotta font-sans font-semibold">
                        {f.label}
                      </span>
                    </div>
                    {f.tag && (
                      <span className="inline-flex items-center h-[22px] px-2.5 rounded-full text-[9.5px] font-semibold tracking-[0.1em] uppercase bg-[#C4A882]/15 border border-[#C4A882]/40 text-[#9A7357]">
                        {f.tag}
                      </span>
                    )}
                  </div>
                  <h3 className="font-serif text-[26px] md:text-[30px] leading-[1.15] tracking-[-0.005em] text-[#2A2520] mb-3">
                    {f.title}
                  </h3>
                  <p className="text-[14.5px] leading-[1.6] text-[#2A2520]/65 font-sans mb-7 max-w-[44ch]">
                    {f.sub}
                  </p>
                  <span className="inline-flex items-center gap-2 text-[12px] tracking-[0.18em] uppercase text-[#2A2520] font-sans font-semibold group-hover:gap-3 transition-all">
                    Enter
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </span>
                </Link>
              </FadeInOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════ TRUST + STATS BAND ════════════ */}
      <section className="bg-[#EDE7DB] py-14 md:py-16 border-y border-[#2A2520]/8">
        <div className="max-w-6xl mx-auto px-6 md:px-8 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6">
          {[
            { num: treatmentCount + "+", lab: "Treatments scored" },
            { num: citationCount + "+", lab: "Research citations" },
            { num: "70+", lab: "Vetted providers" },
            { num: "100%", lab: "UAE-prescribed" },
          ].map((s, i) => (
            <FadeInOnScroll key={s.lab} delay={i * 60}>
              <div className="text-center md:text-left">
                <div className="font-serif text-[40px] md:text-[52px] leading-none text-[#2A2520] mb-2">
                  {s.num}
                </div>
                <div className="text-[10px] md:text-[10.5px] tracking-[0.25em] uppercase text-[#2A2520]/65 font-sans font-medium">
                  {s.lab}
                </div>
              </div>
            </FadeInOnScroll>
          ))}
        </div>
      </section>

      {/* ════════════ THE KAMURA SCORE ════════════ */}
      <section className="bg-[#FAF7F2] py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6 md:px-8 grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          <FadeInOnScroll>
            <div>
              <p className="text-[10.5px] tracking-[0.32em] uppercase text-terracotta font-semibold font-sans mb-5">
                The Kamura Score
              </p>
              <h2 className="font-serif text-[34px] md:text-[52px] leading-[1.05] tracking-[-0.01em] text-[#2A2520] mb-6 max-w-[16ch]">
                Evidence-scored, not influencer-promoted.
              </h2>
              <p className="text-[15.5px] md:text-[16.5px] leading-[1.65] text-[#2A2520]/70 font-sans mb-7 max-w-[52ch]">
                Every treatment in our directory is scored on four axes:
                evidence quality, safety profile, access in the UAE, and
                value-for-outcome. Our methodology is transparent and built on
                PubMed-grade citations — currently {citationCount}+ studies
                referenced across {treatmentCount} treatments.
              </p>
              <Link
                href="/treatments/methodology"
                className="inline-flex items-center gap-2 text-[13px] tracking-[0.2em] uppercase text-[#2A2520] font-sans font-semibold border-b border-[#2A2520]/30 hover:border-[#2A2520] pb-1 transition-colors"
              >
                Read the methodology
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
            </div>
          </FadeInOnScroll>

          <FadeInOnScroll delay={120}>
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-[#EDE7DB] border border-[#2A2520]/8">
              <div className="absolute inset-0 flex flex-col justify-between p-10">
                {[
                  { label: "Evidence quality", score: 92 },
                  { label: "Safety profile", score: 88 },
                  { label: "UAE access", score: 76 },
                  { label: "Value for outcome", score: 81 },
                ].map((s, i) => (
                  <div key={s.label}>
                    <div className="flex items-baseline justify-between mb-2">
                      <span className="text-[10.5px] tracking-[0.22em] uppercase text-[#2A2520]/70 font-sans font-medium">
                        {s.label}
                      </span>
                      <span className="font-serif text-[26px] text-[#2A2520]">
                        {s.score}
                      </span>
                    </div>
                    <div className="h-[3px] bg-[#2A2520]/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-terracotta rounded-full"
                        style={{
                          width: `${s.score}%`,
                          transitionDelay: `${i * 100}ms`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeInOnScroll>
        </div>
      </section>

      {/* ════════════ HOW IT WORKS ════════════ */}
      <section
        id="how-it-works"
        className="bg-[#F5F2ED] py-24 md:py-32 border-y border-[#2A2520]/8"
      >
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <FadeInOnScroll>
            <div className="max-w-[640px] mb-14 md:mb-16">
              <p className="text-[10.5px] tracking-[0.32em] uppercase text-terracotta font-semibold font-sans mb-4">
                How it works
              </p>
              <h2 className="font-serif text-[34px] md:text-[48px] leading-[1.05] tracking-[-0.01em] text-[#2A2520]">
                From check-in to your protocol — in three steps.
              </h2>
            </div>
          </FadeInOnScroll>

          <div className="grid md:grid-cols-3 gap-5 md:gap-6">
            {STEPS.map((s, i) => (
              <FadeInOnScroll key={s.n} delay={i * 100}>
                <div className="relative h-full p-8 md:p-9 rounded-2xl bg-white border border-[#2A2520]/8">
                  <div className="font-serif text-[64px] md:text-[80px] leading-none text-[#C4A882]/70 mb-5">
                    {s.n}
                  </div>
                  <h3 className="font-serif text-[22px] md:text-[24px] leading-[1.2] tracking-[-0.005em] text-[#2A2520] mb-3">
                    {s.title}
                  </h3>
                  <p className="text-[14px] leading-[1.6] text-[#2A2520]/65 font-sans">
                    {s.sub}
                  </p>
                </div>
              </FadeInOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════ PEPTIDE SPOTLIGHT ════════════ */}
      <section className="bg-[#FAF7F2] py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <FadeInOnScroll>
            <div className="relative overflow-hidden rounded-3xl bg-[#2A2520] text-white px-8 md:px-16 py-20 md:py-28">
              <div
                className="absolute inset-0 opacity-25 pointer-events-none"
                aria-hidden
                style={{
                  background:
                    "radial-gradient(ellipse at 20% 100%, rgba(196,168,130,0.4) 0%, transparent 50%), radial-gradient(ellipse at 100% 0%, rgba(74,94,62,0.5) 0%, transparent 55%)",
                }}
              />
              <div className="relative max-w-[760px]">
                <p className="text-[10.5px] tracking-[0.32em] uppercase text-[#C4A882] font-semibold font-sans mb-5">
                  Pharmaceutical-grade · Coming Q3 2026
                </p>
                <h2 className="font-serif text-[36px] md:text-[60px] leading-[1.04] tracking-[-0.015em] mb-7 max-w-[18ch]">
                  Compounded peptides,{" "}
                  <span className="italic text-[#D4B896]">prescribed by physicians</span>{" "}
                  in the UAE.
                </h2>
                <p className="text-[15.5px] md:text-[17px] leading-[1.6] text-white/70 mb-10 max-w-[58ch] font-sans">
                  BPC-157, GLP-1, NAD+, and more — sourced through our
                  equity-partnered IV compounding pharmacy, prescribed via our
                  DHA-registered homecare partner. Async consultation, 48-hour
                  delivery.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    href="/peptides"
                    className="inline-flex items-center justify-center gap-2 h-[52px] px-7 rounded-full bg-[#C4A882] hover:bg-[#B59872] text-[#2A2520] text-[14.5px] font-sans font-semibold transition-colors"
                  >
                    Join the waitlist
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </Link>
                  <Link
                    href="/peptides/what-is-a-peptide"
                    className="inline-flex items-center justify-center gap-2 h-[52px] px-7 rounded-full border border-white/30 hover:border-white/60 text-white text-[14.5px] font-sans font-semibold transition-colors"
                  >
                    What is a peptide?
                  </Link>
                </div>
              </div>
            </div>
          </FadeInOnScroll>
        </div>
      </section>

      {/* ════════════ WHY KAMURA ════════════ */}
      <section className="bg-[#EDE7DB] py-24 md:py-32 border-y border-[#2A2520]/8">
        <div className="max-w-5xl mx-auto px-6 md:px-8 text-center">
          <FadeInOnScroll>
            <p className="text-[10.5px] tracking-[0.32em] uppercase text-terracotta font-semibold font-sans mb-6">
              Why Kamura
            </p>
            <h2 className="font-serif text-[36px] md:text-[58px] leading-[1.05] tracking-[-0.012em] text-[#2A2520] mb-8 max-w-[18ch] mx-auto">
              The platform for people who play the long game.
            </h2>
            <p className="text-[16px] md:text-[18px] leading-[1.7] text-[#2A2520]/70 max-w-[68ch] mx-auto font-sans mb-7">
              Kamura — from the Japanese{" "}
              <em className="text-[#2A2520]">kame</em> (tortoise, longevity) and{" "}
              <em className="text-[#2A2520]">ura</em> (heart). The tortoise wins
              not by speed, but by consistency. Our platform is built for the
              same audience: adults who choose preventive medicine over
              reactive care, and evidence over algorithms.
            </p>
            <p className="text-[16px] md:text-[18px] leading-[1.7] text-[#2A2520]/70 max-w-[68ch] mx-auto font-sans">
              We&rsquo;re not a pharmacy bolted onto a directory, or a
              dashboard bolted onto a clinic. We&rsquo;re three integrated
              layers — Rx commerce, vetted discovery, and longitudinal
              intelligence — working as one.
            </p>
          </FadeInOnScroll>
        </div>
      </section>

      {/* ════════════ PARTNER STRIP ════════════ */}
      <section className="bg-[#FAF7F2] py-20 md:py-24">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <FadeInOnScroll>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 md:gap-12 pb-10 border-b border-[#2A2520]/12">
              <div className="max-w-[600px]">
                <p className="text-[10.5px] tracking-[0.32em] uppercase text-terracotta font-semibold font-sans mb-4">
                  For practitioners, clinics & brands
                </p>
                <h3 className="font-serif text-[28px] md:text-[36px] leading-[1.1] tracking-[-0.005em] text-[#2A2520]">
                  Join the Kamura network — reach high-intent UAE consumers
                  who&rsquo;ve already done their homework.
                </h3>
              </div>
              <Link
                href="/list-your-business"
                className="shrink-0 inline-flex items-center justify-center gap-2 h-[52px] px-7 rounded-full bg-[#2A2520] hover:bg-[#1A1612] text-white text-[14px] font-sans font-semibold transition-colors"
              >
                Become a partner
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
            </div>
          </FadeInOnScroll>
        </div>
      </section>

      {/* ════════════ FINAL CTA ════════════ */}
      <section className="bg-[#FAF7F2] pt-8 pb-24 md:pb-32">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <FadeInOnScroll>
            <div className="relative overflow-hidden rounded-3xl bg-[#2A2520] text-white px-8 md:px-16 py-20 md:py-24 text-center">
              <h2 className="font-serif text-[36px] md:text-[58px] leading-[1.05] tracking-[-0.012em] mb-6 max-w-[16ch] mx-auto">
                Be the <span className="italic text-[#D4B896]">tortoise</span>.
              </h2>
              <p className="text-[15.5px] md:text-[17px] leading-[1.6] text-white/70 max-w-[52ch] mx-auto mb-10 font-sans">
                Two minutes to see where you are. Years of compounding interest
                on what you do next.
              </p>
              <Link
                href="/wellness-checker"
                className="inline-flex items-center justify-center gap-2 h-[54px] px-8 rounded-full bg-[#C4A882] hover:bg-[#B59872] text-[#2A2520] text-[14.5px] font-sans font-semibold transition-colors"
              >
                Take the wellness check
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
            </div>
          </FadeInOnScroll>
        </div>
      </section>
    </>
  );
}
