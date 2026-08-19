"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { ImageField } from "@/components/admin/ui/image-field";
import { ListFieldEditor } from "@/components/admin/ui/list-field-editor";
import { LimitedInput } from "@/components/admin/ui/limited-input";
import { LimitedTextArea } from "@/components/admin/ui/limited-textarea";
import { FIELD_LIMITS, MAX_ITEMS } from "@/lib/admin/field-limits";
import { saveHomePage } from "@/app/admin/(protected)/home/actions";
import { slugify } from "@/lib/admin/slugify";
import type {
  AdminHomePage,
  AdminHeroStat,
  AdminHeroTheme,
  AdminClientLogo,
  AdminFaq,
  AdminSeasonalTheme,
  AdminTestimonial,
  AdminSiteContact,
} from "@/lib/admin/home";
import { SuccessToast } from "../ui/success-toast";

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

// Small helper: date-range inputs shared by hero_themes / seasonal_themes.
function DateRangeFields({
  startMonth,
  startDay,
  endMonth,
  endDay,
  onChange,
}: {
  startMonth: number;
  startDay: number;
  endMonth: number;
  endDay: number;
  onChange: (next: {
    start_month: number;
    start_day: number;
    end_month: number;
    end_day: number;
  }) => void;
}) {
  return (
    <div className="grid grid-cols-4 gap-2">
      <div>
        <label className="mb-1 block text-[10.5px] text-ink-2">
          Start Month
        </label>
        <input
          type="number"
          min={1}
          max={12}
          value={startMonth}
          onChange={(e) =>
            onChange({
              start_month: Number(e.target.value),
              start_day: startDay,
              end_month: endMonth,
              end_day: endDay,
            })
          }
          className={fieldClass("bg-panel")}
        />
      </div>
      <div>
        <label className="mb-1 block text-[10.5px] text-ink-2">Start Day</label>
        <input
          type="number"
          min={1}
          max={31}
          value={startDay}
          onChange={(e) =>
            onChange({
              start_month: startMonth,
              start_day: Number(e.target.value),
              end_month: endMonth,
              end_day: endDay,
            })
          }
          className={fieldClass("bg-panel")}
        />
      </div>
      <div>
        <label className="mb-1 block text-[10.5px] text-ink-2">End Month</label>
        <input
          type="number"
          min={1}
          max={12}
          value={endMonth}
          onChange={(e) =>
            onChange({
              start_month: startMonth,
              start_day: startDay,
              end_month: Number(e.target.value),
              end_day: endDay,
            })
          }
          className={fieldClass("bg-panel")}
        />
      </div>
      <div>
        <label className="mb-1 block text-[10.5px] text-ink-2">End Day</label>
        <input
          type="number"
          min={1}
          max={31}
          value={endDay}
          onChange={(e) =>
            onChange({
              start_month: startMonth,
              start_day: startDay,
              end_month: endMonth,
              end_day: Number(e.target.value),
            })
          }
          className={fieldClass("bg-panel")}
        />
      </div>
    </div>
  );
}

// Editable id field for text-id items (hero_themes, seasonal_themes,
// testimonials) — auto-slugified from a "source" label the first time it's
// touched, stays freely editable afterward, and is hard-capped at
// FIELD_LIMITS.entityId so it can never grow into a paragraph.
function IdField({
  value,
  onChange,
  placeholder = "unique-id",
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="mb-1 block text-[10.5px] text-ink-2">
        ID (unique, no spaces)
      </label>
      <input
        value={value}
        onChange={(e) =>
          onChange(slugify(e.target.value).slice(0, FIELD_LIMITS.entityId))
        }
        placeholder={placeholder}
        className={fieldClass("bg-panel font-mono text-[12px]")}
      />
    </div>
  );
}

let tmpCounter = 0;
function tempId(prefix: string) {
  tmpCounter += 1;
  return `${prefix}-${Date.now()}-${tmpCounter}`;
}

function makeSetDefault<T extends { id: string; is_default: boolean }>(
  items: T[],
  setItems: (items: T[]) => void,
) {
  return (id: string, value: boolean) => {
    setItems(
      items.map((it) => ({ ...it, is_default: it.id === id ? value : false })),
    );
  };
}

