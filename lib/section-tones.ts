import type { CSSProperties } from "react";

type ToneVars = CSSProperties & Record<string, string>;

function tone(vars: Record<string, string>): ToneVars {
  return vars as ToneVars;
}

export const sectionTones = {
  // terang — dipakai selang-seling
  light: tone({
    "--void": "#f6f7fb",
    "--surface": "#ffffff",
    "--panel": "#ffffff",
    "--panel-2": "#f1f3f8",
    "--panel-border": "rgba(17,24,39,0.08)",
    "--panel-border-strong": "rgba(17,24,39,0.16)",
    "--ink-0": "#12141c",
    "--ink-1": "#545b6e",
    "--ink-2": "#868da0",
    "--ink-3": "#b7bcc8",
  }),

  // gelap — dipakai selang-seling
  dark: tone({
    "--void": "#0e1020",
    "--surface": "#171a2e",
    "--panel": "#171a2e",
    "--panel-2": "#0a0c18",
    "--panel-border": "rgba(255,255,255,0.09)",
    "--panel-border-strong": "rgba(255,255,255,0.18)",
    "--ink-0": "#f8f9fc",
    "--ink-1": "#c2c5da",
    "--ink-2": "#868bab",
    "--ink-3": "#565b78",
  }),
} as const;