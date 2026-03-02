import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-white">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <Link href="/" className="font-serif text-lg tracking-[0.15em] text-gray-900">
            KAMURA
          </Link>
          <div className="flex items-center gap-8 text-sm text-gray-500">
            <Link href="/" className="hover:text-terracotta transition-colors">
              Blog
            </Link>
            <Link href="/explore" className="hover:text-terracotta transition-colors">
              Explore
            </Link>
            <Link href="/events" className="hover:text-terracotta transition-colors">
              Events
            </Link>
            <Link href="/about" className="hover:text-terracotta transition-colors">
              About
            </Link>
          </div>
          <p className="text-xs text-gray-400">
            &copy; {new Date().getFullYear()} Kamura. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
