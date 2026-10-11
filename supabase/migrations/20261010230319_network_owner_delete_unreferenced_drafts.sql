-- Applied 2026-10-10 to the shared Supabase project.
-- Adds a DELETE permission only; never deletes objects itself.
CREATE POLICY "Featured owners delete only unreferenced drafts"
ON storage.objects FOR DELETE TO authenticated USING(
 bucket_id='texasdefined-network-featured-drafts'
 AND split_part(name,'/',1)=(SELECT auth.uid())::text
 AND EXISTS (
  SELECT 1 FROM public.texasdefined_network_business_accounts b
  WHERE b.id::text=split_part(storage.objects.name,'/',2)
  AND b.owner_user_id=(SELECT auth.uid()) AND b.access_enabled=true AND b.membership_tier='featured'
 )
 AND NOT EXISTS (
  SELECT 1 FROM public.texasdefined_network_profile_revisions r
  WHERE r.business_account_id::text=split_part(storage.objects.name,'/',2)
  AND (r.proposed_profile->>'logo_storage_path'=storage.objects.name
  OR coalesce(r.proposed_profile->'gallery_storage_paths','[]'::jsonb) ? storage.objects.name)
 )
);
