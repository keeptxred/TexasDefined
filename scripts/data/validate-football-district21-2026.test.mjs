import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const data = readFileSync(new URL('../../src/data/high-school-football/football-district21-2026.ts', import.meta.url), 'utf8');
const integration = readFileSync(new URL('../../src/data/high-school-football/football-district-game-week.ts', import.meta.url), 'utf8');
const template = readFileSync(new URL('../../src/routes/texas-high-school-football-districts_.$slug.lazy.tsx', import.meta.url), 'utf8');
const head = readFileSync(new URL('../../src/routes/texas-high-school-football-districts_.$slug.tsx', import.meta.url), 'utf8');
const matches = [...data.matchAll(/\bfinal\('(2026-\d\d-\d\d)', '([^']+)', '([^']+)', (\d+), (\d+)/g)];
const fixtures = [...data.matchAll(/\bscheduled\('(2026-\d\d-\d\d)', '([^']+)', '([^']+)'/g)];
const known = new Set([
  'Fort Bend Austin', 'Fort Bend Bush', 'Fort Bend Clements', 'Fort Bend Elkins',
  'Fort Bend Hightower', 'Fort Bend Ridge Point', 'Fort Bend Travis', 'Houston Strake Jesuit',
]);

test('District 21 has 16 verifiable 2026 league finals and a 12-game full run-in', () => {
  assert.equal(matches.length, 16, '16 district finals before October 19, 2026');
  assert.equal(fixtures.length, 12, '12 remaining league fixtures');
  assert.ok(matches.every((m) => m[1] <= '2026-10-10'));
  assert.ok(fixtures.every((m) => m[1] >= '2026-10-22'));
  const keys = [...matches, ...fixtures].map((m) => {
    assert.ok(known.has(m[2]), m[2]);
    assert.ok(known.has(m[3]), m[3]);
    assert.notEqual(m[2], m[3]);
    assert.ok(Number.isFinite(Date.parse(m[1] + 'T12:00:00Z')));
    return [m[1], ...[m[2], m[3]].sort()].join('|');
  });
  assert.equal(new Set(keys).size, 28);
  assert.ok(data.includes('DISTRICT_21_FBISD_CALENDAR_URL'));
  assert.ok(data.includes('DISTRICT_21_STRAKE_SCHEDULE_URL'));
  assert.ok(data.includes('DISTRICT_21_STANDINGS_AS_OF'));
});

test('No District 21 W-L, point total or standings position is guessed', () => {
  const byTeam = new Map([...known].map((n) => [n, { won: 0, lost: 0, pf: 0, pa: 0 }]));
  for (const [, date, away, home, awayRaw, homeRaw] of matches) {
    const a = Number(awayRaw);
    const h = Number(homeRaw);
    const ar = byTeam.get(away);
    const hr = byTeam.get(home);
    assert.ok(Number.isInteger(a) && a >= 0 && Number.isInteger(h) && h >= 0);
    assert.notEqual(a, h, date);
    ar.pf += a; ar.pa += h;
    hr.pf += h; hr.pa += a;
    if (a > h) { ar.won++; hr.lost++; }
    else { hr.won++; ar.lost++; }
  }
  assert.deepEqual(Object.fromEntries([...byTeam.entries()].sort()), {
    'Fort Bend Austin': { won: 0, lost: 4, pf: 47, pa: 114 },
    'Fort Bend Bush': { won: 1, lost: 3, pf: 60, pa: 127 },
    'Fort Bend Clements': { won: 0, lost: 4, pf: 54, pa: 193 },
    'Fort Bend Elkins': { won: 1, lost: 3, pf: 47, pa: 124 },
    'Fort Bend Hightower': { won: 4, lost: 0, pf: 163, pa: 37 },
    'Fort Bend Ridge Point': { won: 4, lost: 0, pf: 180, pa: 22 },
    'Fort Bend Travis': { won: 4, lost: 0, pf: 130, pa: 71 },
    'Houston Strake Jesuit': { won: 2, lost: 2, pf: 106, pa: 99 },
  });
});

test('The District 21 page does not link its matchup section to District 20 games', () => {
  for (const marker of [
    "district21Pilot", "data-football-district-section=\"district-21-context\"",
    "data-football-district-section=\"district-21-game-day\"",
    'DISTRICT_21_OVERALL_OCT14', 'record.pointsFor', 'record.pointsAgainst',
    'href="#district-21-results"', 'district-21-standings',
    'not UIL-certified', 'DISTRICT_21_VERIFIED_AT',
  ]) assert.ok(template.includes(marker), marker);
  assert.ok(head.includes('District 21-6A Football: 2026 Scores, Standings & Schedule'));
  assert.ok(integration.includes("slug === '6a-district-21'"));
  assert.ok(integration.includes('DISTRICT_21_2026_GAMES'));
  assert.ok(template.includes('!district21Pilot && !district16Pilot && <FootballFanOffers'));
});

const teamPage = readFileSync(new URL('../../src/routes/texas-high-school-football-teams_.$slug.lazy.tsx', import.meta.url), 'utf8');
const teamSeason = readFileSync(new URL('../../src/components/sports/District21TeamSeason.tsx', import.meta.url), 'utf8');

test('every District 21 school profile receives its own opponent-linked, source-dated league scorecard', () => {
  assert.ok(teamPage.includes('hasDistrict21TeamScorecard(schoolName)'), 'team eligibility guard');
  assert.ok(teamPage.includes("program?.classification === '6A' && program.district === 21"), 'restrict to 6A-21');
  assert.ok(teamPage.includes('!editorial?.season && !editorial?.notice'), 'preserve independently researched team data and notices');
  assert.ok(teamPage.includes('<District21TeamSeason schoolName={schoolName} />'), 'route integration');
  assert.ok(teamPage.includes('program && !district21Team &&'), 'avoid duplicated current-season tables');
  for (const name of known) assert.ok(teamSeason.includes(`'${name}':`), `missing team: ${name}`);
  assert.equal([...teamSeason.matchAll(/: 'fort-bend-|: 'houston-strake-jesuit'/g)].length, 8, 'eight unique canonical team slugs');
  for (const marker of [
    'data-football-d21-team-section', 'games.filter(', 'game.status === \'final\'',
    'DISTRICT_21_VERIFIED_AT', 'DISTRICT_21_STANDINGS_AS_OF',
    'Result not verified', 'DISTRICT_21_STRAKE_SCHEDULE_URL',
    'DISTRICT_21_FBISD_CALENDAR_URL', '/texas-high-school-football-playoff-brackets',
    '/texas-high-school-football-districts/6a-district-21#district-21-results',
  ]) assert.ok(teamSeason.includes(marker), marker);
  assert.ok(data.includes("Strake Jesuit varsity reported final"), 'official Strake results source is attributed correctly');
});

const liveCheck = readFileSync(new URL('../../scripts/ci/verify-district21-football-production.mjs', import.meta.url), 'utf8');
const liveWorkflow = readFileSync(new URL('../../.github/workflows/verify-district21-football-production.yml', import.meta.url), 'utf8');

test('District 21 nine-page QA is a blocking step of the same successful production deployment', () => {
  const workflow = readFileSync(new URL('../../.github/workflows/deploy-production.yml', import.meta.url), 'utf8');
  const liveStep = workflow.indexOf('      - name: Verify District 21 hub and eight team scorecards on production');
  const deployStep = workflow.indexOf('      - name: Deploy TexasDefined Worker');
  const finalStep = workflow.indexOf('      - name: Mark live production verification complete');
  assert.ok(deployStep >= 0 && liveStep > deployStep && finalStep > liveStep, 'District 21 acceptance must follow Worker deploy and precede live certification');
  assert.ok(workflow.includes('id: live_district21'));
  assert.ok(workflow.includes('node scripts/ci/verify-district21-football-production.mjs'));
  assert.ok(workflow.includes("steps.live_district21.outcome == 'success'"), 'Cannot mark deployment successful if District 21 verification is skipped or fails');
  assert.ok(!liveWorkflow.includes('workflow_run:'), 'Manual diagnostic must not duplicate automatic production acceptance');
});

test('nine-page District 21 diagnostic checker remains available manually', () => {
  assert.ok(!liveWorkflow.includes('workflow_run:'), 'no duplicate production trigger');
  assert.ok(liveWorkflow.includes('workflow_dispatch:'), 'manual verification supported');
  assert.ok(liveWorkflow.includes('node --check scripts/ci/verify-district21-football-production.mjs'), 'check verifier syntax');
  assert.ok(liveWorkflow.includes('node scripts/ci/verify-district21-football-production.mjs'), 'run verifier');
  assert.ok(liveCheck.includes('district-21-standings') && liveCheck.includes('district-21-results'));
  assert.ok(liveCheck.includes("for (const team of teams)"), 'verify every school profile');
  assert.ok(liveCheck.includes('data-football-d21-team-section'), 'check published SSR, not just source data');
  assert.ok(liveCheck.includes('requireCanonical'), 'unique canonical required');
  assert.ok(liveCheck.includes('if (failures.length)'), 'no false-positive success when a page fails');
  for (const name of [
    'fort-bend-austin', 'fort-bend-bush', 'fort-bend-clements', 'fort-bend-elkins',
    'fort-bend-hightower', 'fort-bend-ridge-point', 'fort-bend-travis', 'houston-strake-jesuit',
  ]) assert.ok(liveCheck.includes(name), `missing production verification for ${name}`);
});
