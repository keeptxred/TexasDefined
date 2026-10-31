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
