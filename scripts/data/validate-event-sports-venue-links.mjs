import fs from 'node:fs/promises';

const read = (path) => fs.readFile(path, 'utf8');
const [resolver, eventCard, eventsRoute, eventsLazyRoute, eventServerHead, corrections, generatedEvents, countyEventsServer, countyEventsBridge, countyDestinations, countyRoute, eventPage, dateFormatting, eventDisposition, supplementalRegistry, majorEventIndex] = await Promise.all([
  read('src/data/sports-venue-event-links.ts'),
  read('src/components/editorial/EventCard.tsx'),
  read('src/routes/events.index.tsx'),
  read('src/routes/events.index.lazy.tsx'),
  read('src/data/major-event-directory.server.ts'),
  read('src/data/knowledge-graph/current-entity-corrections.ts'),
  read('src/data/events-generated.ts'),
  read('src/data/county-major-events.server.ts'),
  read('src/data/county-major-events.ts'),
  read('src/components/sports/CountySportsDestinations.tsx'),
  read('src/routes/$kind.$slug.tsx'),
  read('src/data/major-event-page.server.ts'),
  read('src/domain/utils/format.ts'),
  read('ops/editorial/major-events-source-disposition.md'),
  read('src/data/major-event-supplemental-registry.server.ts'),
  read('src/data/major-event-index.ts'),
]);
const eventsVisibleRoute = `${eventsRoute}\n${eventsLazyRoute}`;

const errors = [];
const assert = (condition, message) => { if (!condition) errors.push(message); };

for (const marker of [
  "MAJOR_TEXAS_SPORTS_VENUES",
  "TEXAS_SPORTS_VENUE_TIER2_ENTITIES",
  "applyCurrentEntityCorrections",
  "venue.aliases",
  "normalize('NFKD')",
  "targets.length === 1",
  "EXACT_VENUE_INDEX.get(key)",
]) assert(resolver.includes(marker), `Event venue resolver missing verified exact-match marker: ${marker}`);

for (const forbidden of [
  '.includes(key)', '.includes(venue)', '.indexOf(', '.startsWith(', '.endsWith(',
  'levenshtein(', 'distance(', 'similarity(', 'coordinates', 'countySlug', 'event.city',
]) assert(!resolver.toLowerCase().includes(forbidden.toLowerCase()), `Event venue resolver must not use fuzzy/geographic matching mechanism: ${forbidden}`);

for (const broad of ["add('Houston'", "add('Dallas'", "add('Austin'", "add('San Antonio'", "add('Stadium'", "add('Arena'"]) {
  assert(!resolver.includes(broad), `Broad place/type term must never be registered as an event venue alias: ${broad}`);
}

assert(corrections.includes("name: 'Galaxy Stadium'"), 'Current entity corrections must continue to own the Galaxy Stadium display name.');
assert(corrections.includes("'Jones AT&T Stadium'"), 'Jones AT&T Stadium must remain an explicit verified alias.');
assert(resolver.includes("href: '/sports-venue/reliant-stadium'"), 'Reliant/NRG event matches must preserve the stable Reliant Stadium guide route.');
assert(resolver.includes("add('NRG Stadium', reliant)"), 'NRG Stadium must remain an explicit former-name alias, not a fuzzy match.');
assert(!resolver.includes('/sports-venue/galaxy-stadium'), 'Galaxy Stadium must preserve the stable /sports-venue/jones-att-stadium canonical route from the verified entity slug.');

for (const source of [eventCard, eventPage]) {
  assert(source.includes('resolveSportsVenueEventLink'), 'Event UI/schema must use the shared exact sports venue resolver.');
}
assert(eventCard.includes('venueGuide &&'), 'Regular event cards must leave unmatched events without a venue-guide link.');
assert(eventCard.includes('Plan the venue'), 'Matched regular events must expose the venue-planning link.');
assert(eventPage.includes('const venueGuide = resolveSportsVenueEventLink(event.venue)'), 'Dedicated Event JSON-LD must resolve venue links from the stored venue value only.');
assert(/const location = venueGuide\s*\?\s*\{\s*\.\.\.defaultLocation[\s\S]*?\}\s*:\s*defaultLocation;/.test(eventPage), 'Dedicated Event JSON-LD must preserve its existing default location when no exact venue match exists.');
assert(eventServerHead.includes('resolveSportsVenueEventLink(featured?.venue)'), 'Featured event must use the exact resolver on the server presentation boundary.');
assert(eventsVisibleRoute.includes('featuredVenueGuide &&'), 'Featured unmatched events must remain unlinked.');
assert(eventsVisibleRoute.includes('featuredVenueGuide, featuredDateLabel'), 'Featured venue/date presentation must be consumed from server-owned route data.');

