-- Applied 20261010213336 to shared Supabase project ftkznprjljkhymknvhye.
CREATE OR REPLACE FUNCTION public.network_suspend_ineligible_listing()
RETURNS trigger LANGUAGE plpgsql SET search_path = ''
AS $function$
BEGIN
  IF NEW.status NOT IN ('approved','published')
    OR (NEW.plan = 'plus' AND NEW.paid_entitlement_active IS NOT TRUE)
    OR NEW.plan <> OLD.plan THEN
    UPDATE public.texasdefined_network_public_listings
      SET is_published=false,updated_at=now()
      WHERE application_id=NEW.id AND is_published=true;
  END IF;
  RETURN NEW;
END;
$function$;
DROP TRIGGER IF EXISTS network_suspend_ineligible_listing ON public.texasdefined_network_applications;
CREATE TRIGGER network_suspend_ineligible_listing
AFTER UPDATE OF status,paid_entitlement_active,plan
ON public.texasdefined_network_applications
FOR EACH ROW EXECUTE FUNCTION public.network_suspend_ineligible_listing();
