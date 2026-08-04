import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/providers/smooth-scroll";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
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
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="min-h-full bg-void text-ink-0">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}