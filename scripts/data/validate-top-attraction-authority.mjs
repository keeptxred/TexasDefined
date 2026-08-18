import fs from 'node:fs';

const listSource = fs.readFileSync('src/data/top-texas-attractions.ts', 'utf8');
const authoritySource = fs.readFileSync('src/data/destination-authority-top-attractions.ts', 'utf8');
const supplementalSource = fs.readFileSync('src/data/top-attraction-authority-sources.ts', 'utf8');
const authorityResolverSource = fs.readFileSync('src/data/top-attraction-authority-resolver.ts', 'utf8');
const referenceDataSource = fs.readFileSync('src/data/top-attraction-reference-data.ts', 'utf8');
const timelineSource = fs.readFileSync('src/data/destination-timelines-top-attractions.ts', 'utf8');
const roadTripDataSource = fs.readFileSync('src/data/top-attraction-road-trips.ts', 'utf8');
const componentSource = fs.readFileSync('src/components/editorial/DestinationAuthorityGuide.tsx', 'utf8');
const collectionLinksSource = fs.readFileSync('src/components/editorial/TopAttractionCollectionLinks.tsx', 'utf8');
const relationshipSource = fs.readFileSync('src/components/editorial/DestinationRelationships.tsx', 'utf8');
const trustRouterSource = fs.readFileSync('src/components/authority/CitationCollectionTrustRouter.tsx', 'utf8');
const destinationRouteSource = fs.readFileSync('src/routes/destination.$slug.tsx', 'utf8');
const categoryRouteSource = fs.readFileSync('src/routes/explore.$category.tsx', 'utf8');
const regionRouteSource = fs.readFileSync('src/routes/explore.region.$region.tsx', 'utf8');
const hubSource = fs.readFileSync('src/routes/explore.top-attractions.tsx', 'utf8');
const methodologySource = fs.readFileSync('src/routes/explore.top-attractions.methodology.tsx', 'utf8');
const roadTripRouteSource = fs.readFileSync('src/routes/explore.top-attractions.road-trips.tsx', 'utf8');
const checklistSource = fs.readFileSync('src/routes/top-25-texas-attractions-checklist[.]txt.ts', 'utf8');
const csvSource = fs.readFileSync('src/routes/top-25-texas-attractions[.]csv.ts', 'utf8');
const jsonSource = fs.readFileSync('src/routes/top-25-texas-attractions[.]json.ts', 'utf8');
const publicRoutesSource = fs.readFileSync('src/lib/public-routes.ts', 'utf8');
const exploreSitemapSource = fs.readFileSync('src/routes/sitemap-explore[.]xml.ts', 'utf8');
const citationManifest = fs.readFileSync('public/citation-magnets.json', 'utf8');
const llmsSource = fs.readFileSync('src/routes/llms[.]txt.ts', 'utf8');

