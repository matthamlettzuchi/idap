"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { ListFieldEditor } from "@/components/admin/ui/list-field-editor";
import { LimitedInput } from "@/components/admin/ui/limited-input";
import { LimitedTextArea } from "@/components/admin/ui/limited-textarea";
import { FIELD_LIMITS, MAX_ITEMS } from "@/lib/admin/field-limits";
import { saveSiteContent } from "@/app/admin/(protected)/site-content/actions";
import type { AdminSiteContent } from "@/lib/admin/site-content";
import type { SiteNavLink, SiteButtons, SiteFooterContent } from "@/lib/site-content-defaults";

function SectionCard({
  title,
  desc,
  children,
}: {
  title: string;
  desc?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-4 rounded-xl border border-(--panel-border) bg-panel p-6">
      <div>
        <div className="mono-label">{title}</div>
        {desc && <p className="mt-1 text-[12px] text-ink-2">{desc}</p>}
      </div>
      {children}
    </section>
  );
}

// Mirrors the other page editors — any field or list item over its limit
// blocks Save.
function computeOverLimit(
  navLinks: SiteNavLink[],
  buttons: SiteButtons,
  footerContent: SiteFooterContent
): boolean {
  return (
    navLinks.some(
      (l) => l.label.length > FIELD_LIMITS.navLabel || l.href.length > FIELD_LIMITS.navHref
    ) ||
    buttons.nav_cta_label.length > FIELD_LIMITS.navLabel ||
    buttons.nav_cta_href.length > FIELD_LIMITS.navHref ||
    buttons.hero_primary_label.length > FIELD_LIMITS.navLabel ||
    buttons.hero_primary_href.length > FIELD_LIMITS.navHref ||
    buttons.hero_secondary_label.length > FIELD_LIMITS.navLabel ||
    buttons.hero_secondary_href.length > FIELD_LIMITS.navHref ||
    footerContent.description.length > FIELD_LIMITS.footerDescription ||
    (footerContent.facebook_url?.length ?? 0) > FIELD_LIMITS.socialUrl ||
    (footerContent.instagram_url?.length ?? 0) > FIELD_LIMITS.socialUrl ||
    (footerContent.linkedin_url?.length ?? 0) > FIELD_LIMITS.socialUrl ||
    footerContent.copyright_name.length > FIELD_LIMITS.copyrightName
  );
}

