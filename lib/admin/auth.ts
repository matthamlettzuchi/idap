import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export type CmsRole = "admin" | "editor";
export type CmsUser = { id: string; email?: string; role: CmsRole };

export async function getCmsUser(): Promise<CmsUser | null> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: adminRow } = await supabase
    .from("admin_users")
    .select("role")
    .eq("user_id", user.id)
    .single();

  if (!adminRow) return null; // authenticated, but not a CMS user

  return { id: user.id, email: user.email ?? undefined, role: adminRow.role as CmsRole };
}

export async function requireCmsUser(minRole?: CmsRole): Promise<CmsUser> {
  const cmsUser = await getCmsUser();
  if (!cmsUser) redirect("/admin/login");
  if (minRole === "admin" && cmsUser.role !== "admin") redirect("/admin");
  return cmsUser;
}