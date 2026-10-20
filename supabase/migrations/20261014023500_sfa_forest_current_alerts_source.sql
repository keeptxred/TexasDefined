-- Stephen F. Austin Experimental Forest: enroll the current USFS Texas
-- alerts/closure-order index as a recurring authoritative source.
-- The older /r08/texas/about-area/closure-orders URL returned HTTP 404
-- on 2026-10-13; the canonical /r08/texas/alerts index returned HTTP 200.
-- Official SFA Forest Order PDFs linked from the Research Station overview
-- state they expired on 2024-12-31 and do not prove active restrictions.
INSERT INTO public.td_authority_verification_sources (path, source_url, label, next_check_at)
SELECT '/destination/stephen-f-austin-experimental-forest',
       'https://www.fs.usda.gov/r08/texas/alerts',
       'USFS National Forests and Grasslands in Texas active alerts and closure orders',
       now()
WHERE EXISTS (
  SELECT 1
  FROM public.td_authority_verification_registry
  WHERE path = '/destination/stephen-f-austin-experimental-forest'
)
ON CONFLICT (path, source_url) DO UPDATE SET label = EXCLUDED.label;
