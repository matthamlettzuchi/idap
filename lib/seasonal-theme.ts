export type SeasonalDecoration = "lampion" | "ramadan" | "snow";
export type EnvelopeIcon = "cny" | "ramadan" | "christmas";

export type SeasonalTheme = {
  id: string;
  label: string;
  startMonth: number;
  startDay: number;
  endMonth: number;
  endDay: number;
  decoration: SeasonalDecoration;
  envelopeIcon: EnvelopeIcon;
  accent: string;
  envelopeTitle: string;
  envelopeMessage: string;
};

// fallback kalau tabel Supabase kosong/error
export const defaultSeasonalThemes: SeasonalTheme[] = [
  {
    id: "imlek",
    label: "Tahun Baru Imlek",
    startMonth: 1,
    startDay: 28,
    endMonth: 2,
    endDay: 2,
    decoration: "lampion",
    envelopeIcon: "cny",
    accent: "#dc2626",
    envelopeTitle: "Gong Xi Fa Cai",
    envelopeMessage:
      "Selamat Tahun Baru Imlek dari seluruh tim Intidata. Semoga tahun ini membawa kelancaran, kesehatan, dan keberkahan bagi seluruh mitra dan keluarga besar kami.",
  },
  {
    id: "ramadan",
    label: "Ramadan",
    startMonth: 2,
    startDay: 18,
    endMonth: 3,
    endDay: 29,
    decoration: "ramadan",
    envelopeIcon: "ramadan",
    accent: "#b45309",
    envelopeTitle: "Marhaban Ya Ramadan",
    envelopeMessage:
      "Menyambut bulan suci Ramadan, seluruh tim Intidata mengucapkan selamat menjalankan ibadah puasa. Semoga senantiasa diberi kelancaran dan keberkahan.",
  },
  {
    id: "natal",
    label: "Natal",
    startMonth: 12,
    startDay: 20,
    endMonth: 12,
    endDay: 27,
    decoration: "snow",
    envelopeIcon: "christmas",
    accent: "#991b1b",
    envelopeTitle: "Selamat Natal",
    envelopeMessage:
      "Selamat Hari Natal dari seluruh tim Intidata. Semoga kehangatan dan sukacita musim ini menyertai Anda dan keluarga.",
  },
];

function isDateInRange(month: number, day: number, theme: SeasonalTheme) {
  const current = month * 100 + day;
  const start = theme.startMonth * 100 + theme.startDay;
  const end = theme.endMonth * 100 + theme.endDay;
  if (start <= end) return current >= start && current <= end;
  return current >= start || current <= end;
}

export function pickActiveSeasonalTheme(
  themes: SeasonalTheme[],
  date: Date = new Date(),
): SeasonalTheme | null {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return themes.find((t) => isDateInRange(month, day, t)) ?? null;
}