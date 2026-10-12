-- Applied Supabase migration 20261010231443. Avoid private applications SELECT from RLS caller.
CREATE OR REPLACE FUNCTION public.network_can_submit_featured_revision(p_account uuid, p_submitter uuid)
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
REVOKE ALL ON FUNCTION public.network_can_submit_featured_revision(uuid,uuid) FROM PUBLIC,anon;
GRANT EXECUTE ON FUNCTION public.network_can_submit_featured_revision(uuid,uuid) TO authenticated,service_role;
DROP POLICY IF EXISTS network_owner_revisions_submit ON public.texasdefined_network_profile_revisions;
CREATE POLICY network_owner_revisions_submit ON public.texasdefined_network_profile_revisions
FOR INSERT TO authenticated WITH CHECK(
 submitted_by=(SELECT auth.uid()) AND review_status='pending_review'
 AND reviewed_at IS NULL AND reviewer_notes IS NULL
 AND jsonb_typeof(proposed_profile)='object'
 AND (SELECT count(*) FROM jsonb_object_keys(proposed_profile)) BETWEEN 1 AND 14
 AND public.network_can_submit_featured_revision(business_account_id,submitted_by)
);