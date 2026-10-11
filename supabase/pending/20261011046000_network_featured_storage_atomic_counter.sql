-- PENDING / UNAPPLIED. DO NOT RUN ON HOSTED SUPABASE WITHOUT OWNER APPROVAL.
-- Actual Supabase Storage HTTP exposed a real 23->25 image quota race (two 200s)
-- despite the old advisory-lock/check-in-RLS function. Preserve that historical
-- migration; install atomic per-business counters via SECURITY DEFINER triggers.
-- Counts are durable, row-locked, and updated inside the same INSERT/DELETE tx.
-- AFTER INSERT is essential: PostgreSQL fires BEFORE INSERT even for an
-- INSERT ON CONFLICT DO NOTHING/DO UPDATE that inserts no Storage object.
-- Accounting only actual inserted rows prevents false quota consumption.
-- A failed Storage INSERT rolls back its counter increment automatically.

-- Start an explicit transaction because Supabase CLI applies SQL statements
-- individually and PostgreSQL LOCK TABLE is invalid outside a transaction.
-- Backfill, usage guards, and all three triggers must activate atomically.
BEGIN;
-- Fail quickly rather than hold up shared Storage metadata writes.
SET LOCAL lock_timeout = '5s';
SET LOCAL statement_timeout = '45s';

-- Installing this on hosted Storage will briefly block writes while existing
-- objects are backfilled. Review operational deployment window first.
LOCK TABLE storage.objects IN SHARE ROW EXCLUSIVE MODE;

CREATE TABLE IF NOT EXISTS texasdefined_network_internal.featured_storage_usage (
 business_account_id uuid PRIMARY KEY REFERENCES
  public.texasdefined_network_business_accounts(id) ON DELETE RESTRICT,
 object_count integer NOT NULL DEFAULT 0 CHECK (object_count BETWEEN 0 AND 24)
);
REVOKE ALL ON texasdefined_network_internal.featured_storage_usage
 FROM PUBLIC,anon,authenticated,service_role;
ALTER TABLE texasdefined_network_internal.featured_storage_usage ENABLE ROW LEVEL SECURITY;

-- Refuse to introduce a counter for unknown or maliciously mismatched media.
-- A pre-existing non-empty project must be reconciled instead of discarding or
-- silently excluding rows from the quota.
DO $preflight$
BEGIN
 IF EXISTS (
  SELECT 1 FROM storage.objects o
  WHERE o.bucket_id='texasdefined-network-featured-drafts'
   AND NOT EXISTS (
    SELECT 1 FROM public.texasdefined_network_business_accounts b
    WHERE split_part(o.name,'/',1)=b.owner_user_id::text
     AND split_part(o.name,'/',2)=b.id::text
     AND split_part(o.name,'/',3)<>''
     AND split_part(o.name,'/',4)=''
   )
 ) THEN RAISE EXCEPTION 'Unmatched existing Featured media; reconcile before applying atomic quota migration'; END IF;
 IF EXISTS (
  SELECT 1 FROM storage.objects o
  WHERE o.bucket_id='texasdefined-network-featured-drafts'
  GROUP BY split_part(o.name,'/',2)
  HAVING count(*)>24
 ) THEN RAISE EXCEPTION 'Existing Featured media quota exceeded; review without destructive cleanup'; END IF;
END;
$preflight$;

INSERT INTO texasdefined_network_internal.featured_storage_usage(business_account_id,object_count)
SELECT b.id,count(*)::integer
FROM storage.objects o
JOIN public.texasdefined_network_business_accounts b
 ON split_part(o.name,'/',1)=b.owner_user_id::text
 AND split_part(o.name,'/',2)=b.id::text
WHERE o.bucket_id='texasdefined-network-featured-drafts'
GROUP BY b.id
ON CONFLICT(business_account_id) DO UPDATE
SET object_count=EXCLUDED.object_count;

