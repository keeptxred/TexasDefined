# San Antonio 2026 municipal GIS boundary — independent source and county-overlay research

**Status: NEW MUNICIPAL VECTOR CANDIDATE SELECTED, NOT YET FULLY CERTIFIED.**

## Research source
- Polygon REST endpoint: [COSA Boundary layer 1](https://services.arcgis.com/g1fRTDLeMgspWrYp/arcgis/rest/services/COSABoundary/FeatureServer/1), `geometryType=esriGeometryPolygon`, City of San Antonio-associated ArcGIS Online service.
- The service metadata documents `editingInfo.dataLastEditDate=1788753739599` (September 2026, timestamp in milliseconds) and individual `Name`, `Acres` and `SqMiles` fields. Layer has a GIS shape and supports GeoJSON queries.
- Independent publisher corroboration: [outside GIS consumer acknowledging the city's REST org URL and citing City of San Antonio, 2026](https://maps.pape-dawson.com/server2/rest/services/PD_GIS_Webmap/PD_GIS_WebMap__SanAntonio_External/MapServer/30/iteminfo). This **does not substitute for an official city ownership record.**
- The City's [2026 ETJ/city limits public map](https://www.sanantonio.gov/Portals/0/Files/GIS/Maps/SAETJ%20CCD%202026%2054x58.pdf) is dated April 8, 2026 and differentiates city limits, ETJ and limited-purpose annexation. The City's [official GIS data page](https://www.sanantonio.gov/GIS/GISData) directs the public to its GIS Open Data catalog and cautions that city data is only general planning information.
- The prior unverified [COSA City Limits third-party layer](https://services7.arcgis.com/BUFM2kw4MpxDUJVh/ArcGIS/rest/services/COSA_City_Limits/FeatureServer/0) remains in `CANDIDATE_LAYERS` **only as optional unverified research**, and is never automatically conflated with the new city-associated layer.

## Script change and evidentiary boundary
`scripts/data/verify-city-municipal-gis.py` now queries `COSABoundary/FeatureServer/1` for San Antonio rather than returning missing source. This does not claim that the layer represents the *latest legal adopted corporate limits* as opposed to an informational boundary. Query date, extracted feature count, geometry digests, Comal/Bexar/Medina county intersection areas and any additional county slivers must be inspected from a real workflow execution.

**Accept a GIS PASS only after matching the ArcGIS publisher to the City's official download catalog, verifying latest annexation/vintage, checking 2026 city-owned polygon against county boundaries independently, and addressing slivers and limited-purpose/ETJ categories.** The raw spatial overlap is a research candidate, not legal certification.

Keep all eleven city pages on PARTIAL until manual factual/visual accessibility, current school/tax/utility/visitor/transit source checks and sitemap/JSON-LD review also complete.

## Direct primary government catalog confirmation — October 11

This source is now **directly corroborated** against the official [City of San Antonio GIS Data catalog](https://www.sanantonio.gov/GIS/GISdata): its *Cosa Boundary* entry explicitly describes **"the City Limits of San Antonio"** and states a **quarterly** update cadence. The same official page links the City's [GIS Open Data Portal](https://opendata-cosagis.opendata.arcgis.com/). The city-associated [COSABoundary/FeatureServer/1](https://services.arcgis.com/g1fRTDLeMgspWrYp/arcgis/rest/services/COSABoundary/FeatureServer/1?f=pjson) is a polygon layer in the municipal ArcGIS organization, with last-edit timestamp in September 2026. The official catalog separately lists ETJ Cosa, other-city ETJ and limited annexation; the municipal boundary candidate is **not** one of those separate ETJ datasets.

**The source-catalog/discovery task has independent government evidence now; the actual county intersection, legal status and separately coded limited-purpose annexation remain open until executed and reviewed.** The City itself cautions that GIS maps are **not legal representations** and directs individual boundary decisions to the responsible office. Do not treat data publication or county overlap as a legal address classification.