const slugs = [...listSource.matchAll(/\{ rank:\s*\d+, slug: "([^"]+)"/g)].map((match) => match[1]);
const failures = [];

if (slugs.length !== 25) failures.push(`Top attraction registry has ${slugs.length} slugs; expected 25.`);

for (const slug of slugs) {
  if (!authoritySource.includes(`"${slug}": {`)) failures.push(`Missing authority record for ${slug}.`);
  if (!supplementalSource.includes(`"${slug}": [`)) failures.push(`Missing supplemental authority sources for ${slug}.`);
}

const authorityKeys = [...authoritySource.matchAll(/^\s{2}"([a-z0-9-]+)": \{/gm)].map((match) => match[1]);
const extraKeys = authorityKeys.filter((slug) => !slugs.includes(slug));
if (extraKeys.length) failures.push(`Authority file has unregistered Top 25 keys: ${extraKeys.join(', ')}.`);
if (authorityKeys.length !== 25) failures.push(`Authority file has ${authorityKeys.length} attraction records; expected 25.`);

const supplementalKeys = [...supplementalSource.matchAll(/^\s{2}"([a-z0-9-]+)": \[/gm)].map((match) => match[1]);
if (supplementalKeys.length !== 25) failures.push(`Supplemental authority registry has ${supplementalKeys.length} attraction records; expected 25.`);
const authorityUrls = [...supplementalSource.matchAll(/url:\s*"([^"]+)"/g)].map((match) => match[1]);
if (authorityUrls.length < 35) failures.push(`Supplemental authority registry exposes only ${authorityUrls.length} URLs; expected at least 35 across the Top 25.`);
for (const url of authorityUrls) {
  if (!url.startsWith('https://')) failures.push(`Supplemental authority source is not HTTPS: ${url}`);
}
if (new Set(authorityUrls).size !== authorityUrls.length) failures.push('Supplemental authority source URLs must be unique across the registry.');

for (const feature of [
  'whyItMatters',
  'recommendedVisit',
  'physicalEffort',
  'weatherExposure',
  'planningLevel',
  'familyFit',
  'firstTimeValue',
  'itineraries',
  'sources',
  'applyTopAttractionAuthority',
]) {
  if (!authoritySource.includes(feature)) failures.push(`Authority data contract missing ${feature}.`);
}
for (const feature of ['topAttractionSupplementalSources', 'SUPPLEMENTAL_SOURCES', 'DestinationAuthoritySource']) {
  if (!supplementalSource.includes(feature)) failures.push(`Supplemental authority contract missing ${feature}.`);
}
for (const feature of ['resolveTopAttractionAuthority', 'topAttractionSupplementalSources', 'dedupeSources']) {
  if (!authorityResolverSource.includes(feature)) failures.push(`Authority resolver contract missing ${feature}.`);
}
for (const feature of [
  'TOP_ATTRACTION_REFERENCE_ROWS',
  'TOP_ATTRACTIONS_METHODOLOGY_URL',
  'TOP_ATTRACTIONS_COLLECTION_URL',
  'resolveTopAttractionAuthority',
  'roadTripsBySlug',
  'authoritySources',
]) {
  if (!referenceDataSource.includes(feature)) failures.push(`Canonical Top 25 reference-data contract missing ${feature}.`);
}

const itineraryCalls = (authoritySource.match(/\bitinerary\(/g) ?? []).length - 1;
if (itineraryCalls !== 75) failures.push(`Authority data has ${itineraryCalls} itinerary records; expected 75 (three per attraction).`);

const timelineSlugs = [
  'the-alamo',
  'space-center-houston',
  'sixth-floor-museum-at-dealey-plaza',
  'fort-worth-stockyards',
  'texas-state-capitol',
  'san-antonio-missions-national-historical-park',
  'fredericksburg-historic-district',
  'gruene-historic-district',
];
for (const slug of timelineSlugs) {
  if (!timelineSource.includes(`"${slug}": [`)) failures.push(`Missing sourced history timeline for ${slug}.`);
}
const timelineEvents = (timelineSource.match(/sourceUrl:/g) ?? []).length;
if (timelineEvents !== 24) failures.push(`Top attraction history timelines have ${timelineEvents} sourced events; expected 24.`);
for (const feature of ['topAttractionTimeline', 'sourceLabel', 'sourceUrl']) {
  if (!timelineSource.includes(feature)) failures.push(`Timeline data contract missing ${feature}.`);
}

const routeCount = (roadTripDataSource.match(/\bid:\s*"[a-z0-9-]+"/g) ?? []).length;
if (routeCount !== 7) failures.push(`Top 25 road-trip data has ${routeCount} routes; expected 7.`);
for (const slug of slugs) {
  const occurrences = (roadTripDataSource.match(new RegExp(`"${slug}"`, 'g')) ?? []).length;
  if (occurrences !== 1) failures.push(`Road-trip collection must contain ${slug} exactly once; found ${occurrences}.`);
}
for (const feature of ['duration', 'summary', 'planningNote', 'TopAttractionRoadTrip']) {
  if (!roadTripDataSource.includes(feature)) failures.push(`Road-trip data contract missing ${feature}.`);
}

for (const feature of [
  'Verified visitor information',
  'Evidence layer',
  'Editorial assessment',
  'Why it matters to Texas',
  'Three ways to visit',
  'Key dates',
  'in context',
  'Source:',
  'Traveler questions, answered',
  'Sources & verification',
  'Authority sources used',
  'Controlling visitor source',
  'Supporting authority source',
  'Review log',
  'Texas Defined Editorial Desk',
  'a-hollis',
  '/explore/top-attractions/methodology',
  '/citation-guide',
  'destination.authorityGuide',
  'export default DestinationAuthorityGuide',
]) {
  if (!componentSource.includes(feature)) failures.push(`Authority component missing visible feature: ${feature}.`);
}

for (const feature of [
  'lazy(() => import("@/components/editorial/DestinationAuthorityGuide"))',
  'Suspense',
  'topAttractionRank ? <Suspense',
  '<DestinationAuthorityGuide destination={destination} />',
]) {
  if (!relationshipSource.includes(feature)) failures.push(`Destination authority lazy-rendering contract missing ${feature}.`);
}

for (const feature of [
  'isTopTexasAttraction',
  'await import("@/data/top-attraction-authority-resolver")',
  'authorityCitations',
  'citation: authorityCitations',
  'Texas Defined Editorial Desk',
  '/authors/a-hollis',
  'isBasedOn: `${siteUrl}/explore/top-attractions/methodology`',
]) {
  if (!destinationRouteSource.includes(feature)) failures.push(`Destination structured authority layer missing ${feature}.`);
}
if (destinationRouteSource.includes('from "@/data/top-attraction-authority-resolver"')) failures.push('Destination route must dynamically import the heavy Top 25 authority resolver.');

for (const feature of [
  'import("@/data/top-attraction-authority-resolver")',
  'resolveTopAttractionAuthority',
  'assessment.recommendedVisit',
  'assessment.physicalEffort',
  'assessment.planningLevel',
  'sourceCount',
  'Download comparison CSV',
  'Download reference JSON',
  'Top-25 road trips',
  'Methodology',
  '"@type": "Dataset"',
  'variableMeasured',
  '/top-25-texas-attractions.csv',
  '/top-25-texas-attractions.json',
]) {
  if (!hubSource.includes(feature)) failures.push(`Top 25 hub authority layer missing ${feature}.`);
}
if (hubSource.includes('from "@/data/top-attraction-authority-resolver"')) failures.push('Top 25 hub must dynamically import the heavy authority resolver.');

for (const feature of [
  'Statewide significance',
  'Distinctiveness',
  'Trip-anchor value',
  'Collection balance',
  'Rank order:',
  'Official sources control changing visitor facts',
  'Controlling visitor source',
  'Supporting public or institutional authority',
  'Review sites are not authority evidence',
  'No invented experience',
  'Missing beats guessing',
  'Shared comparison scale',
  '/top-25-texas-attractions.csv',
  '/top-25-texas-attractions.json',
]) {
  if (!methodologySource.includes(feature)) failures.push(`Top 25 methodology page missing ${feature}.`);
}

for (const feature of [
  'TOP_ATTRACTION_ROAD_TRIPS',
  'TouristTrip',
  'Planning logic',
  'Start this route in Trip Planner',
  '/explore/top-attractions/methodology',
]) {
  if (!roadTripRouteSource.includes(feature)) failures.push(`Top 25 road-trip route missing ${feature}.`);
}

for (const feature of ['TOP_TEXAS_ATTRACTIONS', 'content-disposition', 'citation-guide', 'explore/top-attractions']) {
  if (!checklistSource.includes(feature)) failures.push(`Top 25 checklist contract missing ${feature}.`);
}

for (const feature of [
  "createFileRoute('/top-25-texas-attractions.csv')",
  "await import('@/data/top-attraction-reference-data')",
  'TOP_ATTRACTION_REFERENCE_ROWS',
  'recommended_visit',
  'physical_effort',
  'weather_exposure',
  'advance_planning',
  'family_fit',
  'first_time_texas_value',
  'source_checked_at',
  'official_url',
  'authority_source_count',
  'authority_source_urls',
  'road_trip_names',
  'methodology_url',
  "'x-robots-tag': 'noindex, follow'",
  'content-disposition',
]) {
  if (!csvSource.includes(feature)) failures.push(`Top 25 CSV contract missing ${feature}.`);
}
if (csvSource.includes("from '@/data/top-attraction-reference-data'")) failures.push('Top 25 CSV route must dynamically load the heavy reference dataset.');

for (const feature of [
  "createFileRoute('/top-25-texas-attractions.json')",
  "await import('@/data/top-attraction-reference-data')",
  'TOP_ATTRACTION_REFERENCE_ROWS',
  'schemaVersion: 1',
  'canonicalCollection',
  'methodology',
  'authoritySources',
  'roadTrips',
  "'x-robots-tag': 'noindex, follow'",
  'content-disposition',
]) {
  if (!jsonSource.includes(feature)) failures.push(`Top 25 JSON contract missing ${feature}.`);
}
if (jsonSource.includes("from '@/data/top-attraction-reference-data'")) failures.push('Top 25 JSON route must dynamically load the heavy reference dataset.');

for (const path of ['/explore/top-attractions', '/explore/top-attractions/methodology', '/explore/top-attractions/road-trips']) {
  if (!publicRoutesSource.includes(`"${path}"`)) failures.push(`Public-route governance missing ${path}.`);
  if (!exploreSitemapSource.includes(`"${path}"`)) failures.push(`Explore sitemap missing ${path}.`);
  if (!trustRouterSource.includes(`'${path}'`)) failures.push(`Visible trust router missing ${path}.`);
  const absolute = `https://texasdefined.com${path}`;
  if (!citationManifest.includes(absolute) || !llmsSource.includes(absolute)) failures.push(`Citation/retrieval surfaces missing ${absolute}.`);
}
for (const path of ['/top-25-texas-attractions.csv', '/top-25-texas-attractions.json']) {
  if (!publicRoutesSource.includes(`"${path}"`)) failures.push(`Top 25 data distribution is not governed as a public noindex route: ${path}.`);
  if (!llmsSource.includes(`https://texasdefined.com${path}`)) failures.push(`llms retrieval guidance missing Top 25 distribution: ${path}.`);
}

for (const source of [collectionLinksSource, categoryRouteSource, regionRouteSource]) {
  if (!source.includes('TopAttractionCollectionLinks')) failures.push('Top 25 inbound-link cluster is missing from a category/region discovery surface.');
}
for (const feature of ['/explore/top-attractions', '/explore/top-attractions/road-trips', '/explore/top-attractions/methodology']) {
  if (!collectionLinksSource.includes(feature)) failures.push(`Top 25 collection-link component missing ${feature}.`);
}

if (failures.length) {
  console.error('Top 25 attraction authority validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Top 25 attraction authority validation passed: 25 authority records, ${authorityUrls.length} supplemental authority URLs, 75 itineraries, 24 sourced timeline events, seven complete road-trip clusters, canonical CSV/JSON data distributions, methodology, category/region inbound links, multi-source JSON-LD, lazy authority rendering, dynamic data loading, trust panels and citation discovery are wired.`);
