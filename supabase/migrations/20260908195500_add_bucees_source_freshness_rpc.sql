create or replace function public.touch_bucees_source_checked(p_checked_at date default current_date)
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
  touched_count integer;
begin
  if p_checked_at is null then
    raise exception 'p_checked_at is required';
  end if;

  if p_checked_at > current_date then
    raise exception 'p_checked_at cannot be in the future';
  end if;

  update public.texasdefined_brand_locations
  set source_checked_at = greatest(source_checked_at, p_checked_at),
      updated_at = now()
  where brand_slug = 'bucees'
    and state = 'TX'
    and status = 'active';

  get diagnostics touched_count = row_count;

  if touched_count = 0 then
    raise exception 'no active Texas Buc-ee''s locations were available to mark checked';
  end if;

  return touched_count;
end;
$$;

revoke all on function public.touch_bucees_source_checked(date) from public, anon, authenticated;
grant execute on function public.touch_bucees_source_checked(date) to service_role;
