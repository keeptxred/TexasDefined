create table if not exists public.td_ai_search_demand (
  id uuid primary key default gen_random_uuid(),
  observed_on date not null default current_date,
  source text not null check (source in ('gsc','google-trends','keyword-research','ask-texas-ai','manual')),
  query_pattern text not null,
  topic text,
  intent text,
  location_scope text,
  impressions bigint not null default 0 check (impressions >= 0),
  clicks bigint not null default 0 check (clicks >= 0),
  relative_interest numeric(8,3),
  demand_score numeric(10,3),
  coverage_status text not null default 'unknown' check (coverage_status in ('strong','medium','weak','none','unknown')),
  recommended_action text check (recommended_action in ('keep','improve','build','tool','monitor','noindex','consolidate')),
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (source, observed_on, query_pattern, location_scope)
);

create index if not exists td_ai_search_demand_priority_idx
  on public.td_ai_search_demand (demand_score desc nulls last, impressions desc, observed_on desc);
create index if not exists td_ai_search_demand_topic_idx
  on public.td_ai_search_demand (topic, intent, observed_on desc);

create table if not exists public.td_ai_question_signals (
  id bigint generated always as identity primary key,
  occurred_at timestamptz not null default now(),
  question_fingerprint text not null,
  cluster_key text not null,
  intent text not null,
  topics text[] not null default '{}',
  texas_place text,
  freshness_class text not null check (freshness_class in ('static','periodic','seasonal','live')),
  source_count smallint not null default 0 check (source_count >= 0),
  current_source_count smallint not null default 0 check (current_source_count >= 0),
  coverage_status text not null check (coverage_status in ('strong','medium','weak','none')),
  answer_status text not null check (answer_status in ('answered','partial','unanswered','error')),
  model text,
  latency_ms integer check (latency_ms is null or latency_ms >= 0),
  metadata jsonb not null default '{}'::jsonb
);
create index if not exists td_ai_question_signals_cluster_idx
  on public.td_ai_question_signals (cluster_key, occurred_at desc);
create index if not exists td_ai_question_signals_gap_idx
  on public.td_ai_question_signals (coverage_status, occurred_at desc);

create table if not exists public.td_ai_coverage_gaps (
  id uuid primary key default gen_random_uuid(),
  cluster_key text not null unique,
  topic text,
  intent text,
  location_scope text,
  ask_count bigint not null default 0 check (ask_count >= 0),
  demand_score numeric(10,3),
  first_seen_at timestamptz not null default now(),
  last_seen_at timestamptz not null default now(),
  coverage_status text not null default 'weak' check (coverage_status in ('medium','weak','none')),
  recommended_action text not null default 'improve' check (recommended_action in ('improve','build','tool','monitor','consolidate')),
  workflow_status text not null default 'backlog' check (workflow_status in ('backlog','accepted','in-progress','resolved','ignored')),
  notes text,
  metadata jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);
create index if not exists td_ai_coverage_gaps_priority_idx
  on public.td_ai_coverage_gaps (workflow_status, demand_score desc nulls last, ask_count desc, last_seen_at desc);

create table if not exists public.td_ai_eval_cases (
  id text primary key,
  question text not null,
  expected_intent text not null,
  expected_topics text[] not null default '{}',
  expected_entity_kinds text[] not null default '{}',
  freshness_class text not null check (freshness_class in ('static','periodic','seasonal','live')),
  must_cite_site_sources boolean not null default true,
  must_verify_current boolean not null default false,
  expected_source_hrefs text[] not null default '{}',
  status text not null default 'active' check (status in ('active','retired')),
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.td_ai_eval_runs (
  id uuid primary key default gen_random_uuid(),
  run_at timestamptz not null default now(),
  model text not null,
  git_sha text,
  case_id text not null references public.td_ai_eval_cases(id) on delete cascade,
  passed boolean not null,
  score numeric(6,3),
  failures jsonb not null default '[]'::jsonb,
  retrieved_source_hrefs text[] not null default '{}',
  answer_excerpt text,
  metadata jsonb not null default '{}'::jsonb
);
create index if not exists td_ai_eval_runs_case_idx on public.td_ai_eval_runs (case_id, run_at desc);

alter table public.td_ai_search_demand enable row level security;
alter table public.td_ai_question_signals enable row level security;
alter table public.td_ai_coverage_gaps enable row level security;
alter table public.td_ai_eval_cases enable row level security;
alter table public.td_ai_eval_runs enable row level security;

revoke all on public.td_ai_search_demand from anon, authenticated;
revoke all on public.td_ai_question_signals from anon, authenticated;
revoke all on public.td_ai_coverage_gaps from anon, authenticated;
revoke all on public.td_ai_eval_cases from anon, authenticated;
revoke all on public.td_ai_eval_runs from anon, authenticated;

grant all on public.td_ai_search_demand to service_role;
grant all on public.td_ai_question_signals to service_role;
grant all on public.td_ai_coverage_gaps to service_role;
grant all on public.td_ai_eval_cases to service_role;
grant all on public.td_ai_eval_runs to service_role;
grant usage, select on sequence public.td_ai_question_signals_id_seq to service_role;

comment on table public.td_ai_question_signals is 'Privacy-minimized Ask Texas AI telemetry. Raw visitor questions, IP addresses, and user-agent strings are intentionally not stored.';
comment on table public.td_ai_search_demand is 'Normalized Texas search-demand signals used for editorial and Ask Texas AI coverage planning.';
comment on table public.td_ai_coverage_gaps is 'Aggregated demand/answerability gaps that feed TexasDefined BUILD/IMPROVE/TOOL planning.';
comment on table public.td_ai_eval_cases is 'Curated regression questions for Ask Texas AI quality and grounding evaluation.';
