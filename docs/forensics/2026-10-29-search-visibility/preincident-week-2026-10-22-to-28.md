# TexasDefined — October 22–28, 2026 pre-incident Googlebot investigation

**Evidence checkpoint:** 2026-10-30/31 UTC. Source: authenticated Cloudflare Workers Observability API, dataset `cloudflare-workers`, Worker `texasdefined-site`.

## Scope and important limits

The investigated local calendar days are **October 22–28, 2026 (America/Chicago; CDT UTC−05:00)**. Query window for each day: 05:00 UTC through 04:59:59 UTC the following day. Filters: `$metadata.service = texasdefined-site`, User-Agent contains `Googlebot`, and `$workers.event.request.cf.asn = 15169` (Google LLC). Inspecting retained events also showed Cloudflare `verifiedBotCategory = Search Engine Crawler`.

**October 22 returned no retained event rows (rows_read 0), not proof of zero crawls. October 23 had only the tail of the day retained.** The observations below may exclude edge-cache-served requests that did not invoke the Worker. These are Worker-log event counts and can include multiple events per request, not definitive total crawl counts. The aggregate engine also applies small sample scaling on some groups, which explains differences from individual event counts. Googlebot's timing is not Google's ranking evaluation time.

## Daily Googlebot HTTP response aggregates

| Local date | HTTP 200 | HTTP 301 | HTTP 307 | HTTP 404 | HTTP 500 | Status 0 | Total shown |
|---|---:|---:|---:|---:|---:|---:|---:|
| 2026-10-22 | — | — | — | — | — | — | unavailable |
| 2026-10-23 (partial) | 8 | 0 | 0 | 13 | 0 | 0 | 21 |
| 2026-10-24 | 783 | 8 | 12 | 208 | 0 | 0 | 1,011 |
| 2026-10-25 | 995 | 2 | 17 | 162 | **5** | 0 | 1,181 |
| 2026-10-26 | 887 | 3 | 9 | 94 | 0 | 0 | 993 |
| 2026-10-27 | 1,104 | 7 | 111 | 76 | 0 | 1 | 1,299 |
| 2026-10-28 | 529 | 2 | 87 | 115 | 0 | 1 | 734 |
| 2026-10-29 (comparison) | 278 | 3 | 26 | 98 | 0 | 1 | 406 |

## Breakdown of individual HTTP 404 events (not aggregate estimates)

| Day | Raw 404 events reviewed | JS/CSS files | Page/other URL |
|---|---:|---:|---:|
| Oct 23 (partial) | 13 | 13 | 0 |
| Oct 24 | 199 | 190 | 9 |
| Oct 25 | 162 | 161 | 1 |
| Oct 26 | 94 | 92 | 2 |
| Oct 27 | 76 | 74 | 2 |
| Oct 28 | 115 | 113 | 2 |
| Oct 29 (comparison) | 98 | 95 | 3 |

Of 646 raw 404 events reviewed October 24–28, **630 (approximately 97.5%) were JavaScript or CSS files**, often requested with a same-site referrer representing a specific TexasDefined HTML page. These events predate the October 29 impressions drop, contradicting a theory that the broken asset problem began strictly at noon October 29.

