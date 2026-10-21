import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const importer = readFileSync('supabase/functions/import-texas-property-tax-rates/index.ts','utf8');
const schema = readFileSync('supabase/migrations/20261021184000_atomic_tax_rate_sync_and_local_sources.sql','utf8');
const workflow = readFileSync('.github/workflows/sync-property-tax-rates.yml','utf8');
const route = readFileSync('src/routes/property-tax.taxing-unit.$unit.tsx','utf8');
const server = readFileSync('src/data/property/texas-tax-rates.server.ts','utf8');

test('unsafe multi-request delete-and-upsert importer cannot regress',()=>{
  assert.doesNotMatch(importer,/from\(["']texas_property_tax_rates["']\)\.delete/);
  assert.match(importer,/rpc\("finalize_texas_tax_import"/);
  assert.match(importer,/texas_tax_import_stage/);
  assert.match(importer,/texas_tax_import_raw_stage/);
});
test('atomic finalizer checks completeness and rolls back on simulated failure',()=>{
  assert.match(schema,/pg_advisory_xact_lock/);
  assert.match(schema,/stage_count <> run_data.expected_count/);
  assert.match(schema,/raw_count <> run_data.expected_raw_count/);
  assert.match(schema,/p_simulate_failure then[\s\S]*raise exception/);
  assert.match(schema,/delete from public\.texas_property_tax_rates where year=run_data.tax_year/);
  assert.match(schema,/insert into public\.texas_property_tax_rates/);
  assert.match(schema,/grant execute on function public\.finalize_texas_tax_import\(uuid,boolean\) to service_role/);
  assert.match(schema,/revoke all on function public\.finalize_texas_tax_import\(uuid,boolean\) from public,anon,authenticated/);
});
test('official 2025 school conflicts and raw source records are preserved',()=>{
  assert.match(importer,/KNOWN_2025_SCHOOL_RATE_CORRECTIONS/);
  assert.match(importer,/cross-source-conflict/);
  assert.match(schema,/texas_tax_import_source_rows/);
  assert.match(importer,/sha256\(bytes\)/);
  assert.match(importer,/status:"unchanged"/);
});
test('historical sync does not exit after one successful import',()=>{
  assert.match(workflow,/year>=oldest/);
  assert.match(workflow,/RATE_HISTORY_LOOKBACK_YEARS/);
  assert.match(workflow,/failures=\$\(\(failures\+1\)\)/);
  assert.doesNotMatch(workflow,/Imported finalized[\s\S]*exit 0/);
});
test('local supplement does not silently mutate statewide calculator values',()=>{
  assert.match(schema,/2024,'city','escobares','214-103-03-214-214',0\.340447,0\.263594,0\.076853/);
  assert.match(server,/record\.localVerification =/);
  assert.match(server,/getTaxingUnitRateHistoryServer/);
  assert.doesNotMatch(route,/const STARR_CAD_2024_COMPONENTS_URL/);
  assert.doesNotMatch(route,/locallyVerified \? 0\.340447/);
  assert.match(route,/local\.totalRate/);
});
test('source statuses and missing components are not coerced to zero',()=>{
  assert.match(importer,/total_rate:rateUnavailable\?null/);
  assert.match(importer,/maintenance_operations_rate:rateUnavailable\?null/);
  assert.match(schema,/texas_tax_local_verified_components_check/);
  assert.equal(0.263594+0.076853,0.340447);
});
