export type HeroTheme = {
  id: string;
  label: string;
  startMonth: number;
  startDay: number;
  endMonth: number;
  endDay: number;
  backgroundImage?: string;
  backgroundWash: string;
  characterImage: string;
  characterAlt: string;
  blobGradient: string;
  greeting: string;
};

export const heroThemes: HeroTheme[] = [
  // {
  //   id: "tahun-baru",
  //   label: "Tahun Baru Masehi",
  //   startMonth: 12,
  //   startDay: 28,
  //   endMonth: 1,
  //   endDay: 3,
  //   characterImage: "/financeguy-newyear.png",
  //   characterAlt: "Financial analyst celebrating New Year",
  //   blobGradient: "radial-gradient(circle at 35% 30%, #fbbf24, #d97706 70%)",
  //   backgroundWash:
  //     "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(251,191,36,0.12), transparent 65%)",
  //   backgroundImage: "/hero-bg-newyear.jpg",
  //   greeting: "Selamat Tahun Baru",
  // },
  {
    id: "imlek",
    label: "Tahun Baru Imlek",
    startMonth: 1,
    startDay: 28,
    endMonth: 2,
    endDay: 2,
    characterImage: "/cny.png",
    characterAlt: "Financial analyst celebrating Chinese New Year",
    blobGradient: "radial-gradient(circle at 35% 30%, #fb7185, #b91c1c 70%)",
    backgroundWash:
      "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(220,38,38,0.14), transparent 65%)",
    backgroundImage: "/cnyb.png",
    greeting: "Gong Xi Fa Cai",
  },
  {
    id: "idul-fitri",
    label: "Idul Fitri",
    startMonth: 3,
    startDay: 30,
    endMonth: 4,
    endDay: 5,
    characterImage: "/ramadhan.png",
    characterAlt: "Financial analyst celebrating Eid al-Fitr",
    blobGradient: "radial-gradient(circle at 35% 30%, #34d399, #047857 70%)",
    backgroundWash:
      "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(4,120,87,0.12), transparent 65%)",
    backgroundImage: "/rmdn.png",
    greeting: "Selamat Idul Fitri",
  },
  // {
  //   id: "kemerdekaan",
  //   label: "Hari Kemerdekaan RI",
  //   startMonth: 8,
  //   startDay: 15,
  //   endMonth: 8,
  //   endDay: 18,
  //   characterImage: "/financeguy-merdeka.png",
  //   characterAlt: "Financial analyst celebrating Indonesian Independence Day",
  //   blobGradient: "radial-gradient(circle at 35% 30%, #f87171, #dc2626 70%)",
  //   backgroundWash:
  //     "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(220,38,38,0.13), transparent 65%)",
  //   backgroundImage: "/hero-bg-merdeka.jpg",
  //   greeting: "Dirgahayu Indonesia",
  // },
  {
    id: "natal",
    label: "Natal",
    startMonth: 12,
    startDay: 20,
    endMonth: 12,
    endDay: 27,
    characterImage: "/christmas.png",
    characterAlt: "Financial analyst celebrating Christmas",
    blobGradient: "radial-gradient(circle at 35% 30%, #f87171, #991b1b 70%)",
    backgroundWash:
      "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(153,27,27,0.14), transparent 65%)",
    backgroundImage: "/xmas.jpg",
    greeting: "Selamat Natal",
  },
];

function isDateInRange(month: number, day: number, theme: HeroTheme) {
  const current = month * 100 + day;
  const start = theme.startMonth * 100 + theme.startDay;
  const end = theme.endMonth * 100 + theme.endDay;

  if (start <= end) {
    return current >= start && current <= end;
  }
  return current >= start || current <= end;
}

export function getActiveHeroTheme(date: Date = new Date()): HeroTheme | null {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return heroThemes.find((theme) => isDateInRange(month, day, theme)) ?? null;
}