Representative paths and referrers (URL query values, IPs, cookies and all other sensitive request fields excluded):
- October 23 around 11:58 p.m. CDT, `/article/hogg-foundation-mental-health-texas-history` caused asset 404s such as `/assets/useQuery-xVVIfL6c.js`, `/assets/useBaseQuery-BuzR-diL.js`, `/assets/UnusualBusinessAuthorityPanel-BMZLLeBj.js`.
- October 24, `/property-tax/taxing-unit/shady-shores` requested missing `main-tIYFAsaZ.js`, `styles-JmyTfeJO.css`, `Container-CkJsw5YE.js`. Also some 404s on non-asset URLs including literal `%24slug` paths and `/destination/fort-leaton-state-historic-site`.
- October 25, `/texas-high-school-football-teams/shepherd` requested `/assets/main-Dnv7NJF6.js` (404); other affected referrers included tax-unit pages and `/texas-data/where-new-texans-came-from-2024`.
- October 26, tax-unit pages including `/property-tax/taxing-unit/devine-isd` requested missing `Container-Dxoh7X2Y.js`, `main-BsRmpS0c.js`, tax-unit route chunk.
- October 27, football district pages `/texas-high-school-football-districts/6a-district-24` and `/texas-high-school-football-districts/6a-district-27` referred to missing route chunks; tax-unit pages also triggered 404s.
- October 28, `/texas-high-school-football-teams/shepherd` requested missing `/assets/texas-high-school-football-teams_._slug.lazy-ClHVsoFo.js`, `/assets/FootballFanOffers-ByNpiEAB.js`; `/property-tax/taxing-unit/oak-point-wcid-2` referred to missing `main-DcWUEmbO.js` and `Container-D_qJfR0x.js`.

These examples alone do not determine whether HTML was stale, assets were deleted too aggressively, Worker static-asset mapping was inconsistent, or an alternate cause generated the 404s.

## Critical: October 25 Googlebot HTTP 500s on football pages

All five events were served by **Worker version `b16d0c79-b34c-4bcf-97e9-669d10629aa3`**.

| Time CDT | Page | Response |
|---|---|---|
| 5:19:10 p.m. | `/texas-high-school-football-teams/gunter` | 500 |
| 5:19:12 p.m. | `/texas-high-school-football-teams/gunter` | 500 |
| 5:19:13 p.m. | `/texas-high-school-football-teams/gunter` | 500 |
| 5:19:16 p.m. | `/texas-high-school-football-teams/gunter` | 500 |
| 5:55:25 p.m. | `/texas-high-school-football-teams/guthrie` | 500 |

Deployment of this version occurred **October 25 at 5:17:16 p.m. CDT** (2026-10-25T22:17:16.249418Z), deployment ID `b0f72798-394c-446e-9b88-2e4efe8b375e`. First observed Googlebot failure followed less than two minutes later. A later version was deployed at **6:28:21 p.m. CDT** (2026-10-25T23:28:21.094829Z; version `0a19f5e8-b2b2-4410-a7a5-017a92fff419`).

Worker logs reported `outcome: ok` alongside these HTTP 500s; this indicates the Worker process returned a 500 response, not necessarily an unhandled Worker runtime exception. Actual application exception/root cause remains unverified.

## Deployments per local calendar day

| Oct 22 | Oct 23 | Oct 24 | Oct 25 | Oct 26 | Oct 27 | Oct 28 | Oct 29 |
|---:|---:|---:|---:|---:|---:|---:|---:|
| 25 | 50 | 62 | 49 | 66 | 63 | 51 | 65 |

The **October 24–28 total was 291 deployments**, or 58.2 daily. The five-day period had sustained deployment churn, suggesting a possible stale HTML versus content-hashed asset retention mismatch. This remains a hypothesis requiring artifact comparison.

## Preservation and next steps

1. This checkpoint is independent of, and supplements, `README.md` in the same directory. It preserves **summaries and representative evidence**, not full raw Cloudflare HTTP logs.
2. A separate file `googlebot-2026-10-28.json` exists but is **incomplete**; it serialized 63 of 920 matching events in its reported segments and must not be used as an exhaustive export.
3. Investigate the October 25 football HTTP 500 version `b16d0c79-b34c-4bcf-97e9-669d10629aa3`, correlate with commits, and distinguish a transient error from a sustained football-page failure.
4. Inspect build artifact retention, cache behavior, deployment atomicity and old page asset references. Search for a fix around the **earliest recoverable period (October 23/24)**, not only noon October 29.
5. Reconcile against Google Search Console Crawl Stats and Google indexing reports before inferring a cause of the search decline.
