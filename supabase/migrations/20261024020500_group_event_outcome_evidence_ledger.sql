-- Corporate event operations evidence ledger; private and append-only.
-- Records authenticated staff confirmations of REAL outcomes, not predictions,
-- click conversions, constructed reservations, charges, or automatically sent mail.
create table if not exists public.texasdefined_group_event_outcome_events (
  id uuid primary key default gen_random_uuid(),
  planner_request_id uuid not null references public.texasdefined_group_event_requests(id),
  venue_slug text,
  outcome_type text not null check (
    outcome_type in ('quote_requested','quote_received','referral_sent','booking_confirmed',
      'booking_cancelled','dispute_opened','dispute_resolved','revenue_verified')
  ),
  occurred_at timestamptz not null,
  recorded_at timestamptz not null default now(),
  recorded_by text not null check (char_length(btrim(recorded_by)) between 2 and 120),
  evidence_reference text not null check (char_length(btrim(evidence_reference)) between 20 and 500),
  amount_cents bigint,
  currency text not null default 'USD' check (currency = 'USD'),
  check (venue_slug is null or venue_slug ~ '^[a-z0-9-]+$'),
  check (
    (outcome_type = 'revenue_verified' and amount_cents between 1 and 1000000000)
    or (outcome_type <> 'revenue_verified' and amount_cents is null)
  ),
  unique (planner_request_id, outcome_type, evidence_reference)
);

comment on table public.texasdefined_group_event_outcome_events is
  'Private staff-attested historical events; no outreach, booking, payment or contract is made here. Quote and referral actions require prior organizer consent and verified agreement before recording. Revenue requires independently reconciled actual received funds, not clicks, quotes or advertised commissions.';

create index if not exists td_group_event_outcome_recent_idx
  on public.texasdefined_group_event_outcome_events(recorded_at desc);
create index if not exists td_group_event_outcome_lead_idx
  on public.texasdefined_group_event_outcome_events(planner_request_id, occurred_at desc);
create index if not exists td_group_event_outcome_type_idx
  on public.texasdefined_group_event_outcome_events(outcome_type, occurred_at desc);

alter table public.texasdefined_group_event_outcome_events enable row level security;
revoke all on public.texasdefined_group_event_outcome_events from public, anon, authenticated;
grant select, insert on public.texasdefined_group_event_outcome_events to service_role;
-- Audit history is intentionally immutable from the dashboard; superseding
-- outcomes are recorded as a new event, not an overwritten historical claim.
revoke update, delete, truncate on public.texasdefined_group_event_outcome_events from service_role;
