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
- Featured login and draft submissions using Supabase Auth and owner-scoped policies; server review can apply approved Featured field/photo revisions to a published profile. This has NOT passed end-to-end production tests.
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
- Previously overlapping `/network/business/$id` and `/network/business/$slug` route patterns were consolidated to slug-only and `src/routeTree.gen.ts` edited; exact generator output and build success still require canonical CI.
- Do not raise the performance budget or bypass validators.

## Remaining blockers — not complete
1. Reconcile 66 newer main commits (last measured) without overwriting concurrent work; confirm generated route tree and resolve any remaining merge conflicts.
2. Independently regenerate / compare `src/routeTree.gen.ts`, trim client bundle under the unchanged 1,829,000-byte budget, pass canonical merge gate, TypeScript and full validation.
3. Implement admin-controlled owner onboarding after independent business ownership and Featured entitlement verification; Featured price is not yet authorized. Re-audit and adversarially test live RLS grants, policies and storage permissions. Migration for owner-only Featured submissions is applied.
4. Independently test magic-byte image validation, duplicate intake race conditions, abuse protection, owner isolation, admin permissions, editable-photo submission, review atomicity, unpublication and previous-approved profile retention.
5. Complete all documented admin actions and conditional integration of approved listing in relevant city/county/category surfaces.
6. Validate Stripe Checkout, signed webhook retry/idempotency, recovery, renewal, failure, cancellation, billing portal, and fulfillment in a safe environment. Live Plus product must remain inactive and checkout disabled until signoff.
7. Configure and verify approved TexasDefined business email service; do not use personal Gmail or send live customer messages before checks.
8. Complete production checks for `/network/join`, `/network/apply`, examples, `/network/directory`, `/network/business/$slug`, `/admin/network-applications`, `/business/dashboard`, and billing. No successful production deployment or operational customer flow was verified.
9. Check noindex, no public promotion, sitemap exclusions, responsive layout, SSR/hydration, privacy, disclosures, accessibility and cost limits.
10. Merge and deploy only after all relevant release gates pass.

## October 10 continuation commits and database migration
Last confirmed pre-ledger head: `7ae29da0f14e74fde8d033016d6d3d8a0ae23a57`. Follow the GitHub history for the later ledger commit. Do not reuse this SHA as the current head in later conversations.

- Admin approval code: removed duplicate publish handler/buttons; status-only legacy publish delegates to actual publication; canonical admin listing links; reversible Unpublish action that retains approved content; rejection/reopening unpublished a previously public listing.
- Public listings: removed legacy conflicting UUID dynamic business route and source, updated generated route-tree registration to canonical slug route; directory reads reviewed public listings and links slugs, noindex before launch.
- Featured: owner dashboard now shows approved live profile beside proposed changes; review code checks actual Featured tier, and approved media bytes are verified again before publication.
- Intake: checked 7-day duplicate matching (not an atomic uniqueness guarantee); fixed whitespace normalization; privacy link and tier switch lock after submission.
- Billing: guarded duplicate subscription Checkout; webhook reconciles current verified Stripe subscription status instead of stale event order; unpaid Plus public listings are suspended, never automatically restored or activated by return-url.
- Database migration `20261010183442_harden_texasdefined_network_featured_authorization` was **APPLIED AND READBACK-VERIFIED** to Supabase project `ftkznprjljkhymknvhye`. Repo records it at `supabase/migrations/20261010183442_harden_texasdefined_network_featured_authorization.sql`. Changes: authenticated grants business accounts SELECT only, revisions SELECT/INSERT only; revision INSERT RLS and Featured media INSERT RLS require actual Featured tier + owner + access enabled.
- Refer to PR https://github.com/keeptxred/TexasDefined/pull/4545 for full commit history and reviewed code. No Stripe writes/charges, customer emails, test customer records or production publication were performed.

