# TexasDefined Business Network — controlled release package (October 11, 2026)

**State: UNAPPROVED / NOT DEPLOYED. Sole human administrator: the website owner.** No production migration, real owner/test customer, media write, Stripe charge, email, merger or Network public launch is authorized by this document.

## Recovered facts and prior certification

- PR: https://github.com/keeptxred/TexasDefined/pull/4545 — draft, open and mergeable on initial inspection.
- Initial certified feature HEAD: `20c87de8692f8c12d37968c96b9513250785babe`; main `036c708931906604b4915a3bc581608f1a092f8e`, 0 behind. **Subsequent migration-hardening source commits require fresh, exact-HEAD CI**.
- Previously passing exact-initial-HEAD runs: Merge Gate 38152560293; clean-room replay 38152560330; Chrome preview 38152560295; genuine *local*, disposable GoTrue/Storage 38152560256.
- Read-only shared Supabase `ftkznprjljkhymknvhye`: active/healthy, PostgreSQL 17.6.1.155; exactly 34 applied historical Network migration versions, none of the four pending versions. Counts of Network applications, owner accounts, revisions, public listings, notifications and Network media objects were all **zero**.
- Live `network_owner_revisions_read` allows SELECT by owner binding without `access_enabled`; disabled-owner private revision SELECT is **still vulnerable** until the pending patch is installed and independently tested.
- Stripe connector currently exposes only live-mode account `acct_1TobIzLtRurj6GMN`, not a test context. Office 365 connection identifies `admin@texasdefined.com`, which by itself does not verify tenant-scoped Graph Mail.Send or delivery.

## Four pending, unapplied migrations (in order)

1. `20261011043000_network_owner_revision_read_revocation.sql`: replace private owner revision SELECT RLS.
2. `20261011044000_network_sensitive_action_audit.sql`: append-only protected state-change audit/triggers.
3. `20261011045000_network_notification_manual_recovery.sql`: service-only manual evidence-bound reconciliation (not a sender).
4. `20261011046000_network_featured_storage_atomic_counter.sql`: transactional per-owner 24-image media quota counter and triggers.

**All four** now enclose all statements in an explicit `BEGIN` / `COMMIT`, `SET LOCAL lock_timeout='5s'`, and `SET LOCAL statement_timeout='45s'`. The fourth locks the **global** `storage.objects` metadata relation in `SHARE ROW EXCLUSIVE` mode for backfill and trigger installation. This can block writes in unrelated buckets while held; preflight needs an approved low-write window and a traffic assessment. If the lock cannot be acquired within 5 seconds, abort and investigate instead of retrying repeatedly. Statement timeout is a safety ceiling, **not** a planned downtime duration. The files stay under `supabase/pending/` and do not alter the hosted schema.

## Mandatory read-only hosted preflight SQL

Record output privately, do not expose personally identifying applicant details.

```sql
SELECT version,name FROM supabase_migrations.schema_migrations
 WHERE version BETWEEN '20261010153156' AND '20261011046000' ORDER BY version;
SELECT schemaname,tablename,policyname,cmd,roles,qual,with_check
 FROM pg_policies
 WHERE tablename LIKE 'texasdefined_network%'
    OR (schemaname='storage' AND tablename='objects' AND policyname ILIKE '%Featured%')
 ORDER BY schemaname,tablename,policyname;
SELECT n.nspname,p.proname,pg_get_function_identity_arguments(p.oid) AS arguments,
 p.prosecdef,p.proacl FROM pg_proc p JOIN pg_namespace n ON n.oid=p.pronamespace
 WHERE (p.proname ILIKE '%network%' OR n.nspname='texasdefined_network_internal')
 AND n.nspname IN ('public','texasdefined_network_internal') ORDER BY 1,2;
SELECT tgname,tgrelid::regclass,pg_get_triggerdef(oid) FROM pg_trigger
 WHERE NOT tgisinternal AND (tgname ILIKE '%network%' OR tgname ILIKE '%featured%');
SELECT bucket_id,count(*) FROM storage.objects
 WHERE bucket_id LIKE 'texasdefined-network%' GROUP BY bucket_id;
SELECT split_part(name,'/',2) AS account_path,count(*) FROM storage.objects
 WHERE bucket_id='texasdefined-network-featured-drafts'
 GROUP BY 1 ORDER BY 2 DESC;
SELECT i.relname AS index_name,pg_get_indexdef(i.oid) AS definition FROM pg_index x
 JOIN pg_class i ON i.oid=x.indexrelid WHERE x.indrelid='storage.objects'::regclass;
```

Stop if any new version already appears, newer SQL supersedes these changes, a bucket holds unfamiliar paths, an account already exceeds 24 objects, or historical parity differs. Before migration 4 independently verify all existing Featured media match actual business-account owner ID and business-account UUID, and assess non-Network Storage traffic while acquiring `SHARE ROW EXCLUSIVE`. Ensure backups/recovery procedures are available before a production attempt.

## Official promotion procedure (not authorized yet)

