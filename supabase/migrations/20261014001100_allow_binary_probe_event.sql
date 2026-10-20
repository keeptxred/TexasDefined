-- The collector emits source_binary_http_ok for successful image/PDF HTTP
-- responses that cannot be safely checksummed through pg_net's text buffer.
ALTER TABLE public.td_authority_verification_checks
  DROP CONSTRAINT td_authority_verification_checks_event_type_check;
ALTER TABLE public.td_authority_verification_checks
  ADD CONSTRAINT td_authority_verification_checks_event_type_check
  CHECK (event_type = ANY (ARRAY[
    'source_unchanged'::text,
    'source_changed'::text,
    'source_unreachable'::text,
    'source_baseline'::text,
    'source_binary_http_ok'::text,
    'editorial_verified'::text,
    'editorial_due'::text
  ]));
