"use client";

import { useState, useTransition, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  ChevronDown,
  Code2,
  Globe,
  Layers,
  Smartphone,
  Wrench,
  Palette,
  Rocket,
  Settings2,
  ShieldCheck,
  Building2,
  Workflow,
  BarChart3,
  LayoutDashboard,
  Link2,
  RefreshCw,
  Search,
  PenTool,
  CheckCircle2,
  Zap,
  Users2,
  Cloud,
  Monitor,
  Tablet,
  Gauge,
  Lock,
  Bug,
  Headset,
  Clock,
  ActivitySquare,
  ClipboardList,
  Eye,
  Wallet,
  TrendingUp,
  Map as MapIcon,
  Lightbulb,
  type LucideIcon,
} from "lucide-react";
import { ListFieldEditor } from "@/components/admin/ui/list-field-editor";
import { ConfirmButton } from "@/components/admin/ui/confirm-dialog";
import { LimitedInput } from "@/components/admin/ui/limited-input";
import { LimitedTextArea } from "@/components/admin/ui/limited-textarea";
import { useToastStack, ToastStack } from "../ui/toast-stack";
import { FIELD_LIMITS, MAX_ITEMS } from "@/lib/admin/field-limits";
import { slugify } from "@/lib/admin/slugify";
import {
  createService,
  updateService,
  deleteService,
} from "@/app/admin/(protected)/services/actions";
import type { AdminServiceRow } from "@/lib/admin/services";
import type {
  ServiceIconName,
  ServiceItem,
  ServiceProcessStep,
  ServiceTechGroup,
} from "@/lib/service-details";

const iconOptions: { value: ServiceIconName; Icon: LucideIcon }[] = [
  { value: "Code2", Icon: Code2 },
  { value: "Globe", Icon: Globe },
  { value: "Layers", Icon: Layers },
  { value: "Smartphone", Icon: Smartphone },
  { value: "Wrench", Icon: Wrench },
  { value: "Palette", Icon: Palette },
  { value: "Rocket", Icon: Rocket },
  { value: "Settings2", Icon: Settings2 },
  { value: "ShieldCheck", Icon: ShieldCheck },
  { value: "Building2", Icon: Building2 },
  { value: "Workflow", Icon: Workflow },
  { value: "BarChart3", Icon: BarChart3 },
  { value: "LayoutDashboard", Icon: LayoutDashboard },
  { value: "Link2", Icon: Link2 },
  { value: "RefreshCw", Icon: RefreshCw },
  { value: "Search", Icon: Search },
  { value: "PenTool", Icon: PenTool },
  { value: "CheckCircle2", Icon: CheckCircle2 },
  { value: "Zap", Icon: Zap },
  { value: "Users2", Icon: Users2 },
  { value: "Cloud", Icon: Cloud },
  { value: "Monitor", Icon: Monitor },
  { value: "Tablet", Icon: Tablet },
  { value: "Gauge", Icon: Gauge },
  { value: "Lock", Icon: Lock },
  { value: "Bug", Icon: Bug },
  { value: "Headset", Icon: Headset },
  { value: "Clock", Icon: Clock },
  { value: "ActivitySquare", Icon: ActivitySquare },
  { value: "ClipboardList", Icon: ClipboardList },
  { value: "Eye", Icon: Eye },
  { value: "Wallet", Icon: Wallet },
  { value: "TrendingUp", Icon: TrendingUp },
  { value: "Map", Icon: MapIcon },
  { value: "Lightbulb", Icon: Lightbulb },
];

const iconMap = Object.fromEntries(
  iconOptions.map((o) => [o.value, o.Icon]),
) as Record<ServiceIconName, LucideIcon>;

