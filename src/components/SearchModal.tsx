"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  type SearchItem,
  TYPE_LABELS,
  TYPE_COLORS,
  TYPE_DISPLAY,
  filterSearchItems,
  groupSearchResults,
  flattenGrouped,
} from "@/lib/search-utils";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [index, setIndex] = useState<SearchItem[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const stableOnClose = useCallback(() => onClose(), [onClose]);

  // Debounce search query (300ms)
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(query), 300);
    return () => clearTimeout(timer);
  }, [query]);

  // Fetch search index on first open
  useEffect(() => {
    if (isOpen && !loaded) {
      fetch("/api/search-index")
        .then((r) => r.json())
        .then((data) => {
          const all: SearchItem[] = [
            ...(data.treatments || []),
            ...data.listings,
            ...data.posts,
            ...data.events,
          ];
          setIndex(all);
          setLoaded(true);
        })
        .catch(() => {
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
      setDebouncedQuery("");
      setActiveIndex(-1);
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

  const results = useMemo(
    () => filterSearchItems(index, debouncedQuery),
    [debouncedQuery, index]
  );

  const grouped = useMemo(() => groupSearchResults(results, 5), [results]);

  const flatResults = useMemo(() => flattenGrouped(grouped), [grouped]);

  const hasResults = flatResults.length > 0;

  // Reset active index when results change
  useEffect(() => {
    setActiveIndex(-1);
  }, [debouncedQuery]);

  function navigate(url: string) {
    router.push(url);
    stableOnClose();
  }

  // Keyboard navigation
  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => (prev < flatResults.length - 1 ? prev + 1 : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => (prev > 0 ? prev - 1 : flatResults.length - 1));
    } else if (e.key === "Enter" && activeIndex >= 0 && flatResults[activeIndex]) {
      e.preventDefault();
      navigate(flatResults[activeIndex].url);
    }
  }

  // Scroll active item into view
  useEffect(() => {
    if (activeIndex >= 0 && resultsRef.current) {
      const buttons = resultsRef.current.querySelectorAll("[data-search-result]");
      buttons[activeIndex]?.scrollIntoView({ block: "nearest" });
    }
  }, [activeIndex]);

  if (!isOpen) return null;

  let resultIndex = -1;

  return (
    <div
      className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm"
      onClick={stableOnClose}
    >
      <div
        className="max-w-2xl mx-auto mt-12 md:mt-24 mx-4 md:mx-auto bg-white dark:bg-[#1a1a1a] rounded-xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
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
            aria-hidden="true"
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
            aria-label="Search listings, articles, and events"
            role="combobox"
            aria-expanded={hasResults}
            aria-activedescendant={activeIndex >= 0 ? `search-result-${activeIndex}` : undefined}
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="text-gray-400 hover:text-gray-600"
              aria-label="Clear search"
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
        <div className="max-h-[60vh] overflow-y-auto" ref={resultsRef} role="listbox">
          {debouncedQuery.trim().length < 2 && (
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

          {debouncedQuery.trim().length >= 2 && !hasResults && (
            <div className="px-6 py-10 text-center">
              <p className="text-sm text-gray-400 font-sans">
                No results for &ldquo;{debouncedQuery}&rdquo;
              </p>
              <p className="text-xs text-gray-300 font-sans mt-2">
                Try a different search term
              </p>
            </div>
          )}

          {hasResults && (
            <div className="py-2">
              {(["treatment", "listing", "blog", "event"] as const).map((type) => {
                const items = grouped[type];
                if (items.length === 0) return null;
                return (
                  <div key={type} className="px-4 py-2">
                    <p className="text-xs text-gray-400 uppercase tracking-wider font-sans px-2 mb-2">
                      {TYPE_LABELS[type]}
                    </p>
                    {items.map((item) => {
                      resultIndex++;
                      const idx = resultIndex;
                      return (
                        <button
                          key={item.url}
                          id={`search-result-${idx}`}
                          data-search-result
                          role="option"
                          aria-selected={activeIndex === idx}
                          onClick={() => navigate(item.url)}
                          className={`w-full text-left px-3 py-3 rounded-lg transition-colors flex items-start gap-3 ${
                            activeIndex === idx
                              ? "bg-gray-100 dark:bg-gray-800"
                              : "hover:bg-gray-50 dark:hover:bg-gray-800"
                          }`}
                        >
                          <span
                            className={`text-[10px] px-2 py-0.5 rounded-full font-sans shrink-0 mt-0.5 ${TYPE_COLORS[type]}`}
                          >
                            {TYPE_DISPLAY[item.type]}
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
                      );
                    })}
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
            to search &middot;{" "}
            <kbd className="border border-gray-200 rounded px-1 py-0.5 mx-0.5">
              &uarr;&darr;
            </kbd>{" "}
            to navigate &middot;{" "}
            <kbd className="border border-gray-200 rounded px-1 py-0.5 mx-0.5">
              Enter
            </kbd>{" "}
            to select
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
