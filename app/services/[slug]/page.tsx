import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ServiceDetailPage({ params }: PageProps) {
  // Unwarp Promise params menggunakan await
  const { slug } = await params;

  if (!slug) {
    notFound();
  }

  // Formatting slug (contoh: "custom-software-development" -> "custom software development")
  const title = slug.replace(/-/g, " ");

  return (
    <main className="min-h-screen bg-void pb-24 pt-32 text-ink-0">
      <div className="container-x">
        <span className="mono-label">Service Detail</span>
        <h1 className="mt-4 font-display text-4xl font-bold capitalize">
          {title}
        </h1>
        <p className="mt-4 text-ink-2">
          Detail lengkap mengenai layanan <span className="capitalize">{title}</span> akan ditayangkan di halaman khusus ini.
        </p>
      </div>
    </main>
  );
}