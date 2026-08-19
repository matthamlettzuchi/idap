"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { SuccessToast } from "@/components/admin/ui/success-toast";
import {
  Search,
  PenTool,
  Workflow,
  Rocket,
  Building2,
  TrendingUp,
  Calculator,
  Sprout,
  Landmark,
  ChevronDown,
  type LucideIcon,
} from "lucide-react";
import { ImageField } from "@/components/admin/ui/image-field";
import { ListFieldEditor } from "@/components/admin/ui/list-field-editor";
import { LimitedInput } from "@/components/admin/ui/limited-input";
import { LimitedTextArea } from "@/components/admin/ui/limited-textarea";
import { FIELD_LIMITS, MAX_ITEMS } from "@/lib/admin/field-limits";
import { saveAboutPage } from "@/app/admin/(protected)/about/actions";
import type {
  AdminAboutPage,
  AdminAboutContentRow,
  AboutHeroStat,
  AboutStat,
  AdminAboutCoreValue,
  AdminAboutIndustry,
  AdminAboutJourneyStep,
  AdminAboutPrinciple,
  AdminAboutProcessStep,
} from "@/lib/admin/about";
import type { AboutIconName } from "@/lib/about";

const iconOptions: { value: AboutIconName; Icon: LucideIcon }[] = [
  { value: "Search", Icon: Search },
  { value: "PenTool", Icon: PenTool },
  { value: "Workflow", Icon: Workflow },
  { value: "Rocket", Icon: Rocket },
  { value: "Building2", Icon: Building2 },
  { value: "TrendingUp", Icon: TrendingUp },
  { value: "Calculator", Icon: Calculator },
  { value: "Sprout", Icon: Sprout },
  { value: "Landmark", Icon: Landmark },
];

const iconMap = Object.fromEntries(
  iconOptions.map((o) => [o.value, o.Icon]),
) as Record<AboutIconName, LucideIcon>;

function fieldClass(extra = "") {
  return `w-full rounded-lg border border-(--panel-border) bg-panel-2 px-3 py-2 text-[13.5px] text-ink-0 outline-none focus:border-signal-teal ${extra}`;
}

