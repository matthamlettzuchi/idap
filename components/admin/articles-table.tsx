// components/admin/articles-table.tsx
"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { DataTable } from "@/components/admin/ui/data-table";
import { StatusBadge } from "@/components/admin/ui/status-badge";
import { ConfirmButton } from "@/components/admin/ui/confirm-dialog";
import {
  trashArticle,
  restoreArticle,
  permanentlyDeleteArticle,
} from "@/app/admin/(protected)/articles/actions";
import type { ArticleRow } from "@/lib/admin/articles";

export function ArticlesTable({ articles: initialArticles }: { articles: ArticleRow[] }) {
  const [articles, setArticles] = useState(initialArticles);
  const [, startTransition] = useTransition();

  function handleTrash(id: string) {
    setArticles((prev) => prev.filter((a) => a.id !== id));
    startTransition(() => {
      trashArticle(id);
    });
  }

  function handleRestore(id: string) {
    setArticles((prev) => prev.filter((a) => a.id !== id));
    startTransition(() => {
      restoreArticle(id);
    });
  }

  function handleDeletePermanently(id: string) {
    setArticles((prev) => prev.filter((a) => a.id !== id));
    startTransition(() => {
      permanentlyDeleteArticle(id);
    });
  }

  return (
    <DataTable
      rows={articles}
      rowKey={(a) => a.id}
      columns={[
        {
          header: "Title",
          render: (a) => (
            <Link href={`/admin/articles/${a.id}`} className="font-medium hover:text-signal-teal">
              {a.title}
            </Link>
          ),
        },
        { header: "Category", render: (a) => a.category ?? "—" },
        { header: "Status", render: (a) => <StatusBadge status={a.status} /> },
        {
          header: "Updated",
          render: (a) => new Date(a.updated_at).toLocaleDateString(),
        },
        {
          header: "Actions",
          render: (a) =>
            a.status === "trash" ? (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleRestore(a.id)}
                  className="text-[12.5px] font-medium text-signal-teal hover:underline"
                >
                  Restore
                </button>
                <ConfirmButton
                  label="Delete Permanently"
                  confirmLabel="Delete forever?"
                  onConfirm={() => handleDeletePermanently(a.id)}
                  className="text-[12.5px] font-medium text-red-500 hover:underline"
                />
              </div>
            ) : (
              <ConfirmButton
                label="Move to Trash"
                confirmLabel="Move to trash?"
                onConfirm={() => handleTrash(a.id)}
                className="text-[12.5px] font-medium text-red-500 hover:underline"
              />
            ),
        },
      ]}
      emptyMessage="No articles yet. Create your first one."
    />
  );
}