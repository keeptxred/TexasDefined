-- Recovered verbatim from supabase_migrations.schema_migrations on 2026-10-10.
-- Migration 20261010155736 was already applied to shared Supabase; source parity only.
create table if not exists public.texasdefined_network_business_accounts (
 id uuid primary key default gen_random_uuid(),
 application_id uuid not null unique references public.texasdefined_network_applications(id) on delete restrict,
 owner_user_id uuid not null references auth.users(id),
 membership_tier text not null default 'featured' check (membership_tier in ('featured')),
 access_enabled boolean not null default false,
 created_at timestamptz not null default now(),
 unique(owner_user_id,application_id)
);
alter table public.texasdefined_network_business_accounts enable row level security;
revoke all on public.texasdefined_network_business_accounts from anon;
grant select on public.texasdefined_network_business_accounts to authenticated;
drop policy if exists network_owner_accounts_read on public.texasdefined_network_business_accounts;
create policy network_owner_accounts_read on public.texasdefined_network_business_accounts for select to authenticated using (owner_user_id=(select auth.uid()));
create table if not exists public.texasdefined_network_profile_revisions (
 id uuid primary key default gen_random_uuid(),
 business_account_id uuid not null references public.texasdefined_network_business_accounts(id) on delete cascade,
 submitted_by uuid not null references auth.users(id),
 created_at timestamptz not null default now(),
 reviewed_at timestamptz,
 review_status text not null default 'pending_review' check (review_status in ('pending_review','approved','rejected')),
 proposed_profile jsonb not null,
 reviewer_notes text,
 constraint profile_revision_object check (jsonb_typeof(proposed_profile)='object')
);
create unique index if not exists network_one_pending_revision on public.texasdefined_network_profile_revisions(business_account_id) where review_status='pending_review';
alter table public.texasdefined_network_profile_revisions enable row level security;
revoke all on public.texasdefined_network_profile_revisions from anon;
grant select,insert on public.texasdefined_network_profile_revisions to authenticated;
drop policy if exists network_owner_revisions_read on public.texasdefined_network_profile_revisions;
create policy network_owner_revisions_read on public.texasdefined_network_profile_revisions for select to authenticated using (exists(select 1 from public.texasdefined_network_business_accounts b where b.id=business_account_id and b.owner_user_id=(select auth.uid())));
drop policy if exists network_owner_revisions_submit on public.texasdefined_network_profile_revisions;
create policy network_owner_revisions_submit on public.texasdefined_network_profile_revisions for insert to authenticated with check (
submitted_by=(select auth.uid()) and review_status='pending_review' and reviewed_at is null and reviewer_notes is null
and exists(select 1 from public.texasdefined_network_business_accounts b where b.id=business_account_id and b.owner_user_id=(select auth.uid()) and b.access_enabled=true)
and (select count(*) from jsonb_object_keys(proposed_profile)) between 1 and 14
);
