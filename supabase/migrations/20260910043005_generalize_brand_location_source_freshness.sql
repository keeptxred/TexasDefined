create or replace function public.touch_brand_location_source_checked(
  p_brand_slug text,
  p_checked_at date default current_date
)
returns integer
language plpgsql
security definer
set search_path = pg_catalog, public
as $$
declare
  touched_count integer;
begin
  if p_brand_slug is null or p_brand_slug !~ '^[a-z0-9][a-z0-9-]{0,79}$' then
    raise exception 'p_brand_slug must be a valid registered brand slug';
  end if;

  if p_checked_at is null then
    raise exception 'p_checked_at is required';
  end if;

  if p_checked_at > current_date then
    raise exception 'p_checked_at cannot be in the future';
  end if;

  update public.texasdefined_brand_locations
  set source_checked_at = greatest(source_checked_at, p_checked_at),
      updated_at = now()
  where brand_slug = p_brand_slug
    and public_locator_enabled = true
    and state = 'TX'
    and status = 'active';

  get diagnostics touched_count = row_count;

  if touched_count = 0 then
    raise exception 'no public active Texas locations were available to mark checked for brand %', p_brand_slug;
  end if;

  return touched_count;
end;
$$;

revoke all on function public.touch_brand_location_source_checked(text, date) from public, anon, authenticated;
grant execute on function public.touch_brand_location_source_checked(text, date) to service_role;

comment on function public.touch_brand_location_source_checked(text, date) is
  'Service-role-only freshness marker for explicitly public, active Texas verified-brand location rows.';

create or replace function public.touch_bucees_source_checked(p_checked_at date default current_date)
returns integer
language sql
security definer
set search_path = pg_catalog, public
as $$
  select public.touch_brand_location_source_checked('bucees', p_checked_at);
$$;

revoke all on function public.touch_bucees_source_checked(date) from public, anon, authenticated;
grant execute on function public.touch_bucees_source_checked(date) to service_role;

comment on function public.touch_bucees_source_checked(date) is
  'Compatibility wrapper around touch_brand_location_source_checked for Buc-ee''s.';
