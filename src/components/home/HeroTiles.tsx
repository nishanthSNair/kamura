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
  { k: "practitioners", title: "Find Practitioners", sub: "Vetted doctors across the UAE", href: "#providers" },
  { k: "book", title: "Book Treatments", sub: "207+ evidence-scored protocols", href: "#discover" },
  { k: "peptides", title: "Peptides & Longevity", sub: "Pharmaceutical-grade, compliantly sourced", href: "#peptides", badge: "Waitlist" },
  { k: "track", title: "Track Your Journey", sub: "Your protocol, streaks, wellness score", href: "/my" },
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
  lost: (
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

// Light cream palette — terracotta primary, matcha as secondary fresh accent.
const TILE_STYLES: Record<string, string> = {
  practitioners:
    "bg-gradient-to-br from-white to-[#F5F2ED] text-[#2A2520] border border-[#2A2520]/8 shadow-[0_16px_32px_-18px_rgba(42,37,32,0.18)] hover:shadow-[0_24px_44px_-18px_rgba(42,37,32,0.25)]",
  book:
    "bg-gradient-to-br from-[#A8C48A]/22 to-[#8DA970]/14 border border-[#8DA970]/35 text-[#2A2520] hover:border-[#8DA970]/55",
  peptides:
    "bg-gradient-to-br from-[#C4A882]/28 to-[#B5886A]/16 border border-[#C4A882]/55 text-[#2A2520] shadow-[0_0_0_1px_rgba(196,168,130,0.08)_inset,0_16px_32px_-20px_rgba(181,136,106,0.25)] hover:border-[#C4A882]/75",
  track:
    "bg-gradient-to-br from-[#EDE7DB] to-[#DDD4C0] border border-[#2A2520]/10 text-[#2A2520] hover:border-[#2A2520]/20",
};

const TILE_ARTS: Record<string, string> = {
  practitioners: "bg-[#B5886A]/14 text-[#B5886A]",
  book: "bg-[#A8C48A]/25 text-[#8DA970] border border-[#8DA970]/30",
  peptides: "bg-white text-[#B5886A] border border-[#C4A882]/45",
  track: "bg-white/70 text-[#B5886A] border border-[#C4A882]/40",
};

function PTTile({ tile, idx }: { tile: Tile; idx: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.8,
        delay: 0.9 + idx * 0.08,
        ease: [0.22, 0.65, 0.2, 1] as const,
      }}
    >
      <Link
        href={tile.href}
        className={`group relative block rounded-[18px] overflow-hidden p-5 h-[118px] flex items-center gap-3.5 backdrop-blur-md transition-all duration-500 ease-out hover:-translate-y-0.5 ${TILE_STYLES[tile.k]}`}
      >
        <div
          className={`w-12 h-12 shrink-0 rounded-xl grid place-items-center ${TILE_ARTS[tile.k]}`}
        >
          <div className="w-5.5 h-5.5">{ICONS[tile.k]}</div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-serif font-medium text-[15.5px] leading-[1.2] flex items-start gap-1.5 mb-1 flex-wrap">
            <span className="line-clamp-2">{tile.title}</span>
            {tile.badge && (
              <span className="inline-flex items-center h-[18px] px-1.5 rounded-full text-[9.5px] font-semibold tracking-[0.08em] uppercase bg-[#B5886A]/15 border border-[#B5886A]/40 text-[#9A7357] shrink-0">
                {tile.badge}
              </span>
            )}
          </div>
          <div className="text-[11.5px] leading-[1.35] text-[#2A2520]/65 line-clamp-1">
            {tile.sub}
          </div>
        </div>
        <span className="text-base transition-all duration-500 text-[#B5886A] opacity-70 group-hover:opacity-100 group-hover:translate-x-1 shrink-0">
          →
        </span>
      </Link>
    </motion.div>
  );
}

