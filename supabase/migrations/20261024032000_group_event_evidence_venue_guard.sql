-- Follow-up hardening to the ALREADY APPLIED group_event_evidence_dedup
-- migration. Keep that historical migration immutable in the repository.
-- Prevent a NULL venue identifier from escaping the venue-keyed UNIQUE index.
-- This does not create or modify any historical customer/revenue evidence.
create or replace function public.texasdefined_group_event_require_external_evidence_key()
returns trigger language plpgsql security invoker set search_path = ''
as $$
begin
  if new.venue_slug is null
    or new.venue_slug !~ '^[a-z0-9]+(-[a-z0-9]+)*$' then
    raise exception using errcode='P0001',
      message='A source-verified venue identifier is required for unique outcome evidence';
  end if;
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

-- Existing INSERT trigger retains the same function identity; replacing the
-- body is sufficient and avoids opening an unguarded insertion interval.
