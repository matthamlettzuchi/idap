import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ServiceDetailView } from "@/components/services/services-view-details";
import { serviceDetails } from "@/lib/service-details";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return Object.keys(serviceDetails).map((slug) => ({ slug }));
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

  return <ServiceDetailView slug={slug} title={service.name} />;
}