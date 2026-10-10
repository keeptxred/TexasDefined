-- Applied to shared Supabase as migration 20261010225436. Zero Network applications existed when deployed.
-- Enqueue application-received only AFTER all requested private media has uploaded.
ALTER TABLE public.texasdefined_network_applications ADD COLUMN IF NOT EXISTS intake_complete boolean NOT NULL DEFAULT false;
ALTER TABLE public.texasdefined_network_applications DROP CONSTRAINT IF EXISTS network_review_requires_completed_intake;
ALTER TABLE public.texasdefined_network_applications ADD CONSTRAINT network_review_requires_completed_intake
 CHECK (intake_complete OR status NOT IN ('approved','published'));
CREATE OR REPLACE FUNCTION public.finalize_texasdefined_network_intake(p_application_id uuid, p_logo text, p_gallery text[])
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
DECLARE a record; item text;
BEGIN
 SELECT id,plan,status,intake_complete INTO a
 FROM public.texasdefined_network_applications WHERE id=p_application_id FOR UPDATE;
 IF NOT FOUND OR a.intake_complete OR a.status<>'pending_review' THEN RETURN false; END IF;
 IF p_gallery IS NULL OR cardinality(p_gallery)>4
   OR (a.plan='basic' AND cardinality(p_gallery)>0) THEN RETURN false; END IF;
 IF p_logo IS NOT NULL THEN
  IF left(p_logo,length(a.id::text)+1)<>a.id::text||'/'
   OR NOT EXISTS (SELECT 1 FROM storage.objects
     WHERE bucket_id='texasdefined-network-applications' AND name=p_logo)
  THEN RETURN false; END IF;
 END IF;
 FOREACH item IN ARRAY p_gallery LOOP
  IF item IS NULL OR left(item,length(a.id::text)+1)<>a.id::text||'/'
    OR NOT EXISTS (SELECT 1 FROM storage.objects
      WHERE bucket_id='texasdefined-network-applications' AND name=item)
  THEN RETURN false; END IF;
 END LOOP;
 UPDATE public.texasdefined_network_applications SET
  logo_storage_path=p_logo,gallery_storage_paths=p_gallery,
  intake_complete=true,updated_at=now()
 WHERE id=a.id AND intake_complete=false;
 RETURN FOUND;
END;
$function$
;
REVOKE ALL ON FUNCTION public.finalize_texasdefined_network_intake(uuid,text,text[]) FROM PUBLIC,anon,authenticated;
GRANT EXECUTE ON FUNCTION public.finalize_texasdefined_network_intake(uuid,text,text[]) TO service_role;
CREATE OR REPLACE FUNCTION public.network_application_email_events()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
DECLARE key_base text;
BEGIN
 IF TG_OP='INSERT' THEN RETURN NEW; END IF;
 key_base := 'application:' || NEW.id::text || ':tx:' || txid_current()::text || ':';
 IF NEW.intake_complete AND NOT OLD.intake_complete THEN
  PERFORM public.network_enqueue_notification(
   'application:'||NEW.id::text||':received','application_received',NEW.contact_email,
   jsonb_build_object('business_name',NEW.business_name,'application_id',NEW.id));
 END IF;
 IF NOT NEW.intake_complete THEN RETURN NEW; END IF;
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
  PERFORM public.network_enqueue_notification(
   key_base||CASE WHEN NEW.paid_entitlement_active THEN 'membership_active' ELSE 'membership_inactive' END,
   CASE WHEN NEW.paid_entitlement_active THEN 'membership_active' ELSE 'membership_inactive' END,
   NEW.contact_email,jsonb_build_object('business_name',NEW.business_name,'application_id',NEW.id));
 END IF;
 RETURN NEW;
END;
$function$
;
DROP TRIGGER IF EXISTS network_application_email_events ON public.texasdefined_network_applications;
CREATE TRIGGER network_application_email_events AFTER INSERT OR UPDATE OF status,paid_entitlement_active,intake_complete
 ON public.texasdefined_network_applications FOR EACH ROW EXECUTE FUNCTION public.network_application_email_events();
