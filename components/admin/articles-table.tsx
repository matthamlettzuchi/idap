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
import type { CmsUser } from "@/lib/admin/auth";

export function ArticlesTable({
  articles: initialArticles,
  currentUser,
}: {
  articles: ArticleRow[];
  currentUser: CmsUser;
}) {
  const [articles, setArticles] = useState(initialArticles);
  const [, startTransition] = useTransition();

  function canModify(article: ArticleRow) {
    return currentUser.role === "admin" || article.author_id === currentUser.id;
  }

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
          render: (a) =>
            canModify(a) ? (
              <Link href={`/admin/articles/${a.id}`} className="font-medium hover:text-signal-teal">
                {a.title}
              </Link>
            ) : (
              <span className="font-medium text-ink-1" title="You can only edit your own articles">
                {a.title}
              </span>
            ),
        },
        { header: "Author", render: (a) => a.author_name ?? "—" },
        { header: "Category", render: (a) => a.category ?? "—" },
        { header: "Status", render: (a) => <StatusBadge status={a.status} /> },
        {
          header: "Updated",
          render: (a) => new Date(a.updated_at).toLocaleDateString(),
        },
        {
          header: "Actions",
          render: (a) => {
            if (!canModify(a)) {
              return <span className="text-[12.5px] text-ink-3">—</span>;
            }
            return a.status === "trash" ? (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleRestore(a.id)}
                  className="text-[12.5px] font-medium text-signal-teal hover:underline"
                >
                  Restore
                </button>
                {currentUser.role === "admin" && (
                  <ConfirmButton
                    label="Delete Permanently"
                    confirmLabel="Delete forever?"
                    onConfirm={() => handleDeletePermanently(a.id)}
                    className="text-[12.5px] font-medium text-red-500 hover:underline"
                  />
                )}
              </div>
            ) : (
              <ConfirmButton
                label="Move to Trash"
                confirmLabel="Move to trash?"
                onConfirm={() => handleTrash(a.id)}
                className="text-[12.5px] font-medium text-red-500 hover:underline"
              />
            );
          },
        },
      ]}
      emptyMessage="No articles yet. Create your first one."
    />
  );
}