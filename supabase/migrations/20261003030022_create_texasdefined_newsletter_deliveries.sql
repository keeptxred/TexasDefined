CREATE TABLE IF NOT EXISTS public.texasdefined_newsletter_deliveries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  issue_id uuid NOT NULL REFERENCES public.texasdefined_newsletter_issues(id) ON DELETE CASCADE,
  subscriber_id uuid NOT NULL REFERENCES public.texasdefined_newsletter_subscribers(id) ON DELETE RESTRICT,
  email text NOT NULL CHECK (char_length(email) BETWEEN 5 AND 320),
  status text NOT NULL DEFAULT 'queued' CHECK (status IN ('queued', 'sending', 'sent', 'delivered', 'bounced', 'complained', 'failed', 'skipped')),
  provider text CHECK (provider IS NULL OR char_length(provider) <= 80),
  provider_message_id text CHECK (provider_message_id IS NULL OR char_length(provider_message_id) <= 500),
  queued_at timestamptz NOT NULL DEFAULT now(),
  sending_started_at timestamptz,
  sent_at timestamptz,
  delivered_at timestamptz,
  failed_at timestamptz,
  error_code text CHECK (error_code IS NULL OR char_length(error_code) <= 120),
  error_message text CHECK (error_message IS NULL OR char_length(error_message) <= 2000),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb CHECK (jsonb_typeof(metadata) = 'object'),
  UNIQUE (issue_id, subscriber_id)
);

ALTER TABLE public.texasdefined_newsletter_deliveries ENABLE ROW LEVEL SECURITY;

REVOKE ALL ON TABLE public.texasdefined_newsletter_deliveries FROM anon, authenticated;
GRANT ALL ON TABLE public.texasdefined_newsletter_deliveries TO service_role;

CREATE INDEX IF NOT EXISTS texasdefined_newsletter_deliveries_queue_idx
  ON public.texasdefined_newsletter_deliveries (status, queued_at)
  WHERE status IN ('queued', 'sending');
CREATE INDEX IF NOT EXISTS texasdefined_newsletter_deliveries_issue_idx
  ON public.texasdefined_newsletter_deliveries (issue_id, status);
CREATE INDEX IF NOT EXISTS texasdefined_newsletter_deliveries_provider_message_idx
  ON public.texasdefined_newsletter_deliveries (provider_message_id)
  WHERE provider_message_id IS NOT NULL;

COMMENT ON TABLE public.texasdefined_newsletter_deliveries IS
  'Per-subscriber newsletter delivery queue and provider outcome ledger.';
