import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

// Re-export shared types/utils so server components can import from @/lib/blog
export { type BlogCategory, blogCategoryColors, formatDate } from "./blog-shared";
import type { BlogCategory } from "./blog-shared";

const blogDirectory = path.join(process.cwd(), "content/blog");

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  category: BlogCategory;
  coverImage?: string;
  content: string;
  readingTime: number;
  wordCount: number;
  headings: { id: string; text: string; level: number }[];
}

export function getAllPosts(): Omit<BlogPost, "content" | "headings">[] {
  const files = fs.readdirSync(blogDirectory);

  const posts = files
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const slug = file.replace(/\.md$/, "");
      const filePath = path.join(blogDirectory, file);
      const fileContents = fs.readFileSync(filePath, "utf8");
      const { data, content } = matter(fileContents);

      const wordCount = content.split(/\s+/).filter(Boolean).length;
      const readingTime = Math.max(1, Math.ceil(wordCount / 200));

      return {
        slug,
        title: data.title,
        date: data.date,
        excerpt: data.excerpt,
        category: (data.category || "News & Trends") as BlogCategory,
        coverImage: data.coverImage || undefined,
        readingTime,
        wordCount,
      };
    })
    .sort((a, b) => (a.date > b.date ? -1 : 1));

  return posts;
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const filePath = path.join(blogDirectory, `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);

  const wordCount = content.split(/\s+/).filter(Boolean).length;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  // Extract headings from markdown
  const headingRegex = /^(#{1,3})\s+(.+)$/gm;
  const headings: { id: string; text: string; level: number }[] = [];
  let match;
  while ((match = headingRegex.exec(content)) !== null) {
    const text = match[2].trim();
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    headings.push({ id, text, level: match[1].length });
  }

  const processedContent = await remark().use(html, { sanitize: true }).process(content);
  // Add IDs to headings in HTML for anchor navigation
  let contentHtml = processedContent.toString();
  headings.forEach(({ id, text }) => {
    const escapedText = text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    contentHtml = contentHtml.replace(
      new RegExp(`(<h[1-3])>\\s*${escapedText}\\s*</h[1-3]>`),
      `$1 id="${id}">${text}</h${text}>`
    );
  });
  // Simpler approach: add IDs via regex on h tags
  contentHtml = contentHtml.replace(
    /<h([1-3])>(.*?)<\/h[1-3]>/g,
    (_, level, text) => {
      const id = text
        .replace(/<[^>]+>/g, "")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      return `<h${level} id="${id}">${text}</h${level}>`;
    }
  );

  return {
    slug,
    title: data.title,
    date: data.date,
    excerpt: data.excerpt,
    category: (data.category || "News & Trends") as BlogCategory,
    coverImage: data.coverImage || undefined,
    content: contentHtml,
    readingTime,
    wordCount,
    headings,
  };
}

export function getAllSlugs(): string[] {
  const files = fs.readdirSync(blogDirectory);
  return files
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.replace(/\.md$/, ""));
}
