-- Applied to shared Supabase as 20261010232130. Internal functions are not Data API endpoints.
CREATE SCHEMA IF NOT EXISTS texasdefined_network_internal;
REVOKE ALL ON SCHEMA texasdefined_network_internal FROM PUBLIC,anon;
GRANT USAGE ON SCHEMA texasdefined_network_internal TO authenticated,service_role;
CREATE OR REPLACE FUNCTION texasdefined_network_internal.network_featured_upload_under_quota(p_owner uuid, p_account uuid)
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
   JOIN public.texasdefined_network_applications a ON a.id=b.application_id
   WHERE b.id=p_account AND b.owner_user_id=p_owner
     AND b.membership_tier='featured' AND b.access_enabled=true
     AND a.plan='plus' AND a.status='published' AND a.paid_entitlement_active=true
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
CREATE OR REPLACE FUNCTION texasdefined_network_internal.network_can_submit_featured_revision(p_account uuid, p_submitter uuid)
 RETURNS boolean
 LANGUAGE plpgsql
 STABLE SECURITY DEFINER
 SET search_path TO ''
AS $function$
BEGIN
 IF p_account IS NULL OR p_submitter IS NULL OR auth.uid() IS DISTINCT FROM p_submitter
 THEN RETURN false; END IF;
 RETURN EXISTS(
  SELECT 1 FROM public.texasdefined_network_business_accounts b
  JOIN public.texasdefined_network_applications a ON a.id=b.application_id
  WHERE b.id=p_account AND b.owner_user_id=p_submitter
    AND b.access_enabled=true AND b.membership_tier='featured'
    AND a.plan='plus' AND a.status='published' AND a.paid_entitlement_active=true
 );
END;
$function$
;
REVOKE ALL ON FUNCTION texasdefined_network_internal.network_featured_upload_under_quota(uuid,uuid) FROM PUBLIC,anon;
REVOKE ALL ON FUNCTION texasdefined_network_internal.network_can_submit_featured_revision(uuid,uuid) FROM PUBLIC,anon;
GRANT EXECUTE ON FUNCTION texasdefined_network_internal.network_featured_upload_under_quota(uuid,uuid) TO authenticated,service_role;
GRANT EXECUTE ON FUNCTION texasdefined_network_internal.network_can_submit_featured_revision(uuid,uuid) TO authenticated,service_role;
DROP POLICY IF EXISTS "Featured owners upload their own review media" ON storage.objects;
CREATE POLICY "Featured owners upload their own review media"
ON storage.objects FOR INSERT TO authenticated WITH CHECK(
 bucket_id='texasdefined-network-featured-drafts'
 AND split_part(name,'/',1)=(SELECT auth.uid())::text
 AND EXISTS(SELECT 1 FROM public.texasdefined_network_business_accounts b
 WHERE b.id::text=split_part(storage.objects.name,'/',2) AND b.owner_user_id=(SELECT auth.uid())
 AND b.access_enabled=true AND b.membership_tier='featured')
 AND texasdefined_network_internal.network_featured_upload_under_quota((SELECT auth.uid()),split_part(name,'/',2)::uuid)
);
DROP POLICY IF EXISTS network_owner_revisions_submit ON public.texasdefined_network_profile_revisions;
CREATE POLICY network_owner_revisions_submit
ON public.texasdefined_network_profile_revisions FOR INSERT TO authenticated WITH CHECK(
 submitted_by=(SELECT auth.uid()) AND review_status='pending_review'
 AND reviewed_at IS NULL AND reviewer_notes IS NULL
 AND jsonb_typeof(proposed_profile)='object'
 AND (SELECT count(*) FROM jsonb_object_keys(proposed_profile)) BETWEEN 1 AND 14
 AND texasdefined_network_internal.network_can_submit_featured_revision(business_account_id,submitted_by)
);
DROP FUNCTION IF EXISTS public.network_featured_upload_under_quota(uuid,uuid);
DROP FUNCTION IF EXISTS public.network_can_submit_featured_revision(uuid,uuid);
