-- Applied to shared project as 20261010223033_network_checkout_attempt_reservation
-- Creates no sessions, emails, Stripe charges, or customers.
CREATE TABLE IF NOT EXISTS public.texasdefined_network_checkout_attempts(
 application_id uuid PRIMARY KEY REFERENCES public.texasdefined_network_applications(id) ON DELETE RESTRICT,
 owner_user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE RESTRICT,
 attempt_key uuid NOT NULL DEFAULT gen_random_uuid(),
 state text NOT NULL DEFAULT 'creating' CHECK(state IN ('creating','ready')),
 checkout_session_id text, checkout_url text, stripe_expires_at timestamptz,
 lease_expires_at timestamptz NOT NULL DEFAULT (now()+interval '2 minutes'),
 first_attempt_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE UNIQUE INDEX IF NOT EXISTS network_checkout_attempt_key_idx ON public.texasdefined_network_checkout_attempts(attempt_key);
ALTER TABLE public.texasdefined_network_checkout_attempts ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.texasdefined_network_checkout_attempts FROM PUBLIC,anon,authenticated;
GRANT SELECT,INSERT,UPDATE ON public.texasdefined_network_checkout_attempts TO service_role;
CREATE OR REPLACE FUNCTION public.reserve_texasdefined_network_checkout(p_application_id uuid, p_owner_user_id uuid)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
DECLARE app record; attempt record; v_key uuid;
BEGIN
 SELECT id,plan,status,contact_email,paid_entitlement_active,stripe_subscription_id
 INTO app FROM public.texasdefined_network_applications
 WHERE id=p_application_id FOR UPDATE;
 IF NOT FOUND OR app.plan<>'plus' OR app.status<>'approved'
  OR app.paid_entitlement_active OR app.stripe_subscription_id IS NOT NULL THEN
  RETURN jsonb_build_object('status','not_eligible');
 END IF;
 IF NOT EXISTS(
   SELECT 1 FROM public.texasdefined_network_business_accounts b JOIN auth.users u
   ON u.id=b.owner_user_id WHERE b.application_id=app.id
   AND b.owner_user_id=p_owner_user_id AND b.access_enabled AND b.membership_tier='plus'
   AND u.email_confirmed_at IS NOT NULL AND lower(btrim(u.email))=lower(btrim(app.contact_email))
 ) THEN RETURN jsonb_build_object('status','not_eligible'); END IF;
 SELECT * INTO attempt FROM public.texasdefined_network_checkout_attempts
 WHERE application_id=app.id FOR UPDATE;
 IF FOUND THEN
  IF attempt.owner_user_id<>p_owner_user_id THEN RETURN jsonb_build_object('status','not_eligible'); END IF;
  IF attempt.state='ready' AND attempt.stripe_expires_at>now()+interval '2 minutes'
    AND attempt.checkout_url IS NOT NULL THEN
    RETURN jsonb_build_object('status','reuse','url',attempt.checkout_url);
  END IF;
  IF attempt.state='creating' AND attempt.lease_expires_at>now()
  THEN RETURN jsonb_build_object('status','busy'); END IF;
  -- Recover a timed-out outbound request with the SAME Stripe idempotency key
  -- while Stripe retains it; when older than 23 hours any session has expired.
  IF attempt.state='creating' AND attempt.first_attempt_at>now()-interval '23 hours' THEN
    v_key:=attempt.attempt_key;
  ELSE v_key:=gen_random_uuid(); END IF;
  UPDATE public.texasdefined_network_checkout_attempts
  SET state='creating',attempt_key=v_key,checkout_session_id=NULL,checkout_url=NULL,
      stripe_expires_at=NULL,lease_expires_at=now()+interval '2 minutes',
      first_attempt_at=CASE WHEN v_key=attempt.attempt_key THEN first_attempt_at ELSE now() END,
      updated_at=now()
  WHERE application_id=app.id;
 ELSE
  v_key:=gen_random_uuid();
  INSERT INTO public.texasdefined_network_checkout_attempts(
  application_id,owner_user_id,attempt_key,state,lease_expires_at)
  VALUES(app.id,p_owner_user_id,v_key,'creating',now()+interval '2 minutes');
 END IF;
 RETURN jsonb_build_object('status','create','attemptKey',v_key::text);
END;
$function$
;
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
 SELECT plan,status,paid_entitlement_active,stripe_subscription_id INTO app
 FROM public.texasdefined_network_applications WHERE id=p_application_id FOR UPDATE;
 IF NOT FOUND OR app.plan<>'plus' OR app.status<>'approved'
  OR app.paid_entitlement_active OR app.stripe_subscription_id IS NOT NULL
 THEN RETURN false; END IF;
 UPDATE public.texasdefined_network_checkout_attempts
 SET state='ready',checkout_session_id=p_session_id,checkout_url=p_checkout_url,
     stripe_expires_at=to_timestamp(p_expires_at),updated_at=now()
 WHERE application_id=p_application_id AND owner_user_id=p_owner_user_id
  AND attempt_key=p_attempt_key AND state='creating';
 RETURN FOUND;
END;
$function$
;
REVOKE ALL ON FUNCTION public.reserve_texasdefined_network_checkout(uuid,uuid) FROM PUBLIC,anon,authenticated;
REVOKE ALL ON FUNCTION public.complete_texasdefined_network_checkout(uuid,uuid,uuid,text,text,bigint) FROM PUBLIC,anon,authenticated;
GRANT EXECUTE ON FUNCTION public.reserve_texasdefined_network_checkout(uuid,uuid) TO service_role;
GRANT EXECUTE ON FUNCTION public.complete_texasdefined_network_checkout(uuid,uuid,uuid,text,text,bigint) TO service_role;