export default function HeroTiles() {
  return (
    <section className="relative min-h-[100vh] flex flex-col justify-end px-6 md:px-12 pt-28 pb-16 md:pt-32 md:pb-20 bg-gradient-to-b from-[#FAF7F2] via-[#F5F2ED] to-[#EDE7DB] text-[#2A2520] overflow-hidden">
      {/* Soft accent glows — warm gold + fresh matcha */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden
        style={{
          background:
            "radial-gradient(circle at 70% 20%, rgba(196,168,130,0.18) 0%, transparent 45%), radial-gradient(circle at 20% 80%, rgba(168,196,138,0.14) 0%, transparent 50%)",
        }}
      />

      {/* Watermark wordmark */}
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.05] select-none"
        aria-hidden
      >
        <span
          className="font-serif tracking-[0.2em] text-[#2A2520] whitespace-nowrap"
          style={{ fontSize: "min(24vw, 340px)" }}
        >
          KAMURA
        </span>
      </div>

      <div className="relative max-w-[1152px] mx-auto w-full">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="text-[10px] font-semibold tracking-[0.32em] uppercase text-terracotta mb-7"
        >
          Kamura · Rooted in wellness
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.95, delay: 0.3, ease: [0.22, 0.65, 0.2, 1] as const }}
          className="font-serif font-medium leading-[1] tracking-[-0.02em] m-0 mb-5 max-w-[16ch] text-[#2A2520]"
          style={{ fontSize: "clamp(44px, 6vw, 84px)" }}
        >
          A{" "}
          <span
            className="italic bg-gradient-to-b from-[#B5886A] to-[#9A5F57] bg-clip-text"
            style={{ WebkitTextFillColor: "transparent" }}
          >
            longevity
          </span>
          {" "}platform.
        </motion.h1>

        {/* Subhead */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.65 }}
          className="text-[17px] leading-[1.6] text-[#2A2520]/72 max-w-[540px] mb-7"
        >
          Discover wellness services <em>and</em> preventive healthcare — peptides,
          practitioner bookings, and protocol tracking, together in one place.
          Evidence-scored, science-led, built for the GCC.
        </motion.p>

        {/* Primary 4 tiles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 max-w-[1100px] mb-3.5">
          {PRIMARY.map((t, i) => (
            <PTTile key={t.k} tile={t} idx={i} />
          ))}
        </div>

        {/* Secondary 2 tiles */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.3 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-3.5 max-w-[1100px]"
        >
          <Link
            href="/wellness-checker"
            className="group relative block rounded-[18px] overflow-hidden p-5 h-[118px] flex items-center gap-3.5 bg-white/60 border border-dashed border-[#C4A882]/40 text-[#2A2520] hover:bg-white hover:border-[#C4A882]/70 hover:border-solid transition-all duration-500"
          >
            <div className="w-12 h-12 shrink-0 rounded-xl grid place-items-center bg-[#C4A882]/15 text-[#B5886A] border border-[#C4A882]/35">
              <div className="w-5.5 h-5.5">{ICONS.lost}</div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-serif font-medium text-[17px] leading-tight mb-0.5">
                Not sure where to start?
              </div>
              <div className="text-[12.5px] text-[#2A2520]/65">Take the 2-minute Wellness Check</div>
            </div>
            <span className="text-base text-[#B5886A] opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all">→</span>
          </Link>

          <Link
            href="/list-your-business"
            className="group relative block rounded-[18px] overflow-hidden p-5 h-[118px] flex items-center gap-3.5 bg-white/60 border border-dashed border-[#8DA970]/35 text-[#2A2520] hover:bg-white hover:border-[#8DA970]/60 hover:border-solid transition-all duration-500"
          >
            <div className="w-12 h-12 shrink-0 rounded-xl grid place-items-center bg-[#A8C48A]/20 text-[#8DA970] border border-[#8DA970]/35">
              <div className="w-5.5 h-5.5">{ICONS.partners}</div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-serif font-medium text-[17px] leading-tight mb-0.5">
                For Clinics & Partners
              </div>
              <div className="text-[12.5px] text-[#2A2520]/65">See the platform and dashboard</div>
            </div>
            <span className="text-base text-[#8DA970] opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all">→</span>
          </Link>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <div className="absolute left-1/2 bottom-9 -translate-x-1/2 flex flex-col items-center gap-2.5 text-[10px] tracking-[0.28em] uppercase text-[#2A2520]/45 pointer-events-none">
        <span>Scroll to explore</span>
        <span
          className="w-px h-12"
          style={{
            background: "linear-gradient(180deg, rgba(181,136,106,0.6), transparent)",
            animation: "scrollDrip 2.4s cubic-bezier(0.22, 0.65, 0.2, 1) infinite",
          }}
        />
      </div>
      <style>{`@keyframes scrollDrip{0%{transform:scaleY(0);opacity:0;transform-origin:top}40%{transform:scaleY(1);opacity:1}100%{transform:scaleY(1);opacity:0}}`}</style>
    </section>
  );
}
