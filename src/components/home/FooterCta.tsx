"use client";
import Link from "next/link";

export default function FooterCta() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#EDE7DB] to-[#E0D8C4] py-[180px] px-6 md:px-12 pb-20">
      <svg
        className="absolute inset-0 w-full h-full opacity-30 pointer-events-none"
        viewBox="0 0 1440 600"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="flowg" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="#B5886A" stopOpacity="0" />
            <stop offset="50%" stopColor="#B5886A" stopOpacity=".55" />
            <stop offset="100%" stopColor="#B5886A" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[0.1, 0.25, 0.4, 0.55, 0.7, 0.85].map((y, i) => (
          <path
            key={i}
            d={`M-100 ${y * 600} Q 360 ${y * 600 + Math.sin(i) * 120} 720 ${y * 600} T 1540 ${y * 600}`}
            stroke="url(#flowg)"
            strokeWidth="1"
            fill="none"
            opacity={0.6 - i * 0.06}
          />
        ))}
      </svg>

      <div className="relative max-w-[1152px] mx-auto text-center">
        <div className="text-[10px] font-semibold tracking-[0.32em] uppercase text-terracotta mb-6">
          For clinics & partners
        </div>
        <h2
          className="font-serif font-medium leading-[1.05] tracking-[-0.015em] m-0 mx-auto mb-7 max-w-[18ch] text-[#2A2520]"
          style={{ fontSize: "clamp(44px, 6vw, 80px)" }}
        >
          Get <i className="italic text-[#8DA970]">discovered</i> on Kamura.
        </h2>
        <p className="text-[17px] text-[#2A2520]/65 max-w-[480px] mx-auto mb-11 leading-[1.6]">
          Join the directory. Reach patients looking for exactly what you do — scored,
          verified, local.
        </p>

        <div className="inline-flex items-center gap-4.5 pl-6 pr-2.5 py-2.5 rounded-full bg-white/80 border border-[#C4A882]/40 backdrop-blur-xl text-[13.5px] text-[#2A2520] shadow-[0_8px_24px_-12px_rgba(42,37,32,0.15)]">
          <span>List your practice — it&rsquo;s free to join</span>
          <Link
            href="/list-your-business"
            className="inline-flex items-center gap-2 h-11 px-6 rounded-full bg-[#B5886A] hover:bg-[#9A7357] text-white font-medium transition-colors"
          >
            List your business <span>→</span>
          </Link>
        </div>

        <div className="mt-[120px] pt-9 flex flex-col md:flex-row justify-between items-center gap-5 border-t border-[#2A2520]/12 text-[11.5px] text-[#2A2520]/55">
          <div className="flex items-center gap-2.5">
            <span className="font-serif tracking-[0.18em] text-sm text-[#2A2520]/75">KAMURA</span>
          </div>
          <nav className="flex gap-7 flex-wrap justify-center">
            <Link href="/treatments" className="text-[#2A2520]/60 hover:text-[#B5886A] transition-colors">Treatments</Link>
            <Link href="/peptides" className="text-[#2A2520]/60 hover:text-[#B5886A] transition-colors">Peptides</Link>
            <Link href="/explore" className="text-[#2A2520]/60 hover:text-[#B5886A] transition-colors">Providers</Link>
            <Link href="/blog" className="text-[#2A2520]/60 hover:text-[#B5886A] transition-colors">Journal</Link>
            <Link href="/about" className="text-[#2A2520]/60 hover:text-[#B5886A] transition-colors">Contact</Link>
          </nav>
          <span>© 2026 · Rooted in wellness · Dubai</span>
        </div>
      </div>
    </section>
  );
}
