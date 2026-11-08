#!/usr/bin/env node
/**
 * District 6-6A evergreen source and content guard.
 * Scheduled checks inspect official URL availability and flag human review.
 * Intentionally DOES NOT fetch, parse, store or calculate sports scores,
 * team records, win/loss tables, standings, or playoff seeds.
 */
import assert from 'node:assert/strict';
import { readFile, writeFile, appendFile } from 'node:fs/promises';

const read = async (path) => readFile(new URL('../../' + path, import.meta.url), 'utf8');
const [page, head, guide, calendar, productionWorkflow, productionSmoke, mobileSmoke] = await Promise.all([
  read('src/routes/texas-high-school-football-districts_.$slug.lazy.tsx'),
  read('src/routes/texas-high-school-football-districts_.$slug.tsx'),
  read('src/components/sports/District6Guide.tsx'),
  read('src/data/high-school-football/district6-calendar-2026.ts'),
  read('.github/workflows/deploy-production.yml'),
  read('scripts/ci/verify-district6-production.mjs'),
  read('scripts/ci/verify-district6-responsive-browser.mjs'),
]);

assert.match(page, /district6Pilot\s*=\s*district\.slug === '6a-district-6'/, 'District 6 selector missing');
assert.match(page, /district6Pilot\s*&&\s*<District6Guide\s*\/>/, 'District 6 guide is not mounted');
assert.match(page, /const games = district6Pilot \? \[\] : getDistrictFootballGames\(/, 'District 6 must not consume the shared game results feed while records automation is paused');
assert.ok(page.indexOf('{district6Pilot && <District6Guide />}') < page.indexOf('<FootballMonetizationSlot'), 'District 6 football guide must appear before monetization');
assert.match(head, /District 6-6A Football: 2026 Teams, Schedule & Tickets/, 'Distinctive District 6 title missing');
assert.match(head, /No live standings or W-L automation/, 'District 6 search metadata must disclose that records are not live');
for (const team of ['Allen','Dallas Jesuit','McKinney','McKinney Boyd','Princeton','Prosper','Prosper Rock Hill','Prosper Walnut Grove']) {
  assert.ok(guide.includes(team) || page.includes(team) || calendar.includes(team), 'Missing District 6 context: ' + team);
}
for (const section of ['district-6-2026','district-6-fan-info']) assert.ok(guide.includes(section), 'Missing source-backed section: ' + section);
assert.match(guide, /not live upcoming games/i, 'Dated fixtures must not be mislabeled as live upcoming games');

assert.match(guide, /28 league games/, 'District 6 must display the complete league schedule');
assert.match(guide, /district-6-comparison/, 'Unique source-based district analysis is mandatory');
assert.match(guide, /district-6-source-notes/, 'Visible editorial review and sourcing notes are mandatory');
assert.match(guide, /TexasDefined editorial desk/, 'The page must identify its responsible publisher');
assert.match(guide, /November 7, 2026/, 'Displayed manual calendar review date missing');
assert.ok(!guide.includes('Published late-season matchups'), 'Incomplete five-game snapshot must be removed');
const fixtureRows = [...calendar.matchAll(/\{\s*date:\s*'(\d{4}-\d{2}-\d{2})',\s*away:\s*'([^']+)',\s*home:\s*'([^']+)'\s*\}/g)];
assert.equal(fixtureRows.length, 28, 'District 6 needs exactly 28 dated league matchups');
const schoolNames = ['Allen', 'Dallas Jesuit', 'McKinney', 'McKinney Boyd', 'Princeton', 'Prosper', 'Prosper Rock Hill', 'Prosper Walnut Grove'];
const schoolCounts = new Map(schoolNames.map(name => [name, 0]));
const uniquePairs = new Set();
let jesuitGames = 0;
for (const [, date, away, home] of fixtureRows) {
  assert.match(date, /^2026-(?:09|10|11)-\d{2}$/, '2026 district season date expected');
  assert.ok(schoolCounts.has(away) && schoolCounts.has(home) && away !== home, 'Unknown or repeated school ' + away + ' / ' + home);
  const pair = [away, home].sort().join('|');
  assert.ok(!uniquePairs.has(pair), 'Repeated district game: ' + pair);
  uniquePairs.add(pair);
  schoolCounts.set(away, schoolCounts.get(away) + 1);
  schoolCounts.set(home, schoolCounts.get(home) + 1);
  if (away === 'Dallas Jesuit' || home === 'Dallas Jesuit') jesuitGames++;
}
assert.equal(uniquePairs.size, 28, 'District 6 needs every unique pairing');
for (const [school, count] of schoolCounts) assert.equal(count, 7, school + ' must play all seven opponents');
assert.equal(jesuitGames, 7, 'Official Jesuit varsity schedule requires seven district fixtures');
assert.match(calendar, /jesuitrangers\.org\/sports\/football\/schedule\/2026/, 'Primary source for Jesuit dates missing');
assert.match(calendar, /pigskinprep\.com\/showfreeschedules\.asp/, 'Published district-wide schedule source missing');
assert.ok(!/(?:score:|homeScore:|awayScore:|wins:|losses:|rank:|seed:)/.test(calendar), 'No records, scores, projected rankings or seeds in the schedule archive');
assert.match(page, /!district6Pilot && <FootballFanOffers/, 'District 6 must not include generic affiliate-filler block');

assert.match(guide, /no standings, automated win\/loss records/i, 'Explicit records pause disclosure missing');
assert.ok(!/fetch\s*\(|(?:parse|scrape)(?:Standings|Scores|Records)/i.test(guide), 'No automated sports-data ingestion in the guide');
assert.ok(productionWorkflow.includes('node scripts/ci/verify-district6-production.mjs'), 'District 6 direct-Worker production acceptance missing');
assert.ok(productionWorkflow.includes('node scripts/ci/verify-district6-responsive-browser.mjs'), 'District 6 responsive Chrome acceptance missing');
assert.match(mobileSmoke, /for \(const width of \[390, 320\]\)/, 'Both mobile widths must be verified');
assert.ok(productionSmoke.includes('District 6 production acceptance failed'), 'Production smoke must fail closed on broken releases');
const officialSources = [
  'https://www.uiltexas.org/football',
  'https://www.uiltexas.org/football/playoff-brackets',
  'https://www.uiltexas.org/football/page/football-manual-post-season-information',
  'https://www.allenisd.org/page/tickets',
  'https://www.mckinneyisd.net/o/as/page/tickets/',
  'https://www.prosper-isd.net/page/athletic-information/',
  'https://www.princetonisd.net/departments/athletics/athletic-facilities/jackie-hendricks-stadium',
  'https://jesuitrangers.org/sports/football/schedule/2026',
  'https://jesuitrangers.org/news/2026/2/2/general-jesuit-to-play-in-district-6-6a-in-latest-uil-redistricting-announcement.aspx',
];
for (const url of officialSources) assert.ok(guide.includes(url), 'Missing official source URL: ' + url);

const reasons = [];
// Month-one cadence is an editorial link monitor. A non-200 response on a
// protected/anti-bot website is not evidence that a source's information changed.
if (process.argv.includes('--check-links')) {
  for (const url of officialSources) {
    try {
      const response = await fetch(url, { method: 'HEAD', redirect: 'follow', signal: AbortSignal.timeout(12000), headers: { 'User-Agent': 'TexasDefinedSourceMonitor/1.0 (+https://texasdefined.com)' } });
      if (response.status === 404 || response.status === 410) {
        const second = await fetch(url, { method: 'GET', redirect: 'follow', signal: AbortSignal.timeout(12000), headers: { 'User-Agent': 'TexasDefinedSourceMonitor/1.0 (+https://texasdefined.com)' } });
        await second.body?.cancel();
        if ([404, 410].includes(second.status)) reasons.push('Source returns ' + second.status + ': ' + url);
      } else if (!response.ok) {
        console.warn('Manual-only review: source may block probes, status ' + response.status + ' for ' + url);
      }
      await response.body?.cancel();
    } catch (e) {
      console.warn('Source probe inconclusive (not treated as broken): ' + url + ' — ' + (e?.message ?? String(e)));
    }
  }
}
const today = new Date().toISOString().slice(0, 10);
if (today >= '2027-07-01') reasons.push('Recheck the 2027 varsity schedule: the 2026 fixture snapshot is historical.');
if (today >= '2028-01-01') reasons.push('Check the approaching 2028–30 UIL alignment and update district assignments when UIL releases it.');

if (reasons.length) {
  const body = '# District 6-6A source review\n\nAutomated link and age review on ' + today + '. **Manual editorial review needed**; do not scrape or invent game data.\n\n' + reasons.map((r) => '- ' + r).join('\n') + '\n\nThe user explicitly paused standings, win/loss and score automation. Do not re-enable without a separately approved licensed feed.\n';
  await writeFile('district6-source-review.md', body);
  console.log(body);
}
if (process.env.GITHUB_OUTPUT) await appendFile(process.env.GITHUB_OUTPUT, 'review_needed=' + (reasons.length ? 'true' : 'false') + '\n');
console.log('District 6 content policy passed. External scores and W/L automation: NOT CONFIGURED.');
