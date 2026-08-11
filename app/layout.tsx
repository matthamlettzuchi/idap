import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/providers/smooth-scroll";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.intidatasolution.com"),
  title: "Intidata — Sistem Inti untuk Lembaga Keuangan & Korporasi",
  description:
    "PT Intidata Anugrah Pratama — solusi konsultasi IT terintegrasi untuk sektor korporasi dan publik: FISCUS Multifinance, Factoring, Accounting, Planta, dan SLIK/SILARAS Report.",
  openGraph: {
    type: "website",
    locale: "id_ID",
    siteName: "Intidata",
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" className={`${plusJakarta.variable} ${geistMono.variable}`}>
      <body className="min-h-full bg-void text-ink-0">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
