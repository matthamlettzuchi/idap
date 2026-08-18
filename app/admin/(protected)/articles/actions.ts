"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { requireCmsUser, type CmsUser } from "@/lib/admin/auth";
import { slugify } from "@/lib/admin/articles";
import { truncateFields } from "@/lib/admin/field-limits";

export async function createArticle() {
  const user = await requireCmsUser();
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("articles")
    .insert({
      slug: `untitled-${Date.now()}`,
      title: "Untitled Article",
      content: {},
      status: "draft",
      author_id: user.id,
      author_name: user.username,
    })
    .select("id")
    .single();

  if (error) throw new Error(error.message);
  redirect(`/admin/articles/${data.id}`);
}

// Editors may only touch their own articles; admins may touch any.
async function assertCanModifyArticle(
  supabase: Awaited<ReturnType<typeof createClient>>,
  user: CmsUser,
  id: string,
) {
  if (user.role === "admin") return;

  const { data: article, error } = await supabase
    .from("articles")
    .select("author_id")
    .eq("id", id)
    .single();

  if (error || !article) throw new Error("Article not found.");
  if (article.author_id !== user.id) {
    throw new Error("You can only edit or delete your own articles.");
  }
}

export async function saveArticle(
  id: string,
  fields: {
    title: string;
    slug: string;
    excerpt: string;
    content: object;
    coverImage: string | null;
    category: string;
    tags: string[];
    seoTitle: string;
    seoDescription: string;
    status?: "draft" | "published";
  },
) {
  const user = await requireCmsUser();
  const supabase = await createClient();

  await assertCanModifyArticle(supabase, user, id);

  const safe = truncateFields(fields, {
    title: "articleTitle",
    slug: "slug",
    excerpt: "articleExcerpt",
    category: "articleCategory",
    seoTitle: "seoTitle",
    seoDescription: "seoDescription",
  });

  const updates: Record<string, unknown> = {
    title: safe.title,
    slug: safe.slug || slugify(safe.title),
    excerpt: safe.excerpt,
    content: fields.content,
    cover_image: fields.coverImage,
    category: safe.category,
    tags: fields.tags,
    seo_title: safe.seoTitle,
    seo_description: safe.seoDescription,
  };

  if (fields.status) {
    if (fields.status === "published" && user.role !== "admin") {
      throw new Error("Only admins can publish articles.");
    }
    updates.status = fields.status;

    if (fields.status === "published") {
      const { data: existing } = await supabase
        .from("articles")
        .select("published_at")
        .eq("id", id)
        .single();
      if (!existing?.published_at) {
        updates.published_at = new Date().toISOString();
      }
    } else {
      updates.published_at = null;
    }
  }

  const { error } = await supabase
    .from("articles")
    .update(updates)
    .eq("id", id);

  if (error) throw new Error(error.message);
  revalidatePath(`/admin/articles/${id}`);
  revalidatePath("/admin/articles");
  revalidatePath("/blog");
}

export async function trashArticle(id: string) {
  const user = await requireCmsUser();
  const supabase = await createClient();
  await assertCanModifyArticle(supabase, user, id);

  const { error } = await supabase
    .from("articles")
    .update({ status: "trash" })
    .eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/articles");
  revalidatePath("/blog");
}

export async function restoreArticle(id: string) {
  const user = await requireCmsUser();
  const supabase = await createClient();
  await assertCanModifyArticle(supabase, user, id);

  const { error } = await supabase
    .from("articles")
    .update({ status: "draft" })
    .eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/articles");
}

// Actual, unrecoverable delete — admin only, already correct as-is.
export async function permanentlyDeleteArticle(id: string) {
  await requireCmsUser("admin");
  const supabase = await createClient();
  const { error } = await supabase.from("articles").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/articles");
}
