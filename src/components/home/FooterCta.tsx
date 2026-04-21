"use client";
import Link from "next/link";

export default function FooterCta() {
  return (
    <section className="px-4 md:px-6 pt-6 md:pt-8 pb-6 md:pb-8">
     <div className="relative overflow-hidden mx-auto max-w-[1280px] rounded-[40px] bg-[#4B6B47] py-[120px] md:py-[140px] px-8 md:px-14 shadow-[0_24px_60px_-24px_rgba(42,37,32,0.3)]">
      <svg
        className="absolute inset-0 w-full h-full opacity-25 pointer-events-none"
        viewBox="0 0 1440 600"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="flowg" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="#D4B896" stopOpacity="0" />
            <stop offset="50%" stopColor="#D4B896" stopOpacity=".55" />
            <stop offset="100%" stopColor="#D4B896" stopOpacity="0" />
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
        <div className="text-[10px] font-semibold tracking-[0.32em] uppercase text-white/75 mb-6">
          For clinics & partners
        </div>
        <h2
          className="font-serif font-medium leading-[1.05] tracking-[-0.015em] m-0 mx-auto mb-7 max-w-[18ch] text-white"
          style={{ fontSize: "clamp(44px, 6vw, 80px)" }}
        >
          Get <i className="italic text-[#D4B896]">discovered</i> on Kamura.
        </h2>
        <p className="text-[17px] text-white/75 max-w-[480px] mx-auto mb-11 leading-[1.6]">
          Join the directory. Reach patients looking for exactly what you do — scored,
          verified, local.
        </p>

        <div className="inline-flex items-center gap-4.5 pl-6 pr-2.5 py-2.5 rounded-full bg-white/10 border border-white/25 backdrop-blur-xl text-[13.5px] text-white">
          <span>List your practice — it&rsquo;s free to join</span>
          <Link
            href="/list-your-business"
            className="inline-flex items-center gap-2 h-11 px-6 rounded-full bg-[#B5886A] hover:bg-[#9A7357] text-white font-medium transition-colors"
          >
            List your business <span>→</span>
          </Link>
        </div>

        <div className="mt-[100px] pt-9 flex flex-col md:flex-row justify-between items-center gap-5 border-t border-white/15 text-[11.5px] text-white/50">
          <div className="flex items-center gap-2.5">
            <span className="font-serif tracking-[0.18em] text-sm text-white/80">KAMURA</span>
          </div>
          <nav className="flex gap-7 flex-wrap justify-center">
            <Link href="/treatments" className="text-white/55 hover:text-white transition-colors">Treatments</Link>
            <Link href="/peptides" className="text-white/55 hover:text-white transition-colors">Peptides</Link>
            <Link href="/explore" className="text-white/55 hover:text-white transition-colors">Providers</Link>
            <Link href="/blog" className="text-white/55 hover:text-white transition-colors">Journal</Link>
            <Link href="/about" className="text-white/55 hover:text-white transition-colors">Contact</Link>
          </nav>
          <span>© 2026 · Rooted in wellness · Dubai</span>
        </div>
      </div>
     </div>
    </section>
  );
}
