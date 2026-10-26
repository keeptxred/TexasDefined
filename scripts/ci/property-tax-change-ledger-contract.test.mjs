import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const sql=readFileSync('supabase/migrations/20261021201000_add_tax_import_unit_change_history.sql','utf8');
test('audit table remains private to service-role data flows',()=>{
  assert.match(sql,/create table if not exists public\.texas_tax_import_changes/);
  assert.match(sql,/enable row level security/);
  assert.match(sql,/revoke all on public\.texas_tax_import_changes from public,anon,authenticated/);
  assert.match(sql,/grant all on public\.texas_tax_import_changes to service_role/);
});
test('stage is normalized to published schema before substantive comparison',()=>{
  assert.match(sql,/to_jsonb\(r\)-'imported_at' as old_compared/);
  assert.match(sql,/jsonb_populate_record\(null::public\.texas_property_tax_rates,s\.record\)/);
  assert.match(sql,/where o\.old_compared is distinct from n\.new_compared/);
  assert.match(sql,/o\.old_full,n\.new_full/);
});
test('audit insert and published replacement stay in one transaction',()=>{
  assert.match(sql,/insert into public\.texas_tax_import_changes[\s\S]*delete from public\.texas_property_tax_rates/);
  assert.match(sql,/p_simulate_failure then[\s\S]*raise exception/);
  assert.match(sql,/insert into public\.texas_property_tax_rates/);
  assert.match(sql,/count\(\*\) filter \(where change_kind='modified'\)/);
  assert.match(sql,/grant execute on function public\.finalize_texas_tax_import\(uuid,boolean\) to service_role/);
});
