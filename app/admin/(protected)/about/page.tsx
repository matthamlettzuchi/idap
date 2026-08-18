import { getAdminAboutPage } from "@/lib/admin/about";
import { AboutEditor } from "@/components/admin/about/about-editor";

export default async function AdminAboutPage() {
  const page = await getAdminAboutPage();

  return (
    <div>
      <h1 className="font-display text-[22px] font-semibold text-ink-0">About Us Page</h1>
      <p className="mt-2 text-[13.5px] text-ink-2">
        Kelola seluruh konten halaman About Us — hero, vision &amp; mission, journey, core
        values, process, dan industries.
      </p>
      <div className="mt-6">
        <AboutEditor initial={page} />
      </div>
    </div>
  );
}