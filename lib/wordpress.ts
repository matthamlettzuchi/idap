import { cache } from "react";

const WORDPRESS_API_URL =
  process.env.WORDPRESS_API_URL ?? "http://intidata-blog.local/wp-json/wp/v2";

// ---------- raw WordPress REST shapes ----------

export type WPRendered = { rendered: string };

export type WPFeaturedMedia = {
  id: number;
  source_url: string;
  alt_text?: string;
};

export type WPAuthor = {
  id: number;
  name: string;
};

export type WPCategory = {
  id: number;
  name: string;
  slug: string;
};

export type WPPost = {
  id: number;
  slug: string;
  date: string;
  modified: string;
  sticky: boolean;
  title: WPRendered;
  excerpt: WPRendered;
  content: WPRendered;
  categories: number[];
  _embedded?: {
    author?: WPAuthor[];
    "wp:featuredmedia"?: WPFeaturedMedia[];
    "wp:term"?: WPCategory[][]; // [0] = categories, [1] = tags
  };
};

async function wpFetch<T>(
  path: string,
  revalidateSeconds = 300
): Promise<T> {
  const res = await fetch(`${WORDPRESS_API_URL}${path}`, {
    next: { revalidate: revalidateSeconds },
  });

  if (!res.ok) {
    throw new Error(
      `WordPress request failed: ${path} (${res.status} ${res.statusText})`
    );
  }

  return res.json() as Promise<T>;
}

/** Raw posts with embedded featured media / author / terms. */
export async function getPosts(): Promise<WPPost[]> {
  return wpFetch<WPPost[]>("/posts?_embed&per_page=50&orderby=date&order=desc");
}

/** Raw single post by slug (WP returns an array even for exact slug match). */
export async function getPostBySlug(slug: string): Promise<WPPost | null> {
  const posts = await wpFetch<WPPost[]>(
    `/posts?slug=${encodeURIComponent(slug)}&_embed`
  );
  return posts[0] ?? null;
}

/** Raw category taxonomy list. */
export async function getCategories(): Promise<WPCategory[]> {
  return wpFetch<WPCategory[]>("/categories?per_page=100");
}

// ---------- HTML-safety helpers ----------
// WordPress's *.rendered fields contain HTML entities and, for title/excerpt,
// occasionally inline tags (<em>, <strong>, trailing "[&hellip;]"). We never
// dump these raw into card text — only content.rendered (full article body)
// is trusted enough to render as HTML, and only on the single-post page.

const ENTITY_MAP: Record<string, string> = {
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">",
  "&quot;": '"',
  "&#039;": "'",
  "&#8216;": "\u2018",
  "&#8217;": "\u2019",
  "&#8220;": "\u201C",
  "&#8221;": "\u201D",
  "&#8211;": "\u2013",
  "&#8212;": "\u2014",
  "&hellip;": "\u2026",
  "&nbsp;": " ",
};

function decodeEntities(str: string): string {
  return str.replace(
    /&amp;|&lt;|&gt;|&quot;|&#039;|&#8216;|&#8217;|&#8220;|&#8221;|&#8211;|&#8212;|&hellip;|&nbsp;/g,
    (m) => ENTITY_MAP[m] ?? m
  );
}

/** Strips tags and decodes entities — safe to drop into card titles/excerpts. */
function toPlainText(html: string): string {
  return decodeEntities(html.replace(/<[^>]*>/g, "")).trim();
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function estimateReadTime(html: string): string {
  const words = toPlainText(html).split(/\s+/).filter(Boolean).length;
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

// ---------- UI-facing types (what your components actually consume) ----------

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  author: { name: string; initials: string };
  /** Featured image path/URL, or null when the post has none. */
  image: string | null;
  featured: boolean;
};

export type BlogPostDetail = BlogPost & {
  /** Raw HTML — only safe to render via dangerouslySetInnerHTML, authored by you in wp-admin. */
  contentHtml: string;
  modifiedDate: string;
};

function toBlogPost(row: WPPost): BlogPost {
  const category = row._embedded?.["wp:term"]?.[0]?.[0]?.name ?? "General";
  const authorName = row._embedded?.author?.[0]?.name ?? "Intidata Team";
  const image = row._embedded?.["wp:featuredmedia"]?.[0]?.source_url ?? null;

  return {
    slug: row.slug,
    title: toPlainText(row.title.rendered),
    excerpt: toPlainText(row.excerpt.rendered),
    category,
    date: formatDate(row.date),
    readTime: estimateReadTime(row.content.rendered),
    author: { name: authorName, initials: initialsFromName(authorName) },
    image,
    featured: row.sticky,
  };
}

function toBlogPostDetail(row: WPPost): BlogPostDetail {
  return {
    ...toBlogPost(row),
    contentHtml: row.content.rendered,
    modifiedDate: formatDate(row.modified),
  };
}

// ---------- cached, UI-facing fetchers (what pages should import) ----------
// cache() dedupes within a single request render, same as lib/products.ts /
// lib/about.ts. Failures are logged and degrade to an empty/null result
// instead of throwing, so a stopped WordPress instance doesn't 500 the page.

export const getBlogPosts = cache(async (): Promise<BlogPost[]> => {
  try {
    const rows = await getPosts();
    const posts = rows.map(toBlogPost);

    // Nothing marked sticky in WP yet? Feature the 3 most recent instead,
    // so the hero carousel always has content.
    if (!posts.some((p) => p.featured)) {
      posts.slice(0, 3).forEach((p) => (p.featured = true));
    }

    return posts;
  } catch (err) {
    console.error("Failed to load posts from WordPress:", err);
    return [];
  }
});

export const getBlogPostBySlug = cache(
  async (slug: string): Promise<BlogPostDetail | null> => {
    try {
      const row = await getPostBySlug(slug);
      return row ? toBlogPostDetail(row) : null;
    } catch (err) {
      console.error(`Failed to load post "${slug}" from WordPress:`, err);
      return null;
    }
  }
);

export const getBlogCategories = cache(async (): Promise<string[]> => {
  try {
    const cats = await getCategories();
    return cats.map((c) => c.name).filter((n) => n !== "Uncategorized");
  } catch (err) {
    console.error("Failed to load categories from WordPress:", err);
    return [];
  }
});