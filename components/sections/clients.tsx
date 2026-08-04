import { clients } from "@/lib/data";
import { Marquee } from "@/components/marquee";
import { Reveal } from "@/components/ui/reveal";

const rowA = clients.filter((_, i) => i % 2 === 0);
const rowB = clients.filter((_, i) => i % 2 === 1);

export function Clients() {
  return (
    <section id="klien" className="relative overflow-hidden bg-void py-32">
      <div className="container-x mb-16">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-end">
          <Reveal>
            <span className="mono-label">Klien</span>
            <h2 className="mt-6 text-[clamp(30px,3.6vw,44px)] font-semibold">
              Dipercaya lintas
              <br />
              industri keuangan.
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="max-w-md text-[15.5px] leading-relaxed text-ink-1 lg:justify-self-end lg:text-right">
              Dari lembaga multifinance hingga institusi keuangan global —
              inilah sebagian mitra yang telah bekerja sama dengan kami.
            </p>
          </Reveal>
        </div>
      </div>

      <div className="flex flex-col gap-6 border-y border-[var(--panel-border)] py-10">
        <Marquee items={rowA} duration={38} />
        <Marquee items={rowB} reverse duration={44} />
      </div>
    </section>
  );
}
