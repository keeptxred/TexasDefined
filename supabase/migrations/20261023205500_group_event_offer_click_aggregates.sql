-- Only anonymous aggregate outbound partner-offer click totals are retained.
-- No IP address, user agent, contact details, cookie, browser token, or session IDs.
create table if not exists public.texasdefined_group_event_offer_click_totals (
  offer_id uuid not null references public.texasdefined_group_event_offers(id) on delete cascade,
  clicked_on date not null,
  clicks integer not null default 0 check (clicks >= 0 and clicks <= 1000000),
  primary key (offer_id, clicked_on)
);
comment on table public.texasdefined_group_event_offer_click_totals is
  'Daily directional outbound-link activations for vetted partner offers. Not unique visitors, reservations, conversions, commissions or revenue.';
alter table public.texasdefined_group_event_offer_click_totals enable row level security;
revoke all on table public.texasdefined_group_event_offer_click_totals from anon, authenticated;
grant select, insert, update on table public.texasdefined_group_event_offer_click_totals to service_role;

-- Atomic concurrent-safe increment. API roles cannot execute this function;
-- only the service-role server code can request a write.
create or replace function public.td_record_corporate_event_offer_click(p_offer_id uuid)
returns void
language plpgsql
security invoker
set search_path = ''
as $$
declare
  texas_day date := (now() at time zone 'America/Chicago')::date;
begin
  -- Enforce active, explicitly approved offer + approved business in the DB
  -- as a second guard beneath the application server's directory/domain check.
  if not exists (
    select 1 from public.texasdefined_group_event_offers o
    join public.texasdefined_group_event_partner_applications p
      on p.id = o.partner_application_id
    where o.id = p_offer_id
      and o.status = 'approved'
      and o.reviewed_at is not null
      and p.status = 'approved'
      and o.starts_on <= texas_day and o.ends_on >= texas_day
  ) then
    raise exception 'Not an active approved corporate event offer';
  end if;

  insert into public.texasdefined_group_event_offer_click_totals (offer_id, clicked_on, clicks)
  values (p_offer_id, texas_day, 1)
  on conflict (offer_id, clicked_on)
  do update set clicks = least(public.texasdefined_group_event_offer_click_totals.clicks + 1, 1000000);
end;
$$;
revoke execute on function public.td_record_corporate_event_offer_click(uuid) from public, anon, authenticated;
grant execute on function public.td_record_corporate_event_offer_click(uuid) to service_role;
comment on function public.td_record_corporate_event_offer_click(uuid) is
  'Service-role-only increment of non-identifying daily outbound partner offer clicks. No identity data. Does not prove conversion.';
