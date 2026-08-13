"use client";

import * as React from "react";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import {
  ChevronDown,
  Menu,
  X,
  Code2,
  Globe,
  Layers,
  Smartphone,
  Wrench,
  Palette,
  Rocket,
  Server,
  ShieldCheck,
  Cloud,
  Network,
  Building2,
  TrendingUp,
  Calculator,
  FileSpreadsheet,
  Sprout,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import { supabase } from "@/lib/supabase";

const softwareDevServices = [
  {
    title: "Custom Software Development",
    slug: "custom-software-development",
    icon: Code2,
    desc: "Bespoke systems tailored to your business regulations.",
  },
  {
    title: "Web Application Development",
    slug: "web-application-development",
    icon: Globe,
    desc: "Large-scale enterprise web applications.",
  },
  {
    title: "Full Stack Development",
    slug: "full-stack-development",
    icon: Layers,
    desc: "End-to-end frontend & backend solutions.",
  },
  {
    title: "Mobile App Development",
    slug: "mobile-app-development",
    icon: Smartphone,
    desc: "High-performance iOS & Android applications.",
  },
  {
    title: "Software Maintenance & Support",
    slug: "software-maintenance-support",
    icon: Wrench,
    desc: "Routine maintenance & guaranteed SLA.",
  },
  {
    title: "UI/UX Design Services",
    slug: "ui-ux-design-services",
    icon: Palette,
    desc: "Intuitive interface design for financial services.",
  },
  {
    title: "MVP Software Development",
    slug: "mvp-software-development",
    icon: Rocket,
    desc: "Validate business ideas with fast time-to-market.",
  },
];

const infrastructureServices = [
  {
    title: "Cloud Architecture & Hosting",
    slug: "cloud-architecture-hosting",
    icon: Cloud,
    desc: "Secure & scalable cloud infrastructure.",
  },
  {
    title: "Network Security & Compliance",
    slug: "network-security-compliance",
    icon: ShieldCheck,
    desc: "Banking-grade system protection.",
  },
  {
    title: "Server Setup & Virtualization",
    slug: "server-setup-virtualization",
    icon: Server,
    desc: "Physical & virtual server management.",
  },
  {
    title: "System Integration & API",
    slug: "system-integration-api",
    icon: Network,
    desc: "Seamless inter-system connectivity.",
  },
];

// Maps the icon *name* stored in Supabase (row.icon, e.g. "Building2") to
// the actual Lucide component. Add an entry here whenever a new icon name
// is introduced in the products table.
const navProductIconMap: Record<string, LucideIcon> = {
  Building2,
  TrendingUp,
  Calculator,
  FileSpreadsheet,
  Sprout,
};

type NavProduct = {
  code: string;
  name: string;
  desc: string;
  icon: string;
  href: string;
};

type ProductRow = {
  slug: string;
  code: string;
  name: string;
  tagline: string;
  icon: string;
  sort_order: number;
};

const navServiceIconMap: Record<string, LucideIcon> = {
  Code2,
  Globe,
  Layers,
  Smartphone,
  Wrench,
  Palette,
  Rocket,
};

type NavService = {
  code: string;
  name: string;
  desc: string;
  icon: string;
  href: string;
};

type ServiceRow = {
  slug: string;
  code: string;
  name: string;
  nav_desc: string;
  icon: string;
  sort_order: number;
};

export function Nav({ overlayHero = false }: { overlayHero?: boolean }) {
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [productList, setProductList] = React.useState<NavProduct[]>([]);
  const [dbServices, setDbServices] = React.useState<NavService[]>([]);
  const [activeDropdown, setActiveDropdown] = React.useState<
    "services" | "products" | null
  >(null);
  const [activeCategory, setActiveCategory] = React.useState<"sw" | "infra">(
    "sw",
  );
  const [mobileAccordion, setMobileAccordion] = React.useState<
    "services" | "products" | null
  >(null);

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 24);
  });

  React.useEffect(() => {
    let cancelled = false;

    async function loadProducts() {
      const { data, error } = await supabase
        .from("products")
        .select("slug, code, name, tagline, icon, sort_order")
        .order("sort_order", { ascending: true });

      if (error || !data || cancelled) return;

      setProductList(
        (data as ProductRow[]).map((row) => ({
          code: row.code,
          name: row.name,
          desc: row.tagline,
          icon: row.icon,
          href: `/products/${row.slug}`,
        })),
      );
    }

    loadProducts();
    return () => {
      cancelled = true;
    };
  }, []);

  React.useEffect(() => {
    let cancelled = false;

    async function loadServices() {
      const { data, error } = await supabase
        .from("services")
        .select("slug, code, name, nav_desc, icon, sort_order")
        .order("sort_order", { ascending: true });

      if (error || !data || cancelled) return;

      setDbServices(
        (data as ServiceRow[]).map((row) => ({
          code: row.code,
          name: row.name,
          desc: row.nav_desc,
          icon: row.icon,
          href: `/services/${row.slug}`,
        })),
      );
    }

    loadServices();
    return () => {
      cancelled = true;
    };
  }, []);

  const isLight = overlayHero && !scrolled;
  const linkClass = isLight
    ? "text-white/90 transition-colors hover:text-white"
    : "text-ink-1 transition-colors hover:text-ink-0";
  const hamburgerClass = isLight ? "text-white" : "text-ink-0";

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`border-b transition-all duration-300 ${
          scrolled
            ? "border-(--panel-border) bg-void/85 backdrop-blur-xl"
            : "border-transparent bg-transparent"
        }`}
      >
        <div className="container-x flex h-18 items-center justify-between">
          <Link href="/" className="relative flex h-12 w-32 items-center">
            <AnimatePresence mode="wait" initial={false}>
              {isLight ? (
                <motion.img
                  key="light-logo"
                  src="/logo-light.png"
                  alt="Logo"
                  className="absolute h-12 w-32 object-contain"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                />
              ) : (
                <motion.img
                  key="dark-logo"
                  src="/logo.png"
                  alt="Logo"
                  className="absolute h-12 w-32 object-contain"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                />
              )}
            </AnimatePresence>
          </Link>

          <nav className="hidden items-center gap-9 md:flex">
            <Link
              href="/about"
              className={`text-[14.5px] font-medium ${linkClass}`}
            >
              About Us
            </Link>

            {/* PRODUCTS MEGA MENU */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown("products")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                className={`flex items-center gap-1.5 py-6 text-[14.5px] font-medium ${linkClass}`}
              >
                Products{" "}
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-200 ${
                    activeDropdown === "products" ? "rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {activeDropdown === "products" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute -left-20 top-full w-170 rounded-2xl border border-(--panel-border) bg-panel p-6 shadow-2xl"
                  >
                    <div className="mono-label mb-4">Core Products Suite</div>
                    <div className="grid grid-cols-2 gap-3">
                      {productList.map((prod) => {
                        const ProdIcon =
                          navProductIconMap[prod.icon] ?? Building2;
                        return (
                          <Link
                            key={prod.name}
                            href={prod.href}
                            className="group flex items-start gap-3.5 rounded-xl border border-transparent p-3 transition-colors hover:border-(--panel-border) hover:bg-panel-2"
                          >
                            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-(--panel-border) text-signal-teal transition-colors group-hover:border-signal-teal/40 group-hover:bg-signal-blue-dim">
                              <ProdIcon size={18} />
                            </span>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-display text-[14px] font-medium text-ink-0 group-hover:text-signal-teal">
                                  {prod.name}
                                </span>
                              </div>
                              <p className="mt-1 text-[12px] leading-snug text-ink-2">
                                {prod.desc}
                              </p>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* SERVICES MEGA MENU */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown("services")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                className={`flex items-center gap-1.5 py-6 text-[14.5px] font-medium ${linkClass}`}
              >
                Services{" "}
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-200 ${
                    activeDropdown === "services" ? "rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {activeDropdown === "services" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute -left-40 top-full flex w-195 overflow-hidden rounded-2xl border border-(--panel-border) bg-panel shadow-2xl"
                  >
                    <div className="w-64 border-r border-(--panel-border) bg-panel-2 p-4">
                      <div className="mono-label mb-3 px-3">Category</div>
                      <button
                        onMouseEnter={() => setActiveCategory("sw")}
                        className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-left transition-colors ${
                          activeCategory === "sw"
                            ? "border border-(--panel-border) bg-panel text-ink-0"
                            : "text-ink-2 hover:text-ink-0"
                        }`}
                      >
                        <span className="text-[13.5px] font-medium">
                          Software Development
                        </span>
                        <ArrowRight
                          size={14}
                          className={
                            activeCategory === "sw"
                              ? "text-signal-teal"
                              : "opacity-0"
                          }
                        />
                      </button>
                    </div>

                    <div className="flex-1 p-6">
                      {activeCategory === "sw" ? (
                        <div>
                          <div className="mono-label mb-3">
                            Software Development Services
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            {dbServices.map((item) => {
                              const ServiceIcon =
                                navServiceIconMap[item.icon] ?? Code2;
                              return (
                                <Link
                                  key={item.href}
                                  href={item.href}
                                  className="group flex items-start gap-3 rounded-lg p-2.5 hover:bg-panel-2"
                                >
                                  <ServiceIcon
                                    size={16}
                                    className="mt-0.5 shrink-0 text-signal-teal"
                                  />
                                  <div>
                                    <div className="text-[13px] font-medium text-ink-0 group-hover:text-signal-teal">
                                      {item.name}
                                    </div>
                                    <div className="line-clamp-1 text-[11px] text-ink-2">
                                      {item.desc}
                                    </div>
                                  </div>
                                </Link>
                              );
                            })}
                          </div>
                        </div>
                      ) : (
                        <div>
                          <div className="mono-label mb-3">
                            Infrastructure & Security
                          </div>
                          <div className="grid grid-cols-1 gap-2">
                            {infrastructureServices.map((item) => (
                              <Link
                                key={item.slug}
                                href={`/services/${item.slug}`}
                                className="group flex items-start gap-3 rounded-lg p-2.5 hover:bg-panel-2"
                              >
                                <item.icon
                                  size={16}
                                  className="mt-0.5 shrink-0 text-signal-teal"
                                />
                                <div>
                                  <div className="text-[13px] font-medium text-ink-0 group-hover:text-signal-teal">
                                    {item.title}
                                  </div>
                                  <div className="text-[11px] text-ink-2">
                                    {item.desc}
                                  </div>
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              href="/credit-simulation"
              className={`text-[14.5px] font-medium ${linkClass}`}
            >
              Credit Simulation
            </Link>

            <Link
              href="/contact"
              className={`text-[14.5px] font-medium ${linkClass}`}
            >
              Contact
            </Link>
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <Button asChild size="sm" variant="primary">
              <Link href="https://wa.me/+6282211581769">Hubungi Kami</Link>
            </Button>
          </div>

          <button
            className={`flex h-9 w-9 items-center justify-center md:hidden ${hamburgerClass}`}
            aria-label="Buka menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation Menu */}
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          className="max-h-[calc(100vh-72px)] overflow-y-auto border-b border-(--panel-border) bg-void/95 backdrop-blur-xl md:hidden"
        >
          <div className="container-x flex flex-col gap-4 py-6">
            <Link
              href="/about"
              onClick={() => setOpen(false)}
              className="font-display text-[18px] font-medium text-ink-0"
            >
              About Us
            </Link>

            {/* Mobile Products Collapsible */}
            <div>
              <button
                onClick={() =>
                  setMobileAccordion(
                    mobileAccordion === "products" ? null : "products",
                  )
                }
                className="flex w-full items-center justify-between font-display text-[18px] font-medium text-ink-0"
              >
                <span>Products</span>
                <ChevronDown
                  size={18}
                  className={`transition-transform ${
                    mobileAccordion === "products" ? "rotate-180" : ""
                  }`}
                />
              </button>
              {mobileAccordion === "products" && (
                <div className="mt-3 flex flex-col gap-3 border-l border-(--panel-border) pl-4">
                  {productList.map((prod) => {
                    const ProdIcon = navProductIconMap[prod.icon] ?? Building2;
                    return (
                      <Link
                        key={prod.name}
                        href={prod.href}
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-2 text-[14px] text-ink-1 hover:text-signal-teal"
                      >
                        <ProdIcon size={16} className="text-signal-teal" />
                        <span>{prod.name}</span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Mobile Services Collapsible with Slugs */}
            <div>
              <button
                onClick={() =>
                  setMobileAccordion(
                    mobileAccordion === "services" ? null : "services",
                  )
                }
                className="flex w-full items-center justify-between font-display text-[18px] font-medium text-ink-0"
              >
                <span>Services</span>
                <ChevronDown
                  size={18}
                  className={`transition-transform ${
                    mobileAccordion === "services" ? "rotate-180" : ""
                  }`}
                />
              </button>
              {mobileAccordion === "services" && (
                <div className="mt-3 flex flex-col gap-3 border-l border-(--panel-border) pl-4">
                  <div className="mono-label text-[11px]">
                    Software Development
                  </div>
                  {dbServices.map((item) => {
                    const ServiceIcon = navServiceIconMap[item.icon] ?? Code2;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-2 text-[14px] text-ink-1 hover:text-signal-teal"
                      >
                        <ServiceIcon size={16} className="text-signal-teal" />
                        <span>{item.name}</span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            <Link
              href="/credit-simulation"
              onClick={() => setOpen(false)}
              className="font-display text-[18px] font-medium text-ink-0"
            >
              Credit Simulation
            </Link>

            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="font-display text-[18px] font-medium text-ink-0"
            >
              Contact
            </Link>

            <Button asChild variant="primary" className="mt-4 w-full">
              <Link href="/contact" onClick={() => setOpen(false)}>
                Hubungi Kami
              </Link>
            </Button>
          </div>
        </motion.div>
      )}
    </header>
  );
}
