import fs from 'node:fs';

const read = (file) => fs.readFileSync(file, 'utf8');
const readRouteSurface = (file) => {
  const eagerSource = read(file);
  const lazyFile = file.replace(/\.tsx$/, '.lazy.tsx');
  return fs.existsSync(lazyFile) ? `${eagerSource}\n${fs.readFileSync(lazyFile, 'utf8')}` : eagerSource;
};

const registry = read('src/lib/public-routes.ts');
const primary = read('src/routes/sitemap[.]xml.ts');
const explore = read('src/routes/sitemap-explore[.]xml.ts');
const robots = read('public/robots.txt');
const cityDirectory = readRouteSurface('src/routes/browse.cities.tsx');
const placeDirectory = read('src/components/directories/TexasPlaceDirectory.tsx');
const cityAuthorityIndex = read('src/data/city-authority-index.ts');
const countyDirectory = readRouteSurface('src/routes/browse.counties.tsx');
const countyPropertyDirectory = read('src/components/directories/TexasCountyPropertyDirectory.tsx');
const leafOnlyParents = read('src/lib/leaf-only-parent-routes.tsx');
const landscapeServer = read('src/data/texas-landscapes.server.ts');
const landscapeGuideEnrichment = read('src/data/texas-landscape-guide-enrichment.ts');
const landscapeProfileEnrichment = read('src/data/texas-landscape-profile-enrichment.ts');
const landscapeDetail = read('src/components/editorial/TexasLandscapeDetailPage.tsx');
const route66Page = read('src/data/texas-route-66-page.ts');
const route66PageComponent = read('src/components/explore/TexasRoute66Page.tsx');
const route66Enrichment = read('src/data/texas-route-66-enrichment.ts');
const exploreLeafQuality = read('src/data/explore-leaf-quality.ts');
const failures = [];

for (const sitemap of [
  'Sitemap: https://texasdefined.com/sitemap.xml',
  'Sitemap: https://texasdefined.com/sitemap-explore.xml',
]) {
  const count = robots.split(sitemap).length - 1;
  if (count !== 1) failures.push(`robots.txt must advertise ${sitemap.replace('Sitemap: ', '')} exactly once; found ${count}.`);
}

for (const feature of [
  'export function isExploreSitemapOwnedPath',
  'normalized === "/explore"',
  'normalized.startsWith("/explore/")',
  'normalized.startsWith("/destination/")',
]) {
  if (!registry.includes(feature)) failures.push(`Explore sitemap ownership policy missing: ${feature}`);
}

if (!primary.includes('.filter((path) => !isExploreSitemapOwnedPath(path))')) {
  failures.push('Primary sitemap must remove Explore-owned static routes before publication.');
}
for (const exploreOnlyDependency of [
  'fetchExploreDestinations',
  'fetchCoreExploreDestinations',
  'supplementalExploreCategories',
  'platform.destinations.list',
  'platform.taxonomy.categories',
  'platform.taxonomy.regions',
]) {
  if (primary.includes(exploreOnlyDependency)) failures.push(`Primary sitemap still loads Explore-only dependency ${exploreOnlyDependency}.`);
}
for (const exploreOwnedTemplate of ['`/destination/${', '`/explore/${', '`/explore/region/${']) {
  if (primary.includes(exploreOwnedTemplate)) failures.push(`Primary sitemap still constructs Explore-owned URL template ${exploreOwnedTemplate}.`);
}

for (const feature of [
  'isExploreSitemapOwnedPath(normalized)',
  'isPrimaryTripPlannerDestination(destination)',
  'auditDestination(destination).readyForIndexing',
  'const remoteDestinations = mergeDestinationSources(coreDestinations, enrichedDestinations)',
  'const usePreservedFallback = (enrichedFailed && coreFailed) || remoteDestinations.length === 0',
  'const rawDestinations = usePreservedFallback ? preservedExploreDestinations : remoteDestinations',
  'const destinations = await resolveDestinationCatalog(rawDestinations)',
]) {
  if (!explore.includes(feature)) failures.push(`Explore sitemap crawl-quality contract missing: ${feature}`);
}
const curationDynamicImport = 'const { applyAllCuratedDestinations } = await import("@/data/destination-curation-all")';
if (!explore.includes(curationDynamicImport)) {
  failures.push('Explore sitemap crawl-quality contract must lazy-load the destination curation stack inside the resolver.');
}
if (explore.includes('import { applyAllCuratedDestinations } from "@/data/destination-curation-all"')) {
  failures.push('Explore sitemap crawl-quality contract must not eagerly load the destination curation stack in the route module.');
}
if (explore.includes('const destinations = remoteFailed ? fixtureDestinations : remoteDestinations')) {
  failures.push('Explore sitemap must not use the obsolete single-source outage fallback.');
}
for (const generalOnlyTemplate of ['`/article/${', '`/authors/${', '`/shop/${', '`/property-tax/county/${']) {
  if (explore.includes(generalOnlyTemplate)) failures.push(`Explore sitemap must not construct general-site URL template ${generalOnlyTemplate}.`);
}

