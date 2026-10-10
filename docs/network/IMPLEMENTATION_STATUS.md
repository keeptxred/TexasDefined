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


## Additional continuation — October 10, 2026 (latest branch sync)
- The newer main commits through `306d5ca129e52122c3b7d614ae4d5ffc2c6881d4` were merged to the Network feature via two-parent commit `fdbc77edefcf24e0a295cc45ea1007518bb1d173`, preserving ten nonoverlapping city, museum, news, and State Fair files. Confirmed **0 commits behind** immediately after this sync. Main may move again; always refresh before merge.
- Server-only media checking now requires all eight PNG magic bytes before an approved application/Featured image becomes public, commit `82d6971f95ebb5ad75be6071403f57184830b2bf`. No migration, billing activation or production deployment.
- Merge gate run `38078347713` definitively failed one top-level check: main client bundle **1,832,933 bytes**, limit **1,829,000 bytes**, over by **3,933 bytes**. Generated routes and other canonical suite checks passed. Separate Texas Icons run `38078347747` independently reproduced the bundle failure. Do not mark CI complete and do not raise the budget.
- The business billing portal currently requires an authenticated confirmed-email user matching the intake contact email. Independent ownership verification and authenticated end-to-end test journeys remain release requirements, not certified capabilities.


## Additional continuation — October 10, 2026, publication idempotency
- Synced latest `main` State Fair enhancement into Network using two-parent commit `cb5978e5569c49724e21a156579c552eb9983213`. This had 0 commits behind `main` at immediate verification.
- Fixed a real publication replay defect: previously invoking publish again while the listing was already `published` would rebuild the public profile from original intake answers and could overwrite previously approved Featured revision content. `publishApprovedNetworkListing` now accepts only application status `approved`, not `published`. Commit `c800ed5fe6e59e48de41e03d3e127b2fbbde4c76`.
- Checkout helper already sets Stripe idempotency key `network-plus-<application UUID>`; duplicate Checkout prevention additionally checks existing paid entitlement and subscription ID. This mechanism was inspected, not independently tested against Stripe live; no checkout was created.
- Most recent observed fresh-head merge gate `38078844488` entered canonical premerge validation, not yet confirmed passed at time of review. Earlier attempts cancelled on branch refresh. The last reproducible completed failure remains main JS bundle 1,832,933 bytes / cap 1,829,000 bytes. Do not merge while unresolved.


## Continuation — post-sync media and publication protections
- Latest `main` deployment workflow and Ticketmaster integration updates were reconciled into the feature without overwriting Network changes, most recently via `b32d81db6350279aab9dc7b3f6ca74a3b61d9dc0`.
- Private application intake now rejects fake PNG headers by checking all eight signature bytes, mirroring the public publication boundary; commit `637f3069fbb138948b7c39df9233d5a1524e02e1`.
- Publication now makes a best-effort rollback (`is_published=false`) if recording the application status as `published` fails; commit `2976077e72512683838296d21e94fd1cd0924672`. This is **not** a database transaction; concurrency and failure testing are still required.
- Canonical CI for earlier heads was repeatedly cancelled during syncs. Run `38079041481` was cancelled; no passing latest-head merge gate has been established. The last reproducible completed failure remains bundle **1,832,933 bytes** versus **1,829,000-byte** cap.
- Do not merge, deploy, enable live billing, claim successful owner flows, or publish customer profiles before remaining safety and quality gates.


## Continuation — verified owner provisioning (October 10, 2026)
- Brought current city QA/budget planner commits into Network as a two-parent merge `c96f27ff1220dcadbfa1203d956356717b471d07` (0 behind at verification).
- Added admin-key-protected, manual owner provisioning after required independent-business-ownership attestation, approved Plus application and verified Supabase email, commit `ef28d445ca1d24a0b79549c20d87afb40f38b79c`.
- Allowed OTP sign-in to create a confirmed Supabase account without granting owner rights, commit `7434697ecd9af9197d7e3f3adacc2c97e3bed33e`.
- Restricted billing membership listing to enabled owner bindings, commit `58b4778cc50820d90ea8e1a779d17faef74525a3`.
- Read-only Supabase check found **zero** business-owner accounts before provisioning; no owners were created, no emails sent and no charges generated in this work.
- The latest completed canonical gate `38080978100` failed **one** top-level check: main client bundle **1,833,490 bytes**, cap **1,829,000**, over **4,490**. Newer-head CI pending; this remains a blocker unless a subsequent exact-head gate passes.
- Owner-runbook `docs/network/OWNER_VERIFICATION_RUNBOOK.md` contains the manual verification and remaining test matrix. This is staged code, **not** production certification.


