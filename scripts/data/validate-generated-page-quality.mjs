import fs from 'node:fs';

const errors = [];
const warnings = [];
const read = (path) => fs.readFileSync(path, 'utf8');

const registry = read('src/data/texas-entity-registry.ts');
const relationships = read('src/data/knowledge-graph/relationships.ts');
const entityIndex = read('src/data/knowledge-graph/index.ts');
const entityRoute = read('src/routes/$kind.$slug.tsx');
const countyGuide = read('src/components/content/CountyGuideSections.tsx');
const countyProfile = read('src/data/county-profile.ts');
const localGovernment = read('src/data/local-government-profile.ts');
const propertySchema = read('src/data/property/county-property-schema.ts');
const propertyRoute = read('src/routes/property-tax.county.$county.tsx');
const sitemap = read('src/routes/sitemap[.]xml.ts');

function requireAll(label, text, needles) {
  for (const needle of needles) if (!text.includes(needle)) errors.push(`${label}: missing ${needle}`);
}
function forbidAll(label, text, needles) {
  for (const needle of needles) if (text.includes(needle)) errors.push(`${label}: forbidden regression returned: ${needle}`);
}

// Inventory contract: the generated families that caused the thin-page incident must stay complete.
requireAll('registry inventory', registry, [
  'TEXAS_COUNTY_ENTITIES.length!==254',
  'TEXAS_LOCAL_OFFICE_ENTITIES.length!==508',
  "status:'pending-source-verification'",
]);

// Publication contract: a generated page is not indexable merely because a route exists.
requireAll('entity publication gate', relationships, [
  'export function isIndexableEntityPage',
  "['active', 'seasonal'].includes(entity.status)",
  'description.length < 180',
  '!entity.sourceCheckedAt',
  "['official', 'high'].includes(entity.sourceConfidence)",
  'hasEntitySpecificOfficialUrl(entity)',
  'contextSignals >= 3',
]);
requireAll('local-office publication gate', relationships, [
  'LOCAL_GOVERNMENT_KINDS.has(entity.kind)',
  "entity.sourceConfidence !== 'official'",
  "entity.status !== 'active'",
]);
requireAll('office promotion gate', entityIndex, [
  'const readyForPublication = hasVerifiedWebsite && hasUsefulContact && description.length >= 180',
  "status: readyForPublication ? 'active' : entity.status",
]);

// Render contract: thin generic templates may not silently return.
requireAll('county guide richness', countyGuide, [
  'At a glance', 'The county in numbers', 'Where it is', 'A sense of place',
  'County seat & communities', 'Places on the map', 'What to know',
  'Property & county services', 'Official local resources', 'Nearby places', 'Keep exploring',
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

// Source contract: county/local-office facts must remain backed by authoritative enrichment.
requireAll('statewide county enrichment', countyProfile, [
  'countySeatsPromise', 'countyPopulationPromise', 'countyGeographyPromise',
  'fetchCountySeats', 'fetchCountyPopulations', 'fetchCountyGeographies',
  'for=county:*&in=state:48', 'countyProfileDescription',
]);
requireAll('local government enrichment', localGovernment, [
  'https://comptroller.texas.gov/taxes/property-tax/county-directory/',
  'https://www.county.org', 'fetchCountyWebsite', 'findComptrollerCountyUrl',
  'websiteUrl', 'phone', 'email', 'address', 'lastUpdated',
]);
forbidAll('per-county source fanout', countyProfile, [
  'fetchCountySeat(baseName)', 'fetchPopulation(countyCode)', 'fetchGeography(countyCode)',
]);

// Property-tax county pages get the same fail-closed treatment.
requireAll('property county gate', propertySchema, [
  'isCountyPropertyIndexReady', 'record.lastVerifiedAt', 'localPropertySources.length >= 2',
]);
requireAll('property county route', propertyRoute, [
  'isCountyPropertyIndexReady(county)',
  "robots: indexReady ? undefined : 'noindex, follow'",
]);

// Discovery contract: only qualified generated pages belong in XML sitemaps.
requireAll('sitemap qualification', sitemap, [
  'COUNTY_PROPERTY_RECORDS.filter(isCountyPropertyIndexReady)',
  'graph.filter(isIndexableEntityPage)',
  'canonicalEntityPath(entity)',
]);

// Related-content contract: don't recreate alphabetical same-kind filler links.
requireAll('relationship relevance', relationships, [
  'const sameCounty = Boolean(entityCounty && candidateCounty && entityCounty === candidateCounty)',
  'const miles = distanceMiles(entity, candidate)',
  'sharedTags.length * 6',
  'proximityTieBreak(entity, a.entity, b.entity)',
]);
forbidAll('relationship filler', relationships, [
  'if (entity.kind === candidate.kind) score += 3',
  "if (entity.kind === candidate.kind) { score += 3",
]);

if (errors.length) {
  console.error('Generated-page quality validation failed. These regressions can recreate thin, generic, or prematurely indexed pages:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}
for (const warning of warnings) console.warn(`- ${warning}`);
console.log('Generated-page quality validator passed: inventory, source authority, content richness, indexability, sitemap qualification, local-office promotion, property-page gating, and related-content relevance are protected.');
