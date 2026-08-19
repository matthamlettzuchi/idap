import { getAdminContactFormSettings } from "@/lib/admin/contact-settings";
import { ContactSettingsEditor } from "@/components/admin/contact-settings/contact-settings-editor";

export default async function AdminContactSettingsPage() {
  const settings = await getAdminContactFormSettings();

  return (
    <div>
      <h1 className="font-display text-[22px] font-semibold text-ink-0">
        Contact Form Settings
      </h1>
      <p className="mt-2 text-[13.5px] text-ink-2">
        Kelola alamat tujuan dan nama pengirim untuk email dari form contact.
      </p>
      <div className="mt-6">
        <ContactSettingsEditor initial={settings} />
      </div>
    </div>
  );
}