"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { CmsRole, CmsUser } from "@/lib/admin/auth";

const navItems: { href: string; label: string; roles: CmsRole[] }[] = [
  { href: "/admin", label: "Dashboard", roles: ["admin", "editor"] },
  { href: "/admin/articles", label: "Articles", roles: ["admin", "editor"] },
  { href: "/admin/media", label: "Media", roles: ["admin", "editor"] },
  { href: "/admin/home", label: "Home Page", roles: ["admin"] },
  { href: "/admin/products", label: "Products", roles: ["admin"] },
  { href: "/admin/about", label: "About Us", roles: ["admin"] },
  { href: "/admin/services", label: "Services", roles: ["admin"] },
  { href: "/admin/users", label: "Users", roles: ["admin"] },
  { href: "/admin/site-content", label: "Site Content", roles: ["admin"] },
  { href: "/admin/settings", label: "Settings", roles: ["admin"] },
];

export function AdminShell({ user, children }: { user: CmsUser; children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.replace("/admin/login");
    router.refresh();
  }

  return (
    <div className="flex min-h-screen bg-void">
      <aside className="hidden w-64 shrink-0 border-r border-(--panel-border) bg-panel p-5 sm:flex sm:flex-col">
        <div className="font-display text-[17px] font-semibold text-ink-0">Intidata CMS</div>
        <nav className="mt-8 flex flex-1 flex-col gap-1">
          {navItems
            .filter((item) => item.roles.includes(user.role))
            .map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-lg px-3 py-2.5 text-[13.5px] font-medium transition-colors ${
                    active ? "bg-panel-2 text-ink-0" : "text-ink-2 hover:text-ink-0"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
        </nav>
        <div className="border-t border-(--panel-border) pt-4">
          <div className="truncate text-[12px] text-ink-2">{user.email}</div>
          <div className="mt-0.5 text-[11px] font-medium uppercase tracking-wide text-signal-teal">{user.role}</div>
          <button onClick={handleLogout} className="mt-3 text-[12.5px] font-medium text-ink-2 hover:text-ink-0">
            Sign out
          </button>
        </div>
      </aside>
      <main className="flex-1 p-6 sm:p-10">{children}</main>
    </div>
  );
}