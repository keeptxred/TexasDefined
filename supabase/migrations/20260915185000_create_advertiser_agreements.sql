CREATE TABLE IF NOT EXISTS public.texasdefined_advertiser_agreements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  status text NOT NULL DEFAULT 'pending_publisher_acceptance'
    CHECK (status IN ('pending_publisher_acceptance', 'accepted', 'declined', 'void')),
  agreement_version text NOT NULL CHECK (char_length(agreement_version) BETWEEN 5 AND 80),
  agreement_snapshot text NOT NULL CHECK (char_length(agreement_snapshot) BETWEEN 500 AND 30000),
  tier text NOT NULL CHECK (tier IN ('local', 'growth', 'premier', 'custom')),
  billing_cycle text NOT NULL CHECK (billing_cycle IN ('monthly', 'annual')),
  published_price_cents integer CHECK (published_price_cents IS NULL OR published_price_cents >= 0),
  legal_name text NOT NULL CHECK (char_length(legal_name) BETWEEN 2 AND 180),
  signer_name text NOT NULL CHECK (char_length(signer_name) BETWEEN 2 AND 120),
  signer_title text NOT NULL CHECK (char_length(signer_title) BETWEEN 2 AND 120),
  signer_email text NOT NULL CHECK (char_length(signer_email) BETWEEN 5 AND 320),
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

COMMENT ON TABLE public.texasdefined_advertiser_agreements IS
  'Private versioned electronic advertiser agreement acceptances for TexasDefined. Public clients have no direct access; submissions are written by the server service role only.';
