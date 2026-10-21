import test from 'node:test';
import assert from 'node:assert/strict';
import { parseCurrentRelease, parseMetroTable, parseFredCsv, validateFresh } from './refresh-texas-metro-payrolls.mjs';

const areas = [
  ['Dallas-Fort Worth-Arlington', 4357.0], ['Houston-Pasadena-The Woodlands', 3495.3],
  ['Austin-Round Rock-San Marcos', 1415.9], ['San Antonio-New Braunfels', 1191.7],
  ['El Paso', 363.5], ['McAllen-Edinburg-Mission', 308.1], ['Corpus Christi', 202.3],
  ['Lubbock', 176.3], ['Brownsville-Harlingen', 159.5],
  ['College Station-Bryan', 142.1], ['Waco', 142.9], ['Amarillo', 130.7], ['Tyler', 122.6],
];
const summary = '<p>For release 10:00 a.m. (ET) Wednesday, September 30, 2026</p>' +
  '<h1>METROPOLITAN AREA EMPLOYMENT AND UNEMPLOYMENT - AUGUST 2026</h1>';
const table = rows => '<h2>Table 3. Employees on nonfarm payrolls by state and metropolitan area, not seasonally adjusted</h2><table>' +
  rows.map(([name, number]) => '<tr><th>' + name + '</th><td>100.0</td><td>100.1</td><td>100.2</td><td>' +
    number.toLocaleString('en-US', { minimumFractionDigits: 1, maximumFractionDigits: 1 }) +
    '</td><td>0.1</td><td>0.1</td></tr>').join('') + '</table>';

test('BLS dated summary derives a source-specific archive and period', () => {
  assert.deepEqual(parseCurrentRelease(summary), {
    releaseMonth: '2026-08', publishedDate: '2026-09-30',
    sourceUrl: 'https://www.bls.gov/news.release/archives/metro_09302026.htm',
  });
  assert.throws(() => parseCurrentRelease(summary.replace('AUGUST 2026', 'AUGUST 2029')));
  assert.throws(() => parseCurrentRelease(summary.replace('September 30, 2026', 'September 40, 2026')));
});

test('Table 3 uses current-year latest-month column and requires all 13 named metros', () => {
  const rows = parseMetroTable(table(areas));
  assert.equal(rows.length, 13);
  assert.equal(rows[0].value, 4357000);
  assert.equal(rows[1].value, 3495300);
  assert.equal(rows[12].value, 122600);
  assert.throws(() => parseMetroTable(table(areas.slice(0, 12))), /Incomplete/);
  assert.throws(() => parseMetroTable(table([...areas, areas[0]])), /Duplicate/);
  assert.throws(() => parseMetroTable(table(areas).replace('4,357.0', 'broken')), /numeric format/);
});

test('Refuse stale release, missing source provenance and implausible changes', () => {
  const old = {
    releaseMonth: '2026-08', publishedDate: '2026-09-30',
    sourceUrl: 'https://www.bls.gov/news.release/archives/metro_09302026.htm',
    rows: parseMetroTable(table(areas)),
  };
  validateFresh(old, old);
  assert.throws(() => validateFresh({ ...old, releaseMonth: '2026-07' }, old), /older/);
  assert.throws(() => validateFresh({ ...old, sourceUrl: 'https://example.com' }, old), /provenance/);
  assert.throws(() => validateFresh({ ...old, rows: old.rows.map((r, i) => i === 0 ? { ...r, value: 1500000 } : r) }, old), /beyond controlled/);
});


test('Federal Reserve BLS fallback verifies all 13 NSA series, synchronized month, and magnitude', () => {
  const ids = ['DALL148NAN','HOUS448NAN','AUST448NAN','SANA748NAN','ELPA348NAN',
    'MCAL548NAN','CORP548NAN','LUBB148NAN','BROW148NAN','COLL748NAN',
    'WACO348NAN','AMAR148NAN','TYLE348NAN'];
  const old = { releaseMonth: '2026-08', publishedDate: '2026-09-30',
    sourceUrl: 'https://www.bls.gov/news.release/archives/metro_09302026.htm',
    rows: parseMetroTable(table(areas)) };
  const makeCsv = (header = ids, data = areas.map(([, n]) => String(n))) =>
    'observation_date,' + header.join(',') + '\n' +
    '2026-08-01,' + data.join(',') + '\n';
  const data = parseFredCsv(makeCsv(), old);
  assert.equal(data.releaseMonth, '2026-08');
  assert.equal(data.rows.length, 13);
  assert.equal(data.rows[0].value, 4357000);
  assert.equal(data.publishedDate, '2026-09-30', 'same data must not invent a new publication date');
  assert.match(data.sourceUrl, /^https:\/\/fred\.stlouisfed\.org\/graph\//);
  validateFresh(data, old);
  assert.throws(() => parseFredCsv(makeCsv(ids.slice(1)), old), /changed the required/);
  assert.throws(() => parseFredCsv(makeCsv(ids, areas.slice(0, 12).map(([, n]) => String(n))), old), /no complete/);
  const newest = parseFredCsv(makeCsv(ids, areas.map(([, n]) => String(n+1))), old, '2026-10-21');
  assert.equal(newest.publishedDate, '2026-10-21');
  assert.throws(() => validateFresh({ ...newest, rows: newest.rows.map((r, i) =>
    i === 0 ? { ...r, value: 10_000 } : r) }, old), /beyond controlled/);
});
