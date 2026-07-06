import type { Metadata } from "next";
import Link from "next/link";
import CalculatorClient from "./CalculatorClient";

export const metadata: Metadata = {
  title: "Peptide Reconstitution Calculator — Doses, Units & Bacteriostatic Water | KAMURA",
  description:
    "Free peptide reconstitution calculator. Enter your vial size, bacteriostatic water and target dose to get exact insulin-syringe units, doses per vial and how long your vial lasts. Presets for BPC-157, TB-500, semaglutide, tirzepatide, CJC-1295 and more.",
  alternates: { canonical: "https://kamuralife.com/peptides/calculator" },
  openGraph: {
    title: "Peptide Reconstitution Calculator | KAMURA",
    description:
      "Exact syringe units for any peptide dose. Free presets for BPC-157, TB-500, semaglutide, tirzepatide and more.",
    url: "https://kamuralife.com/peptides/calculator",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Peptide Reconstitution Calculator | KAMURA",
    description:
      "Exact syringe units for any peptide dose — vial size, water, dose in, units out.",
  },
};

const FAQS = [
  {
    q: "How do I calculate peptide reconstitution?",
    a: "Divide the vial content (mg) by the bacteriostatic water you add (mL) to get concentration in mg/mL. Then divide your dose by that concentration to get the injection volume. On a U-100 insulin syringe, 1 unit = 0.01 mL, so multiply the volume in mL by 100 to get units. This calculator does all of that instantly.",
  },
  {
    q: "How much bacteriostatic water should I add to a 5 mg vial of BPC-157?",
    a: "A common choice is 2 mL, which makes 2.5 mg/mL. At that concentration a 250 mcg dose is exactly 10 units on an insulin syringe — an easy, accurate draw. More water means larger, easier-to-measure draws; less water means smaller ones.",
  },
  {
    q: "How many units is 250 mcg on an insulin syringe?",
    a: "It depends entirely on your concentration. At 2.5 mg/mL, 250 mcg is 10 units. At 5 mg/mL it's 5 units. Enter your vial size and water volume above to get your exact number.",
  },
  {
    q: "What syringe should I use for peptides?",
    a: "Most subcutaneous peptide doses are drawn with a U-100 insulin syringe (31g, 0.3–1 mL). The 0.3 mL (30-unit) size is easiest to read for small doses; the 1 mL (100-unit) size covers larger doses like TB-500 or tirzepatide.",
  },
  {
    q: "How long does a reconstituted peptide vial last?",
    a: "Once reconstituted with bacteriostatic water, most peptides remain stable refrigerated (2–8°C) for 3–4 weeks or more. The calculator shows how many doses your vial holds and how many days it covers at your frequency — if that exceeds ~4 weeks, consider a smaller vial or reconstituting half.",
  },
  {
    q: "Is this medical advice?",
    a: "No. This is a math tool and an educational reference. Peptides in the UAE and GCC should be prescribed by a licensed physician and dispensed by a licensed compounding pharmacy. Kamura helps you find regulated, pharmaceutical-grade routes — never grey-market vials.",
  },
];