CREATE OR REPLACE FUNCTION texasdefined_network_internal.enforce_featured_storage_insert_quota()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path TO ''
AS $body$
DECLARE v_owner text; v_account text; v_uuid uuid; v_count integer;
BEGIN
 IF NEW.bucket_id<>'texasdefined-network-featured-drafts' THEN RETURN NEW; END IF;
 v_owner=pg_catalog.split_part(NEW.name,'/',1);
 v_account=pg_catalog.split_part(NEW.name,'/',2);
 IF v_owner!~'^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$'
   OR v_account!~'^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$'
   OR pg_catalog.split_part(NEW.name,'/',3)=''
   OR pg_catalog.split_part(NEW.name,'/',4)<>''
 THEN RAISE EXCEPTION USING ERRCODE='42501',MESSAGE='Invalid Featured media account path'; END IF;
 v_uuid=v_account::uuid;
 IF NOT EXISTS(
  SELECT 1 FROM public.texasdefined_network_business_accounts b
  WHERE b.id=v_uuid AND b.owner_user_id::text=v_owner
 ) THEN RAISE EXCEPTION USING ERRCODE='42501',MESSAGE='Featured media has no matching owner binding'; END IF;
 -- PostgreSQL ON CONFLICT DO UPDATE re-evaluates the updated row after
 -- competing transactions commit. This remains serial even when a Storage
 -- request's RLS count snapshot was taken before another request committed.
 INSERT INTO texasdefined_network_internal.featured_storage_usage AS usage
  (business_account_id,object_count)
 VALUES(v_uuid,1)
 ON CONFLICT(business_account_id) DO UPDATE
 SET object_count=usage.object_count+1
 WHERE usage.object_count<24
 RETURNING object_count INTO v_count;
 IF v_count IS NULL
 THEN RAISE EXCEPTION USING ERRCODE='42501',MESSAGE='Featured private draft limit: 24 images'; END IF;
 RETURN NEW;
END;
$body$;

CREATE OR REPLACE FUNCTION texasdefined_network_internal.release_featured_storage_delete_quota()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path TO ''
AS $body$
BEGIN
 IF OLD.bucket_id<>'texasdefined-network-featured-drafts' THEN RETURN OLD; END IF;
 UPDATE texasdefined_network_internal.featured_storage_usage
 SET object_count=object_count-1
 WHERE business_account_id=pg_catalog.split_part(OLD.name,'/',2)::uuid
   AND object_count>0;
 IF NOT FOUND
 THEN RAISE EXCEPTION 'Featured media usage was inconsistent; deletion refused'; END IF;
 RETURN OLD;
END;
$body$;

CREATE OR REPLACE FUNCTION texasdefined_network_internal.prevent_featured_storage_move()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path TO ''
AS $body$
BEGIN
 IF (OLD.bucket_id='texasdefined-network-featured-drafts'
  OR NEW.bucket_id='texasdefined-network-featured-drafts')
  AND (OLD.bucket_id IS DISTINCT FROM NEW.bucket_id
       OR OLD.name IS DISTINCT FROM NEW.name)
 THEN RAISE EXCEPTION USING ERRCODE='42501',MESSAGE='Featured draft moves need controlled re-upload'; END IF;
 RETURN NEW;
END;
$body$;

REVOKE ALL ON FUNCTION texasdefined_network_internal.enforce_featured_storage_insert_quota() FROM PUBLIC,anon,authenticated,service_role;
REVOKE ALL ON FUNCTION texasdefined_network_internal.release_featured_storage_delete_quota() FROM PUBLIC,anon,authenticated,service_role;
REVOKE ALL ON FUNCTION texasdefined_network_internal.prevent_featured_storage_move() FROM PUBLIC,anon,authenticated,service_role;

DROP TRIGGER IF EXISTS network_featured_usage_before_insert ON storage.objects;
DROP TRIGGER IF EXISTS network_featured_usage_after_insert ON storage.objects;
CREATE TRIGGER network_featured_usage_after_insert AFTER INSERT ON storage.objects
 FOR EACH ROW EXECUTE FUNCTION texasdefined_network_internal.enforce_featured_storage_insert_quota();
DROP TRIGGER IF EXISTS network_featured_usage_after_delete ON storage.objects;
CREATE TRIGGER network_featured_usage_after_delete AFTER DELETE ON storage.objects
 FOR EACH ROW EXECUTE FUNCTION texasdefined_network_internal.release_featured_storage_delete_quota();
DROP TRIGGER IF EXISTS network_featured_usage_prevent_move ON storage.objects;
CREATE TRIGGER network_featured_usage_prevent_move BEFORE UPDATE OF name,bucket_id ON storage.objects
 FOR EACH ROW EXECUTE FUNCTION texasdefined_network_internal.prevent_featured_storage_move();

-- Do not remove/relax owner-scoped RLS policies: this independent trigger
-- enforces quota even if an RLS count check observes a stale snapshot.

-- On any failure (including preflight) PostgreSQL rolls this whole migration
-- back. No partially installed counter or trigger can survive.
COMMIT;
