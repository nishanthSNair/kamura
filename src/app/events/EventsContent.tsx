"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { events, categoryColors, type Event, type EventCategory } from "@/data/events";
import { news } from "@/data/news";

const TODAY = new Date();
TODAY.setHours(0, 0, 0, 0);

const ALL_CATEGORIES: EventCategory[] = [
  "Biohacking",
  "Wellness Festival",
  "Health & MedTech",
  "Longevity",
  "Fitness",
  "Global Summit",
];

type ViewTab = "upcoming" | "past" | "calendar";

function isUpcoming(event: Event): boolean {
  return new Date(event.dateEnd) >= TODAY;
}

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number): number {
  return new Date(year, month, 1).getDay();
}

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function getCountdown(dateStart: string): { days: number; label: string } | null {
  const start = new Date(dateStart);
  const now = new Date();
  const diff = start.getTime() - now.getTime();
  if (diff <= 0) return null;
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
  if (days === 1) return { days, label: "day away" };
  return { days, label: "days away" };
}

function buildGoogleCalendarUrl(event: Event): string {
  const start = event.dateStart.replace(/-/g, "");
  const endDate = new Date(event.dateEnd);
  endDate.setDate(endDate.getDate() + 1);
  const end = endDate.toISOString().split("T")[0].replace(/-/g, "");
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: event.title,
    dates: `${start}/${end}`,
    details: `${event.subtitle}\n\n${event.website}`,
    location: event.location,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export default function EventsContent() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [activeTab, setActiveTab] = useState<ViewTab>("upcoming");
  const [expandedEvent, setExpandedEvent] = useState<string | null>(null);
  const [calendarMonth, setCalendarMonth] = useState(TODAY.getMonth());
  const [calendarYear, setCalendarYear] = useState(TODAY.getFullYear());
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredEvents = useMemo(() => {
    let filtered = events;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (e) =>
          e.title.toLowerCase().includes(q) ||
          e.subtitle.toLowerCase().includes(q) ||
          e.location.toLowerCase().includes(q) ||
          e.category.toLowerCase().includes(q)
      );
    }

    if (activeCategory !== "All") {
      filtered = filtered.filter((e) => e.category === activeCategory);
    }
    if (activeTab === "upcoming") {
      filtered = filtered.filter(isUpcoming);
      filtered.sort((a, b) => new Date(a.dateStart).getTime() - new Date(b.dateStart).getTime());
    } else if (activeTab === "past") {
      filtered = filtered.filter((e) => !isUpcoming(e));
      filtered.sort((a, b) => new Date(b.dateStart).getTime() - new Date(a.dateStart).getTime());
    } else {
      filtered.sort((a, b) => new Date(a.dateStart).getTime() - new Date(b.dateStart).getTime());
    }
    return filtered;
  }, [activeCategory, activeTab, searchQuery]);

  const calendarEvents = useMemo(() => {
    let filtered = events;
    if (activeCategory !== "All") {
      filtered = filtered.filter((e) => e.category === activeCategory);
    }
    return filtered;
  }, [activeCategory]);

  const eventsForSelectedDay = useMemo(() => {
    if (selectedDay === null) return [];
    const dayDate = new Date(calendarYear, calendarMonth, selectedDay);
    return calendarEvents.filter((event) => {
      const start = new Date(event.dateStart);
      const end = new Date(event.dateEnd);
      start.setHours(0, 0, 0, 0);
      end.setHours(0, 0, 0, 0);
      return dayDate >= start && dayDate <= end;
    });
  }, [selectedDay, calendarMonth, calendarYear, calendarEvents]);

  function getEventsOnDay(day: number): Event[] {
    const dayDate = new Date(calendarYear, calendarMonth, day);
    return calendarEvents.filter((event) => {
      const start = new Date(event.dateStart);
      const end = new Date(event.dateEnd);
      start.setHours(0, 0, 0, 0);
      end.setHours(0, 0, 0, 0);
      return dayDate >= start && dayDate <= end;
    });
  }

  function scrollToEvent(eventId: string) {
    setActiveTab("upcoming");
    setExpandedEvent(eventId);
    setTimeout(() => {
      const el = document.getElementById(`event-${eventId}`);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 100);
  }

  // Fade-in on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0");
            entry.target.classList.remove("opacity-0", "translate-y-4");
          }
        });
      },
      { threshold: 0.1 }
    );
    const elements = document.querySelectorAll(".fade-in-on-scroll");
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [filteredEvents, activeTab]);

  const upcomingCount = events.filter(isUpcoming).length;
  const totalAttendees = events.reduce((sum, e) => {
    const num = parseInt(e.attendees.replace(/[^0-9]/g, "")) || 0;
    return sum + num;
  }, 0);

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1920&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-forest/50 via-black/25 to-forest/40" />
        <div className="relative z-10 text-center text-white px-6 max-w-3xl">
          <p className="text-xs tracking-[0.3em] uppercase mb-6 text-white/80">
            KAMURA Events
          </p>
          <h1 className="text-4xl md:text-6xl font-serif mb-6 leading-tight">
            Summits, Festivals &amp; Gatherings
          </h1>
          <p className="text-lg md:text-xl text-white/90 leading-relaxed font-sans">
            Discover the events shaping wellness in the UAE and beyond — from
            biohacking summits to sound healing retreats.
          </p>
        </div>
      </section>

      {/* Quick Stats Bar */}
      <section className="border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            <div className="text-center">
              <p className="font-serif text-2xl text-gray-900 dark:text-gray-100">{events.length}</p>
              <p className="text-xs text-gray-500 dark:text-gray-500 uppercase tracking-wider font-sans">Events Tracked</p>
            </div>
            <div className="text-center">
              <p className="font-serif text-2xl text-emerald-700">{upcomingCount}</p>
              <p className="text-xs text-gray-500 dark:text-gray-500 uppercase tracking-wider font-sans">Upcoming</p>
            </div>
            <div className="text-center">
              <p className="font-serif text-2xl text-gray-900 dark:text-gray-100">{totalAttendees.toLocaleString()}+</p>
              <p className="text-xs text-gray-500 dark:text-gray-500 uppercase tracking-wider font-sans">Total Attendees</p>
            </div>
            <div className="text-center">
              <p className="font-serif text-2xl text-gray-900 dark:text-gray-100">{ALL_CATEGORIES.length}</p>
              <p className="text-xs text-gray-500 dark:text-gray-500 uppercase tracking-wider font-sans">Categories</p>
            </div>
          </div>
        </div>
      </section>

      {/* Search + Filter Bar */}
      <section className="max-w-6xl mx-auto px-6 pt-10 pb-6">
        {/* Search */}
        <div className="relative mb-6">
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-500" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            placeholder="Search events by name, location, or category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-sans text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 bg-white dark:bg-[#1a1a1a] focus:outline-none focus:border-sage/50 focus:ring-1 focus:ring-sage/20 transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          )}
        </div>

        {/* Category Chips */}
        <div className="flex flex-wrap gap-2 mb-6">
          {["All", ...ALL_CATEGORIES].map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setSelectedDay(null);
              }}
              className={`px-4 py-2 text-sm font-sans rounded-full border transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-moss text-white border-moss"
                  : "bg-white dark:bg-[#1a1a1a] text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:border-sage dark:hover:border-sage/50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* View Tabs */}
        <div className="flex gap-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1 w-fit">
          {(["upcoming", "past", "calendar"] as ViewTab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setSelectedDay(null);
              }}
              className={`px-5 py-2 text-sm font-sans rounded-md transition-all duration-200 capitalize ${
                activeTab === tab
                  ? "bg-white dark:bg-[#1a1a1a] text-gray-900 dark:text-gray-100 shadow-sm"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              }`}
            >
              {tab === "calendar" ? "Calendar View" : tab}
            </button>
          ))}
        </div>
      </section>

      {/* Calendar View */}
      {activeTab === "calendar" && (
        <section className="max-w-6xl mx-auto px-6 pb-8">
          <div className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
              <button
                onClick={() => {
                  setSelectedDay(null);
                  if (calendarMonth === 0) {
                    setCalendarMonth(11);
                    setCalendarYear(calendarYear - 1);
                  } else {
                    setCalendarMonth(calendarMonth - 1);
                  }
                }}
                className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
                aria-label="Previous month"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
              <h3 className="font-serif text-xl text-gray-900 dark:text-gray-100">
                {MONTH_NAMES[calendarMonth]} {calendarYear}
              </h3>
              <button
                onClick={() => {
                  setSelectedDay(null);
                  if (calendarMonth === 11) {
                    setCalendarMonth(0);
                    setCalendarYear(calendarYear + 1);
                  } else {
                    setCalendarMonth(calendarMonth + 1);
                  }
                }}
                className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
                aria-label="Next month"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>

            <div className="grid grid-cols-7 border-b border-gray-200 dark:border-gray-700">
              {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
                <div key={i} className="px-1 md:px-2 py-2 md:py-3 text-center text-[10px] md:text-xs font-sans uppercase tracking-wider text-gray-500 dark:text-gray-500">
                  <span className="md:hidden">{d}</span>
                  <span className="hidden md:inline">{["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][i]}</span>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7">
              {Array.from({ length: getFirstDayOfMonth(calendarYear, calendarMonth) }).map((_, i) => (
                <div key={`empty-${i}`} className="h-14 md:h-24 border-b border-r border-gray-100 dark:border-gray-800" />
              ))}
              {Array.from({ length: getDaysInMonth(calendarYear, calendarMonth) }).map((_, i) => {
                const day = i + 1;
                const dayEvents = getEventsOnDay(day);
                const isToday =
                  day === TODAY.getDate() &&
                  calendarMonth === TODAY.getMonth() &&
                  calendarYear === TODAY.getFullYear();
                const isSelected = day === selectedDay;

                return (
                  <button
                    key={day}
                    onClick={() => {
                      if (dayEvents.length > 0) {
                        setSelectedDay(isSelected ? null : day);
                      }
                    }}
                    className={`h-14 md:h-24 border-b border-r border-gray-100 dark:border-gray-800 p-1 md:p-2 text-left transition-colors relative ${
                      dayEvents.length > 0 ? "cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900" : "cursor-default"
                    } ${isSelected ? "bg-gray-50 dark:bg-gray-900 ring-1 ring-inset ring-terracotta/30" : ""}`}
                  >
                    <span className={`text-xs md:text-sm font-sans inline-flex items-center justify-center w-6 h-6 md:w-7 md:h-7 rounded-full ${isToday ? "bg-terracotta text-white" : "text-gray-700 dark:text-gray-300"}`}>
                      {day}
                    </span>
                    {dayEvents.length > 0 && (
                      <div className="flex flex-wrap gap-0.5 md:gap-1 mt-0.5 md:mt-1">
                        {dayEvents.slice(0, 2).map((ev) => (
                          <span key={ev.id} className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full ${categoryColors[ev.category].dot}`} title={ev.title} />
                        ))}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {selectedDay !== null && eventsForSelectedDay.length > 0 && (
            <div className="mt-6 space-y-4">
              <h4 className="font-serif text-lg text-gray-900 dark:text-gray-100">
                {MONTH_NAMES[calendarMonth]} {selectedDay}, {calendarYear}
              </h4>
              {eventsForSelectedDay.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  expanded={expandedEvent === event.id}
                  onToggle={() => setExpandedEvent(expandedEvent === event.id ? null : event.id)}
                />
              ))}
            </div>
          )}
        </section>
      )}

      {/* Event Cards Listing */}
      {activeTab !== "calendar" && (
        <section className="max-w-6xl mx-auto px-6 pb-20">
          {filteredEvents.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-500 text-center py-16 font-sans">
              No events found{searchQuery ? ` for "${searchQuery}"` : " for this filter"}.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredEvents.map((event, i) => (
                <div
                  key={event.id}
                  className="fade-in-on-scroll opacity-0 translate-y-4 transition-all duration-500"
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  <EventCard
                    event={event}
                    expanded={expandedEvent === event.id}
                    onToggle={() => setExpandedEvent(expandedEvent === event.id ? null : event.id)}
                  />
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {/* Submit Your Event CTA */}
      <section className="border-t border-gray-100 dark:border-gray-800">
        <div className="max-w-4xl mx-auto px-6 py-16 text-center">
          <h3 className="font-serif text-2xl text-gray-900 dark:text-gray-100 mb-3">
            Know an event we should feature?
          </h3>
          <p className="text-gray-500 dark:text-gray-400 font-sans mb-6 leading-relaxed">
            We&apos;re always looking for wellness, longevity, and biohacking events across the UAE and beyond.
          </p>
          <a
            href="mailto:hello@kamuralife.com?subject=Event%20Submission&body=Event%20Name%3A%0ADate%3A%0ALocation%3A%0AWebsite%3A%0ABrief%20Description%3A"
            className="inline-flex items-center gap-2 bg-moss text-white px-8 py-3 text-sm tracking-[0.1em] uppercase hover:bg-forest transition-colors font-sans"
          >
            Submit an Event
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
            </svg>
          </a>
        </div>
      </section>

      {/* News & Coverage Feed */}
      <section className="border-t border-sage-light/60 dark:border-forest/30 bg-zen-mist/50 dark:bg-forest/5">
        <div className="max-w-6xl mx-auto px-6 py-20 md:py-28">
          <div className="mb-12">
            <h2 className="font-serif text-3xl md:text-4xl text-gray-900 dark:text-gray-100 mb-3">
              What Happened — News &amp; Coverage
            </h2>
            <p className="text-gray-500 dark:text-gray-400 font-sans">
              Recaps, announcements, and coverage from reputed sources
            </p>
            <div className="w-12 h-px bg-terracotta/40 mt-6" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.map((item, i) => (
              <article
                key={item.id}
                className="fade-in-on-scroll opacity-0 translate-y-4 transition-all duration-500 bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-700 rounded-xl p-6 flex flex-col"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <span
                    className={`text-xs px-2.5 py-1 rounded-full font-sans ${
                      categoryColors[item.category as EventCategory]?.bg || "bg-gray-100 dark:bg-gray-800"
                    } ${
                      categoryColors[item.category as EventCategory]?.text || "text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    {item.category}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-500 font-sans mb-3">
                  <span className="font-medium text-gray-600 dark:text-gray-400">{item.source}</span>
                  <span>&middot;</span>
                  <span>{item.date}</span>
                </div>
                <h3 className="font-serif text-lg text-gray-900 dark:text-gray-100 leading-snug mb-3">
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-terracotta transition-colors"
                  >
                    {item.title}
                  </a>
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed font-sans mb-4 flex-1">
                  {item.summary}
                </p>
                <button
                  onClick={() => scrollToEvent(item.relatedEventId)}
                  className="text-sm text-terracotta hover:text-terracotta-dark transition-colors font-sans text-left"
                >
                  Related: {item.relatedEventTitle} &rarr;
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Live Wellness News Feed */}
      <LiveNewsFeed />
    </>
  );
}

/* ─── Live News Feed Component ─── */

interface RssItem {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  source: string;
}

function LiveNewsFeed() {
  const [articles, setArticles] = useState<RssItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const feeds = [
      "https://news.google.com/rss/search?q=wellness+dubai+longevity&hl=en-US&gl=US&ceid=US:en",
      "https://news.google.com/rss/search?q=biohacking+UAE+health&hl=en-US&gl=US&ceid=US:en",
    ];

    async function fetchFeeds() {
      try {
        const results: RssItem[] = [];

        for (const feedUrl of feeds) {
          try {
            const res = await fetch(
              `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feedUrl)}&count=6`
            );
            if (!res.ok) continue;
            const data = await res.json();
            if (data.status === "ok" && data.items) {
              for (const item of data.items) {
                results.push({
                  title: item.title || "",
                  link: item.link || "",
                  pubDate: item.pubDate || "",
                  description: (item.description || "").replace(/<[^>]+>/g, "").slice(0, 150),
                  source: item.author || extractDomain(item.link),
                });
              }
            }
          } catch {
            // Skip failed feed
          }
        }

        // Deduplicate by title
        const seen = new Set<string>();
        const unique = results.filter((item) => {
          const key = item.title.toLowerCase().slice(0, 50);
          if (seen.has(key)) return false;
          seen.add(key);
          return true;
        });

        unique.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());
        setArticles(unique.slice(0, 9));
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchFeeds();
  }, []);

  if (!loading && articles.length === 0 && !error) return null;

  if (error) {
    return (
      <section className="border-t border-gray-100 dark:border-gray-800">
        <div className="max-w-6xl mx-auto px-6 py-16 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-500 font-sans">
            Unable to load live news right now. Check back later.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="border-t border-gray-100 dark:border-gray-800">
      <div className="max-w-6xl mx-auto px-6 py-20 md:py-28">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-3">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-gray-900 dark:text-gray-100">
              Live Wellness News
            </h2>
          </div>
          <p className="text-gray-500 dark:text-gray-400 font-sans">
            Latest headlines from around the web — updated automatically
          </p>
          <div className="w-12 h-px bg-terracotta/40 mt-6" />
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="border border-gray-200 dark:border-gray-700 rounded-xl p-6 animate-pulse">
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-4" />
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2" />
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3 mb-4" />
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article, i) => (
              <a
                key={i}
                href={article.link}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-gray-200 dark:border-gray-700 rounded-xl p-6 bg-white dark:bg-[#1a1a1a] hover:shadow-md transition-shadow flex flex-col"
              >
                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-500 font-sans mb-3">
                  <span className="font-medium text-gray-600 dark:text-gray-400">{article.source}</span>
                  <span>&middot;</span>
                  <span>{formatPubDate(article.pubDate)}</span>
                </div>
                <h3 className="font-serif text-base text-gray-900 dark:text-gray-100 leading-snug mb-3 flex-1 hover:text-terracotta transition-colors">
                  {article.title}
                </h3>
                {article.description && (
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-sans leading-relaxed line-clamp-2">
                    {article.description}
                  </p>
                )}
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function extractDomain(url: string): string {
  try {
    return new URL(url).hostname.replace("www.", "");
  } catch {
    return "Source";
  }
}

function formatPubDate(dateStr: string): string {
  try {
    return new Date(dateStr).toLocaleDateString("en-US", { month: "short", day: "numeric" });
  } catch {
    return dateStr;
  }
}

/* ─── Event Card Component ─── */

function EventCard({
  event,
  expanded,
  onToggle,
}: {
  event: Event;
  expanded: boolean;
  onToggle: () => void;
}) {
  const upcoming = isUpcoming(event);
  const colors = categoryColors[event.category];
  const countdown = upcoming ? getCountdown(event.dateStart) : null;

  return (
    <div
      id={`event-${event.id}`}
      className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden bg-white dark:bg-[#1a1a1a] transition-shadow duration-300 hover:shadow-md"
    >
      <button
        onClick={onToggle}
        className="w-full text-left p-6 focus:outline-none"
      >
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className={`text-xs px-2.5 py-1 rounded-full font-sans ${colors.bg} ${colors.text}`}>
            {event.category}
          </span>
          <span className={`text-xs px-2.5 py-1 rounded-full font-sans ${upcoming ? "bg-emerald-50 text-emerald-700" : "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400"}`}>
            {upcoming ? "UPCOMING" : "PAST"}
          </span>
          {countdown && (
            <span className="text-xs px-2.5 py-1 rounded-full font-sans bg-terracotta/10 text-terracotta font-medium">
              {countdown.days} {countdown.label}
            </span>
          )}
        </div>
        <h3 className="font-serif text-xl text-gray-900 dark:text-gray-100 leading-snug mb-2">
          <Link href={`/events/${event.id}`} className="hover:text-terracotta transition-colors" onClick={(e) => e.stopPropagation()}>
            {event.title}
          </Link>
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 font-sans leading-relaxed mb-4">
          {event.subtitle}
        </p>
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-600 dark:text-gray-400 font-sans">
          <span className="flex items-center gap-1.5">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            {event.dates}
          </span>
          <span className="flex items-center gap-1.5">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
            </svg>
            {event.location}
          </span>
        </div>
        <div className="mt-4 flex items-center gap-1 text-xs text-terracotta font-sans">
          {expanded ? "Hide details" : "View details"}
          <svg
            width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            className={`transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </button>

      <div className={`overflow-hidden transition-all duration-300 ${expanded ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"}`}>
        <div className="px-6 pb-6 border-t border-gray-100 dark:border-gray-800 pt-4">
          <div className="grid grid-cols-3 gap-4 mb-5">
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-500 uppercase tracking-wider font-sans mb-1">Attendees</p>
              <p className="text-sm font-sans text-gray-800 dark:text-gray-200">{event.attendees}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-500 uppercase tracking-wider font-sans mb-1">Speakers</p>
              <p className="text-sm font-sans text-gray-800 dark:text-gray-200">{event.speakers}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-500 uppercase tracking-wider font-sans mb-1">Price</p>
              <p className="text-sm font-sans text-gray-800 dark:text-gray-200">{event.price}</p>
            </div>
          </div>
          <div className="mb-5">
            <p className="text-xs text-gray-500 dark:text-gray-500 uppercase tracking-wider font-sans mb-2">Key Highlights</p>
            <ul className="space-y-2">
              {event.highlights.map((h, i) => (
                <li key={i} className="text-sm text-gray-600 dark:text-gray-400 font-sans flex gap-2">
                  <span className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${colors.dot}`} />
                  {h}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href={event.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm text-terracotta hover:text-terracotta-dark transition-colors font-sans"
            >
              Visit Website
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" />
              </svg>
            </a>
            {upcoming && (
              <a
                href={buildGoogleCalendarUrl(event)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors font-sans"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                Add to Calendar
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
