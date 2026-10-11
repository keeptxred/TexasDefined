-- Network Notification Outbox / service-only transactional fixture.
-- Executed and passed once on 2026-10-10 (local; 2026-10-11 UTC), rollback-only.
-- Requires an EMPTY Network notification outbox and privileged operator.
-- No Microsoft 365 connection, no email send, no live customer or charge.
-- This validates one claim, attempt count, invalid token, final success and replay.
-- Not a test of Graph delivery, concurrent workers, or crash recovery.
BEGIN;
SET LOCAL statement_timeout='8s';
DO $qa$
DECLARE
 v_id uuid;
 v_claim record;
 v_wrong boolean;
 v_done boolean;
 v_replay boolean;
 v_status text;
 v_provider text;
BEGIN
 IF EXISTS(SELECT 1 FROM public.texasdefined_network_email_outbox) THEN
  RAISE EXCEPTION 'Outbox must be empty for isolated rollback-only fixture';
 END IF;
 INSERT INTO public.texasdefined_network_email_outbox
  (event_key,event_type,recipient_email,payload)
 VALUES ('rollback-only:'||gen_random_uuid()::text,'application_received',
         'network-qa@example.invalid','{"business_name":"Rollback Fixture"}'::jsonb)
 RETURNING id INTO v_id;
 SELECT * INTO v_claim FROM public.claim_texasdefined_network_notification(1);
 IF v_claim.id IS DISTINCT FROM v_id OR v_claim.attempts IS DISTINCT FROM 1
    OR v_claim.claim_token IS NULL THEN
  RAISE EXCEPTION 'Outbox claim mismatch';
 END IF;
 SELECT public.finish_texasdefined_network_notification
   (v_id,gen_random_uuid(),'graph-mock-ack','sent',NULL) INTO v_wrong;
 IF v_wrong IS DISTINCT FROM false THEN RAISE EXCEPTION 'Wrong token accepted'; END IF;
 SELECT public.finish_texasdefined_network_notification
   (v_id,v_claim.claim_token,'graph-mock-ack','sent',NULL) INTO v_done;
 SELECT public.finish_texasdefined_network_notification
   (v_id,v_claim.claim_token,'graph-mock-ack','sent',NULL) INTO v_replay;
 IF v_done IS DISTINCT FROM true OR v_replay IS DISTINCT FROM false THEN
  RAISE EXCEPTION 'Ack or replay contract failed';
 END IF;
 SELECT status,provider_message_id INTO v_status,v_provider
 FROM public.texasdefined_network_email_outbox WHERE id=v_id;
 IF v_status <> 'sent' OR v_provider <> 'graph-mock-ack' THEN
  RAISE EXCEPTION 'Persisted acknowledgment invalid';
 END IF;
END;
$qa$;
ROLLBACK;
