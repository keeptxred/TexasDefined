-- Operator-recorded first contact, not a delivery receipt or booking evidence.
-- Existing planner rows remain untouched and NULL until an authorized staff
-- member explicitly confirms that actual outreach occurred.
alter table public.texasdefined_group_event_requests
  add column if not exists first_contacted_at timestamptz;
comment on column public.texasdefined_group_event_requests.first_contacted_at is
  'Recorded when staff first marks the planner actually contacted. No email is sent and no delivery is inferred.';
-- Preserve existing private RLS and service-role-only access exactly as-is.
