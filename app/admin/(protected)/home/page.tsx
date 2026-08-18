import { getAdminHomePage } from "@/lib/admin/home";
import { HomeEditor } from "@/components/admin/home/home-editor";

export default async function AdminHomePage() {
  const page = await getAdminHomePage();

  return (
    <div>
      <h1 className="font-display text-[22px] font-semibold text-ink-0">Home Page</h1>
      <p className="mt-2 text-[13.5px] text-ink-2">
        Kelola hero stats, tema musiman hero &amp; nav, testimonial, logo klien, FAQ, dan kontak
        yang tampil di homepage.
      </p>
      <div className="mt-6">
        <HomeEditor initial={page} />
      </div>
    </div>
  );
}