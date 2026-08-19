"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, X } from "lucide-react";

export function SuccessToast({
  message,
  show,
  onClose,
  duration = 3000,
}: {
  message: string;
  show: boolean;
  onClose: () => void;
  duration?: number;
}) {
  useEffect(() => {
    if (!show) return;
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [show, onClose, duration]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.96 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-6 right-6 z-[100] flex items-center gap-3 rounded-xl border border-emerald-500/30 bg-emerald-50 px-4 py-3 shadow-[0_20px_40px_-16px_rgba(16,185,129,0.35)] dark:bg-emerald-950/90"
        >
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white">
            <CheckCircle2 size={16} />
          </span>
          <span className="text-[13.5px] font-medium text-emerald-800 dark:text-emerald-300">
            {message}
          </span>
          <button
            onClick={onClose}
            aria-label="Dismiss"
            className="ml-1 shrink-0 text-emerald-700/60 hover:text-emerald-800 dark:text-emerald-400/60 dark:hover:text-emerald-300"
          >
            <X size={14} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}