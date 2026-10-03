CREATE TABLE IF NOT EXISTS public.texasdefined_newsletter_subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL UNIQUE CHECK (email = lower(btrim(email)) AND char_length(email) BETWEEN 5 AND 320),
  status text NOT NULL DEFAULT 'active' CHECK (status IN ('pending', 'active', 'unsubscribed', 'bounced', 'complained')),
  consent_at timestamptz NOT NULL DEFAULT now(),
  consent_version text NOT NULL DEFAULT 'v1' CHECK (char_length(consent_version) BETWEEN 1 AND 80),
  source text NOT NULL DEFAULT 'texasdefined' CHECK (char_length(source) BETWEEN 1 AND 100),
  signup_path text NOT NULL DEFAULT '/' CHECK (char_length(signup_path) BETWEEN 1 AND 500),
  interests text[] NOT NULL DEFAULT '{}'::text[],
  unsubscribe_token uuid NOT NULL DEFAULT gen_random_uuid() UNIQUE,
  subscribed_at timestamptz NOT NULL DEFAULT now(),
  confirmed_at timestamptz,
  unsubscribed_at timestamptz,
  bounced_at timestamptz,
  complained_at timestamptz,
  last_sent_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb CHECK (jsonb_typeof(metadata) = 'object')
);

ALTER TABLE public.texasdefined_newsletter_subscribers ENABLE ROW LEVEL SECURITY;

REVOKE ALL ON TABLE public.texasdefined_newsletter_subscribers FROM anon, authenticated;
GRANT ALL ON TABLE public.texasdefined_newsletter_subscribers TO service_role;

CREATE INDEX IF NOT EXISTS texasdefined_newsletter_subscribers_status_idx
  ON public.texasdefined_newsletter_subscribers (status, created_at DESC);

COMMENT ON TABLE public.texasdefined_newsletter_subscribers IS
  'Private TexasDefined newsletter subscriber registry, consent provenance, and suppression state. Server-only; no public Data API access.';
