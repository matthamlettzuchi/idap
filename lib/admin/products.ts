import { createClient } from "@/lib/supabase/server";

export type ProductAdvantage = { title: string; subtitle?: string };
export type ProductFeature = { title: string; body: string };
export type ProductMetric = { label: string; value: string };

export type AdminProductIconName =
  | "Building2"
  | "TrendingUp"
  | "Calculator"
  | "FileSpreadsheet"
  | "Sprout";

export type AdminProductRow = {
  slug: string;
  code: string;
  name: string;
  tagline: string;
  accent: string;
  icon: AdminProductIconName;
  background_image: string;
  person_image: string;
  person_image_scale: number | null;
  person_image_offset_x: number | null;
  person_image_offset_y: number | null;
  quick_facts: string[];
  overview: string[];
  advantages: ProductAdvantage[];
  process_intro: { heading: string; body: string } | null;
  process_lottie: string | null;
  features_intro: string | null;
  features: ProductFeature[];
  sort_order: number;
  home_summary: string | null;
  home_description: string | null;
  home_metrics: ProductMetric[] | null;
  home_modules: string[] | null;
};

export type AdminProductInput = AdminProductRow;

const SELECT_COLUMNS =
  "slug, code, name, tagline, accent, icon, background_image, person_image, " +
  "person_image_scale, person_image_offset_x, person_image_offset_y, " +
  "quick_facts, overview, advantages, process_intro, process_lottie, " +
  "features_intro, features, sort_order, home_summary, home_description, " +
  "home_metrics, home_modules";

export async function listAdminProducts(): Promise<AdminProductRow[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select(SELECT_COLUMNS)
    .order("sort_order", { ascending: true });

  if (error) throw new Error(error.message);
  return (data ?? []) as unknown as AdminProductRow[];
}

export async function getAdminProductBySlug(
  slug: string
): Promise<AdminProductRow | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select(SELECT_COLUMNS)
    .eq("slug", slug)
    .single();

  if (error) return null;
  return data as unknown as AdminProductRow;
}