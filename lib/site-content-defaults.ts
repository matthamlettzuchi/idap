export type SiteNavLink = { id?: number; label: string; href: string };

export type SiteButtons = {
  nav_cta_label: string;
  nav_cta_href: string;
  hero_primary_label: string;
  hero_primary_href: string;
  hero_secondary_label: string;
  hero_secondary_href: string;
};

export type SiteFooterContent = {
  description: string;
  facebook_url: string | null;
  instagram_url: string | null;
  linkedin_url: string | null;
  copyright_name: string;
};

// Used by nav.tsx / footer.tsx / hero.tsx whenever the Supabase table is
// empty or the query fails — mirrors the current hardcoded content exactly,
// same fallback pattern as staticProducts / staticTestimonials in lib/data.ts.
export const defaultNavLinks: SiteNavLink[] = [
  { label: "About Us", href: "/about" },
  { label: "Credit Simulation", href: "/credit-simulation" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export const defaultSiteButtons: SiteButtons = {
  nav_cta_label: "Hubungi Kami",
  nav_cta_href: "https://wa.me/+6282211581769",
  hero_primary_label: "Contact Us",
  hero_primary_href: "#kontak",
  hero_secondary_label: "View Products",
  hero_secondary_href: "#produk",
};

export const defaultFooterContent: SiteFooterContent = {
  description:
    "PT Intidata Anugrah Pratama — integrated IT consulting solutions for corporate and public sectors.",
  facebook_url: "https://www.facebook.com/profile.php?id=61550206097624",
  instagram_url: "https://www.instagram.com/fiscus_intidata?",
  linkedin_url: "https://id.linkedin.com/company/pt.-intidata-anugrah-pratama",
  copyright_name: "Intidata Anugrah Pratama",
};

// A link is treated as internal (Next <Link>) if it starts with "/" or "#",
// otherwise rendered as a plain <a> (external URLs, tel:, mailto:, wa.me).
export function isInternalHref(href: string) {
  return href.startsWith("/") || href.startsWith("#");
}