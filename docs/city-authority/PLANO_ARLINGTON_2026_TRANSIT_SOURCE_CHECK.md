# TexasDefined 11-city factual follow-up — October 11, 2026 transit provider checks

These are **primary transit source verified** corrections to two previously generic city-system paragraphs, not a general completion of local services, school district boundaries, municipal geometry or all relocation facts.

| City | Exact changed public claim | Operator primary source and date | Checked | Result | Limitation |
|---|---|---|---|---|---|
| Plano | DART rail, bus and zone-based GoLink; October 5, 2026 rollout adds Southwest Plano and expands other existing zones/transfer access | [DART October 1, 2026 release](https://prod.dart.org/about/news-and-events/newsreleases/newsrelease-detail/dart-announces-expanded-golink-service-in-plano-to-provide-riders-with-greater-access-and-connectivity) and [DART 2026 service change page](https://prod.dart.org/trip/trip-planner/service-change) | October 11, 2026 | PASS for dates and zone-based service | Current operating hours, live pickup availability and eligibility depend on the service zone and address; no invented universal hourly timetable or fare |
| Arlington | Citywide on-demand shared transit, CentrePort TRE and Eastchase Fort Worth transfer connections; regular Monday–Saturday operations, not Sundays | [City of Arlington published May 12, 2026 description](https://www.arlingtontx.gov/News-Articles/2026/May/Explore-Arlington-Easily-with-Ride-Credit-Bundles), [official On-Demand route and hours](https://www.arlingtontx.gov/City-Services/Transportation-Streets-Traffic/Arlington-On-Demand), [Arlington municipal open-data service boundary](https://opendata.arlingtontx.gov/) | October 11, 2026 | PASS for named service, connection points and day-of-week operating model | Actual wait times, fare, accessibility eligibility, closures and holiday changes require official live app/source confirmation |

**Why changes matter:** generic statements like "Plano served by DART" omit the newly expanded GoLink service; Arlington's service is not a traditional citywide fixed-route bus, and an unqualified "transit" claim can imply Sunday service that is not offered.

**File change:** `src/data/city-authority-profiles.ts`, `plano.systems[]` and `arlington.systems[]` public transportation summaries only. Existing official links preserved and the city profile's address-based school, utility, and taxing-unit cautions left unchanged. Do not mark entire school/utility/visitor/county data FULL PASS based on these transit updates.

**Acceptance:** individual transportation-provider factual rows above PASS; total city factual guide and final city acceptance remain PARTIAL pending the remaining city-specific claims and manual trip usability.
