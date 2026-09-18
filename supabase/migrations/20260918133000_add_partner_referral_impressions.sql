alter table if exists public.texasdefined_partner_referral_daily
  add column if not exists impression_count bigint not null default 0
  check (impression_count >= 0);

comment on column public.texasdefined_partner_referral_daily.impression_count is
  'Privacy-safe daily count of qualifying commercial CTA impressions synced from Cloudflare Analytics Engine.';

