# TexasDefined Business Network — SINGLE coordinated customer launch

Status: **NOT customer-launched.** The earlier protected foundation and migrations were merged and deployed, but the customer's requested launch has not occurred. This branch is deliberately unmerged until all production customer capabilities and real provider integrations are verified simultaneously. Do not merge an isolated integration as a release.

## Invariant

Run a single complete deployment **only after**: private Supabase owner/Auth/media and public listing acceptance, Basic intake and review/publication, protected owner portal, Plus production Checkout/webhook/reconciliation, Stripe self-service cancellation and portal, Exchange mailbox-restricted automated Graph sender, reliable outbox reconciliation, public indexing of editorially approved listings, final policy/price decisions, and end-to-end browser behavior ALL pass in an isolated staging build and full production preflight. Never activate a subset as a launch. Keep private account, billing, draft, moderation and admin URLs nonindexable permanently; this is security/privacy, not a disabled user-facing feature.

## Connected-provider facts (October 11, 2026)

- Two prior PRs, #4545 (Network foundation) and #4658 (installed Supabase security migration manifest) are already merged; they are **not** full customer launch authorization.
- The real live Stripe account has a $19.99 USD monthly recurring Plus price. Its product was made active and its live billing portal was configured with invoice history, payment methods and end-of-term cancellation. These are provider configuration, **not** a verified subscription lifecycle.
- No dedicated TexasDefined Network Stripe webhook signing secret is installed in Cloudflare; the unrelated existing KeepTXRed and a retired external site-builder webhooks are not substitutes.
- A single internal `admin@texasdefined.com` Outlook self-test was sent and received; this does not establish an Entra Graph app, Mail.Send application permission scoped by Exchange Application RBAC, scheduled delivery, or safe outbox reconciler.
- The connected GitHub, Supabase, Stripe and Outlook tools cannot configure Cloudflare Worker secrets or Microsoft Entra app registrations/Exchange RBAC. Do not print or commit secrets; owner must configure in dashboards or grant suitably scoped access.
- PR #4659 fixed the published-page indexing bug separately and merged, but actual public search activation remains gated pending full customer launch.

## One-cutover conditions (code and provider acceptance)

`src/data/network-atomic-launch-readiness.server.ts` evaluates **all** required feature flags, production database/runtime secrets, Stripe live/webhook credential presence, Entra client credentials/mailbox/job secret and **fifteen distinct completed E2E proof categories (including separately delivered hosted Website service)**. The test fixture is synthetic; its passing test only means the predicate works, not that real providers have been tested. The gate must consume independently obtained CI/provider acceptance artifact references; merely setting variables to `true` cannot pass. It does not deploy or mutate anything.

`src/data/network-graph-token.server.ts` implements a bounded, origin-pinned Microsoft Graph client-credentials token request (`https://graph.microsoft.com/.default`); no app registration or mailbox access is inferred or created, and this adapter does not send mail.

## Actual full-launch execution order

1. Provision isolated staging owner identities, media, real test-mode Stripe account/price/webhook and mailbox-scoped Entra app; verify explicit provider permissions and admin cost before staging provisioning.
2. Finish the actual Graph sender job/claim/reconciliation and single-cutover Worker deployment/secrets configuration **on this branch**, never on `main` as individual launch fragments.
3. Exercise Basic application, review, public publication and indexing; Plus verified-owner Checkout, activated entitlement, refund/cancellation and billing; 24/25 concurrent uploads, disabled-owner access and publisher media boundaries; real Graph acceptance, received notices, ambiguous failure/no-double-send and manual evidence-based reconciliation; all responsive browser flows. Use synthetic users and avoid real customer charges.
4. Record the verified artifacts; pass the atomic launch gate; owner approves finalized published billing/privacy/retention/eligibility language and customer-facing launch copy.
5. Perform a single all-features-ready production cutover and independently verify real customer journeys; if an essential provider step fails, treat the entire launch as not accepted. Do not falsely announce completed launch.

## External access needed to complete

- Cloudflare account capability to update Worker secrets/configuration and test the deployment as one unit.
- Microsoft Entra/Exchange administrator permissions to register or authorize app-only Graph Mail.Send narrowly for `admin@texasdefined.com`, and a safe way to place the client secret in Cloudflare.
- Stripe connected test-mode/sandbox integration to exercise the lifecycle before the existing live $19.99 product is exposed to customers. Dedicated webhook signing secret must be stored directly in Cloudflare, not shared here.
- Final owner-facing commercial/legal decisions, including Featured custom pricing terms (do not take unspecified Featured payments).

