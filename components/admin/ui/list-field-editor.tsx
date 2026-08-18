"use client";

import { Plus, Trash2, ChevronUp, ChevronDown, GripVertical } from "lucide-react";

export function ListFieldEditor<T>({
  items,
  onChange,
  newItem,
  renderItem,
  label,
  addLabel = "Add item",
  emptyLabel = "No items yet.",
  maxItems,
}: {
  items: T[];
  onChange: (items: T[]) => void;
  newItem: () => T;
  renderItem: (item: T, update: (next: T) => void, index: number) => React.ReactNode;
  label?: string;
  addLabel?: string;
  emptyLabel?: string;
  // When set, hides the "Add" button (and shows a "n/max" counter) once
  // items.length reaches this cap. Purely a UX bound — see MAX_ITEMS in
  // lib/admin/field-limits.ts for the values used across the CMS.
  maxItems?: number;
}) {
  function move(index: number, dir: -1 | 1) {
    const target = index + dir;
    if (target < 0 || target >= items.length) return;
    const next = [...items];
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next);
  }

  function remove(index: number) {
    onChange(items.filter((_, i) => i !== index));
  }

  function update(index: number, next: T) {
    const copy = [...items];
    copy[index] = next;
    onChange(copy);
  }

  const atMax = typeof maxItems === "number" && items.length >= maxItems;

  return (
    <div>
      {(label || typeof maxItems === "number") && (
        <div className="mb-2 flex items-center justify-between">
          {label ? (
            <div className="text-[12px] font-medium text-ink-2">{label}</div>
          ) : (
            <span />
          )}
          {typeof maxItems === "number" && (
            <span
              className={`font-mono text-[11px] ${
                atMax ? "font-semibold text-amber-500" : "text-ink-3"
              }`}
            >
              {items.length}/{maxItems}
            </span>
          )}
        </div>
      )}

      <div className="space-y-3">
        {items.length === 0 && (
          <p className="rounded-lg border border-dashed border-(--panel-border-strong) px-4 py-3 text-[12.5px] text-ink-2">
            {emptyLabel}
          </p>
        )}

        {items.map((item, i) => (
          <div
            key={i}
            className="flex items-start gap-2 rounded-lg border border-(--panel-border) bg-panel-2 p-3"
          >
            <div className="flex shrink-0 flex-col items-center gap-1 pt-1 text-ink-3">
              <button
                type="button"
                onClick={() => move(i, -1)}
                disabled={i === 0}
                className="disabled:opacity-30 hover:text-signal-teal"
              >
                <ChevronUp size={14} />
              </button>
              <GripVertical size={12} />
              <button
                type="button"
                onClick={() => move(i, 1)}
                disabled={i === items.length - 1}
                className="disabled:opacity-30 hover:text-signal-teal"
              >
                <ChevronDown size={14} />
              </button>
            </div>

            <div className="flex-1">{renderItem(item, (next) => update(i, next), i)}</div>

            <button
              type="button"
              onClick={() => remove(i)}
              aria-label="Remove item"
              className="shrink-0 text-ink-3 hover:text-red-500"
            >
              <Trash2 size={15} />
            </button>
          </div>
        ))}
      </div>

      {atMax ? (
        <p className="mt-3 text-[11.5px] text-ink-3">
          Maximum of {maxItems} items reached. Remove one to add another.
        </p>
      ) : (
        <button
          type="button"
          onClick={() => onChange([...items, newItem()])}
          className="mt-3 inline-flex items-center gap-1.5 rounded-lg border border-dashed border-(--panel-border-strong) px-3 py-2 text-[12.5px] font-medium text-ink-1 hover:border-signal-teal hover:text-signal-teal"
        >
          <Plus size={14} /> {addLabel}
        </button>
      )}
    </div>
  );
}