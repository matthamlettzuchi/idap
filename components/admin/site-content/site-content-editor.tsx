"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { ListFieldEditor } from "@/components/admin/ui/list-field-editor";
import { saveSiteContent } from "@/app/admin/(protected)/site-content/actions";
import type { AdminSiteContent } from "@/lib/admin/site-content";
import type { SiteNavLink, SiteButtons, SiteFooterContent } from "@/lib/site-content-defaults";

function fieldClass(extra = "") {
  return `w-full rounded-lg border border-(--panel-border) bg-panel-2 px-3 py-2 text-[13.5px] text-ink-0 outline-none focus:border-signal-teal ${extra}`;
}

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

export function SiteContentEditor({ initial }: { initial: AdminSiteContent }) {
  const [navLinks, setNavLinks] = useState<SiteNavLink[]>(initial.navLinks);
  const [buttons, setButtons] = useState<SiteButtons>(initial.buttons);
  const [footerContent, setFooterContent] = useState<SiteFooterContent>(initial.footerContent);

  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [savedAt, setSavedAt] = useState<Date | null>(null);
  const router = useRouter();

  function setButton<K extends keyof SiteButtons>(key: K, value: SiteButtons[K]) {
    setButtons((prev) => ({ ...prev, [key]: value }));
  }

  function setFooter<K extends keyof SiteFooterContent>(key: K, value: SiteFooterContent[K]) {
    setFooterContent((prev) => ({ ...prev, [key]: value }));
  }

  function handleSave() {
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
        <button
          onClick={handleSave}
          disabled={pending}
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
          newItem={() => ({ label: "", href: "" }) as SiteNavLink}
          addLabel="Add link"
          renderItem={(item, update) => (
            <div className="grid grid-cols-2 gap-2">
              <input
                value={item.label}
                onChange={(e) => update({ ...item, label: e.target.value })}
                placeholder="Label (e.g. About Us)"
                className={fieldClass("bg-panel font-medium")}
              />
              <input
                value={item.href}
                onChange={(e) => update({ ...item, href: e.target.value })}
                placeholder="/about or https://..."
                className={fieldClass("bg-panel")}
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
            <input
              value={buttons.nav_cta_label}
              onChange={(e) => setButton("nav_cta_label", e.target.value)}
              placeholder="Label"
              className={fieldClass("bg-panel")}
            />
            <input
              value={buttons.nav_cta_href}
              onChange={(e) => setButton("nav_cta_href", e.target.value)}
              placeholder="Link"
              className={fieldClass("bg-panel")}
            />
          </div>
        </div>

        <div className="space-y-3 rounded-lg border border-(--panel-border) bg-panel-2 p-4">
          <div className="text-[12px] font-medium text-ink-2">Hero Primary Button ("Contact Us")</div>
          <div className="grid grid-cols-2 gap-2">
            <input
              value={buttons.hero_primary_label}
              onChange={(e) => setButton("hero_primary_label", e.target.value)}
              placeholder="Label"
              className={fieldClass("bg-panel")}
            />
            <input
              value={buttons.hero_primary_href}
              onChange={(e) => setButton("hero_primary_href", e.target.value)}
              placeholder="Link"
              className={fieldClass("bg-panel")}
            />
          </div>
        </div>

        <div className="space-y-3 rounded-lg border border-(--panel-border) bg-panel-2 p-4">
          <div className="text-[12px] font-medium text-ink-2">Hero Secondary Button ("View Products")</div>
          <div className="grid grid-cols-2 gap-2">
            <input
              value={buttons.hero_secondary_label}
              onChange={(e) => setButton("hero_secondary_label", e.target.value)}
              placeholder="Label"
              className={fieldClass("bg-panel")}
            />
            <input
              value={buttons.hero_secondary_href}
              onChange={(e) => setButton("hero_secondary_href", e.target.value)}
              placeholder="Link"
              className={fieldClass("bg-panel")}
            />
          </div>
        </div>
      </SectionCard>

      {/* FOOTER */}
      <SectionCard title="Footer" desc="Deskripsi singkat, social links, dan copyright name.">
        <div>
          <label className="mb-1.5 block text-[12px] font-medium text-ink-2">Description</label>
          <textarea
            value={footerContent.description}
            onChange={(e) => setFooter("description", e.target.value)}
            rows={3}
            className={fieldClass("resize-none")}
          />
        </div>
        <div>
          <label className="mb-1.5 block text-[12px] font-medium text-ink-2">
            Facebook URL (kosongkan untuk sembunyikan ikon)
          </label>
          <input
            value={footerContent.facebook_url ?? ""}
            onChange={(e) => setFooter("facebook_url", e.target.value || null)}
            className={fieldClass()}
          />
        </div>
        <div>
          <label className="mb-1.5 block text-[12px] font-medium text-ink-2">
            Instagram URL (kosongkan untuk sembunyikan ikon)
          </label>
          <input
            value={footerContent.instagram_url ?? ""}
            onChange={(e) => setFooter("instagram_url", e.target.value || null)}
            className={fieldClass()}
          />
        </div>
        <div>
          <label className="mb-1.5 block text-[12px] font-medium text-ink-2">
            LinkedIn URL (kosongkan untuk sembunyikan ikon)
          </label>
          <input
            value={footerContent.linkedin_url ?? ""}
            onChange={(e) => setFooter("linkedin_url", e.target.value || null)}
            className={fieldClass()}
          />
        </div>
        <div>
          <label className="mb-1.5 block text-[12px] font-medium text-ink-2">
            Copyright Name (muncul sebagai "© {"{"}year{"}"} [nama]. All rights reserved.")
          </label>
          <input
            value={footerContent.copyright_name}
            onChange={(e) => setFooter("copyright_name", e.target.value)}
            className={fieldClass()}
          />
        </div>
      </SectionCard>

      <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={pending}
          className="rounded-full bg-signal-blue px-6 py-2.5 text-[13.5px] font-medium text-white disabled:opacity-60"
        >
          {pending ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
}