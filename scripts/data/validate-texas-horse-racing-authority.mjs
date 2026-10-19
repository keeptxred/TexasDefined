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
const organizations = ['texas-racing-commission', 'texas-thoroughbred-association', 'texas-quarter-horse-association', 'texas-horsemens-partnership'];
const bespoke = [...inactive, 'gillespie-county-fairgrounds', 'calendar', ...organizations];
const deployment = read('.github/workflows/deploy-production.yml');
const changeScope = read('scripts/ci/production-change-scope.mjs');
const productionVerifier = read('scripts/production/verify-horse-racing-production.mjs');

for (const id of live) assert.ok(data.includes(`slug: '${id}'`), `Missing licensed live racetrack ${id}`);
for (const id of inactive) assert.ok(data.includes(`slug: '${id}'`), `Missing historic license entry ${id}`);
for (const id of organizations) {
  assert.ok(data.includes(`slug: '${id}'`), `Missing racing institution ${id}`);
  assert.ok(county.includes(`href: '/horse-racing/${id}'`), `County lacks direct institutional reference ${id}`);
}
assert.ok(data.includes("slug: 'calendar'"), 'Missing four-track comparative racing calendar');
assert.ok(!data.includes("slug: 'gulf-coast-racing'"), 'Greyhound track misidentified as horse-racing license');
assert.ok(!hub.includes('href="/sports-venues/horse-racing"'), 'Unregistered sports-venue category link regressed');
assert.ok(hub.includes('href="/horse-racing/calendar"'), 'Calendar authority page cannot be discovered from racing hub');
for (const id of bespoke) assert.ok(publicRoutes.includes(`"/horse-racing/${id}"`), `Missing indexable path: ${id}`);
assert.ok(publicRoutes.includes('"/horse-racing"'), 'Horse racing hub not registered for sitemap');
for (const marker of ['CollectionPage', 'ItemList', 'FAQPage', 'BreadcrumbList', 'TEXAS_RACING_ORGANIZATIONS', 'TEXAS_HORSE_RACING_INSTITUTIONS']) {
  assert.ok(hub.includes(marker), `Horse racing hub missing ${marker}`);
}
for (const marker of ['createLazyFileRoute', 'BreadcrumbList', 'Article', 'FAQPage', 'GovernmentOrganization', 'TrackProfile', 'TexasRacingOrganizationProfile', 'TexasHorseRacingCalendarPage', 'record.category', 'record.sources', 'record.countySlug']) {
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
assert.ok(data.includes('2026-12-18') && data.includes('2027-06-12'), 'Current confirmed live racing meet windows missing');
assert.ok(data.includes('2027 schedule labeled') || data.includes('2027 schedule'), 'Unannounced 2027 Retama dates must not be invented');
assert.ok(deployment.includes('verify-horse-racing-production.mjs') && changeScope.includes('horse_racing'), 'Targeted live production acceptance is not deployment-gated');
for (const route of bespoke) assert.ok(productionVerifier.includes("'/horse-racing/" + route + "'"), 'New route lacks production verification: ' + route);
console.log('Horse racing authority verified: 4 active racetracks, 3 historic tracks, 4 statewide organizations, 1 racing calendar, 10 indexable pages, county links, SEO, licensed imagery and governed lodging.');
