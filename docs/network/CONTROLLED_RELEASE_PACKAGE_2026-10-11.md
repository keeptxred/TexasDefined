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
 'network_featured_usage_after_insert','network_featured_usage_after_delete',
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


## Isolated Stripe test-mode acceptance path (source prepared, NO provider testing yet)

The source previously required live-only `sk_live_`, `cs_live_`, live-mode webhook events and a live-only historic checkout finalizer. This continuation adds an **opt-in, fail-closed test-mode runtime** with no defaults changed. The real production configuration remains `NETWORK_STRIPE_MODE=live` (or absent) and `NETWORK_CHECKOUT_ENABLED` absent/OFF.

For a separately authorized disposable staging deployment, configure:
- `NETWORK_STRIPE_MODE=test`
- `NETWORK_STRIPE_TEST_MODE_ENABLED=true`
- `NETWORK_ISOLATED_STAGING=true`
- `NETWORK_CHECKOUT_ENABLED=true` **on the isolated staging deployment ONLY**
- `STRIPE_SECRET_KEY=sk_test_...`, an actual **test** key; never copy a live secret.
- `NETWORK_STRIPE_TEST_PRICE_ID=price_...`, a separately created/confirmed TEST price not equal to the live price.
- `NETWORK_STRIPE_TEST_WEBHOOK_SECRET=whsec_...`, an isolated test webhook endpoint's signing secret; the live `STRIPE_WEBHOOK_SECRET` is not used in test mode.
- `NETWORK_STAGE_ORIGIN=https://<isolated-nonproduction-host>`, with an exact host match for Checkout/billing/webhooks; the canonical production domain is rejected.
- `SUPABASE_URL` pointing to a distinct authorized disposable database, NOT the shared `ftkznprjljkhymknvhye` project. The server rejects the known shared project URL in test mode. Verify the database instance independently; environment-string checks are defense in depth, not tenancy proof.

No test key, test price, test webhook endpoint, staging host or isolated hosted Supabase tenancy has yet been supplied or provisioned. The connected Stripe account exposes only the live context; **do not run any mutating Stripe test with the live account**. The website's public production flag stays OFF, and no code change here creates accounts, subscriptions, invoices, messages or charges.

**Database caveat:** The already-applied historical `complete_texasdefined_network_checkout` function accepts only `cs_live_` IDs. Do NOT edit that applied migration or loosen live database validation. The source now contains `scripts/data/network-stripe-local-finalizer-overlay.mjs`, an isolated `network_replay`-only generator that changes that historical function solely for disposable local `cs_test_` SQL verification; it never modifies hosted SQL and cannot be run against the shared project. Before true hosted staging provider acceptance, a separately reviewed, **staging-only** version of the finalizer must be installed on the isolated staging database. No such hosted deployment has been authorized.

**Required genuine test provider acceptance:** test-mode Checkout session (including idempotent parallel retries), correct customer/application binding, true Stripe-signed test webhook, duplicate/out-of-order event recovery, active membership, renewal, failed payment, payment recovery, cancellation, proration/refund subject to owner policy, portal, timeout/retry reconciliation, and disabled-owner support. Capture provider event IDs and screenshots without real business PII. Mocked Stripe responses and synthetic database SQL are valuable regressions but do not satisfy any genuine Stripe provider test.

**Read-only live Stripe check on October 11:** recurring Plus price `price_1UP28XLtRurj6GMNwFlYDW6N` is USD $19.99/month, currency USD, tax behavior exclusive, live price active; its parent product `prod_VPrsZ3mYEKz2da` **is inactive** with prelaunch metadata. Do not activate the live product or checkout until all acceptance and owner decisions pass.


## Prelaunch Microsoft Graph claim planner / no-send acceptance

