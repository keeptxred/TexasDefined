-- ONLY for disposable localhost network_replay created by GitHub Actions.
-- The surrounding BEGIN/ROLLBACK guarantees no retained fixture identities,
-- drafts, uploads, notifications, or listings, even on successful execution.
-- Simulates two distinct authenticated JWT subjects; it does not issue Auth
-- tokens, call Supabase Storage HTTP, or prove actual user login behavior.
BEGIN;

INSERT INTO auth.users(id,email,email_confirmed_at) VALUES
 ('11111111-1111-4111-8111-111111111111','owner-one@example.invalid',now()),
 ('22222222-2222-4222-8222-222222222222','owner-two@example.invalid',now()),
 ('33333333-3333-4333-8333-333333333333','outsider@example.invalid',now());

INSERT INTO public.texasdefined_network_applications
 (id,plan,status,business_name,category,city,contact_email,intake_complete,paid_entitlement_active)
VALUES
 ('aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa','plus','published','Synthetic Business One','Test','Katy','owner-one@example.invalid',true,true),
 ('bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb','plus','published','Synthetic Business Two','Test','Austin','owner-two@example.invalid',true,true),
 ('cccccccc-cccc-4ccc-8ccc-cccccccccccc','plus','approved','Unpaid Test Business','Test','Dallas','owner-two@example.invalid',true,false);

INSERT INTO public.texasdefined_network_business_accounts
 (id,application_id,owner_user_id,membership_tier,access_enabled)
VALUES
 ('aaaaaaaa-1111-4111-8111-aaaaaaaaaaaa','aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa','11111111-1111-4111-8111-111111111111','featured',true),
 ('bbbbbbbb-2222-4222-8222-bbbbbbbbbbbb','bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb','22222222-2222-4222-8222-222222222222','featured',true),
 ('cccccccc-2222-4222-8222-cccccccccccc','cccccccc-cccc-4ccc-8ccc-cccccccccccc','22222222-2222-4222-8222-222222222222','featured',true);

SET LOCAL ROLE authenticated;
SELECT set_config('request.jwt.claim.sub','11111111-1111-4111-8111-111111111111',true);

DO $owner_one$
BEGIN
 IF (SELECT count(*) FROM public.texasdefined_network_business_accounts)<>1
  THEN RAISE EXCEPTION 'Owner One could read other owners accounts'; END IF;
 IF NOT texasdefined_network_internal.network_can_submit_featured_revision(
   'aaaaaaaa-1111-4111-8111-aaaaaaaaaaaa','11111111-1111-4111-8111-111111111111')
  THEN RAISE EXCEPTION 'Paid verified owner missing Featured revision access'; END IF;
 IF texasdefined_network_internal.network_can_submit_featured_revision(
   'bbbbbbbb-2222-4222-8222-bbbbbbbbbbbb','11111111-1111-4111-8111-111111111111')
  THEN RAISE EXCEPTION 'Cross-business revision helper access allowed'; END IF;
 BEGIN
  INSERT INTO public.texasdefined_network_profile_revisions
   (business_account_id,submitted_by,proposed_profile)
  VALUES
   ('bbbbbbbb-2222-4222-8222-bbbbbbbbbbbb',
    '11111111-1111-4111-8111-111111111111','{"description":"cross-account attempt"}');
  RAISE EXCEPTION 'Cross-owner revision INSERT unexpectedly succeeded';
 EXCEPTION WHEN insufficient_privilege THEN NULL;
 END;
 BEGIN
  INSERT INTO storage.objects(bucket_id,name)
  VALUES ('texasdefined-network-featured-drafts',
   '22222222-2222-4222-8222-222222222222/bbbbbbbb-2222-4222-8222-bbbbbbbbbbbb/cross-owner.png');
  RAISE EXCEPTION 'Cross-owner Storage INSERT unexpectedly succeeded';
 EXCEPTION WHEN insufficient_privilege THEN NULL;
 END;
 IF (SELECT count(*) FROM public.texasdefined_network_profile_revisions)<>0
  THEN RAISE EXCEPTION 'Owner One saw unapproved foreign revisions'; END IF;
END
$owner_one$;

INSERT INTO public.texasdefined_network_profile_revisions
 (business_account_id,submitted_by,proposed_profile)
VALUES
 ('aaaaaaaa-1111-4111-8111-aaaaaaaaaaaa',
  '11111111-1111-4111-8111-111111111111','{"description":"own permitted revision"}');

-- Twenty-four consecutive statements, not a single multi-row INSERT:
-- count-based Storage RLS quotas are evaluated before EACH insert.
DO $quota$
DECLARE slot integer;
BEGIN
 FOR slot IN 1..24 LOOP
  INSERT INTO storage.objects(bucket_id,name) VALUES(
   'texasdefined-network-featured-drafts',
   '11111111-1111-4111-8111-111111111111/aaaaaaaa-1111-4111-8111-aaaaaaaaaaaa/fixture-'||slot||'.webp'
  );
 END LOOP;
 IF (SELECT count(*) FROM storage.objects)<>24
  THEN RAISE EXCEPTION 'Owner One draft Storage SELECT quota visibility incorrect'; END IF;
 BEGIN
  INSERT INTO storage.objects(bucket_id,name) VALUES(
   'texasdefined-network-featured-drafts',
   '11111111-1111-4111-8111-111111111111/aaaaaaaa-1111-4111-8111-aaaaaaaaaaaa/fixture-25.webp');
  RAISE EXCEPTION '25th Featured draft Storage INSERT unexpectedly succeeded';
 EXCEPTION WHEN insufficient_privilege THEN NULL;
 END;
