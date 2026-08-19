"use client";

import { useCallback, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, X } from "lucide-react";

export type ToastItem = { id: number; message: string };

let idCounter = 0;

// Manages a stack of success toasts: each push() adds a new one that
// auto-dismisses after `duration` ms, independent of any others already
// showing. dismissAll() lets a form clear every toast immediately (used
// when the user starts editing again after a save).
export function useToastStack(duration = 10000) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const timers = useRef<Map<number, ReturnType<typeof setTimeout>>>(new Map());

  const dismiss = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
    const timer = timers.current.get(id);
    if (timer) {
      clearTimeout(timer);
      timers.current.delete(id);
    }
  }, []);

  const dismissAll = useCallback(() => {
    timers.current.forEach((t) => clearTimeout(t));
    timers.current.clear();
    setToasts([]);
  }, []);

  const push = useCallback(
    (message: string) => {
      const id = ++idCounter;
      setToasts((prev) => [...prev, { id, message }]);
      timers.current.set(
        id,
        setTimeout(() => dismiss(id), duration)
      );
    },
    [dismiss, duration]
  );

  return { toasts, push, dismiss, dismissAll };
}

export function ToastStack({
  toasts,
  onDismiss,
}: {
  toasts: ToastItem[];
  onDismiss: (id: number) => void;
}) {
  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col-reverse gap-3">
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-3 rounded-xl border border-emerald-500/30 bg-emerald-50 px-4 py-3 shadow-[0_20px_40px_-16px_rgba(16,185,129,0.35)] dark:bg-emerald-950/90"
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white">
              <CheckCircle2 size={16} />
            </span>
            <span className="text-[13.5px] font-medium text-emerald-800 dark:text-emerald-300">
              {t.message}
            </span>
            <button
              onClick={() => onDismiss(t.id)}
              aria-label="Dismiss"
              className="ml-1 shrink-0 text-emerald-700/60 hover:text-emerald-800 dark:text-emerald-400/60 dark:hover:text-emerald-300"
            >
              <X size={14} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}