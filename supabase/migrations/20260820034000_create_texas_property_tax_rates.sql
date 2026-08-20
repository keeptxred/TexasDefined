-- TexasDefined statewide property-tax rate platform.
-- Public government data sourced from Texas Comptroller Tax Rates and Levies workbooks.

create table if not exists public.texas_property_tax_rates (
  id text primary key,
  year integer not null check (year between 2000 and 2100),
  type text not null check (type in ('county','city','school-district','special-district')),
  name text not null,
  slug text not null,
  county_slugs text[] not null default '{}',
  total_rate numeric(12,8),
  maintenance_operations_rate numeric(12,8),
  debt_service_rate numeric(12,8),
  levy numeric,
  source_url text not null,
  source_status text not null default 'reported-final',
  variable_rate boolean not null default false,
  rate_variants numeric(12,8)[] not null default '{}',
  official_taxing_unit_ids text[] not null default '{}',
  split_across_cads boolean not null default false,
  rate_unavailable boolean not null default false,
  imported_at timestamptz not null default now(),
  unique (year, type, slug)
);

alter table public.texas_property_tax_rates add column if not exists official_taxing_unit_ids text[] not null default '{}';
alter table public.texas_property_tax_rates add column if not exists split_across_cads boolean not null default false;
alter table public.texas_property_tax_rates add column if not exists rate_unavailable boolean not null default false;

alter table public.texas_property_tax_rates drop constraint if exists texas_property_tax_rates_source_status_check;
alter table public.texas_property_tax_rates
  add constraint texas_property_tax_rates_source_status_check
  check (source_status in ('reported-final','partial-reporting','not-reported','cross-source-conflict')) not valid;
alter table public.texas_property_tax_rates validate constraint texas_property_tax_rates_source_status_check;

create index if not exists texas_property_tax_rates_year_type_idx on public.texas_property_tax_rates(year, type);
create index if not exists texas_property_tax_rates_slug_idx on public.texas_property_tax_rates(slug);
create index if not exists texas_property_tax_rates_counties_gin_idx on public.texas_property_tax_rates using gin(county_slugs);

alter table public.texas_property_tax_rates enable row level security;

revoke insert, update, delete, truncate, references, trigger on table public.texas_property_tax_rates from anon, authenticated;
grant select on table public.texas_property_tax_rates to anon, authenticated;
grant all on table public.texas_property_tax_rates to service_role;

drop policy if exists "Public can read Texas property tax rates" on public.texas_property_tax_rates;
create policy "Public can read Texas property tax rates"
on public.texas_property_tax_rates
for select
to anon, authenticated
using (true);

comment on table public.texas_property_tax_rates is
  'Texas local taxing-unit rates imported from Texas Comptroller annual Tax Rates and Levies workbooks. Public read only; writes require service role.';
comment on column public.texas_property_tax_rates.rate_unavailable is
  'True when a source marks the rate as not reported or a separate authoritative state-source conflict requires local verification before calculation.';