## Continuation — verified CI evidence and pending launch blockers (October 10, 2026)
- Added invariant checks `scripts/data/validate-network-release-guards.mjs` to canonical premerge CI, commit `6ac78dc1bfd4b9c2b6d5342294c8bdd1930c5539`.
- Added executable Stripe HMAC and disabled-Checkout tests, commit `bfca45ac073f28b4646060d542ba465d0c006d64`. All **4 of 4** Stripe unit tests passed in Merge Gate `38082538896`; none connected to Stripe or charged customers.
- Merge Gate `38082538896` failed **two** top-level checks: one mistaken static assertion that required `user.email_confirmed_at` rather than the actual correctly guarded optional-chain `user?.email_confirmed_at`, and the persistent main client bundle **1,833,490 bytes**, **4,490** above **1,829,000** cap. The static verifier assertion was corrected in `8f8ee18330e5ab0792c3a8ef81189a8d37cb262d` and still requires a fresh run to be confirmed. No performance limit was raised.
- Synced current main browser verifier changes via two-parent commit `7a3e10240b51000eebc4fc4987ae9d148d874545`, verified 0 commits behind immediately afterward; main is concurrently active.
- Read-only Supabase checks: RLS enabled on applications, business accounts, revisions and public listings; all four corresponding table counts were **zero**; all four Network storage buckets contained **zero** objects and private/public flags matched their intended usage. No customer lifecycle can honestly be certified from live production data.
- **Remaining blockers are mandatory:** pass client JS budget without bypass; authenticated owner flows with an independently verified test business; non-live billing lifecycle/webhook and concurrency/rollback tests; Office365 notifications configured and verified; browser/mobile/hydration/security production evidence; explicit release approval. Keep PR #4545 DRAFT, noindex, unmerged; Stripe live Checkout/product inactive; no publication, customer charges, or outbound mail.

## Launch state
**NOT LAUNCHED / NOT CERTIFIED.** No confirmed end-to-end successful application, payment, customer portal login or production publication. Never claim otherwise.


