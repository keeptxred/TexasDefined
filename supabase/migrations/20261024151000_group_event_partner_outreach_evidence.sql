-- Read-only-for-public, append-only-for-staff evidence of actual communications
-- with venue business representatives. This never sends email, quotes or bookings.
-- No partner identity, approval or agreement is established by a log row.
create table if not exists public.texasdefined_group_event_partner_outreach (
  id uuid primary key default gen_random_uuid(),
  provider_slug text not null
    check (provider_slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$' and char_length(provider_slug) <= 100),
  contact_kind text not null
    check (contact_kind in ('initial_contact', 'partner_reply', 'meeting_held', 'package_received', 'declined')),
  occurred_at timestamptz not null,
  evidence_key text not null
    check (evidence_key ~ '^[A-Z0-9][A-Z0-9:._-]{5,119}$'),
  evidence_reference text not null
    check (char_length(btrim(evidence_reference)) between 20 and 500),
  followup_on date null,
  recorded_at timestamptz not null default now(),
  recorded_by text not null default 'TexasDefined authorized corporate event operations',
  constraint td_group_partner_outreach_no_future_events
    check (occurred_at <= recorded_at + interval '1 minute'),
  constraint td_group_partner_outreach_followup_after_event
    check (followup_on is null or followup_on >= (occurred_at at time zone 'America/Chicago')::date)
);
create unique index if not exists td_group_partner_outreach_external_event_once
  on public.texasdefined_group_event_partner_outreach(provider_slug, upper(btrim(evidence_key)));
create index if not exists td_group_partner_outreach_recent
  on public.texasdefined_group_event_partner_outreach(recorded_at desc);
create index if not exists td_group_partner_outreach_followup
  on public.texasdefined_group_event_partner_outreach(followup_on)
  where followup_on is not null;

alter table public.texasdefined_group_event_partner_outreach enable row level security;
revoke all on table public.texasdefined_group_event_partner_outreach from public, anon, authenticated;
grant select, insert on table public.texasdefined_group_event_partner_outreach to service_role;
revoke update, delete, truncate on table public.texasdefined_group_event_partner_outreach from service_role;

comment on table public.texasdefined_group_event_partner_outreach is
 'Private, append-only human-attested records of actual external venue communications. Not a marketing campaign, signed partner approval, planner contact, customer booking or verified revenue.';
comment on column public.texasdefined_group_event_partner_outreach.evidence_key is
 'Unique genuine external message, call-log, calendar or provider document identifier. Never guess this identifier.';
comment on column public.texasdefined_group_event_partner_outreach.evidence_reference is
 'Brief non-PII location of external communication evidence, never copied message bodies, emails or personal contact details.';
