"use client";

import { useState, useEffect, useRef, useMemo, useCallback } from "react";
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
import KamuraScoreBadge from "@/components/treatments/KamuraScoreBadge";

interface InlineSearchProps {
  placeholder?: string;
  popularSearches?: string[];
}

export default function InlineSearch({
  placeholder = "Search treatments, clinics, or articles...",
  popularSearches,
}: InlineSearchProps) {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const indexRef = useRef<SearchItem[]>([]);
  const loadedRef = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Debounce query
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(query), 300);
    return () => clearTimeout(timer);
  }, [query]);

  // Fetch search index on first focus
  const loadIndex = useCallback(() => {
    if (loadedRef.current) return;
    loadedRef.current = true;
    fetch("/api/search-index")
      .then((r) => r.json())
      .then((data) => {
        indexRef.current = [
          ...(data.treatments || []),
          ...(data.listings || []),
          ...(data.posts || []),
          ...(data.events || []),
        ];
      })
      .catch(() => {});
  }, []);

  // Click outside to close
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter and group results
  const results = useMemo(
    () => filterSearchItems(indexRef.current, debouncedQuery),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [debouncedQuery, indexRef.current.length]
  );

  const grouped = useMemo(() => groupSearchResults(results, 3), [results]);
  const flatResults = useMemo(() => flattenGrouped(grouped), [grouped]);
  const hasResults = flatResults.length > 0;
  const showDropdown = isOpen && debouncedQuery.trim().length >= 2;

  // Reset active index on query change
  useEffect(() => {
    setActiveIndex(-1);
  }, [debouncedQuery]);

  // Scroll active item into view
  useEffect(() => {
    if (activeIndex >= 0 && resultsRef.current) {
      const buttons = resultsRef.current.querySelectorAll("[data-search-result]");
      buttons[activeIndex]?.scrollIntoView({ block: "nearest" });
    }
  }, [activeIndex]);

  function navigate(url: string) {
    router.push(url);
    setIsOpen(false);
    setQuery("");
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Escape") {
      setIsOpen(false);
      inputRef.current?.blur();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (!isOpen) setIsOpen(true);
      setActiveIndex((prev) => (prev < flatResults.length - 1 ? prev + 1 : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => (prev > 0 ? prev - 1 : flatResults.length - 1));
    } else if (e.key === "Enter" && activeIndex >= 0 && flatResults[activeIndex]) {
      e.preventDefault();
      navigate(flatResults[activeIndex].url);
    }
  }

  function handlePopularClick(term: string) {
    setQuery(term);
    setIsOpen(true);
    inputRef.current?.focus();
  }

  let resultIndex = -1;

  return (
    <div ref={containerRef} className="relative w-full max-w-[640px] mx-auto">
      {/* Search input */}
      <div className="relative">
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
          className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            if (!isOpen) setIsOpen(true);
          }}
          onFocus={() => {
            loadIndex();
            if (query.trim().length >= 2) setIsOpen(true);
          }}
          onKeyDown={handleKeyDown}
          className="w-full bg-white dark:bg-[#1A1A1A] border border-gray-300 dark:border-white/[0.08] rounded-2xl pl-13 pr-5 py-4 text-base text-gray-900 dark:text-[#F5F0EB] placeholder:text-gray-400 dark:placeholder:text-[#6B6560] outline-none focus:border-sage/60 focus:ring-2 focus:ring-sage/20 font-sans shadow-md transition-all"
          aria-label="Search treatments, clinics, or articles"
          role="combobox"
          aria-expanded={showDropdown}
        />
        {query && (
          <button
            onClick={() => {
              setQuery("");
              setIsOpen(false);
            }}
            className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Clear search"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}
      </div>

      {/* Dropdown results */}
      {showDropdown && (
        <div
          ref={resultsRef}
          className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-white/[0.08] rounded-xl shadow-2xl max-h-[400px] overflow-y-auto z-50"
          role="listbox"
        >
          {!hasResults && (
            <div className="px-6 py-8 text-center">
              <p className="text-sm text-gray-400 font-sans">
                No results for &ldquo;{debouncedQuery}&rdquo;
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-600 font-sans mt-1">
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
                  <div key={type} className="px-3 py-1.5">
                    <p className="text-[10px] text-gray-400 uppercase tracking-wider font-sans font-semibold px-2 mb-1.5">
                      {TYPE_LABELS[type]}
                    </p>
                    {items.map((item) => {
                      resultIndex++;
                      const idx = resultIndex;
                      return (
                        <button
                          key={item.url}
                          data-search-result
                          role="option"
                          aria-selected={activeIndex === idx}
                          onClick={() => navigate(item.url)}
                          className={`w-full text-left px-3 py-2.5 rounded-lg transition-colors flex items-center gap-3 ${
                            activeIndex === idx
                              ? "bg-gray-100 dark:bg-gray-800"
                              : "hover:bg-gray-50 dark:hover:bg-gray-800/50"
                          }`}
                        >
                          <span
                            className={`text-[10px] px-2 py-0.5 rounded-full font-sans shrink-0 ${TYPE_COLORS[type]}`}
                          >
                            {TYPE_DISPLAY[item.type]}
                          </span>
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-medium text-gray-900 dark:text-gray-100 font-sans truncate">
                              {item.title}
                            </p>
                            {item.type === "listing" && item.location && (
                              <p className="text-xs text-gray-400 font-sans truncate mt-0.5">
                                {item.location}
                              </p>
                            )}
                            {item.type !== "treatment" && item.type !== "listing" && (
                              <p className="text-xs text-gray-400 font-sans truncate mt-0.5">
                                {item.excerpt}
                              </p>
                            )}
                          </div>
                          {item.type === "treatment" && item.kamuraScore && (
                            <div className="shrink-0">
                              <KamuraScoreBadge score={item.kamuraScore} size="sm" />
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Popular searches */}
      {popularSearches && !showDropdown && (
        <div className="flex flex-wrap justify-center gap-2 mt-5">
          <span className="text-xs text-gray-400 dark:text-gray-500 font-sans self-center mr-1">
            Popular:
          </span>
          {popularSearches.map((term) => (
            <button
              key={term}
              onClick={() => handlePopularClick(term)}
              className="px-3.5 py-1.5 rounded-full text-[13px] font-sans bg-white dark:bg-[#1A1A1A] border border-gray-300 dark:border-white/[0.08] text-gray-600 dark:text-[#A89F95] shadow-sm hover:shadow-md hover:border-sage/40 hover:text-gray-900 dark:hover:text-[#F5F0EB] transition-all"
            >
              {term}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
