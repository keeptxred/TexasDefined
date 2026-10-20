-- Review-trigger sources for swimming and river tubing, based on the
-- October 17, 2026 manual review of a page-fingerprint change alert.
-- HTTP 200 or a changed body is not evidence of swim safety or open access.
-- Track the exact TPWD notices and the operator's operating/water-quality
-- pages as daily sources alongside the previously enrolled general sources.
INSERT INTO public.td_authority_verification_sources
  (path, source_url, label, cadence_days, next_check_at)
VALUES
  ('/explore/swimming-holes-river-tubing',
   'https://tpwd.texas.gov/state-parks/blanco/alert',
   'TPWD Blanco State Park current alerts: burn bans and water access advisories', 1, now()),
  ('/explore/swimming-holes-river-tubing',
   'https://wimberleyparksandrec.com/swimming-faqs/',
   'City of Wimberley Blue Hole swimming operating rules and weather/water closure policy', 1, now()),
  ('/explore/swimming-holes-river-tubing',
   'https://wimberleyparksandrec.com/blue-hole-water-quality-test/',
   'City of Wimberley Blue Hole dated E. coli swimming water quality results', 1, now())
ON CONFLICT (path, source_url) DO UPDATE SET
  label = excluded.label,
  cadence_days = excluded.cadence_days,
  next_check_at = least(public.td_authority_verification_sources.next_check_at, now());