// Mirrors product-editor.tsx / about-editor.tsx: every text field with a
// matching Postgres truncation trigger (or a sane practical limit) is
// checked here. Any field or list item over its limit blocks Save.
function computeOverLimit(
  heroStats: AdminHeroStat[],
  heroThemes: AdminHeroTheme[],
  seasonalThemes: AdminSeasonalTheme[],
  testimonials: AdminTestimonial[],
  clientLogos: AdminClientLogo[],
  faqs: AdminFaq[],
  siteContact: AdminSiteContact,
): boolean {
  return (
    heroStats.some(
      (s) =>
        s.suffix.length > FIELD_LIMITS.statSuffix ||
        s.label.length > FIELD_LIMITS.statLabel,
    ) ||
    heroThemes.some(
      (t) =>
        t.id.length > FIELD_LIMITS.entityId ||
        t.label.length > FIELD_LIMITS.themeLabel ||
        t.character_alt.length > FIELD_LIMITS.characterAlt ||
        t.blob_gradient.length > FIELD_LIMITS.cssGradient ||
        t.background_wash.length > FIELD_LIMITS.cssGradient ||
        t.greeting.length > FIELD_LIMITS.greeting,
    ) ||
    seasonalThemes.some(
      (t) =>
        t.id.length > FIELD_LIMITS.entityId ||
        t.label.length > FIELD_LIMITS.themeLabel ||
        t.envelope_title.length > FIELD_LIMITS.envelopeTitle ||
        t.envelope_message.length > FIELD_LIMITS.envelopeMessage,
    ) ||
    testimonials.some(
      (t) =>
        t.id.length > FIELD_LIMITS.entityId ||
        t.category.length > FIELD_LIMITS.testimonialCategory ||
        t.quote.length > FIELD_LIMITS.testimonialQuote ||
        t.name.length > FIELD_LIMITS.testimonialName ||
        t.role.length > FIELD_LIMITS.testimonialRole ||
        t.company.length > FIELD_LIMITS.testimonialCompany ||
        t.initials.length > FIELD_LIMITS.testimonialInitials ||
        t.video_id.length > FIELD_LIMITS.testimonialVideoId,
    ) ||
    clientLogos.some((c) => c.name.length > FIELD_LIMITS.clientLogoName) ||
    faqs.some(
      (f) =>
        f.question.length > FIELD_LIMITS.faqQuestion ||
        f.answer.length > FIELD_LIMITS.faqAnswer,
    ) ||
    siteContact.address.length > FIELD_LIMITS.address ||
    siteContact.email.length > FIELD_LIMITS.email ||
    siteContact.whatsapp.length > FIELD_LIMITS.whatsappLink ||
    siteContact.phones.some((p) => p.length > FIELD_LIMITS.phone)
  );
}

