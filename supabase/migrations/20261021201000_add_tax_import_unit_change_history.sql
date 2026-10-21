-- Materialized per-taxing-unit change log for future official source revisions.
-- Do not rewrite or backfill the previous 2022 changed row without its original snapshot.
create table if not exists public.texas_tax_import_changes (
  run_id uuid not null references public.texas_tax_import_runs(id) on delete cascade,
  record_id text not null,
  change_kind text not null check (change_kind in ('added','removed','modified')),
  previous_record jsonb,
  next_record jsonb,
  recorded_at timestamptz not null default now(),
  primary key (run_id,record_id),
  constraint texas_tax_change_state_check check (
    (change_kind='added' and previous_record is null and next_record is not null)
    or (change_kind='removed' and previous_record is not null and next_record is null)
    or (change_kind='modified' and previous_record is not null and next_record is not null)
  )
);
create index if not exists texas_tax_import_changes_record_idx
  on public.texas_tax_import_changes(record_id,recorded_at desc);
alter table public.texas_tax_import_changes enable row level security;
revoke all on public.texas_tax_import_changes from public,anon,authenticated;
grant all on public.texas_tax_import_changes to service_role;
comment on table public.texas_tax_import_changes is
  'Per-normalized taxing-unit change history preserving previous and replacement source-qualified rows, service role only.';

create or replace function public.finalize_texas_tax_import(p_run_id uuid, p_simulate_failure boolean default false)
returns jsonb
language plpgsql
security invoker
set search_path = ''
as $$
declare
  run_data public.texas_tax_import_runs%rowtype;
  stage_count integer;
  raw_count integer;
  prior_count integer;
  prior_run public.texas_tax_import_runs%rowtype;
  previous_rows jsonb;
  summary jsonb;
  added_count integer;
  removed_count integer;
  modified_count integer;
  newly_unavailable integer;
  newly_available integer;
  unavailable_count integer;
