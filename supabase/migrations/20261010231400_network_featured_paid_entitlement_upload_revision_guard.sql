-- Applied Supabase migration 20261010231400. Entitlement restriction introduced.
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
DROP POLICY IF EXISTS network_owner_revisions_submit ON public.texasdefined_network_profile_revisions;
CREATE POLICY network_owner_revisions_submit ON public.texasdefined_network_profile_revisions
FOR INSERT TO authenticated WITH CHECK(
 submitted_by=(SELECT auth.uid()) AND review_status='pending_review'
 AND reviewed_at IS NULL AND reviewer_notes IS NULL AND jsonb_typeof(proposed_profile)='object'
 AND (SELECT count(*) FROM jsonb_object_keys(proposed_profile)) BETWEEN 1 AND 14
 AND EXISTS(
 SELECT 1 FROM public.texasdefined_network_business_accounts b
 JOIN public.texasdefined_network_applications a ON a.id=b.application_id
 WHERE b.id=business_account_id AND b.owner_user_id=(SELECT auth.uid())
 AND b.access_enabled=true AND b.membership_tier='featured'
 AND a.plan='plus' AND a.status='published' AND a.paid_entitlement_active=true
 )
);