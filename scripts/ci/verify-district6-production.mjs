import assert from 'node:assert/strict';

// Bounded production acceptance: only the two existing public production origins.
// This test reads published HTML. It never imports scores, standings or records.
const pathname = '/texas-high-school-football-districts/6a-district-6';
const origins = [
  'https://texasdefined-site.freddy-coppola.workers.dev',
  'https://texasdefined.com',
];
const markers = [
  'District 6 schools',
  'Allen', 'Dallas Jesuit', 'McKinney Boyd', 'Princeton',
  'Prosper Rock Hill', 'Prosper Walnut Grove',
  'Varsity schedule, tickets and the playoff path',
  'Published late-season matchups',
  'Official schedules, tickets and game-day rules',
  'Official Allen ISD tickets',
  'Official McKinney ISD tickets and stadium',
  'Official Prosper ISD athletics',
  'Official Princeton ISD stadium rules',
  'Official Jesuit varsity schedule',
  'How District 6 advances',
  'not live upcoming games',
  'no standings, automated win/loss records',
];

async function verify(origin) {
  const url = new URL(pathname, origin);
  url.searchParams.set('district6_accept', (process.env.GITHUB_SHA || 'manual').slice(0, 12));
  const response = await fetch(url, {
    redirect: 'follow', cache: 'no-store', signal: AbortSignal.timeout(30000),
    headers: {
      accept: 'text/html',
      'cache-control': 'no-cache, no-store, max-age=0',
      pragma: 'no-cache',
      'user-agent': 'TexasDefined-D6-Production-Acceptance',
    },
  });
  assert.equal(response.status, 200, origin + ' HTTP status');
  assert.notEqual(response.headers.get('cf-mitigated'), 'challenge', origin + ' bot challenge');
  const html = await response.text();
  assert.ok(html.length > 6000, origin + ' suspiciously short HTML');
  for (const marker of markers) assert.ok(html.includes(marker), origin + ' missing: ' + marker);
  const title = html.match(/<title>([^<]+)<\/title>/i)?.[1] || '';
  assert.ok(title.includes('District 6-6A Football: 2026 Teams, Schedule & Tickets'), origin + ' stale title ' + title);
  const canonical = [...html.matchAll(/<link\b[^>]*rel=["']canonical["'][^>]*>/gi)];
  assert.equal(canonical.length, 1, origin + ' canonical count');
  assert.ok(canonical[0][0].includes('https://texasdefined.com' + pathname), origin + ' wrong canonical');
  assert.ok(!/<meta\b[^>]*name=["'](?:robots|googlebot)["'][^>]*content=["'][^"']*noindex/i.test(html), origin + ' noindex');
  const guide = html.indexOf('id="district-6-2026"');
  const sponsor = html.indexOf('Reach Texas high-school football families');
  assert.ok(guide >= 0 && sponsor > guide, origin + ' sponsorship ahead of guide');
  const schoolLinks = new Set([...html.matchAll(/href=["']\/texas-high-school-football-teams\/([^"'#?]+)/g)].map(m => m[1]));
  assert.ok(schoolLinks.size >= 8, origin + ' missing linked schools: ' + schoolLinks.size);
  assert.ok(!html.includes('data-football-district-records="source-derived"'), origin + ' paused records were rendered');
  console.log('PASS District 6 production', origin, 'schools', schoolLinks.size, 'guide before sponsor; no score/record feed', response.headers.get('cf-cache-status'));
}
const outcomes = await Promise.allSettled(origins.map(verify));
for (const outcome of outcomes) if (outcome.status === 'rejected') console.error(outcome.reason);
if (outcomes.some(o => o.status === 'rejected')) throw new Error('District 6 production acceptance failed');
