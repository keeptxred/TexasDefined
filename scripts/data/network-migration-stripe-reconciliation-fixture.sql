-- Only executed after the 34 tracked migrations in disposable localhost
-- network_replay PostgreSQL. No Stripe APIs, emails or real customers.
-- ALL rows and notification outbox events are rolled back.
BEGIN;
INSERT INTO public.texasdefined_network_applications
 (id,plan,status,intake_complete,business_name,category,city,contact_email)
VALUES
 ('aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa','plus','approved',true,'Simulated Plus Shop','Fixture','Katy','billing-one@example.invalid'),
 ('bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb','plus','approved',true,'Unrelated Plus Shop','Fixture','Austin','billing-two@example.invalid'),
 ('cccccccc-cccc-4ccc-8ccc-cccccccccccc','basic','approved',true,'Basic Fixture Shop','Fixture','Dallas','billing-basic@example.invalid');

DO $stripe_initial$
DECLARE result text; published jsonb;
BEGIN
  -- An unrelated / ineligible app must not generate a Stripe ledger row.
  result:=public.apply_texasdefined_network_stripe_event(
   'cccccccc-cccc-4ccc-8ccc-cccccccccccc','evt_basic_001',
   'customer.subscription.created','sub_ignored_basic','cus_ignored_basic',true);
  IF result<>'ignored' THEN RAISE EXCEPTION 'Basic app accepted paid subscription: %',result; END IF;
  result:=public.apply_texasdefined_network_stripe_event(
   'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa','evt_unexpected_001',
   'customer.source.created','sub_sample_one','cus_sample_one',true);
  IF result<>'ignored' THEN RAISE EXCEPTION 'Unknown event type accepted: %',result; END IF;
  IF (SELECT count(*) FROM public.texasdefined_network_stripe_events)<>0 THEN
    RAISE EXCEPTION 'Ignored events polluted Stripe idempotency ledger'; END IF;

  -- A successful, independently verified Stripe event can activate entitlement.
  result:=public.apply_texasdefined_network_stripe_event(
   'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa','evt_activation_001',
   'customer.subscription.created','sub_sample_one','cus_sample_one',true);
  IF result<>'processed' THEN RAISE EXCEPTION 'Valid entitlement activation failed: %',result; END IF;
  IF NOT EXISTS (SELECT 1 FROM public.texasdefined_network_applications
   WHERE id='aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa'
   AND paid_entitlement_active AND stripe_subscription_id='sub_sample_one'
   AND stripe_customer_id='cus_sample_one' AND status='approved')
  THEN RAISE EXCEPTION 'Activation did not bind customer/subscription safely'; END IF;

  -- Publication remains a separate, explicitly reviewed service-only step.
  IF EXISTS (SELECT 1 FROM public.texasdefined_network_public_listings)
    THEN RAISE EXCEPTION 'Stripe payment automatically published an unreviewed listing'; END IF;
  published:=public.finalize_texasdefined_network_publication(
   'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa','synthetic-shop-one',
   '{"business_name":"Simulated Plus Shop","city":"Katy"}'::jsonb,null,ARRAY[]::text[]);
  IF published->>'status'<>'published' THEN RAISE EXCEPTION 'Approved paid publication failed: %',published; END IF;
  IF NOT EXISTS(SELECT 1 FROM public.texasdefined_network_public_listings
    WHERE application_id='aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa' AND is_published)
   THEN RAISE EXCEPTION 'Published flag not committed'; END IF;
END
$stripe_initial$;

