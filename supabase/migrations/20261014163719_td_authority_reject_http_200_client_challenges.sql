-- Source monitor regression: HTTP 200 returned a 3KB Client Challenge,
-- not the Benjamin Houston Chronicle article (captured net response 7241).
-- Preserve audit history and reject recognized challenge markup in later probes.
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
  v_head TEXT;
  v_client_challenge BOOLEAN;
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
    -- Never certify publisher challenge HTML as editorial source content.
    v_head := lower(left(coalesce(rec.content,''),6000));
    v_client_challenge := rec.status_code BETWEEN 200 AND 299
      AND v_mime IN ('text/html','application/xhtml+xml')
      AND (position('<title>client challenge</title>' in v_head)>0
        OR position('/_fs-ch-' in v_head)>0
        OR position('cdn-cgi/challenge-platform/' in v_head)>0
        OR position('cf-chl-' in v_head)>0
        OR position('<title>just a moment...' in v_head)>0);
    IF rec.status_code BETWEEN 200 AND 299
      AND (v_mime LIKE 'image/%' OR v_mime = 'application/pdf') THEN
      v_hash := rec.fingerprint;
      v_event := 'source_binary_http_ok';
    ELSIF v_client_challenge THEN
      v_hash := rec.fingerprint;
      v_event := 'source_inconclusive';
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
      'request_id',rec.pending_request_id,
      'client_challenge_detected',v_client_challenge
    ));
    UPDATE public.td_authority_verification_sources
    SET pending_request_id=NULL,requested_at=NULL,last_checked_at=now(),
      next_check_at=now()+make_interval(days=>rec.cadence_days),
      http_status=rec.status_code,fingerprint=v_hash,result=v_event,
      error_note=CASE WHEN v_client_challenge
        THEN 'HTTP 2xx returned a publisher anti-bot client challenge, not a readable article; content is unverified'
        WHEN v_event='source_inconclusive'
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
$function$
;

WITH challenge_response AS (
 SELECT id FROM net._http_response WHERE id=7241 AND status_code=200
   AND position('<title>client challenge</title>' in lower(left(content,6000)))>0
), fixed AS (
 UPDATE public.td_authority_verification_sources s
 SET result='source_inconclusive',fingerprint=NULL,
     next_check_at=LEAST(s.next_check_at,now()+interval '1 day'),
     error_note='Confirmed HTTP 200 Client Challenge page, not article; captured response #7241, source requires recheck'
 FROM challenge_response r
 WHERE s.path='/texas-high-school-football-teams/benjamin'
   AND s.source_url='https://www.houstonchronicle.com/texas-sports-nation/hs-sports/football/article/State-HS-football-championship-recaps-Day-1-17653774.php'
   AND s.result='source_baseline'
 RETURNING s.path,s.source_url
)
INSERT INTO public.td_authority_verification_checks(path,source_url,event_type,details)
SELECT path,source_url,'source_inconclusive',jsonb_build_object(
  'http_status',200,'request_id',7241,'client_challenge_detected',true,
  'reclassification_only',true,'source_evidence','net._http_response 7241 has Client Challenge title; original source_baseline event preserved')
FROM fixed;

COMMENT ON FUNCTION td_maintenance.collect_source_probes() IS
'HTTP 2xx anti-bot challenges are source_inconclusive, not article baselines. Short responses also inconclusive. Neither outcome certifies factual truth.';

DO $verification$
BEGIN
 IF position('v_client_challenge' in pg_get_functiondef('td_maintenance.collect_source_probes()'::regprocedure))=0 THEN
  RAISE EXCEPTION 'Collector challenge detection not installed';
 END IF;
 IF EXISTS(SELECT 1 FROM net._http_response WHERE id=7241 AND status_code=200
    AND position('<title>client challenge</title>' in lower(left(content,6000)))>0)
 AND EXISTS(SELECT 1 FROM public.td_authority_verification_sources
    WHERE path='/texas-high-school-football-teams/benjamin'
    AND source_url='https://www.houstonchronicle.com/texas-sports-nation/hs-sports/football/article/State-HS-football-championship-recaps-Day-1-17653774.php'
    AND result='source_baseline') THEN
    RAISE EXCEPTION 'HTTP 200 client challenge incorrectly remains baseline';
 END IF;
END $verification$;
