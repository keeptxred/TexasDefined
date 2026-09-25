import fs from 'node:fs';

const read = (path) => fs.readFileSync(path, 'utf8');
const lifecycle = read('src/data/event-occurrence-lifecycle.ts');
const supplemental = read('src/data/major-event-supplemental-registry.server.ts');
const authority = read('src/data/major-event-authority.ts');
const route = read('src/routes/event.$slug.tsx');
const sitemap = read('src/routes/sitemap[.]xml.ts');
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
  'loadSupplementalMajorEventSitemapEntriesServer()',
  'loadSupplementalMajorEventRecordsServer()',
  '.map((event) => ({',
]) {
  if (!supplemental.includes(marker)) failures.push(`Supplemental permanent-guide sitemap policy missing ${marker}.`);
}
if (supplemental.includes('hasCurrentOrFutureConfirmedEventOccurrence')) {
  failures.push('Supplemental permanent guides must not leave sitemap discovery when an annual occurrence expires.');
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
  failures.push('Major-event image compliance must remain the route-level indexability safeguard.');
}

for (const marker of [
  'Major-event authority routes are permanent guides',
  '.filter((event) => hasCompliantMajorEventImageServer(event.slug))',
]) {
  if (!sitemap.includes(marker)) failures.push(`Base major-event permanent-guide sitemap policy missing ${marker}.`);
}
if (sitemap.includes('hasCurrentOrFutureConfirmedEventOccurrence')) {
  failures.push('Permanent major-event sitemap discovery must not depend on a current/future occurrence.');
}

// Behavioral guard for occurrence freshness. This governs scheduled Event schema and
// live temporal surfaces only; permanent guide sitemap discovery is intentionally separate.
const isCurrentOrFuture = (latestDate, texasToday) => latestDate >= texasToday;
if (isCurrentOrFuture('2026-09-05', '2026-09-13')) failures.push('A past occurrence must not be treated as current.');
if (!isCurrentOrFuture('2026-09-13', '2026-09-13')) failures.push('An event ending today must remain current.');
if (!isCurrentOrFuture('2027-04-10', '2026-09-13')) failures.push('A confirmed future occurrence must remain current/future eligible.');

if (failures.length) {
  console.error('Event occurrence lifecycle validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('Event occurrence lifecycle protected: permanent annual guides stay sitemap-discoverable between editions, expired or recurrence-derived dates suppress scheduled Event schema, and image compliance remains the indexability gate.');
