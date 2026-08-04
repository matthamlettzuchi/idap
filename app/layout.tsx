import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/providers/smooth-scroll";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Intidata — Sistem Inti untuk Lembaga Keuangan & Korporasi",
  description:
    "PT Intidata Anugrah Pratama — solusi konsultasi IT terintegrasi untuk sektor korporasi dan publik: FISCUS Multifinance, Factoring, Accounting, Planta, dan SLIK/SILARAS Report.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="id"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrains.variable}`}
    >
      <body className="min-h-full bg-void text-ink-0">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}