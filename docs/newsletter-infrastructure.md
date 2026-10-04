# TexasDefined newsletter infrastructure

This document describes the newsletter backend and delivery foundation. It intentionally does **not** add newsletter signup UI or arm outbound bulk email.

## Data model

TexasDefined uses four private service-role-only tables:

- `texasdefined_newsletter_subscribers` — normalized email, consent provenance, interests, confirmation/unsubscribe tokens, suppression state, and provider contact identity.
- `texasdefined_newsletter_issues` — newsletter drafts, rendered bodies, audience metadata, schedule, lifecycle state, and provider broadcast identity.
- `texasdefined_newsletter_deliveries` — one delivery row per issue/subscriber with provider IDs and delivery outcome.
- `texasdefined_newsletter_events` — provider webhook events such as sent, delivered, opened, clicked, delayed, failed, suppressed, bounced, complained, and unsubscribed.

All four tables have RLS enabled. `anon` and `authenticated` have no table privileges; the server-side service role is the only application path.

## Subscriber lifecycle

`newsletter.functions.ts` exposes server functions that future UI can call without exposing the service-role key:

- `subscribeToTexasDefinedNewsletter`
- `confirmTexasDefinedNewsletter`
- `unsubscribeFromTexasDefinedNewsletter`

HTTP infrastructure also exists at:

- `POST /api/newsletter/subscribe`
- `GET|POST /api/newsletter/confirm`
- `GET|POST /api/newsletter/unsubscribe`
- `POST /api/newsletter/resend-webhook`

Both the HTTP subscribe endpoint and the TanStack server-function signup path remain fail-closed until `NEWSLETTER_SIGNUPS_ENABLED=true`. Signup input is validated with Zod and includes a honeypot. Email addresses are normalized to lowercase. Signup source, source path, consent version, and optional interest tags are retained.

Complaint and bounce states are hard suppressions. A later public signup does not automatically reactivate either state; an operator must deliberately resolve it. Provider unsubscribe events also move the subscriber into the unsubscribed suppression state.

### Double opt-in and confirmation delivery

Set `NEWSLETTER_DOUBLE_OPT_IN=true` to put new or re-subscribing addresses into `pending` until their confirmation token is consumed.

When double opt-in is enabled, `newsletter-subscription.server.ts` routes the signup through the transactional confirmation-email transport in `newsletter-confirmation.server.ts`:

1. `RESEND_API_KEY` and `NEWSLETTER_FROM_EMAIL` must be configured before a double-opt-in signup can mutate subscriber state.
2. The pending subscriber is stored first so the one-time confirmation token is valid before email delivery begins.
3. Resend's `POST /emails` endpoint sends a branded confirmation message containing the canonical `/api/newsletter/confirm` link.
4. The confirmation request uses a Resend `Idempotency-Key` so duplicate in-flight requests do not send duplicate messages.
5. Repeated pending signups preserve the existing confirmation token and enforce a 15-minute confirmation-email cooldown instead of generating unlimited messages or invalidating a link that is already in the inbox.
6. If provider delivery fails, the request timestamp is cleared for that still-pending token so the next legitimate submission can retry instead of being trapped behind the cooldown.
7. Public signup responses never include the confirmation token or provider response details.

`NEWSLETTER_PUBLIC_BASE_URL` may override the canonical link origin for a controlled environment. It falls back to `https://texasdefined.com`, and non-HTTP(S) values are rejected back to the canonical origin.

The operator dashboard reports both `confirmationConfigured` and `doubleOptInReady`, so double opt-in cannot look healthy merely because the database portion is present.

## Marketing delivery provider: Resend Broadcasts

TexasDefined uses the Resend Broadcast/Contacts/Segments model for newsletter delivery. Resend is intentionally used as a **marketing email** provider rather than treating a newsletter as a sequence of transactional sends.

Cloudflare Email Service is not the newsletter transport. Its product scope is transactional email, while TexasDefined needs marketing/broadcast functionality such as recipient segmentation, unsubscribe handling, scheduling, throttling, and engagement events.

`newsletter-resend.server.ts` provides the provider adapter. Before a broadcast is created or sent it reconciles every TexasDefined subscriber against the configured Resend segment, not just active rows. Local suppressions are therefore removed from the provider audience before every send.

Provider-side unsubscribes are fail-closed: if Resend says a contact is unsubscribed while TexasDefined still says active, the provider opt-out wins and is mirrored back into Supabase. The adapter never silently flips an existing provider-unsubscribed contact back to subscribed.

### Required provider configuration

The Worker needs these secrets/variables before the complete Resend integration can be used:

- `RESEND_API_KEY`
- `RESEND_NEWSLETTER_SEGMENT_ID`
- `NEWSLETTER_FROM_EMAIL`
- `RESEND_WEBHOOK_SECRET`

Transactional double-opt-in confirmation only needs `RESEND_API_KEY` and `NEWSLETTER_FROM_EMAIL`; Broadcast audience/sending readiness additionally needs the segment and webhook configuration.

`RESEND_API_KEY` and `RESEND_WEBHOOK_SECRET` should be stored as Cloudflare Worker secrets. `RESEND_NEWSLETTER_SEGMENT_ID`, `NEWSLETTER_FROM_EMAIL`, and rollout flags can be regular Worker variables. `wrangler.jsonc` sets `keep_vars: true` so normal CI deployments preserve dashboard-configured runtime variables rather than silently replacing them. Secret values remain outside the repository.

Two independent rollout switches remain off by default:

- `NEWSLETTER_SIGNUPS_ENABLED=true` exposes the subscribe endpoint and server-function signup path for public forms.
- `NEWSLETTER_SENDING_ENABLED=true` permits a Resend Broadcast to actually send or schedule.

Having provider credentials alone does **not** arm public signup or bulk sending.

### Runtime readiness

`getNewsletterRuntimeReadiness()` reports operational readiness without returning secret values. It reports public-signup state, bulk-sending state, double-opt-in state, confirmation readiness, Resend marketing readiness, `missingRuntimeBindings`, and `activationBlocked`.

The missing runtime bindings list is diagnostic and fail-closed. Bulk sending is blocked when the full Resend marketing configuration is incomplete. Public signup is reported blocked when double opt-in is enabled but confirmation delivery is not configured.

### Sending domain

Use a dedicated sending subdomain such as `news.texasdefined.com` for Resend instead of changing TexasDefined's existing Microsoft 365/GoDaddy mailbox setup on the primary domain. The sending subdomain can receive Resend's SPF/DKIM records without replacing the MX configuration used for normal staff email.

Domain verification, Resend API-key creation, segment creation, webhook registration, and production secrets are external-provider setup steps and are not performed merely by deploying this repository.

## Server-only issue composer

`newsletter-compose.server.ts` is the pre-UI composition layer. Its shared Zod input contract lives in `newsletter-compose-contract.ts` so both the composer and authenticated operator functions validate the exact same payload. The contract accepts an issue label, subject/preheader, headline, intro, one to twelve story cards, optional closing text, sender metadata, audience metadata, and operator metadata.

- `previewTexasDefinedNewsletterDraft` renders the branded HTML and plain-text bodies without creating a database row or contacting Resend.
- `saveTexasDefinedNewsletterDraft` renders the same bodies and stores them through the canonical draft issue service.
- Duplicate story URLs are removed before rendering.
- Story URLs are normalized to HTTP(S), and the underlying template escapes editorial text before inserting it into HTML.
- Saved content retains the structured story selection plus a composer/version marker, so an editor can reload and revise a draft instead of treating the rendered HTML as the source of truth.

The composer is intentionally server-only. It does not add a public route, signup form, provider call, or sending side effect.

## Server-only operator control plane

`newsletter-operations.server.ts` exposes the read-side backend used by newsletter operations without creating a browser-accessible public newsletter API.

- `listNewsletterIssues` returns the most recently updated issues, optionally filtered by lifecycle status, with a hard page-size cap.
- `getNewsletterIssueForOperator` loads the complete saved issue plus delivery counts grouped by state for preview/review screens.
- `getNewsletterOperatorDashboard` combines subscriber/queue/draft statistics, recent issues, recent provider-event counts, and rollout readiness.
- `getNewsletterRuntimeReadiness` reports the rollout state and names of missing runtime bindings without exposing their values.

These low-level functions remain service-role/server-only and are not routed through the public Worker API.

## Authenticated operator boundary

`newsletter-admin-auth.server.ts` and `newsletter-admin.functions.ts` provide the secure boundary used by the newsletter operations UI. The generic `/admin` route is **not** considered an authorization boundary; sensitive newsletter data and actions are authorized again inside every server function that touches them.

Operator authentication requires two independent production secrets:

- `NEWSLETTER_ADMIN_ACCESS_KEY` — a high-entropy operator access key of at least 32 characters.
- `NEWSLETTER_ADMIN_SESSION_SECRET` — a separate high-entropy secret of at least 32 characters used to protect the server session.

`NEWSLETTER_ADMIN_SESSION_VERSION` is optional and defaults to `1`. Changing it invalidates previously issued newsletter operator sessions without changing either secret.

The dedicated newsletter operator session:

