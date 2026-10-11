-- UNAPPLIED PENDING MIGRATION; only the sole owner can approve official promotion.
-- Manual recovery of uncertain Microsoft Graph notifications. NO live dispatcher,
-- sender credentials, automatic retries, provider calls, or customer data changes.
-- A Graph HTTP 202 or timeout does NOT prove delivery; no automatic status='sent'.
BEGIN;
SET LOCAL lock_timeout = '5s';
SET LOCAL statement_timeout = '45s';

CREATE TABLE IF NOT EXISTS texasdefined_network_internal.notification_reconciliation_audit(
 id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
 notification_id uuid NOT NULL REFERENCES public.texasdefined_network_email_outbox(id),
 resolution text NOT NULL CHECK (resolution IN ('sent_verified','not_delivered_retry','failed_verified','suppress_uncertain')),
 evidence_reference text NOT NULL CHECK (length(btrim(evidence_reference)) BETWEEN 20 AND 500),
 reviewer_label text NOT NULL CHECK (length(btrim(reviewer_label)) BETWEEN 3 AND 100),
 reconciled_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE texasdefined_network_internal.notification_reconciliation_audit ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON texasdefined_network_internal.notification_reconciliation_audit FROM PUBLIC,anon,authenticated,service_role;
GRANT SELECT ON texasdefined_network_internal.notification_reconciliation_audit TO service_role;
CREATE INDEX IF NOT EXISTS network_notification_reconciliation_lookup_idx
 ON texasdefined_network_internal.notification_reconciliation_audit(notification_id,reconciled_at DESC);

CREATE OR REPLACE FUNCTION public.reconcile_texasdefined_network_notification(
 p_id uuid, p_claim_token uuid, p_resolution text, p_evidence_reference text,
 p_reviewer_label text, p_verified_provider_id text DEFAULT NULL)
RETURNS boolean LANGUAGE plpgsql SECURITY DEFINER SET search_path TO ''
AS $function$
DECLARE existing record;
BEGIN
 IF p_resolution NOT IN ('sent_verified','not_delivered_retry','failed_verified','suppress_uncertain')
 OR length(btrim(coalesce(p_evidence_reference,''))) NOT BETWEEN 20 AND 500
 OR length(btrim(coalesce(p_reviewer_label,''))) NOT BETWEEN 3 AND 100
 THEN RAISE EXCEPTION 'Manual reconciliation requires approved resolution, evidence and reviewer'; END IF;
 SELECT status,claim_token,attempts INTO existing
 FROM public.texasdefined_network_email_outbox WHERE id=p_id FOR UPDATE;
 IF NOT FOUND OR existing.status NOT IN ('sending','suppressed')
 OR (existing.status='suppressed' AND p_resolution='suppress_uncertain')
 OR existing.claim_token IS DISTINCT FROM p_claim_token OR p_claim_token IS NULL
 THEN RETURN false; END IF;
 IF p_resolution='not_delivered_retry' AND existing.attempts>=3
 THEN RAISE EXCEPTION 'Notification retry budget exhausted'; END IF;
 IF p_resolution='sent_verified' AND
 (p_verified_provider_id IS NULL OR length(btrim(p_verified_provider_id))<6
 OR length(btrim(p_verified_provider_id))>300)
 THEN RAISE EXCEPTION 'Verified provider message reference mandatory for manual sent status'; END IF;
 UPDATE public.texasdefined_network_email_outbox
 SET status = CASE p_resolution
  WHEN 'sent_verified' THEN 'sent'
  WHEN 'not_delivered_retry' THEN 'pending'
  WHEN 'failed_verified' THEN 'failed'
  ELSE 'suppressed' END,
  claim_token = CASE WHEN p_resolution='not_delivered_retry' THEN NULL ELSE claim_token END,
  claimed_at = CASE WHEN p_resolution='not_delivered_retry' THEN NULL ELSE claimed_at END,
  claim_available_at = CASE WHEN p_resolution='not_delivered_retry' THEN now()+interval '15 minutes' ELSE claim_available_at END,
  sent_at = CASE WHEN p_resolution='sent_verified' THEN now() ELSE NULL END,
  provider_message_id=CASE WHEN p_resolution='sent_verified' THEN btrim(p_verified_provider_id) ELSE NULL END,
  error_code=CASE p_resolution
   WHEN 'failed_verified' THEN 'manual_provider_failure'
   WHEN 'suppress_uncertain' THEN 'ambiguous_delivery_manual_hold'
   ELSE NULL END
 WHERE id=p_id AND status IN ('sending','suppressed') AND claim_token=p_claim_token;
 IF NOT FOUND THEN RETURN false; END IF;
 INSERT INTO texasdefined_network_internal.notification_reconciliation_audit(
  notification_id,resolution,evidence_reference,reviewer_label)
 VALUES(p_id,p_resolution,btrim(p_evidence_reference),btrim(p_reviewer_label));
 RETURN true;
END;
$function$;
REVOKE ALL ON FUNCTION public.reconcile_texasdefined_network_notification(uuid,uuid,text,text,text,text)
 FROM PUBLIC,anon,authenticated;
GRANT EXECUTE ON FUNCTION public.reconcile_texasdefined_network_notification(uuid,uuid,text,text,text,text)
 TO service_role;
-- Operational warning: reviewer_label and evidence_reference are manually supplied;
-- source-level checks do not authenticate the administrator or verify Graph Sent Items.
-- A definitive provider delivery/non-delivery decision must be independently documented.

COMMIT;
