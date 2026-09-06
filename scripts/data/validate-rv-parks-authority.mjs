import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');
const images = read('src/data/rv-parks/images.server.ts');
const registry = read('src/data/rv-parks/registry.server.ts');
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
requireText(countyRoute, "import('@/data/rv-parks').then(({ rvParksForCounty }) => rvParksForCounty(entity.slug))", 'County loader RV server-function fetch');
requireText(countyRoute, "import('@/data/county-major-events').then(({ getCountyMajorEvents }) => getCountyMajorEvents(entity.slug))", 'County loader major-event server-function fetch');
requireText(countyRoute, 'const countyEntity = { ...entity, rvParks: countyRvParks, majorEvents: countyMajorEvents };', 'County loader discovery serialization');
requireText(countySection, 'rvParks: Destination[]', 'Pure county RV render input');
requireText(countySection, "'@type': 'Campground'", 'County Campground schema');
requireText(countySection, 'href="/explore/rv-parks"', 'County-to-statewide RV discovery');
if (countySection.includes('use(rvParksForCounty(') || countySection.includes("from '@/data/rv-parks'")) errors.push('County RV component must render preloaded rows rather than suspend on a client-side RV lookup.');
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

console.log(`RV parks authority validation passed: 250 seed records, ${imageRecords.length} rights-cleared exact-location images (${campgroundCount} exact campground frames), loader-backed synchronous county discovery, conservative destination noindex gating, sitemap quality control and remote image delivery are protected.`);
