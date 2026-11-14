import assert from 'node:assert/strict';
import { test } from 'node:test';
import { readFileSync } from 'node:fs';

const read = file => readFileSync(file,'utf8');
const article = read('src/data/fixtures/texas-road-trip-rules.ts');
const lazy = read('src/data/fixtures/lazy-evergreen.ts');
const worker = read('scripts/ci/verify-built-worker-ssr-core.mjs');
const sourceCount = (article.match(/https:\/\/(?:www\.)?(?:txdot\.gov|dps\.texas\.gov|drivetexas\.org)\//g) || []).length;
const blocks = (article.match(/\b(?:p|h|list)\(/g)||[]).length;
const words = (article.match(/[A-Za-z]{3,}/g)||[]).length;

test('the original historical GSC URL receives substantial original editorial text', () => {
  assert.match(article, /slug: "texas-road-trip-rules"/);
  assert.match(article, /category: "road-trips"/);
  assert.match(article, /authorId: "a-marisol"/);
  assert.match(article, /updatedAt: "2026-11-13"/);
  assert.ok(words > 2000, 'Not acceptable to publish a thin replacement page');
  assert.ok(blocks >= 30, 'Need complete original sections, examples and decisions');
  assert.ok(article.includes('not a substitute for Texas statutes'), 'Legal-information limitation must be visible');
  assert.ok(!article.includes('As an AI') && !article.includes('In conclusion'), 'No synthetic AI boilerplate');
});

test('all operational driving claims are tied to Texas agency guidance', () => {
  assert.ok(sourceCount >= 10, 'Primary Texas law, road and traveler sources missing');
  for (const required of [
    'https://drivetexas.org/',
    'https://www.txdot.gov/safety/driving-laws/tips-highway-driving.html',
    'https://www.txdot.gov/safety/traffic-safety-campaigns/move-over-or-slow-down.html',
    'https://www.txdot.gov/safety/severe-weather/flash-floods.html',
    'https://www.txdot.gov/safety/driving-laws/seat-belt-car-seat.html',
    'https://www.txdot.gov/discover/toll-roads-managed-lanes/paying-tolls/how-tags-work.html',
    'https://www.dps.texas.gov/news/dps-increases-patrols-statewide-enforce-seat-belt-use-prevent-distracted-driving',
  ]) assert.ok(article.includes(required), required);
});

test('article distinguishes mutable safety rules and exceptions rather than presenting guesses as law', () => {
  for (const text of [
    '20 miles per hour below', '25 mph or less', 'animal control',
    'school zones', 'HCTRA', 'toll', 'rental car',
    'never driving through standing or moving floodwater',
    'barricade', 'do not expect a navigation app',
    'low-water', 'private', 'destination operator',
    'November 13, 2026',
  ]) assert.ok(article.toLowerCase().includes(text.toLowerCase()),text);
});

test('real 404 slug is lazily registered with complete source content and real Worker acceptance', () => {
  assert.match(lazy, /const texasRoadTripRulesStub: Article = \{/);
  assert.match(lazy, /lazyEvergreenArticleStubs: Article\[\] = \[/);
  assert.match(lazy, /texasFarmToMarketRoadsExplainedStub, texasRoadTripRulesStub,/);
  assert.match(lazy, /if \(slug === texasRoadTripRulesStub\.slug\)/);
  assert.match(lazy, /await import\("\.\/texas-road-trip-rules"\)/);
  assert.match(lazy, /return texasRoadTripRulesArticle;/);
  assert.match(worker, /path: '\/article\/texas-road-trip-rules'/);
});

test('original article builds contextual cross-links without making users click ads', () => {
  assert.match(article, /href: "\/explore\/road-trips"/);
  assert.match(article, /href: "\/article\/texas-farm-to-market-roads-explained"/);
  assert.match(article, /href: "\/article\/texas-road-trip-stops-worth-the-detour"/);
  assert.ok(!/affiliate|sponsored|guaranteed|click here/i.test(article),'No unrelated commercial detours');
});
