-- Safe integration test AFTER at least one successful post-migration year import.
-- Run through an authorized server-side SQL connection. Its outer transaction always rolls back.
-- Confirms a failure after DELETE does not change previously published year records.
begin;
do $$
declare
  target_year integer := 2025;
  run_id uuid := gen_random_uuid();
  original_count integer;
  original_checksum text;
  source_count integer;
  resulting_count integer;
  resulting_checksum text;
  expected_message text := 'Simulated import failure after delete: verifying transaction rollback';
begin
  select count(*) into original_count from public.texas_property_tax_rates where year=target_year;
  select md5(coalesce(string_agg(id||':'||coalesce(total_rate::text,'NULL'),',' order by id),''))
    into original_checksum from public.texas_property_tax_rates where year=target_year;
  select count(*) into source_count from public.texas_tax_import_source_rows where tax_year=target_year;
  if original_count<4000 or source_count<4000 then
    raise exception 'Integration fixture unavailable: first complete importer must run successfully';
  end if;
  insert into public.texas_tax_import_runs
    (id,tax_year,source_signature,sources,expected_count,expected_raw_count)
  values (run_id,target_year,repeat('f',64),'[]'::jsonb,original_count,source_count);
  insert into public.texas_tax_import_stage(run_id,record_id,record)
    select run_id,id,to_jsonb(r) from public.texas_property_tax_rates r where year=target_year;
  insert into public.texas_tax_import_raw_stage(run_id,unit_type,ordinal,record)
    select run_id,unit_type,ordinal,record from public.texas_tax_import_source_rows where tax_year=target_year;
  begin
    perform public.finalize_texas_tax_import(run_id,true);
    raise exception 'Finalizer unexpectedly committed simulated failure';
  exception when others then
    if sqlerrm <> expected_message then raise; end if;
  end;
  select count(*) into resulting_count from public.texas_property_tax_rates where year=target_year;
  select md5(coalesce(string_agg(id||':'||coalesce(total_rate::text,'NULL'),',' order by id),''))
    into resulting_checksum from public.texas_property_tax_rates where year=target_year;
  if resulting_count<>original_count or resulting_checksum<>original_checksum then
    raise exception 'ROLLBACK FAILED: published rows changed after induced error';
  end if;
  raise notice 'PASS: % published % rows and total-rate checksum preserved after induced failure',
    target_year,original_count;
end;
$$;
rollback;
