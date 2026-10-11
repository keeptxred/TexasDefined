-- Applied as Supabase migration 20261011000421 (October 10 local time).
-- Internal SECURITY DEFINER trigger functions must not be direct public API RPCs.
REVOKE ALL ON FUNCTION public.network_application_email_events() FROM PUBLIC,anon,authenticated;
REVOKE ALL ON FUNCTION public.network_owner_email_events() FROM PUBLIC,anon,authenticated;
REVOKE ALL ON FUNCTION public.network_revision_email_events() FROM PUBLIC,anon,authenticated;
