CREATE TABLE IF NOT EXISTS public.texasdefined_advertiser_agreement_offers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  inquiry_id uuid NOT NULL REFERENCES public.texasdefined_partner_inquiries(id) ON DELETE CASCADE,
  status text NOT NULL DEFAULT 'active' CHECK (status IN ('active','signed','revoked','expired')),
  token_hash text NOT NULL UNIQUE CHECK (char_length(token_hash) = 64),
  agreement_version text NOT NULL,
  agreement_snapshot text NOT NULL,
  agreement_snapshot_sha256 text NOT NULL CHECK (char_length(agreement_snapshot_sha256) = 64),
  tier text NOT NULL CHECK (tier IN ('local','growth','premier','custom')),
  billing_cycle text NOT NULL CHECK (billing_cycle IN ('monthly','annual')),
  published_price_cents integer CHECK (published_price_cents IS NULL OR published_price_cents >= 0),
  legal_name text NOT NULL CHECK (char_length(legal_name) BETWEEN 2 AND 180),
  business_name text NOT NULL CHECK (char_length(business_name) BETWEEN 2 AND 180),
  contact_email text NOT NULL CHECK (char_length(contact_email) BETWEEN 5 AND 320),
  billing_email text NOT NULL CHECK (char_length(billing_email) BETWEEN 5 AND 320),
  billing_address text NOT NULL CHECK (char_length(billing_address) BETWEEN 10 AND 500),
  company_website text,
  campaign_start_date date,
  campaign_end_date date,
  negotiated_additions text CHECK (negotiated_additions IS NULL OR char_length(negotiated_additions) <= 5000),
  payment_terms text NOT NULL CHECK (char_length(payment_terms) BETWEEN 2 AND 1000),
  expires_at timestamptz NOT NULL,
  signed_agreement_id uuid REFERENCES public.texasdefined_advertiser_agreements(id) ON DELETE SET NULL,
  consumed_at timestamptz,
  created_by text CHECK (created_by IS NULL OR char_length(created_by) <= 180),
  CHECK (campaign_end_date IS NULL OR campaign_start_date IS NULL OR campaign_end_date >= campaign_start_date),
  CHECK ((status = 'signed') = (signed_agreement_id IS NOT NULL AND consumed_at IS NOT NULL))
);

CREATE INDEX IF NOT EXISTS texasdefined_advertiser_agreement_offers_inquiry_idx
  ON public.texasdefined_advertiser_agreement_offers(inquiry_id, created_at DESC);
CREATE INDEX IF NOT EXISTS texasdefined_advertiser_agreement_offers_active_expiry_idx
  ON public.texasdefined_advertiser_agreement_offers(expires_at)
  WHERE status = 'active';

ALTER TABLE public.texasdefined_advertiser_agreement_offers ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON TABLE public.texasdefined_advertiser_agreement_offers FROM PUBLIC, anon, authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.texasdefined_advertiser_agreement_offers TO service_role;

CREATE OR REPLACE FUNCTION public.complete_texasdefined_advertiser_agreement_offer(
  p_token_hash text,
  p_signer_name text,
  p_signer_title text,
  p_signer_email text,
  p_typed_signature text,
  p_authority_confirmed boolean,
  p_esign_consent boolean
) RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  v_offer public.texasdefined_advertiser_agreement_offers%ROWTYPE;
  v_agreement_id uuid;
BEGIN
  SELECT * INTO v_offer
  FROM public.texasdefined_advertiser_agreement_offers
  WHERE token_hash = p_token_hash
  FOR UPDATE;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Agreement link is invalid.' USING ERRCODE = 'P0001';
  END IF;
  IF v_offer.status <> 'active' THEN
    RAISE EXCEPTION 'Agreement link is no longer active.' USING ERRCODE = 'P0001';
  END IF;
  IF v_offer.expires_at <= now() THEN
    UPDATE public.texasdefined_advertiser_agreement_offers SET status = 'expired' WHERE id = v_offer.id;
    RAISE EXCEPTION 'Agreement link has expired.' USING ERRCODE = 'P0001';
  END IF;
  IF NOT p_authority_confirmed OR NOT p_esign_consent THEN
    RAISE EXCEPTION 'Required electronic-signature confirmations are missing.' USING ERRCODE = 'P0001';
  END IF;
  IF length(trim(p_signer_name)) < 2 OR length(trim(p_signer_title)) < 2 OR length(trim(p_signer_email)) < 5 THEN
    RAISE EXCEPTION 'Signer information is incomplete.' USING ERRCODE = 'P0001';
  END IF;
  IF lower(trim(p_typed_signature)) <> lower(trim(p_signer_name)) THEN
    RAISE EXCEPTION 'Typed signature must match signer name.' USING ERRCODE = 'P0001';
  END IF;

  INSERT INTO public.texasdefined_advertiser_agreements (
    agreement_version, agreement_snapshot, agreement_snapshot_sha256,
    tier, billing_cycle, published_price_cents,
    legal_name, business_name, signer_name, signer_title, signer_email,
    billing_email, billing_address, company_website,
    requested_start, campaign_notes, typed_signature,
    authority_confirmed, esign_consent, source_path,
    campaign_start_date, campaign_end_date
  ) VALUES (
    v_offer.agreement_version, v_offer.agreement_snapshot, v_offer.agreement_snapshot_sha256,
    v_offer.tier, v_offer.billing_cycle, v_offer.published_price_cents,
    v_offer.legal_name, v_offer.business_name, trim(p_signer_name), trim(p_signer_title), lower(trim(p_signer_email)),
    lower(v_offer.billing_email), v_offer.billing_address, v_offer.company_website,
    CASE WHEN v_offer.campaign_start_date IS NULL THEN NULL ELSE v_offer.campaign_start_date::text END,
    nullif(trim(concat_ws(E'\n\n', v_offer.negotiated_additions, 'Payment terms: ' || v_offer.payment_terms)), ''),
    trim(p_typed_signature), true, true, '/partner-with-us/agreement',
    v_offer.campaign_start_date, v_offer.campaign_end_date
  ) RETURNING id INTO v_agreement_id;

  UPDATE public.texasdefined_advertiser_agreement_offers
  SET status = 'signed', signed_agreement_id = v_agreement_id, consumed_at = now()
  WHERE id = v_offer.id;

  UPDATE public.texasdefined_partner_inquiries
  SET status = 'agreement_signed', advertiser_agreement_id = v_agreement_id
  WHERE id = v_offer.inquiry_id;

  RETURN v_agreement_id;
END;
$$;

REVOKE ALL ON FUNCTION public.complete_texasdefined_advertiser_agreement_offer(text,text,text,text,text,boolean,boolean) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.complete_texasdefined_advertiser_agreement_offer(text,text,text,text,text,boolean,boolean) TO service_role;

COMMENT ON TABLE public.texasdefined_advertiser_agreement_offers IS 'Private approved-advertiser agreement offers. Raw link tokens are never stored; only SHA-256 hashes are persisted.';
COMMENT ON FUNCTION public.complete_texasdefined_advertiser_agreement_offer(text,text,text,text,text,boolean,boolean) IS 'Atomically validates and consumes a one-time approved advertiser agreement link, stores the signed agreement, and advances the inquiry workflow. Server/service-role only.';
