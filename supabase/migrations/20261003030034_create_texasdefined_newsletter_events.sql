CREATE TABLE IF NOT EXISTS public.texasdefined_newsletter_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  delivery_id uuid NOT NULL REFERENCES public.texasdefined_newsletter_deliveries(id) ON DELETE CASCADE,
  event_type text NOT NULL CHECK (event_type IN ('accepted', 'delivered', 'opened', 'clicked', 'bounced', 'complained', 'unsubscribed')),
  event_at timestamptz NOT NULL DEFAULT now(),
  provider_event_id text CHECK (provider_event_id IS NULL OR char_length(provider_event_id) <= 500),
  url text CHECK (url IS NULL OR char_length(url) <= 4000),
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb CHECK (jsonb_typeof(metadata) = 'object'),
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.texasdefined_newsletter_events ENABLE ROW LEVEL SECURITY;

REVOKE ALL ON TABLE public.texasdefined_newsletter_events FROM anon, authenticated;
GRANT ALL ON TABLE public.texasdefined_newsletter_events TO service_role;

CREATE UNIQUE INDEX IF NOT EXISTS texasdefined_newsletter_events_provider_event_uidx
  ON public.texasdefined_newsletter_events (provider_event_id)
  WHERE provider_event_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS texasdefined_newsletter_events_delivery_idx
  ON public.texasdefined_newsletter_events (delivery_id, event_at DESC);
CREATE INDEX IF NOT EXISTS texasdefined_newsletter_events_type_idx
  ON public.texasdefined_newsletter_events (event_type, event_at DESC);

COMMENT ON TABLE public.texasdefined_newsletter_events IS
  'Provider/webhook newsletter delivery events used for deliverability and aggregate newsletter reporting.';
