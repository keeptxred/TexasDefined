-- Strict disposable network_replay only; all fixtures transactionally rolled back.
-- No genuine identities, emails or payments; no production data written.
BEGIN;
SET LOCAL statement_timeout='8s';
DO $permissions$
BEGIN
 IF has_table_privilege('anon','texasdefined_network_internal.admin_action_audit','SELECT')
 OR has_table_privilege('authenticated','texasdefined_network_internal.admin_action_audit','SELECT')
 OR has_table_privilege('service_role','texasdefined_network_internal.admin_action_audit','UPDATE')
 OR has_table_privilege('service_role','texasdefined_network_internal.admin_action_audit','DELETE')
 THEN RAISE EXCEPTION 'Sensitive audit table permissions are not read-only service access'; END IF;
 IF has_function_privilege('anon','texasdefined_network_internal.network_audit_sensitive_state_transition()','EXECUTE')
 OR has_function_privilege('authenticated','texasdefined_network_internal.network_audit_sensitive_state_transition()','EXECUTE')
 THEN RAISE EXCEPTION 'Sensitive audit function exposed to non-service users'; END IF;
END
$permissions$;
INSERT INTO auth.users(id,email,email_confirmed_at)
VALUES ('44444444-4444-4444-8444-444444444444','audit-owner@example.invalid',now());
INSERT INTO public.texasdefined_network_applications
 (id,plan,status,business_name,category,city,contact_email,intake_complete,paid_entitlement_active,terms_version,terms_snapshot_sha256,terms_accepted_at,representative_authority_accepted,facts_responsibility_accepted,media_responsibility_accepted,search_indexing_accepted)
VALUES ('dddddddd-dddd-4ddd-8ddd-dddddddddddd','plus','approved','Audit Sample Company','Test','Katy','audit-owner@example.invalid',true,true,'2026-10-11-v1','166b237dc2572da5195e1f5217ec51c8ecc83b73f68a080a16b4478e35f9a6a6',now(),true,true,true,true);
UPDATE public.texasdefined_network_applications
 SET status='published' WHERE id='dddddddd-dddd-4ddd-8ddd-dddddddddddd';
INSERT INTO public.texasdefined_network_business_accounts
 (id,application_id,owner_user_id,membership_tier,access_enabled)
VALUES ('dddddddd-1111-4111-8111-dddddddddddd','dddddddd-dddd-4ddd-8ddd-dddddddddddd',
 '44444444-4444-4444-8444-444444444444','featured',true);
INSERT INTO public.texasdefined_network_profile_revisions
 (id,business_account_id,submitted_by,proposed_profile)
VALUES ('dddddddd-2222-4222-8222-dddddddddddd','dddddddd-1111-4111-8111-dddddddddddd',
 '44444444-4444-4444-8444-444444444444','{"description":"review"}');
UPDATE public.texasdefined_network_profile_revisions
 SET review_status='approved',reviewed_at=now()
 WHERE id='dddddddd-2222-4222-8222-dddddddddddd';
INSERT INTO public.texasdefined_network_public_listings
 (application_id,slug,plan,profile,is_published)
VALUES ('dddddddd-dddd-4ddd-8ddd-dddddddddddd','synthetic-audit-company','plus','{"business_name":"Audit Sample Company"}',true);
UPDATE public.texasdefined_network_public_listings SET is_published=false
 WHERE application_id='dddddddd-dddd-4ddd-8ddd-dddddddddddd';
UPDATE public.texasdefined_network_business_accounts SET access_enabled=false
 WHERE id='dddddddd-1111-4111-8111-dddddddddddd';
UPDATE public.texasdefined_network_applications SET paid_entitlement_active=false
 WHERE id='dddddddd-dddd-4ddd-8ddd-dddddddddddd';
DO $audit$
DECLARE
 row_count integer;
BEGIN
 IF (SELECT count(*) FROM texasdefined_network_internal.admin_action_audit
     WHERE action_name='editorial_status')<>1
 OR (SELECT count(*) FROM texasdefined_network_internal.admin_action_audit
     WHERE action_name='subscription_entitlement')<>1
 OR (SELECT count(*) FROM texasdefined_network_internal.admin_action_audit
     WHERE action_name='revision_review')<>1
 OR (SELECT count(*) FROM texasdefined_network_internal.admin_action_audit
     WHERE action_name='listing_visibility')<>2
 OR (SELECT count(*) FROM texasdefined_network_internal.admin_action_audit
     WHERE action_name='owner_access')<>2
 THEN RAISE EXCEPTION 'Sensitive action audit missed transitions or double counted'; END IF;
 SELECT count(*) INTO row_count FROM texasdefined_network_internal.admin_action_audit;
 IF row_count<>7 THEN RAISE EXCEPTION 'Expected exactly seven material audit transitions, got %',row_count; END IF;
 IF EXISTS(SELECT 1 FROM texasdefined_network_internal.admin_action_audit
    WHERE database_role IS NULL OR transaction_id IS NULL OR occurred_at IS NULL)
 THEN RAISE EXCEPTION 'Audit metadata missing'; END IF;
END
$audit$;
ROLLBACK;
