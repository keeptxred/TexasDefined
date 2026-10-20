-- Applied to shared Supabase project as migration 20261010224104.
-- No files deleted or added. Every Featured account may store at most 24 private draft objects.
CREATE OR REPLACE FUNCTION public.network_featured_upload_under_quota(p_owner uuid, p_account uuid)
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
DECLARE v_count integer;
BEGIN
 IF p_owner IS NULL OR p_account IS NULL OR auth.uid() IS DISTINCT FROM p_owner THEN RETURN false; END IF;
 IF NOT EXISTS(
   SELECT 1 FROM public.texasdefined_network_business_accounts b
   WHERE b.id=p_account AND b.owner_user_id=p_owner
     AND b.membership_tier='featured' AND b.access_enabled=true
 ) THEN RETURN false; END IF;
 -- Serialize simultaneous uploads under the same account to avoid a count race.
 PERFORM pg_advisory_xact_lock(hashtextextended(p_account::text,8571));
 SELECT count(*) INTO v_count FROM storage.objects o
 WHERE o.bucket_id='texasdefined-network-featured-drafts'
   AND split_part(o.name,'/',1)=p_owner::text
   AND split_part(o.name,'/',2)=p_account::text;
 RETURN v_count<24;
END;
$function$
;
REVOKE ALL ON FUNCTION public.network_featured_upload_under_quota(uuid,uuid) FROM PUBLIC,anon;
GRANT EXECUTE ON FUNCTION public.network_featured_upload_under_quota(uuid,uuid) TO authenticated,service_role;
DROP POLICY IF EXISTS "Featured owners upload their own review media" ON storage.objects;
CREATE POLICY "Featured owners upload their own review media" ON storage.objects FOR INSERT TO authenticated
WITH CHECK (
 bucket_id='texasdefined-network-featured-drafts'
 AND split_part(name,'/',1)=(SELECT auth.uid())::text
 AND EXISTS (
   SELECT 1 FROM public.texasdefined_network_business_accounts b
   WHERE b.id::text=split_part(storage.objects.name,'/',2)
   AND b.owner_user_id=(SELECT auth.uid()) AND b.access_enabled=true AND b.membership_tier='featured'
 )
 AND public.network_featured_upload_under_quota((SELECT auth.uid()),split_part(name,'/',2)::uuid)
);
