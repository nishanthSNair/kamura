"use client";

const teaserCards = [
  {
    title: "Experts & Practitioners",
    description:
      "Find trusted wellness practitioners, longevity doctors, and holistic healers near you.",
  },
  {
    title: "Centers & Clinics",
    description:
      "Explore top-rated clinics, wellness centers, and healing spaces across the UAE.",
  },
  {
    title: "Events & Retreats",
    description:
      "Discover upcoming wellness events, retreats, workshops, and community gatherings.",
  },
];

export default function ExploreContent() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1448375240586-882707db888b?w=1920&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-black/45" />
        <div className="relative z-10 text-center text-white px-6 max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-serif mb-6 leading-tight">
            Discover Experts, Centers &amp; Events Near You
          </h1>
          <p className="text-lg text-white/85 leading-relaxed font-sans">
            We are curating the best longevity clinics, wellness practitioners,
            and healing spaces in the UAE. Launching soon.
          </p>
        </div>
      </section>

      {/* Email Signup */}
      <section className="max-w-xl mx-auto px-6 py-16 text-center">
        <h2 className="font-serif text-2xl text-gray-900 mb-4">
          Be the first to know
        </h2>
        <p className="text-sm text-gray-500 mb-8 font-sans">
          Enter your email and we&apos;ll notify you when Explore launches.
        </p>
        <form
          className="flex flex-col sm:flex-row gap-3"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="email"
            placeholder="your@email.com"
            className="flex-1 border border-gray-300 px-4 py-3 text-sm rounded-none focus:outline-none focus:border-terracotta transition-colors font-sans"
            required
          />
          <button
            type="submit"
            className="bg-gray-900 text-white px-6 py-3 text-sm tracking-[0.1em] uppercase hover:bg-terracotta transition-colors font-sans"
          >
            Submit
          </button>
        </form>
      </section>

      {/* Teaser Cards */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teaserCards.map((card) => (
            <div
              key={card.title}
              className="relative border border-gray-200 p-8 text-center"
            >
              <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] z-10 flex items-center justify-center">
                <span className="text-xs tracking-[0.2em] uppercase text-gray-400 font-sans">
                  Coming Soon
                </span>
              </div>
              <h3 className="font-serif text-xl text-terracotta mb-3">
                {card.title}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed font-sans">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
