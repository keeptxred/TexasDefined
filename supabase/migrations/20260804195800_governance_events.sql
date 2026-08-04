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

create index if not exists platform_governance_events_occurred_at_idx on public.platform_governance_events (occurred_at desc);
create index if not exists platform_governance_events_site_idx on public.platform_governance_events (site, occurred_at desc);
create index if not exists platform_governance_events_domain_idx on public.platform_governance_events (domain, occurred_at desc);

aalter table public.platform_governance_events enable row level security;

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

revoke all on public.platform_governance_events from anon, authenticated;
revoke all on function public.prune_platform_governance_events(integer) from public, anon, authenticated;
comment on table public.platform_governance_events is 'Privacy-safe, append-only cross-site publishing governance events. No article bodies, captions, reader identifiers, credentials, IP addresses, or tokens.';
