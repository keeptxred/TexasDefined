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
  "/event/westfest": {
    title: "Westfest Texas: Dates, Parade, Schedule & Hours",
    description: "Plan Westfest in West, Texas with the current date guidance, parade information, schedule and hours sources, admission details and trip-planning links.",
  },
  "/event/heart-o-texas-fair-rodeo": {
    title: "Heart O' Texas Fair & Rodeo 2026: Dates & Schedule",
    description: "The 2026 Heart O' Texas Fair & Rodeo runs Oct. 8-18 in Waco. Check fair hours, One HOT Rodeo dates, ticket rules and official planning links.",
  },
  "/event/sweetwater-rattlesnake-roundup": {
    title: "Sweetwater Rattlesnake Roundup: Dates & Visitor Guide",
    description: "Plan the Sweetwater Jaycees Rattlesnake Roundup with date guidance, official sources, event details and practical Nolan County trip planning.",
  },
  "/texas-symbols": {
    title: "Texas State Symbols: Official List, Meanings & State Icons",
    description: "Explore Texas state symbols and official designations, from the flag, flower and bird to foods, animals, plants and other Lone Star State icons.",
  },
  "/article/republic-of-texas-navy-history": {
    title: "Republic of Texas Navy: Ships, Battles & History",
    description: "Explore the Republic of Texas Navy, its ships, commanders, Gulf operations, battles and role in defending the independent republic from 1836 to 1846.",
  },
  "/event/charro-days-fiesta": {
    title: "Charro Days Fiesta: Dates, Parade & Brownsville Guide",
    description: "Plan Charro Days Fiesta in Brownsville with current date guidance, parade and event information, official sources and Rio Grande Valley trip planning.",
  },
  "/event/hidalgo-borderfest": {
    title: "BorderFest Hidalgo: Dates, Schedule & Visitor Guide",
    description: "Plan BorderFest in Hidalgo, Texas with current dates, schedule guidance, official event sources and practical Rio Grande Valley visitor information.",
  },
  "/texas-rock-rockabilly": {
    title: "Texas Rock & Rockabilly: Artists, History & Sound",
    description: "Explore Texas rock and rockabilly through the artists, scenes, venues and sounds that helped shape the state's place in American music history.",
  },
  "/article/battleship-texas-bb-35-history-restoration": {
    title: "Battleship Texas (BB-35): History & Restoration",
    description: "Follow Battleship Texas BB-35 from World War I and World War II service through preservation, dry-dock work, restoration and its Texas legacy.",
  },
  "/event/floresville-peanut-festival": {
    title: "Floresville Peanut Festival 2026: Dates, Schedule & Tickets",
    description: "Plan the 2026 Floresville Peanut Festival with verified dates, parade and schedule information, ticket details, official sources and Wilson County context.",
  },
  "/sports-venue/childrens-health-stadium-prosper": {
    title: "Children's Health Stadium Prosper: Parking & Events",
    description: "Plan a Children's Health Stadium visit in Prosper with parking, arrival, event-day and official venue links for football, soccer and community events.",
  },
  "/event/dallas-holiday-parade": {
    title: "Dallas Holiday Parade 2026: Date, Route & Planning Guide",
    description: "Dallas Holiday Parade 2026 planning date: Dec. 5, based on the organizer's first-Saturday rule. See route, 9 a.m. start, viewing and DART guidance.",
  },
  "/event/houston-thanksgiving-day-parade": {
    title: "Houston Thanksgiving Parade 2026: Date, Time & Route",
    description: "Houston's H-E-B Thanksgiving Day Parade is Nov. 26, 2026 at 9 a.m. downtown. See official route, viewing, closures and arrival-planning guidance.",
  },
  "/event/texas-rose-festival": {
    title: "Texas Rose Festival 2026: Tyler Dates, Parade & Schedule",
    description: "Plan the 2026 Texas Rose Festival in Tyler with official dates, parade and schedule information, venue details and practical Smith County trip planning.",
  },
  "/event/larry-joe-taylor-texas-music-festival": {
    title: "Larry Joe Taylor Festival 2027: Dates, Tickets & Camping",
    description: "LJT Fest returns to Stephenville April 19-24, 2027. Find official ticket and camping links plus Melody Mountain Ranch and Erath County planning details.",
  },
  "/event/fulton-oysterfest": {
    title: "Fulton Oysterfest 2027: Dates, Tickets & Visitor Guide",
    description: "Fulton Oysterfest runs March 4-7, 2027 at Fulton Harbor Park. Find official event information, coastal trip planning and Rockport-Fulton context.",
  },
  "/article/texas-colorado-river-guide": {
    title: "Colorado River in Texas: Lakes, Basin & Hill Country Guide",
    description: "Follow the Texas Colorado River through the Highland Lakes and Austin to the Gulf, with basin geography, reservoirs, Hill Country context and key places.",
  },
  "/article/texas-ecoregions-habitats-guide": {
    title: "Texas Ecoregions: Habitats, Landscapes & Wildlife Guide",
    description: "Explore Texas ecoregions from Piney Woods and prairies to Edwards Plateau, South Texas brush, desert and mountains, with habitats and wildlife by region.",
  },
  "/article/texas-home-architecture-regions": {
    title: "Texas Home Styles: Ranch, Hill Country, Craftsman & More",
    description: "Compare Texas home styles and regional architecture, including ranch, Hill Country, Craftsman, Spanish-influenced and Gulf Coast designs.",
  },
  "/article/texas-prairies-grasslands-guide": {
    title: "Texas Prairies & Grasslands: Regions, Plants & Wildlife",
    description: "Explore Texas prairies and grasslands, including Blackland Prairie, coastal prairie and High Plains habitats, with plants, wildlife and landscape context.",
  },
  "/article/texas-ranch-to-market-roads-explained": {
    title: "What Does RM Mean on Texas Roads? Ranch-to-Market Roads",
    description: "RM means Ranch-to-Market Road in Texas. Learn how RM roads differ from FM roads, where they are used and how TxDOT designates them.",
  },
  "/things-unique-to-texas/texas-brands": {
    title: "Famous Texas Brands: H-E-B, Buc-ee's, Whataburger & More",
    description: "Explore famous and iconic Texas brands, from H-E-B, Buc-ee's and Whataburger to retailers, food companies and businesses closely identified with Texas.",
  },
  "/sports-venues/high-school-football": {
    title: "Texas High School Football Stadiums: Best Venues & Guides",
    description: "Explore Texas high school football stadiums with venue guides, locations, parking and game-day context for notable stadiums across the state.",
  },
  "/sports-venue/whataburger-field": {
    title: "Whataburger Field Corpus Christi: Parking, Map & Events",
    description: "Plan a Whataburger Field visit in Corpus Christi with parking, map, arrival, ticket and event information for Corpus Christi Hooks baseball games.",
  },
  "/texas-food-history": {
    title: "Texas Food History: Barbecue, Tex-Mex, Chili & More",
    description: "Explore the history of Texas food through barbecue, Tex-Mex, chili, Czech and German traditions, Gulf seafood and regional dishes across the state.",
  },
  "/event/burnet-bluebonnet-festival": {
    title: "Burnet Bluebonnet Festival 2027: Dates, Schedule & Guide",
    description: "Burnet's Bluebonnet Festival runs April 9-11, 2027. See official date guidance, schedule planning, downtown Burnet details and Hill Country trip tips.",
  },
  "/event/chappell-hill-bluebonnet-festival": {
    title: "Chappell Hill Bluebonnet Festival 2027: Dates & Guide",
    description: "The Official State of Texas Bluebonnet Festival returns to Chappell Hill April 10-11, 2027. See dates, parking, schedule and Washington County planning.",
  },
  "/event/buc-days": {
    title: "Buc Days 2027: Corpus Christi Dates, Rodeo & Carnival",
    description: "Buc Days runs April 29-May 9, 2027 in Corpus Christi. Plan around Rodeo Corpus Christi, parades, carnival attractions, concerts and official schedules.",
  },
  "/event/poteet-strawberry-festival": {
    title: "Poteet Strawberry Festival 2027: Date Status & Visitor Guide",
    description: "Planning Poteet Strawberry Festival 2027? The organizer says the 80th annual dates are coming soon. Check the latest official date status and visitor guide.",
  },
  "/county/palo-pinto": {
    title: "Palo Pinto County, Texas: Population, Acres & County Guide",
    description: "Explore Palo Pinto County with population, land area, county seat, communities, geography, official links and practical local-reference information.",
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