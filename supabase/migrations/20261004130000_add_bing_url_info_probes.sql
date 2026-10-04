alter table public.texasdefined_bing_webmaster_snapshots
  add column if not exists url_info jsonb not null default '[]'::jsonb;

comment on column public.texasdefined_bing_webmaster_snapshots.url_info is
  'Representative Bing Webmaster GetUrlInfo probes grouped by important site page family; server-only and contains no credentials or reader identifiers.';
