import Link from "next/link";
import Image from "next/image";
import NewsletterSignup from "./NewsletterSignup";

export default function Footer() {
  return (
    <footer className="border-t border-sage-light/60 dark:border-forest/30 bg-cream dark:bg-[#0f120e]">
      {/* Newsletter */}
      <div className="max-w-6xl mx-auto px-6 pt-14 pb-10 border-b border-sage-light/40 dark:border-forest/20">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8">
          <div className="text-center md:text-left max-w-sm">
            <h3 className="font-serif text-xl text-gray-900 dark:text-gray-100 mb-2">
              Stay in the loop
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-sans">
              New treatments, events, and wellness insights — delivered to your inbox.
            </p>
          </div>
          <NewsletterSignup />
        </div>
      </div>

      {/* Footer links */}
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <Link href="/" className="flex items-center gap-2.5">
            <Image
              src="/logo-symbol.svg"
              alt=""
              width={32}
              height={32}
              className="w-8 h-8"
            />
            <span className="font-serif text-xl tracking-[0.15em] text-gray-900 dark:text-white">
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
          <div className="flex items-center gap-4 text-xs text-gray-400">
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
              @kamuralife
            </a>
          </div>
        </div>
        <p className="text-xs text-gray-400 text-center mt-8">
          &copy; {new Date().getFullYear()} Kamura. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
