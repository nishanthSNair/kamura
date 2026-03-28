"use client";

import { useEffect, useState, type ReactNode } from "react";

export default function Template({ children }: { children: ReactNode }) {
 const [mounted, setMounted] = useState(false);

 useEffect(() => {
 // Small delay ensures the opacity-0 state renders first
 const raf = requestAnimationFrame(() => setMounted(true));
 return () => cancelAnimationFrame(raf);
 }, []);

 return (
 <div
 style={{
 opacity: mounted ? 1 : 0,
 transition: "opacity 0.3s ease-in-out",
 }}
 >
 {children}
 </div>
 );
}
