CREATE TABLE IF NOT EXISTS public.texasdefined_newsletter_issues (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE CHECK (slug ~ '^[a-z0-9][a-z0-9-]{2,120}$'),
  status text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'ready', 'scheduled', 'sending', 'sent', 'cancelled')),
  subject text NOT NULL CHECK (char_length(subject) BETWEEN 1 AND 180),
  preheader text CHECK (preheader IS NULL OR char_length(preheader) <= 300),
  from_name text NOT NULL DEFAULT 'TexasDefined' CHECK (char_length(from_name) BETWEEN 1 AND 120),
  reply_to text CHECK (reply_to IS NULL OR char_length(reply_to) <= 320),
  content jsonb NOT NULL DEFAULT '{"sections":[]}'::jsonb CHECK (jsonb_typeof(content) = 'object'),
  html_body text,
  text_body text,
  audience jsonb NOT NULL DEFAULT '{}'::jsonb CHECK (jsonb_typeof(audience) = 'object'),
  scheduled_for timestamptz,
  sending_started_at timestamptz,
  sent_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb CHECK (jsonb_typeof(metadata) = 'object')
);

ALTER TABLE public.texasdefined_newsletter_issues ENABLE ROW LEVEL SECURITY;

REVOKE ALL ON TABLE public.texasdefined_newsletter_issues FROM anon, authenticated;
GRANT ALL ON TABLE public.texasdefined_newsletter_issues TO service_role;

CREATE INDEX IF NOT EXISTS texasdefined_newsletter_issues_status_idx
  ON public.texasdefined_newsletter_issues (status, scheduled_for, created_at DESC);

COMMENT ON TABLE public.texasdefined_newsletter_issues IS
  'Private TexasDefined newsletter issue drafts and send lifecycle state.';
