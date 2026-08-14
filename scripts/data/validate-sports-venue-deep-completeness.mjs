import fs from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const read = (file) => fs.readFile(path.join(root, file), 'utf8');

const enrichmentFiles = [
  'src/data/sports-venue-enrichment.ts',
  'src/data/sports-venue-enrichment-batch2.ts',
  'src/data/sports-venue-enrichment-batch3.ts',
  'src/data/sports-venue-enrichment-batch4-racing.ts',
  'src/data/sports-venue-enrichment-batch5.ts',
  'src/data/sports-venue-enrichment-batch6.ts',
  'src/data/sports-venue-enrichment-batch7-major-completion.ts',
  'src/data/sports-venue-enrichment-batch8a-completion.ts',
  'src/data/sports-venue-enrichment-batch8b-completion.ts',
];

const [major, tier2, seed, enrichmentAll, ...enrichmentSources] = await Promise.all([
  read('src/data/knowledge-graph/major-sports-venues.ts'),
  read('src/data/knowledge-graph/sports-venues-tier2.ts'),
  read('src/data/knowledge-graph/seed.ts'),
  read('src/data/sports-venue-enrichment-all.ts'),
  ...enrichmentFiles.map(read),
]);

const errors = [];
const assert = (condition, message) => { if (!condition) errors.push(message); };

const rowSlugs = (source) => [...source.matchAll(/^\s{2}\['[^']+', '([^']+)'/gm)].map((match) => match[1]);
const coreSportsVenueSlugs = [...seed.matchAll(/^\s*\{id:'sports-venue:[^']+',kind:'sports-venue',name:'[^']+',slug:'([^']+)'/gm)].map((match) => match[1]);
const seededSlugs = [...new Set([...rowSlugs(major), ...rowSlugs(tier2), ...coreSportsVenueSlugs])].sort();

const profileOccurrences = new Map();
const requiredMarkers = ['primaryEvents:', 'parking:', 'arrival:', 'stayAndEat:', 'nearby:', 'planningLinks:', 'imageBrief:', 'verifiedAt,'];

for (let i = 0; i < enrichmentSources.length; i += 1) {
  const source = enrichmentSources[i];
  const file = enrichmentFiles[i];
  const entries = [...source.matchAll(/^\s{2}'([^']+)': \{([\s\S]*?)(?=^\s{2}'[^']+': \{|^\};)/gm)];
  assert(entries.length > 0, `No venue enrichment profiles found in ${file}.`);
  for (const [, slug, body] of entries) {
    const occurrences = profileOccurrences.get(slug) ?? [];
    occurrences.push(file);
    profileOccurrences.set(slug, occurrences);
    for (const marker of requiredMarkers) {
      assert(body.includes(marker), `Deep sports venue profile ${slug} in ${file} is missing ${marker}`);
    }
  }
}

const profileSlugs = [...profileOccurrences.keys()].sort();
const seededSet = new Set(seededSlugs);
const profileSet = new Set(profileSlugs);

assert(seededSlugs.length >= 80, `Expected a statewide seeded sports venue inventory; found only ${seededSlugs.length} unique venues.`);
for (const slug of seededSlugs) {
  assert(profileSet.has(slug), `Seeded sports venue lacks a deep visitor profile: ${slug}.`);
}
for (const slug of profileSlugs) {
  assert(seededSet.has(slug), `Deep sports venue profile has no seeded venue record: ${slug}.`);
}
for (const [slug, files] of profileOccurrences) {
  assert(files.length === 1, `Deep sports venue profile is defined more than once: ${slug} (${files.join(', ')}).`);
}

assert(seededSlugs.length === profileSlugs.length, `Seed/profile cardinality mismatch: ${seededSlugs.length} unique seeded venues vs ${profileSlugs.length} deep profiles.`);
assert(coreSportsVenueSlugs.includes('reliant-stadium'), 'Core Reliant Stadium seed is missing from deep-completeness governance.');
assert(profileSet.has('reliant-stadium'), 'Reliant Stadium is missing its deep visitor profile.');
assert(profileSet.has('lupton-stadium'), 'Tier-2 major tourist draw Lupton Stadium is missing its deep visitor profile.');
assert(profileSet.has('jamail-texas-swimming-center'), 'Tier-2 major tourist draw Jamail Texas Swimming Center is missing its deep visitor profile.');
assert(enrichmentAll.includes('getSportsVenueEnrichmentBatch8ACompletion(lookupSlug)'), 'Combined enrichment lookup does not include batch 8A completion profiles.');
assert(enrichmentAll.includes('getSportsVenueEnrichmentBatch8BCompletion(lookupSlug)'), 'Combined enrichment lookup does not include batch 8B completion profiles.');

if (errors.length) {
  console.error('Sports venue deep-completeness validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Sports venue deep completeness validated: ${seededSlugs.length} unique seeded sports venues, ${profileSlugs.length} deep profiles, no gaps, duplicates or orphan profiles.`);
