-- Applied as Supabase migration 20261010231214; no live data mutated at install.
CREATE OR REPLACE FUNCTION public.suspend_texasdefined_network_listing(p_application_id uuid, p_to_status text)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
DECLARE a record;
BEGIN
 IF p_to_status NOT IN('approved','rejected','pending_review') THEN
   RAISE EXCEPTION 'Unsupported editorial status transition';
 END IF;
 SELECT id,status INTO a FROM public.texasdefined_network_applications
 WHERE id=p_application_id FOR UPDATE;
 IF NOT FOUND THEN RETURN jsonb_build_object('status','missing'); END IF;
 IF p_to_status='approved' AND a.status<>'published' THEN
  RETURN jsonb_build_object('status','not_published');
 END IF;
 UPDATE public.texasdefined_network_public_listings
 SET is_published=false,updated_at=now()
 WHERE application_id=p_application_id AND is_published=true;
 UPDATE public.texasdefined_network_applications
 SET status=p_to_status,updated_at=now()
 WHERE id=p_application_id;
 RETURN jsonb_build_object('status',p_to_status,'is_published',false);
END;
$function$
;
REVOKE ALL ON FUNCTION public.suspend_texasdefined_network_listing(uuid,text) FROM PUBLIC,anon,authenticated;
GRANT EXECUTE ON FUNCTION public.suspend_texasdefined_network_listing(uuid,text) TO service_role;