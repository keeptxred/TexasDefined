# TexasDefined Network — verified owner provisioning and launch gate

Updated: 2026-10-10. Feature branch only; not a launch approval.

## Preconditions (required for every application)

1. A Plus application has passed editorial review and is in `approved` or `published` status.
2. A human reviewer independently confirms the applicant is authorized to act for the named business. Contact-email knowledge or website presence alone are insufficient. Record the independent evidence in the approved internal review system, not in public descriptions.
3. **Only after the approved owner-portal launch gate is enabled**, the authorized applicant opens `/business/dashboard`, requests a Supabase email OTP, signs in, and completes email confirmation. Before launch, `NETWORK_OWNER_PORTAL_ENABLED` defaults OFF and the page must not send email. Authentication by itself does **not** provision ownership.
4. In the private Network applications admin, enter that existing authenticated Supabase user UUID for the reviewed Plus application. Explicitly attest to the independent verification before clicking **Enable verified owner**.
5. The server verifies the admin key, application approval and Plus tier, exact match of confirmed Auth email to the original application contact email, prevents reassignment of an existing owner, and enables the owner binding.
6. Recheck ownership and access in the admin review; if any evidence is missing, **do not** provision. No invitations, charges, Stripe activation or automatic publication follow provisioning.
7. The public business dashboard and billing endpoints require authorized, enabled owner binding; publication additionally requires separate editorial approval and Plus payment entitlement.

## Mandatory prelaunch test matrix

- [ ] Unauthenticated and wrong-user owner provisioning requests denied
- [ ] Wrong or unconfirmed email denied; UUID for another applicant denied
- [ ] Reassignment of an existing business to another UUID denied
- [ ] Inactive owner denied Checkout, billing portal and profile update
- [ ] Confirmed matching user, independently verified business and authorized admin can provision, then sign in
- [ ] Concurrent provisioning attempts cannot create duplicate owners (unique database constraint)
- [ ] Basic account cannot receive Plus/Featured owner privileges by this action
- [ ] Billing and publication webhook tests use isolated mocks or Stripe test mode, never live customer charges
- [ ] CI canonical merge gate and bundle budget pass on the **exact PR head**
- [ ] Production SSR/hydration, mobile, accessibility, security and RLS tests pass
- [ ] Office365 notification identity and suppression behavior are verified separately
- [ ] Explicit launch approval and independent signoff before enabling checkout, indexed discovery, or production merge

## Current launch blockers and completed protections (verified October 10, 2026)

**Implemented and tested in the draft feature branch:** A dedicated default-off Network admin secret replaces the sports-partner admin key; service-only atomic owner provisioning persists verification method, non-sensitive evidence reference and reviewer; Plus and Featured privileges are separated; Stripe event, publication, unpublish and Featured revision transitions have transactional Supabase RPCs with rollback-only fixture coverage. Main JavaScript and primary/route-specific CSS passed unchanged bundle limits on a prior exact branch head. Mobile/desktop Chrome preview QA passed 23/23 tests on a prior exact head, with full-page screenshot capture subsequently added.

**Still required before launch:** Network admin uses a dedicated shared secret, not identity-based per-operator RBAC; acceptance of this authorization model or an approved RBAC upgrade needs an explicit security decision. Microsoft 365 runtime delivery, rate-limited send worker and real deliverability remain unconfigured. Complete non-live Stripe lifecycle testing (including cancellations, retries, webhooks and portal), real controlled-owner sign-in/Storage API integration, final exact-HEAD CI plus inspection of current full-page screenshots, and separately authorized live deployment/browser regression remain outstanding. The optional read-only 45-day media candidate inventories do not authorize deletion; a retention policy and safe cleanup procedure remain undecided. Any Featured price, business launch, production merge, email transport, indexing and activation flags require explicit operator approval.

**Do not interpret any earlier failure narrative in this document as a present blocker after its corresponding fix.** The permanent `docs/network/IMPLEMENTATION_STATUS.md` ledger provides the detailed chronological evidence and authoritative latest verified head.

