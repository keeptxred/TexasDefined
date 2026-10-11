-- Run via privileged Supabase SQL in a SINGLE transaction; always ROLLBACK.
-- No customer identities, payments, emails, or media are permanently created.
BEGIN;
INSERT INTO public.texasdefined_network_applications
(id,plan,status,intake_complete,business_name,category,city,contact_email)
VALUES
('aaaaaaaa-1000-4000-8000-111111111111','basic','pending_review',true,'Published Fixture Co','test','Test City','public-listing-qa1@example.invalid'),
('bbbbbbbb-1000-4000-8000-222222222222','basic','pending_review',true,'Private Fixture Co','test','Other City','public-listing-qa2@example.invalid');
UPDATE public.texasdefined_network_applications SET status='approved'
WHERE id='aaaaaaaa-1000-4000-8000-111111111111';
INSERT INTO public.texasdefined_network_public_listings
(application_id,slug,plan,profile,is_published)
VALUES
('aaaaaaaa-1000-4000-8000-111111111111','public-safe-qa-fixture','basic','{"business_name":"Published Fixture Co"}'::jsonb,true),
('bbbbbbbb-1000-4000-8000-222222222222','private-safe-qa-fixture','basic','{"business_name":"Private Fixture Co"}'::jsonb,false);
SET LOCAL ROLE anon;
DO $test$
DECLARE c int; blocked boolean:=false;
BEGIN
 SELECT count(*) INTO c FROM public.texasdefined_network_public_listings;
 IF c<>1 THEN RAISE EXCEPTION 'Anonymous user saw % listing rows, expected one',c; END IF;
 IF EXISTS(SELECT 1 FROM public.texasdefined_network_public_listings WHERE slug='private-safe-qa-fixture')
 THEN RAISE EXCEPTION 'Anonymous user saw unpublished listing'; END IF;
 BEGIN EXECUTE 'SELECT count(*) FROM public.texasdefined_network_applications' INTO c;
 EXCEPTION WHEN insufficient_privilege THEN blocked:=true; END;
 IF NOT blocked THEN RAISE EXCEPTION 'Anonymous user accessed private applications'; END IF;
 blocked:=false;
 BEGIN
  INSERT INTO public.texasdefined_network_public_listings(application_id,slug,plan,profile,is_published)
  VALUES('bbbbbbbb-1000-4000-8000-222222222222','unsafe-anon-write','basic','{}'::jsonb,false);
 EXCEPTION WHEN OTHERS THEN blocked:=true; END;
 IF NOT blocked THEN RAISE EXCEPTION 'Anonymous user wrote private listing'; END IF;
END;
$test$;
RESET ROLE;
ROLLBACK;
