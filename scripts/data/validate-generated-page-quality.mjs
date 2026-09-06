import fs from 'node:fs';

const errors = [];
const warnings = [];
const read = (path) => fs.readFileSync(path, 'utf8');
const readRouteSurface = (file) => {
  const eagerSource = read(file);
  const lazyFile = file.replace(/\.tsx$/, '.lazy.tsx');
  return fs.existsSync(lazyFile) ? `${eagerSource}\n${read(lazyFile)}` : eagerSource;
};

const registry = read('src/data/texas-entity-registry.ts');
const relationships = read('src/data/knowledge-graph/relationships.ts');
const entityIndex = read('src/data/knowledge-graph/index.ts');
const entityRoute = readRouteSurface('src/routes/$kind.$slug.tsx');
const countyGuide = read('src/components/content/CountyGuideSections.tsx');
const countyProfile = read('src/data/county-profile.ts');
const localGovernment = read('src/data/local-government-profile.ts');
const propertySchema = read('src/data/property/county-property-schema.ts');
const propertyRoute = read('src/routes/property-tax.county.$county.tsx');
const sitemap = read('src/routes/sitemap[.]xml.ts');
const ownership = read('src/lib/brand-route-ownership.ts');

function requireAll(label, text, needles) {
  for (const needle of needles) if (!text.includes(needle)) errors.push(`${label}: missing ${needle}`);
}
function forbidAll(label, text, needles) {
  for (const needle of needles) if (text.includes(needle)) errors.push(`${label}: forbidden regression returned: ${needle}`);
}

requireAll('registry inventory', registry, [
  'TEXAS_COUNTY_ENTITIES.length!==254',
  'TEXAS_LOCAL_OFFICE_ENTITIES.length!==508',
  "status:'pending-source-verification'",
]);

requireAll('entity publication gate', relationships, [
  'export function isIndexableEntityPage',
  "['active', 'seasonal'].includes(entity.status)",
  'description.length < 180',
  '!entity.sourceCheckedAt',
  "['official', 'high'].includes(entity.sourceConfidence)",
  'hasEntitySpecificOfficialUrl(entity)',
  'contextSignals >= 3',
]);
requireAll('county publication gate', relationships, [
  "entity.kind === 'county'",
  'description.length >= 180',
  "entity.sourceConfidence === 'official'",
  'Boolean(entity.coordinates)',
  'entity.relationships.length >= 2',
]);
requireAll('government reference ownership gate', relationships, [
  'GOVERNMENT_REFERENCE_KINDS',
  "'agency'",
  "'appraisal-district'",
  "'tax-office'",
  "'county-clerk'",
  "'dps-office'",
  'if (GOVERNMENT_REFERENCE_KINDS.has(entity.kind)) return false',
]);
requireAll('government redirect ownership', ownership, [
  'texasDefinedAgencyRedirect',
  "if (slug === 'texas-dmv') return '/texas-dmv'",
  "'texas-comptroller'",
  "'texas-secretary-of-state'",
  "'texas-dps'",
  "'texas-parks-wildlife'",
  "'texas-workforce-commission'",
  "'texas-education-agency'",
  "'public-utility-commission'",
  "'texas-commission-environmental-quality'",
  "'texas-general-land-office'",
  "'texas-department-insurance'",
  "'texas-health-human-services'",
]);
requireAll('office promotion data layer', entityIndex, [
  'enrichLocalOfficeEntityFromSnapshot',
  'getCountyPropertyRecordBySlug',
  'isCountyPropertyIndexReady',
  "status: 'active'",
  'const readyForPublication = hasVerifiedWebsite && hasUsefulContact && description.length >= 180',
  "status: readyForPublication ? 'active' : entity.status",
]);
requireAll('office source enrichment', entityIndex, [
  "entity.kind !== 'appraisal-district' && entity.kind !== 'tax-office'",
  'const enriched = enrichLocalOfficeEntityFromSnapshot(entity)',
  'enrichedById.set(entity.id, enriched)',
]);

