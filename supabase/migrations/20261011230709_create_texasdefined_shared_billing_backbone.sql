-- Applied to Supabase project ftkznprjljkhymknvhye as migration 20261011230709.
-- Shared TexasDefined billing identity and invoice reconciliation backbone.
CREATE TABLE IF NOT EXISTS public.texasdefined_billing_accounts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  status text NOT NULL DEFAULT 'active' CHECK (status IN ('active','closed')),
  display_name text NOT NULL CHECK (char_length(display_name) BETWEEN 2 AND 180),
  legal_name text CHECK (legal_name IS NULL OR char_length(legal_name) BETWEEN 2 AND 180),
  billing_email text NOT NULL CHECK (char_length(billing_email) BETWEEN 5 AND 320),
  contact_email text CHECK (contact_email IS NULL OR char_length(contact_email) BETWEEN 5 AND 320),
  website text CHECK (website IS NULL OR char_length(website) <= 500),
  source text NOT NULL CHECK (source IN ('network','advertising','admin')),
  stripe_customer_id text UNIQUE CHECK (
    stripe_customer_id IS NULL OR stripe_customer_id ~ '^cus_[A-Za-z0-9_]+$'
  ),
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb CHECK (jsonb_typeof(metadata) = 'object')
);

ALTER TABLE public.texasdefined_billing_accounts ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON TABLE public.texasdefined_billing_accounts FROM PUBLIC, anon, authenticated;
GRANT ALL ON TABLE public.texasdefined_billing_accounts TO service_role;

CREATE INDEX IF NOT EXISTS texasdefined_billing_accounts_email_idx
  ON public.texasdefined_billing_accounts (lower(billing_email));
CREATE INDEX IF NOT EXISTS texasdefined_billing_accounts_name_idx
  ON public.texasdefined_billing_accounts (lower(display_name));

ALTER TABLE public.texasdefined_network_applications
  ADD COLUMN IF NOT EXISTS billing_account_id uuid
  REFERENCES public.texasdefined_billing_accounts(id) ON DELETE RESTRICT;

ALTER TABLE public.texasdefined_advertiser_agreements
  ADD COLUMN IF NOT EXISTS billing_account_id uuid
  REFERENCES public.texasdefined_billing_accounts(id) ON DELETE RESTRICT;

CREATE INDEX IF NOT EXISTS texasdefined_network_applications_billing_account_idx
  ON public.texasdefined_network_applications (billing_account_id)
  WHERE billing_account_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS texasdefined_advertiser_agreements_billing_account_idx
  ON public.texasdefined_advertiser_agreements (billing_account_id)
  WHERE billing_account_id IS NOT NULL;

CREATE TABLE IF NOT EXISTS public.texasdefined_billing_invoices (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  billing_account_id uuid NOT NULL
    REFERENCES public.texasdefined_billing_accounts(id) ON DELETE RESTRICT,
  stripe_invoice_id text UNIQUE CHECK (
    stripe_invoice_id IS NULL OR stripe_invoice_id ~ '^in_[A-Za-z0-9_]+$'
  ),
  invoice_number text CHECK (invoice_number IS NULL OR char_length(invoice_number) <= 80),
  status text NOT NULL DEFAULT 'draft'
    CHECK (status IN ('draft','open','paid','void','uncollectible')),
  collection_method text NOT NULL DEFAULT 'send_invoice'
    CHECK (collection_method IN ('send_invoice','charge_automatically')),
  currency text NOT NULL DEFAULT 'usd'
    CHECK (currency ~ '^[a-z]{3}$'),
  days_until_due integer CHECK (days_until_due IS NULL OR days_until_due BETWEEN 0 AND 90),
  amount_due_cents bigint NOT NULL DEFAULT 0 CHECK (amount_due_cents >= 0),
  amount_paid_cents bigint NOT NULL DEFAULT 0 CHECK (amount_paid_cents >= 0),
  amount_remaining_cents bigint NOT NULL DEFAULT 0 CHECK (amount_remaining_cents >= 0),
  due_at timestamptz,
  paid_at timestamptz,
  memo text CHECK (memo IS NULL OR char_length(memo) <= 2000),
  created_by text NOT NULL DEFAULT 'texasdefined-system' CHECK (char_length(created_by) BETWEEN 2 AND 180),
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb CHECK (jsonb_typeof(metadata) = 'object')
);

