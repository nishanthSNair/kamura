import Link from "next/link";
import Image from "next/image";

export default function Footer() {
 return (
 <footer className="border-t border-sage-light/60 bg-cream">
 {/* Footer links */}
 <div className="max-w-6xl mx-auto px-6 py-10">
 <div className="flex flex-col md:flex-row items-center justify-between gap-6">
 <Link href="/" className="flex items-center gap-2.5">
 <Image
 src="/logo-symbol.svg"
 alt=""
 width={40}
 height={40}
 className="w-10 h-10"
 />
 <span className="font-serif text-2xl tracking-[0.15em] text-gray-900">
 KAMURA
 </span>
 </Link>
 <div className="flex items-center gap-8 text-sm text-gray-500">
 <Link href="/blog" className="hover:text-moss transition-colors">
 Blog
 </Link>
 <Link href="/treatments" className="hover:text-moss transition-colors">
 Treatments
 </Link>
 <Link href="/protocols" className="hover:text-moss transition-colors">
 Protocols
 </Link>
 <Link href="/explore" className="hover:text-moss transition-colors">
 Explore
 </Link>
 <Link href="/events" className="hover:text-moss transition-colors">
 Events
 </Link>
 <Link href="/about" className="hover:text-moss transition-colors">
 About
 </Link>
 </div>
 <div className="flex items-center gap-4 text-xs text-gray-500">
 <a
 href="mailto:kamuralife@gmail.com"
 className="hover:text-moss transition-colors"
 >
 kamuralife@gmail.com
 </a>
 <a
 href="https://instagram.com/kamuralife"
 target="_blank"
 rel="noopener noreferrer"
 className="hover:text-moss transition-colors"
 >
 Instagram
 </a>
 <a
 href="https://x.com/KamuraLife"
 target="_blank"
 rel="noopener noreferrer"
 className="hover:text-moss transition-colors"
 >
 X
 </a>
 </div>
 </div>
 <p className="text-xs text-gray-500 text-center mt-8">
 &copy; {new Date().getFullYear()} Kamura. All rights reserved.
 </p>
 </div>
 </footer>
 );
}
