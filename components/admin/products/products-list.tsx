"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import { ConfirmButton } from "@/components/admin/ui/confirm-dialog";
import { reorderProducts, deleteProduct } from "@/app/admin/(protected)/products/actions";
import type { AdminProductRow } from "@/lib/admin/products";

export function ProductsList({ initialProducts }: { initialProducts: AdminProductRow[] }) {
  const [products, setProducts] = useState(initialProducts);
  const [pending, startTransition] = useTransition();

  function move(index: number, dir: -1 | 1) {
    const target = index + dir;
    if (target < 0 || target >= products.length) return;
    const next = [...products];
    [next[index], next[target]] = [next[target], next[index]];
    setProducts(next);
    startTransition(() => {
      reorderProducts(next.map((p) => p.slug));
    });
  }

  function handleDelete(slug: string) {
    setProducts((prev) => prev.filter((p) => p.slug !== slug));
    startTransition(() => {
      deleteProduct(slug);
    });
  }

  if (products.length === 0) {
    return (
      <div className="rounded-xl border border-(--panel-border) bg-panel py-16 text-center text-[13.5px] text-ink-2">
        Belum ada produk. Klik &quot;New Product&quot; untuk membuat yang pertama.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-(--panel-border) bg-panel">
      {products.map((p, i) => (
        <div
          key={p.slug}
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
              disabled={i === products.length - 1 || pending}
              className="disabled:opacity-30 hover:text-signal-teal"
            >
              <ChevronDown size={16} />
            </button>
          </div>

          <span
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-[11px] font-semibold text-white"
            style={{ background: p.accent }}
          >
            {p.code.slice(0, 3)}
          </span>

          <div className="flex-1">
            <Link
              href={`/admin/products/${p.slug}`}
              className="font-medium text-ink-0 hover:text-signal-teal"
            >
              {p.name || "(untitled)"}
            </Link>
            <div className="text-[12px] text-ink-2">/{p.slug}</div>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href={`/admin/products/${p.slug}`}
              className="text-[12.5px] font-medium text-signal-teal hover:underline"
            >
              Edit
            </Link>
            <ConfirmButton
              label="Delete"
              confirmLabel="Delete?"
              onConfirm={() => handleDelete(p.slug)}
              className="text-[12.5px] font-medium text-red-500 hover:underline"
            />
          </div>
        </div>
      ))}
    </div>
  );
}