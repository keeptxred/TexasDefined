import type { BrandConfig } from "@/brand/types";

/** Brand-agnostic head/meta builders. */

export interface PageSeo {
  title: string;
  description: string;
  image?: string;
  type?: "website" | "article";
  canonicalPath?: string;
}

export function buildMeta(brand: BrandConfig, page: PageSeo) {
  const fullTitle = brand.seo.titleTemplate.replace("%s", page.title);
  const meta: Array<Record<string, string>> = [
    { title: fullTitle },
    { name: "description", content: page.description },
    { property: "og:title", content: fullTitle },
    { property: "og:description", content: page.description },
    { property: "og:type", content: page.type ?? "website" },
    { property: "og:site_name", content: brand.identity.name },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: fullTitle },
    { name: "twitter:description", content: page.description },
  ];
  if (brand.seo.twitterSite) meta.push({ name: "twitter:site", content: brand.seo.twitterSite });
  return meta;
}

export function canonicalLink(brand: BrandConfig, path: string) {
  return { rel: "canonical", href: `https://${brand.identity.domain}${path}` };
}

export function jsonLd(data: Record<string, unknown>) {
  return {
    type: "application/ld+json",
    children: JSON.stringify(data),
  };
}