## Independent continuation audit — October 10, 2026, 20:46 UTC
- Reconfirmed draft PR #4545 head `bdb712cc9bf084bc85de145d4f070b6c901495a8` and main `d55466cb9575b8a931a39f64a3856d750a19882b` before this documentation-only write; no Network implementation or main files were changed.
- Inspected completed required merge gate [38082968904](https://github.com/keeptxred/TexasDefined/actions/runs/38082968904) via decoded job logs. Canonical premerge fails solely performance budget: `main-DiVy2xHV.js` **1,833,490 bytes**, hard cap **1,829,000**, over **4,490**. The built-worker SSR smoke reports 29 rendered routes and one redirect; those are not Network production browser verification. Prior observed Stripe tests 4/4 are historical, not new tests in this audit.
- Read `vite.config.ts`, `src/routes/__root.tsx`, `src/router.tsx`, `scripts/data/validate-client-bundle-budget.mjs`, and the Network lazy join/application modules. Existing global TanStack automatic code splitting remains disabled intentionally. Main bundle composition is not sufficiently diagnosed for a safe source edit from static inspection alone. Do not increase cap or claim fixed. A measured module/chunk comparison between main and Network with bundle artifact inspection is still necessary.
- Read-only live Supabase verification found RLS enabled on all five Network tables. Effective policy inventory: owner-scoped authenticated business-account SELECT; owner-scoped revision SELECT; revision INSERT requires submitting authenticated owner, access_enabled, Featured tier and pending review; public listings SELECT checks is_published=true; applications and Stripe events have no exposed client RLS policy. Read-back of table privileges shows authenticated SELECT on business accounts, authenticated SELECT/INSERT on revisions, and anon/authenticated SELECT on published listings only.
- Storage read-back: private `texasdefined-network-applications`, `texasdefined-network-submissions`, `texasdefined-network-featured-drafts`; public `texasdefined-network-published`. All four enforce 3,000,000-byte file limit. These checks do not prove storage RLS or cross-account upload isolation.
- Supabase security advisor contains project-wide pre-existing warnings (including `pg_net` extension in public and leaked-password protection disabled). Do not alter unrelated shared-project security settings without impact review. Network applications and Stripe event tables are among RLS-enabled tables without client policies, consistent with service-only handling; verify this assumption in adversarial tests.
- No customer accounts, Stripe operations, messages, production Network publication, migrations or test records were created in this audit. No app implementation changes, new CI run, client-bundle fix, or production certification are claimed.
- Mandatory remaining: reduce main client bundle by >=4,490 bytes with legitimate measured optimization; independently test owner provisioning, webhook event permutations, publication rollback/concurrency, storage isolation, notification delivery, browser/hydration/mobile/network performance; complete exact-final-HEAD CI; obtain launch approval. **PR must stay draft/unmerged, Checkout disabled and Network noindex.**


## Continuation — Plus application flow correction (October 10, 2026)
- Commit `9b56901d620f8df32340f0d7be7ace009d6397d9` corrected a real onboarding contradiction: the new Plus application form previously attempted Checkout immediately after form submission without a Supabase bearer token or independently reviewed owner provisioning, while the server rightly requires both. Now Plus submission saves for editorial review, explains owner verification, and links applicants to the existing dashboard sign-in. Checkout remains deliberately disabled and no subscription or payment is triggered from the intake form.
- No security prerequisites were removed; the billing endpoint still requires confirmed email, approved owner binding and the explicit Checkout flag.
- Client main bundle still requires measured optimization; changing a lazy application route is not evidence of reducing the main chunk. The latest verified failing measurement remains **1,833,490 bytes** against **1,829,000 bytes**.
- Remaining release requirements and noindex/draft/no-live-billing restrictions are unchanged; no production deployment or new billing test certification is claimed.


## Continuation — tier authorization, storage baseline and republish correction (October 10, 2026)
- On branch commit [651ca281](https://github.com/keeptxred/TexasDefined/commit/651ca2811033c21d89b9dde11d01d1f4adbd237c), fixed a dangerous Plus/Featured tier confusion. The provisioner previously issued a `featured` tier to every newly verified Plus application because the table constraint accepted only Featured. Now approved Plus owners receive only `plus`, with the dashboard showing Plus billing access and no Featured revision controls.
- Applied Supabase migration **20261010205801_network_owner_plus_tier_guard** (name `network_owner_plus_tier_guard`) via the connected service and independently read back the exact CHECK constraint, default `plus`, and Featured-drafts SELECT policy requiring access_enabled and actual Featured membership. At migration time there were **zero live Network applications and zero owner accounts**. The repository migration file uses the actual applied database version.
- Live Free-plan evidence: shared Supabase organization `stioevkafefcxzmrvqkq` is `tier_free`; Network has **zero stored objects**; all storage catalog reports 115 objects and 75,766,082 metadata-reported bytes. This is a capacity baseline, not full billed usage; publication should remain blocked until per-business image quotas and retention are enforced.
- Stripe read-only live-account check of `prod_VPrsZ3mYEKz2da` verified **product active=false**; no product mutation or charge. The frontend/backend Checkout deployment flag was not read from production environment and cannot be certified as actually configured, but checkout is guarded and intentionally disabled by default in source.
- Exact tier-fix branch-head GitHub Actions Merge Gate [38085795705](https://github.com/keeptxred/TexasDefined/actions/runs/38085795705) concluded FAILED **only** on client performance: `main-d0EaCZ4z.js` 1,833,490 bytes vs unchanged 1,829,000 limit (4,490 bytes excess). Other top-level canonical checks succeeded; **no overall passing gate**.
- Found that the earlier anti-clobber guard on a `published` application did not protect revisions on **unpublish → approve → republish**: the existing publisher upsert still overwrote the last approved profile/media with original intake. Updated publication to restore a previously approved unpublished public profile without recopying intake media, INSERT only on first publication, and require an approved application status conditional update with rollback. This still requires transactional concurrency/failure testing; do not claim atomicity.
- Added Vite CI-only main chunk module-weight diagnostics. This logs the top 35 rendered source modules without changing the main budget or enabling global route splitting. A subsequent completed CI build is required to see the module analysis and identify a measured optimization; this is **diagnostic**, not a bundle fix.
- No customers, invoices, publication, invitations, or live payment activation. PR remains DRAFT. Other release requirements are unchanged: performance, CI, rollback races, Stripe event ordering and ledger atomicity, cross-account security tests, Office 365 notifications, image retention, browser QA and explicit launch approval.


## Continuation — pending Plus first-checkout usability repair (October 10, 2026)
- Found that safe deferral of Checkout during intake exposed a second onboarding gap: there was no authenticated UI path to begin the first Plus subscription after independent owner verification and application approval. Prepared a billing-page remedy that exposes a checkout-start button **only** for an approved Plus application without an existing subscription, and disables it unless `stripeCheckoutEnabled()` actually evaluates true. The API continues to require a verified bearer user, matching contact email and enabled owner binding. It also now requires `approved` application status, not `pending_review`. No Checkout session has been created.
- These changes are a branch implementation, **not** an approved launch or payment test. Live Plus product remains inactive and Network Checkout is intentionally disabled by default.


## Client bundle measured-module optimization experiment — October 10, 2026
- Required Merge Gate [38086093223](https://github.com/keeptxred/TexasDefined/actions/runs/38086093223) completed FAILED with two top-level checks: original `main-d0EaCZ4z.js` **1,833,490** / **1,829,000** bytes and a stale static assertion in `validate-network-release-guards.mjs` expecting old `if(statusError){` syntax after the successful fail-closed publication code refactor. Corrected the assertion to match `if(statusError||!updatedApplication){`; no security check removed.
- New diagnostic module weights (unminified rendered source contribution, **not** exact final byte savings): `src/routeTree.gen.ts` 128,232; `src/data/texas-industries.ts` 65,798; `src/data/gaming.ts` 45,509; `src/data/painted-church-authority-sources.ts` 71,767. These content registries appear in initial main through eager route imports.
- As a measured candidate, shifted the Texas Industries index head and Gaming index/detail head to asynchronous route loaders. They still construct the same canonical, ItemList and Article JSON-LD from the actual authoritative registries during SSR; full registries remain imported by their existing lazy page components. This should avoid eagerly pulling those registries into the main route tree while preserving SEO; it is **not confirmed** to lower emitted main bytes until exact subsequent CI.
- The prepared Plus first-checkout flow is gated behind approved owner binding, confirmed login and disabled default Checkout. No live sessions or charges were created; release restrictions remain.


## Webhook signature verifier unification and non-live tests — October 10, 2026
- Identified a test gap: `scripts/data/network-stripe-security.test.mjs` exercised `verifyStripeSignature` in the server helper, but the actual webhook route separately implemented `signatureValid`. Refactored the production webhook endpoint to call the same tested helper (dynamic server import); removed duplicate HMAC code rather than preserving two subtly divergent implementations.
- Added three unit tests: multiple `v1` signatures during signing-secret rotation; signed future timestamps outside tolerance; substitution of a differently signed webhook body. These run against the helper used by the actual endpoint. No live Stripe calls occur.
- These tests, and the updated exact-head canonical gate, must pass before they count as verified. Event ledger concurrency and full subscription lifecycle mock tests remain outstanding.


## Canonical CI — main JavaScript fixed, CSS gate separately exposed (October 10, 2026)
- Exact optimized head `c1f7069cb9ffb91e69d6bcffb4e74f7486004df5` Merge Gate [38086403631](https://github.com/keeptxred/TexasDefined/actions/runs/38086403631) FAILED only the pre-existing stylesheet limit. Main client emitted `main-72WWOdJf.js` at **1,730.76 kB** (Vite decimal, ~1,730,760 bytes): more than **98 kB under** the unchanged 1,829,000-byte JavaScript cap. Route loader optimization removed gaming and industry registries from the initial bundle with no route removal or global TanStack splitting.
- Stylesheet `styles-DyD4fp3u.css` was **146,114 bytes** versus unchanged **141,250-byte** limit (4,864 bytes over). The same stylesheet hash and size already appeared in completed preceding runs where JavaScript failed first, hiding the stylesheet violation. CSS is a separate release blocker and **must not** be dismissed by raising the cap.
- Trial: build with the project's installed Lightning CSS minifier, preserving the stylesheet source, utilities and accessibility animations. This is a measured minification experiment, not an increased budget. If actual CI indicates failure, missing dependency, CSS semantics break or continued CSS overage, revert or replace with a genuinely validated stylesheet optimization.
- Included previously prepared executable HMAC test coverage and route helper unification. Tests and this new CSS build require exact-head CI; do not claim pass until completed.


## October 10 continuation — CSS experiment reverted, Stripe cross-account/suspension guard
- Exact head `068f2f6b22eef923fb9de8ab890d8735a36f9375` CI [38086690483](https://github.com/keeptxred/TexasDefined/actions/runs/38086690483) completed **FAILED solely on CSS**: LightningCSS produced `styles-BgnOAsE_.css` **151,205 bytes**, worse than default esbuild **146,114**, against unchanged **141,250** limit. Reverted the LightningCSS build option and retained earlier successful JavaScript optimization. No budget was raised or disabled. Seven Stripe HMAC/disabled Checkout unit tests passed in that run (four original plus three new rotation/time/payload cases); release guards, route generator and remaining canonical checks passed.
- Found webhook previously checked subscription mismatch but could overwrite an established `stripe_customer_id` from a different subscription customer. Added a pure server-only identity function used by actual webhook that validates both subscription and customer IDs, with isolated tests for mismatches/missing customer.
- Reordered failed/cancelled subscription reconciliation to **suspend public listing before updating entitlement**. Previously a database failure during unpublication could leave a visible paid listing after entitlement was already revoked. Sequence now hides public content first and fails closed, then updates entitlement and application state. Not an atomic transaction; concurrent webhook and publication races still require independent integration testing and SQL-level atomic transitions before launch.
- Existing registration and billing remain draft, disabled by default, no live Stripe calls, charges or customer messages. Production is NOT certified and PR stays draft.


## Continuation (October 10, 2026) — CSS split experiment, duplicate intake and SSR correction
- Exact-head [run 38087548103](https://github.com/keeptxred/TexasDefined/actions/runs/38087548103) failed after newly SSR-rendered Network profile JSX contained an extra closing brace at line 32; fixed by commit `31d8d92adf6642e47aa34d37bfb3bd3a419830c9`. No CSS measurement on failed JSX run; do not claim passing SSR until next build.
- New experimental CSS architecture: feature-specific utility CSS `src/network.css` is imported from each Network/admin/owner lazy route, while `src/styles.css` excludes those lazy route files from its Tailwind source scan. This attempts to deliver the 4,864-byte excess only on Network pages rather than requiring all visitors to download those utilities. Must inspect generated CSS links and Network browser rendering, and **revert** if the primary CSS budget, lazy CSS resolution or SSR styling fails. CSS budgets remain unchanged.
- Live Supabase migration **20261010213107_network_atomic_active_application_identity** added a case-/whitespace-normalized partial unique index across active applications (pending_review, approved, published). No Network applications existed at migration time. This makes simultaneous identical application submissions safe at the DB boundary; the API now returns HTTP 409 for the unique violation instead of a 503. Rejected applications can be resubmitted. Needs test with rollback fixtures; no customer records created or altered.
- Earlier applied and tested atomic Stripe RPC remains in place; its implementation and SQL migration tracked separately. No email, charges, live publication or indexing authorized. DRAFT / DO NOT MERGE until exact-final-HEAD checks, UI and security validation, and explicit approval.


## Database-enforced visibility and rollback fixtures (October 10, 2026)
- Applied migration **20261010213304_network_database_publication_entitlement_gate** on live shared Supabase. A BEFORE INSERT/UPDATE trigger refuses published listings unless the matching application is editorially approved/published; Basic may publish free; Plus must have an active entitlement; serializes concurrent entitlement changes via FOR SHARE. It never automatically publishes content.
- Applied migration **20261010213336_network_suspend_ineligible_published_listings**. An AFTER UPDATE trigger unpublishes a previously visible listing when the application becomes rejected/pending, Plus loses paid entitlement, or its plan is reassigned. This defends against bypasses or interrupted service-layer workflows.
- Executed rollback-only SQL fixture tests: pending Basic publication rejected; approved free Basic accepted; unpaid Plus rejected; approved entitled Plus accepted; approved paid Plus automatically suspended on entitlement loss; Basic automatically suspended on rejection. All asserted in SQL without live billing and both transactions rolled back. No persistent test applications/listings.
- The index **20261010213107** was also tested with rollback-only simulated simultaneous duplicates: whitespace/case-equivalent active identity rejected; rejected application allowed again. Tests do NOT establish full end-to-end browser/Stripe integration or deployment certification.


## CSS experiment correction (October 10, 2026)
- On `61991774c6e57b3a64931d0265aa35cf063b7354`, Merge Gate [38087997220](https://github.com/keeptxred/TexasDefined/actions/runs/38087997220) **PASSED**, with main JavaScript **1,731,114 bytes** (cap 1,829,000) and primary stylesheet `styles-C6FarGTV.css` about **141.09 KB** (cap 141,250). SSR smoke also passed its existing 29 routes, but this is not new Network browser QA.
- However, the initial `@reference "./styles.css"` in route-loaded `src/network.css` generated an unacceptable **140.26-KB Network stylesheet**, almost duplicating the global stylesheet. **Do not treat this as an acceptable production performance optimization** even though the primary CSS validator passed. The revised experiment removes the full global reference; it imports only Tailwind's theme/utilities modules with `source(none)` and duplicates only the small `@theme inline` design-token mapping. Must confirm emitted feature CSS is genuinely small, all utilities exist, and no styling regression before release. The performance cap and guards were not modified.


## Network CSS anti-duplication guard (October 10, 2026)
- Added a **stricter supplementary** 45,000-byte cap for the single lazily emitted `network-*.css` stylesheet. Primary global CSS remains capped at 141,250 and main JavaScript at 1,829,000. This closes a loophole where a 140-KB Network stylesheet could coexist with a passing 141-KB global CSS file. A missing Network CSS bundle or a larger-than-45-KB feature stylesheet now fails canonical validation. This limit was introduced to prohibit duplicate global styles, not to raise/rebase an existing gate; actual final emitted sizes still require CI.


## Network email notification queue, disabled delivery (October 10, 2026)
- Confirmed connected approved Outlook profile `admin@texasdefined.com`, **but a ChatGPT Outlook connection does not authorize or configure Cloudflare Worker sending**. No messages sent and no Gmail used.
- Applied Supabase migration **20261010213947_network_private_notification_outbox**: private RLS-protected outbox, service-role-only grants, unique event keys, status `pending` and triggers for application received/approved/rejected, verified-owner enabled, Plus membership state, and Featured revision approved/rejected. No transport implementation or live email delivery.
- Applied migration **20261010214019_network_notification_membership_transition_keys** so same-transaction activation/inactivation enqueue distinct pending events rather than conflicting idempotency keys.
- Ran rollback-only SQL fixture: pending application insertion, editorial approval, duplicated approval update, membership activation/deactivation and rejection resulted in **five unique event types, all pending**. No duplicate unchanged-status event, no provider calls; transaction rolled back, leaving zero customer fixtures.
- Added pure text-only templates using exactly `admin@texasdefined.com` sender/reply-to and `NETWORK_EMAIL_DELIVERY_ENABLED=false`, with canonical Node tests wired to premerge. A secure Microsoft Graph app deployment credential / authorized SMTP transport, rate-controlled outbox dispatcher, delivery claim/retry policy, provider confirmation and operational approval remain a launch blocker. Do not connect or send until authorized.
- Corrected regex escaping in Network CSS asset validator after head `a03d0a016b1397f6be62634df6e37ffac58d04d1` Merge Gate [38088411240](https://github.com/keeptxred/TexasDefined/actions/runs/38088411240) failed **solely** to match `network-*.css` even though build emitted CSS. The same run passed **37 rendered SSR routes, 48 markers and one redirect**, including eight Network prelaunch pages, and primary JS/CSS were within limits. The 45,000-byte feature CSS cap is retained unchanged; new exact-HEAD CI must verify success.


## Owner verification audit hardening (October 10, 2026)
- Applied migration **20261010214534_network_atomic_owner_verification_audit** to Supabase: service-only `texasdefined_network_owner_verifications` RLS table plus `provision_verified_network_owner` atomic RPC. Confirmed RPC is executable only by postgres and service_role; zero real owner accounts existed before migration.
- The admin now must independently select a verification method, enter a non-sensitive reference/summary (20–500 characters), identify the reviewer and confirm ownership. The server still checks privileged admin access, approved Plus application, existing Supabase user and confirmed matching application email before calling the RPC. The RPC locks the application, checks those prerequisites again against `auth.users`, prohibits reassignment, creates/reactivates a Plus-only account and writes an audit record in one transaction. Duplicate enable calls return an idempotent alreadyEnabled response without duplicate audit entries.
- No owner accounts, auth users, invitations or charges were created for tests. A full positive two-user authentication and concurrent-owner test remains outstanding; a checkbox/reference is an auditable claim, not proof by itself. Reviewer must independently verify before invoking the action.


## Final verified continuation checkpoint — October 10, 2026
- **Latest implementation HEAD inspected:** `8783c41bd78126e5d9337c53128405cbbe61a79b`; current main at this checkpoint `d55466cb9575b8a931a39f64a3856d750a19882b`. PR #4545 remains OPEN, DRAFT, UNMERGED; no authorized production launch.
- **Actual completed exact implementation-HEAD Merge Gate:** [38088987020](https://github.com/keeptxred/TexasDefined/actions/runs/38088987020) **SUCCESS**: canonical premerge; 38 Network static release guards; **9/9** Stripe security unit tests; **3/3** disabled Office 365 notification template tests; existing and new built-worker SSR smoke **37 routes / 48 marker checks / 1 redirect**. This is local built-Worker evidence, not actual production or browser hydration.
- **Measured client main JS:** 1,731,114 bytes, limit 1,829,000 (97,886 bytes headroom). **Measured lazy Network CSS:** 20,271 bytes, limit 45,000. Global primary CSS remains below its fixed 141,250-byte limit. The earlier 140-KB duplicate Network CSS experiment was rejected and replaced with theme-only scoped utilities.
- **Supabase migrations deployed/read back in this continuation:** 20261010205801 Plus owner tier isolation, 20261010211826 atomic signed Stripe reconciliation, 20261010213107 concurrency-safe duplicate applications, 20261010213304 publication entitlement trigger, 20261010213336 automatic unpublish on lost entitlement/editorial approval, 20261010213947 private notification outbox, 20261010214019 separate same-transaction membership event keys, and 20261010214534 atomic documented owner provisioning/audit. All committed as matching migration files.
- Rollback-only SQL fixtures confirmed Stripe replay/mismatch/unpublication, duplicate and rejected application behavior, editorial Basic/Plus publication gates, entitlement suspension, and five deduplicated pending notification types. A negative owner provisioning fixture rejected missing approved ownership; positive real-account authorization and concurrent-owner fixtures were deliberately not created. Final database read-back showed **0 applications, 0 listings, 0 owners, 0 owner-audit entries, 0 Stripe events, 0 queued emails and 0 Network media objects**.
- Stripe live product `prod_VPrsZ3mYEKz2da` was read-only verified **inactive**; no Stripe mutation, Checkout session, charge or activation. Source Checkout flag remains OFF by default. Connected Outlook identity `admin@texasdefined.com` confirmed, but Cloudflare Microsoft Graph/SMTP delivery integration was NOT configured and **no messages were sent** (personal Gmail must never be used).
- **Remaining mandatory prelaunch gates:** end-to-end authorized two-user cross-account/RLS and business-owner evidence verification; Stripe non-live subscription/portal/failed-payment/out-of-order/recovery and checkout-session lifecycle testing; transactional publication/media copy race and orphan cleanup; free-tier-conscious per-business media limits/retention; approved Office 365 runtime delivery with durable claim/retry; actual preview browser/hydration/accessibility/responsive QA; independent production verification after authorized deployment; full TypeScript semantic typecheck where possible; product/pricing approval and explicit release approval. No bypass/merge/live billing/noindex removal authorized.
- **Release conclusion:** implementation validation is green, but business, operational, and production release certification is **NOT complete**. Leave PR draft and unmerged; maintain noindex and billing OFF. This is the permanent checkpoint before any future continuation.


## Checkout reservation hardening (October 10, 2026)
- Applied live Supabase migration **20261010223033_network_checkout_attempt_reservation**, tracking a private service-role-only table for one in-progress/ready Checkout session per verified Plus business. It serializes reservations with a locked application row, enforces an approved Plus application, an enabled Plus owner with matching confirmed email, and absence of an existing Stripe subscription or paid entitlement.
- For parallel requests, an active two-minute lease returns `busy`; a healthy ready session is reused only while its Stripe expiry is comfortably in the future; a timed-out request retries the same Stripe idempotency key inside the 23-hour retention window; after expiration a fresh attempt key is minted. Completion validates a live Stripe session identifier, a Stripe-hosted HTTPS URL and a bounded session expiry, all behind service-only RPC grants. No Stripe Checkout sessions were created by the migration.
- Changed the owner-bound Checkout API to use reserve/create/finalize instead of calling Stripe with one permanent application-scoped idempotency key. On persistence errors it returns a fail-closed 503 and never provides an unrecorded URL. Added exact-host Checkout URL validation (rejects `checkout.stripe.com.evil.test`), corrected success return to the existing `/network/checkout-return` route, and added mocked Stripe unit tests requiring NO live network access or real funds.
- This is infrastructure for future **approved** billing only. Live product remains inactive, Checkout default remains disabled, and a full non-live end-to-end session/cancellation/payment-recovery and concurrency certification remains required before release.


## Checkout payment hardening — validation of subscription shape and owner rechecks
- Applied Supabase migration **20261010223315_network_checkout_finalize_reverify_owner**. At Checkout completion the database now rechecks the owner's enabled Plus account, matching confirmed Supabase identity and application email under a row lock. A mid-flight owner revocation cannot successfully finalize a pending session. This is service-role-only; no customers/payments created.
- Webhook additionally verifies Stripe's current live subscription has exactly **one** approved Network Plus price, quantity 1, valid account/customer IDs, matching project and application metadata, and no unrelated billable price before entitlement writes. The endpoint still fetches current Stripe state and uses the already-atomic ledger RPC. Added mocked rejection tests.
- Existing billing portal POST now requires a live-format server Stripe secret; portal remains separate from intentionally disabled new Checkout.
- None of these tests represent an authorized launch, Stripe API network integration or payment acceptance; final-head CI remains mandatory.


## Featured revision transaction integrity (October 10, 2026)
- Applied Supabase migration **20261010223759_network_atomic_featured_revision_review**. Service-only `finalize_texasdefined_featured_revision` locks the revision, business owner, application and public listing; rechecks pending status, Featured-tier owner, matching submitter, enabled account, publication and live Plus entitlement; updates profile media paths and review ledger in **one database transaction**. Rejections update the ledger alone, approvals never auto-publish or override a suspended listing. Replay cannot reapply an already-reviewed revision.
- Rollback-only SQL fixtures with synthetic, never-persisted user/owner/listing/revision verified approved profile+review status commit and replay returning `already_reviewed`. No permanent users, images, published listings or notifications were created. Source administrator workflow now calls this service-role RPC after validating and copying each approved image.
- Media copies precede database finalization, so interrupted requests can still leave orphaned published-bucket copies; introduce safe reference-aware garbage collection and simulated mid-upload failure tests before production launch. Neither billing nor email was enabled.
