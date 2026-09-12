import fs from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const read = (file) => fs.readFile(path.join(root, file), 'utf8');

const remediationFiles = [
  'src/data/sports-venue-content-remediation.ts',
  'src/data/sports-venue-content-remediation-wave2.ts',
  'src/data/sports-venue-content-remediation-wave3.ts',
  'src/data/sports-venue-content-remediation-wave4.ts',
  'src/data/sports-venue-content-remediation-wave5.ts',
  'src/data/sports-venue-content-remediation-wave6.ts',
  'src/data/sports-venue-content-remediation-wave7.ts',
  'src/data/sports-venue-content-remediation-wave8.ts',
  'src/data/sports-venue-content-remediation-wave9.ts',
];

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

const [route, sharedGuide, enrichmentAll, historyCompletion, editorial, wave6, wave7, wave8, wave9, remediationSources, enrichmentSources] = await Promise.all([
  read('src/routes/sports-venue.$slug.tsx'),
  read('src/components/sports/SportsVenueGuidePage.tsx'),
  read('src/data/sports-venue-enrichment-all.ts'),
  read('src/data/sports-venue-history-completion.ts'),
  read('src/data/sports-venue-editorial.server.ts'),
  read('src/data/sports-venue-editorial-wave6.server.ts'),
  read('src/data/sports-venue-editorial-wave7.server.ts'),
  read('src/data/sports-venue-editorial-wave8.server.ts'),
  read('src/data/sports-venue-editorial-wave9.server.ts'),
  Promise.all(remediationFiles.map(read)),
  Promise.all(enrichmentFiles.map(read)),
]);

const errors = [];
const assert = (condition, message) => { if (!condition) errors.push(message); };
const normalizeCopy = (value) => value.replaceAll("\\'", "'").replace(/\s+/g, ' ').trim();
const normalize = (value) => normalizeCopy(value).toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
const extractLiteral = (body, field) => {
  const match = body.match(new RegExp(`^\\s{4}${field}:\\s*'((?:\\\\'|[^'])*)',?$`, 'm'));
  return match?.[1] ? normalizeCopy(match[1]) : undefined;
};
const parseEntries = (source) => [...source.matchAll(/^\s{2}'([^']+)': \{([\s\S]*?)(?=^\s{2}'[^']+': \{|^\};)/gm)]
  .map((match) => ({ slug: match[1], body: match[2] }));
const banned = [
  'texas defined tracks it as a visitor-facing venue',
  'texasdefined tracks it as a visitor-facing venue',
  'connect the event experience with the surrounding city and county',
];

function assertUniqueCopy(items, field, label) {
  const groups = new Map();
  for (const item of items) {
    const value = item[field];
    if (!value) continue;
    const key = normalize(value);
    const slugs = groups.get(key) ?? [];
    slugs.push(item.slug ?? item.id);
    groups.set(key, slugs);
    for (const fragment of banned) {
      assert(!value.toLowerCase().includes(fragment), `${label} copy reintroduced retired boilerplate in ${item.slug ?? item.id}: “${fragment}”.`);
    }
  }
  for (const slugs of groups.values()) {
    assert(slugs.length === 1, `${label} copy must be venue-specific; identical text is shared by ${slugs.join(', ')}.`);
  }
}

const editorialEntries = [editorial, wave6, wave7, wave8, wave9].flatMap((source) =>
  [...source.matchAll(/^\s{2}'(sports-venue:[^']+)':\s*'((?:\\'|[^'])*)',?\s*$/gm)]
    .map((match) => ({ id: match[1], description: normalizeCopy(match[2]) })),
);
assert(editorialEntries.length === 84, `Expected 84 explicit sports-venue editorial descriptions; found ${editorialEntries.length}.`);
assertUniqueCopy(editorialEntries, 'description', 'Editorial lead');

const base = new Map();
for (let index = 0; index < enrichmentSources.length; index += 1) {
  const file = enrichmentFiles[index];
  const entries = parseEntries(enrichmentSources[index]);
  assert(entries.length > 0, `No sports venue deep-enrichment entries found in ${file}.`);
  for (const { slug, body } of entries) {
    const parking = extractLiteral(body, 'parking');
    const arrival = extractLiteral(body, 'arrival');
    const history = extractLiteral(body, 'history');
    assert(Boolean(parking), `${slug} in ${file} is missing literal parking copy.`);
    assert(Boolean(arrival), `${slug} in ${file} is missing literal arrival copy.`);
    assert(!base.has(slug), `Duplicate base sports venue profile: ${slug}.`);
    base.set(slug, { slug, parking, arrival, history, source: file });
  }
}
assert(base.size === 84, `Expected 84 canonical deep-enrichment profiles; found ${base.size}.`);

