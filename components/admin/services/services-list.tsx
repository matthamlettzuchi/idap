"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import { ConfirmButton } from "@/components/admin/ui/confirm-dialog";
import { reorderServices, deleteService } from "@/app/admin/(protected)/services/actions";
import type { AdminServiceRow } from "@/lib/admin/services";

export function ServicesList({ initialServices }: { initialServices: AdminServiceRow[] }) {
  const [services, setServices] = useState(initialServices);
  const [pending, startTransition] = useTransition();

  function move(index: number, dir: -1 | 1) {
    const target = index + dir;
    if (target < 0 || target >= services.length) return;
    const next = [...services];
    [next[index], next[target]] = [next[target], next[index]];
    setServices(next);
    startTransition(() => {
      reorderServices(next.map((s) => s.slug));
    });
  }

  function handleDelete(slug: string) {
    setServices((prev) => prev.filter((s) => s.slug !== slug));
    startTransition(() => {
      deleteService(slug);
    });
  }

  if (services.length === 0) {
    return (
      <div className="rounded-xl border border-(--panel-border) bg-panel py-16 text-center text-[13.5px] text-ink-2">
        Belum ada layanan. Klik &quot;New Service&quot; untuk membuat yang pertama.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-(--panel-border) bg-panel">
      {services.map((s, i) => (
        <div
          key={s.slug}
          className="flex items-center gap-4 border-b border-(--panel-border) px-5 py-4 last:border-b-0"
        >
          <div className="flex shrink-0 flex-col items-center text-ink-3">
            <button
              onClick={() => move(i, -1)}
              disabled={i === 0 || pending}
              className="disabled:opacity-30 hover:text-signal-teal"
            >
              <ChevronUp size={16} />
            </button>
            <button
              onClick={() => move(i, 1)}
              disabled={i === services.length - 1 || pending}
              className="disabled:opacity-30 hover:text-signal-teal"
            >
              <ChevronDown size={16} />
            </button>
          </div>

          <span
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-[11px] font-semibold text-white"
            style={{ background: s.accent }}
          >
            {s.code.slice(0, 3)}
          </span>

          <div className="flex-1">
            <Link
              href={`/admin/services/${s.slug}`}
              className="font-medium text-ink-0 hover:text-signal-teal"
            >
              {s.name || "(untitled)"}
            </Link>
            <div className="text-[12px] text-ink-2">/{s.slug}</div>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href={`/admin/services/${s.slug}`}
              className="text-[12.5px] font-medium text-signal-teal hover:underline"
            >
              Edit
            </Link>
            <ConfirmButton
              label="Delete"
              confirmLabel="Delete?"
              onConfirm={() => handleDelete(s.slug)}
              className="text-[12.5px] font-medium text-red-500 hover:underline"
            />
          </div>
        </div>
      ))}
    </div>
  );
}