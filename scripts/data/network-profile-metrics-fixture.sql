-- Exclusive disposable PostgreSQL verification. Nothing is persisted.
BEGIN;
DO $fixture$
DECLARE did_record boolean; visible_count integer;
BEGIN
 IF to_regclass('texasdefined_network_internal.profile_daily_metrics') IS NULL
 THEN RAISE EXCEPTION 'Missing private aggregate metrics'; END IF;
 IF NOT (SELECT relrowsecurity FROM pg_class WHERE oid='texasdefined_network_internal.profile_daily_metrics'::regclass)
 THEN RAISE EXCEPTION 'Metrics RLS missing'; END IF;
 IF has_table_privilege('anon','texasdefined_network_internal.profile_daily_metrics','SELECT')
 OR has_table_privilege('authenticated','texasdefined_network_internal.profile_daily_metrics','SELECT')
 OR has_table_privilege('service_role','texasdefined_network_internal.profile_daily_metrics','SELECT')
 THEN RAISE EXCEPTION 'Private Network metrics are directly readable by API roles'; END IF;
 IF has_function_privilege('anon','public.record_texasdefined_network_profile_metric(text,text)','EXECUTE')
 OR has_function_privilege('authenticated','public.record_texasdefined_network_profile_metric(text,text)','EXECUTE')
 OR has_function_privilege('anon','public.get_texasdefined_network_profile_metrics(uuid)','EXECUTE')
 OR has_function_privilege('authenticated','public.get_texasdefined_network_profile_metrics(uuid)','EXECUTE')
 THEN RAISE EXCEPTION 'Metrics function leaked to an untrusted role'; END IF;
 IF NOT has_function_privilege('service_role','public.record_texasdefined_network_profile_metric(text,text)','EXECUTE')
 OR NOT has_function_privilege('service_role','public.get_texasdefined_network_profile_metrics(uuid)','EXECUTE')
 THEN RAISE EXCEPTION 'Service-only metrics RPC grants missing'; END IF;
 SELECT public.record_texasdefined_network_profile_metric('nonexistent-synthetic-profile','profile_view')
 INTO did_record;
 IF did_record THEN RAISE EXCEPTION 'Unpublished or unknown profile counted'; END IF;
 SELECT public.record_texasdefined_network_profile_metric('invalid..slug','profile_view')
 INTO did_record;
 IF did_record THEN RAISE EXCEPTION 'Invalid profile slug counted'; END IF;
 SELECT public.record_texasdefined_network_profile_metric('nonexistent-synthetic-profile','other')
 INTO did_record;
 IF did_record THEN RAISE EXCEPTION 'Invalid action counted'; END IF;
 SELECT count(*) INTO visible_count FROM
 public.get_texasdefined_network_profile_metrics('11111111-1111-4111-8111-111111111111'::uuid);
 IF visible_count<>0 THEN RAISE EXCEPTION 'Foreign account synthetic test returned data'; END IF;
END;
$fixture$;
-- Exercise real event recording, exact owner-business partitioning, and
-- unpublished protection against two synthetic, transaction-only listings.
INSERT INTO public.texasdefined_network_applications

 (id,plan,status,intake_complete,business_name,category,city,contact_email,
  terms_version,terms_snapshot_sha256,terms_accepted_at,
  representative_authority_accepted,facts_responsibility_accepted,
  media_responsibility_accepted,search_indexing_accepted)
VALUES
 -- Test-only synthetic contract snapshots satisfy the same NOT NULL and
 -- acceptance CHECKs as real submitted records. These are NOT actual people,
 -- legal acceptances, or release evidence, and roll back in this transaction.
 ('abababab-abab-4bab-8bab-abababababab','basic','approved',true,
  'Aggregates Test A','Fixture','Austin','network-stats-a@example.invalid',
  'synthetic-fixture-v1',repeat('a',64),now(),true,true,true,true),
 ('cdcdcdcd-cdcd-4dcd-8dcd-cdcdcdcdcdcd','basic','approved',true,
  'Aggregates Test B','Fixture','Dallas','network-stats-b@example.invalid',
  'synthetic-fixture-v1',repeat('b',64),now(),true,true,true,true);
INSERT INTO public.texasdefined_network_public_listings
 (application_id,slug,plan,profile,is_published)
VALUES
 ('abababab-abab-4bab-8bab-abababababab','metrics-fixture-a','basic',
  '{"business_name":"Aggregates Test A"}'::jsonb,true),
 ('cdcdcdcd-cdcd-4dcd-8dcd-cdcdcdcdcdcd','metrics-fixture-b','basic',
  '{"business_name":"Aggregates Test B"}'::jsonb,true);
