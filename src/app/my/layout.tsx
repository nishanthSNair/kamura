"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { createClient } from "@/lib/supabase/client";
import { ToastProvider } from "@/lib/toast";

const NAV_TABS = [
  { href: "/my", label: "My Protocol", exact: true },
  { href: "/my/library", label: "Library" },
  { href: "/my/practitioners", label: "Practitioners" },
  { href: "/my/progress", label: "Progress" },
];

const AUTH_PAGES = ["/my/login", "/my/signup", "/my/auth/callback"];

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();
  const [fullName, setFullName] = useState("");
  const [user, setUser] = useState<{ id: string; email: string | null } | null>(null);
  const [loading, setLoading] = useState(true);
  const [bannerDismissed, setBannerDismissed] = useState(false);

  const isAuthPage = AUTH_PAGES.some((p) => pathname.startsWith(p));

  useEffect(() => {
    if (isAuthPage) {
      setLoading(false);
      return;
    }

    async function loadUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        setUser({ id: user.id, email: user.email || null });
        const { data } = await supabase
          .from("members")
          .select("full_name")
          .eq("id", user.id)
          .single();
        setFullName(data?.full_name || user.email?.split("@")[0] || "Member");
      }
      setLoading(false);
    }
    loadUser();
  }, [supabase, isAuthPage]);

  useEffect(() => {
    try {
      if (localStorage.getItem("kamura.guest.banner.dismissed") === "1") {
        setBannerDismissed(true);
      }
    } catch {
      /* ignore */
    }
  }, []);

  function dismissBanner() {
    setBannerDismissed(true);
    try {
      localStorage.setItem("kamura.guest.banner.dismissed", "1");
    } catch {
      /* ignore */
    }
  }

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

  const isGuest = !user;
  const firstName = fullName.split(" ")[0] || "You";

  return (
    <ToastProvider>
      <div className="min-h-screen bg-[#F7F3EB]">
        {/* Guest banner */}
        {isGuest && !bannerDismissed && (
          <div className="bg-gradient-to-r from-terracotta/10 via-terracotta/5 to-transparent border-b border-terracotta/15 px-4 py-2.5">
            <div className="max-w-6xl mx-auto flex items-center justify-between gap-3 flex-wrap">
              <p className="text-xs text-gray-700 font-sans">
                <span className="text-terracotta font-semibold tracking-[0.1em] uppercase mr-2">
                  Guest mode
                </span>
                Log in to sync your data across devices and keep it safe.
              </p>
              <div className="flex items-center gap-3">
                <Link
                  href="/my/signup"
                  className="text-[10px] tracking-[0.15em] uppercase text-terracotta font-sans font-semibold hover:underline"
                >
                  Sign up free
                </Link>
                <Link
                  href="/my/login"
                  className="text-[10px] tracking-[0.15em] uppercase text-gray-500 hover:text-terracotta font-sans font-semibold"
                >
                  Log in
                </Link>
                <button
                  onClick={dismissBanner}
                  aria-label="Dismiss"
                  className="text-gray-400 hover:text-gray-600 text-sm"
                >
                  ×
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Dashboard-specific nav (Option B) */}
        <header className="bg-[#F7F3EB]/90 backdrop-blur-sm border-b border-gray-200/60 sticky top-0 z-40">
          <div className="max-w-6xl mx-auto px-4 md:px-6">
            <div className="h-16 flex items-center justify-between gap-4 md:gap-6">
              {/* Brand */}
              <Link href="/" className="flex items-center gap-2 shrink-0">
                <span className="font-serif text-lg md:text-xl tracking-[0.15em] text-gray-900">
                  KAMURA
                </span>
                <span className="hidden sm:inline text-[9px] tracking-[0.3em] uppercase text-gray-400 font-sans">
                  · Dashboard
                </span>
              </Link>

              {/* Tabs */}
              <nav className="flex items-center gap-1 overflow-x-auto no-scrollbar">
                {NAV_TABS.map((tab) => {
                  const active = tab.exact
                    ? pathname === tab.href
                    : pathname.startsWith(tab.href);
                  return (
                    <Link
                      key={tab.href}
                      href={tab.href}
                      className={`shrink-0 px-3 md:px-4 py-2 rounded-full text-xs md:text-sm font-sans font-semibold transition-colors ${
                        active
                          ? "bg-terracotta/10 text-terracotta"
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      {tab.label}
                    </Link>
                  );
                })}
              </nav>

              {/* Right: Build + auth state */}
              <div className="flex items-center gap-2 md:gap-3 shrink-0">
                <Link
                  href="/my/protocol"
                  className="hidden sm:inline-flex items-center px-3 md:px-4 py-2 rounded-full bg-terracotta hover:bg-terracotta-dark text-white text-[10px] md:text-xs tracking-[0.1em] uppercase font-semibold font-sans transition-colors"
                >
                  + Build protocol
                </Link>
                {isGuest ? (
                  <Link
                    href="/my/signup"
                    className="inline-flex items-center px-3 py-1.5 rounded-full border border-gray-300 text-xs text-gray-700 font-sans font-semibold hover:border-terracotta hover:text-terracotta"
                  >
                    Sign up
                  </Link>
                ) : (
                  <div className="relative group">
                    <button className="w-9 h-9 rounded-full bg-gradient-to-br from-terracotta to-terracotta-dark text-white flex items-center justify-center font-serif text-sm font-semibold">
                      {firstName[0]?.toUpperCase() || "K"}
                    </button>
                    <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-2xl shadow-xl border border-gray-200 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="text-xs text-gray-400 font-sans">Signed in as</p>
                        <p className="text-sm text-gray-900 font-sans truncate">
                          {fullName}
                        </p>
                      </div>
                      <Link
                        href="/my/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#EDE7DB]/50 font-sans"
                      >
                        Profile & settings
                      </Link>
                      <Link
                        href="/my/bookings"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#EDE7DB]/50 font-sans"
                      >
                        Bookings
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-500 hover:bg-[#EDE7DB]/50 font-sans"
                      >
                        Sign out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Main */}
        <main className="max-w-6xl mx-auto px-4 md:px-8 py-8 pb-24">
          {children}
        </main>

        <style jsx global>{`
          .no-scrollbar::-webkit-scrollbar {
            display: none;
          }
          .no-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}</style>
      </div>
    </ToastProvider>
  );
}
