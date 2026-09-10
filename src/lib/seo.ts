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
const META_DESCRIPTION_MAX_LENGTH = 160;

type TechnicalSeoOverride = { title: string; description?: string };

const TEXASDEFINED_TECHNICAL_SEO_OVERRIDES: Record<string, TechnicalSeoOverride> = {
  "/county/bexar": { title: "Bexar County, Texas Guide" },
  "/explore": { title: "Explore Texas: Places, Road Trips & Outdoors" },
  "/explore/top-attractions": { title: "Top 25 Texas Attractions" },
  "/explore/road-trips": {
    title: "Texas Road Trips & Scenic Drives",
    description: "Plan Texas road trips with scenic drives, regional routes, stop-by-stop itineraries, parks, small towns and practical trip-planning details.",
  },
  "/explore/landscapes/where-does-texas-turn-into-desert": {
    title: "Where Does Texas Turn Into Desert? Texas Regions Explained",
    description: "See where Texas shifts from plains and Hill Country into Chihuahuan Desert landscapes, and how elevation, rainfall and geography define the transition.",
  },
  "/texas-history": { title: "Texas History: People, Places & Stories" },
  "/texas-explained": { title: "Texas Explained: How the State Works" },
  "/texas-closing-cost-calculator": { title: "Texas Closing Cost Calculator" },
  "/texas-property-tax-estimator": { title: "Texas Property Tax Estimator" },
  "/texas-home-equity-calculator": { title: "Texas Home Equity Calculator" },
  "/texas-moving-cost-calculator": {
    title: "Texas Moving Cost Calculator: Move Budget",
    description: "Estimate the full cost of moving to or within Texas, including transportation, packing, travel, deposits, setup costs and a contingency for the unexpected.",
  },
  "/property-tax-calculators": { title: "Texas Property Tax Calculators" },
  "/fishing": { title: "Texas Fishing Guide | Lakes & Species" },
  "/sports-venues": { title: "Texas Stadiums & Sports Venues" },
  "/events": { title: "Texas Events & Festivals" },
  "/destination/palo-duro-canyon-state-park": { title: "Palo Duro Canyon State Park Guide" },
  "/texas-vs/california": { title: "Texas vs California: Cost & Living" },
  "/article/texas-wildlife-guide": { title: "Texas Wildlife Guide: Animals & Habitats" },
  "/article/texas-regions-explained": {
    title: "Texas Landforms & Regions: Mountains, Plains, Coast & More",
    description: "Explore Texas landforms and regions, from the Hill Country and Piney Woods to the Gulf Coast, High Plains, Big Bend mountains, basins and South Texas.",
  },
  "/article/texas-farm-to-market-roads-explained": { title: "Texas Farm-to-Market Roads Explained" },
  "/article/beginners-guide-ordering-texas-barbecue": { title: "How to Order Texas Barbecue" },
  "/article/texas-septic-systems-homeowner-guide": {
    title: "Texas Septic System Design & OSSF Guide",
    description: "Texas septic system design guide covering OSSF site evaluation, permits, conventional and aerobic systems, drainfields, approved plans and homeowner maintenance.",
  },
  "/article/texas-rio-grande-river-guide": {
    title: "Rio Grande in Texas: Basin, Border, Reservoirs & River Guide",
    description: "Guide to the Rio Grande in Texas, from desert canyons and the border to Amistad, Falcon, water treaties, irrigation and the river's Gulf outlet.",
  },
  "/article/texas-major-cities-regional-differences": {
    title: "Major Texas Cities Compared: Houston, DFW, Austin & San Antonio",
    description: "Compare Houston, Dallas-Fort Worth, Austin, San Antonio and Texas regions on climate, culture, jobs, driving and daily life before choosing where to live.",
  },
  "/article/texas-national-parks-big-bend-guadalupe-guide": {
    title: "Big Bend & Guadalupe Mountains National Parks: Texas Guide",
    description: "Compare Big Bend National Park and Guadalupe Mountains National Park in Texas, including landscapes, hiking, access, seasons and which park fits your trip.",
  },
};

