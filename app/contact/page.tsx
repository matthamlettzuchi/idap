import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllProducts, getProductBySlug, toProductDetail } from "@/lib/products";
import { ProductDetailView } from "@/components/products/products-view-detail";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 300;

export async function generateStaticParams() {
  const products = await getAllProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const row = await getProductBySlug(slug);
  if (!row) return {};
  return {
    title: `${row.name} — Intidata`,
    description: row.tagline,
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const row = await getProductBySlug(slug);

  if (!row) {
    notFound();
  }

  const all = await getAllProducts();
  const product = toProductDetail(row);
  const related = all
    .filter((p) => p.slug !== slug)
    .slice(0, 4)
    .map(toProductDetail);

  return <ProductDetailView product={product} related={related} />;
}