## Updated CI and branch status
- At latest read, PR draft/not mergeable and feature 134 commits ahead, 66 behind current main (`dabe2c94bb53cf28bed05518ca6facfef4eeb47f`). These counts can change while other projects commit.
- GitHub Actions returned no new CI run for latest Network feature commits. Last observed merge gate `38075108928` failed on old feature SHA `418235786574f652a1ab1c654ab3eded1d36b901`, prior to most fixes. Do not claim new generated tree, bundle or tests pass.
- Explicit release gate: obtain fresh feature-branch merge-ref CI and full production smoke evidence before merge.

## Safe continuation order
Fix route conflicts and generated tree → reconcile main → fix performance check → certify auth/media/database → certify billing in a safe environment → CI → merge → deployment → live smoke verification.


## Continuation evidence — October 10, 2026, subsequent phase
- Safely reconciled then-current `main` commit `da1b564e7af97df6ecf818bd9abfc060b774477d` into the branch with a two-parent merge commit `bb2093ac2195f16318fb9b45316448b7e7da26b3`. Diff comparison immediately after that merge: **0 commits behind, PR mergeable**. Main continues to receive concurrent commits; refresh again before later writes or merge.
- Legacy `src/data/network-moderation.functions.ts` publication action now delegates to the canonical publisher/editorial moderation functions. Commit `1a22ad66fb5e28965471a2e980a0aa049c6a17cd`.
- Basic and Plus fictional examples are now lazy-loaded; commit `6b548e51ab1b9e0f76f8b7d7307ce0548757edc1`. Generated route tree passed in merge gate run `38077566567`.
- CI `38077566567` failed **only its required performance budget**: main bundle **1,832,933 bytes** > cap **1,829,000 bytes** (excess **3,933 bytes**). Texas Icons workflow `38077566575` independently failed for same reason.
- Attempted lazy split of citation-guide in `0655da88a1d7731091e386dd5f2b8bca8185bc70`; measured `38078029089` main bundle **1,832,923 bytes**, improvement only **10 bytes**. It did not solve the budget and is reverted by the following ledger commit, preserving original citation-guide implementation. **Never raise the performance cap to hide this result.**
- Last observed CI for the citation split: merge gate `38078029088` failed canonical premerge on performance. A post-revert current-head CI must be checked afresh. All observed new route-tree generation checks passed; production deployment and browser checks did not.
- The final head SHA is whatever GitHub reports for the ledger/revert commit and later concurrent changes. Never reuse an earlier SHA as canonical.

### Operating costs: real ceilings and assumptions
- Basic is free; Plus list price is $19.99 monthly; Featured price remains undecided. No live charges were enabled.
- Official US Stripe standard pricing lists **2.9% + $0.30** per successful domestic-card charge, and pay-as-you-go Stripe Billing lists **0.7%** of subscription billing volume. For one $19.99 domestic card renewal, this estimates $0.88 payment processing plus $0.14 Billing, leaving roughly **$18.97 before taxes, refunds, disputes, and other costs**. This is illustrative, not a verified negotiated account rate: https://stripe.com/pricing and https://stripe.com/billing/pricing
- Existing Supabase plan cost and usage need verification before launch. Official Supabase Free storage quota is **1 GB total**, shared with the existing site assets: https://supabase.com/docs/guides/storage/pricing
- Current maximum Plus intake: 1 logo + 4 gallery images x 3 MB = 15 MB private; publishing identical full-resolution copies can roughly double this to **30 MB per Plus member** (before revisions and retained drafts). 100 such maximum-size Plus profiles could require ~3 GB, so a nominal $0 infrastructure assumption is unsafe without compression, cleanup, usage monitoring and a documented image budget. Actual average is likely lower but must be measured.
- Current allowed Featured revision images (one logo + up to six gallery at 3 MB each) can be another **21 MB private plus 21 MB public** per complete refresh. Set media retention and predictable per-business capacity before broad rollout.
- Email sending cost/service remains unresolved; must use approved TexasDefined Office 365 identity and not personal Gmail.

## Launch state
**NOT LAUNCHED / NOT CERTIFIED.** No confirmed end-to-end successful application, payment, customer portal login or production publication. Never claim otherwise.
