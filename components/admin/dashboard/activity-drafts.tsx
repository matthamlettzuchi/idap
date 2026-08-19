"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { X, PenLine, Plus, Sparkles, Trash2 } from "lucide-react";
import type { ActivityItem, DraftItem } from "@/lib/admin/dashboard";

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

// Locks background scroll while the modal is open — otherwise the page
// behind can keep scrolling under the (visually) fixed overlay.
function useLockBodyScroll(locked: boolean) {
  useEffect(() => {
    if (!locked) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [locked]);
}

function Modal({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  useLockBodyScroll(true);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  // Rendered via portal straight into <body> — this is required so
  // "fixed" actually anchors to the real viewport instead of whatever
  // transformed ancestor (e.g. a Framer Motion parent) happens to sit
  // above this component in the tree.
  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      className="fixed inset-0 z-100 flex items-center justify-center bg-black/50 p-6"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 12, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 12, scale: 0.98 }}
        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="flex max-h-[80vh] w-full max-w-lg flex-col overflow-hidden rounded-2xl border border-(--panel-border) bg-panel"
      >
        <div className="flex shrink-0 items-center justify-between border-b border-(--panel-border) px-6 py-4">
          <h2 className="font-display text-[16px] font-semibold text-ink-0">{title}</h2>
          <button onClick={onClose} aria-label="Close" className="text-ink-2 hover:text-ink-0">
            <X size={18} />
          </button>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto p-6">{children}</div>
      </motion.div>
    </motion.div>,
    document.body
  );
}

function ActivityRow({ item }: { item: ActivityItem }) {
  return (
    <li className="flex items-start gap-3">
      <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-(--panel-border) text-signal-teal">
        <ActivityIcon action={item.action} />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-[13.5px] text-ink-0">
          <span className="font-medium">{item.actorName ?? "Someone"}</span>{" "}
          {item.action}{" "}
          {item.href ? (
            <Link href={item.href} className="font-medium text-signal-teal hover:underline">
              {item.label}
            </Link>
          ) : (
            <span className="font-medium text-ink-0">{item.label}</span>
          )}
        </p>
        <p className="mt-0.5 text-[11.5px] text-ink-2">{formatDateTime(item.updatedAt)}</p>
      </div>
    </li>
  );
}

const PREVIEW_COUNT = 5;

export function RecentActivityCard({ items }: { items: ActivityItem[] }) {
  const [open, setOpen] = useState(false);
  const preview = items.slice(0, PREVIEW_COUNT);

  return (
    <section className="rounded-xl border border-(--panel-border) bg-panel p-6">
      <div className="mb-4 flex items-center justify-between">
        <div className="mono-label">Recent Activity</div>
        {items.length > PREVIEW_COUNT && (
          <button
            onClick={() => setOpen(true)}
            className="text-[12px] font-medium text-signal-teal hover:underline"
          >
            See more
          </button>
        )}
      </div>

      {preview.length === 0 ? (
        <p className="text-[13px] text-ink-2">No activity yet.</p>
      ) : (
        <ul className="space-y-4">
          {preview.map((item) => (
            <ActivityRow key={item.id} item={item} />
          ))}
        </ul>
      )}

      <AnimatePresence>
        {open && (
          <Modal title="Recent Activity" onClose={() => setOpen(false)}>
            <ul className="space-y-4">
              {items.map((item) => (
                <ActivityRow key={item.id} item={item} />
              ))}
            </ul>
          </Modal>
        )}
      </AnimatePresence>
    </section>
  );
}

function DraftRow({ item }: { item: DraftItem }) {
  return (
    <li>
      <Link
        href={`/admin/articles/${item.id}`}
        className="group flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0"
      >
        <div className="min-w-0">
          <div className="truncate text-[13.5px] font-medium text-ink-0 group-hover:text-signal-teal">
            {item.title || "(untitled)"}
          </div>
          <div className="mt-0.5 text-[11.5px] text-ink-2">
            {item.authorName ?? "Unknown"} · {formatDateTime(item.updatedAt)}
          </div>
        </div>
      </Link>
    </li>
  );
}

export function RecentDraftsCard({ items }: { items: DraftItem[] }) {
  const [open, setOpen] = useState(false);
  const preview = items.slice(0, PREVIEW_COUNT);

  return (
    <section className="rounded-xl border border-(--panel-border) bg-panel p-6">
      <div className="mb-4 flex items-center justify-between">
        <div className="mono-label">Recent Drafts</div>
        {items.length > PREVIEW_COUNT && (
          <button
            onClick={() => setOpen(true)}
            className="text-[12px] font-medium text-signal-teal hover:underline"
          >
            See more
          </button>
        )}
      </div>

      {preview.length === 0 ? (
        <p className="text-[13px] text-ink-2">No drafts right now.</p>
      ) : (
        <ul className="divide-y divide-(--panel-border)">
          {preview.map((item) => (
            <DraftRow key={item.id} item={item} />
          ))}
        </ul>
      )}

      <AnimatePresence>
        {open && (
          <Modal title="Recent Drafts" onClose={() => setOpen(false)}>
            <ul className="divide-y divide-(--panel-border)">
              {items.map((item) => (
                <DraftRow key={item.id} item={item} />
              ))}
            </ul>
          </Modal>
        )}
      </AnimatePresence>
    </section>
  );
}