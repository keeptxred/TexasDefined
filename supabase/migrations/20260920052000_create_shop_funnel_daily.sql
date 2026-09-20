create table if not exists public.texasdefined_shop_funnel_daily (
  metric_date date not null,
  event_name text not null check (event_name in (
    'shop_add_to_cart',
    'shop_checkout_started',
    'shop_checkout_created',
    'shop_checkout_failed',
    'shop_checkout_returned',
    'shop_purchase_confirmed',
    'shop_purchase_unconfirmed',
    'shop_funnel_sync_heartbeat'
  )),
  page_path text not null check (char_length(page_path) between 1 and 600 and left(page_path, 1) = '/'),
  detection text not null default 'unspecified' check (char_length(detection) between 1 and 120),
  event_count bigint not null check (event_count >= 0),
  synced_at timestamptz not null default now(),
  primary key (metric_date, event_name, page_path, detection)
);

comment on table public.texasdefined_shop_funnel_daily is
  'Private daily aggregate of TexasDefined shop funnel events synced from Cloudflare Analytics Engine. No browser session IDs, Stripe session IDs, customer data, or payment details are stored.';

alter table public.texasdefined_shop_funnel_daily enable row level security;

revoke all on table public.texasdefined_shop_funnel_daily from public, anon, authenticated;
grant select, insert, update, delete on table public.texasdefined_shop_funnel_daily to service_role;

create index if not exists texasdefined_shop_funnel_daily_date_idx
  on public.texasdefined_shop_funnel_daily (metric_date desc);
create index if not exists texasdefined_shop_funnel_daily_event_date_idx
  on public.texasdefined_shop_funnel_daily (event_name, metric_date desc);
