"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const NAV_ITEMS = [
 { label: "Dashboard", href: "/admin", icon: "grid" },
 { label: "Blog Posts", href: "/admin/blog", icon: "file-text" },
 { label: "Listings", href: "/admin/listings", icon: "map-pin" },
 { label: "Treatments", href: "/admin/treatments", icon: "activity" },
 { label: "Events", href: "/admin/events", icon: "calendar" },
 { label: "News", href: "/admin/news", icon: "newspaper" },
 { label: "Testimonials", href: "/admin/testimonials", icon: "quote" },
 { label: "Areas", href: "/admin/areas", icon: "globe" },
];

function Icon({ name }: { name: string }) {
 const icons: Record<string, string> = {
 grid: "M4 4h6v6H4zm10 0h6v6h-6zM4 14h6v6H4zm10 0h6v6h-6z",
 "file-text": "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6 M16 13H8 M16 17H8 M10 9H8",
 "map-pin": "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z M12 7a3 3 0 1 0 0 6 3 3 0 0 0 0-6z",
 activity: "M22 12h-4l-3 9L9 3l-3 9H2",
 calendar: "M19 4H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z M16 2v4 M8 2v4 M3 10h18",
 newspaper: "M4 4h16v16H4z M8 8h8 M8 12h8 M8 16h4",
 quote: "M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V21z M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3z",
 globe: "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z M2 12h20 M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z",
 };

 return (
 <svg
 xmlns="http://www.w3.org/2000/svg"
 width="18"
 height="18"
 viewBox="0 0 24 24"
 fill="none"
 stroke="currentColor"
 strokeWidth="1.5"
 strokeLinecap="round"
 strokeLinejoin="round"
 >
 {(icons[name] || "").split(" M").map((d, i) => (
 <path key={i} d={i === 0 ? d : `M${d}`} />
 ))}
 </svg>
 );
}

export default function AdminSidebar() {
 const pathname = usePathname();
 const router = useRouter();

 async function handleLogout() {
 await fetch("/api/admin/auth", { method: "DELETE" });
 router.refresh();
 window.location.href = "/admin";
 }

 return (
 <aside className="w-56 bg-gray-900 text-white min-h-screen flex flex-col shrink-0">
 <div className="px-5 py-5 border-b border-white/10">
 <Link href="/admin" className="text-lg font-bold tracking-wide">
 KAMURA
 </Link>
 <p className="text-[11px] text-gray-400 mt-0.5">Content Manager</p>
 </div>

 <nav className="flex-1 py-4">
 {NAV_ITEMS.map((item) => {
 const active =
 item.href === "/admin"
 ? pathname === "/admin"
 : pathname.startsWith(item.href);
 return (
 <Link
 key={item.href}
 href={item.href}
 className={`flex items-center gap-3 px-5 py-2.5 text-sm transition-colors ${
 active
 ? "bg-white/10 text-white"
 : "text-gray-400 hover:text-white hover:bg-white/5"
 }`}
 >
 <Icon name={item.icon} />
 {item.label}
 </Link>
 );
 })}
 </nav>

 <div className="border-t border-white/10 p-4 space-y-2">
 <Link
 href="/"
 target="_blank"
 className="block text-xs text-gray-400 hover:text-white transition-colors"
 >
 View Live Site &rarr;
 </Link>
 <button
 onClick={handleLogout}
 className="text-xs text-red-400 hover:text-red-300 transition-colors"
 >
 Sign Out
 </button>
 </div>
 </aside>
 );
}