// Recurring event identity must not be keyed by occurrence date. Source-controlled sync rows
// own a matching name+city identity even when a row becomes unpublished/canceled; otherwise
// an older fixture occurrence could be resurrected after the authoritative row is withdrawn.
assert(generatedEvents.includes('function eventIdentityKey(event: Pick<TexasEvent, "name" | "city">)'), 'Generated event merge must retain an explicit recurring-event identity key.');
assert(generatedEvents.includes('event.name.trim().toLowerCase()'), 'Recurring-event identity must include normalized event name.');
assert(generatedEvents.includes('event.city.trim().toLowerCase()'), 'Recurring-event identity must include normalized city.');
assert(generatedEvents.includes('const sourceControlledIdentities = new Set('), 'Generated event merge must track every source-controlled event identity, not only published rows.');
assert(generatedEvents.includes('if (sourceControlledIdentities.has(eventIdentityKey(event))) continue;'), 'Curated fixtures must not resurrect an identity already owned by source-controlled event data.');
assert(generatedEvents.includes('merged.set(eventIdentityKey(event), event)'), 'Published generated rows must merge through the recurring-event identity key.');
assert(!generatedEvents.includes('`${event.name.toLowerCase()}:${event.startDate}`'), 'Event merge must not regress to name + date identity, which permits duplicate stale occurrences.');

assert(dateFormatting.includes('if (!endIso || endIso === startIso) return formatDate(startIso, locale);'), 'Single-day date ranges must collapse equal start/end dates to one formatted date.');

const dispositionRows = eventDisposition.split('\n').filter((line) => /^\|\s*\d+\s*\|/.test(line));
const dispositionNumbers = dispositionRows.map((line) => Number(line.match(/^\|\s*(\d+)\s*\|/)?.[1]));
assert(dispositionRows.length === 75, `Major-event source disposition must contain exactly 75 numbered inventory rows; found ${dispositionRows.length}.`);
assert(dispositionNumbers.every((value, index) => value === index + 1), 'Major-event source disposition rows must remain sequential from 1 through 75 with no gaps or duplicates.');

const coreAuthoritySlugs = new Set([...majorEventIndex.matchAll(/\bslug:\s*"([^"]+)"/g)].map((match) => match[1]));
const supplementalAuthoritySlugs = new Set([...supplementalRegistry.matchAll(/^\s+"([^"]+)",$/gm)].map((match) => match[1]));
const authoritySlugs = new Set([...coreAuthoritySlugs, ...supplementalAuthoritySlugs]);
for (const row of dispositionRows) {
  const rowNumber = Number(row.match(/^\|\s*(\d+)\s*\|/)?.[1]);
  for (const match of row.matchAll(/`\/event\/([^`]+)`/g)) {
    assert(authoritySlugs.has(match[1]), `Major-event disposition row ${rowNumber} points to unresolved authority slug: ${match[1]}`);
  }
}
assert(eventDisposition.includes('Canonical guide remains `/texas-state-fair`; do not create a competing event authority page.'), 'State Fair discovery seed must remain assigned to the canonical /texas-state-fair guide instead of a duplicate event authority page.');

assert(countyEventsServer.includes('loadSupplementalMajorEventRecordsServer'), 'County event lookup must include supplemental server-only event authority records.');
assert(countyEventsServer.includes('event?.countySlug === normalizedCountySlug'), 'County event lookup must filter by the verified county slug.');
assert(countyEventsServer.includes('.slice(0, 8)'), 'County event cards must stay bounded to a focused discovery set.');
assert(countyEventsBridge.includes('createServerFn'), 'County major-event lookup must cross a server-function boundary.');
assert(countyEventsBridge.includes('await import("./county-major-events.server")'), 'County event authority records must remain dynamically imported server-side.');
assert(countyRoute.includes("import('@/data/county-major-events').then(({ getCountyMajorEvents }) => getCountyMajorEvents(entity.slug))"), 'County route loader must load major-event links by county identity.');
assert(countyRoute.includes('majorEvents: countyMajorEvents'), 'County route loader must serialize major-event discovery for synchronous rendering.');
assert(countyDestinations.includes('const majorEvents = county.majorEvents ?? [];'), 'County UI must consume loader-backed major-event links synchronously.');
assert(countyDestinations.includes('href={`/event/${event.slug}`}'), 'County major-event cards must link to permanent event authority URLs.');
assert(!countyDestinations.includes('getCountyMajorEvents(county.slug)'), 'County UI must not suspend on the major-event server function before county discovery sections render.');
assert(!countyDestinations.includes('major-event-supplemental-registry.server'), 'County UI must not import the server-only supplemental authority registry directly.');

assert(eventPage.includes('event.countySlug ? `/browse/counties#county-${event.countySlug}` : null'), 'Major event guides must derive county backlinks from the canonical county browse anchor.');
assert(eventPage.includes('!event.relatedLinks.some((item) => item.href === countyHref)'), 'Major event guides must avoid duplicating an already-curated county backlink.');
assert(!eventPage.includes('`/county/${event.countySlug}`'), 'Major event guides must not link to the nonexistent /county/{slug} route.');
assert(eventPage.includes('description: event.whyItMatters'), 'Major-event Event JSON-LD must include the sourced editorial description.');
assert(!eventPage.includes(': verified dates, official sources and practical trip planning.'), 'Major-event metadata must not label recurrence-derived planning dates as universally verified.');
assert(eventPage.includes(': dates, official sources and practical trip planning.'), 'Major-event metadata must retain neutral date/source/trip-planning description copy.');

if (errors.length) {
  console.error('Event integrity validation failed:');
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log('Event integrity validated: exact sports-venue links on dedicated Event leaf schema, server-owned event presentation, lazy-safe featured presentation, source-controlled recurring-event precedence, accurate date claims, single-day date formatting, 75-seed source disposition, and bidirectional loader-backed county event discovery are protected.');
