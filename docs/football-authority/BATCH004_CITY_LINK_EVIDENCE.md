# Batch 004: independently restricted Austin city-school reciprocal links
Original research date: October 10, 2026. These links were branch-only at the time; **later production desktop/mobile acceptance passed** in [corrected Chrome #38066125917](https://github.com/keeptxred/TexasDefined/actions/runs/38066125917) and [Oct 11 rerun #38115116709](https://github.com/keeptxred/TexasDefined/actions/runs/38115116709) (72/72 overall, 25/25 sitemap entries). Batch 004 now has 25/25 VERIFIED. This does not establish an independent municipal GIS parcel-boundary verification.

Austin ISD [official school directory](https://www.austinisd.org/schools) supplies each mapped school campus identity in Austin. School district service areas, stadiums and mailing postal city are **not** interchangeable with municipal location.

Twelve campus slugs originally had inbound /city/austin cards and matching school-to-/city/austin links; on October 12 an independent municipal-GIS follow-up identified two additional applicable campus links (Austin Achieve and Vandegrift), documented below:
- `austin` — Austin campus identity; cross-check [Austin ISD directory](https://www.austinisd.org/schools), individual school audit, and school coordinates for municipal jurisdiction before final VERIFIED stage.
- `austin-akins` — Austin campus identity; cross-check [Austin ISD directory](https://www.austinisd.org/schools), individual school audit, and school coordinates for municipal jurisdiction before final VERIFIED stage.
- `austin-anderson` — Austin campus identity; cross-check [Austin ISD directory](https://www.austinisd.org/schools), individual school audit, and school coordinates for municipal jurisdiction before final VERIFIED stage.
- `austin-bowie` — Austin campus identity; cross-check [Austin ISD directory](https://www.austinisd.org/schools), individual school audit, and school coordinates for municipal jurisdiction before final VERIFIED stage.
- `austin-crockett` — Austin campus identity; cross-check [Austin ISD directory](https://www.austinisd.org/schools), individual school audit, and school coordinates for municipal jurisdiction before final VERIFIED stage.
- `austin-eastside` — Austin campus identity; cross-check [Austin ISD directory](https://www.austinisd.org/schools), individual school audit, and school coordinates for municipal jurisdiction before final VERIFIED stage.
- `austin-johnson` — Austin campus identity; cross-check [Austin ISD directory](https://www.austinisd.org/schools), individual school audit, and school coordinates for municipal jurisdiction before final VERIFIED stage.
- `austin-lasa` — Austin campus identity; cross-check [Austin ISD directory](https://www.austinisd.org/schools), individual school audit, and school coordinates for municipal jurisdiction before final VERIFIED stage.
- `austin-mccallum` — Austin campus identity; cross-check [Austin ISD directory](https://www.austinisd.org/schools), individual school audit, and school coordinates for municipal jurisdiction before final VERIFIED stage.
- `austin-navarro` — Austin campus identity; cross-check [Austin ISD directory](https://www.austinisd.org/schools), individual school audit, and school coordinates for municipal jurisdiction before final VERIFIED stage.
- `austin-northeast` — Austin campus identity; cross-check [Austin ISD directory](https://www.austinisd.org/schools), individual school audit, and school coordinates for municipal jurisdiction before final VERIFIED stage.
- `austin-travis` — Austin campus identity; cross-check [Austin ISD directory](https://www.austinisd.org/schools), individual school audit, and school coordinates for municipal jurisdiction before final VERIFIED stage.

Historical October 10 checkpoint: Lake Travis, Westlake, Vandegrift and Austin Achieve were all previously excluded from city mapping out of caution. **This was superseded on October 12 by live official GIS evidence**: Austin Achieve and Vandegrift are within Austin's full-purpose jurisdiction. Lake Travis and Westlake remain outside the full-purpose polygon. County associations remain unchanged.

Code: src/routes/$kind.$slug.lazy.tsx inbound cards; src/routes/texas-high-school-football-teams_.$slug.lazy.tsx outbound Austin link; docs/football-authority/REGISTRY.json /city/austin per-school route. These were originally code-level commitments; the corrected post-deploy Chrome run subsequently passed the real /city/austin page and mapped school desktop/mobile checks. Municipality-specific location inferences still require official GIS corroboration when used beyond the existing restricted campus list.


## Independent municipal GIS verification path — October 12, 2026

City of Austin's [official BOUNDARIES_jurisdictions feature layer](https://services.arcgis.com/0L95CJ0VTaxqcmED/arcgis/rest/services/BOUNDARIES_jurisdictions/FeatureServer/0) and [official open-data metadata](https://data.austintexas.gov/Locations-and-Maps/Jurisdiction-Austin/3pzb-6mbr/about) provide the appropriate city-limit / ETJ boundary source, maintained by Austin Technology Services GIS. The data was updated in October 2026. An Austin school district listing or Austin postal address **does not establish full-purpose Austin municipal jurisdiction**.

**Historical verification gap (now resolved by the current findings below):** At the start of October 12, no independent 12-campus point-in-polygon evidence had been preserved. Later on October 12 we obtained all 16 official point/polygon query results, added the two previously missing Austin city links and documented the exact addresses/coordinates and current live-verification gate below.


## October 12, 2026 — independent live city-jurisdiction findings (CURRENT)

**Official TEA/AskTED school-site geocodes vs City of Austin full-purpose municipal polygon: 16/16 campus point queries completed.** TEA's `Schools_2024_to_2025` FeatureServer records district numbers with a leading apostrophe; an earlier exact numeric-ID query falsely returned zero Austin ISD schools. The live verification instead filters `USER_District_Name = 'AUSTIN ISD'` (127 candidates) and queries the separately sourced charter, Leander, Eanes and Lake Travis campuses by school name. Every one of the 16 individually selected high-school coordinates has a TEA geocoding score of at least 97.34, with exact individual school-site address and point coordinates retained below. We queried the official 2026 Austin jurisdiction layer with each campus point and required `CITY_NAME='CITY OF AUSTIN'`, `JURISDICTION_TYPE_SPECIFICS='FULL PURPOSE'`, and `JURISDICTION_TYPE='FULL'`. Postal Austin addresses or AISD/Leander district boundaries were not accepted as substitutes.

| Batch 004 slug | TEA school-site street address | Longitude, latitude (WGS84) | Score | Official full-purpose result |
|---|---|---|---:|---|
| austin | 1715 W CESAR CHAVEZ | -97.7670585, 30.2736600 | 98.84 | Austin FULL |
| austin-akins | 10701 S 1ST ST | -97.8009750, 30.1487850 | 100 | Austin FULL |
| austin-anderson | 8403 MESA DR | -97.7524155, 30.3749280 | 100 | Austin FULL |
| austin-bowie | 4103 W SLAUGHTER LN | -97.8593445, 30.1868280 | 100 | Austin FULL |
| austin-crockett | 5601 MANCHACA RD | -97.7969295, 30.2136930 | 97.34 | Austin FULL |
| austin-eastside | 900 THOMPSON ST | -97.7094450, 30.2694660 | 100 | Austin FULL |
| austin-johnson (LBJ) | 7309 LAZY CREEK DR | -97.6565925, 30.3133500 | 100 | Austin FULL |
| austin-lasa | 1012 ARTHUR STILES RD | -97.6814865, 30.2580360 | 100 | Austin FULL |
| austin-mccallum | 5600 SUNSHINE DR | -97.7302800, 30.3262020 | 100 | Austin FULL |
| austin-navarro | 1201 PAYTON GIN RD | -97.7080635, 30.3603030 | 100 | Austin FULL |
| austin-northeast | 7104 BERKMAN DR | -97.6911615, 30.3243660 | 100 | Austin FULL |
| austin-travis | 1211 E OLTORF ST | -97.7442615, 30.2336910 | 100 | Austin FULL |
| `austin-achieve` — new city link | 7424 E HWY 290 BUILDING 2 | -97.6802591, 30.3234970 | 100 | **Austin FULL** |
| `austin-vandegrift` — new city link | 9500 MCNEIL DR | -97.8267195, 30.3978960 | 100 | **Austin FULL** |
| austin-lake-travis (no city link) | 3324 RANCH RD 620 S | -97.9699500, 30.3276150 | 100 | No Austin full-purpose polygon |
| austin-westlake (no city link) | 4100 WESTBANK DR | -97.8139800, 30.2760180 | 100 | No Austin full-purpose polygon |

**Result:** 14/14 applicable full-purpose city links and 2/2 deliberately excluded sites are supported by the official point-in-polygon check. On October 12 we added the two missing **reciprocal** city/school links for Austin Achieve and Vandegrift, together with registry coverage and assertions for these additional schools. The new links remain **PENDING PROTECTED MERGE AND LIVE PRODUCTION CHROME RETEST**, not production-certified by the GIS alone. Earlier 12/12 link production acceptance is a historical release checkpoint. TEA's 2024–25 location export is authoritative for that data vintage; verify moves or new campuses against contemporary school listings separately.

**Primary service endpoints:** [TEA official AskTED-derived school campus site points](https://services2.arcgis.com/5MVN2jsqIrNZD4tP/ArcGIS/rest/services/Schools_2024_to_2025/FeatureServer/0) and [City of Austin BOUNDARIES_jurisdictions feature layer](https://services.arcgis.com/0L95CJ0VTaxqcmED/arcgis/rest/services/BOUNDARIES_jurisdictions/FeatureServer/0). The city query returned one `CITY OF AUSTIN / FULL PURPOSE / FULL` polygon for each of 14 included campuses, zero polygons for the two excluded campuses, without network/ArcGIS error in any of the 16 responses. These were direct official service queries, not a claim about the football stadium location, attendance boundaries, school district, ticket sales or municipal services beyond these sites.
