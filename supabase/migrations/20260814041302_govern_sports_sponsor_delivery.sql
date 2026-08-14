create unique index if not exists texasdefined_sports_sponsor_one_approved_surface_idx
  on public.texasdefined_sports_sponsor_placements(surface_path)
  where status = 'approved';

create or replace function public.record_texasdefined_sports_sponsor_metric(
  p_placement_id uuid,
  p_event text
)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  v_active boolean;
begin
  if p_event not in ('impression', 'click') then
    return false;
  end if;

  select exists (
    select 1
    from public.texasdefined_sports_sponsor_placements p
    join public.texasdefined_sports_sponsors s on s.id = p.sponsor_id
    where p.id = p_placement_id
      and p.status = 'approved'
      and p.approved_at is not null
      and s.status = 'approved'
      and (p.starts_at is null or p.starts_at <= now())
      and (p.ends_at is null or p.ends_at > now())
  ) into v_active;

  if not v_active then
    return false;
  end if;

  insert into public.texasdefined_sports_sponsor_daily_metrics (
    placement_id,
    metric_date,
    impressions,
    clicks,
    updated_at
  ) values (
    p_placement_id,
    current_date,
    case when p_event = 'impression' then 1 else 0 end,
    case when p_event = 'click' then 1 else 0 end,
    now()
  )
  on conflict (placement_id, metric_date)
  do update set
    impressions = public.texasdefined_sports_sponsor_daily_metrics.impressions + excluded.impressions,
    clicks = public.texasdefined_sports_sponsor_daily_metrics.clicks + excluded.clicks,
    updated_at = now();

  return true;
end;
$$;

revoke all on function public.record_texasdefined_sports_sponsor_metric(uuid, text) from public, anon, authenticated;
grant execute on function public.record_texasdefined_sports_sponsor_metric(uuid, text) to service_role;

comment on function public.record_texasdefined_sports_sponsor_metric(uuid, text) is 'Service-role-only aggregate metric recorder. Verifies placement and sponsor approval/current schedule before incrementing; stores no visitor identifiers.';
