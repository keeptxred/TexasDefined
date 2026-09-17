create table if not exists public.texasdefined_partner_referral_daily (
  metric_date date not null,
  partner text not null check (char_length(partner) between 1 and 120),
  placement text not null check (char_length(placement) between 1 and 160),
  page_path text not null check (char_length(page_path) between 1 and 600 and left(page_path, 1) = '/'),
  destination_url text not null check (char_length(destination_url) between 1 and 1800 and destination_url ~ '^https://'),
  destination_hash text not null check (destination_hash ~ '^[0-9a-f]{64}$'),
  click_count bigint not null check (click_count >= 0),
  synced_at timestamptz not null default now(),
  primary key (metric_date, partner, placement, page_path, destination_hash)
);

comment on table public.texasdefined_partner_referral_daily is
  'Private daily aggregate of outbound TexasDefined partner referral clicks synced from Cloudflare Analytics Engine. Raw click telemetry and browser session identifiers are not stored here.';

alter table public.texasdefined_partner_referral_daily enable row level security;

revoke all on table public.texasdefined_partner_referral_daily from public, anon, authenticated;
grant select, insert, update, delete on table public.texasdefined_partner_referral_daily to service_role;

create index if not exists texasdefined_partner_referral_daily_date_idx
  on public.texasdefined_partner_referral_daily (metric_date desc);
create index if not exists texasdefined_partner_referral_daily_partner_date_idx
  on public.texasdefined_partner_referral_daily (partner, metric_date desc);
create index if not exists texasdefined_partner_referral_daily_placement_date_idx
  on public.texasdefined_partner_referral_daily (placement, metric_date desc);
