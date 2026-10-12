-- UNAPPLIED PENDING release migration. Authorized, versioned promotion required.
-- Installs a private append-only audit for sensitive Network state transitions.
-- No production changes are authorized by committing this file.
BEGIN;
SET LOCAL lock_timeout = '5s';
SET LOCAL statement_timeout = '45s';

CREATE TABLE IF NOT EXISTS texasdefined_network_internal.admin_action_audit(
 id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
 entity_type text NOT NULL CHECK(entity_type IN ('application','listing','revision','business_account')),
 entity_id uuid NOT NULL,
 action_name text NOT NULL CHECK(action_name IN ('editorial_status','subscription_entitlement','listing_visibility','revision_review','owner_access')),
 old_state text,
 new_state text,
 database_role text NOT NULL DEFAULT current_user,
 transaction_id bigint NOT NULL DEFAULT txid_current(),
 occurred_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS network_admin_action_audit_lookup_idx
 ON texasdefined_network_internal.admin_action_audit(entity_type,entity_id,occurred_at DESC);
ALTER TABLE texasdefined_network_internal.admin_action_audit ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON texasdefined_network_internal.admin_action_audit FROM PUBLIC,anon,authenticated,service_role;
GRANT SELECT ON texasdefined_network_internal.admin_action_audit TO service_role;

CREATE OR REPLACE FUNCTION texasdefined_network_internal.network_audit_sensitive_state_transition()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path TO ''
AS $body$
BEGIN
 IF TG_TABLE_NAME='texasdefined_network_applications' AND TG_OP='UPDATE' THEN
  IF OLD.status IS DISTINCT FROM NEW.status THEN
   INSERT INTO texasdefined_network_internal.admin_action_audit
   (entity_type,entity_id,action_name,old_state,new_state)
   VALUES ('application',NEW.id,'editorial_status',OLD.status,NEW.status);
  END IF;
  IF OLD.paid_entitlement_active IS DISTINCT FROM NEW.paid_entitlement_active THEN
   INSERT INTO texasdefined_network_internal.admin_action_audit
   (entity_type,entity_id,action_name,old_state,new_state)
   VALUES ('application',NEW.id,'subscription_entitlement',
    OLD.paid_entitlement_active::text,NEW.paid_entitlement_active::text);
  END IF;
 ELSIF TG_TABLE_NAME='texasdefined_network_public_listings' THEN
  IF TG_OP='INSERT' THEN
   INSERT INTO texasdefined_network_internal.admin_action_audit
   (entity_type,entity_id,action_name,old_state,new_state)
   VALUES ('listing',NEW.application_id,'listing_visibility',NULL,NEW.is_published::text);
  ELSIF OLD.is_published IS DISTINCT FROM NEW.is_published THEN
   INSERT INTO texasdefined_network_internal.admin_action_audit
   (entity_type,entity_id,action_name,old_state,new_state)
   VALUES ('listing',NEW.application_id,'listing_visibility',
     OLD.is_published::text,NEW.is_published::text);
  END IF;
 ELSIF TG_TABLE_NAME='texasdefined_network_profile_revisions' AND TG_OP='UPDATE' THEN
  IF OLD.review_status IS DISTINCT FROM NEW.review_status THEN
   INSERT INTO texasdefined_network_internal.admin_action_audit
   (entity_type,entity_id,action_name,old_state,new_state)
   VALUES ('revision',NEW.id,'revision_review',OLD.review_status,NEW.review_status);
  END IF;
 ELSIF TG_TABLE_NAME='texasdefined_network_business_accounts' THEN
  IF TG_OP='INSERT' THEN
   INSERT INTO texasdefined_network_internal.admin_action_audit
   (entity_type,entity_id,action_name,old_state,new_state)
   VALUES ('business_account',NEW.id,'owner_access',NULL,NEW.access_enabled::text);
  ELSIF OLD.access_enabled IS DISTINCT FROM NEW.access_enabled THEN
   INSERT INTO texasdefined_network_internal.admin_action_audit
   (entity_type,entity_id,action_name,old_state,new_state)
   VALUES ('business_account',NEW.id,'owner_access',
      OLD.access_enabled::text,NEW.access_enabled::text);
  END IF;
 END IF;
 RETURN NEW;
END;
$body$;
REVOKE ALL ON FUNCTION texasdefined_network_internal.network_audit_sensitive_state_transition()
 FROM PUBLIC,anon,authenticated;
GRANT EXECUTE ON FUNCTION texasdefined_network_internal.network_audit_sensitive_state_transition()
 TO service_role;

DROP TRIGGER IF EXISTS network_sensitive_application_audit ON public.texasdefined_network_applications;
CREATE TRIGGER network_sensitive_application_audit AFTER UPDATE OF status,paid_entitlement_active
 ON public.texasdefined_network_applications FOR EACH ROW
 EXECUTE FUNCTION texasdefined_network_internal.network_audit_sensitive_state_transition();
DROP TRIGGER IF EXISTS network_sensitive_listing_audit ON public.texasdefined_network_public_listings;
CREATE TRIGGER network_sensitive_listing_audit AFTER INSERT OR UPDATE OF is_published
 ON public.texasdefined_network_public_listings FOR EACH ROW
 EXECUTE FUNCTION texasdefined_network_internal.network_audit_sensitive_state_transition();
DROP TRIGGER IF EXISTS network_sensitive_revision_audit ON public.texasdefined_network_profile_revisions;
CREATE TRIGGER network_sensitive_revision_audit AFTER UPDATE OF review_status
 ON public.texasdefined_network_profile_revisions FOR EACH ROW
 EXECUTE FUNCTION texasdefined_network_internal.network_audit_sensitive_state_transition();
DROP TRIGGER IF EXISTS network_sensitive_owner_audit ON public.texasdefined_network_business_accounts;
CREATE TRIGGER network_sensitive_owner_audit AFTER INSERT OR UPDATE OF access_enabled
 ON public.texasdefined_network_business_accounts FOR EACH ROW
 EXECUTE FUNCTION texasdefined_network_internal.network_audit_sensitive_state_transition();

-- A single service-role identity does not distinguish the human owner's
-- actions from delegated tools. These immutable database events preserve
-- transitions and transaction context only; trusted request attribution
-- remains an independent operational release requirement.

COMMIT;
