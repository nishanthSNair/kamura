import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Kamura — the heart of longevity. Inspired by the Japanese word for tortoise (Kame, 亀), we believe life should be lived slowly, intentionally, and fully.",
};

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1920&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 text-center text-white px-6">
          <h1 className="text-4xl md:text-6xl font-serif leading-tight">
            Kamura &mdash; Heart of Longevity
          </h1>
        </div>
      </section>

      {/* Story Section */}
      <section className="max-w-2xl mx-auto px-6 py-20 md:py-28">
        <div className="space-y-8">
          <div>
            <h2 className="font-serif text-2xl text-terracotta mb-6">
              Our Story
            </h2>
            <p className="text-gray-600 leading-relaxed font-sans">
              <span className="font-serif text-lg text-gray-800">Kame (亀)</span>{" "}
              in Japanese is the tortoise — a universal symbol of longevity,
              wisdom, and long life.{" "}
              <span className="font-serif text-lg text-gray-800">Ura</span> means
              heart.{" "}
              <span className="font-serif text-lg text-gray-800">Kamura</span> is
              the heart of longevity.
            </p>
          </div>

          <p className="text-gray-600 leading-relaxed font-sans">
            The tortoise lives slowly, intentionally, and for a very long time.
            That is how we believe life should be lived.
          </p>

          <div className="w-12 h-px bg-terracotta/40" />

          <div>
            <h2 className="font-serif text-2xl text-terracotta mb-6">
              Our Mission
            </h2>
            <p className="text-gray-600 leading-relaxed font-sans">
              We are building the go-to destination for discovering longevity
              practices, wellness experts, healing centers, and transformative
              events — starting in Dubai.
            </p>
          </div>

          <p className="text-gray-600 leading-relaxed font-sans">
            Whether you&apos;re exploring breathwork for the first time or
            searching for the best longevity clinic in the UAE, Kamura is your
            guide to living a longer, healthier, more intentional life.
          </p>
        </div>
      </section>
    </>
  );
}
