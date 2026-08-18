"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
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
  iconOptions.map((o) => [o.value, o.Icon])
) as Record<ServiceIconName, LucideIcon>;

function IconPicker({
  value,
  onChange,
}: {
  value: ServiceIconName;
  onChange: (v: ServiceIconName) => void;
}) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {iconOptions.map(({ value: v, Icon }) => (
        <button
          key={v}
          type="button"
          title={v}
          onClick={() => onChange(v)}
          className={`flex h-8 w-8 items-center justify-center rounded-lg border transition-colors ${
            value === v
              ? "border-signal-teal bg-signal-blue-dim text-signal-teal"
              : "border-(--panel-border) text-ink-2 hover:border-ink-1 hover:text-ink-0"
          }`}
        >
          <Icon size={15} />
        </button>
      ))}
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

export function ServiceEditor({ service }: { service: AdminServiceRow | null }) {
  const isNew = service === null;
  const [form, setForm] = useState<AdminServiceRow>(service ?? emptyService);
  const [slugTouched, setSlugTouched] = useState(!isNew);
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [savedAt, setSavedAt] = useState<Date | null>(null);
  const router = useRouter();

  function set<K extends keyof AdminServiceRow>(key: K, value: AdminServiceRow[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleNameChange(name: string) {
    set("name", name);
    if (!slugTouched) set("slug", slugify(name));
  }

  function handleSave() {
    setError(null);
    startTransition(async () => {
      try {
        if (isNew) {
          if (!form.slug) throw new Error("Slug wajib diisi.");
          const { slug } = await createService(form);
          router.push(`/admin/services/${slug}`);
        } else {
          await updateService(form.slug, form);
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
          {!isNew && <p className="mt-1 text-[12.5px] text-ink-2">/{form.slug}</p>}
        </div>
        <div className="flex items-center gap-3">
          {savedAt && (
            <span className="text-[12px] text-ink-2">Saved {savedAt.toLocaleTimeString()}</span>
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
            disabled={pending}
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
          <div>
            <label className="mb-1.5 block text-[12px] font-medium text-ink-2">Name</label>
            <input
              value={form.name}
              onChange={(e) => handleNameChange(e.target.value)}
              className={fieldClass()}
            />
          </div>
          <div>
            <label className="mb-1.5 block text-[12px] font-medium text-ink-2">
              Slug {!isNew && "(locked)"}
            </label>
            <input
              value={form.slug}
              disabled={!isNew}
              onChange={(e) => {
                setSlugTouched(true);
                set("slug", slugify(e.target.value));
              }}
              className={fieldClass("disabled:opacity-60")}
            />
          </div>
          <div>
            <label className="mb-1.5 block text-[12px] font-medium text-ink-2">Code</label>
            <input
              value={form.code}
              onChange={(e) => set("code", e.target.value)}
              placeholder="WEB"
              className={fieldClass()}
            />
          </div>
          <div>
            <label className="mb-1.5 block text-[12px] font-medium text-ink-2">Sort Order</label>
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
            <label className="mb-1.5 block text-[12px] font-medium text-ink-2">
              Nav Description (dipakai di mega menu Services)
            </label>
            <input
              value={form.nav_desc}
              onChange={(e) => set("nav_desc", e.target.value)}
              className={fieldClass()}
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
        <div>
          <label className="mb-1.5 block text-[12px] font-medium text-ink-2">Hero Title</label>
          <input
            value={form.hero_title}
            onChange={(e) => set("hero_title", e.target.value)}
            className={fieldClass()}
          />
        </div>
        <div>
          <label className="mb-1.5 block text-[12px] font-medium text-ink-2">Hero Description</label>
          <textarea
            value={form.hero_desc}
            onChange={(e) => set("hero_desc", e.target.value)}
            rows={3}
            className={fieldClass("resize-none")}
          />
        </div>
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
          renderItem={(item, update) => (
            <input
              value={item}
              onChange={(e) => update(e.target.value)}
              placeholder="logos:react"
              className={fieldClass("bg-panel")}
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
          renderItem={(item, update) => (
            <div className="space-y-2">
              <IconPicker value={item.icon} onChange={(icon) => update({ ...item, icon })} />
              <input
                value={item.title}
                onChange={(e) => update({ ...item, title: e.target.value })}
                placeholder="Title"
                className={fieldClass("bg-panel font-medium")}
              />
              <textarea
                value={item.desc}
                onChange={(e) => update({ ...item, desc: e.target.value })}
                rows={2}
                placeholder="Description"
                className={fieldClass("resize-none bg-panel text-[12.5px] text-ink-1")}
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
                  e.target.checked ? { label: "", title: "", desc: "", items: [] } : null
                )
              }
            />
            Tampilkan section
          </label>
        </div>
        {form.grid_section && (
          <div className="space-y-3">
            <input
              value={form.grid_section.label}
              onChange={(e) => set("grid_section", { ...form.grid_section!, label: e.target.value })}
              placeholder="Label (e.g. Service Scope)"
              className={fieldClass()}
            />
            <input
              value={form.grid_section.title}
              onChange={(e) => set("grid_section", { ...form.grid_section!, title: e.target.value })}
              placeholder="Title"
              className={fieldClass()}
            />
            <textarea
              value={form.grid_section.desc ?? ""}
              onChange={(e) => set("grid_section", { ...form.grid_section!, desc: e.target.value })}
              rows={2}
              placeholder="Description (optional)"
              className={fieldClass("resize-none")}
            />
            <ListFieldEditor
              items={form.grid_section.items}
              onChange={(items) => set("grid_section", { ...form.grid_section!, items })}
              newItem={() => ({ icon: "Building2", title: "", desc: "" }) as ServiceItem}
              addLabel="Add item"
              renderItem={(item, update) => (
                <div className="space-y-2">
                  <IconPicker value={item.icon} onChange={(icon) => update({ ...item, icon })} />
                  <input
                    value={item.title}
                    onChange={(e) => update({ ...item, title: e.target.value })}
                    placeholder="Title"
                    className={fieldClass("bg-panel font-medium")}
                  />
                  <textarea
                    value={item.desc}
                    onChange={(e) => update({ ...item, desc: e.target.value })}
                    rows={2}
                    placeholder="Description"
                    className={fieldClass("resize-none bg-panel text-[12.5px] text-ink-1")}
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
                  e.target.checked ? { label: "", title: "", desc: "", groups: [] } : null
                )
              }
            />
            Tampilkan section
          </label>
        </div>
        {form.tech_stack && (
          <div className="space-y-3">
            <input
              value={form.tech_stack.label}
              onChange={(e) => set("tech_stack", { ...form.tech_stack!, label: e.target.value })}
              placeholder="Label (e.g. Technology Stack)"
              className={fieldClass()}
            />
            <input
              value={form.tech_stack.title}
              onChange={(e) => set("tech_stack", { ...form.tech_stack!, title: e.target.value })}
              placeholder="Title"
              className={fieldClass()}
            />
            <textarea
              value={form.tech_stack.desc ?? ""}
              onChange={(e) => set("tech_stack", { ...form.tech_stack!, desc: e.target.value })}
              rows={2}
              placeholder="Description (optional)"
              className={fieldClass("resize-none")}
            />
            <div>
              <div className="mb-2 text-[12px] font-medium text-ink-2">Groups</div>
              <ListFieldEditor
                items={form.tech_stack.groups}
                onChange={(groups) => set("tech_stack", { ...form.tech_stack!, groups })}
                newItem={() => ({ label: "", items: [] }) as ServiceTechGroup}
                addLabel="Add group"
                renderItem={(item, update) => (
                  <div className="space-y-2">
                    <input
                      value={item.label}
                      onChange={(e) => update({ ...item, label: e.target.value })}
                      placeholder="Group label (e.g. Frontend)"
                      className={fieldClass("bg-panel font-medium")}
                    />
                    <input
                      defaultValue={item.items.join(", ")}
                      onBlur={(e) =>
                        update({
                          ...item,
                          items: e.target.value
                            .split(",")
                            .map((s) => s.trim())
                            .filter(Boolean),
                        })
                      }
                      placeholder="React, Next.js, Tailwind (pisahkan koma)"
                      className={fieldClass("bg-panel text-[12.5px] text-ink-1")}
                    />
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
          newItem={() => ({ icon: "Search", step: "01", title: "", desc: "" }) as ServiceProcessStep}
          addLabel="Add step"
          renderItem={(item, update) => (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <input
                  value={item.step}
                  onChange={(e) => update({ ...item, step: e.target.value })}
                  placeholder="01"
                  className={fieldClass("bg-panel w-16 shrink-0 text-center font-mono")}
                />
                <IconPicker value={item.icon} onChange={(icon) => update({ ...item, icon })} />
              </div>
              <input
                value={item.title}
                onChange={(e) => update({ ...item, title: e.target.value })}
                placeholder="Title"
                className={fieldClass("bg-panel font-medium")}
              />
              <textarea
                value={item.desc}
                onChange={(e) => update({ ...item, desc: e.target.value })}
                rows={2}
                placeholder="Description"
                className={fieldClass("resize-none bg-panel text-[12.5px] text-ink-1")}
              />
            </div>
          )}
        />
      </section>

      {/* Closing CTA */}
      <section className="rounded-xl border border-(--panel-border) bg-panel p-6">
        <div className="mono-label mb-3">Closing CTA Title (opsional)</div>
        <input
          value={form.closing_cta_title ?? ""}
          onChange={(e) => set("closing_cta_title", e.target.value || null)}
          placeholder="Ready to Build Your System?"
          className={fieldClass()}
        />
      </section>

      <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={pending}
          className="rounded-full bg-signal-blue px-6 py-2.5 text-[13.5px] font-medium text-white disabled:opacity-60"
        >
          {pending ? "Saving..." : isNew ? "Create Service" : "Save Changes"}
        </button>
      </div>
    </div>
  );
}