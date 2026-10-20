-- Network owner tier hardening; non-destructive to approved business content.
-- Plus verification must not grant Featured editing. Existing owner table is empty as independently read back on October 10, 2026.
ALTER TABLE public.texasdefined_network_business_accounts
  DROP CONSTRAINT IF EXISTS texasdefined_network_business_accounts_membership_tier_check;
ALTER TABLE public.texasdefined_network_business_accounts
  ADD CONSTRAINT texasdefined_network_business_accounts_membership_tier_check
  CHECK (membership_tier IN ('plus','featured'));
ALTER TABLE public.texasdefined_network_business_accounts
  ALTER COLUMN membership_tier SET DEFAULT 'plus';

-- Disabled Plus/Featured owners must not read private Featured drafts after access is revoked.
DROP POLICY IF EXISTS "Featured owners read their draft media" ON storage.objects;
CREATE POLICY "Featured owners read their draft media" ON storage.objects FOR SELECT TO authenticated
USING (
  bucket_id = 'texasdefined-network-featured-drafts'
  AND split_part(name,'/',1) = (SELECT auth.uid())::text
  AND EXISTS (
    SELECT 1 FROM public.texasdefined_network_business_accounts b
    WHERE b.id::text = split_part(storage.objects.name,'/',2)
      AND b.owner_user_id = (SELECT auth.uid())
      AND b.access_enabled = true
      AND b.membership_tier = 'featured'
  )
);
