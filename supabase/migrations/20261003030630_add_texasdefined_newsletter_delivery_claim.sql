CREATE OR REPLACE FUNCTION public.claim_texasdefined_newsletter_deliveries(
  p_limit integer DEFAULT 50,
  p_provider text DEFAULT NULL
)
RETURNS TABLE (
  id uuid,
  issue_id uuid,
  subscriber_id uuid,
  email text
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN QUERY
  WITH claimable AS (
    SELECT d.id
    FROM public.texasdefined_newsletter_deliveries d
    JOIN public.texasdefined_newsletter_subscribers s ON s.id = d.subscriber_id
    JOIN public.texasdefined_newsletter_issues i ON i.id = d.issue_id
    WHERE d.status = 'queued'
      AND s.status = 'active'
      AND i.status IN ('ready', 'scheduled', 'sending')
      AND (i.scheduled_for IS NULL OR i.scheduled_for <= now())
    ORDER BY d.queued_at, d.id
    LIMIT GREATEST(1, LEAST(COALESCE(p_limit, 50), 500))
    FOR UPDATE OF d SKIP LOCKED
  ), updated AS (
    UPDATE public.texasdefined_newsletter_deliveries d
    SET status = 'sending',
        provider = p_provider,
        sending_started_at = now(),
        updated_at = now()
    FROM claimable c
    WHERE d.id = c.id
    RETURNING d.id, d.issue_id, d.subscriber_id, d.email
  )
  SELECT u.id, u.issue_id, u.subscriber_id, u.email
  FROM updated u;
END;
$$;

REVOKE ALL ON FUNCTION public.claim_texasdefined_newsletter_deliveries(integer, text) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.claim_texasdefined_newsletter_deliveries(integer, text) TO service_role;
