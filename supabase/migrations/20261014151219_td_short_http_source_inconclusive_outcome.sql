-- One accurate shared outcome for HTTP 2xx with insufficient content.
-- Never turn a short HTML body into a fact-verified source or lose failure history.
ALTER TABLE public.td_authority_verification_checks
  DROP CONSTRAINT td_authority_verification_checks_event_type_check;
ALTER TABLE public.td_authority_verification_checks
  ADD CONSTRAINT td_authority_verification_checks_event_type_check
  CHECK (event_type IN (
    'source_unchanged','source_changed','source_unreachable','source_baseline',
    'editorial_verified','editorial_due','source_binary_http_ok','source_inconclusive'));

ALTER TABLE public.td_authority_verification_registry
  DROP CONSTRAINT td_authority_verification_registry_status_check;
ALTER TABLE public.td_authority_verification_registry
  ADD CONSTRAINT td_authority_verification_registry_status_check
  CHECK (status IN (
    'awaiting_editorial_verification','verified','due','source_changed',
    'source_unreachable','source_inconclusive'));

CREATE OR REPLACE VIEW public.td_authority_verification_queue AS
SELECT r.path,r.topic,r.cadence_days,r.status,r.last_verified_at,r.next_review_at,
  count(s.source_url)::integer AS official_source_count,
  count(s.source_url) FILTER (WHERE s.result IN ('source_unreachable','source_inconclusive'))::integer AS source_errors,
  count(s.source_url) FILTER (WHERE s.result='source_changed')::integer AS changed_sources,
  max(s.last_checked_at) AS latest_source_probe_at,
  CASE
    WHEN count(s.source_url)=0 THEN 'MISSING_OFFICIAL_SOURCES'
    -- Keep the established review action string compatible with existing consumers.
    WHEN count(s.source_url) FILTER (WHERE s.result IN ('source_changed','source_unreachable','source_inconclusive')) > 0
      THEN 'SOURCE_CHANGED_OR_UNREACHABLE'
    WHEN r.last_verified_at IS NULL THEN 'INITIAL_EDITORIAL_VERIFICATION_REQUIRED'
    WHEN r.next_review_at <= now() THEN 'EDITORIAL_VERIFICATION_OVERDUE'
    ELSE 'CURRENTLY_VERIFIED'
  END AS review_action
FROM public.td_authority_verification_registry r
LEFT JOIN public.td_authority_verification_sources s ON s.path=r.path
GROUP BY r.path,r.topic,r.cadence_days,r.status,r.last_verified_at,r.next_review_at;

CREATE OR REPLACE FUNCTION td_maintenance.collect_source_probes()
RETURNS integer
LANGUAGE plpgsql
SET search_path TO ''
AS $function$
DECLARE
  rec RECORD;
  v_event TEXT;
  v_hash TEXT;
  v_n INTEGER := 0;
  v_mime TEXT;
