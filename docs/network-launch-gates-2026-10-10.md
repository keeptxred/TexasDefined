# Network launch gates — October 10, 2026

This branch contains:
- Unlisted and non-indexable /network/join, /network/apply, and example listings.
- Basic/Plus application form, image preview, private media intake and review queue.
- Admin moderation at /admin/network-applications, authenticated using current TexasDefined commercial admin access key.
- Featured customer dashboard at /business/dashboard, email-link sign-in and row-level-secured proposed edits.
- Immutable Featured profile-change requests; editors approve/reject through the same admin page.
- Stripe product Texas Defined Network Plus configured at $19.99 monthly but inactive.

**Unfinished, release blockers:**
1. Run current canonical CI on the reconciled GitHub branch; commit generator output for /business/dashboard and pass bundle/performance limits, then deploy and smoke-test all three routes. Never bypass failing CI.
2. Build server-side Stripe Checkout plus webhook with verified signatures and idempotent subscription lifecycle handling; activate product only after tested. No checkout must be offered before verification.
3. Implement owner-account issuance after verifying business identity and valid Featured entitlement. The current account table is deliberately non-writable by website visitors.
4. Implement approved-profile publication and approved-change application; approval currently records editorial decision only.
5. Image uploads for Featured change requests require authenticated owner-bound private storage and editorial approval; not yet implemented. Existing Basic/Plus uploads work through private intake but must be load-tested and abuse/rate-limited before broad rollout.
6. Add customer notification/requests for changes and email sender setup. Do not send from personal Gmail.
7. Add explicit branding/rights confirmation, stronger anti-spam/rate limiting and a privacy notice before publicizing submission forms.

The initial beta can remain unlisted while accessible by URL; noindex does not enforce access.
