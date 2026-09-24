import fs from "node:fs";

const read = (path) => fs.readFileSync(path, "utf8");
const failures = [];
const fail = (message) => failures.push(message);

const articles = read("src/data/fixtures/road-trip-camera-authority.ts");
const stubs = read("src/data/fixtures/lazy-road-trip-camera-authority.ts");
const card = read("src/components/monetization/RexingAffiliateCard.tsx");
const repositories = read("src/data/fixtures/repositories.ts");
const articleRoute = read("src/routes/article.$slug.tsx");
const sources = read("src/data/remote-evergreen-authority-sources.ts");
const readiness = read("src/data/fixtures/texas-gateway-index-readiness.ts");
const readyStubs = read("src/data/fixtures/texas-gateway-index-ready-stubs.ts");
const promotions = read("scripts/data/texas-gateway-editorial-promotions.json");
const emergency = read("src/data/fixtures/texas-gateway-batch4-authority-enrichment.ts");
const camping = read("src/routes/best-places-to-go-camping-in-texas.lazy.tsx");
const internalLinks = read("src/data/article-internal-links.ts");

const authoritySlugs = [
  "dash-cams-in-texas",
  "texas-road-trip-vehicle-checklist",
  "dash-cam-setup-texas-road-trips",
  "trail-cameras-in-texas",
  "texas-wildlife-camera-guide",
  "texas-heat-vehicle-electronics",
  "cameras-texas-camping-outdoors",
  "rural-texas-property-monitoring",
  "rideshare-dash-cams-texas",
];
const emergencySlug = "what-to-keep-in-car-for-texas-road-trip";
const allSlugs = [...authoritySlugs, emergencySlug];

