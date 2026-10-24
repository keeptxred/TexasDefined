import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { corporateEventProviders } from '../../src/data/corporate-events.ts';
import { corporateEventMarketMatches } from '../../src/data/corporate-event-market-search.ts';

const expected = {
  'Abilene': ['grace-museum-abilene-events','frontier-texas-abilene-rentals','201-mesquite-abilene-company-events'],
  'Killeen/Temple': ['killeen-civic-conference-center','great-escape-central-texas-killeen','shotz-interactive-temple-teams'],
  'New Braunfels': ['courthouse-new-braunfels-team-events','downtown-social-new-braunfels-events','new-braunfels-civic-convention-center','topgolf-new-braunfels-team-building','gruene-estate-corporate-events'],
  'Fredericksburg': ['signor-vineyards-fredericksburg-corporate','country-inn-cottages-fredericksburg-retreats','lost-luggage-fredericksburg-private-events'],
};
assert(corporateEventProviders.length >= 122);
for (const [market, slugs] of Object.entries(expected)) {
  const matches = corporateEventProviders.filter((provider) => corporateEventMarketMatches(provider, market));
  for (const slug of slugs) assert(matches.some((p) => p.slug === slug), market + ' is missing ' + slug);
  for (const match of matches) assert(match.officialUrl.startsWith('https://') && match.sourceUrl.startsWith('https://'));
  assert(matches.length >= 3, market + ' requires 3 or more source-backed listings');
}
const killeen = corporateEventProviders.filter(p => corporateEventMarketMatches(p, 'Killeen, TX'));
const temple = corporateEventProviders.filter(p => corporateEventMarketMatches(p, 'Temple Texas'));
assert(killeen.some(p => p.slug === 'great-escape-central-texas-killeen'), 'Killeen search must include escape rooms');
assert(temple.some(p => p.slug === 'shotz-interactive-temple-teams'), 'Temple search must include the indoor game venue');
assert(corporateEventProviders.find(p => p.slug === 'shotz-interactive-temple-teams').maxGroup === 40,
  'Do not present a 40-person whole-venue cap as a 45-person event fit');
assert.equal(corporateEventProviders.find(p => p.slug === 'signor-vineyards-fredericksburg-corporate').maxGroup, 75,
  'Use first-party Harvest Room capacity, not conflicting third-party venue figures');
assert.equal(corporateEventProviders.find(p => p.slug === 'new-braunfels-civic-convention-center').maxGroup, null,
  'Exhibit hall square footage is not a verified guest count');
assert.equal(corporateEventProviders.find(p => p.slug === 'lost-luggage-fredericksburg-private-events').startingPricePerPerson, null,
  'Published event class and buyout prices cannot be converted into a guaranteed corporate per-person rate');
const guide = readFileSync('src/components/events/CorporateEventMetroGuides.tsx', 'utf8');
const validator = readFileSync('scripts/data/validate-corporate-events.mjs', 'utf8');
for (const slug of ['abilene','killeen-temple','new-braunfels','fredericksburg']) {
  assert(guide.includes("slug: '" + slug + "'"), 'Destination-specific guide not wired: ' + slug);
}
assert(guide.includes("corporateEventMarketMatches(provider, guide.key)"), 'Guides must draw from the shared source registry');
assert(validator.includes('parsedReview.getTime()'), 'Editorial review dates must validate without hard-coded launch-day checks');
assert(!validator.includes("assert(p.verifiedOn === '2026-10-23')"), 'Future venue additions must not be frozen to original launch date');
console.log('Corporate events: 14 new sourced venues, 4 new markets, 19-market finder, capacity disclosures and future-proof reviews PASS.');