export default function CalculatorPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  const appJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Peptide Reconstitution Calculator",
    url: "https://kamuralife.com/peptides/calculator",
    applicationCategory: "HealthApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    publisher: { "@type": "Organization", name: "Kamura", url: "https://kamuralife.com" },
  };

  return (
    <div className="bg-[#F7F3EB] min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(appJsonLd) }}
      />

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-28 md:pt-36 pb-10">
        <p className="text-[10px] tracking-[0.3em] uppercase text-terracotta font-sans font-semibold mb-3">
          Free tool · No sign-up required
        </p>
        <h1 className="font-serif text-4xl md:text-6xl text-gray-900 leading-[1.05] mb-4 max-w-3xl">
          Peptide Reconstitution Calculator
        </h1>
        <p className="text-base md:text-lg text-gray-500 font-sans max-w-2xl">
          Vial size, water, dose in — exact insulin-syringe units out. Plus how many doses your
          vial holds and how long it lasts, with presets for the most-used peptides.
        </p>
      </section>

      {/* Calculator */}
      <section className="max-w-6xl mx-auto px-6 pb-16">
        <CalculatorClient />
      </section>

      {/* How it works */}
      <section className="max-w-6xl mx-auto px-6 pb-16">
        <h2 className="font-serif text-2xl md:text-3xl text-gray-900 mb-8">
          The math, in three steps
        </h2>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            {
              n: "01",
              title: "Concentration",
              body: "Vial mg ÷ water mL = mg per mL. A 5 mg vial with 2 mL of bacteriostatic water is 2.5 mg/mL.",
            },
            {
              n: "02",
              title: "Draw volume",
              body: "Your dose ÷ concentration = mL to draw. A 250 mcg dose at 2.5 mg/mL is 0.1 mL.",
            },
            {
              n: "03",
              title: "Syringe units",
              body: "mL × 100 = units on a U-100 insulin syringe. 0.1 mL is 10 units — that's your line.",
            },
          ].map((s) => (
            <div key={s.n} className="p-6 bg-white rounded-3xl border border-gray-200">
              <p className="text-[10px] tracking-[0.3em] uppercase text-terracotta font-sans font-semibold mb-3">
                {s.n}
              </p>
              <h3 className="font-serif text-xl text-gray-900 mb-2">{s.title}</h3>
              <p className="text-sm text-gray-500 font-sans leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-6xl mx-auto px-6 pb-16">
        <h2 className="font-serif text-2xl md:text-3xl text-gray-900 mb-8">
          Reconstitution questions, answered
        </h2>
        <div className="space-y-3">
          {FAQS.map((f) => (
            <details
              key={f.q}
              className="group p-5 bg-white rounded-2xl border border-gray-200"
            >
              <summary className="cursor-pointer list-none flex items-center justify-between gap-4">
                <span className="font-sans font-medium text-sm md:text-base text-gray-900">
                  {f.q}
                </span>
                <span className="text-terracotta text-xl leading-none group-open:rotate-45 transition-transform">
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm text-gray-500 font-sans leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Next steps */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <div className="grid md:grid-cols-3 gap-4">
          <Link
            href="/peptides/directory"
            className="p-6 bg-white rounded-3xl border border-gray-200 hover:border-terracotta/40 hover:shadow-lg transition-all group"
          >
            <h3 className="font-serif text-lg text-gray-900 mb-1 group-hover:text-terracotta transition-colors">
              Peptide Directory →
            </h3>
            <p className="text-xs text-gray-500 font-sans">
              Every peptide scored on evidence, safety and GCC availability.
            </p>
          </Link>
          <Link
            href="/peptides/sourcing-guide"
            className="p-6 bg-white rounded-3xl border border-gray-200 hover:border-terracotta/40 hover:shadow-lg transition-all group"
          >
            <h3 className="font-serif text-lg text-gray-900 mb-1 group-hover:text-terracotta transition-colors">
              Sourcing Guide →
            </h3>
            <p className="text-xs text-gray-500 font-sans">
              Pharmaceutical vs. research grade, and what&apos;s legal in the UAE.
            </p>
          </Link>
          <Link
            href="/my"
            className="p-6 bg-[#2A2520] rounded-3xl hover:shadow-lg transition-all group"
          >
            <h3 className="font-serif text-lg text-white mb-1">Track your protocol →</h3>
            <p className="text-xs text-white/60 font-sans">
              Doses, vials, check-ins and real impact — free member portal.
            </p>
          </Link>
        </div>
        <p className="text-[11px] text-gray-400 font-sans mt-8 max-w-2xl">
          Educational tool only — not medical advice. Peptide therapy should be prescribed by a
          licensed physician and dispensed by a regulated pharmacy.
        </p>
      </section>
    </div>
  );
}
