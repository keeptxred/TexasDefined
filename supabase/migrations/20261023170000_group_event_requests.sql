-- TexasDefined corporate/group event marketplace: confidential quote requests.
-- Editorial provider records remain source-controlled until a governed partner portal is approved.
create table if not exists public.texasdefined_group_event_requests (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  status text not null default 'new' check (status in ('new', 'reviewing', 'contacted', 'closed', 'spam')),
  contact_name text not null check (char_length(contact_name) between 2 and 120),
  email text not null check (char_length(email) between 5 and 320),
  company text not null check (char_length(company) between 2 and 180),
  phone text check (char_length(phone) <= 50),
  city text not null check (char_length(city) between 2 and 90),
  group_size integer not null check (group_size between 2 and 3000),
  event_category text not null check (event_category in ('team-building','company-parties','private-dining','meetings','outdoor-adventure','client-entertainment')),
  event_date date,
  budget_per_person integer check (budget_per_person is null or (budget_per_person between 1 and 10000)),
  provider_slugs text[] not null default '{}',
  notes text check (char_length(notes) <= 3000),
  consent_contact boolean not null check (consent_contact is true),
  source_path text not null default '/corporate-events' check (source_path = '/corporate-events')
);
comment on table public.texasdefined_group_event_requests is
  'Server-only corporate event planning inquiries. Never expose contact details or distribute to a venue without explicit planner consent and an approved partner workflow.';
create index if not exists texasdefined_group_event_requests_status_created_idx
  on public.texasdefined_group_event_requests (status, created_at desc);
create index if not exists texasdefined_group_event_requests_email_created_idx
  on public.texasdefined_group_event_requests (email, created_at desc);
alter table public.texasdefined_group_event_requests enable row level security;
revoke all on table public.texasdefined_group_event_requests from anon, authenticated;
grant select, insert, update on table public.texasdefined_group_event_requests to service_role;
