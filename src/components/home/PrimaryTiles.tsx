"use client";
import Link from "next/link";
import { motion } from "framer-motion";

type Tile = {
  k: "practitioners" | "book" | "peptides" | "track";
  title: string;
  sub: string;
  href: string;
  badge?: string;
};

const PRIMARY: Tile[] = [
  {
    k: "practitioners",
    title: "Find Practitioners",
    sub: "Vetted doctors across the UAE",
    href: "#providers",
  },
  {
    k: "book",
    title: "Book Treatments",
    sub: "207+ evidence-scored protocols",
    href: "#discover",
  },
  {
    k: "peptides",
    title: "Peptides & Longevity",
    sub: "Pharmaceutical-grade, compliantly sourced",
    href: "#peptides",
    badge: "Waitlist",
  },
  {
    k: "track",
    title: "Track Your Journey",
    sub: "Protocols, streaks, wellness score",
    href: "/my",
  },
];

const ICONS: Record<string, React.ReactNode> = {
  practitioners: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="3.2" />
      <path d="M5 20c0-3.5 3.1-6 7-6s7 2.5 7 6" />
    </svg>
  ),
  book: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="5" width="16" height="15" rx="2" />
      <path d="M8 3v4M16 3v4M4 10h16" />
      <circle cx="12" cy="15" r="1.2" fill="currentColor" />
    </svg>
  ),
  peptides: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="7" cy="12" r="2.4" />
      <circle cx="17" cy="12" r="2.4" />
      <circle cx="12" cy="7" r="1.8" />
      <circle cx="12" cy="17" r="1.8" />
      <path d="M9 11 10.6 8.3M15 11l-1.6-2.7M9 13l1.6 2.7M15 13l-1.6 2.7" />
    </svg>
  ),
  track: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 14l4-4 3 3 5-7 3 4 3-2" />
      <circle cx="7" cy="10" r="1" fill="currentColor" />
      <circle cx="10" cy="13" r="1" fill="currentColor" />
      <circle cx="15" cy="6" r="1" fill="currentColor" />
    </svg>
  ),
};

export default function PrimaryTiles() {
  return (
    <section className="relative z-10 px-4 md:px-6 -mt-[72px] md:-mt-[100px]">
      <div className="mx-auto max-w-[1280px] grid grid-cols-2 lg:grid-cols-4 gap-4">
        {PRIMARY.map((tile, i) => (
          <motion.div
            key={tile.k}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 + i * 0.06, ease: [0.22, 0.65, 0.2, 1] as const }}
          >
            <Link
              href={tile.href}
              className="group relative block h-[164px] md:h-[180px] rounded-[28px] overflow-hidden p-6 bg-[#FAF7F2] border border-[#2A2520]/8 shadow-[0_10px_30px_-16px_rgba(42,37,32,0.18)] hover:shadow-[0_20px_40px_-18px_rgba(42,37,32,0.28)] hover:-translate-y-0.5 transition-all duration-500"
            >
              <div className="w-11 h-11 rounded-xl grid place-items-center bg-[#B5886A]/14 text-[#B5886A] mb-4">
                <div className="w-5 h-5">{ICONS[tile.k]}</div>
              </div>

              <div className="flex items-start gap-1.5 mb-1">
                <h3 className="font-serif font-medium text-[17px] leading-[1.2] text-[#2A2520] m-0 line-clamp-2">
                  {tile.title}
                </h3>
                {tile.badge && (
                  <span className="inline-flex items-center h-[18px] px-1.5 rounded-full text-[9.5px] font-semibold tracking-[0.08em] uppercase bg-[#B5886A]/15 border border-[#B5886A]/40 text-[#9A7357] shrink-0 mt-0.5">
                    {tile.badge}
                  </span>
                )}
              </div>
              <p className="text-[12.5px] leading-[1.4] text-[#2A2520]/65 line-clamp-2">
                {tile.sub}
              </p>

              <span className="absolute bottom-5 right-5 text-base text-[#B5886A] opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-300">
                →
              </span>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
