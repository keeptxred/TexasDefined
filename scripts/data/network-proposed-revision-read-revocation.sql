-- STAGING PROPOSAL ONLY: NOT YET AN APPLIED SUPABASE MIGRATION.
-- Execute only in disposable localhost network_replay as part of CI.
-- Before release, generate an official numbered migration with Supabase CLI
-- and apply after explicit approval; do not modify an applied migration.
-- Disabled Featured business owners must not SELECT prior private revision content.
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
