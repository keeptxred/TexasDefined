import fs from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const read = (file) => fs.readFile(path.join(root, file), 'utf8');

const [
  route,
  sharedGuide,
  editorial,
  wave6,
  wave7,
  wave8,
  wave9,
] = await Promise.all([
  read('src/routes/sports-venue.$slug.tsx'),
  read('src/components/sports/SportsVenueGuidePage.tsx'),
  read('src/data/sports-venue-editorial.server.ts'),
  read('src/data/sports-venue-editorial-wave6.server.ts'),
  read('src/data/sports-venue-editorial-wave7.server.ts'),
  read('src/data/sports-venue-editorial-wave8.server.ts'),
  read('src/data/sports-venue-editorial-wave9.server.ts'),
]);

const errors = [];
const assert = (condition, message) => {
  if (!condition) errors.push(message);
};

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

console.log(`Sports venue visible editorial validation passed: ${editorialIds.size}/84 explicit editorial descriptions remain covered, shared venue guides render the unique lead visibly after the subtitle, and search metadata prefers that lead before generic fallbacks.`);
