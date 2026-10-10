-- Originally applied to shared Supabase 2026-10-10 as 20261010224959_network_notification_delivery_claim_ledger.
-- Source recovery: function bodies read back from actual deployed database.
-- Provides durable idempotent claims only. Does NOT implement or enable an email sender.
ALTER TABLE public.texasdefined_network_email_outbox
 ADD COLUMN IF NOT EXISTS claim_token uuid,
 ADD COLUMN IF NOT EXISTS claimed_at timestamptz,
 ADD COLUMN IF NOT EXISTS error_code text,
 ADD COLUMN IF NOT EXISTS claim_available_at timestamptz NOT NULL DEFAULT now();
CREATE OR REPLACE FUNCTION public.claim_texasdefined_network_notification(p_limit integer DEFAULT 10)
 RETURNS TABLE(id uuid, event_key text, event_type text, recipient_email text, payload jsonb, claim_token uuid, attempts integer)
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
BEGIN
 IF p_limit IS NULL OR p_limit<1 OR p_limit>25 THEN RAISE EXCEPTION 'Invalid claim batch size'; END IF;
 RETURN QUERY
 WITH eligible AS (
  SELECT o.id FROM public.texasdefined_network_email_outbox o
  WHERE o.status='pending' AND o.claim_available_at<=now() AND o.attempts<3
  ORDER BY o.created_at,o.id FOR UPDATE SKIP LOCKED LIMIT p_limit
 ), claimed AS (
  UPDATE public.texasdefined_network_email_outbox o
  SET status='sending',claim_token=gen_random_uuid(),claimed_at=now(),attempts=o.attempts+1
  FROM eligible e WHERE o.id=e.id
  RETURNING o.id,o.event_key,o.event_type,o.recipient_email,o.payload,o.claim_token,o.attempts
 )
 SELECT c.id,c.event_key,c.event_type,c.recipient_email,c.payload,c.claim_token,c.attempts FROM claimed c;
END;
$function$;

CREATE OR REPLACE FUNCTION public.finish_texasdefined_network_notification(p_id uuid, p_token uuid, p_provider_message_id text, p_status text, p_error_code text DEFAULT NULL::text)
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
BEGIN
 IF p_status NOT IN('sent','failed') THEN RAISE EXCEPTION 'Invalid delivery outcome'; END IF;
 IF p_status='sent' AND (p_provider_message_id IS NULL OR length(btrim(p_provider_message_id))<3)
 THEN RAISE EXCEPTION 'Provider acknowledgment is mandatory'; END IF;
 IF p_status='failed' AND (p_error_code IS NULL OR length(btrim(p_error_code))<3)
 THEN RAISE EXCEPTION 'Definitive provider failure code is mandatory'; END IF;
 UPDATE public.texasdefined_network_email_outbox
 SET status=p_status,
     provider_message_id=CASE WHEN p_status='sent' THEN left(btrim(p_provider_message_id),300) ELSE NULL END,
     sent_at=CASE WHEN p_status='sent' THEN now() ELSE NULL END,
     error_code=CASE WHEN p_status='failed' THEN left(btrim(p_error_code),120) ELSE NULL END
 WHERE id=p_id AND claim_token=p_token AND status='sending';
 RETURN FOUND;
END;
$function$;
REVOKE ALL ON FUNCTION public.claim_texasdefined_network_notification(integer) FROM PUBLIC,anon,authenticated;
REVOKE ALL ON FUNCTION public.finish_texasdefined_network_notification(uuid,uuid,text,text,text) FROM PUBLIC,anon,authenticated;
GRANT EXECUTE ON FUNCTION public.claim_texasdefined_network_notification(integer) TO service_role;
GRANT EXECUTE ON FUNCTION public.finish_texasdefined_network_notification(uuid,uuid,text,text,text) TO service_role;