for (const slug of authoritySlugs) {
  if (!articles.includes(`slug: "${slug}"`)) fail(`missing full authority article: ${slug}`);
  if (!stubs.includes(`slug: "${slug}"`)) fail(`missing lazy discovery stub: ${slug}`);
  if (!sources.includes(`"${slug}": [`)) fail(`missing authority source set: ${slug}`);

  const start = articles.indexOf(`slug: "${slug}"`);
  const bodyStart = articles.indexOf("body: [", start);
  const bodyEnd = articles.indexOf("],\n  internalLinks:", bodyStart);
  if (start < 0 || bodyStart < 0 || bodyEnd < 0) {
    fail(`unable to inspect body depth for ${slug}`);
    continue;
  }
  const body = articles.slice(bodyStart, bodyEnd);
  const approximateWords = body
    .replace(/[^A-Za-z0-9'’.-]+/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
  if (approximateWords < 650) fail(`${slug} authority body is too thin: ~${approximateWords} words`);
}

const heroExpressions = [];
for (const slug of authoritySlugs) {
  const start = articles.indexOf(`slug: "${slug}"`);
  const heroStart = articles.indexOf("hero: ", start);
  const heroEnd = articles.indexOf("\n", heroStart);
  const hero = articles.slice(heroStart, heroEnd).trim();
  if (!hero) fail(`missing hero for ${slug}`);
  heroExpressions.push(hero);
}
if (new Set(heroExpressions).size !== heroExpressions.length) {
  fail("new road-trip/camera authority articles reuse a hero expression; keep the cluster visually distinct");
}

for (const marker of [
  'import { roadTripCameraAuthorityStubs, loadRoadTripCameraAuthorityArticle } from "./lazy-road-trip-camera-authority";',
  "...roadTripCameraAuthorityStubs,",
  "loadRoadTripCameraAuthorityArticle(scope.brandId, slug)",
]) if (!repositories.includes(marker)) fail(`article repository wiring missing: ${marker}`);

for (const marker of [
  "RexingAffiliateCard",
  "rexingOfferForArticle(article.slug)",
  "placement={`article:${article.slug}:primary`}",
]) if (!articleRoute.includes(marker)) fail(`article route Rexing integration missing: ${marker}`);

const exactDestinations = [
  "https://www.jdoqocy.com/click-101876465-15019509",
  "https://www.tkqlhce.com/click-101876465-14424553",
  "https://www.dpbolvw.net/click-101876465-17195894",
];
for (const url of exactDestinations) {
  if (!card.includes(url)) fail(`approved Rexing CJ destination missing: ${url}`);
}
for (const marker of [
  'rel="sponsored nofollow noopener noreferrer"',
  'data-affiliate-partner="rexing"',
  'data-affiliate-placement={placement}',
  'data-commercial-partner="rexing"',
  'data-commercial-placement={placement}',
  "trackAffiliateClick({",
  "Affiliate disclosure: TexasDefined may earn a commission",
]) if (!card.includes(marker)) fail(`Rexing commercial governance missing: ${marker}`);

for (const slug of allSlugs) {
  if (!card.includes(`"${slug}":`)) fail(`Rexing contextual offer map missing ${slug}`);
}
for (const prohibited of [/coupon\s+code/i, /limited\s+time/i, /guarantee(?:s|d)?\s+(?:evidence|safety|security)/i]) {
  if (prohibited.test(card)) fail(`Rexing card contains prohibited promotional/safety language: ${prohibited}`);
}

for (const marker of [
  "https://statutes.capitol.texas.gov/Docs/TN/htm/TN.547.htm#547.613",
  "https://statutes.capitol.texas.gov/Docs/PE/htm/PE.16.htm#16.02",
  "https://tpwd.texas.gov/huntwild/hunt/wma/",
  "https://www.nhtsa.gov/summer-driving-tips",
  "https://www.weather.gov/safety/heat-during",
  "https://www.uber.com/us/en/safety/uber-community-guidelines/keep-safe/",
  "https://www.lyft.com/safety/audiorecording",
]) if (!sources.includes(marker)) fail(`required primary/current source missing: ${marker}`);

for (const marker of [
  `"${emergencySlug}"`,
  'export const TEXAS_GATEWAY_INDEX_READY_SLUGS',
]) if (!readiness.includes(marker)) fail(`emergency-kit index promotion missing: ${marker}`);
if (!readyStubs.includes(`slug: "${emergencySlug}"`)) fail("emergency kit is missing its discovery stub");
if (!promotions.includes(`"slug": "${emergencySlug}"`) || !promotions.includes('"approvedAt": "2026-09-24"')) {
  fail("emergency-kit editorial promotion is not ledgered");
}
for (const marker of [
  "portable jump starter and tire inflator",
  "/article/texas-road-trip-vehicle-checklist",
  "/article/dash-cam-setup-texas-road-trips",
  "/article/texas-heat-vehicle-electronics",
]) if (!emergency.includes(marker)) fail(`emergency-kit authority enrichment missing: ${marker}`);

for (const marker of [
  "/article/texas-road-trip-vehicle-checklist",
  "/article/what-to-keep-in-car-for-texas-road-trip",
  "/article/cameras-texas-camping-outdoors",
]) if (!camping.includes(marker)) fail(`camping hub authority connection missing: ${marker}`);

for (const marker of [
  '"best-first-texas-road-trip"',
  '"texas-road-trip-stops-worth-the-detour"',
  '"things-you-see-on-a-texas-road-trip"',
  '"big-bend-in-winter"',
  '"texas-weather-surprises-newcomers"',
  '"moving-to-houston-address-checklist"',
  '"moving-to-dallas-fort-worth-guide"',
  '"moving-to-austin-guide"',
  "/article/rideshare-dash-cams-texas",
]) if (!internalLinks.includes(marker)) fail(`road-trip/relocation cross-link missing: ${marker}`);

for (const marker of [
  '"brewster-county-big-bend-texas"',
  '"presidio-county-marfa-borderlands-texas"',
  '"edwards-county-rocksprings-devils-sinkhole-nueces-plateau-texas"',
  '"kenedy-county-sarita-ranches-padre-island-wild-horse-desert-texas"',
  "/article/rural-texas-property-monitoring",
  "/article/texas-wildlife-camera-guide",
  "/article/trail-cameras-in-texas",
]) if (!repositories.includes(marker)) fail(`rural county knowledge-graph connection missing: ${marker}`);

if (failures.length) {
  console.error("Road-trip camera authority validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Road-trip camera authority validation passed: ${authoritySlugs.length} new evergreen authority articles plus the promoted emergency-kit guide, exact approved Rexing destinations, primary legal/outdoor sources, shared commercial metadata, camping/road-trip/relocation/rural-county connections, and distinct authority heroes are protected.`);
