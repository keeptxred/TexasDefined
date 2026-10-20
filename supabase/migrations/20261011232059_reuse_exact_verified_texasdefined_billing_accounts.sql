-- Applied to Supabase project ftkznprjljkhymknvhye as migration 20261011232059.
CREATE OR REPLACE FUNCTION public.ensure_texasdefined_network_billing_account(
  p_application_id uuid,
  p_owner_user_id uuid
) RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $function$
DECLARE
  v_application record;
  v_account public.texasdefined_billing_accounts%ROWTYPE;
  v_matches uuid[];
BEGIN
  SELECT id, business_name, contact_email, website, billing_account_id
    INTO v_application
  FROM public.texasdefined_network_applications
  WHERE id = p_application_id
  FOR UPDATE;

  IF NOT FOUND THEN RAISE EXCEPTION 'Network application not found'; END IF;

  IF NOT EXISTS (
    SELECT 1 FROM public.texasdefined_network_business_accounts
    WHERE application_id = p_application_id
      AND owner_user_id = p_owner_user_id
      AND access_enabled = true
  ) THEN RAISE EXCEPTION 'Verified business ownership is required'; END IF;

  IF v_application.billing_account_id IS NULL THEN
    IF v_application.website IS NOT NULL AND length(trim(v_application.website)) > 0 THEN
      SELECT array_agg(id ORDER BY id) INTO v_matches
      FROM (
        SELECT id
        FROM public.texasdefined_billing_accounts
        WHERE status='active'
          AND lower(trim(billing_email))=lower(trim(v_application.contact_email))
          AND website IS NOT NULL
          AND regexp_replace(lower(trim(website)),'/+$','')=
              regexp_replace(lower(trim(v_application.website)),'/+$','')
        LIMIT 2
      ) matches;
    END IF;

    IF coalesce(array_length(v_matches,1),0)=1 THEN
      UPDATE public.texasdefined_network_applications
      SET billing_account_id=v_matches[1],updated_at=now()
      WHERE id=p_application_id;
      SELECT * INTO v_account FROM public.texasdefined_billing_accounts
      WHERE id=v_matches[1] FOR UPDATE;
    ELSIF coalesce(array_length(v_matches,1),0)>1 THEN
      RAISE EXCEPTION 'Multiple matching billing accounts require administrator resolution';
    ELSE
      INSERT INTO public.texasdefined_billing_accounts(
        display_name,billing_email,contact_email,website,source,metadata
      ) VALUES (
        v_application.business_name,
        lower(v_application.contact_email),
        lower(v_application.contact_email),
        v_application.website,
        'network',
        jsonb_build_object('network_application_id',p_application_id)
      ) RETURNING * INTO v_account;

      UPDATE public.texasdefined_network_applications
      SET billing_account_id=v_account.id,updated_at=now()
      WHERE id=p_application_id;
    END IF;
  ELSE
    SELECT * INTO v_account
    FROM public.texasdefined_billing_accounts
    WHERE id=v_application.billing_account_id
    FOR UPDATE;
    IF NOT FOUND OR v_account.status<>'active' THEN
      RAISE EXCEPTION 'Billing account unavailable';
    END IF;
  END IF;

  RETURN jsonb_build_object(
    'billingAccountId',v_account.id,
    'stripeCustomerId',v_account.stripe_customer_id,
    'billingEmail',v_account.billing_email,
    'displayName',v_account.display_name
  );
END;
$function$;

REVOKE ALL ON FUNCTION public.ensure_texasdefined_network_billing_account(uuid,uuid)
  FROM PUBLIC,anon,authenticated;
GRANT EXECUTE ON FUNCTION public.ensure_texasdefined_network_billing_account(uuid,uuid)
  TO service_role;

CREATE OR REPLACE FUNCTION public.ensure_texasdefined_advertiser_billing_account(
  p_agreement_id uuid
) RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $function$
DECLARE
  v_agreement record;
  v_account public.texasdefined_billing_accounts%ROWTYPE;
  v_matches uuid[];
BEGIN
  SELECT id,legal_name,business_name,billing_email,signer_email,
         company_website,billing_account_id
    INTO v_agreement
  FROM public.texasdefined_advertiser_agreements
  WHERE id=p_agreement_id
  FOR UPDATE;

  IF NOT FOUND THEN RAISE EXCEPTION 'Advertiser agreement not found'; END IF;

  IF v_agreement.billing_account_id IS NULL THEN
    IF v_agreement.company_website IS NOT NULL AND length(trim(v_agreement.company_website))>0 THEN
      SELECT array_agg(id ORDER BY id) INTO v_matches
      FROM (
        SELECT id
        FROM public.texasdefined_billing_accounts
        WHERE status='active'
          AND lower(trim(billing_email))=lower(trim(v_agreement.billing_email))
          AND website IS NOT NULL
          AND regexp_replace(lower(trim(website)),'/+$','')=
              regexp_replace(lower(trim(v_agreement.company_website)),'/+$','')
        LIMIT 2
      ) matches;
    END IF;

    IF coalesce(array_length(v_matches,1),0)=1 THEN
      UPDATE public.texasdefined_advertiser_agreements
      SET billing_account_id=v_matches[1]
      WHERE id=p_agreement_id;
      SELECT * INTO v_account FROM public.texasdefined_billing_accounts
      WHERE id=v_matches[1] FOR UPDATE;
    ELSIF coalesce(array_length(v_matches,1),0)>1 THEN
      RAISE EXCEPTION 'Multiple matching billing accounts require administrator resolution';
    ELSE
      INSERT INTO public.texasdefined_billing_accounts(
        display_name,legal_name,billing_email,contact_email,website,source,metadata
      ) VALUES (
        v_agreement.business_name,
        v_agreement.legal_name,
        lower(v_agreement.billing_email),
        lower(v_agreement.signer_email),
        v_agreement.company_website,
        'advertising',
        jsonb_build_object('advertiser_agreement_id',p_agreement_id)
      ) RETURNING * INTO v_account;

      UPDATE public.texasdefined_advertiser_agreements
      SET billing_account_id=v_account.id
      WHERE id=p_agreement_id;
    END IF;
  ELSE
    SELECT * INTO v_account
    FROM public.texasdefined_billing_accounts
    WHERE id=v_agreement.billing_account_id
    FOR UPDATE;
    IF NOT FOUND OR v_account.status<>'active' THEN
      RAISE EXCEPTION 'Billing account unavailable';
    END IF;
  END IF;

  RETURN jsonb_build_object(
    'billingAccountId',v_account.id,
    'stripeCustomerId',v_account.stripe_customer_id,
    'billingEmail',v_account.billing_email,
    'displayName',v_account.display_name
  );
END;
$function$;

REVOKE ALL ON FUNCTION public.ensure_texasdefined_advertiser_billing_account(uuid)
  FROM PUBLIC,anon,authenticated;
GRANT EXECUTE ON FUNCTION public.ensure_texasdefined_advertiser_billing_account(uuid)
  TO service_role;
