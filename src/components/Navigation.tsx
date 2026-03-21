"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import SearchModal from "./SearchModal";
import ThemeToggle from "./ThemeToggle";

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Track scroll position for transparent nav
  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 50);
    }
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Cmd+K / Ctrl+K keyboard shortcut
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-cream/90 dark:bg-[#14110E]/90 backdrop-blur-sm border-b border-sage-light/60 dark:border-forest/30"
          : "bg-transparent border-b border-transparent"
      }`}>
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Left nav links - desktop */}
          <div className="hidden md:flex items-center gap-8 text-sm tracking-wide min-w-[200px]">
            {[
              { href: "/blog", label: "Blog" },
              { href: "/treatments", label: "Treatments" },
              { href: "/blueprint", label: "Blueprint" },
              { href: "/explore", label: "Explore" },
              { href: "/events", label: "Events" },
              { href: "/about", label: "About" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`transition-colors ${
                  scrolled
                    ? "text-gray-800 dark:text-gray-200 hover:text-moss dark:hover:text-sage"
                    : "text-white/90 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Mobile hamburger */}
          <button
            className={`md:hidden transition-colors ${scrolled ? "text-gray-800 dark:text-gray-200" : "text-white"}`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>

          {/* Center brand */}
          <Link href="/" className="flex items-center gap-2.5">
            <Image
              src="/logo-symbol.svg"
              alt=""
              width={36}
              height={36}
              className={`w-9 h-9 transition-all ${scrolled ? "" : "drop-shadow-[0_0_4px_rgba(255,255,255,0.3)]"}`}
            />
            <span className={`font-serif text-2xl tracking-[0.15em] transition-colors ${scrolled ? "text-gray-900 dark:text-white" : "text-white"}`}>
              KAMURA
            </span>
          </Link>

          {/* Right - Search + Instagram */}
          <div className="flex items-center justify-end gap-4 min-w-[200px]">
            <button
              onClick={() => setSearchOpen(true)}
              className={`transition-colors ${scrolled ? "text-gray-800 dark:text-gray-200 hover:text-moss dark:hover:text-sage" : "text-white/90 hover:text-white"}`}
              aria-label="Search"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>
            <ThemeToggle />
            <a
              href="https://instagram.com/kamuralife"
              target="_blank"
              rel="noopener noreferrer"
              className={`transition-colors ${scrolled ? "text-gray-800 dark:text-gray-200 hover:text-moss dark:hover:text-sage" : "text-white/90 hover:text-white"}`}
              aria-label="Instagram"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
          </div>
        </div>

        {/* Mobile menu — animated slide + fade */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            mobileOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="bg-cream/95 dark:bg-[#14110E]/95 backdrop-blur-md border-t border-sage-light/60 dark:border-forest/30 px-6 py-5 flex flex-col gap-5 text-sm tracking-wide">
            {[
              { href: "/blog", label: "Blog" },
              { href: "/treatments", label: "Treatments" },
              { href: "/blueprint", label: "Blueprint" },
              { href: "/explore", label: "Explore" },
              { href: "/events", label: "Events" },
              { href: "/about", label: "About" },
            ].map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-800 dark:text-gray-200 hover:text-moss dark:hover:text-sage transition-colors"
                style={{
                  opacity: mobileOpen ? 1 : 0,
                  transform: mobileOpen ? "translateX(0)" : "translateX(-8px)",
                  transition: `opacity 0.3s ease ${i * 50 + 100}ms, transform 0.3s ease ${i * 50 + 100}ms`,
                }}
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <button
              onClick={() => {
                setMobileOpen(false);
                setSearchOpen(true);
              }}
              className="text-gray-800 dark:text-gray-200 hover:text-moss dark:hover:text-sage transition-colors text-left"
              style={{
                opacity: mobileOpen ? 1 : 0,
                transform: mobileOpen ? "translateX(0)" : "translateX(-8px)",
                transition: "opacity 0.3s ease 350ms, transform 0.3s ease 350ms",
              }}
            >
              Search
            </button>
          </div>
        </div>
      </nav>

      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
