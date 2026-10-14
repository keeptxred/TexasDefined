-- Support topic-sensitive source intervals within the EXISTING Supabase authority tracker.
-- Preserve page-level editorial verification, next_review_at, source fingerprint
-- history, HTTP-denial outcome semantics, existing cron jobs, and current 1..90
-- day outer editorial SLA. Never treat an HTTP source probe as a fact check.
ALTER TABLE public.td_authority_verification_sources
  ADD COLUMN IF NOT EXISTS cadence_days integer;

DO $
BEGIN
 IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conrelid='public.td_authority_verification_sources'::regclass AND conname='td_authority_source_cadence_bounds') THEN
  ALTER TABLE public.td_authority_verification_sources
    ADD CONSTRAINT td_authority_source_cadence_bounds
    CHECK (cadence_days IS NULL OR cadence_days BETWEEN 1 AND 90);
 END IF;
END $;

COMMENT ON COLUMN public.td_authority_verification_sources.cadence_days IS
'Nullable source-specific HTTP probe interval (1..90 days); NULL inherits the parent page cadence. HTTP reachability does NOT establish factual or editorial verification.';

-- Assign only the 11 approved city paths. Existing noncity rows stay NULL and
-- keep their established per-page schedules; no competing source registry.
-- Visitor transport is volatile, school/utilities/airports change periodically,
-- annual Census estimates and municipal boundary interpretation use 90 days.
UPDATE public.td_authority_verification_sources s
SET cadence_days = CASE
    WHEN lower(s.label) LIKE '%airport%' THEN 30
    WHEN lower(s.label) LIKE '%transit%' OR lower(s.label) LIKE '%capmetro%' THEN 14
    WHEN lower(s.label) LIKE '%school%' OR lower(s.label) LIKE '%district%' THEN 30
    WHEN lower(s.label) LIKE '%utility%' OR lower(s.label) LIKE '%water%' THEN 30
    ELSE 90
  END,
  next_check_at = CASE
    WHEN s.last_checked_at IS NULL THEN s.next_check_at
    ELSE LEAST(
      s.next_check_at,
      s.last_checked_at + make_interval(days => CASE
        WHEN lower(s.label) LIKE '%airport%' THEN 30
        WHEN lower(s.label) LIKE '%transit%' OR lower(s.label) LIKE '%capmetro%' THEN 14
        WHEN lower(s.label) LIKE '%school%' OR lower(s.label) LIKE '%district%' THEN 30
        WHEN lower(s.label) LIKE '%utility%' OR lower(s.label) LIKE '%water%' THEN 30
        ELSE 90
      END)
    )
  END
WHERE s.path IN (
  '/city/houston','/city/dallas','/city/fort-worth','/city/austin',
  '/city/san-antonio','/city/el-paso','/city/arlington','/city/hurst',
  '/city/corpus-christi','/city/plano','/city/lubbock'
)
AND s.cadence_days IS NULL;

-- Retain the complete previous collector's binary-PDF, fingerprint and
-- stale-recovery behavior; change ONLY the cadence selection to prefer
-- the source override while keeping NULL fallback for every other page.

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
      error_note=rec.error_msg
    WHERE path=rec.path AND source_url=rec.source_url;
    IF v_event IN ('source_changed','source_unreachable') THEN
      UPDATE public.td_authority_verification_registry
      SET status=v_event,updated_at=now()
      WHERE path=rec.path;
    END IF;
    v_n := v_n+1;
  END LOOP;
  -- A recovered source must clear a stale unreachable page flag only after
  -- every tracked source has been checked and no probe is outstanding. Never
  -- equate HTTP reachability with completed factual/editorial verification.
  UPDATE public.td_authority_verification_registry p
  SET status = CASE
    WHEN EXISTS (
      SELECT 1 FROM public.td_authority_verification_sources s
      WHERE s.path=p.path AND s.result='source_changed'
    ) THEN 'source_changed'
    WHEN p.last_verified_at IS NULL THEN 'awaiting_editorial_verification'
    WHEN p.next_review_at <= now() THEN 'due'
    ELSE 'verified'
  END,
  updated_at = now()
  WHERE p.status='source_unreachable'
    AND EXISTS (
      SELECT 1 FROM public.td_authority_verification_sources s
      WHERE s.path=p.path
    )
    AND NOT EXISTS (
      SELECT 1 FROM public.td_authority_verification_sources s
      WHERE s.path=p.path AND (
        s.result='source_unreachable'
        OR s.pending_request_id IS NOT NULL
        OR s.last_checked_at IS NULL
      )
    );

  RETURN v_n;
END
$function$;
