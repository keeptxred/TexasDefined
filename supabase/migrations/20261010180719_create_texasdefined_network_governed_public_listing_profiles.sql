-- Recovered verbatim from supabase_migrations.schema_migrations on 2026-10-10.
-- Migration 20261010180719 was already applied to shared Supabase; source parity only.
create table if not exists public.texasdefined_network_public_listings (
 application_id uuid primary key references public.texasdefined_network_applications(id) on delete restrict,
 slug text not null unique,
 plan text not null check (plan in ('basic','plus','featured')),
 profile jsonb not null,
 logo_storage_path text,
 gallery_storage_paths text[] not null default '{}',
 published_at timestamptz not null default now(),
 updated_at timestamptz not null default now(),
 is_published boolean not null default true,
 check(jsonb_typeof(profile)='object')
);
alter table public.texasdefined_network_public_listings enable row level security;
revoke all on public.texasdefined_network_public_listings from anon,authenticated;
grant select on public.texasdefined_network_public_listings to anon,authenticated;
drop policy if exists texasdefined_network_public_listing_read on public.texasdefined_network_public_listings;
create policy texasdefined_network_public_listing_read on public.texasdefined_network_public_listings for select to anon,authenticated using(is_published=true);