**No partial production launch, no invisible promotion of feature flags and no unsupported “ready” claim.**

## Draft branch implementation additions (still unmerged, not a launch)

The Cloudflare Worker compatibility date is 2026-08-14; Cloudflare documents that configured Worker secrets populate \`process.env\` with Node compatibility. The handler uses both scheduled-event env gate and server runtime checks, rather than assuming a code-level enable switch alone works. Graph application Mail.Send and Mail.ReadBasic/Read should be assigned using **mailbox-scoped Exchange Application RBAC**, not tenant-wide Entra consent; the two permission sources are additive and unscoped Entra permissions can bypass the intended scope. The sole owner must independently verify that out-of-scope mailbox operations are denied before passing Graph staging.

The Graph sender now uses a one-to-one `x-texasdefined-notification-id` header; Microsoft's documented `sendMail` returns 202 only for acceptance. A bounded Sent Items API check requires matching ID, recipient and subject before recording service-only reconciliation evidence. Verified state is evidence of sending from the owned mailbox, **not proof of recipient delivery**. On 202-without-proof, timeout, 429, 4xx or 5xx the row remains held for reconciliation, never blind-resends. Previously claimed rows can be checked again by the next invocation without retransmitting.

`src/data/network-notification-cron.server.ts` uses the service-only outbox claim/reconciliation APIs. A Cloudflare scheduled event and a 15-minute Cron configuration are prepared in `src/server-entry.ts` and `wrangler.jsonc` on this draft branch only. They require **all eight customer feature flags plus NETWORK_LAUNCH_ATOMIC_VERIFIED=true and the expected mailbox** before execution, and validate Graph token plus scoped mailbox access before any claim. There is no externally callable HTTP handler or Cron state in production from this draft. Provider credentials and actual scoped application authorization must still be installed and verified, and test users must pass end-to-end acceptance; the release marker alone is not permission to ship.

## Runtime atomic protection

One-cutover coverage is not limited to an operator checklist. The drafted `networkCustomerLaunchArmed` requires the Worker-only `NETWORK_LAUNCH_EVIDENCE_JSON` acceptance manifest, all 15 acceptance categories, the actual runtime credentials and all release switches, as well as the explicit approval marker. Until that entire check passes, customer mutation/billing APIs return 503 and server-side directory readers show no published profiles. Static preview pages may remain readable and noindex for isolated browser testing; they do not create customer accounts or charge cards. The Cron sender shares this same gate. Evidence is never serialized into HTML and must be installed as a Worker secret only *after independent provider and browser verification*. This still does not certify real services until those tests have occurred.

## Isolated staging can exercise the entire enabled workflow without a production release

The live launch gate cannot be used for prelaunch tests because it requires production-mode credentials and completed acceptance. The draft now includes a separate `networkIsolatedStagingArmed` path requiring `NETWORK_STAGE_QA_APPROVED=approved-synthetic-staging-only`, all eight customer-facing flags, a different hosted Supabase tenant (not `ftkznprjljkhymknvhye`), a distinct HTTPS `.workers.dev` stage origin, `sk_test_` Stripe and a test-only price that is not the live $19.99 Plus price. Staging Graph sends are restricted to `admin@texasdefined.com` self-test recipients in the staging runtime; all other staged customer-recipient sends fail closed. This is code capability only; no staging branch, live app registration, sandbox account or paid staging environment was created.

Connected Supabase reports a new database branch would cost **$0.01344/hour** on the account's organization. Owner has prohibited new paid costs without approval, so do not create that branch. Existing GitHub disposable local Supabase integration tests remain cost-contained.

### Staging hostname and search isolation

The draft checks actual incoming HTTPS host against the exact staged Workers origin before serving staging Network routes. An accidentally attached production hostname refuses stage requests. Even with every test-mode customer feature enabled, the synthetic directory, published test profiles, and join page remain nonindexable; the staged sitemap excludes Network URLs. Application Graph Mail.ReadBasic.All is the Graph app-only read permission documented by Microsoft; validate header access on the isolated mailbox in live-provider staging before authorizing any real recipient messages.

### Test-mode email sink and bounded provider paging

The single-cutover draft now rewrites **synthetic staging** notification recipients to the sole administrator's mailbox `admin@texasdefined.com`; no outside staged applicant receives a Graph message, while the immutable outbox correlation identifier is preserved for the real Sent Items proof and reconciliation. The same transformation runs for send, verifier and manual operator recovery; production recipients are never rewritten. This allows full subscription/application/notification flow testing without sending real mail to unconsenting recipients.

Graph Sent Items verification pages through up to four bounded 60-message pages for a matching custom header. Continuation URLs are allowed only for the exact administrator Sent Items collection, with Microsoft Graph's `$skip` or `$skiptoken` pagination; foreign domains and other mailboxes are rejected. More pages than the bounded scan supports remain held for documented operator recovery, **never automatically retried**. Provider documentation: https://learn.microsoft.com/en-us/graph/api/user-list-messages?view=graph-rest-1.0 .

## Dedicated live Stripe endpoint signing — required, not optional

The new draft enforces `NETWORK_STRIPE_WEBHOOK_SECRET` for **live TexasDefined Network webhooks only**. Generic `STRIPE_WEBHOOK_SECRET` is no longer accepted by the Network handler or the atomic production acceptance gate, preventing another site's signing secret from accidentally being reused. Isolated Stripe test mode remains bound solely to `NETWORK_STRIPE_TEST_WEBHOOK_SECRET`. No signing secrets are stored in GitHub source.

At the single verified launch, a dedicated Stripe webhook must target exactly `https://texasdefined.com/api/public/network-stripe-webhook` and subscribe to `customer.subscription.created`, `customer.subscription.updated`, `customer.subscription.deleted`, `invoice.paid`, and `invoice.payment_failed`. Install the signing secret in Cloudflare under `NETWORK_STRIPE_WEBHOOK_SECRET`, ensure `STRIPE_SECRET_KEY` is the correct live account key, then independently verify subscription activation and cancellation. A correctly shaped `whsec_` string alone does not prove that the endpoint is configured; the E2E acceptance proof is mandatory.