1. Obtain **explicit sole-owner** permission for production SQL. Confirm the deployment window and affected shared Storage writes; do isolated staging Auth/Storage acceptance first where authorized, at zero additional cost unless separately approved.
2. Refresh and reconcile main/feature branch and current hosted migration registry. Preserve the 34 applied files; verify no concurrent migration work or superseding patch.
3. Move the *same exact four files* from `supabase/pending/` into `supabase/migrations/` on an authorized release branch, retaining timestamp order and preventing duplicates. The source manifest records applied status only **after** successful actual deployment.
4. Check locally with `supabase --version`, `supabase migration list --help`, `supabase db push --help` and `supabase db push --dry-run` (only on the approved, correctly linked project). Verify exactly what would execute; an unapproved backlog means **stop**, not `--include-all` blindly.
5. In an approved quiet window, perform one official versioned migration deployment. Avoid dashboard ad-hoc SQL, pre-marking history or manual history repair. Retain CLI output and exact hashes.
6. Run the postflight below plus real hosted two-owner Auth JWT/RLS, short-lived signed URL, Storage upload/replacement/concurrency, cross-owner and disabled-owner probes. Do not enable public features until those independently pass.

## Read-only postflight SQL

```sql
SELECT version,name FROM supabase_migrations.schema_migrations
 WHERE version IN ('20261011043000','20261011044000',
 '20261011045000','20261011046000') ORDER BY version;
SELECT policyname,cmd,qual FROM pg_policies
 WHERE schemaname='public' AND tablename='texasdefined_network_profile_revisions'
 AND policyname='network_owner_revisions_read';
SELECT tgname,tgrelid::regclass FROM pg_trigger WHERE NOT tgisinternal AND
 tgname IN ('network_sensitive_application_audit','network_sensitive_listing_audit',
 'network_sensitive_revision_audit','network_sensitive_owner_audit',
 'network_featured_usage_before_insert','network_featured_usage_after_delete',
 'network_featured_usage_prevent_move');
SELECT has_function_privilege('anon',
 'public.reconcile_texasdefined_network_notification(uuid,uuid,text,text,text,text)','EXECUTE')
 AS anon_may_reconcile,
 has_function_privilege('authenticated',
 'public.reconcile_texasdefined_network_notification(uuid,uuid,text,text,text,text)','EXECUTE')
 AS owner_may_reconcile;
SELECT c.oid::regclass,c.relrowsecurity FROM pg_class c
 WHERE c.oid IN ('texasdefined_network_internal.admin_action_audit'::regclass,
 'texasdefined_network_internal.notification_reconciliation_audit'::regclass,
 'texasdefined_network_internal.featured_storage_usage'::regclass);
SELECT u.business_account_id,u.object_count,
 (SELECT count(*) FROM storage.objects o
  WHERE o.bucket_id='texasdefined-network-featured-drafts'
   AND split_part(o.name,'/',2)=u.business_account_id::text) AS actual_objects
 FROM texasdefined_network_internal.featured_storage_usage u;
```

Expected after approval: 4 new migration versions, SELECT RLS includes `access_enabled` and Featured tier, 7 named triggers, false/false for public/owner reconciliation privilege, all 3 private tables RLS true, and counter/object count parity. Always inspect functional tests as well: schema presence is not full hosted acceptance.

## Rollback / forward repair boundaries

- A failed migration transaction rolls back **that one migration** including its lock/counter/triggers; previously committed migrations stay applied. Inspect history and logs after a failure; never assume all four are absent or all four succeeded.
- Prefer a separately versioned, reviewed **forward repair** to removing the revoked RLS protection or dropping quota protection while owner uploads remain active. Leave owner upload/public-intake flags OFF until settled. Do not reset migration history or delete applicant media to force a clean deployment.
- Storage API deletions, Graph delivery and Stripe side effects are **not** part of a Postgres rollback. Track uncertain outcomes and provider evidence separately; a Graph HTTP 202 is not delivered status, and uncertain sends must never auto-resend.
- For an incident: disable *only Network* activation flags, preserve records, capture non-PII diagnostics, freeze impacted Network actions, reconcile errors and rerun real service acceptance. Coordinate unrelated website Storage usage rather than globally switching off services.

## One owner decision / integration packet

Business proposals remain **unapproved** in `docs/network/PROPOSED_BUSINESS_POLICIES.md`: Basic eligibility, business categories, verified authority, included fields; Plus `$19.99/month` exact features/taxes/renewal; Featured price/features/rights/downgrades; editorial review, corrections/rejections/appeals; photo licenses and takedowns; customer consent and separate marketing notices; cancellations, effective term, refunds/proration/failed payments; storage and proof-retention/deletion schedules, privacy/rights requests, optional indexing/advertising disclosure.

**External evidence required, no claim of completion:**
- Authorized isolated hosted Supabase tenant with verified representative, account identity, JWT, Storage and real staging application/publication/revision workflows.
- Stripe **test-mode** credentials/context for real Checkout, signed webhooks, repeated/out-of-order events, renewal, failure, refunds/portal/cancellation. Connected live mode cannot substitute.
- Microsoft Graph sender permission and explicitly authorized test-send program from `admin@texasdefined.com`, claim worker, retry/timeouts, Sent Items evidence and ambiguity reconciliation; the connected mailbox alone is not transport acceptance.
- Actual authenticated deployed browser QA, production env/feature flag provenance, sole-admin key rotation rehearsal, monitoring and alerting.
- Separate explicit decisions for SQL promotion, staging account/file creation, Graph testing, Stripe live activation, public intake, profile publication, directory indexing, PR merge/deploy. No second human approver exists.

**Current release verdict:** source CI can certify engineering only; hosted provider acceptance is pending; launch is **not** approved. Keep PR #4545 draft, Network intake/checkout/directory/publication/owner portal/notification/indexing OFF.