// These high-impression snippet experiments matter to server-rendered search output but are
// deliberately excluded from the browser bundle. Client navigation falls back to each page's
// existing metadata; canonical SSR output carries the GSC-aligned title/description.
const TEXASDEFINED_GSC_SSR_OVERRIDES: Record<string, TechnicalSeoOverride> = import.meta.env.SSR ? {
  "/article/texas-rivers-explained": {
    title: "Major Rivers in Texas: Boundary Rivers, Regions & Basins",
    description: "Find Texas's major and boundary rivers by region, from the Rio Grande and Red to the Brazos, Colorado, Guadalupe, Trinity, Sabine and Neches.",
  },
  "/article/texas-river-basins-guide": {
    title: "Texas River Basins: 15 Major & 8 Coastal Basins",
    description: "Learn how Texas's 15 major and eight coastal basins divide the state by watershed, and how rivers, reservoirs, cities and the Gulf connect.",
  },
  "/article/texas-lakes-reservoirs-explained": {
    title: "Texas Lakes & Reservoirs: Why Most Are Man-Made",
    description: "See why most familiar inland Texas lakes are reservoirs built for water supply and flood control, including Lake Travis, Texoma and Canyon Lake.",
  },
  "/article/texas-highway-designations-explained": {
    title: "Texas Road Names: What FM, RM, SH, Loop & Spur Mean",
    description: "Decode Texas road designations: FM and RM roads, State Highways, Loops and Spurs.",
  },
  "/article/texas-school-districts-explained": {
    title: "What Does ISD Stand For in Texas? School District Guide",
    description: "ISD means Independent School District. Learn why city limits and ZIP codes do not determine school districts, campus zones or local school taxes.",
  },
  "/article/why-texas-has-254-counties": {
    title: "Why Does Texas Have 254 Counties? History & County Seats",
    description: "Texas has more counties than any other state. See how distance, settlement, county seats and 19th-century travel created the 254-county map.",
  },
  "/sports-venue/legacy-stadium-katy": {
    title: "Legacy Stadium Katy: Parking, Events & Visitor Guide",
    description: "Plan a Legacy Stadium visit in Katy with verified parking, arrival, event, official venue and map links for Katy ISD football and UIL playoff games.",
  },
  "/sports-venue/eagle-stadium-allen": {
    title: "Eagle Stadium Allen: Parking & Football Guide",
    description: "Plan Eagle Stadium in Allen with verified parking, arrival and official venue links for Allen Eagles football, UIL playoffs and game nights.",
  },
  "/sports-venue/mesquite-memorial-stadium": {
    title: "Mesquite Memorial Stadium: Parking, Tickets & Events",
    description: "Plan Mesquite Memorial Stadium with verified parking, directions, ticket and event links for Mesquite ISD football, soccer and UIL games.",
  },
  "/sports-venue/mckinney-isd-stadium": {
    title: "McKinney ISD Stadium: Parking, Events & Visitor Guide",
    description: "Plan a McKinney ISD Stadium visit with verified parking, arrival, event-day and official venue links for football and community events.",
  },
} : {};

const SOCIAL_IMAGE_FALLBACKS: Partial<Record<BrandConfig["identity"]["id"], { src: string; alt: string; type: string }>> = {
  texasdefined: {
    src: "/images/state-parks/palo-duro-canyon-state-park.jpg",
    alt: "Palo Duro Canyon, one of the landscapes that define Texas",
    type: "image/jpeg",
  },
};

function cleanMetaText(value: string) {
  return value.replace(/\s+/g, " ").trim();
}

function cleanMetaDescription(value: string) {
  const cleaned = cleanMetaText(value);
  if (cleaned.length <= META_DESCRIPTION_MAX_LENGTH) return cleaned;
  const slice = cleaned.slice(0, META_DESCRIPTION_MAX_LENGTH - 1);
  const wordBoundary = slice.lastIndexOf(" ");
  const trimmed = (wordBoundary >= 120 ? slice.slice(0, wordBoundary) : slice).replace(/[,:;\s]+$/, "");
  return `${trimmed}.`;
}

export function absoluteUrl(brand: BrandConfig, value: string) {
  if (/^https?:\/\//i.test(value)) return value;
  const path = value.startsWith("/") ? value : `/${value}`;
  return `https://${brand.identity.domain}${path}`;
}

export function buildMeta(brand: BrandConfig, page: PageSeo) {
  const technicalOverride = brand.identity.id === "texasdefined" && page.canonicalPath
    ? TEXASDEFINED_GSC_SSR_OVERRIDES[page.canonicalPath] ?? TEXASDEFINED_TECHNICAL_SEO_OVERRIDES[page.canonicalPath]
    : undefined;
  const pageTitle = cleanMetaText(technicalOverride?.title ?? page.title);
  const description = cleanMetaDescription(technicalOverride?.description ?? page.description);
  const fullTitle = cleanMetaText(brand.seo.titleTemplate.replace("%s", pageTitle));
  const canonicalUrl = page.canonicalPath ? absoluteUrl(brand, page.canonicalPath) : undefined;
  const fallbackImage = SOCIAL_IMAGE_FALLBACKS[brand.identity.id];
  const image = page.image
    ? { src: page.image, alt: page.imageAlt, type: page.imageType }
    : fallbackImage;
  const imageUrl = image ? absoluteUrl(brand, image.src) : undefined;
  const robots = page.robots ?? (page.canonicalPath ? DEFAULT_INDEX_ROBOTS : undefined);
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
    if (image?.alt) meta.push({ property: "og:image:alt", content: cleanMetaText(image.alt) }, { name: "twitter:image:alt", content: cleanMetaText(image.alt) });
    if (page.imageWidth) meta.push({ property: "og:image:width", content: String(page.imageWidth) });
    if (page.imageHeight) meta.push({ property: "og:image:height", content: String(page.imageHeight) });
    if (image?.type) meta.push({ property: "og:image:type", content: image.type });
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