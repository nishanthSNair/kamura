import { NextRequest, NextResponse } from "next/server";
import { createHmac } from "crypto";
import {
  getFileContent,
  listFiles,
  updateFile,
  createFile,
  deleteFile,
} from "@/lib/github";

const PASSWORD = process.env.ADMIN_PASSWORD || "";
const COOKIE_NAME = "admin_session";

function verifySession(request: NextRequest): boolean {
  const cookie = request.cookies.get(COOKIE_NAME)?.value;
  if (!cookie) return false;
  const expected = createHmac("sha256", PASSWORD)
    .update("admin-authenticated")
    .digest("hex");
  return cookie === expected;
}

// Content type → file path mapping
const JSON_CONTENT_MAP: Record<string, { path: string; idField: string; key: string }> = {
  listings: { path: "content/data/listings.json", idField: "id", key: "listings" },
  treatments: { path: "content/data/treatments.json", idField: "slug", key: "treatments" },
  events: { path: "content/data/events.json", idField: "id", key: "events" },
  news: { path: "content/data/news.json", idField: "id", key: "news" },
  testimonials: { path: "content/data/testimonials.json", idField: "id", key: "testimonials" },
  areas: { path: "content/data/areas.json", idField: "slug", key: "areas" },
};

function parseFrontmatter(content: string): {
  frontmatter: Record<string, unknown>;
  body: string;
} {
  const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { frontmatter: {}, body: content };

  const yamlStr = match[1];
  const body = match[2];
  const frontmatter: Record<string, unknown> = {};

  // Simple YAML parser for flat + array fields
  const lines = yamlStr.split("\n");
  let currentKey = "";
  let currentArray: unknown[] | null = null;

  for (const line of lines) {
    // Array item (under a key)
    if (line.match(/^\s+-\s/)) {
      const value = line.replace(/^\s+-\s/, "").trim();
      if (currentArray) {
        // Handle object-style array items (faqItems)
        if (value.includes(":")) {
          const [k, ...v] = value.split(":");
          const key = k.trim().replace(/^["']|["']$/g, "");
          const val = v.join(":").trim().replace(/^["']|["']$/g, "");
          if (
            currentArray.length === 0 ||
            typeof currentArray[currentArray.length - 1] !== "object"
          ) {
            currentArray.push({ [key]: val });
          } else {
            const last = currentArray[currentArray.length - 1] as Record<
              string,
              string
            >;
            if (key in last) {
              currentArray.push({ [key]: val });
            } else {
              last[key] = val;
            }
          }
        } else {
          currentArray.push(value.replace(/^["']|["']$/g, ""));
        }
      }
      continue;
    }

    // Key: value line
    const kvMatch = line.match(/^(\w+):\s*(.*)/);
    if (kvMatch) {
      // Save previous array
      if (currentArray && currentKey) {
        frontmatter[currentKey] = currentArray;
        currentArray = null;
      }

      const key = kvMatch[1];
      let value = kvMatch[2].trim();
      currentKey = key;

      if (value === "" || value === "[]") {
        // Array field starting
        currentArray = [];
      } else if (value.startsWith("[") && value.endsWith("]")) {
        // Inline array: ["a", "b"]
        frontmatter[key] = value
          .slice(1, -1)
          .split(",")
          .map((s) => s.trim().replace(/^["']|["']$/g, ""))
          .filter(Boolean);
        currentArray = null;
      } else {
        // Remove quotes
        value = value.replace(/^["']|["']$/g, "");
        // Type coercion
        if (value === "true") frontmatter[key] = true;
        else if (value === "false") frontmatter[key] = false;
        else if (/^\d+$/.test(value)) frontmatter[key] = parseInt(value, 10);
        else if (/^\d+\.\d+$/.test(value))
          frontmatter[key] = parseFloat(value);
        else frontmatter[key] = value;
        currentArray = null;
      }
    }
  }

  // Save final array
  if (currentArray && currentKey) {
    frontmatter[currentKey] = currentArray;
  }

  return { frontmatter, body };
}

function buildFrontmatter(data: Record<string, unknown>): string {
  const lines: string[] = ["---"];

  for (const [key, value] of Object.entries(data)) {
    if (value === undefined || value === null) continue;

    if (Array.isArray(value)) {
      if (value.length === 0) continue;
      // Check if it's an array of objects (like faqItems)
      if (typeof value[0] === "object") {
        lines.push(`${key}:`);
        for (const item of value) {
          const entries = Object.entries(item as Record<string, string>);
          entries.forEach(([k, v], i) => {
            lines.push(i === 0 ? `  - ${k}: "${v}"` : `    ${k}: "${v}"`);
          });
        }
      } else {
        // Simple string array
        lines.push(
          `${key}: [${value.map((v) => `"${v}"`).join(", ")}]`
        );
      }
    } else if (typeof value === "string") {
      lines.push(`${key}: "${value}"`);
    } else if (typeof value === "boolean" || typeof value === "number") {
      lines.push(`${key}: ${value}`);
    }
  }

  lines.push("---");
  return lines.join("\n");
}

// GET — List items or get single item
export async function GET(request: NextRequest) {
  if (!verifySession(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");
  const id = searchParams.get("id");

  if (!type) {
    return NextResponse.json(
      { error: "Missing type parameter" },
      { status: 400 }
    );
  }

  try {
    // Blog posts (markdown)
    if (type === "blog") {
      if (id) {
        // Get single blog post
        const { content, sha } = await getFileContent(
          `content/blog/${id}.md`
        );
        const { frontmatter, body } = parseFrontmatter(content);
        return NextResponse.json({ item: { ...frontmatter, slug: id, body }, sha });
      } else {
        // List all blog posts
        const files = await listFiles("content/blog");
        const posts = [];
        for (const file of files) {
          if (!file.endsWith(".md")) continue;
          const slug = file.replace(/\.md$/, "");
          const { content } = await getFileContent(`content/blog/${file}`);
          const { frontmatter } = parseFrontmatter(content);
          posts.push({ ...frontmatter, slug });
        }
        return NextResponse.json({ items: posts });
      }
    }

    // JSON content types
    const config = JSON_CONTENT_MAP[type];
    if (!config) {
      return NextResponse.json(
        { error: `Unknown content type: ${type}` },
        { status: 400 }
      );
    }

    const { content, sha } = await getFileContent(config.path);
    const parsed = JSON.parse(content);
    const items: Record<string, unknown>[] = Array.isArray(parsed)
      ? parsed
      : (parsed[config.key] || []);

    if (id) {
      const item = items.find(
        (i: Record<string, unknown>) => i[config.idField] === id
      );
      if (!item) {
        return NextResponse.json(
          { error: "Item not found" },
          { status: 404 }
        );
      }
      return NextResponse.json({ item, sha });
    }

    return NextResponse.json({ items, sha });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// POST — Create new item
export async function POST(request: NextRequest) {
  if (!verifySession(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");

  if (!type) {
    return NextResponse.json(
      { error: "Missing type parameter" },
      { status: 400 }
    );
  }

  try {
    const data = await request.json();

    // Blog posts
    if (type === "blog") {
      const { body, slug, ...frontmatter } = data;
      const content = buildFrontmatter(frontmatter) + "\n" + (body || "");
      await createFile(
        `content/blog/${slug}.md`,
        content,
        `Add blog post: ${frontmatter.title || slug}`
      );
      return NextResponse.json({ success: true });
    }

    // JSON content
    const config = JSON_CONTENT_MAP[type];
    if (!config) {
      return NextResponse.json(
        { error: `Unknown content type: ${type}` },
        { status: 400 }
      );
    }

    const { content, sha } = await getFileContent(config.path);
    const parsed = JSON.parse(content);
    const items: Record<string, unknown>[] = Array.isArray(parsed)
      ? parsed
      : (parsed[config.key] || []);
    items.push(data);

    const output = Array.isArray(parsed) ? items : { [config.key]: items };
    await updateFile(
      config.path,
      JSON.stringify(output, null, 2) + "\n",
      `Add ${type}: ${data[config.idField] || data.name || "new item"}`,
      sha
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// PUT — Update existing item
export async function PUT(request: NextRequest) {
  if (!verifySession(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");
  const id = searchParams.get("id");

  if (!type || !id) {
    return NextResponse.json(
      { error: "Missing type or id parameter" },
      { status: 400 }
    );
  }

  try {
    const data = await request.json();

    // Blog posts
    if (type === "blog") {
      const { body, slug: _slug, ...frontmatter } = data;
      const filePath = `content/blog/${id}.md`;
      const { sha } = await getFileContent(filePath);
      const content = buildFrontmatter(frontmatter) + "\n" + (body || "");
      await updateFile(
        filePath,
        content,
        `Update blog post: ${frontmatter.title || id}`,
        sha
      );
      return NextResponse.json({ success: true });
    }

    // JSON content
    const config = JSON_CONTENT_MAP[type];
    if (!config) {
      return NextResponse.json(
        { error: `Unknown content type: ${type}` },
        { status: 400 }
      );
    }

    const { content, sha } = await getFileContent(config.path);
    const parsed = JSON.parse(content);
    const items: Record<string, unknown>[] = Array.isArray(parsed)
      ? parsed
      : (parsed[config.key] || []);
    const index = items.findIndex(
      (i: Record<string, unknown>) => i[config.idField] === id
    );

    if (index === -1) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }

    items[index] = { ...items[index], ...data };

    const output = Array.isArray(parsed) ? items : { [config.key]: items };
    await updateFile(
      config.path,
      JSON.stringify(output, null, 2) + "\n",
      `Update ${type}: ${data.name || data.title || id}`,
      sha
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// DELETE — Remove item
export async function DELETE(request: NextRequest) {
  if (!verifySession(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");
  const id = searchParams.get("id");

  if (!type || !id) {
    return NextResponse.json(
      { error: "Missing type or id parameter" },
      { status: 400 }
    );
  }

  try {
    // Blog posts
    if (type === "blog") {
      const filePath = `content/blog/${id}.md`;
      const { sha } = await getFileContent(filePath);
      await deleteFile(filePath, `Delete blog post: ${id}`, sha);
      return NextResponse.json({ success: true });
    }

    // JSON content
    const config = JSON_CONTENT_MAP[type];
    if (!config) {
      return NextResponse.json(
        { error: `Unknown content type: ${type}` },
        { status: 400 }
      );
    }

    const { content, sha } = await getFileContent(config.path);
    const parsed = JSON.parse(content);
    const items: Record<string, unknown>[] = Array.isArray(parsed)
      ? parsed
      : (parsed[config.key] || []);
    const filtered = items.filter(
      (i: Record<string, unknown>) => i[config.idField] !== id
    );

    if (filtered.length === items.length) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }

    const output = Array.isArray(parsed) ? filtered : { [config.key]: filtered };
    await updateFile(
      config.path,
      JSON.stringify(output, null, 2) + "\n",
      `Delete ${type}: ${id}`,
      sha
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
