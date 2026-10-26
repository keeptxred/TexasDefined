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
test('annual and manually requested historical sweeps retain 2021 coverage',()=>{
  assert.match(workflow,/full_history:/);
  assert.match(workflow,/FORCE_FULL_TAX_HISTORY/);
  assert.ok(workflow.includes('date -u +%m'));
  assert.match(workflow,/oldest=2021/);
  assert.match(workflow,/year>=oldest/);
});

test('local supplement does not silently mutate statewide calculator values',()=>{
  assert.match(schema,/2024,'city','escobares','214-103-03-214-214',0\.340447,0\.263594,0\.076853/);
  assert.match(schema,/2024,'city','roma','214-101-03-214-214',0\.567900,0\.499077,0\.068823/);
  assert.match(schema,/2024,'city','rio-grande-city','214-102-03-214-214',0\.521090,0\.372960,0\.148130/);
  assert.match(schema,/2024,'city','southside-place','101-115-03-101-101',0\.340896,null,null/);
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
  assert.ok(Math.abs(0.263594+0.076853-0.340447) < 1e-10);
});

test('large workbook imports run in GitHub Actions Deno CPU budget',()=>{
  assert.match(importer,/TEXAS_TAX_IMPORT_CLI/);
  assert.match(importer,/const runTaxImport=async/);
  assert.match(importer,/Deno\.serve\(runTaxImport\)/);
  assert.match(workflow,/denoland\/setup-deno@v2/);
  assert.match(workflow,/TEXAS_TAX_IMPORT_YEAR="\$year" deno run --node-modules-dir=none -A/);
  assert.doesNotMatch(workflow,/curl --silent --show-error --max-time/);
});

test('2024 additional municipal supplements are sourced, reconciled and source-isolated',()=>{
  const supplement = readFileSync('supabase/migrations/20261021190000_add_2024_verified_city_tax_supplements.sql','utf8');
  assert.match(supplement,/2024,'city','city-of-little-river-academy','014-113-03-014-014'/);
  assert.match(supplement,/0\.410001,0\.410001,0\.000000/);
  assert.match(supplement,/2024,'city','cooper','060-101-03-060-060'/);
  assert.match(supplement,/0\.649272,0\.627046,0\.022226/);
  assert.match(supplement,/2024,'city','miami','197-101-03-197-197'/);
  assert.match(supplement,/0\.870299,null,null/);
  assert.match(supplement,/2024,'city','stafford','079-105-03-079-079'/);
  assert.match(supplement,/0\.000000,null,null/);
  assert.match(supplement,/r\.source_status='not-reported'/);
  assert.match(supplement,/and r\.total_rate is null/);
  assert.match(route,/A zero <strong>city<\/strong> rate does not mean/);
  assert.ok(Math.abs((0.627046 + 0.022226) - 0.649272)<1e-10);
});

test('2025 Culberson CAD and Post Oak Bend local source supplements stay distinct from statewide data',()=>{
  const supplement = readFileSync('supabase/migrations/20261021193000_add_2025_culberson_postoakbend_verified_tax.sql','utf8');
  assert.match(supplement,/2025,'city','van-horn','055-101-03-055-055'/);
  assert.match(supplement,/0\.4921230,null,null/);
  assert.match(supplement,/2025,'county','culberson-county','055-000-00-055-055'/);
  assert.match(supplement,/0\.1330247,null,null/);
  assert.match(supplement,/2025,'city','post-oak-bend','129-110-03-129-129'/);
  assert.match(supplement,/0\.000000,null,null/);
  assert.match(supplement,/source_status='not-reported'/);
  assert.match(supplement,/on conflict \(tax_year,unit_type,slug\) do nothing/);
  assert.match(route,/separately levied local districts/);
});

test('latest local supplement is prominent but never offered as a statewide calculation rate',()=>{
  assert.match(route,/latest\.localVerification\?\.mode === 'supplement'/);
  assert.match(route,/Latest independently verified local rate \(display only\)/);
  assert.match(route,/href=\{latestLocal\.sourceUrl\}/);
  assert.match(route,/latest\.totalRate == null \? 'Not reported \/ withheld from calculation'/);
});

test('type-specific tax-unit search is restricted at source before results are capped',()=>{
  const api = readFileSync('src/routes/api.property-tax-rates.ts','utf8');
  assert.match(server,/searchTaxingUnitsServer\(query: string, year: number, limit = 100, type\?: TexasTaxingUnitType\)/);
  const start=server.indexOf('export async function searchTaxingUnitsServer');
  const end=server.indexOf('export async function getTaxingUnitRateHistoryServer',start);
  const search=server.slice(start,end);
  assert.match(search,/if \(type\) dbQuery = dbQuery\.eq\('type', type\)/);
  assert.ok(search.indexOf("dbQuery.eq('type', type)") < search.indexOf('.limit(Math.max(1, Math.min(100, limit)))'));
  assert.match(api,/searchTaxingUnitsServer\(query, year, 100, searchType\)/);
  assert.match(api,/\['county', 'city', 'school-district', 'special-district'\]\.includes\(type\)/);
});
