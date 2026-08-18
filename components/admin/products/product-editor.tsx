"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Building2, TrendingUp, Calculator, FileSpreadsheet, Sprout } from "lucide-react";
import { ImageField } from "@/components/admin/ui/image-field";
import { ListFieldEditor } from "@/components/admin/ui/list-field-editor";
import { ConfirmButton } from "@/components/admin/ui/confirm-dialog";
import { LimitedInput } from "@/components/admin/ui/limited-input";
import { LimitedTextArea } from "@/components/admin/ui/limited-textarea";
import { FIELD_LIMITS, MAX_ITEMS } from "@/lib/admin/field-limits";
import { slugify } from "@/lib/admin/slugify";
import {
  createProduct,
  updateProduct,
  deleteProduct,
} from "@/app/admin/(protected)/products/actions";
import type {
  AdminProductRow,
  ProductAdvantage,
  ProductFeature,
  ProductMetric,
} from "@/lib/admin/products";

const iconOptions: { value: AdminProductRow["icon"]; Icon: typeof Building2 }[] = [
  { value: "Building2", Icon: Building2 },
  { value: "TrendingUp", Icon: TrendingUp },
  { value: "Calculator", Icon: Calculator },
  { value: "FileSpreadsheet", Icon: FileSpreadsheet },
  { value: "Sprout", Icon: Sprout },
];

const emptyProduct: AdminProductRow = {
  slug: "",
  code: "",
  name: "",
  tagline: "",
  accent: "#2f4bd0",
  icon: "Building2",
  background_image: "",
  person_image: "",
  person_image_scale: null,
  person_image_offset_x: null,
  person_image_offset_y: null,
  quick_facts: [],
  overview: [],
  advantages: [],
  process_intro: null,
  process_lottie: null,
  features_intro: null,
  features: [],
  sort_order: 0,
  home_summary: null,
  home_description: null,
  home_metrics: [],
  home_modules: [],
};

function fieldClass(extra = "") {
  return `w-full rounded-lg border border-(--panel-border) bg-panel-2 px-3 py-2 text-[13.5px] text-ink-0 outline-none focus:border-signal-teal ${extra}`;
}

// Every text field that has a matching Postgres truncation trigger (or a
// sane practical limit) is checked here — mirrors the pattern used by
// components/admin/article-editor.tsx. Any single field over its limit, or
// any list item over its per-item limit, blocks Save the same way an
// over-limit article field does.
function computeOverLimit(form: AdminProductRow): boolean {
  const over =
    form.name.length > FIELD_LIMITS.name ||
    form.slug.length > FIELD_LIMITS.slug ||
    form.code.length > FIELD_LIMITS.code ||
    form.tagline.length > FIELD_LIMITS.tagline ||
    form.quick_facts.some((f) => f.length > FIELD_LIMITS.quickFact) ||
    form.overview.some((o) => o.length > FIELD_LIMITS.overviewParagraph) ||
    form.advantages.some(
      (a) =>
        a.title.length > FIELD_LIMITS.advantageTitle ||
        (a.subtitle?.length ?? 0) > FIELD_LIMITS.advantageSubtitle
    ) ||
    (form.process_intro?.heading.length ?? 0) > FIELD_LIMITS.processStepTitle ||
    (form.process_intro?.body.length ?? 0) > FIELD_LIMITS.longText ||
    (form.features_intro?.length ?? 0) > FIELD_LIMITS.longText ||
    form.features.some(
      (f) => f.title.length > FIELD_LIMITS.featureTitle || f.body.length > FIELD_LIMITS.featureBody
    ) ||
    (form.home_summary?.length ?? 0) > FIELD_LIMITS.mediumLabel ||
    (form.home_description?.length ?? 0) > FIELD_LIMITS.longText ||
    (form.home_metrics ?? []).some(
      (m) => m.label.length > FIELD_LIMITS.shortLabel || m.value.length > FIELD_LIMITS.shortLabel
    ) ||
    (form.home_modules ?? []).some((m) => m.length > FIELD_LIMITS.shortLabel);

  return over;
}

