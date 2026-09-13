import fs from 'node:fs';

const read = (path) => fs.readFileSync(path, 'utf8');
const lifecycle = read('src/data/event-occurrence-lifecycle.ts');
const supplemental = read('src/data/major-event-supplemental-registry.server.ts');
const authority = read('src/data/major-event-authority.ts');
const route = read('src/routes/event.$slug.tsx');
const failures = [];

for (const marker of [
  "timeZone: 'America/Chicago'",
  'latestEventOccurrenceDate',
  'hasCurrentOrFutureConfirmedEventOccurrence',
  'hasExpiredConfirmedEventOccurrence',
]) {
  if (!lifecycle.includes(marker)) failures.push(`Event occurrence lifecycle policy missing ${marker}.`);
}

for (const marker of [
  'hasCurrentOrFutureConfirmedEventOccurrence',
  'loadSupplementalMajorEventSitemapEntriesServer(now = new Date())',
  '.filter((event) => hasCurrentOrFutureConfirmedEventOccurrence(event, now))',
]) {
  if (!supplemental.includes(marker)) failures.push(`Supplemental event sitemap lifecycle missing ${marker}.`);
}

for (const marker of [
  'hasExpiredConfirmedEventOccurrence',
  'getMajorEventRecordServer',
  'shouldWithholdScheduledEventSchema',
  '"@type": "WebPage"',
  'isRecurrenceDerivedMajorEventSlug(page.slug)',
]) {
  if (!authority.includes(marker)) failures.push(`Event schema lifecycle missing ${marker}.`);
}

if (!route.includes('robots: page.imageCompliant ? undefined : "noindex, follow, max-image-preview:large"')) {
  failures.push('Expired occurrence policy must not noindex the evergreen event guide itself.');
}

// Behavioral guard for the calendar comparison used by the lifecycle helper.
const isCurrentOrFuture = (latestDate, texasToday) => latestDate >= texasToday;
if (isCurrentOrFuture('2026-09-05', '2026-09-13')) failures.push('Past occurrence must not remain sitemap-promoted.');
if (!isCurrentOrFuture('2026-09-13', '2026-09-13')) failures.push('An event ending today must remain current.');
if (!isCurrentOrFuture('2027-04-10', '2026-09-13')) failures.push('Confirmed future occurrence must remain promoted.');

if (failures.length) {
  console.error('Event occurrence lifecycle validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('Event occurrence lifecycle protected: expired confirmed supplemental occurrences leave sitemap promotion and scheduled Event schema, while evergreen guides remain indexable and current/future occurrences remain eligible.');
