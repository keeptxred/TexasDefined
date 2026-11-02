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

## Nov 2, 2026 — verified remediation continuation

### Critical JS hash carryover — first bona fide deployment proof
- [PR #6535](https://github.com/keeptxred/TexasDefined/pull/6535) merged `bf3a6137e0699f5dabcbd219d4f39f83a5462d33` and deployed Worker version `65d863d0-6653-4730-8d0b-0e7a6d443422` at 16:45:43 UTC Nov 2 (Cloudflare deployment `ba44a4f8-5ff2-400a-8892-101456bab58f`).
- Actual [protected GitHub artifact #13160354517](https://github.com/keeptxred/TexasDefined/actions/runs/41483925621/artifacts/13160354517) was downloaded and JSON inspected: **63 old-only JS/CSS binaries (5,646,401 bytes) copied**, **33 already present**, **0 unavailable/ignored**; **244/244 live responses valid** across BOTH canonical and direct origins; all 63 copied files tested **126/126** successfully, correct SHA and MIME. Prior release handoff and Worker source versions recorded. This corrects former lack of evidence (Oct31: 0 carried-old bytes).
- The same prior 24-hour logs still included missing JS to Meta Page Preview and Bing Search Crawler before this deployment. Historical 404s cannot be erased. **Keep [#4913](https://github.com/keeptxred/TexasDefined/issues/4913) open until second subsequent deployment plus continuing real bot/user 404 check; no speculative Google ranking causation**.
- [PR #6536](https://github.com/keeptxred/TexasDefined/pull/6536) adds bounded **18 total daily GitHub public canaries**, six real WebP response checks for Collin County, Freeman Coliseum and Dubina (canonical AND direct Worker). At checkpoint, protected Merge Gate still running. This addresses an image regression detection gap, NOT #4924 root cause.

### KeepTXRed evergreen publishing
- Cloudflare observed 10 sampled HTTP500 at `/api/public/hooks/generate-evergreen` in the preceding week, and direct Supabase SQL found **zero published `kind='evergreen'` articles in the last 7 days**.
- Code-level contradiction: generator appended a strict *breaking-news-only* editorial system addendum saying no clear news event => **leave article fields empty**, to timeless evergreen government topics. [KTR PR #3351](https://github.com/keeptxred/texas-heartland-hub/pull/3351) is **MERGED**, SHA `0115787d949116b0d495080d8a9f1b3e1cf348a0`, protected tests passed. A dedicated evergreen factual evidence brief now expects no breaking news event but requires a complete explanatory article. Existing factual/readability/SEO/length/duplicate validation and 2-call AI ceiling retained, headline matching now enforced rather than waived.
- Latest KTR Cloudflare deploy as of this checkpoint had **not yet installed merged #3351**. Still requires exact Worker deployment and first successful scheduled publication; do not claim fully repaired.

### TPWD strict-TLS outcome
- [#5206](https://github.com/keeptxred/TexasDefined/issues/5206) direct PostgreSQL follow-up on 90 historically TLS-failed TPWD (path, URL) pairs: **88 current HTTP200, 1 HTTP206 valid ranged PDF, 1 HTTP400** for a park-specific alert endpoint, **zero remaining certificate errors**. PostgreSQL 17.6 / pg_net 0.20.4. Another TPWD /alert endpoint separately HTTP400 from the original cohort. These 400s were also independently reproduced with external HTTPS web fetch; do not suppress as SSL failures.
- **31 editorial evidence flags remain**. Do not clear `tpwd_source_transport.needs_independent_recheck` until official factual records actually compared. No TLS validation bypass, HTTP downgrade, or stale certification; transport failure pattern appears resolved, editorial acceptance not complete.

### Scope/incomplete
- Nov1–Nov2 Supabase gateway and PostgreSQL log aggregation found no fresh server 5xx/SQL ERROR in that 24h window, while KTR RSS relay upstream (Google News and other publishers) still emitted 502/503. Proper upstream statuses stay truthful; published content pipeline should not fabricate success.
- TD Collin County binary manifest regression #4924 needs exact-worker image bytes and full official manifest proof. Other 22-item backlog groups still open pending root-cause and production evidence. Keep GitHub Actions scheduled monitoring; no new ChatGPT task, no Cloudflare reconnect/cross-site cache purge.

### 2026-11-02 source and release corrections — second checkpoint
- **Two fully verified real TD Worker asset-handoff deploys:** [first release #41483925621](https://github.com/keeptxred/TexasDefined/actions/runs/41483925621) merged `bf3a6137...`, Worker `65d863d0-...`, **63 old JS/CSS copied (5.65 MiB), 244/244 bytes/mime/hash valid across both origins**. [Second release #41485970594](https://github.com/keeptxred/TexasDefined/actions/runs/41485970594), merged `76b704aa...`, Worker `30a85542-...` at 16:58:22 UTC, **37 old files copied (2.94 MiB), 192/192 verified**; but **26 of the first 63 previously copied hashes were not in the second release** because 59 already-present duplicates consumed 96 candidate slots. All 26 ignored were actually old-only and not in second artifact's delivery census. This proves 192/192 alone cannot close #4913. Exact 26 names cross-compared and preserved in [issue #4913](https://github.com/keeptxred/TexasDefined/issues/4913).
- **Fix for concrete 96-candidate bug:** [PR #6539](https://github.com/keeptxred/TexasDefined/pull/6539) protected MERGED `288af5b8b4853fc3692cb0c5bfe1d75c427842df`, now checks already-built files BEFORE counting at most 96 genuine old-only network attempts. Regression: 96 duplicates + one old-only must preserve old; 99 old-only must cap at 96. Existing SHA/MIME/72hr/24MiB/2MiB limits unchanged. Not in previous second Worker. Third exact Worker release/proof still pending.
- **Expanded image monitoring:** [PR #6536](https://github.com/keeptxred/TexasDefined/pull/6536) protected MERGED `76b704aa67309e9a9daeca7a514df99d1318018c`; 18 public canaries daily (GitHub), including Collin, Freeman and Dubina official image WebP bytes on BOTH direct Worker and canonical hosts; protected canary test success. Not source-bundle-root-cause proof.
- **TPWD data repaired in live shared Supabase:** Two legacy stale `/state-parks/lake-mineral-wells/alert` and `/state-parks/blanco/alert` URLs returning HTTP400 were removed ONLY from active `td_authority_verification_sources`, after verifying same-path registered official park landing pages already returned strict-HTTPS HTTP200. Historical `td_authority_verification_checks` preserved (4 Mineral 400, 3 Blanco 400 plus 1 former Blanco baseline); other 31 editorial flags unchanged. Live duplicate count 0. [#5206](https://github.com/keeptxred/TexasDefined/issues/5206) evidence.
- **Important dated factual issue:** Nov2 primary TPWD Lake Mineral Wells page explicitly shows `NO BURN BAN`, separately official primitive-campsite listing continues to prohibit *ground fires*. TD hardcoded Oct17 overlay instead asserted expired Aug30 2026 total wood/charcoal/propane ban and FAQ linked dead /alert. [PR #6540](https://github.com/keeptxred/TexasDefined/pull/6540) corrects that specific park source and facts with dated November status, links to official live park page and preserves other four parks' old dates; protected CI pending at checkpoint. Do not claim production live until checks/release prove.

### Nov 2 follow-up — accepted park fix, continuing metro retention checks
- [PR #6540](https://github.com/keeptxred/TexasDefined/pull/6540) protected MERGED 2026-11-02 17:16 UTC after park-specific and full Merge Gate pass. It fixes BOTH the base state-park-authority campsite facts and visitor overlay: retired 2026-08-30 blanket fire/propane ban as currently asserted, updates Nov2 official TPWD status to date-scoped NO BURN BAN, replaces dead park /alert links with live official TPWD homepage, and preserves permanent primitive campsite ground-fire restriction independently. Only Mineral Wells research date advanced; other four parks retain prior dates. Needs exact production HTML proof.
- [PR #6542](https://github.com/keeptxred/TexasDefined/pull/6542) in protected Merge Gate: Cloudflare confirmed 9 new current Search Engine Crawler 404s on old JS for the El Paso metro exploration road-trip page on Worker e9b24e77... at Nov2 17:06 UTC. Six actual module families (MapPreview, dallas-small-town-drives, explore.near._metro variants) now eligible for strictly SHA/MIME-verified, <=96 old-only downloads/24MiB/72h retention. Prior already-missing binaries may remain unavailable; keep #4913 open.
- KTR evergreen correction [PR #3351](https://github.com/keeptxred/texas-heartland-hub/pull/3351) current production verified by exact main keeptxred-production-current status and Cloudflare Worker deployment version 6fa0dda4... on 2026-11-02 16:57:53 UTC. Supabase cron generate-evergreen-am (08:30 UTC) and pm (18:00 UTC) both active; AI/publishing runtime flags true. Still need actual accepted new evergreen article evidence, not just deployment.
- No blind sitewide purge, Cloudflare reconnect, Google noindex, broad error swallowing, or weakening of published park factual controls.

## November 2, 2026 — PostgREST Warp log false-error classification

The historic **212,703** `Warp server error: Thread killed by timeout manager` PostgREST log messages MUST NOT be interpreted as 212,703 client HTTP5xx failures or SQL query timeouts. The PostgREST maintainers explicitly identified the exact string as a **false error during normal operation** and fixed its misleading default error logging in April 2026: [PostgREST#4799](https://github.com/PostgREST/postgrest/issues/4799), [PR #4800](https://github.com/PostgREST/postgrest/pull/4800). This does not exonerate real, independently evidenced query timeouts or API errors.

Current authenticated shared Supabase project read, Nov 1 20:40Z–Nov 2 20:39Z: **3,144** matching PostgREST Warp messages, consistently ~94–147 per full hour; **zero** SQLSTATE 57014 or 25P02 entries and **one** real API gateway HTTP500 (`/rest/v1/texas_news_feed`). The sampled Warp log's `path=/` is a PostgREST service log attribute, **not** a user-request REST URL. There is no credible attribution of each Warp message to a timed-out endpoint or to one of the two sites.

Reclassify exact-string counts as `postgrest_internal_warp_debug_noise`, excluded from customer-facing 5xx and SQL-timeout totals. Track actual REST status codes, Postgres SQLSTATE, PGRST error responses, database resources and latency independently. Do not restart/upgrade/alter a database or disable verification just to stop this potentially normal log. The one genuine `texas_news_feed` gateway 500 remains unresolved, requires an endpoint-specific trace, and is separate from this noise.


## 2026-11-02 confirmed TDEM REST timeout repair

- At 2026-11-02T18:12:59.997Z, real HTTP500 on Supabase /rest/v1/texas_news_feed reported PostgREST error=57014, upstream 8601ms and origin 8800ms; gateway request ID 01a19d76-efdd-79a1-94e7-1db340c4fe51. A real SQL timeout, independent of noisy PostgREST Warp logs.
- Caller: KeepTXRed src/routes/api/public/hooks/build-newsroom-research-packets.ts. Filter on exact TDEM release source and created_at >=14d, descending, limit 8; only 4 matching rows among 10,755 recently created rows. Prior planner scanned date-only index then filtered source (estimated cost 4864.39).
- KTR PR #3368 https://github.com/keeptxred/texas-heartland-hub/pull/3368 merged 7111dfcc56e687d9967c1ddfb180f42faa566a7c. Exact SQL migration applied successfully via Supabase to project ftkznprjljkhymknvhye. Composite btree (source,created_at DESC) now exists. EXPLAIN ANALYZE on original query used the new index, 4 rows, actual execution 21.981ms, estimated cost 2.63. No permissions/RLS/contents changed.
- Applied Supabase migration version is 20261102204654; KTR PR #3370 https://github.com/keeptxred/texas-heartland-hub/pull/3370 aligns repository filename to this version, MERGED as f97808be23261b5c4135547432d2b81222895d55 after every protected check passed; source-controlled filename now exactly matches Supabase applied history. Index fix live.
- Distinguish old 48h Worker HTTP500s on Collingsworth County, Bing football sitemap, and KTR bill detail (Nov1 older Worker versions) from current release faults. No current incident attribution proven.