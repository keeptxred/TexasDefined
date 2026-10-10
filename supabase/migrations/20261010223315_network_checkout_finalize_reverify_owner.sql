-- Applied to shared project as migration 20261010223315. Service role only; no billing action.
CREATE OR REPLACE FUNCTION public.complete_texasdefined_network_checkout(p_application_id uuid, p_owner_user_id uuid, p_attempt_key uuid, p_session_id text, p_checkout_url text, p_expires_at bigint)
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
DECLARE app record;
BEGIN
 IF p_session_id !~ '^cs_live_[a-zA-Z0-9_]+$'
 OR p_checkout_url !~ '^https://checkout[.]stripe[.]com/'
 OR p_expires_at IS NULL OR to_timestamp(p_expires_at)<now()+interval '1 minute'
 OR to_timestamp(p_expires_at)>now()+interval '36 hours' THEN
  RETURN false;
 END IF;
 SELECT plan,status,paid_entitlement_active,stripe_subscription_id,contact_email INTO app
 FROM public.texasdefined_network_applications WHERE id=p_application_id FOR UPDATE;
 IF NOT FOUND OR app.plan<>'plus' OR app.status<>'approved'
  OR app.paid_entitlement_active OR app.stripe_subscription_id IS NOT NULL
 THEN RETURN false; END IF;
 -- Re-evaluate owner privileges when Stripe responds; a revoked owner may not finalize.
 IF NOT EXISTS(
   SELECT 1 FROM public.texasdefined_network_business_accounts b
   JOIN auth.users u ON u.id=b.owner_user_id
   WHERE b.application_id=p_application_id AND b.owner_user_id=p_owner_user_id
     AND b.membership_tier='plus' AND b.access_enabled=true
     AND u.email_confirmed_at IS NOT NULL
     AND lower(btrim(u.email))=lower(btrim(app.contact_email))
   FOR SHARE OF b
 ) THEN RETURN false; END IF;
 UPDATE public.texasdefined_network_checkout_attempts
 SET state='ready',checkout_session_id=p_session_id,checkout_url=p_checkout_url,
     stripe_expires_at=to_timestamp(p_expires_at),updated_at=now()
 WHERE application_id=p_application_id AND owner_user_id=p_owner_user_id
  AND attempt_key=p_attempt_key AND state='creating';
 RETURN FOUND;
END;
$function$
;
REVOKE ALL ON FUNCTION public.complete_texasdefined_network_checkout(uuid,uuid,uuid,text,text,bigint) FROM PUBLIC,anon,authenticated;
GRANT EXECUTE ON FUNCTION public.complete_texasdefined_network_checkout(uuid,uuid,uuid,text,text,bigint) TO service_role;
