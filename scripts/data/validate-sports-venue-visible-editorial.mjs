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

const [
  route,
  sharedGuide,
  editorial,
  wave6,
  wave7,
  wave8,
  wave9,
  ...remediationSources
] = await Promise.all([
  read('src/routes/sports-venue.$slug.tsx'),
  read('src/components/sports/SportsVenueGuidePage.tsx'),
  read('src/data/sports-venue-editorial.server.ts'),
  read('src/data/sports-venue-editorial-wave6.server.ts'),
  read('src/data/sports-venue-editorial-wave7.server.ts'),
  read('src/data/sports-venue-editorial-wave8.server.ts'),
  read('src/data/sports-venue-editorial-wave9.server.ts'),
  ...remediationFiles.map(read),
]);

const errors = [];
const assert = (condition, message) => {
  if (!condition) errors.push(message);
};

const normalizeCopy = (value) => value
  .replaceAll("\\'", "'")
  .replace(/\s+/g, ' ')
  .trim();

const normalizeForDuplicateCheck = (value) => normalizeCopy(value)
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, ' ')
  .trim();

const editorialSources = [editorial, wave6, wave7, wave8, wave9];
const editorialIds = new Set(
  editorialSources.flatMap((source) =>
    [...source.matchAll(/^\s{2}'(sports-venue:[^']+)':/gm)].map((match) => match[1]),
  ),
);

assert(
  editorialIds.size === 84,
  `Expected 84 explicit sports-venue editorial descriptions; found ${editorialIds.size}.`,
);

const editorialEntries = editorialSources.flatMap((source) =>
  [...source.matchAll(/^\s{2}'(sports-venue:[^']+)':\s*'((?:\\'|[^'])*)',?\s*$/gm)].map((match) => ({
    id: match[1],
    description: normalizeCopy(match[2]),
  })),
);

assert(
  editorialEntries.length === 84,
  `Expected to parse all 84 sports-venue editorial descriptions for anti-boilerplate checks; parsed ${editorialEntries.length}.`,
);

const bannedBoilerplateFragments = [
  'texas defined tracks it as a visitor-facing venue',
  'texasdefined tracks it as a visitor-facing venue',
  'connect the event experience with the surrounding city and county',
];

for (const { id, description } of editorialEntries) {
  const normalized = description.toLowerCase();
  for (const fragment of bannedBoilerplateFragments) {
    assert(
      !normalized.includes(fragment),
      `${id} reintroduced banned sports-venue boilerplate: “${fragment}”.`,
    );
  }
}

const descriptionsByNormalizedText = new Map();
for (const { id, description } of editorialEntries) {
  const normalized = normalizeForDuplicateCheck(description);
  const ids = descriptionsByNormalizedText.get(normalized) ?? [];
  ids.push(id);
  descriptionsByNormalizedText.set(normalized, ids);
}

for (const ids of descriptionsByNormalizedText.values()) {
  assert(
    ids.length === 1,
    `Sports-venue editorial descriptions must be unique; identical copy is shared by ${ids.join(', ')}.`,
  );
}

const runtimeSections = [];
const historyStories = [];

