ALTER TABLE public.texasdefined_newsletter_subscribers
  ADD COLUMN IF NOT EXISTS confirmation_token uuid DEFAULT gen_random_uuid();

ALTER TABLE public.texasdefined_newsletter_subscribers
  ADD COLUMN IF NOT EXISTS confirmation_requested_at timestamptz;

CREATE UNIQUE INDEX IF NOT EXISTS texasdefined_newsletter_subscribers_confirmation_token_uidx
  ON public.texasdefined_newsletter_subscribers (confirmation_token)
  WHERE confirmation_token IS NOT NULL;
