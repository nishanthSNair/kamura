import Link from "next/link";
import Image from "next/image";

export default function Footer() {
 return (
 <footer className="border-t border-sage-light/60 bg-cream">
  <div className="max-w-6xl mx-auto px-6 py-12 md:py-16">
  {/* Top row: Logo + columns */}
  <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8">
   {/* Brand */}
   <div className="md:col-span-1">
   <Link href="/" className="flex items-center gap-2 mb-3">
    <Image
    src="/logo-symbol.svg"
    alt=""
    width={36}
    height={36}
    className="w-9 h-9"
    />
    <span className="font-serif text-xl tracking-[0.15em] text-gray-900">
    KAMURA
    </span>
   </Link>
   <p className="text-xs text-gray-500 font-sans leading-relaxed">
    The wellness platform for the GCC. Discover treatments, find clinics, build protocols.
   </p>
   </div>

   {/* Discover */}
   <div>
   <p className="text-[10px] uppercase tracking-[0.15em] text-gray-400 font-sans mb-3 font-medium">
    Discover
   </p>
   <div className="flex flex-col gap-2.5 text-sm text-gray-600 font-sans">
    <Link href="/treatments" className="hover:text-terracotta transition-colors">Treatments</Link>
    <Link href="/peptides" className="hover:text-terracotta transition-colors">Peptides</Link>
    <Link href="/protocols" className="hover:text-terracotta transition-colors">Protocols</Link>
    <Link href="/explore" className="hover:text-terracotta transition-colors">Find Clinics</Link>
    <Link href="/wellness-checker" className="hover:text-terracotta transition-colors">Wellness Check</Link>
   </div>
   </div>

   {/* Company */}
   <div>
   <p className="text-[10px] uppercase tracking-[0.15em] text-gray-400 font-sans mb-3 font-medium">
    Company
   </p>
   <div className="flex flex-col gap-2.5 text-sm text-gray-600 font-sans">
    <Link href="/about" className="hover:text-terracotta transition-colors">About</Link>
    <Link href="/blog" className="hover:text-terracotta transition-colors">Blog</Link>
    <Link href="/events" className="hover:text-terracotta transition-colors">Events</Link>
    <Link href="/list-your-business" className="hover:text-terracotta transition-colors">List Your Business</Link>
    <Link href="/provider/login" className="hover:text-terracotta transition-colors">Provider Login</Link>
   </div>
   </div>

   {/* Connect */}
   <div>
   <p className="text-[10px] uppercase tracking-[0.15em] text-gray-400 font-sans mb-3 font-medium">
    Connect
   </p>
   <div className="flex flex-col gap-2.5 text-sm text-gray-600 font-sans">
    <a href="mailto:kamuralife@gmail.com" className="hover:text-terracotta transition-colors">
    kamuralife@gmail.com
    </a>
    <a href="https://instagram.com/kamuralife" target="_blank" rel="noopener noreferrer" className="hover:text-terracotta transition-colors">
    Instagram
    </a>
    <a href="https://x.com/KamuraLife" target="_blank" rel="noopener noreferrer" className="hover:text-terracotta transition-colors">
    X (Twitter)
    </a>
   </div>
   </div>
  </div>

  {/* Bottom */}
  <div className="mt-10 pt-6 border-t border-sage-light/40 flex flex-col sm:flex-row items-center justify-between gap-3">
   <p className="text-xs text-gray-400 font-sans">
   &copy; {new Date().getFullYear()} Kamura. All rights reserved.
   </p>
   <p className="text-xs text-gray-400 font-sans">
   Wellness intelligence for the GCC
   </p>
  </div>
  </div>
 </footer>
 );
}
