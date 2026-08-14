create table if not exists public.texasdefined_fishing_sponsors (
  id uuid primary key default gen_random_uuid(),
  company_name text not null check (char_length(company_name) between 2 and 180),
  website text not null check (website ~ '^https://'),
  contact_email text,
  source_inquiry_id uuid references public.texasdefined_partner_inquiries(id) on delete set null,
  status text not null default 'prospect' check (status in ('prospect','approved','inactive')),
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.texasdefined_fishing_sponsor_placements (
  id uuid primary key default gen_random_uuid(),
  sponsor_id uuid not null references public.texasdefined_fishing_sponsors(id) on delete cascade,
  surface_path text not null check (surface_path = '/fishing' or surface_path ~ '^/fishing/[a-z0-9][a-z0-9/-]*$'),
  placement_kind text not null check (placement_kind in ('featured-guide','lake-guide','regional-guide','species-guide','lake-sponsor','featured-marina','featured-tackle-shop','featured-lodging','featured-campground','featured-restaurant','regional-advertiser','statewide-advertiser')),
  headline text not null check (char_length(headline) between 2 and 120),
  body text not null check (char_length(body) between 10 and 320),
  cta_label text not null check (char_length(cta_label) between 2 and 60),
  destination_url text not null check (destination_url ~ '^https://'),
  status text not null default 'draft' check (status in ('draft','approved','paused','ended')),
  priority integer not null default 0 check (priority between 0 and 1000),
  exclusive boolean not null default false,
  monthly_price_cents integer check (monthly_price_cents is null or monthly_price_cents >= 0),
  starts_at timestamptz,
  ends_at timestamptz,
  renewal_at timestamptz,
  approved_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (ends_at is null or starts_at is null or ends_at > starts_at),
  check (status <> 'approved' or approved_at is not null)
);

create table if not exists public.texasdefined_fishing_sponsor_daily_metrics (
  placement_id uuid not null references public.texasdefined_fishing_sponsor_placements(id) on delete cascade,
  metric_date date not null default current_date,
  impressions integer not null default 0 check (impressions >= 0),
  clicks integer not null default 0 check (clicks >= 0),
  updated_at timestamptz not null default now(),
  primary key (placement_id, metric_date)
);

create index if not exists texasdefined_fishing_sponsor_placements_surface_status_idx
  on public.texasdefined_fishing_sponsor_placements(surface_path, status, starts_at, ends_at, priority desc);
create index if not exists texasdefined_fishing_sponsor_placements_renewal_idx
  on public.texasdefined_fishing_sponsor_placements(renewal_at) where status = 'approved';
create index if not exists texasdefined_fishing_sponsors_status_idx
  on public.texasdefined_fishing_sponsors(status);

alter table public.texasdefined_fishing_sponsors enable row level security;
alter table public.texasdefined_fishing_sponsor_placements enable row level security;
alter table public.texasdefined_fishing_sponsor_daily_metrics enable row level security;

revoke all on table public.texasdefined_fishing_sponsors from anon, authenticated;
revoke all on table public.texasdefined_fishing_sponsor_placements from anon, authenticated;
revoke all on table public.texasdefined_fishing_sponsor_daily_metrics from anon, authenticated;
grant all on table public.texasdefined_fishing_sponsors to service_role;
grant all on table public.texasdefined_fishing_sponsor_placements to service_role;
grant all on table public.texasdefined_fishing_sponsor_daily_metrics to service_role;

create or replace function public.record_texasdefined_fishing_sponsor_metric(p_placement_id uuid, p_event text)
returns boolean
language plpgsql
security invoker
set search_path = public
as $$
begin
  if p_event not in ('impression','click') then
    return false;
  end if;

  if not exists (
    select 1
    from public.texasdefined_fishing_sponsor_placements p
    join public.texasdefined_fishing_sponsors s on s.id = p.sponsor_id
    where p.id = p_placement_id
      and p.status = 'approved'
      and p.approved_at is not null
      and s.status = 'approved'
      and (p.starts_at is null or p.starts_at <= now())
      and (p.ends_at is null or p.ends_at > now())
  ) then
    return false;
  end if;

  insert into public.texasdefined_fishing_sponsor_daily_metrics(placement_id, metric_date, impressions, clicks, updated_at)
  values (p_placement_id, current_date, case when p_event = 'impression' then 1 else 0 end, case when p_event = 'click' then 1 else 0 end, now())
  on conflict (placement_id, metric_date) do update
    set impressions = public.texasdefined_fishing_sponsor_daily_metrics.impressions + case when p_event = 'impression' then 1 else 0 end,
        clicks = public.texasdefined_fishing_sponsor_daily_metrics.clicks + case when p_event = 'click' then 1 else 0 end,
        updated_at = now();

  return true;
end;
$$;

revoke all on function public.record_texasdefined_fishing_sponsor_metric(uuid, text) from public, anon, authenticated;
grant execute on function public.record_texasdefined_fishing_sponsor_metric(uuid, text) to service_role;

comment on table public.texasdefined_fishing_sponsor_placements is 'Governed TexasDefined fishing sponsorship inventory. Paid placement never changes editorial rankings, fishery scores, access facts, planner ordering or guide verification.';
comment on table public.texasdefined_fishing_sponsor_daily_metrics is 'Privacy-light aggregate fishing sponsorship metrics only; no visitor identifiers or PII.';
