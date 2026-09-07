create table if not exists public.texasdefined_ga4_daily_traffic (
  metric_date date primary key,
  active_users integer not null check (active_users >= 0),
  sessions integer not null check (sessions >= 0),
  pageviews integer not null check (pageviews >= 0),
  captured_at timestamptz not null default now(),
  source text not null default 'ga4_data_api' check (source in ('ga4_data_api','manual_verified'))
);

alter table public.texasdefined_ga4_daily_traffic enable row level security;
revoke all on table public.texasdefined_ga4_daily_traffic from anon, authenticated;
grant all on table public.texasdefined_ga4_daily_traffic to service_role;

comment on table public.texasdefined_ga4_daily_traffic is 'Verified daily GA4 rollups imported for comparison with first-party reader-quality signals.';