## Public plan benefits acceptance — latest gap discovered October 11, 2026

The public Network offer advertises **Plus basic listing performance statistics** and **Featured expanded performance insights**. No corresponding Network-owner reporting screen or supporting Network metrics table was found in a read-only GitHub/production database audit. This was the **historical production-schema finding before the new, unmerged implementation**; these are still **uncertified advertised benefits**, separate from Stripe or Graph provider access. The release now also requires the `planBenefitsDelivered` acceptance category in `src/data/network-atomic-launch-readiness.server.ts`. See `docs/network/PLAN_BENEFIT_DELIVERY_ACCEPTANCE_2026-10-11.md`.

**October 11 continuation update:** PR #4660 now contains `src/data/network-profile-metrics.ts`, `src/components/network/NetworkPerformancePanel.tsx`, `src/routes/api.public.network-metrics.ts` and the pending private aggregate metrics migration. That source implementation supersedes the original missing-code finding, but production deployment and two-owner staged entitlement/metric verification remain outstanding. Do not claim launch-ready or take payment until Basic/Plus/Featured reports and restrictions have been independently accepted. Featured sponsorship placements and terms still require separate commercial approval. Featured sponsorship placements and terms still require independent commercial approval.


## Current four-tier override — supersedes the original 14-category contract

Owner proposes four simultaneous plans, **Basic Free, Plus $19.99, Featured $49.95, and limited hosted Website $79.95 per month**. The $49.95 sponsored listing and $79.95 managed five-page microsite are two different deliverables, not an either/or price choice. Their pending implementation/approval is part of the same one-cutover release, not a later switch. The source launch guard now has **15** independent categories, adding `hostedWebsiteDelivered`. That requires genuine stage proof from separate owners, page data/SEO, quotas, verified Stripe test subscriptions and completed browser QA. See `docs/network/FOUR_TIER_HOSTED_WEBSITE_LAUNCH_CONTRACT_2026-10-11.md`. Any historical references below to fourteen acceptance categories are superseded; test fixtures or manually populated environment records are not independent proof. Both paid additional tier prices remain draft, and production stays closed.
