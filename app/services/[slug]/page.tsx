import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ServiceDetailView } from "@/components/services/services-view-details";
import { getAllServices, getServiceBySlug, toServiceDetail } from "@/lib/services";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Re-check Supabase every 5 minutes, mirroring app/products/[slug]/page.tsx.
export const revalidate = 300;

export async function generateStaticParams() {
  const services = await getAllServices();
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const row = await getServiceBySlug(slug);
  if (!row) return {};
  return {
    title: `${row.name} — Intidata`,
    description: row.hero_desc,
  };
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const row = await getServiceBySlug(slug);

  if (!row) {
    notFound();
  }

  const all = await getAllServices();
  const service = toServiceDetail(row);
  const related = all
    .filter((s) => s.slug !== slug)
    .slice(0, 4)
    .map(toServiceDetail);

  return <ServiceDetailView service={service} related={related} />;
}