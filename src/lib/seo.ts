import type { BrandConfig } from "@/brand/types";

/** Brand-agnostic head/meta and schema builders. */

export interface PageSeo {
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
  imageWidth?: number;
  imageHeight?: number;
  imageType?: string;
  type?: "website" | "article";
  canonicalPath?: string;
  robots?: string;
  publishedTime?: string;
  modifiedTime?: string;
}

interface EditorialCollectionItem {
  name: string;
  url: string;
  image?: string;
  description?: string;
  type: "Article" | "TouristAttraction";
}

interface EditorialCollectionSeo extends PageSeo {
  canonicalPath: string;
  collectionName: string;
  breadcrumbParentName?: string;
  breadcrumbParentPath?: string;
  items: EditorialCollectionItem[];
}

const DEFAULT_INDEX_ROBOTS = "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";
const PAINTED_CHURCHES_PREINDEX_ROBOTS = "noindex, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";

function cleanMetaText(value: string) {
  return value.replace(/\s+/g, " ").trim();
}

export function absoluteUrl(brand: BrandConfig, value: string) {
  if (/^https?:\/\//i.test(value)) return value;
  const path = value.startsWith("/") ? value : `/${value}`;
  return `https://${brand.identity.domain}${path}`;
}

export function buildMeta(brand: BrandConfig, page: PageSeo) {
  const pageTitle = cleanMetaText(page.title);
  const description = cleanMetaText(page.description);
  const fullTitle = cleanMetaText(brand.seo.titleTemplate.replace("%s", pageTitle));
  const canonicalUrl = page.canonicalPath ? absoluteUrl(brand, page.canonicalPath) : undefined;
  const imageUrl = page.image ? absoluteUrl(brand, page.image) : undefined;
  const paintedChurchPreIndexHold = page.canonicalPath?.startsWith("/explore/painted-churches") ?? false;
  const robots = page.robots ?? (page.canonicalPath ? (paintedChurchPreIndexHold ? PAINTED_CHURCHES_PREINDEX_ROBOTS : DEFAULT_INDEX_ROBOTS) : undefined);
  const meta: Array<Record<string, string>> = [
    { title: fullTitle },
    { name: "description", content: description },
    { property: "og:title", content: fullTitle },
    { property: "og:description", content: description },
    { property: "og:type", content: page.type ?? "website" },
    { property: "og:site_name", content: brand.identity.name },
    { property: "og:locale", content: brand.identity.locale.replace("-", "_") },
    { name: "twitter:card", content: imageUrl ? "summary_large_image" : "summary" },
    { name: "twitter:title", content: fullTitle },
    { name: "twitter:description", content: description },
  ];
  if (canonicalUrl) meta.push({ property: "og:url", content: canonicalUrl });
  if (imageUrl) {
    meta.push(
      { property: "og:image", content: imageUrl },
      { property: "og:image:secure_url", content: imageUrl },
      { name: "twitter:image", content: imageUrl },
    );
    if (page.imageAlt) meta.push({ property: "og:image:alt", content: cleanMetaText(page.imageAlt) }, { name: "twitter:image:alt", content: cleanMetaText(page.imageAlt) });
    if (page.imageWidth) meta.push({ property: "og:image:width", content: String(page.imageWidth) });
    if (page.imageHeight) meta.push({ property: "og:image:height", content: String(page.imageHeight) });
    if (page.imageType) meta.push({ property: "og:image:type", content: page.imageType });
  }
  if (robots) meta.push({ name: "robots", content: robots }, { name: "googlebot", content: robots });
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

export function buildEditorialCollectionHead(brand: BrandConfig, page: EditorialCollectionSeo) {
  const pageUrl = absoluteUrl(brand, page.canonicalPath);
  const siteUrl = `https://${brand.identity.domain}`;
  const breadcrumbItems = [
    { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
    ...(page.breadcrumbParentName && page.breadcrumbParentPath
      ? [{
          "@type": "ListItem",
          position: 2,
          name: page.breadcrumbParentName,
          item: absoluteUrl(brand, page.breadcrumbParentPath),
        }]
      : []),
    {
      "@type": "ListItem",
      position: page.breadcrumbParentName && page.breadcrumbParentPath ? 3 : 2,
      name: page.collectionName,
      item: pageUrl,
    },
  ];
  const itemListElement = page.items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    item: {
      "@type": item.type,
      name: item.name,
      url: absoluteUrl(brand, item.url),
      ...(item.description ? { description: item.description } : {}),
      ...(item.image ? { image: absoluteUrl(brand, item.image) } : {}),
    },
  }));

  return {
    meta: buildMeta(brand, page),
    links: [canonicalLink(brand, page.canonicalPath)],
    scripts: [jsonLd({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "CollectionPage",
          "@id": `${pageUrl}#collection`,
          url: pageUrl,
          name: page.collectionName,
          description: page.description,
          ...(page.image
            ? {
                image: {
                  "@type": "ImageObject",
                  url: absoluteUrl(brand, page.image),
                  ...(page.imageAlt ? { caption: page.imageAlt } : {}),
                },
              }
            : {}),
          isPartOf: { "@id": `${siteUrl}/#website` },
          mainEntity: { "@id": `${pageUrl}#items` },
          breadcrumb: { "@id": `${pageUrl}#breadcrumbs` },
        },
        {
          "@type": "ItemList",
          "@id": `${pageUrl}#items`,
          numberOfItems: itemListElement.length,
          itemListElement,
        },
        {
          "@type": "BreadcrumbList",
          "@id": `${pageUrl}#breadcrumbs`,
          itemListElement: breadcrumbItems,
        },
      ],
    })],
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
