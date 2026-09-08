import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { treatments } from "@/data/treatments";
import FadeInOnScroll from "@/components/FadeInOnScroll";
import HeroEditorial from "@/components/home/HeroEditorial";
import Manifesto from "@/components/home/Manifesto";
import PillarsSection from "@/components/home/PillarsSection";
import SectionDivider from "@/components/home/SectionDivider";
import EmailWaitlist from "@/components/EmailWaitlist";
import WaitlistPopup from "@/components/WaitlistPopup";

export const metadata: Metadata = {
  title: "KAMURA — Heart of Longevity",
  description: `Compounded peptides. Vetted UAE practitioners. Your health record. One curated home for the long game — by invitation. ${treatments.length}+ wellness treatments scored.`,
  keywords: [
    "preventive medicine UAE",
    "compounded peptides Dubai",
    "longevity platform GCC",
    "peptide therapy UAE",
    "wellness platform Dubai",
    "Kamura Score",
    "evidence-based wellness",
    "find wellness clinic UAE",
    "longitudinal health record",
    "luxury wellness UAE",
  ],
  alternates: { canonical: "https://kamuralife.com" },
  openGraph: {
    title: "KAMURA — Heart of Longevity",
    description:
      "Compounded peptides. Vetted UAE practitioners. Your health record. One curated home for the long game — by invitation.",
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
    title: "KAMURA — Heart of Longevity",
    description:
      "Compounded peptides. Vetted practitioners. Your health record. One curated home for the long game.",
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

      {/* Waitlist capture popup — fires 8s after landing, once/session,
          30-day dismissal memory, vanishes forever once submitted. */}
      <WaitlistPopup storageKey="kamura.popup.home" source="peptide_waitlist" />

      {/* ════════════ ACT 1 — EDITORIAL HERO + 5-DOOR FLOATING DOCK ════════════ */}
      <HeroEditorial />

      {/* ════════════ ACT 1.25 — THE BODY ATLAS (flagship feature) ════════════ */}
      <section id="body-atlas" className="bg-[#FAF7F2] py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <FadeInOnScroll>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 md:gap-12 mb-10 md:mb-12">
              <div className="max-w-[620px]">
                <p className="text-[10.5px] tracking-[0.32em] uppercase text-terracotta font-semibold font-sans mb-4">
                  New · The Body Atlas
                </p>
                <h2 className="font-serif text-[34px] md:text-[52px] leading-[1.05] tracking-[-0.012em] text-[#2A2520] mb-5">
                  Explore the body,{" "}
                  <span className="italic text-terracotta">connected</span>.
                </h2>
                <p className="text-[15.5px] md:text-[17px] leading-[1.65] text-[#2A2520]/70 font-sans">
                  Real 3D anatomy — 2,234 individual structures from open
                  science. Select a peptide or hormone therapy, see exactly
                  where it acts in the body, walk its mechanism, and read the
                  linked research behind it.
                </p>
              </div>
              <div className="flex flex-col items-start gap-4 shrink-0">
                <Link
                  href="/body"
                  className="btn-hims inline-flex items-center justify-center gap-2 h-[52px] px-7 rounded-full bg-[#2A2520] hover:bg-[#1A1612] text-white text-[14px] font-sans font-semibold"
                >
                  Explore the body
                  <span className="btn-hims-arrow">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </span>
                </Link>
                <Link
                  href="/supplements"
                  className="text-[13.5px] font-sans font-semibold text-terracotta underline underline-offset-4 decoration-terracotta/30 hover:decoration-terracotta transition-colors"
                >
                  Also new: the Supplement Report Card →
                </Link>
              </div>
            </div>
          </FadeInOnScroll>

          <FadeInOnScroll delay={100}>
            <Link
              href="/body"
              aria-label="Open the interactive body explorer"
              className="group block overflow-hidden rounded-3xl border border-[#2A2520]/10 shadow-[0_2px_10px_rgba(42,37,32,0.05),0_24px_60px_rgba(42,37,32,0.10)] transition-shadow hover:shadow-[0_2px_10px_rgba(42,37,32,0.07),0_28px_70px_rgba(42,37,32,0.16)]"
            >
              <Image
                src="/images/body-atlas-preview.jpg"
                alt="The Kamura body explorer — interactive 3D anatomy with therapy mechanisms and linked research"
                width={1600}
                height={1000}
                priority={false}
                className="w-full h-auto transition-transform duration-500 group-hover:scale-[1.01]"
              />
            </Link>
          </FadeInOnScroll>

          <FadeInOnScroll delay={150}>
            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
              {[
                "2,234 anatomical structures",
                "28 therapies mapped",
                "Research linked to every therapy",
                "Built on open science",
              ].map((s) => (
                <span
                  key={s}
                  className="text-[10.5px] tracking-[0.25em] uppercase text-[#2A2520]/55 font-sans font-medium"
                >
                  {s}
                </span>
              ))}
            </div>
          </FadeInOnScroll>
        </div>
      </section>

      {/* ──── chapter divider ──── */}
      <SectionDivider bg="#FAF7F2" />

      {/* ════════════ ACT 1.5 — MANIFESTO ════════════ */}
      <Manifesto />

      {/* ──── chapter divider ──── */}
      <SectionDivider bg="#FAF7F2" />

      {/* ════════════ ACT 1.75 — FOUR PILLARS ════════════ */}
      <PillarsSection />

      {/* ──── chapter divider ──── */}
      <SectionDivider bg="#EDE7DB" />

      {/* ════════════ ACT 2 — TRUST + STATS BAND ════════════ */}
      <section className="bg-[#EDE7DB] py-12 md:py-16 border-y border-[#2A2520]/8">
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

      {/* ════════════ ACT 3 — HOW IT WORKS ════════════ */}
      <section
        id="how-it-works"
        className="bg-[#F5F2ED] py-20 md:py-24 border-y border-[#2A2520]/8"
      >
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <FadeInOnScroll>
            <div className="max-w-[640px] mb-12 md:mb-14">
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

      {/* ════════════ ACT 4 — PEPTIDE HORIZON (commerce, coming soon) ════════════ */}
      <section className="bg-[#FAF7F2] py-20 md:py-24">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <FadeInOnScroll>
            <div
              className="relative overflow-hidden rounded-3xl bg-[#2A2520] text-white px-8 md:px-16 py-20 md:py-24"
              data-image-slot="peptide-horizon-bg"
            >
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
                <p className="text-[15.5px] md:text-[17px] leading-[1.6] text-white/70 mb-8 max-w-[58ch] font-sans">
                  BPC-157, GLP-1, NAD+, and more — sourced through our
                  equity-partnered IV compounding pharmacy, prescribed via our
                  DHA-registered homecare partner. Async consultation, 48-hour
                  delivery.
                </p>

                <p className="text-[11px] tracking-[0.22em] uppercase text-[#C4A882] font-semibold font-sans mb-4">
                  Be the first to get notified
                </p>
                <div className="max-w-[480px]">
                  <EmailWaitlist
                    source="peptide_waitlist"
                    theme="dark"
                    placeholder="you@example.com"
                    cta="Join waitlist"
                    successMessage="You're on the peptide waitlist. We'll be in touch before launch."
                    className="!mx-0"
                  />
                </div>

                <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 text-[12.5px] text-white/55 font-sans">
                  <Link
                    href="/peptides/what-is-a-peptide"
                    className="underline underline-offset-4 decoration-white/30 hover:text-white hover:decoration-white/60 transition-colors"
                  >
                    What is a peptide?
                  </Link>
                  <Link
                    href="/peptides"
                    className="underline underline-offset-4 decoration-white/30 hover:text-white hover:decoration-white/60 transition-colors"
                  >
                    Read the full launch plan →
                  </Link>
                </div>
              </div>
            </div>
          </FadeInOnScroll>
        </div>
      </section>

      {/* ════════════ ACT 5 — WHY KAMURA (brand close) ════════════ */}
      <section
        className="bg-[#EDE7DB] py-20 md:py-24 border-y border-[#2A2520]/8"
        data-image-slot="why-kamura-bg"
      >
        <div className="max-w-5xl mx-auto px-6 md:px-8 text-center">
          <FadeInOnScroll>
            <p className="text-[10.5px] tracking-[0.32em] uppercase text-terracotta font-semibold font-sans mb-6">
              Why Kamura
            </p>
            <h2 className="font-serif text-[36px] md:text-[58px] leading-[1.05] tracking-[-0.012em] text-[#2A2520] mb-8 max-w-[18ch] mx-auto">
              The platform for people who play the long game.
            </h2>
            <p className="text-[16px] md:text-[18px] leading-[1.7] text-[#2A2520]/70 max-w-[68ch] mx-auto font-sans">
              Kamura — from the Japanese{" "}
              <em className="text-[#2A2520]">kame</em> (tortoise, longevity) and{" "}
              <em className="text-[#2A2520]">ura</em> (heart). The tortoise wins
              not by speed, but by consistency. Our platform is built for the
              same audience: adults who choose preventive medicine over
              reactive care, and evidence over algorithms.
            </p>
          </FadeInOnScroll>
        </div>
      </section>

      {/* ════════════ ACT 6 — PARTNER STRIP (B2B, soft footer) ════════════ */}
      <section className="bg-[#FAF7F2] py-16 md:py-20" data-image-slot="partner-bg">
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
                className="btn-hims shrink-0 inline-flex items-center justify-center gap-2 h-[52px] px-7 rounded-full bg-[#2A2520] hover:bg-[#1A1612] text-white text-[14px] font-sans font-semibold"
              >
                Become a partner
                <span className="btn-hims-arrow">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </span>
              </Link>
            </div>
          </FadeInOnScroll>
        </div>
      </section>
    </>
  );
}
