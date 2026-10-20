-- Applied to Supabase project ftkznprjljkhymknvhye as migration 20261012012809.
REVOKE ALL ON TABLE public.texasdefined_network_checkout_acceptances FROM service_role;
GRANT SELECT, INSERT ON TABLE public.texasdefined_network_checkout_acceptances TO service_role;

CREATE OR REPLACE FUNCTION public.prevent_texasdefined_network_terms_mutation()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = ''
AS $function$
BEGIN
  IF OLD.terms_version IS DISTINCT FROM NEW.terms_version
    OR OLD.terms_snapshot_sha256 IS DISTINCT FROM NEW.terms_snapshot_sha256
    OR OLD.terms_accepted_at IS DISTINCT FROM NEW.terms_accepted_at
    OR OLD.representative_authority_accepted IS DISTINCT FROM NEW.representative_authority_accepted
    OR OLD.facts_responsibility_accepted IS DISTINCT FROM NEW.facts_responsibility_accepted
    OR OLD.media_responsibility_accepted IS DISTINCT FROM NEW.media_responsibility_accepted
    OR OLD.search_indexing_accepted IS DISTINCT FROM NEW.search_indexing_accepted
  THEN
    RAISE EXCEPTION 'Network terms acceptance evidence is immutable';
  END IF;
  RETURN NEW;
END;
$function$;

REVOKE ALL ON FUNCTION public.prevent_texasdefined_network_terms_mutation()
  FROM PUBLIC, anon, authenticated;

DROP TRIGGER IF EXISTS network_application_terms_immutable
  ON public.texasdefined_network_applications;
CREATE TRIGGER network_application_terms_immutable
BEFORE UPDATE OF
  terms_version,
  terms_snapshot_sha256,
  terms_accepted_at,
  representative_authority_accepted,
  facts_responsibility_accepted,
  media_responsibility_accepted,
  search_indexing_accepted
ON public.texasdefined_network_applications
FOR EACH ROW
EXECUTE FUNCTION public.prevent_texasdefined_network_terms_mutation();
