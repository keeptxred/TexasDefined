-- Disposable local PostgreSQL only. Same DB transaction rollback preserves cleanroom.
BEGIN;
INSERT INTO auth.users(id,email,email_confirmed_at) VALUES
 ('77777777-7777-4777-8777-777777777777','atomic-counter@example.invalid',now());
INSERT INTO public.texasdefined_network_applications
 (id,plan,status,intake_complete,paid_entitlement_active,business_name,category,city,contact_email)
 VALUES
 ('77777777-0000-4000-8000-000000000001','plus','published',true,true,
  'Atomic Quota Fixture','Test','Katy','atomic-counter@example.invalid');
INSERT INTO public.texasdefined_network_business_accounts
 (id,application_id,owner_user_id,membership_tier,access_enabled)
 VALUES('77777777-0000-4000-8000-000000000002',
 '77777777-0000-4000-8000-000000000001','77777777-7777-4777-8777-777777777777','featured',true);
DO $verify$
DECLARE n integer; c integer;
BEGIN
 -- Superuser inserts exercise the trigger independently of Auth/RLS policies.
 FOR n IN 1..24 LOOP
  INSERT INTO storage.objects(bucket_id,name)
  VALUES('texasdefined-network-featured-drafts',
   '77777777-7777-4777-8777-777777777777/77777777-0000-4000-8000-000000000002/photo-'||n||'.png');
 END LOOP;
 SELECT object_count INTO c FROM texasdefined_network_internal.featured_storage_usage
  WHERE business_account_id='77777777-0000-4000-8000-000000000002';
 IF c<>24 THEN RAISE EXCEPTION 'Counter must commit exactly 24, got %',c; END IF;
 BEGIN
  INSERT INTO storage.objects(bucket_id,name)
  VALUES('texasdefined-network-featured-drafts',
   '77777777-7777-4777-8777-777777777777/77777777-0000-4000-8000-000000000002/photo-25.png');
  RAISE EXCEPTION 'Service-role bypassed 24-file atomic limit';
 EXCEPTION WHEN insufficient_privilege THEN NULL; END;
 IF (SELECT count(*) FROM storage.objects WHERE bucket_id='texasdefined-network-featured-drafts')<>24
 THEN RAISE EXCEPTION 'Failed insert changed the actual number of files'; END IF;
 BEGIN
  UPDATE storage.objects SET name='arbitrary-bucket-escape.png'
  WHERE name='77777777-7777-4777-8777-777777777777/77777777-0000-4000-8000-000000000002/photo-1.png';
  RAISE EXCEPTION 'Rename bypassed immutable quota accounting';
 EXCEPTION WHEN insufficient_privilege THEN NULL; END;
 DELETE FROM storage.objects
  WHERE bucket_id='texasdefined-network-featured-drafts'
   AND name='77777777-7777-4777-8777-777777777777/77777777-0000-4000-8000-000000000002/photo-1.png';
 SELECT object_count INTO c FROM texasdefined_network_internal.featured_storage_usage
  WHERE business_account_id='77777777-0000-4000-8000-000000000002';
 IF c<>23 THEN RAISE EXCEPTION 'Unreferenced DELETE failed to decrement quota: %',c; END IF;
 INSERT INTO storage.objects(bucket_id,name)
 VALUES('texasdefined-network-featured-drafts',
  '77777777-7777-4777-8777-777777777777/77777777-0000-4000-8000-000000000002/recovered-slot.png');
 SELECT object_count INTO c FROM texasdefined_network_internal.featured_storage_usage
  WHERE business_account_id='77777777-0000-4000-8000-000000000002';
 IF c<>24 THEN RAISE EXCEPTION 'Deleted quota slot was not reusable: %',c; END IF;
 IF has_table_privilege('authenticated','texasdefined_network_internal.featured_storage_usage','SELECT')
  OR has_table_privilege('anon','texasdefined_network_internal.featured_storage_usage','SELECT')
 THEN RAISE EXCEPTION 'Private atomic counter table leaked to browser roles'; END IF;
END $verify$;
ROLLBACK;
SELECT 'PENDING ATOMIC QUOTA FIXTURE PASS: 24 hard limit even when RLS bypassed; DELETE recovery; immovable media; private counters; rolled back' AS result;
