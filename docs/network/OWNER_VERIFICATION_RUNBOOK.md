# TexasDefined Network — verified owner provisioning and launch gate

Updated: 2026-10-10. Feature branch only; not a launch approval.

## Preconditions (required for every application)

1. A Plus application has passed editorial review and is in `approved` or `published` status.
2. A human reviewer independently confirms the applicant is authorized to act for the named business. Contact-email knowledge or website presence alone are insufficient. Record the independent evidence in the approved internal review system, not in public descriptions.
3. The authorized applicant opens `/business/dashboard`, requests a Supabase email OTP, signs in, and completes email confirmation. Authentication by itself does **not** provision ownership.
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

## Known blockers

The application admin still relies on the inherited sports-partner admin access key rather than dedicated identity-based Network RBAC. The database ownership binding does not itself store independent proof or reviewer attribution, so proof must be retained separately. Production email-deliverability is unverified. Subscription/webhook and public listing transitions span multiple DB calls and remain to be tested for partial failures and concurrency. The client bundle-size gate has recently failed at 1,833,490 bytes, against a maximum of 1,829,000 bytes. Nothing in this document waives these requirements.

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