for (let index = 0; index < remediationSources.length; index += 1) {
  const source = remediationSources[index];
  const file = remediationFiles[index];
  const runtimeMarker = source.indexOf('export const SPORTS_VENUE_CONTENT_REMEDIATION');
  assert(runtimeMarker >= 0, `Sports venue remediation runtime export is missing in ${file}.`);
  if (runtimeMarker < 0) continue;

  const runtimeSource = source.slice(runtimeMarker);
  const entries = [...runtimeSource.matchAll(/^\s{2}'([^']+)': \{([\s\S]*?)(?=^\s{2}'[^']+': \{|^\};)/gm)];
  assert(entries.length > 0, `No sports venue runtime remediation entries found in ${file}.`);

  for (const [, slug, body] of entries) {
    const parking = body.match(/^\s{4}parking:\s*'((?:\\'|[^'])*)',?$/m)?.[1];
    const arrival = body.match(/^\s{4}arrival:\s*'((?:\\'|[^'])*)',?$/m)?.[1];
    assert(Boolean(parking), `Sports venue runtime remediation ${slug} in ${file} is missing a literal parking section.`);
    assert(Boolean(arrival), `Sports venue runtime remediation ${slug} in ${file} is missing a literal arrival section.`);
    if (parking && arrival) {
      runtimeSections.push({ slug, file, parking: normalizeCopy(parking), arrival: normalizeCopy(arrival) });
    }
  }

  for (const match of source.matchAll(/^\s{4}editorialStory:\s*'((?:\\'|[^'])*)',?$/gm)) {
    historyStories.push({ file, story: normalizeCopy(match[1]) });
  }
}

assert(
  runtimeSections.length === 84,
  `Expected source-reviewed runtime parking/arrival remediation for all 84 sports venues; found ${runtimeSections.length}.`,
);
assert(
  historyStories.length === 84,
  `Expected source-reviewed editorial history stories for all 84 sports venues; found ${historyStories.length}.`,
);

const assertUniqueSectionCopy = (items, field, label) => {
  const groups = new Map();
  for (const item of items) {
    const normalized = normalizeForDuplicateCheck(item[field]);
    const records = groups.get(normalized) ?? [];
    records.push(item.slug ?? item.file);
    groups.set(normalized, records);

    const lower = item[field].toLowerCase();
    for (const fragment of bannedBoilerplateFragments) {
      assert(!lower.includes(fragment), `${label} copy reintroduced retired boilerplate in ${item.slug ?? item.file}: “${fragment}”.`);
    }
  }
  for (const records of groups.values()) {
    assert(records.length === 1, `${label} copy must be venue-specific; identical text is shared by ${records.join(', ')}.`);
  }
};

assertUniqueSectionCopy(runtimeSections, 'parking', 'Parking');
assertUniqueSectionCopy(runtimeSections, 'arrival', 'Arrival');
assertUniqueSectionCopy(historyStories, 'story', 'Venue history');

assert(
  sharedGuide.includes('parking={enrichment.parking}'),
  'Shared sports venue guide must keep rendering the venue-specific parking field.',
);
assert(
  sharedGuide.includes('arrival={enrichment.arrival}'),
  'Shared sports venue guide must keep rendering the venue-specific arrival field.',
);
assert(
  sharedGuide.includes('{enrichment.history}'),
  'Shared sports venue guide must keep rendering the venue-specific history field.',
);

const subtitleIndex = sharedGuide.indexOf('{guide.subtitle}');
const visibleDescriptionIndex = sharedGuide.indexOf('{entity.description}');
assert(subtitleIndex >= 0, 'Shared sports venue guide no longer renders its venue subtitle.');
assert(
  visibleDescriptionIndex > subtitleIndex,
  'Shared sports venue guide must visibly render entity.description after the venue subtitle.',
);
assert(
  sharedGuide.includes('entity.description ? ('),
  'Shared sports venue guide must conditionally render the venue-specific editorial lead.',
);

assert(
  route.includes('description: sportsVenueSearchDescription(entity, enrichment)'),
  'Sports venue metadata must pass the complete entity into the search-description builder.',
);
assert(
  !route.includes('sportsVenueSearchDescription(entity.name, enrichment)'),
  'Sports venue metadata must not regress to the old name-only template builder.',
);
assert(
  route.includes("const editorial = entity.description?.replace(/\\s+/g, ' ').trim();"),
  'Sports venue metadata must normalize the venue-specific editorial description.',
);
assert(
  route.includes('if (editorial) return truncateMetaDescription(editorial);'),
  'Sports venue metadata must prefer venue-specific editorial copy before template fallbacks.',
);
assert(
  route.includes('function truncateMetaDescription'),
  'Sports venue editorial metadata must retain bounded snippet truncation.',
);

const editorialPreferenceIndex = route.indexOf('if (editorial) return truncateMetaDescription(editorial);');
const genericFallbackIndex = route.indexOf("const city = enrichment?.city");
assert(
  editorialPreferenceIndex >= 0 && genericFallbackIndex > editorialPreferenceIndex,
  'Venue-specific editorial metadata must execute before the generic sports-venue fallback.',
);

if (errors.length) {
  console.error('Sports venue visible editorial validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Sports venue visible editorial validation passed: ${editorialIds.size}/84 explicit editorial descriptions remain covered; all ${runtimeSections.length} source-reviewed parking and arrival sections and all ${historyStories.length} venue-history stories are present, unique, and free of retired boilerplate; shared venue guides visibly render the unique lead and planning sections; search metadata remains editorial-first.`);
