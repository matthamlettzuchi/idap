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
  }
) {
  await requireCmsUser();
  const supabase = await createClient();

  const { error } = await supabase
    .from("articles")
    .update({
      title: fields.title,
      slug: fields.slug || slugify(fields.title),
      excerpt: fields.excerpt,
      content: fields.content,
      cover_image: fields.coverImage,
      category: fields.category,
      tags: fields.tags,
      seo_title: fields.seoTitle,
      seo_description: fields.seoDescription,
    })
    .eq("id", id);

  if (error) throw new Error(error.message);
  revalidatePath(`/admin/articles/${id}`);
  revalidatePath("/admin/articles");
}

export async function setArticleStatus(id: string, status: "draft" | "published") {
  const user = await requireCmsUser();

  // Only admins can publish — editors can only ever save drafts, per spec.
  if (status === "published" && user.role !== "admin") {
    throw new Error("Only admins can publish articles.");
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("articles")
    .update({
      status,
      published_at: status === "published" ? new Date().toISOString() : null,
    })
    .eq("id", id);

  if (error) throw new Error(error.message);
  revalidatePath(`/admin/articles/${id}`);
  revalidatePath("/admin/articles");
  revalidatePath("/blog");
}

export async function deleteArticle(id: string) {
  const user = await requireCmsUser("admin"); // redirects non-admins
  const supabase = await createClient();
  const { error } = await supabase.from("articles").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/articles");
}