-- Corrected implementation reflecting applied migration 20261010230653 and follow-up 20261010230712.
CREATE OR REPLACE FUNCTION public.finalize_texasdefined_network_publication(p_application_id uuid, p_slug text, p_profile jsonb, p_logo text, p_gallery text[])
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
DECLARE
 a record;
 previous record;
 item text;
 v_status text;
BEGIN
 SELECT id,plan,status,paid_entitlement_active,intake_complete
 INTO a FROM public.texasdefined_network_applications
 WHERE id=p_application_id FOR UPDATE;
 IF NOT FOUND OR a.status<>'approved' OR a.intake_complete IS NOT TRUE
 OR (a.plan='plus' AND a.paid_entitlement_active IS NOT TRUE)
 OR a.plan NOT IN ('basic','plus') THEN
   RETURN jsonb_build_object('status','not_eligible');
 END IF;

 SELECT slug,plan,is_published INTO previous
 FROM public.texasdefined_network_public_listings
 WHERE application_id=p_application_id FOR UPDATE;
 IF FOUND THEN
  IF previous.plan<>a.plan THEN RETURN jsonb_build_object('status','plan_mismatch'); END IF;
  IF previous.is_published THEN RETURN jsonb_build_object('status','already_published'); END IF;
  -- Re-publication preserves the last independently approved Featured profile and media.
  UPDATE public.texasdefined_network_public_listings
  SET is_published=true,updated_at=now()
  WHERE application_id=a.id AND is_published=false;
  v_status:='republished';
 ELSE
  IF p_slug IS NULL OR length(p_slug)>120
    OR p_slug !~ '^[a-z0-9]+(-[a-z0-9]+)*$'
    OR p_profile IS NULL OR jsonb_typeof(p_profile)<>'object'
    OR (SELECT count(*) FROM jsonb_object_keys(p_profile))>14
    OR p_gallery IS NULL OR cardinality(p_gallery)>(CASE WHEN a.plan='plus' THEN 6 ELSE 0 END)
    OR EXISTS(SELECT 1 FROM jsonb_each(p_profile) j
      WHERE j.key NOT IN ('business_name','description','category','city','address','phone',
      'hours','website','social','services','faq','offer')
      OR jsonb_typeof(j.value) NOT IN ('string','null'))
  THEN RETURN jsonb_build_object('status','invalid_profile'); END IF;

  IF p_logo IS NOT NULL THEN
   IF left(p_logo,length(a.id::text)+1)<>a.id::text||'/'
      OR NOT EXISTS(SELECT 1 FROM storage.objects
       WHERE bucket_id='texasdefined-network-published' AND name=p_logo)
   THEN RETURN jsonb_build_object('status','media_missing'); END IF;
  END IF;
  FOREACH item IN ARRAY p_gallery LOOP
   IF item IS NULL OR left(item,length(a.id::text)+1)<>a.id::text||'/'
     OR NOT EXISTS(SELECT 1 FROM storage.objects
       WHERE bucket_id='texasdefined-network-published' AND name=item)
   THEN RETURN jsonb_build_object('status','media_missing'); END IF;
  END LOOP;
  INSERT INTO public.texasdefined_network_public_listings(
   application_id,slug,plan,profile,logo_storage_path,gallery_storage_paths,is_published
  ) VALUES(a.id,p_slug,a.plan,p_profile,p_logo,p_gallery,true);
  v_status:='published';
 END IF;
 UPDATE public.texasdefined_network_applications
 SET status='published',updated_at=now()
 WHERE id=a.id AND status='approved';
 RETURN jsonb_build_object('status',v_status,'slug',coalesce(previous.slug,p_slug));
END;
$function$
;
REVOKE ALL ON FUNCTION public.finalize_texasdefined_network_publication(uuid,text,jsonb,text,text[]) FROM PUBLIC,anon,authenticated;
GRANT EXECUTE ON FUNCTION public.finalize_texasdefined_network_publication(uuid,text,jsonb,text,text[]) TO service_role;
