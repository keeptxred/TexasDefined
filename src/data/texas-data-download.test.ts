import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import { buildTexasDatasetCsv } from './texas-data-download.ts';

const sample = {
  slug: 'illustrative-records',
  title: 'Illustrative Records',
  description: 'Test values only',
  category: 'Test',
  year: 2025,
  updated: '2026-10-15',
  sourceName: 'Official source',
  sourceUrl: 'https://example.org/source?year=2025',
  methodology: 'Only reported observations',
  unit: 'count' as const,
  rows: [
    { label: 'Population, "North"', value: 0, note: 'Not a missing count' },
    { label: 'Net migration', value: -123, note: '=HYPERLINK("unsafe")' },
  ],
};

test('generic dataset CSV preserves zero, negative numbers, metadata and escaped quotation marks', () => {
  const csv = buildTexasDatasetCsv(sample);
  assert.ok(csv.startsWith('\uFEFF"metric","value","unit","year","last_verified"'));
  assert.ok(csv.includes('"Population, ""North""","0","count","2025","2026-10-15"'));
  assert.ok(csv.includes('"Net migration","-123","count"'));
  assert.ok(csv.includes('"Official source","https://example.org/source?year=2025"'));
  assert.ok(csv.includes('"Only reported observations"'));
  assert.ok(csv.endsWith('\r\n'));
});

test('CSV text fields cannot trigger spreadsheet formulas', () => {
  const csv = buildTexasDatasetCsv(sample);
  assert.ok(csv.includes('"\'=HYPERLINK(""unsafe"")"'));
});

test('generic dataset pages retain a visible source-backed download without a new route', () => {
  const source = readFileSync('src/routes/texas-data.$datasetSlug.lazy.tsx', 'utf8');
  assert.ok(source.includes('buildTexasDatasetCsv(dataset)'));
  assert.ok(source.includes('Download CSV'));
  assert.ok(source.includes('dataset.rows.map'));
});
