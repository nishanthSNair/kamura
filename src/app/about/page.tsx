import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About KAMURA — Longevity & Wellness Platform in Dubai",
  description:
    "KAMURA is Dubai's longevity & wellness discovery platform. Inspired by the Japanese tortoise (Kame, 亀), we curate clinics, studios, and retreats across the UAE.",
  openGraph: {
    title: "About KAMURA",
    description:
      "Dubai's longevity & wellness discovery platform. Inspired by the Japanese tortoise (Kame, 亀).",
    url: "https://kamuralife.com/about",
    images: [
      {
        url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&h=630&fit=crop",
        width: 1200,
        height: 630,
        alt: "About KAMURA — Heart of Longevity",
      },
    ],
  },
};

export default function AboutPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: "KAMURA",
        url: "https://kamuralife.com",
        description:
          "The world's first unbiased wellness intelligence platform. Evidence-based treatment scoring, clinic discovery, and longevity resources.",
        foundingDate: "2024",
        areaServed: {
          "@type": "Place",
          name: "United Arab Emirates",
        },
        email: "kamuralife@gmail.com",
        sameAs: ["https://www.instagram.com/kamaborea/"],
      },
      {
        "@type": "AboutPage",
        name: "About KAMURA",
        url: "https://kamuralife.com/about",
        description:
          "KAMURA is Dubai's longevity & wellness discovery platform. Inspired by the Japanese tortoise (Kame, 亀).",
        mainEntity: {
          "@type": "Organization",
          name: "KAMURA",
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://kamuralife.com" },
          { "@type": "ListItem", position: 2, name: "About" },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1920&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-forest/50 via-black/20 to-forest/40" />
        <div className="relative z-10 text-center text-white px-6">
          <h1 className="text-4xl md:text-6xl font-serif leading-tight">
            Kamura &mdash; Heart of Longevity
          </h1>
        </div>
      </section>

      {/* Story Section */}
      <section className="max-w-2xl mx-auto px-6 py-20 md:py-28 zen-pattern">
        <div className="space-y-8">
          <div>
            <h2 className="font-serif text-2xl text-terracotta mb-6">
              Our Story
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-sans">
              <span className="font-serif text-lg text-gray-800 dark:text-gray-200">Kame (亀)</span>{" "}
              in Japanese is the tortoise — a universal symbol of longevity,
              wisdom, and long life.{" "}
              <span className="font-serif text-lg text-gray-800 dark:text-gray-200">Ura</span> means
              heart.{" "}
              <span className="font-serif text-lg text-gray-800 dark:text-gray-200">Kamura</span> is
              the heart of longevity.
            </p>
          </div>

          <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-sans">
            The tortoise lives slowly, intentionally, and for a very long time.
            That is how we believe life should be lived.
          </p>

          <div className="w-12 h-px bg-sage/40" />

          <div>
            <h2 className="font-serif text-2xl text-terracotta mb-6">
              Our Mission
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-sans">
              We are building the go-to destination for discovering longevity
              practices, wellness experts, healing centers, and transformative
              events — starting in Dubai.
            </p>
          </div>

          <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-sans">
            Whether you&apos;re exploring breathwork for the first time or
            searching for the best longevity clinic in the UAE, Kamura is your
            guide to living a longer, healthier, more intentional life.
          </p>

          <div className="w-12 h-px bg-sage/40" />

          <div>
            <h2 className="font-serif text-2xl text-terracotta mb-6">
              Get in Touch
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-sans">
              Have a question, partnership inquiry, or just want to say hello?
            </p>
            <a
              href="mailto:kamuralife@gmail.com"
              className="inline-block mt-4 text-moss dark:text-sage hover:text-forest dark:hover:text-white transition-colors font-sans font-medium"
            >
              kamuralife@gmail.com
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
