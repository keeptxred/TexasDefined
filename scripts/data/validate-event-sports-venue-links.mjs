import fs from 'node:fs/promises';

const read = (path) => fs.readFile(path, 'utf8');
const [resolver, eventCard, eventsRoute, corrections] = await Promise.all([
  read('src/data/sports-venue-event-links.ts'),
  read('src/components/editorial/EventCard.tsx'),
  read('src/routes/events.tsx'),
  read('src/data/knowledge-graph/current-entity-corrections.ts'),
]);

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

// Guard concrete fuzzy/sub-string/geographic mechanisms rather than prose words in
// comments. This keeps the validator from failing merely because the resolver's
// documentation says that fuzzy matching is intentionally prohibited.
for (const forbidden of [
  '.includes(key)',
  '.includes(venue)',
  '.indexOf(',
  '.startsWith(',
  '.endsWith(',
  'levenshtein(',
  'distance(',
  'similarity(',
  'coordinates',
  'countySlug',
  'event.city',
]) assert(!resolver.toLowerCase().includes(forbidden.toLowerCase()), `Event venue resolver must not use fuzzy/geographic matching mechanism: ${forbidden}`);

for (const broad of ["add('Houston'", "add('Dallas'", "add('Austin'", "add('San Antonio'", "add('Stadium'", "add('Arena'"]) {
  assert(!resolver.includes(broad), `Broad place/type term must never be registered as an event venue alias: ${broad}`);
}

assert(corrections.includes("name: 'Galaxy Stadium'"), 'Current entity corrections must continue to own the Galaxy Stadium display name.');
assert(corrections.includes("'Jones AT&T Stadium'"), 'Jones AT&T Stadium must remain an explicit verified alias.');
assert(resolver.includes("href: '/sports-venue/reliant-stadium'"), 'Reliant/NRG event matches must preserve the stable Reliant Stadium guide route.');
assert(resolver.includes("add('NRG Stadium', reliant)"), 'NRG Stadium must remain an explicit former-name alias, not a fuzzy match.');
assert(!resolver.includes('/sports-venue/galaxy-stadium'), 'Galaxy Stadium must preserve the stable /sports-venue/jones-att-stadium canonical route from the verified entity slug.');

for (const source of [eventCard, eventsRoute]) {
  assert(source.includes('resolveSportsVenueEventLink'), 'Event UI/schema must use the shared exact sports venue resolver.');
}
assert(eventCard.includes('venueGuide &&'), 'Regular event cards must leave unmatched events without a venue-guide link.');
assert(eventCard.includes('Plan the venue'), 'Matched regular events must expose the venue-planning link.');
assert(eventsRoute.includes('const venueGuide = resolveSportsVenueEventLink(event.venue)'), 'Event JSON-LD must resolve venue links from the stored venue value only.');
assert(eventsRoute.includes('venueGuide ? { ...defaultLocation'), 'Event JSON-LD must preserve its existing default location when no exact venue match exists.');
assert(eventsRoute.includes('const featuredVenueGuide = resolveSportsVenueEventLink(featured?.venue)'), 'Featured event must use the exact resolver.');
assert(eventsRoute.includes('featuredVenueGuide &&'), 'Featured unmatched events must remain unlinked.');

if (errors.length) {
  console.error('Event → sports venue validation failed:');
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log('Event → sports venue linking validated: exact verified names/aliases only, collision fail-closed behavior, stable Galaxy/Reliant routes, unchanged unmatched events, and matching UI/JSON-LD are protected.');
