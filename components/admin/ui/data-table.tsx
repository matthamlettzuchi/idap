// components/admin/ui/data-table.tsx
"use client";

export function DataTable<T>({
  columns,
  rows,
  rowKey,
  onRowClick,
  emptyMessage = "No records found.",
}: {
  columns: { header: string; render: (row: T) => React.ReactNode; className?: string }[];
  rows: T[];
  rowKey: (row: T) => string;
  onRowClick?: (row: T) => void;
  emptyMessage?: string;
}) {
  if (rows.length === 0) {
    return (
      <div className="rounded-xl border border-(--panel-border) bg-panel py-16 text-center text-[13.5px] text-ink-2">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-(--panel-border) bg-panel">
      <table className="w-full text-left text-[13.5px]">
        <thead className="border-b border-(--panel-border) bg-panel-2 text-[12px] uppercase tracking-wide text-ink-2">
          <tr>
            {columns.map((c) => (
              <th key={c.header} className={`px-4 py-3 font-medium ${c.className ?? ""}`}>
                {c.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              key={rowKey(row)}
              onClick={() => onRowClick?.(row)}
              className={`border-b border-(--panel-border) last:border-b-0 ${
                onRowClick ? "cursor-pointer hover:bg-panel-2" : ""
              }`}
            >
              {columns.map((c) => (
                <td key={c.header} className={`px-4 py-3 text-ink-0 ${c.className ?? ""}`}>
                  {c.render(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}