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

**Important:** Script committed is not evidence it has successfully retrieved geometry. No live municipal–county polygon overlay was completed in this execution environment. The script does not auto-issue GIS PASS; all eleven remain **GIS UNVERIFIED**. Only San Antonio remains without a independently confirmed, current official municipal vector-layer endpoint; a map PDF and other published boundary layers exist but current authoritative vector ownership/vintage still needs scrutiny. Confirm geometry dates and limited-purpose classifications before approving a GIS result. Census county geography is BAS 2026, not necessarily the date/precision of municipal service layers.

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

- **Published county claim:** Travis / Williamson / Hays. **GIS evidence:** Source layer now independently found; geometry not run; source endpoint existence does not establish a polygon/county overlay; **UNVERIFIED**.
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

## Additional primary GIS source discovery — October 10, 2026

Three previous vector-source gaps have been resolved **at the source discovery level only** (not at spatial overlay level):

- **Austin:** official City of Austin-hosted [Full Purpose municipal polygon](https://services.arcgis.com/0L95CJ0VTaxqcmED/ArcGIS/rest/services/City_of_Austin_WFL1/FeatureServer/0) explicitly separates city full-purpose limits from other jurisdiction categories (ETJ, limited purpose). A separate City of Austin [jurisdiction layer](https://services.arcgis.com/0L95CJ0VTaxqcmED/arcgis/rest/services/BOUNDARIES_jurisdictions/FeatureServer/0) identifies limited-purpose types. **Only full-purpose** added as baseline; limited-purpose intersections need separate review.
- **Corpus Christi:** official City of Corpus Christi GIS [CITYLIMITS layer 2](https://ccpublicgis.cctexas.com/server01/rest/services/CC_GENERAL_SERVICES/CC_GENERAL_SERVICES/MapServer/2) is a published polygon layer with a `CITY_LIMIT` field, distinct from zoning and subdivisions. Geometry not overlaid.
- **Lubbock:** city's [official REST services directory](https://www.mylubbock.us/321/REST-Services) links the city-maintained [City Limit polygon layer 13](https://pubgis.ci.lubbock.tx.us/server/rest/services/Layers/ParcelMap/MapServer/13) including `LAST_ANNEX_DATE` and `LAST_UPDATE` attributes. No spatial comparison run yet.

Ten of eleven official city-limit **source locations** are now identified; current San Antonio geometry endpoint needs authoritative current-year layer/vintage confirmation. Source discovery does **not** confer GIS PASS. The research workflow will capture geometry artifacts only when merged into protected main and permitted to run. Dates and legal relevance need independent scrutiny.

### Source-access and vintage cautions from independent REST recheck

On October 10, independent page retrieval of [Dallas CityLimits ArcGIS REST](https://gis.dallascityhall.com/arcgis/rest/services/Basemap/CityLimits/MapServer/0) returned an ArcGIS Web Adaptor **“Could not access any server machines”** page. This is a *GIS-source availability failure*, not a confirmed error in a TexasDefined city page and not proof that Dallas municipality geography is wrong. The [Fort Worth municipal candidate](https://gis.fortworthtexas.gov/gisimage/rest/services/Mapping/Report_Areas_Published/MapServer/3) and [Plano municipal candidate](https://maps.planogis.org/arcgiswad/rest/services/OpenData/MunicipalBoundary/MapServer/0) could not be independently opened in the external retrieval layer; their availability is **UNVERIFIED**, not definitively down. The City of San Antonio-associated [pdsCosaBoundary layer](https://services.arcgis.com/g1fRTDLeMgspWrYp/ArcGIS/rest/services/pdsCosaBoundary/FeatureServer/1) is available but its source metadata reports a **2022 last-data-edit date** and mostly 2014–15 annexation citations; **not accepted as current 2026 municipal geometry**. No city gets GIS PASS for merely locating a URL.

### San Antonio 2026 polygon source — provenance remains unverified

A new [COSA City Limits polygon layer](https://services7.arcgis.com/BUFM2kw4MpxDUJVh/ArcGIS/rest/services/COSA_City_Limits/FeatureServer/0) lists dataset update **March 17, 2026** and publication **April 7, 2026**, with 2026 editing metadata. However, its ArcGIS organization publisher could not be independently proven to be the City of San Antonio. The official [San Antonio GIS data portal](https://www.sanantonio.gov/GIS/GISData) states that the city's `Cosa Boundary` dataset is updated quarterly and explicitly distinguishes city limits from ETJ; matching the newer hosted layer to that city-owned authoritative dataset is still necessary. The GIS helper adds this service only behind `--include-unverified-candidates` and marks resulting intersections **PROVISIONAL_UNVERIFIED_SOURCE**. The San Antonio polygon and county intersection **remain UNVERIFIED**.


## October 10 additional GIS source-type safety correction

Review of [the City of Austin's REST layer definition](https://services.arcgis.com/0L95CJ0VTaxqcmED/ArcGIS/rest/services/City_of_Austin_WFL1/FeatureServer/0?f=pjson) shows that this is a **mixed-jurisdiction polygon source**, containing coded `JURISDICTION_TYPE` values for `FULL`, `LTD`, `ETJ` and other cities. Accordingly, the GIS helper was corrected before acceptance: Austin's primary city-area query is `CITY_NAME = 'Austin' AND JURISDICTION_TYPE = 'FULL'`; its limited-purpose query is separate `CITY_NAME = 'Austin' AND JURISDICTION_TYPE = 'LTD'`. No ETJ/other city polygons are included in the Austin full-purpose intersection. Houston's [official layer](https://mycity2.houstontx.gov/gisweb01/rest/services/HoustonMap/Administrative_Boundary/MapServer/0?f=pjson) uses `SERVICE_TY = 'FULL'` and `SERVICE_TY = 'LIMITED'`, now queried separately. Municipal full-purpose county comparisons still require separate human evaluation of *limited-purpose* annexations, especially Houston/Waller. This is a **source-method safety fix**, not evidence of a completed geometry overlay.


## City-limit source corrections: Dallas, Fort Worth, Arlington

An independent REST-directory review identified that the first Dallas URL did not expose a usable feature layer at its original path. The helper now uses Dallas's [City Limit polygon feature layer](https://gis.dallascityhall.com/arcgis/rest/services/Pbw_public/ROWMSReferenceLayers/MapServer/2) and requires `CITY='Dallas'` instead. Fort Worth now uses the municipal Development Services [Corporate City Limits layer](https://mapit.fortworthtexas.gov/ags/rest/services/CIVIC/OpenData_Boundaries/MapServer/0), which explicitly records full-purpose and limited-purpose annexations. These are queried separately using `DESIGNATION='Full Purpose'` and `DESIGNATION='Limited Purpose'`, and ETJ is **not** included. Arlington's [Municipal Boundary layer](https://gis2.arlingtontx.gov/agsext2/rest/services/OpenData/OD_PoliticalBoundary/MapServer/1) includes a municipality-name field, so the analysis explicitly filters `MUNICIPALNAME='Arlington'`. Before considering any spatial result, inspect feature counts, the actual designation values, and returned geometries; no city GIS PASS is granted by these source updates alone. No status upgraded.


### Limited-purpose county intersection evidence retained separately

For Houston, Fort Worth, and Austin, full-service/full-purpose polygons alone can miss legally distinct *limited-purpose* annexations, while naive union with ETJ overstates the city. The research helper now computes and records **two separate county-intersection inventories**: primary full-purpose municipal geometry, and limited-purpose geometry explicitly labeled as such, each with its own county query digest and small-sliver classification. Neither set is automatically conflated with ETJ or regarded as legal parcel-level proof. A substantive limited-purpose overlap must be considered individually before agreeing with the city's published county list. No actual geometry execution or GIS PASS is asserted by this code change.

## October 11: independently inspected production post-fix artifacts — exact release 8ec1831

**Proven deployment:** [#38112038581](https://github.com/keeptxred/TexasDefined/actions/runs/38112038581) SUCCESS attempt 1 for commit `8ec1831af195c6b8c7c5f4c25963d590aafaee20`, which merged [PR #4622](https://github.com/keeptxred/TexasDefined/pull/4622). This supersedes the earlier "proposed, not deployed" status of those contrast/ARIA/external-link remedies; it does **not** prove newer concurrent `main` commits are deployed.

**Automated accessibility, link, and browser evidence:**

- [Axe and rendered-link workflow #38112038646](https://github.com/keeptxred/TexasDefined/actions/runs/38112038646), SUCCESS, actual [artifact #11691837851](https://github.com/keeptxred/TexasDefined/actions/runs/38112038646/artifacts/11691837851) inspected at `independent-review.json`: 33/33 production city + viewport pages rendered HTTP 200; **0 axe-core WCAG-tagged violation instances** (formerly 124), **0 axe inconclusive review nodes** (formerly 33). Rule coverage is automated; not human WCAG certification.
- **222 distinct rendered links** inventoried in that exact release. **37 remain unconfirmed or require redirect-context review**, chiefly Census.gov 403, Wikimedia Commons 429, city/agency 403 or 429. They must not be labeled permanent dead links based on anti-bot responses. **No `PERSISTENT_HTTP_CANDIDATE_REVIEW` 404/410 remained** for the formerly broken three CityPASS and El Paso GIS URLs in this production artifact. The official CityPASS destinations are now intentionally non-affiliate fallbacks, with no click attribution or commission claim, until partner-approved live tracked links are independently reissued.
- [Chrome workflow #38112038659](https://github.com/keeptxred/TexasDefined/actions/runs/38112038659), SUCCESS, actual [artifact #11692037648](https://github.com/keeptxred/TexasDefined/actions/runs/38112038659/artifacts/11692037648) inspected. **All 33/33 case check dictionaries entirely PASS**, zero runtime page errors, zero reported broken images, zero internal-link probe problems, zero horizontal overflow. The screenshot-scroll-top assertion reports PASS and `screenshotScrollY=0` for every viewport; **11 complete desktop page-image files** retained.
- **Visual inspection actually performed:** constructed contact sheets from those retained files and inspected 11 mobile 390×844 first-screen captures, 11 desktop 1440×900 first-screen captures and top portions of all 11 full-page desktop images. Headers, H1s, main introductory content, and navigation display consistently without an obvious shared clipping, overflow, missing logo, or dead image in the examined areas. This is **LIMITED MANUAL VISUAL PASS**, *not* full-page manual review of every section; it does not cover individually exercised tablet interactions, alt appropriateness, focus contrast states, full screen-reader flows or all above/below-fold imagery.

**Reconciled acceptance matrix; fields below deliberately distinguish an automated result from independent final certification:**

| City | Chrome & functionality | Axe automatic | Manual visual & ADA | Municipal GIS | Population | Visitor, school, tax, utilities, transit | Official/external links | Schema/sitemap | FULL acceptance |
|---|---|---|---|---|---|---|---|---|---|
| Houston | PASS (3/3) | PASS (3/3) | PARTIAL | PARTIAL (full Harris/Fort Bend/Montgomery; Waller limited-purpose review) | PASS (historic Census ledger) | PARTIAL | PARTIAL | UNVERIFIED | **PARTIAL** |
| Dallas | PASS (3/3) | PASS (3/3) | PARTIAL | PARTIAL (candidate county list agrees) | PASS | PARTIAL | PARTIAL | UNVERIFIED | **PARTIAL** |
| Fort Worth | PASS (3/3) | PASS (3/3) | PARTIAL | PARTIAL (candidate county list agrees; small sliver) | PASS | PARTIAL | PARTIAL | UNVERIFIED | **PARTIAL** |
| Austin | PASS (3/3) | PASS (3/3) | PARTIAL | PARTIAL (official 2026 Austin FULL overlays Travis/Williamson/Hays; Bastrop LTD 0.00554 km² sliver requires review) | PASS | PARTIAL | PARTIAL | UNVERIFIED | **PARTIAL** |
| San Antonio | PASS (3/3) | PASS (3/3) | PARTIAL | UNVERIFIED (current city-published vector provenance not established) | PASS | PARTIAL | PARTIAL | UNVERIFIED | **PARTIAL** |
| El Paso | PASS (3/3) | PASS (3/3) | PARTIAL | PARTIAL (El Paso county candidate) | PASS | PARTIAL | PARTIAL | UNVERIFIED | **PARTIAL** |
| Arlington | PASS (3/3) | PASS (3/3) | PARTIAL | PARTIAL (Tarrant candidate) | PASS | PARTIAL | PARTIAL | UNVERIFIED | **PARTIAL** |
| Hurst | PASS (3/3) | PASS (3/3) | PARTIAL | PARTIAL (Tarrant candidate) | PASS | PARTIAL | PARTIAL | UNVERIFIED | **PARTIAL** |
| Corpus Christi | PASS (3/3) | PASS (3/3) | PARTIAL | PARTIAL (coastal county candidates) | PASS | PARTIAL | PARTIAL | UNVERIFIED | **PARTIAL** |
| Plano | PASS (3/3) | PASS (3/3) | PARTIAL | PARTIAL (Collin/Denton candidates) | PASS | PARTIAL | PARTIAL | UNVERIFIED | **PARTIAL** |
| Lubbock | PASS (3/3) | PASS (3/3) | PARTIAL | PARTIAL (Lubbock candidate) | PASS | PARTIAL | PARTIAL | UNVERIFIED | **PARTIAL** |

**GIS first-run primary evidence:** [#38111829821](https://github.com/keeptxred/TexasDefined/actions/runs/38111829821) and [artifact #11691816818](https://github.com/keeptxred/TexasDefined/actions/runs/38111829821/artifacts/11691816818), with nine full-purpose county candidate sets matching the stated counties. Waller intersects Houston **limited-purpose** geometry by approximately **0.25475 km²**, which is not proof of full municipal services there. The new City of Austin source query is merged in [PR #4623](https://github.com/keeptxred/TexasDefined/pull/4623) at `136dedab3b753bd8ce09b76ec218506ea30e70a2`; **its new [GIS #38114748322](https://github.com/keeptxred/TexasDefined/actions/runs/38114748322) was still queued when this addendum was authored**, so do not infer corrected Austin result until actual JSON is downloaded and independently inspected.

**Remaining global acceptance gates:** independent annual-vintage/legal municipal boundary review (not merely GIS candidate overlap), San Antonio's current city-owned vector source or an explicitly lower-confidence government fallback, claim-by-claim visitor/municipal transit/relocation/tax/source confirmation, fully manual WCAG+whole-page visual/touch/menu/accessibility checks, and actual city schema/sitemap confirmation. No city's complete category suite meets the specified FULLY CERTIFIED threshold. Historical fact source dates were not silently updated.

### October 11 Austin source-repair research result (supersedes pending note above)

[GIS run #38114748322](https://github.com/keeptxred/TexasDefined/actions/runs/38114748322) **SUCCESS**, [artifact #11692568370](https://github.com/keeptxred/TexasDefined/actions/runs/38114748322/artifacts/11692568370) independently downloaded and parsed: actual municipal full-purpose overlays Travis 706.22480 km², Williamson 35.49048 km², Hays 14.34736 km², exactly as published. Separate limited-purpose Hays 1.11587, Travis 92.64205, Williamson 18.90183 km², and Bastrop 0.00554 km² edge sliver are explicitly **NOT merged into full-purpose counties**. The revised legal/jurisdiction GIS status of Austin is **PARTIAL**, not UNVERIFIED, and is **not PASS** until boundary vintage, county sliver and limited-purpose annexation meanings are manually reconciled. Detailed source and query evidence in [first municipal spatial results](FIRST_MUNICIPAL_COUNTY_SPATIAL_RESULTS_2026-10-10.md). San Antonio current city-owned polygon remains UNVERIFIED; ten other county candidate lists now agree with the existing published list.


## October 11 independent full-page screenshots — lazy-image evidence gap

The retained [full-page Chrome artifact #11692037648](https://github.com/keeptxred/TexasDefined/actions/runs/38112038659/artifacts/11692037648) was manually re-opened and **all eleven entire desktop captures** inspected side by side, not merely their top folds. Visible sections, content grids, navigation, concluding FAQ and footer are consistently arranged with no obvious document-wide horizontal cropping or large text overlay. However, several body hero-photo areas display **large blank muted rectangles** in the retained full-page captures: notably Houston, Fort Worth, and Austin, while other cities' photos render normally.

**Interpretation: screenshot-methodology defect, NOT YET a reproduced user-facing image failure.** The existing Chrome runner sampled `document.images` and checked only images already `complete`. Browser lazy images not yet scrolled into view could be omitted from its broken-image count, and Playwright `fullPage: true` screenshots do not necessarily trigger their lazy loading. The successful `images: PASS` was therefore **insufficient evidence that every below-fold image loaded**.

A focused QA runner change now forces every `main img` through the normal browser loader for desktop before its retained full-page screenshot. It records `src`, `alt`, `naturalWidth`, complete/timeout/failure status for each photo and **fails `fullPageImageReadiness`** on actual missing/broken images, rather than silently accepting empty source geometry. Original image URLs are not rewritten, attribution is preserved, and no speculative content fixes are made without a reproduced load defect. **This test change is pending protected PR + live run**; only post-deployment artifacts can establish whether the blank rectangles were capture timing or remote Wikimedia HTTP errors.

Do not award complete full-page visual or all-image PASS until the new image readiness results are actually inspected and any confirmed problem is fixed.

## October 11 — San Antonio provisional 2026 boundary overlay executed, all eleven geographic candidates compared

[GitHub Actions municipal GIS #38139303238](https://github.com/keeptxred/TexasDefined/actions/runs/38139303238) **SUCCESS** on merged commit `8a213e2919c83c14b25ed4d6bdd3636b1ac8b365`; [artifact #11701994875](https://github.com/keeptxred/TexasDefined/actions/runs/38139303238/artifacts/11701994875) independently downloaded and parsed, including the separate `san-antonio-provisional-2026.json`.

The COSA City of San Antonio–attributed polygon [FeatureServer/1](https://services.arcgis.com/g1fRTDLeMgspWrYp/arcgis/rest/services/COSABoundary/FeatureServer/1) returned **1 multi-polygon feature**, equal-area area **1,397.37638 km²**, source metadata `editingInfo.dataLastEditDate=1791172943843` (October 5, 2026 at 04:02:23 UTC), and recorded SHA-256 feature/source digests. Its Census BAS 2026 polygon intersection candidates: **Bexar 1,395.91942 km², Medina 1.43018 km², Comal 0.02679 km²**, matching the published Bexar/Comal/Medina list. Wilson, Kendall, Guadalupe, Bandera, Atascosa had zero measured overlap. **Comal's very small ~0.02679 km² intersection is high-priority sliver/annexation manual-review evidence; the researcher’s 0.01 km² category is not a legal boundary threshold.**

**Status update:** GIS *geometric county candidate comparisons complete 11/11*, with 11/11 matching existing page county lists at the research method's threshold; **full GIS/legal acceptance remains PARTIAL** for all 11. San Antonio’s source is explicitly tagged `PROVISIONAL_UNVERIFIED_SOURCE` until its ArcGIS publishing organization and October 2026 data vintage are matched directly to the City [official GIS open-data catalog](https://www.sanantonio.gov/GIS/GISData) and controlling annexation ordinances. Separate ETJ/limited-purpose overlaps and other cities' small boundary slivers remain subject to independent review; no address-level residency, tax or services conclusions follow from these results. No old facts' review dates have been silently reset.


## October 11 — independently inspected full live SEO schema/sitemap results

[Exact production QA run #38139303220](https://github.com/keeptxred/TexasDefined/actions/runs/38139303220) **SUCCESS**, on commit `8a213e2919c83c14b25ed4d6bdd3636b1ac8b365`. Its [JSON artifact #11702254597](https://github.com/keeptxred/TexasDefined/actions/runs/38139303220/artifacts/11702254597) was downloaded, parsed and **each of the eleven results individually inspected**.

| SEO category | Independently observed result |
|---|---|
| Live production city route HTTP 200 | **11/11** |
| Canonical equal `https://texasdefined.com/city/{slug}`, H1 and indexable robots | **11/11** |
| Valid parseable `City` schema node with exact city name and canonical URL | **11/11** |
| Valid `BreadcrumbList` with third item URL equal canonical | **11/11** |
| Exact city URL `<loc>` in production `/sitemap.xml` | **11/11** |
| Sitemap status and size | **HTTP 200**, `application/xml; charset=utf-8`, **3,118 `<loc>` entries**, **357,936 bytes**, no fallback header |
| Diagnostics unresolved by this automated check | **0** (`needsReview: []`) |

All eleven city **SEO canonical/structured-data/primary sitemap categories may be marked PASS for this exact released commit**. This proves neither actual Google/Bing indexing nor Search Console impressions, rich-results appearance, nor accuracy of all source-fact claims. The City schema `sameAs` entries point to each city government website; future legal ownership and manual factual changes must still be reviewed separately. Site-wide latest main can advance concurrently; exact commit is retained here and rechecks are warranted after future material route/schema changes.

The overall eleven-city status remains **PARTIAL / 0 FULLY CERTIFIED** because legal municipal GIS, exhaustive current visitor/school/tax/utility/transit facts, 37 original ambiguous external destinations, full manual screen-reader/touch/keyboard and below-fold image readiness are not all accepted. Do not reset historic factual review dates.
