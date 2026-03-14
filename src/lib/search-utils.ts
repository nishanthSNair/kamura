export interface SearchItem {
  type: "blog" | "listing" | "event" | "treatment";
  title: string;
  excerpt: string;
  category: string;
  url: string;
  kamuraScore?: number;
  evidenceLevel?: string;
  location?: string;
  services?: string[];
}

export const TYPE_LABELS: Record<string, string> = {
  treatment: "TREATMENTS",
  listing: "LISTINGS",
  blog: "ARTICLES",
  event: "EVENTS",
};

export const TYPE_COLORS: Record<string, string> = {
  treatment: "bg-amber-100 text-amber-800",
  listing: "bg-terracotta/10 text-terracotta",
  blog: "bg-blue-100 text-blue-800",
  event: "bg-emerald-100 text-emerald-800",
};

export const TYPE_DISPLAY: Record<string, string> = {
  treatment: "Treatment",
  listing: "Place",
  blog: "Article",
  event: "Event",
};

export function filterSearchItems(items: SearchItem[], query: string): SearchItem[] {
  if (query.trim().length < 2) return [];
  const q = query.toLowerCase();
  return items.filter(
    (item) =>
      item.title.toLowerCase().includes(q) ||
      item.excerpt.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q) ||
      (item.services && item.services.some((s) => s.toLowerCase().includes(q)))
  );
}

export function groupSearchResults(
  results: SearchItem[],
  maxPerGroup = 5
): Record<string, SearchItem[]> {
  return {
    treatment: results.filter((r) => r.type === "treatment").slice(0, maxPerGroup),
    listing: results.filter((r) => r.type === "listing").slice(0, maxPerGroup),
    blog: results.filter((r) => r.type === "blog").slice(0, maxPerGroup),
    event: results.filter((r) => r.type === "event").slice(0, maxPerGroup),
  };
}

export function flattenGrouped(grouped: Record<string, SearchItem[]>): SearchItem[] {
  return [
    ...grouped.treatment,
    ...grouped.listing,
    ...grouped.blog,
    ...grouped.event,
  ];
}
