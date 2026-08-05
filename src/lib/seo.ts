import type { BrandConfig } from "@/brand/types";

/** Brand-agnostic head/meta and schema builders. */

export interface PageSeo {
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
  type?: "website" | "article";
  canonicalPath?: string;
  robots?: string;
  publishedTime?: string;
  modifiedTime?: string;
}

export function absoluteUrl(brand: BrandConfig, value: string) {
  if (/^https?:\/\//i.test(value)) return value;
  const path = value.startsWith("/") ? value : `/${value}`;
  return `https://${brand.identity.domain}${path}`;
}

export function buildMeta(brand: BrandConfig, page: PageSeo) {
  const fullTitle = brand.seo.titleTemplate.replace("%s", page.title);
  const canonicalUrl = page.canonicalPath ? absoluteUrl(brand, page.canonicalPath) : undefined;
  const imageUrl = page.image ? absoluteUrl(brand, page.image) : undefined;
  const meta: Array<Record<string, string>> = [
    { title: fullTitle },
    { name: "description", content: page.description },
    { property: "og:title", content: fullTitle },
    { property: "og:description", content: page.description },
    { property: "og:type", content: page.type ?? "website" },
    { property: "og:site_name", content: brand.identity.name },
    { property: "og:locale", content: brand.identity.locale.replace("-", "_") },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: fullTitle },
    { name: "twitter:description", content: page.description },
  ];
  if (canonicalUrl) meta.push({ property: "og:url", content: canonicalUrl });
  if (imageUrl) {
    meta.push({ property: "og:image", content: imageUrl }, { name: "twitter:image", content: imageUrl });
    if (page.imageAlt) meta.push({ property: "og:image:alt", content: page.imageAlt }, { name: "twitter:image:alt", content: page.imageAlt });
  }
  if (page.robots) meta.push({ name: "robots", content: page.robots });
  if (page.publishedTime) meta.push({ property: "article:published_time", content: page.publishedTime });
  if (page.modifiedTime) meta.push({ property: "article:modified_time", content: page.modifiedTime });
  if (brand.seo.twitterSite) meta.push({ name: "twitter:site", content: brand.seo.twitterSite });
  return meta;
}

export function canonicalLink(brand: BrandConfig, path: string) {
  return { rel: "canonical", href: absoluteUrl(brand, path) };
}

export function buildSeoHead(brand: BrandConfig, page: PageSeo) {
  return {
    meta: buildMeta(brand, page),
    links: page.canonicalPath ? [canonicalLink(brand, page.canonicalPath)] : [],
  };
}

export function jsonLd(data: Record<string, unknown>) {
  return {
    type: "application/ld+json",
    children: JSON.stringify(data),
  };
}

export function schemaTypeForEntityKind(kind: string) {
  const normalized = kind.toLowerCase();
  if (normalized === "city" || normalized === "town") return "City";
  if (normalized === "county" || normalized === "region") return "AdministrativeArea";
  if (normalized === "lake" || normalized === "river") return "BodyOfWater";
  if (normalized === "park") return "Park";
  if (normalized === "event") return "Event";
  if (normalized === "organization" || normalized === "agency") return "Organization";
  if (normalized === "person") return "Person";
  if (normalized === "attraction" || normalized === "destination") return "TouristAttraction";
  return "Place";
}