END
$quota$;

SELECT set_config('request.jwt.claim.sub','22222222-2222-4222-8222-222222222222',true);
DO $owner_two$
BEGIN
 IF (SELECT count(*) FROM public.texasdefined_network_business_accounts)<>2
  THEN RAISE EXCEPTION 'Owner Two account RLS revealed Owner One'; END IF;
 IF (SELECT count(*) FROM public.texasdefined_network_profile_revisions)<>0
  THEN RAISE EXCEPTION 'Owner Two can read Owner One revision'; END IF;
 IF (SELECT count(*) FROM storage.objects)<>0
  THEN RAISE EXCEPTION 'Owner Two can read Owner One private files'; END IF;
 IF texasdefined_network_internal.network_can_submit_featured_revision(
   'cccccccc-2222-4222-8222-cccccccccccc','22222222-2222-4222-8222-222222222222')
  THEN RAISE EXCEPTION 'Unpaid owner unexpectedly allowed Featured edits'; END IF;
 IF texasdefined_network_internal.network_featured_upload_under_quota(
   '22222222-2222-4222-8222-222222222222','cccccccc-2222-4222-8222-cccccccccccc')
  THEN RAISE EXCEPTION 'Unpaid owner unexpectedly allowed Featured media'; END IF;
 BEGIN
  INSERT INTO public.texasdefined_network_profile_revisions
   (business_account_id,submitted_by,proposed_profile)
  VALUES
   ('cccccccc-2222-4222-8222-cccccccccccc',
    '22222222-2222-4222-8222-222222222222','{"description":"unpaid attempt"}');
  RAISE EXCEPTION 'Unpaid revision INSERT unexpectedly succeeded';
 EXCEPTION WHEN insufficient_privilege THEN NULL;
 END;
END
$owner_two$;

INSERT INTO public.texasdefined_network_profile_revisions
 (business_account_id,submitted_by,proposed_profile)
VALUES
 ('bbbbbbbb-2222-4222-8222-bbbbbbbbbbbb',
  '22222222-2222-4222-8222-222222222222','{"description":"second owner own revision"}');
INSERT INTO storage.objects(bucket_id,name) VALUES(
 'texasdefined-network-featured-drafts',
 '22222222-2222-4222-8222-222222222222/bbbbbbbb-2222-4222-8222-bbbbbbbbbbbb/own.webp');

DO $owner_two_views$
BEGIN
 IF (SELECT count(*) FROM public.texasdefined_network_profile_revisions)<>1
  OR (SELECT count(*) FROM storage.objects)<>1
  THEN RAISE EXCEPTION 'Owner Two own revision / Storage RLS isolation failed'; END IF;
END
$owner_two_views$;

SELECT set_config('request.jwt.claim.sub','33333333-3333-4333-8333-333333333333',true);
DO $outsider$
BEGIN
 IF (SELECT count(*) FROM public.texasdefined_network_business_accounts)<>0
  OR (SELECT count(*) FROM public.texasdefined_network_profile_revisions)<>0
  OR (SELECT count(*) FROM storage.objects)<>0
 THEN RAISE EXCEPTION 'Unprovisioned user can read private Network data'; END IF;
 IF texasdefined_network_internal.network_can_submit_featured_revision(
  'aaaaaaaa-1111-4111-8111-aaaaaaaaaaaa','33333333-3333-4333-8333-333333333333')
 THEN RAISE EXCEPTION 'Unprovisioned owner obtained approval capability'; END IF;
END
$outsider$;

SET LOCAL ROLE anon;
SELECT set_config('request.jwt.claim.sub','',true);
DO $anonymous$
BEGIN
 BEGIN
  PERFORM count(*) FROM public.texasdefined_network_business_accounts;
  RAISE EXCEPTION 'Anonymous role unexpectedly permitted to read private owner accounts';
 EXCEPTION WHEN insufficient_privilege THEN NULL;
 END;
 BEGIN
  PERFORM count(*) FROM public.texasdefined_network_profile_revisions;
  RAISE EXCEPTION 'Anonymous role unexpectedly permitted to read private revisions';
 EXCEPTION WHEN insufficient_privilege THEN NULL;
 END;
 IF has_schema_privilege('anon','texasdefined_network_internal','USAGE')
  THEN RAISE EXCEPTION 'Anonymous gained private entitlement schema usage'; END IF;
END
$anonymous$;

ROLLBACK;
SELECT 'OWNER RLS PASS: two simulated JWT subjects, foreign inserts denied, 24-image quota, unpaid gates, outsider and anon isolation; all fixtures rolled back' AS result;
