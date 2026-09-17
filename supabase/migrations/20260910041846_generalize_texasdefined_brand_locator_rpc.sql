alter table public.texasdefined_brand_locations
  add column if not exists public_locator_enabled boolean not null default false;

update public.texasdefined_brand_locations
set public_locator_enabled = true
where brand_slug = 'bucees'
  and state = 'TX'
  and status = 'active';

comment on column public.texasdefined_brand_locations.public_locator_enabled is
  'Explicit opt-in for public nearest-location RPC results. Registry rows remain private by default.';

create index if not exists texasdefined_brand_locations_public_locator_idx
  on public.texasdefined_brand_locations (brand_slug, status, state)
  where public_locator_enabled = true;

create or replace function public.texasdefined_nearest_brand_locations(
  p_brand_slug text,
  p_latitude double precision,
  p_longitude double precision
)
returns table (
  id text,
  brand_slug text,
  name text,
  street text,
  city text,
  postal_code text,
  latitude double precision,
  longitude double precision,
  source_url text,
  distance_miles double precision
)
language sql
stable
security definer
set search_path = pg_catalog, public
as $$
  select
    l.id,
    l.brand_slug,
    l.name,
    l.street,
    l.city,
    l.postal_code,
    l.latitude,
    l.longitude,
    l.source_url,
    3958.7613 * 2 * asin(
      sqrt(
        least(
          1::double precision,
          power(sin(radians(l.latitude - p_latitude) / 2), 2)
          + cos(radians(p_latitude))
          * cos(radians(l.latitude))
          * power(sin(radians(l.longitude - p_longitude) / 2), 2)
        )
      )
    ) as distance_miles
  from public.texasdefined_brand_locations as l
  where l.brand_slug = p_brand_slug
    and l.public_locator_enabled = true
    and l.status = 'active'
    and l.state = 'TX'
    and l.latitude is not null
    and l.longitude is not null
    and p_brand_slug is not null
    and length(p_brand_slug) between 1 and 80
    and p_latitude between -90 and 90
    and p_longitude between -180 and 180
  order by distance_miles asc, l.id asc
  limit 5;
$$;

revoke all on function public.texasdefined_nearest_brand_locations(text, double precision, double precision) from public;
revoke all on function public.texasdefined_nearest_brand_locations(text, double precision, double precision) from anon, authenticated;
grant execute on function public.texasdefined_nearest_brand_locations(text, double precision, double precision) to anon, authenticated;

comment on function public.texasdefined_nearest_brand_locations(text, double precision, double precision) is
  'Returns at most five nearest active Texas locations for an explicitly public-locator-enabled brand. Read-only; the underlying registry remains RLS-protected.';

create or replace function public.texasdefined_nearest_bucees(
  p_latitude double precision,
  p_longitude double precision
)
returns table (
  id text,
  name text,
  street text,
  city text,
  postal_code text,
  latitude double precision,
  longitude double precision,
  source_url text,
  distance_miles double precision
)
language sql
stable
security definer
set search_path = pg_catalog, public
as $$
  select
    nearest.id,
    nearest.name,
    nearest.street,
    nearest.city,
    nearest.postal_code,
    nearest.latitude,
    nearest.longitude,
    nearest.source_url,
    nearest.distance_miles
  from public.texasdefined_nearest_brand_locations('bucees', p_latitude, p_longitude) as nearest;
$$;

revoke all on function public.texasdefined_nearest_bucees(double precision, double precision) from public;
revoke all on function public.texasdefined_nearest_bucees(double precision, double precision) from anon, authenticated;
grant execute on function public.texasdefined_nearest_bucees(double precision, double precision) to anon, authenticated;

comment on function public.texasdefined_nearest_bucees(double precision, double precision) is
  'Compatibility wrapper for the generic public TexasDefined nearest-brand-location RPC. Returns at most five nearest active Texas Buc-ee''s locations.';
