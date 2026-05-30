import Link from "next/link";
import { ChevronRight } from "lucide-react";

/**
 * Breadcrumb — reusable navigation trail.
 *
 *   <Breadcrumb
 *     items={[
 *       { label: "Home", href: "/" },
 *       { label: "Treatments", href: "/treatments" },
 *       { label: "GLP-1" }, // last item: no href → renders as current page
 *     ]}
 *   />
 *
 * Renders the matching JSON-LD `BreadcrumbList` automatically so callers
 * don't have to maintain two parallel structures. Tone='dark' for hero
 * sections (white text on image), 'light' (default) for normal pages.
 *
 * The last item never gets a link — it's the current page.
 */

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface Props {
  items: BreadcrumbItem[];
  tone?: "light" | "dark";
  /** Whether to emit JSON-LD BreadcrumbList structured data. Default true. */
  emitJsonLd?: boolean;
  className?: string;
}

const BASE_URL = "https://kamuralife.com";

export default function Breadcrumb({
  items,
  tone = "light",
  emitJsonLd = true,
  className = "",
}: Props) {
  if (items.length === 0) return null;

  const isDark = tone === "dark";
  const linkColor = isDark
    ? "text-white/70 hover:text-white"
    : "text-[#2A2520]/55 hover:text-[#2A2520]";
  const currentColor = isDark ? "text-white" : "text-[#2A2520]";
  const sepColor = isDark ? "text-white/30" : "text-[#2A2520]/25";

  const jsonLd = emitJsonLd
    ? {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: item.label,
          ...(item.href ? { item: `${BASE_URL}${item.href}` } : {}),
        })),
      }
    : null;

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <nav
        aria-label="Breadcrumb"
        className={`flex items-center flex-wrap gap-x-1.5 gap-y-1 text-[12px] tracking-[0.04em] font-sans ${className}`}
      >
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <span key={`${item.label}-${i}`} className="inline-flex items-center gap-1.5">
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className={`${linkColor} transition-colors hover:underline underline-offset-4`}
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  className={`${currentColor} font-medium`}
                  aria-current={isLast ? "page" : undefined}
                >
                  {item.label}
                </span>
              )}
              {!isLast && (
                <ChevronRight
                  size={12}
                  strokeWidth={2}
                  className={sepColor}
                  aria-hidden
                />
              )}
            </span>
          );
        })}
      </nav>
    </>
  );
}
