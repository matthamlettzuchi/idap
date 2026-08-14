// components/admin/ui/confirm-dialog.tsx
"use client";

import { useState } from "react";

export function ConfirmButton({
  label,
  confirmLabel = "Are you sure?",
  onConfirm,
  className,
}: {
  label: string;
  confirmLabel?: string;
  onConfirm: () => void | Promise<void>;
  className?: string;
}) {
  const [confirming, setConfirming] = useState(false);
  const [pending, setPending] = useState(false);

  if (confirming) {
    return (
      <span className="inline-flex items-center gap-2 text-[13px]">
        {confirmLabel}
        <button
          disabled={pending}
          onClick={async () => {
            setPending(true);
            await onConfirm();
            setPending(false);
            setConfirming(false);
          }}
          className="font-medium text-red-500 hover:underline"
        >
          {pending ? "..." : "Yes"}
        </button>
        <button onClick={() => setConfirming(false)} className="text-ink-2 hover:underline">
          Cancel
        </button>
      </span>
    );
  }

  return (
    <button onClick={() => setConfirming(true)} className={className}>
      {label}
    </button>
  );
}