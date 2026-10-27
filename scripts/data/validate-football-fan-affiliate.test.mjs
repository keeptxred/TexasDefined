import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const offers = readFileSync('src/components/sports/FootballFanOffers.tsx', 'utf8');
const gameNight = readFileSync('src/components/sports/FootballGameNightGuide.tsx', 'utf8');

test('team guide uses fan offers with verified dated away/neutral games only', () => {
  assert.match(gameNight, /FootballFanOffers slug=\{slug\} hasUpcomingAwayTravel=\{hasUpcomingAwayTravel\}/);
  assert.match(gameNight, /game\.date >= today && !game\.result/);
  assert.match(gameNight, /game\.site === 'Away' \|\| game\.site === 'Neutral'/);
});
test('statewide football hub uses honest travel-planning rather than a fictitious fixture', () => {
  const hub = readFileSync('src/routes/sports.friday-night-lights.lazy.tsx', 'utf8');
  assert.match(hub, /FootballFanOffers slug="friday-night-lights" hasUpcomingAwayTravel=\{false\} showTravelPlanning/);
  assert.match(offers, /showHotels = hasUpcomingAwayTravel \|\| showTravelPlanning/);
  assert.match(offers, /Planning a football road trip/);
});

test('verified Hotels.com link is separate from unapproved merchandise programs', () => {
  assert.match(offers, /HOTEL_CJ_PUBLISHER_ID = '101876465'/);
  assert.match(offers, /HOTELS_AFFILIATE_URL = buildHotelsComEvergreenClick\(HOTELS_DESTINATION, hotelsComPageSid\(pathname\)\)/);
  assert.match(offers, /useLocation\(\{ select: \(location\) => location.pathname \}\)/);
  assert.match(offers, /VERIFIED_FOOTBALL_GEAR_OFFERS: readonly Offer\[\] = \[\]/);
  assert.match(offers, /isVerifiedProductUrl\(offer\)/);
  assert.match(offers, /offer\.partner === 'rexing'/);
  assert.match(offers, /type\/dlg\/https:\/\/rexing\.com\//);
  assert.match(offers, /data-commercial-partner=\{offer\.partner\}/);
  assert.match(offers, /data-commercial-placement=\{`football-team-\$\{slug\}`\}/);
  assert.doesNotMatch(offers, /walmart\.com\/ip\//);
  assert.match(offers, /TexasDefined is not affiliated with the schools/);
});
test('commercial links disclose relationships and preserve click attribution', () => {
  assert.match(offers, /rel="sponsored nofollow noopener noreferrer"/);
  assert.match(offers, /data-commercial-partner="hotels\.com"/);
  assert.match(offers, /trackAffiliateClick/);
  assert.match(offers, /football-away-travel/);
  assert.match(offers, /Affiliate disclosure:/);
  assert.match(offers, /actual venue and date/);
});

test('football explainer affiliates are limited to sourced planning topics', () => {
  const article = readFileSync('src/routes/article.$slug.tsx', 'utf8');
  // Test the exact eligibility registry, not whether a slug appears elsewhere
  // in FAQ metadata or a specialized article component.
  const eligibility = article.match(/const footballTravelArticleSlugs = new Set\(\[([\s\S]*?)\]\);/);
  assert.ok(eligibility, 'missing reviewed-football-guide registry');
  const eligibleSlugs = [...eligibility[1].matchAll(/"([^"]+)"/g)].map((match) => match[1]);
  for (const slug of ['texas-high-school-football-playoffs-explained', 'texas-six-man-football-rules-explained', 'texas-high-school-football-scores-schedules']) {
    assert.ok(eligibleSlugs.includes(slug), `${slug} missing from reviewed football affiliate eligibility`);
  }
  assert.equal(new Set(eligibleSlugs).size, eligibleSlugs.length, 'duplicate reviewed guide');
  assert.match(article, /function isFootballTravelPlanningArticle\(article: Article\)/);
  assert.match(article, /article\.category !== "sports"/);
  assert.match(article, /block\.type === "heading"/);
  assert.match(article, /before you travel/);
  assert.match(article, /isFootballTravelPlanningArticle\(article\)/);
  assert.match(article, /!shouldNoindexTexasGatewayArticle\(article\)/);
  assert.match(article, /insertBeforeIndex=\{footballTravelInsertIndex\}/);
  assert.match(article, /showFootballTravelOffers && footballTravelInsertIndex < 0/);
  assert.match(article, /hasUpcomingAwayTravel=\{false\} showTravelPlanning/);
});

test('playoff trip link names the sourced Arlington finals and discloses before purchase actions', () => {
  assert.match(offers, /isStateChampionshipGuide = slug === 'texas-high-school-football-playoffs-explained'/);
  assert.match(offers, /2026 state finals: Arlington, December 16–19/);
  assert.match(offers, /https:\/\/www\.uiltexas\.org\/football\/state/);
  assert.ok(offers.indexOf('Affiliate disclosure:') < offers.indexOf('href={HOTELS_AFFILIATE_URL}'), 'disclose before hotel link');
  assert.ok(offers.indexOf('Affiliate disclosure:') < offers.indexOf('href={RVSHARE_AFFILIATE_URL}'), 'disclose before RV link');
});

test('district profiles render a generic offer without inventing away fixtures', () => {
  const district = readFileSync('src/routes/texas-high-school-football-districts_.$slug.lazy.tsx', 'utf8');
  assert.match(district, /FootballFanOffers slug=\{`district-\$\{district\.slug\}`\} hasUpcomingAwayTravel=\{false\} showTravelPlanning/);
  assert.ok(district.indexOf('<FootballFanOffers') > district.indexOf('data-football-district-section="official-sources"'), 'essential game-day and official sources must precede generic affiliate offers');
  assert.equal((district.match(/<FootballFanOffers slug=/g) || []).length, 1, 'one commercial block per district hub');
});

test('approved RVshare CJ deep link is a real second football offer with truthful parking caveat', () => {
  const stay = readFileSync('public/stay-affiliate-options.js', 'utf8');
  assert.match(stay, /RVSHARE_DESTINATION = "https:\/\/rvshare\.com\/"/);
  assert.match(offers, /RVSHARE_DESTINATION = 'https:\/\/rvshare\.com\/'/);
  assert.ok(offers.includes("RVSHARE_AFFILIATE_URL = buildCjAccountClick('rvshare', pathname, RVSHARE_DESTINATION)"));
  assert.match(offers, /data-commercial-partner="rvshare"/);
  assert.match(offers, /football-road-trip-rv/);
  assert.match(offers, /trackAffiliateClick\(\{ partner: 'rvshare'/);
  assert.match(offers, /Do not assume the school, stadium or venue allows RV parking or tailgating/);
  assert.match(offers, /hotel bookings or RV reservations/);
});


test('Hotels.com builder preserves exact destinations and rejects cross-advertiser or unsafe targets', async () => {
  const ts = await import('typescript');
  const source = readFileSync('src/lib/cj-hotels-evergreen.ts', 'utf8');
  const code = ts.transpile(source, { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 });
  const api = await import('data:text/javascript;base64,' + Buffer.from(code).toString('base64'));
  for (const route of ['/sports/friday-night-lights', '/texas-high-school-football/allen-eagles', '/article/texas-high-school-football-playoffs-explained', '/' + 'long-slug-'.repeat(12)]) {
    const sid = api.hotelsComPageSid(route);
    assert.equal(sid, api.hotelsComPageSid(route + '?campaign=ignored'));
    assert.ok(sid.length <= 64);
    const target = 'https://www.hotels.com/ho114680/hotel-paso-del-norte-autograph-collection-el-paso-united-states-of-america/';
    const click = new URL(api.buildHotelsComEvergreenClick(target, sid));
    assert.equal(click.origin, 'https://www.anrdoezrs.net');
    assert.equal(click.pathname, '/click-101876465-15734399');
    assert.equal(click.searchParams.size, 2);
    assert.equal(click.searchParams.get('url'), target);
    assert.equal(click.searchParams.get('sid'), sid);
    assert.equal(api.isHotelsComPropertyClick(click.href, sid), true);
    assert.equal(api.isHotelsComPropertyClick(click.href, 'td_other'), false);
  }
  assert.equal(api.hotelsComPageSid('/event/polar-express-palestine'), 'td_polar_palestine');
  for (const target of ['https://www.orbitz.com/', 'http://www.hotels.com/', 'https://user@www.hotels.com/', 'https://www.hotels.com/#fragment']) assert.throws(() => api.buildHotelsComEvergreenClick(target, 'td_test'));
  assert.throws(() => api.buildHotelsComEvergreenClick('https://www.hotels.com/', 'bad SID'));
  assert.equal(api.isHotelsComPropertyClick('invalid', 'td_test'), false);
});
