create extension if not exists pgcrypto;

create table if not exists public.texasdefined_offer_sources (
  id uuid primary key default gen_random_uuid(),
  source_key text not null unique,
  network text not null,
  advertiser text not null,
  source_label text not null,
  fetch_strategy text not null,
  terms_url text,
  last_synced_at timestamptz,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.texasdefined_event_offers (
  id uuid primary key default gen_random_uuid(),
  source_id uuid references public.texasdefined_offer_sources(id) on delete set null,
  source_key text not null,
  external_id text not null,
  title text not null,
  description text,
  kind text not null default 'offer' check (kind in ('event', 'offer', 'lodging', 'attraction', 'promo')),
  category text,
  network text not null,
  advertiser text,
  city text,
  region text,
  county text,
  venue text,
  lat numeric,
  long numeric,
  start_date date,
  start_at timestamptz,
  end_at timestamptz,
  price_label text,
  offer_label text,
  promo_code text,
  affiliate_url text,
  source_url text,
  image_url text,
  commission_status text not null default 'unknown' check (commission_status in ('preserved', 'reduced', 'zero', 'unknown', 'editorial')),
  discount_preserves_commission boolean,
  is_discount boolean not null default false,
  is_editorial_only boolean not null default false,
  is_active boolean not null default true,
  expires_at timestamptz,
  last_verified_at timestamptz not null default now(),
  tags text[] not null default '{}',
  raw_payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint texasdefined_event_offers_source_external_unique unique (source_key, external_id),
  constraint texasdefined_event_offers_editorial_commission_guard check (
    (is_editorial_only = false) or (affiliate_url is null) or (commission_status in ('preserved', 'unknown'))
  )
);

alter table public.texasdefined_offer_sources add column if not exists source_key text;
alter table public.texasdefined_offer_sources add column if not exists network text;
alter table public.texasdefined_offer_sources add column if not exists advertiser text;
alter table public.texasdefined_offer_sources add column if not exists source_label text;
alter table public.texasdefined_offer_sources add column if not exists fetch_strategy text;
alter table public.texasdefined_offer_sources add column if not exists terms_url text;
alter table public.texasdefined_offer_sources add column if not exists last_synced_at timestamptz;
alter table public.texasdefined_offer_sources add column if not exists is_active boolean not null default true;
alter table public.texasdefined_offer_sources add column if not exists created_at timestamptz not null default now();
alter table public.texasdefined_offer_sources add column if not exists updated_at timestamptz not null default now();

alter table public.texasdefined_event_offers add column if not exists source_id uuid references public.texasdefined_offer_sources(id) on delete set null;
alter table public.texasdefined_event_offers add column if not exists source_key text;
alter table public.texasdefined_event_offers add column if not exists external_id text;
alter table public.texasdefined_event_offers add column if not exists title text;
alter table public.texasdefined_event_offers add column if not exists description text;
alter table public.texasdefined_event_offers add column if not exists kind text not null default 'offer';
alter table public.texasdefined_event_offers add column if not exists category text;
alter table public.texasdefined_event_offers add column if not exists network text;
alter table public.texasdefined_event_offers add column if not exists advertiser text;
alter table public.texasdefined_event_offers add column if not exists city text;
alter table public.texasdefined_event_offers add column if not exists region text;
alter table public.texasdefined_event_offers add column if not exists county text;
alter table public.texasdefined_event_offers add column if not exists venue text;
alter table public.texasdefined_event_offers add column if not exists lat numeric;
alter table public.texasdefined_event_offers add column if not exists long numeric;
alter table public.texasdefined_event_offers add column if not exists start_date date;
alter table public.texasdefined_event_offers add column if not exists start_at timestamptz;
alter table public.texasdefined_event_offers add column if not exists end_at timestamptz;
alter table public.texasdefined_event_offers add column if not exists price_label text;
alter table public.texasdefined_event_offers add column if not exists offer_label text;
alter table public.texasdefined_event_offers add column if not exists promo_code text;
alter table public.texasdefined_event_offers add column if not exists affiliate_url text;
alter table public.texasdefined_event_offers add column if not exists source_url text;
alter table public.texasdefined_event_offers add column if not exists image_url text;
alter table public.texasdefined_event_offers add column if not exists commission_status text not null default 'unknown';
alter table public.texasdefined_event_offers add column if not exists discount_preserves_commission boolean;
alter table public.texasdefined_event_offers add column if not exists is_discount boolean not null default false;
alter table public.texasdefined_event_offers add column if not exists is_editorial_only boolean not null default false;
alter table public.texasdefined_event_offers add column if not exists is_active boolean not null default true;
alter table public.texasdefined_event_offers add column if not exists expires_at timestamptz;
alter table public.texasdefined_event_offers add column if not exists last_verified_at timestamptz not null default now();
alter table public.texasdefined_event_offers add column if not exists tags text[] not null default '{}';
alter table public.texasdefined_event_offers add column if not exists raw_payload jsonb not null default '{}'::jsonb;
alter table public.texasdefined_event_offers add column if not exists created_at timestamptz not null default now();
alter table public.texasdefined_event_offers add column if not exists updated_at timestamptz not null default now();

alter table public.texasdefined_offer_sources alter column source_key set not null;
alter table public.texasdefined_offer_sources alter column network set not null;
alter table public.texasdefined_offer_sources alter column advertiser set not null;
alter table public.texasdefined_offer_sources alter column source_label set not null;
alter table public.texasdefined_offer_sources alter column fetch_strategy set not null;
alter table public.texasdefined_event_offers alter column source_key set not null;
alter table public.texasdefined_event_offers alter column external_id set not null;
alter table public.texasdefined_event_offers alter column title set not null;
alter table public.texasdefined_event_offers alter column network set not null;

create unique index if not exists texasdefined_offer_sources_source_key_idx on public.texasdefined_offer_sources (source_key);
create unique index if not exists texasdefined_event_offers_source_external_idx on public.texasdefined_event_offers (source_key, external_id);
create index if not exists texasdefined_event_offers_active_dates_idx on public.texasdefined_event_offers (is_active, start_date, expires_at);
create index if not exists texasdefined_event_offers_location_idx on public.texasdefined_event_offers (city, region, county);
create index if not exists texasdefined_event_offers_network_commission_idx on public.texasdefined_event_offers (network, commission_status, is_discount);
create index if not exists texasdefined_event_offers_tags_idx on public.texasdefined_event_offers using gin (tags);

alter table public.texasdefined_offer_sources enable row level security;
alter table public.texasdefined_event_offers enable row level security;

grant select, insert, update, delete on public.texasdefined_offer_sources to service_role;
grant select, insert, update, delete on public.texasdefined_event_offers to service_role;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'texasdefined_offer_sources' and policyname = 'service_role manages texasdefined offer sources'
  ) then
    create policy "service_role manages texasdefined offer sources"
      on public.texasdefined_offer_sources
      for all to service_role
      using (true)
      with check (true);
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'texasdefined_event_offers' and policyname = 'service_role manages texasdefined event offers'
  ) then
    create policy "service_role manages texasdefined event offers"
      on public.texasdefined_event_offers
      for all to service_role
      using (true)
      with check (true);
  end if;
end $$;

insert into public.texasdefined_offer_sources (source_key, network, advertiser, source_label, fetch_strategy, is_active)
values
  ('ticketmaster-impact', 'Impact', 'Ticketmaster', 'Ticketmaster Texas events via Impact tracking', 'ticketmaster-discovery-api', true),
  ('cj-link-search', 'CJ', 'CJ approved advertisers', 'CJ approved offer and content links', 'cj-link-search-api', true),
  ('impact-promotions', 'Impact', 'Impact programs', 'Impact promotions and promo codes', 'impact-promotions-api', true)
on conflict (source_key) do update set
  network = excluded.network,
  advertiser = excluded.advertiser,
  source_label = excluded.source_label,
  fetch_strategy = excluded.fetch_strategy,
  is_active = excluded.is_active,
  updated_at = now();
