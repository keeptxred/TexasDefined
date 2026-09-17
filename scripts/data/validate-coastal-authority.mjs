import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const data = fs.readFileSync(path.join(root, 'src/data/coastal-places.ts'), 'utf8');
const destinations = fs.readFileSync(path.join(root, 'src/data/coastal-destinations.ts'), 'utf8');
const destinationTest = fs.readFileSync(path.join(root, 'src/data/__tests__/coastal-destinations.test.ts'), 'utf8');
const preservedCatalog = fs.readFileSync(path.join(root, 'src/data/destination-preserved-catalog.ts'), 'utf8');
const availability = fs.readFileSync(path.join(root, 'src/data/destination-availability.ts'), 'utf8');
const imageDelivery = fs.readFileSync(path.join(root, 'src/lib/editorial-image-delivery.ts'), 'utf8');
const directory = fs.readFileSync(path.join(root, 'public/content/explore-category-authority/beaches-coast-directory.html'), 'utf8');
const categoryRoute = fs.readFileSync(path.join(root, 'src/routes/explore.$category.tsx'), 'utf8');
const categoryLazy = fs.readFileSync(path.join(root, 'src/routes/explore.$category.lazy.tsx'), 'utf8');
const countyComponent = fs.readFileSync(path.join(root, 'src/components/content/CountyCoastalPlaces.tsx'), 'utf8');
const entityRoute = fs.readFileSync(path.join(root, 'src/routes/$kind.$slug.lazy.tsx'), 'utf8');
const sitemap = fs.readFileSync(path.join(root, 'src/routes/sitemap-explore[.]xml.ts'), 'utf8');
const errors = [];

const expectedSlugs = [
  'sea-rim-state-park','mcfaddin-beach','high-island-beach','crystal-beach','retillion-road-beach-access','fort-travis-seashore-park',
  'east-beach-galveston','stewart-beach','galveston-seawall-beaches','porretto-beach','babes-beach','galveston-pocket-park-1','galveston-pocket-park-2','galveston-pocket-park-3','galveston-island-state-park-coast','jamaica-beach','san-luis-pass-beach','sylvan-beach-park','el-jardin-beach','mooner-beach',
  'surfside-beach','quintana-beach-county-park','bryan-beach','sargent-beach','matagorda-beach','matagorda-bay-nature-park',
  'palacios-bay-beach','magnolia-beach','lighthouse-beach-port-lavaca','king-fisher-beach','sunday-beach','rockport-beach','fulton-beach-park','goose-island-state-park-coast','san-jose-island',
  'ib-magee-beach-park','port-aransas-beach','tony-amos-city-beach','mustang-island-state-park','north-beach-corpus-christi','mcgee-beach','cole-park-beach','oso-bay-coast',
  'whitecap-beach','malaquite-beach','padre-island-national-seashore-backcountry','yarborough-pass','south-padre-island-beaches','isla-blanca-park','andy-bowie-county-park','ek-atwood-park','boca-chica-beach',
];

if (expectedSlugs.length !== 52) errors.push(`Validator inventory drift: expected-slug list has ${expectedSlugs.length} entries instead of 52.`);
for (const slug of expectedSlugs) {
  if (!data.includes(`slug: "${slug}"`)) errors.push(`Research inventory missing protected coastal slug: ${slug}.`);
  if (!directory.includes(`id="${slug}"`)) errors.push(`Visible coast directory missing anchored entry: ${slug}.`);
  if (!countyComponent.includes(`'${slug}'`)) errors.push(`County reverse-link map missing coastal entry: ${slug}.`);
  if (!destinations.includes(`"${slug}": { lat:`)) errors.push(`Destination coordinate map missing ${slug}.`);
  if (!destinations.includes(`"${slug}": "https://`)) errors.push(`Coordinate evidence map missing HTTPS source for ${slug}.`);
}

