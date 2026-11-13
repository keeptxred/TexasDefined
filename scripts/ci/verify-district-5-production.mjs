/**
 * Narrow post-deploy acceptance for 6A District 5.
 * Two GETs (direct Worker + canonical domain), zero crawling, no affiliate clicks.
 * Fail closed if an apparently healthy release omits the league schedule or records.
 */
import assert from 'node:assert/strict';
import { setTimeout as delay } from 'node:timers/promises';

const path = '/texas-high-school-football-districts/6a-district-5';
const origins = [
  'https://texasdefined-site.freddy-coppola.workers.dev',
  'https://texasdefined.com',
];

// Retry only transport-level failures. An HTTP response, invalid SSR HTML or
// missing official source evidence must always fail immediately, not be
// masked by a second request. The retry window is finite for deploy budgets.
const MAX_TRANSIENT_ATTEMPTS = 3;
const isTransientTransportError = (error) =>
  error?.name === 'TimeoutError' ||
  error?.name === 'AbortError' ||
  (error instanceof TypeError && /fetch failed|network|socket|timeout|terminated/i.test(error.message));

async function fetchLiveHtml(url, origin) {
  for (let attempt = 1; attempt <= MAX_TRANSIENT_ATTEMPTS; attempt++) {
    try {
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
      // An actual HTTP response is authoritative and is never retried.
      assert.equal(response.status, 200, `${origin} returned ${response.status}`);
      return await response.text();
    } catch (error) {
      if (!isTransientTransportError(error) || attempt === MAX_TRANSIENT_ATTEMPTS) {
        throw new Error(
          `${origin}: District 5 production HTTP request failed after ${attempt} attempt(s): ${error?.message ?? String(error)}`,
          { cause: error },
        );
      }
      console.warn(
        `::warning title=District 5 transient transport error::${origin} attempt ${attempt}/${MAX_TRANSIENT_ATTEMPTS} failed (${error.name}); retrying the same canonical URL.`,
      );
      await delay(750 * attempt);
    }
  }
  throw new Error(`${origin}: unreachable transport retry state`);
}

async function check(origin) {
  const url = new URL(path, origin);
  // Query parameter avoids mistaking a previously cached HTML page for the new release.
  url.searchParams.set('district5_acceptance', (process.env.GITHUB_SHA ?? 'manual').slice(0, 12));
  const html = await fetchLiveHtml(url, origin);
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
  assert.ok(reportedFinals.length >= 16, `${origin}: at least 16 already reported finals must remain; got ${reportedFinals.length}`);
  assert.equal(pending.length + reportedFinals.length, 28, `${origin}: every district game needs a verified final or scheduled status`);
  console.log(`PASS District 5 production acceptance ${origin}: ${reportedFinals.length} finals, ${pending.length} fixtures, records, official game-day links`);
}

await Promise.all(origins.map(check));
