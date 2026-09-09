import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, MapPin, Sparkles, ArrowRight } from "lucide-react";
import EmailWaitlist from "@/components/EmailWaitlist";

export const metadata: Metadata = {
  title: "Wellness Booking — Coming Soon to the UAE",
  description:
    "Sound healing, IV therapy, breathwork, longevity testing, and more — book trusted UAE wellness services in one place. Join the waitlist.",
  alternates: { canonical: "https://kamuralife.com/book/coming-soon" },
  openGraph: {
    title: "Wellness Booking — Coming Soon to the UAE",
    description:
      "Book trusted UAE wellness services in one place. Join the waitlist.",
    url: "https://kamuralife.com/book/coming-soon",
    type: "website",
  },
};

const TRUST = [
  {
    Icon: ShieldCheck,
    label: "Vetted practitioners",
    sub: "Every provider is reviewed before they make it onto Kamura.",
  },
  {
    Icon: MapPin,
    label: "Across the UAE",
    sub: "Dubai, Abu Dhabi, and growing — wherever you are.",
  },
  {
    Icon: Sparkles,
    label: "One place, every modality",
    sub: "Sound healing, IV, breathwork, recovery, movement, and more.",
  },
];

export default function BookComingSoon() {
  return (
    <>
      {/* Hero */}
      <section className="bg-[#FAFCF7] pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="max-w-3xl mx-auto px-6 md:px-8 text-center">
          <p className="text-[10.5px] tracking-[0.32em] uppercase text-terracotta font-semibold font-sans mb-5">
            Wellness Booking · UAE
          </p>
          <h1 className="font-serif text-[44px] md:text-[68px] leading-[1.04] tracking-[-0.015em] text-[#173C3B] mb-6">
            Coming soon to the UAE.
          </h1>
          <p className="text-[16px] md:text-[18px] leading-[1.6] text-[#173C3B]/70 font-sans mb-10 max-w-[58ch] mx-auto">
            Kamura is curating the UAE&rsquo;s most trusted wellness services
            — sound healing, IV therapy, breathwork, longevity testing, recovery,
            yoga, and more. Booking launches with our practitioner network.
          </p>

          <EmailWaitlist
            source="booking_waitlist"
            placeholder="you@example.com"
            cta="Join the waitlist"
            successMessage="You're on the booking waitlist. We'll let you know first."
          />

          <p className="mt-5 text-[12px] tracking-[0.12em] uppercase text-[#173C3B]/45">
            Launching with the UAE practitioner network
          </p>
        </div>
      </section>

      {/* Trust strip */}
      <section className="bg-[#E7F3EB] py-14 md:py-16 border-y border-[#173C3B]/8">
        <div className="max-w-5xl mx-auto px-6 md:px-8 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {TRUST.map(({ Icon, label, sub }) => (
            <div key={label} className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-white border border-[#173C3B]/10 grid place-items-center text-terracotta shrink-0">
                <Icon size={18} strokeWidth={1.8} />
              </div>
              <div>
                <h3 className="font-serif text-[17px] text-[#173C3B] mb-1.5 leading-snug">
                  {label}
                </h3>
                <p className="text-[13.5px] leading-[1.55] text-[#173C3B]/65 font-sans">
                  {sub}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Browse-now soft CTA */}
      <section className="bg-[#FAFCF7] py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-6 md:px-8 text-center">
          <p className="text-[14px] text-[#173C3B]/65 font-sans mb-5">
            Or browse the wellness services we&rsquo;ll be launching with —
          </p>
          <Link
            href="/explore"
            className="btn-hims inline-flex items-center gap-2 h-[46px] px-6 rounded-full bg-[#173C3B] hover:bg-[#1A1612] text-white text-[13.5px] font-sans font-semibold"
          >
            See the full list
            <ArrowRight size={14} strokeWidth={2} className="btn-hims-arrow" />
          </Link>
        </div>
      </section>
    </>
  );
}
