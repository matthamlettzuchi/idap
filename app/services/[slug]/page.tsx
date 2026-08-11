import { notFound } from "next/navigation";
import { ServiceDetailView } from "@/components/services/services-view-details";
import { serviceDetails } from "@/lib/service-details";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;

  const service = serviceDetails[slug];

  if (!service) {
    notFound();
  }

  return <ServiceDetailView slug={slug} title={service.name} />;
}