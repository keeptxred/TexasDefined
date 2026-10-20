> **CURRENT PRODUCTION STATUS — October 11, 2026 (supersedes older prelaunch paragraphs below).** Owner requested production release. Network foundation PR [#4545](https://github.com/keeptxred/TexasDefined/pull/4545) **merged** into `main` as `b49764dcc6f8ad3a212338e5786a4ea77e66dd14` after four exact-HEAD green workflows on `7880c94984404dc683770da3e58446fc9eed3273`. The four security migrations below were **successfully installed in shared production Supabase** and independently confirmed by query. PostgreSQL assigned versions `20261011183108` (owner SELECT revocation), `20261011183126` (sensitive-action audit), `20261011183129` (manual Graph reconciliation), `20261011183131` (atomic private Storage quota). Protected policy includes `access_enabled=true` and `membership_tier='featured'`; all three atomic quota triggers and both private audit tables are present. Zero Network applications/objects preceded migration. No hosted test customer, Stripe charge, Graph send, public activation or website deployment verification has occurred. The `supabase/pending/` copies now represent historical, **already-applied** source mirrors for CI; normal versioned source files are tracked under `supabase/migrations/`. No additional application of these SQL files is authorized or needed. Payment, Graph delivery, owner-portal and public indexing launch decisions remain separate. This is an accurate *repository/database release*, not proof of successful Cloudflare live route deployment.

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

## FINAL HANDOFF — October 11 read-only hosted preflight, out-of-order registry and approval gates

**Observed current state (not deployment):** Prior unchanged-source certification is exact SHA `26ddc7461fda1041d7faf5f5b3b77caad6ba45a4`, with four successful workflow runs **38159498525 / 38159498580 / 38159498602 / 38159498584**. At recovery PR #4545 was open/draft/mergeable/unmerged, main `fc373557707bed5e1ce8d70ce67f689c107f85ec`, 464 ahead and zero behind. Hosted Supabase still lacks all four pending versions, has 0 Network application/account/revision/listing/outbox/media objects and no branch; hosted owner-revision SELECT policy is missing `access_enabled`. **Security vulnerability remains open**. No private objects/production users were created. No Stripe or Graph delivery was activated.

**Important official-versioning preflight:** Shared hosted migration history has *newer non-Network* versions **20261011043154, 20261011043158, 20261011043223 and 20261011045107**; these interleave with proposed Network **043000, 044000, 045000, 046000** timestamps. Before owner-authorized promotion, compare every host/source migration and do an exact official CLI versioned dry run; require an explicit approved plan for backfilling older unapplied migration versions without touching applied historical files or unrelated site deployments. Reject a migration push that proposes any surprising unrelated SQL. The fourth proposed file needs low-write timing and one-attempt 5-second lock acquisition on global `storage.objects`, full transaction, statement timeout and backup/recovery preparation. A failed lock is a STOP, not a retry loop.

**Provider evidence refreshed:** Only connected Stripe LIVE account `acct_1TobIzLtRurj6GMN`; Plus price `price_1UP28XLtRurj6GMNwFlYDW6N` active USD $19.99 monthly with exclusive tax behavior, parent product inactive; **zero** live portal configurations and **six** existing non-Network webhook endpoints (do not alter). Outlook profile matches `admin@texasdefined.com` but cannot alone establish Graph tenant permission/delivery. Hosted staging, Stripe TEST, true mail delivery and real authenticated browser acceptance remain missing.

### Production release decision matrix (2026-10-11, evidence-conservative)

| Workstream | Source complete | Real integration verified | Production ready | Deployed/active |
|---|---|---|---|---|
| Applications / owner access | Yes, disposable checks | Hosted NO | NO | NO (existing SQL schema only) |
| Supabase RLS / 4 pending migrations | Prepared/tested only | Hosted NO | NO (revocation flaw) | Four NO |
| Storage / Featured media | Yes, real disposable HTTP | Hosted NO | NO | Old schema only; quota upgrade NO |
| Stripe / billing | Helpers and synthetic tests | Provider TEST NO | NO | Live Plus inactive; checkout NO |
| Graph / notifications | Claim planner only; worker missing | Real Graph NO | NO | Delivery NO |
| Business policies | Draft only | Approval NO | NO | NO |
| Browser / accessibility | Disposable Chrome PASS | Authenticated hosted NO | NO | Network release NO |
| Security / monitoring | Partial source and procedures | Hosted incident tests NO | NO | Network monitoring unverified |
| Public directory / SEO | Prepared, preview noindex | Production rollout NO | NO | Network directory promotion NO |
| Final merge / release | Draft PR and source CI | End-to-end NO | NO | NO |

**Next owner authorization in ONE packet:**
(A) Explicitly approve or decline controlled hosted SQL promotion of four migrations (with special Storage low-write window; separate from staging).
(B) Permit an isolated hosted nonproduction Supabase/staging hostname with two synthetic users and media, subject to separate *confirmed zero cost* or a separately approved amount; supply deployment/secret access without sharing production secrets.
(C) Connect real Stripe TEST-mode context and provide scoped staging test key, independent price and signed webhook; do not expose secrets in PR/comments/chat.
(D) Authorize narrowly scoped Graph Mail.Send for `admin@texasdefined.com` plus a separate limited, named set of test recipient messages. Keep production delivery OFF.
(E) Approve or amend business terms in `PROPOSED_BUSINESS_POLICIES.md`, including Basic, Plus, Featured, tax/refunds/cancellation/licensing/privacy/retention.
(F) After staging/provider acceptance, **separately** authorize merge, production site deploy, provider live configuration, intake, owners, paid Checkout, email, directory publication and indexing. No approval of (A) automatically approves (F).

**Defect / recovery protocol:** Hosted stage acceptance report must enumerate PASS/FAIL/NOT RUN plus environment, timestamps, redacted provider/SQL evidence and exact tested commit. After a new source change recertify its own exact HEAD; do not borrow successful runs from ancestor. On a failed/ambiguous global Storage lock stop and inspect, never blind-retry. Do not convert migration source preparation into a claim of hosted security remediation. Pending SQL and feature flags remain OFF until explicitly authorized and verified.

### October 11 source Graph worker follow-up

Introduced a **default-disabled bounded Graph dispatch worker core** with max five claims, duplicate/invalid claim refusal, no-send outcome rehearsals and redacted manual-resolution results; connected its test to the protected Merge Gate and a release guard. It does not claim SQL rows, call Microsoft Graph, get tokens, schedule jobs, send test email, finish SQL notifications or change either false activation constant. On the PR, source additions require newly passing **exact HEAD** checks before calling them certified. Real mailbox-scoped Mail.Send, staging provider tests, Sent Items correlation and constrained deployment remain outstanding and separately owner-gated. This is not an authorization to switch on Network notification delivery.

## Immutable pending migration source manifest — October 11 recovery

The following **Git blob SHA-1 object IDs** and UTF-8 byte lengths were read directly from the PR branch after the final quota hardening, without rewriting the SQL. They identify the exact current source contents; they are **not** applied-database migration hashes or evidence of hosted deployment.

| Pending migration filename | Git blob object ID | UTF-8 bytes | Explicit transaction | LOCAL safeguards |
|---|---|---:|---|---|
| `20261011043000_network_owner_revision_read_revocation.sql` | `f0f1c5aafc85cba7960bcbeebbd475b77e957546` | 1386 | BEGIN/COMMIT | 5s lock; 45s statement |
| `20261011044000_network_sensitive_action_audit.sql` | `9c0d41569bd1dd9f82c7fc31726ffd49b6b2747d` | 5763 | BEGIN/COMMIT | 5s lock; 45s statement |
| `20261011045000_network_notification_manual_recovery.sql` | `e113c62abb6ad256c5f7c4b46a954befdb465746` | 4787 | BEGIN/COMMIT | 5s lock; 45s statement |
| `20261011046000_network_featured_storage_atomic_counter.sql` | `db58bf3e537ff04f613cc418f3bb697e88ece0db` | 7646 | BEGIN/COMMIT | 5s lock; 45s statement |

Before authorized versioned promotion, compare the current Git object IDs with these entries **and stop if any have changed** without fresh review and disposable CI. Independently record SHA-256 of the exact promoted files and official migration output once a release workstation is available. Supabase history does not record/check source blob IDs automatically. Do not assert that 5s/45s limits guarantee short blocking time; the fourth migration explicitly obtains a shared-storage write lock and requires a low-write window. None of these four versions was recorded applied during the read-only production inspection.

**Actual hosted migration interleave warning:** Already-applied unrelated migration versions `20261011043154`, `20261011043158`, `20261011043223`, and `20261011045107` overlap the timestamps of these pending scripts. An official CLI dry-run and exact source-versus-host version parity check are mandatory; do not create phantom history entries, overwrite unrelated migrations or bypass surprise pending versions.

### No-send Graph HTTP transport prepared (2026-10-11, NOT activated)

`src/data/network-notification-graph-transport.server.ts` now constructs the exact Microsoft Graph `POST https://graph.microsoft.com/v1.0/users/admin%40texasdefined.com/sendMail` request from an independently validated claim, enforces one matching recipient and the approved reply mailbox, bounds payload length and uses redirect refusal, no-store and a 12-second timeout. Its bearer token is injected only in the guarded send function; it is never returned by request preparation. **No Graph secret or tenant-scoped Mail.Send authority was provisioned, and neither compile-time OFF delivery flag was changed.** The HTTP method remains unreachable by website routes, jobs or timers. Tests demonstrate the default OFF guard blocks even an injected mock transport, and forged recipient/oversize requests are rejected. A future owner-authorized staging adapter must secure mailbox-scoped permissions, test Graph acceptance and actual Sent Items correlation, and perform evidence-backed manual reconciliation; never treat 202 as delivery.

This source preparation does **not** qualify as hosted Graph acceptance, test-mail permission, production email delivery, or an approved launch.

### Microsoft Graph least-privilege / official CLI reference review (October 11)

Verified current Microsoft documentation:
- [Microsoft Graph sendMail v1.0](https://learn.microsoft.com/en-us/graph/api/user-sendmail?view=graph-rest-1.0): `POST /users/{userPrincipalName}/sendMail` requires `Mail.Send`; HTTP **202 Accepted is NOT delivery confirmation**. Check Sent Items and other provider evidence before manual reconciliation, and do not auto-resend uncertain accepted messages.
- [Exchange Online RBAC for Applications](https://learn.microsoft.com/en-us/exchange/permissions-exo/application-rbac): for unattended application identity, apply a resource-scoped `Application Mail.Send` assignment restricted to exactly `admin@texasdefined.com`; do not grant unrestricted tenant-wide `Mail.Send` in Entra ID in parallel, because combined permission grants may widen mailbox access. Independently check app cannot send as another tenant mailbox before staging acceptance. Delegated `Mail.Send` is an alternative only with an explicitly approved interactive/refresh identity and is not assumed appropriate for a background worker.
- [Supabase CLI db push](https://supabase.com/docs/reference/cli/introduction): `--dry-run` shows the migration plan; `--include-all` includes older unrecorded versions. It **does not** make blind promotion of the interleaved four pending versions safe. Use supported CLI version on an approved correctly linked target, reconcile *all* unrelated applied/pending history, review the exact four-file set, and stop if anything surprising would run.

These references concern future authorization/procedure only. No tenant permission, provider request or remote migration was changed.

## Hosted staging owner-isolation acceptance — runnable READ-ONLY harness, not yet executed

Source: `scripts/data/network-hosted-stage-readonly.mjs`; offline synthetic verification: `scripts/data/network-hosted-stage-readonly.test.mjs` (wired to canonical pre-merge). It accepts **no service-role key**, no SQL password and no production host. Running it requires exact explicit `NETWORK_HOSTED_STAGE_READONLY_APPROVED=approved-isolated-staging-only`, a separately authorized nonproduction `https://<project>.supabase.co` tenant matching `NETWORK_STAGE_PROJECT_REF`, its *publishable* API key, and short-lived real JWTs for two separately confirmed synthetic `@example.invalid` owners. Their two Featured account UUIDs, two private revision UUIDs and two already-uploaded media basenames must be supplied by the authorized staging operator via environment secrets (never in command logs). Setup/mutation of those fixtures is a **separate owner-approved operation**; this harness does not create them.

Run the checked-in script with the variables documented in its header in an isolated authorized staging job. It performs ONLY HTTP GETs to GoTrue `/auth/v1/user`, the protected accounts and private revisions REST collections, and private object URLs. Ten distinct assertions cover two confirmed identities, each owner's exact account and revision visibility, each owner's own permitted private image, and cross-owner object denial in both directions. Each isolated test must include meaningful seeded revisions/media; 200-empty collections do not count as success. If a cross-owner revision is visible or private object GET is successful, the script fails. Output includes only an aggregate verdict and check count, never emails, JWTs, private media, SQL or secrets.

**What this does NOT prove:** owner sign-up/email delivery, write authorization, live concurrent 24th/25th uploads, signed URL expiration, disabled-owner revocation, app intake, publication, Chrome login journeys, Stripe/Graph delivery, production flags or real production migration remediation. These still require separately authorized hosted staging tests and documented evidence. The offline mocked test only verifies this script's safety/logic—not hosted acceptance. Do not run it on production or quietly provision a new project; query and approve Supabase cost first.

## October 11 continuation — tested production read-only Network health and staged revocation acceptance preparation

**Actual independent hosted read-only SQL evidence:** `scripts/data/network-operations-readonly.sql` successfully executed through connected Supabase on shared project `ftkznprjljkhymknvhye`. The aggregate output reported 0 Network applications, owners, revisions, published listings, queued/delayed/failed/uncertain notification claims, Network Storage objects, Featured drafts and Plus entitlement drift. Production still reports **0/4 pending upgrade versions applied; owner_revision_revocation_policy_present=false; atomic_storage_trigger_count=0/3; missing sensitive-action audit and Graph reconciliation tables**. This is a non-PII snapshot and diagnostic evidence, not permission to change SQL or to claim provider readiness. This query is intentionally SELECT-only; its source safety check is in the canonical Merge Gate.

**Two-phase hosted staging validation source (not executed externally):** The `network-hosted-stage-readonly.mjs` harness validates two confirmed synthetic `@example.invalid` Auth users, separately bound Featured accounts, private revisions, own Storage reads and cross-owner denials in both directions under a nonproduction host. It now also supports `NETWORK_STAGE_REVOCATION_PHASE=revoked-owner-two` **after a separately approved operator action disables owner TWO in the isolated staging database**, while owner ONE stays enabled. A still-valid owner TWO JWT must get **zero** private revisions and forbidden private image reads, while owner ONE must retain revision and image access. The currently hosted production RLS policy would not pass the disabled-revision check; the four pending security migrations must be promoted to the authorized staging environment first. Neither phase creates, updates or deletes users or objects. The Stage tool only accepts a publishable API key or a legacy JWT key whose embedded role is `anon`, never `service_role`. Synthetic CI mocks establish test-tool fail-closed behavior, not real hosted validation.

**Acceptance sequence:** (1) explicitly approve nonproduction tenant and synthetic fixtures; (2) deploy staged versioned migrations, record SHA and host; (3) run baseline stage read-only; (4) independently disable staging owner TWO through an authorized admin action; (5) rerun in `revoked-owner-two` phase; (6) capture actual HTTP statuses and redacted results, then separately exercise concurrent uploads, signed URLs, real browser flows and Stripe/Graph test providers. No production migrations, feature activation or provider mutations were performed in this continuation.

### Hosted staging harness corrections — October 11, source only

Independently verified against the Supabase private-download documentation and the repository's already-passing local real-Storage HTTP test: private object GET **must** use `/storage/v1/object/authenticated/texasdefined-network-featured-drafts/{owner_uuid}/{account_uuid}/{filename}`. The earlier hosted harness had mistakenly used the public object download route. All four private Storage probes now use the authenticated endpoint. The offline HTTP mock now strictly matches that authenticated route, so an incorrect public route cannot produce a false acceptance.

The disabled-owner phase now first reads the actual owner-visible `texasdefined_network_business_accounts` row and verifies `access_enabled=false` for owner TWO, before checking that the still-authenticated JWT sees zero private revisions and cannot download its previously accessible private file. Owner ONE remains the functioning positive control. This status assertion is compatible with the current hosted `network_owner_accounts_read` policy, which allows the owner to SELECT its own disabled account row. The corresponding tests distinguish (a) owner was never disabled, (b) disabled owner still sees a private revision, and (c) disabled owner can download private Storage media; a general API outage does not substitute for revocation evidence.

Hosted staging configuration now also locally decodes *untrusted* JWT claims to reject service_role or otherwise non-`authenticated` owner tokens, mismatched `sub`, and tokens that are expired/within 30 seconds of expiration. **The local decode is not signature validation**; actual `/auth/v1/user` still performs remote JWT verification. No real identity, staging project or private media was created or accessed here. The new synthetic test cases are required by the canonical Merge Gate; real hosted acceptance remains blocked pending separate authorization.

### Single-cutover Stripe webhook signing separation (draft PR #4660)

In the new draft, production TexasDefined Network billing uses **only** the dedicated `NETWORK_STRIPE_WEBHOOK_SECRET=whsec_...` secret for its registered Stripe Network endpoint. Do not reuse a shared legacy `STRIPE_WEBHOOK_SECRET` from unrelated brands or products. The test-mode endpoint uses only `NETWORK_STRIPE_TEST_WEBHOOK_SECRET` and `sk_test_` credentials on a truly isolated Supabase staging project. Verify events + service-side current Stripe subscription + idempotent Supabase entitlement against actual providers before the one atomic customer launch.


## Four-tier pricing / hosted Website launch-scope update

Superseding the early three-plan preparation sections **for future work only**, the owner proposed a separate fourth **Website $79.95/month** offering, in addition to **Featured $49.95/month**, Plus $19.99/month and Basic Free. The Website package is a **managed and bounded five-page TexasDefined-hosted business microsite**, not merely a richer profile. Existing Shared Supabase only permits `basic`/`plus` application plans and `plus`/`featured` owner accounts; no independent Website entitlement or Stripe price is configured. Staged implementation must add secure migrations, page revisions, content/media quotas, owner workflow, actual five-page rendering, unique SEO/sitemaps, safe cancellation, customer content portability, distinct subscription verification and a 15th evidence category `hostedWebsiteDelivered`. Do not apply new production SQL or start paid subscriptions on the strength of pricing UI or documentation. See `FOUR_TIER_HOSTED_WEBSITE_LAUNCH_CONTRACT_2026-10-11.md` for exact proposed caps, deliverables and external tests.