const recordCount = (data.match(/^\s{2}\{\n\s{4}slug:/gm) ?? []).length;
const visibleEntryCount = (directory.match(/<article id="/g) ?? []).length;
const coordinateCount = (destinations.match(/^\s{2}"[^"]+": \{ lat: /gm) ?? []).length;
const coordinateSourceSection = destinations.split('export const COASTAL_COORDINATE_SOURCES')[1]?.split('const CANONICAL_SLUG_OVERRIDES')[0] ?? '';
const coordinateSourceCount = (coordinateSourceSection.match(/^\s{2}"[^"]+": "https:\/\//gm) ?? []).length;
if (recordCount !== 52) errors.push(`Coastal research inventory must contain exactly 52 records; found ${recordCount}.`);
if (visibleEntryCount !== 52) errors.push(`Visible coastal directory must contain exactly 52 article entries; found ${visibleEntryCount}.`);
if (coordinateCount !== 52) errors.push(`Coastal destination coordinate map must contain exactly 52 entries; found ${coordinateCount}.`);
if (coordinateSourceCount !== 52) errors.push(`Coastal coordinate-evidence map must contain exactly 52 HTTPS sources; found ${coordinateSourceCount}.`);

for (const marker of [
  'aliases: ["Retillon Beach", "Retillion Beach"]',
  'access: "private-check-status"',
  'only the public beach strip below the mean high-tide line',
  'TPWD specifically does not recommend swimming here',
  'Yarborough Pass is a Laguna Madre access and primitive camping area',
  'Padre Island National Seashore Wilderness Area',
  'sourceCheckedAt: checked',
]) if (!data.includes(marker)) errors.push(`Coastal research/correction contract missing: ${marker}.`);

for (const marker of [
  'export const coastalDestinations: Destination[] = coastalPlaces.map',
  'const CANONICAL_SLUG_OVERRIDES',
  '"galveston-island-state-park-coast": "galveston-island-state-park"',
  '"goose-island-state-park-coast": "goose-island-state-park"',
  'function nationalMapHero(name: string, coordinates: GeoPoint)',
  'USGSImageryOnly/MapServer/export?bbox=',
  'USDA / USGS The National Map orthoimagery · Public domain',
  'Whitecap%20Beach%20in%20Corpus%20Christi',
  'Matthew T Rader · CC BY-SA 4.0 · Wikimedia Commons',
  'sourceCheckedAt: place.sourceCheckedAt',
  'body: bodyFor(place, name)',
  'highlights: highlightsFor(place, name)',
]) if (!destinations.includes(marker)) errors.push(`Full coastal destination publication contract missing: ${marker}.`);

for (const localHero of [
  '/images/explore/beaches-coast/sea-rim-state-park.jpg',
  '/images/explore/beaches-coast/galveston-island-state-park.jpg',
  '/images/explore/beaches-coast/goose-island-state-park.jpg',
  '/images/explore/beaches-coast/mustang-island-state-park.jpg',
]) if (!destinations.includes(localHero)) errors.push(`Rights-cleared local coastal hero missing: ${localHero}.`);

if (!preservedCatalog.includes('import { coastalDestinations } from "./coastal-destinations";')) errors.push('Preserved Explore catalog must import the full coastal destination collection.');
const coastalCatalogPosition = preservedCatalog.indexOf('  coastalDestinations,');
const legacyCatalogPosition = preservedCatalog.indexOf('  legacyExploreDestinations,');
if (coastalCatalogPosition < 0 || legacyCatalogPosition < 0 || coastalCatalogPosition > legacyCatalogPosition) errors.push('Coastal destination collection must precede legacy Explore records so curated canonical coast profiles win duplicate slugs.');

if (!imageDelivery.includes('"basemap.nationalmap.gov"')) errors.push('USGS National Map host must be present in the remote-image delivery allowlist.');
if (!availability.includes('"porretto-beach"')) errors.push('Porretto Beach must remain non-primary while 2026 public access is uncertain.');

for (const marker of [
  'assert.equal(coastalDestinations.length, EXPECTED_COUNT)',
  'auditDestination(destination)',
  'audit.readyForIndexing',
  'assert.equal(new Set(heroSources).size, EXPECTED_COUNT)',
  'assert.equal(isPrimaryTripPlannerDestination(porretto), false)',
]) if (!destinationTest.includes(marker)) errors.push(`Coastal destination regression test missing: ${marker}.`);

for (const marker of [
  '52 researched coastal places',
  'Reviewed September 6, 2026',
  'San José Island is privately owned',
  'does not recommend swimming',
  'Yarborough Pass is remote Laguna Madre access',
  'Retillon Beach',
  'Porretto Beach is private property',
  '/explore/road-trips',
  '/explore/outdoors',
  '/fishing',
]) if (!directory.includes(marker)) errors.push(`Visible coast authority contract missing: ${marker}.`);

const blankTargets = (directory.match(/target="_blank"/g) ?? []).length;
const safeRels = (directory.match(/rel="noopener noreferrer"/g) ?? []).length;
if (!blankTargets || blankTargets !== safeRels) errors.push(`Coastal directory external-link safety mismatch: ${blankTargets} target=_blank links vs ${safeRels} safe rel attributes.`);
if (/<script\b/i.test(directory) || /\son\w+\s*=/i.test(directory) || /javascript:/i.test(directory)) errors.push('Coastal authority HTML contains executable markup.');

for (const marker of [
  'const COASTAL_AUTHORITY_ITEM_COUNT = 52;',
  'const COASTAL_AUTHORITY_PATH = "/content/explore-category-authority/beaches-coast-directory.html";',
  'category.slug === "beaches-coast"',
  'fetch(import.meta.env.SSR ? `${siteUrl}${COASTAL_AUTHORITY_PATH}` : COASTAL_AUTHORITY_PATH)',
  '(params.category === "beaches-coast" ? COASTAL_AUTHORITY_ITEM_COUNT : 0)',
]) if (!categoryRoute.includes(marker)) errors.push(`Beaches & Coast route/indexing integration missing: ${marker}.`);

for (const clientSource of [categoryRoute, categoryLazy, countyComponent]) {
  if (clientSource.includes('@/data/coastal-places')) errors.push('Full coastal research dataset must not be imported by a client route/component; it breaches the main-bundle budget.');
  if (clientSource.includes('@/data/coastal-destinations')) errors.push('Full coastal destination dataset must remain behind the existing destination runtime boundary, not enter a client route/component.');
  if (clientSource.includes('CoastalBeachAuthority')) errors.push('CoastalBeachAuthority client component must remain retired; the 52-place directory is static authority HTML.');
}

for (const marker of [
  "import { CountyCoastalPlaces } from '@/components/content/CountyCoastalPlaces';",
  "{entity.kind === 'county' ? <CountyCoastalPlaces county={entity} /> : null}",
]) if (!entityRoute.includes(marker)) errors.push(`County coastal integration missing: ${marker}.`);

for (const marker of [
  'href={`/destination/${destinationSlug ?? slug}`}',
  "['galveston-island-state-park-coast', 'Galveston Island State Park', 'galveston-island-state-park']",
  "['goose-island-state-park-coast', 'Goose Island State Park', 'goose-island-state-park']",
  'Open full destination guide →',
]) if (!countyComponent.includes(marker)) errors.push(`County-to-destination coastal link contract missing: ${marker}.`);

if (!sitemap.includes('"/explore/beaches-coast"')) errors.push('Explore sitemap must explicitly retain /explore/beaches-coast.');
if (!sitemap.includes('auditDestination(destination).readyForIndexing')) errors.push('Explore sitemap must keep the normal destination indexing audit in front of individual coast pages.');

if (errors.length) {
  console.error(`Coastal authority validation failed with ${errors.length} issue(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

const runtimeAudit = spawnSync(process.execPath, [
  '--experimental-strip-types',
  '--test',
  'src/data/__tests__/coastal-destinations.test.ts',
], { cwd: root, encoding: 'utf8' });
if (runtimeAudit.status !== 0) {
  console.error('Coastal destination runtime audit failed.');
  if (runtimeAudit.stdout) console.error(runtimeAudit.stdout.trim());
  if (runtimeAudit.stderr) console.error(runtimeAudit.stderr.trim());
  process.exit(runtimeAudit.status || 1);
}

console.log('Coastal authority validation passed: 52 researched places have coordinate evidence, substantive destination profiles, unique rights-cleared location imagery, county-to-destination links, runtime destination-audit enforcement, safe static directory delivery and sitemap coverage without entering the main client bundle.');
