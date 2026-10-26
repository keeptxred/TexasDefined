-- Corporate-event intake protection across concurrent server instances.
-- No IP addresses, device identifiers, cookies, or browser fingerprints are stored.
-- Existing application-layer email checks remain as a user-facing early rejection.
-- This DB guard closes their read-then-insert race and limits distributed junk submissions.
-- Capacity thresholds are conservative initial circuit breakers, not measured venue demand.
-- Raise or lower only after reviewing aggregate traffic and legitimate submission outcomes.

create index if not exists td_group_requests_recent_intake_idx
  on public.texasdefined_group_event_requests (created_at desc);
create index if not exists td_group_partner_recent_intake_idx
  on public.texasdefined_group_event_partner_applications (created_at desc);

create or replace function public.texasdefined_group_event_intake_guard()
returns trigger
language plpgsql
security invoker
set search_path = ''
as $$
declare
  hourly_total integer;
  hourly_for_email integer;
begin
  if tg_op <> 'INSERT' then
    raise exception 'Corporate-event intake guard supports INSERT only';
  end if;
  new.email := lower(btrim(new.email));
  -- One serialization point covers global and per-email windows atomically,
  -- including submissions concurrently routed through different Workers.
  perform pg_catalog.pg_advisory_xact_lock(74019, 5719);

  if tg_table_schema = 'public' and tg_table_name = 'texasdefined_group_event_requests' then
    select count(*) into hourly_total
      from public.texasdefined_group_event_requests
      where created_at >= pg_catalog.now() - interval '1 hour';
    select count(*) into hourly_for_email
      from public.texasdefined_group_event_requests
      where email = new.email and created_at >= pg_catalog.now() - interval '1 hour';
    if hourly_total >= 150 or hourly_for_email >= 3 then
      raise exception using errcode = 'P0001', message = 'Corporate event planner submission rate limit exceeded';
    end if;
  elsif tg_table_schema = 'public' and tg_table_name = 'texasdefined_group_event_partner_applications' then
    select count(*) into hourly_total
      from public.texasdefined_group_event_partner_applications
      where created_at >= pg_catalog.now() - interval '1 hour';
    select count(*) into hourly_for_email
      from public.texasdefined_group_event_partner_applications
      where email = new.email and created_at >= pg_catalog.now() - interval '1 hour';
    if hourly_total >= 60 or hourly_for_email >= 2 then
      raise exception using errcode = 'P0001', message = 'Corporate event partner submission rate limit exceeded';
    end if;
  else
    raise exception 'Corporate-event intake guard attached to an unauthorized table';
  end if;
  return new;
end;
$$;

-- Trigger code is internal; anonymous clients must never call this function.
revoke all on function public.texasdefined_group_event_intake_guard() from public, anon, authenticated;
grant execute on function public.texasdefined_group_event_intake_guard() to service_role;

drop trigger if exists td_group_planner_intake_guard on public.texasdefined_group_event_requests;
create trigger td_group_planner_intake_guard
before insert on public.texasdefined_group_event_requests
for each row execute function public.texasdefined_group_event_intake_guard();

drop trigger if exists td_group_partner_intake_guard on public.texasdefined_group_event_partner_applications;
create trigger td_group_partner_intake_guard
before insert on public.texasdefined_group_event_partner_applications
for each row execute function public.texasdefined_group_event_intake_guard();

comment on function public.texasdefined_group_event_intake_guard() is
  'Internal atomic hourly intake circuit breaker for corporate-event planner and partner forms; never reads or stores IP/device identifiers and grants no public access.';