requireAll('county editorial-first richness', countyGuide, [
  'County feature',
  'The story of {entity.name}',
  'countySeriesArticle.title',
  'countySeriesArticle.dek',
  '<ArticleBody blocks={countySeriesArticle.body} entities={relatedEntities} />',
  'At a glance',
  'The county in numbers',
  'County seat & communities',
  'Places on the map',
  'Property & county services',
  'Official local resources',
  'Nearby places',
  'Keep exploring',
]);
forbidAll('county template-heavy regressions', countyGuide, [
  'The county reference point is near',
  'How to use this guide',
  'Where it is',
  'A sense of place',
]);
requireAll('county property link gate', countyGuide, [
  'getCountyPropertyRecordBySlug',
  'isCountyPropertyIndexReady',
  'const propertyGuideReady = Boolean(propertyRecord && isCountyPropertyIndexReady(propertyRecord))',
  "const propertyGuideHref = propertyGuideReady ? `/property-tax/county/${entity.slug}` : '/property-tax/counties'",
  'href={propertyGuideHref}',
  'local source verification is still incomplete',
]);
requireAll('entity route index control', entityRoute, [
  'isIndexableEntityPage(loaderData.entity)',
  "robots: indexable ? undefined : 'noindex, follow, max-image-preview:large'",
  '<CountyGuideSections entity={entity} profile={countyProfile} localGovernment={localGovernment} related={related} />',
]);
forbidAll('generic placeholder copy', entityRoute, [
  'A closer look at ${entity.name}, where to find it, and what else is worth seeing nearby.',
  'What to know about ${loaderData.entity.name}, where it is, and what is nearby.',
  'This county guide is being expanded',
]);
forbidAll('unconditional county property child links', countyGuide, [
  'links={[{ href: `/property-tax/county/${entity.slug}`',
  '<a href={`/property-tax/county/${entity.slug}`',
]);

requireAll('statewide county enrichment', countyProfile, [
  'countySeatsPromise', 'countyCensusFactsPromise',
  'fetchCountySeats', 'fetchCountyCensusFacts',
  'Census2020/State_County/MapServer/1/query',
  "url.searchParams.set('where', \"STATE='48'\")",
  "url.searchParams.set('outFields', 'COUNTY,POP100,AREALAND,AREAWATER,INTPTLAT,INTPTLON')",
  'population2020: censusFacts.population2020',
  'landAreaSquareMiles: censusFacts.landAreaSquareMiles',
  'waterAreaSquareMiles: censusFacts.waterAreaSquareMiles',
  'countyProfileDescription',
]);
forbidAll('retired Census Data API dependency', countyProfile, [
  'api.census.gov/data/2020/dec/pl',
  'api.census.gov/data/2020/geoinfo',
]);

requireAll('county-seat place semantics', countyProfile, [
  'export type CountySeatPlace',
  "entityType: 'place'",
  "role: 'county-seat'",
  "state: 'Texas'",
  'displayName: `${name}, Texas`',
  'const countySeatName =',
  'const countySeatPlace = countySeatName ? toCountySeatPlace(countySeatName) : undefined',
  'const seat = cells[1].trim()',
]);
forbidAll('county-seat person inference', countyProfile, [
  'seat.split(',
  'countySeat.split(',
  "entityType: 'person'",
  "entityType: 'politician'",
]);

requireAll('local government enrichment', localGovernment, [
  'https://comptroller.texas.gov/taxes/property-tax/county-directory/',
  'https://www.county.org', 'fetchCountyWebsite', 'findComptrollerCountyUrl',
  'websiteUrl', 'phone', 'email', 'address', 'lastUpdated',
]);
forbidAll('per-county source fanout', countyProfile, [
  'fetchCountySeat(baseName)', 'fetchPopulation(countyCode)', 'fetchGeography(countyCode)',
]);

requireAll('property county gate', propertySchema, [
  'isCountyPropertyIndexReady',
  'COUNTY_PROPERTY_VERIFICATION_MAX_AGE_DAYS',
  'hasFreshCountyPropertyVerification',
  'new Set([',
  'localPropertySources.size >= 2',
]);
requireAll('property county route', propertyRoute, [
  'isCountyPropertyIndexReady(county)',
  "robots: indexReady ? undefined : 'noindex, follow'",
]);

requireAll('sitemap qualification', sitemap, [
  'COUNTY_PROPERTY_RECORDS.filter(isCountyPropertyIndexReady)',
  'graph.filter(isIndexableEntityPage)',
  '.filter(isTexasDefinedOwnedEntity)',
  'canonicalEntityPath(entity)',
]);

requireAll('relationship relevance', relationships, [
  'const sameCounty = Boolean(entityCounty && candidateCounty && entityCounty === candidateCounty)',
  'const miles = distanceMiles(entity, candidate)',
  'sharedTags.length * 6',
  'proximityTieBreak(entity, a.entity, b.entity)',
  'isIndexableEntityPage(candidate)',
]);
forbidAll('relationship filler', relationships, [
  'if (entity.kind === candidate.kind) score += 3',
  "if (entity.kind === candidate.kind) { score += 3",
]);

if (errors.length) {
  console.error('Generated-page quality validation failed. These regressions can recreate thin, generic, prematurely indexed, or incorrectly owned pages:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}
for (const warning of warnings) console.warn(`- ${warning}`);
console.log('Generated-page quality validator passed: inventory, source authority, county-seat place semantics, editorial-first county richness, brand ownership, indexability, sitemap qualification, snapshot-backed local-office data, property-page gating, county crawl-demand filtering, and related-content relevance are protected.');
