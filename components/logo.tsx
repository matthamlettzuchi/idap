import { ImageIcon } from "lucide-react";

export function Logo({ className = "h-9 w-32" }: { className?: string }) {
  <img src="/logo.svg" alt="Nama Perusahaan" className={className + " object-contain"} />
  return (
    <div
      className={`flex shrink-0 items-center justify-center gap-1.5 rounded-md border border-dashed border-[var(--panel-border-strong)] bg-panel-2 text-ink-2 ${className}`}
    >
      <ImageIcon size={14} strokeWidth={1.75} />
      <span className="font-mono text-[10px] uppercase tracking-wider">
        Logo
      </span>
    </div>
  );
}