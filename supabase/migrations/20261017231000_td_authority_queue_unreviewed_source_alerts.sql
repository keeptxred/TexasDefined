-- Show only source changes and errors which have not yet had a subsequent
-- editorial verification. Historical outcomes remain intact for audit.
-- This affects the authority review queue (not the source check ledger itself).
CREATE OR REPLACE VIEW public.td_authority_verification_queue AS
SELECT
  r.path,
  r.topic,
  r.cadence_days,
  r.status,
  r.last_verified_at,
  r.next_review_at,
  count(s.source_url)::integer AS official_source_count,
  count(s.source_url) FILTER (
    WHERE s.result IN ('source_unreachable', 'source_inconclusive')
      AND (r.last_verified_at IS NULL OR s.last_checked_at > r.last_verified_at)
  )::integer AS source_errors,
  count(s.source_url) FILTER (
    WHERE s.result = 'source_changed'
      AND (r.last_verified_at IS NULL OR s.last_checked_at > r.last_verified_at)
  )::integer AS changed_sources,
  max(s.last_checked_at) AS latest_source_probe_at,
  CASE
    WHEN count(s.source_url) = 0 THEN 'MISSING_OFFICIAL_SOURCES'
    WHEN count(s.source_url) FILTER (
      WHERE s.result IN ('source_changed', 'source_unreachable', 'source_inconclusive')
        AND (r.last_verified_at IS NULL OR s.last_checked_at > r.last_verified_at)
    ) > 0 THEN 'SOURCE_CHANGED_OR_UNREACHABLE'
    WHEN r.last_verified_at IS NULL THEN 'INITIAL_EDITORIAL_VERIFICATION_REQUIRED'
    WHEN r.next_review_at <= now() THEN 'EDITORIAL_VERIFICATION_OVERDUE'
    ELSE 'CURRENTLY_VERIFIED'
  END AS review_action
FROM public.td_authority_verification_registry r
LEFT JOIN public.td_authority_verification_sources s ON s.path = r.path
GROUP BY r.path, r.topic, r.cadence_days, r.status, r.last_verified_at, r.next_review_at;

COMMENT ON VIEW public.td_authority_verification_queue IS
'Actionable official-source alerts only: historical changes/errors remain in the source ledger but cease blocking a page after later editorial verification. New changes after verification are still flagged.';
