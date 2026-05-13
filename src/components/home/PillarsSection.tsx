import Link from "next/link";
import Image from "next/image";
import FadeInOnScroll from "@/components/FadeInOnScroll";

type Pillar = {
  number: string;
  name: string;
  subtitle: string;
  description: string;
  tags: string[];
  href: string;
  image: string;
};

const PILLARS: Pillar[] = [
  {
    number: "01",
    name: "RESTORE",
    subtitle: "Recovery + Repair",
    description:
      "Peptide protocols and curated practitioners for tissue repair, gut healing, and post-training recovery.",
    tags: ["Heal", "Rebuild", "Soothe"],
    href: "/treatments/best-for/recovery",
    image:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1600&q=85",
  },
  {
    number: "02",
    name: "EXTEND",
    subtitle: "Longevity + Cellular Health",
    description:
      "Telomere, mitochondrial, and longevity protocols. The molecules and the medicine, evidence-scored.",
    tags: ["Telomeres", "Mitochondria", "Healthspan"],
    href: "/treatments/best-for/longevity",
    image:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1600&q=85",
  },
  {
    number: "03",
    name: "SCULPT",
    subtitle: "Metabolic + Body Composition",
    description:
      "GLP-1, visceral fat, and body recomposition protocols — peptides and the clinicians behind them.",
    tags: ["Burn", "Define", "Rebalance"],
    href: "/treatments/best-for/weight-loss",
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1600&q=85",
  },
  {
    number: "04",
    name: "FOCUS",
    subtitle: "Cognition + Nervous System",
    description:
      "Focus, neuroprotection, and calm. Peptides and practitioners curated across the breadth of mind science.",
    tags: ["Clarity", "Calm", "Sharpen"],
    href: "/treatments/best-for/brain",
    image:
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=1600&q=85",
  },
];

export default function PillarsSection() {
  return (
    <section
      id="pillars"
      className="bg-[#FAF7F2] py-24 md:py-32 border-y border-[#2A2520]/6"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        <FadeInOnScroll>
          <div className="max-w-2xl mb-14 md:mb-18">
            <p className="text-[10.5px] tracking-[0.32em] uppercase text-terracotta font-semibold font-sans mb-5">
              Four Pillars
            </p>
            <h2
              className="font-serif text-[#2A2520] leading-[1.06] tracking-[-0.015em] mb-6"
              style={{ fontSize: "clamp(36px, 4.8vw, 60px)" }}
            >
              Every goal. Curated to the molecule.
            </h2>
            <p className="text-[16px] md:text-[17px] text-[#2A2520]/65 font-sans leading-[1.65] max-w-[560px]">
              Kamura organises preventive health around four outcomes that
              matter. Within each pillar, only the best — peptide protocols,
              practitioners, and practices — scored, ranked, and matched to
              who you actually are.
            </p>
          </div>
        </FadeInOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 lg:gap-7">
          {PILLARS.map((pillar, i) => (
            <FadeInOnScroll key={pillar.name} delay={i * 90}>
              <Link
                href={pillar.href}
                className="group block relative overflow-hidden rounded-3xl bg-[#1a0f0c] aspect-[4/4.5] md:aspect-[4/4.2]"
              >
                <Image
                  src={pillar.image}
                  alt={pillar.name}
                  fill
                  className="object-cover opacity-70 group-hover:opacity-85 group-hover:scale-[1.04] transition-all duration-[900ms] ease-out"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a0f0c] via-[#1a0f0c]/45 to-[#1a0f0c]/10" />

                <div className="absolute inset-0 p-7 md:p-10 flex flex-col justify-between text-white">
                  <div className="flex items-start justify-between">
                    <span className="text-[11px] tracking-[0.22em] font-sans text-white/55">
                      {pillar.number}
                    </span>
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      className="opacity-55 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-500"
                    >
                      <line x1="7" y1="17" x2="17" y2="7" />
                      <polyline points="7 7 17 7 17 17" />
                    </svg>
                  </div>

                  <div>
                    <h3
                      className="font-serif tracking-tight leading-[1.0] mb-2.5"
                      style={{ fontSize: "clamp(40px, 4.6vw, 60px)" }}
                    >
                      {pillar.name}
                    </h3>
                    <p className="text-[11px] md:text-[11.5px] tracking-[0.22em] uppercase text-white/60 font-sans font-semibold mb-5">
                      {pillar.subtitle}
                    </p>
                    <p className="text-[14px] md:text-[15px] text-white/82 font-sans leading-[1.6] mb-6 max-w-md">
                      {pillar.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {pillar.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] tracking-[0.12em] uppercase px-3 py-1.5 rounded-full border border-white/22 text-white/85 font-sans"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            </FadeInOnScroll>
          ))}
        </div>

        <FadeInOnScroll delay={420}>
          <div className="mt-12 md:mt-14 text-center">
            <Link
              href="/treatments"
              className="inline-flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase text-[#2A2520] hover:text-terracotta font-sans font-semibold border-b border-[#2A2520]/30 hover:border-terracotta pb-1 transition-colors"
            >
              See all 200+ treatments scored
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </div>
        </FadeInOnScroll>
      </div>
    </section>
  );
}
