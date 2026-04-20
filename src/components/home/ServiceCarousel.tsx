"use client";
import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";

type Service = {
  slug: string;
  label: string;
  blurb: string;
  image: string;
  accent: string;
};

const SERVICES: Service[] = [
  {
    slug: "/treatments/sound-healing",
    label: "Sound Healing",
    blurb: "Vagal tone & stress reset",
    image: "https://images.unsplash.com/photo-1681310375333-73f41177e50f?w=800&q=80&fit=crop",
    accent: "#B5886A",
  },
  {
    slug: "/treatments/red-light-therapy",
    label: "Red Light Therapy",
    blurb: "Mitochondria & skin repair",
    image: "https://images.unsplash.com/photo-1772289935544-e5e6cf99adc9?w=800&q=80&fit=crop",
    accent: "#9A5F57",
  },
  {
    slug: "/treatments/cryotherapy",
    label: "Cryotherapy",
    blurb: "Recovery & inflammation",
    image: "https://images.unsplash.com/photo-1611876385388-94a5e97a219a?w=800&q=80&fit=crop",
    accent: "#4A5E3E",
  },
  {
    slug: "/treatments/iv-therapy",
    label: "IV Therapy",
    blurb: "Hydration, NAD+, vitamins",
    image: "https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=800&q=80&fit=crop",
    accent: "#7B8D68",
  },
  {
    slug: "/treatments/hyperbaric-oxygen-therapy",
    label: "Hyperbaric O₂",
    blurb: "Healing & cognition",
    image: "https://images.unsplash.com/photo-1765830403209-a5eceac4c198?w=800&q=80&fit=crop",
    accent: "#C4A882",
  },
  {
    slug: "/treatments/infrared-sauna",
    label: "Infrared Sauna",
    blurb: "Detox & cardiovascular",
    image: "https://images.unsplash.com/photo-1759302354553-cf87ceb9135c?w=800&q=80&fit=crop",
    accent: "#B5886A",
  },
  {
    slug: "/treatments/cold-plunge",
    label: "Cold Plunge",
    blurb: "Dopamine & resilience",
    image: "https://images.unsplash.com/photo-1604480132736-44c188fe4d20?w=800&q=80&fit=crop",
    accent: "#60A5FA",
  },
  {
    slug: "/treatments/meditation",
    label: "Meditation",
    blurb: "Focus, calm, nervous system",
    image: "https://images.unsplash.com/photo-1508672019048-805c876b67e2?w=800&q=80&fit=crop",
    accent: "#96A78B",
  },
];

export default function ServiceCarousel() {
  const scroller = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    const el = scroller.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>(".service-card");
    const step = card ? card.offsetWidth + 20 : 320;
    el.scrollBy({ left: dir === "right" ? step * 2 : -step * 2, behavior: "smooth" });
  };

  return (
    <div className="relative">
      <div
        ref={scroller}
        className="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-4 -mx-6 px-6 scroll-smooth hide-scrollbar"
      >
        {SERVICES.map((s) => (
          <Link
            key={s.slug}
            href={s.slug}
            className="service-card group relative shrink-0 snap-start w-[78vw] sm:w-[320px] md:w-[300px] rounded-3xl overflow-hidden aspect-[3/4] block"
          >
            <Image
              src={s.image}
              alt={s.label}
              fill
              sizes="(max-width: 768px) 78vw, 300px"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            />
            <div
              className="absolute inset-0 transition-opacity duration-500"
              style={{
                background: `linear-gradient(180deg, transparent 40%, ${s.accent}E6 100%)`,
              }}
            />
            <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
              <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <div className="text-[10px] tracking-[0.2em] uppercase opacity-80 mb-2">
                  Service
                </div>
                <h3 className="font-serif text-2xl md:text-3xl leading-tight mb-2">
                  {s.label}
                </h3>
                <p className="text-sm opacity-90 mb-3 line-clamp-2">{s.blurb}</p>
                <span className="inline-flex items-center gap-1 text-xs tracking-wider uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Explore <span className="group-hover:translate-x-1 transition-transform">→</span>
                </span>
              </div>
            </div>
          </Link>
        ))}

        <Link
          href="/treatments"
          className="service-card shrink-0 snap-start w-[78vw] sm:w-[320px] md:w-[300px] rounded-3xl aspect-[3/4] border-2 border-dashed border-[#2A2520]/15 flex items-center justify-center text-[#2A2520]/60 hover:text-terracotta hover:border-terracotta transition-colors"
        >
          <div className="text-center">
            <div className="text-4xl mb-2">→</div>
            <div className="text-sm tracking-wider uppercase">See all 120+</div>
          </div>
        </Link>
      </div>

      <button
        aria-label="Scroll left"
        onClick={() => scroll("left")}
        className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-white shadow-lg items-center justify-center hover:bg-terracotta hover:text-white transition-colors z-10"
      >
        ←
      </button>
      <button
        aria-label="Scroll right"
        onClick={() => scroll("right")}
        className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-12 h-12 rounded-full bg-white shadow-lg items-center justify-center hover:bg-terracotta hover:text-white transition-colors z-10"
      >
        →
      </button>

      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
