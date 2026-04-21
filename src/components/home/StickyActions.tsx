"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function StickyActions() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const on = () => setShow(window.scrollY > window.innerHeight * 0.7);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <div
      className={`fixed left-1/2 bottom-[22px] z-[60] -translate-x-1/2 flex gap-1.5 p-1.5 rounded-full border border-[#C4A882]/30 backdrop-blur-xl shadow-[0_20px_50px_-10px_rgba(0,0,0,0.7)] transition-all duration-500 ${
        show ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-5 pointer-events-none"
      }`}
      style={{ background: "rgba(16,25,16,0.78)" }}
    >
      <Link
        href="#discover"
        className="inline-flex items-center h-[38px] px-[18px] rounded-full text-[12.5px] font-medium text-white/85 hover:bg-white/8 hover:text-white transition-all"
      >
        Explore treatments
      </Link>
      <Link
        href="#providers"
        className="inline-flex items-center h-[38px] px-[18px] rounded-full text-[12.5px] font-medium text-white/85 hover:bg-white/8 hover:text-white transition-all"
      >
        Find a provider
      </Link>
      <Link
        href="#peptides"
        className="inline-flex items-center h-[38px] px-[18px] rounded-full text-[12.5px] font-medium bg-[#B5886A] hover:bg-[#9A7357] text-white transition-colors"
      >
        Join peptides waitlist →
      </Link>
    </div>
  );
}