export function HomeEditor({ initial }: { initial: AdminHomePage }) {
  const [heroStats, setHeroStats] = useState<AdminHeroStat[]>(
    initial.heroStats,
  );
  const [heroThemes, setHeroThemes] = useState<AdminHeroTheme[]>(
    initial.heroThemes,
  );
  const [clientLogos, setClientLogos] = useState<AdminClientLogo[]>(
    initial.clientLogos,
  );
  const [faqs, setFaqs] = useState<AdminFaq[]>(initial.faqs);
  const [seasonalThemes, setSeasonalThemes] = useState<AdminSeasonalTheme[]>(
    initial.seasonalThemes,
  );
  const [testimonials, setTestimonials] = useState<AdminTestimonial[]>(
    initial.testimonials,
  );
  const [siteContact, setSiteContact] = useState<AdminSiteContact>(
    initial.siteContact,
  );
  const setHeroThemeDefault = makeSetDefault(heroThemes, setHeroThemes);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const setSeasonalThemeDefault = makeSetDefault(
    seasonalThemes,
    setSeasonalThemes,
  );

  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [savedAt, setSavedAt] = useState<Date | null>(null);
  const router = useRouter();

  const overLimit = computeOverLimit(
    heroStats,
    heroThemes,
    seasonalThemes,
    testimonials,
    clientLogos,
    faqs,
    siteContact,
  );

  function setContact<K extends keyof AdminSiteContact>(
    key: K,
    value: AdminSiteContact[K],
  ) {
    setSiteContact((prev) => ({ ...prev, [key]: value }));
  }

  function handleSave() {
    if (overLimit) return;
    setError(null);
    startTransition(async () => {
      try {
        await saveHomePage({
          heroStats,
          heroThemes,
          clientLogos,
          faqs,
          seasonalThemes,
          testimonials,
          siteContact,
        });
        setSavedAt(new Date());
        setToastMsg("Home page saved successfully.")
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
          <span className="text-[12px] text-ink-2">
            Saved {savedAt.toLocaleTimeString()}
          </span>
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

      {/* HERO STATS */}
      <SectionCard
        title="Hero Stats"
        desc="Bar 3 statistik di bawah hero (Home)."
      >
        <ListFieldEditor
          items={heroStats}
          onChange={setHeroStats}
          maxItems={MAX_ITEMS.heroStats}
          newItem={() =>
            ({ value: 0, suffix: "+", label: "" }) as AdminHeroStat
          }
          addLabel="Add stat"
          renderItem={(item, update) => (
            <div className="grid grid-cols-3 gap-2">
              <input
                type="number"
                value={item.value}
                onChange={(e) =>
                  update({ ...item, value: Number(e.target.value) })
                }
                placeholder="25"
                className={fieldClass("bg-panel")}
              />
              <LimitedInput
                maxLength={FIELD_LIMITS.statSuffix}
                value={item.suffix}
                onChange={(e) => update({ ...item, suffix: e.target.value })}
                placeholder="+"
                className="bg-panel"
              />
              <LimitedInput
                maxLength={FIELD_LIMITS.statLabel}
                value={item.label}
                onChange={(e) => update({ ...item, label: e.target.value })}
                placeholder="Years of practical experience"
                className="bg-panel"
              />
            </div>
          )}
        />
      </SectionCard>

      {/* HERO THEMES */}
      <SectionCard
        title="Hero Seasonal Themes"
        desc="Karakter & background hero yang berganti otomatis sesuai tanggal (Imlek, Idul Fitri, Natal, dst)."
      >
        <ListFieldEditor
          items={heroThemes}
          onChange={setHeroThemes}
          maxItems={MAX_ITEMS.heroThemes}
          newItem={() =>
            ({
              id: tempId("theme"),
              label: "",
              start_month: 1,
              start_day: 1,
              end_month: 1,
              end_day: 1,
              scale: 1,
              image_offset_y: 0,
              background_image: null,
              background_wash: "",
              character_image: "",
              character_alt: "",
              blob_gradient: "",
              greeting: "",
              is_default: false,
            }) as AdminHeroTheme
          }
          addLabel="Add hero theme"
          renderItem={(item, update) => (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <IdField
                  value={item.id}
                  onChange={(id) => update({ ...item, id })}
                />
                <div>
                  <label className="mb-1 block text-[10.5px] text-ink-2">
                    Label
                  </label>
                  <LimitedInput
                    maxLength={FIELD_LIMITS.themeLabel}
                    value={item.label}
                    onChange={(e) => update({ ...item, label: e.target.value })}
                    placeholder="Tahun Baru Imlek"
                    className="bg-panel"
                  />
                </div>
              </div>

              <label className="flex items-center gap-2 rounded-lg border border-(--panel-border) bg-panel px-3 py-2 text-[12.5px] text-ink-1">
                <input
                  type="checkbox"
                  checked={!!item.is_default}
                  onChange={(e) =>
                    setHeroThemeDefault(item.id, e.target.checked)
                  }
                />
                Set as regular / default hero (always shown outside any seasonal
                date range)
              </label>

              {!item.is_default && (
                <DateRangeFields
                  startMonth={item.start_month}
                  startDay={item.start_day}
                  endMonth={item.end_month}
                  endDay={item.end_day}
                  onChange={(range) => update({ ...item, ...range })}
                />
              )}

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="mb-1 block text-[10.5px] text-ink-2">
                    Scale
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={item.scale}
                    onChange={(e) =>
                      update({ ...item, scale: Number(e.target.value) })
                    }
                    className={fieldClass("bg-panel")}
                  />
                </div>
                <div>
                  <label className="mb-1 block text-[10.5px] text-ink-2">
                    Image Offset Y
                  </label>
                  <input
                    type="number"
                    value={item.image_offset_y}
                    onChange={(e) =>
                      update({
                        ...item,
                        image_offset_y: Number(e.target.value),
                      })
                    }
                    className={fieldClass("bg-panel")}
                  />
                </div>
              </div>

              <ImageField
                label="Character Image"
                value={item.character_image}
                onChange={(v) => update({ ...item, character_image: v })}
                folder="hero-themes"
              />
              <ImageField
                label="Background Image (optional)"
                value={item.background_image ?? ""}
                onChange={(v) =>
                  update({ ...item, background_image: v || null })
                }
                folder="hero-themes"
              />

              <div>
                <label className="mb-1 block text-[10.5px] text-ink-2">
                  Character Alt Text
                </label>
                <LimitedInput
                  maxLength={FIELD_LIMITS.characterAlt}
                  value={item.character_alt}
                  onChange={(e) =>
                    update({ ...item, character_alt: e.target.value })
                  }
                  className="bg-panel"
                />
              </div>
              <div>
                <label className="mb-1 block text-[10.5px] text-ink-2">
                  Blob Gradient (CSS, e.g. radial-gradient(...))
                </label>
                <LimitedInput
                  maxLength={FIELD_LIMITS.cssGradient}
                  value={item.blob_gradient}
                  onChange={(e) =>
                    update({ ...item, blob_gradient: e.target.value })
                  }
                  className="bg-panel font-mono text-[12px]"
                />
              </div>
              <div>
                <label className="mb-1 block text-[10.5px] text-ink-2">
                  Background Wash (CSS gradient)
                </label>
                <LimitedInput
                  maxLength={FIELD_LIMITS.cssGradient}
                  value={item.background_wash}
                  onChange={(e) =>
                    update({ ...item, background_wash: e.target.value })
                  }
                  className="bg-panel font-mono text-[12px]"
                />
              </div>
              <div>
                <label className="mb-1 block text-[10.5px] text-ink-2">
                  Greeting
                </label>
                <LimitedInput
                  maxLength={FIELD_LIMITS.greeting}
                  value={item.greeting}
                  onChange={(e) =>
                    update({ ...item, greeting: e.target.value })
                  }
                  placeholder="Gong Xi Fa Cai"
                  className="bg-panel"
                />
              </div>
            </div>
          )}
        />
      </SectionCard>

      {/* SEASONAL ENVELOPE THEMES */}
      <SectionCard
        title="Seasonal Envelope"
        desc="Ikon amplop mengambang & dekorasi nav (lampion/lampu ramadan/salju)."
      >
        <ListFieldEditor
          items={seasonalThemes}
          onChange={setSeasonalThemes}
          maxItems={MAX_ITEMS.seasonalThemes}
          newItem={() =>
            ({
              id: tempId("season"),
              label: "",
              start_month: 1,
              start_day: 1,
              end_month: 1,
              end_day: 1,
              decoration: "lampion",
              envelope_icon: "cny",
              accent: "#dc2626",
              envelope_title: "",
              envelope_message: "",
              is_default: false,
            }) as AdminSeasonalTheme
          }
          addLabel="Add seasonal theme"
          renderItem={(item, update) => (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <IdField
                  value={item.id}
                  onChange={(id) => update({ ...item, id })}
                />
                <div>
                  <label className="mb-1 block text-[10.5px] text-ink-2">
                    Label
                  </label>
                  <LimitedInput
                    maxLength={FIELD_LIMITS.themeLabel}
                    value={item.label}
                    onChange={(e) => update({ ...item, label: e.target.value })}
                    className="bg-panel"
                  />
                </div>
              </div>

              <label className="flex items-center gap-2 rounded-lg border border-(--panel-border) bg-panel px-3 py-2 text-[12.5px] text-ink-1">
                <input
                  type="checkbox"
                  checked={!!item.is_default}
                  onChange={(e) =>
                    setSeasonalThemeDefault(item.id, e.target.checked)
                  }
                />
                Set as regular / default envelope &amp; nav decoration
              </label>

              {!item.is_default && (
                <DateRangeFields
                  startMonth={item.start_month}
                  startDay={item.start_day}
                  endMonth={item.end_month}
                  endDay={item.end_day}
                  onChange={(range) => update({ ...item, ...range })}
                />
              )}

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="mb-1 block text-[10.5px] text-ink-2">
                    Decoration
                  </label>
                  <select
                    value={item.decoration}
                    onChange={(e) =>
                      update({
                        ...item,
                        decoration: e.target
                          .value as AdminSeasonalTheme["decoration"],
                      })
                    }
                    className={fieldClass("bg-panel")}
                  >
                    <option value="lampion">lampion</option>
                    <option value="ramadan">ramadan</option>
                    <option value="snow">snow</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-[10.5px] text-ink-2">
                    Envelope Icon
                  </label>
                  <select
                    value={item.envelope_icon}
                    onChange={(e) =>
                      update({
                        ...item,
                        envelope_icon: e.target
                          .value as AdminSeasonalTheme["envelope_icon"],
                      })
                    }
                    className={fieldClass("bg-panel")}
                  >
                    <option value="cny">cny</option>
                    <option value="ramadan">ramadan</option>
                    <option value="christmas">christmas</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-[10.5px] text-ink-2">
                    Accent
                  </label>
                  <div className="flex items-center gap-1.5">
                    <input
                      type="color"
                      value={item.accent}
                      onChange={(e) =>
                        update({ ...item, accent: e.target.value })
                      }
                      className="h-9 w-10 shrink-0 rounded-lg border border-(--panel-border) bg-panel"
                    />
                    <input
                      value={item.accent}
                      onChange={(e) =>
                        update({ ...item, accent: e.target.value })
                      }
                      className={fieldClass("bg-panel")}
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="mb-1 block text-[10.5px] text-ink-2">
                  Envelope Title
                </label>
                <LimitedInput
                  maxLength={FIELD_LIMITS.envelopeTitle}
                  value={item.envelope_title}
                  onChange={(e) =>
                    update({ ...item, envelope_title: e.target.value })
                  }
                  className="bg-panel"
                />
              </div>
              <div>
                <label className="mb-1 block text-[10.5px] text-ink-2">
                  Envelope Message
                </label>
                <LimitedTextArea
                  maxLength={FIELD_LIMITS.envelopeMessage}
                  value={item.envelope_message}
                  onChange={(e) =>
                    update({ ...item, envelope_message: e.target.value })
                  }
                  rows={3}
                  className="bg-panel"
                />
              </div>
            </div>
          )}
        />
      </SectionCard>

      {/* TESTIMONIALS */}
      <SectionCard
        title="Testimonials"
        desc="Carousel testimoni klien (video YouTube)."
      >
        <ListFieldEditor
          items={testimonials}
          onChange={setTestimonials}
          maxItems={MAX_ITEMS.testimonials}
          newItem={() =>
            ({
              id: tempId("t"),
              category: "",
              quote: "",
              name: "",
              role: "",
              company: "",
              initials: "",
              video_id: "",
            }) as AdminTestimonial
          }
          addLabel="Add testimonial"
          renderItem={(item, update) => (
            <div className="space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <IdField
                  value={item.id}
                  onChange={(id) => update({ ...item, id })}
                />
                <div>
                  <label className="mb-1 block text-[10.5px] text-ink-2">
                    Category
                  </label>
                  <LimitedInput
                    maxLength={FIELD_LIMITS.testimonialCategory}
                    value={item.category}
                    onChange={(e) =>
                      update({ ...item, category: e.target.value })
                    }
                    placeholder="Multifinance"
                    className="bg-panel"
                  />
                </div>
              </div>
              <LimitedTextArea
                maxLength={FIELD_LIMITS.testimonialQuote}
                value={item.quote}
                onChange={(e) => update({ ...item, quote: e.target.value })}
                rows={3}
                placeholder="Quote"
                className="bg-panel"
              />
              <div className="grid grid-cols-2 gap-2">
                <LimitedInput
                  maxLength={FIELD_LIMITS.testimonialName}
                  value={item.name}
                  onChange={(e) => update({ ...item, name: e.target.value })}
                  placeholder="Name"
                  className="bg-panel font-medium"
                />
                <LimitedInput
                  maxLength={FIELD_LIMITS.testimonialInitials}
                  value={item.initials}
                  onChange={(e) =>
                    update({ ...item, initials: e.target.value })
                  }
                  placeholder="Initials (e.g. B)"
                  className="bg-panel"
                />
                <LimitedInput
                  maxLength={FIELD_LIMITS.testimonialRole}
                  value={item.role}
                  onChange={(e) => update({ ...item, role: e.target.value })}
                  placeholder="Role"
                  className="bg-panel"
                />
                <LimitedInput
                  maxLength={FIELD_LIMITS.testimonialCompany}
                  value={item.company}
                  onChange={(e) => update({ ...item, company: e.target.value })}
                  placeholder="Company"
                  className="bg-panel"
                />
              </div>
              <div>
                <label className="mb-1 block text-[10.5px] text-ink-2">
                  YouTube Video ID (e.g. j0VmrBxTSAA)
                </label>
                <LimitedInput
                  maxLength={FIELD_LIMITS.testimonialVideoId}
                  value={item.video_id}
                  onChange={(e) =>
                    update({ ...item, video_id: e.target.value })
                  }
                  className="bg-panel font-mono text-[12px]"
                />
              </div>
            </div>
          )}
        />
      </SectionCard>

      {/* CLIENT LOGOS */}
      <SectionCard
        title="Trusted By — Client Logos"
        desc="Marquee logo klien di bawah nav."
      >
        <ListFieldEditor
          items={clientLogos}
          onChange={setClientLogos}
          maxItems={MAX_ITEMS.clientLogos}
          newItem={() => ({ name: "", logo: "" }) as AdminClientLogo}
          addLabel="Add logo"
          renderItem={(item, update) => (
            <div className="space-y-2">
              <LimitedInput
                maxLength={FIELD_LIMITS.clientLogoName}
                value={item.name}
                onChange={(e) => update({ ...item, name: e.target.value })}
                placeholder="Client name"
                className="bg-panel font-medium"
              />
              <ImageField
                label="Logo"
                value={item.logo}
                onChange={(v) => update({ ...item, logo: v })}
                folder="client-logos"
              />
            </div>
          )}
        />
      </SectionCard>

      {/* FAQS */}
      <SectionCard title="FAQ" desc="Accordion FAQ di homepage.">
        <ListFieldEditor
          items={faqs}
          onChange={setFaqs}
          maxItems={MAX_ITEMS.faqs}
          newItem={() => ({ question: "", answer: "" }) as AdminFaq}
          addLabel="Add FAQ"
          renderItem={(item, update) => (
            <div className="space-y-2">
              <LimitedInput
                maxLength={FIELD_LIMITS.faqQuestion}
                value={item.question}
                onChange={(e) => update({ ...item, question: e.target.value })}
                placeholder="Question"
                className="bg-panel font-medium"
              />
              <LimitedTextArea
                maxLength={FIELD_LIMITS.faqAnswer}
                value={item.answer}
                onChange={(e) => update({ ...item, answer: e.target.value })}
                rows={3}
                placeholder="Answer"
                className="bg-panel"
              />
            </div>
          )}
        />
      </SectionCard>

      {/* SITE CONTACT */}
      <SectionCard
        title="Site Contact"
        desc="Digunakan di section Contact, Footer, dan floating WhatsApp."
      >
        <LimitedTextArea
          label="Address"
          maxLength={FIELD_LIMITS.address}
          value={siteContact.address}
          onChange={(e) => setContact("address", e.target.value)}
          rows={2}
        />
        <LimitedInput
          label="Email"
          type="email"
          maxLength={FIELD_LIMITS.email}
          value={siteContact.email}
          onChange={(e) => setContact("email", e.target.value)}
        />
        <div>
          <div className="mb-2 text-[12px] font-medium text-ink-2">
            Phone Numbers
          </div>
          <ListFieldEditor
            items={siteContact.phones}
            onChange={(phones) => setContact("phones", phones)}
            maxItems={MAX_ITEMS.phones}
            newItem={() => ""}
            addLabel="Add phone"
            renderItem={(item, update) => (
              <LimitedInput
                maxLength={FIELD_LIMITS.phone}
                value={item}
                onChange={(e) => update(e.target.value)}
                placeholder="+62 (21) 5595-2979"
                className="bg-panel"
              />
            )}
          />
        </div>
        <LimitedInput
          label="WhatsApp Link (e.g. https://wa.me/+6282211581769)"
          maxLength={FIELD_LIMITS.whatsappLink}
          value={siteContact.whatsapp}
          onChange={(e) => setContact("whatsapp", e.target.value)}
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

      <SuccessToast
        message={toastMsg ?? ""}
        show={toastMsg !== null}
        onClose={() => setToastMsg(null)}
      />
    </div>
  );
}
