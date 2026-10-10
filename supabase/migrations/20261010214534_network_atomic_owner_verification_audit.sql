-- Applied as Supabase migration 20261010214534; no owner accounts/invitations created.
CREATE TABLE IF NOT EXISTS public.texasdefined_network_owner_verifications(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 application_id uuid NOT NULL REFERENCES public.texasdefined_network_applications(id) ON DELETE RESTRICT,
 owner_user_id uuid NOT NULL REFERENCES auth.users(id),
 verification_method text NOT NULL CHECK(verification_method IN
  ('official_domain','registry_documents','verified_public_phone','in_person','other_documented')),
 evidence_reference text NOT NULL CHECK(length(btrim(evidence_reference)) BETWEEN 20 AND 500),
 reviewer_label text NOT NULL CHECK(length(btrim(reviewer_label)) BETWEEN 3 AND 100),
 provisioning_action text NOT NULL CHECK(provisioning_action IN ('created','reenabled')),
 verified_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS network_owner_verifications_application_idx
 ON public.texasdefined_network_owner_verifications(application_id,verified_at DESC);
ALTER TABLE public.texasdefined_network_owner_verifications ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.texasdefined_network_owner_verifications FROM PUBLIC,anon,authenticated;
GRANT SELECT,INSERT ON public.texasdefined_network_owner_verifications TO service_role;
CREATE OR REPLACE FUNCTION public.provision_verified_network_owner(p_application_id uuid, p_user_id uuid, p_method text, p_evidence text, p_reviewer text)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
DECLARE
 v_app record;
 v_auth record;
 v_existing record;
 v_account_id uuid;
 v_action text;
BEGIN
 IF p_method NOT IN('official_domain','registry_documents','verified_public_phone','in_person','other_documented')
 OR length(btrim(coalesce(p_evidence,''))) NOT BETWEEN 20 AND 500
 OR length(btrim(coalesce(p_reviewer,''))) NOT BETWEEN 3 AND 100 THEN
  RAISE EXCEPTION 'Documented independent ownership verification is required';
 END IF;
 SELECT id,plan,status,contact_email INTO v_app
 FROM public.texasdefined_network_applications
 WHERE id=p_application_id FOR UPDATE;
 IF NOT FOUND OR v_app.plan<>'plus' OR v_app.status NOT IN ('approved','published') THEN
  RAISE EXCEPTION 'An approved Plus application is required';
 END IF;
 SELECT email,email_confirmed_at INTO v_auth
 FROM auth.users WHERE id=p_user_id;
 IF NOT FOUND OR v_auth.email_confirmed_at IS NULL OR
   lower(btrim(v_auth.email)) <> lower(btrim(v_app.contact_email)) THEN
  RAISE EXCEPTION 'Confirmed matching application email is mandatory';
 END IF;
 SELECT id,owner_user_id,membership_tier,access_enabled INTO v_existing
 FROM public.texasdefined_network_business_accounts
 WHERE application_id=p_application_id FOR UPDATE;
 IF FOUND THEN
  IF v_existing.owner_user_id<>p_user_id OR v_existing.membership_tier<>'plus' THEN
   RAISE EXCEPTION 'Existing ownership assignment cannot be reassigned';
  END IF;
  IF v_existing.access_enabled THEN
   RETURN jsonb_build_object('id',v_existing.id,'access_enabled',true,'alreadyEnabled',true);
  END IF;
  UPDATE public.texasdefined_network_business_accounts SET access_enabled=true
  WHERE id=v_existing.id AND owner_user_id=p_user_id RETURNING id INTO v_account_id;
  v_action:='reenabled';
 ELSE
  INSERT INTO public.texasdefined_network_business_accounts
   (application_id,owner_user_id,membership_tier,access_enabled)
  VALUES(p_application_id,p_user_id,'plus',true) RETURNING id INTO v_account_id;
  v_action:='created';
 END IF;
 INSERT INTO public.texasdefined_network_owner_verifications
 (application_id,owner_user_id,verification_method,evidence_reference,reviewer_label,provisioning_action)
 VALUES(p_application_id,p_user_id,p_method,btrim(p_evidence),btrim(p_reviewer),v_action);
 RETURN jsonb_build_object('id',v_account_id,'access_enabled',true,'alreadyEnabled',false);
END;
$function$
;
REVOKE ALL ON FUNCTION public.provision_verified_network_owner(uuid,uuid,text,text,text) FROM PUBLIC,anon,authenticated;
GRANT EXECUTE ON FUNCTION public.provision_verified_network_owner(uuid,uuid,text,text,text) TO service_role;
