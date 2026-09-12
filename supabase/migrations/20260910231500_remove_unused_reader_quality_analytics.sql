-- Remove the abandoned reader-quality analytics experiment from stale PR #1683.
-- Current application code has no collector or reader for these objects, and live
-- inspection on 2026-09-10 found no collected reader-quality events.
drop view if exists public.texasdefined_reader_quality_daily;
drop table if exists public.texasdefined_ga4_daily_traffic;
drop table if exists public.texasdefined_reader_quality_events;
