"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { requireCmsUser } from "@/lib/admin/auth";
import type { AdminServiceInput } from "@/lib/admin/services";

function revalidateServicePaths(slug: string) {
  revalidatePath("/admin/services");
  revalidatePath(`/admin/services/${slug}`);
  revalidatePath(`/services/${slug}`);
  revalidatePath("/");
}

// Returns the slug instead of calling redirect() directly — same reasoning
// as createProduct: this is invoked imperatively from a client component,
// so the client controls navigation via router.push after save succeeds.
export async function createService(
  input: AdminServiceInput
): Promise<{ slug: string }> {
  await requireCmsUser("admin");
  const supabase = await createClient();

  const { data: maxRow } = await supabase
    .from("services")
    .select("sort_order")
    .order("sort_order", { ascending: false })
    .limit(1)
    .maybeSingle();

  const nextOrder = (maxRow?.sort_order ?? -1) + 1;

  const { error } = await supabase
    .from("services")
    .insert({ ...input, sort_order: nextOrder });

  if (error) throw new Error(error.message);

  revalidateServicePaths(input.slug);
  return { slug: input.slug };
}

export async function updateService(
  slug: string,
  input: Partial<AdminServiceInput>
) {
  await requireCmsUser("admin");
  const supabase = await createClient();

  const { error } = await supabase.from("services").update(input).eq("slug", slug);
  if (error) throw new Error(error.message);

  revalidateServicePaths(slug);
}

export async function deleteService(slug: string) {
  await requireCmsUser("admin");
  const supabase = await createClient();

  const { error } = await supabase.from("services").delete().eq("slug", slug);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/services");
  revalidatePath("/");
}

export async function reorderServices(orderedSlugs: string[]) {
  await requireCmsUser("admin");
  const supabase = await createClient();

  await Promise.all(
    orderedSlugs.map((slug, index) =>
      supabase.from("services").update({ sort_order: index }).eq("slug", slug)
    )
  );

  revalidatePath("/admin/services");
  revalidatePath("/");
}