## Plus versus Featured membership authorization (October 10 continuation)
- Approved Plus applications are provisioned into `membership_tier = plus`; NEVER grant `featured` merely for verified Plus ownership. The prior code incorrectly set `featured` due to a Featured-only database constraint.
- A Plus owner can sign in and access only their reviewed account, published public listing and membership billing. Featured profile-edit submission and Featured private-media upload remain limited by live RLS to an enabled account with `membership_tier = featured`.
- Featured upgrade remains a separate manual, independently approved process, not automatically performed by Plus checkout or email confirmation.
- Database migration `20261010205801_network_owner_plus_tier_guard` permits explicit `plus` or `featured`, changes the default to the least-privileged `plus`, and tightens Featured draft SELECT to enabled Featured owners. Test authorization boundaries before launch.

## Plus first subscription path
- After manual approval and verified Plus owner provisioning, owner signs into `/network/billing`; the server returns an eligible-to-checkout flag only for approved Plus accounts without an existing subscription.
- The Checkout action stays disabled until the real production `NETWORK_CHECKOUT_ENABLED` gate is explicitly enabled at launch. The Checkout API independently re-verifies confirmed email, owner binding, approval, and absence of a subscription.
- Do not test by creating live sessions, charges, or real customer users before authorized launch; use mocks or non-live test mode.


## Auditable atomic owner provisioning
Use the administrator-only form after approval. Independently verify control of the actual business, then supply method, publicly reviewable source or non-sensitive summary (never IDs/passports), and reviewer label. Confirm the Supabase user has verified the exact application email. The service-only RPC validates matching user/email/plan and stores owner binding plus evidence transactionally. Reviewers must not self-certify based solely on a checkbox or email equality. No email invitations or charges are triggered by provisioning. Positive integration validation with isolated authorized test accounts remains a launch gate.


## Atomic Featured revision review
The admin first verifies proposed content and media bytes, then uses `finalize_texasdefined_featured_revision` for simultaneous public-profile and revision-ledger changes. RPC requires a currently published, paid Plus application and independently enabled Featured owner. Concurrent/repeated approvals return a nonapproved result. Unreferenced uploaded copies from interrupted requests still need a staged media-retention worker; do not delete unverified public media or claim orphan cleanup certified.


## Featured draft media capacity protection
A verified Featured owner can store at most 24 private draft objects of at most 3 MB each. Storage INSERT policy enforces the count under a per-account lock; the UI preflight is informational, not security. Before enabling the platform, implement and test safe cleanup of abandoned media only after checking pending/approved revision references and public listing usage. Do not automatically delete uploaded source files without a documented retention policy and owner expectations.


## Mandatory prelaunch switch separation
- `NETWORK_INTAKE_ENABLED=true` — ONLY after explicit approval, opens application POST and private uploads; otherwise the public endpoint returns 503 before parsing files and the frontend remains a non-submitting preview.
- `NETWORK_PUBLICATION_ENABLED=true` — independently authorizes administrator publication and Featured revision approval. Do not enable while release gates remain open; rejection and unpublish always remain available for safety.
- `NETWORK_CHECKOUT_ENABLED=true` — independent Stripe Plus Checkout switch, gated by verified owner and live account configuration; product inactive as last verified.
- Office 365 delivery remains a separate disabled transport with no credentials configured. Never substitute personal Gmail. Noindex is a crawl hint, **not** a security or launch control.


## Dedicated Network administrator access
The Network admin panel uses **`NETWORK_ADMIN_ACCESS_KEY`**, separately from sports partner admin keys. Provision a random at-least-32-character secret only in the approved Cloudflare Worker secret configuration after launch/security approval. Never put it in source, logs or browser local storage, and never repurpose an unrelated marketing admin secret. In the absence of this secret all Network admin actions fail closed; the panel remains a draft preview.


