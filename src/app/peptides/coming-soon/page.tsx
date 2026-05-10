import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, Truck, FlaskConical, ArrowRight } from "lucide-react";
import EmailWaitlist from "@/components/EmailWaitlist";

export const metadata: Metadata = {
  title: "Compounded Peptides — Coming Soon to the UAE",
  description:
    "Pharmaceutical-grade peptides prescribed by UAE-licensed physicians. BPC-157, GLP-1, NAD+, and more. Be first when we launch.",
  alternates: { canonical: "https://kamuralife.com/peptides/coming-soon" },
  openGraph: {
    title: "Compounded Peptides — Coming Soon to the UAE",
    description:
      "Pharmaceutical-grade peptides prescribed by UAE-licensed physicians. Join the waitlist.",
    url: "https://kamuralife.com/peptides/coming-soon",
    type: "website",
  },
};

const TRUST = [
  {
    Icon: ShieldCheck,
    label: "UAE-licensed physicians",
    sub: "Every Rx reviewed by a DHA-registered doctor.",
  },
  {
    Icon: FlaskConical,
    label: "Pharmacy-grade compounding",
    sub: "Sourced through our equity-partnered IV compounding pharmacy.",
  },
  {
    Icon: Truck,
    label: "Discreet home delivery",
    sub: "48 hours, across the UAE.",
  },
];

export default function PeptidesComingSoon() {
  return (
    <>
      {/* Hero */}
      <section className="bg-[#FAF7F2] pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="max-w-3xl mx-auto px-6 md:px-8 text-center">
          <p className="text-[10.5px] tracking-[0.32em] uppercase text-terracotta font-semibold font-sans mb-5">
            Pharmaceutical-grade · UAE
          </p>
          <h1 className="font-serif text-[44px] md:text-[68px] leading-[1.04] tracking-[-0.015em] text-[#2A2520] mb-6">
            Coming soon to the UAE.
          </h1>
          <p className="text-[16px] md:text-[18px] leading-[1.6] text-[#2A2520]/70 font-sans mb-10 max-w-[58ch] mx-auto">
            We&rsquo;re building peptide therapy with UAE-licensed physicians and
            a trusted compounding partner — BPC-157, GLP-1, NAD+, and more. Be
            first when we launch.
          </p>

          <EmailWaitlist
            source="peptide_waitlist"
            placeholder="you@example.com"
            cta="Join the waitlist"
            successMessage="You're on the peptide waitlist. We'll be in touch before launch."
          />

          <p className="mt-5 text-[12px] tracking-[0.12em] uppercase text-[#2A2520]/45">
            Early access · Q3 2026
          </p>
        </div>
      </section>

      {/* Trust strip */}
      <section className="bg-[#EDE7DB] py-14 md:py-16 border-y border-[#2A2520]/8">
        <div className="max-w-5xl mx-auto px-6 md:px-8 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {TRUST.map(({ Icon, label, sub }) => (
            <div key={label} className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-white border border-[#2A2520]/10 grid place-items-center text-terracotta shrink-0">
                <Icon size={18} strokeWidth={1.8} />
              </div>
              <div>
                <h3 className="font-serif text-[17px] text-[#2A2520] mb-1.5 leading-snug">
                  {label}
                </h3>
                <p className="text-[13.5px] leading-[1.55] text-[#2A2520]/65 font-sans">
                  {sub}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Browse-now soft CTA */}
      <section className="bg-[#FAF7F2] py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-6 md:px-8 text-center">
          <p className="text-[14px] text-[#2A2520]/65 font-sans mb-5">
            Or explore what&rsquo;s available now —
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/peptides/what-is-a-peptide"
              className="btn-hims inline-flex items-center gap-2 h-[46px] px-6 rounded-full bg-[#2A2520] hover:bg-[#1A1612] text-white text-[13.5px] font-sans font-semibold"
            >
              What is a peptide?
              <ArrowRight size={14} strokeWidth={2} className="btn-hims-arrow" />
            </Link>
            <Link
              href="/treatments"
              className="btn-hims inline-flex items-center gap-2 h-[46px] px-6 rounded-full border border-[#2A2520]/15 hover:border-[#2A2520]/40 text-[#2A2520] text-[13.5px] font-sans font-semibold"
            >
              Browse the treatment library
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
