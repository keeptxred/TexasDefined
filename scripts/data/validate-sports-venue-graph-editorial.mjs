import fs from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const read = (file) => fs.readFile(path.join(root, file), 'utf8');

const editorialFiles = [
  'src/data/sports-venue-editorial.server.ts',
  'src/data/sports-venue-editorial-wave6.server.ts',
  'src/data/sports-venue-editorial-wave7.server.ts',
  'src/data/sports-venue-editorial-wave8.server.ts',
  'src/data/sports-venue-editorial-wave9.server.ts',
];

const [corrections, functions, graph, countyComponent, entityRoute, majorSeeds, tier2Seeds, ...editorialSources] = await Promise.all([
  read('src/data/knowledge-graph/current-entity-corrections.ts'),
  read('src/data/sports-venue-editorial.functions.ts'),
  read('src/data/knowledge-graph/index.ts'),
  read('src/components/sports/CountySportsDestinations.tsx'),
  read('src/routes/$kind.$slug.tsx'),
  read('src/data/knowledge-graph/major-sports-venues.ts'),
  read('src/data/knowledge-graph/sports-venues-tier2.ts'),
  ...editorialFiles.map(read),
]);

const errors = [];
const assert = (condition, message) => { if (!condition) errors.push(message); };

const generatedMarkers = [
  'Texas Defined tracks it as a visitor-facing venue',
  'Texas Defined includes it in the statewide venue guide to connect the sporting experience with practical trip planning and the surrounding county and region.',
];

assert(majorSeeds.includes(generatedMarkers[0]), 'Major sports seed generator no longer matches the governed generated-copy marker; update the suppression rule before publishing changed template prose.');
assert(tier2Seeds.includes(generatedMarkers[1]), 'Tier-2 sports seed generator no longer matches the governed generated-copy marker; update the suppression rule before publishing changed template prose.');
for (const marker of generatedMarkers) {
  assert(corrections.includes(marker), `Current sports-venue corrections must suppress generated marker: ${marker}`);
}
assert(corrections.includes('generatedSportsVenueMarkers.some'), 'Sports-venue correction layer must test all governed generated-copy markers.');
assert(corrections.includes('return undefined;'), 'Generated sports-venue seed descriptions must be removed, not shortened and republished.');
assert(!corrections.includes('firstSentenceEnd'), 'Sports-venue correction layer must not fall back to the old first-sentence generated description.');

for (const marker of [
  'getSportsVenueEditorialDescriptions',
  '.inputValidator((data: { ids: string[] }) => data)',
  'for (const id of new Set(data.ids))',
  'getSportsVenueEditorialDescriptionServer(id)',
]) assert(functions.includes(marker), `Bulk sports-venue editorial server bridge is missing marker: ${marker}`);

for (const marker of [
  "import { applyCurrentEntityCorrections } from './current-entity-corrections';",
  'function currentStaticEntity(entity: TexasEntityRecord)',
  "entity.kind === 'sports-venue' ? applyCurrentEntityCorrections(entity) : entity",
  '.map(currentStaticEntity)',
  'merged.set(entity.id, currentStaticEntity(entity))',
  'getSportsVenueEditorialDescriptions({ data: { ids: sportsVenueIds } })',
  'sportsVenueEditorialDescriptions[entity.id]',
  "if (entity.kind !== 'sports-venue') continue;",
  'if (description) enrichedById.set(entity.id, { ...entity, description });',
  'const corrected = applyCurrentEntityCorrections(entity);',
]) assert(graph.includes(marker), `Knowledge graph sports-venue editorial wiring is missing marker: ${marker}`);

assert(countyComponent.includes('{venue.description ? <span'), 'County sports destination cards must render enriched venue descriptions when available.');
assert(entityRoute.includes('const countySportsVenues = entity.kind === \'county\''), 'County route must continue deriving sports venues from the loaded full graph.');
assert(entityRoute.includes("candidate.kind === 'sports-venue'"), 'County route must continue selecting sports venues from the loaded full graph.');

const editorialEntries = editorialSources.flatMap((source) =>
  [...source.matchAll(/^\s{2}'(sports-venue:[^']+)':\s*'((?:\\'|[^'])*)',?\s*$/gm)]
    .map((match) => ({ id: match[1], description: match[2] })),
);
assert(editorialEntries.length === 84, `Bulk graph enrichment requires 84 explicit sports-venue editorial descriptions; found ${editorialEntries.length}.`);
assert(new Set(editorialEntries.map((entry) => entry.id)).size === 84, 'Bulk graph enrichment contains duplicate sports-venue editorial IDs.');
for (const marker of generatedMarkers) {
  assert(editorialEntries.every((entry) => !entry.description.includes(marker)), `Vetted editorial descriptions must not contain retired generated marker: ${marker}`);
}

if (errors.length) {
  console.error('Sports venue graph editorial validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('Sports venue graph editorial validation passed: generated seed prose is suppressed before publication, 84/84 vetted editorial descriptions are available through the bulk server bridge, and county/full-graph surfaces are wired to receive differentiated copy.');
