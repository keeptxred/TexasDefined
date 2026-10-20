-- SYNTHETIC TEST MODE CHECKOUT acceptance. Only in ephemeral network_replay.
-- Runner applies staging-only cs_test_ finalizer before this rollback fixture.
BEGIN;
SET LOCAL statement_timeout='8s';

INSERT INTO auth.users(id,email,email_confirmed_at)
 VALUES ('c1111111-1111-4111-8111-111111111111','staging-owner@example.invalid',now());
INSERT INTO public.texasdefined_network_applications
 (id,plan,status,business_name,category,city,contact_email,intake_complete,paid_entitlement_active,terms_version,terms_snapshot_sha256,terms_accepted_at,representative_authority_accepted,facts_responsibility_accepted,media_responsibility_accepted,search_indexing_accepted)
 VALUES ('c2222222-2222-4222-8222-222222222222','plus','approved',
 'Synthetic Checkout Fixture','QA','Katy','staging-owner@example.invalid',true,false,'2026-10-11-v1','166b237dc2572da5195e1f5217ec51c8ecc83b73f68a080a16b4478e35f9a6a6',now(),true,true,true,true);
INSERT INTO public.texasdefined_network_business_accounts
 (id,application_id,owner_user_id,membership_tier,access_enabled)
 VALUES ('c3333333-3333-4333-8333-333333333333',
 'c2222222-2222-4222-8222-222222222222',
 'c1111111-1111-4111-8111-111111111111','plus',true);

DO $qa$
DECLARE r jsonb; key uuid; approved boolean; reuse jsonb; current_state record;
 app uuid:='c2222222-2222-4222-8222-222222222222';
 owner uuid:='c1111111-1111-4111-8111-111111111111';
 url text:='https://checkout.stripe.com/c/pay/cs_test_isolated_fixture';
 exp bigint:=extract(epoch from now()+interval '30 minutes')::bigint;
BEGIN
 IF has_function_privilege('anon','public.complete_texasdefined_network_checkout(uuid,uuid,uuid,text,text,bigint)','EXECUTE')
 OR has_function_privilege('authenticated','public.complete_texasdefined_network_checkout(uuid,uuid,uuid,text,text,bigint)','EXECUTE')
 THEN RAISE EXCEPTION 'Staging finalizer unexpectedly callable by unprivileged client'; END IF;

 SELECT public.reserve_texasdefined_network_checkout(app,owner) INTO r;
 IF r->>'status'<>'create' OR coalesce(r->>'attemptKey','')=''
 THEN RAISE EXCEPTION 'Test staging did not reserve a Checkout creation: %',r; END IF;
 key:=(r->>'attemptKey')::uuid;
 SELECT public.reserve_texasdefined_network_checkout(app,owner) INTO reuse;
 IF reuse->>'status'<>'busy' THEN RAISE EXCEPTION 'Concurrent reservation was not denied'; END IF;
 IF public.complete_texasdefined_network_checkout(app,owner,key,'cs_live_not_allowed',url,exp)
 THEN RAISE EXCEPTION 'Staging finalizer accepted live-mode session'; END IF;
 IF public.complete_texasdefined_network_checkout(app,owner,gen_random_uuid(),'cs_test_wrong_key',url,exp)
 THEN RAISE EXCEPTION 'Staging finalizer accepted wrong idempotency token'; END IF;
 IF public.complete_texasdefined_network_checkout(app,gen_random_uuid(),key,'cs_test_foreign_owner',url,exp)
 THEN RAISE EXCEPTION 'Staging finalizer accepted wrong owner'; END IF;
 IF public.complete_texasdefined_network_checkout(app,owner,key,'cs_test_bad_url',
 'https://checkout.stripe.com.evil.invalid/pay',exp)
 THEN RAISE EXCEPTION 'Staging finalizer accepted forged payment redirect'; END IF;

 approved:=public.complete_texasdefined_network_checkout(app,owner,key,'cs_test_isolated_fixture',url,exp);
 IF approved IS DISTINCT FROM true THEN RAISE EXCEPTION 'Verified staging session was not finalized'; END IF;
 SELECT state,checkout_session_id,checkout_url INTO current_state
 FROM public.texasdefined_network_checkout_attempts WHERE application_id=app;
 IF current_state.state<>'ready' OR current_state.checkout_session_id<>'cs_test_isolated_fixture'
 OR current_state.checkout_url<>url
 THEN RAISE EXCEPTION 'Staging Checkout finalized incorrect attempt'; END IF;

 SELECT public.reserve_texasdefined_network_checkout(app,owner) INTO reuse;
 IF reuse->>'status'<>'reuse' OR reuse->>'url'<>url
 THEN RAISE EXCEPTION 'Verified Checkout session was not safely reused'; END IF;
 IF public.complete_texasdefined_network_checkout(app,owner,key,'cs_test_duplicate',url,exp)
 THEN RAISE EXCEPTION 'Staging finalizer accepted duplicate completion'; END IF;
 RAISE NOTICE 'ISOLATED TEST-MODE CHECKOUT PASS: owner proof, idempotent reservation, live-ID denial, forged/foreign rejection, cs_test finalization and safe reuse';
END $qa$;
ROLLBACK;
SELECT 'LOCAL TEST STRIPE CHECKOUT PASS — rollback, NO Stripe provider or hosted Supabase mutation' AS result;
