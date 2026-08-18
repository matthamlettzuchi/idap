import { notFound } from "next/navigation";
import { getAdminServiceBySlug } from "@/lib/admin/services";
import { ServiceEditor } from "@/components/admin/services/service-editor";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function EditServicePage({ params }: PageProps) {
  const { slug } = await params;
  const service = await getAdminServiceBySlug(slug);
  if (!service) notFound();

  return <ServiceEditor service={service} />;
}