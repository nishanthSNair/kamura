"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

interface FadeInOnScrollProps {
 children: ReactNode;
 className?: string;
 delay?: number;
}

export default function FadeInOnScroll({ children, className = "", delay = 0 }: FadeInOnScrollProps) {
 const ref = useRef<HTMLDivElement>(null);
 const [isVisible, setIsVisible] = useState(false);

 useEffect(() => {
 const el = ref.current;
 if (!el) return;

 const observer = new IntersectionObserver(
 ([entry]) => {
 if (entry.isIntersecting) {
 setIsVisible(true);
 observer.unobserve(el);
 }
 },
 { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
 );

 observer.observe(el);
 return () => observer.disconnect();
 }, []);

 return (
 <div
 ref={ref}
 className={className}
 style={{
 opacity: isVisible ? 1 : 0,
 transform: isVisible ? "translateY(0)" : "translateY(20px)",
 transition: `opacity 0.6s ease-out ${delay}ms, transform 0.6s ease-out ${delay}ms`,
 }}
 >
 {children}
 </div>
 );
}
