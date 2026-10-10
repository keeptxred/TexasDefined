-- Applied to shared Supabase as migration 20261010213947.
-- Private notification queue; no email transport, no external API calls.
CREATE TABLE IF NOT EXISTS public.texasdefined_network_email_outbox(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 event_key text NOT NULL UNIQUE,
 event_type text NOT NULL CHECK(event_type IN(
  'application_received','application_approved','application_rejected',
  'owner_enabled','membership_active','membership_inactive',
  'revision_approved','revision_rejected')),
 recipient_email text NOT NULL,payload jsonb NOT NULL DEFAULT '{}'::jsonb,
 status text NOT NULL DEFAULT 'pending' CHECK(status IN('pending','sending','sent','failed','suppressed')),
 attempts integer NOT NULL DEFAULT 0 CHECK(attempts>=0),
 provider_message_id text,created_at timestamptz NOT NULL DEFAULT now(),sent_at timestamptz
);
CREATE INDEX IF NOT EXISTS network_email_outbox_status_created_idx ON public.texasdefined_network_email_outbox(status,created_at);
ALTER TABLE public.texasdefined_network_email_outbox ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.texasdefined_network_email_outbox FROM PUBLIC,anon,authenticated;
GRANT SELECT,INSERT,UPDATE,DELETE ON public.texasdefined_network_email_outbox TO service_role;
CREATE OR REPLACE FUNCTION public.network_enqueue_notification(p_event_key text, p_event_type text, p_recipient_email text, p_payload jsonb)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
BEGIN
 IF p_recipient_email IS NULL OR length(p_recipient_email)>254
 OR p_recipient_email !~ '^[^@[:space:]]+@[^@[:space:]]+\.[^@[:space:]]+$' THEN
   RAISE EXCEPTION 'Invalid notification recipient';
 END IF;
 INSERT INTO public.texasdefined_network_email_outbox(event_key,event_type,recipient_email,payload)
 VALUES (p_event_key,p_event_type,lower(btrim(p_recipient_email)),p_payload)
 ON CONFLICT (event_key) DO NOTHING;
END;
$function$
;
REVOKE ALL ON FUNCTION public.network_enqueue_notification(text,text,text,jsonb) FROM PUBLIC,anon,authenticated;
GRANT EXECUTE ON FUNCTION public.network_enqueue_notification(text,text,text,jsonb) TO service_role;
CREATE OR REPLACE FUNCTION public.network_application_email_events()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
DECLARE
 key_base text;
BEGIN
 key_base := 'application:' || NEW.id::text || ':tx:' || txid_current()::text || ':';
 IF TG_OP='INSERT' THEN
  PERFORM public.network_enqueue_notification(
   'application:'||NEW.id::text||':received','application_received',NEW.contact_email,
   jsonb_build_object('business_name',NEW.business_name,'application_id',NEW.id));
 ELSE
  IF NEW.status IS DISTINCT FROM OLD.status THEN
   IF NEW.status='approved' AND OLD.status IN ('pending_review','rejected') THEN
    PERFORM public.network_enqueue_notification(key_base||'approved','application_approved',NEW.contact_email,
      jsonb_build_object('business_name',NEW.business_name,'application_id',NEW.id));
   ELSIF NEW.status='rejected' THEN
    PERFORM public.network_enqueue_notification(key_base||'rejected','application_rejected',NEW.contact_email,
      jsonb_build_object('business_name',NEW.business_name,'application_id',NEW.id));
   END IF;
  END IF;
  IF NEW.plan='plus' AND NEW.paid_entitlement_active IS DISTINCT FROM OLD.paid_entitlement_active THEN
   PERFORM public.network_enqueue_notification(key_base||'membership',
     CASE WHEN NEW.paid_entitlement_active THEN 'membership_active' ELSE 'membership_inactive' END,
     NEW.contact_email,jsonb_build_object('business_name',NEW.business_name,'application_id',NEW.id));
  END IF;
 END IF;
 RETURN NEW;
END;
$function$
;
DROP TRIGGER IF EXISTS network_application_email_events ON public.texasdefined_network_applications;
CREATE TRIGGER network_application_email_events AFTER INSERT OR UPDATE OF status,paid_entitlement_active ON public.texasdefined_network_applications FOR EACH ROW EXECUTE FUNCTION public.network_application_email_events();
CREATE OR REPLACE FUNCTION public.network_owner_email_events()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
DECLARE recipient text; business text;
BEGIN
 IF NEW.access_enabled AND (TG_OP='INSERT' OR NOT OLD.access_enabled) THEN
  SELECT contact_email,business_name INTO recipient,business
  FROM public.texasdefined_network_applications WHERE id=NEW.application_id;
  IF recipient IS NOT NULL THEN
   PERFORM public.network_enqueue_notification(
     'owner:'||NEW.id::text||':enabled:tx:'||txid_current()::text,
     'owner_enabled',recipient,
     jsonb_build_object('business_name',business,'application_id',NEW.application_id));
  END IF;
 END IF;
 RETURN NEW;
END;
$function$
;
DROP TRIGGER IF EXISTS network_owner_email_events ON public.texasdefined_network_business_accounts;
CREATE TRIGGER network_owner_email_events AFTER INSERT OR UPDATE OF access_enabled ON public.texasdefined_network_business_accounts FOR EACH ROW EXECUTE FUNCTION public.network_owner_email_events();
CREATE OR REPLACE FUNCTION public.network_revision_email_events()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
DECLARE recipient text; business text; app_id uuid;
BEGIN
 IF NEW.review_status IS DISTINCT FROM OLD.review_status
  AND NEW.review_status IN ('approved','rejected') THEN
  SELECT a.contact_email,a.business_name,a.id INTO recipient,business,app_id
  FROM public.texasdefined_network_business_accounts b
  JOIN public.texasdefined_network_applications a ON a.id=b.application_id
  WHERE b.id=NEW.business_account_id;
  IF recipient IS NOT NULL THEN
   PERFORM public.network_enqueue_notification(
     'revision:'||NEW.id::text||':'||NEW.review_status,
     CASE WHEN NEW.review_status='approved' THEN 'revision_approved' ELSE 'revision_rejected' END,
     recipient,jsonb_build_object('business_name',business,'application_id',app_id,'revision_id',NEW.id));
  END IF;
 END IF;
 RETURN NEW;
END;
$function$
;
DROP TRIGGER IF EXISTS network_revision_email_events ON public.texasdefined_network_profile_revisions;
CREATE TRIGGER network_revision_email_events AFTER UPDATE OF review_status ON public.texasdefined_network_profile_revisions FOR EACH ROW EXECUTE FUNCTION public.network_revision_email_events();
