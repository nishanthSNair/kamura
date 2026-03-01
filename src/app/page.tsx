import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "KAMURA — Heart of Longevity & Wellness",
  description:
    "Discover the practices, places, and people transforming wellness in Dubai and beyond. Longevity clinics, holistic healing, breathwork, and more.",
};

const blogPosts = [
  {
    slug: "what-is-sound-healing",
    date: "March 2026",
    title: "What is Sound Healing? Everything You Need to Know",
    excerpt:
      "From Tibetan singing bowls to gong baths, sound healing is becoming one of the most sought-after wellness modalities in Dubai. Here's what you need to know before your first session.",
  },
  {
    slug: "top-10-longevity-clinics-dubai",
    date: "March 2026",
    title: "Top 10 Longevity Clinics in Dubai 2026",
    excerpt:
      "Dubai is fast becoming a global hub for longevity medicine. We've curated the best clinics offering cutting-edge treatments from NAD+ therapy to full-body diagnostics.",
  },
  {
    slug: "what-is-breathwork",
    date: "February 2026",
    title: "What is Breathwork and Why Is Everyone Talking About It?",
    excerpt:
      "Breathwork has exploded in popularity — and for good reason. We explore the science behind conscious breathing and how it's transforming mental and physical health.",
  },
  {
    slug: "best-holistic-wellness-abu-dhabi",
    date: "February 2026",
    title: "Best Holistic Wellness Centers in Abu Dhabi",
    excerpt:
      "Abu Dhabi is home to some of the UAE's most beautiful wellness spaces. From Ayurvedic retreats to integrative health centers, here are our top picks.",
  },
  {
    slug: "what-is-peptide-therapy",
    date: "February 2026",
    title: "What is Peptide Therapy? A Beginner's Guide",
    excerpt:
      "Peptide therapy is gaining traction in the longevity space. Learn what peptides are, how they work, and why biohackers and health enthusiasts are paying attention.",
  },
  {
    slug: "wellness-trends-dubai-2026",
    date: "January 2026",
    title: "Top Wellness Trends in Dubai for 2026",
    excerpt:
      "From cold plunge pools to AI-driven health diagnostics, Dubai's wellness scene is evolving fast. Here are the trends shaping how we live, heal, and thrive this year.",
  },
];

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 text-center text-white px-6 max-w-3xl">
          <p className="text-xs tracking-[0.3em] uppercase mb-6 text-white/80">
            Heart of Longevity &amp; Wellness
          </p>
          <h1 className="text-5xl md:text-7xl font-serif mb-6 leading-tight">
            Be the Tortoise
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-10 leading-relaxed font-sans">
            Discover the practices, places, and people transforming wellness in
            Dubai and beyond.
          </p>
          <Link
            href="#blog"
            className="inline-block border border-white/70 text-white px-8 py-3 text-sm tracking-[0.15em] uppercase hover:bg-white hover:text-gray-900 transition-all duration-300 font-sans"
          >
            Start Exploring
          </Link>
        </div>
      </section>

      {/* Blog Grid Section */}
      <section id="blog" className="max-w-6xl mx-auto px-6 py-20 md:py-28">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-14">
          {blogPosts.map((post) => (
            <article key={post.slug}>
              <p className="text-xs text-gray-400 tracking-wide uppercase mb-3">
                {post.date}
              </p>
              <h2 className="font-serif text-xl text-terracotta leading-snug mb-3">
                <Link href={`/blog/${post.slug}`} className="hover:text-terracotta-dark transition-colors">
                  {post.title}
                </Link>
              </h2>
              <p className="text-sm text-gray-500 leading-relaxed mb-4 font-sans">
                {post.excerpt}
              </p>
              <Link
                href={`/blog/${post.slug}`}
                className="text-sm text-gray-800 underline underline-offset-4 hover:text-terracotta transition-colors font-sans"
              >
                Read More
              </Link>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