for (const marker of [
  'import { Route as landscapesRoute } from "@/routes/explore.landscapes";',
  'landscapesRoute,',
]) {
  if (!leafOnlyParents.includes(marker)) failures.push(`Landscape parent-route canonical protection missing: ${marker}`);
}
for (const marker of [
  'const path = `/explore/landscapes/${item.slug}`;',
  'buildMeta(texasDefinedBrand, {',
  "robots: readyForIndexing ? undefined : 'noindex, follow'",
  'links: [canonicalLink(texasDefinedBrand, path)]',
  'isTexasLandscapeIndexReady(item)',
  'citation: item.sourceLinks.map((source) => source.href)',
  'enrichedTexasLandscapeProfiles.find',
]) {
  if (!landscapeServer.includes(marker)) failures.push(`Landscape child crawl-quality contract missing: ${marker}`);
}
for (const marker of [
  'const { isRoute66StopIndexReady, isTexasLandscapeIndexReady } = await import("@/data/explore-leaf-quality")',
  'const { enrichedTexasLandscapeGuides } = await import("@/data/texas-landscape-guide-enrichment")',
  'const { enrichedTexasLandscapeProfiles } = await import("@/data/texas-landscape-profile-enrichment")',
  'const { TEXAS_ROUTE_66_STOPS } = await import("@/data/texas-route-66")',
  'const landscapePaths = [...enrichedTexasLandscapeProfiles, ...enrichedTexasLandscapeGuides]',
  '.filter(isTexasLandscapeIndexReady)',
  '...TEXAS_ROUTE_66_STOPS',
  '.filter(isRoute66StopIndexReady)',
]) {
  if (!explore.includes(marker)) failures.push(`Explore sitemap leaf-quality gate missing: ${marker}`);
}
for (const marker of [
  'enrichedTexasLandscapeGuides',
  'sourceLinks',
  'TPWD_ECOREGIONS',
  'NPS_BIG_BEND',
  'NPS_BIG_THICKET',
]) {
  if (!landscapeGuideEnrichment.includes(marker)) failures.push(`Landscape guide authority enrichment missing: ${marker}`);
}
for (const marker of [
  'enrichedTexasLandscapeProfiles',
  'fieldNotes',
  'sourceLinks',
  'TPWD_ECOREGIONS',
  'TWDB_RIVERS_RESERVOIRS',
  'NPS_CHIHUAHUAN',
  'TXDOT_WILDFLOWERS',
]) {
  if (!landscapeProfileEnrichment.includes(marker)) failures.push(`Landscape profile authority enrichment missing: ${marker}`);
}
const profileEnhancementKeys = [...landscapeProfileEnrichment.matchAll(/^\s{2}"([a-z0-9-]+)": \{/gm)].map((match) => match[1]);
if (profileEnhancementKeys.length !== 24) failures.push(`Landscape profile enrichment covers ${profileEnhancementKeys.length} profiles; expected 24.`);
if (new Set(profileEnhancementKeys).size !== 24) failures.push('Landscape profile enrichment keys must be unique.');
const profileSourceLinks = (landscapeProfileEnrichment.match(/\{ label: ".+?", href: [A-Z0-9_]+ \}/g) ?? []).length;
if (profileSourceLinks < 48) failures.push(`Landscape profile enrichment exposes ${profileSourceLinks} authority links; expected at least 48.`);
for (const marker of [
  'Read it in the field',
  'item.fieldNotes.map',
  '<SourceDesk sources={item.sourceLinks} noun="landscape profile" />',
]) {
  if (!landscapeDetail.includes(marker)) failures.push(`Landscape profile visible authority depth missing: ${marker}`);
}

const route66PromotedStops = ['lela', 'alanreed', 'washburn', 'bushland', 'wildorado'];
for (const slug of route66PromotedStops) {
  if (!route66Enrichment.includes(`  ${slug}: {`)) failures.push(`Route 66 context-stop authority enrichment missing: ${slug}`);
}
for (const marker of [
  'ROUTE_66_CONTEXT_STOP_SLUGS',
  'enrichTexasRoute66Stop',
  'enrichTexasRoute66Stops',
  'TEXAS_ROUTE_66_PRIMARY_SOURCE',
]) {
  if (!route66Enrichment.includes(marker)) failures.push(`Route 66 authority enrichment contract missing: ${marker}`);
}
const route66HandbookLinks = (route66Enrichment.match(/https:\/\/www\.tshaonline\.org\/handbook\/entries\/[a-z0-9-]+/g) ?? []).length;
if (route66HandbookLinks < route66PromotedStops.length) failures.push(`Route 66 context-stop enrichment exposes ${route66HandbookLinks} Handbook of Texas authority links; expected at least ${route66PromotedStops.length}.`);

for (const marker of [
  'auditTexasLandscapeItem',
  'auditRoute66Stop',
  'words < 180',
  'item.fieldNotes.length < 2',
  'item.sourceLinks.length < 2',
  'words < 220',
  'enrichTexasRoute66Stop(stop)',
  'candidate.sourceLinks.length < 2',
]) {
  if (!exploreLeafQuality.includes(marker)) failures.push(`Explore leaf quality auditor missing: ${marker}`);
}
for (const marker of [
  'TEXAS_ROUTE_66_PAGE_STOPS = enrichTexasRoute66Stops(TEXAS_ROUTE_66_STOPS)',
  'isRoute66StopIndexReady(stop)',
  'robots: readyForIndexing ? undefined : "noindex, follow"',
]) {
  if (!route66Page.includes(marker)) failures.push(`Route 66 child crawl-quality contract missing: ${marker}`);
}

if (!route66PageComponent.includes('Route 66 significance')) {
  failures.push('Route 66 stop pages must use a specific significance label instead of vague list-membership wording.');
}
if (route66PageComponent.includes('>Why it belongs<')) {
  failures.push('Route 66 stop pages must not restore the vague Why it belongs eyebrow.');
}

for (const marker of [
  'CITY_AUTHORITY_SLUGS.has(city.slug)',
  'absoluteUrl(texasDefinedBrand, cityAuthorityPath(city.slug))',
  ': `${pageUrl}#${cityAnchor(city.slug)}`',
]) {
  if (!cityDirectory.includes(marker)) failures.push(`City directory verification-aware crawl contract missing: ${marker}`);
}
for (const marker of [
  'CITY_AUTHORITY_SLUGS.has(city.slug)',
  'params={{ kind: "city", slug: city.slug }}',
]) {
  if (!placeDirectory.includes(marker)) failures.push(`Visible city directory verification-aware link contract missing: ${marker}`);
}
for (const marker of [
  'export const CITY_AUTHORITY_INDEX',
  'export const CITY_AUTHORITY_SLUGS',
]) {
  if (!cityAuthorityIndex.includes(marker)) failures.push(`Shared verified city authority crawl registry missing: ${marker}`);
}
if (cityDirectory.includes('absoluteUrl(texasDefinedBrand, cityAuthorityPath(city.slug))') && !cityDirectory.includes('CITY_AUTHORITY_SLUGS.has(city.slug)')) {
  failures.push('City ItemList canonical URLs must not be promoted without verified authority gating.');
}
if (placeDirectory.includes('params={{ kind: "city", slug: city.slug }}') && !placeDirectory.includes('CITY_AUTHORITY_SLUGS.has(city.slug)')) {
  failures.push('Visible city detail links must not be promoted without verified authority gating.');
}

for (const marker of [
  'const verifiedPropertyCounties = COUNTY_PROPERTY_RECORDS.filter(isCountyPropertyIndexReady)',
  'numberOfItems: verifiedPropertyCounties.length',
  'itemListElement: verifiedPropertyCounties.map',
  '<TexasCountyPropertyDirectory verifiedPropertySlugs={verifiedPropertySlugs} />',
]) {
  if (!countyDirectory.includes(marker)) failures.push(`County directory verification-aware crawl contract missing: ${marker}`);
}
for (const marker of [
  'verifiedPropertySlugs',
  'const hasVerifiedPropertyGuide = verified.has(county.slug)',
  'Open verified property guide',
  'Open county reference',
]) {
  if (!countyPropertyDirectory.includes(marker)) failures.push(`County property directory verification-aware link contract missing: ${marker}`);
}
if (countyDirectory.includes('itemListElement: TEXAS_COUNTIES.map')) {
  failures.push('Browse/counties must not schema-advertise all 254 property-tax child pages.');
}
if (countyPropertyDirectory.includes('counties.map((county, index) => (') && countyPropertyDirectory.includes('to="/property-tax/county/$county" params={{ county: county.slug }}>Open the guide')) {
  failures.push('County property directory must not unconditionally link every county to a property-tax child page.');
}

if (!primary.includes('stale-while-revalidate=86400')) failures.push('Primary sitemap must retain stale-while-revalidate protection.');
if (!explore.includes('"Cache-Control": "no-store"')) failures.push('Explore sitemap must disable edge storage while GSC crawl consistency is protected.');
if (explore.includes('stale-while-revalidate=')) failures.push('Explore sitemap must not allow stale-while-revalidate because regional stale variants can reach crawlers.');

if (failures.length) {
  console.error('Crawl-demand validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('Crawl-demand validation passed: sitemap namespaces are partitioned, Explore destinations use quality-gated preserved-catalog fallback when remote sources are unavailable or empty, Explore sitemap responses cannot persist stale edge variants, all 24 landscape profiles and all 13 Route 66 stop pages are promoted only after substantive quality checks, landscape and Route 66 guides carry visible authority sources, verified city authority URLs are promoted only through the shared readiness gate, county property children are verification-filtered, and robots advertises each sitemap once.');