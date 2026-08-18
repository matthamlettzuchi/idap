// components/admin/ui/status-badge.tsx
export function StatusBadge({ status }: { status: "draft" | "published" | "trash" }) {
  const styles: Record<typeof status, string> = {
    published: "bg-signal-teal/10 text-signal-teal",
    draft: "bg-panel-2 text-ink-2",
    trash: "bg-red-50 text-red-600",
  };
  const labels: Record<typeof status, string> = {
    published: "Published",
    draft: "Draft",
    trash: "Trash",
  };

  return (
    <span className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${styles[status]}`}>
      {labels[status]}
    </span>
  );
}