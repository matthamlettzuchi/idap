"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { CmsRole, CmsUser } from "@/lib/admin/auth";

type NavItem = { href: string; label: string; roles: CmsRole[] };
type NavGroup = { label: string; accent: string; items: NavItem[] };

const navGroups: NavGroup[] = [
  {
    label: "Overview",
    accent: "#6f8dff", // signal-teal
    items: [{ href: "/admin", label: "Dashboard", roles: ["admin", "editor"] }],
  },
  {
    label: "Content",
    accent: "#0e9488", // teal — matches Web Development accent elsewhere
    items: [
      {
        href: "/admin/articles",
        label: "Articles",
        roles: ["admin", "editor"],
      },
      { href: "/admin/media", label: "Media", roles: ["admin", "editor"] },
    ],
  },
  {
    label: "Pages",
    accent: "#2f4bd0", // blue — matches Custom Software accent elsewhere
    items: [
      { href: "/admin/home", label: "Home Page", roles: ["admin"] },
      { href: "/admin/about", label: "About Us", roles: ["admin"] },
      { href: "/admin/products", label: "Products", roles: ["admin"] },
      { href: "/admin/services", label: "Services", roles: ["admin"] },
    ],
  },
  {
    label: "Administration",
    accent: "#b45309", // amber — matches Maintenance & Support accent elsewhere
    items: [
      { href: "/admin/users", label: "Users", roles: ["admin"] },
      { href: "/admin/site-content", label: "Site Content", roles: ["admin"] },
      { href: "/admin/settings", label: "Settings", roles: ["admin"] },
    ],
  },
];

function hexToRgba(hex: string, alpha: number) {
  const clean = hex.replace("#", "");
  const bigint = parseInt(clean, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export function AdminShell({
  user,
  children,
}: {
  user: CmsUser;
  children: React.ReactNode;
}) {
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
        <div className="font-display text-[17px] font-semibold text-ink-0">
          Intidata CMS
        </div>
        <nav className="mt-8 flex flex-1 flex-col gap-6">
          {navGroups.map((group) => {
            const visibleItems = group.items.filter((item) =>
              item.roles.includes(user.role),
            );
            if (visibleItems.length === 0) return null;

            return (
              <div key={group.label}>
                <div
                  className="mb-2 flex items-center gap-1.5 px-3 font-mono text-[10.5px] font-semibold uppercase tracking-[0.14em]"
                  style={{ color: group.accent }}
                >
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ background: group.accent }}
                  />
                  {group.label}
                </div>
                <div className="flex flex-col gap-1">
                  {visibleItems.map((item) => {
                    const active = pathname === item.href;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="relative rounded-lg py-2.5 pl-4 pr-3 text-[13.5px] font-medium transition-colors"
                        style={
                          active
                            ? {
                                background: hexToRgba(group.accent, 0.1),
                                color: "var(--ink-0)",
                              }
                            : undefined
                        }
                      >
                        {active && (
                          <span
                            className="absolute left-0 top-1/2 h-4 w-[3px] -translate-y-1/2 rounded-full"
                            style={{ background: group.accent }}
                          />
                        )}
                        <span
                          className={
                            active ? "" : "text-ink-2 hover:text-ink-0"
                          }
                        >
                          {item.label}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </nav>
        <div className="border-t border-(--panel-border) pt-4">
          <div className="truncate text-[12px] text-ink-2">
            @{user.username}
          </div>{" "}
          <div className="mt-0.5 text-[11px] font-medium uppercase tracking-wide text-signal-teal">
            {user.role}
          </div>
          <button
            onClick={handleLogout}
            className="mt-3 text-[12.5px] font-medium text-ink-2 hover:text-ink-0"
          >
            Sign out
          </button>
        </div>
      </aside>
      <main className="flex-1 p-6 sm:p-10">{children}</main>
    </div>
  );
}
