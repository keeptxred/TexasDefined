import fs from "node:fs";

const failures = [];
const read = (file) => fs.readFileSync(file, "utf8");
const data = read("src/data/gaming.ts");
const hub = read("src/routes/gaming.lazy.tsx");
const hubMeta = read("src/routes/gaming.tsx");
const detail = read("src/routes/gaming_.$slug.lazy.tsx");
const detailMeta = read("src/routes/gaming_.$slug.tsx");
const publicRoutes = read("src/lib/public-routes.ts");
const llms = read("src/routes/llms[.]txt.ts");
const county = read("src/components/content/CountyGuideSections.tsx");
const city = read("src/data/city-industry-paths.ts");
const searchRuntime = read("src/data/search-documents-runtime.ts");
const searchAdapter = read("src/data/gaming-search.ts");

const slugs = [
  "video-game-industry",
  "why-dallas-matters-online-gaming",
  "latency",
  "companies",
  "austin",
  "dfw",
  "esports",
  "esports-stadium-arlington",
  "college-esports",
  "careers",
  "history",
  "events-conventions",
  "data-centers-internet-infrastructure",
];
const paths = ["/gaming", ...slugs.map((slug) => `/gaming/${slug}`)];

for (const slug of slugs) {
  if (!data.includes(`slug: "${slug}"`)) failures.push(`Missing gaming page data: ${slug}`);
}
for (const path of paths) {
  if (!publicRoutes.includes(JSON.stringify(path))) failures.push(`Public-route governance missing ${path}`);
}
for (const path of [
  "/gaming",
  "/gaming/video-game-industry",
  "/gaming/companies",
  "/gaming/esports",
  "/gaming/latency",
  "/gaming/why-dallas-matters-online-gaming",
]) {
  if (!llms.includes(`https://texasdefined.com${path}`)) failures.push(`Machine discovery missing ${path}`);
}

for (const source of [hubMeta, detailMeta]) {
  for (const marker of ["buildMeta(", "canonicalLink(", "jsonLd("]) {
    if (!source.includes(marker)) failures.push(`Gaming metadata route missing ${marker}`);
  }
}
for (const schema of ["CollectionPage", "ItemList", "BreadcrumbList"]) {
  if (!hubMeta.includes(`"@type": "${schema}"`)) failures.push(`Gaming hub missing ${schema} schema`);
}
if (!detailMeta.includes('"@type": "Article"') || !detailMeta.includes('"@type": "BreadcrumbList"')) failures.push("Gaming topic schema is incomplete.");
if (!hub.includes("GAMING_PAGES.map")) failures.push("Gaming hub must crawlably render every authority topic.");

const affiliateMarkers = [
  '17255582',
  'rel="sponsored nofollow noopener noreferrer"',
  'data-affiliate-partner="gearup"',
  'data-commercial-partner="gearup"',
  'trackAffiliateClick({ partner: "gearup"',
  "TexasDefined may earn a commission",
  "cannot fix every source of latency",
];
for (const marker of affiliateMarkers) if (!detail.includes(marker) && !data.includes(marker)) failures.push(`GearUP governance marker missing: ${marker}`);
if ((data.match(/gearup: "evergreen"/g) ?? []).length !== 2) failures.push("GearUP evergreen monetization must remain limited to the two routing/latency guides unless deliberately reviewed.");

for (const forbidden of [
  "GearUP is a Texas company",
  "GearUP owns a Dallas data center",
  "GearUP directly creates Dallas jobs",
  "GearUP owns Texas gaming servers",
  "GearUP has a Texas office",
]) {
  if ([data, hub, detail].join("\n").includes(forbidden)) failures.push(`Unsupported GearUP claim detected: ${forbidden}`);
}

for (const marker of [
  'href: "/gaming/austin"',
  'href: "/gaming/dfw"',
  'href: "/gaming/esports-stadium-arlington"',
]) if (!city.includes(marker)) failures.push(`City gaming pathway missing: ${marker}`);

for (const countySlug of ["travis", "williamson", "collin", "tarrant", "dallas", "denton"]) {
  if (!new RegExp(`\\b${countySlug}: \\[[^\\n]*href: "/gaming/`).test(county)) failures.push(`County gaming pathway missing: ${countySlug}`);
}

if (!searchRuntime.includes('await import("./gaming-search")') || !searchRuntime.includes("buildGamingSearchDocuments()")) failures.push("Gaming pages must remain in global search.");
for (const marker of ['id: "collection:gaming"', 'href: "/gaming"', 'GAMING_PAGES']) if (!searchAdapter.includes(marker)) failures.push(`Gaming search adapter missing ${marker}`);

if (!data.includes('GAMING_REVIEWED_AT = "2026-09-24"')) failures.push("Gaming source review date is missing.");
if (!data.includes("Texas Film Commission") || !data.includes("DE-CIX") || !data.includes("City of Arlington")) failures.push("Core primary-source families are missing.");
if (/\b(?:TODO|FIXME)\b/i.test([data, hub, hubMeta, detail, detailMeta].join("\n"))) failures.push("Gaming authority source contains TODO/FIXME.");

if (failures.length) {
  console.error("Texas gaming authority validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}
console.log(`Texas gaming authority validation passed: ${paths.length} governed indexable routes, sourced statewide/regional/esports/network coverage, restrained GearUP tracking/disclosure, city/county pathways, global-search discovery and canonical/schema safeguards are protected.`);
