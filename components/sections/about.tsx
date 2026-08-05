// components/sections/about.tsx
"use client";

import { Compass, Code2, Link2, ShieldCheck } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { sectionTones } from "@/lib/section-tones";

const capabilities = [
  {
    icon: Compass,
    tag: "Konsultasi",
    detail:
      "Memetakan proses operasional Anda saat ini sebelum satu baris kode pun ditulis.",
  },
  {
    icon: Code2,
    tag: "Pengembangan",
    detail:
      "Membangun sistem inti yang modular, sehingga tumbuh bersama skala bisnis Anda.",
  },
  {
    icon: Link2,
    tag: "Integrasi",
    detail:
      "Menghubungkan sistem internal Anda dengan pelaporan regulator secara langsung.",
  },
  {
    icon: ShieldCheck,
    tag: "Perawatan",
    detail:
      "Menjaga kinerja sistem tetap stabil, jauh setelah proyek dinyatakan selesai.",
  },
];

export function About() {
  return (
    <section id="tentang" style={sectionTones.dark} className="relative bg-void py-32">
      <div className="container-x grid grid-cols-1 gap-16 lg:grid-cols-[0.85fr_1.15fr]">
        <Reveal>
          <span className="mono-label">Tentang Kami</span>
          <h2 className="mt-6 text-[clamp(30px,3.6vw,44px)] font-semibold">
            Lebih dari sekadar
            <br />
            pengembang perangkat lunak.
          </h2>
          <p className="mt-7 max-w-md text-[15.5px] leading-relaxed text-ink-1">
            PT Intidata Anugrah Pratama membentuk tim yang setara dalam
            kreativitas dan kecerdasan untuk memahami kebutuhan, tantangan,
            dan sasaran bisnis setiap mitra kami.
          </p>

          {/* aksen stat kecil biar kolom kiri gak kosong */}
          <div className="mt-10 flex gap-10 border-t border-[var(--panel-border)] pt-8">
            <div>
              <div className="font-display text-[26px] font-semibold text-signal-teal">
                25+
              </div>
              <div className="mt-1 text-[12.5px] text-ink-2">
                Tahun pengalaman
              </div>
            </div>
            <div>
              <div className="font-display text-[26px] font-semibold text-signal-teal">
                17+
              </div>
              <div className="mt-1 text-[12.5px] text-ink-2">
                Klien aktif
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="grid grid-cols-1 gap-px overflow-hidden rounded-[var(--radius)] border border-[var(--panel-border)] bg-[var(--panel-border)] sm:grid-cols-2">
            {capabilities.map((c, i) => (
              <div
                key={c.tag}
                className="group relative flex flex-col justify-between bg-panel p-7 transition-colors duration-300 hover:bg-panel-2"
              >
                <div className="flex items-start justify-between">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-[var(--panel-border)] text-signal-teal transition-colors duration-300 group-hover:border-signal-teal/40 group-hover:bg-signal-blue-dim">
                    <c.icon size={19} strokeWidth={1.75} />
                  </span>
                  <span className="font-mono text-[12px] tracking-wide text-ink-2">
                    0{i + 1}
                  </span>
                </div>

                <div className="mt-8">
                  <div className="font-display text-[19px] font-medium text-ink-0">
                    {c.tag}
                  </div>
                  <p className="mt-2.5 text-[13.5px] leading-relaxed text-ink-2">
                    {c.detail}
                  </p>
                </div>

                <div className="mt-6 h-px w-full origin-left scale-x-0 bg-[image:var(--grad-signal)] transition-transform duration-500 group-hover:scale-x-100" />
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}