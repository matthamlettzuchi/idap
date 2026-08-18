import { requireCmsUser } from "@/lib/admin/auth";
import { SettingsEditor } from "@/components/admin/settings/settings-editor";

export default async function AdminSettingsPage() {
  const user = await requireCmsUser();

  return (
    <div>
      <h1 className="font-display text-[22px] font-semibold text-ink-0">Settings</h1>
      <p className="mt-2 text-[13.5px] text-ink-2">
        Manage your profile, password, and appearance preferences.
      </p>
      <div className="mt-6">
        <SettingsEditor user={user} />
      </div>
    </div>
  );
}