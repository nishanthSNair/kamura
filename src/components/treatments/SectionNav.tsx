"use client";

import { useEffect, useState } from "react";

interface Section {
  id: string;
  label: string;
}

export default function SectionNav({ sections }: { sections: Section[] }) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-80px 0px -75% 0px", threshold: 0 }
    );

    for (const section of sections) {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [sections]);

  if (sections.length < 2) return null;

  return (
    <nav className="hidden lg:block sticky top-24 self-start min-w-[160px]">
      <p className="text-[11px] text-gray-500 dark:text-gray-500 uppercase tracking-wider font-sans mb-3 font-semibold">
        On this page
      </p>
      <ul className="space-y-1 border-l border-gray-200 dark:border-gray-700">
        {sections.map((section) => (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(section.id)?.scrollIntoView({ behavior: "smooth" });
              }}
              className={`block text-[13px] font-sans leading-snug transition-colors py-1 pl-4 border-l-2 -ml-px ${
                activeId === section.id
                  ? "border-moss text-moss dark:text-sage font-medium"
                  : "border-transparent text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-gray-200"
              }`}
            >
              {section.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
