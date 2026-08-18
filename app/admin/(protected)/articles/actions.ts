// app/admin/(protected)/articles/actions.ts
"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { requireCmsUser } from "@/lib/admin/auth";
import { slugify } from "@/lib/admin/articles";

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
      author_name: user.email,
    })
    .select("id")
    .single();

  if (error) throw new Error(error.message);
  redirect(`/admin/articles/${data.id}`);
}

// Saves everything — including status — in one call, mirroring WordPress's
// single "Update" button instead of a separate save-then-unpublish flow.
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
  }
) {
  const user = await requireCmsUser();
  const supabase = await createClient();

  const updates: Record<string, unknown> = {
    title: fields.title,
    slug: fields.slug || slugify(fields.title),
    excerpt: fields.excerpt,
    content: fields.content,
    cover_image: fields.coverImage,
    category: fields.category,
    tags: fields.tags,
    seo_title: fields.seoTitle,
    seo_description: fields.seoDescription,
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

  const { error } = await supabase.from("articles").update(updates).eq("id", id);

  if (error) throw new Error(error.message);
  revalidatePath(`/admin/articles/${id}`);
  revalidatePath("/admin/articles");
  revalidatePath("/blog");
}

// Soft delete — moves the article into the "trash" status. Reversible via
// restoreArticle, same as WordPress's trash behavior.
export async function trashArticle(id: string) {
  await requireCmsUser();
  const supabase = await createClient();
  const { error } = await supabase.from("articles").update({ status: "trash" }).eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/articles");
  revalidatePath("/blog");
}

// Pulls an article out of trash back into draft, ready to be republished.
export async function restoreArticle(id: string) {
  await requireCmsUser();
  const supabase = await createClient();
  const { error } = await supabase.from("articles").update({ status: "draft" }).eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/articles");
}

// Actual, unrecoverable delete — only from inside the trash, admin only.
export async function permanentlyDeleteArticle(id: string) {
  await requireCmsUser("admin");
  const supabase = await createClient();
  const { error } = await supabase.from("articles").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/articles");
}