import { NetworkCanvas } from "./network-canvas";
import { Reveal } from "@/components/ui/reveal";

export function Technology() {
  return (
    <section id="teknologi" className="relative bg-void py-32">
      <div className="container-x grid grid-cols-1 gap-16 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
        <Reveal>
          <span className="mono-label">Teknologi</span>
          <h2 className="mt-6 text-[clamp(30px,3.6vw,44px)] font-semibold">
            Satu inti,
            <br />
            banyak titik integrasi.
          </h2>
          <p className="mt-7 max-w-md text-[15.5px] leading-relaxed text-ink-1">
            Setiap sistem Intidata terhubung ke Core Ledger yang sama —
            memastikan data mengalir konsisten dari sistem operasional
            internal Anda hingga ke pelaporan regulator, tanpa entri ganda
            atau rekonsiliasi manual.
          </p>
          <div className="mt-10 grid grid-cols-2 gap-6 border-t border-[var(--panel-border)] pt-8">
            <div>
              <div className="mono-label !text-signal-teal">Latensi sinkron</div>
              <div className="mt-2 font-display text-[22px] font-semibold">
                Near real-time
              </div>
            </div>
            <div>
              <div className="mono-label !text-signal-teal">Jejak audit</div>
              <div className="mt-2 font-display text-[22px] font-semibold">
                Setiap transaksi
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="panel relative aspect-[4/3.1] w-full overflow-hidden">
            <div className="grid-texture absolute inset-0 opacity-60" />
            <NetworkCanvas />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
