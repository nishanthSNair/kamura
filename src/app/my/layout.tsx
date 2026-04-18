"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { createClient } from "@/lib/supabase/client";
import { ToastProvider } from "@/lib/toast";

const NAV_ITEMS = [
  {
    href: "/my",
    label: "Today",
    exact: true,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
      </svg>
    ),
  },
  {
    href: "/my/protocol",
    label: "Protocol",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="9" y1="15" x2="15" y2="15" />
      </svg>
    ),
  },
  {
    href: "/my/bookings",
    label: "Bookings",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
  },
  {
    href: "/my/progress",
    label: "Progress",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
  },
  {
    href: "/my/discover",
    label: "Discover",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
      </svg>
    ),
  },
  {
    href: "/my/profile",
    label: "Profile",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
];

const AUTH_PAGES = ["/my/login", "/my/signup", "/my/auth/callback"];

export default function MemberDashboardLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(true);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const isAuthPage = AUTH_PAGES.some((p) => pathname.startsWith(p));

  useEffect(() => {
    if (isAuthPage) {
      setLoading(false);
      return;
    }
    async function loadMember() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        router.push("/my/login");
        return;
      }
      const { data } = await supabase
        .from("members")
        .select("full_name")
        .eq("id", user.id)
        .single();
      setFullName(data?.full_name || user.email?.split("@")[0] || "Member");
      setLoading(false);
    }
    loadMember();
  }, [supabase, router, isAuthPage]);

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/my/login");
  }

  if (isAuthPage) return <ToastProvider>{children}</ToastProvider>;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F7F3EB]">
        <p className="text-sm text-gray-400 font-sans">Loading...</p>
      </div>
    );
  }

  return (
    <ToastProvider>
    <div className="min-h-screen bg-[#F7F3EB] flex">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex w-60 bg-white border-r border-gray-200/70 flex-col fixed inset-y-0 left-0 z-40">
        <div className="p-6 border-b border-gray-100">
          <Link href="/" className="font-serif text-xl tracking-[0.15em] text-gray-900">
            KAMURA
          </Link>
          <p className="text-[9px] tracking-[0.3em] uppercase text-gray-400 font-sans mt-1">
            Member
          </p>
        </div>

        <nav className="flex-1 py-4 space-y-1 px-3">
          {NAV_ITEMS.map((item) => {
            const active = item.exact
              ? pathname === item.href
              : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-sans transition-colors ${
                  active
                    ? "bg-[#EDE7DB] text-gray-900 font-semibold"
                    : "text-gray-500 hover:bg-[#EDE7DB]/50 hover:text-gray-900"
                }`}
              >
                {item.icon}
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-100">
          <p className="text-xs text-gray-500 font-sans truncate mb-3">{fullName}</p>
          <button
            onClick={handleLogout}
            className="text-[10px] tracking-[0.15em] uppercase text-gray-400 hover:text-terracotta font-sans"
          >
            Sign Out
          </button>
        </div>
      </aside>

      {/* Mobile header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        <Link href="/" className="font-serif text-lg tracking-[0.15em] text-gray-900">
          KAMURA
        </Link>
        <button
          onClick={() => setMobileNavOpen(!mobileNavOpen)}
          className="text-gray-800"
          aria-label="Toggle menu"
        >
          {mobileNavOpen ? (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile bottom tab bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-gray-200 px-2 py-2 flex justify-around">
        {NAV_ITEMS.slice(0, 5).map((item) => {
          const active = item.exact ? pathname === item.href : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-1 py-1 px-2 flex-1 ${
                active ? "text-terracotta" : "text-gray-400"
              }`}
            >
              {item.icon}
              <span className="text-[9px] tracking-[0.1em] uppercase font-sans">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>

      {/* Mobile nav overlay */}
      {mobileNavOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-white pt-14">
          <div className="p-4">
            <button
              onClick={() => setMobileNavOpen(false)}
              className="absolute top-3 right-4 text-gray-800"
              aria-label="Close menu"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
            <nav className="space-y-1 mt-6">
              {NAV_ITEMS.map((item) => {
                const active = item.exact ? pathname === item.href : pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileNavOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-base font-sans ${
                      active
                        ? "bg-[#EDE7DB] text-gray-900 font-semibold"
                        : "text-gray-600"
                    }`}
                  >
                    {item.icon}
                    {item.label}
                  </Link>
                );
              })}
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-4 py-3 text-sm text-gray-400 font-sans mt-4 w-full text-left"
              >
                Sign Out
              </button>
            </nav>
          </div>
        </div>
      )}

      {/* Main content */}
      <main className="flex-1 lg:ml-60 pt-14 lg:pt-0 pb-20 lg:pb-0">
        <div className="max-w-5xl mx-auto px-4 md:px-8 py-8">{children}</div>
      </main>
    </div>
    </ToastProvider>
  );
}
