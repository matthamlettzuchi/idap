import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqs } from "@/lib/data";
import { Reveal } from "@/components/ui/reveal";

export function Faq() {
  return (
    <section id="faq" className="relative bg-surface py-32">
      <div className="container-x grid grid-cols-1 gap-16 lg:grid-cols-[0.7fr_1.3fr]">
        <Reveal>
          <span className="mono-label">FAQ</span>
          <h2 className="mt-6 text-[clamp(30px,3.6vw,44px)] font-semibold">
            Pertanyaan yang
            <br />
            sering diajukan.
          </h2>
          <p className="mt-7 max-w-xs text-[15px] leading-relaxed text-ink-1">
            Tidak menemukan jawaban yang Anda cari? Tim kami siap membantu
            secara langsung.
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <Accordion type="single" collapsible defaultValue="item-0">
            {faqs.map((f, i) => (
              <AccordionItem key={f.q} value={`item-${i}`}>
                <AccordionTrigger>{f.q}</AccordionTrigger>
                <AccordionContent>{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}
