import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');
const images = read('src/data/rv-parks/images.server.ts');
const registry = read('src/data/rv-parks/registry.server.ts');
const facade = read('src/data/rv-parks/index.ts');
const countyDiscovery = read('src/data/rv-parks/county-discovery.ts');
const countyEventsBridge = read('src/data/county-major-events.ts');
const hillCountry = read('src/data/rv-parks/hill-country.ts');
const panhandleNorthTexas = read('src/data/rv-parks/panhandle-north-texas.ts');
const categoryRoute = read('src/routes/explore.$category.tsx');
const destinationRoute = read('src/routes/destination.$slug.tsx');
const countyRoute = read('src/routes/$kind.$slug.tsx');
const countySection = read('src/components/explore/CountyRvParks.tsx');
const countyHost = read('src/components/sports/CountySportsDestinations.tsx');
const sitemap = read('src/routes/sitemap-explore[.]xml.ts');
const delivery = read('src/lib/editorial-image-delivery.ts');

const errors = [];
const requireText = (source, needle, label) => {
  if (!source.includes(needle)) errors.push(`${label} missing: ${needle}`);
};

requireText(registry, 'export const RV_PARK_SEED_COUNT = 250;', 'RV inventory');
requireText(registry, 'category: "rv-parks"', 'RV destination category');
requireText(registry, 'coordinates: { lat: 0, lng: 0 }', 'Conservative seed coordinates');
requireText(registry, 'licensedImage?.subjectScope === "park-property"', 'Park-property image disclosure');
requireText(registry, 'licensedImage.creator', 'Visible image creator credit');
requireText(registry, 'licensedImage.license', 'Visible image license credit');
requireText(registry, 'licensedImage.sourceUrl', 'Visible image source credit');
requireText(registry, 'function normalizeCountySlug(value: string): string', 'Registry county slug normalizer');
requireText(registry, '.replace(/\\s+county$/i, "")', 'Registry county suffix removal');
requireText(registry, 'normalizeCountySlug(item.county!) === normalized', 'Registry county slug matching');
requireText(registry, 'export function loadRvParksForCountyServer(countySlug: string): Destination[]', 'Registry county server lookup retained for server-owned catalog uses');

for (const sourceName of [
  'RV_PARK_RAW_HILL_COUNTRY',
  'RV_PARK_RAW_GULF_COAST',
  'RV_PARK_RAW_PINEY_WOODS_EAST_TEXAS',
  'RV_PARK_RAW_PANHANDLE_NORTH_TEXAS',
  'RV_PARK_RAW_BIG_BEND_WEST_TEXAS',
]) requireText(countyDiscovery, sourceName, `Static county discovery source ${sourceName}`);
requireText(countyDiscovery, 'export function rvParkDiscoveryForCounty(countySlug: string)', 'Static county RV discovery function');
requireText(countyDiscovery, '.filter(([, , county]) => normalizeCounty(county) === normalizedCounty)', 'Static county RV exact county filtering');
requireText(countyDiscovery, '.slice(0, 12)', 'Static county RV discovery bound');
if (countyDiscovery.includes('createServerFn') || countyDiscovery.includes('registry.server')) errors.push('County RV discovery must stay client-safe and must not depend on a Worker server function or the full server registry.');

requireText(countyEventsBridge, 'const loadCountyMajorEvents = createServerFn({ method: "GET" })', 'Event-only county server function');
requireText(countyEventsBridge, 'await import("./county-major-events.server")', 'County event server registry boundary');
if (countyEventsBridge.includes('rv-parks') || countyEventsBridge.includes('rvParks')) errors.push('County major-event server bridge must not carry RV discovery rows.');
if (facade.includes('loadCountyRvParks') || facade.includes('rvParksForCounty')) errors.push('Shared RV facade must not own a county-specific server function.');
if (facade.includes('{ action: "county"; value: string }')) errors.push('County RV lookup must not return to the generic RV action dispatcher that already failed production SSR.');
if (facade.includes('const parks = await listRvParkDestinations();')) errors.push('County RV lookup must not fetch and serialize the full 250-record catalog before filtering.');
requireText(hillCountry, '["Blanco State Park RV Area", "Blanco", "Blanco",', 'Blanco County RV seed coverage');
requireText(panhandleNorthTexas, '["Palo Duro Canyon State Park RV Loop", "Canyon", "Randall",', 'Randall County RV seed coverage');

