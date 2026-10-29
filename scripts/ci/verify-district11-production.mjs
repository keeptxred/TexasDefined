/**
 * Bounded 4A DI District 11 live SSR acceptance.
 * Exactly two GETs: canonical site and direct Cloudflare Worker.
 * Does not fetch, crawl, republish or scrape any third-party score service.
 */
import assert from 'node:assert/strict';

const pathname = '/texas-high-school-football-districts/4a-division-i-district-11';
const origins = [
  'https://texasdefined.com',
  'https://texasdefined-site.freddy-coppola.workers.dev',
];

async function verify(origin) {
  const url = new URL(pathname, origin);
  url.searchParams.set('district11_acceptance', (process.env.GITHUB_SHA || 'manual').slice(0, 12));
  const response = await fetch(url, {
    redirect: 'follow',
    cache: 'no-store',
    signal: AbortSignal.timeout(30_000),
    headers: { accept: 'text/html', 'cache-control': 'no-cache, no-store, max-age=0', pragma: 'no-cache', 'user-agent': 'TexasDefined-District11-Production-Acceptance/1.0' },
  });
  assert.equal(response.status, 200, origin + ' unexpected HTTP ' + response.status);
  assert.notEqual(response.headers.get('cf-mitigated'), 'challenge', origin + ' served a challenge');
  const html = await response.text();
  assert.ok(html.length > 6_000, origin + ' unexpected short document');
  for (const phrase of [
    'District 11-4A Division I Football',
    'District 11 reported finals',
    'District 11 records from reported finals',
    'District 11\'s 2026 playoff race',
    'District 11 game-day planning',
    'Four of the seven teams qualify',
    'Bay City',
    'El Campo',
    'Navasota',
    'Needville',
    'Royal',
    'Sealy',
    'West Columbia Columbia',
    '2026-10-29',
    'not UIL-certified standings',
    '4a-1-region-iii-district-11',
    'data-football-district-section="coverage"',
    'data-football-district-section="teams"',
    'data-football-district-section="district-11-context"',
    'data-football-district-section="district-11-game-day"',
    'data-football-district-records="source-derived"',
  ]) assert.ok(html.includes(phrase), origin + ' missing ' + phrase);

  const title = html.match(/<title>([^<]+)<\/title>/i)?.[1] || '';
  assert.ok(title.includes('District 11-4A Division I Football: 2026 Scores'), origin + ' unexpected SEO title: ' + title);
  const canonicals = [...html.matchAll(/<link\b[^>]*rel=["']canonical["'][^>]*>/gi)];
  assert.equal(canonicals.length, 1, origin + ' canonical link count');
  assert.ok(canonicals[0][0].includes('https://texasdefined.com' + pathname), origin + ' bad canonical');
  assert.ok(!/<meta\b[^>]*name=["']robots["'][^>]*content=["'][^"']*noindex/i.test(html), origin + ' noindex');
  const cards = [...html.matchAll(/<div\b[^>]*data-football-district-game="2026-[^"]+"[^>]*>/g)];
  const finals = cards.filter(([tag]) => tag.includes('data-status="reported-final"')).length;
  const scheduled = cards.filter(([tag]) => tag.includes('data-status="schedule-only"')).length;
  assert.equal(cards.length, 21, origin + ' expected all 21 league game cards');
  assert.equal(finals, 15, origin + ' expected all 15 verified finals');
  assert.equal(scheduled, 6, origin + ' expected 6 as-yet-unverified games');
  const records = html.match(/data-football-district-records="source-derived"[\s\S]*?<tbody[^>]*>([\s\S]*?)<\/tbody>/i)?.[1];
  assert.ok(records, origin + ' missing standings snapshot');
  assert.equal((records.match(/<tr\b/g) || []).length, 7, origin + ' expected 7 schools');
  const main = html.slice(html.indexOf('data-football-district-hub="v2"'));
  assert.ok(main.indexOf('data-football-district-section="teams"') < main.indexOf('data-football-monetization'), origin + ' sponsorship before teams');
  console.log('PASS District 11 exact-content HTTP/SSR check', JSON.stringify({origin, cards: cards.length, finals, scheduled, schools: 7, title, cacheStatus: response.headers.get('cf-cache-status')}));
}
const outcome = await Promise.allSettled(origins.map(verify));
for (const result of outcome) if (result.status === 'rejected') console.error(result.reason);
assert.ok(outcome.every((result) => result.status === 'fulfilled'), 'District 11 live publication acceptance failed');
