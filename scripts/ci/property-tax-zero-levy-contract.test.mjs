import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const sql=readFileSync('supabase/migrations/20261021212000_post_oak_bend_2021_2024_local_zero_evidence.sql','utf8');
const route=readFileSync('src/routes/property-tax.taxing-unit.$unit.tsx','utf8');

test('Post Oak Bend historical zero levies use year-specific primary sources',()=>{
  assert.match(sql,/2021,'city','post-oak-bend','129-110-03',0\.000000,null,null/);
  assert.match(sql,/2024,'city','post-oak-bend','129-110-03-129-129',0\.000000,null,null/);
  assert.match(sql,/2021-Certified-Totals\.pdf/);
  assert.match(sql,/Minutes%205-14-2024\.pdf/);
  assert.match(sql,/postoakbend\.org\/mayor\//);
  assert.match(sql,/and r\.total_rate is null and r\.source_status='not-reported'/);
  assert.match(sql,/on conflict \(tax_year,unit_type,slug\) do nothing/);
});
test('display of zero city rate never implies an entire parcel has no tax',()=>{
  assert.match(route,/A zero <strong>city<\/strong> rate does not mean/);
  assert.match(route,/not substituted into statewide records or parcel calculators/);
});
