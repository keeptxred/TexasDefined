-- Recovered verbatim from supabase_migrations.schema_migrations on 2026-10-10.
-- Migration 20261010180309 was already applied to shared Supabase; source parity only.
create table if not exists public.texasdefined_network_stripe_events (
 stripe_event_id text primary key,
 stripe_event_type text not null,
 received_at timestamptz not null default now(),
 processed_at timestamptz,
 processing_error text
);
alter table public.texasdefined_network_stripe_events enable row level security;
revoke all on public.texasdefined_network_stripe_events from anon,authenticated;
create index if not exists texasdefined_network_stripe_events_unprocessed on public.texasdefined_network_stripe_events(received_at) where processed_at is null;

