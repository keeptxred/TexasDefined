# Batch 004: independently restricted Austin city-school reciprocal links
Original research date: October 10, 2026. These links were branch-only at the time; **later production desktop/mobile acceptance passed** in [corrected Chrome #38066125917](https://github.com/keeptxred/TexasDefined/actions/runs/38066125917) and [Oct 11 rerun #38115116709](https://github.com/keeptxred/TexasDefined/actions/runs/38115116709) (72/72 overall, 25/25 sitemap entries). Batch 004 now has 25/25 VERIFIED. This does not establish an independent municipal GIS parcel-boundary verification.

Austin ISD [official school directory](https://www.austinisd.org/schools) supplies each mapped school campus identity in Austin. School district service areas, stadiums and mailing postal city are **not** interchangeable with municipal location.

Twelve campus slugs have inbound /city/austin cards and matching school-to-/city/austin links:
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

Excluded from city mapping on purpose: Lake Travis High (unincorporated Travis County); Westlake (West Lake Hills/Eanes jurisdiction), Vandegrift (Leander ISD campus); and Austin Achieve (charter, distinct campus and district addresses). All four retain properly scoped county links without an unverified city inference.

Code: src/routes/$kind.$slug.lazy.tsx inbound cards; src/routes/texas-high-school-football-teams_.$slug.lazy.tsx outbound Austin link; docs/football-authority/REGISTRY.json /city/austin per-school route. These were originally code-level commitments; the corrected post-deploy Chrome run subsequently passed the real /city/austin page and mapped school desktop/mobile checks. Municipality-specific location inferences still require official GIS corroboration when used beyond the existing restricted campus list.


## Independent municipal GIS verification path — October 12, 2026

City of Austin's [official BOUNDARIES_jurisdictions feature layer](https://services.arcgis.com/0L95CJ0VTaxqcmED/arcgis/rest/services/BOUNDARIES_jurisdictions/FeatureServer/0) and [official open-data metadata](https://data.austintexas.gov/Locations-and-Maps/Jurisdiction-Austin/3pzb-6mbr/about) provide the appropriate city-limit / ETJ boundary source, maintained by Austin Technology Services GIS. The data was updated in October 2026. An Austin school district listing or Austin postal address **does not establish full-purpose Austin municipal jurisdiction**.

**Remaining verification:** Independently locate each of the 12 school campus points from an official campus/NCES address, query this official polygon layer for that exact point, record matching jurisdiction type and query date, and check exclusions similarly before asserting 12/12 independently GIS verified. No such 12-point official GIS query evidence is preserved in this project yet, so the municipal GIS item remains explicitly open. The existing 12 source-qualified editorial links and separately verified 72/72 structural browser evidence remain intact; this source discovery does not justify adding or removing campuses on speculation.
