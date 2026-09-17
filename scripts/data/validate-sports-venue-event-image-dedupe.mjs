import fs from 'node:fs';

const read = (path) => fs.readFileSync(path, 'utf8');
const server = read('src/data/sports-venue-events.functions.ts');
const client = read('src/components/sports/SportsVenueGuidePilotContent.tsx');
const failures = [];

const requireText = (source, needle, label) => {
  if (!source.includes(needle)) failures.push(`${label}: missing ${needle}`);
};

for (const marker of [
  'canonicalImageReference',
  'const seenEventImageKeys = new Set<string>();',
  'const repeatsEventImage = Boolean(imageKey && seenEventImageKeys.has(imageKey));',
  'seenEventImageKeys.add(imageKey)',
  'event.image.url === photo.imageUrl',
  'event.image.sourceUrl === photo.sourcePage',
  'eventWithoutVenueHeroFallback',
]) requireText(server, marker, 'server venue-event image dedupe');

for (const marker of [
  'canonicalImageReference',
  'const registeredPhoto = getSportsVenuePhoto(slug);',
  'const seenEventImageKeys = new Set<string>();',
  'const repeatsEventImage = Boolean(imageKey && seenEventImageKeys.has(imageKey));',
  'seenEventImageKeys.add(imageKey)',
  'event.image?.url !== registeredPhoto.imageUrl',
  'event.image?.sourceUrl !== registeredPhoto.sourcePage',
  '[registeredPhoto.imageUrl, registeredPhoto.sourcePage]',
  'eventWithoutDuplicateVenueImage',
]) requireText(client, marker, 'client venue-event image dedupe');

if (failures.length) {
  console.error('Sports venue event image dedupe validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('PASS: sports venue event carousels keep the first unique event image, suppress repeated event-card images, and still compare event imagery against the governed venue photo even when the rendered hero uses the server-authoritative redirect endpoint.');
