# TexasDefined Impact publisher reporting — read-only credential handshake

## Why this integration is separate from Ticketmaster ticket ingestion

TexasDefined's existing public Ticketmaster Discovery key powers the events catalog and does **not** permit reading commission reports. The site's approved Impact tracking redirect is unrelated to the new reporting API credentials. Do not change the Ticketmaster event importer, Impact affiliate link template or checkout handoffs when setting up read-only reports.

The user has provisioned GitHub Actions repository secrets:

- `IMPACT_ACCOUNT_SID` — private Impact API Account SID (NOT publisher ID 7758914).
- `IMPACT_AUTH_TOKEN` — private Impact API access token (not the Ticketmaster Discovery key).

No secret value belongs in repository files, CI logs, a frontend bundle, ChatGPT, or data returned by public routes.

## Implementation — first safe stage

- `.github/workflows/discover-impact-reporting.yml`: Node 22, read-only credentials scoped to one validation step, no write permissions to GitHub; manual, push-on-main and once-daily scheduled execution. PR events run safety tests only and receive no secrets.
- `scripts/monetization/impact-reporting-discovery.mjs`: GET on `https://api.impact.com/Mediapartners/{AccountSID}/Reports`, and up to three matching GET report metadata requests. No API POST/PUT/PATCH/DELETE, no account mutation, no customer reports retrieved, no click events generated, no external redirect following.
- `scripts/monetization/impact-reporting-discovery.test.mjs`: scope, HTTP method, catalog filtering, metadata sanitization, secret-leak rejection.

**Public repository caution:** GitHub Action logs are accessible to people with repository read access. Only the generic diagnostic status, report identifiers and schema column/filter names are written; **no payouts, customer data, actions, reports' Records, credentials or private revenue metrics**.

### Completion gate for financial ingestion

This is **credential/entitlement verification**, not a financial dashboard or proof of tracked conversions. After the post-merge workflow has run successfully, determine exactly which report IDs, columns and date filters this particular publisher account exposes. Do not assume all publishers have the same report contracts or that a `GET /Reports` call means paid features are enabled.

Build the subsequent private financial ingestion only from empirically verified reports, preferably with Impact's newer **ReportExport** API for production report-data pulls. Normalize report aggregation with explicit date boundaries, timezones, currency and commission status. Preserve the distinction between **first-party outbound clicks** already in `/admin/partner-referrals` and **provider-credited** conversions/earnings. Do not infer payouts from affiliate URLs or nonfinancial "ActionCost" advertiser fields.

Provider sales and commission data must persist only server-side into an existing access-controlled Supabase table or a new RLS-protected table with all anonymous/authenticated privileges revoked; admin reads must use `assertSportsPartnerAccess` and the existing private `/admin/partner-referrals` route. Never commit conversion rows or aggregated earnings to this public repository. Run a real token-auth and response-shape check before any ingestion is enabled.

## Operations

- Token inaccessible or invalid: workflow fails with a sanitized HTTP status; inspect Impact API access token scopes. Never print authentication headers or payloads.
- No compatible performance report: workflow terminates clearly; inspect the authorized account's report catalog and availability, **do not invent revenue columns**.
- Token rotation: update only the encrypted GitHub Actions repository secret.
- Approved token permissions: Actions GET, Clicks GET, Reports GET only; no customer/account mutation scopes.

Provider references:
- https://impact-enterprise-group.readme.io/impact-publisher/reference/retrieve-metadata
- https://impact-enterprise-group.readme.io/impact-publisher/reference/report-export-best-practices
- https://impact-enterprise-group.readme.io/impact-publisher/reference/pagination

## Additional finance entitlement discovery

The same authorized **Reports GET** permission can list generic Finance report
definitions, if the partner account exposes any. A bounded read-only metadata
check inspects at most ten finance report definitions for explicit
`Currency`/`PaymentStatus` or related fields. **It never runs finance
reports or accesses payout amounts**, and never assumes that an API-visible
finance report implies paid commissions or that its monetary fields are USD.
No new Impact API scopes are requested for this discovery. Any actual future
financial import must separately verify its currency, settlement semantics,
private storage and dashboard presentation. Metadata visibility is not payout
evidence.