## Owner sign-in email launch gate
Set `NETWORK_OWNER_PORTAL_ENABLED=true` only after verifying the Supabase Auth sender/domain and both desktop/mobile magic-link callbacks are approved for TexasDefined. Default OFF disables sign-in email requests on business dashboard and Network billing. If any customers already have paid subscriptions, preserve their ability to authenticate for cancellation/billing, or provide verified alternative customer support; never silently strand paying owners behind a disabled Auth switch. Keep Network notification delivery separately disabled until Office 365 transport is certified.


## Supabase advisor follow-up
The new service-only tables intentionally have RLS with no browser policies: do not “fix” these advisory notices by granting anon/authenticated access. Three Network foreign-key indexes were added in 20261010224825. The shared project's unrelated unused-index, pg_net and Auth password-protection advisories require a separate site-wide review; do not change globally from a Network release workflow without explicit scope approval.


## Intake media transaction
Applications are not reviewable until `intake_complete=true`. Service-role-only `finalize_texasdefined_network_intake` checks actual private uploaded objects and atomically sets media paths and enqueues the receipt. Incomplete or failed uploads must not generate a notification. No data or emails are created by this migration. Interrupted-worker cleanup and real multipart browser tests are still required before launch.


## Atomic public listing finalization
After copying/validating approved media from private intake, the service-only publication RPC atomically commits the public listing and application status with entitlement and approval checks under application lock. The RPC checks public storage metadata to confirm referenced media exists; republishing never discards the last approved Featured revisions. Failure leaves database visibility unchanged. Storage copies created before a failed RPC can be orphaned and must be addressed by reference-aware cleanup before release. Never use separate service-layer status/publication writes again.


## Emergency editorial suspension
With the dedicated Network admin key, choose Unpublish (published → approved) or Reject/Reopen. These service-only actions invoke one database transaction for listing visibility and application status; they work even while launch switches are OFF. A double Unpublish is not accepted. Verify intended profile in preview and confirm public directory immediately after production deployment, once authorized.


## Featured entitlement suspension
A Featured badge alone does not authorize uploading or editing. Storage quota and revision-submission checks also require a published Plus application with active paid entitlement, rechecked in privileged read-only Boolean helpers rather than exposing private applications to authenticated users. Previously uploaded draft media remains readable to the verified owner while billing is suspended, but new changes are blocked. The dashboard explains paused editing and links to billing.


## Prelaunch free Chrome browser verification
On PR #4545 check the **Network draft preview browser QA** workflow alongside Required Merge Gate. It builds the PR Worker locally, never deploys, and runs live hydration and two-viewport interaction checks without sending messages. Download or inspect the `network-preview-browser-evidence` Actions artifact for mobile/desktop screenshots and `results.json`. Review every failure; do not accept a passing static SSR smoke as browser certification. Re-run after substantial UI changes. Only separately authorized deployment permits final production/browser/real-owner testing.


## Internal RLS helper schema
The Featured RLS policies use `texasdefined_network_internal.network_featured_upload_under_quota` and `network_can_submit_featured_revision`, not public REST RPCs. Never grant `anon` access or recreate the old `public` SECURITY DEFINER helpers. Schema usage for `authenticated` is exclusively for RLS evaluation, with each helper enforcing matching `auth.uid()`. Re-run Supabase advisors after changes and keep applications/outbox service-role-only.


## Directory visibility and main landmarks
Before launch, `NETWORK_DIRECTORY_ENABLED` is absent/OFF: public directory shows a preview-only empty state and individual business profiles are not publicly served. Enable only after separate launch approval and independent public-listing RLS, SEO and editorial review; account for already published paying listings when suspending discovery. The global site shell owns the single `<main>`; Network route components use ordinary `<div>` wrappers. Review the 18 mobile/desktop Chrome QA results for horizontal overflow, hydration and image/accessibility issues.


## Read-only stale draft inventory
Authenticated Network administrators can click **Preview 45-day unused draft candidates** to inspect up to 100 possible orphan objects. The server always uses the service-role-only read-only RPC and enforces the dedicated Network admin key. Candidate selection excludes any revision/public-listing references and drafts younger than 45 days. This is **not deletion approval**. Confirm the retention policy, client disclosures, preservation of images for disputes, and a concurrency-safe Storage API deletion procedure before scheduling any cleanup.


