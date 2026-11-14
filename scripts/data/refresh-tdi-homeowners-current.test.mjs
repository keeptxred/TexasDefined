import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { extractTdiRows, validateTdiSeries, refresh } from './refresh-tdi-homeowners-current.mjs';

const previous = JSON.parse(fs.readFileSync('src/data/generated/tdi-homeowners-current.json', 'utf8'));
const makeHtml = (rows, omitCoverage = false) =>
  '<html><title>Texas homeowners insurance market overview</title><body>' +
  '<p>Source: Texas Statistical Plan for Residential Risks</p><p>Types of policies: Homeowners</p>' +
  '<img alt="Chart showing average home insurance premium. ' +
  rows.map(r => r.year + ' $' + r.premium.toLocaleString('en-US')).join(' ') + '">' +
  (omitCoverage ? '' : '<img alt="Chart showing average home coverage. ' +
    rows.map(r => r.year + ' $' + r.coverage.toLocaleString('en-US')).join(' ') + '">') + '</body></html>';

test('official TDI premium/coverage charts require year-matched data and declared homeowners policy type', () => {
  assert.deepEqual(extractTdiRows(makeHtml(previous.rows)), previous.rows.map(({year,premium,coverage}) => ({year,premium,coverage})));
  assert.throws(() => extractTdiRows(makeHtml(previous.rows, true)), /exactly one/);
  assert.throws(() => extractTdiRows(makeHtml(previous.rows).replace('Types of policies: Homeowners', 'Types of policies: Auto')), /definition missing/);
});
test('reject changed historical series, impossible annual vintages and outliers', () => {
  const next = [...previous.rows, {year: 2026, premium: 3650, coverage: 451000}];
  validateTdiSeries(next, previous, '2026-10-26');
  assert.throws(() => validateTdiSeries([...next, {year: 2027, premium: 3700, coverage: 454000}], previous, '2026-10-26'), /source vintage/);
  assert.throws(() => validateTdiSeries(next.map(r => r.year === 2024 ? {...r, premium: 5500} : r), previous, '2026-10-26'), /safety bound/);
});
test('only verified changes trigger publication; previously preliminary 2025 stays preliminary', async () => {
  const writes = new Map();
  const bridge = "export const TEXAS_DATASETS = [{ slug: 'texas-homeowners-premium-latest', updated: '2026-10-10' }];";
  const read = async filename => filename.endsWith('.json') ? JSON.stringify(previous) : bridge;
  const write = async (filename, content) => writes.set(filename, content);
  assert.equal(await refresh({fetchHtml: async () => makeHtml(previous.rows),read,write,checkedAt:'2026-10-26'}), false);
  assert.equal(writes.size, 0);
  const newRows = [...previous.rows, {year:2026,premium:3650,coverage:451000}];
  assert.equal(await refresh({fetchHtml: async () => makeHtml(newRows),read,write,checkedAt:'2026-10-26'}), true);
  const output = JSON.parse(writes.get('src/data/generated/tdi-homeowners-current.json'));
  assert.equal(output.sourceYear,2026);
  assert.equal(output.rows.at(-2).preliminary, true);
  assert.equal(output.rows.at(-1).preliminary, true);
  assert.equal(output.verifiedAt,'2026-10-26');
  assert.match(writes.get('src/data/texas-data-center.ts'), /updated: '2026-10-26'/);
});
