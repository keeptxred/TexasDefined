alter table public.texasdefined_partner_referral_daily
  add column if not exists acquisition_source text not null default 'unknown'
  check (char_length(acquisition_source) between 1 and 80 and acquisition_source ~ '^[a-z0-9._-]+$');

alter table public.texasdefined_partner_referral_daily
  drop constraint if exists texasdefined_partner_referral_daily_pkey;

alter table public.texasdefined_partner_referral_daily
  add primary key (metric_date, partner, placement, page_path, destination_hash, acquisition_source);

create index if not exists texasdefined_partner_referral_daily_source_date_idx
  on public.texasdefined_partner_referral_daily (acquisition_source, metric_date desc);

comment on column public.texasdefined_partner_referral_daily.acquisition_source is
  'Privacy-safe coarse acquisition source such as google, bing, duckduckgo, chatgpt, or unknown; no visitor identifier or raw referrer URL.';
