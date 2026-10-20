import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const snapshot = readFileSync(new URL('../../src/data/high-school-football/football-district5-2026.ts', import.meta.url), 'utf8');
const fixtureLoader = readFileSync(new URL('../../src/data/high-school-football/football-district-game-week.ts', import.meta.url), 'utf8');
const page = readFileSync(new URL('../../src/routes/texas-high-school-football-districts_.$slug.lazy.tsx', import.meta.url), 'utf8');
const head = readFileSync(new URL('../../src/routes/texas-high-school-football-districts_.$slug.tsx', import.meta.url), 'utf8');

const results = [...snapshot.matchAll(/^\s*final\('(2026-\d\d-\d\d)', '([^']+)', '([^']+)', (\d+), (\d+)/gm)]
  .map(([, date, away, home, awayScore, homeScore]) => ({ date, away, home, awayScore: Number(awayScore), homeScore: Number(homeScore) }));
const fixtures = [...snapshot.matchAll(/^\s*scheduled\('(2026-\d\d-\d\d)', '([^']+)', '([^']+)'\)/gm)]
  .map(([, date, away, home]) => ({ date, away, home }));
const all = [...results, ...fixtures];
const schools = [
  'Denton Braswell',
  'Denton Guyer',
  'Frisco Wakeland',
  'Lewisville',
  'Lewisville Flower Mound',
  'Lewisville Hebron',
  'Lewisville Marcus',
  'Little Elm',
];

test('District 5 has a complete seven-game league slate for all eight UIL members', () => {
  assert.equal(results.length, 16, 'four fully reported rounds through October 16');
  assert.equal(fixtures.length, 12, 'three remaining rounds');
  assert.equal(all.length, 28, 'eight-team round-robin has 28 games');
  const seen = new Set();
  const counts = Object.fromEntries(schools.map((school) => [school, 0]));
  for (const game of all) {
    assert.ok(Number.isFinite(Date.parse(game.date + 'T12:00:00Z')), game.date);
    assert.ok(schools.includes(game.away), game.away);
    assert.ok(schools.includes(game.home), game.home);
    assert.notEqual(game.home, game.away);
    const pair = [game.away, game.home].sort().join('|');
    assert.ok(!seen.has(pair), 'duplicate league matchup: ' + pair);
    seen.add(pair);
    counts[game.away] += 1;
    counts[game.home] += 1;
  }
  assert.ok(schools.every((school) => counts[school] === 7), JSON.stringify(counts));
  assert.equal(new Set(all.map((game) => game.date)).size, 8, 'eight distinct dates including Sept 24 and 25');
  assert.equal(fixtures.filter((game) => game.date > '2026-10-17').length, 12);
});

test('District 5 game-derived records match source-dated October 16 results', () => {
  const records = Object.fromEntries(schools.map((school) => [school, [0, 0]]));
  for (const { away, home, awayScore, homeScore } of results) {
    assert.notEqual(homeScore, awayScore, 'score cannot be a tied final');
    const winner = homeScore > awayScore ? home : away;
    const loser = homeScore > awayScore ? away : home;
    records[winner][0] += 1;
    records[loser][1] += 1;
  }
  assert.deepEqual(records, {
    'Denton Braswell': [3, 1],
    'Denton Guyer': [3, 1],
    'Frisco Wakeland': [0, 4],
    'Lewisville': [4, 0],
    'Lewisville Flower Mound': [3, 1],
    'Lewisville Hebron': [3, 1],
    'Lewisville Marcus': [0, 4],
    'Little Elm': [0, 4],
  });
  assert.equal(results.filter((game) => game.date === '2026-10-16').length, 4);
});

test('coverage is source-linked, localized and explicitly not UIL-certified standings', () => {
  for (const marker of [
    'DISTRICT_5_SCHEDULE_URL',
    'DISTRICT_5_STANDINGS_URL',
    'MaxPreps reported final',
    "verifiedAt: VERIFIED_AT",
  ]) assert.ok(snapshot.includes(marker), marker);
  assert.ok(fixtureLoader.includes("slug === '6a-district-5'"));
  assert.ok(fixtureLoader.includes('DISTRICT_5_2026_GAMES'));
  for (const marker of [
    'district5Pilot',
    'data-football-district-records="source-derived"',
    'not UIL-certified standings',
    'Do not use these partial data for official UIL seeds',
    'not refreshed automatically',
  ]) assert.ok(page.includes(marker), marker);
  assert.ok(head.includes('District 5-6A Football: 2026 Scores, Records & Schedule'));
});

test('District 5 ticket information links only to confirmed official school-district sources', () => {
  assert.ok(page.includes('data-football-district-section="official-game-day"'));
  for (const url of [
    'https://athletics.dentonisd.org/resources/tickets',
    'https://athletics.dentonisd.org/resources/athletic-stadium-guidelines',
    'https://www.lisd.net/our-district/athletics/tickets',
    'https://www.lisd.net/our-district/athletics/lisd-stadium-guidelines',
    'https://www.friscoisd.org/page/2026-varsity-football-schedule/',
    'https://tickets.friscoisd.org',
    'https://www.littleelmisd.net/support-services/athletics',
  ]) assert.ok(page.includes(url), url);
  assert.ok(page.includes('not affiliate tickets or proof of inventory'));
});

test('source-derived records never contradict their own disclaimer', () => {
  assert.ok(page.includes('The table above calculates win–loss counts from sourced games only.'));
  assert.ok(page.includes('It is not an official UIL standings table'));
  assert.ok(!page.includes('we do not assign district ranks, win–loss records'));
});

test('responsive District 5 Chrome acceptance cannot be skipped by broad sports change-scope detection', () => {
  const browserScript = readFileSync(new URL('../../scripts/ci/verify-district-5-responsive-browser.mjs', import.meta.url), 'utf8');
  const workflow = readFileSync(new URL('../../.github/workflows/deploy-production.yml', import.meta.url), 'utf8');
  for (const source of [browserScript, workflow]) assert.ok(source.includes('district5'), 'missing District 5 browser QA path');
  for (const marker of ['district5-desktop.png', 'district5-mobile.png', 'isMobile', "fullPage: true", "affiliate.length === 2", 'documentWidth', 'report.json']) {
    // Screenshot paths are assembled with each viewport label in the runner.
    assert.ok(browserScript.includes(marker) || (marker.startsWith('district5-') && browserScript.includes("'/district5-' + spec.label + '.png'")), marker);
  }
  const deps = workflow.match(/- name: Prepare District 5 responsive Chrome verification\n\s+id: district5_browser_deps\n\s+if: ([^\n]+)/);
  assert.ok(deps, 'District 5 browser dependency gate missing');
  assert.ok(deps[1].includes("steps.live_district5.outcome == 'success'"), 'Run after District 5 HTML smoke');
  assert.ok(!deps[1].includes('steps.change_scope.outputs.sports'), 'Do not skip District 5 browser on other changes');
  assert.ok(workflow.includes("steps.district5_browser_deps.outcome == 'success'"));
  assert.ok(workflow.includes('live_district5_browser'));
  assert.ok(workflow.includes('district5-responsive-browser-${{ github.run_id }}'));
});
