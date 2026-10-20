# Eleven-city authority: live Supabase source enrollment and first probe evidence

**Execution date:** 2026-10-13 America/Chicago (2026-10-14 UTC)  
**Repository:** `keeptxred/TexasDefined`  
**Existing production backend:** Supabase project `ftkznprjljkhymknvhye`  
**GitHub baseline when creating documentation branch:** `25eb7b882c039c0ac1728a23c80073fcc7384ab2` (current main may advance independently).  
**Acceptance verdict:** **INCOMPLETE — 0/11 fully certified**. This report does not change content dates, deploy status or city acceptance decisions.

## Confirmed existing defect and direct remediation

Live SQL inspection found all eleven canonical `/city/` paths in `public.td_authority_verification_registry` and `public.td_authority_page_acceptance`, but **all eleven had zero records in `public.td_authority_verification_sources` and zero probe checks**. All eleven registry rows had `last_verified_at IS NULL` and `status='awaiting_editorial_verification'`. A scheduled/healthy generic crawler was **not actually monitoring the city source claims**.

Using **the existing**, RLS-protected Supabase authority verification system, directly inserted 69 distinct official/agency/district source references from current city-profile links and existing city GIS research, idempotently by `(path,source_url)` (no new monitoring tables, cron jobs or competing services). The source-label rows expressly separate individual district/operator examples from address-specific assignment and GIS metadata from legal city limits. No editorial dates, verified states or substantive published city claims were changed. City coverage now:

| City path | Registered source references | HTTP 2xx baseline (incl. PDF reachability) | Access rejected / automated probe inconclusive |
|---|---:|---:|---:|
| `/city/arlington` | 6 | 4 | 2 |
| `/city/austin` | 7 | 6 | 1 |
| `/city/corpus-christi` | 6 | 4 | 2 |
| `/city/dallas` | 6 | 5 | 1 |
| `/city/el-paso` | 6 | 5 | 1 |
| `/city/fort-worth` | 6 | 3 | 3 |
| `/city/houston` | 7 | 6 | 1 |
| `/city/hurst` | 7 | 5 | 2 |
| `/city/lubbock` | 6 | 3 | 3 |
| `/city/plano` | 6 | 5 | 1 |
| `/city/san-antonio` | 6 | 3 | 3 |
| **Total** | **69** | **49** | **20** |

First HTTP checks were run **in the existing production source-probe pipeline**: `td_maintenance.queue_source_probes(70)` created 70 requests (69 city references and one other source); `td_maintenance.collect_source_probes()` collected all 70 responses. City results: **48 new text baselines, one binary/PDF HTTP success and 20 access denials**. Census QuickFacts responded HTTP **403** for all eleven city URLs to the automated Supabase worker; other anti-automation results were mostly HTTP 403 with one transit HTTP 429. These are **not proven broken public URLs** or disproven Census population values. No city-source HTTP 404 was observed in this first batch.

**Do not mark the eleven city pages `verified` or update `last_verified_at`:** the collector compares source response fingerprints, not claim truth. An HTTP 403/429 is an inaccessible automated probe, not an editorial conclusion; the existing collector stores such outcomes under `source_unreachable` with exact HTTP status. A category-specific alternative or manual authoritative verification is needed for these sources. This source-access caveat also applies to the acceptance/readiness status that may now display `source_unreachable`.

## Actual scheduler/reliability evidence

Confirmed `cron.job` has active jobs:
- `td-authority-collect-sources` on minutes 17 and 47; production `cron.job_run_details` showed last run **succeeded** at 2026-10-14 01:17 UTC before this batch.
- `td-authority-mark-due` daily at 03:36 UTC; last execution **succeeded**.
- `td-authority-enqueue-sources` daily at 03:24 UTC; last execution **succeeded**.
- `td-authority-editorial-acceptance-sync` daily at 04:43 UTC; last execution **succeeded**.

The currently deployed `collect_source_probes()` stores HTTP outcomes, content fingerprints, error metadata and schedules the next check from **the page-level `cadence_days` value**. All eleven city registry rows use 90 days. That is an **existing limitation**: source-specific transit/visitor/utility volatility is not yet reflected in the source cadence. Do not advertise granular 7/30/90-day claim freshness until it is implemented and verified. Also, a cron success only establishes that the SQL function ran, not that an upstream source was reachable or a city fact was verified.

## Independent content, GIS and accessibility acceptance remains separate

Prior retained GIS artifacts already establish research candidates matching all eleven published municipality/county lists, but they explicitly require legal/publisher/jurisdiction review, including Houston limited-purpose Waller, the San Antonio Comal sliver and provenance, and the Austin/Houston full-versus-limited-purpose classifications. See `FIRST_MUNICIPAL_COUNTY_SPATIAL_RESULTS_2026-10-10.md` and `SAN_ANTONIO_PROVISIONAL_AND_SEO_2026-10-11.md`.

Prior protected Chrome 33-viewport success, automated axe/link diagnostics and official-source utility research remain valuable historical evidence. **They do not certify** comprehensive manual visual and WCAG 2.2 AA audit, all visitor and restaurant details, every official/outbound/reciprocal link, district/address service boundaries, or exact current production deployment. These categories and all eleven final acceptance decisions remain open until independent proof is retained.

## Reproducible read-only verification

```sql
-- Expected: 11 city rows with 6 or 7 distinct source references,
-- but do NOT infer editorial or factual verification from counts.
select r.path, r.status, r.last_verified_at, r.cadence_days,
  count(s.source_url) registered,
  count(*) filter (where s.last_checked_at is not null) probed,
  count(*) filter (where s.http_status between 200 and 299) http_2xx,
  count(*) filter (where s.http_status in (401,403,429)) access_rejected
from public.td_authority_verification_registry r
left join public.td_authority_verification_sources s using (path)
where r.path in (
 '/city/houston','/city/dallas','/city/fort-worth','/city/austin',
 '/city/san-antonio','/city/el-paso','/city/arlington','/city/hurst',
 '/city/corpus-christi','/city/plano','/city/lubbock'
)
group by r.path,r.status,r.last_verified_at,r.cadence_days
order by r.path;
```

## Remaining acceptance blockers — no false completion

1. **Facts:** Independently verify school-district overlays and address-lookup resources; taxing-unit links; utility territories; public-transport service changes; every displayed visitor, restaurant, accessibility, admission, image license and closure claim.
2. **GIS:** Obtain independent official owner/vintage/legal interpretation of all municipal polygon overlays; resolve limited-purpose, ETJ and sliver exceptions, particularly San Antonio's tiny Comal overlay and Houston's limited-purpose Waller intersection.
3. **Browser:** Retain per-city manual screenshots at all three viewports and repeat real interactions, keyboard/menu, responsive reflow, contrast and screen-reader semantics. Recheck all relevant links with clear HTTP 403/429 versus actual 404/410 classification.
4. **Freshness:** Evolve the **existing** source-verification pipeline to support appropriate source/claim-specific cadences and editor-reviewed changes. Resolve access-blocked sources without inventing verification results.
5. **Production:** Reconcile current main with exact successful deploy SHA and latest 33/33 browser audit; record eleven independent acceptance decisions only when all required evidence exists.

**No city received FINAL ACCEPTED status from this batch.**
