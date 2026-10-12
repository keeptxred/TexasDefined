-- Disposable network_replay PostgreSQL only. Called AFTER 34 applied and 3 pending
-- migrations have been replayed. Exposes actual HTTP PostgREST RLS in ephemeral CI.
-- Fake users and media metadata are NOT production or actual Storage HTTP uploads.
-- PostgREST v14 sets request.jwt.claims, while legacy synthetic SQL fixtures set
-- request.jwt.claim.sub. This fallback only alters the throwaway auth.uid stub.
CREATE OR REPLACE FUNCTION auth.uid() RETURNS uuid LANGUAGE sql STABLE AS $$
 SELECT coalesce(
   nullif(current_setting('request.jwt.claim.sub',true),'')::uuid,
   nullif(nullif(current_setting('request.jwt.claims',true),'')::jsonb->>'sub','')::uuid
 )
$$;
INSERT INTO auth.users(id,email,email_confirmed_at) VALUES
 ('44444444-4444-4444-8444-444444444444','http-owner-one@example.invalid',now()),
 ('55555555-5555-4555-8555-555555555555','http-owner-two@example.invalid',now()),
 ('88888888-8888-4888-8888-888888888888','http-outsider@example.invalid',now());
INSERT INTO public.texasdefined_network_applications
 (id,plan,status,business_name,category,city,contact_email,intake_complete,paid_entitlement_active,terms_version,terms_snapshot_sha256,terms_accepted_at,representative_authority_accepted,facts_responsibility_accepted,media_responsibility_accepted,search_indexing_accepted)
 VALUES
 ('e1111111-1111-4111-8111-111111111111','plus','published','HTTP Owner One Fixture','Test','Katy','http-owner-one@example.invalid',true,true,'2026-10-11-v1','166b237dc2572da5195e1f5217ec51c8ecc83b73f68a080a16b4478e35f9a6a6',now(),true,true,true,true),
 ('e2222222-2222-4222-8222-222222222222','plus','published','HTTP Owner Two Fixture','Test','Austin','http-owner-two@example.invalid',true,true,'2026-10-11-v1','166b237dc2572da5195e1f5217ec51c8ecc83b73f68a080a16b4478e35f9a6a6',now(),true,true,true,true);
INSERT INTO public.texasdefined_network_business_accounts
 (id,application_id,owner_user_id,membership_tier,access_enabled) VALUES
 ('a1111111-1111-4111-8111-111111111111','e1111111-1111-4111-8111-111111111111','44444444-4444-4444-8444-444444444444','featured',true),
 ('a2222222-2222-4222-8222-222222222222','e2222222-2222-4222-8222-222222222222','55555555-5555-4555-8555-555555555555','featured',true);
INSERT INTO public.texasdefined_network_profile_revisions
 (id,business_account_id,submitted_by,proposed_profile,review_status,reviewed_at)
 VALUES
 ('b1111111-1111-4111-8111-111111111111','a1111111-1111-4111-8111-111111111111','44444444-4444-4444-8444-444444444444','{"description":"private owner one HTTP fixture"}','approved',now()),
 ('b2222222-2222-4222-8222-222222222222','a2222222-2222-4222-8222-222222222222','55555555-5555-4555-8555-555555555555','{"description":"private owner two HTTP fixture"}','approved',now());
INSERT INTO storage.objects(bucket_id,name) VALUES
 ('texasdefined-network-featured-drafts','44444444-4444-4444-8444-444444444444/a1111111-1111-4111-8111-111111111111/http-owner-one.webp'),
 ('texasdefined-network-featured-drafts','55555555-5555-4555-8555-555555555555/a2222222-2222-4222-8222-222222222222/http-owner-two.webp');
