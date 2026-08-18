import Link from "next/link";
import { FileText, PenLine, Plus, Sparkles, Trash2, User2 } from "lucide-react";
import { requireCmsUser } from "@/lib/admin/auth";
import {
  getAdminDashboardData,
  type ActivityItem,
} from "@/lib/admin/dashboard";
import { listRecentPublishedArticlesForHero } from "@/lib/admin/articles";
import { ArticleHeroCarousel } from "@/components/admin/dashboard/article-hero-carousel";

function formatDateTime(iso: string) {
  return new Date(iso).toLocaleString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function ActivityIcon({ action }: { action: ActivityItem["action"] }) {
  if (action === "published") return <Sparkles size={14} />;
  if (action === "created") return <Plus size={14} />;
  if (action === "deleted") return <Trash2 size={14} />;
  return <PenLine size={14} />;
}

export default async function AdminDashboardPage() {
  const user = await requireCmsUser();
  const [{ recentActivity, recentDrafts, totalArticles, myArticles }, heroArticles] =
    await Promise.all([
      getAdminDashboardData(user.id),
      listRecentPublishedArticlesForHero(),
    ]);

  return (
    <div>
      <ArticleHeroCarousel articles={heroArticles} />

      <div className="flex items-center gap-4">
        {user.avatarUrl ? (
          // eslint-disable-next-line @next/next/no-img-element -- arbitrary/external hosted path (upload or imgbb)
          <img
            src={user.avatarUrl}
            alt=""
            className="h-12 w-12 shrink-0 rounded-full border border-(--panel-border) object-cover"
          />
        ) : (
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-dashed border-(--panel-border-strong) text-ink-3">
            <User2 size={20} />
          </span>
        )}
        <div>
          <h1 className="font-display text-[24px] font-semibold text-ink-0">
            Welcome back, {user.displayName || user.username}
          </h1>
          <p className="mt-1 text-[14px] text-ink-2">
            You&apos;re signed in as <span className="font-medium text-ink-0">{user.role}</span>.
          </p>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex items-center gap-4 rounded-xl border border-(--panel-border) bg-panel p-5">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-signal-blue-dim text-signal-teal">
            <FileText size={19} strokeWidth={1.75} />
          </span>
          <div>
            <div className="font-display text-[24px] font-semibold text-ink-0">
              {totalArticles}
            </div>
            <div className="text-[12.5px] text-ink-2">Total articles</div>
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-xl border border-(--panel-border) bg-panel p-5">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-signal-blue-dim text-signal-teal">
            <User2 size={19} strokeWidth={1.75} />
          </span>
          <div>
            <div className="font-display text-[24px] font-semibold text-ink-0">
              {myArticles}
            </div>
            <div className="text-[12.5px] text-ink-2">Created by you</div>
          </div>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <section className="rounded-xl border border-(--panel-border) bg-panel p-6">
          <div className="mono-label mb-4">Recent Activity</div>
          {recentActivity.length === 0 ? (
            <p className="text-[13px] text-ink-2">No activity yet.</p>
          ) : (
            <ul className="space-y-4">
              {recentActivity.map((item) => (
                <li key={item.id} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-(--panel-border) text-signal-teal">
                    <ActivityIcon action={item.action} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-[13.5px] text-ink-0">
                      <span className="font-medium">{item.actorName ?? "Someone"}</span>{" "}
                      {item.action}{" "}
                      {item.href ? (
                        <Link
                          href={item.href}
                          className="font-medium text-signal-teal hover:underline"
                        >
                          {item.label}
                        </Link>
                      ) : (
                        <span className="font-medium text-ink-0">{item.label}</span>
                      )}
                    </p>
                    <p className="mt-0.5 text-[11.5px] text-ink-2">
                      {formatDateTime(item.updatedAt)}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="rounded-xl border border-(--panel-border) bg-panel p-6">
          <div className="mono-label mb-4">Recent Drafts</div>
          {recentDrafts.length === 0 ? (
            <p className="text-[13px] text-ink-2">No drafts right now.</p>
          ) : (
            <ul className="divide-y divide-(--panel-border)">
              {recentDrafts.map((draft) => (
                <li key={draft.id}>
                  <Link
                    href={`/admin/articles/${draft.id}`}
                    className="group flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0"
                  >
                    <div className="min-w-0">
                      <div className="truncate text-[13.5px] font-medium text-ink-0 group-hover:text-signal-teal">
                        {draft.title || "(untitled)"}
                      </div>
                      <div className="mt-0.5 text-[11.5px] text-ink-2">
                        {draft.authorName ?? "Unknown"} · {formatDateTime(draft.updatedAt)}
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}