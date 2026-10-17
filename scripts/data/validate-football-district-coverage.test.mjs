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
