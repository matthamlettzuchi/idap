// components/admin/articles-table.tsx
"use client";

import Link from "next/link";
import { DataTable } from "@/components/admin/ui/data-table";
import { StatusBadge } from "@/components/admin/ui/status-badge";
import type { ArticleRow } from "@/lib/admin/articles";

export function ArticlesTable({ articles }: { articles: ArticleRow[] }) {
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
      ]}
      emptyMessage="No articles yet. Create your first one."
    />
  );
}