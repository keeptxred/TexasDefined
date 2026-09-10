-- Remove the abandoned TexasDefined reader-quality experiment left by stale PR #1683.
-- Current application code has no references to these objects, no cron job consumes them,
-- the reader-quality event table has never received rows, and the GA4 table contains only
-- the one historical seed row from 2026-09-06. Any future reader-quality implementation
-- must be rebuilt from current main with a real recurring ingestion path.

DROP VIEW IF EXISTS public.texasdefined_reader_quality_daily;
DROP TABLE IF EXISTS public.texasdefined_reader_quality_events;
DROP TABLE IF EXISTS public.texasdefined_ga4_daily_traffic;
