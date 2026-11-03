import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const read = (name) => readFileSync(new URL('../../' + name, import.meta.url), 'utf8');

test('Edna 2023 independent county observation is explicit and calculator-safe', () => {
  const server = read('src/data/property/texas-tax-rates.server.ts');
  const page = read('src/routes/property-tax.taxing-unit.$unit.tsx');
  assert.match(server, /record.slug === 'edna'.*record.year === 2023/);
  assert.match(server, /const localTotal = 0\.2128/);
  assert.match(server, /maintenanceOperationsRate: 0\.1294/);
  assert.match(server, /debtServiceRate: 0\.0834/);
  assert.match(server, /2025%20FIVE%20YEAR%20SUMMARY\.pdf/);
  assert.match(page, /historicalConflicts/);
  assert.match(page, /cityofedna\.com\/article\/3160346/);
  assert.match(page, /\$0\.2263 per \$100/);
});

test('Jackson County ESD #1 keeps district and parcel boundaries explicit', () => {
  const page = read('src/routes/property-tax.taxing-unit.$unit.tsx');
  assert.match(page, /jackson-county-esd-1/);
  assert.match(page, /district rate applies only to taxable property within its legal boundaries/);
  assert.match(page, /co\.jackson\.tx\.us\/page\/Tax\.Rates/);
});

test('Collin County tables render from a bounded server function, not solely browser fetch', () => {
  const route = read('src/routes/$kind.$slug.tsx');
  const functions = read('src/data/property/texas-tax-rates.functions.ts');
  const lazy = read('src/routes/$kind.$slug.lazy.tsx');
  const guide = read('src/components/content/CountyGuideSections.tsx');
  const identity = read('src/components/content/CountyIdentitySection.tsx');
  const table = read('src/components/property/CountyTaxRateSection.tsx');
  assert.match(route, /entity.slug === 'collin'/);
  assert.match(route, /getCountyTaxRateSnapshot/);
  assert.doesNotMatch(route, /import\('@\/data\/property\/texas-tax-rates\.server'\)/);
  assert.match(functions, /getCountyTaxRateSummaryServer/);
  assert.match(lazy, /initialTaxSummary=\{countyTaxSummary\}/);
  assert.match(guide, /initialTaxSummary=\{initialTaxSummary\}/);
  assert.match(identity, /initialSummary=\{initialTaxSummary\}/);
  assert.match(table, /useState<ResponseBody\|null>\(initialSummary\?/);
  assert.match(table, /if\(initialSummary\)return/);
});

test('Events calendar deduplicates team matchups and safely handles uncertain times', () => {
  const records = read('src/data/events/texas-event-records.server.ts');
  const landing = read('src/components/events/EventsLandingPage.tsx');
  assert.match(records, /function sportingFixtureKey/);
  assert.match(records, /reconcileDuplicateSportingFixtures/);
  assert.match(records, /timeConflict \? undefined/);
  assert.match(records, /ticketing: timeConflict \? undefined/);
  assert.match(landing, /How this calendar works/);
  assert.match(landing, /event\.officialEventUrl/);
  assert.match(landing, /https:\/\/tpwd\.texas\.gov\/calendar\//);
});
