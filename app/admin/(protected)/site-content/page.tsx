import { getAdminSiteContent } from "@/lib/admin/site-content";
import { SiteContentEditor } from "@/components/admin/site-content/site-content-editor";

export default async function AdminSiteContentPage() {
  const content = await getAdminSiteContent();

  return (
    <div>
      <h1 className="font-display text-[22px] font-semibold text-ink-0">Site Content</h1>
      <p className="mt-2 text-[13.5px] text-ink-2">
        Kelola link navbar, tombol CTA global (navbar &amp; hero), dan konten footer.
      </p>
      <div className="mt-6">
        <SiteContentEditor initial={content} />
      </div>
    </div>
  );
}