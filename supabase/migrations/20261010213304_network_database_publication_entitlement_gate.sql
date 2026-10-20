-- Applied 20261010213304 to shared Supabase project ftkznprjljkhymknvhye.
CREATE OR REPLACE FUNCTION public.network_verify_publication_entitlement()
RETURNS trigger LANGUAGE plpgsql SET search_path = ''
AS $function$
BEGIN
  IF NEW.is_published THEN
    IF NEW.plan NOT IN ('basic','plus') THEN
      RAISE EXCEPTION 'Invalid public Network listing plan';
    END IF;
    PERFORM 1 FROM public.texasdefined_network_applications a
      WHERE a.id = NEW.application_id AND a.plan = NEW.plan
        AND a.status IN ('approved','published')
        AND (NEW.plan = 'basic' OR a.paid_entitlement_active = true)
      FOR SHARE;
    IF NOT FOUND THEN
      RAISE EXCEPTION 'Network listing is not approved or entitled for publication';
    END IF;
  END IF;
  RETURN NEW;
END;
$function$;
DROP TRIGGER IF EXISTS network_publication_entitlement_gate ON public.texasdefined_network_public_listings;
CREATE TRIGGER network_publication_entitlement_gate
BEFORE INSERT OR UPDATE OF application_id,plan,is_published
ON public.texasdefined_network_public_listings
FOR EACH ROW EXECUTE FUNCTION public.network_verify_publication_entitlement();
