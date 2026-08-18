"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaLinkedinIn, FaInstagram, FaFacebook } from "react-icons/fa";
import { contact, nav } from "@/lib/data";
import { Logo } from "@/components/logo";
import { sectionTones } from "@/lib/section-tones";
import { supabase } from "@/lib/supabase";
import {
  defaultNavLinks,
  defaultFooterContent,
  isInternalHref,
  type SiteNavLink,
  type SiteFooterContent,
} from "@/lib/site-content-defaults";

const year = new Date().getFullYear();

type FooterProduct = {
  slug: string;
  name: string;
};

type FooterService = {
  slug: string;
  name: string;
};

export function Footer() {
  const [navLinks, setNavLinks] = useState<SiteNavLink[]>(defaultNavLinks);
  const [footerContent, setFooterContent] =
    useState<SiteFooterContent>(defaultFooterContent);
  const [products, setProducts] = useState<FooterProduct[]>([]);
  const [services, setServices] = useState<FooterService[]>([]);

  useEffect(() => {
    let cancelled = false;
    async function loadNavLinks() {
      const { data, error } = await supabase
        .from("site_nav_links")
        .select("id, label, href")
        .order("sort_order", { ascending: true });
      if (error || !data || data.length === 0 || cancelled) return;
      setNavLinks(data as SiteNavLink[]);
    }
    loadNavLinks();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    async function loadFooterContent() {
      const { data, error } = await supabase
        .from("site_footer_content")
        .select("*")
        .single();
      if (error || !data || cancelled) return;
      setFooterContent(data as SiteFooterContent);
    }
    loadFooterContent();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function loadProducts() {
      const { data, error } = await supabase
        .from("products")
        .select("slug, name, sort_order")
        .order("sort_order", { ascending: true });

      if (error || !data || cancelled) return;
      setProducts(data as FooterProduct[]);
    }

    async function loadServices() {
      const { data, error } = await supabase
        .from("services")
        .select("slug, name, sort_order")
        .order("sort_order", { ascending: true });

      if (error || !data || cancelled) return;
      setServices(data as FooterService[]);
    }

    loadProducts();
    loadServices();
    return () => {
      cancelled = true;
    };
  }, []);

  const socials = [
    ...(footerContent.facebook_url
      ? [
          {
            icon: FaFacebook,
            label: "Facebook",
            href: footerContent.facebook_url,
          },
        ]
      : []),
    ...(footerContent.instagram_url
      ? [
          {
            icon: FaInstagram,
            label: "Instagram",
            href: footerContent.instagram_url,
          },
        ]
      : []),
    ...(footerContent.linkedin_url
      ? [
          {
            icon: FaLinkedinIn,
            label: "LinkedIn",
            href: footerContent.linkedin_url,
          },
        ]
      : []),
  ];

  return (
    <footer
      style={sectionTones.dark}
      className="relative overflow-hidden border-t border-(--panel-border) bg-surface pb-10 pt-24"
    >
      <div className="constellation-texture pointer-events-none absolute inset-0 opacity-90" />

      <div className="container-x relative">
        <div className="grid grid-cols-1 gap-14 border-b border-(--panel-border) pb-16 sm:grid-cols-2 lg:grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr_0.8fr]">
          <div>
            <Logo className="h-9 w-36" />
            <p className="mt-5 max-w-70 text-[14px] leading-relaxed text-ink-1">
              {footerContent.description}
            </p>
            <p className="mt-4 max-w-70 text-[12.5px] leading-relaxed text-ink-2">
              {contact.address}
            </p>
          </div>

          <div>
            <h5 className="mono-label">Navigation</h5>
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
            <h5 className="mono-label">Products</h5>
            <ul className="mt-5 space-y-3.5">
              {products.map((p) => (
                <li key={p.slug}>
                  <a
                    href={`/products/${p.slug}`}
                    className="text-[14px] text-ink-1 transition-colors hover:text-ink-0"
                  >
                    {p.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="mono-label">Services</h5>
            <ul className="mt-5 space-y-3.5">
              {services.map((s) => (
                <li key={s.slug}>
                  <a
                    href={`/services/${s.slug}`}
                    className="text-[14px] text-ink-1 transition-colors hover:text-ink-0"
                  >
                    {s.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="mono-label">Contact</h5>
            <ul className="mt-5 space-y-3.5">
              {contact.phones.map((p) => (
                <li key={p}>
                  <a
                    href={`tel:${p.replace(/[^\d+]/g, "")}`}
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
            © {year} {footerContent.copyright_name}. All rights reserved.
          </p>
          <div className="flex gap-3">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-(--panel-border) text-ink-1 transition-all duration-200 hover:-translate-y-0.5 hover:border-signal-teal hover:text-signal-teal"
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