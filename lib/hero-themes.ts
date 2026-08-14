export type HeroTheme = {
  id: string;
  label: string;
  startMonth: number;
  startDay: number;
  endMonth: number;
  endDay: number;
  scale: number;
  imageOffsetY: number;
  backgroundImage?: string;
  backgroundWash: string;
  characterImage: string;
  characterAlt: string;
  blobGradient: string;
  greeting: string;
};

import { storageUrl } from "./storage";

export const defaultHeroThemes: HeroTheme[] = [
  {
    id: "imlek",
    label: "Tahun Baru Imlek",
    startMonth: 1,
    startDay: 28,
    endMonth: 2,
    endDay: 2,
    scale: 1.3,
    imageOffsetY: -25,
    characterImage: storageUrl("images", "/cny.png"),
    characterAlt: "Financial analyst celebrating Chinese New Year",
    blobGradient: "radial-gradient(circle at 35% 30%, #fb7185, #b91c1c 70%)",
    backgroundWash:
      "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(220,38,38,0.14), transparent 65%)",
    backgroundImage: storageUrl("images", "/cnyb.png"),
    greeting: "Gong Xi Fa Cai",
  },
  {
    id: "idul-fitri",
    label: "Idul Fitri",
    startMonth: 3,
    startDay: 30,
    endMonth: 4,
    endDay: 5,
    scale: 1.2,
    imageOffsetY: 20,
    characterImage: storageUrl("images", "ramadhan.png"),
    backgroundImage: storageUrl("images", "rmdn.png"),
    characterAlt: "Financial analyst celebrating Eid al-Fitr",
    blobGradient: "radial-gradient(circle at 35% 30%, #34d399, #047857 70%)",
    backgroundWash:
      "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(4,120,87,0.12), transparent 65%)",
    greeting: "Selamat Idul Fitri",
  },
  {
    id: "natal",
    label: "Natal",
    startMonth: 12,
    startDay: 20,
    endMonth: 12,
    endDay: 27,
    scale: 1.3,
    imageOffsetY: -10,
    characterImage: storageUrl("images", "christmas.png"),
    backgroundImage: storageUrl("images", "xmas.jpg"),
    characterAlt: "Financial analyst celebrating Christmas",
    blobGradient: "radial-gradient(circle at 35% 30%, #f87171, #991b1b 70%)",
    backgroundWash:
      "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(153,27,27,0.14), transparent 65%)",
    greeting: "Selamat Natal",
  },
];

function isDateInRange(month: number, day: number, theme: HeroTheme) {
  const current = month * 100 + day;
  const start = theme.startMonth * 100 + theme.startDay;
  const end = theme.endMonth * 100 + theme.endDay;
  if (start <= end) return current >= start && current <= end;
  return current >= start || current <= end;
}

export function pickActiveHeroTheme(
  themes: HeroTheme[],
  date: Date = new Date(),
): HeroTheme | null {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return themes.find((t) => isDateInRange(month, day, t)) ?? null;
}
