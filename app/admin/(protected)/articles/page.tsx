// app/admin/(protected)/articles/page.tsx
import Link from "next/link";
import { listArticles } from "@/lib/admin/articles";
import { DataTable } from "@/components/admin/ui/data-table";
import { StatusBadge } from "@/components/admin/ui/status-badge";
import { createArticle } from "./actions";

export default async function ArticlesListPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: "draft" | "published"; q?: string }>;
}) {
  const { status, q } = await searchParams;
  const articles = await listArticles({ status, search: q });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-[22px] font-semibold text-ink-0">Articles</h1>
        <form action={createArticle}>
          <button className="rounded-full bg-signal-blue px-5 py-2.5 text-[13.5px] font-medium text-white">
            New Article
          </button>
        </form>
      </div>

      <form className="mt-6 flex flex-wrap items-center gap-3" method="get">
        <input
          type="text"
          name="q"
          defaultValue={q}
          placeholder="Search by title..."
          className="rounded-lg border border-(--panel-border) bg-panel px-3.5 py-2 text-[13.5px] text-ink-0 outline-none focus:border-signal-teal"
        />
        <select
          name="status"
          defaultValue={status ?? ""}
          className="rounded-lg border border-(--panel-border) bg-panel px-3.5 py-2 text-[13.5px] text-ink-0 outline-none"
        >
          <option value="">All statuses</option>
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
        <button className="rounded-lg border border-(--panel-border) px-4 py-2 text-[13px] text-ink-1 hover:text-ink-0">
          Filter
        </button>
      </form>

      <div className="mt-6">
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
      </div>
    </div>
  );
}