BEGIN
  FOR rec IN
    SELECT s.path, s.source_url, s.fingerprint, s.pending_request_id,
      s.requested_at, r.status_code, r.content, r.content_type,
      r.error_msg, COALESCE(s.cadence_days, p.cadence_days) AS cadence_days
    FROM public.td_authority_verification_sources s
    JOIN public.td_authority_verification_registry p ON p.path=s.path
    LEFT JOIN net._http_response r ON r.id=s.pending_request_id
    WHERE s.pending_request_id IS NOT NULL
      AND (r.id IS NOT NULL OR s.requested_at < now() - interval '45 minutes')
    LIMIT 150
  LOOP
    v_mime := lower(trim(split_part(coalesce(rec.content_type,''),';',1)));
    IF rec.status_code BETWEEN 200 AND 299
      AND (v_mime LIKE 'image/%' OR v_mime = 'application/pdf') THEN
      v_hash := rec.fingerprint;
      v_event := 'source_binary_http_ok';
    ELSIF rec.status_code BETWEEN 200 AND 299
      AND rec.content IS NOT NULL AND length(rec.content)>100 THEN
      v_hash := md5(rec.content);
      v_event := CASE WHEN rec.fingerprint IS NULL THEN 'source_baseline'
        WHEN rec.fingerprint <> v_hash THEN 'source_changed'
        ELSE 'source_unchanged' END;
    ELSIF rec.status_code BETWEEN 200 AND 299 THEN
      -- An HTTP success containing <=100 characters is NOT a network failure.
      -- Preserve the last useful hash and require review of this thin/unreadable body.
      v_hash := rec.fingerprint;
      v_event := 'source_inconclusive';
    ELSE
      v_hash := rec.fingerprint;
      v_event := 'source_unreachable';
    END IF;
    INSERT INTO public.td_authority_verification_checks(path,source_url,event_type,details)
    VALUES(rec.path,rec.source_url,v_event,jsonb_build_object(
      'http_status',rec.status_code,
      'content_type',rec.content_type,
      'error',coalesce(rec.error_msg,''),
      'request_id',rec.pending_request_id
    ));
    UPDATE public.td_authority_verification_sources
    SET pending_request_id=NULL,requested_at=NULL,last_checked_at=now(),
      next_check_at=now()+make_interval(days=>rec.cadence_days),
      http_status=rec.status_code,fingerprint=v_hash,result=v_event,
      error_note=CASE WHEN v_event='source_inconclusive'
        THEN 'HTTP 2xx returned <=100 readable characters; reachability only, source content is unverified'
        ELSE rec.error_msg END
    WHERE path=rec.path AND source_url=rec.source_url;
    IF v_event IN ('source_changed','source_unreachable','source_inconclusive') THEN
      UPDATE public.td_authority_verification_registry
      SET status=v_event,updated_at=now()
      WHERE path=rec.path;
    END IF;
    v_n := v_n+1;
  END LOOP;
  -- Reconcile stale page failure only after EVERY source has been checked.
  -- Inconclusive is NOT factual verification and cannot advance acceptance.
  UPDATE public.td_authority_verification_registry p
  SET status = CASE
    WHEN EXISTS (SELECT 1 FROM public.td_authority_verification_sources s
      WHERE s.path=p.path AND s.result='source_unreachable') THEN 'source_unreachable'
    WHEN EXISTS (SELECT 1 FROM public.td_authority_verification_sources s
      WHERE s.path=p.path AND s.result='source_inconclusive') THEN 'source_inconclusive'
    WHEN EXISTS (SELECT 1 FROM public.td_authority_verification_sources s
      WHERE s.path=p.path AND s.result='source_changed') THEN 'source_changed'
    WHEN p.last_verified_at IS NULL THEN 'awaiting_editorial_verification'
    WHEN p.next_review_at <= now() THEN 'due'
    ELSE 'verified'
  END,
  updated_at = now()
  WHERE p.status IN ('source_unreachable','source_inconclusive')
    AND EXISTS (SELECT 1 FROM public.td_authority_verification_sources s
      WHERE s.path=p.path)
    AND NOT EXISTS (SELECT 1 FROM public.td_authority_verification_sources s
      WHERE s.path=p.path
        AND (s.pending_request_id IS NOT NULL OR s.last_checked_at IS NULL));

  RETURN v_n;
END
$function$;


-- Six previously recorded HTTP 200 short/empty bodies had been mislabeled
-- unreachable. Do not rewrite immutable old checks: append a separate
-- reclassification event while retaining the original HTTP observations.
WITH affected AS (
  SELECT path,source_url,http_status
  FROM public.td_authority_verification_sources
  WHERE result='source_unreachable' AND http_status BETWEEN 200 AND 299
), history AS (
  INSERT INTO public.td_authority_verification_checks(path,source_url,event_type,details)
  SELECT path,source_url,'source_inconclusive',
    jsonb_build_object('http_status',http_status,
      'reason','Historical HTTP 2xx short/unreadable body reclassified without source factual verification',
      'reclassification_only',true)
  FROM affected RETURNING path
)
UPDATE public.td_authority_verification_sources s
SET result='source_inconclusive',
    error_note='HTTP 2xx returned <=100 readable characters; reachability only, source content is unverified',
    next_check_at=LEAST(s.next_check_at,now()+interval '1 day')
WHERE s.result='source_unreachable' AND s.http_status BETWEEN 200 AND 299;

UPDATE public.td_authority_verification_registry p
SET status='source_inconclusive',updated_at=now()
WHERE p.status='source_unreachable'
  AND EXISTS (SELECT 1 FROM public.td_authority_verification_sources s
    WHERE s.path=p.path AND s.result='source_inconclusive')
  AND NOT EXISTS (SELECT 1 FROM public.td_authority_verification_sources s
    WHERE s.path=p.path AND s.result IN ('source_unreachable','source_changed'));

COMMENT ON FUNCTION td_maintenance.collect_source_probes() IS
'Classifies 2xx short responses as source_inconclusive, not source_unreachable; preserves fingerprints and editorial acceptance gates.';

-- Catch schema/logic drift before marking migration applied.
DO $verify$
BEGIN
 IF EXISTS (SELECT 1 FROM public.td_authority_verification_sources
   WHERE result='source_unreachable' AND http_status BETWEEN 200 AND 299) THEN
  RAISE EXCEPTION 'HTTP 2xx source incorrectly remains marked unreachable';
 END IF;
 IF NOT EXISTS (SELECT 1 FROM pg_get_functiondef('td_maintenance.collect_source_probes()'::regprocedure) f
   WHERE f LIKE '%source_inconclusive%') THEN
  RAISE EXCEPTION 'Collector failed to adopt inconclusive outcome';
 END IF;
END $verify$;
