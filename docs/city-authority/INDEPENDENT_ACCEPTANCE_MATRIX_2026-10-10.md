# TexasDefined eleven-city — independent final acceptance matrix (October 10, 2026)

**Verdict: INCOMPLETE / NONE FULLY CERTIFIED.** Evidence-only continuation; do not equate automated checks with human inspection. This file is complementary to the three original QA ledgers and records the outstanding tasks without resetting source-review timestamps.

## Proven release and test evidence

- PR [#4608](https://github.com/keeptxred/TexasDefined/pull/4608) merged at `b23d14b2385e57070a8c11938363ea146ab8c9d7`: Houston counties corrected to Harris/Fort Bend/Montgomery and Waller labeled ETJ, without claiming a completed legal-boundary overlay.
- Protected [production deployment #38098919324](https://github.com/keeptxred/TexasDefined/actions/runs/38098919324) completed successfully at **attempt 2**, same SHA. Prior blocked attempt was governed Wikimedia Commons image materialization HTTP 429; protected retry passed, no bypass.
- [Production Chrome QA #38098919338](https://github.com/keeptxred/TexasDefined/actions/runs/38098919338), **attempt 2**, same SHA: 11 cities × 3 viewports = **33/33 automated PASS**. [Artifact #11687994544](https://github.com/keeptxred/TexasDefined/actions/runs/38098919338/artifacts/11687994544) downloaded and independently inspected. Each result contains screenshot, keyboard-focus samples, metadata/image checks and a sample of at most 12 internal URLs.
- All 33 recorded runs report zero JavaScript page errors, zero broken loaded images, no images missing an `alt` attribute, no horizontal overflow and positive automated focus navigation. **These do not establish contrast, alt accuracy, full links, usability, or full WCAG conformance.**
- Live Fort Worth Kimbell canonical links were checked by the runner on all three sizes: it asserts both URLs point to `/destination/kimbell-art-museum-fort-worth`, obsolete links are absent, and the destination responds HTTP 200. Historical PR #4519 fixed the broken link.
- PR [#4609](https://github.com/keeptxred/TexasDefined/pull/4609) already documented production results on main. PR [#4611](https://github.com/keeptxred/TexasDefined/pull/4611) is **open** at the time of this inspection, proposing full-page desktop screenshots. Its successful merge and runtime artifact must be verified before awarding evidence.

## Actual manual review of retained viewport screenshots

The 33 images in artifact #11687994544 were extracted and examined as a visual contact sheet, with particular attention to mobile views. The screenshots were captured **after** twelve keyboard Tab events and internal-link probes, so some mobile captures are scrolled past the title and upper content: `houston-mobile.png` shows the systems section, `fort-worth-mobile.png` shows food and drink, and `el-paso-mobile.png` shows lower utility/public-transport content. These are **screenshot methodology gaps**, *not demonstrated production layout defects*. Comment [#6104955777](https://github.com/keeptxred/TexasDefined/pull/4611#issuecomment-6104955777) requests returning to scrollY=0 before viewport capture. The current 33 viewport-only screenshots do not prove full-page image uniqueness, above/below-fold layouts, actual tap usability, contrast, complete accessible names or all interactions. Therefore: **responsive visual PARTIAL, accessibility PARTIAL for every city**.

## GIS source and method checkpoint

The new open-source research helper `scripts/data/verify-city-municipal-gis.py` records exact municipal GIS source URLs, obtains city-limit GeoJSON, selects *all candidate counties in its extent* from the U.S. Census [TIGERweb BAS 2026 county polygons](https://tigerweb.geo.census.gov/arcgis/rest/services/TIGERweb/State_County/MapServer/29), projects both to EPSG:5070, reports overlap areas, records raw-data SHA-256 digests and flags areas below 0.01 km² for **sliver review**. No ETJ layer is used as city-limit geometry. Source/source-data differences, limited-purpose annexations, topology errors and county-line precision still require human review.

**Important:** Script committed is not evidence it has successfully retrieved geometry. No live municipal–county polygon overlay was completed in this execution environment. The script does not auto-issue GIS PASS; all eleven remain **GIS UNVERIFIED**. Four cities (Austin, San Antonio, Corpus Christi, Lubbock) still need current official vector-source discovery. Confirm geometry dates and limited-purpose classifications before approving a GIS result. Census county geography is BAS 2026, not necessarily the date/precision of municipal service layers.

## City-by-city status matrix

**Key:** Browser = automated live Chrome on release SHA; Facts = limited prior official-source research, not full claim audit; Visual = limited viewport screenshot overview; ADA = automated focus/alt-presence only; SEO = tested canonical/description/OG/indexability, but structured data and live sitemap not independently certified. **PASS is scoped to the named automated checks only.**

| City | Browser | Census 2020/2025 | GIS | Other facts | Visual | Accessibility | Links | SEO | Final |
|---|---|---|---|---|---|---|---|---|---|
| Houston | PASS (3/3 automated) | PASS (existing Census ledger) | UNVERIFIED | PARTIAL | PARTIAL | PARTIAL | PARTIAL | PARTIAL | **PARTIAL** |
| Dallas | PASS (3/3 automated) | PASS (existing Census ledger) | UNVERIFIED | PARTIAL | PARTIAL | PARTIAL | PARTIAL | PARTIAL | **PARTIAL** |
| Fort Worth | PASS (3/3 automated) | PASS (existing Census ledger) | UNVERIFIED | PARTIAL | PARTIAL | PARTIAL | PARTIAL | PARTIAL | **PARTIAL** |
| Austin | PASS (3/3 automated) | PASS (existing Census ledger) | UNVERIFIED | PARTIAL | PARTIAL | PARTIAL | PARTIAL | PARTIAL | **PARTIAL** |
| San Antonio | PASS (3/3 automated) | PASS (existing Census ledger) | UNVERIFIED | PARTIAL | PARTIAL | PARTIAL | PARTIAL | PARTIAL | **PARTIAL** |
| El Paso | PASS (3/3 automated) | PASS (existing Census ledger) | UNVERIFIED | PARTIAL | PARTIAL | PARTIAL | PARTIAL | PARTIAL | **PARTIAL** |
| Arlington | PASS (3/3 automated) | PASS (existing Census ledger) | UNVERIFIED | PARTIAL | PARTIAL | PARTIAL | PARTIAL | PARTIAL | **PARTIAL** |
| Hurst | PASS (3/3 automated) | PASS (existing Census ledger) | UNVERIFIED | PARTIAL | PARTIAL | PARTIAL | PARTIAL | PARTIAL | **PARTIAL** |
| Corpus Christi | PASS (3/3 automated) | PASS (existing Census ledger) | UNVERIFIED | PARTIAL | PARTIAL | PARTIAL | PARTIAL | PARTIAL | **PARTIAL** |
| Plano | PASS (3/3 automated) | PASS (existing Census ledger) | UNVERIFIED | PARTIAL | PARTIAL | PARTIAL | PARTIAL | PARTIAL | **PARTIAL** |
| Lubbock | PASS (3/3 automated) | PASS (existing Census ledger) | UNVERIFIED | PARTIAL | PARTIAL | PARTIAL | PARTIAL | PARTIAL | **PARTIAL** |

## Detailed city records (status, evidence, defect, fix, production, next action)

### 1. Houston

- **Published county claim:** Harris / Fort Bend / Montgomery; Waller ETJ separately. **GIS evidence:** Houston MapServer layers 0/1/9; source endpoint existence does not establish a polygon/county overlay; **UNVERIFIED**.
- **Facts:** 2020 population and 2025 estimate individually PASS in `FINAL_BROWSER_AND_FACTUAL_QA_2026-10-09.md`; independent featured/operator evidence: 2 attraction claims (see `INDEPENDENT_PRIMARY_SOURCES_2026-10-10.md`); relocation, utilities, district service/attendance, address-specific taxes and remaining features are **PARTIAL or UNVERIFIED**.
- **Chrome/links/SEO:** artifact #11687994544 reports automated **PASS** at all three sizes for this city, but only first 12 distinct internal destinations are attempted per viewport; full internal/official-external destination accuracy, JSON-LD/schema and sitemap inclusion remain **PARTIAL**.
- **Visual and ADA:** mobile screenshot starts at systems section. Artifact contains viewport screenshots, not full-page visual inspection or a WCAG evaluation; both **PARTIAL**.
- **Known defect/fix:** Waller city-limits assertion corrected by PR #4608; production verified via run #38098919324. Limited-purpose geometry still open.
- **Next action:** GIS overlay, limited-purpose, full screenshot, a11y, unsampled links; record current source timestamp, exact statement, observed result, and screenshot/URL artifact before final promotion.

### 2. Dallas

- **Published county claim:** Dallas / Collin / Denton / Kaufman / Rockwall. **GIS evidence:** Dallas GIS Basemap/CityLimits/0; source endpoint existence does not establish a polygon/county overlay; **UNVERIFIED**.
- **Facts:** 2020 population and 2025 estimate individually PASS in `FINAL_BROWSER_AND_FACTUAL_QA_2026-10-09.md`; independent featured/operator evidence: 3 attraction claims (see `INDEPENDENT_PRIMARY_SOURCES_2026-10-10.md`); relocation, utilities, district service/attendance, address-specific taxes and remaining features are **PARTIAL or UNVERIFIED**.
- **Chrome/links/SEO:** artifact #11687994544 reports automated **PASS** at all three sizes for this city, but only first 12 distinct internal destinations are attempted per viewport; full internal/official-external destination accuracy, JSON-LD/schema and sitemap inclusion remain **PARTIAL**.
- **Visual and ADA:** viewport captured near H1. Artifact contains viewport screenshots, not full-page visual inspection or a WCAG evaluation; both **PARTIAL**.
- **Known defect/fix:** No newly reproducible site defect established in this review; do not infer PASS from absence of reports.
- **Next action:** GIS overlay, current resources and comprehensive access/link QA; record current source timestamp, exact statement, observed result, and screenshot/URL artifact before final promotion.

### 3. Fort Worth

- **Published county claim:** Tarrant / Denton / Parker / Johnson / Wise. **GIS evidence:** Fort Worth city limit layer 3 / county layer 6; source endpoint existence does not establish a polygon/county overlay; **UNVERIFIED**.
- **Facts:** 2020 population and 2025 estimate individually PASS in `FINAL_BROWSER_AND_FACTUAL_QA_2026-10-09.md`; independent featured/operator evidence: 4 attraction claims; Kimbell route PASS (see `INDEPENDENT_PRIMARY_SOURCES_2026-10-10.md`); relocation, utilities, district service/attendance, address-specific taxes and remaining features are **PARTIAL or UNVERIFIED**.
- **Chrome/links/SEO:** artifact #11687994544 reports automated **PASS** at all three sizes for this city, but only first 12 distinct internal destinations are attempted per viewport; full internal/official-external destination accuracy, JSON-LD/schema and sitemap inclusion remain **PARTIAL**.
- **Visual and ADA:** mobile screenshot starts at food section. Artifact contains viewport screenshots, not full-page visual inspection or a WCAG evaluation; both **PARTIAL**.
- **Known defect/fix:** Two bad Kimbell URLs corrected by #4519 and verified by Chrome runner; production QA #38098919338 passed.
- **Next action:** GIS overlay, full-page visual/ADA and links; record current source timestamp, exact statement, observed result, and screenshot/URL artifact before final promotion.

### 4. Austin

- **Published county claim:** Travis / Williamson / Hays. **GIS evidence:** Current authoritative vector endpoint not validated; source endpoint existence does not establish a polygon/county overlay; **UNVERIFIED**.
- **Facts:** 2020 population and 2025 estimate individually PASS in `FINAL_BROWSER_AND_FACTUAL_QA_2026-10-09.md`; independent featured/operator evidence: 2 attraction claims (see `INDEPENDENT_PRIMARY_SOURCES_2026-10-10.md`); relocation, utilities, district service/attendance, address-specific taxes and remaining features are **PARTIAL or UNVERIFIED**.
- **Chrome/links/SEO:** artifact #11687994544 reports automated **PASS** at all three sizes for this city, but only first 12 distinct internal destinations are attempted per viewport; full internal/official-external destination accuracy, JSON-LD/schema and sitemap inclusion remain **PARTIAL**.
- **Visual and ADA:** viewport captured near H1. Artifact contains viewport screenshots, not full-page visual inspection or a WCAG evaluation; both **PARTIAL**.
- **Known defect/fix:** No newly reproducible site defect established in this review; do not infer PASS from absence of reports.
- **Next action:** find current municipal vector, overlay and factual categories; record current source timestamp, exact statement, observed result, and screenshot/URL artifact before final promotion.

### 5. San Antonio

- **Published county claim:** Bexar / Comal / Medina. **GIS evidence:** 2026 municipal map PDF; current vector endpoint not validated; source endpoint existence does not establish a polygon/county overlay; **UNVERIFIED**.
- **Facts:** 2020 population and 2025 estimate individually PASS in `FINAL_BROWSER_AND_FACTUAL_QA_2026-10-09.md`; independent featured/operator evidence: 2 attraction claims (see `INDEPENDENT_PRIMARY_SOURCES_2026-10-10.md`); relocation, utilities, district service/attendance, address-specific taxes and remaining features are **PARTIAL or UNVERIFIED**.
- **Chrome/links/SEO:** artifact #11687994544 reports automated **PASS** at all three sizes for this city, but only first 12 distinct internal destinations are attempted per viewport; full internal/official-external destination accuracy, JSON-LD/schema and sitemap inclusion remain **PARTIAL**.
- **Visual and ADA:** viewport captured near H1. Artifact contains viewport screenshots, not full-page visual inspection or a WCAG evaluation; both **PARTIAL**.
- **Known defect/fix:** No newly reproducible site defect established in this review; do not infer PASS from absence of reports.
- **Next action:** find current GIS polygon, Comal/Medina overlay and factual review; record current source timestamp, exact statement, observed result, and screenshot/URL artifact before final promotion.

### 6. El Paso

- **Published county claim:** El Paso. **GIS evidence:** CityLimits FeatureServer/0; source endpoint existence does not establish a polygon/county overlay; **UNVERIFIED**.
- **Facts:** 2020 population and 2025 estimate individually PASS in `FINAL_BROWSER_AND_FACTUAL_QA_2026-10-09.md`; independent featured/operator evidence: 2 attraction claims (see `INDEPENDENT_PRIMARY_SOURCES_2026-10-10.md`); relocation, utilities, district service/attendance, address-specific taxes and remaining features are **PARTIAL or UNVERIFIED**.
- **Chrome/links/SEO:** artifact #11687994544 reports automated **PASS** at all three sizes for this city, but only first 12 distinct internal destinations are attempted per viewport; full internal/official-external destination accuracy, JSON-LD/schema and sitemap inclusion remain **PARTIAL**.
- **Visual and ADA:** mobile screenshot begins below heading. Artifact contains viewport screenshots, not full-page visual inspection or a WCAG evaluation; both **PARTIAL**.
- **Known defect/fix:** No newly reproducible site defect established in this review; do not infer PASS from absence of reports.
- **Next action:** GIS overlay, true top mobile captures and ADA; record current source timestamp, exact statement, observed result, and screenshot/URL artifact before final promotion.

### 7. Arlington

- **Published county claim:** Tarrant. **GIS evidence:** PoliticalBoundary MapServer/1; source endpoint existence does not establish a polygon/county overlay; **UNVERIFIED**.
- **Facts:** 2020 population and 2025 estimate individually PASS in `FINAL_BROWSER_AND_FACTUAL_QA_2026-10-09.md`; independent featured/operator evidence: 2 featured attraction claims + transit claim (see `INDEPENDENT_PRIMARY_SOURCES_2026-10-10.md`); relocation, utilities, district service/attendance, address-specific taxes and remaining features are **PARTIAL or UNVERIFIED**.
- **Chrome/links/SEO:** artifact #11687994544 reports automated **PASS** at all three sizes for this city, but only first 12 distinct internal destinations are attempted per viewport; full internal/official-external destination accuracy, JSON-LD/schema and sitemap inclusion remain **PARTIAL**.
- **Visual and ADA:** viewport captured near H1. Artifact contains viewport screenshots, not full-page visual inspection or a WCAG evaluation; both **PARTIAL**.
- **Known defect/fix:** No newly reproducible site defect established in this review; do not infer PASS from absence of reports.
- **Next action:** GIS overlap plus operator/link/accessibility review; record current source timestamp, exact statement, observed result, and screenshot/URL artifact before final promotion.

### 8. Hurst

- **Published county claim:** Tarrant. **GIS evidence:** EnerGov MapServer/2; source endpoint existence does not establish a polygon/county overlay; **UNVERIFIED**.
- **Facts:** 2020 population and 2025 estimate individually PASS in `FINAL_BROWSER_AND_FACTUAL_QA_2026-10-09.md`; independent featured/operator evidence: WhirlyBall location confirmed (see `INDEPENDENT_PRIMARY_SOURCES_2026-10-10.md`); relocation, utilities, district service/attendance, address-specific taxes and remaining features are **PARTIAL or UNVERIFIED**.
- **Chrome/links/SEO:** artifact #11687994544 reports automated **PASS** at all three sizes for this city, but only first 12 distinct internal destinations are attempted per viewport; full internal/official-external destination accuracy, JSON-LD/schema and sitemap inclusion remain **PARTIAL**.
- **Visual and ADA:** viewport captured near H1. Artifact contains viewport screenshots, not full-page visual inspection or a WCAG evaluation; both **PARTIAL**.
- **Known defect/fix:** No newly reproducible site defect established in this review; do not infer PASS from absence of reports.
- **Next action:** GIS overlap, retry WhirlyBall link, visual/ADA; record current source timestamp, exact statement, observed result, and screenshot/URL artifact before final promotion.

### 9. Corpus Christi

- **Published county claim:** Nueces / San Patricio / Kleberg / Aransas. **GIS evidence:** Current authoritative vector endpoint not validated; source endpoint existence does not establish a polygon/county overlay; **UNVERIFIED**.
- **Facts:** 2020 population and 2025 estimate individually PASS in `FINAL_BROWSER_AND_FACTUAL_QA_2026-10-09.md`; independent featured/operator evidence: 2 attraction claims (see `INDEPENDENT_PRIMARY_SOURCES_2026-10-10.md`); relocation, utilities, district service/attendance, address-specific taxes and remaining features are **PARTIAL or UNVERIFIED**.
- **Chrome/links/SEO:** artifact #11687994544 reports automated **PASS** at all three sizes for this city, but only first 12 distinct internal destinations are attempted per viewport; full internal/official-external destination accuracy, JSON-LD/schema and sitemap inclusion remain **PARTIAL**.
- **Visual and ADA:** viewport captured near H1. Artifact contains viewport screenshots, not full-page visual inspection or a WCAG evaluation; both **PARTIAL**.
- **Known defect/fix:** No newly reproducible site defect established in this review; do not infer PASS from absence of reports.
- **Next action:** municipal polygon county overlay particularly coastal islands; record current source timestamp, exact statement, observed result, and screenshot/URL artifact before final promotion.

### 10. Plano

- **Published county claim:** Collin / Denton. **GIS evidence:** MunicipalBoundary MapServer/0; source endpoint existence does not establish a polygon/county overlay; **UNVERIFIED**.
- **Facts:** 2020 population and 2025 estimate individually PASS in `FINAL_BROWSER_AND_FACTUAL_QA_2026-10-09.md`; independent featured/operator evidence: DART GoLink current changes (see `INDEPENDENT_PRIMARY_SOURCES_2026-10-10.md`); relocation, utilities, district service/attendance, address-specific taxes and remaining features are **PARTIAL or UNVERIFIED**.
- **Chrome/links/SEO:** artifact #11687994544 reports automated **PASS** at all three sizes for this city, but only first 12 distinct internal destinations are attempted per viewport; full internal/official-external destination accuracy, JSON-LD/schema and sitemap inclusion remain **PARTIAL**.
- **Visual and ADA:** viewport captured near H1. Artifact contains viewport screenshots, not full-page visual inspection or a WCAG evaluation; both **PARTIAL**.
- **Known defect/fix:** No newly reproducible site defect established in this review; do not infer PASS from absence of reports.
- **Next action:** GIS overlap, taxes/schools and operator link review; record current source timestamp, exact statement, observed result, and screenshot/URL artifact before final promotion.

### 11. Lubbock

- **Published county claim:** Lubbock. **GIS evidence:** Current official 2026 GIS vector endpoint not validated; source endpoint existence does not establish a polygon/county overlay; **UNVERIFIED**.
- **Facts:** 2020 population and 2025 estimate individually PASS in `FINAL_BROWSER_AND_FACTUAL_QA_2026-10-09.md`; independent featured/operator evidence: Silent Wings Museum + Citibus redesign (see `INDEPENDENT_PRIMARY_SOURCES_2026-10-10.md`); relocation, utilities, district service/attendance, address-specific taxes and remaining features are **PARTIAL or UNVERIFIED**.
- **Chrome/links/SEO:** artifact #11687994544 reports automated **PASS** at all three sizes for this city, but only first 12 distinct internal destinations are attempted per viewport; full internal/official-external destination accuracy, JSON-LD/schema and sitemap inclusion remain **PARTIAL**.
- **Visual and ADA:** viewport captured near H1. Artifact contains viewport screenshots, not full-page visual inspection or a WCAG evaluation; both **PARTIAL**.
- **Known defect/fix:** No newly reproducible site defect established in this review; do not infer PASS from absence of reports.
- **Next action:** current official polygon, overlay, mobility and access review; record current source timestamp, exact statement, observed result, and screenshot/URL artifact before final promotion.

## Global remaining verification and acceptance blockers

1. **GIS:** run the helper against each current municipal polygon; obtain missing four vector sources; inspect each polygon field for incorporated/limited-purpose status and compare against TIGERweb counties. Independently resolve any extra or missing county and dated/sliver geometry. **Never infer Waller incorporated Houston from ETJ or council districts.**
2. **Visual:** merge PR #4611 only after protected CI; re-run production Chrome on exact deployed SHA and *visually inspect* all 11 full-page captures plus top-of-page mobile/tablet at 390×844 and 768×1024. Correct screenshot scroll methodology.
3. **Accessibility:** keyboard logical order, visible focus style, menu open/close, touch targets, accessible names and image-alt meaning; use free axe-core where practical and manual WCAG spot check. A simple successful Tab event is not acceptance.
4. **Facts:** audit all featured visitor links and official resources city by city. Address-specific school and taxing-unit advice cannot be certified from city names. Transportation timetable claims require current agency source evidence. Preserve the existing 22 Census values and prior source dates rather than falsely refreshing them.
5. **Links/SEO:** enumerate all rendered internal and official outbound URLs, classify persistent HTTP problems versus transient timeouts and wrong destinations, check JSON-LD and live sitemap for 11 canonical routes, and record final results.
6. **Release:** only reproduce and fix actual site defects in focused guarded PRs; require protected checks and verify exact deployed commit before post-release final acceptance.

**No city is FULLY CERTIFIED on October 10 evidence.** This report is a recoverable worklist, not a substitute for the specified independent checks.

## Additional October 10 independent live-source and imagery recheck

- Independently fetched all eleven live `https://texasdefined.com/city/{slug}` editorial routes through external HTML inspection. Each returned a readable city heading and expected city guide text. This is **HTML availability PASS only**, not a new Chrome QA run or comprehensive interactive test. The city HTML explicitly reflects the Houston Waller ETJ correction.
- The earlier single WhirlyBall Hurst retrieval timeout was **not reproducible on this recheck**: `https://texasdefined.com/destination/whirlyball-hurst` returned readable editorial HTML and current Hurst venue information. Classify the historical timeout as **transient/unconfirmed**, not a permanent 404.
- Fort Worth's canonical `https://texasdefined.com/destination/kimbell-art-museum-fort-worth` returned readable live editorial HTML. The obsolete `/destination/kimbell-art-museum` did not yield a usable page in the retrieval tool, but no current destination 404 is claimed without reliable origin response. The Chrome runner's exact canonical-link checks remain the stronger evidence.
- Compared the exact `hero.src` literals of all eleven `src/data/city-authority-profiles.ts` entries: **11 distinct configured hero URLs (no identical repeated source URLs)**, and every city has a descriptive literal hero `alt`. This is a **static uniqueness check only**, not visual proof of distinct resulting images, relevance, copyright rights, all rendered images or full-page cropping. The existing automated image-load and alt-attribute checks passed at all three viewports.
- Direct external sitemap.xml retrieval failed in the inspection layer rather than returning a confirmed application HTTP status. **Sitemap inclusion remains UNVERIFIED**, not classified a live sitemap defect. Retry via a production browser/HTTP checker with exact status recorded.

No fact source-review timestamps or final certification statuses were advanced by these scoped observations.
