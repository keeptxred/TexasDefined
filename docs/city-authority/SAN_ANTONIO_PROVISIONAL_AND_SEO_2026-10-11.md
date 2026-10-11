# 11-city final QA: San Antonio 2026 GIS provisional comparison and exact-SHA SEO inspection

**October 11, 2026 — research workflow definitions, not completed city certification.**

## San Antonio GIS source discovery, scope, and publication provenance

The City's official [GIS Data portal](https://www.sanantonio.gov/GIS/GISData) identifies **"Cosa Boundary" as the municipal city-limits dataset**, scheduled quarterly, and explicitly lists `ETJ Cosa` and **limited annexation** separately. The same portal links [the COSA Open Data organization](https://opendata-cosagis.opendata.arcgis.com/). City GIS disclaimer warns cartographic maps and GIS data are not legal evidence of a parcel's boundaries.

Additional externally published professional source audits reference `https://services.arcgis.com/g1fRTDLeMgspWrYp/arcgis/rest/services` as **"City's REST Endpoint"** and identify the publisher as the City of San Antonio (COSA), including a [March 18, 2026 data retrieval](https://maps.pape-dawson.com/server2/rest/services/PD_GIS_Webmap/PD_GIS_WebMap__SanAntonio_External/MapServer/20/iteminfo) and [July 27, 2026 zoning retrieval](https://maps.pape-dawson.com/server2/rest/services/PD_GIS_Webmap/PD_GIS_WebMap__SanAntonio_External/MapServer/30/iteminfo). This is corroborative attribution by a geospatial practitioner, **not an official signed city dataset freshness certificate**.

The [COSA ArcGIS boundary layer / COSABoundary/1](https://services.arcgis.com/g1fRTDLeMgspWrYp/arcgis/rest/services/COSABoundary/FeatureServer/1) reports **Data Last Edit Date July 28, 2026** and a municipal polygon, a stronger current-relevance candidate than the unproven `services7.arcgis.com/BUFM2kw4MpxDUJVh` dataset edited March 17, 2026. The helper has therefore replaced the old candidate URL.

**QA status: PROVISIONAL / NOT GIS CERTIFIED.** The new endpoint stays in the research helper's `CANDIDATE_LAYERS`, *not* its authoritative `CITY_LAYERS`. Its geometry is fetched only with the explicit flag `--include-unverified-candidates`. The protected-main GIS workflow now runs a **separate** San Antonio candidate query to `artifacts/city-authority-gis/san-antonio-provisional-2026.json`; its output can substantiate county-intersection candidates but cannot automatically certify Bexar, Comal, Medina as current legal incorporated limits. Do not union ETJ or limited-annexation polygons into its municipal boundary.

**Next check:** inspect returned feature counts, source geometry, exact county intersections against Census BAS 2026, any slivers, data-edit timestamps, name and status. Compare to official San Antonio annexation ordinances and current city 2026 PDF/cartographic line, and verify the mapping of this REST service to the official Open Data item via City GIS metadata/official link. Keep the city GIS category PARTIAL/UNVERIFIED absent those checks.

## New automatic city SEO acceptance research

The stand-alone `scripts/ci/audit-city-authority-seo.mjs` inventories production `/city/{slug}` for all eleven cities. It waits for the exact protected production SHA in its workflow, checks live HTTP status, one visible H1, canonical URL, robots indexability, `City` Schema.org graph node named for that city, `BreadcrumbList` with third crumb equal to the canonical city URL, and **exact XML `<loc>` inclusion** in the primary `/sitemap.xml`. It retains structured-node summaries, redirect/http statuses, missing sitemap links, parse errors and city-level needs-review. A successful workflow execution is **not a verified 11/11 SEO pass** until the machine-readable artifact is downloaded and examined. Search Engine indexing, Google Search Console impression/coverage, rich-result qualification and claim accuracy are not implied.

The exact SHA-based production audit is free, retains JSON for 30 days and is separate from existing passing 33/33 Chrome, 33/33 automated axe, current GIS research and manual visual checks. It makes no unverified SEO/factual PASS claim.

## Acceptance remains incomplete

At last fully inspected production artifact (commit `8ec1831af195c6b8c7c5f4c25963d590aafaee20`), Chrome and automated axe had 33/33 viewport render passes with 0 identified WCAG-tagged axe failures; actual full manual accessibility, exhaustive content and links, all GIS/legal boundary acceptances and production structured data/sitemap results were not independently complete. All city FULLY CERTIFIED statuses remain **PARTIAL** until their entire per-city evidence set is present. Preserve historical evidence and review dates.

## Post-merge actual San Antonio GIS execution — October 11

Previous "research not executed" descriptions above are historical. The [protected-main GIS workflow #38139303238](https://github.com/keeptxred/TexasDefined/actions/runs/38139303238) has **completed SUCCESS** on `8a213e2919c83c14b25ed4d6bdd3636b1ac8b365`; [actual artifact #11701994875](https://github.com/keeptxred/TexasDefined/actions/runs/38139303238/artifacts/11701994875) downloaded and inspected.

`san-antonio-provisional-2026.json` reports one polygon with source `editingInfo.dataLastEditDate=1791172943843`, **October 5, 2026 04:02:23 UTC**, later than the previously crawled July 28 source metadata. Census BAS 2026 county intersection: **Bexar 1395.91942 km², Medina 1.43018 km², Comal 0.02679 km²**; expected three counties match. **Comal is only ~2.679 hectares** and could be a valid narrow annexation or a geometry tolerance issue; it must be manually checked against controlling municipal ordinances before GIS sign-off. The geometry is **PROVISIONAL_UNVERIFIED_SOURCE**, not current legal-boundary certification. Do not conflate its polygon with ETJ. No change to the published county list or date of fact verification is warranted solely by this machine comparison.

All eleven city polygon studies now return matching substantial candidates, including Austin's 2026 corrected full-purpose source. Still **zero cities FULLY CERTIFIED** under the required GIS/legal, full manual visual and accessibility, claim-by-claim factual and SEO gates.

### Independent 2016 municipal annexation context for tiny Comal overlap

[City of San Antonio December 1, 2016 City Council published agenda, p.2, item 4B](https://webapp9.sanantonio.gov/FileNetArchive/%7B45C2920F-BE51-4061-BA1B-6D6146F652F0%7D/%7B45C2920F-BE51-4061-BA1B-6D6146F652F0%7D.pdf) explicitly describes a proposed **full-purpose annexation of the US 281 Commercial Corridor crossing Bexar and Comal counties**, with 37 excluded Comal parcels and three excluded Bexar parcels, and specifies ordinance reference `2016-12-01-0898` and an effective date proposed for December 31, 2016. This is an **official municipal contemporaneous source establishing historical annexation intent and county geography**, not a 2026 parcel-verified city-line survey. It supports further examination of the small `0.02679 km²` Comal GIS overlap as possibly legally meaningful rather than dismissing it automatically as a sliver. The original ordinance adoption/status, annexation plats and any subsequent de-annexation/ETJ changes still need independent legal/current verification; the city's current `COSABoundary` GIS candidate alone cannot settle them. **GIS PARTIAL** retained; no ungrounded promotion of specific Comal addresses to San Antonio legal city residency.
