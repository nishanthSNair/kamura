import type { Metadata } from "next";
import Link from "next/link";
import { treatments } from "@/data/treatments";
import { listings } from "@/data/listings";
import InlineSearch from "@/components/InlineSearch";

export const metadata: Metadata = {
  title: "KAMURA — Every Wellness Treatment. Scored. Transparent.",
  description: `The world's first unbiased wellness intelligence platform. Search ${treatments.length}+ treatments scored on evidence, safety, and community data. ${listings.length}+ UAE clinics. Zero bias.`,
};

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: "KAMURA",
        url: "https://kamuralife.com",
        description:
          "The world's first unbiased wellness intelligence platform",
        sameAs: ["https://www.instagram.com/kamuralife/"],
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
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero — Full screen, search-focused */}
      <section className="relative min-h-[100svh] flex items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=1920&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#F7F5F0]/60 via-[#F7F5F0]/40 to-[#F7F5F0]/80 dark:from-[#0f120e]/70 dark:via-[#0f120e]/50 dark:to-[#0f120e]/85" />

        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center pt-24 pb-12">
          <span className="inline-block px-4 py-1.5 bg-sage/25 border border-sage/40 rounded-full text-[11px] font-semibold text-forest dark:text-sage uppercase tracking-[0.12em] mb-6 font-sans">
            The World&apos;s First Unbiased Wellness Intelligence Platform
          </span>

          <h1 className="font-serif text-4xl md:text-[52px] font-bold leading-[1.15] mb-5 text-gray-900 dark:text-[#F5F0EB]">
            Every Wellness Treatment.{" "}
            <span className="text-moss dark:text-sage">Scored.</span>{" "}
            Transparent.
          </h1>

          <p className="text-lg text-gray-600 dark:text-[#A89F95] max-w-[580px] mx-auto leading-relaxed font-sans mb-3">
            Search {treatments.length}+ treatments, {listings.length}+ clinics,
            and evidence-based articles — all scored on real data, not marketing.
          </p>

          <img
            src="/favicon-leaf.svg"
            alt=""
            className="w-8 h-8 mx-auto mb-8 opacity-60"
          />

          <InlineSearch
            placeholder="Search treatments, clinics, comparisons, or goals..."
            popularSearches={[
              "Best for Sleep",
              "NAD+ vs NMN",
              "Red Light",
              "Cryotherapy",
              "Best for Longevity",
              "Breathwork",
            ]}
          />

          {/* Live Stats */}
          <div className="flex justify-center gap-8 md:gap-14 mt-12">
            {[
              { value: `${treatments.length}+`, label: "Treatments Scored" },
              { value: `${listings.length}+`, label: "UAE Clinics" },
              { value: "100%", label: "Evidence-Based" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-serif text-2xl md:text-3xl text-gray-900 dark:text-[#F5F0EB]">
                  {stat.value}
                </p>
                <p className="text-[11px] uppercase tracking-[0.15em] text-gray-500 dark:text-[#6B6560] font-sans mt-1">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          {/* Quick Paths */}
          <div className="flex flex-col sm:flex-row justify-center gap-3 mt-10">
            {[
              {
                href: "/treatments",
                label: "Browse Treatments",
                icon: "\uD83D\uDD2C",
              },
              {
                href: "/blueprint",
                label: "Build Your Blueprint",
                icon: "\uD83E\uDDEC",
              },
              { href: "/quiz", label: "Take the Quiz", icon: "\uD83C\uDFAF" },
            ].map((path) => (
              <Link
                key={path.href}
                href={path.href}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-white/70 dark:bg-white/[0.06] backdrop-blur-sm border border-gray-200 dark:border-white/[0.1] rounded-xl text-sm font-sans text-gray-800 dark:text-[#F5F0EB] hover:bg-white dark:hover:bg-white/[0.12] hover:shadow-md transition-all"
              >
                <span>{path.icon}</span>
                {path.label}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
