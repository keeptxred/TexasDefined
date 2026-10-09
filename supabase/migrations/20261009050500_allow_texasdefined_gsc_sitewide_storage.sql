-- Allow the shared sitewide Search Console storage to hold metrics and
-- inspection rows for both owned domains. Existing rows remain valid and the
-- path/primary-key/RLS contracts are unchanged.

alter table public.gsc_page_daily_metrics
  drop constraint if exists gsc_page_daily_metrics_url_check;

alter table public.gsc_page_daily_metrics
  add constraint gsc_page_daily_metrics_url_check
  check (url ~ '^https://(keeptxred|texasdefined)[.]com(?:/|$)');

alter table public.gsc_url_inspection
  drop constraint if exists gsc_url_inspection_url_check;

alter table public.gsc_url_inspection
  add constraint gsc_url_inspection_url_check
  check (url ~ '^https://(keeptxred|texasdefined)[.]com(?:/|$)');