begin
  select * into run_data from public.texas_tax_import_runs where id=p_run_id for update;
  if not found or run_data.status <> 'staging' then
    raise exception 'Unknown or non-staging tax import run';
  end if;
  perform pg_catalog.pg_advisory_xact_lock(720251,run_data.tax_year);
  select count(*) into stage_count from public.texas_tax_import_stage where run_id=p_run_id;
  select count(*) into raw_count from public.texas_tax_import_raw_stage where run_id=p_run_id;
  if stage_count <> run_data.expected_count or raw_count <> run_data.expected_raw_count then
    raise exception 'Incomplete staging: expected % normalized/% raw, got % normalized/% raw',
      run_data.expected_count,run_data.expected_raw_count,stage_count,raw_count;
  end if;
  if (select count(distinct unit_type) from public.texas_tax_import_raw_stage where run_id=p_run_id) <> 4 then
    raise exception 'Not all four Comptroller workbooks have staged records';
  end if;
  if exists (
    select 1 from public.texas_tax_import_stage
    where run_id=p_run_id and (
      (record->>'year')::integer <> run_data.tax_year
      or record->>'id' <> record_id
      or coalesce(record->>'slug','')=''
      or coalesce(record->>'name','')=''
      or coalesce(record->>'type','') not in ('county','city','school-district','special-district')
      or coalesce(record->>'source_url','') not like 'https://%'
      or (
        record->>'total_rate' is not null and
        record->>'maintenance_operations_rate' is not null and
        record->>'debt_service_rate' is not null and
        abs((record->>'total_rate')::numeric -
            (record->>'maintenance_operations_rate')::numeric -
            (record->>'debt_service_rate')::numeric) > 0.000001
      )
    )
  ) then
    raise exception 'Staged tax records failed identity, year, source, or component validation';
  end if;
  select count(*) into prior_count from public.texas_property_tax_rates where year=run_data.tax_year;
  if prior_count>0 and stage_count < greatest(100,ceil(prior_count*0.90)::integer) then
    raise exception 'Refusing incomplete tax year: % staged versus % published',stage_count,prior_count;
  end if;
  select * into prior_run from public.texas_tax_import_runs
    where tax_year=run_data.tax_year and status='completed'
    order by finished_at desc limit 1;
  if prior_run.id is not null then
    if prior_run.finished_at > run_data.started_at and prior_run.source_signature <> run_data.source_signature then
      raise exception 'A newer import completed since this import began; refuse stale replacement';
    end if;
    if prior_run.source_signature = run_data.source_signature and prior_count = stage_count then
      update public.texas_tax_import_runs
        set status='unchanged',finished_at=now(),results=jsonb_build_object('status','unchanged','year',run_data.tax_year,'count',prior_count)
        where id=p_run_id;
      delete from public.texas_tax_import_stage where run_id=p_run_id;
      delete from public.texas_tax_import_raw_stage where run_id=p_run_id;
      return jsonb_build_object('status','unchanged','year',run_data.tax_year,'count',prior_count);
    end if;
  end if;
  select coalesce(jsonb_object_agg(id,jsonb_build_object(
     'total',total_rate,'mo',maintenance_operations_rate,'debt',debt_service_rate,
     'source',source_status,'unavailable',rate_unavailable)), '{}'::jsonb)
    into previous_rows from public.texas_property_tax_rates where year=run_data.tax_year;
  select count(*) into added_count from public.texas_tax_import_stage s
    where s.run_id=p_run_id and not previous_rows ? s.record_id;
  select count(*) into removed_count from jsonb_object_keys(previous_rows) old_id
    where not exists (select 1 from public.texas_tax_import_stage s where s.run_id=p_run_id and s.record_id=old_id);
  select count(*) into modified_count from public.texas_tax_import_stage s
    where s.run_id=p_run_id and previous_rows ? s.record_id
      and previous_rows->s.record_id is distinct from jsonb_build_object(
        'total',(s.record->>'total_rate')::numeric,
        'mo',(s.record->>'maintenance_operations_rate')::numeric,
        'debt',(s.record->>'debt_service_rate')::numeric,
        'source',s.record->>'source_status',
        'unavailable',(s.record->>'rate_unavailable')::boolean);
  select count(*) into newly_unavailable from public.texas_tax_import_stage s
    where s.run_id=p_run_id and (s.record->>'rate_unavailable')::boolean
      and coalesce((previous_rows->s.record_id->>'unavailable')::boolean,false)=false;
  select count(*) into newly_available from public.texas_tax_import_stage s
    where s.run_id=p_run_id and coalesce((s.record->>'rate_unavailable')::boolean,false)=false
      and coalesce((previous_rows->s.record_id->>'unavailable')::boolean,false)=true;
  select count(*) into unavailable_count from public.texas_tax_import_stage s
    where s.run_id=p_run_id and (s.record->>'rate_unavailable')::boolean;
  -- Audit complete material row changes, not only changes to displayed rates.
  -- Keep original imported_at in the snapshots for exact recovery, but
  -- ignore imported_at for deciding whether any substantive value changed.
  insert into public.texas_tax_import_changes
    (run_id,record_id,change_kind,previous_record,next_record)
  select run_data.id,coalesce(o.id,n.record_id),
    case when o.id is null then 'added'
         when n.record_id is null then 'removed' else 'modified' end,
    o.old_full,n.new_full
  from (
    select r.id,to_jsonb(r) as old_full,
      to_jsonb(r)-'imported_at' as old_compared
    from public.texas_property_tax_rates r
    where r.year=run_data.tax_year
  ) o
  full outer join (
    select s.record_id,s.record as new_full,
      s.record-'imported_at' as new_compared
    from public.texas_tax_import_stage s
    where s.run_id=p_run_id
  ) n on n.record_id=o.id
  where o.old_compared is distinct from n.new_compared;

  select count(*) filter (where change_kind='added'),
         count(*) filter (where change_kind='removed'),
         count(*) filter (where change_kind='modified')
    into added_count,removed_count,modified_count
  from public.texas_tax_import_changes where run_id=p_run_id;

  delete from public.texas_property_tax_rates where year=run_data.tax_year;
  if p_simulate_failure then
    raise exception 'Simulated import failure after delete: verifying transaction rollback';
  end if;
  insert into public.texas_property_tax_rates
    select (jsonb_populate_record(null::public.texas_property_tax_rates,s.record)).*
    from public.texas_tax_import_stage s where s.run_id=p_run_id;
  if (select count(*) from public.texas_property_tax_rates where year=run_data.tax_year) <> stage_count then
    raise exception 'Post-replacement count mismatch';
  end if;
  delete from public.texas_tax_import_source_rows where tax_year=run_data.tax_year;
  insert into public.texas_tax_import_source_rows(tax_year,unit_type,ordinal,source_signature,record)
    select run_data.tax_year,unit_type,ordinal,run_data.source_signature,record
    from public.texas_tax_import_raw_stage where run_id=p_run_id;
  summary:=jsonb_build_object('status','imported','year',run_data.tax_year,
      'count',stage_count,'rawCount',raw_count,'previousCount',prior_count,
      'added',added_count,'removed',removed_count,'modified',modified_count,
      'unavailable',unavailable_count,'becameUnavailable',newly_unavailable,'becameAvailable',newly_available);
  update public.texas_tax_import_runs
    set status='completed',finished_at=now(),results=summary where id=p_run_id;
  delete from public.texas_tax_import_stage where run_id=p_run_id;
  delete from public.texas_tax_import_raw_stage where run_id=p_run_id;
  return summary;
end;
$$;
revoke all on function public.finalize_texas_tax_import(uuid,boolean) from public,anon,authenticated;
grant execute on function public.finalize_texas_tax_import(uuid,boolean) to service_role;
