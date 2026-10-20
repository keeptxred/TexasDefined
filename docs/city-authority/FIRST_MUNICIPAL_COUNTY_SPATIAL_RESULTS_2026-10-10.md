# TexasDefined eleven-city municipal GIS: first actual polygon overlay, 2026-10-10

**Status: NINE CITY FULL-PURPOSE COUNTY-INTERSECTION CANDIDATES MATCH PUBLISHED CLAIMS; ELEVEN-CITY GEOGRAPHY IS NOT FULLY CERTIFIED.**

## Immutable execution evidence

- Existing merged source workflow `.github/workflows/verify-city-municipal-gis.yml` ran on commit `005423744b0627ff9cdfef79d4a5152bdd785817`.
- [GitHub Actions #38111829821](https://github.com/keeptxred/TexasDefined/actions/runs/38111829821), **SUCCESS** as a *research execution*, not factual legal certification. [Retained JSON artifact #11691816818](https://github.com/keeptxred/TexasDefined/actions/runs/38111829821/artifacts/11691816818) (`research.json`; expires according to artifact retention).
- Source polygons: city-maintained full-purpose (and where available separately limited-purpose) municipal polygons, compared with official U.S. Census [TIGERweb BAS 2026 County layer 29](https://tigerweb.geo.census.gov/arcgis/rest/services/TIGERweb/State_County/MapServer/29) **January 1, 2026 vintage**, in equal-area EPSG:5070. Report retains source URLs, metadata SHA-256, geometry payload hashes, polygons/areas and categorized county intersections; >0.01 km² is a *candidate* not a legal threshold. Geometry cleanup may obscure or create very small topological differences.
- **DO NOT** assign date-verified PASS to legal jurisdiction/limited-purpose annexations from the polygons alone. Address-level jurisdiction must use primary land/title/municipal officials; ETJ is not incorporated territory.

## Recorded outcomes by municipality

| City | Full-purpose 2026 GIS county candidates | Published county comparison | Extra observations | GIS final |
|---|---|---|---|---|
| Houston | Harris, Fort Bend, Montgomery | Exact candidate match | 0.00979 km² Brazoria edge sliver; **separate limited-purpose overlay includes Waller 0.25475 km²**, plus Harris, Fort Bend, Montgomery | **PARTIAL** |
| Dallas | Dallas, Collin, Denton, Kaufman, Rockwall | Exact candidate match | Geometry 993.63246 km²; boundary and small county arms require editorial review | **PARTIAL** |
| Fort Worth | Tarrant, Denton, Parker, Johnson, Wise | Exact candidate match | 0.00033 km² Dallas edge sliver, separate limited-purpose area 22.09572 km² in Parker, Tarrant and Denton | **PARTIAL** |
| Austin | Not obtained on first execution | Cannot compare | Source query returned no object IDs: see new source correction below | **UNVERIFIED** |
| San Antonio | Not obtained on first execution | Cannot compare | Source/provenance of 2026 provisional polygon not established as city-maintained | **UNVERIFIED** |
| El Paso | El Paso | Exact candidate match | 671.53884 km² within El Paso County polygon | **PARTIAL** |
| Arlington | Tarrant | Exact candidate match | 257.54576 km² intersection | **PARTIAL** |
| Hurst | Tarrant | Exact candidate match | 25.82519 km² intersection | **PARTIAL** |
| Corpus Christi | Nueces, Kleberg, San Patricio, Aransas | Exact candidate match | Water/bay/island geometry and county jurisdiction must be reviewed independently | **PARTIAL** |
| Plano | Collin, Denton | Exact candidate match | 180.04358 km² Collin and 6.70408 km² Denton intersection | **PARTIAL** |
| Lubbock | Lubbock | Exact candidate match | 377.93486 km² intersection | **PARTIAL** |

## Houston limited-purpose jurisdiction finding — editorial caution

Houston's City-published GIS distinguishes **`SERVICE_TY='FULL'`** (full-service incorporated limits) from **`SERVICE_TY='LIMITED'`** polygons. Waller County is **not** a substantial full-purpose overlap under the selected data; however, the separate limited-purpose category overlaps Waller by approximately **0.25475 km²** (about 25.475 hectares). The [Houston Administrative Boundary service](https://mycity2.houstontx.gov/gisweb01/rest/services/HoustonMap/Administrative_Boundary/MapServer/0) and [Census county boundaries](https://tigerweb.geo.census.gov/arcgis/rest/services/TIGERweb/State_County/MapServer/29) support this geometry **candidate**. This does not establish legal residency, voting eligibility, utilities, postal city name or governmental service for any individual Waller address. The existing conservative published Houston note in `city-authority-profiles.ts` distinguishing Waller ETJ from full-service county list **must not be undone**, although a further independently validated limited-purpose qualifier may be appropriate. Contact City Planning / annexation records if the precise 0.255 km² overlap affects published policy. No source review date advanced.

## Austin source correction proposed with this report

The first script used the City of Austin [City_of_Austin_WFL1/0](https://services.arcgis.com/0L95CJ0VTaxqcmED/ArcGIS/rest/services/City_of_Austin_WFL1/FeatureServer/0) **'Full Purpose'** dataset but further restricted it to `CITY_NAME = 'Austin' AND JURISDICTION_TYPE = 'FULL'`, which returned **no feature IDs** (first live run). This was not a county mismatch: it was an empty source query. A newer City GIS-managed [BOUNDARIES_jurisdictions/0](https://services.arcgis.com/0L95CJ0VTaxqcmED/arcgis/rest/services/BOUNDARIES_jurisdictions/FeatureServer/0) has recently updated polygon features and explicit type codes `FULL` and `LTD`, and is linked by the [official Austin Open Data jurisdiction catalog](https://data.austintexas.gov/Locations-and-Maps/Jurisdiction-Austin/3pzb-6mbr/about). The helper now filters this definitive *City of Austin jurisdiction dataset* by `JURISDICTION_TYPE = 'FULL'` for main limits, and independently `JURISDICTION_TYPE = 'LTD'` for limited-purpose. ETJ types remain excluded. This fixes the specific empty-query problem in source selection logic, but **the modified query is not certified until a new workflow run actually returns its polygon intersection**.

## Required remaining work

- Wait for the corrected Austin overlay to execute; inspect its actual JSON, county overlaps, metadata and limited-purpose record, not just workflow success.
- Find current City of San Antonio-owned `Cosa Boundary` polygon with current vintage and independently compare it with published Bexar, Comal, Medina claims. Provisional third-party ArcGIS sources do not establish authoritative boundaries; current [City GIS data](https://www.sanantonio.gov/GIS/GISData) is updated quarterly.
- Obtain legal/publisher understanding of Houston's 0.255 km² Waller limited-purpose and review Fort Worth/Dallas and Houston very small overlaps as likely edge slivers, not auto-promote into published jurisdictions.
- Confirm appropriate city service/annexation dates and manual visual/spatial inspection; do not call the nine geometrically matching county lists fully verified automatically.
- Keep separate **33-viewport accessibility, visual, schema, links and full factual verification** tasks open until independently retested and documented.

**Verdict remains NOT FULLY ACCEPTED for any city.**

## October 11 follow-up — Austin county candidate overlay successfully executed

The historical **"Austin not obtained"** row above is superseded for spatial-research purposes (not legal acceptance) by the actual [protected research workflow #38114748322](https://github.com/keeptxred/TexasDefined/actions/runs/38114748322), **SUCCESS on commit `136dedab3b753bd8ce09b76ec218506ea30e70a2`**, [machine-readable artifact #11692568370](https://github.com/keeptxred/TexasDefined/actions/runs/38114748322/artifacts/11692568370). The exact `research.json` was downloaded and inspected, not inferred from a workflow green check.

Official City of Austin [BOUNDARIES_jurisdictions layer](https://services.arcgis.com/0L95CJ0VTaxqcmED/arcgis/rest/services/BOUNDARIES_jurisdictions/FeatureServer/0) `JURISDICTION_TYPE='FULL'` returned true municipal polygons (total 756.06265 km²). EPSG:5070 area county intersections:

| Jurisdiction | Travis | Williamson | Hays | Bastrop |
|---|---:|---:|---:|---:|
| Full-purpose incorporated research geometry, km² | 706.22480 | 35.49048 | 14.34736 | none |
| Separate `LTD` limited-purpose research geometry, km² | 92.64205 | 18.90183 | 1.11587 | 0.00554 (edge sliver) |

**Austin's full-purpose substantial county candidate set exactly matches the published Travis, Williamson, Hays list.** Bastrop is **not** a substantial full-purpose candidate in this GIS dataset; the small `LTD` Bastrop overlap is labeled **SLIVER_REVIEW**, not a reason to silently add Bastrop to the city's general county description. Full-purpose and limited-purpose polygons are not unioned with ETJ. All source geometry and county payload digests are retained in the referenced JSON artifact.

**Revised GIS tally: TEN of ELEVEN municipal full-purpose county sets match existing published county lists by the 0.01 km² source-method candidate threshold.** This is strong analytical support, but still **GIS PARTIAL**, not full legal/vintage certification for any city. San Antonio remains **UNVERIFIED** for an up-to-date city-published vector source. The City's [official GIS Data catalog](https://www.sanantonio.gov/GIS/GISData) describes quarterly city limits publication; the City's 2026 [ETJ and city-limit map](https://www.sanantonio.gov/Portals/0/Files/GIS/Maps/SAETJ%20CCD%202026%2054x58.pdf), edited April 8, 2026, is supporting cartography but is **not** a machine-verifiable current municipal polygon source for an automated intersection. A 2026 independent TxGIO/Comptroller municipal-sales-tax layer may corroborate county candidates but must not be equated with primary city-limit legal evidence.

No population, transit, official attraction or other fact verification dates were advanced by this GIS execution. Review slivers and annexation law before awarding a municipal GIS PASS.
