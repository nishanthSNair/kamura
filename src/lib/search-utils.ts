export interface SearchItem {
  type: "blog" | "listing" | "event" | "treatment" | "goal" | "comparison";
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
  goal: "BEST FOR",
  comparison: "COMPARE",
  treatment: "TREATMENTS",
  listing: "CLINICS",
  blog: "ARTICLES",
  event: "EVENTS",
};

export const TYPE_COLORS: Record<string, string> = {
  goal: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
  comparison: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-300",
  treatment: "bg-amber-100 text-amber-800",
  listing: "bg-terracotta/10 text-terracotta",
  blog: "bg-blue-100 text-blue-800",
  event: "bg-emerald-100 text-emerald-800",
};

export const TYPE_DISPLAY: Record<string, string> = {
  goal: "Best For",
  comparison: "Compare",
  treatment: "Treatment",
  listing: "Place",
  blog: "Article",
  event: "Event",
};

export function filterSearchItems(
  items: SearchItem[],
  query: string
): SearchItem[] {
  if (query.trim().length < 2) return [];
  const q = query.toLowerCase();

  // Smart detection: goal queries
  const goalTerm = detectGoalQuery(q);
  if (goalTerm) {
    const goalMatches = items.filter(
      (item) =>
        item.type === "goal" &&
        (item.title.toLowerCase().includes(goalTerm) ||
          item.services?.some((s) => s.toLowerCase().includes(goalTerm)))
    );
    const standard = items.filter(
      (item) =>
        item.type !== "goal" &&
        (item.title.toLowerCase().includes(q) ||
          item.excerpt.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q) ||
          (item.services &&
            item.services.some((s) => s.toLowerCase().includes(q))))
    );
    return [...goalMatches, ...standard];
  }

  // Smart detection: comparison queries
  const compTerms = detectComparisonQuery(q);
  if (compTerms) {
    // Find matching pre-built comparisons
    const compMatches = items.filter(
      (item) =>
        item.type === "comparison" &&
        (item.services?.some(
          (s) =>
            s.toLowerCase().includes(compTerms.term1) ||
            s.toLowerCase().includes(compTerms.term2)
        ) ||
          item.title.toLowerCase().includes(compTerms.term1))
    );

    // Try to generate dynamic comparison link
    const t1Match = items.find(
      (i) =>
        i.type === "treatment" &&
        i.title.toLowerCase().includes(compTerms.term1)
    );
    const t2Match = items.find(
      (i) =>
        i.type === "treatment" &&
        i.title.toLowerCase().includes(compTerms.term2)
    );
    const dynamicComp: SearchItem[] =
      t1Match && t2Match
        ? [
            {
              type: "comparison",
              title: `Compare ${t1Match.title} vs ${t2Match.title}`,
              excerpt: "Side-by-side comparison of scores, evidence, outcomes, and more",
              category: "Comparison",
              url: `/treatments/compare/${t1Match.url.split("/").pop()}-vs-${t2Match.url.split("/").pop()}`,
            },
          ]
        : [];

    // Avoid duplicates
    const compUrls = new Set(compMatches.map((c) => c.url));
    const uniqueDynamic = dynamicComp.filter((d) => !compUrls.has(d.url));

    const standard = items.filter(
      (item) =>
        item.type !== "comparison" &&
        (item.title.toLowerCase().includes(q) ||
          item.excerpt.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q) ||
          (item.services &&
            item.services.some((s) => s.toLowerCase().includes(q))))
    );
    return [...compMatches, ...uniqueDynamic, ...standard];
  }

  // Standard search
  return items.filter(
    (item) =>
      item.title.toLowerCase().includes(q) ||
      item.excerpt.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q) ||
      (item.services &&
        item.services.some((s) => s.toLowerCase().includes(q)))
  );
}

export function groupSearchResults(
  results: SearchItem[],
  maxPerGroup = 5
): Record<string, SearchItem[]> {
  return {
    goal: results.filter((r) => r.type === "goal").slice(0, 1),
    comparison: results.filter((r) => r.type === "comparison").slice(0, 1),
    treatment: results
      .filter((r) => r.type === "treatment")
      .slice(0, maxPerGroup),
    listing: results
      .filter((r) => r.type === "listing")
      .slice(0, maxPerGroup),
    blog: results.filter((r) => r.type === "blog").slice(0, maxPerGroup),
    event: results.filter((r) => r.type === "event").slice(0, maxPerGroup),
  };
}

export function flattenGrouped(
  grouped: Record<string, SearchItem[]>
): SearchItem[] {
  return [
    ...grouped.goal,
    ...grouped.comparison,
    ...grouped.treatment,
    ...grouped.listing,
    ...grouped.blog,
    ...grouped.event,
  ];
}

// --- Smart detection helpers ---

function detectGoalQuery(query: string): string | null {
  const q = query.trim();
  const patterns = [
    /^best\s+(?:for|treatments?\s+for)\s+(.+)/,
    /^(.+?)\s+treatments?$/,
    /^treatments?\s+for\s+(.+)/,
    /^improve\s+(.+)/,
    /^help\s+with\s+(.+)/,
    /^top\s+(.+?)\s+treatments?$/,
  ];
  for (const pattern of patterns) {
    const match = q.match(pattern);
    if (match) return match[1].trim();
  }
  return null;
}

function detectComparisonQuery(
  query: string
): { term1: string; term2: string } | null {
  const q = query.trim();
  const vsMatch = q.match(
    /^(.+?)\s+(?:vs\.?|versus|compared?\s+(?:to|with))\s+(.+)$/
  );
  if (vsMatch) return { term1: vsMatch[1].trim(), term2: vsMatch[2].trim() };
  const compareMatch = q.match(/^compare\s+(.+?)\s+(?:and|&|with)\s+(.+)$/);
  if (compareMatch)
    return { term1: compareMatch[1].trim(), term2: compareMatch[2].trim() };
  return null;
}
