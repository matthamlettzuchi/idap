import { createClient } from "@/lib/supabase/server";
import type {
  ServiceIconName,
  ServiceItem,
  ServiceProcessStep,
  ServiceTechGroup,
} from "@/lib/service-details";

export type AdminServiceRow = {
  slug: string;
  code: string;
  name: string;
  icon: ServiceIconName;
  accent: string;
  nav_desc: string;
  hero_title: string;
  hero_desc: string;
  hero_float_icons: string[] | null;
  highlights: ServiceItem[] | null;
  grid_section: { label: string; title: string; desc?: string; items: ServiceItem[] } | null;
  tech_stack: { label: string; title: string; desc?: string; groups: ServiceTechGroup[] } | null;
  process: ServiceProcessStep[] | null;
  closing_cta_title: string | null;
  sort_order: number;
};

export type AdminServiceInput = AdminServiceRow;

const SELECT_COLUMNS =
  "slug, code, name, icon, accent, nav_desc, hero_title, hero_desc, hero_float_icons, " +
  "highlights, grid_section, tech_stack, process, closing_cta_title, sort_order";

export async function listAdminServices(): Promise<AdminServiceRow[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("services")
    .select(SELECT_COLUMNS)
    .order("sort_order", { ascending: true });

  if (error) throw new Error(error.message);
  return (data ?? []) as unknown as AdminServiceRow[];
}

export async function getAdminServiceBySlug(
  slug: string
): Promise<AdminServiceRow | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("services")
    .select(SELECT_COLUMNS)
    .eq("slug", slug)
    .single();

  if (error) return null;
  return data as unknown as AdminServiceRow;
}