import Link from "next/link";
import { listAdminServices } from "@/lib/admin/services";
import { ServicesList } from "@/components/admin/services/services-list";

export default async function AdminServicesPage() {
  const services = await listAdminServices();

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-[22px] font-semibold text-ink-0">Services</h1>
        <Link
          href="/admin/services/new"
          className="rounded-full bg-signal-blue px-5 py-2.5 text-[13.5px] font-medium text-white"
        >
          New Service
        </Link>
      </div>
      <p className="mt-2 text-[13.5px] text-ink-2">
        Kelola layanan yang tampil di homepage, halaman services, dan navigasi.
      </p>
      <div className="mt-6">
        <ServicesList initialServices={services} />
      </div>
    </div>
  );
}