DO $stripe_replay$
DECLARE result text;
BEGIN
  -- A duplicate event must not overwrite newer or existing entitlement state.
  result:=public.apply_texasdefined_network_stripe_event(
   'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa','evt_activation_001',
   'customer.subscription.created','sub_sample_one','cus_sample_one',false);
  IF result<>'already_processed' THEN RAISE EXCEPTION 'Duplicate event was not deduplicated: %',result; END IF;
  IF NOT EXISTS (SELECT 1 FROM public.texasdefined_network_applications
    WHERE id='aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa' AND paid_entitlement_active)
   THEN RAISE EXCEPTION 'Duplicate stale event revoked active entitlement'; END IF;
  -- A valid-looking but different Stripe subscription / customer must fail closed.
  result:=public.apply_texasdefined_network_stripe_event(
   'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa','evt_foreign_sub_002',
   'customer.subscription.updated','sub_foreign_two','cus_sample_one',true);
  IF result<>'mismatch' THEN RAISE EXCEPTION 'Foreign Stripe subscription accepted: %',result; END IF;
  result:=public.apply_texasdefined_network_stripe_event(
   'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa','evt_foreign_customer_003',
   'customer.subscription.updated','sub_sample_one','cus_foreign_two',true);
  IF result<>'mismatch' THEN RAISE EXCEPTION 'Foreign customer accepted: %',result; END IF;
  IF (SELECT count(*) FROM public.texasdefined_network_stripe_events)<>1
   THEN RAISE EXCEPTION 'Failed ownership checks polluted Stripe ledger'; END IF;
  BEGIN
    PERFORM public.apply_texasdefined_network_stripe_event(
     'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa','bogus-id',
     'customer.subscription.updated','sub_sample_one','cus_sample_one',true);
    RAISE EXCEPTION 'Unverified Stripe event ID was accepted';
  EXCEPTION WHEN raise_exception THEN
    -- A malformed verified-event fixture must fail; an *accidental* assertion
    -- failure also has SQLSTATE P0001, so check text to avoid false positives.
    IF SQLERRM <> 'Invalid verified subscription input' THEN RAISE; END IF;
  END;
END
$stripe_replay$;

DO $stripe_failure$
DECLARE result text;
BEGIN
  result:=public.apply_texasdefined_network_stripe_event(
   'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa','evt_failure_004',
   'invoice.payment_failed','sub_sample_one','cus_sample_one',false);
  IF result<>'processed' THEN RAISE EXCEPTION 'Failed payment reconciliation failed: %',result; END IF;
  IF NOT EXISTS (SELECT 1 FROM public.texasdefined_network_applications
   WHERE id='aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa'
   AND NOT paid_entitlement_active AND status='approved')
   OR EXISTS (SELECT 1 FROM public.texasdefined_network_public_listings
     WHERE application_id='aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa' AND is_published)
  THEN RAISE EXCEPTION 'Failed payment left public listing/entitlement enabled'; END IF;
  -- Deduplicating a failed event must not duplicate a deactivation notification.
  result:=public.apply_texasdefined_network_stripe_event(
   'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa','evt_failure_004',
   'invoice.payment_failed','sub_sample_one','cus_sample_one',false);
  IF result<>'already_processed' THEN RAISE EXCEPTION 'Payment failure webhook replay was processed twice'; END IF;
END
$stripe_failure$;

DO $stripe_recovery$
DECLARE result text; publication jsonb;
BEGIN
  result:=public.apply_texasdefined_network_stripe_event(
   'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa','evt_recovery_005',
   'invoice.paid','sub_sample_one','cus_sample_one',true);
  IF result<>'processed' THEN RAISE EXCEPTION 'Paid renewal did not restore entitlement: %',result; END IF;
  IF EXISTS(SELECT 1 FROM public.texasdefined_network_public_listings
    WHERE application_id='aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa' AND is_published)
  THEN RAISE EXCEPTION 'Recovery automatically republished without editorial action'; END IF;
  publication:=public.finalize_texasdefined_network_publication(
   'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa','ignored-new-slug',
   '{"business_name":"Unreviewed Overwrite"}'::jsonb,null,ARRAY[]::text[]);
  IF publication->>'status'<>'republished' THEN RAISE EXCEPTION 'Approved re-publication failed: %',publication; END IF;
  IF NOT EXISTS(SELECT 1 FROM public.texasdefined_network_public_listings
   WHERE application_id='aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa'
   AND is_published AND slug='synthetic-shop-one'
   AND profile->>'business_name'='Simulated Plus Shop')
  THEN RAISE EXCEPTION 'Re-publication overwrote independently reviewed content'; END IF;
  IF (SELECT count(*) FROM public.texasdefined_network_stripe_events)<>3
    OR (SELECT count(*) FROM public.texasdefined_network_stripe_events WHERE processed_at IS NOT NULL)<>3
  THEN RAISE EXCEPTION 'Stripe idempotency ledger has missing or extra settled events'; END IF;
  IF (SELECT count(*) FROM public.texasdefined_network_email_outbox
    WHERE event_type='membership_active')<>2
    OR (SELECT count(*) FROM public.texasdefined_network_email_outbox
    WHERE event_type='membership_inactive')<>1
  THEN RAISE EXCEPTION 'Durable inactive/reactivated notification transitions lost or duplicated'; END IF;
END
$stripe_recovery$;

ROLLBACK;
SELECT 'STRIPE DB PASS: synthetic activation, duplicate replay, foreign ownership, payment failure, de-list, paid recovery, explicit re-publication, immutable profile, outbox transitions; all rolled back' AS result;
