// components/admin/ui/status-badge.tsx
export function StatusBadge({ status }: { status: "draft" | "published" }) {
  const isPublished = status === "published";
  return (
    <span
      className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${
        isPublished ? "bg-signal-teal/10 text-signal-teal" : "bg-panel-2 text-ink-2"
      }`}
    >
      {isPublished ? "Published" : "Draft"}
    </span>
  );
}