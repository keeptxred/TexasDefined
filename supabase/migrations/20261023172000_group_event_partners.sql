-- Server-only provider onboarding and editorially controlled group-event offers.
-- Public listings and coupon codes are never created by an unreviewed application.
create table if not exists public.texasdefined_group_event_partner_applications (
 id uuid primary key default gen_random_uuid(),
 created_at timestamptz not null default now(),
 status text not null default 'pending' check (status in ('pending','reviewing','approved','rejected','spam')),
 contact_name text not null check (char_length(contact_name) between 2 and 120),
 email text not null check (char_length(email) between 5 and 320),
 phone text check (char_length(phone) <= 50),
 business_name text not null check (char_length(business_name) between 2 and 180),
 city text not null check (char_length(city) between 2 and 90),
 website text not null check (char_length(website) <= 500),
 published_capacity integer check (published_capacity between 2 and 100000),
 proposal text check (char_length(proposal) <= 2000),
 proposed_promo_code text check (char_length(proposed_promo_code) <= 60),
 notes text check (char_length(notes) <= 2000),
 consent_contact boolean not null check (consent_contact is true)
);
comment on table public.texasdefined_group_event_partner_applications is 'Server-only applications. Approval does not automatically publish a listing or promotion.';
create index if not exists td_group_partner_review_idx on public.texasdefined_group_event_partner_applications(status,created_at desc);
create index if not exists td_group_partner_email_idx on public.texasdefined_group_event_partner_applications(email,created_at desc);
alter table public.texasdefined_group_event_partner_applications enable row level security;
revoke all on table public.texasdefined_group_event_partner_applications from anon, authenticated;
grant select, insert, update on table public.texasdefined_group_event_partner_applications to service_role;

create table if not exists public.texasdefined_group_event_offers (
 id uuid primary key default gen_random_uuid(),
 partner_application_id uuid not null references public.texasdefined_group_event_partner_applications(id),
 provider_slug text not null check (provider_slug ~ '^[a-z0-9-]+$'),
 title text not null check (char_length(title) between 5 and 160),
 benefit text not null check (char_length(benefit) between 10 and 500),
 code text check (char_length(code) <= 60),
 redemption_url text not null check (left(redemption_url,8)='https://'),
 starts_on date not null,
 ends_on date not null check (ends_on >= starts_on),
 status text not null default 'draft' check (status in ('draft','approved','paused','expired')),
 reviewed_by text,
 reviewed_at timestamptz,
 created_at timestamptz not null default now(),
 check (status <> 'approved' or (reviewed_at is not null and char_length(coalesce(reviewed_by,'')) >= 2))
);
comment on table public.texasdefined_group_event_offers is 'Commercial promotion ledger; only server-side queries can reveal explicitly approved, current offers. No public API policies.';
create index if not exists td_group_offers_active_idx on public.texasdefined_group_event_offers(status, starts_on, ends_on);
alter table public.texasdefined_group_event_offers enable row level security;
revoke all on table public.texasdefined_group_event_offers from anon, authenticated;
grant select, insert, update on table public.texasdefined_group_event_offers to service_role;
