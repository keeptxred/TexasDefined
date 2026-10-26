import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const source = readFileSync('public/stay-affiliate-options.js', 'utf8');
const football = readFileSync('src/components/sports/FootballFanOffers.tsx', 'utf8');
const economics = readFileSync('docs/travel-affiliate-economics.md', 'utf8');
const liveWorkflow = readFileSync('.github/workflows/verify-stay-affiliate-production.yml', 'utf8');
const liveVerifier = readFileSync('scripts/ci/verify-stay-affiliate-production.mjs', 'utf8');
const postDeployWorkflow = readFileSync('.github/workflows/texasdefined-publication-production-smoke.yml', 'utf8');
const motel6Canary = readFileSync('scripts/ci/verify-motel6-production.mjs', 'utf8');

const sandbox = {
  window: {
    location: { pathname: '/' },
    dataLayer: [],
    addEventListener() {},
    dispatchEvent() {},
    requestAnimationFrame() {},
  },
  document: {
    readyState: 'loading',
    addEventListener() {},
    querySelectorAll() { return []; },
  },
  URL,
  Date,
  CustomEvent: class CustomEvent {},
};
vm.runInNewContext(source, sandbox);
const api = sandbox.window.TexasDefinedStayAffiliateOptions;
assert.equal(typeof api.buildMotel6Link, 'function');
assert.equal(typeof api.motel6Eligible, 'function');
assert.equal(typeof api.motel6CampaignActive, 'function');

// The CJ publisher account CID 8062457 is NOT its website tracking PID.
// Email creative link IDs are vetted and may not accept arbitrary inputs.
assert.equal(api.buildMotel6Link('17198227'), 'https://www.tqlkg.com/click-101876465-17198227');
assert.equal(api.buildMotel6Link('17371482'), 'https://www.jdoqocy.com/click-101876465-17371482');
assert.throws(() => api.buildMotel6Link('123'), /Unreviewed/);
assert.doesNotMatch(api.buildMotel6Link('17371482'), /click-(?:1245|8062457)-/);

for (const route of [
  '/explore/road-trips',
  '/article/fredericksburg-history-weekend-guide',
  '/article/goliad-history-weekend-guide',
  '/article/washington-on-the-brazos-weekend-guide',
  '/explore/near/mcallen/day-trips',
  '/explore/weekend-getaways',
  '/texas-tailgating-guide',
  '/texas-roadside-oddities',
  '/event/halloween-in-fredericksburg',
]) assert.equal(api.motel6Eligible(route), true, route);

for (const route of [
  '/', '/laws', '/shop', '/events/christmas-events',
  '/destination/hotel-paso-del-norte', '/explore/casinos/near-houston',
  '/event/wings-over-houston-airshow', '/county/travis',
]) assert.equal(api.motel6Eligible(route), false, route);

// This cutoff is a conservative display policy, never merchant expiry.
assert.equal(api.motel6CampaignActive(Date.parse('2026-10-25T23:59:59Z')), false);
assert.equal(api.motel6CampaignActive(Date.parse('2026-10-26T11:32:00Z')), true);
assert.equal(api.motel6CampaignActive(Date.parse('2026-11-01T04:59:59Z')), true);
assert.equal(api.motel6CampaignActive(Date.parse('2026-11-01T05:00:00Z')), false);
assert.equal(api.motel6CampaignActive(Date.parse('2026-12-01T00:00:00Z')), false);

for (const marker of [
  'motel6Eligible()', 'motel6CampaignActive()', 'createMotel6Link(promo)',
  'choice?.dataset.motel6Mode === motel6Mode',
  'window.setTimeout(scheduleSync',
  'dataLayer.push(detail)', 'affiliate_partner: "motel6"',
  'link.rel = "sponsored nofollow noopener noreferrer"',
  'Motel 6 is an additional sponsored budget-stay option',
]) assert.ok(source.includes(marker), marker);

for (const marker of [
  'MOTEL6_STANDARD_URL', 'MOTEL6_HALLOWEEN_URL',
  "data-commercial-partner=\"motel6\"",
  "motel6Halloween ? MOTEL6_HALLOWEEN_URL : MOTEL6_STANDARD_URL",
  "trackAffiliateClick({ partner: 'motel6'",
  "const showHotels = hasUpcomingAwayTravel || showTravelPlanning",
  "useState(0)", "useEffect(() =>",
  'Affiliate disclosure: TexasDefined may earn a commission',
]) assert.ok(football.includes(marker), marker);
assert.ok(football.indexOf('Affiliate disclosure:') < football.indexOf('href={motel6Halloween ? MOTEL6_HALLOWEEN_URL'), 'football sponsorship must be disclosed before offer');
assert.ok(economics.includes('NOT an advertiser-certified expiration date'), 'do not invent the merchant offer expiration');
assert.doesNotMatch(liveWorkflow, /^  workflow_run:/m, 'manual-only stay affiliate audit must not subscribe to every deployment');
assert.match(postDeployWorkflow, /^  workflow_run:/m, 'the preapproved bounded production smoke subscriber must remain');
assert.ok(postDeployWorkflow.includes('run: node scripts/ci/verify-motel6-production.mjs'), 'Motel 6 live canary must run within the existing subscriber');
for (const marker of [
  "route: '/article/texas-high-school-football-playoffs-explained'",
  'requireMotel6Football: true',
  'data-commercial-partner="motel6"',
  'https://www.tqlkg.com/click-101876465-17198227',
]) assert.ok(liveVerifier.includes(marker), 'missing manual Motel 6 football acceptance marker: ' + marker);
for (const marker of [
  'MOTEL6_HALLOWEEN_AID = "17371482"',
  '2026-11-01T05:00:00Z',
  'data-commercial-partner="motel6"',
  'https://www.tqlkg.com/click-101876465-17198227',
  'for (const bust of [false, true])',
]) assert.ok(motel6Canary.includes(marker), 'missing scoped automatic Motel 6 production acceptance marker: ' + marker);
console.log('Motel 6 CJ URL, placement, CTA, analytics and expiration gates validated.');
