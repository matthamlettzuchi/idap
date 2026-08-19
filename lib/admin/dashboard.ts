import { createClient } from "@/lib/supabase/server";
import type { ArticleStatus } from "@/lib/admin/articles";

export type ActivityItem = {
  id: string;
  label: string;
  actorName: string | null;
  action: "created" | "edited" | "published" | "updated" | "deleted";
  updatedAt: string;
  // Only articles get a destination — page-level edits (About, Home, etc.)
  // don't map to a single admin URL, so they render as plain text.
  href?: string;
};

export type DraftItem = {
  id: string;
  slug: string;
  title: string;
  updatedAt: string;
  authorName: string | null;
};

export type AdminDashboardData = {
  recentActivity: ActivityItem[];
  recentDrafts: DraftItem[];
  totalArticles: number;
  myArticles: number;
};

type ArticleActivityRow = {
  id: string;
  slug: string;
  title: string;
  status: ArticleStatus;
  author_name: string | null;
  created_at: string;
  updated_at: string;
};

type ArticleDraftRow = {
  id: string;
  slug: string;
  title: string;
  updated_at: string;
  author_name: string | null;
};

type ActivityLogRow = {
  id: number;
  actor_name: string | null;
  entity_type: string;
  entity_label: string;
  action: "created" | "updated" | "deleted";
  created_at: string;
};

// How many rows we pull for the "history" view behind "See more". The
// dashboard cards themselves only ever render the first 5 of whatever
// comes back (see RecentActivityCard / RecentDraftsCard).
const HISTORY_LIMIT = 50;

export async function getAdminDashboardData(userId: string): Promise<AdminDashboardData> {
  const supabase = await createClient();

  const [
    { data: recentArticles },
    { data: drafts },
    { data: pageActivity },
    { count: totalArticles },
    { count: myArticles },
  ] = await Promise.all([
    supabase
      .from("articles")
      .select("id, slug, title, status, author_name, created_at, updated_at")
      .neq("status", "trash")
      .order("updated_at", { ascending: false })
      .limit(HISTORY_LIMIT),
    supabase
      .from("articles")
      .select("id, slug, title, updated_at, author_name")
      .eq("status", "draft")
      .order("updated_at", { ascending: false })
      .limit(HISTORY_LIMIT),
    supabase
      .from("admin_activity_log")
      .select("id, actor_name, entity_type, entity_label, action, created_at")
      .order("created_at", { ascending: false })
      .limit(HISTORY_LIMIT),
    supabase.from("articles").select("id", { count: "exact", head: true }).neq("status", "trash"),
    supabase
      .from("articles")
      .select("id", { count: "exact", head: true })
      .neq("status", "trash")
      .eq("author_id", userId),
  ]);

  const articleItems: ActivityItem[] = ((recentArticles as ArticleActivityRow[]) ?? []).map(
    (row) => {
      const createdAt = new Date(row.created_at).getTime();
      const updatedAt = new Date(row.updated_at).getTime();
      const isNew = Math.abs(updatedAt - createdAt) < 60_000;
      return {
        id: `article-${row.id}`,
        label: row.title || "(untitled)",
        actorName: row.author_name,
        action: row.status === "published" ? "published" : isNew ? "created" : "edited",
        updatedAt: row.updated_at,
        href: `/admin/articles/${row.id}`,
      };
    }
  );

  const pageItems: ActivityItem[] = ((pageActivity as ActivityLogRow[]) ?? []).map((row) => ({
    id: `log-${row.id}`,
    label: row.entity_label,
    actorName: row.actor_name,
    action: row.action,
    updatedAt: row.created_at,
  }));

  const recentActivity = [...articleItems, ...pageItems]
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, HISTORY_LIMIT);

  const recentDrafts: DraftItem[] = ((drafts as ArticleDraftRow[]) ?? []).map((row) => ({
    id: row.id,
    slug: row.slug,
    title: row.title,
    updatedAt: row.updated_at,
    authorName: row.author_name,
  }));

  return {
    recentActivity,
    recentDrafts,
    totalArticles: totalArticles ?? 0,
    myArticles: myArticles ?? 0,
  };
}