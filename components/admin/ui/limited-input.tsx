"use client";

import { forwardRef } from "react";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  maxLength: number;
  label?: string;
};

export const LimitedInput = forwardRef<HTMLInputElement, Props>(function LimitedInput(
  { maxLength, label, value, className, ...props },
  ref
) {
  const length = typeof value === "string" ? value.length : 0;
  const over = length > maxLength;
  const near = !over && length >= maxLength * 0.9;

  return (
    <div>
      {label && (
        <div className="mb-1.5 flex items-center justify-between">
          <label className="text-[12px] font-medium text-ink-2">{label}</label>
          <span
            className={`font-mono text-[11px] ${
              over ? "font-semibold text-red-500" : near ? "text-amber-500" : "text-ink-3"
            }`}
          >
            {length}/{maxLength}
          </span>
        </div>
      )}
      <input
        ref={ref}
        value={value}
        className={`w-full rounded-lg border bg-panel-2 px-3 py-2 text-[13.5px] text-ink-0 outline-none transition-colors ${
          over
            ? "border-red-500 focus:border-red-500"
            : "border-(--panel-border) focus:border-signal-teal"
        } ${className ?? ""}`}
        {...props}
      />
      {over && (
        <p className="mt-1 text-[11px] text-red-500">
          {length - maxLength} char{length - maxLength === 1 ? "" : "s"} over the limit — trim
          this to {maxLength} characters or fewer to save.
        </p>
      )}
    </div>
  );
});