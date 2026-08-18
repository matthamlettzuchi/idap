"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { requireCmsUser } from "@/lib/admin/auth";
import type { AdminProductInput } from "@/lib/admin/products";

function revalidateProductPaths(slug: string) {
  revalidatePath("/admin/products");
  revalidatePath(`/admin/products/${slug}`);
  revalidatePath(`/products/${slug}`);
  revalidatePath("/");
}

// Returns the slug instead of calling redirect() directly — this action is
// invoked imperatively from a client component (not a <form action>), and
// we want the client to control navigation via router.push after the save
// actually succeeds, rather than relying on redirect()'s special throw
// being handled correctly through that call path.
export async function createProduct(
  input: AdminProductInput
): Promise<{ slug: string }> {
  await requireCmsUser("admin");
  const supabase = await createClient();

  const { data: maxRow } = await supabase
    .from("products")
    .select("sort_order")
    .order("sort_order", { ascending: false })
    .limit(1)
    .maybeSingle();

  const nextOrder = (maxRow?.sort_order ?? -1) + 1;

  const { error } = await supabase
    .from("products")
    .insert({ ...input, sort_order: nextOrder });

  if (error) throw new Error(error.message);

  revalidateProductPaths(input.slug);
  return { slug: input.slug };
}

export async function updateProduct(
  slug: string,
  input: Partial<AdminProductInput>
) {
  await requireCmsUser("admin");
  const supabase = await createClient();

  const { error } = await supabase.from("products").update(input).eq("slug", slug);
  if (error) throw new Error(error.message);

  revalidateProductPaths(slug);
}

export async function deleteProduct(slug: string) {
  await requireCmsUser("admin");
  const supabase = await createClient();

  const { error } = await supabase.from("products").delete().eq("slug", slug);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/products");
  revalidatePath("/");
}

export async function reorderProducts(orderedSlugs: string[]) {
  await requireCmsUser("admin");
  const supabase = await createClient();

  await Promise.all(
    orderedSlugs.map((slug, index) =>
      supabase.from("products").update({ sort_order: index }).eq("slug", slug)
    )
  );

  revalidatePath("/admin/products");
  revalidatePath("/");
}