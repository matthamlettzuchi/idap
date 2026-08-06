import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqs } from "@/lib/data";
import { Reveal } from "@/components/ui/reveal";
import Image from "next/image";

export function Faq() {
  return (
    <section id="faq" className="relative bg-surface pb-32 pt-16">
      <div className="container-x grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center">
        <Reveal>
          <Image
            src="/faq.svg"
            alt="Ilustrasi FAQ"
            width="400"
            height="400"
            className="mb-10"
          />
          <h2 className="mt-6 text-[clamp(30px,3.6vw,44px)] font-semibold">
            Questions that
            <br />
            were asked frequently.
          </h2>
          <p className="mt-7 max-w-xs text-[15px] leading-relaxed text-ink-1">
            Didn&apos;t find the answer you&apos;re looking for?<br></br>Our team is ready to help.
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