A new pure `prepareNetworkGraphClaim` validates one already-claimed private outbox row, bounds event type, claim token, attempts, business name and recipient, and constructs the approved Office 365 payload from `admin@texasdefined.com`. The `classifyNetworkGraphClaimForOperator` output never authorizes marking an HTTP response delivered or retrying without evidence. The mandatory synthetic tests reject corrupt claims, injections and test network calls; 202, 429, 5xx and crashed/ambiguous responses remain documented manual-resolution cases. **This is not an installed Graph dispatcher, authenticated tenant permission, Sent Items verification, delivered email or operational lease recovery.** Live delivery and staging test mail remain disabled until separately authorized and externally accepted.

Before enabling a real worker: obtain tenant-scoped mailbox-limited Microsoft Graph Mail.Send; confirm no shared/delegated human administrator is required; require a positive sender identity check; install a bounded dedicated claim worker only in an isolated, owner-approved environment; validate redacted logs, claim-token-bound manual reconciliation, no duplicate sends after uncertainty, and accurate Graph accepted-versus-delivered terminology. Do not enable a timer against the shared outbox on the basis of passing pure tests.


### Checkout test-mode database verification

`scripts/data/network-stripe-local-checkout-fixture.sql` runs only within `network_replay` after `network-stripe-local-finalizer-overlay.mjs` installs the `cs_test_` finalizer in that disposable database. It verifies the actual stored procedures' synthetic owner binding, idempotent reservation, fraudulent/wrong-mode denial, successful test-session finalization and safe re-use, then rolls back all data. This is not evidence of a Stripe-issued session, real provider webhook, live consumer billing, or any hosted staging update. Keep historical production `cs_live_` SQL unchanged. Future hosted staging needs its own separately reviewed, approved staging-only `cs_test_` function and genuine test credentials.


## Read-only Stripe readiness findings — October 11, 2026

Account: `acct_1TobIzLtRurj6GMN` (connected **LIVE** context; no TEST account or sandbox). The read-only Stripe API returned these facts; no modifications were attempted:

- The active recurring live price `price_1UP28XLtRurj6GMNwFlYDW6N` charges **USD $19.99/month**, tax behavior `exclusive`.
- Its product `prod_VPrsZ3mYEKz2da` is **inactive**, tagged as prelaunch.
- **Zero billing-portal configurations** exist in the connected live account (read-only `GET /v1/billing_portal/configurations`). This blocks verified customer self-service until a suitable explicit, owner-approved portal configuration is created and cancellation behavior reviewed.
- There are six existing **live** webhook endpoints (some enabled, some disabled). None targets `https://texasdefined.com/api/public/network-stripe-webhook` and none has been certified as the Network subscription event destination. The existing endpoints belong to other workflows and MUST NOT be repurposed, rotated, disabled, or overwritten without their individual owners' approval.
- A real isolated **test-mode account context**, test price, test webhook endpoint/signing secret, and separate staging site+Supabase are not accessible from the currently connected Stripe context.

**Safe order for future explicit owner authorization:** (1) resolve policies, cancellation/refunds, privacy and product benefits; (2) provision isolated staging tenant/host and independent test Stripe key/price/webhook; (3) run genuine signed test Checkout+portal+webhook events and subscription lifecycle; (4) deploy and verify the four currently pending Supabase migrations under controlled migration authorization and global Storage write lock; (5) activate a Network-specific live webhook, confirm deliverability and delivery replay with signed events, configure tested customer portal, activate the live product as appropriate; (6) separately authorize any actual payment collection and public business directory. Do not interpret passing local SQL fixtures as completion of real Stripe provider validation.

### Stripe customer-portal response integrity

The Network billing POST now rejects every Stripe billing-portal session unless the response's object is `billing_portal.session`, its ID has a billing portal session prefix, its `customer` matches the verified owner's exact persisted Stripe customer, its `livemode` matches the trusted runtime, its `return_url` matches that runtime's exact configured origin, and its redirect uses the pinned HTTPS `billing.stripe.com` host. `scripts/data/network-stripe-portal-binding.test.mjs` exercises cross-business, wrong-mode, callback/host spoofing and malformed sessions in the mandatory Merge Gate. This is a **source-level defense**, not evidence that any hosted Stripe portal has been successfully configured.

