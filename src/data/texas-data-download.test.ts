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


test('CSV encoder protects spreadsheet-opening of untrusted school and source fields', async () => {
  const { escapeTexasCsvCell } = await import('./texas-data-download.ts');
  assert.equal(escapeTexasCsvCell('=HYPERLINK("https://evil.invalid")'), "\"'=HYPERLINK(\"\"https://evil.invalid\"\")\"");
  assert.equal(escapeTexasCsvCell('  +SUM(1,2)'), "\"'  +SUM(1,2)\"");
  assert.equal(escapeTexasCsvCell('-3+2'), "\"'-3+2\"");
  assert.equal(escapeTexasCsvCell(-123.25), '"-123.25"');
  assert.equal(escapeTexasCsvCell(0), '"0"');
  assert.equal(escapeTexasCsvCell(null), '""');
  assert.equal(escapeTexasCsvCell('district,"quote"'), '"district,""quote"""');
});


test('school district tax CSV is a stable discoverable download with source-aware JSON-LD', () => {
  const page = readFileSync('src/routes/texas-data.$datasetSlug.lazy.tsx', 'utf8');
  const head = readFileSync('src/routes/texas-data.$datasetSlug.tsx', 'utf8');
  const route = readFileSync('src/routes/texas-data.school-district-tax-rates[.]csv.ts', 'utf8');
  assert.match(page, /href="\/texas-data\/school-district-tax-rates\.csv"/);
  assert.doesNotMatch(page, /onClick=\{\(\) => downloadCsv\(data\)\}/);
  assert.ok(head.includes('encodingFormat: \'text/csv\''));
  assert.ok(head.includes("contentUrl: absoluteUrl(texasDefinedBrand, '/texas-data/school-district-tax-rates.csv')"));
  assert.ok(route.includes("createFileRoute('/texas-data/school-district-tax-rates.csv')"));
  assert.ok(route.includes("'x-robots-tag': 'noindex, follow'"));
  assert.ok(route.includes("status: 503"));
  assert.ok(route.includes("buildSchoolDistrictTaxRateCsv(data)"));
});

test('school district CSV preserves conflicting, variable and missing rates instead of invented zeros', async () => {
  const { buildSchoolDistrictTaxRateCsv } = await import('./texas-data-download.ts');
  const base = {
    year: 2025, priorYear: 2024, generatedAt: '2026-10-14T12:00:00Z',
    sourceName: 'Comptroller', sourcePage: 'https://example.org/rates',
    sourceWorkbook: 'https://example.org/2025.xlsx', priorWorkbook: 'https://example.org/2024.xlsx',
    officialCorrectionCount: 1,
  };
  const csv = buildSchoolDistrictTaxRateCsv({ ...base, rows: [
    { name: '=INJECT', slug: 'missing', countySlugs: ['harris'], rate: null, priorRate: null, maintenanceOperationsRate: null, debtServiceRate: null, variableRate: false, rateVariants: [], sourceStatus: 'cross-source-conflict', sourceUrl: 'https://example.org/conflict' },
    { name: 'Variable district', slug: 'variable', countySlugs: ['bexar'], rate: null, priorRate: 1.1, maintenanceOperationsRate: null, debtServiceRate: null, variableRate: true, rateVariants: [1.1, 1.2], sourceStatus: 'reported-final', sourceUrl: 'https://example.org/variable' },
    { name: 'Measured district', slug: 'measured', countySlugs: ['travis'], rate: 1.25, priorRate: 1.2, maintenanceOperationsRate: 0.8, debtServiceRate: 0.45, variableRate: false, rateVariants: [], sourceStatus: 'reported-final', sourceUrl: 'https://example.org/measured' },
  ] });
  assert.ok(csv.startsWith('\uFEFF'));
  assert.ok(csv.includes('"\'=INJECT"'));
  assert.ok(csv.includes('"cross-source-conflict"'));
  assert.ok(csv.includes('"1.1; 1.2"'));
  assert.ok(csv.includes('"1100; 1200"'));
  assert.ok(csv.includes('"0.05"'));
  assert.ok(!csv.includes('0.050000000000000044'));
  assert.ok(csv.includes('https://example.org/2025.xlsx'));
  assert.ok(csv.includes('2026-10-14T12:00:00Z'));
  assert.ok(!csv.includes('"undefined"'));
});