- is stored in an HTTP-only cookie;
- uses `SameSite=Strict`;
- is secure-only in production;
- expires after eight hours;
- is checked for both authorization and current session version on every protected request.

Access-key comparison hashes both values with Web Crypto SHA-256 and performs a constant-time byte comparison. The raw key is never stored in session data or returned to the browser.

Every authenticated newsletter server function returns `Cache-Control: private, no-store`, `CDN-Cache-Control: no-store`, `Vary: Cookie`, and `X-Robots-Tag: noindex, nofollow` so private operator responses are not shared by a browser/CDN cache or indexed.

The authenticated boundary exposes server functions for session login/logout/status, dashboard statistics, issue list/detail, draft preview/save, marking ready, local scheduling, cancellation, Resend audience synchronization, provider staging, and send-or-schedule. The final send-or-schedule function still independently fails closed unless `NEWSLETTER_SENDING_ENABLED=true` inside the provider adapter.

## Protected newsletter operations panel

The protected newsletter operations panel lives inside the existing lazy-loaded Platform Health surface at `/admin/platform-health#newsletter`. Keeping it inside that lazy admin route avoids creating another top-level bundle or a public newsletter endpoint.

The panel does not load newsletter data simply because someone can open the admin shell. It first checks the dedicated newsletter operator session. If no valid session exists, the operator must authenticate using `NEWSLETTER_ADMIN_ACCESS_KEY`; the server then establishes the HTTP-only session described above. The access key is not stored in `localStorage` or `sessionStorage`.

The panel can:

- show active and pending subscriber totals plus suppression counts;
- show draft and queued-delivery counts;
- report public-signup, bulk-send, confirmation, double-opt-in, Resend, and runtime-binding readiness;
- list recent newsletter issues and provider-event totals;
- review one issue and its delivery-state totals;
- preview rendered newsletter HTML inside a sandboxed iframe;
- synchronize the local audience to Resend without sending;
- stage or update an issue in Resend without sending;
- mark an eligible issue ready;
- schedule an eligible issue for a future time;
- cancel an eligible issue.

The panel deliberately exposes **no send-now control**. Provider staging and scheduling do not bypass `NEWSLETTER_SENDING_ENABLED`; the server-side sending kill switch remains authoritative.

## Resend issue lifecycle

Server-only newsletter services can:

1. Save a draft issue.
2. Render a reusable TexasDefined HTML/text newsletter template.
3. Mark an issue ready or schedule it.
4. Reconcile the complete local subscriber/suppression list with the Resend segment.
5. Build an idempotent local per-subscriber delivery ledger.
6. Create or update a Resend Broadcast without sending it.
7. Send immediately or schedule only when `NEWSLETTER_SENDING_ENABLED=true`.
8. Cancel an eligible Resend Broadcast.
9. Verify signed Resend/Svix webhooks against the raw request body with replay protection.
10. Reconcile sent/delivered/opened/clicked/delayed/failed/suppressed/bounced/complained events into the local delivery/event ledgers.
11. Mirror unsubscribe, bounce, and complaint suppression back to the canonical subscriber registry.
12. Finalize the local issue when no queued/sending deliveries remain.

Resend's `{{{RESEND_UNSUBSCRIBE_URL}}}` placeholder is included in both the branded HTML template and its text fallback, allowing Resend to manage the end-user unsubscribe action while TexasDefined receives the resulting provider event and preserves that state locally.

The older provider-neutral `NewsletterTransport`/atomic claim infrastructure remains available as a fallback abstraction, but Broadcasts are preferred for the marketing newsletter because the provider handles bulk queueing, throttling, scheduling, and unsubscribe semantics.

## Webhook security

`/api/newsletter/resend-webhook` reads the raw request body and verifies the Resend/Svix signature before parsing or changing data. The verifier uses the webhook ID, timestamp, and raw body, HMAC-SHA256, and a five-minute timestamp window to reject stale replay attempts. Provider event IDs are stored uniquely so retries remain idempotent.

## Intentionally not enabled yet

- No newsletter signup form or CTA is rendered on the public site.
- No public `/newsletter` editorial/landing page has been added.
- The protected newsletter operations panel is admin-only and remains unusable until both newsletter admin secrets are configured.
- `NEWSLETTER_SIGNUPS_ENABLED` remains off until signup UI and provider configuration are approved.
- `NEWSLETTER_SENDING_ENABLED` remains off until the sender/domain/list are approved.
- Resend credentials/domain/segment/webhook still require provider-side setup.
- The protected panel has no send-now control and does not arm sending.
- No newsletter will send merely because these files are deployed.

This separation allows public signup surfaces and provider credentials to be activated later without exposing subscriber data or redesigning the core model.
