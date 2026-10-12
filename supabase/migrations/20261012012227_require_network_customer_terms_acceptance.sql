-- Applied to Supabase project ftkznprjljkhymknvhye as migration 20261012012227.
ALTER TABLE public.texasdefined_network_applications
  ADD COLUMN IF NOT EXISTS terms_version text,
  ADD COLUMN IF NOT EXISTS terms_snapshot_sha256 text,
  ADD COLUMN IF NOT EXISTS terms_accepted_at timestamptz,
  ADD COLUMN IF NOT EXISTS representative_authority_accepted boolean,
  ADD COLUMN IF NOT EXISTS facts_responsibility_accepted boolean,
  ADD COLUMN IF NOT EXISTS media_responsibility_accepted boolean,
  ADD COLUMN IF NOT EXISTS search_indexing_accepted boolean;

ALTER TABLE public.texasdefined_network_applications
  ADD CONSTRAINT network_terms_version_present
    CHECK (terms_version IS NOT NULL AND char_length(terms_version) BETWEEN 6 AND 80),
  ADD CONSTRAINT network_terms_snapshot_hash_valid
    CHECK (terms_snapshot_sha256 ~ '^[a-f0-9]{64}$'),
  ADD CONSTRAINT network_terms_acceptance_present
    CHECK (
      terms_accepted_at IS NOT NULL
      AND representative_authority_accepted IS TRUE
      AND facts_responsibility_accepted IS TRUE
      AND media_responsibility_accepted IS TRUE
      AND search_indexing_accepted IS TRUE
    );

ALTER TABLE public.texasdefined_network_applications
  ALTER COLUMN terms_version SET NOT NULL,
  ALTER COLUMN terms_snapshot_sha256 SET NOT NULL,
  ALTER COLUMN terms_accepted_at SET NOT NULL,
  ALTER COLUMN representative_authority_accepted SET NOT NULL,
  ALTER COLUMN facts_responsibility_accepted SET NOT NULL,
  ALTER COLUMN media_responsibility_accepted SET NOT NULL,
  ALTER COLUMN search_indexing_accepted SET NOT NULL;

CREATE TABLE IF NOT EXISTS public.texasdefined_network_checkout_acceptances (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id uuid NOT NULL
    REFERENCES public.texasdefined_network_applications(id) ON DELETE RESTRICT,
  owner_user_id uuid NOT NULL
    REFERENCES auth.users(id) ON DELETE RESTRICT,
  accepted_email text NOT NULL
    CHECK (char_length(accepted_email) BETWEEN 5 AND 320),
  terms_version text NOT NULL
    CHECK (char_length(terms_version) BETWEEN 6 AND 80),
  terms_snapshot_sha256 text NOT NULL
    CHECK (terms_snapshot_sha256 ~ '^[a-f0-9]{64}$'),
  recurring_disclosure_sha256 text NOT NULL
    CHECK (recurring_disclosure_sha256 ~ '^[a-f0-9]{64}$'),
  terms_accepted boolean NOT NULL CHECK (terms_accepted IS TRUE),
  recurring_billing_accepted boolean NOT NULL CHECK (recurring_billing_accepted IS TRUE),
  facts_responsibility_accepted boolean NOT NULL CHECK (facts_responsibility_accepted IS TRUE),
  media_responsibility_accepted boolean NOT NULL CHECK (media_responsibility_accepted IS TRUE),
  search_indexing_accepted boolean NOT NULL CHECK (search_indexing_accepted IS TRUE),
  accepted_at timestamptz NOT NULL DEFAULT now(),
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb CHECK (jsonb_typeof(metadata)='object'),
  UNIQUE(application_id, owner_user_id, terms_version, recurring_disclosure_sha256)
);

ALTER TABLE public.texasdefined_network_checkout_acceptances ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON TABLE public.texasdefined_network_checkout_acceptances
  FROM PUBLIC, anon, authenticated;
GRANT ALL ON TABLE public.texasdefined_network_checkout_acceptances TO service_role;

CREATE INDEX IF NOT EXISTS network_checkout_acceptances_application_idx
  ON public.texasdefined_network_checkout_acceptances(application_id, accepted_at DESC);
CREATE INDEX IF NOT EXISTS network_checkout_acceptances_owner_idx
  ON public.texasdefined_network_checkout_acceptances(owner_user_id, accepted_at DESC);

COMMENT ON TABLE public.texasdefined_network_checkout_acceptances IS
  'Private immutable-style evidence of verified owner acceptance of the current TexasDefined Network terms and recurring billing disclosure before Plus Checkout.';
