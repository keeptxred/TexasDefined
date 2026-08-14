import fs from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const read = (file) => fs.readFile(path.join(root, file), 'utf8');

const [major, tier2, seed, directory, guide, enrichment] = await Promise.all([
  read('src/data/knowledge-graph/major-sports-venues.ts'),
  read('src/data/knowledge-graph/sports-venues-tier2.ts'),
  read('src/data/knowledge-graph/seed.ts'),
  read('src/routes/sports-venues.tsx'),
  read('src/routes/sports-venue.$slug.tsx'),
  read('src/data/sports-venue-enrichment.ts'),
]);

const errors = [];
const assert = (condition, message) => { if (!condition) errors.push(message); };
const countSeedRows = (source) => [...source.matchAll(/^\s{2}\[(?:'|")/gm)].length;
const countEnrichmentProfiles = (source) => [...source.matchAll(/^\s{2}'[^']+': \{/gm)].length;

const majorCount = countSeedRows(major);
const tier2Count = countSeedRows(tier2);
const enrichmentCount = countEnrichmentProfiles(enrichment);

assert(majorCount >= 50, `Expected at least 50 major sports venue seeds; found ${majorCount}.`);
assert(tier2Count === 29, `Expected 29 second-tier sports-tourism seeds; found ${tier2Count}.`);
assert(enrichmentCount >= 9, `Expected at least 9 deeply enriched venue profiles; found ${enrichmentCount}.`);
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
]) {
  assert(directory.includes(marker), `Sports venue directory is missing category marker ${marker}.`);
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
  '/sports-venues',
]) {
  assert(guide.includes(marker), `Dedicated sports venue guide is missing required marker: ${marker}.`);
}

const enrichedAnchors = [
  'att-stadium',
  'texas-motor-speedway',
  'circuit-of-the-americas',
  'pga-frisco-fields-ranch',
  'kyle-field',
  'ufcu-disch-falk-field',
  'will-rogers-memorial-center',
  'memorial-park-golf-course',
  'waco-surf',
];
for (const slug of enrichedAnchors) {
  assert(enrichment.includes(`'${slug}': {`), `Missing priority venue enrichment: ${slug}.`);
}

for (const marker of [
  'primaryEvents:',
  'parking:',
  'arrival:',
  'stayAndEat:',
  'nearby:',
  'planningLinks:',
  'imageBrief:',
  'verifiedAt,',
  'sportsVenueMapUrl',
]) {
  assert(enrichment.includes(marker), `Sports venue enrichment is missing required field or helper: ${marker}.`);
}

assert(tier2.includes("sourceConfidence: 'official'"), 'Second-tier venue seeds must remain official-source records.');
assert(tier2.includes("sourceCheckedAt: checkedAt"), 'Second-tier venue seeds must retain source review dates.');
assert(tier2.includes("status: 'active'"), 'Second-tier venue seeds must remain explicitly active.');
assert(tier2.includes("sourceId: 'official-destination-sites'"), 'Second-tier venue seeds must use the governed official destination source id.');

if (errors.length) {
  console.error('Sports venue coverage validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Sports venue coverage validated: ${majorCount} major seeds + ${tier2Count} second-tier seeds, ${enrichmentCount} deep visitor profiles, dedicated directory and visitor guide present.`);
