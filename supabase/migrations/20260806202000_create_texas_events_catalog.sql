create table if not exists public.texas_events (
  id uuid primary key default gen_random_uuid(),
  brand_id text not null default 'texasdefined',
  source_key text not null,
  source_event_id text not null,
  source_url text not null,
  source_name text not null,
  source_checked_at timestamptz not null default now(),
  name text not null,
  slug text not null,
  blurb text not null,
  city text not null,
  region text not null,
  venue text,
  start_date date not null,
  end_date date,
  category text not null,
  image_url text,
  official_url text,
  confidence_score integer not null default 0 check (confidence_score between 0 and 100),
  editorial_score integer not null default 0 check (editorial_score between 0 and 100),
  status text not null default 'pending' check (status in ('pending','published','rejected','expired')),
  auto_publish boolean not null default false,
  raw_payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (source_key, source_event_id),
  unique (brand_id, slug, start_date)
);

create index if not exists texas_events_public_schedule_idx
  on public.texas_events (brand_id, status, start_date, end_date);
create index if not exists texas_events_review_idx
  on public.texas_events (status, confidence_score desc, editorial_score desc);

alter table public.texas_events enable row level security;

drop policy if exists "Published Texas events are public" on public.texas_events;
create policy "Published Texas events are public"
  on public.texas_events for select
  using (status = 'published' and coalesce(end_date, start_date) >= current_date);

grant select on public.texas_events to anon, authenticated;

create or replace function public.expire_texas_events()
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare changed integer;
begin
  update public.texas_events
     set status = 'expired', updated_at = now()
   where status in ('pending','published')
     and coalesce(end_date, start_date) < current_date;
  get diagnostics changed = row_count;
  return changed;
end;
$$;

comment on table public.texas_events is 'Authoritative, deduplicated Texas event catalog used by TexasDefined.';
comment on column public.texas_events.auto_publish is 'True only when source authority and editorial confidence clear automatic publication thresholds.';

notify pgrst, 'reload schema';
