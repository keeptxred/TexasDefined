# Private Impact financial reporting data contract

## Access and security

This table receives **aggregate daily totals only** from the authenticated Impact partner reports API; it is not a repository data snapshot, client-side source or public TexasDefined API. It is accessible only by the Supabase service-role (or equally privileged SQL administration), protected by RLS and explicit privilege revocations. No anonymous/authenticated policies are created.

The existing private **`/admin/partner-referrals`** page authenticates via `assertSportsPartnerAccess`. Preserve that authorization gate when adding the provider summary. Do not expose financial totals in public routes, sitemap, public JSON, or GitHub Actions output.

## Report semantics

- One row per completed Texas calendar date from the provider's `partner_performance_by_day` report.
- `reported_clicks` etc. are what Impact reports, not the on-site click tracking totals from Cloudflare Analytics Engine. Do **not** add these counts together as if they had the same measurement definition.
- `reported_total_cost`/`reported_action_cost` reflect provider-side estimated credit/cost fields; they are not confirmed cash paid, and can change with reversals or program decisions. Monetary fields require an independently verified three-letter currency code. Missing currency = monetary columns NULL.
- Zero is distinct from null; never normalize missing fields to zero or assume unknown reports mean no revenue.
- Store no individual `action_id`, customer identifiers, checkout items, transaction timestamps, IPs, purchaser data, raw report JSON, API tokens or account SID.
- Retain immutable source-code reporting logic but keep actual revenue numbers private. Historical corrections must update the same `metric_date` row, not double count a second row.
- The table is schema-ready only. It does **not** prove an ingestion run succeeded or that an earnings dashboard exists. Activate importer only after read-only report response shape and currency are confirmed for this account.

## Migration

`supabase/migrations/20261027213000_create_private_impact_performance.sql` uses the same private-role model as the existing `texasdefined_partner_referral_daily` table. Validate RLS and privileges in production before enabling any importer. Changes to finance reporting must not make commercial data available through anonymous/authenticated Supabase clients.
