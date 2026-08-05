"use client";

import { motion } from "framer-motion";
import { FaLinkedinIn, FaInstagram, FaFacebook } from "react-icons/fa";
import { contact, nav, products } from "@/lib/data";
import { Logo } from "@/components/logo";
import { sectionTones } from "@/lib/section-tones";

const year = new Date().getFullYear();

const socials = [
  { icon: FaFacebook, label: "Facebook", href: "#" },
  { icon: FaInstagram, label: "Instagram", href: "#" },
  { icon: FaLinkedinIn, label: "LinkedIn", href: "#" },
];

export function Footer() {
  return (
    <footer style={sectionTones.dark} className="relative overflow-hidden border-t border-[var(--panel-border)] bg-surface pb-10 pt-24">
      <motion.div
        aria-hidden
        animate={{ x: ["-10%", "10%", "-10%"] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -top-24 left-1/4 h-[420px] w-[420px] rounded-full opacity-10 blur-[110px]"
        style={{
          background: "radial-gradient(circle, var(--signal-blue), transparent 65%)",
        }}
      />

      <div className="container-x relative">
        <div className="grid grid-cols-1 gap-14 border-b border-[var(--panel-border)] pb-16 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo className="h-9 w-36" />
            <p className="mt-5 max-w-[280px] text-[14px] leading-relaxed text-ink-1">
              PT Intidata Anugrah Pratama — solusi konsultasi IT terintegrasi
              bagi sektor korporasi maupun publik.
            </p>
            <p className="mt-4 max-w-[280px] text-[12.5px] leading-relaxed text-ink-2">
              {contact.address}
            </p>
          </div>

          <div>
            <h5 className="mono-label">Navigasi</h5>
            <ul className="mt-5 space-y-3.5">
              {nav.map((n) => (
                <li key={n.href}>
                  <a
                    href={n.href}
                    className="text-[14px] text-ink-1 transition-colors hover:text-ink-0"
                  >
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="mono-label">Produk</h5>
            <ul className="mt-5 space-y-3.5">
              {products.map((p) => (
                <li key={p.id}>
                  <a
                    href="#produk"
                    className="text-[14px] text-ink-1 transition-colors hover:text-ink-0"
                  >
                    {p.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="mono-label">Kontak</h5>
            <ul className="mt-5 space-y-3.5">
              {contact.phones.map((p) => (
                <li key={p}>
                  <a
                    href={`tel:${p.replace(/-/g, "")}`}
                    className="text-[14px] text-ink-1 transition-colors hover:text-ink-0"
                  >
                    {p}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={`mailto:${contact.email}`}
                  className="text-[14px] text-ink-1 transition-colors hover:text-ink-0"
                >
                  {contact.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-6 pt-8">
          <p className="text-[12.5px] text-ink-2">
            © {year} Intidata Anugrah Pratama. Seluruh hak cipta dilindungi.
          </p>
          <div className="flex gap-3">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--panel-border)] text-ink-1 transition-all duration-200 hover:-translate-y-0.5 hover:border-signal-teal hover:text-signal-teal"
              >
                <s.icon size={15} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}