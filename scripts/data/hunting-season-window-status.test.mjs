import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { readRange, windowStatus } from '../../src/data/hunting/season-window-status.mjs';

const species = JSON.parse(fs.readFileSync('src/data/hunting/species-season-calendar.json', 'utf8'));
const deer = JSON.parse(fs.readFileSync('src/data/hunting/deer-season-dates.json', 'utf8'));
const turkey = JSON.parse(fs.readFileSync('src/data/hunting/turkey-season-calendar.json', 'utf8'));

test('TPWD compact, cross-year and disjoint ranges are parsed without date guessing', () => {
  assert.deepEqual(readRange('Oct. 3-18, 2026'), { start: '2026-10-03', end: '2026-10-18' });
  assert.deepEqual(readRange('Oct. 3 – Nov. 6, 2026'), { start: '2026-10-03', end: '2026-11-06' });
  assert.deepEqual(readRange('Nov. 7, 2026 - Jan. 3, 2027'), { start: '2026-11-07', end: '2027-01-03' });
  assert.deepEqual(readRange('Apr. 1–30, 2027'), { start: '2027-04-01', end: '2027-04-30' });
  assert.equal(readRange('dates coming soon'), null);
  assert.equal(readRange('Feb. 30, 2027 - Mar. 2, 2027'), null);
});

test('known TPWD dates are time-bounded and unknown dates fail closed', () => {
  const row = { dates: 'Oct. 24-25, 2026 & Oct. 30, 2026 - Jan. 31, 2027' };
  assert.equal(windowStatus(row, '2026-10-28'), 'upcoming');
  assert.equal(windowStatus(row, '2026-10-30'), 'today');
  assert.equal(windowStatus(row, '2027-02-01'), 'ended');
  assert.equal(windowStatus({ dates: 'No closed season' }, '2026-10-28'), 'year-round');
  assert.equal(windowStatus({ dates: 'Unverified by TPWD' }, '2026-10-28'), 'unknown');
  assert.equal(windowStatus({ dates: 'Oct. 3-18, 2026', start: '2026-10-03', end: '2026-10-18' }, '2026-10-28'), 'ended');
});

test('all governed TPWD statewide rows plus turkey and deer dates produce known status', () => {
  assert.equal(species.sections.length, 17);
  assert.equal(species.sections.reduce((sum, section) => sum + section.rows.length, 0), 37);
  for (const section of species.sections) {
    for (const row of section.rows) {
      assert.notEqual(windowStatus(row, '2026-10-28'), 'unknown', section.heading + ': ' + row.dates);
    }
  }
  for (const row of turkey.rows) assert.notEqual(windowStatus(row, '2026-10-28'), 'unknown', 'Turkey: ' + row.dates);
  for (const row of deer.rows) assert.notEqual(windowStatus({ dates: '', start: row.start, end: row.end }, '2026-10-28'), 'unknown', 'Deer: ' + row.id);
});
