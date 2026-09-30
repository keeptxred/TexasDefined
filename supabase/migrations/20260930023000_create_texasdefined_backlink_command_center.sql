create table if not exists public.texasdefined_backlink_prospects (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  referring_domain text not null check (char_length(referring_domain) between 3 and 255),
  linking_url text check (linking_url is null or linking_url ~ '^https://'),
  destination_url text not null check (destination_url ~ '^https://texasdefined\.com(/|$)'),
  topic_cluster text not null check (char_length(topic_cluster) between 2 and 120),
  contact_organization text not null check (char_length(contact_organization) between 2 and 200),
  contact_name text check (contact_name is null or char_length(contact_name) <= 160),
  contact_email text check (contact_email is null or char_length(contact_email) <= 320),
  source_type text not null check (source_type in (
    'government','tourism','museum-cultural','education','media-news',
    'association-nonprofit','event-organizer','business','community-resource',
    'editorial-source','other'
  )),
  outreach_reason text not null check (char_length(outreach_reason) between 10 and 3000),
  outreach_date date,
  last_follow_up_date date,
  response_status text not null default 'none' check (response_status in ('none','replied','declined','no-response')),
  backlink_status text not null default 'unknown' check (backlink_status in ('unknown','not-linked','pending','won','removed')),
  link_attribute text not null default 'unknown' check (link_attribute in ('follow','nofollow','unknown')),
  anchor_text text check (anchor_text is null or char_length(anchor_text) <= 500),
  authority_relevance_notes text not null default '' check (char_length(authority_relevance_notes) <= 5000),
  next_action text not null default '' check (char_length(next_action) <= 2000),
  campaign text not null check (char_length(campaign) between 2 and 160),
  stage text not null default 'prospect' check (stage in (
    'prospect','researched','ready-to-contact','contacted','follow-up',
    'replied','link-won','declined','no-response','disqualified'
  )),
  date_first_discovered date,
  date_last_verified date,
  check (date_last_verified is null or date_first_discovered is null or date_last_verified >= date_first_discovered),
  check (stage <> 'link-won' or backlink_status = 'won'),
  check (backlink_status <> 'won' or linking_url is not null)
);

create unique index if not exists texasdefined_backlink_prospects_domain_destination_unique_idx
  on public.texasdefined_backlink_prospects (lower(referring_domain), lower(destination_url));

create index if not exists texasdefined_backlink_prospects_stage_idx
  on public.texasdefined_backlink_prospects (stage, updated_at desc);

create index if not exists texasdefined_backlink_prospects_campaign_idx
  on public.texasdefined_backlink_prospects (campaign, stage);

create index if not exists texasdefined_backlink_prospects_verified_idx
  on public.texasdefined_backlink_prospects (date_last_verified)
  where backlink_status = 'won';

alter table public.texasdefined_backlink_prospects enable row level security;

revoke all on table public.texasdefined_backlink_prospects from anon, authenticated;
grant select, insert, update, delete on table public.texasdefined_backlink_prospects to service_role;

comment on table public.texasdefined_backlink_prospects is
  'Private TexasDefined backlink prospect, outreach and earned-link tracking. Contact PII is server/admin only and never intentionally exposed to public clients.';
comment on column public.texasdefined_backlink_prospects.referring_domain is
  'Normalized lowercase registrable/host domain used for duplicate detection across campaigns.';
comment on column public.texasdefined_backlink_prospects.destination_url is
  'Canonical TexasDefined URL the prospect may legitimately reference.';
