import FadeInOnScroll from "@/components/FadeInOnScroll";

export default function Manifesto() {
  return (
    <section
      id="manifesto"
      className="bg-[#F5EFE6] py-24 md:py-36 border-y border-[#2A2520]/6"
    >
      <div className="max-w-[680px] mx-auto px-6 md:px-8 text-center">
        <FadeInOnScroll>
          <p className="text-[10.5px] tracking-[0.32em] uppercase text-terracotta font-semibold font-sans mb-8">
            The Manifesto
          </p>
        </FadeInOnScroll>

        <FadeInOnScroll delay={80}>
          <h2
            className="font-serif text-[#2A2520] leading-[1.04] tracking-[-0.02em] mb-12 md:mb-14"
            style={{ fontSize: "clamp(48px, 6.4vw, 84px)" }}
          >
            Be the <i className="italic text-terracotta">tortoise.</i>
          </h2>
        </FadeInOnScroll>

        <FadeInOnScroll delay={160}>
          <div className="space-y-7 text-[16.5px] md:text-[18px] text-[#2A2520]/75 font-sans leading-[1.78]">
            <p>
              The wellness industry runs on urgency. Kamura runs on its
              opposite.
            </p>
            <p>
              Patience as a strategy. Evidence as a filter. Protocols built for
              the next forty years — not the next forty days. We rank only
              what survives the trend cycle, score what holds up under
              scrutiny, and match it to who you actually are.
            </p>
          </div>
        </FadeInOnScroll>

        <FadeInOnScroll delay={240}>
          <p
            className="font-serif italic text-[#2A2520] mt-10 md:mt-12 leading-[1.4]"
            style={{ fontSize: "clamp(22px, 2.6vw, 30px)" }}
          >
            The most powerful longevity protocol
            <br className="hidden sm:block" />
            is the one you can keep.
          </p>
        </FadeInOnScroll>

        <FadeInOnScroll delay={320}>
          <div className="flex items-center justify-center gap-3 mt-14 md:mt-16">
            <span className="w-12 h-px bg-[#2A2520]/15" />
            <span className="w-1.5 h-1.5 rounded-full bg-terracotta" />
            <span className="w-12 h-px bg-[#2A2520]/15" />
          </div>
        </FadeInOnScroll>
      </div>
    </section>
  );
}
