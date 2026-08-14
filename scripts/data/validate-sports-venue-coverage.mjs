import fs from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const read = (file) => fs.readFile(path.join(root, file), 'utf8');

const [major, tier2, seed, directory, guide, galaxyGuide, enrichment, enrichmentBatch2, enrichmentBatch3, enrichmentBatch4Racing, enrichmentBatch5, enrichmentAll, currentCorrections] = await Promise.all([
  read('src/data/knowledge-graph/major-sports-venues.ts'),
  read('src/data/knowledge-graph/sports-venues-tier2.ts'),
  read('src/data/knowledge-graph/seed.ts'),
  read('src/routes/sports-venues.tsx'),
  read('src/routes/sports-venue.$slug.tsx'),
  read('src/routes/sports-venue.jones-att-stadium.tsx'),
  read('src/data/sports-venue-enrichment.ts'),
  read('src/data/sports-venue-enrichment-batch2.ts'),
  read('src/data/sports-venue-enrichment-batch3.ts'),
  read('src/data/sports-venue-enrichment-batch4-racing.ts'),
  read('src/data/sports-venue-enrichment-batch5.ts'),
  read('src/data/sports-venue-enrichment-all.ts'),
  read('src/data/knowledge-graph/current-entity-corrections.ts'),
]);

const errors = [];
const assert = (condition, message) => { if (!condition) errors.push(message); };
const countSeedRows = (source) => [...source.matchAll(/^\s{2}\[(?:'|")/gm)].length;
const countEnrichmentProfiles = (source) => [...source.matchAll(/^\s{2}'[^']+': \{/gm)].length;

const majorCount = countSeedRows(major);
const tier2Count = countSeedRows(tier2);
const enrichmentCount = countEnrichmentProfiles(enrichment);
const enrichmentBatch2Count = countEnrichmentProfiles(enrichmentBatch2);
const enrichmentBatch3Count = countEnrichmentProfiles(enrichmentBatch3);
const enrichmentBatch4RacingCount = countEnrichmentProfiles(enrichmentBatch4Racing);
const enrichmentBatch5Count = countEnrichmentProfiles(enrichmentBatch5);
const totalEnrichmentCount = enrichmentCount + enrichmentBatch2Count + enrichmentBatch3Count + enrichmentBatch4RacingCount + enrichmentBatch5Count;

assert(majorCount >= 50, `Expected at least 50 major sports venue seeds; found ${majorCount}.`);
assert(tier2Count === 29, `Expected 29 second-tier sports-tourism seeds; found ${tier2Count}.`);
assert(enrichmentCount >= 9, `Expected at least 9 first-batch deeply enriched venue profiles; found ${enrichmentCount}.`);
assert(enrichmentBatch2Count >= 11, `Expected at least 11 second-batch deeply enriched venue profiles; found ${enrichmentBatch2Count}.`);
assert(enrichmentBatch3Count >= 10, `Expected at least 10 third-batch deeply enriched venue profiles; found ${enrichmentBatch3Count}.`);
assert(enrichmentBatch4RacingCount >= 7, `Expected at least 7 deep racing venue profiles; found ${enrichmentBatch4RacingCount}.`);
assert(enrichmentBatch5Count >= 10, `Expected at least 10 fifth-batch major venue profiles; found ${enrichmentBatch5Count}.`);
assert(totalEnrichmentCount >= 47, `Expected at least 47 deeply enriched venue profiles; found ${totalEnrichmentCount}.`);
assert(seed.includes("import { MAJOR_TEXAS_SPORTS_VENUES } from './major-sports-venues';"), 'Major sports venues are not imported into the knowledge graph seed.');
assert(seed.includes("import { TEXAS_SPORTS_VENUE_TIER2_ENTITIES } from './sports-venues-tier2';"), 'Second-tier sports venues are not imported into the knowledge graph seed.');
assert(seed.includes('...MAJOR_TEXAS_SPORTS_VENUES'), 'Major sports venues are not spread into the curated knowledge graph.');
assert(seed.includes('...TEXAS_SPORTS_VENUE_TIER2_ENTITIES'), 'Second-tier sports venues are not spread into the curated knowledge graph.');

const anchors = [
  ['professional sports', 'att-stadium'],
  ['major-league baseball', 'globe-life-field'],
  ['motorsports', 'circuit-of-the-americas'],
  ['stock-car racing', 'texas-motor-speedway'],
  ['drag racing', 'texas-motorplex'],
  ['college football', 'kyle-field'],
  ['championship golf', 'pga-frisco-fields-ranch'],
  ['high-school football', 'eagle-stadium-allen'],
  ['college baseball', 'ufcu-disch-falk-field'],
  ['Western sports', 'will-rogers-memorial-center'],
  ['shooting sports', 'national-shooting-complex'],
  ['action sports', 'waco-surf'],
];

const inventory = `${major}\n${tier2}`;
for (const [category, slug] of anchors) {
  assert(inventory.includes(`'${slug}'`), `Missing representative ${category} destination: ${slug}.`);
}

for (const marker of [
  "key: 'professional'",
  "key: 'college'",
  "key: 'high-school'",
  "key: 'motorsports'",
  "key: 'golf'",
  "key: 'western'",
  "key: 'regional'",
  'getSportsVenueEnrichmentAll',
  'Verified trip details',
  'applyCurrentEntityCorrections',
]) {
  assert(directory.includes(marker), `Sports venue directory is missing category or enrichment marker ${marker}.`);
}

for (const marker of [
  "createFileRoute('/sports-venue/$slug')",
  "'@type': 'SportsActivityLocation'",
  'Plan the trip',
  'Why people travel',
  'Best trip pattern',
  'Before you go',
  'Verified visitor details',
  'Parking and access',
  'Arrival strategy',
  'Stay and eat',
  'Primary sports and events',
  'Official planning links',
  'sportsVenueMapUrl',
  'getSportsVenueEnrichmentAll',
  '/sports-venues',
]) {
  assert(guide.includes(marker), `Dedicated sports venue guide is missing required marker: ${marker}.`);
}

const firstBatchAnchors = [
  'att-stadium', 'texas-motor-speedway', 'circuit-of-the-americas', 'pga-frisco-fields-ranch',
  'kyle-field', 'ufcu-disch-falk-field', 'will-rogers-memorial-center', 'memorial-park-golf-course', 'waco-surf',
];
for (const slug of firstBatchAnchors) assert(enrichment.includes(`'${slug}': {`), `Missing first-batch priority venue enrichment: ${slug}.`);

const secondBatchAnchors = [
  'eagle-stadium-allen', 'national-shooting-complex', 'round-rock-sports-center', 'round-rock-multipurpose-complex',
  'colonial-country-club', 'tpc-san-antonio', 'globe-life-field', 'daikin-park',
  'darrell-k-royal-texas-memorial-stadium', 'olsen-field-blue-bell-park', 'frost-bank-center',
];
for (const slug of secondBatchAnchors) assert(enrichmentBatch2.includes(`'${slug}': {`), `Missing second-batch priority venue enrichment: ${slug}.`);

const thirdBatchAnchors = [
  'american-airlines-center', 'toyota-center-houston', 'moody-center', 'alamodome', 'amon-g-carter-stadium',
  'jones-att-stadium', 'q2-stadium', 'shell-energy-stadium', 'mclane-stadium', 'dickies-arena',
];
for (const slug of thirdBatchAnchors) assert(enrichmentBatch3.includes(`'${slug}': {`), `Missing third-batch priority venue enrichment: ${slug}.`);

const racingBatchAnchors = [
  'texas-motorplex', 'msr-houston', 'eagles-canyon-raceway', 'houston-motorsports-park',
  'lone-star-park', 'sam-houston-race-park', 'retama-park',
];
for (const slug of racingBatchAnchors) assert(enrichmentBatch4Racing.includes(`'${slug}': {`), `Missing deep racing venue enrichment: ${slug}.`);

const fifthBatchAnchors = [
  'toyota-stadium-frisco', 'ford-center-at-the-star', 'college-park-center', 'heb-center-at-cedar-park', 'dell-diamond',
  'foster-pavilion', 'reed-arena', 'gerald-j-ford-stadium', 'fertitta-center', 'tdecu-stadium',
];
for (const slug of fifthBatchAnchors) assert(enrichmentBatch5.includes(`'${slug}': {`), `Missing fifth-batch major venue enrichment: ${slug}.`);

for (const source of [enrichment, enrichmentBatch2, enrichmentBatch3, enrichmentBatch4Racing, enrichmentBatch5]) {
  for (const marker of ['primaryEvents:', 'parking:', 'arrival:', 'stayAndEat:', 'nearby:', 'planningLinks:', 'imageBrief:', 'verifiedAt,']) {
    assert(source.includes(marker), `Sports venue enrichment is missing required field: ${marker}.`);
  }
}

assert(enrichment.includes('sportsVenueMapUrl'), 'Sports venue enrichment is missing the map fallback helper.');
assert(enrichmentAll.includes('getSportsVenueEnrichmentBatch5(lookupSlug)'), 'Combined sports venue enrichment does not merge the fifth batch.');
assert(currentCorrections.includes("name: 'Galaxy Stadium'"), 'Current venue corrections must rename the Texas Tech football venue to Galaxy Stadium.');
assert(currentCorrections.includes("'Jones AT&T Stadium'"), 'Galaxy Stadium correction must preserve the former venue name as an alias.');
assert(currentCorrections.includes("'Galaxy Stadium'"), 'Galaxy Stadium correction must preserve the current venue name as a searchable alias.');
assert(!currentCorrections.includes("slug: 'galaxy-stadium'"), 'Galaxy Stadium correction must keep the established route stable until a repository-wide redirect migration is implemented.');
assert(galaxyGuide.includes("createFileRoute('/sports-venue/jones-att-stadium')"), 'Galaxy Stadium must have a static route override at the established Texas Tech venue URL.');
assert(galaxyGuide.includes("venueName = 'Galaxy Stadium'"), 'Galaxy Stadium static route must display the current venue name.');
assert(galaxyGuide.includes('Former name'), 'Galaxy Stadium guide must explain its former venue name.');
assert(tier2.includes("sourceConfidence: 'official'"), 'Second-tier venue seeds must remain official-source records.');
assert(tier2.includes("sourceCheckedAt: checkedAt"), 'Second-tier venue seeds must retain source review dates.');
assert(tier2.includes("status: 'active'"), 'Second-tier venue seeds must remain explicitly active.');
assert(tier2.includes("sourceId: 'official-destination-sites'"), 'Second-tier venue seeds must use the governed official destination source id.');

if (errors.length) {
  console.error('Sports venue coverage validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Sports venue coverage validated: ${majorCount} major seeds + ${tier2Count} second-tier seeds, ${totalEnrichmentCount} deep visitor profiles including ${enrichmentBatch4RacingCount} racing profiles, current-name corrections and dedicated visitor guides present.`);
