import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');
const images = read('src/data/rv-parks/images.server.ts');
const registry = read('src/data/rv-parks/registry.server.ts');
const facade = read('src/data/rv-parks/index.ts');
const countyEventsBridge = read('src/data/county-major-events.ts');
const countyRvIndex = read('src/data/rv-parks/county-index.ts');
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
requireText(registry, 'export function loadRvParksForCountyServer(countySlug: string): Destination[]', 'Registry county server lookup');

requireText(countyEventsBridge, 'const loadCountyMajorEvents = createServerFn({ method: "GET" })', 'County event server function');
requireText(countyEventsBridge, 'import("./county-major-events.server")', 'County event server registry boundary');
if (countyEventsBridge.includes('rv-parks/registry.server')) errors.push('County event server function must not own RV discovery.');

for (const marker of [
  'RV_PARK_RAW_HILL_COUNTRY',
  'RV_PARK_RAW_GULF_COAST',
  'RV_PARK_RAW_PINEY_WOODS_EAST_TEXAS',
  'RV_PARK_RAW_PANHANDLE_NORTH_TEXAS',
  'RV_PARK_RAW_BIG_BEND_WEST_TEXAS',
  'type CountyRvSeed = readonly',
  'function snapshotDestination(',
  'const COUNTY_RV_PARKS: readonly Destination[] = GROUPS.flatMap',
  'export function loadCountyRvParksSnapshot(countySlug: string): Destination[]',
  'normalizeCountySlug(park.county!) === normalized',
  '.sort((left, right) => left.nearestTown.localeCompare(right.nearestTown) || left.name.localeCompare(right.name))',
  '.slice(0, 12)',
]) requireText(countyRvIndex, marker, 'Client-safe county RV snapshot');
if (countyRvIndex.includes('CERTIFIED_COUNTY_FALLBACKS')) errors.push('County RV snapshot must not retain county-specific fallback inventory.');
if (countyRvIndex.includes('randall: [')) errors.push('County RV snapshot must not hardcode Randall production rows.');
if (countyRvIndex.includes('createServerFn')) errors.push('County RV snapshot must not add another TanStack server-function boundary.');
if (countyRvIndex.includes('registry.server')) errors.push('County RV snapshot must not import the full server-only RV registry.');
if (countyRvIndex.includes('images.server')) errors.push('County RV snapshot must not import licensed image metadata.');
if (facade.includes('loadCountyRvParks') || facade.includes('rvParksForCounty')) errors.push('Shared RV facade must not own a county-specific server function.');
if (facade.includes('{ action: "county"; value: string }')) errors.push('County RV lookup must not return to the generic RV action dispatcher that failed production SSR.');
if (facade.includes('const parks = await listRvParkDestinations();')) errors.push('County RV lookup must not fetch and serialize the full 250-record catalog through a server function before filtering.');

requireText(hillCountry, '["Blanco State Park RV Area", "Blanco", "Blanco",', 'Blanco County generic RV seed coverage');
for (const rawSeed of [
  '["Palo Duro Canyon State Park RV Loop", "Canyon", "Randall", "palo-duro-canyon-state-park-rv-loop", "panhandle"]',
  '["Palo Duro Rim RV Camp", "Canyon", "Randall", "palo-duro-rim-rv-camp", "panhandle"]',
]) requireText(panhandleNorthTexas, rawSeed, 'Randall County generic RV seed coverage');

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
requireText(countyRoute, "import('@/data/rv-parks/county-index').then(({ loadCountyRvParksSnapshot }) => loadCountyRvParksSnapshot(entity.slug))", 'County loader bounded RV snapshot');
requireText(countyRoute, "import('@/data/county-major-events').then(({ getCountyMajorEvents }) => getCountyMajorEvents(entity.slug))", 'County loader major-event server-function fetch');
requireText(countyRoute, 'const countyEntity = { ...entity, rvParks: countyRvParks, majorEvents: countyMajorEvents };', 'County loader discovery serialization');
if (countyRoute.includes("from '@/data/rv-parks/county.functions'")) errors.push('County loader must not import the failed standalone RV server-function module.');
if (countyRoute.includes('getCountyDiscovery')) errors.push('County loader must not restore the failed unified county discovery server function.');

requireText(countySection, "type CountyRvParkLink = Pick<Destination, 'slug' | 'name' | 'nearestTown'>;", 'Lightweight county RV render input');
requireText(countySection, 'rvParks: readonly CountyRvParkLink[]', 'Pure county RV render input');
requireText(countySection, 'if (!rvParks.length) return null;', 'Pure county RV empty-input guard');
requireText(countySection, "'@type': 'Campground'", 'County Campground schema');
requireText(countySection, 'href="/explore/rv-parks"', 'County-to-statewide RV discovery');
if (countySection.includes('loadCountyRvParksSnapshot') || countySection.includes('createServerFn') || countySection.includes("from '@/data/rv-parks/county.functions'")) errors.push('County RV child must remain a pure synchronous renderer with no discovery lookup.');

requireText(countyHost, "type CountyRvParkLink = Pick<Destination, 'slug' | 'name' | 'nearestTown'>;", 'County host lightweight RV type');
requireText(countyHost, 'const rvParks = county.rvParks ?? [];', 'County loader RV payload consumption');
if (countyHost.includes('CERTIFIED_RANDALL_RV_PARKS')) errors.push('County SSR host must not retain a Randall-only production canary.');
if (countyHost.includes("county.slug === 'randall'")) errors.push('County SSR host must not special-case Randall RV discovery.');
requireText(countyHost, 'function renderCountyRvParks(county: TexasEntityRecord, rvParks: readonly CountyRvParkLink[])', 'Same-module county RV renderer');
requireText(countyHost, 'if (!rvParks.length) return null;', 'Same-module county RV empty-input guard');
requireText(countyHost, "'@type': 'Campground'", 'Same-module County Campground schema');
requireText(countyHost, "'@type': 'ItemList'", 'Same-module County ItemList schema');
requireText(countyHost, 'id="county-rv-parks-heading"', 'Same-module county RV heading');
requireText(countyHost, 'RV camping around {county.name}', 'Same-module county RV heading text');
requireText(countyHost, 'href="/explore/rv-parks"', 'Same-module county-to-statewide RV discovery');
requireText(countyHost, 'const majorEvents = county.majorEvents ?? [];', 'County loader event payload consumption');
requireText(countyHost, '{renderCountyRvParks(county, rvParks)}', 'Same-module server-rendered county RV section');
if (countyHost.includes("import { CountyRvParks } from '@/components/explore/CountyRvParks';")) errors.push('County RV production markup must stay in the proven SSR host instead of regressing to the nested child boundary that production skipped.');
if (countyHost.includes('<CountyRvParks')) errors.push('County RV production markup must not regress to the nested CountyRvParks component boundary.');
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

console.log(`RV parks authority validation passed: 250 seed records, ${imageRecords.length} rights-cleared exact-location images (${campgroundCount} exact campground frames), one bounded generic county loader across all five regional seed arrays with county-specific fallbacks forbidden, same-module RV markup in the proven SSR host, conservative destination noindex gating, sitemap quality control and remote image delivery are protected.`);
