-- Commercial claims must never be enabled by identity verification alone.
-- Only staff with separately verified, real signed terms may mark agreement metadata.
-- Contract documents and planner personal information remain outside the public API.

alter table public.texasdefined_group_event_partner_applications
  add column if not exists commercial_agreement_verified_at timestamptz,
  add column if not exists commercial_agreement_verified_by text,
  add column if not exists commercial_agreement_reference text,
  add column if not exists commercial_agreement_covers_offers boolean not null default false,
  add column if not exists commercial_agreement_covers_quote_routing boolean not null default false,
  add column if not exists commercial_agreement_expires_on date;

alter table public.texasdefined_group_event_partner_applications
  add constraint td_group_partner_agreement_evidence_required
  check (
    (not commercial_agreement_covers_offers and not commercial_agreement_covers_quote_routing)
    or (
      commercial_agreement_verified_at is not null
      and char_length(btrim(coalesce(commercial_agreement_verified_by,''))) between 2 and 150
      and char_length(btrim(coalesce(commercial_agreement_reference,''))) between 20 and 500
    )
  );

-- This is defense-in-depth against future code paths that might try to publish
-- offers without verifying actual commercial authority. Trigger is server-only.
create or replace function public.texasdefined_group_event_offer_agreement_guard()
returns trigger language plpgsql security invoker set search_path = ''
as $$
declare
  partner record;
begin
  if new.status <> 'approved' then return new; end if;
  select
    p.status, p.identity_verified_at, p.commercial_agreement_verified_at,
    p.commercial_agreement_covers_offers, p.commercial_agreement_expires_on
  into partner
  from public.texasdefined_group_event_partner_applications p
  where p.id = new.partner_application_id;
  if not found or partner.status <> 'approved'
    or partner.identity_verified_at is null
    or partner.commercial_agreement_verified_at is null
    or partner.commercial_agreement_covers_offers is distinct from true
    or (partner.commercial_agreement_expires_on is not null
      and partner.commercial_agreement_expires_on < new.ends_on)
  then
    raise exception using errcode='P0001',
      message='Corporate offer requires a verified signed agreement covering this offer period';
  end if;
  return new;
end;
$$;
revoke all on function public.texasdefined_group_event_offer_agreement_guard() from public, anon, authenticated;
grant execute on function public.texasdefined_group_event_offer_agreement_guard() to service_role;
drop trigger if exists td_group_offer_agreement_guard on public.texasdefined_group_event_offers;
create trigger td_group_offer_agreement_guard
before insert or update on public.texasdefined_group_event_offers
for each row execute function public.texasdefined_group_event_offer_agreement_guard();

comment on column public.texasdefined_group_event_partner_applications.commercial_agreement_reference is
  'Private staff reference to independently verified signed partner terms; no contract body, payment details or public partner claim.';
