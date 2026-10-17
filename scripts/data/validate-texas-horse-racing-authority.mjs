import fs from 'node:fs';
import assert from 'node:assert/strict';

const read = (path) => fs.readFileSync(path, 'utf8');
const data = read('src/data/horse-racing-authority.ts');
const hub = read('src/routes/horse-racing.lazy.tsx');
const hubMeta = read('src/routes/horse-racing.tsx');
const detail = read('src/routes/horse-racing_.$slug.lazy.tsx');
const detailMeta = read('src/routes/horse-racing_.$slug.tsx');
const county = read('src/components/sports/CountySportsDestinations.tsx');
const venue = read('src/components/sports/SportsVenueGuidePage.tsx');
const publicRoutes = read('src/lib/public-routes.ts');
const expedia = read('public/expedia-travel.js');
const cj = read('public/stay-affiliate-options.js');

const live = ['lone-star-park', 'sam-houston-race-park', 'retama-park', 'gillespie-county-fairgrounds'];
const inactive = ['manor-downs', 'laredo-downs', 'valle-de-los-tesoros'];
const bespoke = [...inactive, 'gillespie-county-fairgrounds'];

for (const id of live) assert.ok(data.includes(`slug: '${id}'`), `Missing licensed live racetrack ${id}`);
for (const id of inactive) assert.ok(data.includes(`slug: '${id}'`), `Missing historic license entry ${id}`);
for (const id of bespoke) assert.ok(publicRoutes.includes(`"/horse-racing/${id}"`), `Missing indexable path: ${id}`);
assert.ok(publicRoutes.includes('"/horse-racing"'), 'Horse racing hub not registered for sitemap');
for (const marker of ['CollectionPage', 'ItemList', 'FAQPage', 'BreadcrumbList', 'TEXAS_RACING_ORGANIZATIONS', 'TEXAS_HORSE_RACING_INSTITUTIONS']) {
  assert.ok(hub.includes(marker), `Horse racing hub missing ${marker}`);
}
for (const marker of ['createLazyFileRoute', 'BreadcrumbList', 'Article', 'FAQPage', 'record.category', 'record.sources', 'record.countySlug']) {
  assert.ok(detail.includes(marker), `Track detail missing ${marker}`);
}
for (const marker of ['createFileRoute', 'buildMeta', 'canonicalLink', 'title:', 'canonicalPath']) {
  assert.ok(detailMeta.includes(marker), `Track metadata missing ${marker}`);
  assert.ok(hubMeta.includes(marker), `Hub metadata missing ${marker}`);
}
assert.ok(detailMeta.includes("await import('@/data/horse-racing-authority')"), 'Track data must load only in the route loader');
assert.ok(!county.includes("import { TEXAS_HORSE_RACING_INSTITUTIONS }"), 'County must not eagerly import full racing corpus');
assert.ok(county.includes('horseRacingInstitutions.map'), 'Counties lack reciprocal track discovery');
assert.ok(venue.includes('href="/horse-racing"'), 'Existing tracks lack link to hub');
assert.ok(expedia.includes('horse-racing\\/gillespie-county-fairgrounds'), 'Expedia surface is not route-scoped to live Gillespie racing');
assert.ok(cj.includes('horse-racing\\/gillespie-county-fairgrounds'), 'Approved CJ hotel choices do not cover the live Gillespie guide');
assert.ok(detail.includes('data-stay-nearby-slot'), 'Gillespie hotel slot absent');
assert.ok(!/betting[ -]affiliate|sportsbook[ -]affiliate/.test(data), 'Gambling referral copy is not allowed');
assert.ok(fs.existsSync('public/images/horse-racing/gillespie-2026-race-weekends.svg'), 'Gillespie illustration missing');
assert.ok(detail.includes('2027 dates'), 'Future race dates must be explicitly unconfirmed');
console.log('Horse racing authority verified: 4 active, 3 historical licenses, 5 indexable pages, county links, SEO, licensed imagery and governed lodging.');
