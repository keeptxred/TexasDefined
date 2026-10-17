import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const source = readFileSync(new URL('../../src/data/high-school-football/football-district-game-week.ts', import.meta.url), 'utf8');
const template = readFileSync(new URL('../../src/routes/texas-high-school-football-districts_.$slug.lazy.tsx', import.meta.url), 'utf8');
const head = readFileSync(new URL('../../src/routes/texas-high-school-football-districts_.$slug.tsx', import.meta.url), 'utf8');

const dates = [...source.matchAll(/(?:final|scheduled)\('(2026-\d{2}-\d{2})'/g)].map((match) => match[1]);
const results = [...source.matchAll(/final\('(2026-\d{2}-\d{2})', '([^']+)', '([^']+)', (\d+), (\d+), ([A-Z0-9_]+), '([^']+)'\)/g)];
const fixtures = [...source.matchAll(/scheduled\('(2026-\d{2}-\d{2})', '([^']+)', '([^']+)', '([^']+)', '([^']+)'\)/g)];

test('district 22 has independent source-backed reported results and a complete dated run-in', () => {
  assert.equal(results.length, 6);
  assert.equal(fixtures.length, 14);
  assert.equal(dates.length, 20);
  for (const date of dates) assert.ok(Number.isFinite(Date.parse(date + 'T00:00:00Z')), date);
  assert.equal(new Set([...results, ...fixtures].map((entry) => [entry[1], ...[entry[2], entry[3]].sort()].join('|'))).size, 20);
  assert.ok(source.includes('2026 Katy ISD varsity schedule (March 27 publication)'));
  assert.ok(source.includes('CHRONICLE_OCT_15'));
  assert.ok(source.includes('SEVEN_LAKES_OCT_15'));
  assert.ok(source.includes('getDistrictFootballGames'));
  assert.ok(source.includes("game.phase !== 'regular'"));
  assert.ok(source.includes("converted.status === 'final' && previous.status !== 'final'"));
});

test('Katy roster names cover every scheduled game with no fictitious teams', () => {
  const schools = new Set(['Katy', 'Katy Cinco Ranch', 'Katy Jordan', 'Katy Mayde Creek', 'Katy Morton Ranch', 'Katy Paetow', 'Katy Seven Lakes', 'Katy Taylor', 'Katy Tompkins']);
  for (const entry of [...results, ...fixtures]) {
    assert.ok(schools.has(entry[2]), entry[2]);
    assert.ok(schools.has(entry[3]), entry[3]);
    assert.notEqual(entry[2], entry[3]);
  }
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
