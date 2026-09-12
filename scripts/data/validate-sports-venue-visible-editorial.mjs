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

const [
  route,
  sharedGuide,
  editorial,
  wave6,
  wave7,
  wave8,
  wave9,
  remediationSources,
  enrichmentSources,
] = await Promise.all([
  read('src/routes/sports-venue.$slug.tsx'),
  read('src/components/sports/SportsVenueGuidePage.tsx'),
  read('src/data/sports-venue-editorial.server.ts'),
  read('src/data/sports-venue-editorial-wave6.server.ts'),
  read('src/data/sports-venue-editorial-wave7.server.ts'),
  read('src/data/sports-venue-editorial-wave8.server.ts'),
  read('src/data/sports-venue-editorial-wave9.server.ts'),
  Promise.all(remediationFiles.map(read)),
  Promise.all(enrichmentFiles.map(read)),
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

const extractLiteral = (body, field) => {
  const match = body.match(new RegExp(`^\\s{4}${field}:\\s*'((?:\\\\'|[^'])*)',?$`, 'm'));
  return match?.[1] ? normalizeCopy(match[1]) : undefined;
};

const parseTopLevelEntries = (source) =>
  [...source.matchAll(/^\s{2}'([^']+)': \{([\s\S]*?)(?=^\s{2}'[^']+': \{|^\};)/gm)]
    .map((match) => ({ slug: match[1], body: match[2] }));

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

const baseSectionsBySlug = new Map();
for (let index = 0; index < enrichmentSources.length; index += 1) {
  const source = enrichmentSources[index];
  const file = enrichmentFiles[index];
  const entries = parseTopLevelEntries(source);
  assert(entries.length > 0, `No sports venue deep-enrichment entries found in ${file}.`);

  for (const { slug, body } of entries) {
    const parking = extractLiteral(body, 'parking');
    const arrival = extractLiteral(body, 'arrival');
    const history = extractLiteral(body, 'history');
    assert(Boolean(parking), `Sports venue base profile ${slug} in ${file} is missing a literal parking section.`);
    assert(Boolean(arrival), `Sports venue base profile ${slug} in ${file} is missing a literal arrival section.`);
    assert(!baseSectionsBySlug.has(slug), `Sports venue base profile is duplicated across enrichment files: ${slug}.`);
    baseSectionsBySlug.set(slug, { slug, source: file, parking, arrival, history });
  }
}

assert(
  baseSectionsBySlug.size === 84,
  `Expected 84 canonical deep-enrichment profiles; found ${baseSectionsBySlug.size}.`,
);

const remediationSectionsBySlug = new Map();
for (let index = 0; index < remediationSources.length; index += 1) {
  const source = remediationSources[index];
  const file = remediationFiles[index];
  const runtimeMarker = source.indexOf('export const SPORTS_VENUE_CONTENT_REMEDIATION');
  assert(runtimeMarker >= 0, `Sports venue remediation runtime export is missing in ${file}.`);
  if (runtimeMarker < 0) continue;

  const qualitySource = source.slice(0, runtimeMarker);
  const historyBySlug = new Map();
  for (const { slug, body } of parseTopLevelEntries(qualitySource)) {
    const story = extractLiteral(body, 'editorialStory');
    if (story) historyBySlug.set(slug, story);
  }

  const runtimeSource = source.slice(runtimeMarker);
  const entries = parseTopLevelEntries(runtimeSource);
  assert(entries.length > 0, `No sports venue runtime remediation entries found in ${file}.`);

  for (const { slug, body } of entries) {
    const parking = extractLiteral(body, 'parking');
    const arrival = extractLiteral(body, 'arrival');
    const history = extractLiteral(body, 'history') ?? historyBySlug.get(slug);
    assert(Boolean(parking), `Sports venue runtime remediation ${slug} in ${file} is missing a literal parking section.`);
    assert(Boolean(arrival), `Sports venue runtime remediation ${slug} in ${file} is missing a literal arrival section.`);
    assert(Boolean(history), `Sports venue runtime remediation ${slug} in ${file} is missing a source-reviewed history story.`);
    assert(!remediationSectionsBySlug.has(slug), `Sports venue remediation is duplicated across waves: ${slug}.`);
    remediationSectionsBySlug.set(slug, { slug, source: file, parking, arrival, history });
  }
}

assert(
  remediationSectionsBySlug.size === 71,
  `Expected the current source-reviewed remediation layer to cover 71 sports venues; found ${remediationSectionsBySlug.size}.`,
);

const effectiveSections = [...baseSectionsBySlug.values()].map((base) => remediationSectionsBySlug.get(base.slug) ?? base);
const effectiveHistorySections = effectiveSections.filter((item) => item.history);
assert(
  effectiveSections.length === 84,
  `Expected effective planning-section coverage for all 84 sports venues; found ${effectiveSections.length}.`,
);
assert(
  effectiveSections.every((item) => item.parking && item.arrival),
  'Every effective sports venue profile must retain explicit parking and arrival copy.',
);
assert(
  effectiveHistorySections.length === 84,
  `Expected venue-specific history copy for all 84 effective sports venue profiles; found ${effectiveHistorySections.length}.`,
);

const assertUniqueSectionCopy = (items, field, label) => {
  const groups = new Map();
  for (const item of items) {
    const value = item[field];
    if (!value) continue;
    const normalized = normalizeForDuplicateCheck(value);
    const records = groups.get(normalized) ?? [];
    records.push(item.slug);
    groups.set(normalized, records);

    const lower = value.toLowerCase();
    for (const fragment of bannedBoilerplateFragments) {
      assert(!lower.includes(fragment), `${label} copy reintroduced retired boilerplate in ${item.slug}: “${fragment}”.`);
    }
  }
  for (const records of groups.values()) {
    assert(records.length === 1, `${label} copy must be venue-specific; identical text is shared by ${records.join(', ')}.`);
  }
};

assertUniqueSectionCopy(effectiveSections, 'parking', 'Parking');
assertUniqueSectionCopy(effectiveSections, 'arrival', 'Arrival');
assertUniqueSectionCopy(effectiveHistorySections, 'history', 'Venue history');

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

console.log(`Sports venue visible editorial validation passed: ${editorialIds.size}/84 unique editorial descriptions remain covered; the effective 84-venue planning dataset (${remediationSectionsBySlug.size} remediated + ${84 - remediationSectionsBySlug.size} canonical base profiles) retains unique parking, arrival, and history copy free of retired boilerplate; shared venue guides visibly render those venue-specific sections; search metadata remains editorial-first.`);