const remediated = new Map();
for (let index = 0; index < remediationSources.length; index += 1) {
  const source = remediationSources[index];
  const file = remediationFiles[index];
  const marker = source.indexOf('export const SPORTS_VENUE_CONTENT_REMEDIATION');
  assert(marker >= 0, `Runtime remediation export missing in ${file}.`);
  if (marker < 0) continue;
  const historyBySlug = new Map();
  for (const { slug, body } of parseEntries(source.slice(0, marker))) {
    const story = extractLiteral(body, 'editorialStory');
    if (story) historyBySlug.set(slug, story);
  }
  for (const { slug, body } of parseEntries(source.slice(marker))) {
    const parking = extractLiteral(body, 'parking');
    const arrival = extractLiteral(body, 'arrival');
    const history = extractLiteral(body, 'history') ?? historyBySlug.get(slug);
    assert(Boolean(parking), `${slug} in ${file} is missing remediated parking copy.`);
    assert(Boolean(arrival), `${slug} in ${file} is missing remediated arrival copy.`);
    assert(Boolean(history), `${slug} in ${file} is missing remediated history copy.`);
    assert(!remediated.has(slug), `Duplicate sports venue remediation: ${slug}.`);
    remediated.set(slug, { slug, parking, arrival, history, source: file });
  }
}
assert(remediated.size === 71, `Expected 71 remediated sports venues; found ${remediated.size}.`);

const completion = new Map();
for (const { slug, body } of parseEntries(historyCompletion)) {
  const history = extractLiteral(body, 'history');
  assert(Boolean(history), `${slug} history completion is missing literal history copy.`);
  completion.set(slug, history);
}
assert(completion.size === 5, `Expected 5 targeted history completions; found ${completion.size}.`);

const beforeCompletion = [...base.values()].map((item) => remediated.get(item.slug) ?? item);
const missingBeforeCompletion = beforeCompletion.filter((item) => !item.history).map((item) => item.slug).sort();
const completionSlugs = [...completion.keys()].sort();
assert(missingBeforeCompletion.length === 5, `Expected exactly 5 pre-completion history gaps; found ${missingBeforeCompletion.length}: ${missingBeforeCompletion.join(', ')}.`);
assert(JSON.stringify(missingBeforeCompletion) === JSON.stringify(completionSlugs), `History completion must target exactly the five effective gaps. Missing: ${missingBeforeCompletion.join(', ')}. Completion: ${completionSlugs.join(', ')}.`);

const effective = beforeCompletion.map((item) => ({ ...item, history: item.history ?? completion.get(item.slug) }));
assert(effective.length === 84, `Expected 84 effective sports venue profiles; found ${effective.length}.`);
assert(effective.every((item) => item.parking && item.arrival && item.history), 'Every effective sports venue profile must retain parking, arrival and history copy.');
assertUniqueCopy(effective, 'parking', 'Parking');
assertUniqueCopy(effective, 'arrival', 'Arrival');
assertUniqueCopy(effective, 'history', 'Venue history');

assert(enrichmentAll.includes("getSportsVenueHistoryCompletion"), 'Effective enrichment lookup must apply the source-backed history completion layer.');
assert(enrichmentAll.includes('history: completion.history'), 'Effective enrichment lookup must expose completed history to the shared guide.');
assert(enrichmentAll.includes('[...maintained.planningLinks, completion.source]'), 'Completed history must append its official source to visible planning links.');
assert(sharedGuide.includes('parking={enrichment.parking}'), 'Shared guide must render venue-specific parking copy.');
assert(sharedGuide.includes('arrival={enrichment.arrival}'), 'Shared guide must render venue-specific arrival copy.');
assert(sharedGuide.includes('{enrichment.history}'), 'Shared guide must render venue-specific history copy.');

const subtitleIndex = sharedGuide.indexOf('{guide.subtitle}');
const visibleDescriptionIndex = sharedGuide.indexOf('{entity.description}');
assert(subtitleIndex >= 0 && visibleDescriptionIndex > subtitleIndex, 'Shared guide must visibly render the unique editorial lead after the venue subtitle.');
assert(sharedGuide.includes('entity.description ? ('), 'Shared guide must conditionally render the venue-specific editorial lead.');
assert(route.includes('description: sportsVenueSearchDescription(entity, enrichment)'), 'Sports venue metadata must pass the complete entity to the search-description builder.');
assert(!route.includes('sportsVenueSearchDescription(entity.name, enrichment)'), 'Sports venue metadata must not regress to the old name-only builder.');
assert(route.includes("const editorial = entity.description?.replace(/\\s+/g, ' ').trim();"), 'Search metadata must normalize venue-specific editorial copy.');
assert(route.includes('if (editorial) return truncateMetaDescription(editorial);'), 'Search metadata must prefer venue-specific editorial copy before generic fallbacks.');
assert(route.indexOf('if (editorial) return truncateMetaDescription(editorial);') < route.indexOf("const city = enrichment?.city"), 'Editorial metadata must execute before the generic fallback.');

if (errors.length) {
  console.error('Sports venue visible editorial validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Sports venue visible editorial validation passed: 84/84 unique editorial leads and 84/84 effective venue profiles retain unique parking, arrival and history copy; ${completion.size} source-backed history completions close the prior base-profile gaps; retired boilerplate remains absent; visible guide sections and editorial-first metadata remain wired.`);
