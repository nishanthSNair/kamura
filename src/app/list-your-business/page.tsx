import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
 title: "List Your Business — Join the KAMURA Wellness Directory",
 description:
 "List your clinic, studio, or wellness practice on KAMURA. Reach thousands of wellness consumers across the UAE. Get discovered, fill appointments, and grow your revenue.",
 keywords: [
 "list wellness business",
 "wellness directory UAE",
 "list clinic Dubai",
 "wellness provider listing",
 "longevity clinic listing",
 "peptide clinic directory",
 ],
 alternates: { canonical: "https://kamuralife.com/list-your-business" },
 openGraph: {
 title: "List Your Business | KAMURA",
 description: "Reach thousands of wellness consumers across the UAE.",
 url: "https://kamuralife.com/list-your-business",
 },
};

const BENEFITS = [
 {
 icon: "\uD83D\uDCCA",
 title: "Get Discovered",
 desc: "Appear in front of thousands of health-conscious consumers actively searching for treatments and clinics in the UAE.",
 },
 {
 icon: "\uD83D\uDCC5",
 title: "Fill Your Calendar",
 desc: "Consumers can find your clinic directly from treatment pages, wellness check results, and protocol recommendations.",
 },
 {
 icon: "\u2B50",
 title: "Build Trust",
 desc: "Your listing includes services, location, contact info, and appears alongside Kamura-scored treatments — instant credibility.",
 },
 {
 icon: "\uD83D\uDCB0",
 title: "Grow Revenue",
 desc: "Connect with high-intent consumers who are already researching treatments and ready to book.",
 },
];

const jsonLd = {
 "@context": "https://schema.org",
 "@graph": [
 {
  "@type": "WebPage",
  name: "List Your Business on KAMURA",
  url: "https://kamuralife.com/list-your-business",
  description:
  "List your clinic, studio, or wellness practice on KAMURA. Reach thousands of wellness consumers across the UAE.",
  isPartOf: { "@type": "WebSite", name: "KAMURA", url: "https://kamuralife.com" },
 },
 {
  "@type": "BreadcrumbList",
  itemListElement: [
  { "@type": "ListItem", position: 1, name: "Home", item: "https://kamuralife.com" },
  { "@type": "ListItem", position: 2, name: "List Your Business" },
  ],
 },
 ],
};

export default function ListYourBusinessPage() {
 return (
 <>
  <script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
  />
  {/* Hero */}
  <section className="pt-32 pb-16 md:pt-40 md:pb-20 bg-[#EDE7DB]">
  <div className="max-w-4xl mx-auto px-6 text-center">
   <p className="text-xs tracking-[0.3em] uppercase mb-4 text-terracotta font-sans">
   For Providers
   </p>
   <h1 className="font-serif text-3xl md:text-5xl text-gray-900 mb-4 leading-tight">
   List Your Business on KAMURA
   </h1>
   <p className="text-base md:text-lg text-gray-600 font-sans max-w-[600px] mx-auto leading-relaxed">
   Join the GCC&apos;s leading wellness platform. Reach consumers who are actively
   discovering treatments, building protocols, and looking for vetted providers.
   </p>
  </div>
  </section>

  {/* Benefits */}
  <section className="py-16 md:py-20">
  <div className="max-w-6xl mx-auto px-6">
   <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
   {BENEFITS.map((b) => (
    <div
    key={b.title}
    className="p-6 rounded-2xl border border-gray-200 bg-white"
    >
    <span className="text-3xl block mb-3">{b.icon}</span>
    <h3 className="font-serif text-lg text-gray-900 mb-2">{b.title}</h3>
    <p className="text-sm text-gray-600 font-sans leading-relaxed">{b.desc}</p>
    </div>
   ))}
   </div>
  </div>
  </section>

  {/* Who Can List */}
  <section className="py-16 md:py-20 bg-[#EDE7DB]">
  <div className="max-w-4xl mx-auto px-6 text-center">
   <h2 className="font-serif text-2xl md:text-3xl text-gray-900 mb-8">
   Who Can List?
   </h2>
   <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
   {[
    "Longevity Clinics",
    "Peptide Therapy Providers",
    "Biohacking Studios",
    "Yoga & Movement Studios",
    "Wellness Retreats & Spas",
    "Nutrition Consultants",
    "IV Drip Clinics",
    "Holistic Healers",
    "Functional Medicine",
    "Fitness Studios & Gyms",
    "Sports Recovery Centers",
    "Diagnostic Labs",
   ].map((type) => (
    <div
    key={type}
    className="px-4 py-3 rounded-xl border border-gray-200/60 bg-white text-sm font-sans text-gray-700"
    >
    {type}
    </div>
   ))}
   </div>
  </div>
  </section>

  {/* CTA — Contact Form */}
  <section className="py-16 md:py-20">
  <div className="max-w-2xl mx-auto px-6 text-center">
   <h2 className="font-serif text-2xl md:text-3xl text-gray-900 mb-3">
   Get Listed Today
   </h2>
   <p className="text-sm text-gray-500 font-sans mb-8">
   Create your free account in 60 seconds. Add your services, set your
   availability, and start accepting bookings.
   </p>
   <Link
   href="/provider/signup"
   className="inline-block px-8 py-3.5 bg-terracotta hover:bg-terracotta-dark text-white text-sm font-sans font-semibold rounded-xl transition-colors"
   >
   Create Your Free Account
   </Link>
   <p className="text-xs text-gray-400 font-sans mt-4">
   Already registered?{" "}
   <Link href="/provider/login" className="text-terracotta hover:underline">
    Sign in to your dashboard
   </Link>
   </p>
  </div>
  </section>

  {/* Already Listed? */}
  <section className="border-t border-gray-200">
  <div className="max-w-4xl mx-auto px-6 py-12 text-center">
   <p className="text-sm text-gray-500 font-sans">
   Already in our directory?{" "}
   <Link href="/explore" className="text-terracotta hover:underline">
    View the Explore directory
   </Link>
   </p>
  </div>
  </section>
 </>
 );
}
