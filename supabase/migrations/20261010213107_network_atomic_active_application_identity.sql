-- Applied to shared Supabase project as migration 20261010213107.
-- Concurrency-safe duplicate prevention, excluding rejected applications.
CREATE UNIQUE INDEX IF NOT EXISTS texasdefined_network_applications_active_identity_key
ON public.texasdefined_network_applications (
  lower(btrim(contact_email)),
  lower(regexp_replace(btrim(business_name), '[[:space:]]+', ' ', 'g')),
  lower(regexp_replace(btrim(city), '[[:space:]]+', ' ', 'g'))
)
WHERE status IN ('pending_review','approved','published');
