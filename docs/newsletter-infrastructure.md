# TexasDefined newsletter infrastructure

This document describes the backend newsletter foundation. It intentionally does **not** add newsletter signup UI or enable outbound bulk email.

## Data model

TexasDefined uses four private service-role-only tables:

- `texasdefined_newsletter_subscribers` — normalized email, consent provenance, interests, confirmation/unsubscribe tokens, and suppression state.
- `texasdefined_newsletter_issues` — newsletter drafts, rendered bodies, audience metadata, schedule, and lifecycle state.
- `texasdefined_newsletter_deliveries` — one delivery row per issue/subscriber with provider IDs and delivery outcome.
- `texasdefined_newsletter_events` — provider webhook events such as delivered, opened, clicked, bounced, complained, and unsubscribed.

All four tables have RLS enabled. `anon` and `authenticated` have no table privileges; the server-side service role is the only application path.

## Subscriber lifecycle

`newsletter.functions.ts` exposes server functions that future UI can call without exposing the service-role key:

- `subscribeToTexasDefinedNewsletter`
- `confirmTexasDefinedNewsletter`
- `unsubscribeFromTexasDefinedNewsletter`

Signup input is validated with Zod and includes a honeypot. Email addresses are normalized to lowercase. Signup source, source path, consent version, and optional interest tags are retained.

Complaint and bounce states are hard suppressions. A later public signup does not automatically reactivate either state; an operator must deliberately resolve it. Provider unsubscribe events also move the subscriber into the unsubscribed suppression state.

### Double opt-in

Set `NEWSLETTER_DOUBLE_OPT_IN=true` to put new or re-subscribing addresses into `pending` until their confirmation token is consumed. The default is single opt-in (`active`) while still recording explicit signup consent.

No confirmation email is sent until a transport/provider is configured.

## Issue and delivery lifecycle

Server-only newsletter services can:

1. Save a draft issue.
2. Mark an issue ready or schedule it.
3. Build an idempotent per-subscriber delivery queue only after the issue is ready/scheduled.
4. Atomically claim eligible queued deliveries using `FOR UPDATE ... SKIP LOCKED`; the first successful claim moves the issue into `sending` state.
5. Hand a provider-neutral message payload to a future transport adapter.
6. Record sent/failed/skipped state.
7. Record provider webhook events and suppress bounced, complained, or unsubscribed recipients.
8. Finalize an issue after no queued/sending deliveries remain.

The claim RPC is limited to the service role and caps a single claim at 500 deliveries.

## Provider integration contract

`newsletter-delivery.server.ts` defines `NewsletterTransport`. A future provider implementation only needs to implement:

```ts
send(message): Promise<{ provider: string; messageId: string }>
```

The provider should include the supplied unsubscribe token in a TexasDefined unsubscribe URL once the public unsubscribe route/page is added.

Provider webhook handlers should normalize provider-specific events and pass them to `recordNewsletterDeliveryEvent`.

## Intentionally not enabled yet

- No newsletter signup form or CTA is rendered on the public site.
- No public `/newsletter` page has been added.
- No outbound bulk-email provider or credentials are configured.
- No cron/scheduled sender is active.
- No newsletter will send merely because these migrations/code are deployed.

This separation allows the public signup surfaces and sending provider to be added later without exposing subscriber data or changing the core data model.