function IconPicker({
  value,
  onChange,
}: {
  value: ServiceIconName;
  onChange: (v: ServiceIconName) => void;
}) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const SelectedIcon = iconMap[value];

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center gap-2.5 rounded-lg border border-(--panel-border) bg-panel-2 px-3 py-2 text-left text-[13.5px] text-ink-0 outline-none focus:border-signal-teal"
      >
        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-(--panel-border) bg-panel text-signal-teal">
          <SelectedIcon size={13} />
        </span>
        <span className="flex-1 truncate">{value}</span>
        <ChevronDown
          size={14}
          className={`shrink-0 text-ink-2 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute left-0 right-0 top-full z-20 mt-1.5 max-h-64 overflow-y-auto rounded-lg border border-(--panel-border) bg-panel p-1.5 shadow-lg">
          {iconOptions.map(({ value: v, Icon }) => (
            <button
              key={v}
              type="button"
              onClick={() => {
                onChange(v);
                setOpen(false);
              }}
              className={`flex w-full items-center gap-2.5 rounded-md px-2.5 py-2 text-left text-[13px] transition-colors ${
                value === v
                  ? "bg-signal-blue-dim text-signal-teal"
                  : "text-ink-1 hover:bg-panel-2 hover:text-ink-0"
              }`}
            >
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-(--panel-border) bg-panel-2 text-current">
                <Icon size={13} />
              </span>
              {v}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

const emptyService: AdminServiceRow = {
  slug: "",
  code: "",
  name: "",
  icon: "Code2",
  accent: "#2f4bd0",
  nav_desc: "",
  hero_title: "",
  hero_desc: "",
  hero_float_icons: [],
  highlights: [],
  grid_section: null,
  tech_stack: null,
  process: [],
  closing_cta_title: null,
  sort_order: 0,
};

function fieldClass(extra = "") {
  return `w-full rounded-lg border border-(--panel-border) bg-panel-2 px-3 py-2 text-[13.5px] text-ink-0 outline-none focus:border-signal-teal ${extra}`;
}

// Mirrors article-editor.tsx / product-editor.tsx: every text field with a
// matching Postgres truncation trigger (or a sane practical limit) is
// checked here. Any single field or list item over its limit blocks Save.
function computeOverLimit(form: AdminServiceRow): boolean {
  const highlightsOver = (form.highlights ?? []).some(
    (h) =>
      h.title.length > FIELD_LIMITS.featureTitle ||
      h.desc.length > FIELD_LIMITS.featureBody,
  );

  const gridItemsOver = (form.grid_section?.items ?? []).some(
    (i) =>
      i.title.length > FIELD_LIMITS.featureTitle ||
      i.desc.length > FIELD_LIMITS.featureBody,
  );
  const gridSectionOver =
    !!form.grid_section &&
    ((form.grid_section.label?.length ?? 0) > FIELD_LIMITS.shortLabel ||
      (form.grid_section.title?.length ?? 0) > FIELD_LIMITS.name ||
      (form.grid_section.desc?.length ?? 0) > FIELD_LIMITS.longText ||
      gridItemsOver);

  const techGroupsOver = (form.tech_stack?.groups ?? []).some(
    (g) => g.label.length > FIELD_LIMITS.techGroupLabel,
  );
  const techStackOver =
    !!form.tech_stack &&
    ((form.tech_stack.label?.length ?? 0) > FIELD_LIMITS.shortLabel ||
      (form.tech_stack.title?.length ?? 0) > FIELD_LIMITS.name ||
      (form.tech_stack.desc?.length ?? 0) > FIELD_LIMITS.longText ||
      techGroupsOver);

  const processOver = (form.process ?? []).some(
    (p) =>
      p.title.length > FIELD_LIMITS.processStepTitle ||
      p.desc.length > FIELD_LIMITS.processStepBody,
  );

  return (
    form.name.length > FIELD_LIMITS.name ||
    form.slug.length > FIELD_LIMITS.slug ||
    form.code.length > FIELD_LIMITS.code ||
    form.nav_desc.length > FIELD_LIMITS.navDesc ||
    form.hero_title.length > FIELD_LIMITS.heroTitle ||
    form.hero_desc.length > FIELD_LIMITS.heroDesc ||
    (form.hero_float_icons ?? []).some(
      (i) => i.length > FIELD_LIMITS.shortLabel,
    ) ||
    highlightsOver ||
    gridSectionOver ||
    techStackOver ||
    processOver ||
    (form.closing_cta_title?.length ?? 0) > FIELD_LIMITS.heroTitle
  );
}

export function ServiceEditor({
  service,
}: {
  service: AdminServiceRow | null;
}) {
  const isNew = service === null;
  const [form, setForm] = useState<AdminServiceRow>(service ?? emptyService);
  const [slugTouched, setSlugTouched] = useState(!isNew);
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [savedAt, setSavedAt] = useState<Date | null>(null);
  const router = useRouter();
  const { toasts, push, dismiss, dismissAll } = useToastStack();

  // Snapshot of the last-saved (or initially-loaded) form, used to detect
  // unsaved changes — the Save button stays disabled until it diverges.
  const baselineRef = useRef(JSON.stringify(service ?? emptyService));
  const isDirty = JSON.stringify(form) !== baselineRef.current;

  useEffect(() => {
    if (isDirty) dismissAll();
  }, [isDirty, dismissAll]);
  const overLimit = computeOverLimit(form);

  function set<K extends keyof AdminServiceRow>(
    key: K,
    value: AdminServiceRow[K],
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleNameChange(name: string) {
    set("name", name);
    if (!slugTouched) set("slug", slugify(name));
  }

  function handleSave() {
    if (overLimit || !isDirty) return;
    setError(null);
    startTransition(async () => {
      try {
        if (isNew) {
          if (!form.slug) throw new Error("Slug wajib diisi.");
          const { slug } = await createService(form);
          push("Service created successfully.");
          baselineRef.current = JSON.stringify(form);
          router.push(`/admin/services/${slug}`);
        } else {
          await updateService(form.slug, form);
          push("Service saved successfully.");
          baselineRef.current = JSON.stringify(form);
          setSavedAt(new Date());
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Gagal menyimpan.");
      }
    });
  }

  function handleDelete() {
    startTransition(async () => {
      await deleteService(form.slug);
      router.push("/admin/services");
    });
  }

  const IconPreview = iconMap[form.icon];

  return (
    <div className="max-w-4xl space-y-8 pb-16">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-[22px] font-semibold text-ink-0">
            {isNew ? "New Service" : form.name || form.slug}
          </h1>
          {!isNew && (
            <p className="mt-1 text-[12.5px] text-ink-2">/{form.slug}</p>
          )}
        </div>
        <div className="flex items-center gap-3">
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
          {!isNew && (
            <ConfirmButton
              label="Delete"
              confirmLabel="Delete this service?"
              onConfirm={handleDelete}
              className="text-[13px] font-medium text-red-500 hover:underline"
            />
          )}
          <button
            onClick={handleSave}
            disabled={pending || overLimit || !isDirty}
            className="rounded-full bg-signal-blue px-5 py-2.5 text-[13px] font-medium text-white disabled:opacity-60"
          >
            {pending ? "Saving..." : isNew ? "Create Service" : "Save"}
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
          <LimitedInput
            label="Code"
            maxLength={FIELD_LIMITS.code}
            value={form.code}
            onChange={(e) => set("code", e.target.value)}
            placeholder="WEB"
          />
          <div>
            <label className="mb-1.5 block text-[12px] font-medium text-ink-2">
              Sort Order
            </label>
            <input
              type="number"
              value={form.sort_order}
              onChange={(e) => set("sort_order", Number(e.target.value))}
              className={fieldClass()}
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
          <div className="sm:col-span-2">
            <LimitedInput
              label="Nav Description (dipakai di mega menu Services)"
              maxLength={FIELD_LIMITS.navDesc}
              value={form.nav_desc}
              onChange={(e) => set("nav_desc", e.target.value)}
            />
          </div>
        </div>

        <div>
          <label className="mb-1.5 flex items-center gap-2 text-[12px] font-medium text-ink-2">
            Icon <IconPreview size={14} style={{ color: form.accent }} />
          </label>
          <IconPicker value={form.icon} onChange={(v) => set("icon", v)} />
        </div>
      </section>

      {/* Hero Copy */}
      <section className="space-y-4 rounded-xl border border-(--panel-border) bg-panel p-6">
        <div className="mono-label">Hero Copy</div>
        <LimitedInput
          label="Hero Title"
          maxLength={FIELD_LIMITS.heroTitle}
          value={form.hero_title}
          onChange={(e) => set("hero_title", e.target.value)}
        />
        <LimitedTextArea
          label="Hero Description"
          maxLength={FIELD_LIMITS.heroDesc}
          value={form.hero_desc}
          onChange={(e) => set("hero_desc", e.target.value)}
          rows={3}
        />
      </section>

      {/* Hero Float Icons */}
      <section className="rounded-xl border border-(--panel-border) bg-panel p-6">
        <div className="mono-label mb-1">Hero Float Icons</div>
        <p className="mb-3 text-[12px] text-ink-2">
          Iconify id (e.g. <code>logos:react</code>) atau Lucide dengan prefix{" "}
          <code>lucide:</code> (e.g. <code>lucide:Zap</code>).
        </p>
        <ListFieldEditor
          items={form.hero_float_icons ?? []}
          onChange={(v) => set("hero_float_icons", v)}
          newItem={() => ""}
          addLabel="Add icon"
          maxItems={MAX_ITEMS.heroFloatIcons}
          renderItem={(item, update) => (
            <LimitedInput
              maxLength={FIELD_LIMITS.shortLabel}
              value={item}
              onChange={(e) => update(e.target.value)}
              placeholder="logos:react"
              className="bg-panel"
            />
          )}
        />
      </section>

      {/* Highlights */}
      <section className="rounded-xl border border-(--panel-border) bg-panel p-6">
        <div className="mono-label mb-3">Highlights (Why Intidata cards)</div>
        <ListFieldEditor
          items={form.highlights ?? []}
          onChange={(v) => set("highlights", v)}
          newItem={() => ({ icon: "Zap", title: "", desc: "" }) as ServiceItem}
          addLabel="Add highlight"
          maxItems={MAX_ITEMS.highlights}
          renderItem={(item, update) => (
            <div className="space-y-2">
              <IconPicker
                value={item.icon}
                onChange={(icon) => update({ ...item, icon })}
              />
              <LimitedInput
                maxLength={FIELD_LIMITS.featureTitle}
                value={item.title}
                onChange={(e) => update({ ...item, title: e.target.value })}
                placeholder="Title"
                className="bg-panel font-medium"
              />
              <LimitedTextArea
                maxLength={FIELD_LIMITS.featureBody}
                value={item.desc}
                onChange={(e) => update({ ...item, desc: e.target.value })}
                rows={2}
                placeholder="Description"
                className="bg-panel text-[12.5px] text-ink-1"
              />
            </div>
          )}
        />
      </section>

      {/* Grid Section */}
      <section className="space-y-4 rounded-xl border border-(--panel-border) bg-panel p-6">
        <div className="flex items-center justify-between">
          <div className="mono-label">Grid Section (opsional)</div>
          <label className="flex items-center gap-2 text-[12px] text-ink-2">
            <input
              type="checkbox"
              checked={form.grid_section !== null}
              onChange={(e) =>
                set(
                  "grid_section",
                  e.target.checked
                    ? { label: "", title: "", desc: "", items: [] }
                    : null,
                )
              }
            />
            Tampilkan section
          </label>
        </div>
        {form.grid_section && (
          <div className="space-y-3">
            <LimitedInput
              maxLength={FIELD_LIMITS.shortLabel}
              value={form.grid_section.label}
              onChange={(e) =>
                set("grid_section", {
                  ...form.grid_section!,
                  label: e.target.value,
                })
              }
              placeholder="Label (e.g. Service Scope)"
            />
            <LimitedInput
              maxLength={FIELD_LIMITS.name}
              value={form.grid_section.title}
              onChange={(e) =>
                set("grid_section", {
                  ...form.grid_section!,
                  title: e.target.value,
                })
              }
              placeholder="Title"
            />
            <LimitedTextArea
              maxLength={FIELD_LIMITS.longText}
              value={form.grid_section.desc ?? ""}
              onChange={(e) =>
                set("grid_section", {
                  ...form.grid_section!,
                  desc: e.target.value,
                })
              }
              rows={2}
              placeholder="Description (optional)"
            />
            <ListFieldEditor
              items={form.grid_section.items}
              onChange={(items) =>
                set("grid_section", { ...form.grid_section!, items })
              }
              newItem={() =>
                ({ icon: "Building2", title: "", desc: "" }) as ServiceItem
              }
              addLabel="Add item"
              maxItems={MAX_ITEMS.gridItems}
              renderItem={(item, update) => (
                <div className="space-y-2">
                  <IconPicker
                    value={item.icon}
                    onChange={(icon) => update({ ...item, icon })}
                  />
                  <LimitedInput
                    maxLength={FIELD_LIMITS.featureTitle}
                    value={item.title}
                    onChange={(e) => update({ ...item, title: e.target.value })}
                    placeholder="Title"
                    className="bg-panel font-medium"
                  />
                  <LimitedTextArea
                    maxLength={FIELD_LIMITS.featureBody}
                    value={item.desc}
                    onChange={(e) => update({ ...item, desc: e.target.value })}
                    rows={2}
                    placeholder="Description"
                    className="bg-panel text-[12.5px] text-ink-1"
                  />
                </div>
              )}
            />
          </div>
        )}
      </section>

      {/* Tech Stack */}
      <section className="space-y-4 rounded-xl border border-(--panel-border) bg-panel p-6">
        <div className="flex items-center justify-between">
          <div className="mono-label">Technology Stack (opsional)</div>
          <label className="flex items-center gap-2 text-[12px] text-ink-2">
            <input
              type="checkbox"
              checked={form.tech_stack !== null}
              onChange={(e) =>
                set(
                  "tech_stack",
                  e.target.checked
                    ? { label: "", title: "", desc: "", groups: [] }
                    : null,
                )
              }
            />
            Tampilkan section
          </label>
        </div>
        {form.tech_stack && (
          <div className="space-y-3">
            <LimitedInput
              maxLength={FIELD_LIMITS.shortLabel}
              value={form.tech_stack.label}
              onChange={(e) =>
                set("tech_stack", {
                  ...form.tech_stack!,
                  label: e.target.value,
                })
              }
              placeholder="Label (e.g. Technology Stack)"
            />
            <LimitedInput
              maxLength={FIELD_LIMITS.name}
              value={form.tech_stack.title}
              onChange={(e) =>
                set("tech_stack", {
                  ...form.tech_stack!,
                  title: e.target.value,
                })
              }
              placeholder="Title"
            />
            <LimitedTextArea
              maxLength={FIELD_LIMITS.longText}
              value={form.tech_stack.desc ?? ""}
              onChange={(e) =>
                set("tech_stack", { ...form.tech_stack!, desc: e.target.value })
              }
              rows={2}
              placeholder="Description (optional)"
            />
            <div>
              <div className="mb-2 text-[12px] font-medium text-ink-2">
                Groups
              </div>
              <ListFieldEditor
                items={form.tech_stack.groups}
                onChange={(groups) =>
                  set("tech_stack", { ...form.tech_stack!, groups })
                }
                newItem={() => ({ label: "", items: [] }) as ServiceTechGroup}
                addLabel="Add group"
                maxItems={MAX_ITEMS.techGroups}
                renderItem={(item, update) => (
                  <div className="space-y-2">
                    <LimitedInput
                      maxLength={FIELD_LIMITS.techGroupLabel}
                      value={item.label}
                      onChange={(e) =>
                        update({ ...item, label: e.target.value })
                      }
                      placeholder="Group label (e.g. Frontend)"
                      className="bg-panel font-medium"
                    />
                    <input
                      defaultValue={item.items.join(", ")}
                      onBlur={(e) =>
                        update({
                          ...item,
                          items: e.target.value
                            .split(",")
                            .map((s) =>
                              s.trim().slice(0, FIELD_LIMITS.techItem),
                            )
                            .filter(Boolean),
                        })
                      }
                      placeholder="React, Next.js, Tailwind (pisahkan koma)"
                      className={fieldClass(
                        "bg-panel text-[12.5px] text-ink-1",
                      )}
                    />
                    <p className="text-[10.5px] text-ink-3">
                      Each item is capped at {FIELD_LIMITS.techItem} characters.
                    </p>
                  </div>
                )}
              />
            </div>
          </div>
        )}
      </section>

      {/* Process */}
      <section className="rounded-xl border border-(--panel-border) bg-panel p-6">
        <div className="mono-label mb-3">Process Steps (opsional)</div>
        <ListFieldEditor
          items={form.process ?? []}
          onChange={(v) => set("process", v)}
          newItem={() =>
            ({
              icon: "Search",
              step: "01",
              title: "",
              desc: "",
            }) as ServiceProcessStep
          }
          addLabel="Add step"
          maxItems={MAX_ITEMS.processSteps}
          renderItem={(item, update) => (
            <div className="space-y-2">
              <div className="grid grid-cols-[64px_1fr] gap-2">
                <input
                  value={item.step}
                  onChange={(e) => update({ ...item, step: e.target.value })}
                  placeholder="01"
                  className={fieldClass("bg-panel text-center font-mono")}
                />
                <IconPicker
                  value={item.icon}
                  onChange={(icon) => update({ ...item, icon })}
                />
              </div>
              <LimitedInput
                maxLength={FIELD_LIMITS.processStepTitle}
                value={item.title}
                onChange={(e) => update({ ...item, title: e.target.value })}
                placeholder="Title"
                className="bg-panel font-medium"
              />
              <LimitedTextArea
                maxLength={FIELD_LIMITS.processStepBody}
                value={item.desc}
                onChange={(e) => update({ ...item, desc: e.target.value })}
                rows={2}
                placeholder="Description"
                className="bg-panel text-[12.5px] text-ink-1"
              />
            </div>
          )}
        />
      </section>

      {/* Closing CTA */}
      <section className="rounded-xl border border-(--panel-border) bg-panel p-6">
        <div className="mono-label mb-3">Closing CTA Title (opsional)</div>
        <LimitedInput
          maxLength={FIELD_LIMITS.heroTitle}
          value={form.closing_cta_title ?? ""}
          onChange={(e) => set("closing_cta_title", e.target.value || null)}
          placeholder="Ready to Build Your System?"
        />
      </section>

      <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={pending || overLimit || !isDirty}
          className="rounded-full bg-signal-blue px-6 py-2.5 text-[13.5px] font-medium text-white disabled:opacity-60"
        >
          {pending ? "Saving..." : isNew ? "Create Service" : "Save Changes"}
        </button>
      </div>

      <ToastStack toasts={toasts} onDismiss={dismiss} />
    </div>
  );
}
