create table if not exists public.texasdefined_sports_sponsors (
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

create table if not exists public.texasdefined_sports_sponsor_placements (
  id uuid primary key default gen_random_uuid(),
  sponsor_id uuid not null references public.texasdefined_sports_sponsors(id) on delete cascade,
  surface_path text not null check (surface_path = '/sports-venues' or surface_path ~ '^/sports-venue/[a-z0-9-]+$'),
  headline text not null check (char_length(headline) between 2 and 120),
  body text not null check (char_length(body) between 10 and 320),
  cta_label text not null check (char_length(cta_label) between 2 and 60),
  destination_url text not null check (destination_url ~ '^https://'),
  status text not null default 'draft' check (status in ('draft','approved','paused','ended')),
  starts_at timestamptz,
  ends_at timestamptz,
  approved_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (ends_at is null or starts_at is null or ends_at > starts_at),
  check (status <> 'approved' or approved_at is not null)
);

create table if not exists public.texasdefined_sports_sponsor_daily_metrics (
  placement_id uuid not null references public.texasdefined_sports_sponsor_placements(id) on delete cascade,
  metric_date date not null default current_date,
  impressions integer not null default 0 check (impressions >= 0),
  clicks integer not null default 0 check (clicks >= 0),
  updated_at timestamptz not null default now(),
  primary key (placement_id, metric_date)
);

create index if not exists texasdefined_sports_sponsor_placements_surface_status_idx
  on public.texasdefined_sports_sponsor_placements(surface_path, status, starts_at, ends_at);
create index if not exists texasdefined_sports_sponsors_status_idx
  on public.texasdefined_sports_sponsors(status);

alter table public.texasdefined_sports_sponsors enable row level security;
alter table public.texasdefined_sports_sponsor_placements enable row level security;
alter table public.texasdefined_sports_sponsor_daily_metrics enable row level security;

revoke all on table public.texasdefined_sports_sponsors from anon, authenticated;
revoke all on table public.texasdefined_sports_sponsor_placements from anon, authenticated;
revoke all on table public.texasdefined_sports_sponsor_daily_metrics from anon, authenticated;
grant all on table public.texasdefined_sports_sponsors to service_role;
grant all on table public.texasdefined_sports_sponsor_placements to service_role;
grant all on table public.texasdefined_sports_sponsor_daily_metrics to service_role;

comment on table public.texasdefined_sports_sponsor_placements is 'Explicitly approved, clearly disclosed sports-travel sponsorship placements. Editorial recommendations are stored and ranked separately.';
comment on table public.texasdefined_sports_sponsor_daily_metrics is 'Privacy-light aggregate sponsorship metrics only; no visitor identifiers or PII.';