## Public copied-image orphan inventory
The Network admin panel has a **read-only Preview 45-day unused published-image copies** action, separate from private draft candidates. It is guarded by `NETWORK_ADMIN_ACCESS_KEY` and the service-only RPC. Candidates older than 45 days exclude images referenced by any current **or unpublished** listing and revision. This list is an audit aid, not permission to delete; explicit owner/retention policy approval and reference-aware rechecks remain prerequisites for any future Storage API deletion.


## Notification trigger execution security
Migration 20261011000421 revokes direct browser/REST EXECUTE access to `network_application_email_events`, `network_owner_email_events` and `network_revision_email_events`. Database triggers still enqueue service-only outbox events normally. Do not restore default PUBLIC function grants or replace with publicly callable `SECURITY DEFINER` RPCs. The sender is still not configured; queued events do not send emails.


## Prelaunch operator checklist — independent security/retention review (October 10–11)

**Administrator identity and accountability.** The dedicated `NETWORK_ADMIN_ACCESS_KEY` is a single shared secret, not individual administrator login. Before any multi-operator release, require an owner decision: either restrict to one audited operator under a documented, explicit risk exception (record the key custodian, rotation/revocation procedure, access expiry and incident process), or implement named identities, scoped roles and immutable authenticated actor attribution for each review, owner provisioning, publication/unpublication, email action and cleanup approval. Reviewer-entered text is NOT cryptographic proof of administrator identity. Do not replace the dedicated key with a sports-partner key or loosen its existing fail-closed check.

**Office 365 Graph preparation only.** Approved sender: `admin@texasdefined.com`. An authorized Microsoft 365 administrator must register/approve the sending application in the business tenant, grant Microsoft Graph `Mail.Send` application permission or an approved delegated alternative, and restrict mailbox access specifically to the approved TexasDefined sending mailbox using Exchange Online application RBAC/app access scoping. Supply tenant/application identifiers and a managed client credential **server-side only** through an approved secret store; do not commit secrets or connect personal Gmail. Keep `NETWORK_EMAIL_DELIVERY_ENABLED=false` and all sign-in/OTP launch gates OFF. Before activation, build isolated mocked Graph 202/429/5xx/timeout tests; use bounded claims and message leases, exponential backoff, recipient validation, unique event keys and auditable acknowledgments. A Graph HTTP 202 means only **accepted** by Graph; ambiguous outcomes must be reconciled against an auditable provider message or mailbox record before resending, never assumed delivered. Test sender `admin@texasdefined.com` and all eight templates offline. Do not send even a test message until separately authorized.

**Reference-aware retention: proposal, not deletion authorization.** Continue read-only 45-day private draft/public-copy candidate inventories. Proposed minimum hold: 90 days after last relevant application/revision moderation or appeal, subject to final privacy/cancellation and legal retention review (45-day previews are NOT delete deadlines). Preserve all files referenced by pending, approved, rejected, published, or unpublished applications, revisions and public listings, including superseded profile imagery needed for disputes. Proposed eventual operator process: generate bounded candidate list; acquire per-application/object advisory lock in a service-only cleanup transaction; recheck current references and age immediately before marking a durable tombstone/intent; require a second human approval; invoke Supabase Storage API deletion outside SQL only for still-unreferenced objects; record immutable object ID, path, version/hash, reason, operator, intent and Storage result; verify missing-object safety after each batch. Storage deletion has no DB transaction rollback and must NEVER be represented as atomic with PostgreSQL; quarantine/grace windows, audit logs, idempotency and recovery/reconciliation are necessary. Avoid deleting referenced media after simultaneous publication/upload; test concurrent mutation and Storage failures in disposable isolated fixtures before implementation. **No cleanup worker/cron/delete switch may be enabled without explicit destructive-operation and policy approval.**