export function SiteContentEditor({ initial }: { initial: AdminSiteContent }) {
  const [navLinks, setNavLinks] = useState<SiteNavLink[]>(initial.navLinks);
  const [buttons, setButtons] = useState<SiteButtons>(initial.buttons);
  const [footerContent, setFooterContent] = useState<SiteFooterContent>(initial.footerContent);

  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [savedAt, setSavedAt] = useState<Date | null>(null);
  const router = useRouter();

  const overLimit = computeOverLimit(navLinks, buttons, footerContent);

  function setButton<K extends keyof SiteButtons>(key: K, value: SiteButtons[K]) {
    setButtons((prev) => ({ ...prev, [key]: value }));
  }

  function setFooter<K extends keyof SiteFooterContent>(key: K, value: SiteFooterContent[K]) {
    setFooterContent((prev) => ({ ...prev, [key]: value }));
  }

  function handleSave() {
    if (overLimit) return;
    setError(null);
    startTransition(async () => {
      try {
        await saveSiteContent({ navLinks, buttons, footerContent });
        setSavedAt(new Date());
        router.refresh();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Gagal menyimpan.");
      }
    });
  }

  return (
    <div className="max-w-4xl space-y-8 pb-16">
      <div className="sticky top-0 z-30 -mx-6 flex items-center justify-end gap-3 border-b border-(--panel-border) bg-void/90 px-6 py-3 backdrop-blur-sm sm:-mx-10 sm:px-10">
        {savedAt && (
          <span className="text-[12px] text-ink-2">Saved {savedAt.toLocaleTimeString()}</span>
        )}
        {overLimit && (
          <span className="text-[12px] font-medium text-red-500">
            Fix fields over their character limit before saving.
          </span>
        )}
        <button
          onClick={handleSave}
          disabled={pending || overLimit}
          className="rounded-full bg-signal-blue px-5 py-2.5 text-[13px] font-medium text-white disabled:opacity-60"
        >
          {pending ? "Saving..." : "Save Changes"}
        </button>
      </div>

      {error && (
        <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-[13px] text-red-700">
          {error}
        </p>
      )}

      {/* NAV LINKS */}
      <SectionCard
        title="Navigation Links"
        desc="Link sederhana di navbar & kolom Navigation footer (About Us, Credit Simulation, Blog, Contact). Products & Services mega menu dikelola terpisah di halaman Products/Services."
      >
        <ListFieldEditor
          items={navLinks}
          onChange={setNavLinks}
          maxItems={MAX_ITEMS.navLinks}
          newItem={() => ({ label: "", href: "" }) as SiteNavLink}
          addLabel="Add link"
          renderItem={(item, update) => (
            <div className="grid grid-cols-2 gap-2">
              <LimitedInput
                maxLength={FIELD_LIMITS.navLabel}
                value={item.label}
                onChange={(e) => update({ ...item, label: e.target.value })}
                placeholder="Label (e.g. About Us)"
                className="bg-panel font-medium"
              />
              <LimitedInput
                maxLength={FIELD_LIMITS.navHref}
                value={item.href}
                onChange={(e) => update({ ...item, href: e.target.value })}
                placeholder="/about or https://..."
                className="bg-panel"
              />
            </div>
          )}
        />
      </SectionCard>

      {/* BUTTONS */}
      <SectionCard
        title="Global Buttons"
        desc="Tombol CTA yang muncul di navbar dan hero homepage."
      >
        <div className="space-y-3 rounded-lg border border-(--panel-border) bg-panel-2 p-4">
          <div className="text-[12px] font-medium text-ink-2">Navbar CTA ("Hubungi Kami")</div>
          <div className="grid grid-cols-2 gap-2">
            <LimitedInput
              maxLength={FIELD_LIMITS.navLabel}
              value={buttons.nav_cta_label}
              onChange={(e) => setButton("nav_cta_label", e.target.value)}
              placeholder="Label"
              className="bg-panel"
            />
            <LimitedInput
              maxLength={FIELD_LIMITS.navHref}
              value={buttons.nav_cta_href}
              onChange={(e) => setButton("nav_cta_href", e.target.value)}
              placeholder="Link"
              className="bg-panel"
            />
          </div>
        </div>

        <div className="space-y-3 rounded-lg border border-(--panel-border) bg-panel-2 p-4">
          <div className="text-[12px] font-medium text-ink-2">Hero Primary Button ("Contact Us")</div>
          <div className="grid grid-cols-2 gap-2">
            <LimitedInput
              maxLength={FIELD_LIMITS.navLabel}
              value={buttons.hero_primary_label}
              onChange={(e) => setButton("hero_primary_label", e.target.value)}
              placeholder="Label"
              className="bg-panel"
            />
            <LimitedInput
              maxLength={FIELD_LIMITS.navHref}
              value={buttons.hero_primary_href}
              onChange={(e) => setButton("hero_primary_href", e.target.value)}
              placeholder="Link"
              className="bg-panel"
            />
          </div>
        </div>

        <div className="space-y-3 rounded-lg border border-(--panel-border) bg-panel-2 p-4">
          <div className="text-[12px] font-medium text-ink-2">Hero Secondary Button ("View Products")</div>
          <div className="grid grid-cols-2 gap-2">
            <LimitedInput
              maxLength={FIELD_LIMITS.navLabel}
              value={buttons.hero_secondary_label}
              onChange={(e) => setButton("hero_secondary_label", e.target.value)}
              placeholder="Label"
              className="bg-panel"
            />
            <LimitedInput
              maxLength={FIELD_LIMITS.navHref}
              value={buttons.hero_secondary_href}
              onChange={(e) => setButton("hero_secondary_href", e.target.value)}
              placeholder="Link"
              className="bg-panel"
            />
          </div>
        </div>
      </SectionCard>

      {/* FOOTER */}
      <SectionCard title="Footer" desc="Deskripsi singkat, social links, dan copyright name.">
        <LimitedTextArea
          label="Description"
          maxLength={FIELD_LIMITS.footerDescription}
          value={footerContent.description}
          onChange={(e) => setFooter("description", e.target.value)}
          rows={3}
        />
        <LimitedInput
          label="Facebook URL (kosongkan untuk sembunyikan ikon)"
          maxLength={FIELD_LIMITS.socialUrl}
          value={footerContent.facebook_url ?? ""}
          onChange={(e) => setFooter("facebook_url", e.target.value || null)}
        />
        <LimitedInput
          label="Instagram URL (kosongkan untuk sembunyikan ikon)"
          maxLength={FIELD_LIMITS.socialUrl}
          value={footerContent.instagram_url ?? ""}
          onChange={(e) => setFooter("instagram_url", e.target.value || null)}
        />
        <LimitedInput
          label="LinkedIn URL (kosongkan untuk sembunyikan ikon)"
          maxLength={FIELD_LIMITS.socialUrl}
          value={footerContent.linkedin_url ?? ""}
          onChange={(e) => setFooter("linkedin_url", e.target.value || null)}
        />
        <LimitedInput
          label='Copyright Name (muncul sebagai "© {year} [nama]. All rights reserved.")'
          maxLength={FIELD_LIMITS.copyrightName}
          value={footerContent.copyright_name}
          onChange={(e) => setFooter("copyright_name", e.target.value)}
        />
      </SectionCard>

      <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={pending || overLimit}
          className="rounded-full bg-signal-blue px-6 py-2.5 text-[13.5px] font-medium text-white disabled:opacity-60"
        >
          {pending ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
}