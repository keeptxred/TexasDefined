ALTER TABLE public.texasdefined_newsletter_subscribers
  ADD COLUMN IF NOT EXISTS provider text,
  ADD COLUMN IF NOT EXISTS provider_contact_id text,
  ADD COLUMN IF NOT EXISTS provider_synced_at timestamptz;

ALTER TABLE public.texasdefined_newsletter_issues
  ADD COLUMN IF NOT EXISTS provider text,
  ADD COLUMN IF NOT EXISTS provider_campaign_id text,
  ADD COLUMN IF NOT EXISTS provider_synced_at timestamptz;

ALTER TABLE public.texasdefined_newsletter_events
  DROP CONSTRAINT IF EXISTS texasdefined_newsletter_events_event_type_check;

ALTER TABLE public.texasdefined_newsletter_events
  ADD CONSTRAINT texasdefined_newsletter_events_event_type_check
  CHECK (event_type IN (
    'accepted', 'sent', 'delivered', 'opened', 'clicked',
    'delivery_delayed', 'failed', 'suppressed', 'bounced',
    'complained', 'unsubscribed'
  ));

CREATE UNIQUE INDEX IF NOT EXISTS texasdefined_newsletter_subscribers_provider_contact_uidx
  ON public.texasdefined_newsletter_subscribers (provider, provider_contact_id)
  WHERE provider IS NOT NULL AND provider_contact_id IS NOT NULL;

CREATE UNIQUE INDEX IF NOT EXISTS texasdefined_newsletter_issues_provider_campaign_uidx
  ON public.texasdefined_newsletter_issues (provider, provider_campaign_id)
  WHERE provider IS NOT NULL AND provider_campaign_id IS NOT NULL;

COMMENT ON COLUMN public.texasdefined_newsletter_subscribers.provider_contact_id IS
  'External marketing-provider contact ID; TexasDefined remains the canonical consent/suppression record.';
COMMENT ON COLUMN public.texasdefined_newsletter_issues.provider_campaign_id IS
  'External marketing-provider campaign/broadcast ID used to reconcile provider webhooks.';