**Owner and member launch sequence.** Keep `NETWORK_INTAKE_ENABLED`, `NETWORK_PUBLICATION_ENABLED`, `NETWORK_DIRECTORY_ENABLED`, `NETWORK_OWNER_PORTAL_ENABLED`, `NETWORK_CHECKOUT_ENABLED` absent or OFF pending separate owner decisions, plus noindex preview. Confirm actual external env and Cloudflare deployment flags during release approval rather than inferring from source default-off checks. Owners with existing active paid subscriptions must retain a functioning cancellation/support path before any portal gate is closed. Complete two distinct owner browser journeys, confirmed-email checks, revoked access and private cross-business media authorization, isolated non-live Stripe lifecycle with out-of-order events and editorial re-approval rule, legal/refund/retention disclosures, and Featured pricing decision. Production browser certification can occur only *after* explicitly authorized deployment.

**Evidence distinction.** GitHub Actions local Chrome screenshots are real browser evidence for a locally built Worker, NOT deployed production and NOT authenticated payment/owner verification. `scripts/data/validate-network-migration-parity.mjs` is a **static applied-version/file inventory**, NOT proof that reconstructed migrations replay cleanly or match the live database byte-for-byte. Before launch perform a nondestructive clean-room migration replay in an approved isolated database and compare schema, RLS, grants, Storage policies and test fixtures. No need to create a billable Supabase branch; obtain approval/cost confirmation before using paid services.


### Recoverable mock-only Graph and outbox verification (October 10–11)
- `src/data/network-notification-graph-readiness.server.ts` creates **drafts only** and classifies simulated Graph statuses. It is not an Office 365 connector, Graph sender, email scheduler, or permission grant. `NETWORK_GRAPH_DISPATCH_ENABLED=false`; `NETWORK_EMAIL_DELIVERY_ENABLED=false`. Mock tests run in canonical Merge Gate via `scripts/data/network-notification-templates.test.mjs`.
- Microsoft Graph `sendMail` HTTP 202 indicates accepted by provider, not delivered, and does not prove a stable message ID. Do NOT call `finish_texasdefined_network_notification(...,'sent',...)` on only a 202. Reconcile eventual Sent Items/provider evidence and the durable event key before marking sent or resending after unknown outcomes. A timeout/5xx is ambiguous, NOT permission to retry and duplicate-send automatically. A definitive 429 may be retried with approved bounds and backoff only once the delivery worker is designed and approved. The current `sending` rows do not automatically recover; design a separately approved, reconciled crashed-claim policy before enabling delivery.
- The service-only rollback SQL `scripts/data/network-notification-claim-rollback-fixture.sql` was executed successfully on the empty outbox and verified one claim, token isolation, one successful ack and failed replay. It explicitly ends with `ROLLBACK`; it neither calls Graph nor changes saved customers. Never run it when the outbox contains live pending notifications (it deliberately rejects that state).


### Network intake upload-limit verification (prelaunch)

Application intake remains disabled until authorized. The route `/api/public/network-application` uses `readBoundedNetworkIntakeBody(request)` to cap **actual streamed** application input at 16,000,000 bytes, including JSON or multipart boundaries and fields. `Content-Length` alone is not trusted; overage/malformed hints and broken streams fail closed. Multipart File parsing happens only **after** this bounded read; individual submitted images still require PNG/JPEG/WebP signatures and 3 MB per-image limits, with at most four gallery images. The new isolated Node tests are required by the Merge Gate; do not regress to reading unrestricted `request.formData()` or `request.text()` from the original request. These tests **do not** substitute for an authorized end-to-end multipart/Storage upload-and-failed-copy rehearsal, concurrent processing, crash recovery or a load test against deployed Worker limits. Do not open intake or enable any Network launch flag to perform those tests.


### Stripe Checkout / customer portal bounded transport checklist (prelaunch)

