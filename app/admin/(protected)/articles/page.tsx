// app/admin/(protected)/articles/page.tsx
import { listArticles } from "@/lib/admin/articles";
import { requireCmsUser } from "@/lib/admin/auth";
import { ArticlesTable } from "@/components/admin/articles-table";
import { createArticle } from "./actions";

export default async function ArticlesListPage({
  searchParams,
}: {
  searchParams: Promise<{
    status?: "draft" | "published" | "trash";
    q?: string;
    mine?: string;
  }>;
}) {
  const { status, q, mine } = await searchParams;
  const user = await requireCmsUser();
  const onlyMine = mine === "1";

  const articles = await listArticles({
    status,
    search: q,
    authorId: onlyMine ? user.id : undefined,
  });

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
          <option value="trash">Trash</option>
        </select>

        <label className="flex items-center gap-2 rounded-lg border border-(--panel-border) bg-panel px-3.5 py-2 text-[13.5px] text-ink-1">
          <input
            type="checkbox"
            name="mine"
            value="1"
            defaultChecked={onlyMine}
            className="accent-signal-blue"
          />
          Only mine
        </label>

        <button className="rounded-lg border border-(--panel-border) px-4 py-2 text-[13px] text-ink-1 hover:text-ink-0">
          Filter
        </button>
      </form>

      {onlyMine && (
        <p className="mt-3 text-[12.5px] text-ink-2">
          Showing only articles created by <span className="font-medium text-ink-0">you</span>.
        </p>
      )}

      <div className="mt-6">
        <ArticlesTable articles={articles} />
      </div>
    </div>
  );
}