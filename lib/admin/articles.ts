// lib/admin/articles.ts
import { createClient } from "@/lib/supabase/server";
export { slugify } from "@/lib/admin/slugify";

export type ArticleStatus = "draft" | "published" | "trash";

export type ArticleRow = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  content: object; // TipTap JSON doc
  cover_image: string | null;
  category: string | null;
  tags: string[];
  author_name: string | null;
  author_id: string | null;
  status: ArticleStatus;
  seo_title: string | null;
  seo_description: string | null;
  published_at: string | null;
  created_at: string;
  updated_at: string;
};

export type ArticleHeroItem = {
  id: string;
  title: string;
  coverImage: string | null;
  publishedAt: string | null;
};

export async function listRecentPublishedArticlesForHero(
  limit = 6
): Promise<ArticleHeroItem[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("articles")
    .select("id, title, cover_image, published_at")
    .eq("status", "published")
    .order("published_at", { ascending: false })
    .limit(limit);

  if (error) return [];

  return (data ?? []).map((row) => ({
    id: row.id,
    title: row.title,
    coverImage: row.cover_image,
    publishedAt: row.published_at,
  }));
}

export async function listArticles(opts?: {
  status?: ArticleStatus;
  search?: string;
  authorId?: string;
}) {
  const supabase = await createClient();
  let query = supabase.from("articles").select("*").order("updated_at", { ascending: false });

  if (opts?.status) {
    query = query.eq("status", opts.status);
  } else {
    // "All statuses" nyembunyiin yang udah di-trash, sama kayak tab "All" di WordPress
    query = query.neq("status", "trash");
  }
  if (opts?.search) query = query.ilike("title", `%${opts.search}%`);
  if (opts?.authorId) query = query.eq("author_id", opts.authorId);

  const { data, error } = await query;
  if (error) throw new Error(error.message);
  return data as ArticleRow[];
}

export async function getArticleById(id: string) {
  const supabase = await createClient();
  const { data, error } = await supabase.from("articles").select("*").eq("id", id).single();
  if (error) return null;
  return data as ArticleRow;
}