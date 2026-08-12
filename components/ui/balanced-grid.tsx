"use client";

import type { CSSProperties, ReactNode } from "react";

type BalancedGridProps<T> = {
  items: T[];
  baseCols: 3 | 4;
  gapClassName?: string;
  gapRem?: number;
  renderItem: (item: T, index: number) => ReactNode;
};

function resolveLayout(n: number, baseCols: 3 | 4) {
  let cols: number = Math.min(n, baseCols);
  let centerLastRow = false;

  if (n > baseCols) {
    if (baseCols === 4) {
      if (n === 5) {
        // 4+1 leaves a lonely card — drop to 3 cols (3+2) and center the pair
        cols = 3;
        centerLastRow = true;
      } else if (n === 6) {
        // 4+2 leaves two orphans on the left — 3 cols divides evenly (3+3)
        cols = 3;
      } else if (n === 7) {
        // 4+3 is a nearly-full second row — leave it as-is
        cols = 4;
      } else if (n % 4 === 0) {
        cols = 4;
      } else {
        cols = 3;
        centerLastRow = n % 3 !== 0;
      }
    } else {
      // baseCols === 3
      if (n === 7) {
        cols = 4;
      } else if (n % 3 === 0) {
        cols = 3;
      } else {
        cols = 3;
        centerLastRow = true;
      }
    }
  }

  return { cols, centerLastRow };
}

const gridColsClass: Record<number, string> = {
  1: "lg:grid-cols-1",
  2: "lg:grid-cols-2",
  3: "lg:grid-cols-3",
  4: "lg:grid-cols-4",
};

/**
 * Renders a grid that avoids "orphan" cards on an incomplete last row
 * (a single lonely card, or a couple stuck at the left edge) by picking
 * a column count that either divides evenly or leaves a nearly full
 * row, and centering a genuinely partial last row when that's the
 * better-looking option.
 */
export function BalancedGrid<T>({
  items,
  baseCols,
  gapClassName = "gap-6",
  gapRem = 1.5,
  renderItem,
}: BalancedGridProps<T>) {
  const { cols, centerLastRow } = resolveLayout(items.length, baseCols);
  const remainder = items.length % cols;
  const splitAt =
    remainder === 0 || !centerLastRow ? items.length : items.length - remainder;

  const mainItems = items.slice(0, splitAt);
  const lastRowItems = items.slice(splitAt);

  const lastRowStyle = {
    "--bw-sm": `calc((100% - ${gapRem}rem) / 2)`,
    "--bw-lg": `calc((100% - ${(cols - 1) * gapRem}rem) / ${cols})`,
  } as CSSProperties;

  return (
    <div className="flex flex-col gap-6">
      {mainItems.length > 0 && (
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 ${gridColsClass[cols]} ${gapClassName}`}
        >
          {mainItems.map((item, i) => renderItem(item, i))}
        </div>
      )}
      {lastRowItems.length > 0 && (
        <div
          className={`flex flex-wrap justify-center ${gapClassName}`}
          style={lastRowStyle}
        >
          {lastRowItems.map((item, i) => (
            <div
              key={i}
              className="w-full sm:w-[var(--bw-sm)] lg:w-[var(--bw-lg)]"
            >
              {renderItem(item, mainItems.length + i)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}