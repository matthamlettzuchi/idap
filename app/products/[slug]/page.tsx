import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { productDetails, productList } from "@/lib/product-details";
import { ProductDetailView } from "@/components/products/products-view-detail";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return productList.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = productDetails[slug];
  if (!product) return {};
  return {
    title: `${product.name} — Intidata`,
    description: product.tagline,
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const product = productDetails[slug];

  if (!product) {
    notFound();
  }

  const related = productList.filter((p) => p.slug !== slug).slice(0, 4);

  return <ProductDetailView product={product} related={related} />;
}