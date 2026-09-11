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

const [
  major,
  tier2,
  seed,
  enrichmentAll,
  maintenanceCorrections,
  entityCorrections,
  editorialDescriptions,
  editorialDescriptionsWave6,
  editorialDescriptionsWave7,
  editorialDescriptionsWave8,
  editorialDescriptionsWave9,
  remediationWave9,
  ...enrichmentSources
] = await Promise.all([
  read('src/data/knowledge-graph/major-sports-venues.ts'),
  read('src/data/knowledge-graph/sports-venues-tier2.ts'),
  read('src/data/knowledge-graph/seed.ts'),
  read('src/data/sports-venue-enrichment-all.ts'),
  read('src/data/sports-venue-maintenance.ts'),
  read('src/data/knowledge-graph/current-entity-corrections.ts'),
  read('src/data/sports-venue-editorial.server.ts'),
  read('src/data/sports-venue-editorial-wave6.server.ts'),
  read('src/data/sports-venue-editorial-wave7.server.ts'),
  read('src/data/sports-venue-editorial-wave8.server.ts'),
  read('src/data/sports-venue-editorial-wave9.server.ts'),
  read('src/data/sports-venue-content-remediation-wave9.ts'),
  ...enrichmentFiles.map(read),
]);

const errors = [];
const assert = (condition, message) => { if (!condition) errors.push(message); };

// Venue names may be single- or double-quoted (for example Children's Health Stadium).
// Slugs remain single-quoted in both seed datasets.
const rowSlugs = (source) => [...source.matchAll(/^\s{2}\[(?:'[^']*'|"[^"]*"), '([^']+)'/gm)].map((match) => match[1]);
const coreSportsVenueSlugs = [...seed.matchAll(/^\s*\{id:'sports-venue:[^']+',kind:'sports-venue',name:'[^']+',slug:'([^']+)'/gm)].map((match) => match[1]);
const seededSlugs = [...new Set([...rowSlugs(major), ...rowSlugs(tier2), ...coreSportsVenueSlugs])].sort();

const profileOccurrences = new Map();
const requiredMarkers = ['primaryEvents:', 'parking:', 'arrival:', 'planningLinks:', 'imageBrief:', 'verifiedAt,'];

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

const baseEnrichmentSource = enrichmentSources[0] ?? '';
assert(baseEnrichmentSource.includes('stayAndEat?: string;'), 'Sports venue stayAndEat context must remain optional so weak filler can be omitted.');
assert(baseEnrichmentSource.includes('nearby?: string;'), 'Sports venue nearby context must remain optional so weak filler can be omitted.');

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
assert(profileSet.has('childrens-health-stadium-prosper'), 'Double-quoted seed rows must remain covered by deep-completeness governance.');
assert(enrichmentAll.includes('getSportsVenueEnrichmentBatch8ACompletion(lookupSlug)'), 'Combined enrichment lookup does not include batch 8A completion profiles.');
assert(enrichmentAll.includes('getSportsVenueEnrichmentBatch8BCompletion(lookupSlug)'), 'Combined enrichment lookup does not include batch 8B completion profiles.');
assert(enrichmentAll.includes('getSportsVenueContentRemediationWave9(lookupSlug)'), 'Combined enrichment lookup does not include Phase 1D wave 9 remediation profiles.');
assert(enrichmentAll.includes('applySportsVenueMaintenance(lookupSlug, profile)'), 'Combined enrichment lookup must apply post-Phase 1D maintenance corrections after resolving the canonical profile.');

for (const slug of ['toyota-stadium-frisco', 'daikin-park', 'college-park-center']) {
  assert(maintenanceCorrections.includes(`slug === '${slug}'`), `Post-Phase 1D maintenance correction is missing for ${slug}.`);
}
assert(!maintenanceCorrections.includes('including east-side access during part of 2026'), 'Toyota Stadium maintenance must not restore the obsolete east-side-access construction wording.');
assert(maintenanceCorrections.includes('const { capacity: _unstableCapacity, ...rest } = profile;'), 'Daikin Park maintenance must omit the disputed fixed capacity until official sources converge.');
assert(maintenanceCorrections.includes('2027 home schedule will move to American Airlines Center'), 'College Park Center maintenance must preserve the announced 2027 Dallas Wings venue transition.');
assert(entityCorrections.includes("corrected.id === 'sports-venue:college-park-center'"), 'College Park Center must have a durable current-entity description correction.');
assert(entityCorrections.includes('announced 2027 move to American Airlines Center'), 'College Park Center entity correction must not present Dallas Wings tenancy as a permanent venue identity.');

const phase1dWave9Slugs = [
  'amarillo-national-center',
  'extraco-events-center',
  'expo-center-taylor-county',
  'msr-houston',
  'eagles-canyon-raceway',
  'xtreme-raceway-park',
  'houston-motorsports-park',
  'national-shooting-complex',
  'waco-surf',
  'jamail-texas-swimming-center',
];
for (const slug of phase1dWave9Slugs) {
  const occurrences = [...remediationWave9.matchAll(new RegExp(`'${slug}': \\{`, 'g'))].length;
  assert(occurrences >= 2, `Phase 1D wave 9 must keep both quality and runtime remediation records for ${slug}.`);
  assert(editorialDescriptionsWave9.includes(`'sports-venue:${slug}':`), `Phase 1D wave 9 venue ${slug} is missing its explicit server editorial description.`);
}
assert(editorialDescriptionsWave8.includes("getSportsVenueEditorialDescriptionWave9Server"), 'Wave 8 editorial fallback must delegate misses to the Wave 9 editorial registry.');
assert(editorialDescriptionsWave8.includes("sportsVenueEditorialDescriptionsWave8[id] ?? getSportsVenueEditorialDescriptionWave9Server(id)"), 'Wave 9 editorial fallback is not wired after the Wave 8 registry.');

const editorialDescriptionIds = new Set([
  ...[...editorialDescriptions.matchAll(/^\s{2}'(sports-venue:[^']+)':/gm)].map((match) => match[1]),
  ...[...editorialDescriptionsWave6.matchAll(/^\s{2}'(sports-venue:[^']+)':/gm)].map((match) => match[1]),
  ...[...editorialDescriptionsWave7.matchAll(/^\s{2}'(sports-venue:[^']+)':/gm)].map((match) => match[1]),
  ...[...editorialDescriptionsWave8.matchAll(/^\s{2}'(sports-venue:[^']+)':/gm)].map((match) => match[1]),
  ...[...editorialDescriptionsWave9.matchAll(/^\s{2}'(sports-venue:[^']+)':/gm)].map((match) => match[1]),
]);
assert(seededSlugs.length === 84, `Expected exactly 84 seeded sports venues; found ${seededSlugs.length}.`);
assert(editorialDescriptionIds.size === 84, `Expected explicit server editorial coverage for all 84 sports venues after Phase 1D wave 9; found ${editorialDescriptionIds.size}.`);
for (const slug of seededSlugs) {
  assert(editorialDescriptionIds.has(`sports-venue:${slug}`), `Seeded sports venue lacks an explicit server editorial description: ${slug}.`);
}

if (errors.length) {
  console.error('Sports venue deep-completeness validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Sports venue deep completeness validated: ${seededSlugs.length} unique seeded sports venues, ${profileSlugs.length} deep profiles, ${editorialDescriptionIds.size}/84 explicit server editorial descriptions, all ${phase1dWave9Slugs.length} Wave 9 venues retain separated quality/runtime/editorial coverage, targeted Toyota Stadium/Daikin Park/College Park Center maintenance corrections are protected, no gaps, duplicates or orphan profiles; optional stay/nearby context is not required filler.`);
