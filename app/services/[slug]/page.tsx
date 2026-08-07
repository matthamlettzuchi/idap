import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { serviceDetails, serviceList } from "@/lib/service-details";
import { ServiceDetailView } from "@/components/services/services-view-details";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return serviceList.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = serviceDetails[slug];
  if (!service) return {};
  return {
    title: `${service.name} — Intidata`,
    description: service.heroDesc,
  };
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const service = serviceDetails[slug];

  if (!service) {
    notFound();
  }

  const related = serviceList.filter((s) => s.slug !== slug).slice(0, 4);

  return <ServiceDetailView service={service} related={related} />;
}