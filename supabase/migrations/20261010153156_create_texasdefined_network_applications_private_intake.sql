-- Recovered verbatim from supabase_migrations.schema_migrations on 2026-10-10.
-- Migration 20261010153156 was already applied to shared Supabase; source parity only.
create table if not exists public.texasdefined_network_applications (
 id uuid primary key default gen_random_uuid(),
 created_at timestamptz not null default now(),
 updated_at timestamptz not null default now(),
 plan text not null check (plan in ('basic','plus')),
 status text not null default 'pending_review' check (status in ('pending_review','approved','rejected','published')),
 business_name text not null check (char_length(business_name) between 2 and 160),
 category text not null,
 description text not null default '',
 city text not null,
 address text,
 phone text,
 contact_email text not null,
 hours text,
 website text,
 social text,
 services text,
 faq text,
 offer text,
 logo_storage_path text,
 gallery_storage_paths text[] not null default '{}',
 stripe_customer_id text,
 stripe_subscription_id text,
 paid_entitlement_active boolean not null default false
);
alter table public.texasdefined_network_applications enable row level security;
revoke all on public.texasdefined_network_applications from anon, authenticated;
create index if not exists texasdefined_network_applications_status_idx on public.texasdefined_network_applications(status, created_at desc);
create unique index if not exists texasdefined_network_applications_stripe_subscription_idx on public.texasdefined_network_applications(stripe_subscription_id) where stripe_subscription_id is not null;
