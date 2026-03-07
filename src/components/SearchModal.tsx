"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";

interface SearchItem {
  type: "blog" | "listing" | "event";
  title: string;
  excerpt: string;
  category: string;
  url: string;
}

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TYPE_LABELS: Record<string, string> = {
  listing: "LISTINGS",
  blog: "ARTICLES",
  event: "EVENTS",
};

const TYPE_COLORS: Record<string, string> = {
  listing: "bg-terracotta/10 text-terracotta",
  blog: "bg-blue-100 text-blue-800",
  event: "bg-emerald-100 text-emerald-800",
};

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState<SearchItem[]>([]);
  const [loaded, setLoaded] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const stableOnClose = useCallback(() => onClose(), [onClose]);

  // Fetch search index on first open
  useEffect(() => {
    if (isOpen && !loaded) {
      fetch("/api/search-index")
        .then((r) => r.json())
        .then((data) => {
          const all: SearchItem[] = [
            ...data.listings,
            ...data.posts,
            ...data.events,
          ];
          setIndex(all);
          setLoaded(true);
        });
    }
  }, [isOpen, loaded]);

  // Auto-focus input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery("");
    }
  }, [isOpen]);

  // Escape key to close + body scroll lock
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") stableOnClose();
    }
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, stableOnClose]);

  const results =
    query.trim().length < 2
      ? []
      : index.filter((item) => {
          const q = query.toLowerCase();
          return (
            item.title.toLowerCase().includes(q) ||
            item.excerpt.toLowerCase().includes(q) ||
            item.category.toLowerCase().includes(q)
          );
        });

  const grouped = {
    listing: results.filter((r) => r.type === "listing").slice(0, 5),
    blog: results.filter((r) => r.type === "blog").slice(0, 5),
    event: results.filter((r) => r.type === "event").slice(0, 5),
  };

  const hasResults =
    grouped.listing.length > 0 ||
    grouped.blog.length > 0 ||
    grouped.event.length > 0;

  function navigate(url: string) {
    router.push(url);
    stableOnClose();
  }

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm"
      onClick={stableOnClose}
    >
      <div
        className="max-w-2xl mx-auto mt-12 md:mt-24 mx-4 md:mx-auto bg-white dark:bg-[#1a1a1a] rounded-xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search input */}
        <div className="flex items-center gap-3 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-gray-400 shrink-0"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            placeholder="Search listings, articles, events..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 text-sm font-sans text-gray-800 dark:text-gray-200 placeholder-gray-400 outline-none bg-transparent"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          )}
          <kbd className="hidden md:inline-block text-xs text-gray-400 border border-gray-200 rounded px-1.5 py-0.5 font-sans">
            ESC
          </kbd>
        </div>

        {/* Results */}
        <div className="max-h-[60vh] overflow-y-auto">
          {query.trim().length < 2 && (
            <div className="px-6 py-10 text-center">
              <p className="text-sm text-gray-400 font-sans">
                Type at least 2 characters to search
              </p>
              <p className="text-xs text-gray-300 font-sans mt-2">
                Search across {index.length > 0 ? index.length : "all"}{" "}
                listings, articles, and events
              </p>
            </div>
          )}

          {query.trim().length >= 2 && !hasResults && (
            <div className="px-6 py-10 text-center">
              <p className="text-sm text-gray-400 font-sans">
                No results for &ldquo;{query}&rdquo;
              </p>
              <p className="text-xs text-gray-300 font-sans mt-2">
                Try a different search term
              </p>
            </div>
          )}

          {hasResults && (
            <div className="py-2">
              {(["listing", "blog", "event"] as const).map((type) => {
                const items = grouped[type];
                if (items.length === 0) return null;
                return (
                  <div key={type} className="px-4 py-2">
                    <p className="text-xs text-gray-400 uppercase tracking-wider font-sans px-2 mb-2">
                      {TYPE_LABELS[type]}
                    </p>
                    {items.map((item) => (
                      <button
                        key={item.url}
                        onClick={() => navigate(item.url)}
                        className="w-full text-left px-3 py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex items-start gap-3"
                      >
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded-full font-sans shrink-0 mt-0.5 ${TYPE_COLORS[type]}`}
                        >
                          {item.type === "listing"
                            ? "Place"
                            : item.type === "blog"
                              ? "Article"
                              : "Event"}
                        </span>
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-gray-900 dark:text-gray-100 font-sans truncate">
                            {item.title}
                          </p>
                          <p className="text-xs text-gray-400 font-sans truncate mt-0.5">
                            {item.excerpt}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-100 dark:border-gray-800 px-6 py-3 flex items-center justify-between">
          <p className="text-xs text-gray-300 font-sans">
            <kbd className="border border-gray-200 rounded px-1 py-0.5 mr-1">
              &#8984;K
            </kbd>
            to search
          </p>
          <button
            onClick={stableOnClose}
            className="text-xs text-gray-400 hover:text-gray-600 font-sans"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