// Compact inline icon dropdown — shows the selected icon + name in the
// trigger, and icon + name per row in the menu, so nothing floats outside
// the card like a bare <select> would.
function IconPicker({
  value,
  onChange,
}: {
  value: AboutIconName;
  onChange: (v: AboutIconName) => void;
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

// Mirrors product-editor.tsx / service-editor.tsx: every text field with a
// matching Postgres truncation trigger (or a sane practical limit) is
// checked here. Any single field, or any list item, over its limit blocks
// Save the same way an over-limit article field does.
function computeOverLimit(
  content: AdminAboutContentRow,
  coreValues: AdminAboutCoreValue[],
  industries: AdminAboutIndustry[],
  journey: AdminAboutJourneyStep[],
  principles: AdminAboutPrinciple[],
  processSteps: AdminAboutProcessStep[],
): boolean {
  const heroStatsOver = content.hero_stats.some(
    (s) =>
      (s.suffix?.length ?? 0) > FIELD_LIMITS.statSuffix ||
      s.label.length > FIELD_LIMITS.statLabel,
  );
  const visionStatsOver = content.vision_stats.some(
    (s) =>
      (s.suffix?.length ?? 0) > FIELD_LIMITS.statSuffix ||
      s.label.length > FIELD_LIMITS.statLabel,
  );

  return (
    content.hero_heading_line_1.length > FIELD_LIMITS.aboutHeadingLine ||
    content.hero_heading_line_2.length > FIELD_LIMITS.aboutHeadingLine ||
    content.hero_description.length > FIELD_LIMITS.aboutDescription ||
    (content.stats_lottie?.length ?? 0) > FIELD_LIMITS.lottieUrl ||
    content.vision_description.length > FIELD_LIMITS.aboutDescription ||
    content.mission_points.some((m) => m.length > FIELD_LIMITS.missionPoint) ||
    content.solutions.some((s) => s.length > FIELD_LIMITS.solutionItem) ||
    heroStatsOver ||
    visionStatsOver ||
    journey.some(
      (j) =>
        j.era.length > FIELD_LIMITS.journeyEra ||
        j.title.length > FIELD_LIMITS.journeyTitle ||
        j.body.length > FIELD_LIMITS.journeyBody,
    ) ||
    coreValues.some(
      (c) =>
        c.title.length > FIELD_LIMITS.coreValueTitle ||
        c.desc.length > FIELD_LIMITS.coreValueDesc,
    ) ||
    industries.some(
      (i) =>
        i.title.length > FIELD_LIMITS.industryTitle ||
        i.body.length > FIELD_LIMITS.industryBody,
    ) ||
    principles.some(
      (p) =>
        p.label.length > FIELD_LIMITS.principleLabel ||
        p.body.length > FIELD_LIMITS.principleBody,
    ) ||
    processSteps.some(
      (p) =>
        p.label.length > FIELD_LIMITS.processStepTitle ||
        p.body.length > FIELD_LIMITS.processStepBody,
    )
  );
}

// Combines every editable slice of the page into one comparable snapshot,
// so a single JSON.stringify diff against the last-saved snapshot tells us
// whether ANYTHING on the page changed — used to enable/disable Save.
function snapshot(
  content: AdminAboutContentRow,
  coreValues: AdminAboutCoreValue[],
  industries: AdminAboutIndustry[],
  journey: AdminAboutJourneyStep[],
  principles: AdminAboutPrinciple[],
  processSteps: AdminAboutProcessStep[],
) {
  return JSON.stringify({
    content,
    coreValues,
    industries,
    journey,
    principles,
    processSteps,
  });
}

export function AboutEditor({ initial }: { initial: AdminAboutPage }) {
  const [content, setContent] = useState<AdminAboutContentRow>(initial.content);
  const [coreValues, setCoreValues] = useState<AdminAboutCoreValue[]>(
    initial.coreValues,
  );
  const [industries, setIndustries] = useState<AdminAboutIndustry[]>(
    initial.industries,
  );
  const [journey, setJourney] = useState<AdminAboutJourneyStep[]>(
    initial.journey,
  );
  const [principles, setPrinciples] = useState<AdminAboutPrinciple[]>(
    initial.principles,
  );
  const [processSteps, setProcessSteps] = useState<AdminAboutProcessStep[]>(
    initial.processSteps,
  );

  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [savedAt, setSavedAt] = useState<Date | null>(null);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const router = useRouter();

  // Snapshot of the last-saved (or initially-loaded) page, used to detect
  // unsaved changes — Save stays disabled until something actually changes.
  const baselineRef = useRef(
    snapshot(
      initial.content,
      initial.coreValues,
      initial.industries,
      initial.journey,
      initial.principles,
      initial.processSteps,
    ),
  );
  const isDirty =
    snapshot(content, coreValues, industries, journey, principles, processSteps) !==
    baselineRef.current;

  const overLimit = computeOverLimit(
    content,
    coreValues,
    industries,
    journey,
    principles,
    processSteps,
  );

  function setC<K extends keyof AdminAboutContentRow>(
    key: K,
    value: AdminAboutContentRow[K],
  ) {
    setContent((prev) => ({ ...prev, [key]: value }));
  }

  function handleSave() {
    if (overLimit || !isDirty) return;
    setError(null);
    startTransition(async () => {
      try {
        await saveAboutPage({
          content,
          coreValues,
          industries,
          journey,
          principles,
          processSteps,
        });
        baselineRef.current = snapshot(
          content,
          coreValues,
          industries,
          journey,
          principles,
          processSteps,
        );
        setSavedAt(new Date());
        setToastMsg("About Us page saved successfully.")
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
          disabled={pending || overLimit || !isDirty}
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

      {/* HERO */}
      <SectionCard title="Hero" desc="Bagian paling atas halaman /about.">
        <ImageField
          label="Hero Image"
          value={content.hero_image}
          onChange={(v) => setC("hero_image", v)}
          folder="about"
        />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <LimitedInput
            label="Heading — Line 1"
            maxLength={FIELD_LIMITS.aboutHeadingLine}
            value={content.hero_heading_line_1}
            onChange={(e) => setC("hero_heading_line_1", e.target.value)}
          />
          <LimitedInput
            label="Heading — Line 2"
            maxLength={FIELD_LIMITS.aboutHeadingLine}
            value={content.hero_heading_line_2}
            onChange={(e) => setC("hero_heading_line_2", e.target.value)}
          />
        </div>
        <LimitedTextArea
          label="Description"
          maxLength={FIELD_LIMITS.aboutDescription}
          value={content.hero_description}
          onChange={(e) => setC("hero_description", e.target.value)}
          rows={3}
        />
        <LimitedInput
          label="Stats Lottie URL (opsional)"
          maxLength={FIELD_LIMITS.lottieUrl}
          value={content.stats_lottie ?? ""}
          onChange={(e) => setC("stats_lottie", e.target.value || null)}
        />
        <div>
          <div className="mb-2 text-[12px] font-medium text-ink-2">
            Hero Stats (kartu "30+ Years..." di sebelah stats lottie)
          </div>
          <ListFieldEditor
            items={content.hero_stats}
            onChange={(v) => setC("hero_stats", v)}
            maxItems={MAX_ITEMS.heroStats}
            newItem={() =>
              ({
                value: 0,
                suffix: "+",
                label: "",
                color: "text-signal-teal",
              }) as AboutHeroStat
            }
            addLabel="Add hero stat"
            renderItem={(item, update) => (
              <div className="grid grid-cols-3 gap-2">
                <input
                  type="number"
                  value={item.value}
                  onChange={(e) =>
                    update({ ...item, value: Number(e.target.value) })
                  }
                  placeholder="30"
                  className={fieldClass("bg-panel")}
                />
                <LimitedInput
                  maxLength={FIELD_LIMITS.statSuffix}
                  value={item.suffix ?? ""}
                  onChange={(e) => update({ ...item, suffix: e.target.value })}
                  placeholder="+"
                  className="bg-panel"
                />
                <LimitedInput
                  maxLength={FIELD_LIMITS.statLabel}
                  value={item.label}
                  onChange={(e) => update({ ...item, label: e.target.value })}
                  placeholder="Years Track Record"
                  className="bg-panel"
                />
              </div>
            )}
          />
        </div>
      </SectionCard>

      {/* VISION & MISSION */}
      <SectionCard title="Vision & Mission">
        <LimitedTextArea
          label="Vision Description"
          maxLength={FIELD_LIMITS.aboutDescription}
          value={content.vision_description}
          onChange={(e) => setC("vision_description", e.target.value)}
          rows={3}
        />
        <div>
          <div className="mb-2 text-[12px] font-medium text-ink-2">
            Vision Stats
          </div>
          <ListFieldEditor
            items={content.vision_stats}
            onChange={(v) => setC("vision_stats", v)}
            maxItems={MAX_ITEMS.visionStats}
            newItem={() => ({ value: 0, suffix: "", label: "" }) as AboutStat}
            addLabel="Add vision stat"
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
                  value={item.suffix ?? ""}
                  onChange={(e) => update({ ...item, suffix: e.target.value })}
                  placeholder="+"
                  className="bg-panel"
                />
                <LimitedInput
                  maxLength={FIELD_LIMITS.statLabel}
                  value={item.label}
                  onChange={(e) => update({ ...item, label: e.target.value })}
                  placeholder="Years Experience"
                  className="bg-panel"
                />
              </div>
            )}
          />
        </div>
        <div>
          <div className="mb-2 text-[12px] font-medium text-ink-2">
            Mission Points
          </div>
          <ListFieldEditor
            items={content.mission_points}
            onChange={(v) => setC("mission_points", v)}
            maxItems={MAX_ITEMS.missionPoints}
            newItem={() => ""}
            addLabel="Add mission point"
            renderItem={(item, update) => (
              <LimitedTextArea
                maxLength={FIELD_LIMITS.missionPoint}
                value={item}
                onChange={(e) => update(e.target.value)}
                rows={2}
                className="bg-panel"
              />
            )}
          />
        </div>
        <div>
          <div className="mb-2 text-[12px] font-medium text-ink-2">
            Solutions (grid "Enterprise Solution Scope")
          </div>
          <ListFieldEditor
            items={content.solutions}
            onChange={(v) => setC("solutions", v)}
            maxItems={MAX_ITEMS.solutions}
            newItem={() => ""}
            addLabel="Add solution"
            renderItem={(item, update) => (
              <LimitedInput
                maxLength={FIELD_LIMITS.solutionItem}
                value={item}
                onChange={(e) => update(e.target.value)}
                placeholder="MultiFinance System (LOS & LMS)"
                className="bg-panel"
              />
            )}
          />
        </div>
      </SectionCard>

      {/* JOURNEY */}
      <SectionCard
        title="Our Journey"
        desc="Timeline vertikal di halaman About."
      >
        <ListFieldEditor
          items={journey}
          onChange={setJourney}
          maxItems={MAX_ITEMS.journeySteps}
          newItem={() =>
            ({ era: "", title: "", body: "" }) as AdminAboutJourneyStep
          }
          addLabel="Add journey step"
          renderItem={(item, update) => (
            <div className="space-y-2">
              <LimitedInput
                maxLength={FIELD_LIMITS.journeyEra}
                value={item.era}
                onChange={(e) => update({ ...item, era: e.target.value })}
                placeholder="1990s"
                className="bg-panel font-mono text-[12px]"
              />
              <LimitedInput
                maxLength={FIELD_LIMITS.journeyTitle}
                value={item.title}
                onChange={(e) => update({ ...item, title: e.target.value })}
                placeholder="Title"
                className="bg-panel font-medium"
              />
              <LimitedTextArea
                maxLength={FIELD_LIMITS.journeyBody}
                value={item.body}
                onChange={(e) => update({ ...item, body: e.target.value })}
                rows={2}
                placeholder="Description"
                className="bg-panel text-[12.5px] text-ink-1"
              />
            </div>
          )}
        />
      </SectionCard>

      {/* CORE VALUES */}
      <SectionCard title="Core Values" desc="Grid 'Pillars of Excellence'.">
        <ListFieldEditor
          items={coreValues}
          onChange={setCoreValues}
          maxItems={MAX_ITEMS.coreValues}
          newItem={() => ({ title: "", desc: "" }) as AdminAboutCoreValue}
          addLabel="Add core value"
          renderItem={(item, update) => (
            <div className="space-y-2">
              <LimitedInput
                maxLength={FIELD_LIMITS.coreValueTitle}
                value={item.title}
                onChange={(e) => update({ ...item, title: e.target.value })}
                placeholder="Title"
                className="bg-panel font-medium"
              />
              <LimitedTextArea
                maxLength={FIELD_LIMITS.coreValueDesc}
                value={item.desc}
                onChange={(e) => update({ ...item, desc: e.target.value })}
                rows={2}
                placeholder="Description"
                className="bg-panel text-[12.5px] text-ink-1"
              />
            </div>
          )}
        />
      </SectionCard>

      {/* PROCESS STEPS */}
      <SectionCard title="How We Work" desc="Grid 4 langkah proses kerja.">
        <ListFieldEditor
          items={processSteps}
          onChange={setProcessSteps}
          maxItems={MAX_ITEMS.processSteps}
          newItem={() =>
            ({ icon: "Search", label: "", body: "" }) as AdminAboutProcessStep
          }
          addLabel="Add process step"
          renderItem={(item, update) => (
            <div className="space-y-2">
              <IconPicker
                value={item.icon}
                onChange={(icon) => update({ ...item, icon })}
              />
              <LimitedInput
                maxLength={FIELD_LIMITS.processStepTitle}
                value={item.label}
                onChange={(e) => update({ ...item, label: e.target.value })}
                placeholder="Title"
                className="bg-panel font-medium"
              />
              <LimitedTextArea
                maxLength={FIELD_LIMITS.processStepBody}
                value={item.body}
                onChange={(e) => update({ ...item, body: e.target.value })}
                rows={2}
                placeholder="Description"
                className="bg-panel text-[12.5px] text-ink-1"
              />
            </div>
          )}
        />
      </SectionCard>

      {/* INDUSTRIES */}
      <SectionCard title="Industry Scope" desc="Grid 'Sectors we serve'.">
        <ListFieldEditor
          items={industries}
          onChange={setIndustries}
          maxItems={MAX_ITEMS.industries}
          newItem={() =>
            ({ icon: "Building2", title: "", body: "" }) as AdminAboutIndustry
          }
          addLabel="Add industry"
          renderItem={(item, update) => (
            <div className="space-y-2">
              <IconPicker
                value={item.icon}
                onChange={(icon) => update({ ...item, icon })}
              />
              <LimitedInput
                maxLength={FIELD_LIMITS.industryTitle}
                value={item.title}
                onChange={(e) => update({ ...item, title: e.target.value })}
                placeholder="Title"
                className="bg-panel font-medium"
              />
              <LimitedTextArea
                maxLength={FIELD_LIMITS.industryBody}
                value={item.body}
                onChange={(e) => update({ ...item, body: e.target.value })}
                rows={2}
                placeholder="Description"
                className="bg-panel text-[12.5px] text-ink-1"
              />
            </div>
          )}
        />
      </SectionCard>

      {/* WHY CHOOSE US */}
      <SectionCard title="Why Choose Us" desc="Grid alasan klien bertahan.">
        <ListFieldEditor
          items={principles}
          onChange={setPrinciples}
          maxItems={MAX_ITEMS.principles}
          newItem={() => ({ label: "", body: "" }) as AdminAboutPrinciple}
          addLabel="Add principle"
          renderItem={(item, update) => (
            <div className="space-y-2">
              <LimitedInput
                maxLength={FIELD_LIMITS.principleLabel}
                value={item.label}
                onChange={(e) => update({ ...item, label: e.target.value })}
                placeholder="Title"
                className="bg-panel font-medium"
              />
              <LimitedTextArea
                maxLength={FIELD_LIMITS.principleBody}
                value={item.body}
                onChange={(e) => update({ ...item, body: e.target.value })}
                rows={2}
                placeholder="Description"
                className="bg-panel text-[12.5px] text-ink-1"
              />
            </div>
          )}
        />
      </SectionCard>

      <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={pending || overLimit || !isDirty}
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