- Confirm both outbound Checkout `stripeRequest('/checkout/sessions')` and authenticated `/api/public/network-billing` customer portal use a **12-second AbortSignal deadline**. The Checkout helper must retain the server-controlled Stripe Bearer credential, the DB-reserved stable per-attempt Stripe idempotency key and fail closed on non-2xx, malformed JSON, 429/503, network loss or timeout. The billing portal must accept only exact HTTPS `billing.stripe.com` URLs without credentials/fragments and continue to verify a confirmed, enabled owner business binding.
- A Checkout **timeout is not proof no session was created**. Do not reset/reserve a new idempotency key or retry blindly until the prior attempt/Stripe state is reconciled in the approved non-live integration test. Do not mark a Stripe webhook/Checkout event successful on incomplete verification; do not enable Checkout for real customers without approved lifecycle and cancellation/support checks.
- The mocked Network billing unit tests and static guard run in Merge Gate. These cannot prove live Stripe, Graph/email, Storage, external account ownership, DB concurrency or production availability; real integration tests still require authorization in an isolated non-live environment.


### Payment endpoint request resource limit

Before approving Checkout or authenticated billing access, confirm that both `/api/public/network-checkout` and the POST `/api/public/network-billing` parse untrusted JSON only via `parseBoundedNetworkBillingJson`. The parser rejects malformed or oversized advertised request lengths and enforces a **4,096-byte actual streamed** cap even with absent or spoofed `Content-Length`; overlimit requests return 413, malformed UTF-8, JSON, broken streams and empty bodies fail closed. It must run before Stripe or service-role database work; Checkout is especially exposed because it formerly parsed an arbitrary JSON body before authenticating a Bearer token. Preserve the caller origin check and confirmed owner's business-binding checks. The seven mock-only tests are part of the Merge Gate; this does not authorize enabling Checkout or replacing independent real owner and Stripe staged transaction testing.


### Immutable public image copying, ambiguous write reconciliation (prelaunch)

On initial approved publication and Featured revision approval, the server now uses `writeImmutableNetworkPublishedImage` for `texasdefined-network-published`: **never** set `upsert:true`. An already-existing target may be accepted ONLY when the exact public object can be downloaded and its byte digest, byte length and non-empty content type match the independently approved private source. A different object, missing object, failed download, invalid image MIME/path or oversized image MUST stop publication before the database finalizer. Never overwrite a previously approved/publicly visible asset, and never delete a public object merely because its DB finalizer returned an error; a concurrent approval might have referenced it. The associated mock-only tests are required by the Merge Gate and cover an ambiguous upload reported after the object already existed. This is not certification for a real Supabase Storage write, multipart upload, concurrent approval, interrupted Worker or DB crash. Complete those in an approved isolated staging fixture, inspect Storage metadata, check exact paths against DB references, and retain orphan cleanup as read-only previews until destructive cleanup policy approval.


### Verify Stripe Checkout Session identity before recording billing eligibility

On an approved isolated test-stage checkout, inspect the newly created Checkout Session response and check that it is an **open, live, subscription-mode `checkout.session`**, with both `client_reference_id` and `metadata.application_id` matching the *same reviewed application* and `customer_email` matching the verified application email (case/outer-whitespace normalized). The Stripe Checkout session ID must begin `cs_live_` for the eventual real launch, the redirect host must be exactly `checkout.stripe.com`, and expiration must be safely in the future. The server now rejects any conflicting or incomplete identity, refuses to finalize the DB reservation, and returns a fail-closed Checkout error; do not reinterpret this error as proof no Stripe session was created or rotate idempotency keys without reconciliation. The new mismatch cases are mock-only tests run by Merge Gate. They do not authorize real Checkout testing or alter the requirement for an isolated non-live end-to-end Stripe/DB test and an explicit owner launch decision.


### Clean-room recovery of all 34 Network-related migrations

The GitHub action `.github/workflows/network-migration-cleanroom.yml` replays the **34 actually applied Network-related** SQL migrations, including `20261010181405_add_featured_owner_bound_private_media_upload_policies.sql` (the originally omitted Featured draft-bucket migration, whose filename did not include "network"). It uses a throwaway, local-only PostgreSQL 16 service with **minimal synthetic Supabase Auth/Storage metadata tables and roles**. The Node runner refuses a remote host, any database name other than `network_replay`, or execution without the explicit isolated opt-in. It checks all eight Network tables have RLS enabled; the four Network buckets exist with intended visibility; privileged Network RPCs are not directly granted to anonymous/authenticated roles; and no customer/application/media/payment records were generated. The first attempt exposed the missing Featured bucket dependency and therefore correctly failed; the exact applied SQL was then recovered into source history. Require an independent **green run on the final exact feature HEAD** as a schema replay gate.

