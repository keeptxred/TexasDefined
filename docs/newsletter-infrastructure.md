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

The subscribe endpoint deliberately returns 404 until `NEWSLETTER_SIGNUPS_ENABLED=true`. Signup input is validated with Zod and includes a honeypot. Email addresses are normalized to lowercase. Signup source, source path, consent version, and optional interest tags are retained.

Complaint and bounce states are hard suppressions. A later public signup does not automatically reactivate either state; an operator must deliberately resolve it. Provider unsubscribe events also move the subscriber into the unsubscribed suppression state.

### Double opt-in

Set `NEWSLETTER_DOUBLE_OPT_IN=true` to put new or re-subscribing addresses into `pending` until their confirmation token is consumed. The default is single opt-in (`active`) while still recording explicit signup consent.

No confirmation email is sent until the confirmation-email transport is enabled.

## Marketing delivery provider: Resend Broadcasts

TexasDefined uses the Resend Broadcast/Contacts/Segments model for newsletter delivery. Resend is intentionally used as a **marketing email** provider rather than treating a newsletter as a sequence of transactional sends.

Cloudflare Email Service is not the newsletter transport. Its current product scope is transactional email, while TexasDefined needs marketing/broadcast functionality such as recipient segmentation, automatic unsubscribe handling, scheduling, throttling, and engagement events.

`newsletter-resend.server.ts` provides the provider adapter. Before a broadcast is created or sent it reconciles **every** TexasDefined subscriber against the configured Resend segment, not just active rows. This is important because local suppressions must be removed from the provider audience before every send.

Provider-side unsubscribes are fail-closed: if Resend says a contact is unsubscribed while TexasDefined still says active, the provider opt-out wins and is mirrored back into Supabase. The adapter never silently flips an existing provider-unsubscribed contact back to subscribed.

### Required provider configuration

The Worker needs these secrets/variables before Resend integration can be used:

- `RESEND_API_KEY`
- `RESEND_NEWSLETTER_SEGMENT_ID`
- `NEWSLETTER_FROM_EMAIL`
- `RESEND_WEBHOOK_SECRET`

Two independent rollout switches remain off by default:

- `NEWSLETTER_SIGNUPS_ENABLED=true` exposes the subscribe endpoint for public forms.
- `NEWSLETTER_SENDING_ENABLED=true` permits a Resend Broadcast to actually send or schedule.

Having provider credentials alone does **not** arm sending.

### Sending domain

Use a dedicated sending subdomain such as `news.texasdefined.com` for Resend instead of changing TexasDefined's existing Microsoft 365/GoDaddy mailbox setup on the primary domain. The sending subdomain can receive Resend's SPF/DKIM records without replacing the MX configuration used for normal staff email.

Domain verification, Resend API-key creation, segment creation, webhook registration, and production secrets are external-provider setup steps and are not performed merely by deploying this repository.

## Server-only issue composer

`newsletter-compose.server.ts` is the pre-UI composition layer. It accepts a validated issue label, subject/preheader, headline, intro, one to twelve story cards, optional closing text, sender metadata, audience metadata, and operator metadata.

- `previewTexasDefinedNewsletterDraft` renders the branded HTML and plain-text bodies without creating a database row or contacting Resend.
- `saveTexasDefinedNewsletterDraft` renders the same bodies and stores them through the canonical draft issue service.
- Duplicate story URLs are removed before rendering.
- Story URLs are normalized to HTTP(S), and the underlying template escapes editorial text before inserting it into HTML.
- Saved content retains the structured story selection plus a composer/version marker, so a future admin editor can reload and revise a draft instead of treating the rendered HTML as the source of truth.

The composer is intentionally server-only. It does not add an admin page, public route, signup form, provider call, or sending side effect.

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
- `NEWSLETTER_SIGNUPS_ENABLED` remains off until signup UI is approved.
- `NEWSLETTER_SENDING_ENABLED` remains off until the sender/domain/list are approved.
- Resend credentials/domain/segment/webhook still require provider-side setup.
- No newsletter will send merely because these migrations/code are deployed.

This separation allows the public signup surfaces and actual sending credentials to be added later without exposing subscriber data or redesigning the core model.
