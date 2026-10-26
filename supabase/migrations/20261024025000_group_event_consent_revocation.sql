-- A planner's optional permission to share their contact details with
-- specifically shortlisted venues can be withdrawn following an authenticated
-- staff review of the organizer's request. This creates NO outbound message.
-- Historical consent timestamps remain private audit facts; the live permission
-- bit becomes irrevocably false on this particular inquiry.

alter table public.texasdefined_group_event_requests
  add column if not exists provider_outreach_revoked_at timestamptz,
  add column if not exists provider_outreach_revoked_by text,
  add column if not exists provider_outreach_revocation_note text;

alter table public.texasdefined_group_event_requests
  add constraint td_group_event_outreach_revocation_proof
  check (
    provider_outreach_revoked_at is null
    or (
      allow_provider_outreach = false
      and char_length(btrim(coalesce(provider_outreach_revoked_by,''))) between 2 and 120
      and char_length(btrim(coalesce(provider_outreach_revocation_note,''))) between 20 and 500
    )
  );

-- A future UPDATE changing only the booleans cannot silently reactivate the
-- same planner's revoked grant; a fresh request with new consent is required.
create or replace function public.texasdefined_group_event_prevent_consent_reactivation()
returns trigger language plpgsql security invoker set search_path = ''
as $$
begin
  if old.provider_outreach_revoked_at is not null and (
     new.allow_provider_outreach is distinct from false
     or new.provider_outreach_revoked_at is distinct from old.provider_outreach_revoked_at
  ) then
    raise exception using errcode='P0001',
      message='Withdrawn corporate venue sharing consent cannot be reactivated on this inquiry';
  end if;
  return new;
end;
$$;
revoke all on function public.texasdefined_group_event_prevent_consent_reactivation() from public, anon, authenticated;
grant execute on function public.texasdefined_group_event_prevent_consent_reactivation() to service_role;
drop trigger if exists td_group_event_prevent_consent_reactivation on public.texasdefined_group_event_requests;
create trigger td_group_event_prevent_consent_reactivation
before update on public.texasdefined_group_event_requests
for each row execute function public.texasdefined_group_event_prevent_consent_reactivation();

comment on column public.texasdefined_group_event_requests.provider_outreach_revoked_at is
  'Private timestamp of staff-verified organizer revocation. Does not retract previously delivered communications; blocks any new venue-sharing actions.';
