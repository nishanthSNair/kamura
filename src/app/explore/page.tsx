import type { Metadata } from "next";
import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";
import EmailWaitlist from "@/components/EmailWaitlist";

/**
 * /explore — wellness services landing page.
 *
 * The clinic directory was archived (Kamura is repositioning as a free utility
 * + media platform until pharmacy + booking infrastructure is signed). This
 * page now showcases the *categories* of wellness services Kamura will
 * eventually surface — each with a "Get notified when this is available near
 * you" waitlist instead of a real booking link.
 *
 * Real treatment library lives at /treatments. This page is the soft-funnel
 * for service-type intent ("where can I get sound healing in Dubai?").
 */

export const metadata: Metadata = {
  title: "Wellness Services — Coming Soon to Kamura",
  description:
    "Sound healing, IV therapy, breathwork, cryotherapy, red light therapy, and more — Kamura is curating the UAE's most trusted wellness services. Get notified when booking goes live.",
  keywords: [
    "wellness services UAE",
    "sound healing Dubai",
    "IV therapy Dubai",
    "breathwork Dubai",
    "cryotherapy Dubai",
    "red light therapy Dubai",
    "wellness booking UAE",
  ],
  alternates: { canonical: "https://kamuralife.com/explore" },
  openGraph: {
    title: "Wellness Services — Coming Soon to Kamura",
    description:
      "Curated wellness services across the UAE. Booking launches with our DHA-registered partner network.",
    url: "https://kamuralife.com/explore",
    type: "website",
  },
};

type Service = {
  slug: string;
  name: string;
  blurb: string;
};

const SERVICES: Service[] = [
  { slug: "sound-healing",        name: "Sound Healing",        blurb: "Tibetan bowls, gongs, and breath. Nervous-system reset." },
  { slug: "iv-therapy",           name: "IV Therapy",           blurb: "NAD+, glutathione, vitamin drips, and bespoke formulations." },
  { slug: "breathwork",           name: "Breathwork",           blurb: "Holotropic, Wim Hof, and somatic breath practices." },
  { slug: "cryotherapy",          name: "Cryotherapy",          blurb: "Whole-body cold exposure for recovery and inflammation." },
  { slug: "red-light-therapy",    name: "Red Light Therapy",    blurb: "Photobiomodulation for skin, recovery, and mitochondria." },
  { slug: "infrared-sauna",       name: "Infrared Sauna",       blurb: "Heat therapy for circulation, detox, and longevity." },
  { slug: "hyperbaric-oxygen",    name: "Hyperbaric Oxygen",    blurb: "Pressurized oxygen for healing and cellular repair." },
  { slug: "yoga-pilates",         name: "Yoga & Pilates",       blurb: "Mat, reformer, and movement studios across the UAE." },
  { slug: "longevity-testing",    name: "Longevity Testing",    blurb: "Bloodwork panels, biological age, and full-body scans." },
  { slug: "cold-plunge",          name: "Cold Plunge",          blurb: "Contrast therapy and ice-bath protocols." },
  { slug: "ayurveda",             name: "Ayurveda",             blurb: "Traditional Indian medicine, panchakarma, and herbal protocols." },
  { slug: "functional-medicine",  name: "Functional Medicine",  blurb: "Root-cause practitioners — gut, hormones, autoimmune." },
];

export default function Explore() {
  return (
    <>
      {/* Hero */}
      <section className="bg-[#FAF7F2] pt-32 pb-12 md:pt-40 md:pb-16 border-b border-[#2A2520]/8">
        <div className="max-w-5xl mx-auto px-6 md:px-8">
          <p className="text-[10.5px] tracking-[0.32em] uppercase text-terracotta font-semibold font-sans mb-5">
            Wellness Services · Coming Soon
          </p>
          <h1 className="font-serif text-[40px] md:text-[64px] leading-[1.05] tracking-[-0.015em] text-[#2A2520] mb-6 max-w-[18ch]">
            Find your practice.
          </h1>
          <p className="text-[16px] md:text-[19px] leading-[1.55] text-[#2A2520]/70 font-sans max-w-[640px]">
            Kamura is curating the UAE&rsquo;s most trusted wellness services — sound
            healing, IV therapy, breathwork, longevity testing, and more.
            Booking launches with our DHA-registered partner network. Pick the
            services you&rsquo;re interested in and we&rsquo;ll let you know
            first.
          </p>
        </div>
      </section>

      {/* Services grid */}
      <section className="bg-[#FAF7F2] py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {SERVICES.map((s) => (
              <Link
                key={s.slug}
                href="/book/coming-soon"
                className="btn-hims-card group relative block p-7 md:p-8 rounded-2xl bg-white border border-[#2A2520]/8 hover:border-[#2A2520]/25"
                data-image-slot={`service-${s.slug}`}
              >
                <div className="w-10 h-10 rounded-xl bg-[#B5736A]/14 text-[#B5736A] grid place-items-center mb-5">
                  <Sparkles size={18} strokeWidth={1.8} />
                </div>
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h2 className="font-serif text-[22px] md:text-[24px] leading-[1.2] tracking-[-0.005em] text-[#2A2520] m-0">
                    {s.name}
                  </h2>
                  <span className="shrink-0 inline-flex items-center h-[20px] px-2 rounded-full text-[9px] font-semibold tracking-[0.1em] uppercase bg-[#C4A882]/15 border border-[#C4A882]/40 text-[#9A5F57]">
                    Soon
                  </span>
                </div>
                <p className="text-[13.5px] leading-[1.55] text-[#2A2520]/65 font-sans mb-6">
                  {s.blurb}
                </p>
                <span className="inline-flex items-center gap-1.5 text-[11.5px] tracking-[0.18em] uppercase text-[#2A2520] font-sans font-semibold">
                  Where to get this
                  <ArrowRight size={13} strokeWidth={2} className="btn-hims-arrow" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Single-shot waitlist below grid */}
      <section className="bg-[#EDE7DB] py-16 md:py-20 border-y border-[#2A2520]/8">
        <div className="max-w-3xl mx-auto px-6 md:px-8 text-center">
          <p className="text-[10.5px] tracking-[0.32em] uppercase text-terracotta font-semibold font-sans mb-4">
            Get notified
          </p>
          <h2 className="font-serif text-[28px] md:text-[40px] leading-[1.1] tracking-[-0.01em] text-[#2A2520] mb-4 max-w-[20ch] mx-auto">
            Be first when booking goes live.
          </h2>
          <p className="text-[14.5px] md:text-[15.5px] leading-[1.6] text-[#2A2520]/70 font-sans mb-8 max-w-[52ch] mx-auto">
            One email when each service launches — no spam, no marketing
            blasts. Just the news.
          </p>
          <EmailWaitlist source="booking_waitlist" placeholder="you@example.com" cta="Notify me" />
        </div>
      </section>
    </>
  );
}
