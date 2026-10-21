import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const source = readFileSync(new URL('../../src/data/high-school-football/football-district-game-week.ts', import.meta.url), 'utf8');
const template = readFileSync(new URL('../../src/routes/texas-high-school-football-districts_.$slug.lazy.tsx', import.meta.url), 'utf8');
const head = readFileSync(new URL('../../src/routes/texas-high-school-football-districts_.$slug.tsx', import.meta.url), 'utf8');

const dates = [...source.matchAll(/(?:final|scheduled)\('(2026-\d{2}-\d{2})'/g)].map((match) => match[1]);
const results = [...source.matchAll(/final\('(2026-\d{2}-\d{2})', '([^']+)', '([^']+)', (\d+), (\d+), (?:[A-Z0-9_]+|'https:\/\/[^']+'), '([^']+)'\)/g)]
  .map((match) => ({ date: match[1], away: match[2], home: match[3], awayScore: Number(match[4]), homeScore: Number(match[5]) }));
const fixtures = [...source.matchAll(/scheduled\('(2026-\d{2}-\d{2})', '([^']+)', '([^']+)', '([^']+)', '([^']+)'\)/g)]
  .map((match) => ({ date: match[1], away: match[3], home: match[4] }));
const games = [...results, ...fixtures];

test('district 22 has independent source-backed reported results and a complete dated run-in', () => {
  assert.equal(results.length, 24);
  assert.equal(fixtures.length, 12);
  assert.equal(dates.length, 36);
  for (const date of dates) assert.ok(Number.isFinite(Date.parse(date + 'T00:00:00Z')), date);
  assert.equal(new Set(games.map((game) => [game.date, ...[game.away, game.home].sort()].join('|'))).size, 36);
  assert.ok(source.includes('2026 Katy ISD varsity schedule (March 27 publication)'));
  assert.ok(source.includes('CHRONICLE_OCT_15'));
  assert.ok(source.includes("final('2026-10-16', 'Katy Cinco Ranch', 'Katy Tompkins', 12, 49"));
  assert.ok(source.includes("final('2026-10-16', 'Katy Morton Ranch', 'Katy Taylor', 19, 38"));
  assert.ok(source.includes('SEVEN_LAKES_OCT_15'));
  assert.ok(source.includes('getDistrictFootballGames'));
  assert.ok(source.includes("game.phase !== 'regular'"));
  assert.ok(source.includes("converted.status === 'final' && previous.status !== 'final'"));
});

test('Katy roster names cover every scheduled game with no fictitious teams', () => {
  const schools = new Set(['Katy', 'Katy Cinco Ranch', 'Katy Jordan', 'Katy Mayde Creek', 'Katy Morton Ranch', 'Katy Paetow', 'Katy Seven Lakes', 'Katy Taylor', 'Katy Tompkins']);
  for (const game of games) {
    assert.ok(schools.has(game.away), game.away);
    assert.ok(schools.has(game.home), game.home);
    assert.notEqual(game.away, game.home);
  }
});

test('source-derived district W–L matches all reported games without inventing UIL tie-breaks', () => {
  const records = new Map();
  for (const { away, home, awayScore, homeScore } of results) {
    if (!records.has(away)) records.set(away, [0, 0]);
    if (!records.has(home)) records.set(home, [0, 0]);
    if (awayScore > homeScore) { records.get(away)[0] += 1; records.get(home)[1] += 1; }
    else if (homeScore > awayScore) { records.get(home)[0] += 1; records.get(away)[1] += 1; }
    else assert.fail('No tied completed contests were included in the 2026 Katy source snapshot');
  }
  assert.deepEqual(Object.fromEntries([...records.entries()].sort(([a], [b]) => a.localeCompare(b))), {
    Katy: [6, 0],
    'Katy Cinco Ranch': [3, 3],
    'Katy Jordan': [3, 2],
    'Katy Mayde Creek': [1, 4],
    'Katy Morton Ranch': [1, 4],
    'Katy Paetow': [2, 3],
    'Katy Seven Lakes': [0, 5],
    'Katy Taylor': [4, 2],
    'Katy Tompkins': [4, 1],
  });
  assert.ok(source.includes('getSourcedDistrictRecords'));
  assert.ok(template.includes('data-football-district-records="source-derived"'));
  assert.ok(template.includes('not UIL-certified standings'));
  assert.ok(template.includes('Do not use these partial data for official UIL seeds'));
});

test('shared template does not mislabel a partial scorecard as official standings', () => {
  for (const marker of [
    'data-football-district-section="coverage"',
    'getDistrictFootballGames',
    'Reported final scores',
    'Result not verified',
    'not live scores or certified district standings',
    'Schedule dates, venues and kickoff times can change',
    'sourceUrl',
    'matchupPath',
  ]) assert.ok(template.includes(marker), marker);
  assert.ok(head.includes('Katy ISD District 22-6A Football: 2026 Scores & Schedule'));
  assert.ok(template.includes('data-football-district-section="teams"'));
  assert.ok(template.includes('data-football-district-section="official-sources"'));
});


const district16Data = readFileSync(new URL('../../src/data/high-school-football/football-district16-2026.ts', import.meta.url), 'utf8');
const district16Component = readFileSync(new URL('../../src/components/sports/District16Coverage.tsx', import.meta.url), 'utf8');

test('District 16 standings snapshot is internally consistent and strictly source-dated', () => {
  const rows = [...district16Data.matchAll(/\{ name: '([^']+)', match: '([^']+)', won: (\d+), lost: (\d+), pf: (\d+), pa: (\d+), overall: '([^']+)' \}/g)]
    .map((m) => ({ name: m[1], won: +m[3], lost: +m[4], pf: +m[5], pa: +m[6] }));
  assert.equal(rows.length, 8, 'all 8 CFISD district schools');
  assert.equal(new Set(rows.map((r) => r.name)).size, 8, 'no duplicate entries');
  assert.ok(rows.every((r) => r.won + r.lost === 4), 'same four district games per team as of October 18');
  assert.equal(rows.reduce((sum, r) => sum + r.won, 0), 16);
  assert.equal(rows.reduce((sum, r) => sum + r.lost, 0), 16);
  assert.equal(rows.reduce((sum, r) => sum + r.pf, 0), rows.reduce((sum, r) => sum + r.pa, 0));
  assert.ok(district16Data.includes("DISTRICT_16_STANDINGS_AS_OF = 'October 18, 2026'"));
  assert.ok(district16Data.includes('NOT a live feed'));
});

test('District 16 next-round schedule and four Week 8 finals remain separate from its standings snapshot', () => {
  assert.equal([...district16Data.matchAll(/date: '2026-10-(?:15|16|17)'/g)].length, 4);
  assert.equal([...district16Data.matchAll(/date: '2026-10-(?:22|23|24)'/g)].length, 4);
  assert.equal([...district16Data.matchAll(/\{ date: '2026-(?:10|11)-\d\d', kickoff:/g)].length, 12, 'full 12-match run-in');
  assert.ok(district16Data.includes("kickoff: 'Kickoff unconfirmed'"), 'do not invent uncertain November 7 kickoff');
  for (const key of ['Cypress Woods', 'Cypress Falls', 'Cypress Lakes', 'Langham Creek', 'Jersey Village', 'Cy-Fair', 'Cypress Creek', 'Cypress Ridge']) {
    assert.ok(district16Data.includes(key), key);
  }
  for (const marker of [
    'data-football-district-section="district-16-2026"',
    'data-football-district-records="reported-standings-snapshot"',
    'not a continuously updated scoreboard',
    'not every game played',
    'All twelve remaining district fixtures',
    'DISTRICT_16_CFISD_TICKETS_URL',
    'DISTRICT_16_CFISD_SCHEDULE_URL',
    'teamHref',
  ]) assert.ok(district16Component.includes(marker), marker);
  assert.ok(template.includes('<District16Coverage schools={district.programs} />'));
  assert.ok(template.includes('district16Pilot ? <Related href="#district-16-results"'));
  assert.ok(template.includes('!district16Pilot && (katyPilot || district5Pilot || games.length > 0)'));
  assert.ok(head.includes('District 16-6A Football: 2026 Standings, Scores & Schedule'));
});
