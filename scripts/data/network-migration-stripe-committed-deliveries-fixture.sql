-- Cross-COMMIT webhook proof, only on disposable postgres:16 / network_replay.
-- Unlike the single-transaction rollback fixture, each simulated delivery here
-- commits separately so txid_current() notification keys cannot coalesce.
-- Synthetic .invalid addresses; no external Stripe, Graph or email operations.
-- GitHub Actions destroys the entire ephemeral database after completion.

-- Delivery 0: create a reviewed synthetic application (no payments).
BEGIN;
INSERT INTO public.texasdefined_network_applications
 (id,plan,status,intake_complete,business_name,category,city,contact_email)
VALUES ('dddddddd-dddd-4ddd-8ddd-dddddddddddd','plus','approved',true,
 'Cross-transaction Test Shop','Fixture','Katy','independent-deliveries@example.invalid');
COMMIT;

-- Delivery 1: independently verified paid subscription; activation commits.
BEGIN;
DO $activation$
DECLARE result text;
BEGIN
 result:=public.apply_texasdefined_network_stripe_event(
  'dddddddd-dddd-4ddd-8ddd-dddddddddddd','evt_separate_activation_001',
  'customer.subscription.created','sub_separate_one','cus_separate_one',true);
 IF result<>'processed' THEN RAISE EXCEPTION 'First separate activation failed: %',result; END IF;
 IF (SELECT count(*) FROM public.texasdefined_network_email_outbox WHERE event_type='membership_active')<>1
 THEN RAISE EXCEPTION 'First committed activation missing notification'; END IF;
 IF EXISTS(SELECT 1 FROM public.texasdefined_network_public_listings)
 THEN RAISE EXCEPTION 'Stripe alone published a listing'; END IF;
END
$activation$;
COMMIT;

-- Editorially approved separate publication; no Stripe calls.
BEGIN;
DO $publication$
DECLARE result jsonb;
BEGIN
 result:=public.finalize_texasdefined_network_publication(
  'dddddddd-dddd-4ddd-8ddd-dddddddddddd','separate-fixture-shop',
  '{"business_name":"Cross-transaction Test Shop","city":"Katy"}'::jsonb,
  null,ARRAY[]::text[]);
 IF result->>'status'<>'published'
 THEN RAISE EXCEPTION 'Approved publication did not commit: %',result; END IF;
END
$publication$;
COMMIT;

-- Delivery 2: independently committed payment failure must de-list promptly.
BEGIN;
DO $failure$
DECLARE result text;
BEGIN
 result:=public.apply_texasdefined_network_stripe_event(
  'dddddddd-dddd-4ddd-8ddd-dddddddddddd','evt_separate_failure_002',
  'invoice.payment_failed','sub_separate_one','cus_separate_one',false);
 IF result<>'processed' THEN RAISE EXCEPTION 'Separate payment failure not reconciled: %',result; END IF;
 IF EXISTS (SELECT 1 FROM public.texasdefined_network_public_listings
  WHERE application_id='dddddddd-dddd-4ddd-8ddd-dddddddddddd' AND is_published)
 OR NOT EXISTS (SELECT 1 FROM public.texasdefined_network_applications
  WHERE id='dddddddd-dddd-4ddd-8ddd-dddddddddddd'
  AND status='approved' AND paid_entitlement_active=false)
 THEN RAISE EXCEPTION 'Failed payment did not suspend entitled public listing'; END IF;
END
$failure$;
COMMIT;

-- Delivery 3: new current-state paid event restores entitlement but NOT visibility.
BEGIN;
DO $recovery$
DECLARE result text;
BEGIN
 result:=public.apply_texasdefined_network_stripe_event(
  'dddddddd-dddd-4ddd-8ddd-dddddddddddd','evt_separate_recovery_003',
  'invoice.paid','sub_separate_one','cus_separate_one',true);
 IF result<>'processed' THEN RAISE EXCEPTION 'Separate recovery failed: %',result; END IF;
 IF EXISTS (SELECT 1 FROM public.texasdefined_network_public_listings
  WHERE application_id='dddddddd-dddd-4ddd-8ddd-dddddddddddd' AND is_published)
 THEN RAISE EXCEPTION 'Paid recovery silently republished unreviewed listing'; END IF;
END
$recovery$;
COMMIT;

-- Delivery 4: a delayed duplicate, after recovery committed, cannot deactivate.
BEGIN;
DO $old_replay$
DECLARE result text;
BEGIN
 result:=public.apply_texasdefined_network_stripe_event(
  'dddddddd-dddd-4ddd-8ddd-dddddddddddd','evt_separate_failure_002',
  'invoice.payment_failed','sub_separate_one','cus_separate_one',false);
 IF result<>'already_processed' THEN RAISE EXCEPTION 'Old delivery not deduplicated: %',result; END IF;
 IF NOT EXISTS (SELECT 1 FROM public.texasdefined_network_applications
  WHERE id='dddddddd-dddd-4ddd-8ddd-dddddddddddd' AND paid_entitlement_active)
 THEN RAISE EXCEPTION 'Replayed stale event overrode restored subscription'; END IF;
END
$old_replay$;
COMMIT;

-- Independent terminal audit of COMMITTED, not rollback-only event transitions.
DO $cross_transaction_audit$
DECLARE active_count int; inactive_count int; tx_keys int;
BEGIN
 SELECT count(*) INTO active_count FROM public.texasdefined_network_email_outbox
 WHERE event_type='membership_active';
 SELECT count(*) INTO inactive_count FROM public.texasdefined_network_email_outbox
 WHERE event_type='membership_inactive';
 SELECT count(DISTINCT split_part(event_key,':',4)) INTO tx_keys
 FROM public.texasdefined_network_email_outbox
 WHERE event_type IN ('membership_active','membership_inactive');
 IF active_count<>2 OR inactive_count<>1 OR tx_keys<>3 THEN
   RAISE EXCEPTION 'Committed outbox transitions wrong: active %, inactive %, tx keys %',
    active_count,inactive_count,tx_keys;
 END IF;
 IF (SELECT count(*) FROM public.texasdefined_network_stripe_events)<>3 OR
    (SELECT count(*) FROM public.texasdefined_network_stripe_events WHERE processed_at IS NOT NULL)<>3
 THEN RAISE EXCEPTION 'Committed Stripe replay ledger mismatch'; END IF;
 IF EXISTS(SELECT 1 FROM public.texasdefined_network_public_listings
  WHERE application_id='dddddddd-dddd-4ddd-8ddd-dddddddddddd' AND is_published)
 THEN RAISE EXCEPTION 'Committed recovered listing was implicitly republished'; END IF;
 IF (SELECT count(*) FROM public.texasdefined_network_applications
  WHERE id='dddddddd-dddd-4ddd-8ddd-dddddddddddd' AND paid_entitlement_active)<>1
 THEN RAISE EXCEPTION 'Final paid state not retained after old webhook replay'; END IF;
 RAISE NOTICE 'STRIPE SEPARATE TRANSACTIONS PASS: active notifications %, inactive %, distinct tx keys %, processed events 3, published 0',
  active_count,inactive_count,tx_keys;
END
$cross_transaction_audit$;
SELECT 'STRIPE COMMITTED DELIVERY PASS: separate activated/failed/recovered webhook transactions, durable outbox 2+1, replay remains idempotent, listing stays unpublished; disposable DB only' AS result;
