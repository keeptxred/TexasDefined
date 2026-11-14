-- Impact partner reporting aggregates. This contains PRIVATE commercial data.
-- Never expose reports, financial amounts, transactions or raw Impact API
-- responses in this public GitHub repository, CI artifacts or unauthenticated
-- endpoints. Store only provider-reported daily aggregates after verifying the
-- actual account report response and currency.
create table if not exists public.texasdefined_impact_performance_daily (
  metric_date date primary key,
  source_report_id text not null default 'partner_performance_by_day'
    check (source_report_id = 'partner_performance_by_day'),
  reported_clicks bigint check (reported_clicks >= 0),
  reported_impressions bigint check (reported_impressions >= 0),
  reported_actions bigint check (reported_actions >= 0),
  reported_sales bigint check (reported_sales >= 0),
  -- The following are PROVIDER-REPORTED values, not finalized payments.
  -- Nullable currency prevents silently labeling unknown units as USD.
  reported_total_cost numeric(20,4),
  reported_action_cost numeric(20,4),
  currency_code text check (currency_code is null or currency_code ~ '^[A-Z]{3}$'),
  data_status text not null default 'provider_reported_not_settled'
    check (data_status in ('provider_reported_not_settled','provider_corrected')),
  synced_at timestamptz not null default now(),
  constraint impact_currency_proof_required check (
    (reported_total_cost is null and reported_action_cost is null)
    or currency_code is not null
  )
);

comment on table public.texasdefined_impact_performance_daily is
  'PRIVATE Impact partner daily performance aggregates; provider-reported clicks, actions and costs are not purchases, settled commissions or payouts. Currency must be independently verified before storing monetary values. No customer or action identifiers.';

alter table public.texasdefined_impact_performance_daily enable row level security;
revoke all on table public.texasdefined_impact_performance_daily from public, anon, authenticated;
grant select, insert, update, delete on table public.texasdefined_impact_performance_daily to service_role;

create index if not exists texasdefined_impact_performance_daily_synced_idx
  on public.texasdefined_impact_performance_daily (synced_at desc);
