-- Applied to Supabase project ftkznprjljkhymknvhye as migration 20261011231251.
CREATE OR REPLACE FUNCTION public.accept_texasdefined_advertiser_agreement(
  p_agreement_id uuid,
  p_publisher_accepted_by text
) RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $function$
DECLARE
  v_status text;
BEGIN
  IF p_publisher_accepted_by IS NULL OR char_length(trim(p_publisher_accepted_by)) < 2
    OR char_length(trim(p_publisher_accepted_by)) > 180 THEN
    RAISE EXCEPTION 'Publisher acceptance identity is invalid';
  END IF;

  SELECT status INTO v_status
  FROM public.texasdefined_advertiser_agreements
  WHERE id = p_agreement_id
  FOR UPDATE;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Advertiser agreement not found';
  END IF;

  IF v_status = 'accepted' THEN
    RETURN 'already_accepted';
  END IF;

  IF v_status <> 'pending_publisher_acceptance' THEN
    RAISE EXCEPTION 'Advertiser agreement is not eligible for publisher acceptance';
  END IF;

  UPDATE public.texasdefined_advertiser_agreements
  SET status = 'accepted',
      publisher_accepted_at = now(),
      publisher_accepted_by = trim(p_publisher_accepted_by)
  WHERE id = p_agreement_id;

  RETURN 'accepted';
END;
$function$;

REVOKE ALL ON FUNCTION public.accept_texasdefined_advertiser_agreement(uuid,text)
  FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.accept_texasdefined_advertiser_agreement(uuid,text)
  TO service_role;

CREATE OR REPLACE FUNCTION public.assign_texasdefined_advertiser_billing_account(
  p_agreement_id uuid,
  p_billing_account_id uuid
) RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $function$
DECLARE
  v_current uuid;
  v_account_status text;
  v_stripe_customer_id text;
BEGIN
  SELECT billing_account_id INTO v_current
  FROM public.texasdefined_advertiser_agreements
  WHERE id = p_agreement_id
  FOR UPDATE;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Advertiser agreement not found';
  END IF;

  SELECT status, stripe_customer_id
    INTO v_account_status, v_stripe_customer_id
  FROM public.texasdefined_billing_accounts
  WHERE id = p_billing_account_id
  FOR UPDATE;

  IF NOT FOUND OR v_account_status <> 'active' THEN
    RAISE EXCEPTION 'Billing account unavailable';
  END IF;

  IF v_current IS NOT NULL AND v_current <> p_billing_account_id THEN
    RAISE EXCEPTION 'Advertiser agreement is already assigned to another billing account';
  END IF;

  UPDATE public.texasdefined_advertiser_agreements
  SET billing_account_id = p_billing_account_id,
      stripe_customer_id = coalesce(stripe_customer_id, v_stripe_customer_id)
  WHERE id = p_agreement_id;

  RETURN true;
END;
$function$;

REVOKE ALL ON FUNCTION public.assign_texasdefined_advertiser_billing_account(uuid,uuid)
  FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.assign_texasdefined_advertiser_billing_account(uuid,uuid)
  TO service_role;
