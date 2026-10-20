-- Applied as migration 20261010223759; no live content mutated by installation.
CREATE OR REPLACE FUNCTION public.finalize_texasdefined_featured_revision(p_revision_id uuid, p_decision text, p_profile jsonb, p_logo text, p_gallery text[])
 RETURNS text
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
DECLARE
 v_revision record;
 v_account record;
 v_application record;
 v_listing record;
BEGIN
 IF p_decision NOT IN ('approve','reject') THEN
   RAISE EXCEPTION 'Invalid revision decision';
 END IF;
 SELECT id,review_status,business_account_id,submitted_by INTO v_revision
 FROM public.texasdefined_network_profile_revisions
 WHERE id=p_revision_id FOR UPDATE;
 IF NOT FOUND THEN RETURN 'missing'; END IF;
 IF v_revision.review_status<>'pending_review' THEN RETURN 'already_reviewed'; END IF;
 IF p_decision='reject' THEN
  UPDATE public.texasdefined_network_profile_revisions
    SET review_status='rejected',reviewed_at=now()
    WHERE id=p_revision_id;
  RETURN 'rejected';
 END IF;
 SELECT id,application_id,owner_user_id,membership_tier,access_enabled
 INTO v_account FROM public.texasdefined_network_business_accounts
 WHERE id=v_revision.business_account_id FOR UPDATE;
 IF NOT FOUND OR v_account.owner_user_id<>v_revision.submitted_by
   OR NOT v_account.access_enabled OR v_account.membership_tier<>'featured' THEN
   RETURN 'not_authorized';
 END IF;
 SELECT id,plan,status,paid_entitlement_active INTO v_application
 FROM public.texasdefined_network_applications
 WHERE id=v_account.application_id FOR UPDATE;
 IF NOT FOUND OR v_application.plan<>'plus' OR v_application.status<>'published'
   OR NOT v_application.paid_entitlement_active THEN
   RETURN 'not_entitled';
 END IF;
 SELECT application_id,is_published INTO v_listing
 FROM public.texasdefined_network_public_listings
 WHERE application_id=v_application.id FOR UPDATE;
 IF NOT FOUND OR NOT v_listing.is_published THEN RETURN 'not_published'; END IF;
 IF p_profile IS NULL OR jsonb_typeof(p_profile)<>'object'
   OR p_gallery IS NULL OR cardinality(p_gallery)>6
   OR EXISTS (SELECT 1 FROM jsonb_object_keys(p_profile) key_name
     WHERE key_name NOT IN
      ('business_name','description','category','city','address','phone',
       'hours','website','social','services','faq','offer')) THEN
   RETURN 'invalid_profile';
 END IF;
 IF (p_logo IS NOT NULL AND left(p_logo,length(v_application.id::text)+1)<>v_application.id::text||'/')
 OR EXISTS(SELECT 1 FROM unnest(p_gallery) item
    WHERE item IS NULL OR left(item,length(v_application.id::text)+1)<>v_application.id::text||'/') THEN
   RETURN 'invalid_media';
 END IF;
 UPDATE public.texasdefined_network_public_listings SET
 profile=p_profile,logo_storage_path=p_logo,gallery_storage_paths=p_gallery,updated_at=now()
 WHERE application_id=v_application.id AND is_published=true;
 UPDATE public.texasdefined_network_profile_revisions SET
 review_status='approved',reviewed_at=now()
 WHERE id=v_revision.id AND review_status='pending_review';
 RETURN 'approved';
END;
$function$
;
REVOKE ALL ON FUNCTION public.finalize_texasdefined_featured_revision(uuid,text,jsonb,text,text[]) FROM PUBLIC,anon,authenticated;
GRANT EXECUTE ON FUNCTION public.finalize_texasdefined_featured_revision(uuid,text,jsonb,text,text[]) TO service_role;
