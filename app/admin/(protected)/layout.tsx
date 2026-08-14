import type { ReactNode } from "react";
import { requireCmsUser } from "@/lib/admin/auth";
import { AdminShell } from "@/components/admin/admin-shell";

export default async function ProtectedAdminLayout({ children }: { children: ReactNode }) {
  const cmsUser = await requireCmsUser();
  return <AdminShell user={cmsUser}>{children}</AdminShell>;
}