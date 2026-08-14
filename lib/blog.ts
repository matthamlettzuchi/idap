import { cache } from "react";
import { supabase } from "@/lib/supabase";

// ---------- TipTap JSON -> HTML ----------
// The admin editor (components/admin/rich-text-editor.tsx) stores content as
// TipTap JSON, using StarterKit + Underline + Link + Image. This renderer
// covers exactly that node/mark set — no external @tiptap/html dependency
// needed, so nothing extra to install or version-pin.

type TTMark = { type: string; attrs?: Record<string, unknown> };
type TTNode = {
  type: string;
  attrs?: Record<string, unknown>;
  content?: TTNode[];
  text?: string;
  marks?: TTMark[];
};

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function renderMarks(text: string, marks?: TTMark[]): string {
  if (!marks || marks.length === 0) return text;
  return marks.reduce((acc, mark) => {
    switch (mark.type) {
      case "bold":
        return `<strong>${acc}</strong>`;
      case "italic":
        return `<em>${acc}</em>`;
      case "underline":
        return `<u>${acc}</u>`;
      case "strike":
        return `<s>${acc}</s>`;
      case "code":
        return `<code>${acc}</code>`;
      case "link": {
        const href =
          typeof mark.attrs?.href === "string" ? mark.attrs.href : "#";
        return `<a href="${escapeHtml(href)}" target="_blank" rel="noopener noreferrer">${acc}</a>`;
      }
      default:
        return acc;
    }
  }, text);
}

function renderChildren(node: TTNode): string {
  return (node.content ?? []).map(renderNode).join("");
}

function renderNode(node: TTNode): string {
  switch (node.type) {
    case "doc":
      return renderChildren(node);
    case "paragraph":
      return `<p>${renderChildren(node) || "<br/>"}</p>`;
    case "heading": {
      const level =
        typeof node.attrs?.level === "number" ? node.attrs.level : 2;
      return `<h${level}>${renderChildren(node)}</h${level}>`;
    }
    case "bulletList":
      return `<ul>${renderChildren(node)}</ul>`;
    case "orderedList":
      return `<ol>${renderChildren(node)}</ol>`;
    case "listItem":
      return `<li>${renderChildren(node)}</li>`;
    case "blockquote":
      return `<blockquote>${renderChildren(node)}</blockquote>`;
    case "codeBlock":
      return `<pre><code>${(node.content ?? [])
        .map((n) => escapeHtml(n.text ?? ""))
        .join("")}</code></pre>`;
    case "image": {
      const src = typeof node.attrs?.src === "string" ? node.attrs.src : "";
      const alt = typeof node.attrs?.alt === "string" ? node.attrs.alt : "";
      return `<img src="${escapeHtml(src)}" alt="${escapeHtml(alt)}" />`;
    }
    case "hardBreak":
      return "<br/>";
    case "horizontalRule":
      return "<hr/>";
    case "text":
      return renderMarks(escapeHtml(node.text ?? ""), node.marks);
    default:
      return renderChildren(node);
  }
}

function tiptapJsonToHtml(doc: unknown): string {
  if (!doc || typeof doc !== "object") return "";
  try {
    return renderNode(doc as TTNode);
  } catch {
    return "";
  }
}

function tiptapJsonToPlainText(doc: unknown): string {
  if (!doc || typeof doc !== "object") return "";
  function walk(node: TTNode): string {
    if (node.type === "text") return node.text ?? "";
    return (node.content ?? []).map(walk).join(" ");
  }
  try {
    return walk(doc as TTNode).trim();
  } catch {
    return "";
  }
}

function estimateReadTime(doc: unknown): string {
  const words = tiptapJsonToPlainText(doc).split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min${minutes > 1 ? "s" : ""} read`;
}

function initialsFromName(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

// ---------- raw Supabase row ----------

type ArticleContentRow = {
  slug: string;
  title: string;
  excerpt: string | null;
  content: object | null;
  cover_image: string | null;
  category: string | null;
  author_name: string | null;
  published_at: string | null;
  updated_at: string;
};

// ---------- UI-facing types ----------

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  author: { name: string; initials: string };
  image: string | null;
  featured: boolean;
};

export type BlogPostDetail = BlogPost & {
  contentHtml: string;
  modifiedDate: string;
};

function toBlogPost(row: ArticleContentRow): BlogPost {
  const authorName = row.author_name ?? "Intidata Team";
  const dateSource = row.published_at ?? row.updated_at;

  return {
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt ?? "",
    category: row.category ?? "General",
    date: formatDate(dateSource),
    readTime: estimateReadTime(row.content),
    author: { name: authorName, initials: initialsFromName(authorName) },
    image: row.cover_image,
    featured: false,
  };
}

// ---------- cached, UI-facing fetchers ----------
// cache() dedupes within a single request render, same pattern as
// lib/products.ts / lib/services.ts / lib/about.ts. Requires a Supabase RLS
// policy allowing anon SELECT on "articles" where status = 'published' —
// same recurring fix as every other Supabase-backed section on this site.

export const getBlogPosts = cache(async (): Promise<BlogPost[]> => {
  const { data, error } = await supabase
    .from("articles")
    .select(
      "slug, title, excerpt, content, cover_image, category, author_name, published_at, updated_at"
    )
    .eq("status", "published")
    .order("published_at", { ascending: false });

  if (error) {
    console.error("Supabase articles fetch failed:", error.message);
    return [];
  }

  const posts = (data as ArticleContentRow[]).map(toBlogPost);

  // Feature the 3 most recent articles so the hero carousel always has
  // content, mirroring the old WordPress fallback behavior.
  posts.slice(0, 3).forEach((p) => (p.featured = true));

  return posts;
});

export const getBlogPostBySlug = cache(
  async (slug: string): Promise<BlogPostDetail | null> => {
    const { data, error } = await supabase
      .from("articles")
      .select(
        "slug, title, excerpt, content, cover_image, category, author_name, published_at, updated_at"
      )
      .eq("slug", slug)
      .eq("status", "published")
      .single();

    if (error || !data) {
      console.error(`Supabase article fetch failed for slug "${slug}":`, error?.message);
      return null;
    }

    const row = data as ArticleContentRow;

    return {
      ...toBlogPost(row),
      contentHtml: tiptapJsonToHtml(row.content),
      modifiedDate: formatDate(row.updated_at),
    };
  }
);

export const getAllBlogSlugs = cache(async (): Promise<string[]> => {
  const { data, error } = await supabase
    .from("articles")
    .select("slug")
    .eq("status", "published");

  if (error) {
    console.error("Supabase articles slug fetch failed:", error.message);
    return [];
  }
  return (data as { slug: string }[]).map((r) => r.slug);
});

export const getBlogCategories = cache(async (): Promise<string[]> => {
  const { data, error } = await supabase
    .from("articles")
    .select("category")
    .eq("status", "published");

  if (error) {
    console.error("Supabase articles category fetch failed:", error.message);
    return [];
  }

  const categories = new Set<string>();
  (data as { category: string | null }[]).forEach((r) => {
    if (r.category) categories.add(r.category);
  });
  return Array.from(categories);
});