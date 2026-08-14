import { requireCmsUser } from "@/lib/admin/auth";

export default async function AdminDashboardPage() {
  const user = await requireCmsUser();
  return (
    <div>
      <h1 className="font-display text-[24px] font-semibold text-ink-0">
        Welcome back{user.email ? `, ${user.email}` : ""}
      </h1>
      <p className="mt-2 text-[14px] text-ink-2">
        You're signed in as <span className="font-medium text-ink-0">{user.role}</span>. Article
        and content tools land here next.
      </p>
    </div>
  );
}