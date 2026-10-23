import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const loader=readFileSync('src/data/school-district-tax-rates.ts','utf8');
const page=readFileSync('src/routes/texas-data.$datasetSlug.lazy.tsx','utf8');
const csv=readFileSync('src/data/texas-data-download.ts','utf8');

test('statewide school district tax records are fully paginated beyond 1000',()=>{
  assert.match(loader,/\.range\(offset, offset \+ pageSize - 1\)/);
  assert.match(loader,/\.order\('id', \{ ascending: true \}\)/);
  assert.match(loader,/if \(page\.length < pageSize\) break/);
  assert.match(loader,/new Set\(rows\.map\(\(row\) => row\.id\)\)\.size !== rows\.length/);
  assert.doesNotMatch(loader,/\.from\('texas_property_tax_rates'\)\.select\('\*'\)\.eq\('year', targetYear\).*\.order\('name'/);
});

test('official district identities are source-backed, and ambiguous names do not invent district IDs',()=>{
  assert.match(loader,/record\.officialTaxingUnitIds/);
  assert.match(loader,/cdns\.length === 1 \? cdns\[0\] : null/);
  assert.match(page,/Official school district ID: \{row\.officialCdn\}/);
  assert.match(page,/Independently verified correction source/);
  assert.match(page,/row\.sourceUrl !== data\.sourceWorkbook/);
});

test('full server-side CSV retains district source IDs and original source citations without client formulas',()=>{
  assert.match(csv,/'school_district', 'official_cdn', 'county_slugs'/);
  assert.match(csv,/row\.name, row\.officialCdn, row\.countySlugs/);
  assert.match(csv,/row\.sourceStatus, row\.sourceUrl, data\.sourcePage, data\.sourceWorkbook/);
  assert.ok(csv.includes("const safe = typeof value === 'number'"),'text fields must retain CSV injection guard');
  assert.match(page,/href="\/texas-data\/school-district-tax-rates\.csv"/);
});
