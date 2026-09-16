CREATE TABLE IF NOT EXISTS public.texasdefined_advertiser_agreements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  signer_accepted_at timestamptz NOT NULL DEFAULT now(),
  status text NOT NULL DEFAULT 'pending_publisher_acceptance'
    CHECK (status IN ('pending_publisher_acceptance', 'accepted', 'declined', 'void')),
  agreement_version text NOT NULL CHECK (char_length(agreement_version) BETWEEN 5 AND 80),
  agreement_snapshot text NOT NULL CHECK (char_length(agreement_snapshot) BETWEEN 500 AND 30000),
  agreement_snapshot_sha256 text NOT NULL CHECK (agreement_snapshot_sha256 ~ '^[0-9a-f]{64}$'),
  tier text NOT NULL CHECK (tier IN ('local', 'growth', 'premier', 'custom')),
  billing_cycle text NOT NULL CHECK (billing_cycle IN ('monthly', 'annual')),
  published_price_cents integer CHECK (published_price_cents IS NULL OR published_price_cents >= 0),
  legal_name text NOT NULL CHECK (char_length(legal_name) BETWEEN 2 AND 180),
  business_name text NOT NULL CHECK (char_length(business_name) BETWEEN 2 AND 180),
  signer_name text NOT NULL CHECK (char_length(signer_name) BETWEEN 2 AND 120),
  signer_title text NOT NULL CHECK (char_length(signer_title) BETWEEN 2 AND 120),
  signer_email text NOT NULL CHECK (char_length(signer_email) BETWEEN 5 AND 320),
  billing_email text NOT NULL CHECK (char_length(billing_email) BETWEEN 5 AND 320),
  billing_address text NOT NULL CHECK (char_length(billing_address) BETWEEN 10 AND 500),
  company_website text CHECK (company_website IS NULL OR char_length(company_website) <= 500),
  requested_start text CHECK (requested_start IS NULL OR char_length(requested_start) <= 40),
  campaign_notes text CHECK (campaign_notes IS NULL OR char_length(campaign_notes) <= 2500),
  typed_signature text NOT NULL CHECK (char_length(typed_signature) BETWEEN 2 AND 120),
  authority_confirmed boolean NOT NULL CHECK (authority_confirmed = true),
  esign_consent boolean NOT NULL CHECK (esign_consent = true),
  source_path text NOT NULL DEFAULT '/partner-with-us' CHECK (char_length(source_path) <= 500),
  publisher_accepted_at timestamptz,
  publisher_accepted_by text,
  payment_status text NOT NULL DEFAULT 'not_started'
    CHECK (payment_status IN ('not_started', 'pending', 'paid', 'past_due', 'waived', 'refunded', 'failed')),
  invoice_status text NOT NULL DEFAULT 'not_created'
    CHECK (invoice_status IN ('not_created', 'draft', 'open', 'paid', 'void', 'uncollectible')),
  campaign_start_date date,
  campaign_end_date date,
  destination_url text CHECK (destination_url IS NULL OR char_length(destination_url) <= 1000),
  assets jsonb NOT NULL DEFAULT '[]'::jsonb,
  placement_locations jsonb NOT NULL DEFAULT '[]'::jsonb,
  disclosure_status text NOT NULL DEFAULT 'pending'
    CHECK (disclosure_status IN ('pending', 'approved', 'live', 'not_applicable')),
  internal_notes text,
  stripe_customer_id text,
  stripe_invoice_id text,
  stripe_subscription_id text
);

ALTER TABLE public.texasdefined_advertiser_agreements ENABLE ROW LEVEL SECURITY;

REVOKE ALL ON TABLE public.texasdefined_advertiser_agreements FROM anon, authenticated;
GRANT ALL ON TABLE public.texasdefined_advertiser_agreements TO service_role;

CREATE INDEX IF NOT EXISTS texasdefined_advertiser_agreements_created_at_idx
  ON public.texasdefined_advertiser_agreements (created_at DESC);
CREATE INDEX IF NOT EXISTS texasdefined_advertiser_agreements_status_idx
  ON public.texasdefined_advertiser_agreements (status, created_at DESC);
CREATE INDEX IF NOT EXISTS texasdefined_advertiser_agreements_email_idx
  ON public.texasdefined_advertiser_agreements (signer_email);
CREATE INDEX IF NOT EXISTS texasdefined_advertiser_agreements_billing_email_idx
  ON public.texasdefined_advertiser_agreements (billing_email);

CREATE OR REPLACE FUNCTION public.prevent_texasdefined_advertiser_agreement_acceptance_mutation()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  IF NEW.agreement_version IS DISTINCT FROM OLD.agreement_version
    OR NEW.agreement_snapshot IS DISTINCT FROM OLD.agreement_snapshot
    OR NEW.agreement_snapshot_sha256 IS DISTINCT FROM OLD.agreement_snapshot_sha256
    OR NEW.tier IS DISTINCT FROM OLD.tier
    OR NEW.billing_cycle IS DISTINCT FROM OLD.billing_cycle
    OR NEW.published_price_cents IS DISTINCT FROM OLD.published_price_cents
    OR NEW.legal_name IS DISTINCT FROM OLD.legal_name
    OR NEW.business_name IS DISTINCT FROM OLD.business_name
    OR NEW.signer_name IS DISTINCT FROM OLD.signer_name
    OR NEW.signer_title IS DISTINCT FROM OLD.signer_title
    OR NEW.signer_email IS DISTINCT FROM OLD.signer_email
    OR NEW.billing_email IS DISTINCT FROM OLD.billing_email
    OR NEW.billing_address IS DISTINCT FROM OLD.billing_address
    OR NEW.typed_signature IS DISTINCT FROM OLD.typed_signature
    OR NEW.authority_confirmed IS DISTINCT FROM OLD.authority_confirmed
    OR NEW.esign_consent IS DISTINCT FROM OLD.esign_consent
    OR NEW.signer_accepted_at IS DISTINCT FROM OLD.signer_accepted_at
  THEN
    RAISE EXCEPTION 'accepted advertiser agreement identity and snapshot fields are immutable';
  END IF;
  RETURN NEW;
END;
$$;

REVOKE ALL ON FUNCTION public.prevent_texasdefined_advertiser_agreement_acceptance_mutation() FROM PUBLIC, anon, authenticated;

DROP TRIGGER IF EXISTS texasdefined_advertiser_agreements_immutable_acceptance
  ON public.texasdefined_advertiser_agreements;
CREATE TRIGGER texasdefined_advertiser_agreements_immutable_acceptance
BEFORE UPDATE ON public.texasdefined_advertiser_agreements
FOR EACH ROW EXECUTE FUNCTION public.prevent_texasdefined_advertiser_agreement_acceptance_mutation();

COMMENT ON TABLE public.texasdefined_advertiser_agreements IS
  'Private versioned electronic advertiser agreement acceptances and advertiser billing/campaign state for TexasDefined. Public clients have no direct access; submissions are written by the server service role only.';
COMMENT ON COLUMN public.texasdefined_advertiser_agreements.agreement_snapshot_sha256 IS
  'SHA-256 fingerprint of the exact agreement snapshot accepted by the signer.';
