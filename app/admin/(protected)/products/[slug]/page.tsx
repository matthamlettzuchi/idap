import { notFound } from "next/navigation";
import { getAdminProductBySlug } from "@/lib/admin/products";
import { ProductEditor } from "@/components/admin/products/product-editor";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function EditProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = await getAdminProductBySlug(slug);
  if (!product) notFound();

  return <ProductEditor product={product} />;
}