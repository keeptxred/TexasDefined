-- Internal human verification is required before a venue application may
-- be labelled 'approved' or used to support a monetized partner offer.
alter table public.texasdefined_group_event_partner_applications
  add column if not exists identity_verified_at timestamptz,
  add column if not exists identity_verified_by text,
  add column if not exists identity_verification_note text;
alter table public.texasdefined_group_event_partner_applications
  drop constraint if exists td_group_event_application_identity_approval;
alter table public.texasdefined_group_event_partner_applications
  add constraint td_group_event_application_identity_approval
  check (
    status <> 'approved'
    or (
      identity_verified_at is not null
      and char_length(trim(coalesce(identity_verified_by,''))) >= 2
      and char_length(trim(coalesce(identity_verification_note,''))) between 20 and 500
    )
  );
comment on column public.texasdefined_group_event_partner_applications.identity_verified_at is
  'Server-generated timestamp of explicit staff identity verification attestation before business approval.';
comment on column public.texasdefined_group_event_partner_applications.identity_verification_note is
  'Private operator evidence of business identity, e.g. verified official published corporate event contacts; never publicly displayed.';