-- Service callers can use the RPC but never directly select any raw metric.
SET LOCAL ROLE service_role;
DO $service$
DECLARE recorded boolean; n bigint; other_count bigint;
BEGIN
 SELECT public.record_texasdefined_network_profile_metric('metrics-fixture-a','profile_view') INTO recorded;
 IF recorded IS DISTINCT FROM true THEN RAISE EXCEPTION 'Service metrics view did not record'; END IF;
 SELECT public.record_texasdefined_network_profile_metric('metrics-fixture-a','profile_view') INTO recorded;
 SELECT public.record_texasdefined_network_profile_metric('metrics-fixture-a','website_click') INTO recorded;
 SELECT public.record_texasdefined_network_profile_metric('metrics-fixture-b','social_click') INTO recorded;
 SELECT coalesce(sum(event_count),0) INTO n
 FROM public.get_texasdefined_network_profile_metrics('abababab-abab-4bab-8bab-abababababab');
 IF n<>3 THEN RAISE EXCEPTION 'Wrong business A aggregate count %',n; END IF;
 SELECT coalesce(sum(event_count),0) INTO other_count
 FROM public.get_texasdefined_network_profile_metrics('cdcdcdcd-cdcd-4dcd-8dcd-cdcdcdcdcdcd');
 IF other_count<>1 THEN RAISE EXCEPTION 'Cross-owner counter contamination %',other_count; END IF;
END
$service$;
RESET ROLE;
UPDATE public.texasdefined_network_public_listings
 SET is_published=false WHERE slug='metrics-fixture-a';
SET LOCAL ROLE service_role;
DO $unpublished$
DECLARE accepted boolean;
BEGIN
 SELECT public.record_texasdefined_network_profile_metric('metrics-fixture-a','website_click') INTO accepted;
 IF accepted IS DISTINCT FROM false
 THEN RAISE EXCEPTION 'Unpublished listing accepted a new performance event'; END IF;
END
$unpublished$;
RESET ROLE;
DO $check$
DECLARE v bigint; other_count bigint;
BEGIN
 SELECT event_count INTO v
 FROM texasdefined_network_internal.profile_daily_metrics
 WHERE application_id='abababab-abab-4bab-8bab-abababababab' AND action='profile_view'
   AND observed_on=(now() AT TIME ZONE 'UTC')::date;
 IF v<>2 THEN RAISE EXCEPTION 'Daily UPSERT atomic increment regression, got %',v; END IF;
 SELECT count(*) INTO other_count
 FROM texasdefined_network_internal.profile_daily_metrics
 WHERE application_id='cdcdcdcd-cdcd-4dcd-8dcd-cdcdcdcdcdcd' AND action='social_click';
 IF other_count<>1 THEN RAISE EXCEPTION 'Second business was not recorded independently'; END IF;
END
$check$;
-- Retention is service-only, bounded, and never deletes the 30-day report.
INSERT INTO texasdefined_network_internal.profile_daily_metrics(
 application_id,observed_on,action,event_count)
VALUES('abababab-abab-4bab-8bab-abababababab',
 (now() AT TIME ZONE 'UTC')::date-40,'profile_view',12);
SET LOCAL ROLE anon;
DO $privacy$
BEGIN
 IF has_function_privilege('anon','public.prune_texasdefined_network_profile_metrics()','EXECUTE')
 THEN RAISE EXCEPTION 'Anonymous user can prune business history'; END IF;
END
$privacy$;
RESET ROLE;
SET LOCAL ROLE service_role;
DO $retention$
DECLARE removed integer; recent integer;
BEGIN
 SELECT public.prune_texasdefined_network_profile_metrics() INTO removed;
 IF removed<>1 THEN RAISE EXCEPTION 'Expected to prune one stale row, got %',removed; END IF;
 SELECT count(*) INTO recent FROM public.get_texasdefined_network_profile_metrics(
  'abababab-abab-4bab-8bab-abababababab'::uuid);
 IF recent<>2 THEN RAISE EXCEPTION 'Retention damaged recent paid-owner reporting'; END IF;
 SELECT public.prune_texasdefined_network_profile_metrics() INTO removed;
 IF removed<>0 THEN RAISE EXCEPTION 'Retention not idempotent, second batch removed %',removed; END IF;
END
$retention$;
RESET ROLE;
ROLLBACK;