This clean-room schema replay is deliberately narrower than a full Supabase integration test: no live Supabase Auth sessions, real Storage API or owner tokens, Edge Functions, Stripe API, Microsoft Graph or production resources are involved. Still complete the staged two-owner isolation, HTTP multipart Storage/rollback/crash tests, non-live Stripe webhook/Checkout DB integration, administrator accountability and consent/retention/legal/launch approval gates before merging or enabling any feature.

The replay's privilege assertion must reflect real Supabase authorization: public Network `SECURITY DEFINER` RPCs may **not** be executable by `anon` or `authenticated`. The private schema `texasdefined_network_internal` must deny `anon`, but its two owner-entitlement helper functions are intentionally callable by `authenticated` and enforce matching `auth.uid()` and published paid Plus eligibility. Independent read-only production introspection confirms this arrangement. Do not revoke authenticated access to those private helpers to force a test to pass; doing so would break owner RLS policies. Preserve the private schema boundary and verify real owner JWT behavior separately in an approved isolation environment.


### Synthetic two-owner RLS and media-quota rollback proof (isolated database only)

GitHub clean-room `scripts/data/verify-network-migration-replay.mjs` must replay **all 34 applied Network-related migrations**, then execute `scripts/data/network-migration-owner-rls-fixture.sql`. That SQL fixture creates ONLY synthetic fake owners and app rows in a throwaway local PostgreSQL database, switches `SET LOCAL ROLE authenticated` with distinct simulated `auth.uid()` claim subjects, and tests cross-owner private SELECT/INSERT denials, own published paid Plus revision submissions, unpublished/unpaid entitlement rejection, private image read isolation, a 24-draft file quota and rejected 25th insertion, outsider denial and `anon` access denial. The fixture must execute `ROLLBACK` to discard all rows; `psql ON_ERROR_STOP` fails the workflow if any condition breaks. The protected static guard checks that this test remains wired into the runner and workflow.

Treat this as a useful **SQL-level fixture**, NOT completion of the independent authenticated two-owner integration gate. Before launch, separately demonstrate two independently verified real Supabase Auth accounts in an explicitly approved isolated project, including token/session expiration, cross-account reads and writes through the actual browser and Data API, signed private media, actual Supabase Storage upload and cleanup behavior, access-revocation races, 24-image quota under concurrent requests, and proof that no real notifications or payments are sent. No live users, OTPs, email, or customer records were created by the fixture.


### Synthetic Stripe-to-database lifecycle rollback verification

Require the isolated `Network clean-room migration replay` workflow to run `scripts/data/network-migration-stripe-reconciliation-fixture.sql` after all 34 applied SQL migrations and the two-owner RLS fixture. The new fixture executes only in the throwaway local PostgreSQL database and uses fake application IDs, fake `sub_`/`cus_`/`evt_` tokens and `.invalid` emails, with all inserts, notifications and listings **rolled back**. It verifies that a recognized, verified-looking Plus activation is bound idempotently to a single subscription/customer, that unrelated bindings and malformed event IDs are rejected, that duplicate events do not mutate entitlement, that payment failure immediately de-lists and disables membership, that recovery alone does not automatically publish, and that explicit reviewed re-publication preserves the prior approved profile and slug. The fixture cannot establish upstream HMAC verification or Stripe's current subscription state: those are independently enforced in the server code and still require an authorized **non-live** real Stripe/DB staging run. Likewise, one rollback transaction cannot represent separately committed webhook delivery attempts; its membership-active outbox key legitimately deduplicates repeated activations within the same transaction. Test cross-transaction retries, final settlement, cancellation and uncertainty recovery separately in the eventual approved isolated setup. Never send email or create real charges as part of this fixture.


### Independently committed Stripe webhook outbox replay check (clean room only)

