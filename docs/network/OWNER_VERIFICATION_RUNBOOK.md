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
