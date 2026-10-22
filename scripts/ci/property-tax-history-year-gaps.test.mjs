import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { consecutiveRateChanges, taxHistoryYearPosition, formatOfficialTaxRate } from '../../src/lib/financial/property-tax-history.ts';

const available = [{year:2021,totalRate:0.5},{year:2022,totalRate:0.4},{year:2024,totalRate:0.8},{year:2025,totalRate:0.7}];
test('one-year change detection excludes gaps across missing/unreported years',()=>{
  assert.deepEqual(consecutiveRateChanges(available),[
    {year:2022,delta:-0.09999999999999998},
    {year:2025,delta:-0.10000000000000009},
  ]);
  assert.equal(consecutiveRateChanges([{year:2021,totalRate:0.5},{year:2024,totalRate:0.8}]).length,0);
});
test('one-year comparison rejects a null rate even on adjacent years',()=>{
  assert.deepEqual(consecutiveRateChanges([{year:2022,totalRate:0.4},{year:2023,totalRate:null}]),[]);
});
test('chart spacing maps calendar years proportionally and handles one observation',()=>{
  assert.equal(taxHistoryYearPosition(2021,2021,2025,24,952),24);
  assert.equal(taxHistoryYearPosition(2022,2021,2025,24,952),262);
  assert.equal(taxHistoryYearPosition(2024,2021,2025,24,952),738);
  assert.equal(taxHistoryYearPosition(2025,2021,2025,24,952),976);
  assert.equal(taxHistoryYearPosition(2022,2022,2022,24,952),500);
});
test('local evidence precision and a legitimate zero are preserved',()=>{
  assert.equal(formatOfficialTaxRate(0.1330247),'0.1330247');
  assert.equal(formatOfficialTaxRate(0.492123),'0.492123');
  assert.equal(formatOfficialTaxRate(0),'0.000000');
});
test('interactive explorer labels unavailable official rates separately from local display-only evidence',()=>{
  const route=readFileSync('src/routes/texas-property-tax-rate-history.lazy.tsx','utf8');
  assert.match(route,/consecutiveRateChanges\(comparable\)/);
  assert.match(route,/taxHistoryYearPosition\(record\.year/);
  assert.match(route,/localVerification\?\.mode === 'supplement'/);
  assert.match(route,/Comptroller not reported; local/);
  assert.match(route,/localVerification\?\.mode === 'conflict'/);
  assert.match(route,/State\/local source disagreement/);
  assert.match(route,/item\.localVerification\?\.mode !== 'conflict'/);
  assert.match(route,/a\.localVerification\?\.mode !== 'conflict'/);
  assert.match(route,/b\.localVerification\?\.mode !== 'conflict'/);
  assert.doesNotMatch(route,/\.toFixed\(6\)/);

  assert.match(route,/Separate local evidence is shown below but excluded from the trend/);
  assert.match(route,/localVerification\.sourceUrl/);
  assert.doesNotMatch(route,/const yearChanges = comparable\.slice\(1\)\.map/);
});

test('recent tax lookup restores exact saved unit type, not an ambiguous name-only search',()=>{
  const route=readFileSync('src/routes/texas-property-tax-rate-history.lazy.tsx','utf8');
  assert.match(route,/async function chooseRecent\(record: RecentUnit\)/);
  assert.match(route,/const records = await loadHistory\(record\)/);
  assert.match(route,/onClick=\{\(\) => void chooseRecent\(item\)\}/);
  assert.match(route,/type=\$\{encodeURIComponent\(record.type\)\}/);
  assert.doesNotMatch(route,/onClick=\{\(\) => void quickLookup\(item.name\)\}/);
});
