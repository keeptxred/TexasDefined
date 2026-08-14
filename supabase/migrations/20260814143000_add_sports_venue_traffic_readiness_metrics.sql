create table if not exists public.texasdefined_sports_venue_daily_traffic (
  metric_date date not null default current_date,
  surface_path text not null check (surface_path ~ '^/sports-venue/[a-z0-9-]+$'),
  pageviews bigint not null default 0 check (pageviews >= 0),
  primary key (metric_date, surface_path)
);

alter table public.texasdefined_sports_venue_daily_traffic enable row level security;
revoke all on table public.texasdefined_sports_venue_daily_traffic from anon, authenticated;
grant select, insert, update on table public.texasdefined_sports_venue_daily_traffic to service_role;

create or replace function public.record_texasdefined_sports_venue_pageview(p_surface_path text)
returns boolean
language plpgsql
security invoker
set search_path = ''
as $$
begin
  if p_surface_path is null or p_surface_path !~ '^/sports-venue/[a-z0-9-]+$' then
    return false;
  end if;

  insert into public.texasdefined_sports_venue_daily_traffic(metric_date, surface_path, pageviews)
  values (current_date, p_surface_path, 1)
  on conflict (metric_date, surface_path)
  do update set pageviews = public.texasdefined_sports_venue_daily_traffic.pageviews + 1;

  return true;
end;
$$;

revoke all on function public.record_texasdefined_sports_venue_pageview(text) from public, anon, authenticated;
grant execute on function public.record_texasdefined_sports_venue_pageview(text) to service_role;

comment on table public.texasdefined_sports_venue_daily_traffic is 'Privacy-light aggregate sports venue guide pageviews. Stores only date, canonical venue path and count; no visitor identifiers.';
