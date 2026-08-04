create table if not exists public.platform_governance_events (
  id text primary key,
  occurred_at timestamptz not null,
  kind text not null,
  site text not null check (site in ('TexasDefined','KeepTXRed')),
  domain text not null,
  disposition text not null,
  gate_status text not null,
  decision_fingerprint text not null,
  candidate_fingerprint text not null,
  canonical_owner text not null check (canonical_owner in ('TexasDefined','KeepTXRed')),
  source_site text not null check (source_site in ('TexasDefined','KeepTXRed')),
  override_used boolean not null default false,
  writer text,
  reason_codes text[] not null default '{}',
  created_at timestamptz not null default now()
);

create table if not exists public.platform_governance_daily_summaries (
  summary_date date not null,
  site text not null check (site in ('TexasDefined','KeepTXRed')),
  total integer not null default 0,
  allowed integer not null default 0,
  blocked integer not null default 0,
  override_required integer not null default 0,
  overrides_accepted integer not null default 0,
  overrides_rejected integer not null default 0,
  ownership_drift integer not null default 0,
  refreshed_at timestamptz not null default now(),
  primary key (summary_date, site)
);

create index if not exists platform_governance_events_occurred_at_idx on public.platform_governance_events (occurred_at desc);
create index if not exists platform_governance_events_site_idx on public.platform_governance_events (site, occurred_at desc);
create index if not exists platform_governance_events_domain_idx on public.platform_governance_events (domain, occurred_at desc);

alter table public.platform_governance_events enable row level security;
alter table public.platform_governance_daily_summaries enable row level security;

create or replace function public.prune_platform_governance_events(retain_days integer default 180)
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare removed integer;
begin
  if retain_days < 30 then raise exception 'retain_days must be at least 30'; end if;
  delete from public.platform_governance_events where occurred_at < now() - make_interval(days => retain_days);
  get diagnostics removed = row_count;
  return removed;
end;
$$;

create or replace function public.refresh_platform_governance_daily_summaries(days_back integer default 30)
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare affected integer;
begin
  if days_back < 1 or days_back > 3650 then raise exception 'days_back must be between 1 and 3650'; end if;
  insert into public.platform_governance_daily_summaries (
    summary_date, site, total, allowed, blocked, override_required,
    overrides_accepted, overrides_rejected, ownership_drift, refreshed_at
  )
  select
    occurred_at::date,
    site,
    count(*)::integer,
    count(*) filter (where kind = 'publication-allowed')::integer,
    count(*) filter (where kind = 'publication-blocked')::integer,
    count(*) filter (where kind = 'override-required')::integer,
    count(*) filter (where kind = 'override-accepted')::integer,
    count(*) filter (where kind = 'override-rejected')::integer,
    count(*) filter (where kind = 'ownership-drift-detected')::integer,
    now()
  from public.platform_governance_events
  where occurred_at >= current_date - days_back
  group by occurred_at::date, site
  on conflict (summary_date, site) do update set
    total = excluded.total,
    allowed = excluded.allowed,
    blocked = excluded.blocked,
    override_required = excluded.override_required,
    overrides_accepted = excluded.overrides_accepted,
    overrides_rejected = excluded.overrides_rejected,
    ownership_drift = excluded.ownership_drift,
    refreshed_at = excluded.refreshed_at;
  get diagnostics affected = row_count;
  return affected;
end;
$$;

revoke all on public.platform_governance_events from anon, authenticated;
revoke all on public.platform_governance_daily_summaries from anon, authenticated;
revoke all on function public.prune_platform_governance_events(integer) from public, anon, authenticated;
revoke all on function public.refresh_platform_governance_daily_summaries(integer) from public, anon, authenticated;
comment on table public.platform_governance_events is 'Privacy-safe, append-only cross-site publishing governance events. No article bodies, captions, reader identifiers, credentials, IP addresses, or tokens.';
comment on table public.platform_governance_daily_summaries is 'Daily aggregate governance counts for TexasDefined and KeepTXRed.';
