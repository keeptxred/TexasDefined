# TexasDefined + KeepTXRed server-error inventory checkpoint

## Scope, checkpoint
- Audit window: **2026-08-30 through 2026-10-30 UTC** (62 daily periods).
- No production fixes or deployment changes have been made as part of this inventory.
- Audit branch: `audit/server-errors-2026-08-30-oct-30`.
- The user-facing workbook created in ChatGPT is `texasdefined_keeptxred_server_errors_2026-08-30_to_2026-10-30.xlsx`.
- This audit must NOT close or supersede existing incident tickets or trigger broad rescans.

## Evidence retained in this branch
1. Five daily **Supabase log error signature** CSVs spanning all 62 days, 795 date/source/signature groups, **63 signatures**, and **424,054 total matching log entries** (NOT 424,054 unique application defects).
2. `cloudflare-worker-path-errors-2026-10-24-to-10-30.csv`: **361** site/status/path grouped entries across `texasdefined-site` and `keeptxred-site`. The `aggregation_level` is 1 or 10; **10 means sampled/estimated counts**. Recent paths represent only 7-day available Worker request logs, not 62 days.
3. GitHub historical issue evidence: TD [#4913](https://github.com/keeptxred/TexasDefined/issues/4913), [#4924](https://github.com/keeptxred/TexasDefined/issues/4924), [#6462](https://github.com/keeptxred/TexasDefined/issues/6462), [#5206](https://github.com/keeptxred/TexasDefined/issues/5206); KTR [#3266](https://github.com/keeptxred/texas-heartland-hub/issues/3266) (historically closed; validate live).

## Quantified shared Supabase signatures (62 days)
- PostgREST Warp thread timeout: **212,703 messages**.
- Edge Functions HTTP 503: **94,182 response events**.
- Supabase gateway HTTP 503: **36,685 responses**.
- Supabase gateway HTTP 500: **12,269 responses**.
- PostgreSQL `25P02`: **11,318** (aborted transaction, often secondary).
- PostgreSQL `57014`: **4,437 ERROR + 12 FATAL**, potential cancellation/timeouts.
- Supabase gateway HTTP 400: **22,481**, not automatically server defects.
- Supabase function 429: **1,009**, review rate limiting.
- All source-level counts are from a **shared Supabase project used by BOTH sites**; do not attribute an individual Supabase failure to one domain absent a request/function correlation.

## Confirmed site-facing symptoms from recent Worker logs
- TexasDefined: repeated HTTP 500 on Fort Bend football-team pages, Strake Jesuit and others, JavaScript/CSS hashed-asset 404, `/search` SSR exception `TypeError: Cannot read properties of undefined (reading 'trim')` in `ExploreSearchPage`, Viator Houston API 503s, county lookup 502s/404s.
- KeepTXRed: `/bills` HTTP 500 (354 recent hits), publishing safety net HTTP 503 (64 recent hits), newsroom/evergreen/viral generation hook HTTP 500, legislation sync RPC HTTP 500.
- Some 404s are benign security probes (WordPress, `.env`, `.git`) and should return 404/403, not be treated as missing product features. Some HTTP 4xx are expected client/input errors.

## Repair plan — preserve production controls
1. Attribute the 212,703 PostgREST Warp messages and the 94,182 Edge Function 503s to function names, exact endpoints, database query IDs, and peak windows; use bounded/rate-limited drilldown and avoid raw PII exposure.
2. Fix high-impact real page failures: KTR bills, TD football SSR, TD search undefined .trim, public homepage/events/sitemap if reproducible. Correlate to *deployment version at time of failure*.
3. Investigate the missing hashed assets with old/new worker manifest and HTML references; add version-safe old-asset retention or proven recovery. Verify across TWO consecutive production deployments and retain issue #4913 open until confirmed.
4. Review official TPWD TLS transport in #5206 with strict TLS validation, not `verify=false`.
5. Review 4xx URLs for genuine internal dead links vs scanners/intentional 404. Avoid artificially adding scanner probe paths.
6. Introduce a **free GitHub Actions scheduled daily audit** if durable, verifiable permission-safe log access can be supported. Do not schedule through ChatGPT.
7. For each fix: a regression test, protected CI, exact merged commit SHA, verified Cloudflare production deployment and live 2xx, with one-day and seven-day error-rate checks.

## Missing data / acceptance boundaries
- Cloudflare historical zone **daily** HTTP status totals may be retained, but the 62-day GraphQL batch was rate-budget limited at audit time. Do not silently claim a complete 62-day HTTP URL inventory.
- No 62-day raw per-request Cloudflare logs or complete browser runtime/console stream were available in this audit.
- The CSV data is aggregated to avoid storing IPs, tokens or raw user-agent information.
- User objective is to **remediate every actionable issue**; the collected data are not all independently fixable server defects. Every distinct genuine fault needs assigned root cause and verified closure.

## Remediation checkpoint — October 31 (verified connector writes)

All findings must be tracked as **historical log entries, distinct actionable defects, or benign/expected responses**, not conflated.

### Code changes that reached main
- TD SSR Explore search undefined origin `.trim()` crash: [PR #6483](https://github.com/keeptxred/TexasDefined/pull/6483), merged SHA `cde1cee00e33c431fac08737242e31a85f66882c`. Production SSR verification pending.
- TD stale hashed JS/CSS carryover: [PR #6482](https://github.com/keeptxred/TexasDefined/pull/6482), merged SHA `89c7773aa34234bbb2bace5cc0e59b5bb1eb31e9`; [issue #4913](https://github.com/keeptxred/TexasDefined/issues/4913) reopened because successful two-deployment old-hash retention and post-merge Googlebot evidence still required.
- KTR RSS relay status-accurate cache fix: [PR #3330](https://github.com/keeptxred/texas-heartland-hub/pull/3330), merged SHA `a219fd0fd4dc804be338692e56f4e1e4f749497e`. **All 4 Supabase Edge Functions deployed ACTIVE** (main relay v13, north v2, sports v2, priority v5); confirmed deployed main code has `Cache-Control: no-store` when upstream is non-2xx. This fixes caching of upstream 503s, not the external publisher source errors.
- KTR /bills optional facet RPC failsafe: [PR #3331](https://github.com/keeptxred/texas-heartland-hub/pull/3331), merge `cf751825eac5c4fa6f9dbc9766a9599caa9a6d0a`. Crucial bill database failures remain visible.
- KTR deep default-substantive bills narrow-ID pagination: [PR #3332](https://github.com/keeptxred/texas-heartland-hub/pull/3332), merge `170562a0172331a03129f28975fc93a0a6eb873f`; live page=315 regression and production SHA verification pending.
- 13-site-route public fail-closed daily synthetic canaries: [PR #6486](https://github.com/keeptxred/TexasDefined/pull/6486), merged SHA `0381a452198fa2e81ae90220521f1fc4877af01d`, GitHub schedule daily 12:17 UTC, 70-day artifact, no paid service or ChatGPT schedule. This does **not** substitute for Cloudflare full request Logpush.

### Work in protected CI
- TD Census upstream request timeouts (three external calls, 8sec) [PR #6489](https://github.com/keeptxred/TexasDefined/pull/6489), auto-merge enabled; live POST lookups and exact Worker deployment still pending.

### Historical events materially reclassified
- All but ONE of the **11,318 SQLSTATE 25P02 errors** from the full 62 days were caused by **one PostgREST 14.5 database connection** (`parsed.session_id=6ac040b1.20cfd`) after a single `57014` statement timeout at 2026-10-02 23:42:10 UTC. Of these, 8,561 Oct 2 and 2,756 Oct 3 share the same session. No further 25P02 events Oct 4–30. This is not 11,317 independent broken pages.
- Oct 3 Supabase gateway traffic included **15,213 503 /rest/v1/explore_entities** plus **10,813 503 /rest/v1/explore_public_entities**; current server code already includes request-coalescing/TTL/backoff. Oct 30 data sampled 13 and 11 HTTP200 respectively and no errors for those paths. A historical severe load/failure burst is **not currently reproduced**; ongoing capacity reliability remains to be demonstrated.
- October 30 RSS 503 events were overwhelmingly Google News and other allowlisted publishers through KTR relays whose source returns `upstream.status` unchanged. The relay runtime is not proven unhealthy based on these values alone.
- Scanner probes `/.env`, `/wp-admin`, `/.git` returning 404/403 are **correct security responses**, not missing application features. Treat invalid county lookup and 4xx as potentially intentional.

### Still open — DO NOT CLAIM ALL REPAIRED
- TD governed Collin County image after cache purge [#4924](https://github.com/keeptxred/TexasDefined/issues/4924): exact old/new deployed manifest and WebP verification required.
- TD official TPWD pg_net TLS source probes [#5206](https://github.com/keeptxred/TexasDefined/issues/5206): preserve strict TLS, use trusted replacement fetch path only after verification.
- TD Google search acquisition incident [#6462](https://github.com/keeptxred/TexasDefined/issues/6462): causation by JS 404 unproven, no broad rollback or indiscriminate cache purge.
- TD football-page SSR, event index, sitemap, Viator upstream 503 and Census occasional 502: reproduce under new release; external 503 / legitimate no-match responses cannot simply be 'fixed' by returning false HTTP200.
- KTR publishing safety net 503 caused by source/image gate must remain fail closed; source-specific verified remediation needed.
- Shared Supabase `Warp server error: Thread killed by timeout manager` repeated logs, SQL 57014, actual SQL-related backend gateway 5xx and rate limiting: need specific endpoint root-cause before changing production.
- Verify all new main merges deployed with exact SHA and current/previous bytes; do not claim a CI green check proves production.
