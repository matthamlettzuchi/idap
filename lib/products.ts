import { cache } from "react";
import { supabase } from "@/lib/supabase";

export type ProductIconName =
  | "Building2" | "TrendingUp" | "Calculator" | "FileSpreadsheet" | "Sprout";
  // tambahin di sini SEKALIGUS di productIconMap kalau nambah icon baru

export type ProductAdvantage = { title: string; subtitle?: string };
export type ProductFeature = { title: string; body: string };
export type ProductMetric = { label: string; value: string };

export type ProductRow = {
  slug: string;
  code: string;
  name: string;
  tagline: string;
  accent: string;
  icon: ProductIconName;
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
  metrics: ProductMetric[];
  modules: string[];
  sort_order: number;
};

export const getAllProducts = cache(async (): Promise<ProductRow[]> => {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("Supabase products fetch failed:", error.message);
    return [];
  }
  return data ?? [];
});

export const getProductBySlug = cache(async (slug: string): Promise<ProductRow | null> => {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) return null;
  return data;
});

// Shape ke bentuk yang dipakai ProductDetailView (camelCase, sama persis kayak
// ProductDetail lama di lib/product-details.ts)
export function toProductDetail(row: ProductRow) {
  return {
    slug: row.slug,
    code: row.code,
    name: row.name,
    tagline: row.tagline,
    accent: row.accent,
    icon: row.icon,
    backgroundImage: row.background_image,
    personImage: row.person_image,
    personImageScale: row.person_image_scale ?? undefined,
    personImageOffsetX: row.person_image_offset_x ?? undefined,
    personImageOffsetY: row.person_image_offset_y ?? undefined,
    quickFacts: row.quick_facts,
    overview: row.overview,
    advantages: row.advantages,
    processIntro: row.process_intro ?? undefined,
    processLottie: row.process_lottie ?? undefined,
    featuresIntro: row.features_intro ?? undefined,
    features: row.features,
  };
}

// Shape ke bentuk yang dipakai section Products di homepage (Product type lama)
export function toHomeProduct(row: ProductRow) {
  return {
    id: row.slug,
    link: row.slug,
    code: row.code,
    name: row.name,
    summary: row.tagline,
    description: row.overview[0] ?? row.tagline,
    metrics: row.metrics,
    modules: row.modules,
  };
}