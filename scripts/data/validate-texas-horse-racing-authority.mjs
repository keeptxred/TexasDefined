import fs from 'node:fs';
import assert from 'node:assert/strict';

const read = (path) => fs.readFileSync(path, 'utf8');
const data = read('src/data/horse-racing-authority.ts');
const hub = read('src/routes/horse-racing.tsx');
const detail = read('src/routes/horse-racing_.$slug.tsx');
const county = read('src/components/sports/CountySportsDestinations.tsx');
const venue = read('src/components/sports/SportsVenueGuidePage.tsx');
const publicRoutes = read('src/lib/public-routes.ts');
const expedia = read('public/expedia-travel.js');
const cj = read('public/stay-affiliate-options.js');

const live = ['lone-star-park', 'sam-houston-race-park', 'retama-park', 'gillespie-county-fairgrounds'];
const inactive = ['manor-downs', 'laredo-downs', 'gulf-coast-racing', 'valle-de-los-tesoros'];
const bespoke = [...inactive, 'gillespie-county-fairgrounds'];

for (const id of live) assert.ok(data.includes(`slug: '${id}'`), `Missing licensed live racetrack ${id}`);
for (const id of inactive) assert.ok(data.includes(`slug: '${id}'`), `Missing historic license entry ${id}`);
for (const id of bespoke) assert.ok(publicRoutes.includes(`"/horse-racing/${id}"`), `Missing indexable path: ${id}`);
assert.ok(publicRoutes.includes('"/horse-racing"'), 'Horse racing hub not registered for sitemap');
for (const marker of ['CollectionPage', 'ItemList', 'FAQPage', 'BreadcrumbList', 'TEXAS_RACING_ORGANIZATIONS', 'TEXAS_HORSE_RACING_INSTITUTIONS']) {
  assert.ok(hub.includes(marker), `Horse racing hub missing ${marker}`);
}
for (const marker of ['createFileRoute', 'buildMeta', 'canonicalLink', 'BreadcrumbList', 'Article', 'FAQPage', 'record.category', 'record.sources', 'record.countySlug']) {
  assert.ok(detail.includes(marker), `Track detail missing ${marker}`);
}
assert.ok(county.includes('horseRacingInstitutions.map'), 'Counties lack reciprocal track discovery');
assert.ok(venue.includes('href="/horse-racing"'), 'Existing tracks lack link to hub');
assert.ok(expedia.includes('horse-racing\\/gillespie-county-fairgrounds'), 'Expedia surface is not route-scoped to live Gillespie racing');
assert.ok(cj.includes('horse-racing\\/gillespie-county-fairgrounds'), 'Approved CJ hotel choices do not cover the live Gillespie guide');
assert.ok(detail.includes('data-stay-nearby-slot'), 'Gillespie hotel slot absent');
assert.ok(!/betting[ -]affiliate|sportsbook[ -]affiliate/.test(data), 'Gambling referral copy is not allowed');
assert.ok(fs.existsSync('public/images/horse-racing/gillespie-2026-race-weekends.svg'), 'Gillespie illustration missing');
assert.ok(detail.includes('2027 dates'), 'Future race dates must be explicitly unconfirmed');
console.log('Horse racing authority verified: 4 active, 4 historical licenses, 6 indexable pages, county links, SEO, licensed imagery and governed lodging.');
