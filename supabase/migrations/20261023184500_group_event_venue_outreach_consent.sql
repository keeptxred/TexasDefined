-- Optional, separately captured consent to share a planner's inquiry with
-- the specific business venues they shortlisted. This migration does NOT
-- create any notification job or automatically send customer data.
alter table public.texasdefined_group_event_requests
  add column if not exists allow_provider_outreach boolean not null default false;
alter table public.texasdefined_group_event_requests
  add column if not exists provider_outreach_consented_at timestamptz;
do $$
begin
  if not exists (
    select 1 from pg_constraint where conname = 'td_group_event_provider_outreach_consent_consistent'
      and conrelid = 'public.texasdefined_group_event_requests'::regclass
  ) then
    alter table public.texasdefined_group_event_requests
      add constraint td_group_event_provider_outreach_consent_consistent
      check (
        (allow_provider_outreach = false and provider_outreach_consented_at is null)
        or
        (allow_provider_outreach = true and provider_outreach_consented_at is not null
          and cardinality(provider_slugs) > 0)
      );
  end if;
end $$;
comment on column public.texasdefined_group_event_requests.allow_provider_outreach is
  'Separate opt-in for TD staff to consider manually sharing request details only with the planner-selected verified venues. No automatic forwarding or bookings.';
comment on column public.texasdefined_group_event_requests.provider_outreach_consented_at is
  'Server-generated UTC timestamp for explicit, optional sharing consent; NULL without opt-in.';
