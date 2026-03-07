"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import SearchModal from "./SearchModal";
import ThemeToggle from "./ThemeToggle";

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

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

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-[#0f0f0f]/90 backdrop-blur-sm border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Left nav links - desktop */}
          <div className="hidden md:flex items-center gap-8 text-sm tracking-wide min-w-[200px]">
            <Link href="/" className="text-gray-800 dark:text-gray-200 hover:text-terracotta transition-colors">
              Blog
            </Link>
            <Link href="/explore" className="text-gray-800 dark:text-gray-200 hover:text-terracotta transition-colors">
              Explore
            </Link>
            <Link href="/events" className="text-gray-800 dark:text-gray-200 hover:text-terracotta transition-colors">
              Events
            </Link>
            <Link href="/about" className="text-gray-800 dark:text-gray-200 hover:text-terracotta transition-colors">
              About
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-gray-800 dark:text-gray-200"
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
          <Link href="/" className="font-serif text-2xl tracking-[0.15em] text-gray-900 dark:text-white">
            KAMURA
          </Link>

          {/* Right - Search + Instagram */}
          <div className="flex items-center justify-end gap-4 min-w-[200px]">
            <button
              onClick={() => setSearchOpen(true)}
              className="text-gray-800 dark:text-gray-200 hover:text-terracotta transition-colors"
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
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-800 dark:text-gray-200 hover:text-terracotta transition-colors"
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

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden bg-white dark:bg-[#0f0f0f] border-t border-gray-100 dark:border-gray-800 px-6 py-4 flex flex-col gap-4 text-sm tracking-wide">
            <Link
              href="/"
              className="text-gray-800 dark:text-gray-200 hover:text-terracotta transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              Blog
            </Link>
            <Link
              href="/explore"
              className="text-gray-800 dark:text-gray-200 hover:text-terracotta transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              Explore
            </Link>
            <Link
              href="/events"
              className="text-gray-800 dark:text-gray-200 hover:text-terracotta transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              Events
            </Link>
            <Link
              href="/about"
              className="text-gray-800 dark:text-gray-200 hover:text-terracotta transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              About
            </Link>
            <button
              onClick={() => {
                setMobileOpen(false);
                setSearchOpen(true);
              }}
              className="text-gray-800 hover:text-terracotta transition-colors text-left"
            >
              Search
            </button>
          </div>
        )}
      </nav>

      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
