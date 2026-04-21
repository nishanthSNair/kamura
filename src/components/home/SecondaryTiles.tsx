"use client";
import Link from "next/link";
import { motion } from "framer-motion";

const ICONS: Record<string, React.ReactNode> = {
  help: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="8" />
      <path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-1 .4-1 1.2-1 2.2" />
      <circle cx="12" cy="17" r=".8" fill="currentColor" />
    </svg>
  ),
  partners: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="8" width="18" height="12" rx="2" />
      <path d="M8 8V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 13h18" />
    </svg>
  ),
};

const TILES = [
  {
    k: "help",
    href: "/wellness-checker",
    title: "Not sure where to start?",
    sub: "Take the 2-minute Wellness Check",
  },
  {
    k: "partners",
    href: "/list-your-business",
    title: "For Clinics & Partners",
    sub: "See the platform and dashboard",
  },
];

export default function SecondaryTiles() {
  return (
    <section className="px-4 md:px-6 pt-4">
      <div className="mx-auto max-w-[1280px] grid grid-cols-1 md:grid-cols-2 gap-4">
        {TILES.map((tile, i) => (
          <motion.div
            key={tile.k}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 + i * 0.07, ease: [0.22, 0.65, 0.2, 1] as const }}
          >
            <Link
              href={tile.href}
              className="group relative block h-[124px] rounded-[28px] overflow-hidden p-6 bg-[#3F5A3C] hover:bg-[#35502F] text-white shadow-[0_10px_30px_-16px_rgba(42,37,32,0.28)] hover:shadow-[0_20px_40px_-18px_rgba(42,37,32,0.35)] hover:-translate-y-0.5 transition-all duration-500 flex items-center gap-5"
            >
              <div className="w-12 h-12 shrink-0 rounded-xl grid place-items-center bg-white/10 border border-white/20 text-white/85">
                <div className="w-5 h-5">{ICONS[tile.k]}</div>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-serif font-medium text-[19px] leading-[1.2] m-0 mb-1">
                  {tile.title}
                </h3>
                <p className="text-[13px] leading-[1.4] text-white/70">{tile.sub}</p>
              </div>
              <span className="text-lg text-white/60 group-hover:text-white group-hover:translate-x-0.5 transition-all duration-300 shrink-0">
                →
              </span>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
