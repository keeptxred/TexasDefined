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
const [page, head, guide] = await Promise.all([
  read('src/routes/texas-high-school-football-districts_.$slug.lazy.tsx'),
  read('src/routes/texas-high-school-football-districts_.$slug.tsx'),
  read('src/components/sports/District6Guide.tsx'),
]);

assert.match(page, /district6Pilot\s*=\s*district\.slug === '6a-district-6'/, 'District 6 selector missing');
assert.match(page, /district6Pilot\s*&&\s*<District6Guide\s*\/>/, 'District 6 guide is not mounted');
assert.match(page, /const games = district6Pilot \? \[\] : getDistrictFootballGames\(/, 'District 6 must not consume the shared game results feed while records automation is paused');
assert.ok(page.indexOf('{district6Pilot && <District6Guide />}') < page.indexOf('<FootballMonetizationSlot'), 'District 6 football guide must appear before monetization');
assert.match(head, /District 6-6A Football: 2026 Teams, Schedule & Tickets/, 'Distinctive District 6 title missing');
assert.match(head, /No live standings or W-L automation/, 'District 6 search metadata must disclose that records are not live');
for (const team of ['Allen','Dallas Jesuit','McKinney','McKinney Boyd','Princeton','Prosper','Prosper Rock Hill','Prosper Walnut Grove']) {
  assert.ok(guide.includes(team) || page.includes(team), 'Missing District 6 context: ' + team);
}
for (const section of ['district-6-2026','district-6-fan-info']) assert.ok(guide.includes(section), 'Missing source-backed section: ' + section);
assert.match(guide, /not live upcoming games/i, 'Dated fixtures must not be mislabeled as live upcoming games');
assert.match(guide, /no standings, automated win\/loss records/i, 'Explicit records pause disclosure missing');
assert.ok(!/fetch\s*\(|(?:parse|scrape)(?:Standings|Scores|Records)/i.test(guide), 'No automated sports-data ingestion in the guide');
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
