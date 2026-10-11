-- Ephemeral isolated database only. Fake .invalid recipients. No Graph sends.
BEGIN;
SET LOCAL statement_timeout='8s';
DO $test$
DECLARE v_id uuid; v_claim record; v_done boolean; v_replay boolean; v_status text; v_count integer;
BEGIN
 IF has_function_privilege('anon','public.reconcile_texasdefined_network_notification(uuid,uuid,text,text,text,text)','EXECUTE')
 OR has_function_privilege('authenticated','public.reconcile_texasdefined_network_notification(uuid,uuid,text,text,text,text)','EXECUTE')
 OR has_table_privilege('anon','texasdefined_network_internal.notification_reconciliation_audit','SELECT')
 OR has_table_privilege('authenticated','texasdefined_network_internal.notification_reconciliation_audit','SELECT')
 OR has_table_privilege('service_role','texasdefined_network_internal.notification_reconciliation_audit','UPDATE')
 THEN RAISE EXCEPTION 'Manual reconciliation endpoint or ledger exposed'; END IF;
 -- One claim with mocked verified Sent Items evidence.
 INSERT INTO public.texasdefined_network_email_outbox(event_key,event_type,recipient_email,payload)
 VALUES('manual-sent:'||gen_random_uuid()::text,'application_received','network-qa@example.invalid','{}')
 RETURNING id INTO v_id;
 SELECT * INTO v_claim FROM public.claim_texasdefined_network_notification(1);
 IF v_claim.id IS DISTINCT FROM v_id THEN RAISE EXCEPTION 'Claim selection mismatch'; END IF;
 SELECT public.reconcile_texasdefined_network_notification(
   v_id,gen_random_uuid(),'sent_verified','mocked sent-item confirmation evidence','sole-admin','provider-id-123')
 INTO v_done;
 IF v_done THEN RAISE EXCEPTION 'Wrong token allowed reconciliation'; END IF;
 BEGIN
  PERFORM public.reconcile_texasdefined_network_notification(
   v_id,v_claim.claim_token,'sent_verified','mocked sent-item confirmation evidence','sole-admin',NULL);
  RAISE EXCEPTION 'Sent without provider reference succeeded';
 EXCEPTION WHEN raise_exception THEN
  IF SQLERRM NOT LIKE '%provider message reference mandatory%' THEN RAISE; END IF;
 END;
 SELECT public.reconcile_texasdefined_network_notification(
   v_id,v_claim.claim_token,'sent_verified','mocked sent-item confirmation evidence','sole-admin','provider-id-123')
 INTO v_done;
 SELECT public.reconcile_texasdefined_network_notification(
   v_id,v_claim.claim_token,'sent_verified','mocked sent-item confirmation evidence','sole-admin','provider-id-123')
 INTO v_replay;
 IF v_done IS DISTINCT FROM true OR v_replay IS DISTINCT FROM false THEN
  RAISE EXCEPTION 'Verified sent or idempotent replay failed'; END IF;
 SELECT status INTO v_status FROM public.texasdefined_network_email_outbox WHERE id=v_id;
 IF v_status<>'sent' THEN RAISE EXCEPTION 'Verified sent transition failed'; END IF;

 -- Explicit manual provider-confirmed non-delivery; retry is delayed and bounded.
 INSERT INTO public.texasdefined_network_email_outbox(event_key,event_type,recipient_email,payload)
 VALUES('manual-retry:'||gen_random_uuid()::text,'application_received','network-qa@example.invalid','{}')
 RETURNING id INTO v_id;
 SELECT * INTO v_claim FROM public.claim_texasdefined_network_notification(1);
 IF v_claim.id IS DISTINCT FROM v_id THEN RAISE EXCEPTION 'Retry claim mismatch'; END IF;
 SELECT public.reconcile_texasdefined_network_notification(
  v_id,v_claim.claim_token,'not_delivered_retry','mock provider confirmed this item not sent','sole-admin',NULL)
 INTO v_done;
 IF NOT v_done THEN RAISE EXCEPTION 'Verified non-delivery retry was denied'; END IF;
 IF EXISTS (SELECT 1 FROM public.texasdefined_network_email_outbox
   WHERE id=v_id AND (status<>'pending' OR claim_token IS NOT NULL
   OR claim_available_at < now()+interval '14 minutes'))
 THEN RAISE EXCEPTION 'Manual retry lease not safely reset with delay'; END IF;
 SELECT count(*) INTO v_count FROM public.claim_texasdefined_network_notification(1);
 IF v_count<>0 THEN RAISE EXCEPTION 'Manual retry bypassed scheduled delay'; END IF;

 -- Ambiguous provider state is suppressed, never requeued automatically.
 INSERT INTO public.texasdefined_network_email_outbox(event_key,event_type,recipient_email,payload)
 VALUES('manual-uncertain:'||gen_random_uuid()::text,'application_received','network-qa@example.invalid','{}')
 RETURNING id INTO v_id;
 SELECT * INTO v_claim FROM public.claim_texasdefined_network_notification(1);
 SELECT public.reconcile_texasdefined_network_notification(
  v_id,v_claim.claim_token,'suppress_uncertain','provider response remains ambiguous','sole-admin',NULL)
 INTO v_done;
 IF NOT v_done THEN RAISE EXCEPTION 'Suppression unsuccessful'; END IF;
 SELECT status INTO v_status FROM public.texasdefined_network_email_outbox WHERE id=v_id;
 IF v_status<>'suppressed' THEN RAISE EXCEPTION 'Ambiguous delivery was automatically retried'; END IF;
 SELECT count(*) INTO v_count FROM texasdefined_network_internal.notification_reconciliation_audit;
 IF v_count<>3 THEN RAISE EXCEPTION 'Expected three immutable manual reconciliation events, got %',v_count; END IF;
 RAISE NOTICE 'MANUAL GRAPH RECONCILIATION PASS: wrong-token denied, verified receipt, replay denied, manual backoff, ambiguous suppression, audit';
END
$test$;
ROLLBACK;
