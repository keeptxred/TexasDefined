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
    l.id,
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
  where l.brand_slug = 'bucees'
    and l.status = 'active'
    and l.state = 'TX'
    and l.latitude is not null
    and l.longitude is not null
    and p_latitude between -90 and 90
    and p_longitude between -180 and 180
  order by distance_miles asc, l.id asc
  limit 5;
$$;

revoke all on function public.texasdefined_nearest_bucees(double precision, double precision) from public;
grant execute on function public.texasdefined_nearest_bucees(double precision, double precision) to anon, authenticated;

comment on function public.texasdefined_nearest_bucees(double precision, double precision) is
  'Returns at most five nearest active Texas Buc-ee''s locations from the protected TexasDefined registry. Read-only public reference data; the underlying table remains RLS-protected.';
