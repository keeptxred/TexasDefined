-- Applied as Supabase migration 20261010214019; distinguish membership activation and deactivation within one transaction.
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
   PERFORM public.network_enqueue_notification(key_base||CASE WHEN NEW.paid_entitlement_active THEN 'membership_active' ELSE 'membership_inactive' END,
     CASE WHEN NEW.paid_entitlement_active THEN 'membership_active' ELSE 'membership_inactive' END,
     NEW.contact_email,jsonb_build_object('business_name',NEW.business_name,'application_id',NEW.id));
  END IF;
 END IF;
 RETURN NEW;
END;
$function$
;