ALTER TABLE public.texasdefined_billing_invoices ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON TABLE public.texasdefined_billing_invoices FROM PUBLIC, anon, authenticated;
GRANT ALL ON TABLE public.texasdefined_billing_invoices TO service_role;

CREATE INDEX IF NOT EXISTS texasdefined_billing_invoices_account_idx
  ON public.texasdefined_billing_invoices (billing_account_id, created_at DESC);
CREATE INDEX IF NOT EXISTS texasdefined_billing_invoices_status_idx
  ON public.texasdefined_billing_invoices (status, created_at DESC);

CREATE TABLE IF NOT EXISTS public.texasdefined_billing_invoice_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  invoice_id uuid NOT NULL
    REFERENCES public.texasdefined_billing_invoices(id) ON DELETE CASCADE,
  stripe_invoice_item_id text UNIQUE CHECK (
    stripe_invoice_item_id IS NULL OR stripe_invoice_item_id ~ '^ii_[A-Za-z0-9_]+$'
  ),
  product_family text NOT NULL
    CHECK (product_family IN ('network','advertising','other')),
  source_type text NOT NULL
    CHECK (source_type IN ('network_membership','advertiser_agreement','advertising_campaign','manual')),
  source_id uuid,
  description text NOT NULL CHECK (char_length(description) BETWEEN 1 AND 500),
  quantity integer NOT NULL DEFAULT 1 CHECK (quantity BETWEEN 1 AND 1000),
  unit_amount_cents bigint NOT NULL CHECK (unit_amount_cents BETWEEN -100000000 AND 100000000),
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb CHECK (jsonb_typeof(metadata) = 'object')
);

ALTER TABLE public.texasdefined_billing_invoice_items ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON TABLE public.texasdefined_billing_invoice_items FROM PUBLIC, anon, authenticated;
GRANT ALL ON TABLE public.texasdefined_billing_invoice_items TO service_role;

CREATE INDEX IF NOT EXISTS texasdefined_billing_invoice_items_invoice_idx
  ON public.texasdefined_billing_invoice_items (invoice_id);
CREATE INDEX IF NOT EXISTS texasdefined_billing_invoice_items_family_idx
  ON public.texasdefined_billing_invoice_items (product_family, created_at DESC);

CREATE TABLE IF NOT EXISTS public.texasdefined_billing_stripe_events (
  stripe_event_id text PRIMARY KEY CHECK (stripe_event_id ~ '^evt_[A-Za-z0-9_]+$'),
  stripe_event_type text NOT NULL CHECK (char_length(stripe_event_type) BETWEEN 3 AND 180),
  created_at timestamptz NOT NULL DEFAULT now(),
  processed_at timestamptz,
  processing_error text
);

ALTER TABLE public.texasdefined_billing_stripe_events ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON TABLE public.texasdefined_billing_stripe_events FROM PUBLIC, anon, authenticated;
GRANT ALL ON TABLE public.texasdefined_billing_stripe_events TO service_role;

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
BEGIN
  SELECT id, business_name, contact_email, website, billing_account_id
    INTO v_application
  FROM public.texasdefined_network_applications
  WHERE id = p_application_id
  FOR UPDATE;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Network application not found';
  END IF;

  IF NOT EXISTS (
    SELECT 1
    FROM public.texasdefined_network_business_accounts
    WHERE application_id = p_application_id
      AND owner_user_id = p_owner_user_id
      AND access_enabled = true
  ) THEN
    RAISE EXCEPTION 'Verified business ownership is required';
  END IF;

  IF v_application.billing_account_id IS NULL THEN
    INSERT INTO public.texasdefined_billing_accounts (
      display_name, billing_email, contact_email, website, source, metadata
    ) VALUES (
      v_application.business_name,
      lower(v_application.contact_email),
      lower(v_application.contact_email),
      v_application.website,
      'network',
      jsonb_build_object('network_application_id', p_application_id)
    )
    RETURNING * INTO v_account;

    UPDATE public.texasdefined_network_applications
    SET billing_account_id = v_account.id, updated_at = now()
    WHERE id = p_application_id;
  ELSE
    SELECT * INTO v_account
    FROM public.texasdefined_billing_accounts
    WHERE id = v_application.billing_account_id
    FOR UPDATE;

    IF NOT FOUND OR v_account.status <> 'active' THEN
      RAISE EXCEPTION 'Billing account unavailable';
    END IF;
  END IF;

  RETURN jsonb_build_object(
    'billingAccountId', v_account.id,
    'stripeCustomerId', v_account.stripe_customer_id,
    'billingEmail', v_account.billing_email,
    'displayName', v_account.display_name
  );
