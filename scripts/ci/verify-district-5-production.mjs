/**
 * Narrow post-deploy acceptance for 6A District 5.
 * Two GETs (direct Worker + canonical domain), zero crawling, no affiliate clicks.
 * Fail closed if an apparently healthy release omits the league schedule or records.
 */
import assert from 'node:assert/strict';

const path = '/texas-high-school-football-districts/6a-district-5';
const origins = [
  'https://texasdefined-site.freddy-coppola.workers.dev',
  'https://texasdefined.com',
];

async function check(origin) {
  const url = new URL(path, origin);
  // Query parameter avoids mistaking a previously cached HTML page for the new release.
  url.searchParams.set('district5_acceptance', (process.env.GITHUB_SHA ?? 'manual').slice(0, 12));
  const response = await fetch(url, {
    redirect: 'follow',
    cache: 'no-store',
    signal: AbortSignal.timeout(30_000),
    headers: {
      'user-agent': 'TexasDefined-District5-Production-Smoke/1.0',
      'cache-control': 'no-cache',
      'accept': 'text/html',
    },
  });
  assert.equal(response.status, 200, `${origin} returned ${response.status}`);
  const html = await response.text();
  assert.ok(html.length > 6_000, `${origin}: HTML response unexpectedly short (${html.length})`);

  for (const marker of [
    'District 5-6A Football',
    '2026 District 5 game results',
    'data-football-district-section="coverage"',
    'data-football-district-records="source-derived"',
    'data-football-district-section="district-5-context"',
    'data-football-district-section="official-game-day"',
    'Denton Braswell',
    'Frisco Wakeland',
    'Lewisville Marcus',
    'Pigskin Prep',
    'MaxPreps',
    'not UIL-certified standings',
    'District 5 tickets, venues and spectator rules',
  ]) {
    assert.ok(html.includes(marker), `${origin}: missing required District 5 marker: ${marker}`);
  }
  const games = [...html.matchAll(/<div\b[^>]*data-football-district-game="2026-[^"]+"[^>]*>/g)];
  const reportedFinals = games.filter(([tag]) => tag.includes('data-status="reported-final"'));
  const pending = games.filter(([tag]) => tag.includes('data-status="schedule-only"'));
  assert.equal(games.length, 28, `${origin}: expected 28 dated district game cards; got ${games.length}`);
  assert.equal(reportedFinals.length, 16, `${origin}: expected 16 sourced finals; got ${reportedFinals.length}`);
  assert.equal(pending.length, 12, `${origin}: expected 12 scheduled games; got ${pending.length}`);
  console.log(`PASS District 5 production acceptance ${origin}: 16 finals, 12 fixtures, records, official game-day links`);
}

await Promise.all(origins.map(check));
