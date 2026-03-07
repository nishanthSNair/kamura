export type BlogCategory =
  | "Guides & Reviews"
  | "Longevity & Science"
  | "Holistic & Healing"
  | "Biohacking"
  | "News & Trends";

export const blogCategoryColors: Record<BlogCategory, { bg: string; text: string }> = {
  "Guides & Reviews": { bg: "bg-blue-100", text: "text-blue-800" },
  "Longevity & Science": { bg: "bg-red-100", text: "text-red-700" },
  "Holistic & Healing": { bg: "bg-emerald-100", text: "text-emerald-800" },
  Biohacking: { bg: "bg-amber-100", text: "text-amber-800" },
  "News & Trends": { bg: "bg-purple-100", text: "text-purple-800" },
};

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
}
