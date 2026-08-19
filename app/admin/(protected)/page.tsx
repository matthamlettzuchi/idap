import Link from "next/link";
import { FileText, User2 } from "lucide-react";
import { requireCmsUser } from "@/lib/admin/auth";
import { getAdminDashboardData } from "@/lib/admin/dashboard";
import { listRecentPublishedArticlesForHero } from "@/lib/admin/articles";
import { ArticleHeroCarousel } from "@/components/admin/dashboard/article-hero-carousel";
import {
  RecentActivityCard,
  RecentDraftsCard,
} from "@/components/admin/dashboard/activity-drafts";

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
        <RecentActivityCard items={recentActivity} />
        <RecentDraftsCard items={recentDrafts} />
      </div>
    </div>
  );
}