import { notFound } from "next/navigation";
import { ServiceDetailView } from "@/components/services/services-view-details";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ServiceDetailPage({ params }: PageProps) {
  // Unwrap Promise params using await
  const { slug } = await params;

  if (!slug) {
    notFound();
  }

  // Formatting slug (e.g. "custom-software-development" -> "custom software development")
  const title = slug.replace(/-/g, " ");

  return <ServiceDetailView slug={slug} title={title} />;
}