END;
$function$;

REVOKE ALL ON FUNCTION public.ensure_texasdefined_network_billing_account(uuid,uuid)
  FROM PUBLIC, anon, authenticated;
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
BEGIN
  SELECT id, legal_name, business_name, billing_email, signer_email,
         company_website, billing_account_id
    INTO v_agreement
  FROM public.texasdefined_advertiser_agreements
  WHERE id = p_agreement_id
  FOR UPDATE;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Advertiser agreement not found';
  END IF;

  IF v_agreement.billing_account_id IS NULL THEN
    INSERT INTO public.texasdefined_billing_accounts (
      display_name, legal_name, billing_email, contact_email, website, source, metadata
    ) VALUES (
      v_agreement.business_name,
      v_agreement.legal_name,
      lower(v_agreement.billing_email),
      lower(v_agreement.signer_email),
      v_agreement.company_website,
      'advertising',
      jsonb_build_object('advertiser_agreement_id', p_agreement_id)
    )
    RETURNING * INTO v_account;

    UPDATE public.texasdefined_advertiser_agreements
    SET billing_account_id = v_account.id
    WHERE id = p_agreement_id;
  ELSE
    SELECT * INTO v_account
    FROM public.texasdefined_billing_accounts
    WHERE id = v_agreement.billing_account_id
    FOR UPDATE;

    IF NOT FOUND OR v_account.status <> 'active' THEN
      RAISE EXCEPTION 'Billing account unavailable';
    END IF;
  END IF;

  RETURN jsonb_build_object(
    'billingAccountId', v_account.id,
    'stripeCustomerId', v_account.stripe_customer_id,
    'billingEmail', v_account.billing_email,
    'displayName', v_account.display_name
  );
END;
$function$;

REVOKE ALL ON FUNCTION public.ensure_texasdefined_advertiser_billing_account(uuid)
  FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.ensure_texasdefined_advertiser_billing_account(uuid)
  TO service_role;

CREATE OR REPLACE FUNCTION public.bind_texasdefined_billing_stripe_customer(
  p_billing_account_id uuid,
  p_stripe_customer_id text
) RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $function$
DECLARE
  v_current text;
BEGIN
  IF p_stripe_customer_id IS NULL OR p_stripe_customer_id !~ '^cus_[A-Za-z0-9_]+$' THEN
    RAISE EXCEPTION 'Invalid Stripe customer id';
  END IF;

  SELECT stripe_customer_id INTO v_current
  FROM public.texasdefined_billing_accounts
  WHERE id = p_billing_account_id
  FOR UPDATE;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Billing account not found';
  END IF;

  IF v_current IS NOT NULL AND v_current <> p_stripe_customer_id THEN
    RAISE EXCEPTION 'Billing account is already bound to another Stripe customer';
  END IF;

  UPDATE public.texasdefined_billing_accounts
  SET stripe_customer_id = p_stripe_customer_id, updated_at = now()
  WHERE id = p_billing_account_id;

  UPDATE public.texasdefined_network_applications
  SET stripe_customer_id = p_stripe_customer_id, updated_at = now()
  WHERE billing_account_id = p_billing_account_id
    AND (stripe_customer_id IS NULL OR stripe_customer_id = p_stripe_customer_id);

  UPDATE public.texasdefined_advertiser_agreements
  SET stripe_customer_id = p_stripe_customer_id
  WHERE billing_account_id = p_billing_account_id
    AND (stripe_customer_id IS NULL OR stripe_customer_id = p_stripe_customer_id);

  RETURN true;
END;
$function$;

REVOKE ALL ON FUNCTION public.bind_texasdefined_billing_stripe_customer(uuid,text)
  FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.bind_texasdefined_billing_stripe_customer(uuid,text)
  TO service_role;

COMMENT ON TABLE public.texasdefined_billing_accounts IS
  'Private canonical TexasDefined business billing identity. One Stripe Customer may serve Network memberships and advertising without mixing product entitlements.';
COMMENT ON TABLE public.texasdefined_billing_invoices IS
  'Private local reconciliation record for Stripe invoices across Network and advertising product families.';
COMMENT ON TABLE public.texasdefined_billing_invoice_items IS
  'Private invoice line mapping that preserves product-family and source identity for unified TexasDefined invoices.';
