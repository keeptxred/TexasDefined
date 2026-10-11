-- UNAPPLIED PENDING MIGRATION; awaiting sole-owner authorization for activation.
-- Do NOT deploy to shared Supabase without explicit owner approval.
-- Promotion procedure: move this exact numbered file into supabase/migrations/,
-- first refresh 34-applied-version parity and verify staging Auth revocation.
-- This controls only private Featured revision SELECT, not publication or billing.
-- The existing 34 applied migrations remain unchanged.
BEGIN;
SET LOCAL lock_timeout = '5s';
SET LOCAL statement_timeout = '45s';

DROP POLICY IF EXISTS network_owner_revisions_read
ON public.texasdefined_network_profile_revisions;
CREATE POLICY network_owner_revisions_read
ON public.texasdefined_network_profile_revisions
FOR SELECT TO authenticated
USING (
 EXISTS (
  SELECT 1 FROM public.texasdefined_network_business_accounts b
  WHERE b.id=business_account_id AND b.owner_user_id=(SELECT auth.uid())
   AND b.access_enabled=true AND b.membership_tier='featured'
 )
);
DO $verify$
BEGIN
 IF NOT EXISTS (
  SELECT 1 FROM pg_policies
  WHERE schemaname='public'
   AND tablename='texasdefined_network_profile_revisions'
   AND policyname='network_owner_revisions_read'
   AND cmd='SELECT'
   AND qual LIKE '%access_enabled%'
   AND qual LIKE '%membership_tier%'
 ) THEN RAISE EXCEPTION 'Proposed disabled-owner revision SELECT revocation policy missing'; END IF;
END
$verify$;

COMMIT;
