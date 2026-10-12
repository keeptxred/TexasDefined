# Network launch gates — October 10, 2026

This branch contains:
- Unlisted and non-indexable /network/join, /network/apply, and example listings.
- Basic/Plus application form, image preview, private media intake and review queue.
- Admin moderation at /admin/network-applications, authenticated using current TexasDefined commercial admin access key.
- Featured customer dashboard at /business/dashboard, email-link sign-in and row-level-secured proposed edits.
- Immutable Featured profile-change requests; editors approve/reject through the same admin page.
- Stripe product Texas Defined Network Plus configured at $19.99 monthly but inactive.

**Unfinished, release blockers:**
1. Run current canonical CI on the reconciled GitHub branch; commit generated route tree for all Network routes, pass bundle/performance and governance limits, deploy and smoke-test. Never bypass failing CI.
2. Stripe Checkout endpoint and signed canonical webhook are now implemented in code, with an explicit `NETWORK_CHECKOUT_ENABLED` switch and event ledger. Configure the live Stripe server and webhook secrets, activate the product only after end-to-end lifecycle tests, and verify payment failure/cancellation. No checkout must be offered before verification.
3. Implement owner-account issuance after verifying business identity and valid Featured entitlement. The current account table is deliberately non-writable by website visitors.
4. Approved Basic and paid Plus publication code, public listing table, and `/network/business/$slug` page now exist. Validate them in deployed staging and verify image copying and authorization. Applying approved Featured change requests to public profiles remains unfinished.
5. Image uploads for Featured change requests require authenticated owner-bound private storage and editorial approval; not yet implemented. Existing Basic/Plus uploads work through private intake but must be load-tested and abuse/rate-limited before broad rollout.
6. Add customer notification/requests for changes and email sender setup. Do not send from personal Gmail.
7. Add explicit branding/rights confirmation, stronger anti-spam/rate limiting and a privacy notice before publicizing submission forms.

The initial beta can remain unlisted while accessible by URL; noindex does not enforce access.
