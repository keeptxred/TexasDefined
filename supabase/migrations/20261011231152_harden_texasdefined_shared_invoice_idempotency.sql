-- Applied to Supabase project ftkznprjljkhymknvhye as migration 20261011231152.
ALTER TABLE public.texasdefined_billing_invoices
  ADD COLUMN IF NOT EXISTS dedupe_key text
  CHECK (dedupe_key IS NULL OR char_length(dedupe_key) BETWEEN 8 AND 200);

CREATE UNIQUE INDEX IF NOT EXISTS texasdefined_billing_invoices_dedupe_key_uidx
  ON public.texasdefined_billing_invoices (dedupe_key)
  WHERE dedupe_key IS NOT NULL;

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
BEGIN
  SELECT billing_account_id INTO v_current
  FROM public.texasdefined_advertiser_agreements
  WHERE id = p_agreement_id
  FOR UPDATE;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Advertiser agreement not found';
  END IF;

  SELECT status INTO v_account_status
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
  SET billing_account_id = p_billing_account_id
  WHERE id = p_agreement_id;

  RETURN true;
END;
$function$;

REVOKE ALL ON FUNCTION public.assign_texasdefined_advertiser_billing_account(uuid,uuid)
  FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.assign_texasdefined_advertiser_billing_account(uuid,uuid)
  TO service_role;
