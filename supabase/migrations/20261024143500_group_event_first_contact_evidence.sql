-- Real planner first-contact evidence is private operational proof, not an
-- email receipt or a booking event. No automatic email is sent by this change.
-- Reuse existing RLS on the planner requests table; no new public grants.
alter table public.texasdefined_group_event_requests
  add column if not exists first_contact_evidence_reference text;

-- The existing 0 planner rows at initial verification make this versioned
-- constraint non-destructive. If legacy contact rows exist at deployment
-- time, stop and reconcile those real records first instead of backfilling
-- invented delivery evidence.
alter table public.texasdefined_group_event_requests
  add constraint td_group_event_contact_evidence_required
  check (
    (first_contacted_at is null and first_contact_evidence_reference is null)
    or
    (first_contacted_at is not null
      and char_length(btrim(coalesce(first_contact_evidence_reference,''))) between 20 and 500)
  );

comment on column public.texasdefined_group_event_requests.first_contact_evidence_reference is
  'Private staff-recorded external contact event identifier/channel and verification context. Never store message bodies, customer secrets, or an unverified delivery claim.';
