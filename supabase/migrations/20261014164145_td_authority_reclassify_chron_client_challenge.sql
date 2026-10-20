-- Cross-site follow-up: a second stored HTTP 200 response was not the
-- Chron article about Newman's Castle, but another 3,036-byte Client Challenge.
-- Evidence: request 7178, original source check 2098 (2026-10-14).
-- Preserve immutable check history; reclassify only after verifying body.
WITH observed AS (
 SELECT id FROM net._http_response WHERE id=7178 AND status_code=200
  AND position('<title>client challenge</title>' in lower(left(content,6000)))>0
), reclassified AS (
 UPDATE public.td_authority_verification_sources s
 SET result='source_inconclusive',fingerprint=NULL,
     next_check_at=LEAST(s.next_check_at,now()+interval '1 day'),
     error_note='Confirmed HTTP 200 Client Challenge from stored response #7178; not a readable Chron article'
 FROM observed r
 WHERE s.path='/article/newmans-castle-bellville-texas'
   AND s.source_url='https://www.chron.com/culture/article/newmans-castle-texas-bellville-22321241.php'
   AND s.result='source_baseline'
 RETURNING s.path,s.source_url
)
INSERT INTO public.td_authority_verification_checks(path,source_url,event_type,details)
SELECT path,source_url,'source_inconclusive',jsonb_build_object(
 'http_status',200,'request_id',7178,'client_challenge_detected',true,
 'reclassification_only',true,'source_evidence','Archived HTTP 200 is a 3036-byte HTML Client Challenge, not the Chron article; previous source_baseline event retained')
FROM reclassified;

DO $verify$
BEGIN
 IF EXISTS (SELECT 1 FROM net._http_response WHERE id=7178 AND status_code=200
    AND position('<title>client challenge</title>' in lower(left(content,6000)))>0)
 AND EXISTS(SELECT 1 FROM public.td_authority_verification_sources
   WHERE path='/article/newmans-castle-bellville-texas'
    AND source_url='https://www.chron.com/culture/article/newmans-castle-texas-bellville-22321241.php'
    AND result='source_baseline') THEN
    RAISE EXCEPTION 'Chron HTTP 200 challenge incorrectly remains article baseline';
 END IF;
END $verify$;
