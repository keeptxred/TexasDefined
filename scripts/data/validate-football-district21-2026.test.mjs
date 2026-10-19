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
  assert.ok(template.includes('!district21Pilot && <FootballFanOffers'));
});
