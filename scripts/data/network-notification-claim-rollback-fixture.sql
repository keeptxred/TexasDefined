-- Disposable PostgreSQL 16 only. Called from localhost-restricted Network replay.
-- Uses fake .invalid recipient and mock provider receipt. No Graph sends or production writes.
-- Must execute BEFORE committed synthetic Stripe delivery fixtures, while outbox is empty.
BEGIN;
SET LOCAL statement_timeout='8s';
DO $qa$
DECLARE
 v_id uuid;
 v_claim record;
 v_second record;
 v_wrong boolean;
 v_done boolean;
 v_replay boolean;
 v_status text;
 v_provider text;
 v_attempts integer;
 v_remaining integer;
BEGIN
 IF EXISTS(SELECT 1 FROM public.texasdefined_network_email_outbox) THEN
  RAISE EXCEPTION 'Outbox must be empty for isolated rollback-only fixture';
 END IF;
 IF has_function_privilege('anon','public.claim_texasdefined_network_notification(integer)','EXECUTE')
 OR has_function_privilege('authenticated','public.claim_texasdefined_network_notification(integer)','EXECUTE')
 OR has_function_privilege('anon','public.finish_texasdefined_network_notification(uuid,uuid,text,text,text)','EXECUTE')
 OR has_function_privilege('authenticated','public.finish_texasdefined_network_notification(uuid,uuid,text,text,text)','EXECUTE')
 THEN RAISE EXCEPTION 'Outbox claim or completion callable without service role'; END IF;

 INSERT INTO public.texasdefined_network_email_outbox
  (event_key,event_type,recipient_email,payload)
 VALUES ('rollback-only:success:'||gen_random_uuid()::text,'application_received',
         'network-qa@example.invalid','{"business_name":"Rollback Fixture"}'::jsonb)
 RETURNING id INTO v_id;
 SELECT * INTO v_claim FROM public.claim_texasdefined_network_notification(1);
 IF v_claim.id IS DISTINCT FROM v_id OR v_claim.attempts IS DISTINCT FROM 1
    OR v_claim.claim_token IS NULL THEN
  RAISE EXCEPTION 'Outbox first claim mismatch';
 END IF;
 SELECT count(*) INTO v_remaining FROM public.claim_texasdefined_network_notification(1);
 IF v_remaining<>0 THEN RAISE EXCEPTION 'Sending row claimed more than once'; END IF;
 SELECT public.finish_texasdefined_network_notification
  (v_id,gen_random_uuid(),'mock-provider-ack','sent',NULL) INTO v_wrong;
 IF v_wrong IS DISTINCT FROM false THEN RAISE EXCEPTION 'Wrong token accepted'; END IF;
 SELECT public.finish_texasdefined_network_notification
  (v_id,v_claim.claim_token,'mock-provider-ack','sent',NULL) INTO v_done;
 SELECT public.finish_texasdefined_network_notification
  (v_id,v_claim.claim_token,'mock-provider-ack','sent',NULL) INTO v_replay;
 IF v_done IS DISTINCT FROM true OR v_replay IS DISTINCT FROM false THEN
  RAISE EXCEPTION 'Ack or replay contract failed';
 END IF;
 SELECT status,provider_message_id,attempts INTO v_status,v_provider,v_attempts
 FROM public.texasdefined_network_email_outbox WHERE id=v_id;
 IF v_status<>'sent' OR v_provider<>'mock-provider-ack' OR v_attempts<>1 THEN
  RAISE EXCEPTION 'Persisted success receipt invalid';
 END IF;

 INSERT INTO public.texasdefined_network_email_outbox
  (event_key,event_type,recipient_email,payload)
 VALUES ('rollback-only:failure:'||gen_random_uuid()::text,'application_received',
         'network-qa@example.invalid','{"business_name":"Rollback Fixture"}'::jsonb)
 RETURNING id INTO v_id;
 SELECT * INTO v_second FROM public.claim_texasdefined_network_notification(1);
 IF v_second.id IS DISTINCT FROM v_id OR v_second.attempts IS DISTINCT FROM 1 THEN
  RAISE EXCEPTION 'Independent failed-message claim mismatch'; END IF;
 SELECT public.finish_texasdefined_network_notification
  (v_id,v_second.claim_token,NULL,'failed','mock-permanent-rejection') INTO v_done;
 IF v_done IS DISTINCT FROM true THEN RAISE EXCEPTION 'Definitive failure not recorded'; END IF;
 SELECT status,error_code INTO v_status,v_provider
 FROM public.texasdefined_network_email_outbox WHERE id=v_id;
 IF v_status<>'failed' OR v_provider<>'mock-permanent-rejection' THEN
  RAISE EXCEPTION 'Persisted rejection invalid'; END IF;

 INSERT INTO public.texasdefined_network_email_outbox
  (event_key,event_type,recipient_email,payload,attempts)
 VALUES ('rollback-only:exhausted:'||gen_random_uuid()::text,'application_received',
         'network-qa@example.invalid','{}'::jsonb,3);
 SELECT count(*) INTO v_remaining FROM public.claim_texasdefined_network_notification(10);
 IF v_remaining<>0 THEN RAISE EXCEPTION 'Exhausted retry unexpectedly reclaimed'; END IF;
 RAISE NOTICE 'OUTBOX CLAIM PASS: one claim, wrong token denied, success and failure terminal, replay denied, attempt limit respected; transaction rolls back';
END;
$qa$;
ROLLBACK;
