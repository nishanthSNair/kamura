import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-sage-light/60 dark:border-forest/30 bg-cream dark:bg-[#0f120e]">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo-symbol.svg"
              alt=""
              width={24}
              height={24}
              className="w-6 h-6"
            />
            <span className="font-serif text-lg tracking-[0.15em] text-gray-900 dark:text-white">
              KAMURA
            </span>
          </Link>
          <div className="flex items-center gap-8 text-sm text-gray-500 dark:text-gray-400">
            <Link href="/" className="hover:text-moss transition-colors">
              Blog
            </Link>
            <Link href="/treatments" className="hover:text-moss transition-colors">
              Treatments
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
          <div className="flex items-center gap-4">
            <a
              href="mailto:kamuralife@gmail.com"
              className="text-xs text-gray-400 hover:text-moss transition-colors"
            >
              kamuralife@gmail.com
            </a>
            <p className="text-xs text-gray-400">
              &copy; {new Date().getFullYear()} Kamura. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
