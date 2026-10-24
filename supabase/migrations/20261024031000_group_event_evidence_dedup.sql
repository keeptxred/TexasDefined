-- Make staff-recorded historical outcomes reliably idempotent using an
-- independently evidenced provider-specific quote/invoice/receipt/case ID.
-- Historical entries remain intact; the original ledger has no update grant.
-- New inserts require an actual source-document reference; never fabricate
-- synthetic IDs or convert outbound clicks into revenue.
alter table public.texasdefined_group_event_outcome_events
  add column if not exists evidence_key text;

alter table public.texasdefined_group_event_outcome_events
  add constraint td_group_event_evidence_key_format
  check (
    evidence_key is null
    or evidence_key ~ '^[A-Z0-9][A-Z0-9:._-]{5,119}$'
  );

create unique index if not exists td_group_event_source_evidence_once
  on public.texasdefined_group_event_outcome_events
    (venue_slug, outcome_type, upper(evidence_key))
  where evidence_key is not null;

create or replace function public.texasdefined_group_event_require_external_evidence_key()
returns trigger language plpgsql security invoker set search_path = ''
as $$
begin
  if new.evidence_key is null or char_length(btrim(new.evidence_key)) < 6 then
    raise exception using errcode='P0001',
      message='Real provider invoice, quote, settlement or case evidence ID required for corporate event outcome';
  end if;
  new.evidence_key := upper(btrim(new.evidence_key));
  if new.evidence_key !~ '^[A-Z0-9][A-Z0-9:._-]{5,119}$' then
    raise exception using errcode='P0001',
      message='Corporate event evidence ID must be bounded and not contain contact or payment details';
  end if;
  return new;
end;
$$;
revoke all on function public.texasdefined_group_event_require_external_evidence_key() from public, anon, authenticated;
grant execute on function public.texasdefined_group_event_require_external_evidence_key() to service_role;
drop trigger if exists td_group_event_require_external_evidence_key
  on public.texasdefined_group_event_outcome_events;
create trigger td_group_event_require_external_evidence_key
before insert on public.texasdefined_group_event_outcome_events
for each row execute function public.texasdefined_group_event_require_external_evidence_key();

comment on column public.texasdefined_group_event_outcome_events.evidence_key is
  'Private stable provider/case/settlement reference used to reject accidental duplicate quote, booking, receipt or dispute evidence. Never store account/card numbers.';
