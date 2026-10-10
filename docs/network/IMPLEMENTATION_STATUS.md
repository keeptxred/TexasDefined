# TexasDefined Business Network — implementation status
_Last reviewed: October 10, 2026; evidence from GitHub, Supabase and Stripe connectors._

## Scope
TexasDefined Network, unlisted/noindex `/network/join`, Basic (free), Plus ($19.99/month), Featured (price undecided), private applications, editorial queue, published business listings, owner portal and billing.

## Repository state
- Repository: `keeptxred/TexasDefined`
- Feature branch: `feature/network-join-preview-20261010`
- PR: https://github.com/keeptxred/TexasDefined/pull/4545
- Branch before this ledger: `621e919af149814ba94156b9f9041f42334d9a29` (ledger commit SHA follows in GitHub history).
- Main base at inspection: `b0de65371abd7b6f94b5f7e1e3cbb733bf9309ec`
- PR was draft, not mergeable. Divergence observed: 112 commits ahead / 60 behind main at the initial inspection.
- Do not merge until a fresh merge base check, clean generated routes, passing required CI and independent production verification.

## Verified live resources
- Supabase project: `ftkznprjljkhymknvhye`.
- Database tables: `texasdefined_network_applications`, `texasdefined_network_business_accounts`, `texasdefined_network_profile_revisions`, `texasdefined_network_public_listings`, `texasdefined_network_stripe_events`.
- All five Network tables report RLS enabled. Inspect full policies and grants for production security signoff.
- Storage buckets: private `texasdefined-network-applications`, `texasdefined-network-submissions`, `texasdefined-network-featured-drafts`; public `texasdefined-network-published`. Image size limit 3 MB for each.
- At inspection: zero application rows, zero business accounts, zero revisions, zero public listings. These are empty launch structures, not proof of working submissions.
- Stripe live account Keeptxred: product `prod_VPrsZ3mYEKz2da` inactive; price `price_1UP28XLtRurj6GMNwFlYDW6N` active, USD 19.99 monthly. Do not create duplicates or activate charging prematurely.

## Existing branch implementation — code reviewed, not deployment-certified
- Landing page, Basic and Plus application form and live local preview.
- Private Basic/Plus media intake and editorial admin queue.
- Stripe Checkout endpoint guarded by `NETWORK_CHECKOUT_ENABLED`, signed webhook with event ledger and billing portal endpoint.
- Featured login and draft submissions using Supabase Auth and owner-scoped policies; admin review of Featured revisions with attempted public-profile application.
- Public listing storage/route and media publishing flow.

## Changes made during this continuation
- Removed duplicate `publish` definition and redundant admin publication actions; corrected Featured editorial UI wording.
- Redirected legacy status-only publication action through the actual listing publishing method so it cannot create a phantom published status.
- Stripe webhook now uses the verified current subscription state when deciding entitlement; an inactive subscription suspends the paid public listing without automatically republishing after recovery.
- This ledger is required for subsequent chats.

## CI evidence (before continuation fixes)
- GitHub Actions merge gate run `38075108928`: failed.
- Generated `src/routeTree.gen.ts` out of date (missing slug listing route).
- Main client bundle reported 1,834,130 bytes versus 1,829,000-byte budget: 5,130 bytes over.
- Two colliding route patterns `/network/business/$id` and `/network/business/$slug` need consolidation and generated route regeneration.
- Do not raise the performance budget or bypass validators.

## Remaining blockers — not complete
1. Reconcile 60+ newer main commits without overwriting concurrent work; resolve merge conflict and conflicting business route patterns.
2. Regenerate `src/routeTree.gen.ts`, trim client bundle under existing budget, pass canonical merge gate, TypeScript and full validation.
3. Complete / harden owner onboarding and verified Featured entitlement; Featured price is not authorized. Review RLS grants and storage access.
4. Independently test image signatures, duplicate intake, abuse protection, owner isolation, admin permissions, publication rollback and previous-approved profile retention.
5. Complete all documented admin actions and conditional integration of approved listing in relevant city/county/category surfaces.
6. Validate Stripe Checkout, signed webhook retry/idempotency, recovery, renewal, failure, cancellation, billing portal, and fulfillment in a safe environment. Live Plus product must remain inactive and checkout disabled until signoff.
7. Configure and verify approved TexasDefined business email service; do not use personal Gmail or send live customer messages before checks.
8. Complete production checks for `/network/join`, `/network/apply`, examples, `/admin/network-applications`, `/business/dashboard`, and published listing URL. Public URLs were not reachable via the available web reader at this inspection; not proof of a successful deployment.
9. Check noindex, no public promotion, sitemap exclusions, responsive layout, SSR/hydration, privacy, disclosures, accessibility and cost limits.
10. Merge and deploy only after all relevant release gates pass.

## Safe continuation order
Fix route conflicts and generated tree → reconcile main → fix performance check → certify auth/media/database → certify billing in a safe environment → CI → merge → deployment → live smoke verification.

## Launch state
**NOT LAUNCHED / NOT CERTIFIED.** No confirmed end-to-end successful application, payment, customer portal login or production publication. Never claim otherwise.
