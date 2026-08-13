import { cache } from "react";
import { supabase } from "@/lib/supabase";
import type { ProductDetail } from "@/lib/product-details";

export type ProductRow = {
  slug: string;
  code: string;
  name: string;
  tagline: string;
  accent: string;
  icon: ProductDetail["icon"];
  background_image: string;
  person_image: string;
  person_image_scale: number | null;
  person_image_offset_x: number | null;
  person_image_offset_y: number | null;
  quick_facts: string[];
  overview: string[];
  advantages: { title: string; subtitle?: string }[];
  process_intro: { heading: string; body: string } | null;
  process_lottie: string | null;
  features_intro: string | null;
  features: { title: string; body: string }[];
  metrics: { label: string; value: string }[];
  modules: string[];
  sort_order: number;
};

// cache() dedupes calls within a single request (e.g. Nav + page both need
// the list, only one query actually hits Supabase). Only safe in Server
// Components, so this file must not be imported into "use client" files.
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

export const getProductBySlug = cache(
  async (slug: string): Promise<ProductRow | null> => {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("slug", slug)
      .single();

    if (error) return null;
    return data;
  }
);

export function toProductDetail(row: ProductRow): ProductDetail {
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