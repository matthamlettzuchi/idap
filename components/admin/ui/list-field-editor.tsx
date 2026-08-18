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
}: {
  items: T[];
  onChange: (items: T[]) => void;
  newItem: () => T;
  renderItem: (item: T, update: (next: T) => void, index: number) => React.ReactNode;
  label?: string;
  addLabel?: string;
  emptyLabel?: string;
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

  return (
    <div>
      {label && <div className="mb-2 text-[12px] font-medium text-ink-2">{label}</div>}

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

      <button
        type="button"
        onClick={() => onChange([...items, newItem()])}
        className="mt-3 inline-flex items-center gap-1.5 rounded-lg border border-dashed border-(--panel-border-strong) px-3 py-2 text-[12.5px] font-medium text-ink-1 hover:border-signal-teal hover:text-signal-teal"
      >
        <Plus size={14} /> {addLabel}
      </button>
    </div>
  );
}