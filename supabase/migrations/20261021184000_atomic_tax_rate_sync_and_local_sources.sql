-- Transactional annual tax-rate imports, source provenance and locally verified complements.
-- Normalized Comptroller rows remain distinct from separately evidenced local rates.
create table if not exists public.texas_tax_import_runs (
  id uuid primary key,
  tax_year integer not null check (tax_year between 2021 and 2100),
  source_signature text not null check (length(source_signature) = 64),
  sources jsonb not null,
  expected_count integer not null check (expected_count > 100),
  expected_raw_count integer not null check (expected_raw_count >= expected_count),
  status text not null default 'staging' check (status in ('staging','completed','unchanged')),
  started_at timestamptz not null default now(),
  finished_at timestamptz,
  results jsonb
);
create index if not exists texas_tax_import_runs_year_idx on public.texas_tax_import_runs(tax_year, finished_at desc);

create table if not exists public.texas_tax_import_stage (
  run_id uuid not null references public.texas_tax_import_runs(id) on delete cascade,
  record_id text not null,
  record jsonb not null,
  primary key (run_id, record_id)
);
create table if not exists public.texas_tax_import_raw_stage (
  run_id uuid not null references public.texas_tax_import_runs(id) on delete cascade,
  unit_type text not null,
  ordinal integer not null,
  record jsonb not null,
  primary key (run_id, unit_type, ordinal)
);
create table if not exists public.texas_tax_import_source_rows (
  tax_year integer not null,
  unit_type text not null,
  ordinal integer not null,
  source_signature text not null,
  record jsonb not null,
  imported_at timestamptz not null default now(),
  primary key (tax_year, unit_type, ordinal)
);
comment on table public.texas_tax_import_source_rows is 'Original parsed Comptroller workbook records, before consolidation and local corrections; restricted to service role.';

create table if not exists public.texas_tax_local_verified_rates (
  tax_year integer not null check (tax_year between 2000 and 2100),
  unit_type text not null check (unit_type in ('county','city','school-district','special-district')),
  slug text not null,
  official_unit_id text not null,
  total_rate numeric(12,8) not null,
  maintenance_operations_rate numeric(12,8),
  debt_service_rate numeric(12,8),
  source_url text not null check (source_url ~ '^https://[^ ]+$'),
  component_source_url text check (component_source_url is null or component_source_url ~ '^https://[^ ]+$'),
  source_agency text not null check (length(trim(source_agency)) > 3),
  verified_on date not null,
  evidence_note text not null check (length(trim(evidence_note)) >= 15),
  status text not null default 'verified' check (status in ('verified','under-review','superseded')),
  primary key (tax_year, unit_type, slug),
  constraint texas_tax_local_verified_components_check
    check ((maintenance_operations_rate is null and debt_service_rate is null)
      or (maintenance_operations_rate is not null and debt_service_rate is not null
        and abs(total_rate - maintenance_operations_rate - debt_service_rate) <= 0.000001))
);
comment on table public.texas_tax_local_verified_rates is 'Documented local supplements for display and provenance, never silently merged into Comptroller records or parcel calculators.';

-- Data API security: staging and audit data never readable by anonymous callers.
alter table public.texas_tax_import_runs enable row level security;
alter table public.texas_tax_import_stage enable row level security;
alter table public.texas_tax_import_raw_stage enable row level security;
alter table public.texas_tax_import_source_rows enable row level security;
alter table public.texas_tax_local_verified_rates enable row level security;
revoke all on public.texas_tax_import_runs, public.texas_tax_import_stage,
  public.texas_tax_import_raw_stage, public.texas_tax_import_source_rows,
  public.texas_tax_local_verified_rates from public, anon, authenticated;
grant all on public.texas_tax_import_runs, public.texas_tax_import_stage,
  public.texas_tax_import_raw_stage, public.texas_tax_import_source_rows,
  public.texas_tax_local_verified_rates to service_role;
grant select on public.texas_tax_local_verified_rates to anon, authenticated;
drop policy if exists "Public may read documented verified local supplements" on public.texas_tax_local_verified_rates;
create policy "Public may read documented verified local supplements"
  on public.texas_tax_local_verified_rates for select to anon, authenticated
  using (status = 'verified');

insert into public.texas_tax_local_verified_rates
  (tax_year,unit_type,slug,official_unit_id,total_rate,maintenance_operations_rate,
   debt_service_rate,source_url,component_source_url,source_agency,verified_on,evidence_note,status)
values
  (2024,'city','escobares','214-103-03-214-214',0.340447,0.263594,0.076853,
   'https://starrcad.org/wp-content/uploads/2025/08/2025-ANNUAL-REPORT.pdf',
   'https://starrcad.org/wp-content/uploads/2024/10/2024-tax-rates-2.pdf',
   'Starr Central Appraisal District',date '2026-10-21',
   '2025 annual report p. 16 and official 2024 local M&O/I&S tax-rate document.', 'verified')
on conflict (tax_year,unit_type,slug) do nothing;

-- Additional 2024 locality evidence verified against exact official unit IDs.
-- The statewide not-reported rows remain intact for all three jurisdictions.
insert into public.texas_tax_local_verified_rates
  (tax_year,unit_type,slug,official_unit_id,total_rate,maintenance_operations_rate,
   debt_service_rate,source_url,component_source_url,source_agency,verified_on,evidence_note,status)
values
  (2024,'city','roma','214-101-03-214-214',0.567900,0.499077,0.068823,
   'https://starrcad.org/wp-content/uploads/2024/10/2024-tax-rates-2.pdf',
   'https://starrcad.org/wp-content/uploads/2024/10/2024-tax-rates-2.pdf',
   'Starr Central Appraisal District',date '2026-10-21',
   'Starr CAD 2024 entity-tax-rate list shows City of Roma total, M&O and I&S.', 'verified'),
  (2024,'city','rio-grande-city','214-102-03-214-214',0.521090,0.372960,0.148130,
   'https://starrcad.org/wp-content/uploads/2024/10/2024-tax-rates-2.pdf',
   'https://starrcad.org/wp-content/uploads/2024/10/2024-tax-rates-2.pdf',
   'Starr Central Appraisal District',date '2026-10-21',
   'Starr CAD 2024 entity-tax-rate list identifies City of Rio Grande with rate components.', 'verified'),
  (2024,'city','southside-place','101-115-03-101-101',0.340896,null,null,
   'https://www.southsideplacetx.gov/m/faq?cat=50',null,
   'City of Southside Place',date '2026-10-21',
   'Official city FAQ identifies its adopted 2024 property-tax rate; components not established.', 'verified')
on conflict (tax_year,unit_type,slug) do nothing;

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
comment on function public.finalize_texas_tax_import(uuid,boolean) is 'One PostgreSQL transaction: validate full staging, lock year, replace records and raw source, audit; any failure rolls back.';
