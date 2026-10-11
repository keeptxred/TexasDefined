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
ROLLBACK;