const imageSection = images.split('export const RV_PARK_LICENSED_IMAGES')[1]?.split('export function rvParkLicensedImage')[0] ?? '';
const imageRecords = [...imageSection.matchAll(/^  '([^']+)': \{([\s\S]*?)^  \},/gm)];
if (imageRecords.length < 20) errors.push(`Expected at least 20 rights-cleared RV image records, found ${imageRecords.length}.`);
let campgroundCount = 0;
for (const [, slug, body] of imageRecords) {
  for (const field of ['src:', 'sourceUrl:', 'alt:', 'width:', 'height:', 'creator:', 'license:', 'licenseUrl:', 'verifiedAt,', 'actualLocation: true', 'subjectScope:']) {
    if (!body.includes(field)) errors.push(`${slug} image record missing ${field}`);
  }
  if (!/sourceUrl:\s*'https:\/\/commons\.wikimedia\.org\/wiki\/File:/m.test(body)) errors.push(`${slug} must retain an item-level Wikimedia Commons source page.`);
  if (!/licenseUrl:\s*'https:\/\//m.test(body)) errors.push(`${slug} must retain a machine-readable license URL.`);
  if (!/subjectScope:\s*'(campground|park-property)'/m.test(body)) errors.push(`${slug} has an invalid subjectScope.`);
  if (/subjectScope:\s*'campground'/m.test(body)) campgroundCount += 1;
}
if (campgroundCount < 2) errors.push(`Expected at least two exact campground images, found ${campgroundCount}.`);

requireText(categoryRoute, '"rv-parks": {', 'RV collection SEO override');
requireText(categoryRoute, '"@type": isRvPark ? "Campground" : "TouristAttraction"', 'RV collection Campground schema');
requireText(destinationRoute, 'robots: indexable ? undefined : "noindex, follow"', 'Destination noindex quality gate');
requireText(destinationRoute, '...(destination.hero.credit ? { creditText: destination.hero.credit } : {})', 'Destination image credit schema');
requireText(countyRoute, "import { rvParkDiscoveryForCounty } from '@/data/rv-parks/county-discovery';", 'County loader static RV discovery import');
requireText(countyRoute, 'const countyRvParks = rvParkDiscoveryForCounty(entity.slug) as Destination[];', 'County loader deterministic RV discovery');
requireText(countyRoute, "import('@/data/county-major-events').then(({ getCountyMajorEvents }) => getCountyMajorEvents(entity.slug))", 'County loader proven event-only server fetch');
requireText(countyRoute, 'const countyEntity = { ...entity, rvParks: countyRvParks, majorEvents: countyMajorEvents };', 'County loader discovery serialization');
if (countyRoute.includes("from '@/data/rv-parks/county.functions'")) errors.push('County loader must not import the failed standalone RV server-function module.');
if (countyRoute.includes('getCountyDiscovery(entity.slug)')) errors.push('County loader must not route RV rows through the failed unified Worker server-function payload.');
if (countyRoute.includes("import('@/data/rv-parks').then(({ rvParksForCounty })")) errors.push('County loader must not return to the failed dynamic RV server-function path.');
requireText(countySection, 'rvParks: Destination[]', 'Pure county RV render input');
requireText(countySection, "'@type': 'Campground'", 'County Campground schema');
requireText(countySection, 'href="/explore/rv-parks"', 'County-to-statewide RV discovery');
if (countySection.includes('use(loadCountyRvParks(') || countySection.includes("from '@/data/rv-parks/county.functions'")) errors.push('County RV component must render preloaded rows rather than suspend on a client-side RV lookup.');
requireText(countyHost, "import { CountyRvParks } from '@/components/explore/CountyRvParks';", 'Server-rendered county RV boundary');
requireText(countyHost, 'const rvParks = county.rvParks ?? [];', 'County loader RV payload consumption');
requireText(countyHost, 'const majorEvents = county.majorEvents ?? [];', 'County loader event payload consumption');
requireText(countyHost, '<CountyRvParks county={county} rvParks={rvParks} />', 'Server-rendered county RV section');
if (countyHost.includes("lazy(() => import('@/components/explore/CountyRvParks'))")) errors.push('County RV section must not regress to a client-only lazy boundary.');
if (countyHost.includes('use(getCountyMajorEvents(') || countyHost.includes("from '@/data/county-major-events'")) errors.push('County discovery host must not suspend before the RV section can enter server-rendered HTML.');
requireText(sitemap, '"/explore/rv-parks"', 'RV collection sitemap entry');
requireText(sitemap, '.filter((destination) => isPrimaryTripPlannerDestination(destination) && auditDestination(destination).readyForIndexing)', 'Destination sitemap quality gate');
requireText(delivery, '"commons.wikimedia.org"', 'Wikimedia delivery allowlist');
requireText(delivery, 'prepareDestinationForDelivery', 'Destination image delivery');

if (errors.length) {
  console.error('RV parks authority validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`RV parks authority validation passed: 250 seed records, ${imageRecords.length} rights-cleared exact-location images (${campgroundCount} exact campground frames), deterministic client-safe county RV discovery, proven event-only county server boundary, conservative destination noindex gating, sitemap quality control and remote image delivery are protected.`);
