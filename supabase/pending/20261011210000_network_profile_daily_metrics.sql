-- PENDING ONE-CUTOVER NETWORK MIGRATION. DO NOT APPLY TO PRODUCTION ALONE.
-- Owner reporting: aggregate daily counters ONLY. No IP, device, visitor IDs,
-- referrer, user-agent, full URLs, raw event or browsing history retained.
BEGIN;
SET LOCAL lock_timeout='5s';
SET LOCAL statement_timeout='45s';

CREATE TABLE IF NOT EXISTS texasdefined_network_internal.profile_daily_metrics(
 application_id uuid NOT NULL REFERENCES public.texasdefined_network_applications(id) ON DELETE CASCADE,
 observed_on date NOT NULL DEFAULT (now() AT TIME ZONE 'UTC')::date,
 action text NOT NULL CHECK(action IN('profile_view','website_click','social_click','phone_click')),
 event_count bigint NOT NULL DEFAULT 0 CHECK(event_count>=0 AND event_count<=100000),
 PRIMARY KEY(application_id,observed_on,action)
);
ALTER TABLE texasdefined_network_internal.profile_daily_metrics ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON texasdefined_network_internal.profile_daily_metrics
 FROM PUBLIC,anon,authenticated,service_role;
CREATE INDEX IF NOT EXISTS network_profile_metrics_day_idx
 ON texasdefined_network_internal.profile_daily_metrics(observed_on);

CREATE OR REPLACE FUNCTION public.record_texasdefined_network_profile_metric(
 p_slug text,p_action text)
RETURNS boolean LANGUAGE plpgsql SECURITY DEFINER SET search_path TO ''
AS $function$
DECLARE target_id uuid;
BEGIN
 IF p_slug IS NULL OR length(p_slug)>120
   OR p_slug !~ '^[a-z0-9]+(-[a-z0-9]+)*$'
   OR p_action NOT IN('profile_view','website_click','social_click','phone_click')
 THEN RETURN false; END IF;
 SELECT l.application_id INTO target_id
 FROM public.texasdefined_network_public_listings l
 WHERE l.slug=p_slug AND l.is_published=true LIMIT 1;
 IF target_id IS NULL THEN RETURN false; END IF;
 INSERT INTO texasdefined_network_internal.profile_daily_metrics(
  application_id,observed_on,action,event_count)
 VALUES(target_id,(now() AT TIME ZONE 'UTC')::date,p_action,1)
 ON CONFLICT(application_id,observed_on,action) DO UPDATE
  SET event_count=LEAST(
   texasdefined_network_internal.profile_daily_metrics.event_count+1,100000);
 RETURN true;
END
$function$;

CREATE OR REPLACE FUNCTION public.get_texasdefined_network_profile_metrics(
 p_application_id uuid)
RETURNS TABLE(observed_on date,action text,event_count bigint)
LANGUAGE sql STABLE SECURITY DEFINER SET search_path TO ''
AS $function$
 SELECT m.observed_on,m.action,m.event_count
 FROM texasdefined_network_internal.profile_daily_metrics m
 WHERE m.application_id=p_application_id
  AND m.observed_on BETWEEN (now() AT TIME ZONE 'UTC')::date-29
                        AND (now() AT TIME ZONE 'UTC')::date
 ORDER BY m.observed_on ASC,m.action ASC;
$function$;

-- Keep exactly 35 UTC daily buckets (30-day reports + five days of
-- operational buffer). Each Cron call prunes at most 5000 oldest rows, and
-- concurrent Cron invocations cannot claim identical rows.
CREATE OR REPLACE FUNCTION public.prune_texasdefined_network_profile_metrics()
RETURNS integer LANGUAGE plpgsql SECURITY DEFINER SET search_path TO ''
AS $function$
DECLARE removed integer;
BEGIN
 WITH expired AS (
  SELECT m.application_id,m.observed_on,m.action
  FROM texasdefined_network_internal.profile_daily_metrics m
  WHERE m.observed_on < (now() AT TIME ZONE 'UTC')::date-34
  ORDER BY m.observed_on,m.application_id,m.action
  LIMIT 5000
  FOR UPDATE SKIP LOCKED
 )
 DELETE FROM texasdefined_network_internal.profile_daily_metrics target
 USING expired
 WHERE target.application_id=expired.application_id
   AND target.observed_on=expired.observed_on
   AND target.action=expired.action;
 GET DIAGNOSTICS removed=ROW_COUNT;
 RETURN removed;
END
$function$;

REVOKE ALL ON FUNCTION public.record_texasdefined_network_profile_metric(text,text)
 FROM PUBLIC,anon,authenticated;
REVOKE ALL ON FUNCTION public.get_texasdefined_network_profile_metrics(uuid)
 FROM PUBLIC,anon,authenticated;
GRANT EXECUTE ON FUNCTION public.record_texasdefined_network_profile_metric(text,text) TO service_role;
GRANT EXECUTE ON FUNCTION public.get_texasdefined_network_profile_metrics(uuid) TO service_role;
REVOKE ALL ON FUNCTION public.prune_texasdefined_network_profile_metrics()
 FROM PUBLIC,anon,authenticated;
GRANT EXECUTE ON FUNCTION public.prune_texasdefined_network_profile_metrics()
 TO service_role;
COMMIT;