export function ProductEditor({ product }: { product: AdminProductRow | null }) {
  const isNew = product === null;
  const [form, setForm] = useState<AdminProductRow>(product ?? emptyProduct);
  const [slugTouched, setSlugTouched] = useState(!isNew);
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [savedAt, setSavedAt] = useState<Date | null>(null);
  const router = useRouter();

  const overLimit = computeOverLimit(form);

  function set<K extends keyof AdminProductRow>(key: K, value: AdminProductRow[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleNameChange(name: string) {
    set("name", name);
    if (!slugTouched) set("slug", slugify(name));
  }

  function handleSave() {
    if (overLimit) return;
    setError(null);
    startTransition(async () => {
      try {
        if (isNew) {
          if (!form.slug) throw new Error("Slug wajib diisi.");
          const { slug } = await createProduct(form);
          router.push(`/admin/products/${slug}`);
        } else {
          await updateProduct(form.slug, form);
          setSavedAt(new Date());
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Gagal menyimpan.");
      }
    });
  }

  function handleDelete() {
    startTransition(async () => {
      await deleteProduct(form.slug);
      router.push("/admin/products");
    });
  }

  return (
    <div className="max-w-4xl space-y-8 pb-16">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-[22px] font-semibold text-ink-0">
            {isNew ? "New Product" : form.name || form.slug}
          </h1>
          {!isNew && <p className="mt-1 text-[12.5px] text-ink-2">/{form.slug}</p>}
        </div>
        <div className="flex items-center gap-3">
          {savedAt && (
            <span className="text-[12px] text-ink-2">Saved {savedAt.toLocaleTimeString()}</span>
          )}
          {overLimit && (
            <span className="text-[12px] font-medium text-red-500">
              Fix fields over their character limit before saving.
            </span>
          )}
          {!isNew && (
            <ConfirmButton
              label="Delete"
              confirmLabel="Delete this product?"
              onConfirm={handleDelete}
              className="text-[13px] font-medium text-red-500 hover:underline"
            />
          )}
          <button
            onClick={handleSave}
            disabled={pending || overLimit}
            className="rounded-full bg-signal-blue px-5 py-2.5 text-[13px] font-medium text-white disabled:opacity-60"
          >
            {pending ? "Saving..." : isNew ? "Create Product" : "Save"}
          </button>
        </div>
      </div>

      {error && (
        <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-[13px] text-red-700">
          {error}
        </p>
      )}

      {/* Basic Info */}
      <section className="space-y-4 rounded-xl border border-(--panel-border) bg-panel p-6">
        <div className="mono-label">Basic Info</div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <LimitedInput
            label="Name"
            maxLength={FIELD_LIMITS.name}
            value={form.name}
            onChange={(e) => handleNameChange(e.target.value)}
          />
          <div>
            <LimitedInput
              label={`Slug ${!isNew ? "(locked)" : ""}`}
              maxLength={FIELD_LIMITS.slug}
              value={form.slug}
              disabled={!isNew}
              onChange={(e) => {
                setSlugTouched(true);
                set("slug", slugify(e.target.value));
              }}
              className="disabled:opacity-60"
            />
          </div>
          <LimitedInput
            label="Code"
            maxLength={FIELD_LIMITS.code}
            value={form.code}
            onChange={(e) => set("code", e.target.value)}
            placeholder="FIS-MF"
          />
          <div>
            <label className="mb-1.5 block text-[12px] font-medium text-ink-2">Sort Order</label>
            <input
              type="number"
              value={form.sort_order}
              onChange={(e) => set("sort_order", Number(e.target.value))}
              className={fieldClass()}
            />
          </div>
          <div className="sm:col-span-2">
            <LimitedInput
              label="Tagline"
              maxLength={FIELD_LIMITS.tagline}
              value={form.tagline}
              onChange={(e) => set("tagline", e.target.value)}
            />
          </div>
          <div>
            <label className="mb-1.5 block text-[12px] font-medium text-ink-2">
              Accent Color
            </label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={form.accent}
                onChange={(e) => set("accent", e.target.value)}
                className="h-9 w-12 shrink-0 rounded-lg border border-(--panel-border) bg-panel-2"
              />
              <input
                value={form.accent}
                onChange={(e) => set("accent", e.target.value)}
                className={fieldClass()}
              />
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-[12px] font-medium text-ink-2">Icon</label>
            <select
              value={form.icon}
              onChange={(e) => set("icon", e.target.value as AdminProductRow["icon"])}
              className={fieldClass()}
            >
              {iconOptions.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.value}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Hero Media */}
      <section className="space-y-4 rounded-xl border border-(--panel-border) bg-panel p-6">
        <div className="mono-label">Hero Media</div>
        <ImageField
          label="Background Image"
          value={form.background_image}
          onChange={(v) => set("background_image", v)}
        />
        <ImageField
          label="Person Image"
          value={form.person_image}
          onChange={(v) => set("person_image", v)}
        />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <label className="mb-1.5 block text-[12px] font-medium text-ink-2">
              Person Scale
            </label>
            <input
              type="number"
              step="0.1"
              value={form.person_image_scale ?? ""}
              onChange={(e) =>
                set(
                  "person_image_scale",
                  e.target.value === "" ? null : Number(e.target.value)
                )
              }
              className={fieldClass()}
            />
          </div>
          <div>
            <label className="mb-1.5 block text-[12px] font-medium text-ink-2">
              Offset X (%)
            </label>
            <input
              type="number"
              value={form.person_image_offset_x ?? ""}
              onChange={(e) =>
                set(
                  "person_image_offset_x",
                  e.target.value === "" ? null : Number(e.target.value)
                )
              }
              className={fieldClass()}
            />
          </div>
          <div>
            <label className="mb-1.5 block text-[12px] font-medium text-ink-2">
              Offset Y (px)
            </label>
            <input
              type="number"
              value={form.person_image_offset_y ?? ""}
              onChange={(e) =>
                set(
                  "person_image_offset_y",
                  e.target.value === "" ? null : Number(e.target.value)
                )
              }
              className={fieldClass()}
            />
          </div>
        </div>
      </section>

      {/* Quick Facts */}
      <section className="rounded-xl border border-(--panel-border) bg-panel p-6">
        <div className="mono-label mb-3">Quick Facts (badge di hero)</div>
        <ListFieldEditor
          items={form.quick_facts}
          onChange={(v) => set("quick_facts", v)}
          newItem={() => ""}
          addLabel="Add fact"
          maxItems={MAX_ITEMS.quickFacts}
          renderItem={(item, update) => (
            <LimitedInput
              maxLength={FIELD_LIMITS.quickFact}
              value={item}
              onChange={(e) => update(e.target.value)}
              placeholder="Web-Based"
              className="bg-panel"
            />
          )}
        />
      </section>

      {/* Overview */}
      <section className="rounded-xl border border-(--panel-border) bg-panel p-6">
        <div className="mono-label mb-3">Overview Paragraphs</div>
        <ListFieldEditor
          items={form.overview}
          onChange={(v) => set("overview", v)}
          newItem={() => ""}
          addLabel="Add paragraph"
          maxItems={MAX_ITEMS.overviewParagraphs}
          renderItem={(item, update) => (
            <LimitedTextArea
              maxLength={FIELD_LIMITS.overviewParagraph}
              value={item}
              onChange={(e) => update(e.target.value)}
              rows={3}
              className="bg-panel"
            />
          )}
        />
      </section>

      {/* Advantages */}
      <section className="rounded-xl border border-(--panel-border) bg-panel p-6">
        <div className="mono-label mb-3">Advantages</div>
        <ListFieldEditor
          items={form.advantages}
          onChange={(v) => set("advantages", v)}
          newItem={() => ({ title: "", subtitle: "" }) as ProductAdvantage}
          addLabel="Add advantage"
          maxItems={MAX_ITEMS.advantages}
          renderItem={(item, update) => (
            <div className="space-y-2">
              <LimitedInput
                maxLength={FIELD_LIMITS.advantageTitle}
                value={item.title}
                onChange={(e) => update({ ...item, title: e.target.value })}
                placeholder="Title"
                className="bg-panel font-medium"
              />
              <LimitedInput
                maxLength={FIELD_LIMITS.advantageSubtitle}
                value={item.subtitle ?? ""}
                onChange={(e) => update({ ...item, subtitle: e.target.value })}
                placeholder="Subtitle (optional)"
                className="bg-panel text-[12.5px] text-ink-1"
              />
            </div>
          )}
        />
      </section>

      {/* Process */}
      <section className="space-y-4 rounded-xl border border-(--panel-border) bg-panel p-6">
        <div className="flex items-center justify-between">
          <div className="mono-label">Process Intro (opsional)</div>
          <label className="flex items-center gap-2 text-[12px] text-ink-2">
            <input
              type="checkbox"
              checked={form.process_intro !== null}
              onChange={(e) =>
                set("process_intro", e.target.checked ? { heading: "", body: "" } : null)
              }
            />
            Tampilkan section
          </label>
        </div>
        {form.process_intro && (
          <div className="space-y-3">
            <LimitedInput
              maxLength={FIELD_LIMITS.processStepTitle}
              value={form.process_intro.heading}
              onChange={(e) =>
                set("process_intro", { ...form.process_intro!, heading: e.target.value })
              }
              placeholder="Heading"
            />
            <LimitedTextArea
              maxLength={FIELD_LIMITS.longText}
              value={form.process_intro.body}
              onChange={(e) =>
                set("process_intro", { ...form.process_intro!, body: e.target.value })
              }
              rows={3}
              placeholder="Body"
            />
          </div>
        )}
        <div>
          <label className="mb-1.5 block text-[12px] font-medium text-ink-2">
            Process Lottie URL (opsional)
          </label>
          <input
            value={form.process_lottie ?? ""}
            onChange={(e) => set("process_lottie", e.target.value || null)}
            className={fieldClass()}
          />
        </div>
      </section>

      {/* Features */}
      <section className="space-y-4 rounded-xl border border-(--panel-border) bg-panel p-6">
        <div className="mono-label">Core Features</div>
        <div>
          <LimitedTextArea
            label="Features Intro (opsional)"
            maxLength={FIELD_LIMITS.longText}
            value={form.features_intro ?? ""}
            onChange={(e) => set("features_intro", e.target.value || null)}
            rows={2}
          />
        </div>
        <ListFieldEditor
          items={form.features}
          onChange={(v) => set("features", v)}
          newItem={() => ({ title: "", body: "" }) as ProductFeature}
          addLabel="Add feature"
          maxItems={MAX_ITEMS.features}
          renderItem={(item, update) => (
            <div className="space-y-2">
              <LimitedInput
                maxLength={FIELD_LIMITS.featureTitle}
                value={item.title}
                onChange={(e) => update({ ...item, title: e.target.value })}
                placeholder="Title"
                className="bg-panel font-medium"
              />
              <LimitedTextArea
                maxLength={FIELD_LIMITS.featureBody}
                value={item.body}
                onChange={(e) => update({ ...item, body: e.target.value })}
                rows={2}
                placeholder="Body"
                className="bg-panel text-[12.5px] text-ink-1"
              />
            </div>
          )}
        />
      </section>

      {/* Homepage Card */}
      <section className="space-y-4 rounded-xl border border-(--panel-border) bg-panel p-6">
        <div className="mono-label">Homepage Product Card</div>
        <p className="text-[12px] text-ink-2">
          Bagian ini menentukan apakah produk muncul di kartu &quot;Products&quot; di homepage.
          Kosongkan Summary/Description untuk menyembunyikannya dari homepage.
        </p>
        <LimitedInput
          label="Home Summary"
          maxLength={FIELD_LIMITS.mediumLabel}
          value={form.home_summary ?? ""}
          onChange={(e) => set("home_summary", e.target.value || null)}
        />
        <LimitedTextArea
          label="Home Description"
          maxLength={FIELD_LIMITS.longText}
          value={form.home_description ?? ""}
          onChange={(e) => set("home_description", e.target.value || null)}
          rows={3}
        />
        <div>
          <div className="mb-2 text-[12px] font-medium text-ink-2">Home Metrics</div>
          <ListFieldEditor
            items={form.home_metrics ?? []}
            onChange={(v) => set("home_metrics", v)}
            newItem={() => ({ label: "", value: "" }) as ProductMetric}
            addLabel="Add metric"
            maxItems={MAX_ITEMS.homeMetrics}
            renderItem={(item, update) => (
              <div className="grid grid-cols-2 gap-2">
                <LimitedInput
                  maxLength={FIELD_LIMITS.shortLabel}
                  value={item.label}
                  onChange={(e) => update({ ...item, label: e.target.value })}
                  placeholder="Label"
                  className="bg-panel"
                />
                <LimitedInput
                  maxLength={FIELD_LIMITS.shortLabel}
                  value={item.value}
                  onChange={(e) => update({ ...item, value: e.target.value })}
                  placeholder="Value"
                  className="bg-panel"
                />
              </div>
            )}
          />
        </div>
        <div>
          <div className="mb-2 text-[12px] font-medium text-ink-2">Home Modules</div>
          <ListFieldEditor
            items={form.home_modules ?? []}
            onChange={(v) => set("home_modules", v)}
            newItem={() => ""}
            addLabel="Add module"
            maxItems={MAX_ITEMS.homeModules}
            renderItem={(item, update) => (
              <LimitedInput
                maxLength={FIELD_LIMITS.shortLabel}
                value={item}
                onChange={(e) => update(e.target.value)}
                placeholder="Application & Scoring"
                className="bg-panel"
              />
            )}
          />
        </div>
      </section>

      <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={pending || overLimit}
          className="rounded-full bg-signal-blue px-6 py-2.5 text-[13.5px] font-medium text-white disabled:opacity-60"
        >
          {pending ? "Saving..." : isNew ? "Create Product" : "Save Changes"}
        </button>
      </div>
    </div>
  );
}