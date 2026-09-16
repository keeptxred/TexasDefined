ALTER TABLE public.texasdefined_advertiser_agreements
  ADD COLUMN IF NOT EXISTS signer_accepted_at timestamptz,
  ADD COLUMN IF NOT EXISTS agreement_snapshot_sha256 text,
  ADD COLUMN IF NOT EXISTS business_name text,
  ADD COLUMN IF NOT EXISTS billing_email text,
  ADD COLUMN IF NOT EXISTS payment_status text NOT NULL DEFAULT 'not_started',
  ADD COLUMN IF NOT EXISTS invoice_status text NOT NULL DEFAULT 'not_created',
  ADD COLUMN IF NOT EXISTS campaign_start_date date,
  ADD COLUMN IF NOT EXISTS campaign_end_date date,
  ADD COLUMN IF NOT EXISTS destination_url text,
  ADD COLUMN IF NOT EXISTS assets jsonb NOT NULL DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS placement_locations jsonb NOT NULL DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS disclosure_status text NOT NULL DEFAULT 'pending',
  ADD COLUMN IF NOT EXISTS internal_notes text;

UPDATE public.texasdefined_advertiser_agreements
SET signer_accepted_at = COALESCE(signer_accepted_at, created_at),
    agreement_snapshot_sha256 = COALESCE(agreement_snapshot_sha256, encode(extensions.digest(convert_to(agreement_snapshot, 'UTF8'), 'sha256'), 'hex')),
    business_name = COALESCE(NULLIF(business_name, ''), legal_name),
    billing_email = COALESCE(NULLIF(billing_email, ''), signer_email)
WHERE signer_accepted_at IS NULL
   OR agreement_snapshot_sha256 IS NULL
   OR business_name IS NULL
   OR billing_email IS NULL;

ALTER TABLE public.texasdefined_advertiser_agreements
  ALTER COLUMN signer_accepted_at SET DEFAULT now(),
  ALTER COLUMN signer_accepted_at SET NOT NULL,
  ALTER COLUMN agreement_snapshot_sha256 SET NOT NULL,
  ALTER COLUMN business_name SET NOT NULL,
  ALTER COLUMN billing_email SET NOT NULL;

ALTER TABLE public.texasdefined_advertiser_agreements
  DROP CONSTRAINT IF EXISTS texasdefined_advertiser_agreements_snapshot_sha256_check,
  ADD CONSTRAINT texasdefined_advertiser_agreements_snapshot_sha256_check CHECK (agreement_snapshot_sha256 ~ '^[0-9a-f]{64}$'),
  DROP CONSTRAINT IF EXISTS texasdefined_advertiser_agreements_business_name_check,
  ADD CONSTRAINT texasdefined_advertiser_agreements_business_name_check CHECK (char_length(business_name) BETWEEN 2 AND 180),
  DROP CONSTRAINT IF EXISTS texasdefined_advertiser_agreements_billing_email_check,
  ADD CONSTRAINT texasdefined_advertiser_agreements_billing_email_check CHECK (char_length(billing_email) BETWEEN 5 AND 320),
  DROP CONSTRAINT IF EXISTS texasdefined_advertiser_agreements_payment_status_check,
  ADD CONSTRAINT texasdefined_advertiser_agreements_payment_status_check CHECK (payment_status IN ('not_started','pending','paid','past_due','waived','refunded','failed')),
  DROP CONSTRAINT IF EXISTS texasdefined_advertiser_agreements_invoice_status_check,
  ADD CONSTRAINT texasdefined_advertiser_agreements_invoice_status_check CHECK (invoice_status IN ('not_created','draft','open','paid','void','uncollectible')),
  DROP CONSTRAINT IF EXISTS texasdefined_advertiser_agreements_destination_url_check,
  ADD CONSTRAINT texasdefined_advertiser_agreements_destination_url_check CHECK (destination_url IS NULL OR char_length(destination_url) <= 1000),
  DROP CONSTRAINT IF EXISTS texasdefined_advertiser_agreements_disclosure_status_check,
  ADD CONSTRAINT texasdefined_advertiser_agreements_disclosure_status_check CHECK (disclosure_status IN ('pending','approved','live','not_applicable'));

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
