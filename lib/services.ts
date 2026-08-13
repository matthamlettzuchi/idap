import { cache } from "react";
import { supabase } from "@/lib/supabase";
import type { ServiceDetail } from "@/lib/service-details";

export type ServiceRow = {
  slug: string;
  code: string;
  name: string;
  icon: ServiceDetail["icon"];
  accent: string;
  nav_desc: string;
  hero_title: string;
  hero_desc: string;
  hero_float_icons: string[] | null;
  highlights: NonNullable<ServiceDetail["highlights"]> | null;
  grid_section: NonNullable<ServiceDetail["gridSection"]> | null;
  tech_stack: NonNullable<ServiceDetail["techStack"]> | null;
  process: NonNullable<ServiceDetail["process"]> | null;
  closing_cta_title: string | null;
  sort_order: number;
};

// cache() dedupes calls within a single request (e.g. generateStaticParams +
// the page itself both need a row, only one query actually hits Supabase).
// Only safe in Server Components, so this file must not be imported into
// "use client" files — nav.tsx / footer.tsx query Supabase directly instead,
// same as they already do for products.
export const getAllServices = cache(async (): Promise<ServiceRow[]> => {
  const { data, error } = await supabase
    .from("services")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("Supabase services fetch failed:", error.message);
    return [];
  }
  return data ?? [];
});

export const getServiceBySlug = cache(
  async (slug: string): Promise<ServiceRow | null> => {
    const { data, error } = await supabase
      .from("services")
      .select("*")
      .eq("slug", slug)
      .single();

    if (error) return null;
    return data;
  }
);

export function toServiceDetail(row: ServiceRow): ServiceDetail {
  return {
    slug: row.slug,
    code: row.code,
    name: row.name,
    icon: row.icon,
    accent: row.accent,
    heroTitle: row.hero_title,
    heroDesc: row.hero_desc,
    heroFloatIcons: row.hero_float_icons ?? undefined,
    highlights: row.highlights ?? undefined,
    gridSection: row.grid_section ?? undefined,
    techStack: row.tech_stack ?? undefined,
    process: row.process ?? undefined,
    closingCtaTitle: row.closing_cta_title ?? undefined,
  };
}