After the 34 source-tracked SQL migrations, the rolled-back synthetic owner RLS test, and the rolled-back Stripe SQL lifecycle test, the isolated GitHub Actions PostgreSQL 16 runner executes `scripts/data/network-migration-stripe-committed-deliveries-fixture.sql` LAST. This fixture intentionally **commits separate database transactions**, so a transaction-scoped notification event key cannot incorrectly collapse activation, failure, and later reactivation into one event. The expected final counts are **two membership_active notifications and one membership_inactive notification**, all with distinct transaction-key identifiers; exactly three processed Stripe IDs; restored paid entitlement; a still-unpublished listing after automatic paid recovery; and no effect from an old repeated payment-failure event ID. This test uses only synthetic `.invalid` email addresses and simulated `evt_`/`sub_`/`cus_` strings.

These synthetic rows are **not rolled back** because separate durable transaction boundaries are the subject of the test; they exist only in the disposable `network_replay` database hosted by the GitHub Actions PostgreSQL service, which is discarded after the workflow. Never run this fixture in the shared project or a persistent production-like database. Keep the runner's strict localhost/database/opt-in guard and empty-schema verification. A passing test does **not** certify real HTTP Stripe signature verification, retrieving Stripe's current subscription, real delivery retries, an isolated Stripe integration environment, Microsoft Graph delivery, or any launch permission.


### Concurrent same-owner Featured draft quota race (clean-room SQL only)

The `Network clean-room migration replay` workflow now runs `scripts/data/verify-network-concurrent-upload-quota.mjs` after the 34 tracked Network migrations, synthetic ownership/RLS tests and synthetic Stripe event tests. The test seeds a **fake** active paid Plus/Featured account with 23 private draft records in disposable localhost PostgreSQL 16, starts two real simultaneous database connections as the same simulated `authenticated` owner, and requires exactly one additional INSERT to pass while the other is denied by Storage RLS, ending with **24** objects. The test may commit fixture rows only inside the throwaway `network_replay` database, which the workflow destroys after each run. Its script refuses remote hosts, other database names or missing isolated opt-in.

This verifies PostgreSQL policy-level advisory lock behavior under two simultaneous sessions, **not** the real Supabase Storage HTTP upload service, opaque file metadata and file-size enforcement, token issuance/expiry, network partial failures, crash recovery, upload retries, concurrent cleanup or signed URL visibility. Those separate owner-authorized, non-live integration tests remain mandatory prior to release. Do not enable owner upload or publication flags to run them in production.


### Two-connection Featured draft upload quota race check (local SQL, not Storage HTTP)

In the `Network clean-room migration replay` GitHub Actions workflow, `scripts/data/verify-network-concurrent-upload-quota.mjs` runs **after** all 34 migrations and prior owner/Stripe fixtures. It creates only fake `.invalid` owner/application data in disposable local `network_replay` PostgreSQL 16 and seeds 23 private draft objects. Two separate database connections switch to `authenticated` with the same simulated subject and attempt the 24th and 25th uploads. The first connection holds its `pg_advisory_xact_lock` open while the second attempts insertion. The test must prove the 24th commits, the other receives a **row-level security denial**, and exactly 24 objects remain. The script refuses non-local hosts, any database name other than `network_replay`, or missing isolated opt-in. Never run it on the real shared Supabase project or a persistent staging database.

This confirms a **PostgreSQL advisory-lock race**, not actual Supabase Storage HTTP behavior, multipart upload limits, object bytes, Cloudflare Worker concurrency, signed media URLs, interruption/retry, owner revocation under load or recovery. Those still require authorized isolated real-service verification. No public media should be replaced or deleted to facilitate this test.

The single retained concurrency fixture coordinates two PostgreSQL sessions deterministically: one inserts the 24th object and holds its transaction open, the other races for the same account's 25th slot and must receive a Storage row-policy denial after the first commits. Earlier duplicate scripts were consolidated after a runner JavaScript declaration conflict; do not restore a second fixture or duplicate runner variable. This remains synthetic Postgres metadata, not Supabase Storage HTTP.
