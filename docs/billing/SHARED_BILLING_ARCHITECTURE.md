# TexasDefined shared billing architecture

Last reviewed: 2026-10-11

## Purpose

TexasDefined has two separate commercial product families that share one customer and invoicing backbone:

1. **Business Network** — a persistent business presence/membership on TexasDefined.
2. **Advertising** — temporary promotional placements, sponsorships and campaigns.

A business that buys from both families should have one canonical TexasDefined billing account and one Stripe Customer. Product entitlements, editorial rules and agreements remain separate.

## Canonical identity

`public.texasdefined_billing_accounts` is the private canonical billing identity.

- One row may link to Network applications and advertiser agreements.
- `stripe_customer_id` is unique.
- Browser roles have no table access.
- The service role is the only direct table/RPC caller.
- Never merge customers from email address alone.
- Automatic cross-product reuse requires verified Network ownership plus an exact normalized billing-email and website match.
- Ambiguous matches fail closed for administrator resolution.
- The protected Billing admin can explicitly assign a known existing billing account to a signed advertiser order.

Legacy `stripe_customer_id` columns on Network applications and advertiser agreements are retained as compatibility mirrors. They are not the canonical identity.

## Product-family boundaries

### Business Network

- Basic: no paid Stripe entitlement.
- Plus: recurring Stripe subscription. Current application architecture verifies the exact application, billing account, Stripe Customer, price and current subscription state before paid entitlement.
- Featured/custom commercial charges may use an approved manual or future dedicated order flow, but a manual invoice never grants membership entitlement by itself.

### Advertising

- Advertiser agreement/order acceptance remains separate from payment.
- Publisher acceptance is required before billing.
- A prepared advertising invoice carries `product_family=advertising` and `source_type=advertiser_agreement`.
- Invoice payment advances advertiser payment workflow only; it never changes Network membership entitlement.

## Invoice model

Stripe remains the payment provider and customer-facing invoice system.

TexasDefined keeps private reconciliation records in:

- `texasdefined_billing_invoices`
- `texasdefined_billing_invoice_items`
- `texasdefined_billing_stripe_events`

Standalone advertising/manual invoices are created as Stripe drafts with `auto_advance=false`. TexasDefined controls finalization and sending deliberately.

Recurring Network subscriptions generate their normal Stripe invoices under the same Stripe Customer. They are not converted into manual advertiser invoices.

A single business therefore has one Stripe customer history containing whichever subscription invoices, advertising invoices or approved manual invoices that business actually purchases.

## Safety gates

Two separate environment gates are intentional:

- `TEXASDEFINED_INVOICING_ENABLED=true` permits creation of draft standalone invoices.
- `TEXASDEFINED_INVOICE_SENDING_ENABLED=true` permits finalization and sending of those drafts.

Invoice sending must remain off until provider test-mode acceptance is complete.

Existing Network launch gates remain separate. Enabling draft invoicing does not enable Network checkout, Network publication, advertiser outreach or customer email.

## Protected admin

`/admin/billing` is the single financial operations console.

It uses `NETWORK_ADMIN_ACCESS_KEY`, not the lower-privilege sports/partner marketing key.

The console provides:

- canonical billing customers;
- linked Network and Advertising relationships;
- local standalone invoice state;
- advertising order → publisher acceptance → draft invoice preparation;
- explicit existing-customer reuse;
- gated manual invoice preparation;
- gated invoice finalization/sending after release approval.

The sports-partner lead screen remains a marketing/lead workflow and cannot create invoices.

## Stripe metadata contract

Customer metadata:

- `project=TexasDefined`
- `billing_account_id=<uuid>`
- `source=network|advertising|admin`

Network Checkout/session and subscription metadata:

- `application_id=<uuid>`
- `billing_account_id=<uuid>`

Standalone invoice metadata:

- `project=TexasDefined`
- `billing_account_id=<uuid>`
- `local_invoice_id=<uuid>`

Invoice-item metadata:

- `product_family=network|advertising|other`
- `source_type=network_membership|advertiser_agreement|advertising_campaign|manual`
- optional `source_id=<uuid>`

Never use metadata alone as proof of payment or entitlement. Webhook handling rereads current Stripe state and verifies the bound local identity.

## Idempotency and recovery

- Stripe Customer creation uses a stable billing-account idempotency key.
- Draft invoices reserve a unique local `dedupe_key`.
- Stripe invoice and invoice-item creation use stable keys derived from the local invoice.
- Webhook event IDs are recorded and replayed events return `already_processed`.
- A provider timeout must be reconciled before retrying with a different business-purpose key.

## Required test-mode acceptance before launch

Use a Stripe **test-mode/sandbox account context**, never live mode, to prove:

1. Create a new shared business customer.
2. Reuse the same customer across Network and Advertising.
3. Network Plus Checkout creates the expected recurring subscription and invoices.
4. Prepare an advertising draft invoice.
5. Add multiple product-family line items where appropriate.
6. Finalize and send a `send_invoice` invoice.
7. Open the Hosted Invoice Page.
8. Complete a test card payment and reconcile `invoice.paid`.
9. Exercise payment failure and recovery.
10. Verify invoice event replay and out-of-order delivery cannot cross-bind customers.
11. Exercise subscription cancellation.
12. Exercise refund/credit-note behavior applicable to the final commercial policy.
13. Verify eligible ACH behavior if enabled for the account.
14. Verify customer portal behavior for Network subscriptions.
15. Confirm no payment event automatically publishes editorial content or grants an unrelated entitlement.

Only after these pass should the corresponding production flags be intentionally enabled.

## Production launch separation

These are independent decisions:

- merge/deploy the billing-capable code;
- enable Network checkout;
- enable standalone draft invoicing;
- enable invoice sending;
- enable public Business Network publication/indexing;
- begin advertiser outreach;
- accept live advertiser orders.

Do not treat one approval as approval for the others.

## Legal and commercial review

The existing advertising agreement remains subject to attorney review. Billing implementation does not constitute legal approval of advertising terms, refund policy, tax treatment, invoice terms or consumer/business compliance.
