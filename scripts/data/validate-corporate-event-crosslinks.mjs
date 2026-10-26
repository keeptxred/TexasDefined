import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const read = (path) => readFileSync(path, 'utf8');
const corp = read('src/routes/corporate-events.lazy.tsx');
const related = read('src/components/events/CorporateEventRelatedResources.tsx');
const explore = read('src/routes/explore.index.lazy.tsx');
const sports = read('src/components/sports/SportsVenueLandingIndex.tsx');
const advertisers = read('src/routes/partner-with-us.lazy.tsx');
const events = read('src/routes/events.index.lazy.tsx');
const brand = read('src/brand/texasdefined.ts');
assert(corp.includes('<CorporateEventRelatedResources />'), 'Related authority section must appear on the corporate finder');
for (const href of ['/events','/sports-venues','/explore']) {
  assert(related.includes("href: '" + href + "'"), 'Missing reciprocal link to ' + href);
}
assert(related.includes('reservations') || related.includes('reservation'), 'Event discovery must not imply confirmed bookings');
assert(explore.includes('<Link to="/corporate-events"'), 'Travel discovery must point to corporate events');
assert(sports.includes('href="/corporate-events"'), 'Sports venue discovery must point to corporate events');
assert(advertisers.includes('href="/corporate-events#list-your-business"'), 'Sponsor directory must link to distinct corporate provider application');
assert(advertisers.includes('separate from advertising and sponsorship'), 'Do not confuse editorial supplier submissions with paid placements');
assert(events.includes('to="/corporate-events"'), 'Events calendar must retain corporate finder handoff');
assert(brand.includes('to: "/corporate-events"'), 'Global navigation must retain corporate finder access');
console.log('TexasDefined corporate-events crosslinks: Explore, sports, events, sponsor and related planning PASS.');
